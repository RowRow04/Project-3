import { useState } from "react";
import { Link } from "react-router-dom";
import explore_btn from "../../../assets/img/buttons/explore_btn.png";
import lessonImg from "../../../assets/img/selections/pdfViewer_page.png";
import schoolbookImg from "../../../assets/img/selections/schoolbook_page.png";
import videosImg from "../../../assets/img/selections/videos_page.png";
import bibleImg from "../../../assets/img/selections/bible_page.png";
import wikiImg from "../../../assets/img/selections/wiki_page.png";
import arrow from "../../../assets/img/arrow.png";

const items = [
  {
    id: 1,
    title: "Schoolbook",
    image: schoolbookImg,
    link: "/Schoolbook",
  },
  {
    id: 2,
    title: "Stories",
    image: lessonImg,
    link: "/lessons",
  },
  {
    id: 3,
    title: "Educational Videos",
    image: videosImg,
    alt: "Videos Image",
    link: "/videos",
  },
  {
    id: 4,
    title: "Wiki",
    image: wikiImg,
    alt: "Wiki Image",
    link: "https://www.wikipedia.org/",
    // link: window.location.protocol + `//` + window.location.hostname + `:3003`,
  },
  // {
  //   id: 5,
  //   title: "Schoolverse",
  //   image: schoolverse,
  //   link: "/schoolverse",
  // },
  {
    id: 6,
    title: "Bible",
    image: bibleImg,
    link: "/bible",
  },

  {
    id: 6,
    title: "Add File",
    image: bibleImg,
    link: "/Upload",
  },
];

function searchItems(items, searchTerm) {
  return items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

const PageSelection = () => {
  const [searchTerm] = useState("");
  const filteredItems = searchItems(items, searchTerm);

  return (
    <div className="main-div w-full h-full overflow-hidden">
      <div className="my-32 mb-5 text-justify flex md:flex-row-reverse flex-col-reverse w-[90%] mx-auto md:items-center gap-10">
        <div
          className="md:block my-5 border-b-8 border-gray-300 bg-white rounded-md p-5 hidden flex-col text-gray-700 justify-between"
          data-aos="fade-left"
          data-aos-delay="100"
        >
          <p>
            The GURO Platform is a portable mobile device, preloaded with
            educational resources such as learning modules and videos. Designed
            to work seamlessly offline, it is ideal for reaching and serving
            areas that do not have access to internet or data connectivity. With
            versatility built into its design, it can work as a stand-alone
            device, connected to screens, or accessed via smart phone and
            tablets. This makes it highly accessible and easy to use without the
            need for technical expertise.
          </p>
          <div className="py-2">
            <div className="flex items-center justify-end">
              <Link to="/about" className="-mb-12 p-2 h-14">
                <img alt="bg" src={explore_btn} className="w-36 sm:w-44"></img>
              </Link>
            </div>
          </div>
        </div>
        <div className="md:hidden block">
          <p className="font-semibold text-[#454545] text-2xl text-left">
            Welcome to E-Guro Platform
          </p>
          <p className="text-sm font-light">
            Please click the box you want to redirect to
          </p>
        </div>
      </div>
      <ul className="mb-16">
        <div className=" justify-center animate-fade-up flex-wrap flex gap-2">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="scale-10 hover:scale-105 ease-in duration-200"
            >
              <Link
                to={item.link}
                href="#!"
                target={item.title === "Wiki" ? "_blank" : "_self"}
              >
                <div className="flex justify-center my-10">
                  <div className="block rounded-lg mb-10 sm:mb-20">
                    <div className="">
                      <img src={item.image} alt={item.text} />
                    </div>
                    <div className="relative shadow-lg ml-24 mr-24 p-4 max-h-16 -my-24 sm:-my-32 bg-white rounded-lg">
                      <div className="flex flex-cols justify-between transition duration-300 ease-in-out transform hover:translate-x-1">
                        <div className="flex items-center text-sm sm:text-xl text-center font-medium leading-tight text-neutral-800">
                          <h1 className="pl-2 pr-2">{item.title}</h1>
                        </div>
                        <div className="flex items-center go icon  ">
                          <img src={arrow} alt="arrow" className="w-8" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
};
export default PageSelection;
