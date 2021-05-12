import React from "react";
import { QRCode } from "react-qr-svg";
import "./QR.css";
import {homepage} from "../../../package.json";
import Crypto from '../../utils/CryptoUtils';
import QRUtils from "../../utils/QRUtils";

interface QRState{
    time: string;
    isLoading: boolean;
    qrvalue: string;
    cipher: Crypto;
}

interface QRProps{
    eventName: string;
    formUrl: string;
    eventkey: string;
}

class QR extends React.Component<QRProps, QRState>{
    callbackID: NodeJS.Timeout | undefined

    constructor(props: QRProps, state: QRState){
        super(props, state);
        this.state = {
            time: new Date().toLocaleString(),
            isLoading: true,
            qrvalue: "",
            cipher: new Crypto(this.props.eventkey)
        }
    }

    async componentDidMount(){
        this.callbackID = setInterval(()=>{
            this.refreshQR();
        },1000)
    }

    async componentWillUnmount() {
        if (this.callbackID) {
            clearInterval(this.callbackID);
        }
    }

    refreshQR = async () => {
        const datetime = new Date();
        const signature = await this.state.cipher.encrypt(datetime.toLocaleString("en-IN", {"hour12": false}));
        const QRpayload = QRUtils.getQRPayload(this.props.formUrl, this.props.eventName, signature);
        this.setState({
            isLoading: false,
            qrvalue: QRpayload,
            time: datetime.toLocaleString()
        });
    }

    render(){
        return(
            <div className="QRComponent">
                <img alt="NSS IITH Logo" className="bannerSmall" style={{width: 300}} src={homepage+"/bannerSmall.jpg"}></img>
                <div className="eventName">{"Event: " + this.props.eventName}</div>
                <div className="QRIcon">
                    {this.state.isLoading ? null : <QRCode 
                        level={"H"} className="QRCodeImg"
                        value={this.state.qrvalue}
                    />}
                    <div className="bannerNSS">
                        <img alt="NSS IITH Logo" style={{ width:"100%", marginLeft: 20}} src={homepage+"/bannerNSS.jpg"}></img>
                    </div>
                </div>
                {this.state.isLoading ? <div className="QRLoading">Loading...</div> : <p className="eventTime">{"Date and Time: " + this.state.time}</p>}
            </div>
        );
    }
}

export default QR;