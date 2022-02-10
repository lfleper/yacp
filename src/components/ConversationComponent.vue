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
            <ion-item @click="openChat(conversation)">
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
                }
            })
            .catch(err => console.log(err))
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
            })
            .catch(err => {
                console.log(err)
                event.target.cancel()
            })
    }

    filterConversations(e: CustomEvent): void {
        this.filteredConversations = this.conversations.filter(conversation => 
            conversation.name.toUpperCase().includes(e.detail.value.toUpperCase())
        )
    }

    openChat(conversation: Conversation): void {
        this.router.push({name: 'Chat', params: { id: conversation.id }})
    }

    get getConversations(): Conversation[] {
        return this.filteredConversations
    }

}

</script>