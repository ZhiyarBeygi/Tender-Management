import { useEffect, useMemo, useState } from "react";
import { getTenders } from "../../../api/tenderApi";

const columns = [
  { key: "tenderCode", label: "کد مناقصه", width: "110px" },
  { key: "title", label: "عنوان مناقصه", width: "240px" },
  { key: "callNumber", label: "شماره فراخوان", width: "185px" },
  { key: "documentsPublishDate", label: "تاریخ انتشار اسناد", width: "175px" },
  {
    key: "documentsSubmissionDeadline",
    label: "آخرین مهلت تحویل اسناد",
    width: "195px",
  },
  { key: "documentsReceiptDeadline", label: "مهلت دریافت اسناد", width: "175px" },
  {
    key: "qualitativeEvaluationDate",
    label: "تاریخ اعلام نتایج ارزیابی کیفی",
    width: "220px",
  },
];

function formatPersianDate(value) {
  if (!value) return "--";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--";

  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function getCellValue(tender, key) {
  if (key.includes("Date") || key.includes("Deadline")) {
    return formatPersianDate(tender[key]);
  }

  return tender[key] ?? "--";
}

export default function TenderTable({ searchTerm = "" }) {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadTenders() {
      try {
        setLoading(true);
        setError("");

        const data = await getTenders();

        if (!cancelled) {
          setTenders(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "خطا در دریافت مناقصات");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadTenders();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredTenders = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) return tenders;

    return tenders.filter((tender) =>
      [
        tender.tenderCode,
        tender.title,
        tender.callNumber,
        tender.companyName,
        tender.employer,
        tender.city,
      ].some((value) => String(value ?? "").toLowerCase().includes(term)),
    );
  }, [searchTerm, tenders]);

  if (loading) {
    return <div className="tender-table-state">در حال دریافت مناقصات...</div>;
  }

  if (error) {
    return <div className="tender-table-state tender-table-error">{error}</div>;
  }

  if (filteredTenders.length === 0) {
    return <div className="tender-table-state">مناقصه‌ای پیدا نشد.</div>;
  }

  return (
    <div className="tender-table-wrapper">
      <table className="tender-table">
        <colgroup>
          {columns.map((column) => (
            <col key={column.key} style={{ width: column.width }} />
          ))}
        </colgroup>

        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {filteredTenders.map((tender) => (
            <tr key={tender.id}>
              {columns.map((column) => (
                <td key={column.key} title={String(getCellValue(tender, column.key))}>
                  {getCellValue(tender, column.key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
