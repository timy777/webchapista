import * as cryptoJs from 'crypto-js'

export class EncriptacionUtil {
    
    public static secretKey = "fraseSecreta-moduloBase-20240605"; // por default pero obtiene de la BD

    public static encriptarBase64(value: string) {
        return btoa(value);
    }

    public static desencriptarBase64(value: string) {
        return atob(value);
    }

    /**
     * Encrypt
     * @param word 
     * @returns {*}
     */
    public static encrypt(plainText: string): string {
        const key = EncriptacionUtil.getAESKeyFromPassword(EncriptacionUtil.secretKey);
        const encrypted = cryptoJs.AES.encrypt(plainText, key, {
            mode: cryptoJs.mode.ECB,
            padding: cryptoJs.pad.Pkcs7
        });
        return encrypted.toString();
    }
     
    /**
     * Decrypt
     * @param word
     * @returns {*}
     */
    public static decrypt(encryptedText: string): string {
        const key = EncriptacionUtil.getAESKeyFromPassword(EncriptacionUtil.secretKey);
        const decrypted = cryptoJs.AES.decrypt(encryptedText, key, {
            mode: cryptoJs.mode.ECB,
            padding: cryptoJs.pad.Pkcs7
        });
        return decrypted.toString(cryptoJs.enc.Utf8);
    }

    private static getAESKeyFromPassword(password: string): cryptoJs.lib.WordArray {
        return cryptoJs.SHA256(password);
    }
    
}