import React from "react";
import GoogleButton from 'react-google-button'
import { FirebaseUtils } from "../../utils/FirebaseUtils";
import "./Login.css";
import {homepage} from "../../../package.json";

interface LoginState{
    isLoggedIn: boolean,
    isValidUser: boolean,
    showMsg: boolean;
    msg: string;
}

interface LoginProps{
    onLoginSuccess: Function;
    onLogOut: Function;
}

class Login extends React.Component<LoginProps,LoginState>{
    constructor(props: LoginProps, state: LoginState){
        super(props,state);
        this.state = {
            isLoggedIn: FirebaseUtils.isUserLoggedin(),
            isValidUser: false,
            showMsg: FirebaseUtils.isUserLoggedin(),
            msg: "Currently logged in as " + FirebaseUtils.getUser().email + ". Verifying access level, Please wait!"
        }
    }

    async componentDidMount(){
        if(this.state.isLoggedIn && !this.state.isValidUser){
            const result = await FirebaseUtils.isValidTeamMember();
            if(result){
                this.setState({
                    isValidUser: true,
                    showMsg: true,
                    msg: "Login and verification success! Please wait..."
                });
                this.props.onLoginSuccess();
            }
            else{
                this.showMessage("Sorry... You do not have access to this page!");
            }
        }
    }

    showMessage = (message: string) => {
        this.setState({
            showMsg: true,
            msg: message
        });
    }

    logout = async () => {
        this.showMessage("Please wait...");
        FirebaseUtils.logout(() => {
            this.setState({
                isLoggedIn: false,
                isValidUser: false,
                showMsg: true,
                msg: "Logged out!"
            });
            this.props.onLogOut();
        });
    }

    login = async () => {
        FirebaseUtils.login(
            async () => {
                this.setState({
                    isLoggedIn: true,
                    showMsg: true,
                    msg: "Verifying... Please wait..."
                });
                const result = await FirebaseUtils.isValidTeamMember();
                console.log(result);
                if(result){
                    this.setState({
                        showMsg: true,
                        msg: "Login and verification success! Please wait..."
                    });
                    this.props.onLoginSuccess();
                }
                else{
                    this.showMessage("Sorry... You do not have access to this page!");
                }
            },
            () => {
                this.showMessage("Oops... login failed. Please check your network connection")
            }
        );
    }

    render(){
        return(
            <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center",height:"100vh", width:"100%"}}>
                <div className="loginComponent">
                    <img alt="NSS IITH Logo" src={homepage+"/bannerNSS.jpg"} style={{width: 300}}/>
                    <p className="loginTitle">QR Generator</p>
                    {this.state.isLoggedIn ? <GoogleButton label="Log out" onClick={this.logout}/> : <GoogleButton onClick={this.login}/>}
                    {this.state.showMsg ? <p className="loginErrorMsg">{this.state.msg}</p> : null}
                </div>
            </div>
        );
    }
}

export default Login;