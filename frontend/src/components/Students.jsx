import { DataGrid } from '@mui/x-data-grid';

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

// Icons
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import RevertIcon from "@mui/icons-material/Undo";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { format } from "date-fns";

import CustomTableCell2 from "./CustomTableCell2";

// const mentorGridRows = [
//     {
//       id: 1,
//       firstName: 'Frank',
//       lastName: 'Costanza',
//       dob: '01/20/1985',
//       grade: 14,
//       PrimaryPhone: '9734459807',
//       HomePhone: '9734457865',
//       CellPhone: '9734459807',
//       Email: 'mikie_bonano@gmail.com',
//     },
//     {
//       id: 2,
//       firstName: 'John',
//       lastName: 'Williams',
//       dob: '03/20/1990',
//       grade: 12,
//       PrimaryPhone: '2213359876',
//       HomePhone: '2213353376',
//       CellPhone: '2213359876',
//       Email: 'izzyjones@gmail.com',
//     },
//   ];

//   const mentorGridColumns = [
//     { field: 'firstName', headerName: 'First Name', width: 180, editable: true },
//     { field: 'lastName', headerName: 'Last Name', width: 180, editable: true },
//     { field: 'dob', headerName: 'Date of Birth', type: 'date', width: 180, editable: true, },
//     { field: 'grade', headerName: 'Grade', type: 'number', width: 90, editable: true, },
//     { field: 'PrimaryPhone', headerName: 'Primary Phone', width: 180, editable: true },
//     { field: 'HomePhone', headerName: 'Home Phone', width: 180, editable: true },
//      { field: 'CellPhone', headerName: 'Cell Phone', width: 180, editable: true },
//     { field: 'Email', headerName: 'Email', width: 180, editable: true },
//   ];

