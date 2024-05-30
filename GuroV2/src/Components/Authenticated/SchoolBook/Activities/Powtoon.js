import React, { useEffect, useRef, useState } from "react";
import { baseURL } from "../../../../constants/constants";
import "../../../../ui/Loading.css";
import PDFViewer from "../../Lessons/PDFViewer";

const Powtoon = ({ activity }) => {
  const videoRef = useRef(null);
  const linesPerPage = 15;
  const [imageLoading, setImageLoading] = useState(true);
  const [pdfViewerKey, setPdfViewerKey] = useState(0);

  const splitDirectionsIntoPages = (directions) => {
    const lines = directions.split("\n");
    const pages = [];
    let currentPage = [];

    for (let i = 0; i < lines.length; i++) {
      if (currentPage.length === linesPerPage) {
        pages.push(currentPage.join("\n"));
        currentPage = [];
      }
      currentPage.push(lines[i]);
    }

    if (currentPage.length > 0) {
      pages.push(currentPage.join("\n"));
    }

    return pages;
  };

  const directionPages = splitDirectionsIntoPages(
    activity?.directions?.split(";;;")[1] || ""
  );

  const setPlaybackSpeed = (speed) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  useEffect(() => {
    setPlaybackSpeed(0.8);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = directionPages.length;

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    setPdfViewerKey((prevKey) => prevKey + 1); // Increment the key
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    setPdfViewerKey((prevKey) => prevKey + 1); // Increment the key
  };

  return (
    <div className="p-4 md:pl-8 lg:pl-20 md:pr-8 lg:pr-20">
      <div className="h-full py-0 flex flex-col justify-start items-center">
        {activity?.directions?.split(";;;")[0] ? (
          <div className="rounded-md w-full flex flex-col shadow-lg">
            <video
              className="w-full h-full rounded-md object-cover"
              ref={videoRef}
              src={baseURL + `/${activity.directions?.split(";;;")[0]}`}
              autoPlay={false}
              controls={true}
            />
          </div>
        ) : null}
        <div className="p-2"></div>
        {activity?.lectureImage && activity.lectureImage.endsWith(".pdf") ? (
          <div className="flex items-center justify-center p-5 pb-5 w-full bg-white border-b-8 border-gray-300 rounded-lg">
            <PDFViewer key={pdfViewerKey} activity={activity} />
          </div>
        ) : null}
        <div className=""></div>
        {activity?.lectureImage && !activity.lectureImage.endsWith(".pdf") && (
          <div className="rounded-md flex flex-col ">
            {imageLoading && (
              <div className="flex justify-center">
                <div className="loader-container">
                  <div className="loader-dot"></div>
                  <div className="loader-dot"></div>
                  <div className="loader-dot"></div>
                </div>
              </div>
            )}
            <img
              alt="mc"
              className=""
              src={baseURL + `/${activity.lectureImage}`}
              onLoad={() => setImageLoading(false)}
              style={{ display: imageLoading ? "none" : "block" }}
            />
          </div>
        )}
        <div className="p-2"></div>
        <div className=" border-b-8 border-gray-300 bg-white rounded-md w-full p-8 flex-col shadow-lg mb-5">
          {directionPages[currentPage - 1] && (
            <div>
              <p className="font-bold text-lg text-[#363636] tracking-tight mb-5">
                {activity?.subjectName?.toUpperCase().includes("ARALING")
                  ? "Pagtalakay"
                  : "Discussion"}
              </p>
              <span className="text-lg" style={{ whiteSpace: "pre-line" }}>
                {directionPages[currentPage - 1]}
              </span>
            </div>
          )}
          {totalPages > 1 && (
            <div className="flex justify-between mt-10">
              <div
                className="border-white border-8 rounded-2xl"
                style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)" }}
              >
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="bg-[#4CDAFE] disabled:bg-gray-400 rounded-md text-white text-base p-5 py-2 pr-10 pl-10 font-bold tracking-tight flex flex-wrap items-start justify-between text-right border-b-8 border-[#08B9FF] disabled:border-gray-500"
                >
                  Prev
                </button>
              </div>
              <p className="hidden md:flex text-base text-gray-400 items-center">
                Page {currentPage} of {totalPages}
              </p>
              <div
                className="border-white border-8 rounded-2xl"
                style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)" }}
              >
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="bg-[#4CDAFE] disabled:bg-gray-400 rounded-md text-white text-base p-5 py-2 pr-10 pl-10 font-bold tracking-tight flex flex-wrap items-start justify-between text-right border-b-8 border-[#08B9FF] disabled:border-gray-500 "
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Powtoon;
