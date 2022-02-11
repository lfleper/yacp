<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-button fill="clear" slot="start" @click="showOverview">
                    <ion-icon :icon="chevronBackOutline"></ion-icon>
                </ion-button>
                <ion-title>{{name}}</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding" scroll-events="true" ref="chatContent" id="chat-content" @ionScroll="loadNewMessages">
            <div v-for="(chat, index) in chats" v-bind:key="chat.id" :id="chat.id">
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
                <ion-input v-model="currentMessage" placeholder=".." class="message-input"></ion-input>
                <ion-button @click="sendMessage" fill="clear" slot="end">
                    <ion-icon :icon="sendOutline"></ion-icon>
                </ion-button>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-class-component'
import {IonContent, IonPage, IonToolbar, IonFooter, IonHeader, IonInput, IonButton, IonIcon, IonTitle, ScrollCustomEvent} from '@ionic/vue'
import {sendOutline, chevronBackOutline} from 'ionicons/icons'
import {Chat, SocketChat} from '@/types/Chat'
import {useRouter, useRoute} from 'vue-router'
import {MessageApi} from "../api/MessageApi";
import ChatComponent from '@/components/ChatComponent.vue'
import {SocketClient} from '@/api/SocketClient'

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
    private messageApi?: MessageApi
    private chats: Chat[] = []
    private conversationId?: number
    private name = ''
    private currentMessage = ""
    private router = useRouter()

    beforeCreate(){
        this.messageApi = new MessageApi(this.$storage)
    }

    data() {
        return {
            sendOutline: sendOutline,
            chevronBackOutline: chevronBackOutline
        }
    }

    mounted() {
        SocketClient.getInstance(this.$storage).addListener(this.onNewChatReceived)
        const route = useRoute()
        this.conversationId = parseInt(route.params.id as string)
        this.name = route.params.name as string

        console.log("Id: " + this.conversationId)
        this.messageApi?.getMessages(this.conversationId, 15)
            .then(data => {
                if (data)
                    this.chats = data
                    this.toBottom()
            })
            .catch(err => console.log('error fetching messages: ', err))
    }

    showOverview(): void {
        this.router.go(-1)
    }

    sendMessage(){
        if(!this.conversationId)
            return

        this.messageApi?.sendMessage(this.conversationId, this.currentMessage)
            .then(data => {
                data && this.chats.push(data)
                this.currentMessage = "";
                this.toBottom()
            })
            .catch(err => console.log(err))
    }

    onNewChatReceived(chat: SocketChat): void {
        if (chat.chat_id === this.conversationId) {
            this.chats.push({
                id: chat.id,
                timestamp: new Date(chat.timestamp),
                content: chat.content,
                full_name: chat.full_name,
                is_sender: chat.is_sender
            })
            this.toBottom()
        }
    }

    loadNewMessages(e: ScrollCustomEvent): void {
        const lastMessageId = this.chats[0].id
        if (e.detail.scrollTop === 0 && this.conversationId) {
            this.messageApi?.getMessages(this.conversationId, 15, this.chats.length)
                .then(data => {
                    if (data && this.messageApi) {
                        this.chats.push(...data)
                        this.chats = this.messageApi.sort(this.chats)

                        // set scroll position to last shown message.
                        setTimeout(() => {
                            const el = this.$el.querySelector("[id='" + lastMessageId + "']")
                            // new psoition is:
                            // message position in ion-content - message element height - 10 (offset)
                            this.content?.scrollToPoint(undefined, el.getBoundingClientRect().top - el.offsetHeight - 10)
                        }, 10)
                    }
                })
                .catch(err => console.log('no messages found', err))
        }
    }

    toBottom(): void {
        this.content?.scrollToBottom()
    }

    get content(): any {
        return this.$el.querySelector('#chat-content')
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
