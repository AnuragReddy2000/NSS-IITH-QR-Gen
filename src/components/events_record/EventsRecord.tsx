import React from "react";
import { FirebaseUtils } from "../../utils/FirebaseUtils";
import EventView from "../event_view/EventView";
import './EventsRecord.css';
import {CgAdd, CgCloseO} from "react-icons/cg";
import EventEdit from "../event_edit/EventEdit";
import Modal from "../modal/Modal";
import { v4 as uuidv4 } from 'uuid';
import {homepage} from "../../../package.json";

interface EventModel{
    name: string;
    url: string;
    date: string;
    eventkey: string;
}

interface EventsRecordState{
    events: EventModel[];
    isLoading: boolean;
    createNew: boolean;
}

interface EventsRecordProps{}

class EventsRecord extends React.Component<EventsRecordProps, EventsRecordState>{
    constructor(props: EventsRecordProps, state: EventsRecordState){
        super(props, state);
        this.state = {
            events: [],
            isLoading: true,
            createNew: false
        }
    }

    async componentDidMount(){
        const body = await FirebaseUtils.getPageData("events") as {details: EventModel[]};
        this.setState({
            events: body.details,
            isLoading: false
        });
    }

    onCreate = (name: string, date: string, url: string, eventkey: string)  => {
        const newEvent: EventModel = {
            name: name,
            date: date,
            url: url,
            eventkey: eventkey
        }
        this.state.events.unshift(newEvent);
        FirebaseUtils.saveChanges("events",{"details": this.state.events});
        this.setState({
            createNew: false
        });
    }

    onEdit = (index: number, name: string, date: string, url: string, eventkey: string) => {
        const newEvent: EventModel = {
            name,
            date,
            url,
            eventkey
        }
        const newEvents = this.state.events.map((val) => JSON.parse(JSON.stringify(val)))
        newEvents[index] = newEvent
        this.setState({
            events: newEvents
        });
        FirebaseUtils.saveChanges("events",{"details": this.state.events});
    }

    getRandomKey = ():string => {
        return uuidv4();
    }

    toggleCreateNew = () =>{
        this.setState({
            createNew: !this.state.createNew
        });
    }

    render(){
        return(
            <div className="eventsRecordPage">
                <Modal showModal={this.state.createNew}>
                    <div className="eventsRecordCreateNew">
                        <CgCloseO color="darkred" size={27} style={{alignSelf:"flex-end", marginRight:"10px", marginTop:"5px"}} onClick={this.toggleCreateNew}/>
                        <EventEdit defaultDate="" defaultName="" 
                            defaultUrl="" defaultKey={this.getRandomKey()} 
                            buttonText="Create" isReadonly={false} 
                            onSubmit={this.onCreate}
                        />
                    </div>
                </Modal>
                <div className="eventsRecordTitle">
                    <img alt="NSS IITH Logo" style={{width: 320, marginTop: 15}} src={homepage+"/bannerSmall.jpg"}/>
                    <div className="eventsRecordHeadRow">
                        <div className="eventsRecordHeading">Events Record</div>
                        <div className="eventsRecordAddNew" onClick={this.toggleCreateNew}>
                            <CgAdd className="eventsRecordAddNewIcon" size={22}/>
                            <div className="eventsRecordAddNewTitle">Add New Event</div>
                        </div>
                    </div>
                </div>
                <div className="eventsRecordGrid">
                    {this.state.isLoading ? <div style={{color:"black"}}>
                        Loading please wait...
                    </div>: this.state.events.map( (value, index) => <EventView key={value.eventkey+value.url+value.name}
                            name={value.name} date={value.date} url={value.url} eventKey={value.eventkey}
                            onEdit={(name: string, date: string, 
                                url: string, eventkey: string) => this.onEdit(index, name, date, url, eventkey)}/>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default EventsRecord;