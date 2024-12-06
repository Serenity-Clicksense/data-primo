import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import IndexPage from "./pages/Indexpage";


function App() {
  return (
    <Router>
      <Routes>
   

        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/signup" element={<SignupPage />} /> */}
        
      </Routes>
    </Router>
  );
}

export default App;
