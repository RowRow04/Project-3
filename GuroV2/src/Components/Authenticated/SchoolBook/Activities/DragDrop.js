import { Carousel, Image, Progress, notification } from "antd";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";
import leftImg from "../../../../assets/img/buttons/leftBtn.png";
import rightImg from "../../../../assets/img/buttons/rightBtn.png";
import { baseURL } from "../../../../constants/constants";
import {
  handleDragDrop,
  handleDragDropChange,
} from "../../../../store/slices/dragdrop-slice";
import "./style.css";

const getCurrentDimension = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

const onDragEnd = (result, rows, setRows, currentSlide, setDragDropChoices) => {
  if (!result.destination) return;
  const { source, destination } = result;
  const answerList = rows.map((row) => ({ ...row }));

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = answerList?.[currentSlide]?.[source.droppableId];
    const destColumn = answerList?.[currentSlide]?.[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];

    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    answerList[currentSlide][source.droppableId] = {
      ...sourceColumn,
      items: sourceItems,
    };
    answerList[currentSlide][destination.droppableId] = {
      ...destColumn,
      items: destItems,
    };
  } else {
    const column = answerList?.[currentSlide]?.[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    answerList[currentSlide][source.droppableId] = {
      ...column,
      items: copiedItems,
    };
  }
  setRows(answerList);
  setDragDropChoices(answerList);
};

