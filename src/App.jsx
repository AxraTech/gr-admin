import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="*" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="dashboard/*" element={<Dashboard />}></Route>
      </Routes>
    </>
  );
}

export default App;
