(this["webpackJsonpnss-qrgen"]=this["webpackJsonpnss-qrgen"]||[]).push([[0],{15:function(e){e.exports=JSON.parse('{"a":"."}')},35:function(e,t,n){},36:function(e,t,n){},45:function(e,t,n){},47:function(e,t,n){},48:function(e,t,n){},49:function(e,t,n){},56:function(e,t,n){},57:function(e,t,n){},58:function(e,t,n){"use strict";n.r(t);var a=n(5),s=n.n(a),r=n(28),i=n.n(r),o=(n(35),n(7)),c=n(10),l=n(13),u=n(12),d=(n(36),n(4)),p=n.n(d),h=n(8),g=n(22),v=n.n(g),f=n(18),b=(n(42),n(59),{apiKey:"AIzaSyBe7MCEn-_5jNAd286deOqEk8jvxvNX1aw",authDomain:"nss-iith-app.firebaseapp.com",projectId:"nss-iith-app",storageBucket:"nss-iith-app.appspot.com",messagingSenderId:"406717518600",appId:"1:406717518600:web:169bf354467b164f03d2bd",measurementId:"G-L793C8VNSX"}),j=function e(){Object(o.a)(this,e)};j.getFirebaseApp=function(){return"undefined"!==typeof window?f.a.apps.length?f.a.apps[0]:f.a.initializeApp(b):null},j.initialize_auth=function(e){var t=j.getFirebaseApp();null===t||void 0===t||t.auth().setPersistence(f.a.auth.Auth.Persistence.SESSION),null===t||void 0===t||t.auth().onAuthStateChanged((function(t){t&&e()}))},j.getUser=function(){var e,t,n=j.getFirebaseApp();return{name:null===n||void 0===n||null===(e=n.auth().currentUser)||void 0===e?void 0:e.displayName,email:null===n||void 0===n||null===(t=n.auth().currentUser)||void 0===t?void 0:t.email}},j.isValidTeamMember=Object(h.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,j.getPageData("access_list");case 3:if(e.sent==={}){e.next=6;break}return e.abrupt("return",!0);case 6:e.next=11;break;case 8:return e.prev=8,e.t0=e.catch(0),e.abrupt("return",!1);case 11:return e.abrupt("return",!1);case 12:case"end":return e.stop()}}),e,null,[[0,8]])}))),j.getPageData=function(){var e=Object(h.a)(p.a.mark((function e(t){var n,a,s,r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={},a=j.getFirebaseApp(),s=null===a||void 0===a?void 0:a.firestore().collection("event_records"),e.next=5,null===s||void 0===s?void 0:s.doc(t).get();case 5:return r=e.sent,n=r?r.data():{},e.abrupt("return",n);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),j.login=function(e,t){var n=j.getFirebaseApp(),a=new f.a.auth.GoogleAuthProvider;null===n||void 0===n||n.auth().signInWithPopup(a).then((function(t){e()})).catch((function(e){alert(e),t()}))},j.logout=function(e){var t=j.getFirebaseApp();null===t||void 0===t||t.auth().signOut().then((function(t){e()})).catch((function(e){alert("Oops... failed to logout")}))},j.saveChanges=function(e,t){var n=j.getFirebaseApp();null===n||void 0===n||n.firestore().collection("event_records").doc(e).set(t).then((function(e){alert("Sucessfully saved to database. Thank you!")})).catch((function(e){alert("Oops... Sorry, unable to save changes. This might have happened because, \n i) You may not have the edit access to the data \n ii) You may not have a stable network")}))};n(45);var m=n(15),w=n(2),y=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e,a){var s;return Object(o.a)(this,n),(s=t.call(this,e,a)).onLogin=Object(h.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=j.getUser().email,s.setState({isLoggedIn:!0,showMsg:!0,msg:"Verifying user "+t+"... Please wait..."}),e.next=4,j.isValidTeamMember();case 4:e.sent?(s.setState({isValidUser:!0,showMsg:!0,msg:"Login and verification success! Please wait..."}),s.props.onLoginSuccess()):s.showMessage("Sorry... You do not have access to this page!");case 6:case"end":return e.stop()}}),e)}))),s.showMessage=function(e){s.setState({showMsg:!0,msg:e})},s.logout=Object(h.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s.showMessage("Please wait..."),j.logout((function(){s.setState({isLoggedIn:!1,isValidUser:!1,showMsg:!0,msg:"Logged out!"}),s.props.onLogOut()}));case 2:case"end":return e.stop()}}),e)}))),s.login=Object(h.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:j.login(Object(h.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s.onLogin();case 1:case"end":return e.stop()}}),e)}))),(function(){s.showMessage("Oops... login failed. Please check your network connection")}));case 1:case"end":return e.stop()}}),e)}))),j.initialize_auth(s.onLogin),s.state={isLoggedIn:!1,isValidUser:!1,showMsg:!1,msg:"Currently logged in as "+j.getUser().email+". Verifying access level, Please wait!"},s}return Object(c.a)(n,[{key:"componentDidMount",value:function(){var e=Object(h.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.state.isLoggedIn&&!this.state.isValidUser&&this.onLogin();case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(w.jsx)("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"100vh",width:"100%"},children:Object(w.jsxs)("div",{className:"loginComponent",children:[Object(w.jsx)("img",{alt:"NSS IITH Logo",src:m.a+"/bannerNSS.jpg",style:{width:300}}),Object(w.jsx)("p",{className:"loginTitle",children:"QR Generator"}),this.state.isLoggedIn?Object(w.jsx)(v.a,{label:"Log out",onClick:this.logout}):Object(w.jsx)(v.a,{onClick:this.login}),this.state.showMsg?Object(w.jsx)("p",{className:"loginErrorMsg",children:this.state.msg}):null]})})}}]),n}(s.a.Component),O=(n(47),function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e,a){var s;return Object(o.a)(this,n),(s=t.call(this,e,a)).onSubmit=function(){""!==s.state.name&&""!==s.state.date&&""!==s.state.url&&""!==s.state.eventkey?(s.setState({showMsg:!1}),s.props.onSubmit(s.state.name,s.state.date,s.state.url,s.state.eventkey,s.props.defaultId)):s.setState({showMsg:!0})},s.state={name:s.props.defaultName,date:s.props.defaultDate,url:s.props.defaultUrl,eventkey:s.props.defaultKey,showMsg:!1},s}return Object(c.a)(n,[{key:"render",value:function(){var e=this;return Object(w.jsxs)("div",{className:"eventEditModal",id:this.props.defaultKey,children:[Object(w.jsx)("div",{className:"eventEditModalLabel",children:"Event Name:"}),Object(w.jsx)("textarea",{id:"inputname",className:"eventEditModalInput",rows:1,defaultValue:this.props.defaultName,style:this.props.isReadonly?{border:"2px solid darkgrey"}:{border:"2px solid grey"},readOnly:this.props.isReadonly,onChange:function(t){return e.setState({name:t.target.value})}}),Object(w.jsx)("div",{className:"eventEditModalLabel",children:"Event Date:"}),Object(w.jsx)("textarea",{id:"inputdate",className:"eventEditModalInput",rows:1,defaultValue:this.props.defaultDate,style:this.props.isReadonly?{border:"2px solid darkgrey"}:{border:"2px solid grey"},readOnly:this.props.isReadonly,onChange:function(t){return e.setState({date:t.target.value})}}),Object(w.jsx)("div",{className:"eventEditModalLabel",children:"Event Url:"}),Object(w.jsx)("textarea",{id:"inputurl",className:"eventEditModalInput",rows:6,defaultValue:this.props.defaultUrl,style:this.props.isReadonly?{border:"2px solid darkgrey"}:{border:"2px solid grey"},readOnly:this.props.isReadonly,onChange:function(t){return e.setState({url:t.target.value})}}),Object(w.jsx)("div",{className:"eventEditModalLabel",children:"Event Id:"}),Object(w.jsx)("input",{id:"inputkey",className:"eventEditModalInput",defaultValue:this.props.defaultId,style:this.props.isReadonly?{border:"2px solid darkgrey"}:{border:"2px solid grey"},readOnly:!0,onChange:function(){}}),!this.props.isReadonly&&this.state.showMsg?Object(w.jsx)("div",{className:"eventEditModalMsg",children:"Please enter all fields!"}):null,this.props.isReadonly?null:Object(w.jsx)("div",{className:"eventEditButton",onClick:this.onSubmit,children:this.props.buttonText})]})}}]),n}(s.a.Component)),x=(n(48),function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){var e=this.props.showModal?"modal display-block":"modal display-none";return Object(w.jsx)("div",{className:e,children:Object(w.jsx)("section",{className:"modal-main",children:this.props.children})})}}]),n}(s.a.Component)),N=(n(49),n(17)),S=n(30),k=n(29),C=(n(56),function(){function e(t){var n=this;Object(o.a)(this,e),this.key=null,this.encoder=null,this.decoder=null,this.password=void 0,this._getKey=Object(h.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!=n.key){e.next=4;break}return e.next=3,n._getKeyFromPassword(n.password);case 3:n.key=e.sent;case 4:return e.abrupt("return",n.key);case 5:case"end":return e.stop()}}),e)}))),this._getKeyFromPassword=function(){var e=Object(h.a)(p.a.mark((function e(t){var a,s,r,i,o;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="SHA-256",s=1e3,r="Some random salt content",e.next=5,window.crypto.subtle.importKey("raw",n._stringToArrayBuffer(t),{name:"PBKDF2"},!1,["deriveKey"]);case 5:return i=e.sent,e.next=8,window.crypto.subtle.deriveKey({name:"PBKDF2",salt:n._stringToArrayBuffer(r),iterations:s,hash:a},i,{name:"AES-CBC",length:128},!1,["encrypt","decrypt"]);case 8:return o=e.sent,e.abrupt("return",o);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this._stringToArrayBuffer=function(e){return null==n.encoder&&(n.encoder=new TextEncoder),n.encoder.encode(e)},this._ArrayBufferTostring=function(e){return null==n.decoder&&(n.decoder=new TextDecoder),n.decoder.decode(e)},this.encrypt=function(){var e=Object(h.a)(p.a.mark((function e(t){var a,s;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n._getKey();case 2:return a=e.sent,e.next=5,window.crypto.subtle.encrypt({name:"AES-CBC",iv:new Uint8Array(16)},a,n._stringToArrayBuffer(t));case 5:return s=e.sent,e.abrupt("return",new Uint8Array(s).toString());case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.decrypt=function(){var e=Object(h.a)(p.a.mark((function e(t){var a,s;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n._getKey();case 2:return a=e.sent,e.next=5,window.crypto.subtle.decrypt({name:"AES-CBC",iv:new Uint8Array(16)},a,n._Uint8stringToArrayBuffer(t));case 5:return s=e.sent,e.abrupt("return",n._ArrayBufferTostring(s));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.password=t}return Object(c.a)(e,[{key:"_Uint8stringToArrayBuffer",value:function(e){return new Uint8Array(e.split(",").map((function(e){return Number(e)}))).buffer}}]),e}()),I=function e(){Object(o.a)(this,e)};I._getEventType=function(e){return e.includes("prefilled-bags")?"cid":"default"},I.getQRPayload=function(e,t,n){var a=I._getEventType(e),s=e.split("&"),r=RegExp(/[\s\S]*viewform/).exec(s[0]),i=e;null!=r&&(i=(i=r[0]).replace("viewform","formResponse"));for(var o="",c="",l="",u="",d=1;d<s.length;d++){var p=s[d];p.includes("prefilled-name")?o=p.replace("=prefilled-name",""):p.includes("prefilled-email")?c=p.replace("=prefilled-email",""):p.includes("prefilled-signature")?l=p.replace("=prefilled-signature",""):u=p.replace("=prefilled-bags","")}var h={event:t,type:a,key:n,url:i,name:o,email:c,signature:l};return"cid"===a&&(h.bags=u),JSON.stringify(h)};var R=I,E=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e,a){var s;return Object(o.a)(this,n),(s=t.call(this,e,a)).callbackID=void 0,s.refreshQR=Object(h.a)(p.a.mark((function e(){var t,n,a,r,i;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new Date,n=t.getTime(),e.next=4,s.state.cipher.encrypt(t.toLocaleString());case 4:a=e.sent,r=(new Date).getTime(),console.log("The time: "+(r-n).toString()),i=R.getQRPayload(s.props.formUrl,s.props.eventName,a),s.setState({isLoading:!1,qrvalue:i,time:t.toLocaleString()});case 9:case"end":return e.stop()}}),e)}))),s.state={time:(new Date).toLocaleString(),isLoading:!0,qrvalue:"",cipher:new C(s.props.eventkey)},s}return Object(c.a)(n,[{key:"componentDidMount",value:function(){var e=Object(h.a)(p.a.mark((function e(){var t=this;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.callbackID=setInterval((function(){t.refreshQR()}),1e3);case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){var e=Object(h.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.callbackID&&clearInterval(this.callbackID);case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(w.jsxs)("div",{className:"QRComponent",children:[Object(w.jsx)("img",{alt:"NSS IITH Logo",className:"bannerSmall",style:{width:300},src:m.a+"/bannerSmall.jpg"}),Object(w.jsx)("div",{className:"eventName",children:"Event: "+this.props.eventName}),Object(w.jsxs)("div",{className:"QRIcon",children:[this.state.isLoading?null:Object(w.jsx)(k.QRCode,{level:"H",className:"QRCodeImg",value:this.state.qrvalue}),Object(w.jsx)("div",{className:"bannerNSS",children:Object(w.jsx)("img",{alt:"NSS IITH Logo",style:{width:"100%",marginLeft:20},src:m.a+"/bannerNSS.jpg"})})]}),this.state.isLoading?Object(w.jsx)("div",{className:"QRLoading",children:"Loading..."}):null,Object(w.jsx)("p",{className:"eventTime",children:"Date and Time: "+this.state.time})]})}}]),n}(s.a.Component),L=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e,a){var s;return Object(o.a)(this,n),(s=t.call(this,e,a)).toggleModalState=function(){s.setState({showInfo:!s.state.showInfo,isEditable:!1,showQR:!1})},s.toggleModalEditState=function(){s.setState({isEditable:!s.state.isEditable})},s.onEdit=function(e,t,n,a,r){s.props.onEdit(e,t,n,a,r),s.toggleModalState()},s.toggleShowQR=function(){console.log("toggling"),s.setState({showQR:!s.state.showQR})},s.state={showInfo:!1,isEditable:!1,showQR:!1},s}return Object(c.a)(n,[{key:"render",value:function(){return Object(w.jsxs)("div",{id:this.props.eventKey,children:[Object(w.jsxs)(x,{showModal:this.state.showInfo,children:[Object(w.jsxs)("div",{className:"eventViewModalClose",children:[Object(w.jsx)(N.b,{color:"darkred",size:27,onClick:this.toggleModalState}),this.state.isEditable?Object(w.jsx)(S.a,{color:"darkblue",size:27,onClick:this.toggleModalEditState}):null]}),Object(w.jsx)(O,{defaultName:this.props.name,defaultDate:this.props.date,defaultUrl:this.props.url,defaultKey:this.props.eventKey,defaultId:this.props.eventId,onSubmit:this.onEdit,buttonText:"Save",isReadonly:!this.state.isEditable},this.props.url+this.props.name+this.props.eventKey),this.state.isEditable?null:Object(w.jsxs)("div",{className:"eventViewButtonRow",children:[Object(w.jsx)("div",{className:"eventViewButton",onClick:this.toggleModalEditState,children:"Edit"}),Object(w.jsx)("div",{className:"eventViewButton",onClick:this.toggleShowQR,children:"QR Code"})]})]}),Object(w.jsx)(x,{showModal:this.state.showQR,children:Object(w.jsxs)("div",{className:"eventViewQRBox",children:[Object(w.jsx)(N.b,{className:"eventViewQRClose",size:30,color:"darkred",onClick:this.toggleModalState}),Object(w.jsx)(E,{eventName:this.props.name,formUrl:this.props.url,eventkey:this.props.eventKey},this.props.eventKey+this.props.name+this.props.url)]})}),Object(w.jsxs)("div",{className:"eventViewBox",onClick:this.toggleModalState,children:[Object(w.jsx)("p",{className:"eventViewTitle",onClick:this.toggleModalState,children:this.props.name}),Object(w.jsx)("p",{className:"eventViewDate",onClick:this.toggleModalState,children:this.props.date})]})]})}}]),n}(s.a.Component),M=(n(57),n(61)),A=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e,a){var s;return Object(o.a)(this,n),(s=t.call(this,e,a)).onCreate=function(e,t,n,a,r){var i={name:e,date:t,url:n,eventkey:a,eventId:r};s.state.events.unshift(i),j.saveChanges("events",{details:s.state.events}),s.setState({createNew:!1})},s.onEdit=function(e,t,n,a,r,i){var o={name:t,date:n,url:a,eventkey:r,eventId:i},c=s.state.events.map((function(e){return JSON.parse(JSON.stringify(e))}));c[e]=o,s.setState({events:c}),j.saveChanges("events",{details:c})},s.getRandomKey=function(){return Object(M.a)()},s.getNewId=function(){var e=new Date;return e.getDate()+"-"+["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"][e.getMonth()]+"-"+e.getFullYear()+"-"+e.getHours()+"-"+e.getMinutes()+"-"+e.getSeconds()},s.toggleCreateNew=function(){s.setState({createNew:!s.state.createNew})},s.state={events:[],isLoading:!0,createNew:!1},s}return Object(c.a)(n,[{key:"componentDidMount",value:function(){var e=Object(h.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.getPageData("events");case 2:t=e.sent,this.setState({events:t.details,isLoading:!1});case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return Object(w.jsxs)("div",{className:"eventsRecordPage",children:[Object(w.jsx)(x,{showModal:this.state.createNew,children:Object(w.jsxs)("div",{className:"eventsRecordCreateNew",children:[Object(w.jsx)(N.b,{color:"darkred",size:27,style:{alignSelf:"flex-end",marginRight:"10px",marginTop:"5px"},onClick:this.toggleCreateNew}),Object(w.jsx)(O,{defaultDate:"",defaultName:"",defaultUrl:"",defaultKey:this.getRandomKey(),defaultId:this.getNewId(),buttonText:"Create",isReadonly:!1,onSubmit:this.onCreate},this.getRandomKey())]})}),Object(w.jsxs)("div",{className:"eventsRecordTitle",children:[Object(w.jsx)("img",{alt:"NSS IITH Logo",style:{width:320,marginTop:15},src:m.a+"/bannerSmall.jpg"}),Object(w.jsxs)("div",{className:"eventsRecordHeadRow",children:[Object(w.jsx)("div",{className:"eventsRecordHeading",children:"Events Record"}),Object(w.jsxs)("div",{className:"eventsRecordAddNew",onClick:this.toggleCreateNew,children:[Object(w.jsx)(N.a,{className:"eventsRecordAddNewIcon",size:22}),Object(w.jsx)("div",{className:"eventsRecordAddNewTitle",children:"Add New Event"})]})]})]}),Object(w.jsx)("div",{className:"eventsRecordGrid",children:this.state.isLoading?Object(w.jsx)("div",{style:{color:"black"},children:"Loading please wait..."}):this.state.events.map((function(t,n){return Object(w.jsx)(L,{name:t.name,date:t.date,url:t.url,eventKey:t.eventkey,eventId:t.eventId,onEdit:function(t,a,s,r,i){return e.onEdit(n,t,a,s,r,i)}},t.eventId)}))})]})}}]),n}(s.a.Component),T=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e,a){var s;return Object(o.a)(this,n),(s=t.call(this,e,a)).onLoggedIn=function(){s.setState({isValidUserLoggedIn:!0})},s.onLoggedOut=function(){s.setState({isValidUserLoggedIn:!1})},s.state={isValidUserLoggedIn:!1},s}return Object(c.a)(n,[{key:"render",value:function(){return Object(w.jsx)("div",{className:"App",children:Object(w.jsx)("header",{className:"App-header",children:this.state.isValidUserLoggedIn?Object(w.jsx)(A,{}):Object(w.jsx)(y,{onLoginSuccess:this.onLoggedIn,onLogOut:this.onLoggedOut})})})}}]),n}(s.a.Component),U=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,62)).then((function(t){var n=t.getCLS,a=t.getFID,s=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),a(e),s(e),r(e),i(e)}))},D=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function V(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}i.a.render(Object(w.jsx)(s.a.StrictMode,{children:Object(w.jsx)(T,{})}),document.getElementById("root")),U(),function(e){if("serviceWorker"in navigator){if(new URL(".",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat(".","/service-worker.js");D?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):V(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):V(t,e)}))}}()}},[[58,1,2]]]);
//# sourceMappingURL=main.c3b5438e.chunk.js.map