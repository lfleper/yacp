<template>
    <ion-list>
        <ion-list-header>
            <ion-title>Conversations</ion-title>
        </ion-list-header>

        <ion-item-sliding 
            v-for="conversation in getConversations" 
            v-bind:key="conversation.id"
        > 
            <ion-item>
                <ion-avatar slot="start">
                    <img src="../../public/assets/reshot-icon-avatar.svg">
                </ion-avatar>
                <ion-label>
                    <h2>{{conversation.name}}</h2>
                    <h3></h3>
                    <p>{{conversation.last_message}}</p>
                </ion-label>
                <ion-note slot="end" color="secondary">{{getConversationDateString(conversation.last_message_date)}}</ion-note>
            </ion-item>

            <ion-item-options slide="end">
                <ion-item-option color="danger" @click="deleteConversation(conversation)">Delete</ion-item-option>
            </ion-item-options>
        </ion-item-sliding>

    </ion-list>
</template>

<script lang="ts">
import {Conversation, test_conversations} from '@/model/Conversation'
import {getDayNameByDayNumber, getTimeAsString, isDateInThisWeek, isToday, isYesterday} from '@/util/DateUtil'
import {Vue, Options} from 'vue-class-component'
import {
    IonList, IonListHeader, IonTitle, IonItem, IonAvatar, IonNote, 
    IonLabel, IonItemSliding, IonItemOption, IonItemOptions
} from '@ionic/vue'

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
        IonItemOptions
    }
})
export default class ConversationComponent extends Vue {
    private conversations: Conversation[] = []
    private filteredConversations: Conversation[] = []

    mounted(): void {
        this.conversations = test_conversations
        this.filteredConversations = this.conversations 
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
        this.conversations = this.conversations.filter(c => c.id !== conversation.id)
        this.filteredConversations = this.conversations
    }

    filterConversations(e: CustomEvent): void {
        this.filteredConversations = this.conversations.filter(conversation => 
            conversation.name.toUpperCase().includes(e.detail.value.toUpperCase())
        )
    }

    get getConversations(): Conversation[] {
        return this.filteredConversations;
    }

}

</script>
