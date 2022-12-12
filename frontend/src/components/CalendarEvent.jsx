import {React, useState, useEffect} from "react";

import {useLocation} from 'react-router-dom';

import Input from "@material-ui/core/Input";
import TextField from "@mui/material/TextField";
import MultipleSelectChip from "./MultipleSelectChip.tsx";
import MultipleSelectChip2 from "./MultipleSelectChip2.tsx";

import Button from '@mui/material/Button';
import SendIcon from "@mui/icons-material/Send";

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export function CalendarEvent (props) {
  
  const [attending, setAttending] = useState(false);
  
  const [event, setEvent] = useState({});

  const sampleEvent = {
    eventName:"Interview Practice Workshop",
    startDate:"2022-12-10 10:00:00",
    endDate:"2022-12-10 16:00:00",
    eventLocation:"JKTC",
    address1:"44 Highland Ave",
    address2:"",
    city:"New Brunswick",
    state:"NJ",
    zip:"34565",
    description:"How to prepare yourself for job interviews, the do's and don'ts of jobs, and mock interviews.",
  };

  const staffNames = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];
  
  const [attendingStudents, setAttendingStudents] = useState([
    {studentID:1,firstName:"Michael",lastName:"Bonano",grade:11,id:1,dob:"2005-02-18T05:00:00.000+00:00"},
    {studentID:2,firstName:"Isobel",lastName:"Jones",grade:11,id:2,dob:"2005-07-22T04:00:00.000+00:00"},
    {studentID:3,firstName:"Henry",lastName:"Mason",grade:16,id:3,dob:"2001-04-25T04:00:00.000+00:00"},
    {studentID:16,firstName:"Bobby",lastName:"Hill",grade:11,id:16,dob:"2003-01-25T05:00:00.000+00:00"},
  ]);

  const [staffDictionary, setStaffDictionary] = useState({
    [1]: {name: 'Oliver Hansen', selected: false},
    [3]: {name: 'Van Henry', selected: false},
    [4]: {name: 'April Tucker', selected: false},
    [7]: {name: 'Ralph Hubbard', selected: false},
    [12]: {name: 'Omar Alexander', selected: false},
    [13]: {name: 'Carlos Abbott', selected: false},
    [17]: {name: 'Miriam Wagner', selected: false},
    [22]: {name: 'Bradley Wilkerson', selected: false},
    [23]: {name: 'Virginia Andrews', selected: false},
    [24]: {name: 'Kelly Snyder', selected: false},
  });

  const mentorNames = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];
  
  const [mentorDictionary, setMentorDictionary] = useState({
    ['Oliver Hansen']: {id: 1, selected: false},
    ['Van Henry']: {id: 3, selected: false},
    ['April Tucker']: {id: 4, selected: false},
    ['Ralph Hubbard']: {id: 7, selected: false},
    ['Omar Alexander']: {id: 12, selected: false},
    ['Carlos Abbott']: {id: 13, selected: false},
    ['Miriam Wagner']: {id: 17, selected: false},
    ['Bradley Wilkerson']: {id: 22, selected: false},
    ['Virginia Andrews']: {id: 23, selected: false},
    ['Kelly Snyder']: {id: 24, selected: false},
  });


  let location = useLocation(); //useEffect will use location.search to get the key to pull data from events table
  
  useEffect(() =>{
    setEvent(sampleEvent);
  }, []||[]);
  
  const handleSubmit = (event) => {
    alert(JSON.stringify(attendingStudents));
  }

  const handleMentorSelected = (value) => {
    if(typeof value === 'string'){
      setMentorDictionary((state) => ({...state, [value]: {...mentorDictionary[value], selected: true}}))
    }else{
      value.map((val) => {
          setMentorDictionary((state) => ({...state, [val]: {...mentorDictionary[val], selected: true}}))
      });
    }
  }

  const attendingChecked = (event) => {
    setAttending(event.target.checked);
  }

  return (
    <div>
      <h1>{event.eventName}</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <TextField id="outlined-basic" label="Start Date" sx={{ m: 1, width: '50ch' }} type="datetime-local" value={event.startDate || ''} variant="outlined" />
          <TextField id="outlined-basic" label="End Date" sx={{ m: 1, width: '50ch' }} type="datetime-local" value={event.endDate || ''}  variant="outlined" />
        </div>

        <div>
          <TextField id="outlined-basic" label="Location" sx={{ m: 1, width: '50ch' }} value={event.eventLocation || ''} variant="outlined" />
        </div>

        <div>
          <TextField id="outlined-basic" label="Address 1" sx={{ m: 1, width: '50ch' }} value={event.address1 || ''} variant="outlined" />
          <TextField id="outlined-basic" label="Address 2" sx={{ m: 1, width: '50ch' }} value={event.address2 || ''} variant="outlined" />
        </div>

        <div>
          <TextField id="outlined-basic" label="City" sx={{ m: 1, width: '50ch' }} value={event.city || ''} variant="outlined" />
          <TextField id="outlined-basic" label="State" sx={{ m: 1, width: '8ch' }} value={event.state || ''} variant="outlined" />
          <TextField id="outlined-basic" label="Zip" sx={{ m: 1, width: '50ch' }} value={event.zip || ''} variant="outlined" />
        </div>

        <div>
          <TextField id="outlined-textarea" label="Description" multiline sx={{ m: 1, width: '120ch' }} value={event.description || ''}/>
        </div>

        <FormControlLabel control={ <Checkbox checked={attending} onChange={attendingChecked} inputProps={{ 'aria-label': 'Attending possibly redundant label' }} /> } label="Attending" />

        <div>
          <h4>Attending Staff</h4>
          
          <MultipleSelectChip{...{label: "Staff", names: staffNames, dictionary: staffDictionary}} />
          
          {/* {MultipleSelectChip({label: "Staff", names: staffNames, dictionary: staffDictionary}) } */}
        </div>

        <div>
          <h4>Attending Mentors</h4>
          
          <MultipleSelectChip2{...{label: "Mentors", names: mentorNames, dictionary: mentorDictionary, dictChange: handleMentorSelected}} />
          
          {/* {MultipleSelectChip2({label: "Mentors", names: mentorNames, dictionary: mentorDictionary, dictChange: handleMentorSelected}) } */}
        </div>

        <div>
          <h4>Attending Students</h4>
          <ul>
            {attendingStudents.map((std) => {
              return(
                <li key={std.id}>{std.firstName} {std.lastName}</li>
              )
            })}
          </ul>
        </div>

        <Button variant="contained" endIcon={<SendIcon />} type="submit">Submit</Button>

      </form>
    </div>
  );
}