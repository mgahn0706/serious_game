import { Routes, Route } from "react-router-dom";
import DanggeunPage from "./pages/DanggeunPage";
import EverytimePage from "./pages/Everytime/EverytimePage";
import EverytimePostDetailPage from "./pages/Everytime/EverytimePostDetailPage";
import InstagramPage from "./pages/Instagram/InstagramPage";
import ExplorePage from "./pages/Instagram/ExplorePage";
import DefaultPage from "./pages/DefaultPage";
import ProfilePage from "./pages/Instagram/ProfilePage";
import CalendarPage from "./pages/CalendarPage";

function App() {
  return (
    <Routes>
      {/* Instagram */}
      <Route path="/instagram" element={<InstagramPage />} />
      <Route path="/instagram/explore" element={<ExplorePage />} />
      <Route path="/instagram/profile/:id" element={<ProfilePage />} />{" "}
      {/* Everytime */}
      <Route path="/everytime" element={<EverytimePage />} />
      <Route path="/everytime/:id" element={<EverytimePostDetailPage />} />{" "}
      {/* ← 동적 라우트 */}
      {/* Others */}
      <Route path="/danggeun" element={<DanggeunPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="*" element={<DefaultPage />} />
    </Routes>
  );
}

export default App;
