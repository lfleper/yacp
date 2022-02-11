export interface Chat {
    id: number,
    timestamp: Date,
    content: string,
    full_name: string,
    is_sender: boolean,
}

export interface SocketChat extends Chat {
    chat_id: number
}