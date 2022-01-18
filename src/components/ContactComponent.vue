<template>
    <ion-list>
        <ion-list-header>
            <ion-title>Contacts</ion-title>
        </ion-list-header>
    </ion-list>    
</template>

<script lang="ts">
import {Vue, Options} from 'vue-class-component'
import {IonList, IonListHeader, IonTitle} from '@ionic/vue'

@Options({
    components: {
        IonList,
        IonListHeader,
        IonTitle
    }
})
export default class ContactComponent extends Vue {

    filterContacts(e: CustomEvent): void {
        console.log(e);
    }

}
</script>
