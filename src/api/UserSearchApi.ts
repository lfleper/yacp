import {AuthApi} from "./Api";
import {Storage} from "@ionic/storage";
import { SearchContact } from "@/types/SearchContact";


export class UserSearchApi extends AuthApi {
    constructor(storage: Storage) {
        super(storage)
    }

    public async getUsers(searchString: string): Promise<SearchContact[] | undefined> {
        if (searchString === '')
            return 
        return await super.request('user/search/' + searchString, 'GET')
    }

}