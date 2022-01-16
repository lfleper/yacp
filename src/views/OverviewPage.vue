<template>
    <ion-content fullscreen>
        <ion-header translucent>
            <ion-toolbar>
                <ion-searchbar>
                </ion-searchbar>
            </ion-toolbar>
        </ion-header>

        <ion-list>
            <ion-list-header>
                <ion-title>Conversations</ion-title>
            </ion-list-header>

            <ion-item v-for="chat in chats" v-bind:key="chat.id">
                <ion-avatar slot="start">
                    <img src="../../public/assets/reshot-icon-avatar.svg">
                </ion-avatar>
                <ion-label>
                    <h2>{{chat.name}}</h2>
                    <h3></h3>
                    <p>{{chat.last_message}}</p>
                </ion-label>
                <ion-note slot="end" color="secondary">{{getChatDate(chat.last_message_date)}}</ion-note>
            </ion-item>
        </ion-list>
    </ion-content>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-class-component'
import {IonContent, IonHeader, IonToolbar, IonSearchbar, IonList, IonListHeader, IonTitle, IonItem, IonAvatar, IonNote, IonLabel} from '@ionic/vue'
import {isToday, isYesterday, getTimeAsString, isDateInThisWeek, getDayNameByDayNumber} from '../util/DateUtil'

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
        IonLabel
    }
})
export default class OverviewPage extends Vue {

    data() {
        return {
            chats: [
                {
                    id: 1,
                    name: "Tristan Schneider",
                    last_message: "Was geht?",
                    last_message_date: new Date()
                },
                {
                    id: 2,
                    name: "Henry Sosnitzky",
                    last_message: "Wie gehts dir? Wie gehts dir? Wie gehts dir? Wie gehts dir? sdasdasd",
                    last_message_date: new Date('2022-01-15T12:30:00')
                },
                {
                    id: 3,
                    name: "Lukas Fleper",
                    last_message: "Morgen 20 Uhr",
                    last_message_date: new Date('2022-01-13T08:00:00')
                },
                {
                    id: 4,
                    name: "Ivayla Dimitrava Marinova",
                    last_message: "Hallo.",
                    last_message_date: new Date('2022-01-09T08:00:00')
                }
            ]
        }
    }

    getChatDate(date: Date): string {
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

}
</script>

<style scoped>

</style>
