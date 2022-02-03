
export class RegistrationError extends Error {
    constructor(msg: string) {
        super(msg)
        Object.setPrototypeOf(this, RegistrationError.prototype)
    }
}