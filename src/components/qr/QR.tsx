import React from "react";
import { QRCode } from "react-qr-svg";
import "./QR.css";
import {homepage} from "../../../package.json";

interface QRState{
    time: string;
    isLoading: boolean;
    qrvalue: string;
    worker: Worker;
}

interface QRProps{
    eventName: string;
    formUrl: string;
    eventkey: string;
}

class QR extends React.Component<QRProps, QRState>{
    static callbackID: NodeJS.Timeout
    constructor(props: QRProps, state: QRState){
        super(props, state);
        this.state = {
            time: new Date().toLocaleString(),
            isLoading: true,
            qrvalue: "",
            worker: new Worker("web_worker.js")
        }
    }

    async componentDidMount(){
        this.state.worker.postMessage({
            msg: "init",
            Url: this.props.formUrl,
            Name: this.props.eventName,
            Key: this.props.eventkey
        });
        this.state.worker.onmessage = ($event: MessageEvent) => {
            if ($event && $event.data) {
                this.setState({
                    isLoading: false,
                    qrvalue: $event.data,
                    time: new Date().toLocaleString(),
                });
            }
        };
    }

    async componentWillUnmount(){
        this.state.worker.postMessage({
            msg: "exit"
        });
        this.state.worker.terminate();
    }

    render(){
        return(
            <div className="QRComponent">
                <img alt="NSS IITH Logo" className="bannerSmall" style={{width: 300}} src={homepage+"/bannerSmall.jpg"}></img>
                <div className="eventName">{"Current event: " + this.props.eventName}</div>
                <div className="QRIcon">
                    {this.state.isLoading ? null : <QRCode 
                        level={"H"} 
                        style={{width: 300}} 
                        value={this.state.qrvalue}
                    />}
                    <img alt="NSS IITH Logo" className="bannerNSS" style={{width: 300, marginLeft: 20}} src={homepage+"/bannerNSS.jpg"}></img>
                </div>
                {this.state.isLoading ? <div className="QRLoading">Loading...</div> : null}
                <p className="eventTime">{"Current Date and Time: " + this.state.time}</p>
            </div>
        );
    }
}

export default QR;