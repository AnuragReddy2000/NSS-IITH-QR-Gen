import Cryptr from "cryptr";
import { v4 as uuidv4 } from 'uuid';

class QRUtils{

    static QrKeyGen = (formUrl: string, eventName: string, key: string): string => {
        const type = QRUtils.getEventType(formUrl);
        const urlRegExpResult = RegExp(/[\s\S]*viewform/).exec(formUrl);
        let url: string = formUrl;
        if(urlRegExpResult != null){
            url = urlRegExpResult[0];
            url = url.replace("viewform","formResponse");
        }
        let name: string = "";
        const nameRegExpResult = RegExp(/&[\s\S]*prefilled-name/).exec(formUrl);
        if(nameRegExpResult != null){
            name = nameRegExpResult[0];
            name = name.replace("=prefilled-name","");
            name = name.replace("&","");
        }
        let email: string = "";
        const emailRegExpResult = RegExp(/&[\s\S]*prefilled-email/).exec(formUrl);
        if(emailRegExpResult != null){
            email = emailRegExpResult[0];
            email = email.replace("=prefilled-email","");
            email = email.replace("&","");
        }
        let bags: string = "";
        if(type === "cid"){
            const bagsRegExpResult = RegExp(/&[\s\S]*prefilled-bags/).exec(formUrl);
            if(bagsRegExpResult != null){
                bags = bagsRegExpResult[0];
                bags = bags.replace("=prefilled-bags","");
                bags = bags.replace("&","");
            }
        }
        var payLoad: Object = {
            "event": eventName,
            "type": type,
            "key": key,
            "url": url,
            "name": name,
            "email": email
        };;
        if(type === "cid"){
            payLoad = {
                "event": eventName,
                "type": type,
                "key": key,
                "url": url,
                "name": name,
                "email": email,
                "bags": bags
            };
        }
        return JSON.stringify(payLoad);
    }

    static getEventType = (formUrl: string): string => {
        if(formUrl.includes("prefilled-bags")){
            return "cid";
        }
        return "default";
    }

    static getKey = (key: string, timestamp: string): string => {
        const crypto = new Cryptr(key);
        const datetime = new Date();
        return crypto.encrypt(datetime.toLocaleString());
    }

    static getRandomKey = ():string => {
        return uuidv4();
    }
}

export default QRUtils;
