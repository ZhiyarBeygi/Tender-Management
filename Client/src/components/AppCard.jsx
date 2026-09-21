export default function AppCard({ title, onClick }) {
  return (
    <button type="button" className="app-card" onClick={onClick}>
      {title}
    </button>
  );
}
