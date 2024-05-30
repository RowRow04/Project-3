import aos from "aos";
import "aos/dist/aos.css";
import { React, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LessonViewer from "./Components/Authenticated/Lessons/LessonViewer";
import LessonsPage from "./Components/Authenticated/Lessons/LessonsPage";
import Navbar from "./Components/Authenticated/Navbar/Navbar";
import About from "./Components/Authenticated/PageSelection/About";
import PageSelection from "./Components/Authenticated/PageSelection/PageSelection";
import Schoolverse from "./Components/Authenticated/PageSelection/Schoolverse";
import Activity from "./Components/Authenticated/SchoolBook/Activities/Activity";
import Levels from "./Components/Authenticated/SchoolBook/Activities/Level/Levels";
import Modules from "./Components/Authenticated/SchoolBook/Modules/Modules";
import Quarters from "./Components/Authenticated/SchoolBook/Quarters/Quarters";
import SchoolBookPage from "./Components/Authenticated/SchoolBook/SchoolBookPage";
import Subjects from "./Components/Authenticated/SchoolBook/Subjects/Subjects";
import Topics from "./Components/Authenticated/SchoolBook/Topics/Topics";
import VideoPlayer from "./Components/Authenticated/Videos/VideoPlayer";
import VideosPage from "./Components/Authenticated/Videos/VideosPage";
import NotFound from "./NotFound";
import guro_bg from "./assets/img/score_bg.png";
import BiblePage from "./Components/Authenticated/Bible/BiblePage";

//Testing

function App() {
  useEffect(() => {
    aos.init({
      duration: 1000,
    });
  }, []);

  const location = useLocation();
  const hideNavbar = location.pathname === "/login"; // Add any other routes where you want to hide the navbar

  return (
    <div className="App">
      <div
        className="flex-wrap flex flex-row justify-center"
        style={{
          backgroundImage: `url(${guro_bg})`,
          backgroundSize: "cover", // Update the backgroundSize to 'cover'
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {!hideNavbar && <Navbar />}

        <Routes>
          <Route path="/" element={<PageSelection />} />
          <Route path="/lessons" element={<LessonsPage />} />
          <Route path="/lessonviewer" element={<LessonViewer />} />
          <Route path="/Schoolbook" element={<SchoolBookPage />} />
          <Route path="/bible" element={<BiblePage />} />
          <Route path="subjects/:grade" element={<Subjects />} />
          <Route path="quarters/:subjectId" element={<Quarters />} />
          <Route path="topics" element={<Topics />} />
          <Route path="modules/:subjectId/:topicId" element={<Modules />} />
          <Route path="/levels/:subjectId/:topicId" element={<Levels />} />
          <Route
            path="activity/:title/:type/:moduleId"
            element={<Activity />}
          />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/videoplayer/:libraryId" element={<VideoPlayer />} />
          <Route path="/about" element={<About />} />
          <Route path="/schoolverse" element={<Schoolverse />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
