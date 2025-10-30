import { useEffect, useState } from "react";
import "./App.css";
import MainSideBar from "./components/mainsidebar/MainSideBar";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Notifications from "./pages/notifications/Notifications";
import Search from "./pages/search/Search";
import Browse from "./pages/browse/Browse";
import { useSelector } from "react-redux";

function App() {
  const navbarState = useSelector(state=> state.navbarChange.value)
  // console.log("This is from app",navbarState)
  const navigate = useNavigate()
  // useEffect(()=>{
  //   if(navbarState===0){
  //     navigate('/')
  //   }
  // },[])

  return (
    <div className="wholeScreen">
      <MainSideBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/search" element={<Search />} />
        <Route path="/browse" element={<Browse />} />
      </Routes>
    </div>
  );
}

export default App;
