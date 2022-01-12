<template>
    <ion-content fullscreen>
        <ion-grid>
            <ion-row class="ion-justify-content-center">
                <h1>YACP</h1>
            </ion-row>
            <ion-row class="ion-justify-content-center">
                <p>Yet Another Chat Programm</p>
            </ion-row>
        </ion-grid>

        <section>
            <ion-button expand="block">Login</ion-button>
            <ion-button expand="block">Registrieren</ion-button>
        </section>
    </ion-content>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-class-component'
import {IonContent, IonRow, IonGrid, IonCol, IonText} from '@ionic/vue'

@Options({
    components: {
        IonContent,
        IonRow,
        IonCol,
        IonGrid,
        IonText
    }
})
export default class LoginPage extends Vue {



}
</script>

<style scoped>
section {
    margin-top: 1em;
    margin-bottom: 2.5em;
}

section:not(.full-width),
.full-width > header {
    padding: 0 10px;
}
</style>