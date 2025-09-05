import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Settings,
  User,
  X,
  Menu,
  ChevronRight,
  BookOpen,
  Target,
  TrendingUp,
  Calendar,
  Award,
  HelpCircle,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

type ActivePage = "chat" | "preferences" | "profile";

interface SidebarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  description: string;
  badge?: string;
  isNew?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  setActivePage,
  isCollapsed,
  onToggleCollapse,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  // Menu items with enhanced metadata
  const menuItems: MenuItem[] = [
    {
      id: "chat",
      label: "Academic Chat",
      icon: MessageSquare,
      description: "AI-powered academic guidance",
      badge: "AI",
    },
    {
      id: "preferences",
      label: "Preferences",
      icon: Target,
      description: "Customize your experience",
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      description: "Your academic journey",
      badge: "94%",
    },
  ];

  const secondaryItems: MenuItem[] = [
    {
      id: "courses",
      label: "Course Planning",
      icon: BookOpen,
      description: "Plan your semester",
      isNew: true,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: TrendingUp,
      description: "Track your progress",
    },
    {
      id: "schedule",
      label: "Schedule",
      icon: Calendar,
      description: "Manage your time",
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: Award,
      description: "Your milestones",
      badge: "12",
    },
  ];

  const bottomItems: MenuItem[] = [
    {
      id: "help",
      label: "Help & Support",
      icon: HelpCircle,
      description: "Get assistance",
    },
  ];

  const handleMenuItemClick = (pageId: string) => {
    if (["chat", "preferences", "profile"].includes(pageId)) {
      setActivePage(pageId as ActivePage);
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const MenuItem = ({
    item,
    isActive = false,
  }: {
    item: MenuItem;
    isActive?: boolean;
  }) => (
    <button
      onClick={() => handleMenuItemClick(item.id)}
      className={`
        group relative w-full flex items-center transition-all duration-300 ease-in-out
        ${
          isCollapsed
            ? "justify-center px-3 py-4"
            : "px-4 py-3 space-x-3 space-x-reverse"
        }
        rounded-xl font-medium text-sm
        ${
          isActive
            ? "bg-white/15 text-white shadow-lg backdrop-blur-sm border border-white/20"
            : "text-white/80 hover:text-white hover:bg-white/10"
        }
        hover:scale-[1.02] active:scale-[0.98] transform
        focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent
      `}
    >
      {/* Icon */}
      <div
        className={`
        flex-shrink-0 relative
        ${isActive ? "text-white" : "text-white/70 group-hover:text-white"}
        transition-colors duration-200
      `}
      >
        <item.icon className="h-5 w-5" />
        {item.isNew && (
          <div className="absolute -top-1 -right-1">
            <Sparkles className="h-3 w-3 text-yellow-400 animate-pulse" />
          </div>
        )}
      </div>

      {/* Label and Description - Hidden when collapsed */}
      {!isCollapsed && (
        <div className="flex-1 min-w-0 text-right">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {item.badge && (
                <span
                  className={`
                  px-2 py-0.5 rounded-full text-xs font-semibold
                  ${
                    isActive
                      ? "bg-white text-hit-primary"
                      : "bg-white/20 text-white/90"
                  }
                  transition-colors duration-200
                `}
                >
                  {item.badge}
                </span>
              )}
              {isActive && <ChevronRight className="h-3 w-3 text-white/80" />}
            </div>
            <div>
              <div className="font-medium text-right">{item.label}</div>
              <div
                className={`
                text-xs text-right truncate mt-0.5
                ${isActive ? "text-white/80" : "text-white/60"}
              `}
              >
                {item.description}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tooltip for collapsed state */}
      {isCollapsed && (
        <div
          className="
          absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg
          opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none
          whitespace-nowrap z-50 border border-gray-700
        "
        >
          <div className="font-medium">{item.label}</div>
          <div className="text-xs text-gray-300">{item.description}</div>
          <div className="absolute top-1/2 -translate-y-1/2 right-[-4px] w-2 h-2 bg-gray-900 border-r border-b border-gray-700 rotate-45"></div>
        </div>
      )}

      {/* Active indicator */}
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full"></div>
      )}
    </button>
  );

  const SectionDivider = ({ title }: { title: string }) => (
    <div className="flex items-center py-4">
      {!isCollapsed ? (
        <>
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="px-3 text-xs font-medium text-white/60 uppercase tracking-wider">
            {title}
          </span>
          <div className="flex-1 h-px bg-white/20"></div>
        </>
      ) : (
        <div className="w-full h-px bg-white/20"></div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-hit-primary text-white rounded-lg shadow-lg hover:bg-hit-primary/90 transition-colors"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        ${isCollapsed ? "w-20" : "w-80"} 
        ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
        transition-all duration-300 ease-in-out
        bg-gradient-to-br from-hit-secondary via-hit-dark to-hit-secondary/90 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
        border-r border-white/10 dark:border-gray-700/50 shadow-2xl
        flex flex-col
      `}
      >
        {/* Header */}
        <div className="relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5"></div>

          <div
            className={`relative p-6 border-b border-white/10 dark:border-gray-700/50 ${
              isCollapsed ? "px-3" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex items-center transition-all duration-300 ${
                  isCollapsed ? "justify-center" : "space-x-3"
                }`}
              >
                <div className="relative">
                  <div className="h-12 w-12 bg-white/20 dark:bg-gray-700/50 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 dark:border-gray-600/50 shadow-lg">
                    <img
                      src="/logo-white-bg.png"
                      className="h-8 w-8 rounded-lg"
                      alt="MentorHIT"
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-hit-dark dark:border-gray-800 animate-pulse"></div>
                </div>

                {!isCollapsed && (
                  <div>
                    <h2 className="text-xl font-bold text-white">MentorHIT</h2>
                    <p className="text-sm text-white/70 flex items-center space-x-1">
                      <Sparkles className="h-3 w-3" />
                      <span>AI Academic Advisor</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Desktop collapse toggle */}
              <button
                onClick={onToggleCollapse}
                className="hidden lg:flex p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <ChevronRight
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isCollapsed ? "" : "rotate-180"
                  }`}
                />
              </button>

              {/* Mobile close button */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="lg:hidden p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <nav className={`p-4 space-y-2 ${isCollapsed ? "px-3" : ""}`}>
            {/* Main Navigation */}
            <div>
              {menuItems.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  isActive={activePage === item.id}
                />
              ))}
            </div>

            <SectionDivider title="Tools" />

            {/* Secondary Navigation */}
            <div className="space-y-2">
              {secondaryItems.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </div>

            <SectionDivider title="Support" />

            {/* Bottom Navigation */}
            <div className="space-y-2">
              {bottomItems.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </div>
          </nav>
        </div>

        {/* User Profile Section */}
        <div
          className={`border-t border-white/10 dark:border-gray-700/50 p-4 bg-white/5 dark:bg-gray-800/30 backdrop-blur-sm ${
            isCollapsed ? "px-3" : ""
          }`}
        >
          {!isCollapsed ? (
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center border border-white/20 overflow-hidden">
                  {user?.name.includes("noy") ? (
                    <img
                      src="noy.png"
                      alt="User"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5 text-white" />
                  )}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-400 rounded-full border border-hit-dark dark:border-gray-800"></div>
              </div>
              <div className="flex-1 min-w-0 text-right">
                <div className="text-sm font-medium text-white truncate">
                  {user?.name}
                </div>
                <div className="text-xs text-white/60 truncate">
                  ID: {user?.studentId}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center border border-white/20 overflow-hidden">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-400 rounded-full border border-hit-dark dark:border-gray-800"></div>
              </div>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center transition-all duration-200
              ${
                isCollapsed
                  ? "justify-center px-3 py-3"
                  : "px-4 py-3 space-x-3 space-x-reverse"
              }
              rounded-xl text-sm font-medium
              text-white/80 hover:text-white hover:bg-red-500/20 border border-transparent hover:border-red-500/30
              focus:outline-none focus:ring-2 focus:ring-red-400/30
            `}
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
