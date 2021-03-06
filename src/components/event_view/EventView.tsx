import React from "react";
import EventEdit from "../event_edit/EventEdit";
import Modal from "../modal/Modal";
import "./EventView.css";
import { CgCloseO } from 'react-icons/cg';
import {IoArrowBack} from 'react-icons/io5';
import QR from "../qr/QR";

interface EventState{
    showInfo: boolean;
    isEditable: boolean;
    showQR: boolean;
}

interface EventProps{
    name: string;
    url: string;
    eventKey: string;
    date: string;
    eventId: string;
    onEdit: Function;
}

class EventView extends React.Component<EventProps, EventState>{
    constructor(props: EventProps, state: EventState){
        super(props,state);
        this.state = {
            showInfo: false,
            isEditable: false,
            showQR: false
        }
    }

    componentDidMount(){
        const query_params = window.location.search;
        if (query_params !== ""){
            if (query_params.includes(this.props.eventId)){
                this.setState({
                    showQR: true
                })
            }
        }
    }

    toggleModalState = () => {
        this.setState({
            showInfo: !this.state.showInfo,
            isEditable: false,
            showQR: false
        });
    }

    toggleModalEditState = () => {
        this.setState({
            isEditable: !this.state.isEditable
        });
    }

    onEdit = (name: string, date: string, url: string, eventkey: string, eventId: string) => {
        this.props.onEdit(name, date, url, eventkey, eventId);
        this.toggleModalState();
    }

    toggleShowQR = () =>{
        if (this.state.showQR === false){
            window.history.replaceState({"qr":this.props.eventId}, "", "?qr="+this.props.eventId)
        }
        else{
            const url = new URL(window.location.href);
            url.searchParams.delete("qr");
            window.history.replaceState({}, "", url.href);
        }
        this.setState({
            showQR: !this.state.showQR
        });
    }

    render(){
        return(
            <div id={this.props.eventKey}>
                {this.state.showInfo ? <Modal>
                    <div className="eventViewModalClose" >
                        <CgCloseO color="darkred" size={27} onClick={this.toggleModalState}/>
                        {this.state.isEditable? <IoArrowBack color="darkblue" size={27} onClick={this.toggleModalEditState}/> : null}
                    </div>
                    <EventEdit key={this.props.url+this.props.name+this.props.eventKey} defaultName={this.props.name} 
                        defaultDate={this.props.date} defaultUrl={this.props.url} defaultKey={this.props.eventKey}
                        defaultId = {this.props.eventId} onSubmit={this.onEdit} buttonText="Save" 
                        isReadonly={!this.state.isEditable}
                    />
                    {this.state.isEditable ? null : <div className="eventViewButtonRow">
                        <div className="eventViewButton" onClick={this.toggleModalEditState}>Edit</div>
                        <div className="eventViewButton" onClick={this.toggleShowQR}>QR Code</div>
                    </div>}
                </Modal> : null}
                {this.state.showQR ? <Modal>
                    <div className="eventViewQRBox">
                        <CgCloseO className="eventViewQRClose" size={30} color="darkred" onClick={this.toggleShowQR}/>
                        <QR key={this.props.eventKey+this.props.name+this.props.url} eventName={this.props.name} formUrl={this.props.url} eventkey={this.props.eventKey}/>
                    </div>
                </Modal> : null}
                <div className="eventViewBox" onClick={this.toggleModalState}>
                    <p className="eventViewTitle" onClick={this.toggleModalState}>{this.props.name}</p>
                    <p className="eventViewDate" onClick={this.toggleModalState}>{this.props.date}</p>
                </div>
            </div>
        );
    }
}

export default EventView;