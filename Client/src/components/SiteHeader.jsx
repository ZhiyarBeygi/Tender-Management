import "./SiteHeader.css";

export default function SiteHeader({
  title,
  onBackToLauncher,
  onLogout,
}) {
  return (
    <header className="site-header" dir="rtl">
      <div className="site-header-title">
        <h1>{title}</h1>
      </div>

      <div className="site-header-actions">
        {onBackToLauncher && (
          <button
            type="button"
            className="site-header-link"
            onClick={onBackToLauncher}
          >
            انتخاب اپلیکیشن
          </button>
        )}

        {onLogout && (
          <button
            type="button"
            className="site-header-button"
            onClick={onLogout}
          >
            خروج
          </button>
        )}
      </div>
    </header>
  );
}
