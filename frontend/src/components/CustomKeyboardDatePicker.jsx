import React, { Fragment, useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

function CustomKeyboardDatePicker(props) {
  const [selectedDate, handleDateChange] = useState(new Date("11/22/2022"));

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        clearable
        value={selectedDate}
        placeholder="11/22/2018"
        onChange={date => handleDateChange(date)}
        minDate={new Date("11/22/2018")}
        format="MM/yyyy"
        variant="inline"
        views={["month", "year"]}
      />
    </MuiPickersUtilsProvider>
  );
}

export default CustomKeyboardDatePicker;