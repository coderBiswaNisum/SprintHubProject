import React from 'react'
import './Home.css'
import MainLogo from '/nisum-technologies-logo.webp'
import CreateFileImg from '/add-document.webp'
import CreateFolderImg from '/add-folder.webp'


function Home() {
  return (
       <div className='home'>
       <center>
         <img src={MainLogo} alt="Nisum Logo" width={200} style={{marginTop:'2rem'}}/>
      <h5 style={{marginTop:'1rem'}}> Welcome to Nisum Sheets </h5>
        <input type="text" className='searchBar' placeholder='  🔍︎    Search File/Folder here'/>
        </center>

      <div className='createSection'>
          <div className='createSomething'>
            <img src={CreateFileImg} alt="Create New File" />
          <h6>Create New Folder</h6>
        </div>
        <div className='createSomething'>
            <img src={CreateFolderImg} alt="Create New Folder" />
          <h6>Create New Folder</h6>
        </div>
      </div>
    </div>
  )
}

export default Home
