const base = "https://tristan-schneider.de:3000/"

export const apiConfig = {
    baseUrl: base + "api/",
    timeout: 30000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
}