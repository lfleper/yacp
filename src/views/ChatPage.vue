<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-button fill="clear" slot="start" @click="showOverview">
                    <ion-icon :icon="chevronBackOutline"></ion-icon>
                </ion-button>
                <ion-title>Lukas Fleper</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <chat-component v-for="chat in chats" v-bind:key="chat.id" :chat="chat">
            </chat-component>
        </ion-content>

        <ion-footer class="ion-no-border">
            <ion-toolbar class="message-toolbar">
                <ion-input placeholder=".." class="message-input"></ion-input>
                <ion-button fill="clear" slot="end">
                    <ion-icon :icon="sendOutline"></ion-icon>
                </ion-button>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-class-component'
import {IonContent, IonPage, IonToolbar, IonFooter, IonHeader, IonInput, IonButton, IonIcon, IonTitle} from '@ionic/vue'
import {sendOutline, chevronBackOutline} from 'ionicons/icons'
import {Chat, test_chats} from '@/model/Chat'
import {useRouter} from 'vue-router'
import ChatComponent from '@/components/ChatComponent.vue'

@Options({
    components: {
        IonContent,
        IonToolbar,
        IonFooter,
        IonHeader,
        IonInput,
        IonButton,
        IonIcon,
        IonTitle,
        ChatComponent,
        IonPage
    }
})
export default class ChatPage extends Vue {
    private chats: Chat[] = test_chats
    private router = useRouter()

    data() {
        return {
            sendOutline: sendOutline,
            chevronBackOutline: chevronBackOutline
        }
    }

    showOverview(): void {
        this.router.push({name: 'Overview'})
    }
}

</script>

<style scoped>
ion-content {
    position: fixed;
    /*height: calc(100% - 112px);*/
}
ion-footer {
    position: fixed;
    position: -webkit-sticky;
    bottom: 0;
}
.message-toolbar {
    width: 100%;
}
.message-input {
    margin: 0px 5px;
    border-radius: 20px;
    border: 1px solid var(--ion-color-primary);
    --padding-start: 12px;
    --padding-end: 12px;
    --background: var(--ion-color-ligth);
}
</style>
