import Crossword from "@jaredreisinger/react-crossword";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { handlePress } from "../../../../store/slices/crossword-slice";
import { callSubjectModules } from "../../../../store/slices/subjectSlice";
import "../../../../ui/FlipCard.css";
import "./style.css";

let DATA = {};

const convertData = (data) => {
  const convertedData = [];

  // Iterate over each item in the data
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const row = item.rowVal;
    const col = item.colVal;
    const answer = item.answer;

    let obj = {};

    // Determine the direction of alignment
    if (item.alignment === "ACROSS") {
      for (let j = 0; j < answer.length; j++) {
        const key = `${row},${col + j}`;
        const char = "";
        obj[key] = char;
      }
    } else if (item.alignment === "DOWN") {
      for (let j = 0; j < answer.length; j++) {
        const key = `${row + j},${col}`;
        const char = "";
        obj[key] = char;
      }
    }

    convertedData.push([obj]);
  }

  return convertedData;
};

const getValues = (crosswordAnswers, studentId, moduleId) => {
  let joinedValues = [...crosswordAnswers[studentId][moduleId]];
  let result = [];
  for (const arr of joinedValues) {
    for (const obj of arr) {
      const keys = Object.values(obj);
      result.push(keys.join(""));
    }
  }

  return result;
};

const CW = () => {
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { title, type } = useParams(); // ? OTB ex.
  const { modules } = useSelector((state) => state.subjects);
  const { crosswordAnswers } = useSelector((state) => state.crossword);
  const { userDetails } = useSelector((state) => state.auth);
  const [activity, setActivity] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const crossword = useRef();
  const [isFlipped, setIsFlipped] = useState(false);

  const fillAllAnswered = () => {
    const moduleId = modules.find(
      (m) => m.activityType === title && type === m.type
    ).moduleId;
    if (crosswordAnswers?.[userDetails?.studentId]?.[moduleId]) {
      let crossValues = [...crosswordAnswers[userDetails?.studentId][moduleId]];
      for (const arr of crossValues) {
        for (const obj of arr) {
          let entries = Object.entries(obj);
          for (let [index, [key, value]] of entries.entries()) {
            crossword.current.setGuess(
              +key.split(",")[0],
              +key.split(",")[1],
              value
            );
          }
        }
      }
    }
  };

  useEffect(() => {
    const getAct = modules.find(
      (m) => m.activityType === title && type === m.type
    );
    setActivity((prev) => ({ ...getAct }));
    const cross = { ...getAct };

    const groupedData = cross?.activity?.reduce((result, item, index) => {
      const { alignment } = item;
      if (!result[alignment?.toLowerCase()]) {
        result[alignment?.toLowerCase()] = {};
      }
      result[alignment?.toLowerCase()][item?.numberVal] = {
        questionId: item.questionId,
        clue: item.question,
        answer: item.answer.toUpperCase(),
        row: item.rowVal,
        col: item.colVal,
      };
      return result;
    }, {});

    DATA = groupedData;
    setIsLoading(false);
  }, [title, type, modules]);

  useEffect(() => {
    setSelectedAnswers(
      activity?.activity?.map((e, i) => {
        return {
          questionId: e.questionId,
          choiceId: "na",
          answer:
            getValues(
              crosswordAnswers,
              userDetails?.studentId,
              activity?.moduleId
            )?.[i] || "",
          alignment: e.alignment,
          number: e.numberVal,
          dateAnswered: moment().format("YYYY-MM-DD HH:mm:ss"),
          questionAnswer: e?.answer?.toUpperCase(),
        };
      })
    );

    const mod = modules.find(
      (m) => m.activityType === title && type === m.type
    );

    if (!crosswordAnswers?.[userDetails?.studentId]?.[mod?.moduleId]) {
      const activityAnswer = convertData(mod?.activity);
      dispatch(
        handlePress({
          studentId: userDetails?.studentId,
          key: mod?.moduleId,
          value: activityAnswer,
        })
      );
    }
  }, [activity]);

  useEffect(() => {
    if (crossword.current && !isLoading) {
      setTimeout(() => fillAllAnswered(), 300);
    }
  }, [crossword.current, isLoading]);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    crossword?.current?.fillAllAnswers();
  };

  useEffect(() => {
    if (isFlipped) crossword?.current?.fillAllAnswers();
    else crossword?.current?.reset();
  }, [isFlipped]);

  const answerHandler = (direction, number, correct, answer) => {
    const updatedAnswer = selectedAnswers.map((ans, i) => {
      if (
        +ans.number === +number &&
        ans.alignment === direction.toUpperCase()
      ) {
        if (correct) {
          return {
            ...ans,
            answer: answer,
            dateAnswered: moment().format("YYYY-MM-DD HH:mm:ss"),
          };
        }
        return {
          ...ans,
          answer: getValues(
            crosswordAnswers,
            userDetails?.studentId,
            activity?.moduleId
          )?.[i],
          dateAnswered: moment().format("YYYY-MM-DD HH:mm:ss"),
        };
      }
      return ans;
    });

    setSelectedAnswers(updatedAnswer);
  };

  const cellHandler = (row, col, char) => {
    const ans = [
      ...crosswordAnswers[userDetails?.studentId][activity?.moduleId],
    ];

    const updatedAns = ans.map((arr) =>
      arr.map((obj) => {
        const newObj = { ...obj }; // Create a shallow copy of the object
        const keys = Object.keys(newObj);
        if (keys.includes(`${row},${col}`)) {
          newObj[`${row},${col}`] = char;
        }
        return newObj;
      })
    );

    dispatch(
      handlePress({
        studentId: userDetails?.studentId,
        key: activity?.moduleId,
        value: updatedAns,
      })
    );
  };

  return (
    <div className="p-0 md:pl-10 lg:pl-10 md:pr-10 lg:pr-10">
      <div
        style={{
          margin: "auto",
          padding: "10px",
        }}
      >
        <div>
          {!isLoading ? (
            <div>
              <Crossword
                ref={crossword}
                data={DATA}
                theme={{
                  numberColor: "rgba(0,0,0, 0.75)",
                  allowNonSquare: true,
                }}
                columnBreakpoint="200px"
                onAnswerComplete={answerHandler}
                onCellChange={cellHandler}
              />
            </div>
          ) : null}
        </div>
        <div className="flex justify-center p-5 sm:pl-20 sm:pr-20">
          <div className="flex  justify-center p-5 sm:pl-20 sm:pr-20">
            <div
              className={`flip-card cursor-pointer ${
                isFlipped ? "flipped" : ""
              }`}
              onClick={handleClick}
            >
              <div className="flip-card-inner w-36 h-20 sm:w-56 sm:h-20 rounded-xl border-4 border-white">
                <div className="flip-card-front flex items-center justify-center">
                  <h2>
                    {activity?.subjectName?.toUpperCase().includes("ARALING")
                      ? "Ipakita ang mga sagot"
                      : "Show Answers"}
                  </h2>
                </div>
                <div className="flip-card-back flex items-center justify-center">
                  {activity?.subjectName?.toUpperCase().includes("ARALING")
                    ? "Itago ang mga sagot"
                    : "Hide Answers"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CW;
