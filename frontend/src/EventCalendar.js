import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import styles from 'react-calendar/dist/Calendar.css';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

moment.locale("en-US");
const localizer = momentLocalizer(moment);

export class EventCalendar extends React.Component {
    constructor(props){
      super(props);
  
    }
    
    componentDidMount(){
  
    }
  
    render(){
    return (
      <div className="container">
        <p>Events Calendar</p>
        <Calendar views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        // events={eventsData}
        style={{ height: "100vh" }}
        onSelectEvent={(event) => alert(event.title)}
        // onSelectSlot={handleSelect}
        />
  {/* add actual calendar 
  potentially create route and shit for actual detail calendar event page view */}
      </div>
    );
    }
  }
  
  export default EventCalendar;
  