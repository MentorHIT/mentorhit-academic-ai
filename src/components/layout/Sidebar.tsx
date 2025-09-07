// Updated Sidebar.tsx with fixed button functionality and mobile optimization

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
  isClickable?: boolean; // New property to control clickability
}

const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  setActivePage,
  isCollapsed,
  onToggleCollapse,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  // Fixed menu items with proper click handling
  const menuItems: MenuItem[] = [
    {
      id: "chat",
      label: "Academic Chat",
      icon: MessageSquare,
      description: "AI-powered academic guidance",
      badge: "AI",
      isClickable: true,
    },
    {
      id: "preferences",
      label: "Preferences",
      icon: Target,
      description: "Customize your experience",
      isClickable: true,
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      description: "Your academic journey",
      badge: "94%",
      isClickable: true,
    },
  ];

  const secondaryItems: MenuItem[] = [
    {
      id: "courses",
      label: "Course Planning",
      icon: BookOpen,
      description: "Plan your semester",
      isNew: true,
      isClickable: false, // Keep as is for now
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: TrendingUp,
      description: "Track your progress",
      isClickable: false,
    },
    {
      id: "schedule",
      label: "Schedule",
      icon: Calendar,
      description: "Manage your time",
      isClickable: false,
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: Award,
      description: "Your milestones",
      badge: "12",
      isClickable: false,
    },
  ];

  const bottomItems: MenuItem[] = [
    {
      id: "help",
      label: "Help & Support",
      icon: HelpCircle,
      description: "Get assistance",
      isClickable: false,
    },
  ];

  // FIXED: Proper menu item click handler
  const handleMenuItemClick = (item: MenuItem) => {
    console.log(`Clicked on ${item.id}`, { isClickable: item.isClickable });

    // Only handle navigation for clickable items
    if (
      item.isClickable &&
      ["chat", "preferences", "profile"].includes(item.id)
    ) {
      setActivePage(item.id as ActivePage);
      console.log(`Navigating to ${item.id}`);
    } else {
      console.log(`${item.id} is not yet implemented`);
      // Optional: Show a toast or notification that feature is coming soon
    }

    // Always close mobile menu after click
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  // Handle mobile menu close on resize
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

  // FIXED: Enhanced MenuItem component with proper button behavior
  const MenuItem = ({
    item,
    isActive = false,
  }: {
    item: MenuItem;
    isActive?: boolean;
  }) => (
    <button
      onClick={() => handleMenuItemClick(item)}
      disabled={!item.isClickable} // Properly disable non-clickable items
      className={`
        mobile-touch-target sidebar-button group relative w-full flex items-center transition-all duration-300 ease-in-out
        ${
          isCollapsed
            ? "justify-center px-3 py-4"
            : "px-4 py-3 space-x-3 space-x-reverse"
        }
        rounded-xl font-medium text-sm
        ${
          isActive
            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg scale-105"
            : item.isClickable
            ? "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:scale-102 cursor-pointer"
            : "text-sidebar-foreground/60 cursor-default opacity-70"
        }
        ${!item.isClickable ? "hover:bg-sidebar-accent/30" : ""}
        focus:outline-none focus:ring-2 focus:ring-sidebar-primary focus:ring-offset-2
      `}
    >
      <div className="flex items-center justify-center flex-shrink-0">
        <item.icon className={`h-5 w-5 ${isActive ? "text-white" : ""}`} />
        {item.isNew && (
          <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
        )}
      </div>

      {!isCollapsed && (
        <>
          <div className="flex-1 text-right">
            <div className="flex items-center justify-between">
              <span className="truncate">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-1 text-xs bg-sidebar-accent text-sidebar-accent-foreground rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
            <p className="text-xs text-sidebar-foreground/70 truncate mt-1">
              {item.description}
            </p>
          </div>

          <ChevronRight
            className={`h-4 w-4 transition-transform duration-200 ${
              isActive ? "rotate-90" : "group-hover:translate-x-1"
            }`}
          />
        </>
      )}
    </button>
  );

  // Section divider component
  const SectionDivider = ({ title }: { title: string }) => (
    <div className="flex items-center my-4">
      <div className="flex-1 h-px bg-sidebar-border"></div>
      {!isCollapsed && (
        <>
          <span className="px-3 text-xs text-sidebar-foreground/50 font-medium">
            {title}
          </span>
          <div className="flex-1 h-px bg-sidebar-border"></div>
        </>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-sidebar-background text-sidebar-foreground rounded-xl shadow-lg mobile-touch-target"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 sidebar-mobile"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`
          bg-sidebar-background text-sidebar-foreground border-r border-sidebar-border
          flex flex-col h-full relative z-30 transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-16" : "w-64"}
          lg:translate-x-0
          ${
            isMobileMenuOpen
              ? "fixed top-0 left-0 translate-x-0 w-80 sidebar-content-mobile open"
              : "fixed top-0 left-0 translate-x-full lg:translate-x-0 sidebar-content-mobile"
          }
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border bg-sidebar-background/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "space-x-3"
              }`}
            >
              {!isCollapsed && (
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-gradient-to-br from-sidebar-primary to-blue-600 rounded-lg flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-sidebar-foreground">
                      MentorHIT
                    </h2>
                    <p className="text-xs text-sidebar-foreground/70">
                      Academic AI Assistant
                    </p>
                  </div>
                </div>
              )}

              {/* Desktop collapse button */}
              <button
                onClick={onToggleCollapse}
                className="hidden lg:flex p-1.5 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition-colors mobile-touch-target"
              >
                <ChevronRight
                  className={`h-5 w-5 transition-transform duration-200 ${
                    isCollapsed ? "" : "rotate-180"
                  }`}
                />
              </button>

              {/* Mobile close button */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="lg:hidden p-1.5 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition-colors mobile-touch-target"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
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

        {/* FIXED: Enhanced User Profile Section */}
        <div
          className={`border-t border-sidebar-border p-4 bg-sidebar-background/50 backdrop-blur-sm ${
            isCollapsed ? "px-3" : ""
          }`}
        >
          {!isCollapsed ? (
            <div className="space-y-4">
              {/* User Info */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="h-10 w-10 bg-gradient-to-br from-sidebar-primary to-blue-600 rounded-full flex items-center justify-center border-2 border-sidebar-border overflow-hidden">
                    {user?.name.includes("noy") ? (
                      <img
                        src="/api/placeholder/40/40"
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-sidebar-background rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">
                    {user?.name || "Student"}
                  </p>
                  <p className="text-xs text-sidebar-foreground/70 truncate">
                    {user?.email || "student@hit.ac.il"}
                  </p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-sidebar-foreground/70 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 mobile-touch-target"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-3">
              <div className="h-8 w-8 bg-gradient-to-br from-sidebar-primary to-blue-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-sidebar-foreground/70 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors mobile-touch-target"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
