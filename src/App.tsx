// src/App.tsx
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import DanggeunPage from "./pages/Danggeun/DanggeunPage";
import EverytimePage from "./pages/Everytime/EverytimePage";
import EverytimePostDetailPage from "./pages/Everytime/EverytimePostDetailPage";
import InstagramPage from "./pages/Instagram/InstagramPage";
import ExplorePage from "./pages/Instagram/ExplorePage";
import DefaultPage from "./pages/DefaultPage";
import ProfilePage from "./pages/Instagram/ProfilePage";
import CalendarPage from "./pages/CalendarPage";
import DanggeunDetailPage from "./pages/Danggeun/DanggeunDetailPage";
import DanggeunAccountPage from "./pages/Danggeun/DanggeunAccountPage";

// ✅ Login pages
import InstagramLoginPage from "./pages/Instagram/LoginPage";
import DanggeunLoginPage from "./pages/Danggeun/DanggeunLoginPage";
import EverytimeLoginPage from "./pages/Everytime/EverytimeLoginPage";

// ✅ Auth
import { isLoggedIn } from "./features/auth/scopedSessionAuth";
import RequireAuth from "./features/auth/RequireScopedAuth";
import { useEffect } from "react";

function RootRedirect() {
  return <Navigate to="/default" replace />;
}

/** ✅ route 기반 title sync */
function TitleSync() {
  const { pathname } = useLocation();

  useEffect(() => {
    const title = pathname.startsWith("/instagram")
      ? "Instagram"
      : pathname.startsWith("/danggeun")
      ? "당근"
      : pathname.startsWith("/everytime")
      ? "에브리타임"
      : pathname.startsWith("/calendar")
      ? "Google Calendar"
      : "serious-game";

    document.title = title;
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <TitleSync />

      <Routes>
        {/* ===================== ROOT ===================== */}
        <Route path="/" element={<RootRedirect />} />
        <Route path="/default" element={<DefaultPage />} />

        {/* ===================== LOGIN (PUBLIC) ===================== */}
        <Route
          path="/instagram/login"
          element={
            isLoggedIn("instagram") ? (
              <Navigate to="/instagram" replace />
            ) : (
              <InstagramLoginPage />
            )
          }
        />
        <Route
          path="/danggeun/login"
          element={
            isLoggedIn("danggeun") ? (
              <Navigate to="/danggeun" replace />
            ) : (
              <DanggeunLoginPage />
            )
          }
        />
        <Route
          path="/everytime/login"
          element={
            isLoggedIn("everytime") ? (
              <Navigate to="/everytime/board/0" replace />
            ) : (
              <EverytimeLoginPage />
            )
          }
        />

        {/* ===================== INSTAGRAM (PROTECTED) ===================== */}
        <Route
          path="/instagram"
          element={
            <RequireAuth scope="instagram" loginPath="/instagram/login">
              <InstagramPage />
            </RequireAuth>
          }
        />
        <Route
          path="/instagram/explore"
          element={
            <RequireAuth scope="instagram" loginPath="/instagram/login">
              <ExplorePage />
            </RequireAuth>
          }
        />
        <Route
          path="/instagram/profile/:id"
          element={
            <RequireAuth scope="instagram" loginPath="/instagram/login">
              <ProfilePage />
            </RequireAuth>
          }
        />

        {/* ===================== EVERYTIME (PROTECTED) ===================== */}
        <Route
          path="/everytime"
          element={
            <RequireAuth scope="everytime" loginPath="/everytime/login">
              <Navigate to="/everytime/board/0" replace />
            </RequireAuth>
          }
        />
        <Route
          path="/everytime/board/:boardId"
          element={
            <RequireAuth scope="everytime" loginPath="/everytime/login">
              <EverytimePage />
            </RequireAuth>
          }
        />
        <Route
          path="/everytime/:id"
          element={
            <RequireAuth scope="everytime" loginPath="/everytime/login">
              <EverytimePostDetailPage />
            </RequireAuth>
          }
        />

        {/* ===================== DANGGEUN (PROTECTED) ===================== */}
        <Route
          path="/danggeun"
          element={
            <RequireAuth scope="danggeun" loginPath="/danggeun/login">
              <DanggeunPage />
            </RequireAuth>
          }
        />
        <Route
          path="/danggeun/products/:id"
          element={
            <RequireAuth scope="danggeun" loginPath="/danggeun/login">
              <DanggeunDetailPage />
            </RequireAuth>
          }
        />
        <Route
          path="/danggeun/account/:id"
          element={
            <RequireAuth scope="danggeun" loginPath="/danggeun/login">
              <DanggeunAccountPage />
            </RequireAuth>
          }
        />

        {/* ===================== OTHERS ===================== */}
        <Route path="/calendar" element={<CalendarPage />} />

        {/* ===================== FALLBACK ===================== */}
        <Route path="*" element={<DefaultPage />} />
      </Routes>
    </>
  );
}
