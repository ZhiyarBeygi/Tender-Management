import { useState } from "react";
import "./ModuleSidebar.css";

function GroupIcon() {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true">
      <path
        d="M5 20h14M6 17h12M8 17l2-9h4l2 9M7 8h10l-2-3H9L7 8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChildIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="m12 4 2.1 4.3 4.7.7-3.4 3.3.8 4.7-4.2-2.2-4.2 2.2.8-4.7-3.4-3.3 4.7-.7L12 4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Chevron({ open }) {
  return (
    <svg
      className={`module-sidebar-chevron ${open ? "is-open" : ""}`}
      viewBox="0 0 24 24"
      width="15"
      height="15"
      aria-hidden="true"
    >
      <path
        d="m8 10 4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ModuleSidebar({
  modules,
  activeModule,
  onNavigate,
  collapsed,
  onToggleCollapse,
}) {
  const [openGroups, setOpenGroups] = useState(() =>
    Object.fromEntries(modules.map((module) => [module.label, true])),
  );

  function toggleGroup(label) {
    setOpenGroups((current) => ({
      ...current,
      [label]: !current[label],
    }));
  }

  return (
    <aside
      className={`module-sidebar ${collapsed ? "is-collapsed" : ""}`}
      dir="rtl"
    >
      <div className="module-sidebar-heading">
        {!collapsed && <span>منوهای در دسترس</span>}

        <button
          type="button"
          className="module-sidebar-toggle"
          onClick={onToggleCollapse}
          aria-expanded={!collapsed}
          aria-label={collapsed ? "باز کردن پنل منوها" : "بستن پنل منوها"}
        >
          <svg
            className={`module-sidebar-toggle-icon ${
              collapsed ? "is-collapsed" : ""
            }`}
            viewBox="0 0 24 24"
            width="14"
            height="14"
            aria-hidden="true"
          >
            <path
              d="M15 6l-6 6 6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <nav className="module-sidebar-nav" aria-label="منوهای در دسترس">
        {modules.map((module) => {
          const isOpen = openGroups[module.label];
          const hasActiveChild = module.children?.some(
            (child) => child.path === activeModule,
          );

          return (
            <div className="module-sidebar-group" key={module.label}>
              <button
                type="button"
                className={`module-sidebar-group-toggle ${
                  hasActiveChild ? "has-active-child" : ""
                }`}
                title={collapsed ? module.label : undefined}
                onClick={() => toggleGroup(module.label)}
                aria-expanded={!collapsed && isOpen}
              >
                <span className="module-sidebar-group-icon">
                  <GroupIcon />
                </span>

                {!collapsed && (
                  <span className="module-sidebar-group-label">
                    {module.label}
                  </span>
                )}

                {!collapsed && <Chevron open={isOpen} />}
              </button>

              {!collapsed && isOpen && module.children?.length > 0 && (
                <div className="module-sidebar-children">
                  {module.children.map((child) => (
                    <button
                      key={child.path}
                      type="button"
                      className={`module-sidebar-child ${
                        child.path === activeModule ? "is-active" : ""
                      }`}
                      onClick={() => onNavigate(child.path)}
                    >
                      <span className="module-sidebar-child-icon">
                        <ChildIcon />
                      </span>
                      <span>{child.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
