<template>
    <ion-content fullscreen>
        <swiper @swiper="setSwiper" :options="swiperOptions" class="swiper-no-swiping">
            <swiper-slide>
                <ion-fab @click="openStart" vertical="top" horizontal="end">
                    <ion-fab-button>
                        <ion-icon :icon="chevronForwardOutline"></ion-icon>
                    </ion-fab-button>
                </ion-fab>

                <ion-grid>
                    <ion-row class="ion-justify-content-center sub-page-image">
                        <img src="../../public/assets/undraw_social_interaction_re_dyjh.svg"/>
                    </ion-row>

                    <ion-row class="ion-justify-content-center">
                        <h1 class="sub-page-title">Login</h1>
                    </ion-row>

                    <ion-row class="ion-justify-content-center">
                        <ion-item>
                            <ion-label position="floating">username</ion-label>
                            <ion-input v-model="userLogin.username" required="true" type="text"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="floating">password</ion-label>
                            <ion-input v-model="userLogin.password" required="true" type="password"></ion-input>
                        </ion-item>
                    </ion-row>

                    <ion-row class="ion-justify-content-center">
                        <section>
                            <ion-button expand="block" @click="doLogin">Login</ion-button>
                        </section>
                    </ion-row>
                </ion-grid>
            </swiper-slide>

            <swiper-slide>
                <ion-grid>
                    <ion-row class="ion-justify-content-center main-image">
                        <img src="../../public/assets/undraw_connection_re_lcud.svg"/>
                    </ion-row>

                    <ion-row class="ion-justify-content-center">
                        <h1 class="title">YACP</h1>
                    </ion-row>
                    <ion-row class="ion-justify-content-center">
                        <p class="subtitle">Yet Another Chat Programm</p>
                    </ion-row>

                    <ion-row class="ion-justify-content-center">
                        <section>
                            <ion-button expand="block" @click="openLogin">Login</ion-button>
                            <ion-button expand="block" @click="openRegistration">Registration</ion-button>
                        </section>
                    </ion-row>
                </ion-grid>
            </swiper-slide>

            <swiper-slide>
                <ion-fab @click="openStart" vertical="top" horizontal="start">
                    <ion-fab-button>
                        <ion-icon :icon="chevronBackOutline"></ion-icon>
                    </ion-fab-button>
                </ion-fab>

                <ion-grid>
                    <ion-row class="ion-justify-content-center sub-page-image">
                        <img src="../../public/assets/undraw_world_re_768g.svg"/>
                    </ion-row>

                    <ion-row class="ion-justify-content-center">
                        <h1 class="sub-page-title">Registration</h1>
                    </ion-row>

                    <ion-row class="ion-justify-content-center">
                        <ion-item>
                            <ion-label position="floating">username</ion-label>
                            <ion-input v-model="userRegistration.username" required="true" type="text"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="floating">firstname</ion-label>
                            <ion-input v-model="userRegistration.first_name" required="true" type="text"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="floating">lastname</ion-label>
                            <ion-input v-model="userRegistration.last_name" required="true" type="text"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="floating">e-mail</ion-label>
                            <ion-input v-model="userRegistration.email" required="true" type="email"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="floating">password</ion-label>
                            <ion-input v-model="userRegistration.password" required="true" type="password"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="floating">confirm password</ion-label>
                            <ion-input v-model="userRegistration.confirmPassword" required="true" type="password"></ion-input>
                        </ion-item>
                    </ion-row>

                    <ion-row class="ion-justify-content-center">
                        <section>
                            <ion-button expand="block" @click="doRegistration">Register</ion-button>
                        </section>
                    </ion-row>
                </ion-grid>
            </swiper-slide>
        </swiper>
    </ion-content>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-class-component'
import {IonContent, IonRow, IonGrid, IonCol, IonText, IonButton, IonItem, IonLabel, IonInput, IonFabButton, IonFab, IonIcon, toastController} from '@ionic/vue'
import {Swiper, SwiperSlide} from 'swiper/vue'
import 'swiper/css'
import '@ionic/vue/css/ionic-swiper.css'
import { ref } from 'vue'
import { 
    chevronForwardOutline,
    chevronBackOutline
} from 'ionicons/icons';
import {Token, UserLogin, UserRegistration} from '@/auth/User'
import {LoginError} from '@/exception/LoginError'
import {checkValidRegistration, checkValidLogin} from '@/util/LoginValidator'
import {useRouter} from 'vue-router'
import {UserApi} from '@/auth/UserApi'

