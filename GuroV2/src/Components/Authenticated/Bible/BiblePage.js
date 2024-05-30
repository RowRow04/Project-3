import { Col, Form, Pagination, Row, Select, Switch } from "antd";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { SearchIcon } from "../../../assets/icons/Icons";
import back_btn from "../../../assets/img/buttons/back_btn.png";
import guro_bg from "../../../assets/img/score_bg.png";
import { bible } from "../../../assets/raw/Bible";
import { books } from "../../../assets/raw/books";
import "../../../index.css";

const BiblePage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [highlight, setHighlight] = useState(true);
  const [currentPageSearch, setCurrentPageSearch] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPagesSearch, setTotalPagesSearch] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [bookSelected, setBookSelected] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const selectedBook = Form.useWatch("book", form);
  const selecedChapter = Form.useWatch("chapter", form);
  const [bookVerses, setBookVerses] = useState([]);
  const onChange = (e) => {
    setSearchInput(e.target.value);
  };

  const searchVerse = debounce(onChange, 500);
  const itemsPerPage = 10;

  const handlePaginationSearchChange = (newPage) => {
    setCurrentPageSearch(newPage);
  };

  const handlePaginationChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const highlightHandler = () => {
    setHighlight(!highlight);
  };

  const HighlightedParagraph = ({ text, searchInput }) => {
    const regex = new RegExp(searchInput.replace(/[.?!()[\]]/g, "\\$&"), "gi");
    const highlightedText = text.replace(
      regex,
      (match) =>
        `${
          highlight
            ? `<span style="background-color: yellow">${match}</span>`
            : `<span>${match}</ span>`
        }`
    );
    return <p dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  useEffect(() => {
    if (searchInput !== "") {
      const versesLocation = bible?.flatMap((innerArray, outerIndex) => {
        return innerArray.flatMap((subArray, innerIndex) => {
          return subArray.reduce((matchingIndices, verse, index) => {
            if (verse.includes(searchInput)) {
              matchingIndices?.push([outerIndex, innerIndex, index, verse]);
            }
            return matchingIndices;
          }, []);
        });
      });

      const verses = versesLocation.map(
        (verse) =>
          `${verse[3]} <b>- ${books[verse[0]]} ${verse[1] + 1}:${
            verse[2] + 1
          }</b>`
      );

      if (versesLocation.length > 0) {
        const paginatedVerses = verses.slice(
          (currentPageSearch - 1) * itemsPerPage,
          currentPageSearch * itemsPerPage
        );
        setHighlight(true);
        setCurrentPageSearch(1);
        setBookVerses(paginatedVerses);
        setTotalPagesSearch(Math.ceil(versesLocation.length / itemsPerPage));
        setTotalResults(verses.length);
      } else {
        setBookVerses([]);
        setTotalPages(1);
        setTotalResults(0);
        setCurrentPageSearch(1);
        setHighlight(true);
      }
    } else {
      const verses = bible?.[bookSelected]?.[
        selecedChapter ? selecedChapter : 0
      ]?.map((verse, i) => `${i + 1}. ${verse}`);
      const paginatedVerses = verses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
      setTotalPages(+Math.ceil(verses?.length));
      setBookVerses(paginatedVerses);
      setCurrentPage(1);
    }
  }, [
    bookSelected,
    currentPage,
    currentPageSearch,
    selecedChapter,
    searchInput,
  ]);

  useEffect(() => {
    const verses = bible?.[bookSelected]?.[
      selecedChapter ? selecedChapter : 0
    ]?.map((verse, i) => `${i + 1}. ${verse}`);
    const paginatedVerses = verses.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    setTotalPages(+Math.ceil(verses?.length));
    setBookVerses(paginatedVerses);
    setCurrentPage(1);
    form.setFieldValue("chapter", 0);
  }, [currentPage, bookSelected, form, selecedChapter, selectedBook]);

  useEffect(() => {
    const verses = bible?.[bookSelected]?.[
      selecedChapter ? selecedChapter : 0
    ]?.map((verse, i) => `${i + 1}. ${verse}`);
    const paginatedVerses = verses.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    setTotalPages(+Math.ceil(verses?.length));
    setBookVerses(paginatedVerses);
    setCurrentPage(1);
  }, [bookSelected, currentPage, selecedChapter]);

  useEffect(() => {
    const versesLocation = bible?.flatMap((innerArray, outerIndex) => {
      return innerArray.flatMap((subArray, innerIndex) => {
        return subArray.reduce((matchingIndices, verse, index) => {
          if (verse.includes(searchInput)) {
            matchingIndices?.push([outerIndex, innerIndex, index, verse]);
          }
          return matchingIndices;
        }, []);
      });
    });

    const verses = versesLocation.map(
      (verse) =>
        `${verse[3]} <b>- ${books[verse[0]]} ${verse[1] + 1}:${
          verse[2] + 1
        }</b>`
    );
    const paginatedVerses = verses.slice(
      (currentPageSearch - 1) * itemsPerPage,
      currentPageSearch * itemsPerPage
    );
    setBookVerses(paginatedVerses);
  }, [searchInput, currentPageSearch]);

  useEffect(() => {
    const verses = bible?.[bookSelected]?.[
      selecedChapter ? selecedChapter : 0
    ]?.map((verse, i) => `${i + 1}. ${verse}`);
    const paginatedVerses = verses.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    setBookVerses(paginatedVerses);
  }, [bookSelected, selecedChapter, currentPage]);

  return (
    <div
      className="main-div w-full h-full overflow-hidden"
      style={{
        backgroundImage: `url(${guro_bg})`,
        backgroundSize: "cover",
      }}
    >
      <div
        className="w-full"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="p-8 pb-0 flex flex-col py-36 relative w-full items">
          <div className="w-full">
            <div className="flex flex-wrap justify-between mb-10 w-full xl:pl-44 xl:pr-44 pl-0 pr-0">
              <div className="flex flex-wrap xl:ml-10 xl:mr-10">
                <div className="text-3xl font-bold text-[#363636] tracking-tight">
                  <button onClick={() => navigate(-1)}>
                    <img
                      alt="back"
                      src={back_btn}
                      className="sm:h-16 h-10 mx-auto"
                    />
                  </button>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <span className="flex text-5xl font-bold text-[#363636] tracking-tight">
                  Bible
                </span>
              </div>
              <div className="md:block hidden w-48 ml-16"></div>
            </div>
            <div className="flex justify-center items-center">
              {/* Search Bar */}
              <div className="flex flex-row lg:w-[75%]  mb-6 w-full">
                <div className="flex items-center justify-center w-full my-5 mb-0">
                  <div className="search-br relative flex items-center w-full h-16 rounded-lg focus-within:shadow-lg overflow-hidden">
                    <div className="grid ml-4 place-items-center h-full w-12  text-gray-400">
                      <SearchIcon />
                    </div>
                    <input
                      className="peer h-full w-full outline-none text-lg text-gray-700 pr-2"
                      type="text"
                      id="search"
                      placeholder="Search"
                      onChange={searchVerse}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mb-2 my-2">
              <div className="flex items-center   lg:w-[75%] w-full">
                <div className="border-t w-20 border-gray-500"></div>
                <span className="px-4 text-gray-500">
                  <div className="flex items-center  justify-center ">
                    Select Book
                  </div>
                </span>
                <div className="border-t flex-grow border-gray-500"></div>
              </div>
            </div>
            <div className="flex justify-center  items-center w-full">
              <div className="flex flex-row mb-10 lg:w-[75%] w-full">
                <Form form={form} className="w-full">
                  <Row className={searchInput !== "" ? "hidden" : ""}>
                    <Col xs={24} md={12} lg={12} className="md:pr-2">
                      <Form.Item name="book" initialValue={0}>
                        <Select
                          className="dropdown-br relative flex items-center w-full rounded-lg focus-within:shadow-lg overflow-hidden"
                          showSearch
                          placeholder="Search to Select"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            (option?.label ?? "").includes(input)
                          }
                          onChange={setBookSelected}
                          options={books.map((book, i) => ({
                            value: i,
                            label: book,
                          }))}
                          bordered={false}
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12} lg={12} className="md:pl-2">
                      <Form.Item name="chapter" initialValue={0}>
                        <Select
                          className="dropdown-br relative flex items-center w-full rounded-lg focus-within:shadow-lg overflow-hidden"
                          showSearch
                          placeholder="Search to Select"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            (option?.label ?? "").includes(input)
                          }
                          options={bible?.[bookSelected].map((chapter, i) => ({
                            value: i,
                            label: "Chapter " + (i + 1),
                          }))}
                          bordered={false}
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <div className="w-full  bg-white border-b-8  border-gray-300 shadow-md  rounded-lg px-8 pt-4">
                    {searchInput && bookVerses.length === 0 ? (
                      <div className="text-2xl text-center font-bold mb-4">
                        No data available.
                      </div>
                    ) : searchInput && bookVerses.length > 0 ? (
                      <div className="flex justify-between">
                        <div className="text-base text-start font-semibold text-gray-400 mb-4">
                          About {totalResults.toLocaleString()} results
                        </div>
                        <div className="text-base text-start font-semibold text-gray-400 mb-4 flex flex-row">
                          <div className="align-middle mr-2">Highlight: </div>
                          <Switch
                            checkedChildren="ON"
                            unCheckedChildren="OFF"
                            onChange={highlightHandler}
                            checked={highlight}
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="text-4xl text-center text-blue-900 font-bold">
                          {books[bookSelected]}
                        </div>
                        <div className="text-lg text-center text-gray-400">
                          The Old Testament
                        </div>
                        <div className="text-lg text-center mb-6 text-gray-400">
                          Chapter {selecedChapter ? selecedChapter + 1 : 1}
                        </div>
                      </>
                    )}
                    {searchInput !== ""
                      ? bookVerses.map((verse, i) => {
                          return (
                            <div
                              key={i}
                              className={
                                `text-base indent-10 ` +
                                  bookVerses?.length -
                                  1 !==
                                i
                                  ? `mb-8`
                                  : ``
                              }
                            >
                              <HighlightedParagraph
                                text={verse}
                                searchInput={searchInput}
                              />
                            </div>
                          );
                        })
                      : bookVerses?.map((verse, i) => {
                          return (
                            <div
                              key={i}
                              className={
                                `text-base indent-10 ` +
                                  bookVerses?.length -
                                  1 !==
                                i
                                  ? `mb-8`
                                  : ``
                              }
                            >
                              {verse}
                            </div>
                          );
                        })}

                    {!searchInput && bookVerses.length > 0 ? (
                      <div className="flex mb-6 justify-center">
                        <Pagination
                          defaultCurrent={1}
                          showTotal={(total, range) => (
                            <div className="sm:block hidden">
                              {range[0]}-{range[1]} of {total} items
                            </div>
                          )}
                          current={
                            searchInput !== "" ? currentPageSearch : currentPage
                          }
                          total={
                            searchInput !== "" ? totalPagesSearch : totalPages
                          }
                          onChange={
                            searchInput !== ""
                              ? handlePaginationSearchChange
                              : handlePaginationChange
                          }
                          pageSizeOptions={[10]}
                          showQuickJumper
                        />
                      </div>
                    ) : null}
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiblePage;
