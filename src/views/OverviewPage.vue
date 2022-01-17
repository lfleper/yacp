<template>
    <ion-content fullscreen>
        <ion-header translucent>
            <ion-segment>
                <ion-segment-button value="contacts">
                    <ion-label>contacts</ion-label>
                </ion-segment-button>
                <ion-segment-button value="chats">
                    <ion-label>chats</ion-label>
                </ion-segment-button>
            </ion-segment>
            <ion-toolbar>
                <ion-searchbar @ionChange="filterConversations"> 
                </ion-searchbar>
            </ion-toolbar>
        </ion-header>

        <ion-list>
            <ion-list-header>
                <ion-title>Conversations</ion-title>
            </ion-list-header>

            <ion-item v-for="conversation in getConversations" v-bind:key="conversation.id">
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
        </ion-list>
    </ion-content>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-class-component'
import {
    IonContent, IonHeader, IonToolbar, IonSearchbar, IonList, IonListHeader, IonTitle, 
    IonItem, IonAvatar, IonNote, IonLabel, IonSegment, IonSegmentButton} 
from '@ionic/vue'
import {isToday, isYesterday, getTimeAsString, isDateInThisWeek, getDayNameByDayNumber} from '../util/DateUtil'
import {Conversation, test_conversations} from '../model/Conversation'


@Options({
    components: {
        IonContent,
        IonHeader,
        IonToolbar,
        IonSearchbar,
        IonList,
        IonListHeader,
        IonTitle,
        IonItem,
        IonAvatar,
        IonNote,
        IonLabel,
        IonSegment,
        IonSegmentButton
    }
})
export default class OverviewPage extends Vue {

    private conversations: Conversation[] = []
    private filteredConversations: Conversation[] = []

    mounted() {
        this.conversations = test_conversations
        this.filteredConversations = test_conversations
    }

    getConversationDateString(date: Date): string {
        if (isToday(date)) {
            return getTimeAsString(date, 'de-DE')
        } else if (isYesterday(date)) {
            return "Gestern"
        } else if (isDateInThisWeek(date)) {
            return getDayNameByDayNumber(date.getDay())
        } else {
            return date.toISOString().slice(0, 10)
        }
    }

    filterConversations(e: CustomEvent): void {
        if (e.detail.value === "") {
            this.filteredConversations = this.conversations
        } else {
            this.filteredConversations = this.conversations.filter(conversation => 
                conversation.name.toUpperCase().includes(e.detail.value.toUpperCase())
            )
        }
    }

    get getConversations(): Conversation[] {
        return this.filteredConversations;
    }

}
</script>

<style scoped>

</style>
