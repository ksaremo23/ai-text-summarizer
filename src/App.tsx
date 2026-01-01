import Dashboard from "./pages/Dashboard";
import { Header } from "./components/Header";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <Header />
      <Dashboard />
    </div>
  );
}
