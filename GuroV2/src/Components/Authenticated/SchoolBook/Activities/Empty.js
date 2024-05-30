import React from "react";

const Empty = ({ activity }) => {
  return (
    <div className="flex justify-center items-center my-5 sm:my-20">
      <div className="p-10 pt-0 text-center">
        {activity?.subjectName?.toUpperCase().includes("ARALING")
          ? "Pasensya na, ngunit ang aktibidad na hinihiling ay hindi pa magagamit."
          : "Apologies, but the requested activity is currently unavailable."}
      </div>
    </div>
  );
};

export default Empty;
