import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./FirebaseConfig";

export class FirebaseUtils {

    private static getFirebaseApp = () => {
        if(typeof window !== 'undefined'){
            return firebase.apps.length ? firebase.apps[0] : firebase.initializeApp(firebaseConfig); 
        }
        return null;
    }

    public static initialize_auth = (callback: Function) => {
        const app = FirebaseUtils.getFirebaseApp();
        app?.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
        app?.auth().onAuthStateChanged((user: any) => {
            if(user){
                callback();
            }
        })
    }

    public static getUser = () => {
        const app = FirebaseUtils.getFirebaseApp();
        return {"name": app?.auth().currentUser?.displayName, "email": app?.auth().currentUser?.email};
    }

    public static isValidTeamMember = async ():Promise<boolean> => {
        if (sessionStorage.getItem("isValidUserLoggedIn") != null){
            return true;
        }
        else{
            try{
                const result = await FirebaseUtils.getPageData("access_list");
                if(result !== {}){
                    sessionStorage.setItem("isValidUserLoggedIn" , "True");
                    return true;
                }
            }
            catch{
                return false;
            }
            return false;
        }
    }

    public static getPageData = async (page: string):Promise<any> => {
        let output: any = {};
        const app = FirebaseUtils.getFirebaseApp();
        const db = app?.firestore().collection("event_records");
        const data = await db?.doc(page).get();
        output = (data) ? data.data() : {};
        return output;
    }

    public static login = (callback:()=>void, onFail:()=>void) => {
        const app = FirebaseUtils.getFirebaseApp();
        let provider = new firebase.auth.GoogleAuthProvider();
        app?.auth().signInWithPopup(provider).then(function(result: any) {
            callback();
        }).catch(function(error: any) {
            alert(error);
            onFail();
        });
    }

    public static logout = (callback:()=>void) => {
        const app = FirebaseUtils.getFirebaseApp();
        app?.auth().signOut().then(function(result: any){
            sessionStorage.removeItem("isValidUserLoggedIn");
            callback();
        }).catch(function(error: any){alert("Oops... failed to logout")});
    }

    public static saveChanges = (currentPage:string, page_data:Object) => {
        const app = FirebaseUtils.getFirebaseApp();
        app?.firestore().collection('event_records').doc(currentPage).set(page_data).then(function(result: any){
            alert("Sucessfully saved to database. Thank you!");
        }).catch(function(error: any){
            alert("Oops... Sorry, unable to save changes. This might have happened because, \n i) You may not have the edit access to the data \n ii) You may not have a stable network");
        })
    }
}
