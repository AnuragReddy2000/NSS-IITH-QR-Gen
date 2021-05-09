import React from "react";
import "./EventEdit.css"

interface EventEditProps{
    defaultName: string;
    defaultUrl: string;
    defaultDate: string;
    defaultKey: string;
    defaultId: string;
    buttonText: string;
    onSubmit: Function;
    isReadonly: boolean;
}

interface EventEditState{
    name: string;
    url: string;
    date: string;
    eventkey: string;
}

class EventEdit extends React.Component<EventEditProps, EventEditState>{
    constructor(props: EventEditProps, state: EventEditState){
        super(props, state);
        this.state = {
            name: this.props.defaultName,
            date: this.props.defaultDate,
            url: this.props.defaultUrl,
            eventkey: this.props.defaultKey
        }
    }

    onSubmit = () => {
        this.props.onSubmit(this.state.name, this.state.date, this.state.url, this.state.eventkey, this.props.defaultId);
    }

    render(){
        return(
            <div className="eventEditModal" id={this.props.defaultKey}>
                <div className="eventEditModalLabel">Event Name:</div>
                <textarea id="inputname" className="eventEditModalInput" 
                    rows={1} defaultValue={this.props.defaultName} 
                    style={this.props.isReadonly ? {border:"2px solid darkgrey"}:{border:"2px solid grey"}} 
                    readOnly={this.props.isReadonly} 
                    onChange={(event) => this.setState({name: event.target.value})}></textarea>
                <div className="eventEditModalLabel">Event Date:</div>
                <textarea id="inputdate" className="eventEditModalInput" 
                    rows={1} defaultValue={this.props.defaultDate} 
                    style={this.props.isReadonly ? {border:"2px solid darkgrey"}:{border:"2px solid grey"}} 
                    readOnly={this.props.isReadonly}
                    onChange={(event) => this.setState({date: event.target.value})}></textarea>
                <div className="eventEditModalLabel">Event Url:</div>
                <textarea id="inputurl" className="eventEditModalInput" 
                    rows={6} defaultValue={this.props.defaultUrl} 
                    style={this.props.isReadonly ? {border:"2px solid darkgrey"}:{border:"2px solid grey"}} 
                    readOnly={this.props.isReadonly}
                    onChange={(event) => this.setState({url: event.target.value})}></textarea>
                <div className="eventEditModalLabel">Event Id:</div>
                <input id="inputkey" className="eventEditModalInput" 
                    defaultValue={this.props.defaultId} 
                    style={this.props.isReadonly ? {border:"2px solid darkgrey"}:{border:"2px solid grey"}} 
                    readOnly={true}
                    onChange={()=>{}}></input>
                {this.props.isReadonly ? null : <div className="eventEditButton" onClick={this.onSubmit}>{this.props.buttonText}</div>}
            </div>
        );
    }
} 

export default EventEdit;