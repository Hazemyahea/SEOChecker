import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import SEOChecker from "./SEOChecker"; // صفحة أدوات SEO

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />          {/* الصفحة الرئيسية */}
        <Route path="/seo" element={<SEOChecker />} /> {/* صفحة SEO Analyzer */}
      </Routes>
    </Router>
  );
}

export default App;
