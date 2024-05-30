import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import back_btn from "../../../../assets/img/buttons/back_btn.png";
import book from "../../../../assets/img/boards/book.png";
import topic_lbl from "../../../../assets/img/topic_container.png";
import topic_lbl_ap from "../../../../assets/img/topic_container_ap.png";
import BreadCrumbComponent from "../BreadCrumbComponent";
import "../../../../ui/Loading.css";

const Topics = () => {
  const { topics } = useSelector((state) => state.subjects);
  const isLoading = useSelector((state) => state.subjects.loadingTopics);
  const navigate = useNavigate();
  const location = useLocation();
  const quarter = location.state?.quarter;
  const subjectName = location.state?.subjectName;

  const topicOnClick = (topic) => {
    navigate(`/levels/${topic.subjectId}/${topic.topicId}`, {
      state: {
        quarter,
        subjectName,
        topicBread: [
          ...location?.state?.topicBread,
          {
            label: topic.title,
            link: `/levels/${topic.subjectId}/${topic.topicId}`,
          },
        ],
      },
    });
  };

  const handleBack = () => {
    const breadCount = location?.state?.topicBread?.length || 0;
    navigate(`/quarters/${location.state?.subjectId}`, {
      state: {
        quarter,
        subjectName,
        topicBread: location?.state?.topicBread?.splice(0, breadCount - 1),
      },
    });
  };

  return (
    <div className="w-full h-full">
      <div className="">
        <div className="flex flex-wrap my-28 sm:my-32 xl:px-10 lg:px-20 md:px-10 sm:px-10 xs:px-2 text-start mb-14">
          <div>
            <div className="flex flex-wrap items-center text-3xl font-bold text-[#363636] tracking-tight">
              <button onClick={handleBack}>
                <img
                  alt="back"
                  src={back_btn}
                  className="sm:h-16 mb-2 h-10 mx-auto" // Add 'mx-auto' class to center the image horizontally
                />
              </button>
              <div className="ml-5">
                <BreadCrumbComponent
                  bread={location?.state?.topicBread}
                  params={location?.state}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="block sm:hidden  items-center -my-8 mb-2 justify-center">
          {subjectName?.toUpperCase().includes("ARALING") ? (
            <img alt="subjects" src={topic_lbl_ap} className="h-40 mx-auto" />
          ) : (
            <img alt="subjects" src={topic_lbl} className="h-40 mx-auto" />
          )}
        </div>
        <div className="hidden sm:block  items-center -my-20 mb-10 justify-center">
          {subjectName?.toUpperCase().includes("ARALING") ? (
            <img
              alt="subjects"
              src={topic_lbl_ap}
              className="sm:h-auto h-40 mx-auto"
            />
          ) : (
            <img
              alt="subjects"
              src={topic_lbl}
              className="sm:h-auto h-40 mx-auto"
            />
          )}
        </div>
        {isLoading ? (
          <div className="flex justify-center my-20">
            <div className="loader-container">
              <div className="loader-dot"></div>
              <div className="loader-dot"></div>
              <div className="loader-dot"></div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center my-10 p-2">
            {topics && topics.length > 0 && (
              <div className="animate-fade-up mx-auto xl:max-w-6xl lg:ml-44 lg:mr-44 grid grid-cols-2 ml-1 mr-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 sm:gap-10 gap-5 justify-center items-center sm:justify-items-center">
                {topics &&
                  topics.map((topic) => (
                    <div
                      className="relative hover:scale-105 duration-150 cursor-pointer"
                      key={topic.id}
                      onClick={() => topicOnClick(topic)}
                    >
                      <img
                        className="w-auto h-auto shadow-lg rounded-lg shadow-yellow-800 mx-auto"
                        alt="book"
                        src={book}
                      />
                      <div className="sm:flex hidden absolute inset-0  items-center justify-center z-10">
                        <div className="w-4/5 text-center sm:text-2xl text-base font-medium">
                          {topic.title
                            .split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() +
                                word.slice(1).toLowerCase()
                            )
                            .join(" ")}
                        </div>
                      </div>
                      <div className="sm:hidden flex absolute inset-0 items-center justify-center z-10">
                        <div className="w-4/5 text-center sm:text-2xl xl:text-base text-base font-medium">
                          {topic.title.split(" ").length > 5
                            ? topic.title
                                .split(" ")
                                .slice(0, 5) // Keep only the first 5 words
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() +
                                    word.slice(1).toLowerCase()
                                )
                                .join(" ") + "..." // Add ellipsis at the end
                            : topic.title
                                .split(" ")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() +
                                    word.slice(1).toLowerCase()
                                )
                                .join(" ")}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
            {topics.length === 0 && (
              <div className="flex justify-center my-5">No topics found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Topics;
