import { baseURL } from "../../../constants/constants";
import { useEffect, useRef } from "react";

const VideoItem = ({ video, setSelectedVideo }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current.currentTime = 2;
  }, []);

  return (
    <div className="">
      <div className="flex flex-row flex-wrap justify-center gap-10">
        <div className="flex flex-col justify-center items-center ">
          <div className="!z-5 relative flex flex-col rounded-[20px] xs:max-w-[300px]  sm:max-w-[300px] md:max-w-[200px] lg:max-w-[300px] shadow-lg bg-white bg-clip-border shadow-3xl shadow-shadow-500 w-full !p-4 3xl:p-![18px] undefined hover:scale-105 duration-150">
            <div className="h-full w-full">
              <div className="relative w-full">
                <video
                  ref={videoRef}
                  src={baseURL + `/${video.file}`}
                  autoPlay={false}
                  controls={false}
                  className="rounded-xl"
                />
              </div>
              <div className="cursor-default	mb-3 flex items-center justify-between px-1 md:items-start">
                <div className="mb-2 my-4 overflow-hidden">
                  <h1
                    title={video.title}
                    className="text-lg font-bold text-navy-700 truncate"
                  >
                    {video.title}
                  </h1>
                  <h2
                    title={video.description}
                    className="mt-1 text-sm font-base text-gray-500 md:mt-2 truncate"
                  >
                    {video.description}
                  </h2>
                </div>
              </div>
              <div className="flex items-center justify-center ">
                <button
                  onClick={() => setSelectedVideo(video)}
                  className="bg-[#4A4E69] text-white rounded-[20px] w-full h-10 h cursor-pointer"
                >
                  Watch
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
