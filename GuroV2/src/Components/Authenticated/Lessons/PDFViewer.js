import React, { useState, useEffect } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import "../../../ui/FlipCard.css";
import { baseURL } from "../../../constants/constants";

const PDFViewer = () => {
  const { title, type } = useParams();
  const { modules } = useSelector((state) => state.subjects);
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAct = modules.find(
      (m) => m.activityType === title && type === m.type
    );
    setActivity(getAct);
  }, [title, type, modules]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchPDF = async () => {
      try {
        const response = await fetch(baseURL + "/" + activity?.lectureImage);
        if (!response.ok) {
          throw new Error("Failed to fetch PDF file");
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (activity) {
      fetchPDF();
    }
  }, [activity]);

  if (!activity) {
    return <div>No activity found</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const docs = [
    {
      uri: baseURL + "/" + activity.lectureImage,
      fileType: "pdf",
      fileName: " ",
    },
  ];

  return (
    <div className="w-full">
      <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
    </div>
  );
};

export default PDFViewer;
