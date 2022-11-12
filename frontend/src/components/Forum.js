import React from "react";
import { Outlet, Link} from "react-router-dom";

export class Forum extends React.Component {
    constructor(props){
      super(props);
      props={test:'hello world', bullshit: 
    'true'};
      this.state = {bullshit: 'true'};
      console.log("forum's state" + this.state.bullshit);
    }
    
    componentDidMount(){
      
    }

    passData(topic, ){

    }

    render(){
      const forumTopics = ['Relationships','Career Workshop','Maximizing Mobility', 'Building Good Study Habits'];
      const forumDescr = ['We discuss the qualities of healthy relationships','We bringing up how to have a succesful career and various ways to make a living','We talk about good tips for maximizing mobility both with canes and guide dogs', 'We talk about how to keep and maintain good study habits'];

      const topicsList = forumTopics.map((topic, index) =>{
        const topicDescr = forumDescr[index];
        return(
          <div>
            <div class="divider"></div>
            <div class="section">
              <h5><Link key={topic} to={{pathname: "/post?"+index }}>{topic}</Link></h5>
              <p>{topicDescr}</p>
            </div>
          </div>
        )
      })

      return (
        <div className="container">

          <p>EDGE Forum</p>
          {topicsList}
          <Outlet />    
        </div>
      );
    }
  }
  
  export default Forum;
  