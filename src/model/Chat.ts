
export interface Chat {
    id: string,
    isSender: boolean,
    timestamp: Date;
    type: string, // text || image
    body: string,
    received: boolean,
}

export const test_chats: Chat[] = [
    {
        id: "1",
        isSender: false,
        timestamp: new Date(),
        type: "text",
        body: "Whats uppp?",
        received: true
    },
    {
        id: "1",
        isSender: true,
        timestamp: new Date(),
        type: "text",
        body: "Blub bla blub blub blub blaaaaa",
        received: true
    }
]