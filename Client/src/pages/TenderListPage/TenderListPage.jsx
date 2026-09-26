import { useState } from "react";
import TenderTable from "./components/TenderTable";
import "./TenderListPage.css";

export default function TenderListPage({ onNavigate }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [columnsExpanded, setColumnsExpanded] = useState(false);

  return (
    <section className="tender-list-page">
      <div className="tender-list-page-topbar">
        <h2 className="tender-list-title">لیست مناقصات</h2>

        <button
          type="button"
          className="tender-list-back-button"
          onClick={() => onNavigate("/")}
        >
          <span>بازگشت به انتخاب  ماژول</span>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              d="M9 5l7 7-7 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <section className="tender-list-content">
        <label className="tender-list-search-label" htmlFor="tender-search">
              جستجوی مناقصات
            </label>
        <div className="tender-list-toolbar">
          
          <div className="tender-list-search-group">
            

            <div className="tender-list-search-box">
              <svg
                className="tender-list-search-icon"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <path d="M16 16l4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>

              <input
                id="tender-search"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="کد یا عنوان مناقصه را جستجو کنید..."
                autoComplete="off"
              />
            </div>
          </div>

          <div className="tender-list-column-buttons">
            <button
              type="button"
              className="tender-list-column-button tender-list-column-button--secondary"
              onClick={() => setColumnsExpanded(false)}
              disabled={!columnsExpanded}
            >
              جمع کردن همه ستون‌ها
            </button>

            <button
              type="button"
              className="tender-list-column-button tender-list-column-button--primary"
              onClick={() => setColumnsExpanded(true)}
              disabled={columnsExpanded}
            >
              باز کردن همه ستون‌ها
            </button>
          </div>
        </div>

        <TenderTable searchTerm={searchTerm} columnsExpanded={columnsExpanded} />
      </section>
    </section>
  );
}