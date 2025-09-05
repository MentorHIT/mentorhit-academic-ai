import React, { useState, useEffect } from "react";
import {
  Bell,
  Search,
  Calendar,
  ChevronDown,
  Sun,
  Moon,
  Globe,
  Settings,
  User,
  Sparkles,
  TrendingUp,
  Clock,
  Target,
} from "lucide-react";
import Sidebar from "./layout/Sidebar";
import ChatInterface from "./chat/ChatInterface";
import PreferencesQuiz from "./preferences/PreferencesQuiz";
import UserProfile from "./profile/UserProfile";
import { useAuth } from "../context/AuthContext";

type ActivePage = "chat" | "preferences" | "profile";

const Dashboard = () => {
  const [activePage, setActivePage] = useState<ActivePage>("chat");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [language, setLanguage] = useState<"he" | "en">("he");
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useAuth();

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const renderPage = () => {
    switch (activePage) {
      case "chat":
        return <ChatInterface />;
      case "preferences":
        return <PreferencesQuiz />;
      case "profile":
        return <UserProfile />;
      default:
        return <ChatInterface />;
    }
  };

  const getPageInfo = () => {
    const pageMap = {
      chat: {
        title: "MentorHIT Academic Assistant",
        subtitle: "Your AI-powered guide to academic excellence",
        icon: Sparkles,
        color: "hit-primary",
      },
      preferences: {
        title: "MentorHIT Preferences",
        subtitle: "Customize your personalized learning experience",
        icon: Target,
        color: "hit-secondary",
      },
      profile: {
        title: "MentorHIT Profile",
        subtitle: "Track your academic journey and achievements",
        icon: TrendingUp,
        color: "hit-dark",
      },
    };
    return pageMap[activePage];
  };

  const currentTime = new Date().toLocaleString("he-IL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const pageInfo = getPageInfo();
  const PageIcon = pageInfo.icon;

  // Mock notifications for demonstration
  const notifications = [
    {
      id: 1,
      text: "Your machine learning course registration opens tomorrow",
      time: "2h ago",
      type: "info",
    },
    {
      id: 2,
      text: "New AI research opportunities available",
      time: "1d ago",
      type: "success",
    },
    {
      id: 3,
      text: "Grade update: Data Structures - 95%",
      time: "2d ago",
      type: "achievement",
    },
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 via-white to-hit-light/30 dark:from-gray-900 dark:via-gray-800 dark:to-hit-dark/30 flex overflow-hidden transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebar}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          isSidebarCollapsed ? "lg:ml-20" : "lg:ml-0"
        }`}
      >
        {/* Enhanced Header */}
        <header className="flex-shrink-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/60 dark:border-gray-700/60 shadow-sm transition-colors duration-300">
          <div className="px-4 lg:px-8 py-4">
            {/* Top Row - Page Info & Actions */}
            <div className="flex items-center justify-between mb-4">
              {/* Page Title Section */}
              <div className="flex items-center space-x-4 ml-12 lg:ml-0">
                <div
                  className={`
                  h-12 w-12 bg-${pageInfo.color}/10 dark:bg-${pageInfo.color}/20 rounded-2xl flex items-center justify-center
                  border border-${pageInfo.color}/20 dark:border-${pageInfo.color}/30 shadow-sm
                `}
                >
                  <PageIcon className={`h-6 w-6 text-${pageInfo.color}`} />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                    <span>{pageInfo.title}</span>
                    {activePage === "chat" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-hit-primary/10 text-hit-primary border border-hit-primary/20">
                        AI Powered
                      </span>
                    )}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 text-base mt-1">
                    {pageInfo.subtitle}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-64 pl-10 pr-4 py-2 bg-gray-50/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-hit-primary/20 focus:border-hit-primary transition-all duration-200 text-sm dark:text-gray-200"
                  />
                </div>

                {/* Language Toggle */}
                <button
                  onClick={() => setLanguage(language === "he" ? "en" : "he")}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-50/80 dark:bg-gray-800/80 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 border border-gray-200 dark:border-gray-600 rounded-xl transition-all duration-200 text-sm font-medium"
                >
                  <Globe className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {language === "he" ? "עב" : "EN"}
                  </span>
                </button>

                {/* Theme Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 bg-gray-50/80 dark:bg-gray-800/80 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 border border-gray-200 dark:border-gray-600 rounded-xl transition-all duration-200"
                >
                  {isDarkMode ? (
                    <Sun className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <Moon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  )}
                </button>

                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 bg-gray-50/80 dark:bg-gray-800/80 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 border border-gray-200 dark:border-gray-600 rounded-xl transition-all duration-200"
                  >
                    <Bell className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white dark:border-gray-900">
                      {notifications.length}
                    </span>
                  </button>

                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <>
                      {/* Backdrop to close notifications */}
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowNotifications(false)}
                      />
                      <div className="absolute right-0 top-full mt-2 w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-200 dark:border-gray-600 rounded-2xl shadow-2xl z-50">
                        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                            Notifications
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            You have {notifications.length} new updates
                          </p>
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                          {notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className="p-4 border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                            >
                              <p className="text-sm text-gray-900 dark:text-gray-100 mb-1">
                                {notification.text}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {notification.time}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className="p-3 border-t border-gray-100 dark:border-gray-700">
                          <button className="w-full text-sm text-hit-primary hover:text-hit-secondary font-medium transition-colors">
                            View all notifications
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* User Profile Dropdown */}
                <div className="relative group">
                  <button className="flex items-center space-x-3 px-3 py-2 bg-gray-50/80 dark:bg-gray-800/80 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 border border-gray-200 dark:border-gray-600 rounded-xl transition-all duration-200">
                    <div className="h-8 w-8 bg-hit-primary rounded-full flex items-center justify-center overflow-hidden shadow-sm">
                      {user?.name.includes("noy") ? (
                        <img
                          src="noy.png"
                          alt="User"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className="text-right hidden md:block">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-24">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {user?.studentId}
                      </p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                  </button>

                  {/* User Dropdown */}
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-200 dark:border-gray-600 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
                    <div className="p-2">
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center space-x-2">
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row - Status & Quick Info */}
            <div className="flex items-center justify-between text-sm">
              {/* Status Bar */}
              <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>System Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span className="hidden sm:block">{currentTime}</span>
                </div>
                {activePage === "chat" && (
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-hit-primary" />
                    <span>AI Assistant Ready</span>
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                <div className="hidden lg:flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-500" />
                  <span>GPA: 3.8</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-500" />
                  <span className="hidden sm:block">Semester 4/8</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full">{renderPage()}</div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
