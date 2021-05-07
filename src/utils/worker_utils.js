var Cryptr = require('cryptr');

var QRString = "";
var currentKey = "";
var currentFormUrl = "";
var currentEventName = "";
var intervalID;

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
    const urlRegExpResult = RegExp(/[\s\S]*viewform/).exec(formUrl);
    let url = formUrl;
    if(urlRegExpResult != null){
        url = urlRegExpResult[0];
        url = url.replace("viewform","formResponse");
    }
    let name = "";
    const nameRegExpResult = RegExp(/&[\s\S]*prefilled-name/).exec(formUrl);
    if(nameRegExpResult != null){
        name = nameRegExpResult[0];
        name = name.replace("=prefilled-name","");
        name = name.replace("&","");
    }
    let email = "";
    const emailRegExpResult = RegExp(/&[\s\S]*prefilled-email/).exec(formUrl);
    if(emailRegExpResult != null){
        email = emailRegExpResult[0];
        email = email.replace("=prefilled-email","");
        email = email.replace("&","");
    }
    let bags = "";
    if(type === "cid"){
        const bagsRegExpResult = RegExp(/&[\s\S]*prefilled-bags/).exec(formUrl);
        if(bagsRegExpResult != null){
            bags = bagsRegExpResult[0];
            bags = bags.replace("=prefilled-bags","");
            bags = bags.replace("&","");
        }
    }
    let ts = "";
    const tsRegExpResult = RegExp(/&[\s\S]*prefilled-signature/).exec(formUrl);
    if(tsRegExpResult != null){
        ts = tsRegExpResult[0];
        ts = ts.replace("=prefilled-signature","");
        ts = ts.replace("&","");
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
    const crypto = new Cryptr(key);
    const datetime = new Date();
    return crypto.encrypt(datetime.toLocaleString());
}