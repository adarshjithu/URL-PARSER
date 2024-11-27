import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import List from "./Pages/List";
import InternalServerError from "./Components/InternalServerError";
import PageNotFound from "./Components/PageNotFound";

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
                    <Route path="/internal-server-error" element={<InternalServerError />} />
                    <Route path="/page-not-found" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
