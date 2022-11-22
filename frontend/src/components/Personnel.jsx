import { React, useEffect, useState, useCallback } from "react";
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
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import RevertIcon from "@mui/icons-material/Undo";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { format } from "date-fns";

export function Personnel() {
  const [loading, setLoading] = useState(true);

  const [student, setStudent] = useState({});
  const [staff, setStaff] = useState({});
  const [mentors, setMentors] = useState({});

  //this state replaces need to maintain twinParentID in student rows in order to maintain data uniformity in UI between the representation of a student in the mentors and staff grids
  const [twinRows, setTwinRows] = useState({});
  
  const createData = (firstName, lastName, DOB, contact, id, rowType, stds) => {

    const students = [];
    
    stds.map((value) => (
      
      students.push(
        {
          id: value.studentID,
          rowType: "std",
          parentRowID: id,      
          parentRowType: rowType,     
          firstName: value.firstName,      
          lastName: value.lastName,      
          DOB: format(new Date(value.dob), "MM/dd/yyyy"),      
          grade: value.grade,      
          primaryPhone : (value.contact != null) ? value.contact.primaryPhone : "",      
          homePhone: (value.contact != null) ? value.contact.homePhone : "",      
          cellPhone: (value.contact != null) ? value.contact.cellPhone : "",      
          email: (value.contact != null) ? value.contact.email : "",      
          address1: (value.contact != null) ? value.contact.address1 : "",      
          address2: (value.contact != null) ? value.contact.address2 : "",      
          city: (value.contact != null) ? value.contact.city : "",      
          state: (value.contact != null) ? value.contact.state : "",      
          zip: (value.contact != null) ? value.contact.zip : "",      
          contactID: (value.contact != null) ? value.contact.contactID : "",      
          isEditMode: false,
        }
      ),
      (rowType === "stf") && setTwinRows((state) => ({ ...state, [value.studentID]: ({mentorID: ((value.mentor !== null) ? value.mentor.mentorID : null), staffID: ((value.staff !== null) ? value.staff.staffID : null) })}))
    ));

    setOpens((state) => ({ ...state, [id+rowType]: false }));

    const primaryPhone  = (contact != null) ? contact.primaryPhone : "";
    const homePhone = (contact != null) ? contact.homePhone : "";
    const cellPhone = (contact != null) ? contact.cellPhone : "";
    const email = (contact != null) ? contact.email : "";
    const address1 = (contact != null) ? contact.address1 : "";
    const address2 = (contact != null) ? contact.address2 : "";
    const city = (contact != null) ? contact.city : "";
    const state = (contact != null) ? contact.state : "";
    const zip = (contact != null) ? contact.zip : "";
    const contactID = (contact != null) ? contact.contactID : "";

    return {
      id,
      rowType,
      firstName,
      lastName,
      DOB,
      primaryPhone,
      homePhone,
      cellPhone,
      email,
      address1,
      address2,
      city,
      state,
      zip,
      students,
      isEditMode: false,
      isPlaceholder: false,
      contactID,
    };
  };

  const [rows, setRows] = useState([]);

  const [mentorRows, setMentorRows] = useState([]);

  const tok = "user:7279142c-d726-4bd8-af64-8f866651cec6";
  const hash = btoa(tok);
  const Basic = "Basic " + hash;

  const headers = {
    "Cache-Control": "no-cache",
    "Accept-Language": "en",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Methods": "DELETE, POST, PUT, GET, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-Requested-With",
    Authorization: `Basic ${hash}`,
  };

  const getAllStudents = useCallback(async () => {
    const res = await axios.get("http://localhost:9898/api/Student/");
    setStudent(res.data);
  }, [student]);

  const getAllStaff = useCallback(async () => {
    const res = await axios.get("http://localhost:9898/api/Staff/", headers);
    setStaff(res.data);

    const newRows = staff.map((staffMember) => {
      return (
        createData(staffMember.firstName, staffMember.lastName, format(new Date(staffMember.dob), "MM/dd/yyyy"), staffMember.contact, staffMember.staffID, "stf", student.filter(item => (item.staff !== null) && (item.staff.staffID === staffMember.staffID)))
      ); 
    });

    const unassignedStaffStudents = [];
    
    student.filter(item => item.staff == null).map((value) => (
      unassignedStaffStudents.push(
        {
          id: value.studentID,
          rowType: "std",
          parentRowID: null,
          parentRowType: "stf",
          firstName: value.firstName,
          lastName: value.lastName,
          DOB: format(new Date(value.dob), "MM/dd/yyyy"),
          grade: value.grade,
          primaryPhone : (value.contact != null) ? value.contact.primaryPhone : "",
          homePhone: (value.contact != null) ? value.contact.homePhone : "",
          cellPhone: (value.contact != null) ? value.contact.cellPhone : "",
          email: (value.contact != null) ? value.contact.email : "",
          address1: (value.contact != null) ? value.contact.address1 : "",
          address2: (value.contact != null) ? value.contact.address2 : "",
          city: (value.contact != null) ? value.contact.city : "",
          state: (value.contact != null) ? value.contact.state : "",
          zip: (value.contact != null) ? value.contact.zip : "",
          contactID: (value.contact != null) ? value.contact.contactID : "",
          isEditMode: false,
        }
      ),
      setTwinRows((state) => ({ ...state, [value.studentID]: ({mentorID: ((value.mentor !== null) ? value.mentor.mentorID : null), staffID: ((value.staff !== null) ? value.staff.staffID : null) })}))
    ));

    const staffPlaceholder = ({
      id: null,
      rowType: "stf",
      firstName: "Unassigned Students",
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
      students: unassignedStaffStudents,
      isEditMode: false,
      isPlaceholder: true,
      contactID: null,
    });

    newRows.push(staffPlaceholder);

    setRows(newRows);
  }, [staff]);

  const getAllMentors = useCallback(async () => {
    const res = await axios.get("http://localhost:9898/api/Mentor/", headers);
    setMentors(res.data);

    const newRows = mentors.map((mentor) => {
      return (
        createData(mentor.firstName, mentor.lastName, format(new Date(mentor.dob), "MM/dd/yyyy"), mentor.contact, mentor.mentorID, "m", student.filter(item => (item.mentor !== null) && (item.mentor.mentorID === mentor.mentorID)))
      ); 
    });

    const unassignedMentorStudents = student.filter(item => item.mentor == null).map((value) => ({
      id: value.studentID,
      rowType: "std",
      parentRowID: null,
      parentRowType: "m",
      firstName: value.firstName,
      lastName: value.lastName,
      DOB: format(new Date(value.dob), "MM/dd/yyyy"),
      grade: value.grade,
      primaryPhone : (value.contact != null) ? value.contact.primaryPhone : "",
      homePhone: (value.contact != null) ? value.contact.homePhone : "",
      cellPhone: (value.contact != null) ? value.contact.cellPhone : "",
      email: (value.contact != null) ? value.contact.email : "",
      address1: (value.contact != null) ? value.contact.address1 : "",
      address2: (value.contact != null) ? value.contact.address2 : "",
      city: (value.contact != null) ? value.contact.city : "",
      state: (value.contact != null) ? value.contact.state : "",
      zip: (value.contact != null) ? value.contact.zip : "",
      contactID: (value.contact != null) ? value.contact.contactID : "",
      isEditMode: false,
    }));

    const mentorPlaceholder = ({
      id: null,
      rowType: "m",
      firstName: "Unassigned Students",
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
      students: unassignedMentorStudents,
      isEditMode: false,
      isPlaceholder: true,
      contactID: null,
    });

    newRows.push(mentorPlaceholder);

    setMentorRows(newRows);

  }, [mentors]);

  
  useEffect(() => {
    if (loading){
      getAllStudents().then(() => getAllStaff().then(() => getAllMentors().then(() => setLoading(false))));
    }
    
  }, [getAllStudents, getAllStaff, getAllMentors]);

  const handleChange = ({ target }) => {
    target.preventDefault()
    const { name, value } = target;
    setStaff((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(staff, "", 2));
  };

  const CustomTableCell = ({ row, name, onChange }) => {
 
    return (
      <TableCell align="left">
        {row.isEditMode ? (
          <Input
            value= {(row[name] != null) ? row[name] : ""}
            name={name}
            onChange={(e) => onChange(e, row)}
            //onFocusOut={(e) => onChange(e, row)}
          />
        ) : (
          row[name]
        )}
      </TableCell>
    );
  };

  const [opens, setOpens] = useState({});

  const [hasAddRow, setHasAddRow] = useState({});

  const CustomTableRow = (props) => {

    return (
      <>
      <TableRow key={props.props.id}>
        <TableCell>
          {(props.props.id != null || props.props.isPlaceholder) ? (
            <IconButton aria-label="expand row" size="small" onClick={() => setOpens((state) => ({ ...state, [props.props.id+props.props.rowType]: !opens[props.props.id+props.props.rowType] }))} >
              {opens[props.props.id+props.props.rowType] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          ) : (
            <></>
          )}
        </TableCell>

        <CustomTableCell {...{ row: props.props, name: "firstName", onChange }} > </CustomTableCell>
        <CustomTableCell {...{ row: props.props, name: "lastName", onChange }} > </CustomTableCell>
        <CustomTableCell {...{ row: props.props, name: "DOB", onChange }} > </CustomTableCell>
        <CustomTableCell {...{ row: props.props, name: "primaryPhone", onChange }} > </CustomTableCell>
        <CustomTableCell {...{ row: props.props, name: "homePhone", onChange }} > </CustomTableCell>
        <CustomTableCell {...{ row: props.props, name: "cellPhone", onChange }} > </CustomTableCell>
        <CustomTableCell {...{ row: props.props, name: "email", onChange }} > </CustomTableCell>
        <CustomTableCell {...{ row: props.props, name: "address1", onChange }} > </CustomTableCell>
        <CustomTableCell {...{ row: props.props, name: "address2", onChange }} > </CustomTableCell>
        <CustomTableCell {...{ row: props.props, name: "city", onChange }} > </CustomTableCell>
        <CustomTableCell {...{ row: props.props, name: "state", onChange }} > </CustomTableCell>
        <CustomTableCell {...{ row: props.props, name: "zip", onChange }} > </CustomTableCell>
        
        <TableCell>
          {props.props.isEditMode ? (
            <>
              <IconButton aria-label="save" onClick={() => onSave(props.props.id, props.props.rowType)} >
                <SaveIcon />
              </IconButton>
              <IconButton aria-label="revert" onClick={() => onRevert(props.props.id, props.props.rowType)} >
                <RevertIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={() => onDelete(props.props.id, props.props.rowType)} >
                <DeleteIcon />
              </IconButton>
            </>
          ) : (
            props.props.isPlaceholder ? (
              <></>
            ) : (
            <IconButton aria-label="edit" onClick={() => onToggleEditMode(props.props.id, props.props.rowType)} >
              <EditIcon />
            </IconButton>
            )
          )}
        </TableCell>
      </TableRow>
      <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={opens[props.props.id+props.props.rowType]} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Students
                </Typography>
                <Table size="small" aria-label="students">
                  <TableHead>
                    <TableRow>
                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell align="right">Date of Birth</TableCell>
                      <TableCell align="right">Grade</TableCell>
                      <TableCell align="left">Primary Phone</TableCell>
                      <TableCell align="left">Home Phone</TableCell>
                      <TableCell align="left">Cell Phone</TableCell>
                      <TableCell align="left">Email</TableCell>
                      <TableCell align="left">Address 1</TableCell>
                      <TableCell align="left">Address 2</TableCell>
                      <TableCell align="left">City</TableCell>
                      <TableCell align="left">State</TableCell>
                      <TableCell align="left">Zip</TableCell>
                      <TableCell align="right">Actions</TableCell>
                      { !hasAddRow[props.props.id+props.props.rowType] ? (
                        <IconButton aria-label="add new student" onClick={() => onAdd("std", props.props.id, props.props.rowType)} >
                          <AddIcon />
                        </IconButton>
                      ) : (
                        <></>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.props.students.map((studentsRow) => (
                      <TableRow key={studentsRow.id}>

                        <CustomTableCell {...{ row: studentsRow, name: "firstName", onChange }} > </CustomTableCell>
                        <CustomTableCell {...{ row: studentsRow, name: "lastName", onChange }} > </CustomTableCell>
                        <CustomTableCell {...{ row: studentsRow, name: "DOB", onChange }} > </CustomTableCell>
                        <CustomTableCell {...{ row: studentsRow, name: "grade", onChange }} > </CustomTableCell>
                        <CustomTableCell {...{ row: studentsRow, name: "primaryPhone", onChange }} > </CustomTableCell>
                        <CustomTableCell {...{ row: studentsRow, name: "homePhone", onChange }} > </CustomTableCell>
                        <CustomTableCell {...{ row: studentsRow, name: "cellPhone", onChange }} > </CustomTableCell>
                        <CustomTableCell {...{ row: studentsRow, name: "email", onChange }} > </CustomTableCell>
                        <CustomTableCell {...{ row: studentsRow, name: "address1", onChange }} > </CustomTableCell>
                        <CustomTableCell {...{ row: studentsRow, name: "address2", onChange }} > </CustomTableCell>
                        <CustomTableCell {...{ row: studentsRow, name: "city", onChange }} > </CustomTableCell>
                        <CustomTableCell {...{ row: studentsRow, name: "state", onChange }} > </CustomTableCell>
                        <CustomTableCell {...{ row: studentsRow, name: "zip", onChange }} > </CustomTableCell>
                        
                        <TableCell align="right">
                          {studentsRow.isEditMode ? (
                            <>
                              <IconButton aria-label="save" onClick={() => onSave(studentsRow.id, studentsRow.rowType, props.props.id, props.props.rowType)} >
                                <SaveIcon />
                              </IconButton>
                              <IconButton aria-label="revert" onClick={() => onRevert(props.props.id, props.props.rowType)} >
                                <RevertIcon />
                              </IconButton>
                              <IconButton aria-label="delete" onClick={() => onDelete(studentsRow.id, studentsRow.rowType, props.props.id, props.props.rowType)} >
                                <DeleteIcon />
                              </IconButton>
                              <IconButton aria-label="move student up" onClick={() => moveStudentUp(studentsRow.id, props.props.id, props.props.rowType)} >
                                <KeyboardArrowUpIcon />
                              </IconButton>
                              <IconButton aria-label="move student down" onClick={() => moveStudentDown(studentsRow.id, props.props.id, props.props.rowType)} >
                                <KeyboardArrowDownIcon />
                              </IconButton>
                            </>
                          ) : (
                            <IconButton aria-label="edit" onClick={() => {
                              onToggleEditMode(studentsRow.id, studentsRow.rowType, props.props.id, props.props.rowType);
                              studentsRow.isEditMode = true;
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
  };

  const [previous, setPrevious] = useState({});
 
  const onToggleEditMode = (id, rowType, parentRowID = "", parentRowType = "") => {

    if(rowType == "stf"){

      setRows((state) => {
        return rows.map((row) => {
          if (row.id === id) {
            setPrevious((state) => ({ ...state, [row.id+row.rowType]: row }));
            return { ...row, isEditMode: !row.isEditMode };
          }
          return row;
        });
      });

    }else if(rowType == "m"){
      setMentorRows((state) => {
        return mentorRows.map((row) => {
          if (row.id === id) {
            setPrevious((state) => ({ ...state, [row.id+row.rowType]: row }));
            return { ...row, isEditMode: !row.isEditMode };
          }
          return row;
        });
      });

    }else if(rowType == "std"){
      if(parentRowType == "stf"){
        
        setRows((state) => {
          return rows.map((row) => {
            if (row.id === parentRowID) {

              const updatedStudents = row.students.map((studentRow) => {
                if (studentRow.id === id) {
                  setPrevious((state) => ({ ...state, [studentRow.id+studentRow.rowType+parentRowID+parentRowType]: studentRow }));
                  return { ...studentRow, isEditMode: !studentRow.isEditMode };
                }
                return studentRow;
              });
              return { ...row, students: updatedStudents };
            }
            return row;
          });
        });

      }else{
        setMentorRows((state) => {
          return mentorRows.map((row) => {
            if (row.id === parentRowID) {
              
              const updatedStudents = row.students.map((studentRow) => {
                if (studentRow.id === id) {
                  setPrevious((state) => ({ ...state, [studentRow.id+studentRow.rowType+parentRowID+parentRowType]: studentRow }));
                  return { ...studentRow, isEditMode: !studentRow.isEditMode };
                }
                return studentRow;
              });
              return { ...row, students: updatedStudents };
            }
            return row;
          });
        });

      }
    }

  };

  const onChange = (e, row) => {
    
    const value = e.target.value;
    const name = e.target.name;

    console.log(e.target.value);
    console.log(e.target.name);
    console.log(row);

    if(row.rowType == "stf"){
      if (!previous[row.id+row.rowType]) {
        setPrevious((state) => ({ ...state, [row.id+row.rowType]: row }));
      }

      const newRows = rows.map((stf) => {
        if (stf.id === row.id && !stf.isPlaceholder) {
          return { ...stf, [name]: value };
        }
        return stf;
      });
      setRows(newRows);

    }else if(row.rowType == "m"){

      if (!previous[row.id+row.rowType]) {
        setPrevious((state) => ({ ...state, [row.id+row.rowType]: row }));
      }

      const newRows = mentorRows.map((m) => {
        if (m.id === row.id  && !m.isPlaceholder) {
          return { ...m, [name]: value };
        }
        return m;
      });
      setMentorRows(newRows);
    
    }else if(row.rowType == "std"){

      if (!previous[row.id+row.rowType+row.parentRowID+row.parentRowType]) {
        setPrevious((state) => ({ ...state, [row.id+row.rowType+row.parentRowID+row.parentRowType]: row }));
      }

      if(row.parentRowType == "stf"){
        const newRows = rows.map((staffRow) => {

          if(staffRow.id === row.parentRowID){

            const newStudents = staffRow.students.map((student) => {
              if(student.id === row.id){
                return { ...student, [name]: value };
              }
              return student;
            });

            return { ...staffRow, students: newStudents };
            
          }
          return staffRow;
        });

        setRows(newRows);
        
      }else{
        const newRows = mentorRows.map((mentorRow) => {

          if(mentorRow.id === row.parentRowID){

            const newStudents = mentorRow.students.map((student) => {
              if(student.id === row.id){

                return { ...student, [name]: value };
              }
              return student;
            });

            return { ...mentorRow, students: newStudents };
            
          }
          return mentorRow;
        });
        
        setMentorRows(newRows);
        
      }
    }

  };

  const onAdd = (rowType, parentRowID, parentRowType) => {

    if (rowType == "stf"){

      const newStaff = ({
        id: null,
        rowType: "stf",
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
        isPlaceholder: false,
        contactID: null,
      });

      setRows([...rows, newStaff]);
      setPrevious((state) => ({ ...state, [null+"stf"]: newStaff }));
      setHasAddRow((state) => ({ ...state, ["stfGrd"]: true }));

    }else if (rowType == "m"){

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
        isPlaceholder: false,
        contactID: null,
      });

      setMentorRows([...mentorRows, newMentor]);
      setPrevious((state) => ({ ...state, [null+"m"]: newMentor }));
      setHasAddRow((state) => ({ ...state, ["mGrd"]: true }));

    }else{

      const newStudent = ({
        id: null,
        rowType: "std",
        parentRowID: parentRowID,
        parentRowType: parentRowType,
        firstName: "",
        lastName: "",
        DOB: format(new Date(), "MM/dd/yyyy"),
        grade: 0,
        isEditMode: true,
      });

      if(parentRowType == "stf"){
        setRows((state) => {
          return rows.map((row) => {
            if(row.id == parentRowID){
              return {...row, students: [...row.students, newStudent]};
            }
            return row;
          });
        });
          
        setPrevious((state) => ({ ...state, [null+"std"+parentRowID+parentRowType]: newStudent }));

      }else{  
        setMentorRows((state) => {
          return mentorRows.map((row) => {
            if(row.id == parentRowID){
              return {...row, students: [...row.students, newStudent]};
            }
            return row;
          });
        });

        setPrevious((state) => ({ ...state, [null+"std"+parentRowID+parentRowType]: newStudent }));

      }
      setHasAddRow((state) => ({ ...state, [parentRowID+parentRowType]: true }));
    }

  };

  const onSave = (sid, rowType, parentRowID = "", parentRowType = "") => {

    if(rowType == "stf"){       

      const row = rows.filter(stf => stf.id == sid && !stf.isPlaceholder)[0];

      if(sid == null){
        sendPost(row);
        setHasAddRow((state) => ({ ...state, ["stfGrd"]: false }));

      }else{
        sendUpdate(row);
        
        //remove from previous
        if (previous[sid+rowType]) {
          setPrevious((state) => {
            delete state[sid+rowType];
            return state;
          });   
        }
      }
      
    }
    else if(rowType == "m"){  
      
      const row = mentorRows.filter(m => m.id == sid && !m.isPlaceholder)[0];

      if(sid == null){
        sendPost(row);
        setHasAddRow((state) => ({ ...state, ["mGrd"]: false }));

      }else{
        sendUpdate(row);
        
        //remove from previous
        if (previous[sid+rowType]) {
          setPrevious((state) => {
            delete state[sid+rowType];
            return state;
          });   
        }
      }

    }
    else{ //std unless 4th type created
      
      if(parentRowType == "stf"){

        const row = rows.filter(stf => stf.id == parentRowID)[0].students.filter(std => std.id == sid)[0];
        console.log(rows);
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

      }else{ //"m" unless third type made

        const row = mentorRows.filter(m => m.id == parentRowID)[0].students.filter(std => std.id == sid)[0];

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
        
      }
      
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

  const handleDialogDelete = async() => {
    setOpenDialog(false);

    if(deleteType == "stf"){
      //deleting staff member

      //reassigning of staffStudents in db is done in StaffController.DeleteStaff
      const result = await axios.delete("http://localhost:9898/api/Staff/"+deleteID,deleteID,headers);

      console.log(result);
      if(result.status == 200){
        //still need to actually reassign twinRowsID -> null for the mentorStudent twin counterparts, 
        const newRows = rows.filter(row => row.id != deleteID);
        const staffStudents = rows.filter(row => row.id == deleteID)[0].students;

        setRows((state) => {
          return newRows.map((row) => {
            if(row.isPlaceholder){
              staffStudents.map((studentRow) => {
                studentRow.parentRowID = null;
                setTwinRows((state) => ({ ...state, [studentRow.id]: {mentorID: twinRows[studentRow.id].mentorID, staffID: null} }));
                row.students.push(studentRow);
              });
              return row;
            }
            return row;       
          });
        });
      
        setPrevious((state) => {
          delete state[deleteID+deleteType];
          return state;
        });      

        alert(`Succesfully Deleted Staff Member ${deleteID}`);
      }else{
        alert(`Failed to ${dialogTitleText} \n ${result.statusText}`);
      }

    }else if(deleteType == "m"){
      //deleting mentor

      //reassigning of mentorStudents in db is done in MentorController.DeleteMentor
      const result = await axios.delete("http://localhost:9898/api/Mentor/"+deleteID,deleteID,headers);

      console.log(result);
      if(result.status == 200){
        //still need to actually reassign twinRowsID -> null for the staffStudent twin counterparts, 
        const newRows = mentorRows.filter(mtr => mtr.id != deleteID);
        const mentorStudents = mentorRows.filter(mtr => mtr.id == deleteID)[0].students;

        setMentorRows((state) => {
          return newRows.map((row) => {
            if(row.isPlaceholder){
              mentorStudents.map((studentRow) => {
                studentRow.parentRowID = null;
                setTwinRows((state) => ({ ...state, [studentRow.id]: {mentorID: null, staffID: twinRows[studentRow.id].staffID} }));
                row.students.push(studentRow);
              });
              return row;
            }
            return row;       
          });
        });
      
        setPrevious((state) => {
          delete state[deleteID+deleteType];
          return state;
        });      

        alert(`Succesfully Deleted Mentor ${deleteID}`);
      }else{
        alert(`Failed to ${dialogTitleText} \n ${result.statusText}`);
      }

    }else if(deleteType == "std"){
      //deleting students

      axios.delete("http://localhost:9898/api/Student/"+deleteID,deleteID,headers).then((res) =>{
        console.log(res);
      });

      setPrevious((state) => {
        delete state[deleteID+deleteType+deleteParentID+deleteParentType];
        return state;
      });

      if(deleteParentType == "stf"){

        //deleting twin previous
        setPrevious((state) => {
          delete state[deleteID+deleteType+twinRows[deleteID].mentorID+"m"];
          return state;
        });

        //deleting targeted student
        setRows((state) => {
          return rows.map((row) => {
            if (row.id === deleteParentID) {
              row.students = row.students.filter(std => std.id != deleteID);
              return { ...row, students: row.students };
            }
            return row;
          });
        });

        //deleting twin
        setMentorRows((state) => {
          return mentorRows.map((row) => {
            
            if (row.id === twinRows[deleteID].mentorID) {
              row.students = row.students.filter(std => std.id != deleteID);
              return { ...row, students: row.students };
            }
            return row;
          });
        });

      }else{

        //deleting twin previous
        setPrevious((state) => {
          delete state[deleteID+deleteType+twinRows[deleteID].staffID+"std"];
          return state;
        });

        //deleting targeted student
        setMentorRows((state) => {
          return mentorRows.map((row) => {
            if (row.id === deleteParentID) {
              row.students = row.students.filter(std => std.id != deleteID);
              return { ...row, students: row.students };
            }
            return row;
          });
        });

        //deleting twin
        setRows((state) => {
          return rows.map((row) => {
            if (row.id === twinRows[deleteID].staffID) {
              row.students = row.students.filter(std => std.id != deleteID);
              return { ...row, students: row.students };
            }
            return row;
          });
        });

      }
      
    }

  }

  const onDelete = (id, rowType, parentRowID = "", parentRowType = "") => {

    if(rowType == "stf"){       
      
      const newRows = rows.map((row) => {
        if (row.id === id) {
          setDialogTitleText(`Delete Staff Member ${row.firstName} ${row.lastName}?`);
          setDialogContentText(`This Staff Member will be removed from the database. \n Their students will be considered staff member unassigned.`);
          setDeleteID(id);
          setDeleteType(rowType);
          setOpenDialog(true);
          return row;
        }
        return row;
      });

    }
    else if(rowType == "m"){  

      const newRows = mentorRows.map((row) => {
        if (row.id === id) {
          setDialogTitleText(`Delete Mentor ${row.firstName} ${row.lastName}?`);
          setDialogContentText(`This Mentor will be removed from the database. \n Their students will be considered mentor unassigned.`);
          setDeleteID(id);
          setDeleteType(rowType);
          setOpenDialog(true);
          return row;
        }
        return row;
      });
      
    }
    else if(rowType == "std"){

      setDeleteID(id);
      setDeleteType(rowType);
      setDeleteParentID(parentRowID);
      setDeleteParentType(parentRowType);

      if(parentRowType == "stf"){

        const newRows = rows.map((row) => {
          if (row.id === parentRowID) {
            row.students.map((studentRow) => {
              if (studentRow.id === id){
                setDialogTitleText(`Delete Student ${studentRow.firstName} ${studentRow.lastName}?`);
                setDialogContentText(`This Student will be removed from the database.`);
                setOpenDialog(true);
              }
              return studentRow;
            });
            return row;
          }
          return row;
        });
      
      }else if(parentRowType = "m"){

        const newRows = mentorRows.map((row) => {
          if (row.id === parentRowID) {
            row.students.map((studentRow) => {
              if (studentRow.id === id){
                setDialogTitleText(`Delete Student ${studentRow.firstName} ${studentRow.lastName}?`);
                setDialogContentText(`This Student will be removed from the database.`);
                setOpenDialog(true);
              }
              return studentRow;
            });
            return row;
          }
          return row;
        });
      
      }
    }
  };

  const onRevert = (id, rowType) => {
    
    if(rowType == "stf"){
      const newRows = rows.map((row) => {
        if (row.id === id) {
          return previous[id+rowType] ? previous[id+rowType] : row;
        }
        return row;
      });
      setRows(newRows);
      setPrevious((state) => {
        delete state[id+rowType];
        return state;
      });
    }else if(rowType == "m"){
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
    }
    
    onToggleEditMode(id,rowType);
  };

  const moveStudentUp = (id, parentRowID, parentRowType) => {
    
    if(parentRowType === "stf"){
      
      var newParentRow = {};
      var student = {};

      setRows((state) => {
        return rows.map((row) => {
          if (row.id === parentRowID) {

            var i = 0;
            row.students.map((studentRow) => {
              if (studentRow.id === id) {

                student = studentRow;

                if(newParentRow.id != null){
                  row.students.splice(i,1);
                  student.parentRowID = newParentRow.id;
                  newParentRow.students.push(student);
                  return null;
                }
                return studentRow;
              }
              i++;
              return studentRow;
            });
            return { ...row, students: row.students };
          }
          newParentRow = row;
          return row;
        });
      });

    }else if(parentRowType === "m"){
      
      var newParentRow = {};
      var student = {};

      setMentorRows((state) => {
        return mentorRows.map((row) => {
          if (row.id === parentRowID) {
            
            var i = 0;
            row.students.map((studentRow) => {
              if (studentRow.id === id) {
                
                student = studentRow;
                
                if(newParentRow.id != null){
                  row.students.splice(i,1);
                  student.parentRowID = newParentRow.id;
                  newParentRow.students.push(student);
                  return null;
                }
                return studentRow;
              }
              i++;
              return studentRow;
            });
            return { ...row, students: row.students };
          }
          newParentRow = row;
          return row;
        });
      });
    }

  };

  const moveStudentDown = (id, parentRowID, parentRowType) => {
    
    if(parentRowType == "stf"){
      
      var oldParentRow = {};
      var student = {};
      var studentIndex;

      setRows((state) => {
        return rows.map((row) => {
          if (row.id === parentRowID) {

            var i = 0;
            row.students.map((studentRow) => {
              if (studentRow.id === id) {
                student = studentRow;
                oldParentRow = row;
                studentIndex = i;
                return studentRow;
              }
              i++;
              return studentRow;
            });
            return { ...row, students: row.students };
          }

          if(studentIndex != null && oldParentRow.id != null){
            oldParentRow.students.splice(studentIndex,1);
            studentIndex = null; //set this to null so don't go into this if again and propagate this student into all staff below
            student.parentRowID = row.id;
            row.students.push(student);
            return row;
          }
          return row;
        });
      });
      
    }else if(parentRowType == "m"){
      
      var oldParentRow = {};
      var student = {};
      var studentIndex;

      setMentorRows((state) => {
        return mentorRows.map((row) => {
          if (row.id === parentRowID) {
            
            var i = 0;
            row.students.map((studentRow) => {
              if (studentRow.id === id) {
                student = studentRow;
                oldParentRow = row;
                studentIndex = i;
                return studentRow;
              }
              i++;
              return studentRow;
            });
            return { ...row, students: row.students };
          }
          
          if(studentIndex != null && oldParentRow.id != null){
            oldParentRow.students.splice(studentIndex,1);
            studentIndex = null; //set this to null so don't go into this if again and propagate this student into all mentors below
            student.parentRowID = row.id;
            row.students.push(student);
            return row;
          }
          return row;
        });
      });
      
    }
  };

  const sendPost = async (row) => {

    if(row.rowType == "stf"){
      //saving new staff
      const staff = {
        "staffID": row.id,
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

      const result = await axios.post("http://localhost:9898/api/Staff/",staff,headers);
      
      if(result.status == 200){
        setRows((state) => {
          return rows.map((stf) => {
            if(stf.id === row.id){
              return { ...stf, id: result.data.id, contactID: result.data.contact.contactID, isEditMode: false}
            }
            return stf;
          });
        });

        alert(`New Staff Member ${result.data.firstName} ${result.data.lastName} saved successfully.`)

      }else{
        alert(`Failed to save Staff Member ${row.firstName} ${row.lastName}` + result);
      }

    }else if(row.rowType == "m"){
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

      const result = await axios.post("http://localhost:9898/api/Mentor/",mentor,headers);
      
      if(result.status == 200){
        setMentorRows((state) => {
          return mentorRows.map((m) => {
            if(m.id === row.id){
              return { ...m, id: result.data.id, contactID: result.data.contact.contactID, isEditMode: false}
            }
            return m;
          });
        });

        alert(`New Mentor ${result.data.firstName} ${result.data.lastName} saved successfully.`)

      }else{
        alert(`Failed to save Mentor ${row.firstName} ${row.lastName}` + result);
      }

    }else{//std unless come up with 4th row type
      //saving new student
      const student = {
        "studentID": row.id,
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
        "dob": format(new Date(row.DOB), "yyyy-MM-dd'T'HH:mm:ss.SSSX"),
        "grade": row.grade,
        "contactID": row.contactID,  
        "mentorID": (row.parentRowType === "m") ? row.parentRowID : null,
        "staffID": (row.parentRowType === "stf") ? row.parentRowID : null,
      }
        
      if(row.parentRowType === "stf"){
        
        const result = (row.parentRowID === null) ? await axios.post("http://localhost:9898/api/Student/",student,headers) : await axios.post("http://localhost:9898/api/Student/staff/"+student.staffID,student,headers);

        console.log(result);
        if(result.status == 201){

          //add to twinRows
          setTwinRows((state) => ({ ...state, [result.data.id]: {mentorID: null, staffID: row.parentRowID} }));

          //add student id and contactID to newly saved row
          setRows((state) => {
            return rows.map((stf) => {
              if((result.data.staff !== null) ? stf.id === result.data.staff.staffID : stf.id === null){
                
                const stds = stf.students.map((studentRow) => {
                  if(studentRow.id == row.id){
                    return { ...studentRow, id: result.data.id, contactID: result.data.contact.contactID, isEditMode: false}
                  }
                  return studentRow;
                });
                return { ...stf, students: stds};
              }
              return stf;
            });
          });

          //add to unassigned mentors now since successfully saved

          const newStudent = ({
            id: result.data.id,
            rowType: "std",
            parentRowID: null,
            parentRowType: "m",
            firstName: row.firstName,
            lastName: row.lastName,
            DOB: row.DOB,
            grade: row.grade,
            primaryPhone: row.primaryPhone, 
            homePhone: row.homePhone, 
            cellPhone: row.cellPhone, 
            email: row.email, 
            address1: row.address1, 
            address2: row.address2, 
            city: row.city, 
            state: row.state, 
            zip: row.zip,
            contactID: result.data.contact.contactID,
            isEditMode: false,
          });
    
          setMentorRows((state) => {
            return mentorRows.map((row) => {
              if(row.isPlaceholder){
                return {...row, students: [...row.students, newStudent]};
              }
              return row;
            });
          });  

          alert(`New Student ${result.data.firstName} ${result.data.lastName} saved successfully. \n This student will also appear in the Mentors grid under Unassigned Students.`);

        }else{
          alert(`Failed to save student ${row.firstName} ${row.lastName} \n` + result);
        }

      }else{
        
        const result = (row.parentRowID === null) ? await axios.post("http://localhost:9898/api/Student/",student,headers) : await axios.post("http://localhost:9898/api/Student/mentors/"+student.mentorID,student,headers);

        console.log(result);
        if(result.status == 201){

          //add to twinRows
          setTwinRows((state) => ({ ...state, [result.data.id]: {mentorID: row.parentRowID, staffID: null} }));

          //add student id and ContactID to newly saved row
          setMentorRows((state) => {
            return mentorRows.map((m) => {
              if((result.data.mentor !== null) ? m.id === result.data.mentor.mentorID : m.id === null){
                
                const stds = m.students.map((studentRow) => {
                  if(studentRow.id == row.id){
                    return { ...studentRow, id: result.data.id, contactID: result.data.contact.contactID, isEditMode: false}
                  }
                  return studentRow;
                });
                return {...m, students: stds};
              }
              return m;
            });
          });

          //add to unassigned staff now since successfully saved

          const newStudent = ({
            id: result.data.id,
            rowType: "std",
            parentRowID: null,
            parentRowType: "stf",
            firstName: row.firstName,
            lastName: row.lastName,
            DOB: row.DOB,
            grade: row.grade,
            primaryPhone: row.primaryPhone, 
            homePhone: row.homePhone, 
            cellPhone: row.cellPhone, 
            email: row.email, 
            address1: row.address1, 
            address2: row.address2, 
            city: row.city, 
            state: row.state, 
            zip: row.zip,
            contactID: result.data.contact.contactID,
            isEditMode: false,
          });

          setRows((state) => {
            return rows.map((row) => {
              if(row.isPlaceholder){
                return {...row, students: [...row.students, newStudent]};
              }
              return row;
            });
          });

          alert(`New Student ${result.data.firstName} ${result.data.lastName} saved successfully. \n This student will also appear in the Staff grid under Unassigned Students.`);

        }else{
          alert(`Failed to save student ${row.firstName} ${row.lastName} \n` + result);
        }

      }

    }

  };

  const sendUpdate = async (row, silent = false) => {

    if(row.rowType == "stf"){
      //updating staff
      const staff = {
        "staffID": row.id,
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

      const result = await axios.put("http://localhost:9898/api/Staff/",staff,headers);
      console.log(result);

      if(!silent){
        if(result.status == 200){
          alert(`Updates for Staff Member ${result.data.firstName} ${result.data.lastName} saved successfully.`)
        }else{
          alert(`Failed to save updates for Staff Member ${row.firstName} ${row.lastName}` + result);
        }
      }

    }else if(row.rowType == "m"){
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

      const result = await axios.put("http://localhost:9898/api/Mentor/",mentor,headers);

      console.log(result);

      if(!silent){
        if(result.status == 200){
          alert(`Updates for Mentor ${result.data.firstName} ${result.data.lastName} saved successfully.`)
        }else{
          alert(`Failed to save updates for Mentor ${row.firstName} ${row.lastName}` + result);
        }
      }

    }else if(row.rowType == "std"){
      //updating students
      const student = {
        "studentID": row.id,
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
        "grade": row.grade,
      }

      if(row.parentRowType == "stf"){

        //setting twinRows.staffID in case student was moved up or down
        setTwinRows((state) => ({ ...state, [row.id]: {mentorID: twinRows[row.id].mentorID, staffID: row.parentRowID} }));
        var result = {};

        //4 endpoints both null X, only mentor X, only staff X, or both set X
        if(row.parentRowID == null){

          if(twinRows[row.id].mentorID == null){
            result = await axios.put("http://localhost:9898/api/Student/",student,headers);
          }else{
            result = await axios.put("http://localhost:9898/api/Student/mentors/"+twinRows[row.id].mentorID,student,headers);
          }

        }else{
          
          if(twinRows[row.id].mentorID == null){
            result = await axios.put("http://localhost:9898/api/Student/staff/"+row.parentRowID,student,headers);
          }else{
            result = await axios.put("http://localhost:9898/api/Student/staff/"+row.parentRowID+"/mentors/"+twinRows[row.id].mentorID,student,headers);
          }

        }

        console.log(result);
        if(result.status == 200){
          
          //set twin values
          setMentorRows((state) => {
            return mentorRows.map((mentor) => {
              if(mentor.id === twinRows[row.id].mentorID){
                const stds = mentor.students.map((studentRow) => {
                  if(studentRow.id == row.id){
                    return { ...studentRow, firstName: row.firstName, lastName: row.lastName, DOB: row.DOB, grade: row.grade, primaryPhone: row.primaryPhone, homePhone: row.homePhone, cellPhone: row.cellPhone, email: row.email, address1: row.address1, address2: row.address2, city: row.city, state: row.state, zip: row.zip, }
                  }
                  return studentRow;
                });
                return { ...mentor, students: stds};
              }
              return mentor;
            });
          });  
          
          if(!silent){
            alert(`Updates for Student ${result.data.firstName} ${result.data.lastName} saved successfully.`)
          }
        }else{
          if(!silent){
            alert(`Failed to save updates for Student ${row.firstName} ${row.lastName}` + result);
          }
        }

      }else{

        //setting twinRows.mentorID in case student was moved up or down
        setTwinRows((state) => ({ ...state, [row.id]: {mentorID: row.parentRowID, staffID: twinRows[row.id].staffID} }));
        var result = {};

        //4 endpoints both null X, only mentor X, only staff X, or both set X
        if(row.parentRowID == null){

          if(twinRows[row.id].staffID == null){
            result = await axios.put("http://localhost:9898/api/Student/",student,headers);
          }else{
            result = await axios.put("http://localhost:9898/api/Student/staff/"+twinRows[row.id].staffID,student,headers);
          }

        }else{

          if(twinRows[row.id].staffID == null){
            result = await axios.put("http://localhost:9898/api/Student/mentors/"+row.parentRowID,student,headers);
          }else{
            result = await axios.put("http://localhost:9898/api/Student/staff/"+twinRows[row.id].staffID+"/mentors/"+row.parentRowID,student,headers);
          }

        }

        console.log(result);
        if(result.status == 200){
          
          //set twin values
          setRows((state) => {
            return rows.map((staff) => {
              if(staff.id === twinRows[row.id].staffID){
                const stds = staff.students.map((studentRow) => {
                  if(studentRow.id == row.id){
                    return { ...studentRow, firstName: row.firstName, lastName: row.lastName, DOB: row.DOB, grade: row.grade, primaryPhone: row.primaryPhone, homePhone: row.homePhone, cellPhone: row.cellPhone, email: row.email, address1: row.address1, address2: row.address2, city: row.city, state: row.state, zip: row.zip, }
                  }
                  return studentRow;
                });
                return { ...staff, students: stds};
              }
              return staff;
            });
          });  

          if(!silent){
            alert(`Updates for Student ${result.data.firstName} ${result.data.lastName} saved successfully.`)
          }
        }else{
          if(!silent){
            alert(`Failed to save updates for Student ${row.firstName} ${row.lastName}` + result);
          }
        }

      }
      
    }
  }

  return (
    <Paper>
      <h3>
        Staff
      </h3>
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
          <IconButton style={{color: 'red'}} onClick={handleDialogDelete}>Delete</IconButton>
          <IconButton onClick={handleCloseDialog}>
            Cancel
          </IconButton>
        </DialogActions>
      </Dialog>
      <Table aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Date of Birth</TableCell>
            <TableCell align="left">Primary Phone</TableCell>
            <TableCell align="left">Home Phone</TableCell>
            <TableCell align="left">Cell Phone</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Address 1</TableCell>
            <TableCell align="left">Address 2</TableCell>
            <TableCell align="left">City</TableCell>
            <TableCell align="left">State</TableCell>
            <TableCell align="left">Zip</TableCell>
            <TableCell align="left">Actions</TableCell>
            { !hasAddRow["stfGrd"] ? (
              <IconButton aria-label="add new staff member" onClick={() => onAdd("stf")} >
                <AddIcon />
              </IconButton>
            ) : (
              <></>
            )}        
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <CustomTableRow props={row} />
          ))}
        </TableBody>
      </Table>
      <h3>
        Mentors 
      </h3>
      <Table aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Date of Birth</TableCell>
            <TableCell align="left">Primary Phone</TableCell>
            <TableCell align="left">Home Phone</TableCell>
            <TableCell align="left">Cell Phone</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Address 1</TableCell>
            <TableCell align="left">Address 2</TableCell>
            <TableCell align="left">City</TableCell>
            <TableCell align="left">State</TableCell>
            <TableCell align="left">Zip</TableCell>
            <TableCell align="left">Actions</TableCell>
            { !hasAddRow["mGrd"] ? (
              <IconButton aria-label="add new mentor" onClick={() => onAdd("m")} >
                <AddIcon />
              </IconButton>
            ) : (
              <></>
            )}            
          </TableRow>
        </TableHead>
        <TableBody>
          {mentorRows.map((row) => (
            <CustomTableRow props={row} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
