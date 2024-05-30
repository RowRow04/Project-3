import {
  Carousel,
  Image,
  Modal,
  Pagination,
  Progress,
  notification,
} from "antd";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import prev from "../../../../assets/img/buttons/back_maze.png";
import next from "../../../../assets/img/buttons/next_maze.png";
import again from "../../../../assets/img/buttons/play_again.png";
import reset from "../../../../assets/img/buttons/reset_button.png";
import toAnsKey from "../../../../assets/img/buttons/toAnswerKey.png";
import toMaze from "../../../../assets/img/buttons/toMaze.png";
import toAnsKey_ap from "../../../../assets/img/buttons/ans_summary_ap.png";
import again_ap from "../../../../assets/img/buttons/ap_play_again.png";
import prev_ap from "../../../../assets/img/buttons/back_maze_ap.png";
import next_ap from "../../../../assets/img/buttons/next_maze_ap.png";
import toMaze_ap from "../../../../assets/img/buttons/toMaze_ap.png";
import { baseURL } from "../../../../constants/constants";
import {
  handleAnswer,
  saveMazeRoute,
} from "../../../../store/slices/maze-slice";
import "../../../../ui/FlipCard.css";
import MazeGame from "./Maze/MazeGame";
import { generateMaze } from "./Maze/util";
import TextSpeech from "./TextSpeech";
import "./style.css";

const { confirm } = Modal;

const itemsPerPage = 5;

