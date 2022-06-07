import React from "react";

export class ContactInfo extends React.Component {
    constructor(props){
      super(props);
  
    }
    
    componentDidMount(){
  
    }
  
    render(){
    return (
      <div className="container">

        <p>My Contact Information</p>
  {/* add in fields for contact info primary phone, home phone, email, cell, add1, add2, city, state, zip */}
  <div className="col s6">
          <form>
            <div classname="input-field col s12">
              <i class="material-icons prefix">person</i>
              <input type="text" id="autocomplete-input" class="autocomplete"/>
              <label for="autocomplete-input">Name</label>
            </div>
            <div classname="input-field col s12">
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
            </button>
          </form>
        </div>
      </div>
    );
    }
  }
  
  export default ContactInfo;
  