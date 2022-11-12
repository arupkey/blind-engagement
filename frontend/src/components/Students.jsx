import { DataGrid } from '@mui/x-data-grid';

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
// Icons
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Add";
import RevertIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { format } from "date-fns";

const mentorGridRows = [
    {
      id: 1,
      firstName: 'Frank',
      lastName: 'Costanza',
      dob: '01/20/1985',
      grade: 14,
      PrimaryPhone: '9734459807',
      HomePhone: '9734457865',
      CellPhone: '9734459807',
      Email: 'mikie_bonano@gmail.com',
    },
    {
      id: 2,
      firstName: 'John',
      lastName: 'Williams',
      dob: '03/20/1990',
      grade: 12,
      PrimaryPhone: '2213359876',
      HomePhone: '2213353376',
      CellPhone: '2213359876',
      Email: 'izzyjones@gmail.com',
    },
  ];

  const mentorGridColumns = [
    { field: 'firstName', headerName: 'First Name', width: 180, editable: true },
    { field: 'lastName', headerName: 'Last Name', width: 180, editable: true },
    { field: 'dob', headerName: 'Date of Birth', type: 'date', width: 180, editable: true, },
    { field: 'grade', headerName: 'Grade', type: 'number', width: 90, editable: true, },
    { field: 'PrimaryPhone', headerName: 'Primary Phone', width: 180, editable: true },
    { field: 'HomePhone', headerName: 'Home Phone', width: 180, editable: true },
     { field: 'CellPhone', headerName: 'Cell Phone', width: 180, editable: true },
    { field: 'Email', headerName: 'Email', width: 180, editable: true },
  ];

export function Students() {
  const [submitting, setSubmitting] = useState(true);

  const [parents, setParents] = useState({});
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

  const getAllParents = useCallback(async () => {
    const res = await axios.get("http://localhost:9898/api/Parent/", headers);
    setParents(res.data);
  }, [parents]);

  const getAllStudents = useCallback(async () => {
    console.log("ran " + Date.now());
    const res = await axios.get("http://localhost:9898/api/Student/", headers);
    setStudents(res.data);

      console.log(students[0]);
      console.log(parents);
    const newRows = students.map((student) => {
      return (
        createData(student.firstName, student.lastName, format(new Date(student.dob), "MM/dd/yyyy"), student.grade, student.contact, student.mentor, student.staff, "button", student.studentID, parents.filter(item => item.studentParent.studentId == student.studentID))
       ); 
    });

    setRows(newRows);

  }, [students]);

  useEffect(() => {
    if (submitting){
      getAllParents().then(() => getAllStudents().then(() => setSubmitting(false)));
    }
    
  }, [getAllParents, getAllStudents]);

  console.log(rows);

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
                <DoneIcon />
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

    return(
        <Paper>
            <h3>Students</h3>

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
                    <CustomTableRow props={row} />
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