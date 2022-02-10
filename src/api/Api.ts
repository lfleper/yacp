import {Token} from "@/auth/User"
import {Storage} from "@ionic/storage"

const base = "https://tristan-schneider.de:3000/"

export const apiConfig = {
    baseUrl: base + "api/",
    timeout: 30000,
    withCredentials: true,
}
export const apiHeaders: {[key: string]: string} = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
}

export interface ApiIntf {
    request<T>(url: string, method: string, body: object): Promise<T | undefined>
}

export class AuthApi implements ApiIntf {
    private storage: Storage
    private token?: Token

    constructor(storage: Storage) {
        this.storage = storage
    }

    public async request<T>(url: string, method: string, body?: object): Promise<T | undefined> {
        if (!this.token) 
            this.token = await this.storage.get('token')
        if (!this.token)
            throw new Error("no token")
        const headers = apiHeaders;
        headers['User'] = this.token.user_id.toString()
        headers['Bearer-Token'] = this.token.token
        const resp = await fetch(apiConfig.baseUrl + url, {
            method,
            mode: 'cors',
            cache: 'no-cache',
            headers,
            body: body && JSON.stringify(body)
        })
        if (resp.status === 401) {
            const text = await resp.text();
            if(text !== "Token invalid")
                throw new Error('Unauthorized')
                
            const tokenResp = await this.getTokenByRefreshToken()
            if (tokenResp && tokenResp.token ) {
                await this.storage.remove('token')
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

        if (resp.status === 201) {
            return
        }
        return await resp.json()
    }
    
    private getTokenByRefreshToken(): Promise<Token | undefined> {
        return this.request<Token>('user/refresh', 'POST', {
            user_id: this.token?.user_id,
            refresh_token: this.token?.refresh_token
        });
    }
}

export class Api implements ApiIntf {
    public async request<T>(url: string, method: string, body: object): Promise<T> {
        const resp = await fetch(apiConfig.baseUrl + url, {
            method,
            mode: 'cors',
            cache: 'no-cache',
            headers: apiHeaders,
            body: JSON.stringify(body)
        })
        if (!resp.ok) {
            const respText = await resp.text()
            throw new Error(respText)
        }

        return await resp.json()
    } 
}