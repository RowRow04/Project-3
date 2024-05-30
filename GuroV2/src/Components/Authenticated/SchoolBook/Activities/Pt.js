import React, { useEffect, useState } from "react";

import { baseURL } from "../../../../constants/constants";

const Pt = ({ activity }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Load the initial state from Local Storage if available
  useEffect(() => {
    const savedIsSubmitted = localStorage.getItem("isSubmitted");
    if (savedIsSubmitted !== null) {
      setIsSubmitted(JSON.parse(savedIsSubmitted));
    }
  }, []);

  // Save the state to Local Storage whenever it changes
  useEffect(() => {
    localStorage.setItem("isSubmitted", JSON.stringify(isSubmitted));
  }, [isSubmitted]);

  return (
    <div className="p-5 md:pl-20 lg:pl-20 md:pr-20 lg:pr-20 my-5">
      <div>
        <div className="bg-white p-5 rounded-xl border-b-8 border-gray-300  w-full  shadow-lg">
          <div className="">
            {!!activity.directions && (
              <div>
                <h1 className="font-bold text-[#363636] text-lg mb-2">
                  Directions
                </h1>
                <div style={{ whiteSpace: "pre-line" }}>
                  {activity.directions}
                </div>
              </div>
            )}
            {!!activity.lecture && (
              <div>
                <h1 className="font-bold text-[#363636] text-lg mb-2 my-5">
                  Lecture
                </h1>
                <div className="" style={{ whiteSpace: "pre-line" }}>
                  {activity.lecture}
                </div>
              </div>
            )}
            {activity.image &&
              activity.image !== null &&
              activity.image !== "" && (
                <div className="flex justify-center my-5">
                  <img
                    alt="pt"
                    className="max-h-20 min-w-20"
                    src={baseURL + `/${activity.image}`}
                  />
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pt;
