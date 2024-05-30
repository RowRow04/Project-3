import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import back_btn from "../../../assets/img/buttons/back_btn.png";
import { baseURL } from "../../../constants/constants";

const VideoPlayer = () => {
  const navigate = useNavigate();
  const { libraryId } = useParams();
  const libraryVideos = useSelector(
    (state) => state.subjects.libraryVideosPerGrade
  );
  const isLoading = useSelector(
    (state) => state.subjects.loadingLibraryVideosPerGrade
  );
  const video = libraryVideos.find((video) => video.libraryId === libraryId);
  const videoRef = useRef(null);

  const setPlaybackSpeed = (speed) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  useEffect(() => {
    // Set the playback speed to 2x when the component mounts
    setPlaybackSpeed(0.8);
    // setPlaybackSpeed(1);
  }, []);

  useEffect(() => {
    // Perform any necessary actions when the video changes
  }, [video]);

  if (!video) {
    return <div className="text-center text-gray-500">Video not found</div>;
  }

  return (
    <div className="w-full p-10 py-5">
      <div>
        {isLoading ? (
          <div className="flex justify-center">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-[#4A4E69] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        ) : (
          <div className="my-24 z-50 p-0 sm:p-10">
            <div className="text-3xl font-bold text-[#363636] tracking-tight">
              <button onClick={() => navigate(-1)}>
                <img
                  alt="back"
                  src={back_btn}
                  className="sm:h-16 h-10 mx-auto" // Add 'mx-auto' class to center the image horizontally
                />
              </button>
            </div>
            <div className="rounded-lg my-5">
              <div className="shadow-lg xs:mb-4 lg:mb-10 w-full mx-auto p-5 my-5 bg-opacity-50 bg-white backdrop-filter backdrop-blur-lg rounded-lg">
                <div>Title: {video.title}</div>
              </div>
              <div className="relative rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  src={baseURL + `/${video.file}`}
                  autoPlay={false}
                  controls={true}
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="my-10 border border-white border-8 rounded-2xl"
                style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)" }}
              >
                <div className="bg-[#C9F4FF] rounded-md  p-5  tracking-tight flex flex-wrap items-start justify-between  border-b-8 border-[#D1D1D1]">
                  <div>
                    <p className="font-semibold text-sm tracking-tight">
                      Description:
                    </p>
                    <div>{video.description}</div>
                  </div>
                  <div>
                    {video.reference !== null &&
                    video.reference !== "" &&
                    video.reference !== undefined ? (
                      <div className="font-light sm:my-0 my-5">
                        <span className="font-semibold text-sm">
                          Reference:
                        </span>
                        <br />
                        {video.reference}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
