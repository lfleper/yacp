import {Token} from "@/auth/User"
import {Storage} from "@ionic/storage"

const base = "https://tristan-schneider.de:3000/"

export const apiConfig = {
    baseUrl: base + "api/",
    timeout: 30000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
}

export interface ApiIntf {
    request<T>(url: string, method: string, body: object): Promise<T>
}

export class AuthApi implements ApiIntf {
    private storage: Storage
    private token?: Token

    constructor(storage: Storage) {
        this.storage = storage
        this.storage.get('token')
            .then(resp => this.token = resp)
    }

    public async request<T>(url: string, method: string, body: object): Promise<T> {
        console.log(this.token)
        if (this.token === undefined) {
            throw new Error('No token found.')
        }

        body = {...body, token: this.token.token, user_id: this.token.user_id}
        const resp = await fetch(apiConfig.baseUrl + url, {
            method,
            mode: 'cors',
            cache: 'no-cache',
            headers: apiConfig.headers,
            body: JSON.stringify(body)
        })
        if (resp.status === 401) {
            const tokenResp = await this.getTokenByRefreshToken()
            if (tokenResp && tokenResp.token) {
                await this.storage.set('token', tokenResp)
                this.token = tokenResp
                return this.request(url, method, body)
            } else {
                await this.storage.clear()
                throw new Error('unauthorized')
            }
        }
        if (!resp.ok) {
            const respText = await resp.text()
            throw new Error(respText)
        }

        return await resp.json()
    }
    
    private async getTokenByRefreshToken(): Promise<Token> {
        const token = await this.storage.get('token')
        return this.request<Token>('user/refresh', 'POST', {
            user_id: token.user_id,
            refresh_token: token.refresh_token
        })
    }

}

export class Api implements ApiIntf {
    public async request<T>(url: string, method: string, body: object): Promise<T> {
        const resp = await fetch(apiConfig.baseUrl + url, {
            method,
            mode: 'cors',
            cache: 'no-cache',
            headers: apiConfig.headers,
            body: JSON.stringify(body)
        })
        if (!resp.ok) {
            const respText = await resp.text()
            throw new Error(respText)
        }

        return await resp.json()
    } 
}