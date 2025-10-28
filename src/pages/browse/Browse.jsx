import React from "react";
import "./Browse.css";
import ContentSection from "../../components/browse/contentSection/ContentSection";
import FolderSection from "../../components/browse/folderSection/FolderSection";

function Browse() {
  return (
    <div className="browseScreen">
      <FolderSection />
      <ContentSection />
    </div>
  );
}

export default Browse;
