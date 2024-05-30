import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import back_btn from "../../../../assets/img/buttons/back_btn.png";
import subjectsimg from "../../../../assets/img/subjects.png";
import subjects_lbl from "../../../../assets/img/subjects_lbl.png";
import { callSubjects } from "../../../../store/slices/subjectSlice";
import BreadCrumbComponent from "../BreadCrumbComponent";
import "../../../../ui/Loading.css";

const Subjects = () => {
  const { subjects } = useSelector((state) => state.subjects);
  const isLoading = useSelector((state) => state.subjects.loadingSubjects);
  const [isLoadingSubjectNames, setIsLoadingSubjectNames] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Simulating a delay to display subject names
    const delay = setTimeout(() => {
      setIsLoadingSubjectNames(false); // Set loading state to false after the delay
    }, 300); // Adjust the delay time as per your requirement

    return () => clearTimeout(delay); // Clear the timeout if the component unmounts
  }, []);

  useEffect(() => {
    dispatch(callSubjects());
  }, [dispatch]);

  const handleBack = () => {
    navigate("/Schoolbook");
  };

  return (
    <div className="w-full h-full">
      <div className="">
        {isLoading ? (
          <div className="flex justify-center my-40">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-[#4A4E69] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap my-28 sm:my-32 xl:px-10 lg:px-20 md:px-10 sm:px-10 xs:px-2 text-start mb-14">
              <div className="">
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
              <img
                alt="subjects"
                src={subjects_lbl}
                className="h-40 mx-auto" // Add 'mx-auto' class to center the image horizontally
              />
            </div>
            <div className="hidden sm:block  items-center -my-20 mb-10 justify-center">
              <img
                alt="subjects"
                src={subjects_lbl}
                className="sm:h-auto h-40 mx-auto" // Add 'mx-auto' class to center the image horizontally
              />
            </div>
            {isLoadingSubjectNames ? (
              <div className="flex justify-center py-10 text-white">
                <div className="loader-container">
                  <div className="loader-dot"></div>
                  <div className="loader-dot"></div>
                  <div className="loader-dot"></div>
                </div>
              </div>
            ) : (
              <div className="mx-auto mb-20 my-10 flex justify-center p-2">
                <div className="animate-fade-up mx-auto xl:max-w-6xl lg:ml-44 lg:mr-44 grid grid-cols-2 ml-1 mr-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 sm:gap-10 gap-5 justify-center items-center sm:justify-items-center">
                  {subjects.map((subject) => {
                    return (
                      <div
                        key={subject.subjectId}
                        onClick={() =>
                          navigate(`/quarters/${subject.subjectId}`, {
                            state: {
                              subjectName: subject.name,
                              gradeLevel: subject.gradeLevel,
                              topicBread: [
                                ...location?.state?.topicBread,
                                {
                                  label: subject.name,
                                  link: `/quarters/${subject.subjectId}`,
                                },
                              ],
                            },
                          })
                        }
                        className="relative cursor-pointer flex flex-col items-center justify-center  hover:scale-105 duration-150" // Add 'flex flex-col items-center justify-center' classes
                      >
                        <img
                          alt="subjects"
                          src={subjectsimg}
                          className="shadow-lg shadow-yellow-800 mx-auto" // Add 'mx-auto' class to center the image horizontally
                        />
                        <div className="absolute inset-0 sm:top-32 top-14 flex items-center justify-center z-10">
                          <div className="text-center w-40 text-sm sm:text-2xl text-white">
                            {subject.name
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
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Subjects;
