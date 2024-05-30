import "./style.css";

function GuessLetter({ letter, rightGuesses, question }) {
  const specialCharacters = ` .,'"!:;_-=></!@#$%^&*()`.split("");

  return (
    // <span className={`guess-letter neumorph-guess disabled`}>
    specialCharacters.includes(letter) ? (
      <div className={`m-6`}>
        <p className="text-2xl">{letter}</p>
      </div>
    ) : (
      <div className="p-1 my-5">
        <span
          className={`guess-letter  sm:text-3xl text-sm neumorph-guess disabled bg-white  text-yellow-500 rounded-md border border-2 border-gray-200`}
        >
          {rightGuesses?.includes(letter) ? letter?.toUpperCase() : "-"}
        </span>
      </div>
    )
  );
}

export default function Guessword({ rightGuesses, guessword, question }) {
  return (
    <div className="guessword   w-full">
      {guessword.split("").map((letter, index) => (
        <GuessLetter
          key={letter + index}
          letter={letter}
          rightGuesses={rightGuesses}
          question={question}
        />
      ))}
    </div>
  );
}
