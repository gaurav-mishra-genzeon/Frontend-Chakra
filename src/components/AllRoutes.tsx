// import React from 'react'
import { Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Edit from "./Edit";

// import PrivateRoute from './PrivateRoute'

export default function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/dashboard/:id" element={<Edit/>} />
      </Routes>
    </>
  );
}
