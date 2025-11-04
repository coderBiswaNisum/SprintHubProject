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
    return x.value?.map((val) => (
      <div key={val.name} className="folderContainer">
        <div className="subFolderTabs">
          <div
            className={val.type === "folder" ? "isFolder" : ""}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() =>
              val.type === "folder" ? toggleFolder(val.name) : (dispatch(openFileLink(val.url),dispatch(changeBreadcrumb(val.name))))
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
