import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import {Home} from "./components/Home.js";
import {EventCalendar} from "./components/EventCalendar.js";
import {Forum} from "./components/Forum.js";
import {Resources} from "./components/Resources";
import {ContactInfo} from "./components/ContactInfo.jsx";
import { Personnel } from './components/Personnel.jsx';
import {Timesheets} from "./components/Timesheets.js";
import { ForumTopic } from './components/ForumTopic';
import {Students} from './components/Students.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <BrowserRouter>
      <App />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="calendar" element={<EventCalendar />} />
        <Route path="forum/*" element={<Forum />} />
        <Route path="resources" element={<Resources />} />
        <Route path="contactinfo" element={<ContactInfo />} />
        <Route path="personnel" element={<Personnel />} />
        <Route path="timesheets" element={<Timesheets />} />
        <Route path="post" element={<ForumTopic/>}/>
        <Route path="students" element={<Students /> }/>
      </Routes>      
    </BrowserRouter>
    
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
