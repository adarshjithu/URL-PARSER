import React, { useEffect, useState } from "react";
import { Globe, User, Lock, Mail } from "lucide-react";
import { userSignup } from "../api/userServices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../app/store";
import { setUserCredential } from "../app/authSlice";

export default function Signup() {
    const [signupData, setSignupData] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState({ username: "", email: "", password: "" });
    const handleChange = (e: any) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
        setError({ username: "", email: "", password: "" });
    };
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((data: IRootState) => data?.auth.userInfo);

    const validateForm = () => {
        const newErrors = {
            email: "",
            username: "",
            password: "",
        };
        let isValid = true;

        // Email validation
        if (!signupData.email) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
            newErrors.email = "Email is invalid";
            isValid = false;
        }

        // Username validation
        if (!signupData.username) {
            newErrors.username = "Username is required";
            isValid = false;
        } else if (!/^[a-zA-Z0-9_]{3,15}$/.test(signupData.username)) {
            newErrors.username = "Username must be 3-15 characters and can only contain letters, numbers, and underscores";
            isValid = false;
        }

        // Password validation
        if (!signupData.password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (signupData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
            isValid = false;
        }

        setError(newErrors);
        return isValid;
    };

    useEffect(() => {
        if (user) navigate("/");
    }, [user]);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const res = await userSignup(signupData);
                if (res?.data?.success) {
                    toast.success(res?.data?.message);
                    const user = { ...res?.data?.user, token: res?.data?.token };
                    localStorage.setItem("url-parser-token",res?.data?.token)
                    dispatch(setUserCredential(user));
                    navigate("/");
                }
            } catch (error: any) {
                toast.error(error?.response?.data?.message);
            }
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 dark:from-gray-900 dark:to-gray-800">
            <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white dark:bg-gray-800 shadow-sm">
                <a href="/" className="flex items-center justify-center">
                    <Globe className="h-8 w-8 mr-2 text-purple-600 dark:text-purple-400" />
                    <span className="font-bold text-xl text-purple-600 dark:text-purple-400">URL Wizard</span>
                </a>
            </header>
            <main className="flex-1 py-12 px-4 md:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                        Welcome to URL Wizard
                    </h1>

                    {/* Signup Form */}
                    <div className="w-full flex flex-row justify-center">
                        <div className="w-[50%] bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border-2 border-purple-200 dark:border-purple-800">
                            <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4">
                                <h2 className="text-2xl font-bold">Sign Up</h2>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <label htmlFor="signup-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Username
                                    </label>
                                    {error.username && <div style={{ color: "red" }}>{error.username}</div>}
                                    <div className="relative">
                                        <input
                                            id="signup-name"
                                            type="text"
                                            className="w-full px-3 py-2 border-2 border-purple-200 focus:border-purple-500 dark:border-purple-800 dark:focus:border-purple-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white pl-10"
                                            value={signupData.username}
                                            onChange={handleChange}
                                            name="username"
                                        />
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-500" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="signup-username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Email
                                    </label>
                                    {error.email && <div style={{ color: "red" }}>{error.email}</div>}
                                    <div className="relative">
                                        <input
                                            id="signup-username"
                                            type="text"
                                            name="email"
                                            className="w-full px-3 py-2 border-2 border-purple-200 focus:border-purple-500 dark:border-purple-800 dark:focus:border-purple-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white pl-10"
                                            value={signupData.email}
                                            onChange={handleChange}
                                        />
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-500" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Password
                                    </label>
                                    {error.password && <div style={{ color: "red" }}>{error.password}</div>}
                                    <div className="relative">
                                        <input
                                            id="signup-password"
                                            type="password"
                                            name="password"
                                            className="w-full px-3 py-2 border-2 border-purple-200 focus:border-purple-500 dark:border-purple-800 dark:focus:border-purple-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white pl-10"
                                            value={signupData.password}
                                            onChange={handleChange}
                                        />
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-500" />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
                                >
                                    Sign Up
                                </button>
                                <button
                                    onClick={() => navigate("/login")}
                                    type="submit"
                                    className="w-full px-4 py-2 bg-gray-600 hover:bg-purple-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
                                >
                                    Already Have Account
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="py-6 px-4 md:px-6 border-t bg-white dark:bg-gray-800 shadow-inner">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                    <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 URL Wizard. All rights reserved.</p>
                    <nav className="flex gap-4 sm:gap-6">
                        <a className="text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors" href="#privacy">
                            Privacy Spell
                        </a>
                        <a className="text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors" href="#terms">
                            Terms of Wizardry
                        </a>
                    </nav>
                </div>
            </footer>
        </div>
    );
}
