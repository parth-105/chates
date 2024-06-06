import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from "./pages/register";
import Login from "./pages/login";
import Chat from "./pages/chat";
import Setavtar from "./pages/setavtar";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/setavtar" element={<Setavtar/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;