import AppCard from "../../components/AppCard";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import "./AppLauncherPage.css";

export default function AppLauncherPage({ onNavigate, onLogout }) {
  return (
    <div className="app-launcher-page" dir="rtl">
      <SiteHeader title="انتخاب اپلیکیشن" onLogout={onLogout} />

      <main className="app-launcher-main">
        <section className="app-launcher-card">
          <h2>انتخاب اپلیکیشن</h2>

          <div className="app-launcher-grid">
            <AppCard
              title="مدیریت مناقصات"
              onClick={() => onNavigate("/tendermenu")}
            />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
