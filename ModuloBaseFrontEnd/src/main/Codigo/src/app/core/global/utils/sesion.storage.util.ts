import { EncriptacionUtil } from "./encriptacion.util";


export class SessionStorageUtil {

    // Guarda un valor en sessionStorage
    public static setItem<T>(key: string, value: T): void {
        try {
            const serializedValue = JSON.stringify(value);
            sessionStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error(`Error al guardar el valor en sessionStorage: ${error}`);
        }
    }

    public static setItemEncrypt<T>(key: string, value: T): void {
        console.log('key ', key, ' value: ', value);
        try {
            const serializedValue = JSON.stringify(value);
            sessionStorage.setItem(key, EncriptacionUtil.encrypt(serializedValue));
        } catch (error) {
            console.error(`Error al guardar el valor en sessionStorage: ${error}`);
        }
    }

    // Obtiene un valor de sessionStorage
    public static getItem(key: string) {
        try {
            const serializedValue = sessionStorage.getItem(key);
            if (serializedValue === null) {
                return null;
            }
            return serializedValue;
        } catch (error) {
            console.error(`Error al obtener el valor de sessionStorage: ${error}`);
            return null;
        }
    }

    public static getItemObject<T>(key: string): T | null {
        try {
            const serializedValue = sessionStorage.getItem(key);
            if (serializedValue === null) {
                return null;
            }
            return JSON.parse(serializedValue) as T;
        } catch (error) {
            console.error(`Error al obtener el valor de sessionStorage: ${error}`);
            return null;
        }
    }

    public static getItemDencryt(key: string) {
        console.log('key ', key);
        
        try {
            const serializedValueEncrypt = sessionStorage.getItem(key);
            if (serializedValueEncrypt === null) {
                return null;
            }
            return EncriptacionUtil.decrypt(serializedValueEncrypt);            
        } catch (error) {
            console.error(`Error al obtener el valor de sessionStorage: ${error}`);
            return null;
        }
    }

    public static getItemDencrytObject<T>(key: string): T | null {
        try {
            const serializedValueEncrypt = sessionStorage.getItem(key);
            if (serializedValueEncrypt === null) {
                return null;
            }
            const serializedValue = EncriptacionUtil.decrypt(serializedValueEncrypt);
            return JSON.parse(serializedValue) as T;
        } catch (error) {
            console.error(`Error al obtener el valor de sessionStorage: ${error}`);
            return null;
        }
    }

    // Elimina un valor de sessionStorage
    public static removeItem(key: string): void {
        try {
            sessionStorage.removeItem(key);
        } catch (error) {
            console.error(`Error al eliminar el valor de sessionStorage: ${error}`);
        }
    }

    // Limpia todos los valores de sessionStorage
    public static clear(): void {
        try {
            sessionStorage.clear();
        } catch (error) {
            console.error(`Error al limpiar sessionStorage: ${error}`);
        }
    }

    public static existItem(key: string): boolean {
        return (sessionStorage.getItem(key) !== null);
    }

}