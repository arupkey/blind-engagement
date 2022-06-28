import React from "react";
import {Navbar} from "./components/Navbar.js";

class App extends React.Component {
  constructor(props){
    super(props);
    // let cors = require("cors");
    // this.use(cors());
  }
  
  componentDidMount(){

  }

  render(){
  return (
      <Navbar />
  );
  }
}

export default App;
