import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import LoginRegister from "./pages/LoginRegister";
import TaskManager from "./pages/TaskManager";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LoginRegister
            // isAdmin={isAdmin}
            // isValid={isValid}
            // username={username}
            />
          }
        ></Route>
        <Route
          path="/tasks"
          element={
            <TaskManager
            // isAdmin={isAdmin}
            // isValid={isValid}
            // username={username}
            />
          }
        ></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
