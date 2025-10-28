import { useState } from "react";
import "./App.css";
import MainSideBar from "./components/mainsidebar/MainSideBar";
import {Routes,Route} from 'react-router-dom'
import Home from "./pages/home/Home";
import Notifications from "./pages/notifications/Notifications";
import Search from "./pages/search/Search";
import Browse from "./pages/browse/Browse";

function App() {
  return (
  
    <div className="wholeScreen">
      <MainSideBar />
    
   <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/notifications' element={<Notifications />}/>
    <Route path='/search' element={<Search />}/>
    <Route path='/browse' element={<Browse />}/>
    </Routes> 

    </div>
  
  );
}

export default App;
