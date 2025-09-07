// src/components/Dashboard.tsx - FIXED MOBILE NAVIGATION

import React, { useState } from "react";
import {
  MessageCircle,
  Settings,
  User,
  Menu,
  X,
  LogOut,
  Home,
  BookOpen,
  Award,
  HelpCircle,
  Bell,
  Search,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import ChatInterface from "./chat/ChatInterface";
import PreferencesQuiz from "./preferences/PreferencesQuiz";
import UserProfile from "./profile/UserProfile";
import NotificationDropdown from "./layout/NotificationDropdown";
import { useAuth } from "../context/AuthContext";

type ActivePage = "chat" | "preferences" | "profile";

const Dashboard = () => {
  const [activePage, setActivePage] = useState<ActivePage>("chat");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const menuItems = [
    {
      id: "chat",
      label: "Academic Chat",
      icon: MessageCircle,
      badge: "AI",
      color: "hit-primary",
    },
    {
      id: "preferences",
      label: "Preferences",
      icon: Settings,
      badge: !user?.hasCompletedQuiz ? "New" : null,
      color: "hit-secondary",
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      badge: null,
      color: "hit-dark",
    },
  ];

  const secondaryItems = [
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "achievements", label: "Achievements", icon: Award, badge: "12" },
    { id: "help", label: "Help", icon: HelpCircle },
  ];

  const renderPage = () => {
    console.log("Rendering page:", activePage); // Debug log - remove later

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
    switch (activePage) {
      case "chat":
        return {
          title: "MentorHIT",
          subtitle: "Your AI-powered guide to academic excellence",
          gradient: "from-hit-primary to-hit-secondary",
        };
      case "preferences":
        return {
          title: "Customize Experience",
          subtitle: "Personalize your learning journey",
          gradient: "from-hit-secondary to-hit-dark",
        };
      case "profile":
        return {
          title: "Academic Journey",
          subtitle: "Track your progress and achievements",
          gradient: "from-hit-dark to-hit-primary",
        };
      default:
        return {
          title: "MentorHIT",
          subtitle: "Your AI-powered guide to academic excellence",
          gradient: "from-hit-primary to-hit-secondary",
        };
    }
  };

  // ✅ FIXED NAVIGATION FUNCTION with event handling
  const handleMenuItemClick = (e: React.MouseEvent, pageId: string) => {
    e.preventDefault();
    e.stopPropagation(); // ✅ PREVENT EVENT BUBBLING TO BACKDROP

    console.log("Navigating to:", pageId); // Debug log

    if (["chat", "preferences", "profile"].includes(pageId)) {
      setActivePage(pageId as ActivePage);
      console.log("Active page set to:", pageId); // Debug log
    }

    // Add small delay to ensure state update before closing menu
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      console.log("Mobile menu closed"); // Debug log
    }, 100);
  };

  // ✅ SEPARATE BACKDROP CLICK HANDLER
  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking the backdrop itself, not its children
    if (e.target === e.currentTarget) {
      setIsMobileMenuOpen(false);
    }
  };

  const pageInfo = getPageInfo();

  return (
    <div className="h-screen bg-gradient-to-br from-hit-light/60 via-hit-primary/10 to-hit-secondary/10 flex flex-col overflow-hidden">
      {/* Enhanced Top Navigation Header - H.I.T COLORS */}
      <header className="relative bg-gradient-to-r from-hit-light/90 to-white/80 backdrop-blur-xl border-b border-hit-primary/30 shadow-lg z-30">
        {/* Gradient accent bar */}
        <div className={`h-1 bg-gradient-to-r ${pageInfo.gradient}`} />

        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Enhanced Logo + Menu */}
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-3 text-hit-secondary hover:text-hit-primary rounded-xl hover:bg-hit-light/40 transition-all duration-200 touch-manipulation group"
                style={{ minHeight: "48px", minWidth: "48px" }}
              >
                <Menu className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </button>

              {/* Enhanced MentorHIT Logo + Brand */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden">
                    <img
                      src="/logo-white-bg.png"
                      className="h-10 w-10 rounded-xl z-10"
                      alt="MentorHIT"
                    />
                    {/* Animated glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                  </div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl md:text-2xl font-bold text-hit-dark tracking-tight">
                    {pageInfo.title}
                  </h1>
                  <p className="text-sm text-hit-secondary">
                    {pageInfo.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Desktop Navigation + User */}
            <div className="flex items-center space-x-6">
              {/* Enhanced Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-3">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={(e) => handleMenuItemClick(e, item.id)}
                    className={`
                      relative flex items-center space-x-3 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-200 group touch-manipulation overflow-hidden
                      ${
                        activePage === item.id
                          ? "bg-gradient-to-r from-hit-primary to-hit-secondary text-white shadow-lg scale-105"
                          : "text-hit-secondary hover:text-hit-primary hover:bg-hit-light/50 hover:scale-105"
                      }
                    `}
                    style={{ minHeight: "48px" }}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="hidden lg:block">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`
                        px-2 py-1 rounded-full text-xs font-bold
                        ${
                          activePage === item.id
                            ? "bg-white/20 text-white"
                            : "bg-hit-primary text-white"
                        }
                      `}
                      >
                        {item.badge}
                      </span>
                    )}
                    {activePage === item.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl pointer-events-none" />
                    )}
                  </button>
                ))}
              </nav>

              {/* Enhanced User Avatar */}
              <div className="relative group ml-4">
                <button className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-hit-light/50 to-hit-light/30 hover:from-hit-light/70 hover:to-hit-light/50 border border-hit-primary/30 rounded-xl transition-all duration-200 backdrop-blur-sm">
                  <div className="h-10 w-10 bg-gradient-to-br from-hit-primary to-hit-secondary rounded-full flex items-center justify-center shadow-md overflow-hidden relative">
                    {user?.name.includes("noy") ? (
                      <img
                        src="noy.png"
                        alt="User"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5 text-white" />
                    )}
                    {/* Online indicator */}
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-400 rounded-full border-2 border-white" />
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold text-hit-dark truncate max-w-24">
                      {user?.name}
                    </p>
                    <p className="text-xs text-hit-secondary">
                      ID: {user?.studentId}
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-hit-secondary group-hover:text-hit-primary transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ✅ FIXED Mobile Navigation Overlay with proper z-index stacking */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop with highest z-index for mobile */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] lg:hidden"
            onClick={handleBackdropClick}
          />

          {/* Mobile Menu with proper positioning and z-index */}
          <div
            className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-hit-light/95 to-hit-light/85 backdrop-blur-xl shadow-2xl z-[70] lg:hidden border-r border-hit-primary/20 transform transition-transform duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
            style={{
              transform: isMobileMenuOpen
                ? "translateX(0)"
                : "translateX(-100%)",
            }}
          >
            <nav className="h-full flex flex-col p-4 sm:p-6 overflow-y-auto">
              {/* Close button with proper spacing */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-hit-secondary hover:text-hit-primary rounded-lg transition-colors bg-white/20 hover:bg-white/30"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Logo section with better spacing */}
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-hit-primary/20">
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-hit-primary to-hit-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                  <img
                    src="/logo-white-bg.png"
                    className="h-6 w-6 sm:h-8 sm:w-8 rounded-lg"
                    alt="MentorHIT"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-hit-dark truncate">
                    MentorHIT
                  </h3>
                  <p className="text-xs sm:text-sm text-hit-secondary truncate">
                    AI Academic Advisor
                  </p>
                </div>
              </div>

              {/* ✅ FIXED Main menu items with proper spacing */}
              <div className="space-y-1 mb-6 flex-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={(e) => handleMenuItemClick(e, item.id)}
                    className={`
                relative w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 touch-manipulation overflow-hidden group
                ${
                  activePage === item.id
                    ? "bg-gradient-to-r from-hit-primary to-hit-secondary text-white shadow-lg scale-[1.02]"
                    : "text-hit-secondary hover:text-hit-primary hover:bg-hit-light/60 hover:scale-[1.01]"
                }
              `}
                    style={{ minHeight: "52px" }}
                  >
                    <item.icon className="h-5 w-5 sm:h-6 sm:w-6 relative z-10 flex-shrink-0" />
                    <span className="text-base sm:text-lg flex-1 relative z-10 truncate font-medium">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span
                        className={`
                    px-2 py-1 rounded-full text-xs sm:text-sm font-semibold relative z-10 flex-shrink-0
                    ${
                      activePage === item.id
                        ? "bg-white/20 text-white"
                        : "bg-hit-primary text-white"
                    }
                  `}
                      >
                        {item.badge}
                      </span>
                    )}
                    {/* Subtle hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </button>
                ))}
              </div>

              {/* Secondary items with proper sections */}
              <div className="border-t border-hit-primary/20 pt-4 mt-4">
                <p className="text-xs font-bold text-hit-secondary/80 uppercase tracking-wider mb-3 px-2">
                  More Tools
                </p>
                <div className="space-y-1 mb-6">
                  {secondaryItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={(e) => handleMenuItemClick(e, item.id)}
                      className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-left text-hit-secondary hover:text-hit-primary hover:bg-hit-light/50 transition-all duration-200 touch-manipulation group"
                      style={{ minHeight: "48px" }}
                    >
                      <item.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                      <span className="text-sm sm:text-base flex-1 truncate">
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="px-2 py-1 bg-hit-primary text-white rounded-full text-xs font-semibold flex-shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Logout at bottom */}
              <div className="border-t border-red-200/50 pt-4 mt-auto">
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-red-600 hover:text-red-700 hover:bg-red-50/50 transition-all duration-200 touch-manipulation group"
                  style={{ minHeight: "50px" }}
                >
                  <LogOut className="h-5 w-5 flex-shrink-0" />
                  <span className="text-base font-semibold">Sign Out</span>
                </button>
              </div>
            </nav>
          </div>
        </>
      )}

      {/* Main Content Area with H.I.T colors */}
      <main className="flex-1 overflow-hidden bg-gradient-to-br from-hit-light/30 to-white/20">
        <div className="h-full">{renderPage()}</div>
      </main>
    </div>
  );
};

export default Dashboard;
