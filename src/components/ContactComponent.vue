<template>
    <ion-list>
        <ion-list-header>
            <ion-title>Search result</ion-title>
        </ion-list-header>

        <ion-item v-for="contact in getContacts" v-bind:key="contact.id">
            <ion-avatar slot="start">
                <img src="../../public/assets/reshot-icon-avatar.svg">
            </ion-avatar>
            <ion-label>
                <h3>{{contact.username}}</h3>
            </ion-label>
        </ion-item>
    </ion-list>    
</template>

<script lang="ts">
import {Vue, Options} from 'vue-class-component'
import {IonList, IonListHeader, IonTitle, IonItem, IonLabel, IonAvatar} from '@ionic/vue'
import {SearchContact, test_searchContacts} from '@/model/SearchContact'

@Options({
    components: {
        IonList,
        IonListHeader,
        IonTitle,
        IonItem,
        IonLabel,
        IonAvatar
    }
})
export default class ContactComponent extends Vue {
    private contacts: SearchContact[] = []

    mounted(): void {
        this.contacts = test_searchContacts
    }

    filterContacts(e: CustomEvent): void {
        /*this.filteredContacts = this.contacts.filter(contact => 
            contact.name.toUpperCase().includes(e.detail.value.toUpperCase())
        )*/
        console.log(e.detail.value)
    }

    get getContacts(): SearchContact[] {
        return this.contacts;
    }

}
</script>
