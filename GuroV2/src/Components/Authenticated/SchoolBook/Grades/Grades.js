import React, { useState } from "react";
import blackboard_grades from "../../../../assets/img/blackboard_grades.png";
import leftImg from "../../../../assets/img/buttons/leftBtn.png";
import rightImg from "../../../../assets/img/buttons/rightBtn.png";
import grade1 from "../../../../assets/img/grades/1.png";
import grade10 from "../../../../assets/img/grades/10.png";
import grade2 from "../../../../assets/img/grades/2.png";
import grade3 from "../../../../assets/img/grades/3.png";
import grade4 from "../../../../assets/img/grades/4.png";
import grade5 from "../../../../assets/img/grades/5.png";
import grade6 from "../../../../assets/img/grades/6.png";
import grade7 from "../../../../assets/img/grades/7.png";
import grade8 from "../../../../assets/img/grades/8.png";
import grade9 from "../../../../assets/img/grades/9.png";
import "../../../../ui/FlipCard.css";
import GradeItem from "./GradeItem";

const itemsPerPage = 6;

const Grades = () => {
  const grades = [
    {
      id: 1,
      name: "Grade 1",
      image: grade1,
    },
    {
      id: 2,
      name: "Grade 2",
      image: grade2,
    },
    {
      id: 3,
      name: "Grade 3",
      image: grade3,
    },
    {
      id: 4,
      name: "Grade 4",
      image: grade4,
    },
    {
      id: 5,
      name: "Grade 5",
      image: grade5,
    },
    {
      id: 6,
      name: "Grade 6",
      image: grade6,
    },
    {
      id: 7,
      name: "Grade 7",
      image: grade7,
    },
    {
      id: 8,
      name: "Grade 8",
      image: grade8,
    },
    {
      id: 9,
      name: "Grade 9",
      image: grade9,
    },
    {
      id: 10,
      name: "Grade 10",
      image: grade10,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = grades.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the range of items to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = grades.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mb-20">
      <div className="hidden sm:block pl-2 pr-2 lg:pl-36 lg:pr-36">
        <div
          className="p-20 text-green-800 "
          style={{
            backgroundImage: `url(${blackboard_grades})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="grid grid-cols-3 my-2">
            {currentItems.map((grade) => (
              <GradeItem key={grade.id} grade={grade} />
            ))}
          </div>
        </div>
      </div>
      <div className="block sm:hidden">
        <div className="text-green-800 p-5 my-2">
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
            {currentItems.map((grade) => (
              <GradeItem key={grade.id} grade={grade} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-5">
        <button
          className="pagination-button mr-2 transition duration-300 ease-in-out transform hover:-translate-x-1"
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          <img alt="bg" src={leftImg} className="w-16" />
        </button>
        <div className="p-10"></div>
        <button
          className="pagination-button transition duration-300 ease-in-out transform hover:translate-x-1"
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          <img alt="bg" src={rightImg} className="w-16" />
        </button>
      </div>
    </div>
  );
};

export default Grades;
