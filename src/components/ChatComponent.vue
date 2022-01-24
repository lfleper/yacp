<template>
    <div class="chat-item" :class="chat.isSender ? 'chat-item-sender' : 'chat-item-receiver'">
        <div class="chat-bubble" :class="chat.isSender ? 'chat-bubble-sender' : 'chat-bubble-receiver'">
            {{chat.body}}
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-class-component'
import {Chat} from '@/model/Chat'

@Options({
    props: {
        chat: Object
    }
})
export default class ChatComponent extends Vue {
    private chat!: Chat

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
    background: var(--ion-color-secondary);
}
.chat-bubble-sender {
    background: var(--ion-color-danger);
}
.chat-bubble {
    max-width: 75%;
    border-radius: 20px;
    position: relative;
    padding: 12px 16px;
}
</style>
