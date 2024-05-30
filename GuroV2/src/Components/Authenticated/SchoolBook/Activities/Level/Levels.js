import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import average from "../../../../../assets/img/boards/average.png";
import average_locked from "../../../../../assets/img/boards/average_locked.png";
import difficult from "../../../../../assets/img/boards/difficult.png";
import difficult_locked from "../../../../../assets/img/boards/difficult_locked.png";
import easy from "../../../../../assets/img/boards/easy.png";
import easy_locked from "../../../../../assets/img/boards/easy_locked.png";
import back_btn from "../../../../../assets/img/buttons/back_btn.png";

import average_ap from "../../../../../assets/img/boards/average_ap.png";
import average_locked_ap from "../../../../../assets/img/boards/average_locked_ap.png";
import difficult_ap from "../../../../../assets/img/boards/difficult_ap.png";
import difficult_locked_ap from "../../../../../assets/img/boards/difficult_locked_ap.png";
import easy_ap from "../../../../../assets/img/boards/easy_ap.png";
import easy_locked_ap from "../../../../../assets/img/boards/easy_locked_ap.png";

import lvl_container from "../../../../../assets/img/lvl_container.png";
import lvl_container_ap from "../../../../../assets/img/lvl_container_ap.png";
import {
  callSubjectModules,
  callsubjectAverageModules,
  callsubjectDifficultModules,
  callsubjectEasyModules,
} from "../../../../../store/slices/subjectSlice";
import ItemBoard from "../../../../../ui/ItemBoard";
import BreadCrumbComponent from "../../BreadCrumbComponent";

