import { Outlet } from "react-router-dom";
import gradeLvl_container from "../../../assets/img/gradeLvl_container.png";
import schoolbook_bg from "../../../assets/img/schoolbook_bg.png";
import "../../../ui/SchoolBookPage.css";
import Grades from "./Grades/Grades";

const SchoolBookPage = () => {
  return (
    <div className="overflow-hidden min-h-screen">
      <div id="Schoolbook">
        <img
          alt="bg"
          src={schoolbook_bg}
          className="w-full -mb-28 sm:mb-0"
          data-aos="zoom"
        ></img>
        <div className="flex justify-center">
          <div className="hidden sm:block z-20">
            <div className="flex justify-center my-0 -mb-20">
              <img alt="bg" src={gradeLvl_container} className="w-72"></img>
            </div>
          </div>
          <div className="block sm:hidden  justify-center my-32 mb-0 z-20">
            <img alt="bg" src={gradeLvl_container} className="w-40"></img>
          </div>
        </div>
        <Grades />
        <Outlet />
      </div>
    </div>
  );
};
export default SchoolBookPage;
