import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import List from "./Pages/List";

function App() {
    return (
        <div className="app">
            <Toaster/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/list" element={<List />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
