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
            <search-contact-component v-if="activeSegment === 'search'" ref="searchContactComponent"></search-contact-component>
        </ion-content>

        <ion-footer collapse="fade">
            <ion-toolbar>
                <ion-segment 
                    @ionChange="segmentChanged" 
                    v-model="activeSegment">
                    <ion-segment-button value="search">
                        <ion-label>search</ion-label>
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
import SearchContactComponent from '@/components/SearchContactComponent.vue'

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
        SearchContactComponent,
        IonFooter,
        IonPage
    }
})
export default class OverviewPage extends Vue {
    private activeSegment = 'conversations'

    doFilter(e: CustomEvent): void {
        if (this.activeSegment === 'conversations') {
            (this.$refs.conversationComponent as any).filterConversations(e)
        } else if(this.activeSegment === 'search') {
            (this.$refs.searchContactComponent as any).filterContacts(e)
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
    top: 48px;
    height: calc(100% - 104px);
}
ion-footer {
    position: fixed;
    position: -webkit-sticky;
    bottom: 0;
}
</style>
