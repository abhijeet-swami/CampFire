import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import VerifyOtp from "./pages/VerifyOtp";
import HomeCamp from "./components/HomeCamp";
import CreateCamp from "./components/CreateCamp";
import TopCharts from "./components/TopCharts";
import YourCamp from "./components/YourCamp";
import Settings from "./components/Settings";
import ForgotPassword from "./pages/ForgotPassword";
import ResetVerifyPassword from "./pages/ResetVerifyPassword";
import AccountProfile from "./pages/AccountProfile";
import SecurityPrivacy from "./pages/SecurityPrivacy";
import AddInterests from "./pages/AddInterests";
import ProtectedRoute from "./components/ProtectedRoute";
import UploadAvatar from "./pages/UploadAvatar";
import CampFeed from "./pages/CampFeed";
import DiscussionPage from "./pages/DiscussionPage";

const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/health`;

const App = () => {
  const [warming, setWarming] = useState(true);

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "default";
    document.documentElement.setAttribute("data-theme", theme);

    const wakeServer = async () => {
      try {
        await fetch(BACKEND_URL, { cache: "no-store" });
      } catch (err) {
        console.log("Backend still waking...");
      } finally {
        setWarming(false);
      }
    };

    wakeServer();
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text-primary transition-colors duration-300">
      
      {/* Wakeup banner */}
      {warming && (
        <div className="fixed top-0 left-0 w-full bg-yellow-400 text-black text-center text-sm py-1 z-50">
          Server is starting... first request may take ~30 seconds
        </div>
      )}

      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetVerifyPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />}>
            <Route index element={<HomeCamp />} />
            <Route path="charts" element={<TopCharts />} />
            <Route path="your-camps" element={<YourCamp />} />
            <Route path="create" element={<CreateCamp />} />
            <Route path="settings" element={<Settings />} />
            <Route path="camp-feed/:id" element={<CampFeed />} />
            <Route path="camp-feed/:id/post/:postId" element={<DiscussionPage />} />
            <Route path="settings/account" element={<AccountProfile />} />
            <Route path="settings/privacy" element={<SecurityPrivacy />} />
            <Route path="settings/add-interest" element={<AddInterests />} />
            <Route path="settings/upload-avatar" element={<UploadAvatar />} />
          </Route>
        </Route>
      </Routes>

      <ToastContainer />
    </div>
  );
};

export default App;
