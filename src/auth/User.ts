export class UserRegistration {
    username: string
    firstname: string
    lastname: string
    eMail: string
    password: string
    confirmPassword: string

    constructor() {
        this.username = ""
        this.firstname = ""
        this.lastname = ""
        this.eMail = ""
        this.password = ""
        this.confirmPassword = ""
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