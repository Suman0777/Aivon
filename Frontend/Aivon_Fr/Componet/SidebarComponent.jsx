
import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Bookmark, BarChart3, Users, MessageSquare, Calendar, Settings, Folder, ChevronDown, UserSquare2, Users2Icon, UserRoundPlus, UserRound } from 'lucide-react';
import Api from '../Componet/Api'

export default function SidebarComponent() {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedSections, setExpandedSections] = useState({});
    const [userName, setUserName] = useState("Loading...");
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    const fetchCurrentUser = async () => {
        try {
            console.log("Fetching current user...");
            const response = await Api.get("/api/v1/user/me");
            console.log("User data received:", response.data);
            if (response.data && response.data.user) {
                setUserName(response.data.user.name);
                setUserEmail(response.data.user.email);
            } else {
                console.error("Invalid response structure:", response.data);
                setUserName("User");
            }
        } catch (error) {
            console.error("Failed to fetch user info:", error);
            console.error("Error response:", error.response?.data);
            setUserName("User");
        }
    };

    const getInitials = (name) => {
        if (!name || name === "Loading...") return "U";
        const names = name.split(" ");
        if (names.length >= 2) {
            return (names[0][0] + names[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };
    
    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };




    return (
        <>
            {/* Mobile Hamburger Button - Only visible on mobile */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/20 bg-opacity-100 z-40"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 
                    w-64 z-40 flex flex-col transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                {/* Logo Section */}
                <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-black font-bold text-xl">A</span>
                        </div>
                        <span className="font-semibold text-xl text-gray-800">Aivon</span>
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className="lg:hidden p-1 hover:bg-gray-100 rounded"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation Section */}
                <div className="flex-1 overflow-y-auto py-4">
                    {/* Favorites Section */}
                    <div className="px-3 mb-4">
                        <button
                            onClick={() => toggleSection('favorites')}
                            className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                        >
                            <span>FAVORITES</span>
                            <ChevronDown
                                size={16}
                                className={`transition-transform ${expandedSections.favorites ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {expandedSections.favorites !== false && (
                            <ul className="mt-2 space-y-1">
                                <li>
                                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                                        <Home size={18} />
                                        <span className="font-medium">Dashboard</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                                        <Bookmark size={18} />
                                        <span className="font-medium">Bookmarks</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                                        <BarChart3 size={18} />
                                        <span className="font-medium">Reports</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                                        <Users size={18} />
                                        <span className="font-medium">Team</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                                        <MessageSquare size={18} />
                                        <span className="font-medium">Messages</span>
                                        <span className="ml-auto bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            3
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                                        <Calendar size={18} />
                                        <span className="font-medium">Calendar</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                                        <Settings size={18} />
                                        <span className="font-medium">Settings</span>
                                    </a>
                                </li>
                            </ul>
                        )}
                    </div>

                    {/* Application Section */}
                    <div className="px-3 mb-4">
                        <button
                            onClick={() => toggleSection('application')}
                            className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                        >
                            <span>APPLICATION</span>
                            <ChevronDown
                                size={16}
                                className={`transition-transform ${expandedSections.application ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {expandedSections.application !== false && (
                            <ul className="mt-2 space-y-1">
                                <li>
                                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                                        <Folder size={18} />
                                        <span className="font-medium">Projects</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                                        <BarChart3 size={18} />
                                        <span className="font-medium">Performance</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                                        <Settings size={18} />
                                        <span className="font-medium">Settings</span>
                                    </a>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>

                {/* User Profile Section */}
                <div className="border-t border-gray-200 p-3">
                    <a href="#" className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md transition-colors">
                        <div className="w-5 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                          <  UserRound size={20} />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="font-bold text-gray-800 truncate">{userName}</span>
                            {userEmail && (
                                <span className="text-xs text-gray-500 truncate">{userEmail}</span>
                            )}
                        </div>
                    </a>
                </div>
            </aside>
        </>
    );
}
        