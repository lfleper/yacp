
export interface Conversation {
    id: number,
    name: string,
    last_message?: string,
    last_message_date?: Date,
    last_message_user?: string,
    is_group?: number
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
    },
    {
        id: 5,
        name: "Tristan Schneider",
        last_message: "Was geht?",
        last_message_date: new Date()
    },
    {
        id: 6,
        name: "Henry Sosnitzky",
        last_message: "Wie gehts dir? Wie gehts dir? Wie gehts dir? Wie gehts dir? sdasdasd",
        last_message_date: new Date('2022-01-15T12:30:00')
    },
    {
        id: 7,
        name: "Lukas Fleper",
        last_message: "Morgen 20 Uhr",
        last_message_date: new Date('2022-01-13T08:00:00')
    },
    {
        id: 8,
        name: "Ivayla Dimitrava Marinova",
        last_message: "Hallo.",
        last_message_date: new Date('2022-01-09T08:00:00')
    },
    {
        id: 9,
        name: "Tristan Schneider",
        last_message: "Was geht?",
        last_message_date: new Date()
    },
    {
        id: 10,
        name: "Henry Sosnitzky",
        last_message: "Wie gehts dir? Wie gehts dir? Wie gehts dir? Wie gehts dir? sdasdasd",
        last_message_date: new Date('2022-01-15T12:30:00'),
    },
    {
        id: 11,
        name: "Lukas Fleper",
        last_message: "Morgen 20 Uhr",
        last_message_date: new Date('2022-01-13T08:00:00')
    },
    {
        id: 12,
        name: "Ivayla Dimitrava Marinova",
        last_message: "Hallo.",
        last_message_date: new Date('2022-01-09T08:00:00')
    },
    {
        id: 13,
        name: "Iitrava Marinova",
        last_message: "Hallo.",
        last_message_date: new Date('2022-01-09T08:00:00')
    },
    {
        id: 14,
        name: "asdasdasdahjdkaskj awjhdkas",
        last_message: "Hallo.",
        last_message_date: new Date('2022-01-09T08:00:00')
    }
]