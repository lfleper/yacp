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

        <ion-content class="ion-padding" :scroll-events="true">
            <div v-for="(chat, index) in chats" v-bind:key="chat.id">
                <div 
                    class="message-date" 
                    v-if="index === 0 || chat.timestamp.toLocaleDateString() !== chats[index-1].timestamp.toLocaleDateString()"
                >
                    {{this.chats[index].timestamp.toLocaleDateString()}}
                </div>
                <chat-component :chat="chat">
                </chat-component>
            </div>
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
import {Chat, test_chats} from '@/types/Chat'
import {useRouter, useRoute} from 'vue-router'
import ChatComponent from '@/components/ChatComponent.vue'

/**
 * Interface to bypass the typecheck of ts.
 */
interface IonContentInterface {
    scrollToBottom(): void
}

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
    private conversationId = ""
    private router = useRouter()

    data() {
        return {
            sendOutline: sendOutline,
            chevronBackOutline: chevronBackOutline
        }
    }

    mounted() {
        const route = useRoute()
        this.conversationId = route.params.id[0]
        this.content?.scrollToBottom()
        console.log(this.conversationId)
    }

    showOverview(): void {
        this.router.go(-1);
    }

    get content(): IonContentInterface | null {
        return document.querySelector('ion-content')
    }
}

</script>

<style scoped>
ion-content {
    top: 56px;
    position: fixed;
    height: calc(100% - 112px);
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
.message-date {
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: 12px;
    color: var(--ion-color-dark);
}
</style>
