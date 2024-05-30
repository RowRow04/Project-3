import React from "react";
import dl from "../assets/img/buttons/dl_btn.png";

const Download = () => {
  const downloadFile = () => {
    const url = "https://demo.schoolbook.ph:9003/uploads/apk/schoolverse.apk";
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "schoolverse.apk");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex justify-center">
      <button onClick={downloadFile}>
        <img alt="download" src={dl} className="mx-auto text-white"></img>
      </button>
    </div>
  );
};

export default Download;
