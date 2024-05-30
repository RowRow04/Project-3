import {
  DownOutlined,
  LeftOutlined,
  RightOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { memo, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import gray from "../../../../../assets/img/buttons/gray_check.png";
import green from "../../../../../assets/img/buttons/green_check.png";
import show_ans from "../../../../../assets/img/buttons/show_answer.png";
import show_ans_ap from "../../../../../assets/img/buttons/ipakita.png";
import { handlePosition } from "../../../../../store/slices/maze-slice";
import "./style.css";
import { solve } from "./util";

const MazeGame = ({
  activity,
  randomNumber,
  array,
  moduleId,
  position,
  indexPosition,
  handleSubmitAnswer,
}) => {
  const dispatch = useDispatch();
  const [gameId, setGameId] = useState(1);
  const [status, setStatus] = useState([]);
  const [confirmAnswers, setConfirmAnswers] = useState([]);
  const [isCorrect, setIsCorrect] = useState([]);
  const { mazeRoutes, mazeAnswers } = useSelector((state) => state.maze);
  const [size, setSize] = useState(10);
  const [cheatMode, setCheatMode] = useState(false);
  const { userDetails } = useSelector((state) => state.auth);
  const [userPosition, setUserPosition] = useState(position);
  const solution = useMemo(() => {
    const correctAnswer = randomNumber.filter((e) => e.isCorrect == 1);
    const ran = [...correctAnswer];
    const coords = { ...ran[0] };
    const x =
      mazeRoutes[userDetails?.studentId][moduleId][indexPosition]?.length -
      +coords.x;
    const y =
      mazeRoutes[userDetails?.studentId][moduleId][indexPosition]?.[0]?.length -
      +coords.y;
    const s = new Set();
    const solutionPath = solve(
      mazeRoutes[userDetails?.studentId][moduleId][indexPosition],
      userPosition[0],
      userPosition[1],
      x,
      y
    );
    solutionPath.forEach((path) => {
      const [x, y] = path;
      s.add(String(x) + "-" + String(y));
    });
    return s;
  }, [size, userPosition[0], userPosition[1], gameId]);

  const showAns = () => {
    setCheatMode((prevCheatMode) => !prevCheatMode);
  };

  useEffect(() => {
    const correctAnswer = randomNumber;
    const ran = [...correctAnswer];
    const answerList = [...status];
    const confirmAnswer = [...confirmAnswers];
    const isCorrectAnswer = [...isCorrect];
    if (
      ran.some((obj) => obj.x !== userPosition[0] && obj.y !== userPosition[1])
    ) {
      confirmAnswer[indexPosition] = "";
      isCorrectAnswer[indexPosition] = "";
      setConfirmAnswers(confirmAnswer);
      setIsCorrect(isCorrectAnswer);
    }
    for (let index = 0; index < ran.length; index++) {
      const coords = { ...ran[index] };
      const lastRowIndex =
        mazeRoutes[userDetails?.studentId][moduleId][indexPosition].length -
        +coords.x;
      const lastColIndex =
        mazeRoutes[userDetails?.studentId][moduleId][indexPosition][0].length -
        +coords.y;
      const correct = coords?.isCorrect;
      if (
        userPosition[0] === lastRowIndex &&
        userPosition[1] === lastColIndex
      ) {
        if (correct === 1) {
          answerList[indexPosition] = "dest" + (index + 1);
          setStatus(answerList);
          confirmAnswer[indexPosition] = coords?.choiceId;
          isCorrectAnswer[indexPosition] = coords?.isCorrect;
          setConfirmAnswers(confirmAnswer);
          setIsCorrect(isCorrectAnswer);
        } else {
          const answerList = [...status];
          answerList[indexPosition] = "dest" + (index + 1);
          setStatus(answerList);
          confirmAnswer[indexPosition] = coords?.choiceId;
          isCorrectAnswer[indexPosition] = coords?.isCorrect;
          setConfirmAnswers(confirmAnswer);
          setIsCorrect(isCorrectAnswer);
        }
      }
    }
  }, [userPosition[0], userPosition[1]]);

  const makeClassName = (i, j) => {
    const rows =
      mazeRoutes[userDetails?.studentId][moduleId][indexPosition]?.length;
    const cols =
      mazeRoutes[userDetails?.studentId][moduleId][indexPosition][0]?.length;
    let arr = [];
    if (
      mazeRoutes[userDetails?.studentId][moduleId][indexPosition][i][j][0] === 0
    ) {
      arr.push("topWall");
    }

    if (
      mazeRoutes[userDetails?.studentId][moduleId][indexPosition][i][j][1] === 0
    ) {
      arr.push("rightWall");
    }

    if (
      mazeRoutes[userDetails?.studentId][moduleId][indexPosition][i][j][2] === 0
    ) {
      arr.push("bottomWall");
    }

    if (
      mazeRoutes[userDetails?.studentId][moduleId][indexPosition][i][j][3] === 0
    ) {
      arr.push("leftWall");
    }

    for (let index = 0; index < array; index++) {
      if (
        i === rows - randomNumber[index].x &&
        j === cols - randomNumber[index].y
      ) {
        arr.push(`destination${index + 1}`);
      }
    }

    if (i === userPosition[0] && j === userPosition[1]) {
      arr.push("currentPosition");
    }

    if (cheatMode && solution?.has(String(i) + "-" + String(j))) {
      arr.push("sol");
    }

    return arr.join(" ");
  };

  const handleMove = (e) => {
    e.preventDefault();
    if (
      mazeAnswers[userDetails?.studentId][moduleId][indexPosition].answer !== ""
    ) {
      return;
    }
    const key = e.code;

    const [i, j] = userPosition;
    if (
      key === "KeyW" &&
      mazeRoutes[userDetails?.studentId][moduleId][indexPosition][i][j][0] === 1
    ) {
      dispatch(
        handlePosition({
          studentId: userDetails?.studentId,
          key: moduleId,
          index: indexPosition,
          value: [i - 1, j],
        })
      );
      setUserPosition([i - 1, j]);
    }
    if (
      key === "KeyD" &&
      mazeRoutes[userDetails?.studentId][moduleId][indexPosition][i][j][1] === 1
    ) {
      dispatch(
        handlePosition({
          studentId: userDetails?.studentId,
          key: moduleId,
          index: indexPosition,
          value: [i, j + 1],
        })
      );
      setUserPosition([i, j + 1]);
    }
    if (
      key === "KeyS" &&
      mazeRoutes[userDetails?.studentId][moduleId][indexPosition][i][j][2] === 1
    ) {
      dispatch(
        handlePosition({
          studentId: userDetails?.studentId,
          key: moduleId,
          index: indexPosition,
          value: [i + 1, j],
        })
      );
      setUserPosition([i + 1, j]);
    }
    if (
      key === "KeyA" &&
      mazeRoutes[userDetails?.studentId][moduleId][indexPosition][i][j][3] === 1
    ) {
      dispatch(
        handlePosition({
          studentId: userDetails?.studentId,
          key: moduleId,
          index: indexPosition,
          value: [i, j - 1],
        })
      );
      setUserPosition([i, j - 1]);
    }
  };

  const handleUpMove = () => {
    if (
      mazeAnswers[userDetails?.studentId][moduleId][indexPosition].answer !== ""
    ) {
      return;
    }
    const [i, j] = userPosition;
    if (
      mazeRoutes[userDetails?.studentId][moduleId][indexPosition][i][j][0] === 1
    ) {
      dispatch(
        handlePosition({
          studentId: userDetails?.studentId,
          key: moduleId,
          index: indexPosition,
          value: [i - 1, j],
        })
      );
      setUserPosition([i - 1, j]);
    }
  };

  const handleDownMove = () => {
    if (
      mazeAnswers[userDetails?.studentId][moduleId][indexPosition].answer !== ""
    ) {
      return;
    }
    const [i, j] = userPosition;
    if (
      mazeRoutes[userDetails?.studentId][moduleId][indexPosition][i][j][2] === 1
    ) {
      dispatch(
        handlePosition({
          studentId: userDetails?.studentId,
          key: moduleId,
          index: indexPosition,
          value: [i + 1, j],
        })
      );
      setUserPosition([i + 1, j]);
    }
  };

  const handleLeftMove = () => {
    if (
      mazeAnswers[userDetails?.studentId][moduleId][indexPosition].answer !== ""
    ) {
      return;
    }
    const [i, j] = userPosition;
    if (
      mazeRoutes[userDetails?.studentId][moduleId][indexPosition][i][j][3] === 1
    ) {
      dispatch(
        handlePosition({
          studentId: userDetails?.studentId,
          key: moduleId,
          index: indexPosition,
          value: [i, j - 1],
        })
      );
      setUserPosition([i, j - 1]);
    }
  };

  const handleRightMove = () => {
    if (
      mazeAnswers[userDetails?.studentId][moduleId][indexPosition].answer !== ""
    ) {
      return;
    }
    const [i, j] = userPosition;
    if (
      mazeRoutes[userDetails?.studentId][moduleId][indexPosition][i][j][1] === 1
    ) {
      dispatch(
        handlePosition({
          studentId: userDetails?.studentId,
          key: moduleId,
          index: indexPosition,
          value: [i, j + 1],
        })
      );
      setUserPosition([i, j + 1]);
    }
  };

  return (
    <div
      className="maze-container flex flex-col w-full"
      onKeyDown={handleMove}
      tabIndex={-1}
    >
      <div className="w-full h-full border-2 border-black rounded-lg mb-4">
        <div className="w-full h-full bg-white border-2 border-white rounded-lg">
          <div className="ribbon"></div>
          <div className="flex items-center justify-center self-center py-4">
            <table id="maze">
              <tbody>
                {mazeRoutes[userDetails?.studentId][moduleId][
                  indexPosition
                ]?.map((row, i) => {
                  return (
                    <tr key={`row-${i}`} className="">
                      {row.map((cell, j) => {
                        return (
                          <td
                            key={`cell-${i}-${j}`}
                            className={
                              makeClassName(i, j) + " " + status[indexPosition]
                            }
                          >
                            {confirmAnswers[indexPosition] ? (
                              <span className="tooltip">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="white"
                                  width="24"
                                  height="24"
                                >
                                  <path
                                    d="M12 2L9.19615 9.54002H1.31643L7.90815 14.4594L5.11261 21.9995L12 17.0801L18.8874 21.9995L16.0919 14.4594L22.6836 9.54002H14.8039L12 2Z"
                                    stroke="white"
                                    strokeWidth="1"
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </span>
                            ) : null}
                            <div />
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-between">
        <div className="flex justify-between w-full">
          <div className="p-2">
            <div onClick={showAns} className="w-32">
              {activity?.subjectName?.toUpperCase().includes("ARALING") ? (
                <img
                  alt="back"
                  className="w-full cursor-pointer"
                  src={show_ans_ap}
                ></img>
              ) : (
                <img
                  alt="back"
                  className="w-full cursor-pointer"
                  src={show_ans}
                ></img>
              )}
            </div>
          </div>
          <div className="p-2 py-1">
            {!confirmAnswers[indexPosition] ? (
              <div
                className=""
                style={{
                  display: "block",
                  cursor: "pointer",
                  height: 50,
                  width: 50,
                }}
              >
                <div className="rounded-lg">
                  <img alt="back" src={gray}></img>
                </div>
              </div>
            ) : (
              <div
                className=""
                style={{
                  display: "block",
                  cursor: "pointer",
                  height: 50,
                  width: 50,
                }}
                onClick={() => {
                  const answer = confirmAnswers[indexPosition];
                  const isCorrectAnswer = isCorrect[indexPosition];
                  handleSubmitAnswer(indexPosition, answer, isCorrectAnswer);
                }}
              >
                <div className="rounded-lg">
                  <img alt="back" src={green}></img>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mx-auto my-10">
          <div className="">
            <div className="flex justify-center">
              <Button
                type="primary"
                shape="circle"
                icon={<UpOutlined />}
                onClick={handleUpMove}
                size="large"
                style={{
                  height: 50,
                  width: 50,
                }}
              />
            </div>
            <div className="flex items-center justify-center p-2">
              <Button
                type="primary"
                shape="circle"
                icon={<LeftOutlined />}
                onClick={handleLeftMove}
                size="large"
                style={{
                  height: 50,
                  width: 50,
                }}
              />
              <Button
                className="ml-2 mr-2"
                type="primary"
                shape="circle"
                icon={<DownOutlined />}
                onClick={handleDownMove}
                size="large"
                style={{
                  height: 50,
                  width: 50,
                }}
              />
              <Button
                type="primary"
                shape="circle"
                icon={<RightOutlined />}
                onClick={handleRightMove}
                size="large"
                style={{
                  height: 50,
                  width: 50,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(MazeGame);