const Maze = () => {
  const dispatch = useDispatch();
  const { modules } = useSelector((state) => state.subjects);
  const { title, type } = useParams(); // ? OTB ex.
  const [size, setSize] = useState(5);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [activity, setActivity] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPrimary, setIsPrimary] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [clickedIndexes, setClickedIndexes] = useState([]);
  const slideCount = activity?.activity?.length || 0;
  const [showProgress, setShowProgress] = useState(true);
  const progress = ((currentSlide + 1) / slideCount) * 100;
  const Carouselref = useRef(null);
  const { userDetails } = useSelector((state) => state.auth);
  const { mazeRoutes, mazeAnswers } = useSelector((state) => state.maze);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = activity?.activity?.length;

  const handleReset = () => {
    setIsFlipped(false);
    setIsPrimary(false);
    setClickedIndex(null);
    setClickedIndexes([]);
  };

  const handleProgress = () => {
    setShowProgress(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const PlayAgain = (props) => {
    const { style } = props;

    const handlePlayAgain = () => {
      // Reset the necessary states and dispatch any actions if needed
      handleResetAnswer();
      handleReset(); // Optional: Reset any other states if needed

      // Go to the first slide
    };

    return (
      <div>
        <div
          className=""
          style={{ ...style, cursor: "pointer" }}
          onClick={handlePlayAgain}
        >
          <div className="rounded-lg">
            {activity?.subjectName?.toUpperCase().includes("ARALING") ? (
              <img alt="back" className="max-h-16" src={again_ap}></img>
            ) : (
              <img alt="back" className="max-h-16" src={again}></img>
            )}
          </div>
        </div>
      </div>
    );
  };

  const SampleNextArrow = (props) => {
    const { style, onClick, currentSlide, slideCount } = props;
    if (currentSlide === slideCount - 0) {
      return null; // hide the button if it's the last slide
    }
    return (
      <div>
        <div
          className="flex justify-center "
          style={{ ...style, display: "block", cursor: "pointer" }}
          onClick={() => {
            onClick();
            handleReset();
            if (currentSlide === slideCount - 1) {
              handleProgress();
            }
          }}
        >
          <div className="rounded-lg">
            {activity?.subjectName?.toUpperCase().includes("ARALING") ? (
              <img alt="back" className="w-full" src={next_ap}></img>
            ) : (
              <img alt="back" className="w-full" src={next}></img>
            )}
          </div>
        </div>
      </div>
    );
  };

  const SamplePrevArrow = (props) => {
    const { style, onClick } = props;
    return (
      <div
        className="flex justify-center"
        style={{ ...style, display: "block", cursor: "pointer" }}
        onClick={() => {
          onClick();
          handleReset();
          setShowProgress(true);
        }}
      >
        <div className="rounded-lg">
          {activity?.subjectName?.toUpperCase().includes("ARALING") ? (
            <img alt="back" className="w-full" src={prev_ap}></img>
          ) : (
            <img alt="back" className="w-full" src={prev}></img>
          )}
        </div>
      </div>
    );
  };

  const generateUniqueRandomNumbers = (count, choices, mazeSize) => {
    let objects = [];

    while (objects.length < count) {
      let randomNumberX = (
        Math.floor(Math.random() * mazeSize - 1) + 1
      ).toFixed(0);
      let randomNumberY = (
        Math.floor(Math.random() * mazeSize - 1) + 1
      ).toFixed(0);

      if (+randomNumberX === 0) {
        randomNumberX = 1;
      }

      if (+randomNumberY === 0) {
        randomNumberY = 1;
      }

      let isDuplicate = objects.some(function (obj) {
        return (
          +obj.x === Math.abs(randomNumberX) &&
          +obj.y === Math.abs(randomNumberY)
        );
      });

      if (!isDuplicate) {
        let newObj = {
          x: Math.abs(randomNumberX).toString(),
          y: Math.abs(randomNumberY).toString(),
          isCorrect: choices?.[objects.length]?.isCorrect,
          choiceId: choices?.[objects.length]?.choiceId,
        };
        objects.push(newObj);
      }
    }

    return objects;
  };

  const generateRandomMaze = (count, maze) => {
    var objects = [];

    while (objects.length < count) {
      objects.push(generateMaze(maze, maze));
    }

    return objects;
  };

  useEffect(() => {
    const getAct = modules.find(
      (m) => m.activityType === title && type === m.type
    );

    setSize(getAct?.mazeSize);
    setActivity(getAct);
  }, [title, modules, type]);

  useEffect(() => {
    const act = modules.find(
      (m) => m.activityType === title && type === m.type
    );
    if (!mazeRoutes?.[userDetails?.studentId]?.[act?.moduleId]?.length > 0) {
      dispatch(
        saveMazeRoute({
          studentId: userDetails?.studentId,
          key: act?.moduleId,
          value: generateRandomMaze(act?.activity?.length, act?.mazeSize),
        })
      );
      dispatch(
        handleAnswer({
          studentId: userDetails?.studentId,
          key: act?.moduleId,
          value: act?.activity?.map((maze, index) => {
            return {
              questionId: maze.questionId,
              choiceId: "",
              answer: "",
              dateAnswered: "",
              isCorrect: "",
              destination: generateUniqueRandomNumbers(
                maze.choices.length,
                maze.choices,
                act?.mazeSize
              ),
              position: [0, 0],
            };
          }),
        })
      );
      setSelectedAnswers(
        act?.activity?.map((maze, index) => {
          return {
            questionId: maze.questionId,
            choiceId: "",
            answer: "",
            dateAnswered: "",
            isCorrect: "",
            destination: generateUniqueRandomNumbers(
              maze.choices.length,
              maze.choices,
              act?.mazeSize
            ),
            position: [0, 0],
          };
        })
      );
    } else {
      setSelectedAnswers(
        mazeAnswers?.[userDetails?.studentId]?.[act?.moduleId]
      );
    }
  }, [dispatch, mazeAnswers, mazeRoutes, modules, title, type, userDetails]);

  const handleSubmitAnswer = (indexPosition, answer, isCorrect) => {
    const updatedAnswers = [
      ...mazeAnswers?.[userDetails?.studentId]?.[activity?.moduleId],
    ].map((answers, i) => {
      if (i === currentSlide) {
        return {
          ...answers,
          dateAnswered: moment().format("YYYY-MM-DD HH:mm:ss"),
          answer: answer,
          choiceId: answer,
          isCorrect: isCorrect,
        };
      }
      return answers;
    });
    setSelectedAnswers(updatedAnswers);
    dispatch(
      handleAnswer({
        studentId: userDetails?.studentId,
        key: activity?.moduleId,
        value: updatedAnswers,
      })
    );
    setShowConfirmationModal(true);
  };

  const resetPerQuestion = () => {
    confirm({
      title: "Confirm",
      // icon: <ExclamationCircleFilled />,
      content: activity?.subjectName?.toUpperCase().includes("ARALING")
        ? "Sigurado ka bang nais mong i-reset ang iyong sagot?"
        : "Are you sure you want to reset your answer?",

      centered: true,
      okText: activity?.subjectName?.toUpperCase().includes("ARALING")
        ? "Oo"
        : "Ok",
      cancelText: activity?.subjectName?.toUpperCase().includes("ARALING")
        ? "Kanselahin"
        : "Cancel",
      onOk() {
        const updatedAnswers = [
          ...mazeAnswers?.[userDetails?.studentId]?.[activity?.moduleId],
        ].map((answers, i) => {
          if (i === currentSlide) {
            return {
              ...answers,
              dateAnswered: moment().format("YYYY-MM-DD HH:mm:ss"),
              answer: "",
              choiceId: "",
            };
          }
          return answers;
        });
        setSelectedAnswers(updatedAnswers);
        dispatch(
          handleAnswer({
            studentId: userDetails?.studentId,
            key: activity?.moduleId,
            value: updatedAnswers,
          })
        );
      },
      onCancel() {},
    });
  };

  const handleResetAnswer = () => {
    confirm({
      title: activity?.subjectName?.toUpperCase().includes("ARALING")
        ? "Kumpirmahin"
        : "Confirm",
      // icon: <ExclamationCircleFilled />,
      content: activity?.subjectName?.toUpperCase().includes("ARALING")
        ? "Sigurado ka bang nais mong i-reset ang iyong sagot?"
        : "Are you sure you want to reset your answer?",

      centered: true,
      okText: activity?.subjectName?.toUpperCase().includes("ARALING")
        ? "Oo"
        : "Ok",
      cancelText: activity?.subjectName?.toUpperCase().includes("ARALING")
        ? "Kanselahin"
        : "Cancel",
      onOk() {
        const updatedAnswers = [
          ...mazeAnswers?.[userDetails?.studentId]?.[activity?.moduleId],
        ].map((answers, i) => {
          return {
            ...answers,
            dateAnswered: moment().format("YYYY-MM-DD HH:mm:ss"),
            answer: "",
            choiceId: "",
            position: [0, 0],
          };
        });

        setSelectedAnswers(updatedAnswers);
        dispatch(
          handleAnswer({
            studentId: userDetails?.studentId,
            key: activity?.moduleId,
            value: updatedAnswers,
          })
        );

        Carouselref.current.goTo(0);
        setCurrentSlide(0);
        window.location.reload();
      },
      onCancel() {},
    });
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleAfterChange = (current) => {
    setCurrentSlide(current);

    if (current === activity?.activity?.length - 1) {
      const description = activity?.subjectName
        ?.toUpperCase()
        .includes("ARALING")
        ? "Naabot mo na ang dulo ng aktibidad. I-klik ang susunod para sa buod ng mga sagot."
        : "You have reached the end of the slide. Click next for the answer key.";

      const message = activity?.subjectName?.toUpperCase().includes("ARALING")
        ? "Magaling!"
        : "Well done!";

      notification.info({
        message: message,
        // description: "You have reached the end of the activity.",
        description: description,
      });
    } else if (current === activity?.activity?.length - 0) {
      setShowProgress(false); // show progress bar on the second to the last slide
    } else {
      // add additional conditions and actions as needed
      setShowProgress(true);
    }
  };

  if (!activity?.activity || activity?.activity?.length === 0) {
    return (
      <div className="flex justify-center items-center my-5 sm:my-20">
        <div className="p-10 pt-0 text-center">
          {activity?.subjectName?.toUpperCase().includes("ARALING")
            ? "Pasensya na, ngunit ang aktibidad na hinihiling ay hindi pa magagamit."
            : "Apologies, but the requested activity is currently unavailable."}
        </div>
      </div>
    );
  }

  if (
    !mazeAnswers ||
    !mazeAnswers[userDetails?.studentId] ||
    !mazeAnswers[userDetails?.studentId][activity?.moduleId]
  ) {
    return (
      <div className="flex justify-center items-center my-5 sm:my-20">
        <div className="p-10 pt-0 text-center">
          {activity?.subjectName?.toUpperCase().includes("ARALING")
            ? "Pasensya na, ngunit ang aktibidad na hinihiling ay hindi pa magagamit."
            : "Apologies, but the requested activity is currently unavailable."}
        </div>
      </div>
    );
  }

  if (
    !mazeRoutes ||
    !mazeRoutes[userDetails?.studentId] ||
    !mazeRoutes[userDetails?.studentId][activity?.moduleId]
  ) {
    return (
      <div className="flex justify-center items-center my-5 sm:my-20">
        <div className="p-10 pt-0 text-center">
          {activity?.subjectName?.toUpperCase().includes("ARALING")
            ? "Pasensya na, ngunit ang aktibidad na hinihiling ay hindi pa magagamit."
            : "Apologies, but the requested activity is currently unavailable."}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-hidden">
      <div
        className="lg:pt-0 lg:pb-5 lg:p-10 mb-5 pt-0 p-3"
        style={{
          margin: "auto",
        }}
      >
        <div className="carousel-wrapper">
          <Carousel
            arrows
            accessibility={false}
            {...settings}
            onSwipe={() => {
              handleReset();
            }}
            ref={(ref) => (Carouselref.current = ref)}
            afterChange={handleAfterChange}
          >
            {activity?.activity &&
              activity?.activity?.map((maze, index) => {
                return (
                  <div
                    className="w-full mx-auto p-5 bg-opacity-20 bg-white backdrop-filter backdrop-blur-lg rounded-lg"
                    key={index}
                  >
                    <div className="carousel-progress">
                      {showProgress && (
                        <div className="flex mx-auto w-full mb-5 flex-wrap md:flex-nowrap">
                          <div className="flex font-semibold w-48 justify-around">
                            <p className="mr-1">
                              {activity?.subjectName
                                ?.toUpperCase()
                                .includes("ARALING")
                                ? "Tanong"
                                : "Question"}
                            </p>
                            <p className="mr-4">
                              {currentSlide + 1} of {slideCount}
                            </p>
                          </div>
                          <Progress
                            percent={progress}
                            format={() => progress.toFixed(1) + "%"}
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col-reverse h-full lg:flex-row xl:flex-row justify-between lg:space-x-2 w-full">
                      <div className="w-full h-full">
                        <MazeGame
                          activity={activity}
                          randomNumber={[
                            ...mazeAnswers?.[userDetails?.studentId]?.[
                              activity?.moduleId
                            ][index].destination,
                          ]}
                          array={maze.choices.length}
                          moduleId={activity?.moduleId}
                          position={[
                            ...mazeAnswers?.[userDetails?.studentId]?.[
                              activity?.moduleId
                            ][index].position,
                          ]}
                          indexPosition={index}
                          handleSubmitAnswer={handleSubmitAnswer}
                        />
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="w-full  border-2 border-b-8 border-purple-500 rounded-lg mb-2">
                          <div className="w-full h-full bg-white border-4 border-white rounded-lg">
                            <div className="p-4 w-full">
                              <div className="flex flex-row">
                                <p className="font-bold text-base">
                                  {activity?.subjectName
                                    ?.toUpperCase()
                                    .includes("ARALING")
                                    ? "Direksyon: "
                                    : "Direction: "}
                                </p>
                                &nbsp;
                                <p>{activity?.directions}</p>
                              </div>
                              <br></br>
                              <div className="flex flex-row items-center">
                                <p className="font-bold text-base">
                                  {activity?.subjectName
                                    ?.toUpperCase()
                                    .includes("ARALING")
                                    ? "Tanong: "
                                    : "Question: "}
                                </p>
                                &nbsp;
                                <p>{maze.question}</p>
                                <div className="flex items-center justify-center p-2 h-20 w-20">
                                  <TextSpeech currentSlide={currentSlide} />
                                </div>
                              </div>
                              <br></br>
                              <p className="font-bold text-base">
                                {activity?.subjectName
                                  ?.toUpperCase()
                                  .includes("ARALING")
                                  ? "Mga Pagpipilian: "
                                  : "Choices: "}
                              </p>
                              <br></br>

                              <div>
                                {maze.choices.map((q, i) => {
                                  return q?.image ? (
                                    <div key={i} className="flex items-center">
                                      <div
                                        className={
                                          `mr-2 mb-2 choice-destination` +
                                          (i + 1)
                                        }
                                      ></div>
                                      <Image
                                        className="p-1 max-h-16 pr-5"
                                        alt="c"
                                        src={baseURL + `/${q.image}`}
                                      />
                                    </div>
                                  ) : (
                                    <div key={i} className="flex items-center">
                                      <div
                                        className={
                                          `mr-2 mb-2 choice-destination` +
                                          (i + 1)
                                        }
                                      ></div>
                                      <p className="test">{q.description}</p>
                                      <div className="p-2">
                                        <TextSpeech
                                          currentSlide={currentSlide}
                                          index={i}
                                        />
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              <br></br>
                              <div className="flex justify-end">
                                <div
                                  style={{
                                    display: "block",
                                    cursor: "pointer",
                                    height: 80,
                                    width: 80,
                                  }}
                                  onClick={() => resetPerQuestion()}
                                >
                                  <div className="rounded-lg">
                                    <img alt="back" src={reset}></img>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {showConfirmationModal && (
                          <div
                            className="fixed rounded-lg top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-900"
                            data-aos="fade"
                            data-aos-duration="500" // Adjust the duration (in milliseconds) as needed
                            onClick={() => {
                              // Proceed to the next slide
                              Carouselref.current.next();

                              // Close the message alert
                              setShowConfirmationModal(false);
                            }}
                          >
                            <div
                              className={`p-10 rounded-xl z-30 bg-white shadow-lg ${
                                selectedAnswers[currentSlide]?.isCorrect === 1
                                  ? "text-green-600"
                                  : "text-red-500"
                              }`}
                            >
                              <p className="text-xl">
                                {activity?.subjectName
                                  ?.toUpperCase()
                                  .includes("ARALING")
                                  ? selectedAnswers[currentSlide]?.isCorrect ===
                                    1
                                    ? "Mahusay! Tama ang iyong sagot."
                                    : "Mali ang iyong sagot."
                                  : selectedAnswers[currentSlide]?.isCorrect ===
                                    1
                                  ? "Good job! Your answer is correct."
                                  : "Oh no, your answer is wrong."}
                              </p>
                            </div>
                          </div>
                        )}
                        <div
                          className={`flex items-center mb-2 ${
                            currentSlide === 0
                              ? "justify-between"
                              : "justify-between"
                          }`}
                        >
                          {currentSlide !== 0 ? (
                            <div className={`block`}>
                              <SamplePrevArrow
                                onClick={() => Carouselref.current.prev()}
                                currentSlide={currentSlide}
                                slideCount={slideCount}
                              />
                            </div>
                          ) : null}
                          <div className="flex justify-center  p-5 pl-2 pr-2"></div>
                          {currentSlide !== selectedAnswers.length - 1 ? (
                            <div className={`block`}>
                              <SampleNextArrow
                                onClick={() => Carouselref.current.next()}
                                currentSlide={currentSlide}
                                slideCount={slideCount}
                              />
                            </div>
                          ) : null}
                          {currentSlide === selectedAnswers.length - 1 ? (
                            <div className={`block`}>
                              <button
                                onClick={() => Carouselref.current.next()}
                                className="flex items-center"
                              >
                                {activity?.subjectName
                                  ?.toUpperCase()
                                  .includes("ARALING") ? (
                                  <img
                                    alt="back"
                                    className="w-full"
                                    src={toAnsKey_ap}
                                  ></img>
                                ) : (
                                  <img
                                    alt="back"
                                    className="w-full"
                                    src={toAnsKey}
                                  ></img>
                                )}
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            {/* <div className="p-0 md:pl-20 lg:pl-20 md:pr-20 lg:pr-20"> */}
            <div className="p-0 md:pl-0 lg:pl-20 md:pr-0 lg:pr-20">
              <div className="flex items-center mb-5">
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
              <div className="bg-white shadow-lg border-b-8 p-10 rounded-lg">
                {activity?.activity
                  ?.slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((item, index) => {
                    const actualIndex =
                      (currentPage - 1) * itemsPerPage + index + 1;

                    return (
                      <div key={item.questionId} className="mb-8">
                        <h5 className="mb-2 text-xl font-medium leading-tight">
                          {activity?.subjectName
                            ?.toUpperCase()
                            .includes("ARALING")
                            ? "Tanong # " + actualIndex
                            : "Question # " + actualIndex}
                        </h5>
                        <p className="text-[18px] mb-2">{item.question}</p>
                        <div className="flex flex-wrap">
                          <p className="mr-2">
                            {activity?.subjectName
                              ?.toUpperCase()
                              .includes("ARALING")
                              ? "Sagot:"
                              : "Answer:"}
                          </p>
                          {item.choices
                            ?.filter((choice) => choice.isCorrect === 1)
                            .map((choice) => {
                              const pattern =
                                /(?<=\S)([^\w\s]|[\uD800-\uDBFF][\uDC00-\uDFFF])(?=\S)/gu;
                              const outputString = choice?.description?.replace(
                                pattern,
                                " $1 "
                              );
                              return (
                                <div key={`${index}-${choice.choiceId}`}>
                                  {choice.description ? (
                                    <p className="flex mr-2">{outputString}</p>
                                  ) : (
                                    <p className="mr-2">
                                      <Image
                                        alt="fitb"
                                        className="w-10"
                                        src={baseURL + `/${choice.image}`}
                                      />
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    );
                  })}
                <div className="flex justify-center p-5 pb-0">
                  <Pagination
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={totalItems}
                    onChange={handlePageChange}
                  />
                </div>
              </div>

              <div className="">
                <div className="flex flex-wrap justify-center sm:justify-between">
                  <div className="p-5">
                    <button
                      className=""
                      onClick={() => Carouselref.current.prev()}
                    >
                      {activity?.subjectName
                        ?.toUpperCase()
                        .includes("ARALING") ? (
                        <img
                          alt="back"
                          className="max-h-16  cursor-pointer"
                          src={toMaze_ap}
                        ></img>
                      ) : (
                        <img
                          alt="back"
                          className="max-h-16 cursor-pointer"
                          src={toMaze}
                        ></img>
                      )}
                    </button>
                  </div>
                  <div className="p-5">
                    <PlayAgain
                      onClick={() => Carouselref.current.next()}
                      currentSlide={currentSlide}
                      slideCount={slideCount}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Maze;
