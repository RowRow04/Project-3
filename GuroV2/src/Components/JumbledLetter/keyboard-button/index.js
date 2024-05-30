import { memo } from "react";
import { motion } from "framer-motion";
import "./style.css";
const KeyboardButton = memo(({ text, value, disabled, onClick }) => {
  const label = text || value;
  return (
    // <motion.button
    //   whileHover={{ scale: 1.1 }}
    //   whileTap={{ scale: 0.9 }}
    //   // className={`keyboard-button neumorph ${disabled && "invert disabled"}`}
    //   className={`bg-amber-300 text-4xl p-5 rounded-lg md:w-28 border-b-8 border-amber-500 rounded-lg ${
    //     disabled && "invert disabled"
    //   }`}
    //   onClick={onClick}
    //   disabled={disabled}
    // ></motion.button>
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      // className={`keyboard-button neumorph ${disabled && "invert disabled"}`}
      className={`keyboard-button bg-amber-300 text-xl md:p-10 m-2 flex items-center justify-center sm:text-4xl h-12 w-12 sm:w-20 sm:h-20  rounded-lg  border-b-8 border-amber-500 rounded-lg ${
        disabled && "invert disabled"
      }`}
      value={value}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </motion.button>
  );
});

export default KeyboardButton;
