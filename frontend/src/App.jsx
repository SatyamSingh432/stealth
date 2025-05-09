import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import LoginRegister from "./pages/LoginRegister";
import TaskManager from "./pages/TaskManager";
import { useVerifyToken } from "./hooks/useVerifyToken";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "./App.css";
function App() {
  const { isValid, email } = useVerifyToken();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LoginRegister isValid={isValid} email={email} />}
        ></Route>
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TaskManager isValid={isValid} email={email} />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
