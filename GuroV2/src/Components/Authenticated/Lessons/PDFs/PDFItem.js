import React from "react";
import bookstack from "../../../../assets/img/pdfs.png";
import { useNavigate } from "react-router-dom";

const PDFItem = ({ pdf }) => {
  const navigate = useNavigate();

  const redirectToLessonViewer = () => {
    navigate(`/lessonviewer`, {
      state: pdf,
    });
  };

  return (
    <div className="">
      <div key={pdf.id}>
        <section className="">
          <div className="flex flex-col justify-center items-center ">
            <div className="!z-5 relative flex flex-col rounded-[20px] xs:max-w-[300px]  sm:max-w-[300px] md:max-w-[200px] lg:max-w-[300px] shadow-lg bg-white bg-clip-border shadow-3xl shadow-shadow-500 w-full !p-4 3xl:p-![18px] undefined hover:scale-105 duration-150">
              <div className="h-full w-full">
                <div className="relative w-full">
                  <img
                    alt="books"
                    className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
                    src={bookstack}
                  />
                </div>
                <div className="cursor-default mb-3 flex items-center justify-between px-1 md:items-start">
                  <div className="mb-2 overflow-hidden">
                    <h1
                      title={pdf.title}
                      className="text-lg font-bold text-navy-700 truncate"
                    >
                      {pdf.title}
                    </h1>
                    <h2
                      title={pdf.description}
                      className="mt-1 text-sm font-base text-gray-500 md:mt-2 truncate"
                    >
                      {pdf.description}
                    </h2>
                  </div>
                </div>
                <div className="flex items-center justify-center ">
                  <button
                    href=""
                    onClick={redirectToLessonViewer}
                    className="linear bg-[#4A4E69] w-full rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 cursor-pointer "
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PDFItem;
