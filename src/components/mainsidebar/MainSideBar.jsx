import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./MainSideBar.css";
import { Link,useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeNavbarState } from "../../features/navbarSlice";

function MainSideBar() {
 const location = useLocation()

useEffect(()=>{
if(location.pathname==='/browse') dispatch(changeNavbarState(3))
if(location.pathname==='/notifications') dispatch(changeNavbarState(1))
if(location.pathname==='/search') dispatch(changeNavbarState(2))
},[])
 const dispatch = useDispatch();
  const value = useSelector((state) => state.navbarChange.value);


  return (
    <div className="sideBar">
      <Link to="/">
        <div
          className={`sideBarItem ${value === 0 ? "active" : ""}`}
          onClick={() => dispatch(changeNavbarState(0))}
        >
          <i className="bi bi-house sideIcons"></i>Home
        </div>
      </Link>
      <Link to="/notifications">
        
        <div
          className={`sideBarItem ${value === 1 ? "active" : ""}`}
          onClick={() => dispatch(changeNavbarState(1))}
        >
          <i className="bi bi-bell sideIcons"></i>Notifications
        </div>
      </Link>
      <Link to="/search">
        <div
          className={`sideBarItem ${value === 2 ? "active" : ""}`}
          onClick={() => dispatch(changeNavbarState(2))}
        >
          <i className="bi bi-search sideIcons"></i>Search
        </div>
      </Link>
      <Link to="/browse">
        <div
          className={`sideBarItem ${value === 3 ? "active" : ""}`}
          onClick={() => dispatch(changeNavbarState(3))}
        >
          <i className="bi bi-folder sideIcons"></i>Browse
        </div>
      </Link>
    </div>
  );
}

export default MainSideBar;
