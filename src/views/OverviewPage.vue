<template>
    <ion-page>
        <ion-header translucent>
            <ion-toolbar>
                <ion-searchbar @ionChange="doFilter"> 
                </ion-searchbar>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <conversation-component v-if="activeSegment === 'conversations'" ref="conversationComponent"></conversation-component>
            <contact-component v-if="activeSegment === 'contacts'" ref="contactComponent"></contact-component>
        </ion-content>

        <ion-footer collapse="fade">
            <ion-toolbar>
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
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-class-component'
import {IonContent, IonPage, IonHeader, IonToolbar, IonSearchbar, IonLabel, IonSegment, IonSegmentButton, IonFooter} from '@ionic/vue'
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
        ContactComponent,
        IonFooter,
        IonPage
    }
})
export default class OverviewPage extends Vue {
    private activeSegment = 'conversations'

    doFilter(e: CustomEvent): void {
        if (this.activeSegment === 'conversations') {
            (this.$refs.conversationComponent as any).filterConversations(e)
        } else if(this.activeSegment === 'contacts') {
            (this.$refs.contactComponent as any).filterContacts(e)
        }
    }

    segmentChanged(e: CustomEvent): void {
        this.activeSegment = e.detail.value
    }

}
</script>

<style scoped>
ion-content {
    position: fixed;
    /* full height - header + footer */
    height: calc(100% - 56px);
}
ion-footer {
    position: fixed;
    position: -webkit-sticky;
    bottom: 0;
}
</style>
