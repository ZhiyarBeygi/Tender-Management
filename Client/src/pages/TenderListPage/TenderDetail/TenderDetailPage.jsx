import { useEffect, useState } from "react";
import { getTenders } from "../../../api/tenderApi";
import "./TenderDetailPage.css";

const FINANCIAL_FIELDS = [
  { key: "creditType", label: "نوع تامین اعتبار" },
  { key: "proposedPrice", label: "قیمت پیشنهادی" },
  { key: "minTechnicalScore", label: "حداقل امتیاز فنی" },
  { key: "technicalScoreCoefficient", label: "ضریب امتیاز فنی" },
  { key: "isGuaranteeRequired", label: "نیاز به ارائه تضمین" },
  { key: "envelopeCount", label: "تعداد پاکت" },
  { key: "guaranteeAmountForeign", label: "مبلغ تضمین غیر ریالی" },
  { key: "guaranteeAmount", label: "مبلغ تضمین" },
  { key: "currencyUnit", label: "واحد ارز" },
  { key: "guaranteeType", label: "نوع ضمانت‌نامه" },
];

const TENDER_INFO_FIELDS = [
  { key: "companyName", label: "شرکت" },
  { key: "tenderCode", label: "کد مناقصه" },
  { key: "callNumber", label: "شماره فراخوان" },
  { key: "tenderType", label: "نوع مناقصه" },
  { key: "tenderMethod", label: "روش مناقصه" },
  { key: "tenderStatus", label: "وضعیت مناقصه", isStatus: true },
  { key: "employer", label: "مناقصه‌گذار" },
  { key: "documentSubmissionMethod", label: "روش ارسال اسناد" },
  { key: "title", label: "عنوان مناقصه", fullWidth: true },
  { key: "responsiblePerson", label: "مسئول انجام" },
  { key: "documentsPublishDate", label: "تاریخ انتشار اسناد" },
  { key: "city", label: "شهر محل اجرا" },
  { key: "documentsSubmissionDeadline", label: "آخرین مهلت تحویل اسناد" },
  { key: "documentsReceiptDeadline", label: "مهلت دریافت اسناد" },
  { key: "score", label: "امتیاز کسب شده" },
  { key: "employerEvaluationDate", label: "تاریخ ارزیابی کارفرما" },
  { key: "isPartnershipPossible", label: "امکان مشارکت" },
  { key: "employerInitialEstimate", label: "برآورد کارفرما" },
  { key: "ledToContract", label: "منجر به قرارداد شد" },
  { key: "recordStatus", label: "وضعیت رکورد", isStatus: true },
  { key: "description", label: "توضیحات" },
  { key: "partnershipLeader", label: "رهبر مشارکت" },
];

const SECONDARY_ACTIONS = [
  "رتبه‌های مناقصه",
  "اسناد مناقصه",
  "فهرست مناقصه",
  "طرف مشارکت",
  "پیوست‌ها",
];

const BOOLEAN_KEYS = new Set([
  "isRfqScoreObtained",
  "isPartnershipPossible",
  "isGuaranteeRequired",
  "ledToContract",
]);

const NUMBER_KEYS = new Set([
  "score",
  "proposedPrice",
  "guaranteeAmount",
  "guaranteeAmountForeign",
  "employerInitialEstimate",
  "minQualitativeScore",
  "technicalScoreCoefficient",
  "minTechnicalScore",
  "envelopeCount",
]);

const DATE_KEYS = new Set([
  "documentsPublishDate",
  "documentsSubmissionDeadline",
  "documentsReceiptDeadline",
  "qualitativeEvaluationDate",
  "employerEvaluationDate",
  "createdAt",
  "modifiedAt",
]);

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

function getFieldValue(tender, key) {
  const value = tender[key];

  if (DATE_KEYS.has(key)) {
    return formatPersianDate(value);
  }

  if (BOOLEAN_KEYS.has(key)) {
    if (value === null || value === undefined) return "--";
    return value ? "بله" : "خیر";
  }

  if (NUMBER_KEYS.has(key)) {
    if (value === null || value === undefined) return "--";
    return Number(value).toLocaleString("en-US", { maximumFractionDigits: 2 });
  }

  if (value === null || value === undefined || value === "") return "--";

  return value;
}

function FieldGrid({ fields, tender }) {
  return (
    <div className="tender-detail-fields">
      {fields.map((field) => (
        <div
          key={field.key}
          className={`tender-detail-field${field.fullWidth ? " tender-detail-field--full" : ""}`}
        >
          <div className="tender-detail-field-label">{field.label}</div>
          <div className="tender-detail-field-value">
            {field.isStatus ? (
              <span className="tender-detail-status-badge">
                {getFieldValue(tender, field.key)}
              </span>
            ) : (
              getFieldValue(tender, field.key)
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TenderDetailPage({ tenderId, onNavigate }) {
  const [tender, setTender] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadTender() {
      try {
        setLoading(true);
        setError("");

        const data = await getTenders();
        const match = Array.isArray(data)
          ? data.find((item) => String(item.id) === String(tenderId))
          : null;

        if (!cancelled) {
          if (match) {
            setTender(match);
          } else {
            setError("مناقصه‌ای با این شناسه پیدا نشد.");
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "خطا در دریافت اطلاعات مناقصه");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadTender();

    return () => {
      cancelled = true;
    };
  }, [tenderId]);

  return (
    <section className="tender-detail-page">
      <div className="tender-detail-actions-bar">
        <div className="tender-detail-action-group">
          {SECONDARY_ACTIONS.map((label) => (
            <button
              key={label}
              type="button"
              className="tender-detail-action-button"
            >
              {label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="tender-detail-back-button"
          onClick={() => onNavigate("/tendermenu")}
        >
          <span>بازگشت به لیست</span>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              d="M15 5l-7 7 7 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {loading && (
        <div className="tender-detail-state">در حال دریافت اطلاعات مناقصه...</div>
      )}

      {!loading && error && (
        <div className="tender-detail-state tender-detail-error">{error}</div>
      )}

      {!loading && !error && tender && (
        <div className="tender-detail-card">
          <div className="tender-detail-title-bar">مشاهده مناقصه</div>

          <div className="tender-detail-panels">
            <div className="tender-detail-panel">
              <div className="tender-detail-panel-title">اطلاعات مناقصه</div>
              <FieldGrid fields={TENDER_INFO_FIELDS} tender={tender} />
            </div>

            <div className="tender-detail-panel">
              <div className="tender-detail-panel-title">اطلاعات مالی و تضامین</div>
              <FieldGrid fields={FINANCIAL_FIELDS} tender={tender} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}