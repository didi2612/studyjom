import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/home";
import ShootingStars from "./stars/shooting";
import Testimonial from "./pages/testimonials";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchResultsPage from "./pages/SearchResultsPage";
import Tester from "./pages/testpage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Tester />} />
        <Route path="/search-results" element={<SearchResultsPage />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
