import React, { useState } from "react";
// import "./FolderSection.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createFile,
  createFolder,
} from "../../features/createFolderFilesSlice";
import {openFileLink} from '../../features/openFileSlice'
function Manage() {
      const value = useSelector((state) => state.create);
  const navbarStatus = useSelector((state) => state.navbarChange.value);
  const dispatch = useDispatch();

  const [openFolders, setOpenFolders] = useState({});

  const toggleFolder = (folderName) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  function displayLoop(x) {
    return x?.map((val) => (
      <div key={val.name} className="folderContainer">
        <div className="subFolderTabs">
          <div
            className={val.type === "folder" ? "isFolder" : ""}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() =>
              val.type === "folder" ? toggleFolder(val.name) : dispatch(openFileLink(val.url))
            }
          >
            {val.type === "folder" ? (
              <i
                className={`bi ${
                  openFolders[val.name] ? "bi-folder2-open" : "bi-folder"
                }`}
              ></i>
            ) : (
              <i className="bi bi-file-earmark"></i>
            )}

            <p>{val.name}</p>
          </div>

          {val.type === "folder" && (
            <div>
              <i
                className="bi bi-folder-plus folderIcon"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(createFolder(val.name));
                }}
              ></i>
              <i
                className="bi bi-file-earmark-plus folderIcon"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(createFile(val.name));
                }}
              ></i>
            </div>
          )}
        </div>

        {val.type === "folder" &&
          openFolders[val.name] &&
          val.children?.length > 0 && (
            <div className="subFolderChildren" style={{ marginLeft: "20px" }}>
              {displayLoop(val.children)}
            </div>
          )}
      </div>
    ));
  }
  return (
    <div className="folderSection" style={{width:'100%'}}>

      <div className="folderTabs">
        <div>
          <h5>Browse</h5>
        </div>
        <div>
          <i
            className="bi bi-folder-plus folderIcon"
            onClick={() => dispatch(createFolder(value))}
          ></i>
          <i
            className="bi bi-file-earmark-plus folderIcon"
            onClick={() => dispatch(createFile(value))}
          ></i>
        </div>
      </div>

      {displayLoop(value)}
    </div>
   
  );
}

export default Manage;