export function Students() {
  const [submitting, setSubmitting] = useState(true);

  const [students, setStudents] = useState({});

  const createData = (firstName, lastName, DOB, grade, contact, mentor, staff, actions, id, prnts) => {


    const parents = prnts.map((value) => ({
      firstName: value.firstName,
      lastName: value.lastName,
      DOB: format(new Date(value.dob), "MM/dd/yyyy"),
      primaryPhone: value.contact.primaryPhone,
      homePhone: value.contact.homePhone,
      cellPhone: value.contact.cellPhone,
      email: value.contact.email,
      address1: value.contact.address1,
      address2: value.contact.address2,
      city: value.contact.city,
      state: value.contact.state,
      zip: value.contact.zip,
    }));

    const primaryPhone  = (contact != null) ? contact.primaryPhone : "";
    const homePhone = (contact != null) ? contact.homePhone : "";
    const cellPhone = (contact != null) ? contact.cellPhone : "";
    const email = (contact != null) ? contact.email : "";
    const address1 = (contact != null) ? contact.address1 : "";
    const address2 = (contact != null) ? contact.address2 : "";
    const city = (contact != null) ? contact.city : "";
    const state = (contact != null) ? contact.state : "";
    const zip = (contact != null) ? contact.zip : "";

    const mentorName = (mentor != null) ? mentor.firstName + " " + mentor.lastName : "";
    const staffMemberName = (staff != null) ? staff.firstName + " " + staff.lastName : "";

    setOpens((state) => ({ ...state, [id]: false }));

    return {
      id,
      firstName,
      lastName,
      DOB,
      grade,
      primaryPhone,
      homePhone,
      cellPhone,
      email,
      address1,
      address2,
      city,
      state,
      zip,
      mentorName,
      staffMemberName,
      actions,
      parents,
      staff,
      mentor,
      isEditMode: false,
    };
  };

  const [rows, setRows] = useState([]);

  const tok = "user:7279142c-d726-4bd8-af64-8f866651cec6";
  const hash = btoa(tok);
  const Basic = "Basic " + hash;

  const headers = {
    "Cache-Control": "no-cache",
    "Accept-Language": "en",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-Requested-With",
    Authorization: `Basic ${hash}`,
  };

  const getAllStudents = useCallback(async () => {
    console.log("ran " + Date.now());
    const res = await axios.get("http://localhost:9898/api/Students/", headers);
    setStudents(res.data);

    const newRows = students.map((student) => {
      return (
        createData(student.firstName, student.lastName, format(new Date(student.dob), "MM/dd/yyyy"), student.grade, student.contact, student.mentor, student.staff, "button", student.studentID, student.parents)
       ); 
    });

    setRows(newRows);

  }, [students]);

  useEffect(() => {
    if (submitting){
      getAllStudents().then(() => setSubmitting(false));
    }
    
  }, [getAllStudents]);

  //console.log(rows);

  const handleChange = ({ target }) => {
    target.preventDefault()
    const { name, value } = target;
    setStudents((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(students, "", 2));
  };

  const CustomTableCell = ({ row, name, onChange }) => {
 
    return (
      <TableCell align="left" colSpan={1}>
        {row.isEditMode ? (
          <Input
            value={row[name]}
            name={name}
            onChange={(e) => onChange(e, row)}
          />
        ) : (
          row[name]
        )}
      </TableCell>
    );
  };

  const [opens, setOpens] = useState({});

  const CustomTableRow = (props) => {

    const [open, setOpen] = useState(false);

    return (
      <>
      <TableRow key={props.props.id}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <CustomTableCell {...{ row: props.props, name: "firstName", onChange }} > </CustomTableCell>
        <CustomTableCell {...{ row: props.props, name: "lastName", onChange }} > </CustomTableCell>
        <CustomTableCell {...{ row: props.props, name: "DOB", onChange }} > </CustomTableCell>
        <CustomTableCell {...{ row: props.props, name: "grade", onChange }} > </CustomTableCell>
        <CustomTableCell {...{ row: props.props, name: "primaryPhone", onChange }} > </CustomTableCell>
        <CustomTableCell {...{ row: props.props, name: "homePhone", onChange }} > </CustomTableCell>
        <CustomTableCell {...{ row: props.props, name: "cellPhone", onChange }} > </CustomTableCell>
        <CustomTableCell {...{ row: props.props, name: "email", onChange }} > </CustomTableCell>
        <CustomTableCell {...{ row: props.props, name: "address1", onChange }} > </CustomTableCell>
        <CustomTableCell {...{ row: props.props, name: "address2", onChange }} > </CustomTableCell>
        <CustomTableCell {...{ row: props.props, name: "city", onChange }} > </CustomTableCell>
        <CustomTableCell {...{ row: props.props, name: "state", onChange }} > </CustomTableCell>
        <CustomTableCell {...{ row: props.props, name: "zip", onChange }} > </CustomTableCell>
        <CustomTableCell {...{ row: props.props, name: "mentorName", onChange }} > </CustomTableCell>
        <CustomTableCell {...{ row: props.props, name: "staffMemberName", onChange }} > </CustomTableCell>


        <TableCell>
          {props.props.isEditMode ? (
            <>
              <IconButton aria-label="done" onClick={() => onToggleEditMode(props.props.id)} >
                {/* <DoneIcon /> */}
              </IconButton>
              <IconButton aria-label="revert" onClick={() => onRevert(props.props.id)} >
                <RevertIcon />
              </IconButton>
            </>
          ) : (
            <IconButton aria-label="delete" onClick={() => onToggleEditMode(props.props.id)} >
              <EditIcon />
            </IconButton>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Parents
                </Typography>
                <Table size="small" aria-label="parents">
                  <TableHead>
                    <TableRow>
                      <TableCell>Parent First Name</TableCell>
                      <TableCell>Parent Last Name</TableCell>
                      <TableCell align="right">Primary Phone</TableCell>
                      <TableCell align="right">Home Phone</TableCell>
                      <TableCell align="right">Cell Phone</TableCell>
                      <TableCell align="right">Email</TableCell>
                      <TableCell align="right">Address 1</TableCell>
                      <TableCell align="right">Address 2</TableCell>
                      <TableCell align="right">City</TableCell>
                      <TableCell align="right">State</TableCell>
                      <TableCell align="right">Zip</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.props.parents.map((parentsRow) => (
                      <TableRow key={parentsRow.id}>
                        <TableCell component="th" scope="row">
                          {parentsRow.firstName}
                        </TableCell>
                        <TableCell>{parentsRow.lastName}</TableCell>
                        <TableCell align="right">{parentsRow.primaryPhone}</TableCell>
                        <TableCell align="right">{parentsRow.homePhone}</TableCell>
                        <TableCell align="right">{parentsRow.cellPhone}</TableCell>
                        <TableCell align="right">{parentsRow.email}</TableCell>
                        <TableCell align="right">{parentsRow.address1}</TableCell>
                        <TableCell align="right">{parentsRow.address2}</TableCell>
                        <TableCell align="right">{parentsRow.city}</TableCell>
                        <TableCell align="right">{parentsRow.state}</TableCell>
                        <TableCell align="right">{parentsRow.zip}</TableCell>
                        <TableCell align="right">
                          <IconButton aria-label="expand row" size="small">
                            <EditIcon />
                          </IconButton>
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

  const CustomTableRow2 = useCallback((props) => {

    return (
      <>
        <TableRow key={props.props.id}>
          <TableCell key={"open"}>
            {(props.props.id != null || props.props.isPlaceholder) ? (
              <IconButton aria-label="expand row" size="small" onClick={() => setOpens((state) => ({ ...state, [props.props.id]: !opens[props.props.id] }))} >
                {opens[props.props.id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            ) : (
              <></>
            )}
          </TableCell>

          {/* <CustomTableCell {...{ row: props.props, name: "firstName", onChange }} > </CustomTableCell> */}
          {CustomTableCell2({ row: props.props, name: "firstName", handleFxn: onChange}) }
          {/* <CustomTableCell {...{ row: props.props, name: "lastName", onChange }} > </CustomTableCell> */}
          {CustomTableCell2({ row: props.props, name: "lastName", handleFxn: onChange}) }
          {/* <CustomTableCell {...{ row: props.props, name: "DOB", onChange }} > </CustomTableCell> */}
          {CustomTableCell2({ row: props.props, name: "DOB", handleFxn: onChange}) }
          {/* <CustomTableCell {...{ row: props.props, name: "grade", onChange }} > </CustomTableCell> */}
          {CustomTableCell2({ row: props.props, name: "grade", handleFxn: onChange, inputType: "number"}) }
          {/* <CustomTableCell {...{ row: props.props, name: "primaryPhone", onChange }} > </CustomTableCell> */}
          {CustomTableCell2({ row: props.props, name: "primaryPhone", handleFxn: onChange, inputType: "tel"}) }
          {/* <CustomTableCell {...{ row: props.props, name: "homePhone", onChange }} > </CustomTableCell> */}
          {CustomTableCell2({ row: props.props, name: "homePhone", handleFxn: onChange, inputType: "tel"}) }
          {/* <CustomTableCell {...{ row: props.props, name: "cellPhone", onChange }} > </CustomTableCell> */}
          {CustomTableCell2({ row: props.props, name: "cellPhone", handleFxn: onChange, inputType: "tel"}) }
          {/* <CustomTableCell {...{ row: props.props, name: "email", onChange }} > </CustomTableCell> */}
          {CustomTableCell2({ row: props.props, name: "email", handleFxn: onChange, inputType: "email"}) }
          {/* <CustomTableCell {...{ row: props.props, name: "address1", onChange }} > </CustomTableCell> */}
          {CustomTableCell2({ row: props.props, name: "address1", handleFxn: onChange}) }
          {/* <CustomTableCell {...{ row: props.props, name: "address2", onChange }} > </CustomTableCell> */}
          {CustomTableCell2({ row: props.props, name: "address2", handleFxn: onChange}) }
          {/* <CustomTableCell {...{ row: props.props, name: "city", onChange }} > </CustomTableCell> */}
          {CustomTableCell2({ row: props.props, name: "city", handleFxn: onChange}) }
          {/* <CustomTableCell {...{ row: props.props, name: "state", onChange }} > </CustomTableCell> */}
          {CustomTableCell2({ row: props.props, name: "state", handleFxn: onChange}) }
          {/* <CustomTableCell {...{ row: props.props, name: "zip", onChange }} > </CustomTableCell> */}
          {CustomTableCell2({ row: props.props, name: "zip", handleFxn: onChange}) }
          {/* <CustomTableCell {...{ row: props.props, name: "mentorName", onChange }} > </CustomTableCell> */}
          {CustomTableCell2({ row: props.props, name: "mentorName", handleFxn: onChange}) }
          {/* <CustomTableCell {...{ row: props.props, name: "staffMemberName", onChange }} > </CustomTableCell> */}
          {CustomTableCell2({ row: props.props, name: "staffMemberName", handleFxn: onChange}) }


          <TableCell key={"icons"}>
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
        <TableRow key={"pCont"+props.props.id}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={opens[props.props.id]} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Parents
                </Typography>
                <Table size="small" aria-label="parents">
                  <TableHead>
                    <TableRow>
                      <TableCell>Parent First Name</TableCell>
                      <TableCell>Parent Last Name</TableCell>
                      <TableCell align="right">Primary Phone</TableCell>
                      <TableCell align="right">Home Phone</TableCell>
                      <TableCell align="right">Cell Phone</TableCell>
                      <TableCell align="right">Email</TableCell>
                      <TableCell align="right">Address 1</TableCell>
                      <TableCell align="right">Address 2</TableCell>
                      <TableCell align="right">City</TableCell>
                      <TableCell align="right">State</TableCell>
                      <TableCell align="right">Zip</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.props.parents.map((parentsRow) => (
                      <TableRow key={parentsRow.id}>
                        {/* <TableCell component="th" scope="row">{parentsRow.firstName}</TableCell> */}
                        {CustomTableCell2({ row: parentsRow, name: "firstName", handleFxn: onChange}) }
                        {/* <TableCell>{parentsRow.lastName}</TableCell> */}
                        {CustomTableCell2({ row: parentsRow, name: "lastName", handleFxn: onChange}) }
                        {/* <TableCell align="right">{parentsRow.primaryPhone}</TableCell> */}
                        {CustomTableCell2({ row: parentsRow, name: "primaryPhone", handleFxn: onChange, inputType: "tel"}) }
                        {/* <TableCell align="right">{parentsRow.homePhone}</TableCell> */}
                        {CustomTableCell2({ row: parentsRow, name: "homePhone", handleFxn: onChange, inputType: "tel"}) }
                        {/* <TableCell align="right">{parentsRow.cellPhone}</TableCell> */}
                        {CustomTableCell2({ row: parentsRow, name: "cellPhone", handleFxn: onChange, inputType: "tel"}) }
                        {/* <TableCell align="right">{parentsRow.email}</TableCell> */}
                        {CustomTableCell2({ row: parentsRow, name: "email", handleFxn: onChange, inputType: "email"}) }
                        {/* <TableCell align="right">{parentsRow.address1}</TableCell> */}
                        {CustomTableCell2({ row: parentsRow, name: "address1", handleFxn: onChange}) }
                        {/* <TableCell align="right">{parentsRow.address2}</TableCell> */}
                        {CustomTableCell2({ row: parentsRow, name: "address2", handleFxn: onChange}) }
                        {/* <TableCell align="right">{parentsRow.city}</TableCell> */}
                        {CustomTableCell2({ row: parentsRow, name: "city", handleFxn: onChange}) }
                        {/* <TableCell align="right">{parentsRow.state}</TableCell> */}
                        {CustomTableCell2({ row: parentsRow, name: "state", handleFxn: onChange}) }
                        {/* <TableCell align="right">{parentsRow.zip}</TableCell> */}
                        {CustomTableCell2({ row: parentsRow, name: "zip", handleFxn: onChange}) }

                        <TableCell align="right">
                          {parentsRow.isEditMode ? (
                            <>
                              <IconButton aria-label="save" onClick={() => onSave(parentsRow.id, parentsRow.rowType, props.props.id, props.props.rowType)} >
                                <SaveIcon />
                              </IconButton>
                              <IconButton aria-label="revert" onClick={() => onRevert(props.props.id, props.props.rowType)} >
                                <RevertIcon />
                              </IconButton>
                              <IconButton aria-label="delete" onClick={() => onDelete(parentsRow.id, parentsRow.rowType, props.props.id, props.props.rowType)} >
                                <DeleteIcon />
                              </IconButton>
                            </>
                          ) : (
                            <IconButton aria-label="edit" onClick={() => {
                              onToggleEditMode(parentsRow.id, parentsRow.rowType, props.props.id, props.props.rowType);
                              parentsRow.isEditMode = true;
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
        <TableRow key={"sCont"+props.props.id}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={opens[props.props.id]} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Staff Member
                </Typography>
                <Table size="small" aria-label="parents">
                  <TableHead>
                    <TableRow>
                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell align="right">Primary Phone</TableCell>
                      <TableCell align="right">Home Phone</TableCell>
                      <TableCell align="right">Cell Phone</TableCell>
                      <TableCell align="right">Email</TableCell>
                      <TableCell align="right">Address 1</TableCell>
                      <TableCell align="right">Address 2</TableCell>
                      <TableCell align="right">City</TableCell>
                      <TableCell align="right">State</TableCell>
                      <TableCell align="right">Zip</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={(props.props.staff != null) ? props.props.staff.id : ''}>
                      <TableCell>{(props.props.staff != null) ? props.props.staff.firstName : ''}</TableCell>
                      <TableCell>{(props.props.staff != null) ? props.props.staff.lastName : ''}</TableCell>
                      <TableCell>{(props.props.staff != null) ? props.props.staff.contact.primaryPhone : ''}</TableCell>
                      <TableCell>{(props.props.staff != null) ? props.props.staff.contact.homePhone : ''}</TableCell>
                      <TableCell>{(props.props.staff != null) ? props.props.staff.contact.cellPhone : ''}</TableCell>
                      <TableCell>{(props.props.staff != null) ? props.props.staff.contact.email : ''}</TableCell>
                      <TableCell>{(props.props.staff != null) ? props.props.staff.contact.address1 : ''}</TableCell>
                      <TableCell>{(props.props.staff != null) ? props.props.staff.contact.address2 : ''}</TableCell>
                      <TableCell>{(props.props.staff != null) ? props.props.staff.contact.city : ''}</TableCell>
                      <TableCell>{(props.props.staff != null) ? props.props.staff.contact.state : ''}</TableCell>
                      <TableCell>{(props.props.staff != null) ? props.props.staff.contact.zip : ''}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
        <TableRow key={"mCont"+props.props.id}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={opens[props.props.id]} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Mentor
                </Typography>
                <Table size="small" aria-label="parents">
                  <TableHead>
                    <TableRow>
                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell align="right">Primary Phone</TableCell>
                      <TableCell align="right">Home Phone</TableCell>
                      <TableCell align="right">Cell Phone</TableCell>
                      <TableCell align="right">Email</TableCell>
                      <TableCell align="right">Address 1</TableCell>
                      <TableCell align="right">Address 2</TableCell>
                      <TableCell align="right">City</TableCell>
                      <TableCell align="right">State</TableCell>
                      <TableCell align="right">Zip</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={(props.props.mentor != null) ? props.props.mentor.id : ''}>
                      <TableCell>{(props.props.mentor != null) ? props.props.mentor.firstName : ''}</TableCell>
                      <TableCell>{(props.props.mentor != null) ? props.props.mentor.lastName : ''}</TableCell>
                      <TableCell>{(props.props.mentor != null) ? props.props.mentor.contact.primaryPhone : ''}</TableCell>
                      <TableCell>{(props.props.mentor != null) ? props.props.mentor.contact.homePhone : ''}</TableCell>
                      <TableCell>{(props.props.mentor != null) ? props.props.mentor.contact.cellPhone : ''}</TableCell>
                      <TableCell>{(props.props.mentor != null) ? props.props.mentor.contact.email : ''}</TableCell>
                      <TableCell>{(props.props.mentor != null) ? props.props.mentor.contact.address1 : ''}</TableCell>
                      <TableCell>{(props.props.mentor != null) ? props.props.mentor.contact.address2 : ''}</TableCell>
                      <TableCell>{(props.props.mentor != null) ? props.props.mentor.contact.city : ''}</TableCell>
                      <TableCell>{(props.props.mentor != null) ? props.props.mentor.contact.state : ''}</TableCell>
                      <TableCell>{(props.props.mentor != null) ? props.props.mentor.contact.zip : ''}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }, [rows, opens]);

  const [previous, setPrevious] = useState({});
 
  const onToggleEditMode = (id) => {
    setRows((state) => {
      return rows.map((row) => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious((state) => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
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
      //setHasAddRow((state) => ({ ...state, ["stfGrd"]: true }));

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

      //setMentorRows([...mentorRows, newMentor]);
      setPrevious((state) => ({ ...state, [null+"m"]: newMentor }));
      //setHasAddRow((state) => ({ ...state, ["mGrd"]: true }));

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
        // setMentorRows((state) => {
        //   return mentorRows.map((row) => {
        //     if(row.id == parentRowID){
        //       return {...row, students: [...row.students, newStudent]};
        //     }
        //     return row;
        //   });
        // });

        setPrevious((state) => ({ ...state, [null+"std"+parentRowID+parentRowType]: newStudent }));

      }
      //setHasAddRow((state) => ({ ...state, [parentRowID+parentRowType]: true }));
    }

  };

  const onSave = (sid, rowType, parentRowID = "", parentRowType = "") => {

    if(rowType == "stf"){       

      const row = rows.filter(stf => stf.id == sid && !stf.isPlaceholder)[0];

      if(sid == null){
        //sendPost(row);
        //setHasAddRow((state) => ({ ...state, ["stfGrd"]: false }));

      }else{
        //sendUpdate(row);
        
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
      
      //const row = mentorRows.filter(m => m.id == sid && !m.isPlaceholder)[0];

      if(sid == null){
        //sendPost(row);
        //setHasAddRow((state) => ({ ...state, ["mGrd"]: false }));

      }else{
        //sendUpdate(row);
        
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
          //sendPost(row);
          //setHasAddRow((state) => ({ ...state, [parentRowID+parentRowType]: false }));

        }else{
          //sendUpdate(row);

          //remove from previous
          if (previous[sid+rowType+parentRowID+parentRowType]) {
            setPrevious((state) => {
              delete state[sid+rowType+parentRowID+parentRowType];
              return state;
            });   
          }
        }

      }else{ //"m" unless third type made

        //const row = mentorRows.filter(m => m.id == parentRowID)[0].students.filter(std => std.id == sid)[0];

        if(sid == null){
          // sendPost(row);
          // setHasAddRow((state) => ({ ...state, [parentRowID+parentRowType]: false }));

        }else{
          // sendUpdate(row);

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

  const onRevert = (id) => {
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    setRows(newRows);
    setPrevious((state) => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
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
                //setTwinRows((state) => ({ ...state, [studentRow.id]: {mentorID: twinRows[studentRow.id].mentorID, staffID: null} }));
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
      const result = await axios.delete("http://localhost:9898/api/Mentors/"+deleteID,deleteID,headers);

      console.log(result);
      if(result.status == 200){
        //still need to actually reassign twinRowsID -> null for the staffStudent twin counterparts, 
        // const newRows = mentorRows.filter(mtr => mtr.id != deleteID);
        //const mentorStudents = mentorRows.filter(mtr => mtr.id == deleteID)[0].students;

        // setMentorRows((state) => {
        //   return newRows.map((row) => {
        //     if(row.isPlaceholder){
        //       mentorStudents.map((studentRow) => {
        //         studentRow.parentRowID = null;
        //         setTwinRows((state) => ({ ...state, [studentRow.id]: {mentorID: null, staffID: twinRows[studentRow.id].staffID} }));
        //         row.students.push(studentRow);
        //       });
        //       return row;
        //     }
        //     return row;       
        //   });
        // });
      
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

      axios.delete("http://localhost:9898/api/Students/"+deleteID,deleteID,headers).then((res) =>{
        console.log(res);
      });

      setPrevious((state) => {
        delete state[deleteID+deleteType+deleteParentID+deleteParentType];
        return state;
      });

      if(deleteParentType == "stf"){

        //deleting twin previous
        setPrevious((state) => {
          // delete state[deleteID+deleteType+twinRows[deleteID].mentorID+"m"];
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
        // setMentorRows((state) => {
        //   return mentorRows.map((row) => {
            
        //     if (row.id === twinRows[deleteID].mentorID) {
        //       row.students = row.students.filter(std => std.id != deleteID);
        //       return { ...row, students: row.students };
        //     }
        //     return row;
        //   });
        // });

      }else{

        //deleting twin previous
        setPrevious((state) => {
          //delete state[deleteID+deleteType+twinRows[deleteID].staffID+"std"];
          return state;
        });

        //deleting targeted student
        // setMentorRows((state) => {
        //   return mentorRows.map((row) => {
        //     if (row.id === deleteParentID) {
        //       row.students = row.students.filter(std => std.id != deleteID);
        //       return { ...row, students: row.students };
        //     }
        //     return row;
        //   });
        // });

        //deleting twin
        setRows((state) => {
          return rows.map((row) => {
            // if (row.id === twinRows[deleteID].staffID) {
            //   row.students = row.students.filter(std => std.id != deleteID);
            //   return { ...row, students: row.students };
            // }
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

      // const newRows = mentorRows.map((row) => {
      //   if (row.id === id) {
      //     setDialogTitleText(`Delete Mentor ${row.firstName} ${row.lastName}?`);
      //     setDialogContentText(`This Mentor will be removed from the database. \n Their students will be considered mentor unassigned.`);
      //     setDeleteID(id);
      //     setDeleteType(rowType);
      //     setOpenDialog(true);
      //     return row;
      //   }
      //   return row;
      // });
      
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

        // const newRows = mentorRows.map((row) => {
        //   if (row.id === parentRowID) {
        //     row.students.map((studentRow) => {
        //       if (studentRow.id === id){
        //         setDialogTitleText(`Delete Student ${studentRow.firstName} ${studentRow.lastName}?`);
        //         setDialogContentText(`This Student will be removed from the database.`);
        //         setOpenDialog(true);
        //       }
        //       return studentRow;
        //     });
        //     return row;
        //   }
        //   return row;
        // });
      
      }
    }
  };

    return(
        <Paper>
            <h3>Students</h3>

            {/* <div style={{width: '100%' }}>
              <Table aria-label="caption table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell align="left">Student First Name</TableCell>
                    <TableCell align="left">Student Last Name</TableCell>
                    <TableCell align="left">Date of Birth</TableCell>
                    <TableCell align="left">Grade</TableCell>
                    <TableCell align="left">Primary Phone</TableCell>
                    <TableCell align="left">Home Phone</TableCell>
                    <TableCell align="left">Cell Phone</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Address 1</TableCell>
                    <TableCell align="left">Address 2</TableCell>
                    <TableCell align="left">City</TableCell>
                    <TableCell align="left">State</TableCell>
                    <TableCell align="left">Zip</TableCell>
                    <TableCell align="right">Mentor Name</TableCell>
                    <TableCell align="right">Staff Member Name</TableCell>
                    <TableCell alight="left">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <CustomTableRow props={row} />
                  ))}
                </TableBody>
              </Table>
            </div> */}

            <div style={{width: '100%' }}>
              <Table aria-label="caption table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell align="left">Student First Name</TableCell>
                    <TableCell align="left">Student Last Name</TableCell>
                    <TableCell align="left">Date of Birth</TableCell>
                    <TableCell align="left">Grade</TableCell>
                    <TableCell align="left">Primary Phone</TableCell>
                    <TableCell align="left">Home Phone</TableCell>
                    <TableCell align="left">Cell Phone</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Address 1</TableCell>
                    <TableCell align="left">Address 2</TableCell>
                    <TableCell align="left">City</TableCell>
                    <TableCell align="left">State</TableCell>
                    <TableCell align="left">Zip</TableCell>
                    <TableCell align="right">Mentor Name</TableCell>
                    <TableCell align="right">Staff Member Name</TableCell>
                    <TableCell alight="left">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <Fragment key={row.id}>
                      {CustomTableRow2({ props: row })}
                    </Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* <div style={{ height: 300, width: '100%' }}>
                <DataGrid rows={mentorGridRows} columns={mentorGridColumns} experimentalFeatures={{ newEditingApi: true }} />
            </div> */}
        </Paper>
    );
}