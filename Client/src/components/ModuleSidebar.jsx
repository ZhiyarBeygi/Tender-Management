import "./ModuleSidebar.css";

export default function ModuleSidebar({ modules, activeModule, onNavigate }) {
  return (
    <aside className="module-sidebar" dir="rtl">
      <div className="module-sidebar-heading">ماژول‌ها</div>

      <nav className="module-sidebar-nav" aria-label="ماژول‌ها">
        {modules.map((module) => (
          <button
            key={module.path}
            type="button"
            className={`module-sidebar-item ${
              module.path === activeModule ? "is-active" : ""
            }`}
            onClick={() => onNavigate(module.path)}
          >
            {module.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
