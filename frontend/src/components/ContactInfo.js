import React, {useEffect, useState} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './ContactInfo.css';
import axios from '../services/api';

export function ContactInfo(){
  const [info, setInfo] = useState({});
  
  const tok = 'user:7279142c-d726-4bd8-af64-8f866651cec6';
  const hash = btoa(tok);
  const Basic = 'Basic ' + hash;

  const headers = {
    "Cache-Control": "no-cache",
    "Accept-Language": "en",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
    //"Authorization": "Basic dXNlcjowM2VhN2JhYS1mMTQ0LTQ5YWMtOGFhMy02NDE4YWJiNzdhMTk=",
    'Authorization': `Basic ${hash}`,
  };

  useEffect(() =>{
    console.log(Basic);
    axios.get("http://localhost:9898/api/Contact/1", headers)
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
  
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(info, '', 2));
  }

  return(
      <div fluid="md">

        <h1 aria-label="My Contact Information">My Contact Information</h1>
  {/* add in fields for contact info primary phone, home phone, email, cell, add1, add2, city, state, zip */}
  {/* <div className="col s6"> */}
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
                  {/* <i class="material-icons prefix">phone</i> */}
                  <input alt="State Input Box" class="autocomplete" id="autocomplete-input" name="state" onChange={handleChange} type="text" value={info.state || ''}/>
                  <label for="autocomplete-input">State</label>
                </td>
                <td>
                  {/* <i class="material-icons prefix">town</i> */}
                  <input alt="Zip Code Input Box" class="autocomplete" id="autocomplete-input" name="zip" onChange={handleChange} type="number" value={info.zip || ''}/>
                  <label for="autocomplete-input">Zip Code</label>
                </td>
              </tr>
            </table>

            {/* <div classname="input-field col s12">
              <i class="material-icons prefix">phone</i>
              <input alt="Cell Phone Input Box"  class="autocomplete" id="autocomplete-input" name="cellPhone" onChange={handleChange} type="tel" value={info.cellPhone || ''}/>
              <label for="autocomplete-input">Cell Phone</label>
            </div> */}

            {/* <div classname="input-field col s12">
              
              <input alt="Email Input Box"  class="autocomplete" id="autocomplete-input" name="email" onChange={handleChange} type="email" value={info.email || ''}/>
              <label for="autocomplete-input">Email</label>
            </div> */}

            {/* <div classname="input-field col s12">
              
              <input alt="Address Input Box" class="autocomplete" id="autocomplete-input" name="address" onChange={handleChange} type="text" value={info.address || ''}/>
              <label for="autocomplete-input">Address</label>
            </div> */}

            {/* <div classname="input-field col s12">
              <input alt="Address 2 Input Box" class="autocomplete" id="autocomplete-input" name="address2" onChange={handleChange} type="text" value={info.address2 || ''}/>
              <label for="autocomplete-input">Address 2</label>
            </div> */}

            {/* <div classname="input-field col s12">
              <input alt="City Input Box" class="autocomplete" id="autocomplete-input" name="city" onChange={handleChange} type="text" value={info.city || ''}/>
              <label for="autocomplete-input">City</label>
            </div> */}

            {/* <div classname="input-field col s12">
              <input alt="State Input Box" class="autocomplete" id="autocomplete-input" name="state" onChange={handleChange} type="text" value={info.state || ''}/>
              <label for="autocomplete-input">State</label>
            </div>

            <div classname="input-field col s12">
              <input alt="Zip Code Input Box" class="autocomplete" id="autocomplete-input" name="zip" onChange={handleChange} type="number" value={info.zip || ''}/>
              <label for="autocomplete-input">Zip Code</label>
            </div> */}

            <button alt="Submit Contact Info" class="btn waves-effect waves-light right" type="submit" name="action">Submit
              <i class="material-icons right">send</i>
            </button>

            {/* <div classname="input-field col s12">
              <i class="material-icons prefix">person</i>
              <input type="text" id="autocomplete-input" class="autocomplete"/>
              <label for="autocomplete-input">Name</label>
            </div> */}
            {/* <div classname="input-field col s12">
              <i class="material-icons prefix">email</i>
              <input type="email" id="autocomplete-input" class="autocomplete"/>
              <label for="autocomplete-input">Email</label>
            </div>
            <div classname="input-field col s12">
              <i class="material-icons prefix">vpn_key</i>
              <input type="password" id="autocomplete-input" class="autocomplete"/>
              <label for="autocomplete-input">Password</label>
            </div>
            <button class="btn waves-effect waves-light right" type="submit" name="action">Submit
              <i class="material-icons right">send</i>
            </button> */}
          </form>
        {/* </div> */}
      </div>


    );
}


// export class ContactInfo extends React.Component {
//     constructor(props){
//       super(props);
  
//     }
    
//     componentDidMount(){
  
//     }
  
//     render(){
//     return (
//       <div className="container">

//         <p>My Contact Information</p>
//   {/* add in fields for contact info primary phone, home phone, email, cell, add1, add2, city, state, zip */}
//   <div className="col s6">
//           <form>
//             <div classname="input-field col s12">
//               <i class="material-icons prefix">person</i>
//               <input type="text" id="autocomplete-input" class="autocomplete"/>
//               <label for="autocomplete-input">Name</label>
//             </div>
//             <div classname="input-field col s12">
//               <i class="material-icons prefix">email</i>
//               <input type="email" id="autocomplete-input" class="autocomplete"/>
//               <label for="autocomplete-input">Email</label>
//             </div>
//             <div classname="input-field col s12">
//               <i class="material-icons prefix">vpn_key</i>
//               <input type="password" id="autocomplete-input" class="autocomplete"/>
//               <label for="autocomplete-input">Password</label>
//             </div>
//             <button class="btn waves-effect waves-light right" type="submit" name="action">Submit
//               <i class="material-icons right">send</i>
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//     }
//   }
  
//   export default ContactInfo;
  