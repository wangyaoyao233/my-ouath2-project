import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Callback } from "./pages/Callback";

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>{localStorage.getItem("token")}</h1>} />
      <Route path="/login" element={<Login />} />
      <Route path="/callback" element={<Callback />} />
    </Routes>
  );
};
