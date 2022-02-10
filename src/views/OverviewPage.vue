<template>
    <ion-page>
        <ion-header translucent>
            <ion-toolbar>
                <ion-searchbar @ionChange="doFilter" v-model="searchbarValue"> 
                </ion-searchbar>

                <ion-buttons slot="end">
                    <ion-button fill="clear" class="menu-btn" id="popover-trigger">
                        <ion-icon :icon="ellipsisVerticalOutline"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-popover trigger="popover-trigger" :dismiss-on-select="true">
                    <ion-item :button="true" @click="signOut">
                        <ion-label>Abmelden</ion-label>
                    </ion-item>
                </ion-popover>
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
import {
    IonContent, IonPage, IonHeader, IonToolbar, IonSearchbar, IonLabel, IonSegment, 
    IonSegmentButton, IonFooter, IonPopover, IonIcon, IonButton, IonItem, IonButtons
} from '@ionic/vue'
import {ellipsisVerticalOutline} from 'ionicons/icons'
import ConversationComponent from '@/components/ConversationComponent.vue'
import SearchContactComponent from '@/components/SearchContactComponent.vue'
import {useRouter} from 'vue-router'

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
        IonPage,
        IonPopover,
        IonIcon,
        IonButton,
        IonItem,
        IonButtons
    }
})
export default class OverviewPage extends Vue {
    private activeSegment = 'conversations'
    private router = useRouter()
    private searchbarValue = '' 

    data() {
        return {
            ellipsisVerticalOutline: ellipsisVerticalOutline
        }
    }

    doFilter(e: CustomEvent): void {
        if (this.activeSegment === 'conversations') {
            (this.$refs.conversationComponent as any).filterConversations(e)
        } else if(this.activeSegment === 'search') {
            (this.$refs.searchContactComponent as any).filterContacts(e)
        }
    }

    async signOut(): Promise<void> {
        await this.$storage.remove('token')
        this.router.push({name: 'Login'})
    }

    async segmentChanged(e: CustomEvent): Promise<void> {
        // clear searchbar input on segment change
        this.searchbarValue = ''
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
.menu-btn {

}
</style>
