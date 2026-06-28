import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  KeyRound,
  ChevronDown,
  LogOut,
  Bell,
  Menu,
  X,
  User,
  PanelLeftClose,
  PanelLeftOpen,
  Calendar,
  UserCircle,
  FileText,
  CalendarPlus
} from "lucide-react";
import logo from "../assets/ing/Logo-IAmInterviewed-Trans.png";
import { motion, AnimatePresence } from "motion/react";

type SubNavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};

type NavItem = {
  title: string;
  href?: string;
  icon: React.ElementType;
  subItems?: SubNavItem[];
};

const navItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard/interviewer", icon: LayoutDashboard },
  { title: "Profile", href: "/dashboard/interviewer/profile", icon: UserCircle },
  { title: "Personal Info", href: "/dashboard/interviewer/personal-info", icon: FileText },
  { title: "Schedule", href: "/dashboard/interviewer/schedule", icon: Calendar },
  { title: "Pickup Schedule", href: "/dashboard/interviewer/pickup-schedule", icon: CalendarPlus },
];

const mockNotifications = [
  { id: 1, title: "New Interview Requested", message: "You have a new interview request for Java Developer.", time: "10m ago", read: false },
  { id: 2, title: "Schedule Reminder", message: "Upcoming interview in 30 minutes.", time: "1h ago", read: false },
];

