import { React, useEffect, useState, useCallback, Fragment } from "react";
import axios from "../services/api";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";

import AlertDialog from "./AlertDialog.jsx";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Icons
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import RevertIcon from "@mui/icons-material/Undo";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { format } from "date-fns";
import CustomKeyboardDatePicker from "./CustomKeyboardDatePicker";

import CustomTableCell2 from "./CustomTableCell2";

export function Timesheets() {
  const [loading, setLoading] = useState(true);

  const [eventAttendees, setEventAttendees] = useState({});
  const [mentors, setMentors] = useState({});
  
  const createData = (id, firstName, lastName, ea) => {

    const attendees = [];
    var sum = 0;
    ea.map((value) => (

      attendees.push(
        {
          id: value.attendeeID,
          rowType: "ea",
          eventID: (value.event != null) ? value.event.eventID : null,      
          mentorID: id,           
		      eventName: (value.event != null) ? value.event.eventName : "",
          eventDate: (value.event != null) ? format(new Date(value.event.eventDate), "MM/dd/yyyy") : format(new Date(), "MM/dd/yyyy"),
          location: (value.event != null) ? value.event.location : "",
          hoursAttended: value.hours,      
          isEditMode: false,
        }
      ),
      sum+=value.hours
    ));

    setOpens((state) => ({ ...state, [id+"m"]: false }));

    return {
      id,
      rowType:"m",
      firstName,
      lastName,
      totalHours: sum,
      attendees,
      isEditMode: false,
    };
  };

  const [fromDate, setFromDate] = useState(new Date("01/01/2022"))
  const [toDate, setToDate] = useState(new Date("12/31/2022"))

  const [mentorRows, setMentorRows] = useState([]);

  const tok = "user:7279142c-d726-4bd8-af64-8f866651cec6";
  const hash = btoa(tok);
  const Basic = "Basic " + hash;

  const headers = {
    "Cache-Control": "no-cache",
    "Accept-Language": "en",
    "Content-Type": "application/json, x-www-form-urlencoded;charset=UTF-8",
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Methods": "DELETE, POST, PUT, GET, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-Requested-With",
    Authorization: `Basic ${hash}`,
  };

  const getAllEventAttendees = useCallback(async () => {
    //need to advance to date 1 month and then subtract one day to make it last day of to month
    const res = await axios.get(`http://localhost:9898/api/eventattendees/timesheets/?from=${format(fromDate, "yyyy-MM")}-01&to=${format(toDate, "yyyy-MM-dd")}`);
    setEventAttendees(res.data);
    console.log(eventAttendees);
  }, [eventAttendees]);

  const getAllMentors = useCallback(async () => {
    const res = await axios.get("http://localhost:9898/api/Mentors/", headers);
    setMentors(res.data);
    
    const newRows = mentors.map((mentor) => {
      return (
        createData(mentor.mentorID, mentor.firstName, mentor.lastName, eventAttendees.filter(item => (item.mentor.mentorID === mentor.mentorID))) //don't need to null check because that's done for this api endpoint
      ); 
    });

    setMentorRows(newRows);
    console.log(mentorRows);

  }, [mentors]);

  
  useEffect(() => {
    console.log("get all events time at " + format(Date.now(), "hh:mm:ss"));
    console.log(fromDate); 
    console.log(toDate);
    console.log(loading); 
    if (loading){
      getAllEventAttendees().then(() => getAllMentors().then(() => setLoading(false)));
    }
    
  }, [getAllEventAttendees, getAllMentors, loading, fromDate, toDate]);

  const [previous, setPrevious] = useState({});

  //const [editRow, setEditRow] = useState({});

  const handleChange = ({ target }, row) => {
    //console.log({target});
    //setEditRow(row);
    const {name, value} = target;
    console.log("handle change called " + name + " " + value);

    if(row.rowType == "m"){
      if (!previous[row.id+row.rowType]) {
        setPrevious((state) => ({ ...state, [row.id+row.rowType]: row }));
      }

      const newRows = mentorRows.map((m) => {
        if (m.id === row.id) {
          console.log(m);
          return { ...m, [name]: value };
        }
        return m;
      });
      setMentorRows(newRows);
    
    }else{

      if (!previous[row.id+row.rowType+row.mentorID+row.parentRowType]) {
        setPrevious((state) => ({ ...state, [row.id+row.rowType+row.mentorID+row.parentRowType]: row }));
      }
        const newRows = mentorRows.map((mentorRow) => {

          if(mentorRow.id === row.mentorID){
            console.log("found mentor");
            const newAttendees = mentorRow.attendees.map((attendee) => {
              if(attendee.id === row.id){
                console.log(attendee)
                return { ...attendee, [name]: value };
              }
              return attendee;
            });
            console.log(newAttendees);
            return { ...mentorRow, attendees: newAttendees };
            
          }
          return mentorRow;
        });
        console.log(newRows);
        setMentorRows(newRows);
        
    }

    // target.preventDefault()
    // const { name, value } = target;
    // setStaff((prevInfo) => ({
    //   ...prevInfo,
    //   [name]: value,
    // }));
    //setEditRow(mentorRows.filter((m) => m.id == row.id)[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //alert(JSON.stringify(staff, "", 2));
  };

  const CustomTableCell = useCallback(({ row, name }) => {
    return (
      <TableCell key={name} align="left">
        {row.isEditMode && name != "firstName" ? (
          <Input value= {(row[name] != null) ? row[name] : ""} name={name} onChange={(e) => handleChange(e, row)} />
        ) : (
          row[name]
        )}
      </TableCell>
    );
  }, [mentorRows]);

  const [opens, setOpens] = useState({});

  const [hasAddRow, setHasAddRow] = useState({});

  const CustomTableRow = useCallback((props) => {

    //console.log(opens);
    //console.log(props);

    return (
      <>
      <TableRow key={props.props.id}>
        <TableCell key={"open"}>
          {(props.props.id != null) ? (
            <IconButton aria-label="expand row" size="small" onClick={() => setOpens((state) => ({ ...state, [props.props.id+props.props.rowType]: !opens[props.props.id+props.props.rowType] }))} >
              {opens[props.props.id+props.props.rowType] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          ) : (
            <></>
          )}
        </TableCell>

        {/* <CustomTableCell key={"fName"} {...{ row: props.props, name: "firstName"}} > </CustomTableCell> */}
        {CustomTableCell({ row: props.props, name: "firstName"}) }
        {/* <CustomTableCell key={"lName"} {...{ row: props.props, name: "lastName"}} > </CustomTableCell> */}
        {CustomTableCell({ row: props.props, name: "lastName"}) }
        {/* <CustomTableCell key={"hrs"} {...{ row: props.props, name: "totalHours"}} > </CustomTableCell> */}
        {CustomTableCell({ row: props.props, name: "totalHours"}) }

        <TableCell key={"icons"}>
          {props.props.isEditMode ? (
            <>
              <IconButton aria-label="save" onClick={() => onSave(props.props.id, props.props.rowType)} >
                <SaveIcon />
              </IconButton>
              <IconButton aria-label="revert" onClick={() => onRevert(props.props.id, props.props.rowType)} >
                <RevertIcon />
              </IconButton>
              <IconButton aria-label="clear total hours" onClick={() => onClear(props.props.id, props.props.rowType)} >
                <ClearIcon />
              </IconButton>
            </>
          ) : (
            <IconButton aria-label="edit" onClick={() => onToggleEditMode(props.props.id, props.props.rowType)} >
              <EditIcon />
            </IconButton>
          )}
        </TableCell>
      </TableRow>
        <TableRow key={"sCont"+props.props.id}> {/*key meaning students container parent id */}
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={opens[props.props.id+props.props.rowType]} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Event Hours
                </Typography>
                <Table size="small" aria-label="events attended">
                  <TableHead>
                    <TableRow>
                      <TableCell>Event Name</TableCell>
                      <TableCell>Event Date</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Hours Attended</TableCell>
                      <TableCell align="right">Actions</TableCell>
                      { !hasAddRow[props.props.id+props.props.rowType] ? (
                        <IconButton aria-label="add new event attended" onClick={() => onAdd("ea", props.props.id, props.props.rowType)} >
                          <AddIcon />
                        </IconButton>
                      ) : (
                        <></>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.props.attendees.map((attendeeRow) => (
                      <TableRow key={attendeeRow.id}>

                        {/* <CustomTableCell {...{ row: attendeeRow, name: "eventName" }} > </CustomTableCell> */}
                        {CustomTableCell({ row: attendeeRow, name: "eventName"}) }
                        {/* <CustomTableCell {...{ row: attendeeRow, name: "eventDate" }} > </CustomTableCell> */}
                        {CustomTableCell({ row: attendeeRow, name: "eventDate"}) }
                        {/* <CustomTableCell {...{ row: attendeeRow, name: "location" }} > </CustomTableCell> */}
                        {CustomTableCell({ row: attendeeRow, name: "location"}) }
                        {/* <CustomTableCell {...{ row: attendeeRow, name: "hoursAttended" }} > </CustomTableCell> */}
                        {CustomTableCell({ row: attendeeRow, name: "hoursAttended"}) }
                        
                        <TableCell align="right">
                          {console.log(attendeeRow)}
                          {attendeeRow.isEditMode ? (
                            <>
                              <IconButton aria-label="save" onClick={() => onSave(attendeeRow.id, attendeeRow.rowType, props.props.id, props.props.rowType)} >
                                <SaveIcon />
                              </IconButton>
                              <IconButton aria-label="revert" onClick={() => onRevert(props.props.id, props.props.rowType)} >
                                <RevertIcon />
                              </IconButton>
                              <IconButton aria-label="delete" onClick={() => onDelete(attendeeRow.id, attendeeRow.rowType, props.props.id, props.props.rowType)} >
                                <DeleteIcon />
                              </IconButton>
                            </>
                          ) : (
                            <IconButton aria-label="edit" onClick={() => {
                              onToggleEditMode(attendeeRow.id, attendeeRow.rowType, props.props.id, props.props.rowType);
                              attendeeRow.isEditMode = true;
                              }  
                            } >
                              <EditIcon />
                            </IconButton>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }, [mentorRows, opens]);

  //using customtablecell2 and customtablerow
  const CustomTableRow2 = useCallback((props) => {

    //console.log(opens);
    //console.log(props);

    return (
      <>
      <TableRow key={props.props.id}>
        <TableCell key={"open"}>
          {(props.props.id != null) ? (
            <IconButton aria-label="expand row" size="small" onClick={() => setOpens((state) => ({ ...state, [props.props.id+props.props.rowType]: !opens[props.props.id+props.props.rowType] }))} >
              {opens[props.props.id+props.props.rowType] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          ) : (
            <></>
          )}
        </TableCell>

        {/* <CustomTableCell key={"fName"} {...{ row: props.props, name: "firstName"}} > </CustomTableCell> */}
        {/* {CustomTableCell2({ row: props.props, name: "firstName", handleFxn: handleChange}) } */}
        <TableCell>{props.props.firstName}</TableCell>
        {/* <CustomTableCell key={"lName"} {...{ row: props.props, name: "lastName"}} > </CustomTableCell> */}
        {/* {CustomTableCell({ row: props.props, name: "lastName"}) } */}
        {/* {CustomTableCell2({ row: props.props, name: "lastName", handleFxn: handleChange}) } */}
        <TableCell>{props.props.lastName}</TableCell>
        {/* <CustomTableCell key={"hrs"} {...{ row: props.props, name: "totalHours"}} > </CustomTableCell> */}
        {CustomTableCell2({ row: props.props, name: "totalHours", handleFxn: handleChange, inputType: "number"}) }

        <TableCell key={"icons"}>
          {props.props.isEditMode ? (
            <>
              <IconButton aria-label="save" onClick={() => onSave(props.props.id, props.props.rowType)} >
                <SaveIcon />
              </IconButton>
              <IconButton aria-label="revert" onClick={() => onRevert(props.props.id, props.props.rowType)} >
                <RevertIcon />
              </IconButton>
              <IconButton aria-label="clear total hours" onClick={() => onClear(props.props.id, props.props.rowType)} >
                <ClearIcon />
              </IconButton>
            </>
          ) : (
            <IconButton aria-label="edit" onClick={() => onToggleEditMode(props.props.id, props.props.rowType)} >
              <EditIcon />
            </IconButton>
          )}
        </TableCell>
      </TableRow>
        <TableRow key={"sCont"+props.props.id}> {/*key meaning students container parent id */}
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={opens[props.props.id+props.props.rowType]} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Event Hours
                </Typography>
                <Table size="small" aria-label="events attended">
                  <TableHead>
                    <TableRow>
                      <TableCell>Event Name</TableCell>
                      <TableCell>Event Date</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Hours Attended</TableCell>
                      <TableCell align="right">Actions</TableCell>
                      { !hasAddRow[props.props.id+props.props.rowType] ? (
                        <IconButton aria-label="add new event attended" onClick={() => onAdd("ea", props.props.id, props.props.rowType)} >
                          <AddIcon />
                        </IconButton>
                      ) : (
                        <></>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.props.attendees.map((attendeeRow) => (
                      <TableRow key={attendeeRow.id}>

                        {/* <CustomTableCell {...{ row: attendeeRow, name: "eventName" }} > </CustomTableCell> */}
                        {CustomTableCell2({ row: attendeeRow, name: "eventName", handleFxn: handleChange}) }
                        {/* <CustomTableCell {...{ row: attendeeRow, name: "eventDate" }} > </CustomTableCell> */}
                        {CustomTableCell2({ row: attendeeRow, name: "eventDate", handleFxn: handleChange}) }
                        {/* <CustomTableCell {...{ row: attendeeRow, name: "location" }} > </CustomTableCell> */}
                        {CustomTableCell2({ row: attendeeRow, name: "location", handleFxn: handleChange}) }
                        {/* <CustomTableCell {...{ row: attendeeRow, name: "hoursAttended" }} > </CustomTableCell> */}
                        {CustomTableCell2({ row: attendeeRow, name: "hoursAttended", handleFxn: handleChange, inputType: "number"}) }
                        
                        <TableCell align="right">
                          {console.log(attendeeRow)}
                          {attendeeRow.isEditMode ? (
                            <>
                              <IconButton aria-label="save" onClick={() => onSave(attendeeRow.id, attendeeRow.rowType, props.props.id, props.props.rowType)} >
                                <SaveIcon />
                              </IconButton>
                              <IconButton aria-label="revert" onClick={() => onRevert(props.props.id, props.props.rowType)} >
                                <RevertIcon />
                              </IconButton>
                              <IconButton aria-label="delete" onClick={() => onDelete(attendeeRow.id, attendeeRow.rowType, props.props.id, props.props.rowType)} >
                                <DeleteIcon />
                              </IconButton>
                            </>
                          ) : (
                            <IconButton aria-label="edit" onClick={() => {
                              onToggleEditMode(attendeeRow.id, attendeeRow.rowType, props.props.id, props.props.rowType);
                              attendeeRow.isEditMode = true;
                              }  
                            } >
                              <EditIcon />
                            </IconButton>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }, [mentorRows, opens]);
 
  const onToggleEditMode = useCallback((id, rowType, parentRowID = "", parentRowType = "") => {

    console.log("just called edit mode")
    if(rowType == "m"){
      setMentorRows(() => {
        return mentorRows.map((row) => {
          if (row.id === id) {
            const attendees = row.attendees.map((attendeeRow) => {
              setPrevious((state) => ({ ...state, [attendeeRow.id+attendeeRow.rowType+parentRowID+rowType.parentRowType]: attendeeRow }));
              return {...attendeeRow, isEditMode: !attendeeRow.isEditMode }
            });
            setOpens((state) => ({ ...state, [id+"m"]: !opens[id+"m"]  }));
            setPrevious((state) => ({ ...state, [row.id+row.rowType]: row}));
            console.log(row.isEditMode);
            return { ...row, isEditMode: !row.isEditMode, attendees: attendees };
          }
          return row;
        });
      });

    }else if(rowType == "ea"){
      console.log(mentorRows);
        setMentorRows(() => {
          return mentorRows.map((row) => {
            if (row.id === parentRowID) {
              
              const updatedAttendees = row.attendees.map((attendeeRow) => {
                if (attendeeRow.id === id) {
                  setPrevious((state) => ({ ...state, [attendeeRow.id+attendeeRow.rowType+parentRowID+rowType.parentRowType]: attendeeRow }));
                  return { ...attendeeRow, isEditMode: !attendeeRow.isEditMode };
                }
                return attendeeRow;
              });
              return { ...row, attendees: updatedAttendees };
            }
            return row;
          });
        });
    }

  }, [mentorRows, previous, opens]);

  const onChange = (e, row) => {

    const value = e.target.value;
    const name = e.target.name;

    console.log(e.target.value);
    console.log(e.target.name);
    console.log(row);

    if(row.rowType == "m"){

      if (!previous[row.id+row.rowType]) {
        setPrevious((state) => ({ ...state, [row.id+row.rowType]: row }));
      }

      const newRows = mentorRows.map((m) => {
        if (m.id === row.id) {
          return { ...m, [name]: value };
        }
        return m;
      });
      setMentorRows(newRows);
    
    }else{

      if (!previous[row.id+row.rowType+row.mentorID+row.parentRowType]) {
        setPrevious((state) => ({ ...state, [row.id+row.rowType+row.mentorID+row.parentRowType]: row }));
      }
        const newRows = mentorRows.map((mentorRow) => {

          if(mentorRow.id === row.mentorID){
            console.log("found mentor");
            const newAttendees = mentorRow.attendees.map((attendee) => {
              if(attendee.id === row.id){
                console.log("found eventAttendee");
                return { ...attendee, [name]: value };
              }
              return attendee;
            });
            console.log(newAttendees);
            return { ...mentorRow, attendees: newAttendees };
            
          }
          return mentorRow;
        });
        console.log(newRows);
        setMentorRows(newRows);
        
    }

  };

  const onAdd = (rowType, parentRowID, parentRowType) => {

    if (rowType == "m"){

      const newMentor = ({
        id: null,
        rowType: "m",
        firstName: "",
        lastName: "",
        DOB: format(new Date(), "MM/dd/yyyy"),
        primaryPhone: "",
        homePhone: "",
        cellPhone: "",
        email: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        students: [],
        isEditMode: true,
        contactID: null,
      });

      setMentorRows([...mentorRows, newMentor]);
      setPrevious((state) => ({ ...state, [null+"m"]: newMentor }));
      setHasAddRow((state) => ({ ...state, ["mGrd"]: true }));

    }else{

      const newEventAttendee = ({
        id: null,
        rowType: "ea",
        eventID: null,
        mentorID: parentRowID,
        eventName: "",
        eventDate: format(new Date(), "MM/dd/yyyy"),
        location: "",
        hoursAttended: 0,
        isEditMode: true,
      });

      setMentorRows((state) => {
          return mentorRows.map((row) => {
            if(row.id == parentRowID){
              return {...row, attendees: [...row.attendees, newEventAttendee]};
            }
            return row;
          });
        });

        setPrevious((state) => ({ ...state, [null+"ea"+parentRowID+parentRowType]: newEventAttendee }));

      
      setHasAddRow((state) => ({ ...state, [parentRowID+parentRowType]: true }));
    }

  };

  const onSave = (sid, rowType, parentRowID = "", parentRowType = "") => {
    console.log("saving row with id " + sid + " parentRowID is " + parentRowID + " row type is " + rowType);
    
    //mentor has no real things to save just going to save all the associated subrows and can't add a new mentor on this screen
    if(rowType == "m"){  
      
      setMentorRows((state) => {
        return mentorRows.map((m) => {
          if(m.id == sid){
            var sum = 0;
            const updatedAttds = m.attendees.map((attendeeRow) =>{
              sum+=attendeeRow.hoursAttended;
              if(attendeeRow.id == null){
                sendPost(attendeeRow, true);
                setHasAddRow((state) => ({ ...state, [parentRowID+parentRowType]: false }));

              }else{
                sendUpdate(attendeeRow, true);

                //remove from previous
                if (previous[attendeeRow.id+"ea"+sid+"m"]) {
                  setPrevious((state) => {
                    delete state[attendeeRow.id+"ea"+sid+"m"];
                    return state;
                  });   
                }
              }
            });
            return {...m, totalHours: sum, attendees: updatedAttds};
          }
          return m;
        });
      });

      //remove from previous
      if (previous[sid+rowType]) {
        setPrevious((state) => {
          delete state[sid+rowType];
          return state;
        });   
      }

    }
    else{ //ea
      
      const updatedMentors = mentorRows.map((m) => {
        if(m.id == parentRowID){
          var sum = 0;
          m.attendees.map((row) => {
            sum+=parseFloat(row.hoursAttended);
            if(row.id == sid){

              if(sid == null){
                sendPost(row);
                setHasAddRow((state) => ({ ...state, [parentRowID+parentRowType]: false }));

              }else{
                sendUpdate(row);

                //remove from previous
                if (previous[sid+rowType+parentRowID+parentRowType]) {
                  setPrevious((state) => {
                    delete state[sid+rowType+parentRowID+parentRowType];
                    return state;
                  });   
                }
              }

              return row;

            }
            return row;
          });
          console.log(sum);
          return {...m, totalHours: sum};
        }
        return m;
      });

      console.log(updatedMentors);
      setMentorRows(updatedMentors);
      console.log(mentorRows);
    }

  onToggleEditMode(sid,rowType, parentRowID, parentRowType);
  };


  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitleText, setDialogTitleText] = useState("");
  const [dialogContentText, setDialogContentText] = useState("");
  const [deleteID, setDeleteID] = useState(0);
  const [deleteType, setDeleteType] = useState("");
  const [deleteParentID, setDeleteParentID] = useState(0);
  const [deleteParentType, setDeleteParentType] = useState("");

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDialogDo = async() => {
    setOpenDialog(false);
    console.log("handleDialogDo called at " + format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSX"));
    if(deleteType == "m"){
      //clearing mentor

      //ended up doing operations of toggleIsEditMode since when it was called at the end of clear total hours wouldn't get reset, plus also save time not having to loop again
      setMentorRows((state) => {
        return mentorRows.map((m) => {
          if(m.id == deleteID){
            console.log(m);
            var cnt = 0;
            const updatedAttds = m.attendees.map((attendeeRow) =>{
              console.log(cnt);
              cnt++;
              console.log(attendeeRow);
              attendeeRow.hoursAttended = 0;
              if(attendeeRow.id == null){
                sendPost(attendeeRow, true);
                setHasAddRow((state) => ({ ...state, [deleteID+deleteType]: false }));

              }else{
                sendUpdate(attendeeRow, true);

                //remove from previous
                if (previous[attendeeRow.id+"ea"+deleteID+"m"]) {
                  setPrevious((state) => {
                    delete state[attendeeRow.id+"ea"+deleteID+"m"];
                    return state;
                  });   
                }
              }
              attendeeRow.isEditMode = false;
              return attendeeRow;
            });
            console.log(updatedAttds);
            return {...m, totalHours: 0, attendees: updatedAttds, isEditMode: false};
          }
          return m;
        });
      });

      //remove from previous
      if (previous[deleteID+deleteType]) {
        setPrevious((state) => {
          delete state[deleteID+deleteType];
          return state;
        });   
      }

      setOpens((state) => ({ ...state, [deleteID+"m"]: !opens[deleteID+"m"]  }));

      alert(`Succesfully Cleared Mentor ${deleteID}`);

    }else if(deleteType == "ea"){
      //deleting eventAttendee

      axios.delete("http://localhost:9898/api/eventattendees/"+deleteID,deleteID,headers).then((res) =>{
        console.log(res);
      });

      setPrevious((state) => {
        delete state[deleteID+deleteType+deleteParentID+deleteParentType];
        return state;
      });

        //deleting targeted eventAttendee
        setMentorRows((state) => {
          return mentorRows.map((row) => {
            if (row.id === deleteParentID) {
              const deletedHours = parseFloat(row.attendees.filter(atd => atd.id == deleteID)[0].hoursAttended);
              console.log(deletedHours);
              row.attendees = row.attendees.filter(atd => atd.id != deleteID);
              return { ...row, attendees: row.attendees, totalHours:  row.totalHours-deletedHours};
            }
            return row;
          });
        });
          
    }

  }

  const onClear = (id, rowType, parentRowID = "", parentRowType = "") => {

    const newRows = mentorRows.map((row) => {
      if (row.id === id) {
        setDialogTitleText(`Clear Total Hours for Mentor ${row.firstName} ${row.lastName}?`);
        setDialogContentText(`This Mentor's Timesheet Hours will be reset to zero for all events they attended for this time period in the database. \n They will still appear as an attendee for these events but with 0 hours.`);
        setDeleteID(id);
        setDeleteType(rowType);
        setOpenDialog(true);
        return row;
      }
      return row;
    });

    };

  const onDelete = (id, rowType, parentRowID = "", parentRowType = "") => {

    setDeleteID(id);
    setDeleteType(rowType);
    setDeleteParentID(parentRowID);
    setDeleteParentType(parentRowType);

    const newRows = mentorRows.map((row) => {
      if (row.id === parentRowID) {
        row.attendees.map((attendeeRow) => {
          if (attendeeRow.id === id){
            setDialogTitleText(`Delete Timesheet for Event ${attendeeRow.eventName} on ${format(new Date(attendeeRow.eventDate), "MM/dd/yyyy")} for Mentor  ${row.firstName} ${row.lastName}?`);
            setDialogContentText(`This Mentor will no longer be an attendee for this event.`);
            setOpenDialog(true);
          }
          return attendeeRow;
        });
        return row;
      }
      return row;
    });
    
  };

  const onRevert = (id, rowType) => {
    
      const newRows = mentorRows.map((row) => {
        if (row.id === id) {
          return previous[id+rowType] ? previous[id+rowType] : row;
        }
        return row;
      });
      setMentorRows(newRows);
      setPrevious((state) => {
        delete state[id+rowType];
        return state;
      });
    
    
    onToggleEditMode(id,rowType);
  };

  const sendPost = async (row, silent = false) => {

    console.log(row);

    if(row.rowType == "m"){
      //saving new mentor
      const mentor = {
        "mentorID": row.id,
        "contact":{
          "primaryPhone": row.primaryPhone,
          "homePhone": row.homePhone,
          "cellPhone": row.cellPhone,
          "email": row.email,
          "address1": row.address1,
          "address2": row.address2,
          "city": row.city,
          "state": row.state,
          "zip": row.zip,
          "id": row.contactID,
          "contactID": row.contactID,},
        "firstName": row.firstName,
        "lastName": row.lastName,
        "id": row.id,
        "dob":format(new Date(row.DOB), "yyyy-MM-dd'T'HH:mm:ss.SSSX"),
        "contactID":row.contactID,  
      }

      const result = await axios.post("http://localhost:9898/api/Mentors/",mentor,headers);
      
      if(result.status == 200){
        setMentorRows((state) => {
          return mentorRows.map((m) => {
            if(m.id === row.id){
              return { ...m, id: result.data.id, contactID: result.data.contact.contactID, isEditMode: false}
            }
            return m;
          });
        });

        if(!silent){
          alert(`New Mentor ${result.data.firstName} ${result.data.lastName} saved successfully.`)
        }
      }else{
        if(!silent){
          alert(`Failed to save Mentor ${row.firstName} ${row.lastName}` + result);
        }
      }

    }else{//ea
      //saving new attendee
      const eventAttendee = {
        "attendeeID": row.id,
        "event":{
          "eventName": row.eventName,
          "eventDate": format(new Date(row.eventDate), "yyyy-MM-dd'T'HH:mm:ss.SSSX"),
          "location": row.location,
          "id": row.eventID,
          "eventID": row.eventID,},
        "mentor":{
          "mentorID": row.mentorID,},
        "id": row.id,
        "hours": row.hoursAttended,
      }
        
      const result = await axios.post("http://localhost:9898/api/eventattendees/mentors/",eventAttendee,headers);

      console.log(result);
      if(result.status == 201){

        //add attendeeID and eventID to newly saved row
        setMentorRows((state) => {
          return mentorRows.map((m) => {
            if((result.data.mentor !== null) ? m.id === result.data.mentor.mentorID : m.id === null){
                
              const atds = m.attendees.map((attendeeRow) => {
                if(attendeeRow.id == row.id){
                  return { ...attendeeRow, id: result.data.id, eventID: result.data.event.eventID, isEditMode: false}
                }
                return attendeeRow;
              });
              return {...m, attendees: atds};
            }
            return m;
          });
        });

        if(!silent){
          alert(`New Timesheet for Event ${result.data.event.eventName} on ${format(new Date(result.data.event.eventDate), "MM/dd/yyyy")} saved successfully.`);
        }

      }else{
        if(!silent){
          alert(`Failed to save Timesheet for Event ${result.data.event.eventName} on ${format(new Date(result.data.event.eventDate), "MM/dd/yyyy")} \n` + result);
        }
      }

    }

  };

  const sendUpdate = async (row, silent = false) => {
    
    console.log(row);
    console.log(silent);

    if(row.rowType == "m"){
      //updating mentors
      const mentor = {
        "mentorID": row.id,
        "contact":{
          "primaryPhone": row.primaryPhone,
          "homePhone": row.homePhone,
          "cellPhone": row.cellPhone,
          "email": row.email,
          "address1": row.address1,
          "address2": row.address2,
          "city": row.city,
          "state": row.state,
          "zip": row.zip,
          "id": row.contactID,
          "contactID": row.contactID,},
        "firstName": row.firstName,
        "lastName": row.lastName,
        "id": row.id,
        "dob":format(new Date(row.DOB), "yyyy-MM-dd'T'HH:mm:ss.SSSX"),
      }

      const result = await axios.put("http://localhost:9898/api/Mentors/",mentor,headers);

      console.log(result);

      if(!silent){
        if(result.status == 200){
          alert(`Updates for Mentor ${result.data.firstName} ${result.data.lastName} saved successfully.`)
        }else{
          alert(`Failed to save updates for Mentor ${row.firstName} ${row.lastName}` + result);
        }
      }

    }else{
      //updating attendees
      //You shouldn’t need to go deeper than resource/identifier/resource. will probably do like /eventattendees/{attendeeID}/mentors/?eventID=x&mentorID=y
      const attendee = {
        "attendeeID": 5,
        "event": null,        
        "staff": null,
        "mentor": null,
        "student": null,
        "parent": null,
        "hours": row.hoursAttended,
        "id": row.id,
      }


      const attendee4 = {
        "attendeeID": row.id,
        "hours": "2",
        "id": row.id,
      }

      const attendee2 = `{"attendeeID":4,"event":null,"staff":null,"mentor":null,"student":null,"parent":null,"hours":2,"id":4}`;
      const attendee3 = `{"attendeeID": 4, "hours": 2, "id": 4}`;

      const stf = `{"staffID":29,"contact":{"primaryPhone":"","homePhone":"","cellPhone":"","email":"","address1":"","address2":"","city":"","state":"","zip":"","id":74,"contactID":74},"firstName":"testAddLimit","lastName":"e","id":29,"dob":"2022-11-12T00:00:00.000-05"}`;

      const m2 = `{"mentorID":-1,"contact":null,"firstName":"Ashley","lastName":"Lall","id":-1,"dob":"2000-08-28T04:00:00.000+00:00"}`;

      //`http://localhost:9898/api/eventattendees/timesheets/?eventID=${row.eventID}&mentorID=${row.mentorID}`
      var result = await axios.put(`http://localhost:9898/api/eventattendees/`,attendee,headers);
    
      console.log(result);
      if(result.status == 200){
          
        if(!silent){
          alert(`Updates to Timesheet for Event ${result.data.event.eventName} on ${format(new Date(result.data.event.eventDate), "MM/dd/yyyy")} saved successfully.`)
        }
      }else{
        if(!silent){
          alert(`Failed to save updates to Timesheet for Event ${result.data.event.eventName} on ${format(new Date(result.data.event.eventDate), "MM/dd/yyyy")}` + result);
        }
      }
      
    }
  }

  const handleDatePicked = (type, setDate) => {
    if(setDate!="Invalid Date"){

      if(type == "from"){
        setFromDate(setDate);
        console.log(setDate);
        setLoading(true);
      }else{
        setToDate(setDate);
        console.log(setDate);
        setLoading(true);
      }

    }

  }

  return (
    <Paper>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialogTitleText}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogContentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconButton style={{color: 'red'}} onClick={handleDialogDo}>{(deleteType == "m") ? ("Clear") : ("Delete") }</IconButton>
          <IconButton onClick={handleCloseDialog}>
            Cancel
          </IconButton>
        </DialogActions>
      </Dialog>
      <h3>
        Timesheets for All Mentors from <CustomKeyboardDatePicker setDate={fromDate} handleFxn={handleDatePicked} type="from"> </CustomKeyboardDatePicker> to <CustomKeyboardDatePicker setDate={toDate} handleFxn={handleDatePicked} type="to"> </CustomKeyboardDatePicker>
      </h3>


      {/* <p>More Basic Date Filter</p>
      <input alt="Home Phone Input Box" class="autocomplete" id="autocomplete-input" name="homePhone" type="date" value={''}/>
      <label for="autocomplete-input">Home Phone</label> */}

      {/* <p>Date Filter</p> */}
      

      {/* <Table aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Total Hours</TableCell>
            <TableCell align="left">Actions</TableCell>       
          </TableRow>
        </TableHead>
        <TableBody>

        {mentorRows.map((row) => (
            <CustomTableRow props={row} />
          ))}

        </TableBody>
      </Table> */}

      {/* <Table aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Total Hours</TableCell>
            <TableCell align="left">Actions</TableCell>       
          </TableRow>
        </TableHead>
        <TableBody>

        {mentorRows.map((m) => (
          <Fragment key={m.id}>
          {CustomTableRow({ props: m })}
          </Fragment>
        ))}  

        </TableBody>
      </Table> */}

      <Table aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Total Hours</TableCell>
            <TableCell align="left">Actions</TableCell>       
          </TableRow>
        </TableHead>
        <TableBody>

        {mentorRows.map((m) => (
          <Fragment key={m.id}>
            {CustomTableRow2({ props: m })}
          </Fragment>
        ))}  

        </TableBody>
      </Table>


      {/* <Table aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Total Hours</TableCell>
            <TableCell align="left">Actions</TableCell>       
          </TableRow>
        </TableHead>
        <TableBody>

        {mentorRows.map((m) => (
          <Fragment key={m.id}>
            {CustomTableRow4({ props: m })}
          </Fragment>
        ))}  

        </TableBody>
      </Table> */}


      {/* <Table aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Total Hours</TableCell>
            <TableCell align="left">Actions</TableCell>       
          </TableRow>
        </TableHead>
        <TableBody>

        {mentorRows.map((row) => (
          <TableRow key={"shit"+row.id}>
            {CustomTableCell({ row: row, name: "lastName"}) }
          </TableRow>
          ))}

        </TableBody>
      </Table> */}


    </Paper>
  );
}
