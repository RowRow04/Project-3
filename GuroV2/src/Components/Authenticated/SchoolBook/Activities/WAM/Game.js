import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "tailwindcss/tailwind.css";
import back from "../../../../../assets/img/back_mole.png";
import start_game from "../../../../../assets/img/buttons/start_game.png";
import start_ap from "../../../../../assets/img/buttons/start_game_ap.png";
import front from "../../../../../assets/img/front_mole.png";
import grass from "../../../../../assets/img/grass.png";
import heart from "../../../../../assets/img/heart.png";
import molepng from "../../../../../assets/img/mole.png";
import { baseURL } from "../../../../../constants/constants";
import "./Wam.css";
import WamGameOver from "./WamGameOver";

const MAX_ATTEMPTS = 3;

const Game = () => {
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const { title, type } = useParams();
  const { modules } = useSelector((state) => state.subjects);
  const [activity, setActivity] = useState(null);
  const [timeUp, setTimeUp] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [moles, setMoles] = useState([]);
  const showGameOver =
    timeUp || score === moles.filter((mole) => mole.isCorrect === 1).length;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (activity && activity.choices) {
      setMoles(
        activity.choices.map((choice) => ({
          ...choice,
          active: false,
          clicked: false,
        }))
      );
    }
  }, [activity]);

  useEffect(() => {
    const getAct = modules.find(
      (m) => m.activityType === title && type === m.type
    );

    setActivity(getAct?.activity);
  }, [title, modules, type]);

  const MOLE_ACTIVE_DURATION = activity?.time || 5000;

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const chooseNextActiveMole = (moles) => {
    const activeCount = moles.filter((mole) => mole.active).length;
    const maxActiveCount = activeCount < 3 ? 2 : 1;

    if (activeCount < maxActiveCount) {
      let availableMoles = moles.filter(
        (mole) => !mole.clicked || mole.isCorrect !== 1
      );
      if (availableMoles.length > 0) {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * availableMoles.length);
        } while (availableMoles[randomIndex].active);

        return moles.indexOf(availableMoles[randomIndex]);
      }
    }
    return null;
  };

  useEffect(() => {
    let interval;

    if (gameActive) {
      interval = setInterval(() => {
        const nextActiveIndex = chooseNextActiveMole(moles);

        if (nextActiveIndex !== null) {
          setMoles((prevMoles) => {
            const newMoles = [...prevMoles];
            newMoles[nextActiveIndex].active = true;
            setTimeout(() => {
              newMoles[nextActiveIndex].active = false;
              setMoles(shuffleArray(newMoles)); // Shuffle moles after setting one to active
            }, MOLE_ACTIVE_DURATION);
            return newMoles;
          });
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [moles, MOLE_ACTIVE_DURATION, gameActive]);

  const handleWhack = (index) => {
    const moleClicked = moles[index];
    if (moleClicked && moleClicked.isCorrect === 1) {
      setScore((prevScore) => prevScore + 1);
    } else {
      setAttempt((prevAttempt) => prevAttempt + 1);
    }

    setMoles((prevMoles) => {
      const newMoles = [...prevMoles];
      newMoles[index].active = false;
      newMoles[index].clicked = true; // Mark mole as clicked
      return newMoles;
    });
  };

  const handleStart = () => {
    setScore(0);
    setMoles((prevMoles) => {
      return prevMoles.map((mole) => ({
        ...mole,
        active: false, // Assuming you have an "active" property in each mole object
      }));
    });
    setGameActive(true);
    setGameStarted(true);
  };

  const handleRestart = () => {
    setScore(0);
    setAttempt(0);
    setMoles((prevMoles) =>
      prevMoles.map((mole) => ({ ...mole, active: false, clicked: false }))
    );
    setTimeUp(false);
    setGameActive(true);
    setGameStarted(false);
  };

  useEffect(() => {
    if (attempt >= MAX_ATTEMPTS) {
      setTimeUp(true); // Set game over state
      setGameActive(false);
    }
  }, [attempt]);

  return (
    <div className="p-0 sm:p-20 mb-20">
      {showGameOver && (
        <WamGameOver
          activity={activity}
          modules={modules}
          title={title}
          type={type}
          moles={moles}
          score={score}
          isModalOpen={isModalOpen}
          handleRestart={handleRestart}
          handleModalToggle={handleModalToggle}
        />
      )}
      {showGameOver || (
        <div className="border-8 border-white rounded-3xl">
          <div
            className="rounded-xl pb-36"
            style={{
              backgroundImage: `url(${grass})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover", // Fit the image within the container without cropping
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // Center horizontally
              justifyContent: "center", // Center vertically
            }}
          >
            <div className=" flex justify-center items-center">
              <div>
                <motion.div
                  initial={{ y: 0 }}
                  animate={{
                    y: -20,
                    transition: { yoyo: Infinity, duration: 0.5 },
                  }}
                  style={{ willChange: "transform" }} // Add this line
                >
                  {!gameStarted && (
                    <div className="py-16 pb-5 flex items-center justify-center">
                      <div>
                        <div className="flex justify-center">
                          <img alt="mole" className="h-14" src={molepng} />
                        </div>
                        <div className="flex py-0 pb-0 p-5 justify-center">
                          <div className="sm:w-2/3 w-full text-center bg-white border-b-8 border-gray-300 text-[#0D004D] p-5 shadow-xl rounded-xl">
                            <p className="font-semibold text-center mb-2 text-xl">
                              Directions: {""}
                            </p>
                            {
                              modules?.find(
                                (m) =>
                                  m.activityType === title && type === m.type
                              )?.directions
                            }
                            <div className="flex justify-center my-5 ml-5 mr-5">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <div
                                  onClick={handleStart}
                                  className="relative cursor-pointer"
                                >
                                  {/* Start Game */}
                                  {modules
                                    ?.find(
                                      (m) =>
                                        m.activityType === title &&
                                        type === m.type
                                    )
                                    ?.subjectName?.toUpperCase()
                                    .includes("ARALING") ? (
                                    <img
                                      alt="wood"
                                      src={start_ap}
                                      className="w-[300px]"
                                    />
                                  ) : (
                                    <img
                                      alt="wood"
                                      src={start_game}
                                      className="w-[300px]"
                                    />
                                  )}
                                </div>
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>

              {gameActive && gameStarted && (
                <div className="block justify-center items-center mb-28">
                  <div className="flex justify-between w-full mb-20 my-0 p-5 text-white">
                    <div className="text-xl xs:text-3xl ">
                      {/* Score: */}
                      {modules
                        ?.find(
                          (m) => m.activityType === title && type === m.type
                        )
                        ?.subjectName?.toUpperCase()
                        .includes("ARALING")
                        ? "Puntos: "
                        : "Score: "}
                      {score}
                    </div>
                    <div className="hearts">
                      {Array(MAX_ATTEMPTS)
                        .fill()
                        .map((_, index) => (
                          <img
                            key={nanoid()}
                            className={`heart w-8 h-8 sm:w-12 sm:h-12 ${
                              index < attempt ? "broken" : ""
                            }`}
                            src={heart}
                            alt="Heart"
                          />
                        ))}
                    </div>
                  </div>
                  <div className="sm:p-20 sm:py-0 py-0 p-10 grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {moles.map((mole, index) => (
                      <div
                        key={index}
                        className={` xs:h-36 md:h-52 lg:h-64   sm:m-2 m-0 `}
                        onClick={() => mole.active && handleWhack(index)} // Only active moles are clickable
                      >
                        {mole.active ? (
                          <div className="h-full flex items-end cursor-pointer">
                            <div className="relative w-full">
                              <img alt="front" src={front} className="w-full" />

                              <img
                                alt="active"
                                className="max-h-32 min-w-16 absolute -top-16 left-1/2 transform -translate-x-1/2"
                                src={baseURL + `/${mole.image}`}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-end h-full ">
                            <img alt="inactive" src={back} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
