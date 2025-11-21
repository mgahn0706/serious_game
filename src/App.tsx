import { Routes, Route } from "react-router-dom";
import { DanggeunPage } from "./pages/DanggeunPage";
import { EverytimePage } from "./pages/EverytimePage";
import InstagramPage from "./pages/InstagramPage";

function App() {
  return (
    <Routes>
      <Route path="/instagram" element={<InstagramPage />} />
      <Route path="/everytime" element={<EverytimePage />} />
      <Route path="/danggeun" element={<DanggeunPage />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}

export default App;
