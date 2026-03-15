
import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Bookmark, BarChart3, Users, MessageSquare, Calendar, Settings, Folder, ChevronDown, UserSquare2, Users2Icon, UserRoundPlus, UserRound } from 'lucide-react';
import Api from '../Componet/Api'
import { Dropdown } from 'primereact/dropdown';
        
export default function SidebarComponent({ activeItem = 'messages', onNavigate }) {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedSections, setExpandedSections] = useState({});
    const [userName, setUserName] = useState("Loading...");
    const [userEmail, setUserEmail] = useState("");
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuOpen && !event.target.closest('.profile-menu-container')) {
                setProfileMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [profileMenuOpen]);

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

    const handleLogout = () => {
        // Clear localStorage/sessionStorage (adjust based on your auth setup)
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.clear();
        
        // Redirect to login page
        window.location.href = '/login';
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleNavClick = (item, event) => {
        event.preventDefault();
        onNavigate?.(item);
        // Close the drawer after selecting an item on mobile.
        setIsOpen(false);
    };




    return (
        <>
            {/* Mobile Hamburger Button - Only visible on mobile */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden fixed top-4 left-4 z-50 rounded-md border border-cyan-300/30 bg-slate-900/80 p-2 text-slate-100 shadow-lg backdrop-blur-md transition-colors hover:bg-slate-800/90"
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-40 bg-black/60"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:sticky top-0 left-0 h-screen border-r border-cyan-300/20 bg-linear-to-b from-[#030813]/95 via-[#071223]/90 to-[#040912]/95 backdrop-blur-xl
                    w-64 z-40 flex flex-col transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                {/* Logo Section */}
                <div className="flex items-center justify-between border-b border-cyan-300/20 px-4 py-4 h-20">
                    <div className="flex items-center gap-2">
                        <div className="hidden  lg:inline-flex h-8 w-auto items-center justify-center rounded-lg bg-linear-to-br from-cyan-400/2 to-blue-500 shadow-[0_0_12px_rgba(56,189,248,0.45)]">
                            <img src='pocket.png' alt="Logo" className= " h-15 w-15 object-contain" />
                        </div>
                        <span className="hidden text-xl font-semibold text-slate-100 lg:block">Aivon</span>
                    </div>
                    
                    <img src='pocket.png' alt="Logo" className="h-16 w-auto object-contain lg:hidden" />
                </div>

                {/* Navigation Section */}
                <div className="flex-1 overflow-y-auto py-4">
                    {/* Favorites Section */}
                    <div className="px-3 mb-4">
                        <ul className="mt-2 space-y-1">
                                <li>
                                    <a
                                        href="#messages"
                                        onClick={(event) => handleNavClick('messages', event)}
                                        className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${
                                            activeItem === 'messages'
                                                ? 'bg-cyan-500/20 text-cyan-100'
                                                : 'text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-200'
                                        }`}
                                    >
                                        <MessageSquare size={19} />
                                        <span className="font-medium">Messages</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#image-generation"
                                        onClick={(event) => handleNavClick('imageGeneration', event)}
                                        className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${
                                            activeItem === 'imageGeneration'
                                                ? 'bg-cyan-500/20 text-cyan-100'
                                                : 'text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-200'
                                        }`}
                                    >
                                        <i className="pi pi-images text-lg"></i>
                                        <span className="font-medium">Image-Generation</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" 
                                    onClick={(event)=> handleNavClick('texttoimage', event)}
                                    className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${
                                            activeItem === 'texttoimage'
                                                ? 'bg-cyan-500/20 text-cyan-100'
                                                : 'text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-200'
                                        }`}
                                    >
                                        <i className="pi pi-image text-xl"></i>
                                        <span className="font-medium">Text-to-image</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#bgremover"
                                    onClick={(event)=> handleNavClick('bgremover', event)}
                                    className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${
                                            activeItem === 'bgremover'
                                                ? 'bg-cyan-500/20 text-cyan-100'
                                                : 'text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-200'
                                        }`}
                                    >
                                        <i className="pi pi-address-book text-xl"></i>
                                        <span className="font-medium">Background remover</span>
                                    </a>
                                </li>
                                
                            </ul>
                    </div>

                    {/* Application Section */}
                    <div className="px-3 mb-4">
                        <button
                            onClick={() => toggleSection('application')}
                            className="flex w-full items-center justify-between rounded-md px-3 py-2 text-xs font-semibold text-slate-400 transition-colors hover:bg-slate-800/50 hover:text-slate-200"
                        >
                            <span>CONTRIBUTION & LINKS</span>
                            <ChevronDown
                                size={16}
                                className={`transition-transform ${expandedSections.application ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {expandedSections.application !== false && (
                            <ul className="mt-2 space-y-1">
                                <li>
                                    <a
                                        href="https://github.com/Suman0777/Aivon"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 rounded-md px-3 py-2 text-slate-300 transition-colors hover:bg-cyan-500/10 hover:text-cyan-200"
                                    >
                                    <i className="pi pi-github text-xl"></i>
                                    <span className="font-medium">Github</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 rounded-md px-3 py-2 text-slate-300 transition-colors hover:bg-cyan-500/10 hover:text-cyan-200">
                                        <Folder size={18} />
                                        <span className="font-medium">Projects</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-slate-300 transition-colors hover:bg-cyan-500/10 hover:text-cyan-200">
                                        <Settings size={18} />
                                        <span className="font-medium">Settings</span>
                                    </a>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>

                {/* User Profile Section */}
                <div className="border-t border-cyan-300/20 p-3 relative profile-menu-container">
                    <button 
                        onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                        className="w-full flex items-center gap-3 rounded-md p-3 transition-colors hover:bg-slate-800/60"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-blue-500 text-white font-semibold shadow-[0_0_12px_rgba(56,189,248,0.4)]">
                          <UserRound size={20} />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="font-bold text-slate-100 truncate">{userName}</span>
                            {userEmail && (
                                <span className="text-xs text-slate-400 truncate">{userEmail}</span>
                            )}
                        </div>
                    </button>

                    {/* Profile Menu Popup */}
                    {profileMenuOpen && (
                        <div 
                            className="absolute bottom-full right-7 mb-2 w-48 bg-slate-800/95 border border-cyan-300/30 rounded-lg shadow-xl backdrop-blur-md z-50 popup-menu"
                        >
                            <div className="p-3 space-y-2">
                                <div className="px-3 py-2 text-xs text-slate-400 font-semibold">ACCOUNT</div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-slate-300 hover:bg-red-500/20 hover:text-red-300 transition-colors text-sm"
                                >
                                    <i className="pi pi-sign-out" style={{ color: '#708090' }}></i>
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}
        