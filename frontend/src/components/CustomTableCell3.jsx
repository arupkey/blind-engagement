import React from "react";
import TableCell from "@material-ui/core/TableCell";
import Input from "@material-ui/core/Input";

const CustomTableCell3 = useCallback(({ row, name, handleChange }) => {
    return (
      <TableCell key={name} align="left">
        {row.isEditMode ? (
          <Input value= {(row[name] != null) ? row[name] : ""} name={name} onChange={(e) => handleChange(e, row)} />
        ) : (
          row[name]
        )}
      </TableCell>
    );
  }, [mentorRows]);

export default CustomTableCell3;