class QRUtils{

    private static _getEventType = (formUrl: string)=> {
        if(formUrl.includes("prefilled-bags")){
            return "cid";
        }
        return "default";
    }

    static getQRPayload = (formUrl: string, eventName: string, key: string) => {
        const type = QRUtils._getEventType(formUrl);
        let url_components = formUrl.split("&");
        const urlRegExpResult = RegExp(/[\s\S]*viewform/).exec(url_components[0]);
        let url = formUrl;
        if(urlRegExpResult != null){
            url = urlRegExpResult[0];
            url = url.replace("viewform","formResponse");
        }
        let name = "", email="", ts="", bags = "";
        let i = 1;
        for (; i<url_components.length; i++){
            let component = url_components[i]
            if (component.includes("prefilled-name")){
                name = component.replace("=prefilled-name","");
            } else if (component.includes("prefilled-email")){
                email = component.replace("=prefilled-email","");
            } else if (component.includes("prefilled-signature")){
                ts = component.replace("=prefilled-signature","");
            } else {
                bags = component.replace("=prefilled-bags","");
            }
        }
        let payLoad = {
            "event": eventName,
            "type": type,
            "key": key,
            "url": url,
            "name": name,
            "email": email,
            "signature": ts
        } as any;
        if(type === "cid"){
            payLoad["bags"] = bags;
        }
        return JSON.stringify(payLoad);
    };
}

export default QRUtils;