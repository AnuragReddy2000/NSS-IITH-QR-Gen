var Cryptr = require('cryptr');

var QRString = "";
var currentKey = "";
var currentFormUrl = "";
var currentEventName = "";
var intervalID;
var crypto;

self.onmessage = async ($event) => {
    if ($event && $event.data && $event.data.msg === 'init') {
        init($event.data.Url, $event.data.Name, $event.data.Key);
    }
    else if ($event && $event.data && $event.data.msg === 'getQR') {
        self.postMessage(QRString);
    }
    else if ($event && $event.data && $event.data.msg === 'exit'){
        exit();
    }
};

let init = (Url, Name, Key) => {
    currentFormUrl = Url;
    currentEventName = Name;
    currentKey = Key;
    console.log("initializing web worker");
    crypto = new Cryptr(Key);
    intervalID = setInterval(()=>{
        QRString = QrKeyGen(currentFormUrl, currentEventName, getKey(currentKey));
        console.log("generated qr payload");
        self.postMessage(QRString);
    },1000)
}

let exit = () => {
    clearInterval(intervalID);
}

let QrKeyGen = (formUrl, eventName, key) => {
    const type = getEventType(formUrl);
    let url_components = formUrl.split("&");
    const urlRegExpResult = RegExp(/[\s\S]*viewform/).exec(url_components[0]);
    let url = formUrl;
    if(urlRegExpResult != null){
        url = urlRegExpResult[0];
        url = url.replace("viewform","formResponse");
    }
    let name = "", email="", ts="", bags = "";
    for (i=1; i<url_components.length; i++){
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
    var payLoad = {
        "event": eventName,
        "type": type,
        "key": key,
        "url": url,
        "name": name,
        "email": email,
        "signature": ts
    };
    if(type === "cid"){
        payLoad["bags"] = bags;
    }
    return JSON.stringify(payLoad);
};

let getEventType = (formUrl)=> {
    if(formUrl.includes("prefilled-bags")){
        return "cid";
    }
    return "default";
}

let getKey = (key) => {
    const datetime = new Date();
    return crypto.encrypt(datetime.toLocaleString());
}