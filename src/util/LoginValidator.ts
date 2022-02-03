import {UserLogin, UserRegistration} from "@/auth/User"
import {LoginError} from "@/exception/LoginError"
import {RegistrationError} from "@/exception/RegistrationError"

const eMailExpression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const nameExpression = /^[A-Z][-'a-zA-Z]+,?\s[A-Z][-'a-zA-Z]{1,19}$/
const usernameExpression = /^[A-Za-z0-9_-]{3,16}$/

/**
 * Checks if a given e-mail address has a valid format.
 * 
 * @param eMail E-Mail address to be checked.
 * @returns True if valid format.
 */
function isValidEMail(eMail: string): boolean {
    return eMailExpression.test(eMail.toLowerCase())
}

/**
 * Checks if a firstname or lastname has a valid format.
 * 
 * @param name First or lastname to be checked.
 * @returns True if valid format.
 */
function isValidName(name: string): boolean {
    return nameExpression.test(name)
}

/**
 * Check if a username has a valid format.
 * 
 * @param username Username to be checked.
 * @returns True if valid format.
 */
function isValidUsername(username: string): boolean {
    return usernameExpression.test(username)
}

/**
 * Checks if a password has minimum count of 6 characters.
 * 
 * @param password Password to be checked.
 * @returns True if valid.
 */
function isValidPassword(password: string): boolean {
    return password.length >= 6
}

/**
 * Checks if the login form is valid.
 * 
 * @param userLogin UserLogin Form Model.
 */
export function checkValidLogin(userLogin: UserLogin): void {
    if (!isValidUsername(userLogin.username))
        throw new LoginError('invalid username')
    if (!isValidPassword(userLogin.password))
        throw new LoginError('invalid password')
}

/**
 * Checks if the registration form is valid.
 * 
 * @param userRegistration UserRegistration Form Model.
 */
export function checkValidRegistration(userRegistration: UserRegistration): void {
    if (!isValidName(userRegistration.firstname))
        throw new RegistrationError('invalid firstname')
    if (!isValidName(userRegistration.lastname))
        throw new RegistrationError('invalid lastname')
    if (!isValidEMail(userRegistration.eMail)) 
        throw new RegistrationError('invalid e-mail')
    if (userRegistration.password !== userRegistration.confirmPassword)
        throw new RegistrationError('passwords don\'t match')
    if (!isValidPassword(userRegistration.password))
        throw new RegistrationError('invalid password')
}