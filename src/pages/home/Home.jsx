import React, { useState } from "react";
import "./Home.css";
import MainLogo from "/nisum-technologies-logo.webp";
import CreateFileImg from "/add-document.webp";
import CreateFolderImg from "/add-folder.webp";
import { useDispatch, useSelector } from "react-redux";
import {
  createFile,
  createFolder,
} from "../../features/createFolderFilesSlice";
import folderImg from "/folder.webp";
import openFolderImg from "/open-folder.webp";
import fileImg from "/file.webp";

function Home() {
  const dispatch = useDispatch();
  const [openedFolder, setOpenedFolder] = useState([]);
  const objValue = useSelector((state) => state.create.value);
  // console.log(objValue);

  function toggleFolder(id) {
    if (openedFolder.includes(id)) {
      const tempArr = [...openedFolder];
      const tempId = tempArr.indexOf(id);
      tempArr.splice(tempId, 1);
      setOpenedFolder(tempArr);
    } else {
      setOpenedFolder((prev) => [...prev, id]);
      // console.log(openedFolder)
    }
  }

  function viewFolder(x = objValue) {
    return x.map((val) => {
      return (
        <div
          key={val.name}
          onClick={(e) => {
            e.stopPropagation();
            val.type === "folder" ? toggleFolder(val.id) : "";
          }}
        >
          <div style={{ display: "flex", cursor: "pointer" }}>
            {val.type === "folder" ? (
              <img src={folderImg} height={20} />
            ) : (
              <img src={fileImg} height={20} />
            )}
            <h5 style={{ marginLeft: "10px" }}>{val.name}</h5>
          </div>

          {openedFolder.includes(val.id) && val.children.length > 0 && (
            <div style={{ marginLeft: "1rem" }}>
              <h6>{viewFolder(val.children)}</h6>
            </div>
          )}
        </div>
      );
    });
  }

  return (
    <div className="home">
      <center>
        <img
          src={MainLogo}
          alt="Nisum Logo"
          width={200}
          style={{ marginTop: "0.8rem" }}
        />
        <h5 style={{ marginTop: "0.5rem" }}> Welcome to Nisum Sheets </h5>
        <input
          type="text"
          className="searchBar"
          placeholder="  🔍︎  Search File/Folder here"
        />
      </center>

      <div className="createSection">
        <div
          className="createSomething"
          onClick={() => dispatch(createFolder(0))}
        >
          <img src={CreateFolderImg} alt="Create New Folder" />
          <h6>Create New Project</h6>
        </div>
        <div
          className="createSomething"
          onClick={() => dispatch(createFile(0))}
        >
          <img src={CreateFileImg} alt="Create New File" />
          <h6>Create New File</h6>
          {/* <i class="bi bi-arrow-right"></i> */}
        </div>
      </div>
      <div className="existingProjects">
        <h4
          style={{
            marginBottom: "1rem",
            fontWeight: "bold",
            textDecoration: "underline",
            color: "rgb(36 66 198)",
            cursor: "pointer",
          }}
        >
          All Projects And Files
        </h4>
        {viewFolder()}
      </div>
    </div>
  );
}

export default Home;
