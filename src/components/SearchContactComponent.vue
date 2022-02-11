<template>
    <ion-list>
        <ion-list-header>
            <ion-title>Search result</ion-title>
        </ion-list-header>

        <ion-item 
            v-for="contact in getContacts" 
            v-bind:key="contact.id"
            @click="createChat(contact)"
            button="true"
        >
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
import {SearchContact} from '@/types/SearchContact'
import {UserSearchApi} from '@/api/UserSearchApi'
import {ChatApi} from '@/api/ChatApi'

@Options({
    components: {
        IonList,
        IonListHeader,
        IonTitle,
        IonItem,
        IonLabel,
        IonAvatar
    },
    emits: ['change:segment']
})
export default class ContactComponent extends Vue {
    private contacts: SearchContact[] = []
    private userSearchApi?: UserSearchApi
    private chatApi?: ChatApi

    beforeCreate(): void {
        this.userSearchApi = new UserSearchApi(this.$storage)
        this.chatApi = new ChatApi(this.$storage)
    }

    filterContacts(e: CustomEvent): void {
        if (e.detail.value && e.detail.value !== '') {
            this.userSearchApi?.getUsers(e.detail.value)
                .then(data => this.contacts = data || [])
                .catch(err => console.log('failed to laod contacts: ' + err))
        } else {
            this.contacts = []
        }
    }

    createChat(contact: SearchContact): void {
        this.chatApi?.createChat([contact], contact.username)
            .then(() => {
                this.$emit('change:segment')
            })
            .catch(err => console.log(err))
    }

    get getContacts(): SearchContact[] {
        return this.contacts;
    }

}
</script>
