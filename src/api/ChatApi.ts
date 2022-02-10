import {Conversation} from "@/types/Conversation";
import { SearchContact } from "@/types/SearchContact";
import {Storage} from "@ionic/storage";
import {AuthApi} from "./Api";

export class ChatApi extends AuthApi {
    constructor(storage: Storage) {
        super(storage)
    }

    public async getChats(): Promise<Conversation[] | undefined> {
        const chats: Conversation[] | undefined = await super.request<Conversation[] | undefined>('chat', 'GET');
        if (!chats)
            return
        return chats.map(c => {
            return {...c, last_message_date: c.last_message_date && new Date(c.last_message_date as unknown as string)}
        })
    }

    public createChat(contacts: SearchContact[], groupName?: string): Promise<void> {
        return super.request('chat', 'PUT', {
            user_ids: contacts.map(c => c.id),
            admin_user_ids: [],
            name: groupName
        })
    }

    public deleteChats(chatId: number): Promise<void> {
        return super.request('chat', 'DELETE', {chat_id: chatId})
    }
}