const DragDrop = () => {
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.auth);
  const { dragDropChoices } = useSelector((state) => state.dragdrop);
  const { title, type } = useParams(); // ? OTB ex.
  const { modules } = useSelector((state) => state.subjects);
  const [activity, setActivity] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount =
    activity.activity?.length || activity.activity?.questions.length || 0;
  const [showProgress, setShowProgress] = useState(true);
  const Carouselref = useRef(null);
  const [container1, setContainer1] = useState([]);
  const [container2, setContainer2] = useState([]);
  const [container3, setContainer3] = useState([]);
  const [container4, setContainer4] = useState([]);
  const [sorting, setSorting] = useState(false); // Step 1: Sorting state
  const [isFlipped, setIsFlipped] = useState(false);
  const [loadingImages, setLoadingImages] = useState(true);
  const [overallAnswerKey, setOverallAnswerKey] = useState({});

  //for correct answers
  const handleSort = () => {
    setSorting((prevSorting) => !prevSorting);

    const sortedRows = JSON.parse(JSON.stringify(rows));
    const currentSlideData = sortedRows[currentSlide];

    if (currentSlideData) {
      const matchingSets = {};

      // Iterate through all columns (Choices, cat, dog)
      for (const columnName in currentSlideData) {
        if (Object.hasOwnProperty.call(currentSlideData, columnName)) {
          const column = currentSlideData[columnName];

          if (column.items) {
            column.items.forEach((sortedItem) => {
              const keyId = sortedItem.keyId;

              if (!matchingSets[keyId]) {
                matchingSets[keyId] = [];
              }

              matchingSets[keyId].push(sortedItem);
            });
          }
        }
      }

      // Sort matchingSets by keyId
      const sortedMatchingSets = Object.keys(matchingSets)
        .sort((a, b) => a.localeCompare(b)) // Sort keyIds
        .reduce((obj, key) => {
          obj[key] = matchingSets[key];
          return obj;
        }, {});

      // Initialize containers
      const container1 = [];
      const container2 = [];
      const container3 = [];
      const container4 = [];

      // Push data into containers
      Object.keys(sortedMatchingSets).forEach((keyId, index) => {
        const matchingSet = sortedMatchingSets[keyId];

        if (index % 4 === 0) {
          container1.push(matchingSet);
        } else if (index % 4 === 1) {
          container2.push(matchingSet);
        } else if (index % 4 === 2) {
          container3.push(matchingSet); // Push to container3
        } else {
          container4.push(matchingSet); // Push to container4
        }
      });

      setRows(sortedRows);
      setContainer1(container1);
      setContainer2(container2);
      setContainer3(container3);
      setContainer4(container4);
    }
  };

  useEffect(() => {
    const calculateOverallAnswerKey = () => {
      const newOverallAnswerKey = {};

      rows.forEach((slideData, slideIndex) => {
        const matchingSets = {};

        // Iterate through all columns (Choices, cat, dog)
        for (const columnName in slideData) {
          if (Object.hasOwnProperty.call(slideData, columnName)) {
            const column = slideData[columnName];

            if (column.items) {
              column.items.forEach((sortedItem) => {
                const keyId = sortedItem.keyId;

                if (!matchingSets[keyId]) {
                  matchingSets[keyId] = [];
                }

                matchingSets[keyId].push(sortedItem);
              });
            }
          }
        }

        // Sort matchingSets by keyId
        const sortedMatchingSets = Object.keys(matchingSets)
          .sort((a, b) => a.localeCompare(b)) // Sort keyIds
          .reduce((obj, key) => {
            obj[key] = matchingSets[key];
            return obj;
          }, {});

        newOverallAnswerKey[slideIndex] = sortedMatchingSets;
      });

      setOverallAnswerKey(newOverallAnswerKey);
    };

    // Call the function to calculate the overall answer key when 'rows' changes
    calculateOverallAnswerKey();
  }, [rows]);

  const testName = (data, id) => {
    for (const entry of data) {
      for (const key in entry) {
        if (entry[key] && entry[key]["id"] === id) {
          return entry[key]["name"];
        }
      }
    }
    return null;
  };

  const handleProgress = () => {
    setShowProgress(false);
  };

  const SampleNextArrow = (props) => {
    const { style, onClick, currentSlide, slideCount } = props;
    if (currentSlide === slideCount) {
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
            if (currentSlide === slideCount) {
              handleProgress();
            }
          }}
        >
          <div className="rounded-lg  w-20 h-20">
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
        <div className="rounded-lg  w-20 h-20">
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
        className="hidden lg:flex cursor-pointer justify-center absolute top-1/2 -left-24 transform -translate-y-1/2"
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

  const handleReset = () => {
    setSorting(false);
  };

  useEffect(() => {
    const getAct = modules.find(
      (m) => m.activityType === title && type === m.type
    );
    setActivity((prev) => ({ ...prev, ...getAct }));
    const keys = getAct?.activity?.map((e) => e.keys);
    const transformedData = [];

    for (const group of keys) {
      const groupObj = {};

      for (const subGroup of group) {
        const name = subGroup.name;
        const newSubGroup = {
          ...subGroup,
          items: subGroup.items.map((item) => ({
            ...item,
            id: uuidv4(),
          })),
        };

        groupObj[name] = newSubGroup;
      }

      transformedData.push(groupObj);
    }

    if (
      !dragDropChoices?.[userDetails?.studentId]?.[getAct?.moduleId]?.length > 0
    ) {
      dispatch(
        handleDragDrop({
          studentId: userDetails?.studentId,
          key: getAct?.moduleId,
          value: transformedData,
        })
      );

      setRows(transformedData);
    } else {
      setRows(dragDropChoices?.[userDetails?.studentId]?.[getAct?.moduleId]);
    }
  }, [title, modules]);

  const setDragDropChoices = (answerList) => {
    dispatch(
      handleDragDropChange({
        studentId: userDetails?.studentId,
        key: activity?.moduleId,
        value: answerList,
      })
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

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  // Draggable
  const getItemBackgroundColorClass = (item) => {
    if (container1.some((matchingSet) => matchingSet.includes(item))) {
      return "bg-[#c89be3] border-[#b273d8] "; // Item is in container1, so set the background color
    } else if (container2.some((matchingSet) => matchingSet.includes(item))) {
      return "bg-[#bcf1f5] border-[#63dee9]"; // Item is in container2, so set the background color
    } else if (container3.some((matchingSet) => matchingSet.includes(item))) {
      return " bg-[#b8dd94] border-[#80c13e]"; // Item is in container2, so set the background color
    } else if (container4.some((matchingSet) => matchingSet.includes(item))) {
      return "bg-[#fff2b3] border-[#ffe04d]"; // Item is in container2, so set the background color
    } else {
      return "bg-white"; // Item is not in either container, set a default background color
    }
  };

  return (
    <div className="p-0 md:pl-20 lg:pl-20 md:pr-20 lg:pr-20">
      <div className="md:pl-14 lg:pl-14 md:pr-14 lg:pr-14">
        {activity.activity?.length > 0 ? (
          <div className="">
            <div
              style={{
                margin: "auto",
                padding: "10px",
              }}
            >
              <div className="carousel-progress mb-8">
                <div className="">
                  {showProgress && title !== "POWTOON" && (
                    <div className="flex mx-auto w-full  mb-0 flex-wrap md:flex-nowrap">
                      <div className="flex font-semibold w-48 justify-around">
                        <p className="mr-1">
                          {activity?.subjectName
                            ?.toUpperCase()
                            .includes("ARALING")
                            ? "Tanong"
                            : "Question"}
                        </p>
                        <p className="mr-4">
                          {currentSlide + 1} / {slideCount}
                        </p>
                      </div>
                      <Progress
                        percent={((currentSlide + 1) / slideCount) * 100}
                        format={() =>
                          (((currentSlide + 1) / slideCount) * 100).toFixed(1) +
                          "%"
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="carousel-wrapper">
                <Carousel
                  arrows
                  {...settings}
                  ref={(ref) => (Carouselref.current = ref)}
                  afterChange={handleAfterChange}
                >
                  {activity?.activity &&
                    activity?.activity?.map((i, index) => (
                      <div key={i.questionId} className="p-2">
                        <div className="pb-5">
                          <div className="border-b-8 border-gray-300 bg-white rounded-md w-full  p-8 flex flex-col items-center justify-center place-content-between shadow-lg">
                            {i.image && i.image === "" ? (
                              <div>
                                <p className="text-center text-lg sm:text-2xl break-words p-0">
                                  {i.question}
                                </p>
                                <div className="flex justify-center">
                                  <img
                                    className="h-32"
                                    alt="c"
                                    src={baseURL + `/${i.image}`}
                                  />
                                </div>
                              </div>
                            ) : (
                              <div>
                                <p
                                  className="break-words p-5 text-sm md:text-lg lg:text-2xl"
                                  style={{ wordBreak: "break-word" }}
                                >
                                  {i.question}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  <div
                    className={` ${
                      currentSlide === activity?.activity?.length
                        ? "h-fit w-full overflow-y-auto"
                        : "answer-card"
                    }`}
                  >
                    <div className="flex justify-center p-5 ">
                      <div className="w-full">
                        <div className="">
                          <div className="flex items-center ">
                            <div className="border-t flex-grow border-white"></div>
                            <span className="px-4 text-white">
                              <div className="flex items-center  justify-center ">
                                {activity?.subjectName
                                  ?.toUpperCase()
                                  .includes("ARALING")
                                  ? "Buod"
                                  : "Summary"}
                              </div>
                            </span>
                            <div className="border-t  flex-grow border-white"></div>
                          </div>
                          <div className="my-10 rounded-lg  bg-white shadow-lg border-b-8">
                            {activity.activity.map((otbq, index) => {
                              const items = rows[index];

                              const numColumns = Object.keys(items).filter(
                                (key) => key !== "id" && key !== "Choices"
                              ).length;

                              const currentSlideAnswers =
                                overallAnswerKey[index];

                              return (
                                <div
                                  key={otbq.questionId}
                                  className="justify-center items-center  my-5 gap-5"
                                >
                                  <div className="items-center w-full p-6 pb-0">
                                    <h5 className="mb-2 text-xl font-medium leading-tight">
                                      {activity?.subjectName
                                        ?.toUpperCase()
                                        .includes("ARALING")
                                        ? "Tanong # " + (index + 1)
                                        : "Question # " + (index + 1)}
                                    </h5>
                                    <p className="text-[18px] mb-2">
                                      {otbq.question}
                                    </p>
                                    <p className="mr-2 mb-2">
                                      {activity?.subjectName
                                        ?.toUpperCase()
                                        .includes("ARALING")
                                        ? "Tamang sagot:"
                                        : "Correct answers:"}
                                    </p>
                                    <div className="flex">
                                      <div className="w-full">
                                        <div
                                          className={`pb-2 gap-5 grid ${
                                            numColumns === 1
                                              ? "grid-cols-1"
                                              : numColumns === 2
                                              ? "md:grid-cols-2"
                                              : numColumns === 3
                                              ? "lg:grid-cols-3"
                                              : numColumns === 4
                                              ? "xl:grid-cols-4"
                                              : "xl:grid-cols-5"
                                          }`}
                                        >
                                          {currentSlideAnswers &&
                                            Object.entries(
                                              currentSlideAnswers
                                            ).map(
                                              (
                                                [columnName, columnAnswers],
                                                index
                                              ) => {
                                                const name = testName(
                                                  rows,
                                                  columnName
                                                );

                                                const columnBackgroundClasses =
                                                  [
                                                    "bg-[#A459D1] rounded-lg",
                                                    "bg-[#2CD3E1] rounded-lg",
                                                    "bg-[#8cc751] rounded-lg",
                                                    "bg-[#FFE569] rounded-lg",
                                                  ];

                                                return (
                                                  <div
                                                    className={
                                                      columnBackgroundClasses[
                                                        index
                                                      ]
                                                    }
                                                  >
                                                    {" "}
                                                    <div
                                                      key={columnName}
                                                      className={` col-bg-${
                                                        index + 1
                                                      } p-2 py-2`}
                                                    >
                                                      <div className="mb-2 text-white font-bold">
                                                        {name}
                                                      </div>
                                                      <div>
                                                        <ul className="flex flex-wrap">
                                                          {columnAnswers.map(
                                                            (
                                                              answer,
                                                              answerIndex
                                                            ) => (
                                                              <li
                                                                key={
                                                                  answerIndex
                                                                }
                                                                className="p-2 "
                                                              >
                                                                {answer.description !==
                                                                null ? (
                                                                  <p className="p-2 bg-white rounded-lg">
                                                                    {
                                                                      answer.description
                                                                    }
                                                                  </p>
                                                                ) : (
                                                                  <Image
                                                                    className="h-20 p-2 bg-white rounded-lg"
                                                                    src={
                                                                      baseURL +
                                                                      `/${answer.image}`
                                                                    }
                                                                    onLoad={() =>
                                                                      setLoadingImages(
                                                                        false
                                                                      )
                                                                    } // Hide loading spinner on image load
                                                                    onError={() =>
                                                                      setLoadingImages(
                                                                        false
                                                                      )
                                                                    }
                                                                  ></Image>
                                                                )}
                                                              </li>
                                                            )
                                                          )}
                                                        </ul>
                                                      </div>
                                                    </div>
                                                  </div>
                                                );
                                              }
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Carousel>
              </div>
              <div className="p-2">
                <DragDropContext
                  onDragEnd={(result) =>
                    onDragEnd(
                      result,
                      rows,
                      setRows,
                      currentSlide,
                      setDragDropChoices
                    )
                  }
                >
                  <div
                    className={
                      "w-full  grid text-md font-semibold grid-cols-2 gap-6"
                    }
                  >
                    {rows[currentSlide] &&
                      Object.entries(rows[currentSlide]).map(
                        ([columnId, column], index) => {
                          let backgroundColor = "";

                          if (index === 0) {
                            backgroundColor = "min-h-[80px] flex-wrap";
                          } else if (index === 1) {
                            backgroundColor =
                              "items-center w-auto rounded-lg  flex-wrap p-6 min-h-[80px] bg-[#A459D1] border-white border-4"; // Define the class or color for column 1
                          } else if (index === 2) {
                            backgroundColor =
                              "items-center w-auto rounded-lg  flex-wrap p-6 min-h-[80px]  bg-[#2CD3E1] border-white border-4"; // Define the class or color for column 2
                          } else if (index === 3) {
                            backgroundColor =
                              "items-center w-auto rounded-lg  flex-wrap p-6 min-h-[80px] bg-[#8cc751] border-white border-4"; // Define the class or color for column 2
                          } else if (index === 4) {
                            backgroundColor =
                              "items-center w-auto rounded-lg  flex-wrap p-6 min-h-[80px] bg-[#FFE569] border-white border-4"; // Define the class or color for column 2
                          } else {
                            backgroundColor =
                              "items-center w-auto rounded-lg  flex-wrap p-6 min-h-[80px] bg-opacity-50 bg-amber-600 backdrop-filter "; // Define a default class or color
                          }
                          return (
                            <div
                              key={columnId}
                              className={
                                screenSize.width < 510 &&
                                column.name !== "Choices"
                                  ? "col-span-2"
                                  : column.name === "Choices"
                                  ? "col-span-2"
                                  : "col-span-1"
                              }
                            >
                              <div
                                className={
                                  column.name !== "Choices"
                                    ? "flex flex-col justify-between pb-6 h-full"
                                    : ""
                                }
                              >
                                <p
                                  className={
                                    column.name === "Choices"
                                      ? ""
                                      : "flex flex-col justify-between pb-6 h-full"
                                  }
                                >
                                  {column.name === "Choices"
                                    ? activity?.subjectName
                                        ?.toUpperCase()
                                        .includes("ARALING")
                                      ? "Mga Pagpipilian"
                                      : "Choices"
                                    : column?.name[0]?.toUpperCase() +
                                      column?.name?.slice(1)}
                                </p>
                                <Droppable
                                  className=""
                                  droppableId={columnId}
                                  key={columnId}
                                  direction={
                                    screenSize.width < 1024
                                      ? "vertical"
                                      : "horizontal"
                                  }
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div className="">
                                        <div
                                          {...provided.droppableProps}
                                          ref={provided.innerRef}
                                          style={{
                                            background: snapshot.isDraggingOver
                                              ? "lightblue"
                                              : column.name === "Choices"
                                              ? "transparent"
                                              : "",
                                            display: "flex",
                                          }}
                                          className={
                                            column.name !== "Choices"
                                              ? `pb-6 ${backgroundColor}`
                                              : "min-h-[80px] flex-wrap"
                                          }
                                        >
                                          {column?.items.map((item, index) => {
                                            return (
                                              <div
                                                key={item.id}
                                                className="flex text-base w-auto items-center"
                                              >
                                                <Draggable
                                                  key={item.id}
                                                  draggableId={item.id}
                                                  index={index}
                                                >
                                                  {(provided, snapshot) => {
                                                    return (
                                                      <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={{
                                                          justifyContent:
                                                            "center",
                                                          alignSelf: "center",
                                                          display: "flex",
                                                          ...provided
                                                            .draggableProps
                                                            .style,
                                                        }}
                                                        className={`border-b-8 text-xl px-6 py-2 m-2 flex items-center justify-center sm:text-xl font-medium min-w-[150px] shadow-xl break-all ${
                                                          item.description
                                                            ? "rounded-md"
                                                            : "rounded-md"
                                                        } ${
                                                          sorting
                                                            ? getItemBackgroundColorClass(
                                                                item
                                                              )
                                                            : "bg-white border-gray-300"
                                                        }`}
                                                      >
                                                        {item.description ? (
                                                          <p
                                                            style={{
                                                              alignSelf:
                                                                "center",
                                                              alignContent:
                                                                "center",
                                                              alignItems:
                                                                "center",
                                                            }}
                                                          >
                                                            {item.description}
                                                          </p>
                                                        ) : (
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
                                                              alt="item-img"
                                                              src={
                                                                baseURL +
                                                                "/" +
                                                                item.image
                                                              }
                                                              className={`w-20 h-20 ${
                                                                loadingImages
                                                                  ? "hidden"
                                                                  : "" // Hide the image when loading
                                                              }`}
                                                              onLoad={() =>
                                                                setLoadingImages(
                                                                  false
                                                                )
                                                              } // Hide loading spinner on image load
                                                              onError={() =>
                                                                setLoadingImages(
                                                                  false
                                                                )
                                                              }
                                                            />
                                                          </div>
                                                        )}
                                                      </div>
                                                    );
                                                  }}
                                                </Draggable>
                                              </div>
                                            );
                                          })}
                                          {provided.placeholder}
                                          {/* boxes */}
                                        </div>
                                      </div>
                                    );
                                  }}
                                </Droppable>
                              </div>
                            </div>
                          );
                        }
                      )}
                  </div>
                </DragDropContext>
              </div>
              {currentSlide !== slideCount && (
                <div className="flex mb-10 my-4 justify-center">
                  <motion.button whileTap={{ scale: 0.9 }}>
                    <div className="flex justify-center p-5 sm:pl-20 sm:pr-20">
                      <div
                        className={`flip-card ${isFlipped ? "flipped" : ""}`}
                        onClick={handleSort}
                      >
                        <div className="cursor-pointer flip-card-inner w-36 h-20 sm:w-56 sm:h-20 rounded-xl border-4 border-white">
                          <div className="flip-card-front flex items-center justify-center">
                            <h2>
                              {activity?.subjectName
                                ?.toUpperCase()
                                .includes("ARALING")
                                ? "Ipakita ang sagot"
                                : "Show Answer"}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                </div>
              )}
            </div>
            <div className="flex mb-20 justify-center items-center">
              <div className="block lg:hidden">
                <SamplePrevArrow
                  onClick={() => Carouselref.current.prev()}
                  currentSlide={currentSlide}
                  slideCount={slideCount}
                />
              </div>
              <div className="flex justify-center p-5 pl-8 pr-8 sm:pl-20 sm:pr-20"></div>

              <div className="block lg:hidden">
                <SampleNextArrow
                  onClick={() => Carouselref.current.next()}
                  currentSlide={currentSlide}
                  slideCount={slideCount}
                />
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default DragDrop;
