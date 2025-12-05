import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/frontend/Home";
import Rgpd from "./pages/frontend/Rgpd";
import AdminHome from "./pages/backend/Home";
import AdminDashboard from "./pages/backend/Dashboard";
import AdminSkills from "./pages/backend/Skills";
import AdminSkillAdd from "./pages/backend/SkillAdd";
import AdminUsers from "./pages/backend/Users";
import AdminPortfolioAdd from "./pages/backend/PortfolioAdd";
import AdminUserAdd from "./pages/backend/UserAdd";
import Login from "./pages/backend/SignIn";
import PageNotFound from "./pages/404Page";
import AuthProvider from "react-auth-kit/AuthProvider";
import createStore from "react-auth-kit/createStore";
import PrivateRoute from "./components/backend/auth/PrivateRoute";

export default function App() {
  const store = createStore({
    authName: "__auth",
    authType: "cookie",
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === "https:",
  });

  return (
    <AuthProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="politique-confidentialite" element={<Rgpd />} />
          <Route path="admin/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />

          <Route
            exact
            path="admin/dashboard"
            element={<PrivateRoute Component={AdminDashboard} />}
          />

          <Route
            exact
            path="admin/portfolios"
            element={<PrivateRoute Component={AdminHome} />}
          />

          <Route
            exact
            path="admin/portfolio/delete/:id"
            element={<PrivateRoute Component={AdminHome} />}
          />
          <Route
            exact
            path="admin/portfolio/add"
            element={<PrivateRoute Component={AdminPortfolioAdd} />}
          />
          <Route
            exact
            path="admin/portfolio/update/:id"
            element={<PrivateRoute Component={AdminPortfolioAdd} />}
          />
          <Route
            exact
            path="admin/skills"
            element={<PrivateRoute Component={AdminSkills} />}
          />
          <Route
            exact
            path="admin/skill/add"
            element={<PrivateRoute Component={AdminSkillAdd} />}
          />
          <Route
            exact
            path="admin/skill/update/:id"
            element={<PrivateRoute Component={AdminSkillAdd} />}
          />
          <Route
            exact
            path="admin/users"
            element={<PrivateRoute Component={AdminUsers} />}
          />
          <Route
            exact
            path="admin/user/add"
            element={<PrivateRoute Component={AdminUserAdd} />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<App />);
