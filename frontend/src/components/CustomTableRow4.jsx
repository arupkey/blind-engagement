import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";

 // Icons
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import RevertIcon from "@mui/icons-material/Undo";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import CustomTableCell2 from "./CustomTableCell2";

function CustomTableRow4(props, opens){

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
        {CustomTableCell2({ row: props.props, name: "firstName", handleFxn: handleChange}) }
        {/* <CustomTableCell key={"lName"} {...{ row: props.props, name: "lastName"}} > </CustomTableCell> */}
        {/* {CustomTableCell({ row: props.props, name: "lastName"}) } */}
        {CustomTableCell2({ row: props.props, name: "lastName", handleFxn: handleChange}) }
        {/* <CustomTableCell key={"hrs"} {...{ row: props.props, name: "totalHours"}} > </CustomTableCell> */}
        {CustomTableCell2({ row: props.props, name: "totalHours", handleFxn: handleChange}) }

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
                        {CustomTableCell2({ row: attendeeRow, name: "hoursAttended", handleFxn: handleChange}) }
                        
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
  }
  
  export default CustomTableRow4;