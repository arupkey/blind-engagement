import React, { Fragment, useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

function CustomKeyboardDatePicker(props) {
  //console.log(props);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        value={props.setDate}
        placeholder=""
        onChange={date => props.handleFxn(props.type,date)}
        minDate={new Date("01/01/2018")}
        format="MM/yyyy"
        variant="inline"
        views={["month", "year"]}
      />
    </MuiPickersUtilsProvider>
  );
}

export default CustomKeyboardDatePicker;