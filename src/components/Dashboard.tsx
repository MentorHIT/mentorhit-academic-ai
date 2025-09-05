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
          title: "MentorHIT Academic Assistant",
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
          title: "MentorHIT Academic Assistant",
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
    <div className="h-screen bg-gradient-to-br from-hit-light/20 via-white to-gray-50/50 flex flex-col overflow-hidden">
      {/* Enhanced Top Navigation Header */}
      <header className="relative bg-white/95 backdrop-blur-xl border-b border-hit-primary/10 shadow-lg z-30">
        {/* Gradient accent bar */}
        <div className={`h-1 bg-gradient-to-r ${pageInfo.gradient}`}></div>

        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Enhanced Logo + Menu */}
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-3 text-hit-secondary hover:text-hit-primary rounded-xl hover:bg-hit-light/30 transition-all duration-200 touch-manipulation group"
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
                      alt="MentorHIT Logo"
                      className="h-8 w-8 rounded-lg z-10"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        target.nextElementSibling?.classList.remove("hidden");
                      }}
                    />
                    <div className="hidden">
                      <Sparkles className="h-7 w-7 text-white" />
                    </div>
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                  </div>
                  {/* Status indicator */}
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-hit-dark to-hit-primary bg-clip-text text-transparent">
                    MentorHIT
                  </h1>
                  <p className="text-sm text-hit-secondary font-medium hidden sm:block">
                    AI Academic Advisor
                  </p>
                </div>
              </div>
            </div>

            {/* Center: Enhanced Page Info */}
            <div className="hidden lg:block text-center flex-1 max-w-md mx-8">
              <h2 className="text-xl font-bold text-hit-dark mb-1">
                {pageInfo.title}
              </h2>
              <p className="text-sm text-hit-secondary">{pageInfo.subtitle}</p>
            </div>

            {/* Right: Enhanced Navigation + User */}
            <div className="flex items-center space-x-2">
              {/* Search Button */}
              <button className="hidden md:flex p-3 text-hit-secondary hover:text-hit-primary rounded-xl hover:bg-hit-light/30 transition-all duration-200 touch-manipulation">
                <Search className="h-5 w-5" />
              </button>

              {/* Notifications */}
              <button className="relative p-3 text-hit-secondary hover:text-hit-primary rounded-xl hover:bg-hit-light/30 transition-all duration-200 touch-manipulation">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

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
                          ? `bg-gradient-to-r from-${item.color} to-${item.color}/80 text-white shadow-lg`
                          : "text-hit-secondary hover:text-hit-primary hover:bg-hit-light/30"
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
                <button className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-hit-light/30 to-white/50 hover:from-hit-light/50 hover:to-white/70 border border-hit-primary/20 rounded-xl transition-all duration-200 backdrop-blur-sm">
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
          {/* Backdrop with blur */}
          <div
            className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-md z-40 transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Enhanced Mobile Menu */}
          <div className="md:hidden fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white/95 backdrop-blur-xl shadow-2xl z-50 transform transition-transform duration-300">
            {/* Mobile Menu Header */}
            <div className="p-6 bg-gradient-to-r from-hit-primary to-hit-secondary text-white relative overflow-hidden">
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <img
                      src="/logo-white-bg.png"
                      alt="MentorHIT"
                      className="h-8 w-8 rounded-lg"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">MentorHIT</h2>
                    <p className="text-sm text-white/80">AI Academic Advisor</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors touch-manipulation"
                  style={{ minHeight: "44px", minWidth: "44px" }}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            </div>

            {/* Enhanced Mobile Menu Items */}
            <nav className="p-6 space-y-3">
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleMenuItemClick(item.id)}
                    className={`
                      w-full flex items-center space-x-4 px-5 py-4 rounded-2xl text-left font-semibold transition-all duration-200 touch-manipulation relative overflow-hidden group
                      ${
                        activePage === item.id
                          ? `bg-gradient-to-r from-${item.color} to-${item.color}/80 text-white shadow-lg`
                          : "text-hit-secondary hover:text-hit-primary hover:bg-hit-light/50"
                      }
                    `}
                    style={{ minHeight: "60px" }}
                  >
                    <item.icon className="h-6 w-6 flex-shrink-0" />
                    <span className="text-lg flex-1">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`
                        px-3 py-1 rounded-full text-sm font-bold
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

      {/* Main Content Area with enhanced spacing */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full">{renderPage()}</div>
      </main>
    </div>
  );
};

export default Dashboard;
