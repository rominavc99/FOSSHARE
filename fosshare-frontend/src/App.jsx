import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}
