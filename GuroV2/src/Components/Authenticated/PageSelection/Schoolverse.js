import React from "react";
import { useNavigate } from "react-router-dom";
import asset1 from "../../../assets/img/schoolverse/asset1.png";
import asset2 from "../../../assets/img/schoolverse/asset2.png";
import asset3 from "../../../assets/img/schoolverse/asset3.png";
import schoolverse_bg from "../../../assets/img/schoolverse/schoolverse_bg1.png";
import schoolverse_bg_mobile from "../../../assets/img/schoolverse/schoolverse_bg_mobile.png";
import schoolverse_logo from "../../../assets/img/schoolverse/schoolverse_logo.png";
import "../../../ui/Schoolverse.css";

const Schoolverse = () => {
  const apiUrl = "https://demo.schoolbook.ph:3002/uploads/apk/";
  const fileName = "schoolverse.apk";
  const navigate = useNavigate();

  return (
    <div className="bg-[#D2FAFF] min-h-screen w-full">
      <div className="hidden sm:block">
        <img
          alt="bg"
          src={schoolverse_bg}
          // data-aos="zoom"
          className="z-0 w-full -my-10"
        />
      </div>

      <div className="box">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="block sm:hidden">
        <img
          alt="bg"
          src={schoolverse_bg_mobile}
          className="z-0 my-44 w-full m-0"
        />
      </div>

      {/* Chalk board */}
      <div className="animate-flip-up flex flex-col -my-80 sm:-my-20 mb-20 pl-2 md:pl-10 lg:pl-48 pr-2 md:pr-10 lg:pr-48 items-center relative duration-150 cursor-pointer ">
        <div className="w-80 flex-row justify-between items-center absolute -top-12 z-10 hidden sm:block">
          <img alt="schoolverseLogo" src={schoolverse_logo} className="z-20 " />
        </div>
        <div className="flex justify-center mb-10">
          <div className="chalkboard  text-white sm:pl-20 sm:pr-20 pl-5 pr-5 flex flex-col items-center">
            <div>
              <h1 className="sm:text-4xl text-base font-bold text-center sm:text-left sm:py-32 sm:pb-0 py-16 pb-0">
                The Next Adventure Awaits
              </h1>
              <br />
              <ol className="my-5">
                <li>
                  Focuses on learners' engagement and personalization with
                  real-life situation activities in an open-world that can be
                  used both inside and outside of the classroom. It gives
                  additional context around the learning materials and acts a
                  subconscious memory technique that can associate children in
                  each step of their learning journey with similar stage in the
                  game.
                </li>
                <br />
                <li>
                  It is an Open-world self-interaction online learning tool in
                  Araling Panlipunan, English, Mathematics, Physical Education
                  and Science subjects for Primary up to Junior High School
                  learners, developed by Dynamic Global Soft, Inc. It aims to
                  improve student’s multiple skills by having a form of fun,
                  enjoyment, pleasure, creativity that teaches goals, rules,
                  adaption, interaction, and problem-solving skills.
                </li>
              </ol>
              <br />
            </div>
          </div>
        </div>
      </div>
      {/* Chalk board */}
      <div className="hidden sm:block h-32 w-full bg-[#D2FAFF]"></div>
      <img
        className="sm:block hidden max-w-[300px] xl:w-[300px] lg:w-[200px] md:w-[100px] sm:w-[100px]"
        alt="bg"
        src={asset3}
        style={{
          position: "absolute",
          left: "0%",
          top: "37%",
          zIndex: "20",
        }}
        data-aos="fade-right"
      ></img>
      <div className="relative h-32 w-full sm:block hidden ...">
        <div className="absolute bottom-0 left-0 h-16 w-16 ...">
          <img
            className="max-w-[500px] xl:w-[400px] lg:w-[300px] md:w-[300px] sm:w-[200px]"
            alt="bg"
            src={asset1}
            style={{
              position: "absolute",
              left: "0%",
              bottom: "0%",
              zIndex: "20",
            }}
            data-aos="fade-right"
          ></img>
        </div>
        <div className="absolute bottom-0 right-0 h-16 w-16 ...">
          <img
            className="max-w-[350px] xl:w-[350px] lg:w-[200px] md:w-[100px] sm:w-[200px]"
            alt="bg"
            src={asset2}
            style={{
              position: "absolute",
              right: "0%",
              bottom: "0%",
              zIndex: "20",
            }}
            data-aos="fade-left"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Schoolverse;
