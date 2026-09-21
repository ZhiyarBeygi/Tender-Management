import { useEffect, useState } from "react";
import LoginPage from "../pages/LoginPage/LoginPage";
import AppLauncherPage from "../pages/AppLauncherPage/AppLauncherPage";
import TenderListPage from "../pages/TenderListPage/TenderListPage";

export default function AppRoutes() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function navigate(to) {
    window.history.pushState({}, "", to);
    setPath(to);
  }

  if (path === "/tendermenu") {
    return <TenderListPage onNavigate={navigate} />;
  }

  if (path === "/applauncher") {
    return <AppLauncherPage onNavigate={navigate} />;
  }

  return <LoginPage onLoginSuccess={() => navigate("/applauncher")} />;
}
