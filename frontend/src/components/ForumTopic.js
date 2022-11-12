import {React, useState} from "react";
import ReactDOM from 'react-dom';

import {useLocation} from 'react-router-dom';

//import { useParams } from 'react-router-dom';

//could also try function component as learned from code academy

export function ForumTopic (props) {
  
  //let { code } = useParams();
  
  let location = useLocation();

  console.log(location); //this actually fucking works btw!!! as of 9/29 1 am!!!

  //const search = props.location.search; // could be '?foo=bar'
  //const params = new URLSearchParams(search);
  //const foo = params.get('foo');

  //console.log(params);

  return (
    <div>
      <h5>I'm a forum topic that will have posts</h5>
      <p>Hello my location search is {location.search} </p>
    </div>
    );
}


//this works fine but still no prop working
// export const ForumTopic = () => {
//   return (
//     <div>
//       <h5>I'm a forum topic that will have posts</h5>
//     </div>
//     );
// }


// Hooks must be used inside a functional component
export default function Login(props) {
    //Creating a state variable
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    
    // Accessing the history instance created by React
    //const history = useHistory();
        
    return (
      <div>
        <input
          type="text"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          required
        />
        <input
          type="text"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        {/* <button type="submit" onClick={handleClick}>
          {" "}
          Log In{" "}
        </button> */}
      </div>
    );
  }


// export class ForumTopic extends React.Component{
//     constructor(props){
//         super(props);
//         console.log("topic's state" + this.state);
//         //const setTitle = useState("");
//     }

//     render(){
//         return (
//             <div>
//                 <h5>I'm a forum topic that will have posts</h5>
//             </div>
//         );
//     }

// }

// ReactDOM.render(
//   <ForumTopic shit="hello pilgrims im John Wayne!"/>, document.getElementById('app')
// );