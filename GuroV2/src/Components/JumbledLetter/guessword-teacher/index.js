import { motion } from "framer-motion";
import "./style.css";
function GuessLetterTeacher({ guess, answer, removeAnswer }) {
  return (
    <div className="p-1 my-5 relative flex flex-row items-center">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`flex items-center justify-center w-full bg-amber-300 border-amber-500 border-b-8 p-4 xl:p-6  xl:text-3xl sm:text-base h-6 rounded-lg`}
        onClick={
          removeAnswer
            ? () => {
                removeAnswer(guess, answer[guess]);
              }
            : null
        }
      >
        {guess}
      </motion.button>
    </div>
  );
}

export default function GuesswordTeacher({
  guess,
  guessword,
  answer,
  removeAnswer,
}) {
  return (
    <div className="guessword  w-full">
      {guessword.split("").map((letter, index) => (
        <GuessLetterTeacher
          key={letter + index}
          guess={guess[index]}
          answer={answer}
          removeAnswer={removeAnswer}
        />
      ))}
    </div>
  );
}
