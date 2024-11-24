import React, { useEffect, useState } from "react";
import { ExternalLink, Copy, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { deleteUrlData, getUserUrls } from "../api/urlServices";
import { Iurl } from "../Interface/IUrl";
import toast from "react-hot-toast";
import { Globe, Link, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../app/store";
import { logoutUser } from "../app/authSlice";

export default function List() {
    const [urls, setUrls] = useState<Iurl[]>([]);
    const [sortField, setSortField] = useState<"createdAt" | "clicks">("createdAt");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
    const navigate = useNavigate();
    const user = useSelector((data: IRootState) => data?.auth?.userInfo);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const res = await getUserUrls();
            setUrls(res?.data);
        };

        fetchData();
    }, []);

    const copyUrl = (url: string) => {
        navigator.clipboard.writeText(url).then(() => {
            toast.success("Copied to clipboard");
        });
    };

    const deleteUrl = async (url: string) => {
        if (confirm("Do you want to delete ?")) {
            const res = deleteUrlData(url);
            toast.success("Url has been deleted Successfully");
            setUrls(urls.filter((data) => data.url !== url));
        }
    };

    const logout = () => {
        dispatch(logoutUser(""));
        navigate("/login");
    };

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 dark:from-gray-900 dark:to-gray-800">
            <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white dark:bg-gray-800 shadow-sm">
                <a href="/" className="flex items-center justify-center">
                    <Globe className="h-6 w-6 sm:h-8 sm:w-8 mr-2 text-purple-600 dark:text-purple-400" />
                    <span className="font-bold text-lg sm:text-xl text-purple-600 dark:text-purple-400">URL Wizard</span>
                </a>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <h1 className=" cursor-pointer text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        {user?.username[0].toUpperCase() + user?.username.slice(1)}
                    </h1>
                    <h1
                        onClick={() => navigate("/list")}
                        className="cursor-pointer text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                        My Short URLS
                    </h1>
                    <a
                        className=" cursor-pointer text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        onClick={() => navigate("/")}
                    >
                        Home
                    </a>
                    <a
                        onClick={logout}
                        className=" cursor-pointer text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                        Logout
                    </a>
                </nav>
            </header>

            {urls.length == 0 ? (
                <main className="flex-1 py-6 sm:py-12 px-4 md:px-6 lg:px-8 flex items-center justify-center">
                    <div className="max-w-md w-full space-y-8 text-center">
                        <div className="space-y-4">
                            <div className="w-20 h-20 bg-purple-200 dark:bg-purple-800 rounded-full flex items-center justify-center mx-auto">
                                <Link className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">No Shortened URLs Yet</h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300">Start shrinking those long URLs into magical short links!</p>
                        </div>
                        <a
                            onClick={() => navigate("/")}
                            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                        >
                            Create Your First Short URL
                            <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
                        </a>
                    </div>
                </main>
            ) : (
                <main className="flex-1 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                            Your Shortened URLs
                        </h1>

                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border-2 border-purple-200 dark:border-purple-800">
                            <div className="overflow-x-auto">
                                <div className="hidden sm:block">
                                    {/* Table view for larger screens */}
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-purple-500 text-white">
                                                <th className="px-4 py-2 text-left">Short URL</th>
                                                <th className="px-4 py-2 text-left">Original URL</th>

                                                <th className="px-4 py-2 text-left cursor-pointer">
                                                    <div className="flex items-center">
                                                        Created At
                                                        {sortField === "createdAt" &&
                                                            (sortDirection === "asc" ? (
                                                                <ChevronUp className="ml-1 h-4 w-4" />
                                                            ) : (
                                                                <ChevronDown className="ml-1 h-4 w-4" />
                                                            ))}
                                                    </div>
                                                </th>
                                                <th className="px-4 py-2 text-left">Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {urls.map((url) => (
                                                <tr key={url._id} className="border-t border-purple-200 dark:border-purple-800">
                                                    <td className="px-4 py-2">
                                                        <a
                                                            href={url.shortUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 flex items-center"
                                                        >
                                                            {url.shortUrl}
                                                            <ExternalLink className="ml-1 h-4 w-4" />
                                                        </a>
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <span className="truncate block max-w-xs" title={url.url}>
                                                            {url.url}
                                                        </span>
                                                    </td>

                                                    <td className="px-4 py-2">{new Date(url.createdAt).toLocaleDateString()}</td>
                                                    <td className="px-4 py-2">
                                                        <div className="flex space-x-2">
                                                            <button
                                                                onClick={() => copyUrl(url.shortUrl)}
                                                                className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200"
                                                            >
                                                                <Copy className="h-5 w-5" />
                                                            </button>
                                                            <button
                                                                onClick={() => deleteUrl(url.url)}
                                                                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                                                            >
                                                                <Trash2 className="h-5 w-5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Card view for smaller screens */}
                                <div className="sm:hidden">
                                    {urls.map((url) => (
                                        <div key={url._id} className="bg-white dark:bg-gray-800 p-4 mb-4 rounded-lg shadow-lg">
                                            <div className="flex justify-between items-center">
                                                <a
                                                    href={url.shortUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                                                >
                                                    {url.shortUrl}
                                                    <ExternalLink className="ml-1 h-4 w-4" />
                                                </a>
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                                <span className="truncate block">{url.url}</span>
                                            </div>
                                            <div className="flex space-x-2 mt-4">
                                                <button
                                                    onClick={() => copyUrl(url.shortUrl)}
                                                    className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200"
                                                >
                                                    <Copy className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => deleteUrl(url.url)}
                                                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            )}

            <footer className="py-4 sm:py-6 px-4 sm:px-6 border-t bg-white dark:bg-gray-800 shadow-inner">
                <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">© 2024 URL Wizard. All rights reserved.</p>
                    <nav className="flex gap-4 sm:gap-6">
                        <a className="text-xs sm:text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors" href="#privacy">
                            Privacy Spell
                        </a>
                        <a className="text-xs sm:text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors" href="#terms">
                            Terms of Wizardry
                        </a>
                    </nav>
                </div>
            </footer>
        </div>
    );
}
``;
