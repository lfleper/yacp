export class UserRegistration {
    username: string
    first_name: string
    last_name: string
    email: string
    password: string
    confirmPassword: string

    constructor() {
        this.username = ""
        this.first_name = ""
        this.last_name = ""
        this.email = ""
        this.password = ""
        this.confirmPassword = ""
    }

    get registrationModel() {
        return {
            username: this.username,
            password: this.password,
            email: this.email,
            first_name: this.first_name,
            last_name: this.last_name
        }
    }
}

export class UserLogin {
    username: string
    password: string

    constructor() {
        this.username = ""
        this.password = ""
    }
}

export interface Token {
    token: string,
    refresh_token: string,
    user_id: number
}