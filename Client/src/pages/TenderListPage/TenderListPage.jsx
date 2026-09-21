import "./TenderListPage.css";
import TenderTable from "./components/TenderTable";

export default function TenderListPage({ onNavigate }) {
  return (
    <main className="tender-list-page" dir="rtl">
      <header className="tender-list-header">
        <h1>مدیریت مناقصات</h1>
        <button type="button" onClick={() => onNavigate("/applauncher")}>
          بازگشت
        </button>
      </header>

      <section className="tender-list-content">
        <TenderTable />
      </section>
    </main>
  );
}
