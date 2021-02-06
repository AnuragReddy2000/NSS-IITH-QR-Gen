import React from "react";
import { QRCode } from "react-qr-svg";
import QRUtils from "../../utils/QRUtils";
import "./QR.css";

interface QRState{
    time: string;
    isLoading: boolean;
    qrvalue: string;
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
            qrvalue: ""
        }
    }

    async componentDidMount(){
        await new Promise(res => setTimeout(res, 700));
        const currentKey = QRUtils.getKey(this.props.eventkey, this.state.time);
        const newQRvalue = QRUtils.QrKeyGen(
            this.props.formUrl, 
            this.props.eventName, 
            currentKey,
        );
        this.setState({
            isLoading:false,
            qrvalue: newQRvalue,
        })
        QR.callbackID =  setInterval(() => {
            const currentKey = QRUtils.getKey(this.props.eventkey, this.state.time);
            const newQRvalue = QRUtils.QrKeyGen(
                this.props.formUrl, 
                this.props.eventName, 
                currentKey,
            );
            this.setState({
                time: new Date().toLocaleString(),
                qrvalue: newQRvalue
            });
        }, 2000);
    }

    async componentWillUnmount(){
        clearInterval(QR.callbackID);
    }

    render(){
        return(
            <div className="QRComponent">
                <img alt="NSS IITH Logo" className="bannerSmall" style={{width: 300}} src={"/bannerSmall.jpg"}></img>
                <div className="eventName">{"Current event: " + this.props.eventName}</div>
                <div className="QRIcon">
                    {this.state.isLoading ? null : <QRCode 
                        level={"H"} 
                        style={{width: 300}} 
                        value={this.state.qrvalue}
                    />}
                    <img alt="NSS IITH Logo" className="bannerNSS" style={{width: 300, marginLeft: 20}} src={"/bannerNSS.jpg"}></img>
                </div>
                {this.state.isLoading ? <div className="QRLoading">Loading...</div> : null}
                <p className="eventTime">{"Current Date and Time: " + this.state.time}</p>
            </div>
        );
    }
}

export default QR;