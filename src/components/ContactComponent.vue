<template>
    <ion-list>
        <ion-list-header>
            <ion-title>Contacts</ion-title>
        </ion-list-header>

        <ion-item-sliding 
            v-for="contact in getContacts" 
            v-bind:key="contact.id"
        >
            <ion-item>
                <ion-avatar slot="start">
                    <img src="../../public/assets/reshot-icon-avatar.svg">
                </ion-avatar>
                <ion-label>
                    <h3>{{contact.name}}</h3>
                </ion-label>
            </ion-item>

            <ion-item-options slide="end">
                <ion-item-option color="danger" @click="deleteContact(contact)">Delete</ion-item-option>
            </ion-item-options>
        </ion-item-sliding>
    </ion-list>    
</template>

<script lang="ts">
import {Vue, Options} from 'vue-class-component'
import {IonList, IonListHeader, IonTitle, IonItemSliding, IonItem, IonLabel, IonAvatar, IonItemOptions, IonItemOption} from '@ionic/vue'
import {test_contacts, Contact} from '@/model/Contact'

@Options({
    components: {
        IonList,
        IonListHeader,
        IonTitle,
        IonItemSliding,
        IonItem,
        IonLabel,
        IonAvatar,
        IonItemOption,
        IonItemOptions
    }
})
export default class ContactComponent extends Vue {
    private contacts: Contact[] = []
    private filteredContacts: Contact[] = []

    mounted(): void {
        this.contacts = test_contacts
        this.filteredContacts = this.contacts
    }

    filterContacts(e: CustomEvent): void {
        this.filteredContacts = this.contacts.filter(contact => 
            contact.name.toUpperCase().includes(e.detail.value.toUpperCase())
        )
    }

    deleteContact(contact: Contact): void {
        this.contacts = this.contacts.filter(c => c.id !== contact.id)
        this.filteredContacts = this.contacts
    }

    get getContacts(): Contact[] {
        return this.filteredContacts;
    }

}
</script>
