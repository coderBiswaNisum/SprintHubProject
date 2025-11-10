import React, { useEffect, useState } from "react";
// import "./FolderSection.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createFile,
  createFolder,
  updateFileLink,
  renameFile,
  deleteFile,
} from "../../features/createFolderFilesSlice";
// import {openFileLink} from '../../features/openFileSlice'
import FolderImg from "/folder.webp";
import FolderOpenImg from "/open-folder.webp";
import FileImg from "/file.webp";
import AddFolderImg from "/add-folder.webp";
import AddFileImg from "/add-document.webp";
import DeleteImg from "/delete.webp";
import RenameImg from "/rename.webp";

function Manage() {
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
        <div className="subFolderTabs" style={{ justifyContent: "flex-start" }}>
          <div
            className={val.type === "folder" ? "isFolder" : "isFile"}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() =>
              val.type === "folder"
                ? toggleFolder(val.id)
                : dispatch(updateFileLink(val.id))
            }
          >
            {val.type === "folder" ? (
              <div>
                <i
                  className={`bi ${
                    openFolders[val.id] ? "bi-chevron-down" : "bi-chevron-right"
                  }`}
                  style={{ fontSize: "12px", marginRight: "5px" }}
                ></i>
                {/* <i
                  style={{ color: "#f7c224" }}
                  className={`bi ${
                    openFolders[val.id] ? "bi-folder2-open" : "bi-folder "
                  }`}
                ></i> */}
                {openFolders[val.id] ? (
                  <img
                    src={FolderOpenImg}
                    alt="Folder Image"
                    width="17"
                    className="folderIcon"
                  />
                ) : (
                  <img
                    src={FolderImg}
                    alt="Folder Image"
                    width="17"
                    className="folderIcon"
                  />
                )}
              </div>
            ) : (
              // <i className="bi bi-file-earmark"></i>
              <img src={FileImg} alt="Folder Image" width="17" />
            )}

            <p>{val.name}</p>
            <div style={{ marginLeft: "auto" }}>
              {/* <i
                className="bi bi-pencil-square"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(renameFile(val.id));
                }}
              ></i> */}
              <img
                src={RenameImg}
                alt="Folder Image"
                width="20"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(deleteFile(val.id));
                }}
              />
              <img src={DeleteImg} alt="Folder Image" width="22" style={{marginLeft:'1rem'}} onClick={(e) => {
                  e.stopPropagation();
                  dispatch(deleteFile(val.id));
                }}/>
              {/* <i
                className="bi bi-trash3"
                style={{ marginLeft: "1rem" }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              ></i> */}
            </div>
          </div>

          {val.type === "folder" && (
            <div>
              {/* <i
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
              ></i> */}
              <img
                src={AddFolderImg}
                alt="Add Folder Image"
                width="20"
                style={{ marginLeft: "8px" }}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(createFolder(val.id));
                }}
              />

              <img
                src={AddFileImg}
                alt="Add File Image"
                width="19"
                style={{ marginLeft: "8px" }}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(createFile(val.id));
                }}
              />
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
    <div className="folderSection" style={{ width: "100%" }}>
      <div
        className="folderTabs"
        style={{
          justifyContent: "space-between",
          width: "82%",
          marginLeft: "2rem",
        }}
      >
        <div>
          <h5>Manage</h5>
          <p>Click on the file to update it's Link:</p>
        </div>
        <div>
          <img
            src={AddFolderImg}
            alt="Add Folder Image"
            width="35"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(createFolder(0));
            }}
          />

          <img
            src={AddFileImg}
            alt="Add File Image"
            width="35"
            style={{ marginLeft: "8px" }}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(createFile(0));
            }}
          />
        </div>
      </div>
      <div style={{ marginLeft: "2rem" }}>{displayLoop(value)}</div>
    </div>
  );
}

export default Manage;
