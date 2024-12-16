import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import ManageCategories from "./pages/ManageCategories";
import ManageRules from "./pages/ManageRules";
import ApplyRules from "./pages/ApplyRules";
import SourceDatabase from "./pages/SourceDatabase";


function App() {
  return (
    <Router>
      <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/manageCategories" element={<ManageCategories />} />
            <Route path="/manageRules" element={<ManageRules />} />
            <Route path="/applyRules" element={<ApplyRules />} />
            <Route path="/SourceDatabase" element={<SourceDatabase />} />
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
