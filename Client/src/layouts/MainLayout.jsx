import { useState } from "react";
import ModuleSidebar from "../components/ModuleSidebar";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import "./MainLayout.css";

export default function MainLayout({
  title,
  modules,
  activePath,
  onNavigate,
  onLogout,
  children,
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="app-layout" dir="rtl">
      <SiteHeader title={title} onLogout={onLogout} />

      <div
        className={`app-layout-body ${
          collapsed ? "is-panel-collapsed" : ""
        }`}
      >
        <ModuleSidebar
          modules={modules}
          activeModule={activePath}
          onNavigate={onNavigate}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((prev) => !prev)}
        />

        <main className="app-layout-main">{children}</main>
      </div>

      <SiteFooter />
    </div>
  );
}
