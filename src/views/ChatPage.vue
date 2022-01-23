<template>
    <div>
        <ion-header>
            <ion-toolbar>
                <ion-button fill="clear" slot="start">
                    <ion-icon :icon="chevronBackOutline"></ion-icon>
                </ion-button>
                <ion-title>Lukas Fleper</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">

        </ion-content>

        <ion-footer class="ion-no-border">
            <ion-toolbar class="message-toolbar">
                <ion-input placeholder=".." class="message-input"></ion-input>
                <ion-button fill="clear" slot="end">
                    <ion-icon :icon="sendOutline"></ion-icon>
                </ion-button>
            </ion-toolbar>
        </ion-footer>
    </div>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-class-component'
import {IonContent, IonToolbar, IonFooter, IonHeader, IonInput, IonButton, IonIcon, IonTitle} from '@ionic/vue'
import {sendOutline, chevronBackOutline} from 'ionicons/icons';

@Options({
    components: {
        IonContent,
        IonToolbar,
        IonFooter,
        IonHeader,
        IonInput,
        IonButton,
        IonIcon,
        IonTitle
    }
})
export default class ChatPage extends Vue {

    data() {
        return {
            sendOutline: sendOutline,
            chevronBackOutline: chevronBackOutline
        }
    }

}

</script>

<style scoped>
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
</style>
