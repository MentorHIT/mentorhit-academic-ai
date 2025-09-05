// src/components/Dashboard.tsx - Replace the entire Dashboard component

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

  const handleMenuItemClick = (pageId: string) => {
    if (["chat", "preferences", "profile"].includes(pageId)) {
      setActivePage(pageId as ActivePage);
    }
    setIsMobileMenuOpen(false);
  };

  const pageInfo = getPageInfo();

  return (
    <div className="h-screen bg-gradient-to-br from-hit-light/60 via-hit-primary/10 to-hit-secondary/10 flex flex-col overflow-hidden">
      {/* Enhanced Top Navigation Header - H.I.T COLORS */}
      <header className="relative bg-gradient-to-r from-hit-light/90 to-white/80 backdrop-blur-xl border-b border-hit-primary/30 shadow-lg z-30">
        {/* Gradient accent bar */}
        <div className={`h-1 bg-gradient-to-r ${pageInfo.gradient}`}></div>

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
                  <div className="h-12 w-12 bg-gradient-to-br from-hit-primary to-hit-secondary rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden">
                    <img
                      src="/logo-white-bg.png"
                      className="h-8 w-8 rounded-lg z-10"
                      alt="MentorHIT"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                  </div>
                </div>

                {/* Simplified centered title */}
                <div className="text-center flex-1 max-w-md mx-8">
                  <h1 className="text-2xl lg:text-3xl font-bold text-hit-dark mb-0">
                    MentorHIT
                  </h1>
                </div>
              </div>
            </div>

            {/* Right: Enhanced Navigation + User */}
            <div className="flex items-center space-x-2">
              {/* Search Button */}
              <button className="hidden md:flex p-3 text-hit-secondary hover:text-hit-primary rounded-xl hover:bg-hit-light/40 transition-all duration-200 touch-manipulation">
                <Search className="h-5 w-5" />
              </button>

              {/* Notifications - Use the new component */}
              <NotificationDropdown />

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-1 ml-4">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleMenuItemClick(item.id)}
                    className={`
                      flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 touch-manipulation relative overflow-hidden group
                      ${
                        activePage === item.id
                          ? `bg-gradient-to-r from-hit-primary to-hit-secondary text-white shadow-lg`
                          : "text-hit-secondary hover:text-hit-primary hover:bg-hit-light/40"
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
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl"></div>
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
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-400 rounded-full border-2 border-white"></div>
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

      {/* Enhanced Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Mobile Menu */}
          <div className="fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-hit-light/90 to-hit-light/70 backdrop-blur-xl shadow-2xl z-50 lg:hidden border-r border-hit-primary/20">
            <nav className="h-full flex flex-col p-6">
              {/* Close button */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="self-end p-2 text-hit-secondary hover:text-hit-primary rounded-lg transition-colors mb-6"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Logo */}
              <div className="flex items-center space-x-3 mb-8 pb-6 border-b border-hit-primary/20">
                <div className="h-12 w-12 bg-gradient-to-br from-hit-primary to-hit-secondary rounded-xl flex items-center justify-center">
                  <img
                    src="/logo-white-bg.png"
                    className="h-8 w-8 rounded-lg"
                    alt="MentorHIT"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-hit-dark">MentorHIT</h3>
                  <p className="text-sm text-hit-secondary">
                    AI Academic Advisor
                  </p>
                </div>
              </div>

              {/* Main menu items */}
              <div className="space-y-2 mb-6">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleMenuItemClick(item.id)}
                    className={`
                      w-full flex items-center space-x-4 px-5 py-4 rounded-2xl text-left transition-all duration-200 touch-manipulation
                      ${
                        activePage === item.id
                          ? "bg-gradient-to-r from-hit-primary to-hit-secondary text-white shadow-lg"
                          : "text-hit-secondary hover:text-hit-primary hover:bg-hit-light/50"
                      }
                    `}
                    style={{ minHeight: "56px" }}
                  >
                    <item.icon className="h-6 w-6" />
                    <span className="text-lg flex-1">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`
                        px-2 py-1 rounded-full text-sm font-semibold
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
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl"></div>
                    )}
                  </button>
                ))}
              </div>

              <div className="border-t border-hit-primary/20 pt-6 mt-6">
                <p className="text-xs font-bold text-hit-secondary uppercase tracking-wider mb-3 px-2">
                  More Tools
                </p>
                <div className="space-y-2">
                  {secondaryItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleMenuItemClick(item.id)}
                      className="w-full flex items-center space-x-4 px-5 py-3 rounded-xl text-left text-hit-secondary hover:text-hit-primary hover:bg-hit-light/50 transition-all duration-200 touch-manipulation"
                      style={{ minHeight: "52px" }}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="text-base flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="px-2 py-1 bg-hit-primary text-white rounded-full text-sm font-semibold">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Logout */}
              <div className="border-t border-red-200 pt-6 mt-6">
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-4 px-5 py-3 rounded-xl text-left text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 touch-manipulation"
                  style={{ minHeight: "52px" }}
                >
                  <LogOut className="h-5 w-5" />
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
