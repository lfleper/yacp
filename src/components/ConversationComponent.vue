<template>
    <ion-refresher slot="fixed" @ionRefresh="refreshConversations">
        <ion-refresher-content></ion-refresher-content>
    </ion-refresher>

    <ion-list>
        <ion-list-header>
            <ion-title>Conversations</ion-title>
        </ion-list-header>

        <ion-item-sliding 
            v-for="conversation in getConversations" 
            v-bind:key="conversation.id"
        > 
            <ion-item @click="openChat(conversation)" button="true">
                <ion-avatar slot="start">
                    <img src="../../public/assets/reshot-icon-avatar.svg">
                </ion-avatar>
                <ion-label>
                    <h2>{{conversation.name}}</h2>
                    <h3></h3>
                    <p>{{conversation.last_message}}</p>
                </ion-label>
                <ion-note 
                    v-if="conversation.last_message_date" 
                    slot="end" 
                    color="secondary">{{getConversationDateString(conversation.last_message_date)}}
                </ion-note>
            </ion-item>

            <ion-item-options slide="end">
                <ion-item-option color="danger" @click="deleteConversation(conversation)">Delete</ion-item-option>
            </ion-item-options>
        </ion-item-sliding>

        <ion-item v-if="getConversations.length === 0">
            <ion-text>No conversations found.</ion-text>
        </ion-item>
    </ion-list>
</template>

<script lang="ts">
import {Conversation} from '@/types/Conversation'
import {getDayNameByDayNumber, getTimeAsString, isDateInThisWeek, isToday, isYesterday} from '@/util/DateUtil'
import {Vue, Options} from 'vue-class-component'
import {
    IonList, IonListHeader, IonTitle, IonItem, IonAvatar, IonNote, 
    IonLabel, IonItemSliding, IonItemOption, IonItemOptions, IonText,
    IonRefresher, IonRefresherContent, RefresherCustomEvent
} from '@ionic/vue'
import {useRouter} from 'vue-router'
import {ChatApi} from '@/api/ChatApi'
import {SocketChat} from '@/types/Chat'
import {SocketClient} from '@/api/SocketClient'

@Options({
    components: {
        IonList,
        IonListHeader,
        IonTitle,
        IonItem,
        IonAvatar,
        IonNote,
        IonLabel,
        IonItemSliding,
        IonItemOption,
        IonItemOptions,
        IonText,
        IonRefresher,
        IonRefresherContent
    },
    watch: {
        'conversations': 'sortConversations'
    }
})
export default class ConversationComponent extends Vue {
    private conversations: Conversation[] = []
    private filteredConversations: Conversation[] = []
    private router = useRouter()
    private chatApi?: ChatApi

    beforeCreate(): void {
        this.chatApi = new ChatApi(this.$storage)
        this.chatApi?.getChats()
            .then(data => {
                if (data) {
                    this.conversations = data
                    this.filteredConversations = data
                    this.sortConversations()
                }
            })
            .catch(err => console.log(err))
    }

    mounted() {
        SocketClient.getInstance(this.$storage).addListener(this.onNewChatReceived)
    }

    sortConversations(): void {
        this.conversations.sort((a, b) => {
            const aDate = (a.last_message_date) ? a.last_message_date.getTime() : 0
            const bDate = (b.last_message_date) ? b.last_message_date.getTime() : 0
            return bDate - aDate
        })
    }


    getConversationDateString(date: Date): string {
        if (isToday(date)) {
            return getTimeAsString(date, 'de-DE')
        } else if (isYesterday(date)) {
            return "Yesterday"
        } else if (isDateInThisWeek(date)) {
            return getDayNameByDayNumber(date.getDay())
        } else {
            return date.toISOString().slice(0, 10)
        }
    }

    deleteConversation(conversation: Conversation): void {
        this.chatApi?.deleteChats(conversation.id)
            .then(() => {
                this.conversations = this.conversations.filter(c => c.id !== conversation.id)
                this.filteredConversations = this.conversations
            })
            .catch(err => console.log(err))
    }

    refreshConversations(event: RefresherCustomEvent): void {
        this.chatApi?.getChats()
            .then(data => {
                if (data) {
                    this.conversations = data
                    this.filteredConversations = data
                    event.target.complete()
                }
                this.sortConversations()
            })
            .catch(err => {
                console.log(err)
                event.target.cancel()
            })
    }

    /**
     * Update chat preview if socket received a new message.
     */
    onNewChatReceived(chat: SocketChat): void {
        const index = this.conversations.findIndex(c => c.id === chat.chat_id)
        if (index !== -1) {
            // conversation already exist
            this.conversations[index].last_message = chat.content
            this.conversations[index].last_message_date = new Date(chat.timestamp)
            this.conversations[index].last_message_user = chat.full_name
        } else {
            // new conversation
            this.conversations.push({
                id: chat.chat_id,
                name: chat.full_name,
                last_message: chat.content,
                last_message_date: new Date(chat.timestamp),
                last_message_user: chat.full_name
            })
        }
        this.sortConversations()
    }

    filterConversations(e: CustomEvent): void {
        this.filteredConversations = this.conversations.filter(conversation => 
            conversation.name.toUpperCase().includes(e.detail.value.toUpperCase())
        )
    }

    openChat(conversation: Conversation): void {
        this.router.push({
            name: 'Chat', 
            params: { 
                id: conversation.id, 
                name: conversation.name, 
                isGroup: conversation.is_group 
            }
        })
    }

    get getConversations(): Conversation[] {
        return this.filteredConversations
    }

}

</script>