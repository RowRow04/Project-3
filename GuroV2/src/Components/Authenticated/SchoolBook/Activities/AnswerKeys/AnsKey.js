import { Image, Pagination } from "antd";
import React from "react";
import { baseURL } from "../../../../../constants/constants";

const AnsKey = ({
  activity,
  currentSlide,
  slideCount,
  currentPage,
  itemsPerPage,
  totalItems,
  setCurrentPage,
}) => {
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="">
      <div className="">
        <div className="flex justify-center p-5 ">
          <div
            className={` ${
              currentSlide === slideCount
                ? "h-fit w-full overflow-y-auto"
                : "answer-card"
            }`}
          >
            <div className="">
              <div className="flex items-center">
                <div className="border-t flex-grow border-white"></div>
                <span className="px-4 text-white">
                  <div className="flex items-center  justify-center ">
                    {activity?.subjectName?.toUpperCase().includes("ARALING")
                      ? "Mga Sagot"
                      : "Answer Key"}
                  </div>
                </span>
                <div className="border-t flex-grow border-white"></div>
              </div>
              <div className="my-10 rounded-lg  bg-white shadow-lg border-b-8">
                {activity?.activity
                  ?.slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((otbq, index) => {
                    const actualIndex =
                      (currentPage - 1) * itemsPerPage + index + 1;
                    return (
                      <div
                        key={otbq.questionId}
                        className="justify-center items-center my-5 gap-5"
                      >
                        <div className="items-center w-full p-6 ">
                          <h5 className="mb-2 text-xl font-medium leading-tight">
                            {activity?.subjectName
                              ?.toUpperCase()
                              .includes("ARALING")
                              ? "Tanong # " + actualIndex
                              : "Question # " + actualIndex}
                          </h5>
                          <p className="text-[18px] mb-2">{otbq.question}</p>
                          <div>
                            {typeof otbq.image !== "undefined" &&
                              otbq.image !== null &&
                              otbq.image !== "" && (
                                <Image
                                  className="h-32"
                                  alt="c"
                                  src={baseURL + `/${otbq.image}`}
                                />
                              )}
                          </div>
                          <div className="flex flex-wrap">
                            <p className="mr-2">
                              {activity?.subjectName
                                ?.toUpperCase()
                                .includes("ARALING")
                                ? "Sagot:"
                                : "Answer:"}
                            </p>
                            {otbq.choices
                              .filter((f) => f.isCorrect === 1)
                              .map((c, index) => {
                                const pattern =
                                  /(?<=\S)([^\w\s]|[\uD800-\uDBFF][\uDC00-\uDFFF])(?=\S)/gu;
                                const outputString = c?.description?.replace(
                                  pattern,
                                  " $1 "
                                );
                                return (
                                  <div key={index}>
                                    {c.description ? (
                                      <p className="flex mr-2">
                                        {outputString}
                                      </p>
                                    ) : (
                                      <p className="mr-2">
                                        <Image
                                          alt="fitb"
                                          className="h-12"
                                          src={
                                            baseURL +
                                            `/${
                                              otbq.choices.find(
                                                (ans) => ans.isCorrect === 1
                                              ).image
                                            }`
                                          }
                                        />
                                      </p>
                                    )}
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                <div className="flex justify-center p-5">
                  <Pagination
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={totalItems}
                    onChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnsKey;
