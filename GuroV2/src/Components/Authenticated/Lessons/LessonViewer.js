import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import back_btn from "../../../assets/img/buttons/back_btn.png";
import { baseURL } from "../../../constants/constants";
import "../../../ui/FlipCard.css";

const LessonViewer = () => {
  const location = useLocation();
  const pdf = location.state;
  const navigate = useNavigate();

  if (!pdf) {
    return <div>No PDF found.</div>;
  }

  const docs = [
    {
      uri: baseURL + "/" + pdf.file,
      fileType: "pdf",
      fileName: " ",
    },
  ];

  return (
    <div className="w-full">
      <div className="min-h-screen w-full p-10">
        <div className="sm:my-36 my-20 w-full">
          <div className="text-3xl font-bold text-[#363636] tracking-tight">
            <button onClick={() => navigate(-1)}>
              <img alt="back" src={back_btn} className="sm:h-16 h-10 mx-auto" />
            </button>
          </div>
          <div className="shadow-lg xs:mb-4 lg:mb-10 w-full mx-auto p-5 my-5 bg-opacity-50 bg-white backdrop-filter backdrop-blur-lg rounded-lg">
            <div>Title: {pdf.title}</div>
          </div>
          <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
        </div>
      </div>
    </div>
  );
};

export default LessonViewer;
