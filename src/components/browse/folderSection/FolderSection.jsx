import React, { useState } from "react";
import "./FolderSection.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createFile,
  createFolder,
} from "../../../features/createFolderFilesSlice";
import {openFileLink} from '../../../features/openFileSlice'
import { changeBreadcrumb } from "../../../features/breadcrumbSlice";

function FolderSection() {
  const value = useSelector((state) => state.create.value);
  const navbarStatus = useSelector((state) => state.navbarChange.value);
  const dispatch = useDispatch();

  const [openFolders, setOpenFolders] = useState({});

  const toggleFolder = (folderId) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  function displayLoop(x) {
    return x?.map((val) => (
      <div key={val.name} className="folderContainer">
        <div className="subFolderTabs">
          <div
            className={val.type === "folder" ? "isFolder" : "isFile"}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() =>
              val.type === "folder" ? toggleFolder(val.id) : (dispatch(openFileLink(val.url),dispatch(changeBreadcrumb(val.name))))
            }
          >
            {val.type === "folder" ? (
              <div>
              <i
                className={`bi ${
                  openFolders[val.id] ? "bi-chevron-down" : "bi-chevron-right"
                }`}
                style={{fontSize:'12px',marginRight:'5px'}}
              ></i>
              <i
              style={{color:'#f7c224'}}
                className={`bi ${
                  openFolders[val.id] ? "bi-folder2-open" : "bi-folder "
                }`}
              ></i>
              </div>
            ) : (
              
              <i style={{color:'#294bca'}} className="bi bi-file-earmark"></i>
            )}

            <p>{val.name}</p>
          </div>

          {val.type === "folder" && (
            <div>
              <i
                className="bi bi-folder-plus folderIcon"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(createFolder(val.id));
                }}
              ></i>
              <i
                className="bi bi-file-earmark-plus folderIcon"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(createFile(val.id));
                }}
              ></i>
            </div>
          )}
        </div>

        {val.type === "folder" &&
          openFolders[val.id] &&
          val.children?.length > 0 && (
            <div className="subFolderChildren" style={{ marginLeft: "20px" }}>
              {displayLoop(val.children)}
            </div>
          )}
      </div>
    ));
  }

  return (
    <div className="folderSection">
      <div className="folderTabs">
        <div>
          <h5>Browse</h5>
        </div>
        <div>
          <i
            className="bi bi-folder-plus folderIcon"
            onClick={() => dispatch(createFolder(value.id))}
          ></i>
          <i
            className="bi bi-file-earmark-plus folderIcon"
            onClick={() => dispatch(createFile(value.id))}
          ></i>
        </div>
      </div>

      {displayLoop(value)}
    </div>
  );
}

export default FolderSection;
