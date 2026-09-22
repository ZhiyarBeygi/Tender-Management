import "./SiteHeader.css";

export default function SiteHeader({ title, icon, onLogout }) {
  return (
    <header className="site-header" dir="rtl">
      <div className="site-header-title">
        {icon && <span className="site-header-icon">{icon}</span>}
        <h1>{title}</h1>
      </div>
      {onLogout && (
        <button type="button" className="site-header-button" onClick={onLogout}>
          خروج
        </button>
      )}
    </header>
    
  );
  
}
