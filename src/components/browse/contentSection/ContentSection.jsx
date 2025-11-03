import React, { useEffect, useState } from "react";
import "./ContentSection.css";
import { useSelector } from "react-redux";
 

function ContentSection() {
  const selectedFileUrl = useSelector(state => state.changeFileLink.link)
  const breacrumbTitle = useSelector(state => state.breacrumbTitle.value)
  const [isLoading,setIsLoading] = useState(false)
  
  useEffect(()=>{
    if(selectedFileUrl){
      setIsLoading(true)
    }
  },[selectedFileUrl])

  return (
    <div className="mainContentSection">
    <div className="breadCrumb">
<h6>{breacrumbTitle}</h6>
    </div>
     <div className="contentSection" >
      {isLoading && (
        <div
          className="loading-overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.8)",
            zIndex: 10,
          }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {selectedFileUrl ? (
        <iframe
        className="contentSection"
          src={selectedFileUrl}
          title="Google Sheet Viewer"
          // style={{ width: "100%", height: "90vh", border: "none" }}
          onLoad={() => setIsLoading(false)}
        ></iframe>
      ) : (
        <p style={{ textAlign: "center" }}>
          No files selected.
        </p>
      )}
    </div>
    </div>
  );
}

export default ContentSection;