export default function InterviewerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically expand the menu group that contains the active route
    const activeParent = navItems.find(item => 
      item.subItems?.some(sub => location.pathname === sub.href || location.pathname.startsWith(`${sub.href}/`))
    );
    if (activeParent && openMenu !== activeParent.title) {
      setOpenMenu(activeParent.title);
    }
  }, [location.pathname]);

  const toggleMenu = (title: string) => {
    setOpenMenu(prev => prev === title ? null : title);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 bg-white border-r border-border/50 flex flex-col transition-all duration-300 ease-in-out",
        sidebarOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0",
        !sidebarOpen && desktopSidebarCollapsed ? "lg:w-20" : "lg:w-72"
      )}>
        {/* Logo */}
        <div className={cn("h-16 flex items-center px-6 border-b border-border/50", desktopSidebarCollapsed && !sidebarOpen ? "justify-center px-0" : "justify-between lg:justify-start")}>
          <Link to="/" className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            {desktopSidebarCollapsed && !sidebarOpen ? (
              <div className="w-8 h-8 bg-[#0085F7]/20 rounded-xl flex items-center justify-center font-bold text-[#0085F7] font-heading">
                IA
              </div>
            ) : (
              <img src={logo} alt="IAmInterviewed" className="h-8 w-auto min-w-[120px]" />
            )}
          </Link>
          {(!desktopSidebarCollapsed || sidebarOpen) && (
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <div className={cn("flex-1 py-4 space-y-1", desktopSidebarCollapsed && !sidebarOpen ? "px-2 overflow-visible" : "px-4 overflow-y-auto")}>
          {navItems.map((item) => {
            const isActive = item.href ? location.pathname === item.href : false;
            const hasSub = !!item.subItems;
            const isMenuOpen = openMenu === item.title;
            const isCollapsed = desktopSidebarCollapsed && !sidebarOpen;

            return (
              <div key={item.title} className="relative group/navitem">
                {hasSub ? (
                  <button
                    onClick={() => {
                      if (!isCollapsed) {
                        toggleMenu(item.title);
                      }
                    }}
                    title={isCollapsed ? item.title : undefined}
                    className={cn(
                      "w-full flex items-center py-2.5 rounded-xl text-sm font-semibold transition-colors group",
                      isCollapsed ? "justify-center px-0" : "justify-between px-3",
                      "hover:bg-[#0085F7]/10 hover:text-[#0085F7] text-muted-foreground"
                    )}
                  >
                    <div className={cn("flex items-center", isCollapsed ? "justify-center" : "gap-3")}>
                      <item.icon className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </div>
                    {!isCollapsed && <ChevronDown className={cn("w-4 h-4 shrink-0 transition-transform", isMenuOpen && "rotate-180")} />}
                  </button>
                ) : (
                  <Link
                    to={item.href!}
                    onClick={() => setSidebarOpen(false)}
                    title={isCollapsed ? item.title : undefined}
                    className={cn(
                      "w-full flex items-center py-2.5 rounded-xl text-sm font-semibold transition-colors group",
                      isCollapsed ? "justify-center px-0" : "justify-start px-3 gap-3",
                      isActive 
                        ? "bg-[#0085F7] text-white shadow-md shadow-[#0085F7]/20" 
                        : "hover:bg-[#0085F7]/10 hover:text-[#0085F7] text-muted-foreground"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5 shrink-0", !isActive && "group-hover:scale-110 transition-transform")} />
                    {!isCollapsed && <span>{item.title}</span>}
                  </Link>
                )}

                {/* Submenu for Expanded State */}
                <AnimatePresence initial={false}>
                  {hasSub && isMenuOpen && !isCollapsed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-1 mb-2 ml-10 space-y-1 border-l-2 border-border/50 pl-2">
                        {item.subItems!.map((subItem) => {
                          const isSubActive = location.pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.title}
                              to={subItem.href}
                              onClick={() => setSidebarOpen(false)}
                              className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group",
                                isSubActive
                                  ? "text-[#00A94B] font-bold bg-[#00A94B]/10"
                                  : "text-muted-foreground hover:text-[#00A94B] hover:bg-[#00A94B]/5"
                              )}
                            >
                              <subItem.icon className={cn("w-4 h-4 shrink-0", !isSubActive && "group-hover:scale-110 transition-transform")} />
                              <span className="truncate">{subItem.title}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submenu Popover for Collapsed State */}
                {hasSub && isCollapsed && (
                  <div className="absolute left-full top-0 ml-2 w-48 opacity-0 invisible group-hover/navitem:opacity-100 group-hover/navitem:visible transition-all duration-200 z-[100]">
                    <div className="bg-white rounded-xl shadow-lg border border-border/50 py-2 overflow-hidden">
                      <div className="px-4 py-2 mb-1 border-b border-border/50 font-black text-xs text-muted-foreground uppercase tracking-wider">
                        {item.title}
                      </div>
                      <div className="flex flex-col">
                        {item.subItems!.map((subItem) => {
                          const isSubActive = location.pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.title}
                              to={subItem.href}
                              onClick={() => setSidebarOpen(false)}
                              className={cn(
                                "flex items-center gap-3 px-4 py-2 text-sm font-medium transition-colors group/subitem",
                                isSubActive
                                  ? "text-[#00A94B] font-bold border-l-2 border-[#00A94B] bg-[#00A94B]/5"
                                  : "text-muted-foreground hover:bg-secondary hover:text-[#00A94B] border-l-2 border-transparent"
                              )}
                            >
                              <subItem.icon className={cn("w-4 h-4 shrink-0", !isSubActive && "group-hover/subitem:scale-110 transition-transform")} />
                              <span className="truncate">{subItem.title}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="relative h-16 bg-white border-b border-border/50 flex items-center justify-between px-4 sm:px-6 z-40 shrink-0">
          {/* Mobile Centered Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 lg:hidden flex items-center pointer-events-none">
            <img src={logo} alt="IAmInterviewed" className="h-7 w-auto" />
          </div>

          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 rounded-xl hover:bg-secondary text-muted-foreground"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <button 
              className="hidden lg:flex p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"
              onClick={() => setDesktopSidebarCollapsed(!desktopSidebarCollapsed)}
              title={desktopSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {desktopSidebarCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
            </button>
            <h1 className="text-xl font-bold font-heading hidden sm:block">Interviewer Workspace</h1>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setNotificationsOpen(true)}
              className="p-2 rounded-xl hover:bg-secondary text-muted-foreground relative transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border-2 border-white" />
            </button>
            
            {/* User Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-sm hover:ring-2 hover:ring-primary/30 transition-all cursor-pointer focus:outline-none"
              >
                INT
              </button>
              
              <AnimatePresence>
                {profileDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setProfileDropdownOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-border/50 overflow-hidden z-50"
                    >
                      <div className="py-2">
                        <Link 
                          to="/dashboard/interviewer/profile" 
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors"
                        >
                          <User className="w-4 h-4 text-muted-foreground" />
                          My Profile
                        </Link>
                        <Link 
                          to="/dashboard/interviewer/change-password" 
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors"
                        >
                          <KeyRound className="w-4 h-4 text-muted-foreground" />
                          Change Password
                        </Link>
                        <div className="h-px bg-border/50 my-1" />
                        <button 
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            setShowLogoutModal(true);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setShowLogoutModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-[101] overflow-hidden border border-border/50"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                    <LogOut className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-foreground">Sign Out</h3>
                </div>
                <p className="text-muted-foreground">Are you sure you want to sign out of your account? You will need to enter your credentials to log back in.</p>
              </div>
              <div className="bg-secondary/50 px-6 py-4 flex justify-end gap-3 border-t border-border/50">
                <button 
                  onClick={() => setShowLogoutModal(false)}
                  className="px-4 py-2 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-black/5 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-bold text-white bg-destructive hover:bg-destructive/90 rounded-xl shadow-sm transition-colors"
                >
                  Yes, Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Right Notifications Drawer */}
      <AnimatePresence>
        {notificationsOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[110]"
              onClick={() => setNotificationsOpen(false)}
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl border-l border-border/50 z-[120] flex flex-col"
            >
              <div className="h-16 flex items-center justify-between px-6 border-b border-border/50 shrink-0">
                <h2 className="text-lg font-bold font-heading flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Notifications
                </h2>
                <button 
                  onClick={() => setNotificationsOpen(false)} 
                  className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {mockNotifications.map(n => (
                  <div 
                    key={n.id} 
                    className={cn(
                      "flex gap-4 p-4 rounded-xl border transition-all cursor-pointer",
                      !n.read 
                        ? "bg-primary/5 border-primary/20 shadow-sm" 
                        : "bg-white border-border/50 hover:bg-secondary/50"
                    )}
                  >
                    <div className="mt-1 shrink-0">
                      <div className={cn("w-2 h-2 rounded-full", !n.read ? "bg-primary" : "bg-transparent")} />
                    </div>
                    <div>
                      <h4 className={cn("text-sm font-bold", !n.read ? "text-foreground" : "text-muted-foreground")}>{n.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{n.message}</p>
                      <p className="text-[10px] font-bold text-muted-foreground mt-2 uppercase tracking-wider">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-border/50 bg-slate-50 shrink-0">
                <Link 
                  to="/dashboard/interviewer/notifications"
                  onClick={() => setNotificationsOpen(false)}
                  className="w-full py-2.5 flex justify-center text-sm font-bold text-[#0085F7] bg-[#0085F7]/10 hover:bg-[#0085F7]/20 rounded-xl transition-colors"
                >
                  Show All
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

