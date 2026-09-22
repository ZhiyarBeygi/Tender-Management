import { useEffect, useState } from "react";
import LoginPage from "../pages/LoginPage/LoginPage";
import HomePage from "../pages/HomePage/HomePage";
import TenderListPage from "../pages/TenderListPage/TenderListPage";
import MainLayout from "../layouts/MainLayout";

const HOME_PATH = "/";
const TENDER_PATH = "/tendermenu";

// every entry here shows up as one row in the right-side panel;
// add more modules to this list as new ones are built
const modules = [
  {
    label: "مناقصه‌ها",
    children: [{ label: "لیست مناقصه‌ها", path: TENDER_PATH }],
  },
];

function getInitialPath() {
  const path = window.location.pathname;
  return path === TENDER_PATH ? path : HOME_PATH;
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
    navigate(HOME_PATH);
  }

  function handleLogout() {
    sessionStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate(HOME_PATH);
  }

  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  const isTenderPath = path === TENDER_PATH;

  return (
    <MainLayout
      title={isTenderPath ? "مناقصه‌ها" : "مدیریت پروژه"}
      modules={modules}
      activePath={isTenderPath ? TENDER_PATH : null}
      onNavigate={navigate}
      onLogout={handleLogout}
    >
      {isTenderPath ? (
        <TenderListPage onNavigate={navigate} />
      ) : (
        <HomePage onNavigate={navigate} />
      )}
    </MainLayout>
  );
}
