import { useEffect, useState } from "react";
import LoginPage from "../pages/LoginPage/LoginPage";
import HomePage from "../pages/HomePage/HomePage";
import TenderListPage from "../pages/TenderListPage/TenderListPage";
import BookmarksPage from "../pages/BookmarksPage/BookmarksPage";
import TestModulePage from "../pages/TestModulePage/TestModulePage";
import MainLayout from "../layouts/MainLayout";

const HOME_PATH = "/";
const TENDER_PATH = "/tendermenu";
const BOOKMARKS_PATH = "/bookmarks";
const TEST_MODULE_PATH = "/testmodule";

const modules = [
  {
    id: "tenders",
    label: "مناقصه‌ها",
    children: [
      {
        label: "لیست مناقصه‌ها",
        path: TENDER_PATH,
      },
    ],
  },
  {
    id: "test-module",
    label: "ماژول تست",
    children: [
      {
        label: "صفحه خالی",
        path: TEST_MODULE_PATH,
      },
    ],
  },
];

function getInitialPath() {
  const path = window.location.pathname;

  if (path === TENDER_PATH) {
    return TENDER_PATH;
  }

  if (path === BOOKMARKS_PATH) {
    return BOOKMARKS_PATH;
  }
  
  if (path === TEST_MODULE_PATH){
    return TEST_MODULE_PATH;
  }

  return HOME_PATH;
}

export default function AppRoutes() {
  const [path, setPath] = useState(getInitialPath);

  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn") === "true",
  );

  useEffect(() => {
    const handlePopState = () => {
      setPath(getInitialPath());
    };

    window.addEventListener(
      "popstate",
      handlePopState,
    );

    return () => {
      window.removeEventListener(
        "popstate",
        handlePopState,
      );
    };
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
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  const isTenderPath = path === TENDER_PATH;
  const isBookmarksPath = path === BOOKMARKS_PATH;
  const isTestModulePath = path === TEST_MODULE_PATH;
  return (
      <MainLayout
        title={
          isTenderPath
            ? "مناقصه‌ها"
            : isBookmarksPath
              ? "بوک‌مارک‌ها"
              : isTestModulePath
                ? "ماژول جدید"
                : "مدیریت پروژه"
        }
        modules={modules}
        activePath={
          isTenderPath
            ? TENDER_PATH
            : isTestModulePath
              ? TEST_MODULE_PATH
              : null
        }
        onNavigate={navigate}
        onLogout={handleLogout}
      >
      {isTenderPath ? (
        <TenderListPage onNavigate={navigate} />
      ) : isBookmarksPath ? (
        <BookmarksPage
          modules={modules}
          onNavigate={navigate}
        />
      ) : isTestModulePath ? (
        <TestModulePage />
      ) : (
        <HomePage onNavigate={navigate} />
      )}
    </MainLayout>
  );
}