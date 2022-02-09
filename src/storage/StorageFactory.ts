import {Drivers, Storage} from "@ionic/storage"

export default async function storageFactory(name: string) {
    const storage = new Storage({
        name: name,
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    })
    const storageInstance =await storage.create()

    return {
        instance: storageInstance,
        install(app: any) {
            app.config.globalProperties.$storage = storageInstance
        }
    }
}