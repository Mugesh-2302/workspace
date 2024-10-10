import React from "react"
import Navbar from "./Navigator/Navebar";
import Todo from "./components/Todo"
import {Link} from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home'
import Work from './components/Work'
import Contact from './components/Contact'
const App = () => {
  return(
      <div>
        <Router>
          <div> 
           <Navbar />
           
           <Todo />
          </div>
          <div style={{padding: '50px'}}>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/work" element={<Work/>} />
             <Route path="/contact" element={<Contact/>} />
          </Routes>
          </div>
        </Router>
         
      </div>
  )
}
export default App;
