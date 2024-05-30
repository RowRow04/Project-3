import React from "react";
import ItemCard from "../../../../ui/ItemCard";
import { useNavigate } from "react-router-dom";

const GradeItem = ({ grade }) => {
  const navigate = useNavigate();

  const setGradeHandler = () => {
    navigate(`/subjects/${grade.id}`, {
      state: {
        gradeLevel: grade.id,
        topicBread: [
          {
            label: "Grade: " + grade.id,
            link: `/subjects/${grade.id}`,
          },
        ],
      },
    });

    localStorage.setItem("gradeLevel", grade.id);
  };

  return (
    <div className="grade-item p-2">
      <ItemCard item={grade} onClick={setGradeHandler} />
    </div>
  );
};

export default GradeItem;
