class Crypto{
    key: CryptoKey | null = null;
    encoder: TextEncoder | null = null;
    decoder: TextDecoder | null = null;
    password: string;
    constructor(password: string){
        this.password = password;
    }

    
    private _getKey = async () => {
        if (this.key == null) {
            this.key = await this._getKeyFromPassword(this.password);
        }
        return this.key;
    }

    private _getKeyFromPassword = async (password: string) => {
        const hash = "SHA-256";
        const iterations = 1000;
        const salt = "Some random salt content";
        const baseKey = await window.crypto.subtle.importKey(
            "raw",
            this._stringToArrayBuffer(password),
            {"name": "PBKDF2"},
            false,
            ["deriveKey"]
        );
        const aesKey = await window.crypto.subtle.deriveKey(
            {
                "name": "PBKDF2",
                "salt": this._stringToArrayBuffer(salt),
                "iterations": iterations,
                "hash": hash
            },
            baseKey,
            {"name": "AES-CBC", "length": 128}, 
            false,                               
            ["encrypt", "decrypt"] 
        );
        return aesKey;
    }

    private _stringToArrayBuffer = (message : string) => {
        if (this.encoder == null){
            this.encoder = new TextEncoder();
        }
        return this.encoder.encode(message);
    }

    private _ArrayBufferTostring = (buffer: ArrayBuffer) => {
        if (this.decoder == null){
            this.decoder = new TextDecoder()
        }
        return this.decoder.decode(buffer);
    }

    private _Uint8stringToArrayBuffer(enc_str: string){
        return new Uint8Array( enc_str.split(",").map((each) => Number(each)) ).buffer
    }

    encrypt = async (message: string) => {
        const aesKey = await this._getKey()
        const enc_msg = await window.crypto.subtle.encrypt(
            {
                name: "AES-CBC",
                //Don't re-use initialization vectors!
                //Always generate a new iv every time your encrypt!
                iv: new Uint8Array(16),
            },
            aesKey, //from generateKey or importKey above
            this._stringToArrayBuffer(message) //ArrayBuffer of data you want to encrypt
        )
        return new Uint8Array(enc_msg).toString();
    }

    decrypt = async (message: string) => {
        const aesKey = await this._getKey();
        const dec_msg = await window.crypto.subtle.decrypt(
            {
                name: "AES-CBC",
                iv: new Uint8Array(16), //The initialization vector you used to encrypt
            },
            aesKey, //from generateKey or importKey above
            this._Uint8stringToArrayBuffer(message) //ArrayBuffer of the data
        )
        return this._ArrayBufferTostring(dec_msg);
    }
}

export default Crypto