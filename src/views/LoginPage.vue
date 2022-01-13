<template>
    <ion-content fullscreen>
        <swiper @swiper="setSwiper" :options="swiperOptions">
            <swiper-slide class="swiper-no-swiping">
                <ion-grid>
                    <ion-row class="ion-justify-content-center">
                        <img class="login-image" src="../../public/assets/undraw_connection_re_lcud.svg"/>
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
                            <ion-button expand="block" @click="openRegistration">Registrieren</ion-button>
                        </section>
                    </ion-row>
                </ion-grid>
            </swiper-slide>

            <swiper-slide>
                <h1>Login</h1>
            </swiper-slide>

            <swiper-slide>
                <h1>Registration</h1>
            </swiper-slide>
        </swiper>
    </ion-content>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-class-component'
import {IonContent, IonRow, IonGrid, IonCol, IonText, IonButton} from '@ionic/vue'
import {Swiper, SwiperSlide} from 'swiper/vue'
import 'swiper/css'
import '@ionic/vue/css/ionic-swiper.css'
import { ref } from 'vue'

@Options({
    components: {
        IonContent,
        IonRow,
        IonCol,
        IonGrid,
        IonText,
        IonButton,
        Swiper,
        SwiperSlide
    }
})
export default class LoginPage extends Vue {

    swiperOptions: {[key: string]: any} = {
        noSwiping: true
    }

    private swiper: any = ref(null)

    setSwiper = (swiper: any) => {
        this.swiper = swiper
    }

    openStart() {
        this.swiper.slideTo(0, 300, true)
    }

    openLogin() {
        this.swiper.slideTo(1, 300, true)
    }

    openRegistration() {
        this.swiper.slideTo(2, 300, true)
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

.login-image {
    width: 100%;
    max-width: 500px;
    padding: 30px;
}

.title {
    font-family: 'Barlow', sans-serif;
    font-weight: 300;
    font-size: calc(15px + 10vw);
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

@media all and (min-width: 680px) {
    .title {
        font-size: 82px;
    }
    .subtitle {
        font-size: 21px;
    }
    section {
        width: 646px;
    }
}
</style>