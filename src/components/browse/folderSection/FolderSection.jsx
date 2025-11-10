import React, { useState } from "react";
import "./FolderSection.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createFile,
  createFolder,
} from "../../../features/createFolderFilesSlice";
import { openFileLink } from "../../../features/openFileSlice";
import { changeBreadcrumb } from "../../../features/breadcrumbSlice";
import FolderImg from "/folder.webp";
import FolderOpenImg from "/open-folder.webp";
import FileImg from "/file.webp";
import AddFolderImg from "/add-folder.webp";
import AddFileImg from "/add-document.webp";

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
              val.type === "folder"
                ? toggleFolder(val.id)
                : dispatch(
                    openFileLink(val.url),
                    dispatch(changeBreadcrumb(val.name))
                  )
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
              <img src={FileImg} alt="Folder Image" width="17" />
              // <i style={{color:'#294bca'}} className="bi bi-file-earmark"></i>
            )}

            <p>{val.name}</p>
          </div>

          {val.type === "folder" && (
            <div>
              {/* <i
                className="bi bi-folder-plus folderIcon"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(createFolder(val.id));
                }}
              ></i> */}
              <img
                src={AddFolderImg}
                alt="Add Folder Image"
                width="20"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(createFolder(val.id));
                }}
              />
              {/* <i
                className="bi bi-file-earmark-plus folderIcon"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(createFile(val.id));
                }}
              ></i> */}
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
    <div className="folderSection">
      <div className="folderTabs">
        <div>
          <h5>Browse</h5>
        </div>
        <div>
          {/* <i
            className="bi bi-folder-plus folderIcon"
            onClick={() => dispatch(createFolder(0))}
          ></i> */}
          <img
            src={AddFolderImg}
            alt="Add Folder Image"
            width="20"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(createFolder(0));
            }}
          />
          {/* <i
            className="bi bi-file-earmark-plus folderIcon"
            onClick={() => dispatch(createFile(0))}
          ></i> */}
          <img
            src={AddFileImg}
            alt="Add File Image"
            width="19"
            style={{ marginLeft: "8px" }}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(createFile(0));
            }}
          />
        </div>
      </div>

      {displayLoop(value)}
    </div>
  );
}

export default FolderSection;
