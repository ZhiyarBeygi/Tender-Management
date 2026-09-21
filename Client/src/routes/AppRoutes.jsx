import { useEffect, useState } from "react";
import LoginPage from "../pages/LoginPage/LoginPage";
import AppLauncherPage from "../pages/AppLauncherPage/AppLauncherPage";
import TenderListPage from "../pages/TenderListPage/TenderListPage";

const LOGIN_PATH = "/";
const LAUNCHER_PATH = "/applauncher";
const TENDER_PATH = "/tendermenu";

function getInitialPath() {
  const path = window.location.pathname;

  if (path === LAUNCHER_PATH || path === TENDER_PATH) {
    return path;
  }

  return LOGIN_PATH;
}

export default function AppRoutes() {
  const [path, setPath] = useState(getInitialPath);
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn") === "true",
  );

  useEffect(() => {
    const handlePopState = () => setPath(getInitialPath());

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function navigate(to) {
    window.history.pushState({}, "", to);
    setPath(to);
  }

  function handleLoginSuccess() {
    sessionStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    navigate(LAUNCHER_PATH);
  }

  function handleLogout() {
    sessionStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate(LOGIN_PATH);
  }

  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  if (path === TENDER_PATH) {
    return (
      <TenderListPage
        onNavigate={navigate}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <AppLauncherPage
      onNavigate={navigate}
      onLogout={handleLogout}
    />
  );
}
