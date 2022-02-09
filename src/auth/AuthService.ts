import {apiConfig} from "@/api/Api"
import {Token, UserLogin, UserRegistration} from "./User"

export class AuthService {

    public async register(userRegistration: UserRegistration): Promise<Token> {
        const resp = await fetch(apiConfig.baseUrl + "user", {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            headers: apiConfig.headers,
            body: JSON.stringify(userRegistration.registrationModel)
        })

        return resp.json() 
    }

    public async login(userLogin: UserLogin): Promise<Token> {
        const resp = await fetch(apiConfig.baseUrl + "user/login", {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: apiConfig.headers,
            body: JSON.stringify(userLogin)
        })

        return resp.json()
    }

}