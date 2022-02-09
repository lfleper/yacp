import {Conversation} from "@/types/Conversation";
import { SearchContact } from "@/types/SearchContact";
import {Storage} from "@ionic/storage";
import {AuthApi} from "./Api";

export class ChatApi extends AuthApi {
    constructor(storage: Storage) {
        super(storage)
    }

    public getChats(): Promise<Conversation[]> {
        return super.request<Conversation[]>('chat', 'GET');
    }

    public createChat(contacts: SearchContact[], groupName?: string): Promise<void> {
        return super.request('chat', 'PUT', {
            user_ids: contacts.map(c => c.id),
            is_group: contacts.length > 1,
            admin_user_ids: [],
            name: groupName
        })
    }

    public deleteChats(chatId: number): Promise<void> {
        return super.request('chat', 'DELETE', {chat_id: chatId})
    }
}