const Levels = () => {
  const { modules, levels } = useSelector((state) => state.subjects);
  const isLoading = useSelector((state) => state.subjects.loadingModules);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { subjectId, topicId } = useParams();
  const quarter = location.state?.quarter;
  const subjectName = location.state?.subjectName;

  const lvl = [
    {
      id: 1,
      title: modules[0]?.subjectName?.toUpperCase().includes("ARALING")
        ? "Antas: Madali"
        : "Level: Easy",
      image: modules[0]?.subjectName?.toUpperCase().includes("ARALING")
        ? levels.easy === 0
          ? easy_locked_ap
          : easy_ap
        : levels.easy === 0
        ? easy_locked
        : easy,
      clickable: levels.easy !== 0,
    },
    {
      id: 2,
      title: modules[0]?.subjectName?.toUpperCase().includes("ARALING")
        ? "Antas: Katamtaman"
        : "Level: Average",
      image: modules[0]?.subjectName?.toUpperCase().includes("ARALING")
        ? levels.average === 0
          ? average_locked_ap
          : average_ap
        : levels.average === 0
        ? average_locked
        : average,
      clickable: levels.average !== 0,
    },
    {
      id: 3,
      title: modules[0]?.subjectName?.toUpperCase().includes("ARALING")
        ? "Antas: Mahirap"
        : "Level: Difficult",
      image: modules[0]?.subjectName?.toUpperCase().includes("ARALING")
        ? levels.difficult === 0
          ? difficult_locked_ap
          : difficult_ap
        : levels.difficult === 0
        ? difficult_locked
        : difficult,
      clickable: levels.difficult !== 0,
    },
  ];

  useEffect(() => {
    dispatch(callSubjectModules({ subjectId, topicId }));
  }, [dispatch, subjectId, topicId, quarter]);

  const getModulesClick = (v) => {
    if (v === 0) {
      dispatch(callsubjectEasyModules({ subjectId, topicId }));

      navigate(`/modules/${subjectId}/${topicId}`, {
        state: {
          subjectId,
          subjectName,
          topicId,
          quarter,
          topicBread: [
            ...location?.state?.topicBread,
            {
              label: lvl[0].title,
              link: `/levels/${subjectId}/${topicId}`,
            },
          ],
        },
      });
    } else if (v === 1) {
      dispatch(callsubjectAverageModules({ subjectId, topicId }));
      navigate(`/modules/${subjectId}/${topicId}`, {
        state: {
          subjectId,
          subjectName,
          topicId,
          quarter,
          topicBread: [
            ...location?.state?.topicBread,
            {
              label: lvl[1].title,
              link: `/levels/${subjectId}/${topicId}`,
            },
          ],
        },
      });
    } else if (v === 2) {
      dispatch(callsubjectDifficultModules({ subjectId, topicId }));
      navigate(`/modules/${subjectId}/${topicId}`, {
        state: {
          subjectId,
          subjectName,
          topicId,
          quarter,
          topicBread: [
            ...location?.state?.topicBread,
            {
              label: lvl[2].title,
              link: `/levels/${subjectId}/${topicId}`,
            },
          ],
        },
      });
    }
  };

  const moduleFirmUp = (module) => {
    dispatch(callSubjectModules({ subjectId, topicId }));
    navigate(
      `/activity/${module.activityType}/${module.type}/${module.moduleId}`,
      {
        state: {
          subjectId,
          subjectName,
          topicId,
          quarter,
          topicBread: [
            ...location?.state?.topicBread,
            {
              label: lvl[2].title,
              link: `/levels/${subjectId}/${topicId}`,
            },
          ],
        },
      }
    );
  };

  const handleBack = () => {
    const breadCount = location?.state?.topicBread?.length || 0;
    navigate(`/topics`, {
      state: {
        subjectId,
        subjectName,
        quarter,
        topicBread: location?.state?.topicBread?.splice(0, breadCount - 1),
      },
    });
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="my-28 sm:my-32">
        <div className="flex flex-wrap xl:px-10 lg:px-20 md:px-10 sm:px-10 xs:px-2 text-start mb-14">
          <div>
            <div className="flex flex-wrap   items-center text-3xl font-bold text-[#363636] tracking-tight">
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
        {isLoading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <div className="loader-container">
              <div className="loader-dot"></div>
              <div className="loader-dot"></div>
              <div className="loader-dot"></div>
            </div>
          </div>
        ) : (
          <>
            {modules.length > 0 && (
              <div className="flex flex-col mb-10 justify-center items-center text-center">
                <div className="max-w-sm text-sm text-white ml-10 mr-10">
                  {modules[0]?.subjectName?.toUpperCase().includes("ARALING")
                    ? "Pindutin ang icon sa ibaba upang tingnan ang aralin para sa paksa na ito."
                    : "Click the icon below to view the lesson for this topic "}
                </div>
                <div className="animate-fade-down font-light p-10 py-0 pb-0 max-w-lg mt-5 text-sm">
                  {modules.map((module) => (
                    <div
                      className=""
                      key={module.moduleId}
                      onClick={() => moduleFirmUp(module)}
                    >
                      <div className="">
                        <span className="">
                          <ItemBoard item={module}></ItemBoard>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center p-10 justify-center sm:my-0 mb-10 flex-col">
              <div className=" animate-fade-up bg-[#0078EB] shadow-lg p-10 mb-28 rounded-xl border-b-8 border-l-8 border-r-8 border-[#0060b9]">
                <div className="flex justify-center -my-10 mb-10 sm:-my-28 sm:mb-20">
                  {modules[0]?.subjectName
                    ?.toUpperCase()
                    .includes("ARALING") ? (
                    <img
                      alt="subjects"
                      src={lvl_container_ap}
                      className="w-[600PX]"
                    />
                  ) : (
                    <img
                      alt="subjects"
                      src={lvl_container}
                      className="w-[600PX]"
                    />
                  )}
                </div>
                <div className="flex flex-col md:flex-row space-x-0 md:space-x-8 space-y-12  md:space-y-0 justify-center items-center mt-10 mb-10 ">
                  {lvl.map((level, i) => {
                    const conditionalClass = level.clickable
                      ? "cursor-pointer hover:scale-105 duration-150"
                      : "cursor-not-allowed";
                    return (
                      <div
                        key={level.id}
                        className={`flex justify-center items-center  ${conditionalClass}`}
                        onClick={() => level.clickable && getModulesClick(i)}
                      >
                        <div>
                          <div className="flex flex-col rounded-xl bg-white shadow-xl">
                            <img
                              src={level.image}
                              className="max-h-80"
                              alt={`Level ${level.id}`}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Levels;
