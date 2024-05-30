import { memo, useCallback, useEffect, useState } from "react";
import KeyboardButton from "../keyboard-button";
import "./style.css";

const Keyboard = memo(({ keys, onKeyClick, disabledKeys }) => {
  const specialCharacters = ` .,'"!:;_-=></!@#$%^&*()`.split("");
  const handleKeyOnClick = useCallback(
    (event, i) => {
      onKeyClick(event.target.value.toUpperCase(), i);
    },
    [onKeyClick]
  );

  return (
    <div className="keyboard">
      <div className="letters">
        {keys.map((k, i) => {
          return (
            specialCharacters.includes(k) ? null :
              <KeyboardButton
                key={i}
                value={k}
                specialCharacters={specialCharacters}
                disabled={disabledKeys?.includes(i)}
                onClick={(e) => handleKeyOnClick(e, i)}
              />
          )
        })}
      </div>
    </div>
  );
});

export default Keyboard;