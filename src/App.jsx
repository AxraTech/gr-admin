import { useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  const [count, setCount] = useState(0);

  const ProtectedRoute = () => {
    return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route element={<ProtectedRoute/>}>
           <Route path="dashboard/*" element={<Dashboard />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
