import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { Auth } from "./pages/Auth";
import { Login } from "./pages/Login";

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/auth"
        element={
          <ProtectedRoute>
            <Auth />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <h1>Home</h1>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
