import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import "./SiteHeader.css";

function HomeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 10.8 12 3l9 7.8" />
      <path d="M5.5 9.5V21h13V9.5" />
      <path d="M9.5 21v-6.5h5V21" />
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      className={`site-header-user-chevron ${open ? "is-open" : ""}`}
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m7 10 5 5 5-5" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6.5 4.5A2 2 0 0 1 8.5 2.5h7a2 2 0 0 1 2 2v17l-5.5-3.4-5.5 3.4z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 5H5.5A1.5 1.5 0 0 0 4 6.5v11A1.5 1.5 0 0 0 5.5 19H10" />
      <path d="M14 8l4 4-4 4" />
      <path d="M9 12h9" />
    </svg>
  );
}

export default function SiteHeader({
  title,
  icon,
  onLogout,
  onNavigate,
}) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  function handleHome() {
    setUserMenuOpen(false);
    onNavigate?.("/");
  }

  function handleBookmarks() {
    setUserMenuOpen(false);
    onNavigate?.("/bookmarks");
  }

  function handleLogout() {
    setUserMenuOpen(false);
    onLogout?.();
  }

  return (
    <header className="site-header" dir="rtl">
      <div className="site-header-title">
        {icon && (
          <span className="site-header-icon">
            {icon}
          </span>
        )}

        <h1>{title}</h1>
      </div>

      <div className="site-header-actions">
        <button
          type="button"
          className="site-header-icon-button"
          onClick={handleHome}
          aria-label="خانه"
          title="خانه"
        >
          <HomeIcon />
        </button>

        <ThemeToggle />

        <div
          className="site-header-user-wrapper"
          ref={userMenuRef}
        >
          <button
            type="button"
            className="site-header-user"
            onClick={() =>
              setUserMenuOpen((current) => !current)
            }
            aria-expanded={userMenuOpen}
            aria-haspopup="menu"
          >
            <ChevronIcon open={userMenuOpen} />

            <span className="site-header-user-info">
              <span className="site-header-user-label">
                کاربر جاری
              </span>

              <span className="site-header-user-name">
                Guest User
              </span>
            </span>

            <span className="site-header-user-avatar">
              GU
              <span className="site-header-user-status" />
            </span>
          </button>

          {userMenuOpen && (
            <div
              className="site-header-user-menu"
              role="menu"
            >
              <button
                type="button"
                className="site-header-menu-item"
                onClick={handleBookmarks}
                role="menuitem"
              >
                <BookmarkIcon />
                <span>مشاهده بوک‌مارک‌ها</span>
              </button>

              <button
                type="button"
                className="site-header-menu-item site-header-menu-logout"
                onClick={handleLogout}
                role="menuitem"
              >
                <LogoutIcon />
                <span>خروج</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}