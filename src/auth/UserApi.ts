import {Api} from "@/api/Api"
import {Token, UserLogin, UserRegistration} from "./User"

export class UserApi extends Api {
    public register(userRegistration: UserRegistration): Promise<Token> {
        return super.request<Token>('user', 'PUT', userRegistration.registrationModel)
    }

    public login(userLogin: UserLogin): Promise<Token> {
        return super.request<Token>('user/login', 'POST', userLogin)
    }

}