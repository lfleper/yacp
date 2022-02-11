import io from 'socket.io-client'
import {Storage} from "@ionic/storage"
import {Token} from '@/auth/User'
import {SocketChat} from '@/types/Chat'

export type OnNewChatReceived = (chat: SocketChat) => void

export class SocketClient {
    private static _instance: SocketClient
    private storage: Storage
    private token?: Token
    private listeners: OnNewChatReceived[] = []

    private constructor(storage: Storage) {
        this.storage = storage
    }

    public static getInstance(storage: Storage): SocketClient {
        return this._instance || (this._instance = new this(storage))
    }

    public async openSocket(): Promise<void> {
        this.token = await this.storage.get('token')
        if (!this.token)
            throw new Error('token not found')

        const socket = io('wss://tristan-schneider.de:3000', {
            query: {
                token: this.token.token,
                user_id: this.token.user_id
            }
        })

        socket.on('new_message', (data: SocketChat) => {
            this.listeners.forEach(l => {
                console.log(data)
                l(data)
            })
        })
    }

    public addListener(listener: OnNewChatReceived): void {
        this.listeners.push(listener)
    }

}