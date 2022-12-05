import React from "react";
import TableCell from "@material-ui/core/TableCell";
import Input from "@material-ui/core/Input";

function CustomTableCell2({ row, name, inputType="text", handleFxn }){
  var typStr = "";
  if(inputType==="tel"){
    typStr = `type=${inputType} placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"`;
  }else{
    typStr = `type=${inputType}`;
  };
  
  return (
      <TableCell key={name} align="left">
        {row.isEditMode ? (
          <Input value= {(row[name] != null) ? row[name] : ""} name={name} onChange={(e) => handleFxn(e, row)} type={inputType}  />
        ) : (
          row[name]
        )}
      </TableCell>
    );
  }

export default CustomTableCell2;


      {/* <TableCell key={name} align="left">
        {row.isEditMode ? (
          <Input value= {(row[name] != null) ? row[name] : ""} name={name} onChange={(e) => handleFxn(e, row)} type={inputType} />
        ) : (
          row[name]
        )}
        
      </TableCell> */}