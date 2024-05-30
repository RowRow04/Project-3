import { motion } from "framer-motion";
import React from "react";
import "tailwindcss/tailwind.css";
import show_answer_key from "../../../../../assets/img/buttons/answer_key.png";
import ap_play_again from "../../../../../assets/img/buttons/ap_play_again.png";
import play_again from "../../../../../assets/img/buttons/play_again.png";
import grass from "../../../../../assets/img/grass.png";
import "./Wam.css";
import WamModal from "./WamModal";

const GameOver = ({
  activity,
  title,
  type,
  modules,
  moles,
  score,
  isModalOpen,
  handleRestart,

  handleModalToggle,
}) => {
  const isGameWon =
    score === moles.filter((mole) => mole.isCorrect === 1).length;

  const correctChoices = moles.filter((mole) => mole.isCorrect === 1);

  return (
    <div className="border-8 rounded-3xl">
      <div
        className="rounded-xl"
        style={{
          backgroundImage: `url(${grass})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "auto", // Fit the image within the container without cropping
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Center horizontally
          justifyContent: "center", // Center vertically
        }}
      >
        <div className="text-white flex flex-col items-center justify-center">
          <div className="game-over p-10">
            <h1 className="flex justify-center text-4xl font-semibold">
              <div className="flex py-0 pb-0 p-5 justify-center">
                <div className=" text-center bg-white border-b-8 border-gray-300 text-[#0D004D] p-5 shadow-xl rounded-xl">
                  <p className="font-semibold text-center mb-2 text-xl">
                    {modules
                      ?.find((m) => m.activityType === title && type === m.type)
                      ?.subjectName?.toUpperCase()
                      .includes("ARALING")
                      ? isGameWon
                        ? "Mahusay!"
                        : "Tapos na ang laro"
                      : isGameWon
                      ? "Excellent!"
                      : "Game Over"}
                  </p>
                  <div className="flex justify-center my-5 ml-5 mr-5">
                    <div className="relative cursor-pointer">
                      {modules
                        ?.find(
                          (m) => m.activityType === title && type === m.type
                        )
                        ?.subjectName?.toUpperCase()
                        .includes("ARALING") ? (
                        isGameWon ? (
                          <p className="text-base font-light">Napakagaling!</p>
                        ) : (
                          <p className="text-base font-light">
                            Pagbutihin sa susunod.
                          </p>
                        )
                      ) : isGameWon ? (
                        <p className="text-base font-light">
                          That was an incredible performance! Give yourself a
                          big pat on the back!
                        </p>
                      ) : (
                        <p className="text-base font-light">
                          Better luck next time.
                        </p>
                      )}
                      <div className="text-2xl mt-10 block justify-center mb-5 sm:mb-10">
                        {/* Score: */}
                        <div className="flex justify-center text-6xl">
                          {score}
                        </div>
                        <div className="flex justify-center">
                          {modules
                            ?.find(
                              (m) => m.activityType === title && type === m.type
                            )
                            ?.subjectName?.toUpperCase()
                            .includes("ARALING")
                            ? "Puntos "
                            : "Score "}
                        </div>
                      </div>

                      {/* Submit Score */}
                      <div
                        className="flex justify-center my-5"
                        onClick={handleRestart}
                      >
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {modules
                            ?.find(
                              (m) => m.activityType === title && type === m.type
                            )
                            ?.subjectName?.toUpperCase()
                            .includes("ARALING") ? (
                            <img
                              alt="wood"
                              src={ap_play_again}
                              className="w-[300px]"
                            />
                          ) : (
                            <img
                              alt="wood"
                              src={play_again}
                              className="w-[300px]"
                            />
                          )}
                        </motion.button>
                      </div>
                      <div className="flex justify-center">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <div onClick={handleModalToggle}>
                            <img
                              alt="wood"
                              src={show_answer_key}
                              className="w-[300px]"
                            />
                          </div>
                        </motion.button>
                      </div>
                      <div className="">
                        <WamModal
                          activity={activity}
                          correctChoices={correctChoices}
                          isOpen={isModalOpen}
                          onClose={handleModalToggle}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
