import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useLocation, useNavigate } from "react-router-dom";
import back_Act from "../../../../assets/img/buttons/back_Act.png";
import { callSubjects } from "../../../../store/slices/subjectSlice";
import "../../../../ui/FlipCard.css";
import CW from "./CW";
import Hangman from "./Hangman";
import JumbledLetters from "./JumbledLetters";
import Maze from "./Maze";
import Mc from "./Mc";
import Mt from "./Mt";
import Otb from "./Otb";
import Powtoon from "./Powtoon";
import QuizShow from "./QuizShow";
import Saw from "./Saw";
import Tf from "./Tf";
import Game from "./WAM/Game";
import Wsc from "./Wsc";
import Empty from "./Empty";
import Pt from "./Pt";
import DragDrop from "./DragDrop";
import { Image } from "antd";
import { baseURL } from "../../../../constants/constants";

const Activity = () => {
  const { title, type, moduleId } = useParams();
  const { modules } = useSelector((state) => state.subjects);
  const [activity, setActivity] = useState([]);
  const navigate = useNavigate();
  const [key, setKey] = useState(Date.now());
  const location = useLocation();
  const dispatch = useDispatch();
  const [filteredModules, setFilteredModules] = useState([]);
  const slideCount =
    activity?.activity?.length || activity?.activity?.questions?.length || 0;
  const [loadingImages, setLoadingImages] = useState(true);
  const subjectName = location.state?.subjectName;

  useEffect(() => {
    setFilteredModules(modules.filter(({ isDone }) => isDone !== 1));
  }, [modules]);

  useEffect(() => {
    dispatch(callSubjects());
  }, [dispatch]);

  useEffect(() => {
    const getAct = filteredModules.find(
      (m) =>
        m.activityType === title && type === m.type && m.moduleId === moduleId
    );
    setActivity((prev) => ({ ...prev, ...getAct }));
  }, [title, type, moduleId, filteredModules]);

  const handleBack = () => {
    const breadCount = location?.state?.topicBread?.length || 0;

    if (title === "POWTOON") {
      navigate(
        `/levels/${location?.state?.subjectId}/${location?.state?.topicId}`,
        {
          state: {
            subjectName,
            topicBread: location?.state?.topicBread.splice(0, breadCount - 1),
          },
        }
      );
    } else {
      navigate(
        `/modules/${location?.state?.subjectId}/${location?.state?.topicId}`,
        {
          state: {
            subjectName,
            topicBread: location?.state?.topicBread,
          },
        }
      );
    }
  };

  const ShowAct = () => {
    if (title === "POWTOON") {
      //gear up
      return (
        <div>
          <Powtoon activity={activity} />
        </div>
      );
    } else if (title === "WAM") {
      return (
        <div>
          <Game />
        </div>
      );
    } else if (title === "OTB") {
      return slideCount === 0 ? (
        <div>
          <Empty activity={activity} />
        </div>
      ) : (
        <div>
          <Otb gradeLevel={activity.gradeLevel} activity={activity} />
        </div>
      );
    } else if (title === "TF") {
      return slideCount === 0 ? (
        <div>
          <Empty activity={activity} />
        </div>
      ) : (
        <div>
          <Tf gradeLevel={activity.gradeLevel} activity={activity} />
        </div>
      );
    } else if (title === "FITB") {
      //wind up
      return slideCount === 0 ? (
        <div>
          <Empty activity={activity} />
        </div>
      ) : (
        <div>
          {/* <Fitb /> */}
          <Hangman />
        </div>
      );
    } else if (title === "MT") {
      return slideCount === 0 ? (
        <div>
          <Empty activity={activity} />
        </div>
      ) : (
        <div>
          <Mt gradeLevel={activity.gradeLevel} activity={activity} />
        </div>
      );
    } else if (title === "Maze") {
      //wind up
      return (
        <div>
          <Maze />
        </div>
      );
    } else if (title === "MC") {
      return slideCount === 0 ? (
        <div>
          <Empty activity={activity} />
        </div>
      ) : (
        <div>
          <Mc gradeLevel={activity.gradeLevel} activity={activity} />
        </div>
      );
    } else if (title === "QuizShow") {
      return slideCount === 0 ? (
        <div>
          <Empty activity={activity} />
        </div>
      ) : (
        <div>
          <QuizShow gradeLevel={activity.gradeLevel} activity={activity} />
        </div>
      );
    } else if (title === "WSC") {
      return slideCount === 0 ? (
        <div>
          <Empty activity={activity} />
        </div>
      ) : (
        <div>
          <Wsc gradeLevel={activity.gradeLevel} activity={activity} />
        </div>
      );
    } else if (title === "SAW") {
      return slideCount === 0 ? (
        <div>
          <Empty activity={activity} />
        </div>
      ) : (
        <div>
          <Saw gradeLevel={activity.gradeLevel} activity={activity} />
        </div>
      );
    } else if (title === "JL") {
      return (
        <div>
          <JumbledLetters />
        </div>
      );
    } else if (title === "CW") {
      return (
        <div>
          {/* <Fitb /> */}
          <CW />
        </div>
      );
    } else if (title === "PT") {
      return (
        <div>
          <Pt
            gradeLevel={activity.gradeLevel}
            activity={activity}
            title={title}
          />
        </div>
      );
    } else if (title === "DD") {
      return (
        <div>
          <DragDrop />
        </div>
      );
    }
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="ml-2 pb-0 py-20 flex items-center text-[#363636] pr-2 font-bold md:pr-8 lg:pr-20">
        <button
          className="flex items-center text-xl text-[#363636] my-8 pl-2 font-semibold md:pl-8 lg:pl-20"
          onClick={handleBack}
        >
          <div className="flex items-center">
            <img
              alt="back"
              src={back_Act}
              className="sm:h-12 h-10 mx-auto " // Add 'relative z-10' to adjust the stacking order
            />
          </div>
        </button>
      </div>
      <div className="desktop pt-0 pb-5 p-20 w-screen ">
        <div className="">
          <div
            className=" border-white border-8 rounded-2xl"
            style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="bg-[#4CDAFE] rounded-md text-white text-3xl  p-5 font-bold tracking-tight flex flex-wrap items-start justify-between text-right border-b-8 border-[#08B9FF] ">
              <div className="text-left">
                <div>Grade: {activity.gradeLevel}</div>
                <div className="text-lg">Quarter: {activity.quarter}</div>
              </div>
              <div className="">
                <div className="flex justify-end text-lg">
                  {/* Topic: */}
                  {activity?.subjectName?.toUpperCase().includes("ARALING")
                    ? "Paksa:"
                    : "Topic:"}
                  <span className="font-normal pl-2">{activity.topicName}</span>
                </div>
              </div>
            </div>
          </div>
          {title !== "POWTOON" && title !== "PT" && (
            <div className="w-full mx-auto p-5 my-5 bg-opacity-50 bg-white backdrop-filter backdrop-blur-lg rounded-lg">
              <p className="font-bold text-[#363636] tracking-tight">
                {activity?.subjectName?.toUpperCase().includes("ARALING")
                  ? "Direksyon:"
                  : "Directions:"}
              </p>
              <div className="">{activity.directions}</div>
            </div>
          )}
        </div>
        {title !== "POWTOON" &&
          title !== "PT" &&
          activity.lecture !== "null" &&
          activity.lectureImage !== "null" &&
          activity.lecture !== "undefined" && (
            <>
              {activity.lecture || activity.lectureImage ? (
                <div
                  className="p-5 bg-white rounded-md "
                  style={{
                    whiteSpace: "pre-line",
                    maxHeight: "300px",
                    overflowY: "auto",
                  }}
                >
                  {activity.lecture && <div>{activity.lecture}</div>}
                  {activity.lectureImage && (
                    <div>
                      {loadingImages && (
                        <div className="w-32 h-32 flex items-center justify-center">
                          <div className="flex justify-center my-40">
                            <div className="loader-container">
                              <div className="choices-loader-dot"></div>
                              <div className="choices-loader-dot"></div>
                              <div className="choices-loader-dot"></div>
                            </div>
                          </div>
                        </div>
                      )}
                      <Image
                        alt="c"
                        src={baseURL + `/${activity.lectureImage}`}
                        className={`h-32 ${
                          loadingImages ? "hidden" : "" // Hide the image when loading
                        }`}
                        onLoad={() => setLoadingImages(false)} // Hide loading spinner on image load
                        onError={() => setLoadingImages(false)}
                      />
                    </div>
                  )}
                </div>
              ) : null}
            </>
          )}
      </div>
      <div className="mobile mb-5 p-3">
        <div
          className="border-white border-8 rounded-2xl"
          style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)" }}
        >
          <div className=" items-start justify-between text-right border-b-8 border-[#08B9FF] bg-[#4CDAFE] text-white text-xl sm:text-2xl p-5 font-bold rounded-md tracking-tight sm:grid-cols-none sm:flex-wrap-wrap sm:justify-center sm:py-3">
            <div className="text-left mb-4 sm:mb-0 sm:mr-10">
              <div>Grade: {activity.gradeLevel}</div>
              <div className="text-base">Quarter: {activity.quarter}</div>
            </div>
            <div className="flex">
              <div className="flex  text-base">
                {activity?.subjectName?.toUpperCase().includes("ARALING")
                  ? "Paksa:"
                  : "Topic:"}
                <span className="font-normal text-base pl-2">
                  {activity.topicName}
                </span>
              </div>
            </div>
          </div>
        </div>
        {title !== "POWTOON" && title !== "PT" && (
          <div className="w-full mx-auto p-5 my-5 bg-opacity-50 bg-white backdrop-filter backdrop-blur-lg rounded-lg">
            <p className="font-bold text-[#363636] tracking-tight">
              {activity?.subjectName?.toUpperCase().includes("ARALING")
                ? "Direksyon:"
                : "Directions:"}
            </p>
            <div className="">{activity.directions}</div>
          </div>
        )}
        {title !== "POWTOON" &&
          title !== "PT" &&
          activity.lecture !== "null" &&
          activity.lectureImage !== "null" &&
          activity.lecture !== "undefined" && (
            <div>
              {activity.lecture || activity.lectureImage ? (
                <div
                  className="p-5 bg-white rounded-md "
                  style={{
                    whiteSpace: "pre-line",
                    maxHeight: "300px",
                    overflowY: "auto",
                  }}
                >
                  {activity.lecture && <div>{activity.lecture}</div>}
                  {activity.lectureImage && (
                    <div>
                      {loadingImages && (
                        <div className="w-32 h-32 flex items-center justify-center">
                          <div className="flex justify-center my-40">
                            <div className="loader-container">
                              <div className="choices-loader-dot"></div>
                              <div className="choices-loader-dot"></div>
                              <div className="choices-loader-dot"></div>
                            </div>
                          </div>
                        </div>
                      )}
                      <Image
                        alt="c"
                        src={baseURL + `/${activity.lectureImage}`}
                        className={`h-32 ${
                          loadingImages ? "hidden" : "" // Hide the image when loading
                        }`}
                        onLoad={() => setLoadingImages(false)} // Hide loading spinner on image load
                        onError={() => setLoadingImages(false)}
                      />
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          )}
      </div>
      <div className="p-2 pb-0 py-0" key={key}>
        {ShowAct()}
      </div>
    </div>
  );
};

export default Activity;
