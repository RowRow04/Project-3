import "./style.css";
import { GAME_RESULT } from "../../../constants";
import { useParams } from "react-router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Result({ result, guessword }) {
  const { title, type } = useParams(); // ? OTB ex.
  const [activity, setActivity] = useState([]);
  const { modules } = useSelector((state) => state.subjects);

  useEffect(() => {
    const getAct = modules.find(
      (m) => m.activityType === title && type === m.type
    );
    setActivity((prev) => ({ ...prev, ...getAct }));
  }, [title, modules]);

  let resultClass = "",
    resultText = "😊";

  // if (result === GAME_RESULT.WON) {
  //   resultClass = "success";
  //   resultText = "Your guess is correct.";
  // } else if (result === GAME_RESULT.LOST) {
  //   resultClass = "error";
  //   resultText = "Your guess is wrong.";
  // } else {
  //   return null;
  // }

  if (result === GAME_RESULT.WON) {
    resultClass = "success";
    resultText = activity?.subjectName?.toUpperCase().includes("ARALING")
      ? "Tama ang iyong sagot"
      : "Your guess is correct";
  } else if (result === GAME_RESULT.LOST) {
    resultClass = "error";
    resultText = activity?.subjectName?.toUpperCase().includes("ARALING")
      ? "Mali ang iyong sagot"
      : "Your guess is wrong";
  } else {
    return null;
  }

  return (
    // <div className={`neumorph disabled result ${resultClass}`}>
    <div className="p-10">
      <div
        className="border border-white border-8 rounded-lg"
        // style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)" }}
      >
        <div
          className={`bg-[#4CDAFE]   text-lg  p-5 border-b-8   ${
            resultClass === "success"
              ? "bg-green-200 text-green-500 border-green-500 rounded-lg"
              : "bg-red-200 text-red-500  border-red-500 rounded-lg"
          }`}
        >
          <p className="result-text">{resultText}</p>
        </div>
      </div>
    </div>
  );
}
