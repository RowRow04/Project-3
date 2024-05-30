import { Document, Page } from "react-pdf";
import { useState } from "react";
import snowWhitePdf from "../../../../../assets/pdfs/SnowWhiteandtheSevenDwarfs.pdf";

const Viewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <Document
        file={snowWhitePdf}
        onLoadSuccess={onDocumentLoadSuccess}
        className="pdf-document"
      >
        <Page pageNumber={currentPage} />
      </Document>
      <div>
        <p>
          Page {currentPage} of {numPages}
        </p>
        <button disabled={currentPage <= 1} onClick={goToPrevPage}>
          Previous
        </button>
        <button disabled={currentPage >= numPages} onClick={goToNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Viewer;
