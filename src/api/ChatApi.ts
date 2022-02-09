import {Conversation} from "@/types/Conversation";
import {Storage} from "@ionic/storage";
import {AuthApi} from "./Api";

export class ChatApi extends AuthApi {
    constructor(storage: Storage) {
        super(storage)
    }

    public getChats(): Promise<Conversation[]> {
        return super.request<Conversation[]>("chat", 'GET', {})
    }

    //public deleteChats(token: Token)
}