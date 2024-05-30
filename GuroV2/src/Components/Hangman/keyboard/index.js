import { memo, useCallback, useEffect, useState } from "react";
import KeyboardButton from "../keyboard-button";
import "./style.css";

const keys = "qwertyuiopasdfghjklzxcvbnm".split("");
const keysmath = "1234567890qwertyuiopasdfghjklzxcvbnm".split("");
const specialCharacters =
  ",.'\"/{}[]()+-=&⁻⁰¹²³⁴⁵⁶⁷⁸⁹ⁿ∿≄≆≈∆∞√°<>≤≥¼½⅓⅔⅕⅗⅖⅘⅙⅚∪≌ñ".split("");

const Keyboard = memo(({ onKeyClick, disabledKeys, subject }) => {
  const [displayedKeys, setDisplayedKeys] = useState(keys);
  const [currentTab, setCurrentTab] = useState("normal");

  useEffect(() => {
    if (subject?.toUpperCase()?.includes("MATH")) {
      setDisplayedKeys([...keysmath, ...specialCharacters]);
    } else {
      setDisplayedKeys(keys);
      setCurrentTab("normal"); // Reset to normal tab when subject is not math
    }
  }, [subject]);

  const handleKeyOnClick = useCallback(
    (event) => {
      onKeyClick(event.target.value.toUpperCase());
    },
    [onKeyClick]
  );

  const handleTabChange = useCallback((tab) => {
    setCurrentTab(tab);
  }, []);

  const handleKeyOnPress = useCallback(
    (event) => {
      event.preventDefault();
      const code = event.keyCode || event.which;
      const key = event.key;
      const isNumeric = !isNaN(parseInt(key));
      const isSpecialCharacter = specialCharacters.includes(key);

      if (
        (code >= 65 && code <= 90) ||
        code === 32 ||
        code === 189 ||
        code === 222 ||
        isNumeric ||
        isSpecialCharacter
      ) {
        onKeyClick(event.key.toUpperCase());
      }
    },
    [onKeyClick]
  );

  useEffect(() => {
    document.addEventListener("keyup", handleKeyOnPress);
    return () => document.removeEventListener("keyup", handleKeyOnPress);
  }, [handleKeyOnPress]);

  return (
    <div className="keyboard">
      <div className="tabs pl-5 mb-5 flex">
        <div
          className={`p-2 rounded-l-md border-b-8 ${
            currentTab === "normal"
              ? "bg-blue-500 border-blue-800"
              : "bg-blue-200 border-blue-400"
          }`}
        >
          <button
            className={currentTab === "normal" ? "active" : ""}
            onClick={() => handleTabChange("normal")}
          >
            <span
              className={`${
                currentTab === "normal" ? "text-white" : "text-blue-800"
              }`}
            >
              Normal
            </span>
          </button>
        </div>
        <div
          className={`p-2 rounded-r-md border-b-8 ${
            currentTab === "special"
              ? "bg-blue-500 border-blue-800"
              : "bg-blue-200 border-blue-400"
          }`}
        >
          <button
            className={currentTab === "special" ? "active" : ""}
            onClick={() => handleTabChange("special")}
          >
            <span
              className={`${
                currentTab === "special" ? "text-white" : "text-blue-800"
              }`}
            >
              Special
            </span>
          </button>
        </div>
      </div>

      <div className="letters">
        {currentTab === "normal"
          ? displayedKeys
              .filter((key) => !specialCharacters.includes(key))
              .map((key) => (
                <KeyboardButton
                  key={key.toUpperCase()}
                  value={key.toUpperCase()}
                  disabled={disabledKeys.includes(key.toUpperCase())}
                  onClick={handleKeyOnClick}
                />
              ))
          : specialCharacters.map((key) => (
              <KeyboardButton
                key={key}
                value={key}
                disabled={disabledKeys.includes(key)}
                onClick={handleKeyOnClick}
              />
            ))}
      </div>
    </div>
  );
});

export default Keyboard;
