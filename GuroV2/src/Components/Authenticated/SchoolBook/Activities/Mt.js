import { CaretRightOutlined } from "@ant-design/icons";
import {
  Carousel,
  Collapse,
  Image,
  Pagination,
  Progress,
  Steps,
  notification,
} from "antd";
import React, { useRef, useState } from "react";
import leftImg from "../../../../assets/img/buttons/leftBtn.png";
import rightImg from "../../../../assets/img/buttons/rightBtn.png";
import { baseURL } from "../../../../constants/constants";
import "../../../../ui/FlipCard.css";
import TextSpeech from "./TextSpeech";

const { Step } = Steps;
const { Panel } = Collapse;
const itemsPerPage = 5;

const Mt = ({ gradeLevel, activity }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPrimary, setIsPrimary] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);
  const slideCount =
    activity.activity?.length || activity.activity?.questions.length || 0;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showProgress, setShowProgress] = useState(true);
  const Carouselref = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = activity.activity?.questions.length;
  const [loadingImages, setLoadingImages] = useState(true);

  const handleClick2 = (index) => {
    if (clickedIndex === index) {
      setClickedIndex(null);
    } else {
      setClickedIndex(index);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleReset = () => {
    setIsFlipped(false);
    setIsPrimary(false);
    setClickedIndex(null);
  };

  const handleProgress = () => {
    setShowProgress(false);
  };
  const handleColor = () => {
    setIsPrimary((prevValue) => !prevValue);
  };

  const handleStepClick = (step) => {
    handleReset();
    Carouselref.current.goTo(step);
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
          if (currentSlide === activity.activity?.questions.length - 1) {
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
          className="cursor-pointer hidden lg:flex  justify-center absolute top-1/2 -right-24 transform -translate-y-1/2"
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
        className="cursor-pointer hidden lg:flex  justify-center absolute top-1/2 -left-24 transform -translate-y-1/2"
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

    if (current === activity.activity?.questions.length - 1) {
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
    } else if (current === activity.activity?.questions.length - 0) {
      setShowProgress(false); // show progress bar on the second to the last slide
    } else {
      // add additional conditions and actions as needed
      setShowProgress(true);
    }
  };

  return (
    <div className="p-0 md:pl-20 lg:pl-20 md:pr-20 lg:pr-20">
      <div className="md:pl-14 lg:pl-14 md:pr-14 lg:pr-14">
        <div className="cursor-pointer pb-10 p-2">
          <Collapse
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            accordion
          >
            <Panel
              header={
                activity?.subjectName?.toUpperCase().includes("ARALING")
                  ? "Buod ng mga Tanong"
                  : "Question Summary"
              }
              key="1"
            >
              <div className="max-h-64 overflow-y-auto">
                <Steps
                  direction="vertical"
                  current={currentSlide}
                  style={{ marginBottom: "24px", marginTop: "30px" }}
                >
                  {activity.activity &&
                    activity.activity.questions
                      .slice(0) // Display a maximum of 5 steps
                      .map((q, index) => (
                        <Step
                          key={q.questionId}
                          onClick={() => handleStepClick(index)}
                          status={index === currentSlide ? "process" : "wait"}
                          title={
                            q.image && q.image !== "" && q.image !== null ? (
                              <>
                                {q.question &&
                                  q.question !== "" &&
                                  q.question !== "undefined" &&
                                  q.question !== undefined && (
                                    <p>{q.question}</p>
                                  )}
                                <img
                                  src={baseURL + `/${q.image}`} // Replace "baseURL" with the base URL for your images
                                  alt="imageQ"
                                  className="w-32"
                                />
                              </>
                            ) : (
                              q.question
                            )
                          }
                        />
                      ))}
                </Steps>
              </div>
            </Panel>
          </Collapse>
        </div>
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
                      {currentSlide + 1} of{" "}
                      {activity.activity?.questions.length}
                    </p>
                  </div>
                  <Progress
                    percent={
                      ((currentSlide + 1) /
                        activity.activity?.questions.length) *
                      100
                    }
                    format={() =>
                      (
                        ((currentSlide + 1) /
                          activity.activity?.questions.length) *
                        100
                      ).toFixed(1) + "%"
                    }
                  />
                </div>
              )}
            </div>
            <Carousel
              arrows
              {...settings}
              ref={(ref) => (Carouselref.current = ref)}
              onSwipe={() => {
                handleReset();
              }}
              afterChange={handleAfterChange}
            >
              {activity.activity &&
                activity.activity.questions.map((mt, index) => (
                  <div key={mt.questionId} className="p-2">
                    <div className="border-b-8 border-gray-300 bg-white rounded-md w-full flex flex-col items-center justify-center place-content-between shadow-lg">
                      <div className="p-5 w-full">
                        <div className="relative">
                          <div className="absolute top-0 right-0">
                            {gradeLevel === 1 || gradeLevel === 2 ? (
                              <TextSpeech currentSlide={currentSlide} />
                            ) : null}
                          </div>
                          <div className="p-10 py-5">
                            <p className="text-center text-lg sm:text-2xl break-words p-10">
                              {mt?.question !== "" &&
                                mt?.question !== "undefined" &&
                                mt?.question !== undefined && (
                                  <div className="text-center text-lg sm:text-2xl break-words p-5">
                                    {mt.question}
                                  </div>
                                )}
                            </p>
                            <div className="flex justify-center">
                              {typeof mt.image !== "undefined" &&
                                mt.image !== null &&
                                mt.image !== "" && (
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
                                      src={baseURL + `/${mt.image}`}
                                      className={`h-auto w-auto ${
                                        loadingImages ? "hidden" : "" // Hide the image when loading
                                      }`}
                                      onLoad={() => setLoadingImages(false)} // Hide loading spinner on image load
                                      onError={() => setLoadingImages(false)}
                                    />
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {Array.isArray(activity?.activity?.choices) ? (
                      <>
                        <p className="font-bold text-[#363636] tracking-tight py-5">
                          {activity?.subjectName
                            ?.toUpperCase()
                            .includes("ARALING")
                            ? "Mga Pagpipilian"
                            : "Choices"}
                        </p>
                        <div className="text-center sm:text-2xl text-base grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
                          {activity.activity.choices.map((mtt, index) => {
                            const pattern =
                              /(?<=\S)([^\w\s]|[\uD800-\uDBFF][\uDC00-\uDFFF])(?=\S)/gu;
                            const outputString = mtt?.description?.replace(
                              pattern,
                              " $1 "
                            );
                            return (
                              <div
                                key={mtt.choiceId}
                                className="relative flex items-center justify-center"
                              >
                                <div className="absolute top-2 right-2">
                                  {gradeLevel === 1 ||
                                  (gradeLevel === 2 &&
                                    mtt.description !== null) ? (
                                    <TextSpeech
                                      currentSlide={currentSlide}
                                      index={index}
                                    />
                                  ) : null}
                                </div>
                                <div
                                  className={`flex cursor-pointer justify-center items-center shadow-lg p-10 w-full min-h-[85px] h-full rounded-lg ${
                                    isPrimary &&
                                    mt.questionId === mtt.questionId
                                      ? "bg-[#87ff7c]"
                                      : clickedIndex === index
                                      ? "border-b-8 border-yellow-400 bg-yellow-300"
                                      : "border-b-8 border-gray-300 bg-white"
                                  }`}
                                  onClick={() => handleClick2(index)}
                                >
                                  {mtt.description === null ? (
                                    <div className="flex justify-center">
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
                                      <img
                                        className={`w-32 ${
                                          loadingImages ? "hidden" : "" // Hide the image when loading
                                        }`}
                                        alt="c"
                                        src={baseURL + `/${mtt.image}`}
                                        onLoad={() => setLoadingImages(false)} // Hide loading spinner on image load
                                        onError={() => setLoadingImages(false)}
                                      />
                                    </div>
                                  ) : (
                                    <p className="sm:text-2xl text-base break-words">
                                      {outputString}
                                    </p>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    ) : null}
                  </div>
                ))}
              <div
                className={` ${
                  currentSlide === slideCount
                    ? "h-fit w-full overflow-y-auto"
                    : "answer-card "
                }`}
              >
                {activity.activity && (
                  <div className="">
                    <div className="flex justify-center p-5">
                      <div className="w-full">
                        <div className="">
                          <div className="flex items-center ">
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
                          <div className="">
                            <div className="my-10 rounded-lg  bg-white shadow-lg border-b-8">
                              {activity.activity.questions
                                .slice(
                                  (currentPage - 1) * itemsPerPage,
                                  currentPage * itemsPerPage
                                )
                                .map((mt, index) => {
                                  const actualIndex =
                                    (currentPage - 1) * itemsPerPage +
                                    index +
                                    1;
                                  return (
                                    <div key={mt.questionId} className="my-5 ">
                                      <div className="items-center w-full p-6 ">
                                        <h5 className="mb-2 text-xl font-medium leading-tight">
                                          {activity?.subjectName
                                            ?.toUpperCase()
                                            .includes("ARALING")
                                            ? "Tanong # " + actualIndex
                                            : "Question # " + actualIndex}
                                        </h5>
                                        <div className="">
                                          <p className="text-2xl mb-2">
                                            {mt.question}
                                          </p>
                                          <div>
                                            {typeof mt.image !== "undefined" &&
                                              mt.image !== null &&
                                              mt.image !== "" && (
                                                <Image
                                                  className="h-32"
                                                  alt="c"
                                                  src={baseURL + `/${mt.image}`}
                                                />
                                              )}
                                          </div>
                                          <div className="flex text-base flex-wrap">
                                            <p className="mr-2">
                                              {activity?.subjectName
                                                ?.toUpperCase()
                                                .includes("ARALING")
                                                ? "Sagot:"
                                                : "Answer:"}
                                            </p>

                                            {activity.activity.choices
                                              .filter(
                                                (f) =>
                                                  mt.questionId === f.questionId
                                              )
                                              .map((c, index) => (
                                                <div key={index}>
                                                  {c.description ? (
                                                    <p className="mr-2">
                                                      {c.description}
                                                    </p>
                                                  ) : (
                                                    <p className="mr-2">
                                                      <Image
                                                        alt="fitb"
                                                        className="w-10"
                                                        src={
                                                          baseURL +
                                                          `/${c.image}`
                                                        }
                                                      />
                                                    </p>
                                                  )}
                                                </div>
                                              ))}
                                          </div>
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
                )}
              </div>
            </Carousel>
          </div>
        </div>
      </div>
      <div className="flex mb-20 items-center justify-center">
        <div className="block lg:hidden">
          <SamplePrevArrow
            onClick={() => Carouselref.current.prev()}
            currentSlide={currentSlide}
            slideCount={slideCount}
          />
        </div>
        {Array.isArray(activity?.activity?.choices) ? (
          <>
            {currentSlide !== slideCount && (
              <div className="flex justify-center p-5 sm:pl-20 sm:pr-20">
                <div
                  className={`flip-card ${isFlipped ? "flipped" : ""}`}
                  onClick={handleColor}
                >
                  <div className="flip-card-inner rounded-xl w-36 h-20 sm:w-56 sm:h-20 border-4 border-white cursor-pointer">
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
                      <p className="p-5 ">
                        {activity?.activity?.[currentSlide]?.choices?.find(
                          (ans) => ans.isCorrect === 1
                        )?.description
                          ? activity.activity[currentSlide].choices.find(
                              (ans) => ans.isCorrect === 1
                            ).description
                          : activity?.activity?.[currentSlide]?.choices
                              ?.length > 0 && (
                              <img
                                alt="fitb"
                                className="w-20"
                                src={
                                  baseURL +
                                  `/${
                                    activity?.activity?.[
                                      currentSlide
                                    ]?.choices.find(
                                      (ans) => ans.isCorrect === 1
                                    )?.image
                                  }`
                                }
                              />
                            )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : null}
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

export default Mt;
