import { Carousel, Image, Pagination, Progress, notification } from "antd";
import moment from "moment";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import leftImg from "../../../../assets/img/buttons/leftBtn.png";
import rightImg from "../../../../assets/img/buttons/rightBtn.png";
import { baseURL } from "../../../../constants/constants";
import {
  handleClickGuess,
  handleGuessword,
} from "../../../../store/slices/jumbled-slice";
import "../../../../ui/FlipCard.css";
import Result from "../../../Hangman/result";
import { Guessword, GuesswordTeacher, Keyboard } from "../../../JumbledLetter";
import "./style.css";

const itemsPerPage = 6; // Adjust this according to your needs

const JumbledLetters = () => {
  const dispatch = useDispatch();
  const [result, setResult] = useState([]);
  const [guessword, setGuessword] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const { title, type } = useParams(); // ? OTB ex.
  const { modules } = useSelector((state) => state.subjects);
  const { answers, guesswords } = useSelector((state) => state.jumbled);
  const [activity, setActivity] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showProgress, setShowProgress] = useState(true);
  const slideCount =
    activity.activity?.length || activity.activity?.questions.length || 0;
  const progress = ((currentSlide + 1) / slideCount) * 100;
  const Carouselref = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const specialCharacters = ` .,'"!:;_-=></!@#$%^&*()`.split("");
  const [loadingImages, setLoadingImages] = useState(true);

  const totalItems = activity?.activity?.length;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleProgress = () => {
    setShowProgress(false);
  };

  const handleReset = () => {
    setIsFlipped(false);
  };

  const SampleNextArrow = (props) => {
    const { style, onClick, currentSlide, slideCount } = props;
    if (currentSlide === slideCount - 0) {
      return null; // hide the button if it's the last slide
    }
    return (
      <div
        className="flex justify-center"
        style={{ ...style, display: "block", cursor: "pointer" }}
        onClick={() => {
          onClick();
          handleReset();
          if (currentSlide === slideCount - 1) {
            handleProgress();
          }
        }}
      >
        <div className="rounded-lg  w-10 h-10 sm:w-20 sm:h-20">
          <img alt="back" src={rightImg}></img>
        </div>
      </div>
    );
  };

  const SamplePrevArrow = (props) => {
    const { style, onClick, currentSlide } = props;
    if (currentSlide === 0) {
      return null; // hide the button if it's the first slide
    }
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
        <div className="rounded-lg  w-10 h-10 sm:w-20 sm:h-20">
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
          className="cursor-pointer hidden lg:flex justify-center absolute top-1/2 -right-24 transform -translate-y-1/2"
          onClick={() => {
            onClick();
            handleReset();
            if (currentSlide === slideCount - 1) {
              handleProgress();
            }
          }}
        >
          <div className="rounded-lg  w-10 h-10 sm:w-20 sm:h-20">
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
        className="cursor-pointer hidden lg:flex justify-center absolute top-1/2 -left-24 transform -translate-y-1/2"
        onClick={() => {
          onClick();
          handleReset();
          setShowProgress(true);
        }}
      >
        <div className="rounded-lg w-10 h-10 sm:w-20 sm:h-20">
          <img alt="next" src={leftImg}></img>
        </div>
      </div>
    );
  };

  const jumbleLetters = (word) => {
    // Convert the word to an array of letters
    var letters = word.split("");

    // Separate the letters and spaces
    var spaces = letters.filter((letter) => specialCharacters.includes(letter));
    var nonSpaces = letters.filter(
      (letter) => !specialCharacters.includes(letter)
    );

    // Randomly rearrange the non-space letters
    for (var i = nonSpaces.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = nonSpaces[i];
      nonSpaces[i] = nonSpaces[j];
      nonSpaces[j] = temp;
    }

    // Combine the letters and spaces, with spaces at the end
    var jumbledWord = nonSpaces.concat(spaces).join("");

    // Make sure the jumbled word is not the same as the original word
    if (jumbledWord === word) {
      return jumbleLetters(word);
    }

    return jumbledWord;
  };

  useEffect(() => {
    const getAct = modules.find(
      (m) => m.activityType === title && type === m.type
    );
    setActivity((prev) => ({ ...getAct }));
    if (guesswords.hasOwnProperty(getAct.moduleId)) {
      setGuessword(guesswords[getAct.moduleId]);
    } else {
      setGuessword(
        getAct?.activity?.map((q, index) => {
          const answers = q?.answers ? JSON.parse(q?.answers)[0]["1"] : "";
          return {
            answer: answers?.toUpperCase(),
            question: q?.question,
            jumbledLetters: jumbleLetters(answers?.toUpperCase()).split(""),
          };
        })
      );
      dispatch(
        handleGuessword({
          key: getAct?.moduleId,
          value: getAct?.activity?.map((q, index) => {
            const answers = q?.answers ? JSON.parse(q?.answers)[0]["1"] : "";
            return {
              answer: answers?.toUpperCase(),
              question: q?.question,
              jumbledLetters: jumbleLetters(answers?.toUpperCase()).split(""),
            };
          }),
        })
      );
    }
  }, [title, modules]);

  useEffect(() => {
    if (answers.hasOwnProperty(activity.moduleId)) {
      setSelectedAnswers(answers[activity.moduleId]);
    } else {
      setSelectedAnswers(
        activity?.activity?.map((q) => {
          const questionAnswers = q?.answers
            ? JSON.parse(q?.answers)[0]["1"]
            : "";
          return {
            questionId: q.questionId,
            choiceId: "",
            questionAnswer: questionAnswers,
            answer: [],
            value: [],
            dateAnswered: "",
          };
        })
      );
      dispatch(
        handleClickGuess({
          key: activity?.moduleId,
          value: activity?.activity?.map((q) => {
            const questionAnswers = q?.answers
              ? JSON.parse(q?.answers)[0]["1"]
              : "";
            return {
              questionId: q.questionId,
              choiceId: "",
              questionAnswer: questionAnswers,
              answer: [],
              value: [],
              dateAnswered: "",
            };
          }),
        })
      );
    }
  }, [activity]);

  const removeAnswer = useCallback(
    (index, value) => {
      const selectedAnswer = selectedAnswers.map((s) => ({
        ...s,
        answer: [...s.answer],
        value: [...s.value],
      }));
      let indexToRemove = selectedAnswer[currentSlide].answer.indexOf(index);
      let valueToRemove = selectedAnswer[currentSlide].answer.indexOf(value);
      selectedAnswer[currentSlide].answer = selectedAnswer[
        currentSlide
      ].answer.slice(0, indexToRemove);
      selectedAnswer[currentSlide].value = selectedAnswer[
        currentSlide
      ].value.slice(0, indexToRemove);
      setSelectedAnswers(selectedAnswer);
      dispatch(
        handleClickGuess({
          key: activity?.moduleId,
          value: selectedAnswer,
        })
      );
    },
    [selectedAnswers, setSelectedAnswers, currentSlide]
  );

  useEffect(() => {
    if (
      specialCharacters.includes(
        guessword?.[currentSlide]?.answer.split("")[
          selectedAnswers?.[currentSlide]?.answer?.length
        ]
      )
    ) {
      const selectedAnswer = selectedAnswers.map((s) => ({
        ...s,
        answer: [...s?.answer],
        value: [...s?.value],
      }));
      selectedAnswer[currentSlide].answer = [
        ...selectedAnswer[currentSlide].answer,
        guessword?.[currentSlide]?.jumbledLetters.indexOf(
          guessword?.[currentSlide]?.answer.split("")[
            selectedAnswers?.[currentSlide]?.answer?.length
          ]
        ),
      ];
      selectedAnswer[currentSlide].value = [
        ...selectedAnswer[currentSlide].value,
        guessword?.[currentSlide]?.answer.split("")[
          selectedAnswers?.[currentSlide]?.answer?.length
        ],
      ];
      selectedAnswer[currentSlide].dateAnswered = moment().format(
        "YYYY-MM-DD HH:mm:ss"
      );
      setSelectedAnswers(selectedAnswer);
      dispatch(
        handleClickGuess({
          key: activity?.moduleId,
          value: selectedAnswer,
        })
      );
    }
  }, [selectedAnswers]);

  const handleGuess = useCallback(
    (letter, index) => {
      const selectedAnswer = selectedAnswers.map((s) => ({
        ...s,
        answer: [...s?.answer],
        value: [...s?.value],
      }));
      selectedAnswer[currentSlide].answer = [
        ...selectedAnswer[currentSlide].answer,
        index,
      ];
      selectedAnswer[currentSlide].value = [
        ...selectedAnswer[currentSlide].value,
        letter,
      ];
      selectedAnswer[currentSlide].dateAnswered = moment().format(
        "YYYY-MM-DD HH:mm:ss"
      );
      setSelectedAnswers(selectedAnswer);
      dispatch(
        handleClickGuess({
          key: activity?.moduleId,
          value: selectedAnswer,
        })
      );
    },
    [selectedAnswers, setSelectedAnswers, currentSlide]
  );

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

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
          <div className="carousel-wrapper">
            <div className="carousel-progress">
              {showProgress && (
                <div className="flex mx-auto w-full mb-5 flex-wrap md:flex-nowrap">
                  <div className="flex font-semibold w-48 justify-around">
                    <p className="mr-1">
                      {activity?.subjectName?.toUpperCase().includes("ARALING")
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
                handleReset();
              }}
              ref={(ref) => (Carouselref.current = ref)}
              afterChange={handleAfterChange}
            >
              {guesswords[activity?.moduleId] &&
                guesswords[activity?.moduleId]?.map((q, index) => {
                  const delimiter = "1.__________";
                  let splitArray = q.question.split(delimiter);
                  if (splitArray.length > 1) {
                    splitArray.splice(1, 0, delimiter);
                  }
                  return currentSlide === activity?.activity?.length ? (
                    <div className="">
                      <></>
                    </div>
                  ) : guessword[currentSlide].answer ? (
                    <div className="hangman border-b-8 border-gray-300 bg-white rounded-md w-full items-center justify-center place-content-between shadow-lg">
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
                      {splitArray.map((e) => {
                        if (e !== "1.__________") {
                          return (
                            <p
                              className="text-base sm:text-3xl text-center p-2"
                              style={{ whiteSpace: "pre-line" }}
                            >
                              {e}
                            </p>
                          );
                        }
                      })}
                      <div className="flex p-5 flex-row items-center gap-3 justify-center flex-wrap">
                        {splitArray.map((e) => {
                          if (e === "1.__________") {
                            return (
                              <div>
                                <Guessword
                                  guess={
                                    selectedAnswers?.[currentSlide]?.answer
                                  }
                                  guessword={guessword[
                                    currentSlide
                                  ]?.answer.toUpperCase()}
                                  answer={
                                    guessword[currentSlide]?.jumbledLetters
                                  }
                                  removeAnswer={removeAnswer}
                                />
                                <Keyboard
                                  disabledKeys={
                                    selectedAnswers?.[currentSlide]?.answer
                                  }
                                  onKeyClick={(e, i) =>
                                    handleGuess(e, i, currentSlide)
                                  }
                                  subject={activity?.subjectName}
                                  keys={guessword[currentSlide]?.jumbledLetters}
                                />
                              </div>
                            );
                          }
                        })}
                      </div>
                      <Result
                        result={result[currentSlide]}
                        guessword={guessword[
                          currentSlide
                        ]?.answer.toUpperCase()}
                      />
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
                <>
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
                  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 p-2">
                    {guesswords[activity?.moduleId]?.map((question, index) => {
                      const actualIndex =
                        (currentPage - 1) * itemsPerPage + index + 1;
                      const delimiter = "1.__________";
                      let splitArray = question.question.split(delimiter);
                      if (splitArray.length > 1) {
                        splitArray.splice(1, 0, delimiter);
                      }

                      return (
                        <div key={question.questionId} className="my-5">
                          <div className="items-center h-full w-full rounded-lg bg-white p-6 shadow-lg">
                            <h5 className="mb-2 text-xl font-medium leading-tight">
                              {activity?.subjectName
                                ?.toUpperCase()
                                .includes("ARALING")
                                ? "Tanong # " + actualIndex
                                : "Question # " + actualIndex}
                            </h5>
                            <div className="">
                              <div className="sm:text-2xl mb-2">
                                {typeof question.image !== "undefined" &&
                                  question.image !== null &&
                                  question.image !== "" && (
                                    <div>
                                      <Image
                                        alt="c"
                                        src={baseURL + `/${question.image}`}
                                        className={`h-32 ${
                                          loadingImages ? "hidden" : "" // Hide the image when loading
                                        }`}
                                        onLoad={() => setLoadingImages(false)} // Hide loading spinner on image load
                                        onError={() => setLoadingImages(false)}
                                      />
                                    </div>
                                  )}
                                {splitArray.map((e) => {
                                  if (e !== "1.__________") {
                                    return (
                                      <p
                                        className="text-base sm:text-3xl text-center p-2"
                                        style={{ whiteSpace: "pre-line" }}
                                      >
                                        {e}
                                      </p>
                                    );
                                  }
                                })}
                              </div>
                              <div className="flex justify-center">
                                {typeof question.image !== "undefined" &&
                                  question.image !== null &&
                                  question.image !== "" && (
                                    <div>
                                      <Image
                                        alt="c"
                                        src={baseURL + `/${question.image}`}
                                        className={`h-32 ${
                                          loadingImages ? "hidden" : "" // Hide the image when loading
                                        }`}
                                        onLoad={() => setLoadingImages(false)} // Hide loading spinner on image load
                                        onError={() => setLoadingImages(false)}
                                      />
                                    </div>
                                  )}
                              </div>
                              <div className="flex my-5 text-base flex-wrap items-center">
                                <p className="mr-2">
                                  {activity?.subjectName
                                    ?.toUpperCase()
                                    .includes("ARALING")
                                    ? "Sagot:"
                                    : "Answer:"}
                                </p>
                                <GuesswordTeacher
                                  guess={guessword[actualIndex - 1]?.answer
                                    ?.trim()
                                    ?.split("")}
                                  guessword={guessword[
                                    actualIndex - 1
                                  ]?.answer.toUpperCase()}
                                  answer={
                                    guessword[actualIndex - 1]?.jumbledLetters
                                  }
                                />
                              </div>
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
                      total={totalItems} // Pass the total number of answers
                      onChange={handlePageChange}
                    />
                  </div>
                </>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
      <div className="flex mb-20 items-center justify-center">
        <div className="block lg:hidden">
          <SamplePrevArrow
            className=""
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
                <div className="cursor-pointer flip-card-inner w-36 h-20 sm:w-56 sm:h-20 rounded-xl border-4 border-white">
                  <div className="flip-card-front flex items-center justify-center">
                    <h2>
                      {activity?.subjectName?.toUpperCase().includes("ARALING")
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
    </div>
  );
};

export default memo(JumbledLetters);
