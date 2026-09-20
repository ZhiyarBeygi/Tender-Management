import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import TenderList from "./pages/TenderList"; // you'll build this later

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <LoginPage onLoginSuccess={(result) => setUser(result)} />;
  }

  return <TenderList user={user} />;
}