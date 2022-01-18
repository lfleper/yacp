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
                <ion-searchbar @ionChange="doFilter"> 
                </ion-searchbar>
            </ion-toolbar>
        </ion-header>

        <ConversationComponent ref="conversationComponent"></ConversationComponent>
    </ion-content>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-class-component'
import {IonContent, IonHeader, IonToolbar, IonSearchbar,IonLabel, IonSegment, IonSegmentButton} from '@ionic/vue'
import ConversationComponent from '@/components/ConversationComponent.vue'

@Options({
    components: {
        IonContent,
        IonHeader,
        IonToolbar,
        IonSearchbar,
        IonLabel,
        IonSegment,
        IonSegmentButton,
        ConversationComponent
    }
})
export default class OverviewPage extends Vue {

    doFilter(e: CustomEvent): void {
        (this.$refs.conversationComponent as any).filterConversations(e);
    }

}
</script>

<style scoped>

</style>
