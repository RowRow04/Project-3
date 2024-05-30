import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import back_btn from "../../../../assets/img/buttons/back_btn.png";
import q1 from "../../../../assets/img/boards/q1.png";
import q2 from "../../../../assets/img/boards/q2.png";
import q3 from "../../../../assets/img/boards/q3.png";
import q4 from "../../../../assets/img/boards/q4.png";
import quarter_lbl from "../../../../assets/img/quarter_lbl.png";
import quarter_lbl_ap from "../../../../assets/img/quarter_lbl_ap.png";
import { callSubjectTopic } from "../../../../store/slices/subjectSlice";
import BreadCrumbComponent from "../BreadCrumbComponent";

const Quarters = () => {
  const quarters = [1, 2, 3, 4];
  const img = [q1, q2, q3, q4];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { subjectId } = useParams();
  const subjectName = location.state?.subjectName;

  const OnQuaterClick = (quarter) => {
    dispatch(callSubjectTopic({ subjectId, quarter }));

    navigate(`/topics`, {
      state: {
        subjectId,
        quarter,
        subjectName,
        topicBread: [
          ...location?.state?.topicBread,
          {
            label: "Quarter: " + quarter,
            link: `/topics`,
          },
        ],
      },
    });
  };

  const handleBack = () => {
    const breadCount = location?.state?.topicBread?.length || 0;
    navigate(`/subjects/${localStorage.getItem("gradeLevel")}`, {
      state: {
        subjectName,
        topicBread: location?.state?.topicBread?.splice(0, breadCount - 1),
      },
    });
  };

  return (
    <div className=" w-full h-full">
      <div className="flex flex-wrap my-28 sm:my-32 xl:px-10 lg:px-20 md:px-10 sm:px-10 xs:px-2 text-start mb-14">
        <div>
          <div className="flex flex-wrap items-center text-3xl font-bold text-[#363636] tracking-tight">
            <button onClick={handleBack}>
              <img
                alt="back"
                src={back_btn}
                className="sm:h-16 mb-2 h-10 mx-auto" // Add 'mx-auto' class to center the image horizontally
              />
            </button>
            <div className="ml-5">
              <BreadCrumbComponent
                bread={location?.state?.topicBread}
                params={location?.state}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="block sm:hidden  items-center -my-8 mb-2 justify-center">
        {subjectName?.toUpperCase().includes("ARALING") ? (
          <img alt="subjects" src={quarter_lbl_ap} className="h-40 mx-auto" />
        ) : (
          <img alt="subjects" src={quarter_lbl} className="h-40 mx-auto" />
        )}
      </div>
      <div className="hidden sm:block  items-center -my-20 mb-10 justify-center">
        {subjectName?.toUpperCase().includes("ARALING") ? (
          <img
            alt="subjects"
            src={quarter_lbl_ap}
            className="sm:h-auto h-40 mx-auto"
          />
        ) : (
          <img
            alt="subjects"
            src={quarter_lbl}
            className="sm:h-auto h-40 mx-auto"
          />
        )}
      </div>
      <div className="mx-auto my-10 flex justify-center p-2">
        <div className="animate-fade-up mx-auto xl:max-w-6xl lg:ml-44 lg:mr-44 grid grid-cols-2 ml-1 mr-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 sm:gap-10 gap-5  justify-center items-center sm:justify-items-center">
          {quarters.map((q, index) => (
            <div
              key={index}
              onClick={() => OnQuaterClick(q)}
              className="cursor-pointer hover:scale-105 duration-150"
            >
              <div className="pt-0 pb-0">
                <img
                  alt="quarters"
                  src={img[index]}
                  className="w-80 h-auto shadow-lg shadow-yellow-800"
                ></img>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quarters;
