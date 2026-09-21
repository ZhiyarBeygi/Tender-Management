import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <LoginPage
      onLoginSuccess={() => {
        window.location.href = "https://google.com";
      }}
    />
  );
}