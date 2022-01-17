
export interface Conversation {
    id: number,
    name: string,
    last_message: string,
    last_message_date: Date
}

export const test_conversations: Conversation[] = [
    {
        id: 1,
        name: "Tristan Schneider",
        last_message: "Was geht?",
        last_message_date: new Date()
    },
    {
        id: 2,
        name: "Henry Sosnitzky",
        last_message: "Wie gehts dir? Wie gehts dir? Wie gehts dir? Wie gehts dir? sdasdasd",
        last_message_date: new Date('2022-01-15T12:30:00')
    },
    {
        id: 3,
        name: "Lukas Fleper",
        last_message: "Morgen 20 Uhr",
        last_message_date: new Date('2022-01-13T08:00:00')
    },
    {
        id: 4,
        name: "Ivayla Dimitrava Marinova",
        last_message: "Hallo.",
        last_message_date: new Date('2022-01-09T08:00:00')
    }
]