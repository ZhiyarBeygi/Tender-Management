import AppCard from "../../components/AppCard";
import "./AppLauncherPage.css";

export default function AppLauncherPage({ onNavigate }) {
  return (
    <main className="app-launcher-page" dir="rtl">
      <section className="app-launcher-card">
        <h1>انتخاب اپلیکیشن</h1>
        <div className="app-launcher-grid">
          <AppCard
            title="مدیریت مناقصات"
            onClick={() => onNavigate("/tendermenu")}
          />
        </div>
      </section>
    </main>
  );
}
