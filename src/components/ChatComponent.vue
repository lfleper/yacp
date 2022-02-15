<template>
    <div class="chat-item" :class="chat.is_sender ? 'chat-item-sender' : 'chat-item-receiver'">
        <div class="chat-bubble" :class="chat.is_sender ? 'chat-bubble-sender' : 'chat-bubble-receiver'">
            <div v-if="!chat.is_sender && isGroup === 1" class="username">
                {{this.chat.full_name}}
            </div>
            {{chat.content}}
            <div class="chat-time">
                {{time}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-class-component'
import {Chat} from '@/types/Chat'

@Options({
    props: {
        chat: Object,
        isGroup: Number
    }
})
export default class ChatComponent extends Vue {
    private chat!: Chat
    private isGroup!: number

    get time(): string {
        return this.chat.timestamp.toLocaleTimeString([], {timeStyle: 'short'})
    }
}
</script>

<style scoped>
.chat-item {
    display: flex;
    flex-direction: row;
    margin: 7px 0px;
    border-color: transparent;
}
.chat-item-receiver {
    justify-content: flex-start;
}
.chat-item-sender {
    justify-content: flex-end;
}
.chat-bubble-receiver {
    background: var(--bubble-receiver);
}
.chat-bubble-sender {
    background: var(--bubble-sender);
}
.chat-bubble {
    max-width: 75%;
    border-radius: 20px;
    position: relative;
    padding: 12px 16px;
}
.chat-time {
    color: var(--ion-color-dark);
    font-size: 12px;
}
.username {
    color: lightsalmon;
    font-size: 12px;
}
</style>
