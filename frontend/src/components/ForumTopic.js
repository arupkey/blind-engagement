import {React, useState} from "react";
import ReactDOM from 'react-dom';

//could also try function component as learned from code academy

export function ForumTopic (props) {
  return (
    <div>
      <h5>I'm a forum topic that will have posts</h5>
      <p>Hello my props are {props.shit} {props.test} {props.bullshit}</p>
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