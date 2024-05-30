import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "../../../assets/icons/Icons";
import back_btn from "../../../assets/img/buttons/back_btn.png";
import { callLibraryVideosPerGrade } from "../../../store/slices/subjectSlice";
import VideoItem from "./VideoItem";

const grades = [
  {
    id: null, // Use 0 to represent "Show All"
    name: "Show All",
  },
  {
    id: 1,
    name: "Grade 1",
  },
  {
    id: 2,
    name: "Grade 2",
  },
  {
    id: 3,
    name: "Grade 3",
  },
  {
    id: 4,
    name: "Grade 4",
  },
  {
    id: 5,
    name: "Grade 5",
  },
  {
    id: 6,
    name: "Grade 6",
  },
  {
    id: 7,
    name: "Grade 7",
  },
  {
    id: 8,
    name: "Grade 8",
  },
  {
    id: 9,
    name: "Grade 9",
  },
  {
    id: 10,
    name: "Grade 10",
  },
];

const Videos = ({ setSelectedVideo }) => {
  const { libraryVideosPerGrade } = useSelector((state) => state.subjects);
  const isLoading = useSelector(
    (state) => state.subjects.loadingLibraryVideosPerGrade
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeLvl, setGradeLvl] = useState(null); // Initialize with the value from the URL parameter

  const [videosPerPage] = useState(8);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch, gradeLvl]);

  const filteredVideos = libraryVideosPerGrade.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = filteredVideos.slice(
    indexOfFirstVideo,
    indexOfLastVideo
  );

  useEffect(() => {
    // Dispatch the action to load all videos when the component mounts
    dispatch(callLibraryVideosPerGrade({ gradeLevel: null }));
  }, [dispatch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset the current page when performing a new search
  };

  const handleGradeSelect = (gradeId) => {
    setGradeLvl(gradeId === null ? null : String(gradeId));
    dispatch(callLibraryVideosPerGrade({ gradeLevel: gradeId }));
  };

  const menu = (
    <Menu>
      {grades.map((grade) => (
        <Menu.Item key={grade.id} onClick={() => handleGradeSelect(grade.id)}>
          <div className={gradeLvl === grade.id ? "active" : ""}>
            {grade.name}
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="">
      {/* Back Button and Label */}
      <div className="flex flex-wrap justify-between ml-10 mr-10">
        <div className="flex flex-wrap">
          <div className="text-3xl font-bold text-[#363636] tracking-tight">
            <button onClick={() => navigate(-1)}>
              <img alt="back" src={back_btn} className="sm:h-16 h-10 mx-auto" />
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <span className="flex text-5xl font-bold text-[#363636] tracking-tight ">
            Educational Videos
          </span>
        </div>
        <div className="w-48"></div>
      </div>
      {/* Search */}
      <div className="flex items-center justify-center my-10 ml-10 mr-10">
        <div className="search-br relative flex items-center w-full h-16 rounded-lg focus-within:shadow-lg overflow-hidden">
          <div className="grid ml-4 place-items-center h-full w-12 text-gray-400">
            <SearchIcon />
          </div>
          <input
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            id="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      {/* Categories */}
      <div className="ml-10">
        <Dropdown overlay={menu} trigger={["click"]}>
          <button
            className="dropdown-br p-5 rounded-lg ant-dropdown-link"
            onClick={(e) => e.preventDefault()}
          >
            {gradeLvl === null ? "Select A Grade" : `Grade ${gradeLvl}`}{" "}
            <DownOutlined />
          </button>
        </Dropdown>
      </div>
      {/* Items */}

      <div>
        {isLoading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <div className="loader-container">
              <div className="loader-dot"></div>
              <div className="loader-dot"></div>
              <div className="loader-dot"></div>
            </div>
          </div>
        ) : (
          <div>
            {filteredVideos.length === 0 ? (
              <div className="mx-auto w-full sm:w-[30vh] xl:w-[95vh] lg:w-[50vh] md:w-[40vh] justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
                <p className="flex items-center justify-center text-xl text-gray-500">
                  No search results found.
                </p>
              </div>
            ) : (
              <div className="ml-10 mr-10">
                <div className="flex flex-wrap justify-items-center justify-center gap-y-14 gap-x-14 mt-10 mb-5">
                  {currentVideos.map((video, idx) => (
                    <VideoItem
                      key={idx}
                      video={video}
                      setSelectedVideo={setSelectedVideo}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex mb-24 my-10 justify-center">
        <Pagination
          current={currentPage}
          pageSize={videosPerPage}
          total={filteredVideos.length}
          onChange={handlePageChange}
          showSizeChanger={false} // This will hide the page size selector
        />
      </div>
    </div>
  );
};

export default Videos;
