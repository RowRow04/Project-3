import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Pagination } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "../../../assets/icons/Icons";
import back_btn from "../../../assets/img/buttons/back_btn.png";
import { callLibraryLessonsPerGrade } from "../../../store/slices/subjectSlice";
import PDFItem from "./PDFs/PDFItem";

const grades = [
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

const LessonsPage = () => {
  const { libraryLessonsPerGrade } = useSelector((state) => state.subjects);
  const isLoading = useSelector(
    (state) => state.subjects.loadingLibraryLessonsPerGrade
  );
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeLvl, setGradeLvl] = useState(null);
  const [lessonsPerPage] = useState(8);
  const [uploadedPdfs, setUploadedPdfs] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(callLibraryLessonsPerGrade({ gradeLevel: gradeLvl }));
  }, [gradeLvl, dispatch]);

  const filteredLessons = libraryLessonsPerGrade.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastLesson = currentPage * lessonsPerPage;
  const indexOfFirstLesson = indexOfLastLesson - lessonsPerPage;
  const currentLessons = filteredLessons.slice(
    indexOfFirstLesson,
    indexOfLastLesson
  );

  const handleGradeSelect = (gradeId) => {
    setGradeLvl(gradeId === null ? null : String(gradeId));
    dispatch(callLibraryLessonsPerGrade({ gradeLevel: gradeId }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset the current page when performing a new search
  };

  const handleUpload = ({ file }) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newPdf = {
        title: file.name,
        url: e.target.result,
        fileName: file.name,
      };
      setUploadedPdfs((prevPdfs) => [...prevPdfs, newPdf]);
    };
    reader.readAsDataURL(file);
  };

  const menu = (
    <Menu>
      <Menu.Item key="show-all" onClick={() => handleGradeSelect(null)}>
        <button className={!gradeLvl ? "active" : ""}>Show All</button>
      </Menu.Item>
      {grades.map((grade) => (
        <Menu.Item key={grade.id} onClick={() => handleGradeSelect(grade.id)}>
          <button className={gradeLvl === grade.id ? "active" : ""}>
            {grade.name}
          </button>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="sm:my-44 my-32 w-full  xl:pl-44 xl:pr-44 pl-0 pr-0">
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
          <span className="flex text-5xl font-bold text-[#363636] tracking-tight">
            {!!selectedPdf ? selectedPdf.fileName : "Stories"}
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
      {/* Upload PDF */}
      <div className="ml-10 my-10">
        <Upload customRequest={handleUpload} showUploadList={false}>
          <Button icon={<UploadOutlined />}>Upload PDF</Button>
        </Upload>
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
            {filteredLessons.length === 0 && uploadedPdfs.length === 0 ? (
              <div className="">
                <p className="flex items-center justify-center h-[50vh] text-xl text-gray-500">
                  No search results found.
                </p>
              </div>
            ) : (
              <div className="ml-10 mr-10">
                <div className="flex flex-wrap justify-items-center justify-center gap-y-14 gap-x-14 mt-10 mb-5">
                  {currentLessons.map((pdf, idx) => (
                    <PDFItem
                      key={idx}
                      pdf={pdf}
                      setSelectedPdf={setSelectedPdf}
                    ></PDFItem>
                  ))}
                  {uploadedPdfs.map((pdf, idx) => (
                    <PDFItem
                      key={idx}
                      pdf={pdf}
                      setSelectedPdf={setSelectedPdf}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Pagination */}
      <div className="flex mb-24 my-20 justify-center">
        <Pagination
          current={currentPage}
          pageSize={lessonsPerPage}
          total={filteredLessons.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default LessonsPage;
