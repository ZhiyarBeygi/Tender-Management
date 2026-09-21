import ModuleSidebar from "../../components/ModuleSidebar";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import TenderTable from "./components/TenderTable";
import "./TenderListPage.css";

const modules = [
  {
    label: "مدیریت مناقصات",
    path: "/tendermenu",
  },
];

export default function TenderListPage({ onNavigate, onLogout }) {
  return (
    <div className="module-page" dir="rtl">
      <SiteHeader
        title="مدیریت مناقصات"
        onBackToLauncher={() => onNavigate("/applauncher")}
        onLogout={onLogout}
      />

      <div className="module-page-body">
        <ModuleSidebar
          modules={modules}
          activeModule="/tendermenu"
          onNavigate={onNavigate}
        />

        <main className="tender-list-main">
          <section className="tender-list-content">
            <TenderTable />
          </section>
        </main>
      </div>

      <SiteFooter />
    </div>
  );
}
