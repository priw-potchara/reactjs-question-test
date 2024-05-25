import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import QuestionPage from "../pages/question";
import LeaderboardPage from "../pages/leaderboard";
import { WebProvider } from "../provider";

export default function CoreRouter() {
  //==============================
  const basePath = process.env.REACT_APP_BASE_PATH || "/";
  //==============================

  return (
    <WebProvider>
      <BrowserRouter basename={basePath}>
        <Routes>
          {/* ==================== */}
          <Route path="/question" element={<QuestionPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          {/* ==================== */}
          <Route path="" element={<Navigate to={`/question`} />} />
          <Route path="*" element={<Navigate to={`/question`} />} />
          {/* ==================== */}
        </Routes>
      </BrowserRouter>
    </WebProvider>
  );
}
