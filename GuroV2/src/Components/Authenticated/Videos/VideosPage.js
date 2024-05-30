import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import Videos from "./Videos";

const VideosPage = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const navigate = useNavigate();

  const handleVideoSelection = (video) => {
    setSelectedVideo(video);
    navigate(`/videoplayer/${video.libraryId}`); // Navigate to the video player page with the video ID
  };

  return (
    <div className="sm:my-44 my-28 w-full  xl:pl-44 xl:pr-44 pl-0 pr-0">
      <div className="">
        <span className="text-[#363636] tracking-tight">
          {!!selectedVideo && <VideoPlayer video={selectedVideo} />}
          {!selectedVideo && <Videos setSelectedVideo={handleVideoSelection} />}
        </span>
      </div>
    </div>
  );
};

export default VideosPage;
