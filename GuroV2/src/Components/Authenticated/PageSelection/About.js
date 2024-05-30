import React from "react";
import { useNavigate } from "react-router-dom";
import about_img from "../../../assets/img/about_img.png";
import back from "../../../assets/img/buttons/back_btn.png";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden my-32">
      <div className="flex lg:flex-row flex-col-reverse w-[90%] mx-auto lg:items-center text-gray-700 gap-10">
        <div className="flex flex-col">
          <div className="text-3xl pb-5 font-bold text-[#363636] tracking-tight">
            <button onClick={() => navigate(-1)}>
              <img src={back} alt="backBtn" className="h-10" />
            </button>
          </div>
          <h1
            className="text-5xl  text-[#363636] text-left mb-8"
            data-aos="zoom"
            data-aos-delay="100"
          >
            What Is
            <br />
            <span className="text-6xl text-[#33689C]">Guro Platform?</span>
          </h1>
          <div className="" data-aos="fade-up" data-aos-delay="100">
            <div className="font-light text-[#363636] text-left ">
              <p>
                The <span className="text-[#33689C]">“GURO Platform”</span> is a
                portable mobile device, preloaded with educational resources
                such as learning modules and videos. Designed to work seamlessly
                offline, it is ideal for reaching and serving areas that do not
                have access to internet or data
              </p>
              <br />
              <p>
                With versatility built into its design, it can work as a
                stand-alone device, connected to screens, or accessed via smart
                phone and tablets. This makes it highly accessible and easy to
                use without the need for technical expertise. The educational
                resources available on the device covers a wide range of topics,
                from academic subjects to practical skills and personal
                development. Learners benefit from these resources at any time
                and from any location, making it an excellent tool for both
                formal and informal learning. Redefining access to education,
                the platform enables learning outside the confines of a school
                building. With the Guro Platform, turn any room into a
                classroom.
              </p>
            </div>
          </div>
        </div>
        <img
          src={about_img}
          className="flex lg:flex-row flex-col-reverse w-[90%] mx-auto lg:items-center max-w-[900px] lg:w-[850px] md:w-[800px]"
          alt=""
          data-aos="fade-left"
          data-aos-delay="100"
        />
      </div>
    </div>
  );
};

export default About;
