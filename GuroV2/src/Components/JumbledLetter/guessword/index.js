// import { Button } from "antd";
// import "./style.css";
// import { motion } from "framer-motion";
// function GuessLetter({ guess, answer, removeAnswer }) {
//   return (
//     // <span className={`guess-letter neumorph-guess disabled`}>
//     <div className="p-1 my-5 relative flex flex-row items-center">
//       {answer[guess] ? <motion.button
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         // className={`keyboard-button neumorph ${disabled && "invert disabled"}`}
//         className={`bg-amber-300 md:p-6 md:m-2 flex items-center justify-center sm:text-3xl text-sm h-6 w-6 rounded-lg border-b-8 border-amber-500 `}
//         onClick={removeAnswer ? () => { removeAnswer(guess, answer[guess]) } : null}
//       >
//         {answer[guess]}
//       </motion.button> :
//         <span
//           className={`guess-letter sm:text-3xl text-sm neumorph-guess disabled bg-white  text-yellow-500 rounded-md border-2 border-gray-200`}
//         >
//           -
//         </span>}
//     </div>
//   );
// }

// export default function Guessword({ guess, guessword, answer, removeAnswer }) {
//   return (
//     <div className="guessword  w-full">
//       {guessword.split("").map((letter, index) => (
//         <GuessLetter
//           key={letter + index}
//           guess={guess?.[index]}
//           answer={answer}
//           removeAnswer={removeAnswer}
//         />
//       ))}
//     </div>
//   );
// }

import { Button } from "antd";
import "./style.css";
import { motion } from "framer-motion";
// function GuessLetter({ guess, answer, removeAnswer, letter }) {
//   return (
//     // <span className={`guess-letter neumorph-guess disabled`}>
//     <div className="p-1 my-5 relative flex flex-row items-center">
//       {letter === " " ? (
//         <div className={`m-6`}> </div>
//       ) : answer[guess] ? (
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           // className={`keyboard-button neumorph ${disabled && "invert disabled"}`}
//           className={`bg-amber-300 md:p-6 md:m-2 flex items-center justify-center sm:text-3xl text-sm h-6 w-6 rounded-lg border-b-8 border-amber-500 `}
//           onClick={
//             removeAnswer
//               ? () => {
//                   removeAnswer(guess, answer[guess]);
//                 }
//               : null
//           }
//         >
//           {answer[guess]}
//         </motion.button>
//       ) : (
//         <span
//           className={`guess-letter sm:text-3xl text-sm neumorph-guess disabled bg-white  text-yellow-500 rounded-md border-2 border-gray-200`}
//         >
//           -
//         </span>
//       )}
//     </div>
//   );
// }

function GuessLetter({ guess, answer, removeAnswer, letter }) {
  const specialCharacters = ` .,'"!:;_-=></!@#$%^&*()`.split("");

  return (
    // <span className={`guess-letter neumorph-guess disabled`}>
    <div className="p-1 my-5 relative flex flex-row items-center">
      {specialCharacters.includes(letter) ? (
        <div className={`m-6`}>
          <p className="text-2xl">{letter}</p>
        </div>
      ) : answer[guess] ? (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          // className={`keyboard-button neumorph ${disabled && "invert disabled"}`}
          className={`bg-amber-300 p-4 w-full md:p-6 md:m-2 flex items-center justify-center sm:text-3xl text-sm h-6 rounded-lg border-b-8 border-amber-500 `}
          onClick={
            removeAnswer
              ? () => {
                  removeAnswer(guess, answer[guess]);
                }
              : null
          }
        >
          {answer[guess]}
        </motion.button>
      ) : (
        <span
          className={`guess-letter sm:text-3xl text-sm neumorph-guess disabled bg-white  text-yellow-500 rounded-md border-2 border-gray-200`}
        >
          -
        </span>
      )}
    </div>
  );
}

export default function Guessword({ guess, guessword, answer, removeAnswer }) {
  return (
    <div className="guessword  w-full">
      {guessword.split("").map((letter, index) => (
        <GuessLetter
          key={letter + index}
          guess={guess?.[index]}
          answer={answer}
          removeAnswer={removeAnswer}
          letter={letter}
        />
      ))}
    </div>
  );
}
