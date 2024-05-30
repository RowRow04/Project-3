import {
  Carousel,
  Image,
  Pagination,
  Progress,
  message,
  notification,
} from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import leftImg from "../../../../assets/img/buttons/leftBtn.png";
import rightImg from "../../../../assets/img/buttons/rightBtn.png";
import "../../../../ui/FlipCard.css";
import { GAME_RESULT, MAX_WRONG_GUESSES } from "../../../../constants";
import { baseURL } from "../../../../constants/constants";
import {
  handleClickCorrectGuesses,
  handleClickIncorrectGuesses,
  handleClickResultGuesses,
} from "../../../../store/slices/hangman-slice";
import { Guessword, Keyboard, Stage } from "../../../Hangman";
import Result from "../../../Hangman/result";
import "./style.css";

const itemsPerPage = 10;

const Hangman = () => {
  const dispatch = useDispatch();
  const [rightGuesses, setRightGuesses] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [result, setResult] = useState([]);
  const [guessword, setGuessword] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const { title, type } = useParams(); // ? OTB ex.
  const { modules } = useSelector((state) => state.subjects);
  const { correctGuesses, incorrectGuesses, resultGuesses } = useSelector(
    (state) => state.hangman
  );
  const [activity, setActivity] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showProgress, setShowProgress] = useState(true);
  const slideCount = activity.activity?.length || 0;
  const progress = ((currentSlide + 1) / slideCount) * 100;
  const Carouselref = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPrimary, setIsPrimary] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);
  const specialCharacters = ` .,'"!:;_-=></!@#$%^&*()`.split("");
  const [loadingImages, setLoadingImages] = useState(true);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleProgress = () => {
    setShowProgress(false);
  };

  const handleReset = () => {
    setIsFlipped(false);
    setIsPrimary(false);
    setClickedIndex(null);
  };

  const SampleNextArrow = (props) => {
    const { style, onClick, currentSlide, slideCount } = props;
    if (currentSlide === slideCount) {
      return null; // hide the button if it's the last slide
    }

    return (
      <div>
        <div
          className="flex justify-center cursor-pointer"
          style={{ ...style, display: "block", cursor: "pointer" }}
          onClick={() => {
            onClick();
            handleReset();
            if (currentSlide === slideCount) {
              handleProgress();
            }
          }}
        >
          <div className="rounded-lg cursor-pointer ">
            <img alt="back" src={rightImg}></img>
          </div>
        </div>
      </div>
    );
  };

  const allGuesswordAnswers = guessword.map((guess) => guess.answer);
  const allGuesswordQuestions = guessword.map((guess) => guess.question);

  const SamplePrevArrow = (props) => {
    const { style, onClick, currentSlide } = props;
    if (currentSlide === 0) {
      return null; // hide the button if it's the first slide
    }
    return (
      <div
        className="flex justify-center cursor-pointer"
        style={{ ...style, display: "block", cursor: "pointer" }}
        onClick={() => {
          onClick();
          handleReset();
          setShowProgress(true);
        }}
      >
        <div className="rounded-lg cursor-pointer ">
          <img alt="next" src={leftImg}></img>
        </div>
      </div>
    );
  };

  const MobileNext = (props) => {
    const { onClick, currentSlide, slideCount } = props;
    if (currentSlide === slideCount - 1) {
      return null; // hide the button if it's the last slide
    }
    return (
      <div>
        <div
          className="hidden lg:flex cursor-pointer justify-center absolute top-1/2 -right-24 transform -translate-y-1/2"
          onClick={() => {
            onClick();
            handleReset();
            if (currentSlide === slideCount - 1) {
              handleProgress();
            }
          }}
        >
          <div className="rounded-lg cursor-pointer  w-10 h-10 sm:w-20 sm:h-20">
            <img alt="back" src={rightImg}></img>
          </div>
        </div>
      </div>
    );
  };

  const MobilePrev = (props) => {
    const { onClick, currentSlide } = props;
    if (currentSlide === 0) {
      return null; // hide the button if it's the first slide
    }
    return (
      <div
        className="hidden lg:flex cursor-pointer justify-center absolute top-1/2 -left-24 transform -translate-y-1/2"
        onClick={() => {
          onClick();
          handleReset();
          setShowProgress(true);
        }}
      >
        <div className="rounded-lg cursor-pointer w-10 h-10 sm:w-20 sm:h-20">
          <img alt="next" src={leftImg}></img>
        </div>
      </div>
    );
  };

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    const getAct = modules.find(
      (m) => m.activityType === title && type === m.type
    );
    setActivity((prev) => ({ ...getAct }));
    setGuessword(
      getAct?.activity?.map((q, index) => {
        const answers = q?.answers ? JSON.parse(q?.answers)[0]["1"] : "";
        return { answer: answers?.toUpperCase(), question: q?.question };
      })
    );
    if (correctGuesses.hasOwnProperty(getAct.moduleId)) {
      setRightGuesses(correctGuesses[getAct.moduleId]);
    } else {
      setRightGuesses(getAct?.activity?.map(() => []));
    }
    if (incorrectGuesses.hasOwnProperty(getAct.moduleId)) {
      setWrongGuesses(incorrectGuesses[getAct.moduleId]);
    } else {
      setWrongGuesses(getAct?.activity?.map(() => []));
    }
    if (resultGuesses.hasOwnProperty(getAct.moduleId)) {
      setResult(resultGuesses[getAct.moduleId]);
    } else {
      setResult(getAct?.activity?.map(() => " "));
    }
  }, [title, modules]);

  useEffect(() => {
    setSelectedAnswers(
      activity?.activity?.map(() => {
        return {
          questionId: "",
          choiceId: "",
          answer: "",
          dateAnswered: "",
          isTrue: "",
        };
      })
    );
  }, [activity]);

  useEffect(() => {
    if (guessword.length > 0) {
      if (
        guessword[currentSlide]?.answer
          .replace(/\s/g, "")
          .split("")
          .filter((letter) => !specialCharacters.includes(letter))
          .every((letter) => rightGuesses[currentSlide].includes(letter))
      ) {
        const res = [...result];
        res[currentSlide] = GAME_RESULT.WON;
        dispatch(
          handleClickResultGuesses({
            key: activity?.moduleId,
            value: res,
            index: currentSlide,
          })
        );
        setResult(res);
      } else if (wrongGuesses[currentSlide]?.length >= MAX_WRONG_GUESSES) {
        const res = [...result];
        res[currentSlide] = GAME_RESULT.LOST;
        dispatch(
          handleClickResultGuesses({
            key: activity?.moduleId,
            value: res,
            index: currentSlide,
          })
        );
        setResult(res);
      } else {
        const res = [...result];
        res[currentSlide] = GAME_RESULT.IN_PROGRESS;
        dispatch(
          handleClickResultGuesses({
            key: activity?.moduleId,
            value: res,
            index: currentSlide,
          })
        );
        setResult(res);
      }
    }
  }, [guessword, rightGuesses, wrongGuesses]);

  const handleGuess = useCallback(
    (letter, index) => {
      if (result[index] !== GAME_RESULT.IN_PROGRESS) {
        return;
      }

      if (guessword[index].answer.includes(letter)) {
        const updatedRightGuesses = [...rightGuesses];
        const currentGuesses = updatedRightGuesses[index];
        if (!currentGuesses.includes(letter)) {
          updatedRightGuesses[index] = [...currentGuesses, letter];
        }

        dispatch(
          handleClickCorrectGuesses({
            key: activity?.moduleId,
            value: updatedRightGuesses,
            index,
          })
        );
        setRightGuesses(updatedRightGuesses);
      } else {
        const updatedWrongGuesses = [...wrongGuesses];
        const currentGuesses = updatedWrongGuesses[index];
        if (!currentGuesses.includes(letter)) {
          updatedWrongGuesses[index] = [...currentGuesses, letter];
        }

        dispatch(
          handleClickIncorrectGuesses({
            key: activity?.moduleId,
            value: updatedWrongGuesses,
            index,
          })
        );
        setWrongGuesses(updatedWrongGuesses);
      }
    },
    [result, guessword, setRightGuesses, setWrongGuesses]
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <MobileNext />,
    prevArrow: <MobilePrev />,
  };

  const handleAfterChange = (current) => {
    setCurrentSlide(current);

    if (current === activity.activity.length - 1) {
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
        description: description,
      });
    } else if (current === activity.activity.length - 0) {
      setShowProgress(false); // show progress bar on the second to the last slide
    } else {
      // add additional conditions and actions as needed
      setShowProgress(true);
    }
  };

  return (
    <div className="p-0 md:pl-20 lg:pl-20 md:pr-20 lg:pr-20">
      <div className="md:pl-14 lg:pl-14 md:pr-14 lg:pr-14">
        <div
          style={{
            margin: "auto",
            padding: "10px",
          }}
        >
          {result.some((element) => element === " ") && (
            <div className="carousel-wrapper ">
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
              <Carousel
                arrows
                {...settings}
                onSwipe={() => {
                  if (result[currentSlide] === " ") {
                    message.warning(
                      activity?.subjectName?.toUpperCase().includes("ARALING")
                        ? "Mangyaring sagutin muna ang tanong."
                        : "Please answer the question first."
                    );
                  } else {
                    if (currentSlide === slideCount - 1) {
                      handleProgress();
                    }
                  }
                }}
                ref={(ref) => (Carouselref.current = ref)}
                afterChange={handleAfterChange}
              >
                {activity?.activity &&
                  activity?.activity?.map((q, index) => {
                    const delimiter = /1\._+|_+/;

                    let splitArray = q.question.split(delimiter);
                    if (splitArray.length > 1) {
                      splitArray.splice(1, 0, delimiter);
                    }

                    return currentSlide === activity?.activity?.length ? (
                      <div className="">
                        <></>
                      </div>
                    ) : guessword[currentSlide].answer ? (
                      <div className="p-2">
                        <div className="hangman border-b-8 border-gray-300 bg-white rounded-md w-full items-center justify-center place-content-between shadow-lg">
                          <Stage step={wrongGuesses[currentSlide].length} />
                          <div className="flex justify-center">
                            {typeof q.image !== "undefined" &&
                              q.image !== null &&
                              q.image !== "" && (
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
                                    src={baseURL + `/${q.image}`}
                                    className={`h-32 ${
                                      loadingImages ? "hidden" : "" // Hide the image when loading
                                    }`}
                                    onLoad={() => setLoadingImages(false)} // Hide loading spinner on image load
                                    onError={() => setLoadingImages(false)}
                                  />
                                </div>
                              )}
                          </div>

                          <div className="flex p-5 flex-row items-center gap-3 justify-center flex-wrap">
                            {splitArray.map((e, index) => {
                              return (
                                <div className="flex items-center" key={index}>
                                  {e === delimiter ? (
                                    <Guessword
                                      rightGuesses={rightGuesses[currentSlide]}
                                      guessword={guessword[
                                        currentSlide
                                      ]?.answer.toUpperCase()}
                                      question={guessword[
                                        currentSlide
                                      ]?.question.toUpperCase()}
                                    />
                                  ) : (
                                    <p className="text-base sm:text-3xl text-center">
                                      {e}
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          <Result
                            result={result[currentSlide]}
                            guessword={guessword[
                              currentSlide
                            ]?.answer.toUpperCase()}
                          />
                          <div className="">
                            <Keyboard
                              disabledKeys={rightGuesses[currentSlide].concat(
                                wrongGuesses[currentSlide]
                              )}
                              onKeyClick={(e) => handleGuess(e, currentSlide)}
                              subject={activity?.subjectName}
                            />
                          </div>
                        </div>
                      </div>
                    ) : null;
                  })}
                {/* Answer Summary */}
                <div
                  className={` ${
                    currentSlide === slideCount
                      ? "h-fit w-full overflow-y-auto"
                      : "answer-card"
                  }`}
                >
                  <div className="flex items-center">
                    <div className="border-t flex-grow border-white"></div>
                    <span className="px-4 text-white">
                      <div className="flex items-center  justify-center ">
                        {activity?.subjectName
                          ?.toUpperCase()
                          .includes("ARALING")
                          ? "Mga Sagot"
                          : "Answer Key"}
                      </div>
                    </span>
                    <div className="border-t flex-grow border-white"></div>
                  </div>
                  <div className="my-10">
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 p-2">
                      {allGuesswordAnswers
                        .slice(
                          (currentPage - 1) * itemsPerPage,
                          currentPage * itemsPerPage
                        ) // Display only the items for the current page
                        .map((answer, index) => {
                          const actualIndex =
                            (currentPage - 1) * itemsPerPage + index + 1;
                          const question =
                            allGuesswordQuestions[
                              (currentPage - 1) * itemsPerPage + index
                            ]; // Get the question for the current answer

                          const delimiter = /1\._+|_+/;

                          let splitArray = question.split(delimiter);
                          if (splitArray.length > 1) {
                            splitArray.splice(1, 0, delimiter);
                          }
                          const currentActivity = activity?.activity?.[index];

                          return (
                            <div
                              className="items-center p-5 rounded-lg  bg-white shadow-lg border-b-8"
                              key={index}
                            >
                              <h5 className="flex mb-5 text-xl font-medium leading-tight">
                                {activity?.subjectName
                                  ?.toUpperCase()
                                  .includes("ARALING")
                                  ? "Tanong # " + actualIndex
                                  : "Question # " + actualIndex}
                              </h5>
                              <div>
                                <div className="flex justify-center">
                                  {typeof currentActivity.image !==
                                    "undefined" &&
                                    currentActivity.image !== null &&
                                    currentActivity.image !== "" && (
                                      <div>
                                        <Image
                                          alt="c"
                                          src={
                                            baseURL +
                                            `/${currentActivity.image}`
                                          }
                                          className={`h-32 ${
                                            loadingImages ? "hidden" : "" // Hide the image when loading
                                          }`}
                                          onLoad={() => setLoadingImages(false)} // Hide loading spinner on image load
                                          onError={() =>
                                            setLoadingImages(false)
                                          }
                                        />
                                      </div>
                                    )}
                                </div>
                                <p className="flex justify-center">
                                  {activity?.subjectName
                                    ?.toUpperCase()
                                    .includes("ARALING")
                                    ? "Sagot:"
                                    : "Answer:"}
                                </p>
                                {/* Display the question for the current answer */}
                                <div className="flex p-5 flex-wrap justify-center items-center gap-3">
                                  {splitArray.map((e) => {
                                    if (e === delimiter) {
                                      return (
                                        <>
                                          <div
                                            key={index}
                                            className="flex items-center"
                                          >
                                            <div className="flex flex-wrap">
                                              {answer
                                                ?.trim()
                                                ?.split("")
                                                ?.map((char, index) => (
                                                  <span
                                                    key={index}
                                                    className="flex-wrap text-amber-400 font-bold sm:text-3xl border-2 rounded-lg m-1 p-4 py-2 pb-2"
                                                    style={{
                                                      whiteSpace: "nowrap",
                                                    }} // Prevent wrapping of characters
                                                  >
                                                    {char}
                                                  </span>
                                                ))}
                                            </div>
                                          </div>
                                        </>
                                      );
                                    } else {
                                      return (
                                        <p className="text-base sm:text-3xl text-center">
                                          {e}
                                        </p>
                                      );
                                    }
                                  })}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    <div className="flex justify-center p-5">
                      <Pagination
                        current={currentPage}
                        pageSize={itemsPerPage}
                        total={allGuesswordAnswers.length} // Pass the total number of answers
                        onChange={handlePageChange}
                      />
                    </div>
                  </div>
                </div>
              </Carousel>
            </div>
          )}
        </div>
      </div>
      {result.some((element) => element === " ") && (
        <div className="flex mb-20 items-center justify-center">
          <div className="block lg:hidden">
            <SamplePrevArrow
              onClick={() => Carouselref.current.prev()}
              currentSlide={currentSlide}
              slideCount={slideCount}
            />
          </div>
          {currentSlide !== slideCount && (
            <div className="flex justify-center p-5 sm:pl-20 sm:pr-20">
              <div className="flex  justify-center p-5 sm:pl-20 sm:pr-20">
                <div
                  className={`flip-card ${isFlipped ? "flipped" : ""}`}
                  onClick={handleClick}
                >
                  <div className="flip-card-inner w-36 h-20 sm:w-56 sm:h-20 rounded-xl border-4 border-white">
                    <div className="flip-card-front flex items-center justify-center">
                      <h2>
                        {activity?.subjectName
                          ?.toUpperCase()
                          .includes("ARALING")
                          ? "Ipakita ang sagot"
                          : "Show Answer"}
                      </h2>
                    </div>
                    <div className="flip-card-back flex items-center justify-center">
                      <p className="p-5 ">{guessword[currentSlide]?.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="block lg:hidden">
            <SampleNextArrow
              onClick={() => Carouselref.current.next()}
              currentSlide={currentSlide}
              slideCount={slideCount}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Hangman;
