<template>
    <ion-content fullscreen>
        <ion-header translucent>
            <ion-segment 
                @ionChange="segmentChanged" 
                v-model="activeSegment">
                <ion-segment-button value="contacts">
                    <ion-label>contacts</ion-label>
                </ion-segment-button>
                <ion-segment-button value="conversations">
                    <ion-label>chats</ion-label>
                </ion-segment-button>
            </ion-segment>
            <ion-toolbar>
                <ion-searchbar @ionChange="doFilter"> 
                </ion-searchbar>
            </ion-toolbar>
        </ion-header>

        <conversation-component v-if="activeSegment === 'conversations'" ref="conversationComponent"></conversation-component>
        <contact-component v-if="activeSegment === 'contacts'" ref="contactComponent"></contact-component>
    </ion-content>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-class-component'
import {IonContent, IonHeader, IonToolbar, IonSearchbar,IonLabel, IonSegment, IonSegmentButton} from '@ionic/vue'
import ConversationComponent from '@/components/ConversationComponent.vue'
import ContactComponent from '@/components/ContactComponent.vue'

@Options({
    components: {
        IonContent,
        IonHeader,
        IonToolbar,
        IonSearchbar,
        IonLabel,
        IonSegment,
        IonSegmentButton,
        ConversationComponent,
        ContactComponent
    }
})
export default class OverviewPage extends Vue {
    private activeSegment = 'conversations'

    doFilter(e: CustomEvent): void {
        (this.$refs.conversationComponent as any).filterConversations(e);
    }

    segmentChanged(e: CustomEvent): void {
        this.activeSegment = e.detail.value
    }

}
</script>

<style scoped>

</style>
