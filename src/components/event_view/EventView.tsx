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

    onEdit = (name: string, date: string, url: string, eventkey: string) => {
        this.props.onEdit(name, date, url, eventkey);
        this.toggleModalState();
    }

    toggleShowQR = () =>{
        console.log("toggling");
        this.setState({
            showQR: !this.state.showQR
        });
    }

    render(){
        return(
            <div id={this.props.eventKey}>
                <Modal showModal={this.state.showInfo}>
                    <div className="eventViewModalClose" >
                        <CgCloseO color="darkred" size={27} onClick={this.toggleModalState}/>
                        {this.state.isEditable? <IoArrowBack color="darkblue" size={27} onClick={this.toggleModalEditState}/> : null}
                    </div>
                    <EventEdit key={this.props.url+this.props.name+this.props.eventKey} defaultName={this.props.name} 
                        defaultDate={this.props.date} defaultUrl={this.props.url} defaultKey={this.props.eventKey}
                        onSubmit={this.onEdit} buttonText="Save" isReadonly={!this.state.isEditable}
                    />
                    {this.state.isEditable ? null : <div className="eventViewButtonRow">
                        <div className="eventViewButton" onClick={this.toggleModalEditState}>Edit</div>
                        <div className="eventViewButton" onClick={this.toggleShowQR}>QR Code</div>
                    </div>}
                </Modal>
                <Modal showModal={this.state.showQR}>
                    <div className="eventViewQRBox">
                        <CgCloseO className="eventViewQRClose" size={30} color="darkred" onClick={this.toggleModalState}/>
                        <QR key={this.props.eventKey+this.props.name+this.props.url} eventName={this.props.name} formUrl={this.props.url} eventkey={this.props.eventKey}/>
                    </div>
                </Modal>
                
                <div className="eventViewBox" onClick={this.toggleModalState}>
                    <p className="eventViewTitle" onClick={this.toggleModalState}>{this.props.name}</p>
                    <p className="eventViewDate" onClick={this.toggleModalState}>{this.props.date}</p>
                </div>
            </div>
        );
    }
}

export default EventView;