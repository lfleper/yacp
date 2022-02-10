import {AuthApi} from "./Api";
import {Storage} from "@ionic/storage";
import {Chat} from "@/types/Chat";


export class MessageApi extends AuthApi {
    constructor(storage: Storage) {
        super(storage)
    }

    public async sendMessage(chat_id: number, content: string): Promise<Chat | undefined> {
        const message: Chat | undefined = await super.request('message', 'PUT', {
            content,
            chat_id
        })
        if (!message)
            return
        return this.toValidChat(message)
    }
    
    public async getMessages(chat_id: number, count: number, from?: number): Promise<Chat[] | undefined> {
        const resp: Chat[] | undefined = await super.request('messages/' + chat_id + '/' + count + '/' + (from || '') , 'GET')
        if (!resp)
            return
        const messages = resp.map(m => {
            return this.toValidChat(m)
        })

        return messages.sort((a: Chat, b: Chat) => {
            return a.timestamp.getTime() - b.timestamp.getTime()
        })
    }

    private toValidChat(c: Chat): Chat {
        return {...c, timestamp: c.timestamp && new Date(c.timestamp)}
    }
}