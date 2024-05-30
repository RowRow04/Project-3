import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import speech from "../../../../assets/img/buttons/speech.png";

const TextSpeech = ({ currentSlide, index }) => {
  const { title, type } = useParams(); // ? OTB ex.
  const { modules } = useSelector((state) => state.subjects);
  const [activity, setActivity] = useState([]);
  const [speechSynthesisSupported, setSpeechSynthesisSupported] =
    useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [utterance, setUtterance] = useState(null);

  const handleSpeechEnd = () => {
    setSpeaking(false);
    speechSynthesis.cancel();
  };

  useEffect(() => {
    const getAct = modules.find(
      (m) => m.activityType === title && type === m.type
    );
    setActivity((prev) => ({ ...prev, ...getAct }));

    // Check if speech synthesis is supported in the browser
    setSpeechSynthesisSupported(!!window.speechSynthesis);
  }, [title, type, modules, utterance]);

  const readDirections = () => {
    if (!speechSynthesisSupported) {
      return;
    }

    if (speaking) {
      // If already speaking, stop the speech
      speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const directions =
      activity.directions?.split(";;;")[1] ||
      activity?.activity?.[currentSlide]?.question ||
      activity?.activity?.questions[currentSlide]?.question;

    if (!directions) {
      return;
    }

    const processedDirections = directions.replace(/_+/g, "blank"); // Replace consecutive underscores with "blank"

    if (typeof index !== "undefined") {
      const choices =
        activity?.activity?.[currentSlide]?.choices[index]?.description ||
        activity?.activity?.choices[index]?.description;

      if (!choices) {
        return;
      }

      const inputText = choices; // Replace this with your input text

      let processedChoices;

      if (inputText === "Zz" || inputText === " Zz" || inputText === "Zz ") {
        processedChoices = "Zey";
      } else {
        // Remove leading spaces
        const trimmedText = inputText.trim();

        processedChoices =
          trimmedText[0].match(/[a-zA-Z0-9]/) && trimmedText[0] !== " "
            ? trimmedText.length === 2 ||
              (trimmedText.length === 3 &&
                trimmedText[0].toUpperCase() === trimmedText[1].toUpperCase())
              ? trimmedText[0] // Only the first letter if the choices consist of only two characters that are the same
              : trimmedText
            : trimmedText;
      }

      const newUtterance = new SpeechSynthesisUtterance(processedChoices);
      newUtterance.pitch = 1.2;

      // Find the voice by name
      const desiredVoiceName =
        "Microsoft Zira Desktop - English (United States)" ||
        "Microsoft Zira - English (United States)" ||
        "Microsoft Zira - English (United States)";

      const availableVoices = window.speechSynthesis.getVoices();
      const selectedVoice = availableVoices.find(
        (voice) => voice.name === desiredVoiceName
      );

      if (selectedVoice) {
        newUtterance.voice = selectedVoice;
      } else {
        newUtterance.voice = availableVoices[2];
      }

      newUtterance.lang = activity?.subjectName
        ?.toUpperCase()
        .includes("ARALING")
        ? "fil-PH"
        : "en-US";

      // Rest of your code
      setUtterance(newUtterance);

      newUtterance.addEventListener("end", handleSpeechEnd);

      speechSynthesis.speak(newUtterance);
      setSpeaking(true);
    } else {
      const newUtterance = new SpeechSynthesisUtterance(processedDirections);
      newUtterance.pitch = 1.2;

      const desiredVoiceName =
        "Microsoft Zira Desktop - English (United States)" ||
        "Microsoft Zira - English (United States)" ||
        "Microsoft Zira - English (United States)";

      const availableVoices = window.speechSynthesis.getVoices();
      const selectedVoice = availableVoices.find(
        (voice) => voice.name === desiredVoiceName
      );

      if (selectedVoice) {
        newUtterance.voice = selectedVoice;
      } else {
        newUtterance.voice = availableVoices[2];
      }

      // Set the language
      newUtterance.lang = activity?.subjectName
        ?.toUpperCase()
        .includes("ARALING")
        ? "fil-PH"
        : "en-US";

      // Rest of your code
      setUtterance(newUtterance);

      newUtterance.addEventListener("end", handleSpeechEnd);

      speechSynthesis.speak(newUtterance);
      setSpeaking(true);
    }
  };

  return (
    <div>
      <div>
        {activity?.subjectName?.toUpperCase().includes("ARALING") ? null : ( // Replace null with the component or content you want to display if the condition is true
          <button className="" onClick={readDirections}>
            <img alt="wood" src={speech} className="w-10" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TextSpeech;
