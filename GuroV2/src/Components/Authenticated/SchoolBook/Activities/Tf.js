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

const { Panel } = Collapse;
const itemsPerPage = 5;

const Tf = ({ gradeLevel, activity }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showProgress, setShowProgress] = useState(true);
  const slideCount =
    activity.activity?.length || activity.activity?.questions.length || 0;
  const progress = ((currentSlide + 1) / slideCount) * 100;
  const Carouselref = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = activity.activity?.length;
  const [loadingImages, setLoadingImages] = useState(true);
  const { Step } = Steps;

  const handleProgress = () => {
    setShowProgress(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleReset = () => {
    setIsFlipped(false);
    setIsPrimaryTrue(false);
    setIsPrimaryFalse(false);
  };

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleStepClick = (step) => {
    handleReset();
    Carouselref.current.goTo(step);
  };

  const [isPrimaryTrue, setIsPrimaryTrue] = useState(false);
  const [isPrimaryFalse, setIsPrimaryFalse] = useState(false);

  // Function to capitalize the first letter of a string
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleColor = (value) => {
    if (value) {
      setIsPrimaryTrue(!isPrimaryTrue);
      setIsPrimaryFalse(false);
    } else {
      setIsPrimaryFalse(!isPrimaryFalse);
      setIsPrimaryTrue(false);
    }
  };

  const SampleNextArrow = (props) => {
    const { style, onClick, currentSlide, slideCount } = props;
    if (currentSlide === slideCount - 0) {
      return null; // hide the button if it's the last slide
    }
    return (
      <div>
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
          <div className="rounded-lg w-10 h-10 sm:w-20 sm:h-20">
            <img alt="back" src={rightImg}></img>
          </div>
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
        <div className="rounded-lg w-10 h-10 sm:w-20 sm:h-20">
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

  const TFAnswerKey = ({ activity }) => {
    return (
      <div className="">
        <div>
          <div className="flex justify-center p-5">
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
                  {activity.activity
                    ?.slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((q, index) => {
                      const actualIndex =
                        (currentPage - 1) * itemsPerPage + index + 1;

                      return (
                        <div
                          key={q.questionId}
                          className="flex justify-center items-center my-5 gap-5"
                        >
                          <div className="items-center w-full  p-6 ">
                            <h5 className="mb-2 text-xl font-medium leading-tight">
                              {activity?.subjectName
                                ?.toUpperCase()
                                .includes("ARALING")
                                ? "Tanong # " + actualIndex
                                : "Question # " + actualIndex}
                            </h5>
                            <p className="text-[18px] mb-2">{q.question}</p>
                            <div className="flex flex-wrap">
                              <p className="mr-2">
                                {activity?.subjectName
                                  ?.toUpperCase()
                                  .includes("ARALING")
                                  ? "Sagot:"
                                  : "Answer:"}
                              </p>
                              <div>
                                {q.isTrue === 1 ? (
                                  q.t &&
                                  typeof q.t === "string" &&
                                  q.t.endsWith(".png") ? (
                                    <Image
                                      className="w-32"
                                      src={baseURL + `/${q.t}`}
                                      alt="Image"
                                    />
                                  ) : (
                                    <span>
                                      {q.t && capitalizeFirstLetter(q.t)}
                                    </span>
                                  )
                                ) : q.f &&
                                  typeof q.f === "string" &&
                                  q.f.endsWith(".png") ? (
                                  <Image
                                    className="w-32"
                                    src={baseURL + `/${q.f}`}
                                    alt="Image"
                                  />
                                ) : (
                                  <span>
                                    {q.f && capitalizeFirstLetter(q.f)}
                                  </span>
                                )}
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
    );
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
                    activity.activity
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
              {activity.activity &&
                activity.activity.map((q, index) => (
                  <div key={q.questionId} className="p-2">
                    <div className="border-b-8 border-gray-300 bg-white rounded-md w-full flex flex-col items-center justify-center place-content-between shadow-lg">
                      <div className="p-5 pl-0 pr-0 py-0 w-full">
                        <div className="p-5">
                          <div className="relative">
                            <div className="absolute top-0 right-0">
                              {gradeLevel === 1 || gradeLevel === 2 ? (
                                <TextSpeech currentSlide={currentSlide} />
                              ) : null}
                            </div>
                            <div className="p-5 py-5">
                              <p className="py-5 text-center text-lg sm:text-2xl break-words p-0">
                                {q?.question !== "" &&
                                  q?.question !== "undefined" &&
                                  q?.question !== undefined && (
                                    <div className="text-center text-lg sm:text-2xl break-words p-5">
                                      {q.question}
                                    </div>
                                  )}
                              </p>
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="font-bold text-[#363636] tracking-tight py-8 pb-2">
                      {activity?.subjectName?.toUpperCase().includes("ARALING")
                        ? "Mga Pagpipilian"
                        : "Choices"}
                    </p>
                    <div className="text-center sm:text-2xl text-base grid xs:grid-cols-2 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-2 gap-6">
                      <div className=" flex items-center justify-center">
                        <button
                          className={`flex cursor-pointer justify-center shadow-lg items-center p-5 w-full min-h-[85px] rounded-lg ${
                            isPrimaryTrue
                              ? "border-b-8 border-yellow-400 bg-yellow-300"
                              : "border-b-8 border-gray-300 bg-white"
                          }`}
                          onClick={() => handleColor(true)}
                        >
                          {(q.t &&
                            typeof q.t === "string" &&
                            q.t.endsWith(".png")) ||
                          q.t.endsWith(".jpeg") ||
                          q.t.endsWith(".jpg") ? (
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
                                src={baseURL + `/${q.t}`}
                                alt="trueImg"
                                onLoad={() => setLoadingImages(false)} // Hide loading spinner on image load
                                onError={() => setLoadingImages(false)}
                              />
                            </div>
                          ) : (
                            <span> {q.t && capitalizeFirstLetter(q.t)}</span>
                          )}
                        </button>
                      </div>
                      <div className="flex items-center justify-center">
                        <button
                          className={`flex cursor-pointer justify-center shadow-lg items-center p-5 w-full min-h-[85px] rounded-lg ${
                            isPrimaryFalse
                              ? "border-b-8 border-yellow-400 bg-yellow-300"
                              : "border-b-8 border-gray-300 bg-white"
                          }`}
                          onClick={() => handleColor(false)}
                        >
                          {(q.f &&
                            typeof q.f === "string" &&
                            q.f.endsWith(".png")) ||
                          q.f.endsWith(".jpeg") ||
                          q.f.endsWith(".jpg") ? (
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
                              <img
                                className={`w-32 ${
                                  loadingImages ? "hidden" : "" // Hide the image when loading
                                }`}
                                src={baseURL + `/${q.f}`}
                                alt="falseImg"
                                onLoad={() => setLoadingImages(false)} // Hide loading spinner on image load
                                onError={() => setLoadingImages(false)}
                              />
                            </div>
                          ) : (
                            <span> {q.f && capitalizeFirstLetter(q.f)}</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              <div className="">
                {activity.activity && <TFAnswerKey activity={activity} />}
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
        {currentSlide !== slideCount && (
          <div className="flex  justify-center p-5 sm:pl-20 sm:pr-20">
            <div
              className={`flip-card ${isFlipped ? "flipped" : ""}`}
              onClick={handleClick}
            >
              <div className="flip-card-inner w-36 h-20 sm:w-56 sm:h-20 rounded-xl border-4 border-white cursor-pointer">
                <div className="flip-card-front flex items-center justify-center">
                  <h2>
                    {activity?.subjectName?.toUpperCase().includes("ARALING")
                      ? "Ipakita ang sagot"
                      : "Show Answer"}
                  </h2>
                </div>
                <div className="flip-card-back  flex items-center justify-center">
                  <div className="p-5">
                    <div className="">
                      {activity?.activity?.[currentSlide]?.isTrue === 1 ? (
                        activity?.activity?.[currentSlide]?.t &&
                        typeof activity?.activity?.[currentSlide]?.t ===
                          "string" &&
                        activity?.activity?.[currentSlide]?.t.endsWith(
                          ".png"
                        ) ? (
                          <img
                            className="h-[6vh]"
                            src={
                              baseURL +
                              `/${activity?.activity?.[currentSlide]?.t}`
                            }
                            alt="true"
                            onError={() => console.log("Failed to load image.")}
                          />
                        ) : (
                          <span>
                            {activity?.activity?.[currentSlide]?.t &&
                              capitalizeFirstLetter(
                                activity.activity[currentSlide].t
                              )}
                          </span>
                        )
                      ) : activity?.activity?.[currentSlide]?.f &&
                        typeof activity?.activity?.[currentSlide]?.f ===
                          "string" &&
                        activity?.activity?.[currentSlide]?.f.endsWith(
                          ".png"
                        ) ? (
                        <img
                          className="h-[6vh]"
                          src={
                            baseURL +
                            `/${activity?.activity?.[currentSlide]?.f}`
                          }
                          alt="flse"
                          onError={() => console.log("Failed to load image.")}
                        />
                      ) : (
                        <span>
                          {activity?.activity?.[currentSlide]?.f &&
                            capitalizeFirstLetter(
                              activity.activity[currentSlide].f
                            )}
                        </span>
                      )}
                    </div>
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

export default Tf;
