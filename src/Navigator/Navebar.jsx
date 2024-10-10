import React from 'react'
import './Navebar.css'
import {Link} from 'react-router-dom'
const Navebar = () => {
  return (
    <div className='dat'>
        <nav>
            <ul>
               <Link to="/"><li>home</li></Link>
               <Link to="/work"><li>work</li></Link> 
               <Link to='/contact'><li>contact</li>
               </Link>

            </ul>
        </nav>
      
    </div>
  )
}

export default Navebar;
