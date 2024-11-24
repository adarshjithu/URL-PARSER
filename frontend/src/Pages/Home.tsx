import React, { useEffect, useState } from "react";
import { Globe, Zap, Info, Mail, Lock, FileText } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../app/store";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../app/authSlice";
import toast from "react-hot-toast";
import { createShortUrl } from "../api/urlServices";
import Loading from "../Components/Loading";

interface ParsedURL {
    protocol: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
}

export default function HomePage() {
    const [url, setUrl] = useState<string>("");
    const [parsedURL, setParsedURL] = useState<any>(null);
    const user = useSelector((data: IRootState) => data?.auth?.userInfo);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading,setLoading] = useState<boolean>(false)

    const parseURL = () => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            toast.error("Invalid Url");
            return false;
        }
    };

    const submitUrl = async () => {
        setLoading(true)
        setParsedURL(null)
        if (parseURL()) {
            try {
                const res = await createShortUrl(url);
                setParsedURL(res?.data?.shortUrl);
                setLoading(false)
               
                toast.success(res?.data?.shortUrl)
            } catch (error: any) {
                toast.error(error?.response?.data?.message);
                setLoading(false)
            }
        }
    };

    useEffect(() => {
        if (!user) navigate("/login");
    }, [user]);

    const logout = () => {
        dispatch(logoutUser(""));
    };
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 dark:from-gray-900 dark:to-gray-800">
            <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white dark:bg-gray-800 shadow-sm">
                <a href="/" className="flex items-center justify-center">
                    <Globe className="h-8 w-8 mr-2 text-purple-600 dark:text-purple-400" />
                    <span className="font-bold text-xl text-purple-600 dark:text-purple-400">URL Wizard</span>
                </a>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <h1 className=" cursor-pointer text-sm font-lg hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        {user?.username.toUpperCase()}
                    </h1>
                    <h1 onClick={()=>navigate('/list')} className="cursor-pointer text-sm font-lg hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      MY URLS
                    </h1>
                    <a className=" cursor-pointer text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors" onClick={()=>navigate("/")}>HOME</a>
                    <a onClick={logout} className= " cursor-pointer text-sm font-lg hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                       LOGOUT
                    </a>
                </nav>
            </header>
            <main className="flex-1 py-12 px-4 md:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                            URL Wizard
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300">Unravel the mystery of URLs with our magical parser!</p>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border-2 border-purple-200 dark:border-purple-800">
                        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4">
                            <h2 className="text-2xl font-bold">Long URL</h2>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="url-input" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                                    Enter URL
                                </label>
                                <div className="flex space-x-2">
                                    <input
                                        id="url-input"
                                        type="text"
                                        placeholder="https://example.com"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        className="flex-1 px-3 py-2 border-2 border-purple-200 focus:border-purple-500 dark:border-purple-800 dark:focus:border-purple-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                                    />
                                    <button
                                        onClick={submitUrl}
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
                                    >
                                         {loading?<Loading/>:'Shorten URL'}
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    
                  { parsedURL&& <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border-2 border-purple-200 dark:border-purple-800">
                        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4">
                            <h2 className="text-2xl font-bold">Short URL</h2>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="url-input" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                                    Enter URL
                                </label>
                                <div className="flex space-x-2">
                                    <input
                                        id="url-input"
                                        type="text"
                                        placeholder="https://example.com"
                                        value={parsedURL}
                                       
                                        className="flex-1 px-3 py-2 border-2 border-purple-200 focus:border-purple-500 dark:border-purple-800 dark:focus:border-purple-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                                    />
                                    <button
                                        onClick={()=>{
                                            navigator.clipboard.writeText(parsedURL).then(()=>{
                                                toast.success("Copied To Clipboard")
                                            })
                                        }}
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
                                    >
                                        Copy
                                    </button>
                                    <a
                                    href={parsedURL}
                                        
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
                                    >
                                        Visit
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>}
                    
                  
                </div>
            </main>
            <footer className="py-6 px-4 md:px-6 border-t bg-white dark:bg-gray-800 shadow-inner">
                <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                    <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 URL Wizard. All rights reserved.</p>
                    <nav className="flex gap-4 sm:gap-6">
                        <a className="text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors" href="#privacy">
                           
                        </a>
                        <a className="text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors" href="#terms">
                           
                        </a>
                    </nav>
                </div>
            </footer>
        </div>
    );
}
