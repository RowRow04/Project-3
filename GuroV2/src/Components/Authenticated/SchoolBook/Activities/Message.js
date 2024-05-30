import React, { useState } from "react";

const Message = ({ showConfirmation, isCorrect }) => {
  const [showAlert] = useState(showConfirmation);

  if (!showAlert) {
    return null; // Don't render anything if showAlert is false
  }

  const alertStyle = isCorrect ? "text-green-500" : "text-red-500";
  const message = isCorrect ? "Your answer is correct" : "Your answer is wrong";

  return (
    <div className={`flex justify-center text-xl ${alertStyle}`}>
      <p>{message}</p>
    </div>
  );
};

export default Message;
