import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./MainSideBar.css";
import { Link } from "react-router-dom";

function MainSideBar() {
  const [aactive, setAactive] = useState(0);
  return (
    
      <div className="sideBar">
       <Link to='/'><div
          className={`sideBarItem ${aactive === 0 ? "active" : ""}`}
          onClick={() => setAactive(0)}
        >
          <i className="bi bi-house sideIcons"></i>Home
        </div></Link> 
       <Link to='/notifications'> <div
          className={`sideBarItem ${aactive === 1 ? "active" : ""}`}
          onClick={() => setAactive(1)}
        >
          <i className="bi bi-bell sideIcons"></i>Notifications
        </div></Link> 
        <Link to='/search'><div
          className={`sideBarItem ${aactive === 2 ? "active" : ""}`}
          onClick={() => setAactive(2)}
        >
          <i class="bi bi-search sideIcons"></i>Search
        </div></Link> 
        <Link to='/browse'><div
          className={`sideBarItem ${aactive === 3 ? "active" : ""}`}
          onClick={() => setAactive(3)}
        >
          <i className="bi bi-folder sideIcons"></i>Browse
        </div></Link> 
      </div>
      
  );
}

export default MainSideBar;
