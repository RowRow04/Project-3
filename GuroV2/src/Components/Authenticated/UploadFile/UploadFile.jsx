import React from "react";
import schoolbook_bg from "../../../assets/img/schoolbook_bg.png";

function UploadFile() {
  return (
    <div className="overflow-hidden min-h-screen">
      <div id="Schoolbook">
        <img
          alt="bg"
          src={schoolbook_bg}
          className="w-full -mb-28 sm:mb-0"
          data-aos="zoom"
        ></img>
        <div className="flex justify-center">
          <div className="hidden sm:block z-20"></div>
        </div>
      </div>
    </div>
  );
}

export default UploadFile;
