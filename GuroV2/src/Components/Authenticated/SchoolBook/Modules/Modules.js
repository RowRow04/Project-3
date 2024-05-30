import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import activity_lbl from "../../../../assets/img/activity_lbl.png";
import activity_lbl_ap from "../../../../assets/img/activity_lbl_ap.png";
import back_btn from "../../../../assets/img/buttons/back_btn.png";
import ItemBoard from "../../../../ui/ItemBoard";
import BreadCrumbComponent from "../BreadCrumbComponent";

const Modules = () => {
  const { modules } = useSelector((state) => state.subjects);
  const isLoading = useSelector((state) => state.subjects.loadingModules);
  const { subjectId, topicId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const quarter = location.state?.quarter;
  const subjectName = location.state?.subjectName;

  const moduleOnClick = (module) => {
    navigate(
      `/activity/${module.activityType}/${module.type}/${module.moduleId}`,
      {
        state: {
          subjectId,
          subjectName,
          topicId,
          quarter,
          topicBread: location?.state?.topicBread,
        },
      }
    );
  };

  const handleBack = () => {
    const breadCount = location?.state?.topicBread?.length || 0;
    navigate(`/levels/${subjectId}/${topicId}`, {
      state: {
        subjectId,
        subjectName,
        quarter,
        topicBread: location?.state?.topicBread?.splice(0, breadCount - 1),
      },
    });
  };

  if (!isLoading && modules.length === 0) {
    return (
      <div className="my-10 w-full h-full overflow-hidden">
        <div className="flex flex-wrap my-28 sm:my-32  xl:px-10 lg:px-20 md:px-10 sm:px-10 xs:px-10 text-start mb-10">
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
        <div className="block sm:hidden  items-center -my-8 mb-10 justify-center">
          {subjectName?.toUpperCase().includes("ARALING") ? (
            <img
              alt="subjects"
              src={activity_lbl_ap}
              className="h-40 mx-auto"
            />
          ) : (
            <img alt="subjects" src={activity_lbl} className="h-40 mx-auto" />
          )}
        </div>
        <div className="hidden sm:block  items-center -my-20 mb-10 justify-center">
          {subjectName?.toUpperCase().includes("ARALING") ? (
            <img
              alt="subjects"
              src={activity_lbl_ap}
              className="sm:h-auto h-40 mx-auto"
            />
          ) : (
            <img
              alt="subjects"
              src={activity_lbl}
              className="sm:h-auto h-40 mx-auto"
            />
          )}
        </div>
        <div className="flex justify-center my-40">No modules available</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-hidden">
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
      <div className="block sm:hidden  items-center -my-8 mb-10 justify-center">
        {subjectName?.toUpperCase().includes("ARALING") ? (
          <img alt="subjects" src={activity_lbl_ap} className="h-40 mx-auto" />
        ) : (
          <img alt="subjects" src={activity_lbl} className="h-40 mx-auto" />
        )}
      </div>
      <div className="hidden sm:block  items-center -my-20 mb-10 justify-center">
        {subjectName?.toUpperCase().includes("ARALING") ? (
          <img
            alt="subjects"
            src={activity_lbl_ap}
            className="sm:h-auto h-40 mx-auto"
          />
        ) : (
          <img
            alt="subjects"
            src={activity_lbl}
            className="sm:h-auto h-40 mx-auto"
          />
        )}
      </div>
      {isLoading ? (
        <div className="">
          <div className="flex justify-center my-40">
            <div className="loader-container">
              <div className="loader-dot"></div>
              <div className="loader-dot"></div>
              <div className="loader-dot"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mb-10 p-2">
          <div className="animate-fade-up mx-auto xl:max-w-6xl lg:ml-44 lg:mr-44 grid grid-cols-2 ml-1 mr-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 sm:gap-10 gap-5  justify-center items-center sm:justify-items-center">
            {modules.map((module) => {
              return (
                <div
                  className=""
                  key={module.moduleId}
                  onClick={() => moduleOnClick(module)}
                >
                  <div className="">
                    <span className="">
                      <ItemBoard item={module}></ItemBoard>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Modules;