@Options({
    components: {
        IonContent,
        IonRow,
        IonCol,
        IonGrid,
        IonText,
        IonButton,
        Swiper,
        SwiperSlide,
        IonItem,
        IonLabel,
        IonInput,
        IonFabButton,
        IonFab,
        IonIcon
    }
})
export default class LoginPage extends Vue {
    private userRegistration = new UserRegistration()
    private userLogin = new UserLogin()
    private userApi = new UserApi()
    private router = useRouter()

    /**
     * swiper options to disable swiping functionality.
     */
    swiperOptions: {[key: string]: any} = {
        noSwiping: true
    }

    private swiper: any = ref(null)

    data() {
        return {
            chevronForwardOutline: chevronForwardOutline,
            chevronBackOutline: chevronBackOutline
        }
    }

    setSwiper(swiper: any): void {
        this.swiper = swiper
        this.swiper.slideTo(1, false, false)
    }

    openStart(): void {
        this.swiper.slideTo(1, 300, true)
    }

    openLogin(): void {
        this.swiper.slideTo(0, 300, true)
    }

    openRegistration(): void {
        this.swiper.slideTo(2, 300, true)
    }

    async doLogin(): Promise<void> {
        let token = null
        try {
            checkValidLogin(this.userLogin) 
            const data = await this.userApi.login(this.userLogin);
            token = data
        } catch (err) {
            console.error((err as LoginError).message)
            this.openToast((err as LoginError).message)
        }
        if (token)
            this.setTokenAndRedirect(token)
    }

    async doRegistration(): Promise<void> {
        let token = null
        try {
            checkValidRegistration(this.userRegistration) 
            const data = await this.userApi.register(this.userRegistration)
            token = data
        } catch (err) {
            console.error((err as Error).message)
            this.openToast((err as Error).message)
        }
        if (token)
            this.setTokenAndRedirect(token)
    }

    setTokenAndRedirect(token: Token): void {
        this.$storage.set('token', token)
        this.router.push({name: 'Overview'})
    }

    async openToast(msg: string): Promise<void> {
        const toast = await toastController.create({
            message: msg,
            duration: 2000,
            position: 'bottom'
        })

        return toast.present()
    }

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@100;300&display=swap');

section {
    width: 100%;
    margin-top: 1em;
    margin-bottom: 4em;
}

section:not(.full-width),
.full-width > header {
    padding: 0 15px;
}

.main-image {
    padding: 30px;
}

.main-image img {
    width: 100%;
    height: auto;
    max-width: 600px;
}

.sub-page-image {
    padding: 50px;
}

.sub-page-image img {
    width: 60%;
    height: auto;
    max-width: 500px;
}

.title {
    font-family: 'Barlow', sans-serif;
    font-weight: 300;
    font-size: calc(15px + 10vw);
}

.sub-page-title {
    font-family: 'Barlow', sans-serif;
    font-weight: 300;
    font-size: calc(10px + 6vw);
}

.subtitle {
    font-family: 'Barlow', sans-serif;
    font-weight: 100;
    font-size: calc(7px + 2vw);
}

ion-button {
    font-family: 'Barlow', sans-serif;
    font-weight: 300;
    font-size: 16px;
}

ion-item {
    width: 90%;
    padding: 5px;
}

ion-input, ion-label {
    font-family: 'Barlow', sans-serif;
}

ion-input {
    font-weight: 100;
    font-size: 4vw;
}

ion-label {
    font-weight: 300;
}

@media all and (min-width: 680px) {
    .title {
        font-size: 82px;
    }
    .subtitle {
        font-size: 21px;
    }
    .sub-page-title {
        font-size: 51px;
    }
    section, ion-item {
        width: 646px;
    }
    ion-input {
        font-size: 27px;
    }
}
</style>