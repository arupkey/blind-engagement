import React, {useEffect, useState} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './ContactInfo.css';
import axios from '../services/api';

import Button from '@mui/material/Button';
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";

export function ContactInfo(){
  const [info, setInfo] = useState({});
  const [user, setUser] = useState("99")
  
  const tok = 'user:7279142c-d726-4bd8-af64-8f866651cec6';
  const hash = btoa(tok);
  const Basic = 'Basic ' + hash;

  const headers = {
    "Accept": "application/json, application/*+json",
    "Accept-Language": "en",
    //"Access-Control-Allow-Origin": "http://localhost:3000",
    //"Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
    //"Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
    //"Authorization": "Basic dXNlcjowM2VhN2JhYS1mMTQ0LTQ5YWMtOGFhMy02NDE4YWJiNzdhMTk=",
    'Authorization': `Basic ${hash}`,
    "Cache-Control": "no-cache",
    "Content-Type": "x-www-form-urlencoded;charset=UTF-8",
    
  };

  useEffect(() =>{
    console.log(Basic);
    const address = "http://localhost:9898/api/Contact/"+user;
    axios.get(address, headers)
    .then((res) => {
      console.log("data " + res.data);
      console.log("response header " + res.headers['Authorization']);
      setInfo(res.data);
    }).catch(err => console.log("error found " + err));
    console.log(info);
  }, []||[]);

  const handleChange = ({target}) => {
    const {name, value} = target;
    setInfo((prevInfo) => ({
      ...prevInfo, [name]: value
    }));
  };
  
  const handleDelete = () => {
    console.log("delete called");
    console.log(info);
    const msg = "Delete Contact Info for user?"; //`Delete Contact Info for user ${info.firstName} ${info.lastName}?`;
    if (window.confirm(msg)){
      const address = "http://localhost:9898/api/Contact/" + info.contactID;
      //alert("Delete will be sent to " + address);
      axios.delete(address,headers).then((res) =>{
        console.log(res);
      });
    }else{
      //alert("Won't Delete ");
    };
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(info);
    if(info.contactID != null){
      //updating
      axios.put("http://localhost:9898/api/Contact/",info,headers).then((res) =>{
        console.log(res);
      });
    }else{
      //saving new
      axios.post("http://localhost:9898/api/Contact/",info,headers).then((res) =>{
        console.log(res);
      });
    }
  }

  return(
      <div fluid="md">

        <h1 aria-label="My Contact Information">My Contact Information</h1>
          <form onSubmit={handleSubmit}>
            <table>
              
              <tr>
                <td>
                  <i class="material-icons prefix">contact_phone</i>
                  <input alt="Primary Phone Input Box" class="autocomplete" id="autocomplete-input" name="primaryPhone" onChange={handleChange} type="tel" value={info.primaryPhone || ''}/>
                  <label for="autocomplete-input">Primary Phone</label>
                </td>
                <td>
                  <i class="material-icons prefix">phone</i>
                  <input alt="Home Phone Input Box" class="autocomplete" id="autocomplete-input" name="homePhone" onChange={handleChange} type="tel" value={info.homePhone || ''}/>
                  <label for="autocomplete-input">Home Phone</label>
                </td>
              </tr>

              <tr>
                <td>
                  <i class="material-icons prefix">smartphone</i>
                  <input alt="Cell Phone Input Box"  class="autocomplete" id="autocomplete-input" name="cellPhone" onChange={handleChange} type="tel" value={info.cellPhone || ''}/>
                  <label for="autocomplete-input">Cell Phone</label>
                </td>
                <td>
                  <i class="material-icons prefix">email</i>
                  <input alt="Email Input Box"  class="autocomplete" id="autocomplete-input" name="email" onChange={handleChange} type="email" value={info.email || ''}/>
                  <label for="autocomplete-input">Email</label>
                </td>
              </tr>

              <tr>
                <td>
                  <i class="material-icons prefix">house</i>
                  <input alt="Address Input Box" class="autocomplete" id="autocomplete-input" name="address1" onChange={handleChange} type="text" value={info.address1 || ''}/>
                  <label for="autocomplete-input">Address</label>
                </td>
              </tr>

              <tr>
                <td>
                  <input alt="Address 2 Input Box" class="autocomplete" id="autocomplete-input" name="address2" onChange={handleChange} type="text" value={info.address2 || ''}/>
                  <label for="autocomplete-input">Address 2</label>
                </td>
              </tr>

              <tr>
                <td>
                  <i class="material-icons prefix">location_city</i>
                  <input alt="City Input Box" class="autocomplete" id="autocomplete-input" name="city" onChange={handleChange} type="text" value={info.city || ''}/>
                  <label for="autocomplete-input">City</label>
                </td>
                <td>
                  <input alt="State Input Box" class="autocomplete" id="autocomplete-input" name="state" onChange={handleChange} type="text" value={info.state || ''}/>
                  <label for="autocomplete-input">State</label>
                </td>
                <td>
                  <input alt="Zip Code Input Box" class="autocomplete" id="autocomplete-input" name="zip" onChange={handleChange} type="number" value={info.zip || ''}/>
                  <label for="autocomplete-input">Zip Code</label>
                </td>
              </tr>
            </table>

            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleDelete}>Delete</Button>
            <Button variant="contained" endIcon={<SendIcon />} type="submit">Submit</Button>


            {/* <button alt="Submit Contact Info" class="btn waves-effect waves-light right" type="submit" name="action">Submit
              <i class="material-icons right">send</i>
            </button> */}
          </form>
      </div>


    );
}