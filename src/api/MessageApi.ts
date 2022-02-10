import { AuthApi } from "./Api";
import {Storage} from "@ionic/storage";
import { Chat } from "@/types/Chat";


export class MessageApi extends AuthApi {
    constructor(storage: Storage) {
        super(storage);
    }

    public sendMessage(chat_id: number, content: string): Promise<void> {
        return super.request('message', 'PUT', {
            content,
            chat_id
        });
    }
    
    public async getMessages(chat_id: number, count: number, from?: number): Promise<Chat[] | undefined> {
        const response = await super.request('message/' + chat_id + "/" + (from || "") , 'GET');
        
    }
}