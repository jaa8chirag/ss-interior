"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import {
  Users,
  Image as ImageIcon,
  Plus,
  Trash2,
  Phone,
  Mail,
  MessageCircle,
  CheckCircle2,
  ExternalLink,
  Lock,
  LogOut,
  Upload,
  RefreshCw,
  Search,
  Building2,
  MapPin,
  Calendar,
  AlertCircle,
  Eye,
  Download,
  Database,
  LayoutDashboard,
  Menu,
  X,
  Server,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Check,
  Pencil,
  RotateCcw,
  Share2,
  Globe,
} from "lucide-react";
import {
  LeadItem,
  AdminProjectItem,
  getLeads,
  fetchLeadsFromDb,
  updateLeadStatus,
  deleteLead,
  getProjects,
  fetchProjectsFromDb,
  addProject,
  updateProject,
  deleteProject,
  resetProjectsToDefault,
  uploadImageFile,
  getSiteSettings,
  fetchSiteSettingsFromApi,
  saveSiteSettings,
  SiteSettings,
  DEFAULT_SITE_SETTINGS,
} from "@/lib/adminStore";

const DEFAULT_ADMIN_PASSCODE = "admin123";

type AdminTab = "dashboard" | "leads" | "projects" | "settings" | "database";

export default function AdminPortalView() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Leads State
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [leadFilter, setLeadFilter] = useState<string>("all");
  const [leadSearch, setLeadSearch] = useState<string>("");

  // Projects State (unified: initial 38 studio projects + custom uploaded projects)
  const [projects, setProjects] = useState<AdminProjectItem[]>([]);
  const [projectCategoryFilter, setProjectCategoryFilter] = useState<string>("all");
  const [projectSearch, setProjectSearch] = useState<string>("");

  // Add Project Form State
  const [formCategory, setFormCategory] = useState<"Residential" | "Farmhouses" | "Commercial" | "Hospitality">("Residential");
  const [formProjectName, setFormProjectName] = useState("");
  const [formClientScope, setFormClientScope] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formCaption, setFormCaption] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formSuccessMessage, setFormSuccessMessage] = useState("");
  const [isSubmittingProject, setIsSubmittingProject] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Edit Project Modal State
  const [editingProject, setEditingProject] = useState<AdminProjectItem | null>(null);
  const [editCategory, setEditCategory] = useState<"Residential" | "Farmhouses" | "Commercial" | "Hospitality">("Residential");
  const [editProjectName, setEditProjectName] = useState("");
  const [editClientScope, setEditClientScope] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editCaption, setEditCaption] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  // Settings State
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsSuccessMessage, setSettingsSuccessMessage] = useState("");

  // Upload progress states
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingEditImage, setIsUploadingEditImage] = useState(false);

  // Database status
  const [dbStatus, setDbStatus] = useState<"checking" | "connected" | "offline">("checking");
  const [dbLatency, setDbLatency] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Check login state on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("ss_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Load data from MySQL + local fallback
  const refreshData = async () => {
    setIsRefreshing(true);
    const startTime = performance.now();
    try {
      setLeads(getLeads());
      setProjects(getProjects());
      setSettings(getSiteSettings());

      const [leadsRes, projectsRes, settingsRes] = await Promise.all([
        fetch("/api/leads", { cache: "no-store" }).then((r) => r.json()).catch(() => null),
        fetch("/api/projects", { cache: "no-store" }).then((r) => r.json()).catch(() => null),
        fetch("/api/settings", { cache: "no-store" }).then((r) => r.json()).catch(() => null),
      ]);

      const endTime = performance.now();
      setDbLatency(Math.round(endTime - startTime));

      if (leadsRes?.source === "mysql" || projectsRes?.source === "mysql" || settingsRes?.source === "mysql") {
        setDbStatus("connected");
      } else {
        setDbStatus("offline");
      }

      if (leadsRes?.success && Array.isArray(leadsRes.leads)) {
        setLeads(leadsRes.leads);
      }
      if (projectsRes?.success && Array.isArray(projectsRes.projects) && projectsRes.projects.length > 0) {
        const current = getProjects();
        const dbMap = new Map();
        projectsRes.projects.forEach((p: any) => dbMap.set(p.url, p));
        const merged = current.map((p) => dbMap.get(p.url) || p);
        setProjects(merged);
      }
      if (settingsRes?.success && settingsRes.settings) {
        setSettings(settingsRes.settings);
      }
    } catch {
      setDbStatus("offline");
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
      window.addEventListener("ss_leads_updated", refreshData);
      window.addEventListener("ss_projects_updated", refreshData);
      window.addEventListener("ss_settings_updated", refreshData);
      return () => {
        window.removeEventListener("ss_leads_updated", refreshData);
        window.removeEventListener("ss_projects_updated", refreshData);
        window.removeEventListener("ss_settings_updated", refreshData);
      };
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === DEFAULT_ADMIN_PASSCODE || passcode.trim() === "ss2026") {
      setIsAuthenticated(true);
      localStorage.setItem("ss_admin_auth", "true");
      setLoginError("");
    } else {
      setLoginError("Invalid admin access key. Use 'admin123' to sign in.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("ss_admin_auth");
    setPasscode("");
  };

  // Image Upload handler for Add form (Uploads to /api/upload with fallback to base64)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (JPG, PNG, WebP).");
      return;
    }

    setIsUploadingImage(true);
    try {
      const uploadedUrl = await uploadImageFile(file);
      setFormImageUrl(uploadedUrl);
    } catch {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setFormImageUrl(result);
      };
      reader.readAsDataURL(file);
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Image Upload handler for Edit modal
  const handleEditFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (JPG, PNG, WebP).");
      return;
    }

    setIsUploadingEditImage(true);
    try {
      const uploadedUrl = await uploadImageFile(file);
      setEditImageUrl(uploadedUrl);
    } catch {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setEditImageUrl(result);
      };
      reader.readAsDataURL(file);
    } finally {
      setIsUploadingEditImage(false);
    }
  };

  // Save Settings Submit
  const handleSaveSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    try {
      await saveSiteSettings(settings);
      setSettingsSuccessMessage("Social media links & studio info saved successfully! Changes are live across the site.");
      setTimeout(() => setSettingsSuccessMessage(""), 5000);
    } catch {
      alert("Failed to save settings. Please try again.");
    } finally {
      setIsSavingSettings(false);
    }
  };

  // Add Project Submit
  const handleAddProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formImageUrl.trim() || !formCaption.trim() || !formProjectName.trim()) {
      alert("Please provide Project Name, Caption, and an Image.");
      return;
    }

    setIsSubmittingProject(true);
    const subId = formProjectName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    try {
      await addProject({
        category: formCategory,
        projectName: formProjectName.trim(),
        subProjectId: subId,
        clientScope: formClientScope.trim() || "Bespoke Turnkey Fit-Out",
        location: formLocation.trim() || "Delhi NCR",
        caption: formCaption.trim(),
        url: formImageUrl.trim(),
      });

      setFormSuccessMessage("Project image published to live website successfully!");
      setFormCaption("");
      setFormImageUrl("");
      setFormProjectName("");
      setFormClientScope("");
      setFormLocation("");
      if (fileInputRef.current) fileInputRef.current.value = "";

      await refreshData();
      setTimeout(() => setFormSuccessMessage(""), 4000);
    } catch {
      alert("Failed to publish project. Please try again.");
    } finally {
      setIsSubmittingProject(false);
    }
  };

  // Start Edit Project
  const handleStartEdit = (proj: AdminProjectItem) => {
    setEditingProject(proj);
    setEditCategory(proj.category);
    setEditProjectName(proj.projectName);
    setEditClientScope(proj.clientScope);
    setEditLocation(proj.location);
    setEditCaption(proj.caption);
    setEditImageUrl(proj.url);
  };

  // Save Edit Project Submit
  const handleSaveEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (!editImageUrl.trim() || !editCaption.trim() || !editProjectName.trim()) {
      alert("Please provide Project Name, Caption, and Image URL.");
      return;
    }

    setIsSavingEdit(true);
    const subId = editProjectName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    try {
      await updateProject(editingProject.id, {
        category: editCategory,
        projectName: editProjectName.trim(),
        subProjectId: subId,
        clientScope: editClientScope.trim() || "Bespoke Turnkey Fit-Out",
        location: editLocation.trim() || "Delhi NCR",
        caption: editCaption.trim(),
        url: editImageUrl.trim(),
      });

      setEditingProject(null);
      await refreshData();
    } catch {
      alert("Failed to update project. Please try again.");
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Delete Project
  const handleDeleteProject = async (proj: AdminProjectItem) => {
    const confirmMsg = `Delete project photo:\n"${proj.caption}"\nfrom "${proj.projectName}"?\n\nThis will remove it from the live website immediately.`;
    if (confirm(confirmMsg)) {
      await deleteProject(proj.id, proj.url);
      await refreshData();
    }
  };

  // Reset to original 38 studio projects
  const handleResetToDefaults = () => {
    if (
      confirm(
        "Are you sure you want to restore all original studio default projects? Any deleted default photos will be restored."
      )
    ) {
      resetProjectsToDefault();
      refreshData();
    }
  };

  // Export Leads to CSV
  const exportLeadsToCsv = () => {
    if (leads.length === 0) {
      alert("No leads available to export.");
      return;
    }
    const headers = ["ID", "Date", "Name", "Phone", "Email", "City", "Category", "Message", "Status"];
    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${l.createdAt}"`,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${(l.city || "").replace(/"/g, '""')}"`,
      `"${l.category}"`,
      `"${(l.message || "").replace(/"/g, '""')}"`,
      `"${l.status}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ss_interiors_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesFilter = leadFilter === "all" || lead.status === leadFilter;
      const searchLower = leadSearch.toLowerCase();
      const matchesSearch =
        lead.name.toLowerCase().includes(searchLower) ||
        lead.phone.toLowerCase().includes(searchLower) ||
        lead.email.toLowerCase().includes(searchLower) ||
        lead.category.toLowerCase().includes(searchLower) ||
        lead.message.toLowerCase().includes(searchLower);
      return matchesFilter && matchesSearch;
    });
  }, [leads, leadFilter, leadSearch]);

  // Filtered Projects (initial + custom)
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = projectCategoryFilter === "all" || p.category === projectCategoryFilter;
      const searchLower = projectSearch.toLowerCase();
      const matchesSearch =
        !projectSearch.trim() ||
        p.projectName.toLowerCase().includes(searchLower) ||
        p.caption.toLowerCase().includes(searchLower) ||
        p.location.toLowerCase().includes(searchLower) ||
        p.clientScope.toLowerCase().includes(searchLower);
      return matchesCategory && matchesSearch;
    });
  }, [projects, projectCategoryFilter, projectSearch]);

  const newLeadsCount = leads.filter((l) => l.status === "New").length;

  // ================= STANDALONE LOGIN GATE =================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090a0f] text-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-[#12141c] border border-white/10 rounded-lg p-8 shadow-2xl relative z-10 backdrop-blur-xl">
          <div className="text-center space-y-3 mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#1b1e2a] border border-[#c5a059]/30 text-[#c5a059] shadow-inner mb-1">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#c5a059] font-medium block">
                Internal Studio Access
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-light text-white mt-1">
                SS Interiors Console
              </h1>
            </div>
            <p className="text-xs text-white/50 font-light leading-relaxed">
              Standalone administrative portal for client CRM, MySQL leads sync, and full portfolio project editing.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-2 font-medium">
                Admin Access Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (e.g. admin123)"
                  className="w-full bg-[#0b0c11] border border-white/15 focus:border-[#c5a059] px-4 py-3 text-sm text-white rounded-md outline-none transition-colors placeholder:text-white/30"
                  required
                />
                <Lock className="absolute right-3.5 top-3.5 h-4 w-4 text-white/40" />
              </div>
              {loginError && (
                <p className="text-xs text-rose-400 mt-2 flex items-center gap-1.5 bg-rose-950/40 border border-rose-800/40 rounded p-2">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {loginError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#c5a059] to-[#dfbf77] text-[#0d0e12] font-semibold py-3 text-xs uppercase tracking-widest rounded-md shadow-lg shadow-[#c5a059]/20 hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer"
            >
              Enter Studio Dashboard
            </button>
          </form>

          <div className="mt-6 pt-5 text-center text-xs text-white/40 border-t border-white/10 flex items-center justify-between">
            <span>Default key: <code className="text-[#c5a059] font-mono font-medium">admin123</code></span>
            <Link href="/" className="hover:text-white transition-colors text-[11px] underline">
              Return to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ================= MAIN STANDALONE ADMIN CONSOLE =================
  return (
    <div className="min-h-screen bg-[#0a0b10] text-[#e2e4ea] font-sans flex flex-col md:flex-row antialiased">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#10121a] border-b border-white/10 px-4 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 rounded bg-white/5 border border-white/10 text-white"
          >
            {mobileSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <span className="font-serif text-lg tracking-wider text-white">SS Admin</span>
        </div>
        <div className="flex items-center gap-2">
          {newLeadsCount > 0 && (
            <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {newLeadsCount} New
            </span>
          )}
          <button
            onClick={handleLogout}
            className="p-1.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* LEFT SIDEBAR NAVIGATION */}
      <aside
        className={`fixed md:sticky top-0 inset-y-0 left-0 z-30 w-64 bg-[#0e1017] border-r border-white/10 flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } h-screen shrink-0`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-[#161922] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] font-serif font-bold text-lg shadow-inner">
              SS
            </div>
            <div>
              <h2 className="font-serif text-base tracking-wider text-white leading-tight">
                SS INTERIORS
              </h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-medium">
                  Studio Admin v1.0
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <button
            onClick={() => {
              setActiveTab("dashboard");
              setMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs uppercase tracking-wider font-medium transition-colors ${
              activeTab === "dashboard"
                ? "bg-[#c5a059] text-[#0e1017] font-semibold shadow-md shadow-[#c5a059]/20"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className="h-4 w-4" />
              <span>Overview</span>
            </div>
          </button>

          <button
            onClick={() => {
              setActiveTab("leads");
              setMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs uppercase tracking-wider font-medium transition-colors ${
              activeTab === "leads"
                ? "bg-[#c5a059] text-[#0e1017] font-semibold shadow-md shadow-[#c5a059]/20"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="h-4 w-4" />
              <span>Client Leads</span>
            </div>
            {newLeadsCount > 0 && (
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  activeTab === "leads"
                    ? "bg-[#0e1017] text-[#c5a059]"
                    : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                }`}
              >
                {newLeadsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab("projects");
              setMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs uppercase tracking-wider font-medium transition-colors ${
              activeTab === "projects"
                ? "bg-[#c5a059] text-[#0e1017] font-semibold shadow-md shadow-[#c5a059]/20"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ImageIcon className="h-4 w-4" />
              <span>Project Works</span>
            </div>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full ${
                activeTab === "projects"
                  ? "bg-[#0e1017] text-[#c5a059]"
                  : "bg-white/10 text-white/70"
              }`}
            >
              {projects.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("settings");
              setMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs uppercase tracking-wider font-medium transition-colors ${
              activeTab === "settings"
                ? "bg-[#c5a059] text-[#0e1017] font-semibold shadow-md shadow-[#c5a059]/20"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Share2 className="h-4 w-4" />
              <span>Social &amp; Settings</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70">
              Live
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("database");
              setMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs uppercase tracking-wider font-medium transition-colors ${
              activeTab === "database"
                ? "bg-[#c5a059] text-[#0e1017] font-semibold shadow-md shadow-[#c5a059]/20"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Database className="h-4 w-4" />
              <span>MySQL Database</span>
            </div>
            <span
              className={`h-2 w-2 rounded-full ${
                dbStatus === "connected" ? "bg-emerald-400" : "bg-amber-400"
              }`}
            />
          </button>
        </div>

        {/* Sidebar Footer User Card */}
        <div className="p-3 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3 py-2 rounded text-xs text-white/70 hover:text-white hover:bg-white/5 transition-colors border border-white/5"
          >
            <span className="flex items-center gap-2 text-[11px] uppercase tracking-wider">
              <Eye className="h-3.5 w-3.5 text-[#c5a059]" />
              <span>Live Website</span>
            </span>
            <ExternalLink className="h-3 w-3 text-white/40" />
          </Link>

          <div className="bg-[#12151f] border border-white/5 rounded-md p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#1e2230] text-[#c5a059] flex items-center justify-center font-bold text-xs">
                A
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-medium text-white truncate">Administrator</p>
                <p className="text-[10px] text-white/40 truncate">Authenticated Session</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="text-white/40 hover:text-rose-400 p-1.5 transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT STAGE */}
      <main className="flex-1 flex flex-col min-w-0 min-h-screen bg-[#0a0b10] overflow-y-auto">
        {/* Top Control Bar */}
        <header className="bg-[#10121a]/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-20">
          <div>
            <h1 className="text-lg sm:text-xl font-serif text-white flex items-center gap-2">
              {activeTab === "dashboard" && "Dashboard Overview"}
              {activeTab === "leads" && "Client Leads Management"}
              {activeTab === "projects" && "Project Works Management (Edit, Delete, Add)"}
              {activeTab === "database" && "MySQL Database Configuration"}
            </h1>
            <p className="text-xs text-white/50">
              {activeTab === "dashboard" && "Live studio performance, inquiry volume, and content pipeline."}
              {activeTab === "leads" && "Incoming consultation inquiries from public contact touchpoints."}
              {activeTab === "projects" && "Edit existing initial photos, delete unwanted works, or publish new project images."}
              {activeTab === "database" && "Real-time sync between Next.js REST API and MySQL storage."}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {/* DB Status Pill */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border ${
                dbStatus === "connected"
                  ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                  : "bg-amber-950/40 border-amber-500/40 text-amber-300"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  dbStatus === "connected" ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                }`}
              />
              <span className="text-[11px] font-medium">
                {dbStatus === "connected"
                  ? `MySQL Active (${dbLatency ? `${dbLatency}ms` : "Live"})`
                  : "Local Fallback (Active)"}
              </span>
            </div>

            {/* Refresh Button */}
            <button
              onClick={refreshData}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#181b26] border border-white/10 hover:border-[#c5a059]/40 text-xs text-white/80 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-[#c5a059]" : ""}`} />
              <span className="hidden sm:inline">Sync Data</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1">
          {/* ================= SECTION 1: DASHBOARD OVERVIEW ================= */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#12141d] border border-white/10 rounded-lg p-5 relative overflow-hidden">
                  <div className="flex items-center justify-between text-white/60 mb-2">
                    <span className="text-xs uppercase tracking-wider font-medium">Total Inquiries</span>
                    <Users className="h-4 w-4 text-[#c5a059]" />
                  </div>
                  <div className="text-3xl font-light text-white font-serif">{leads.length}</div>
                  <p className="text-[11px] text-white/40 mt-1">Recorded via website forms</p>
                </div>

                <div className="bg-[#12141d] border border-white/10 rounded-lg p-5 relative overflow-hidden">
                  <div className="flex items-center justify-between text-white/60 mb-2">
                    <span className="text-xs uppercase tracking-wider font-medium">New Leads</span>
                    <AlertCircle className="h-4 w-4 text-rose-400" />
                  </div>
                  <div className="text-3xl font-light text-rose-300 font-serif flex items-center gap-2">
                    <span>{newLeadsCount}</span>
                    {newLeadsCount > 0 && (
                      <span className="text-xs font-sans px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        Action Required
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-white/40 mt-1">Pending studio response</p>
                </div>

                <div className="bg-[#12141d] border border-white/10 rounded-lg p-5 relative overflow-hidden">
                  <div className="flex items-center justify-between text-white/60 mb-2">
                    <span className="text-xs uppercase tracking-wider font-medium">Active Projects</span>
                    <ImageIcon className="h-4 w-4 text-[#c5a059]" />
                  </div>
                  <div className="text-3xl font-light text-[#c5a059] font-serif">{projects.length}</div>
                  <p className="text-[11px] text-white/40 mt-1">Fully editable &amp; manageable</p>
                </div>

                <div className="bg-[#12141d] border border-white/10 rounded-lg p-5 relative overflow-hidden">
                  <div className="flex items-center justify-between text-white/60 mb-2">
                    <span className="text-xs uppercase tracking-wider font-medium">Database Node</span>
                    <Server className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-light text-emerald-400 font-serif">
                    {dbStatus === "connected" ? "Online" : "Cached"}
                  </div>
                  <p className="text-[11px] text-white/40 mt-1">Auto-migrating schema ready</p>
                </div>
              </div>

              {/* Quick Split: Recent Inquiries & Quick Image Action */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Leads Widget */}
                <div className="lg:col-span-2 bg-[#12141d] border border-white/10 rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                        Recent Client Inquiries
                      </h3>
                      <p className="text-xs text-white/40">Latest contacts waiting for reply</p>
                    </div>
                    <button
                      onClick={() => setActiveTab("leads")}
                      className="text-xs text-[#c5a059] hover:underline flex items-center gap-1"
                    >
                      <span>View All Leads</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {leads.length === 0 ? (
                    <div className="py-12 text-center text-white/40 text-xs border border-dashed border-white/10 rounded-md">
                      No leads received yet. Test by submitting a form on the Contact page.
                    </div>
                  ) : (
                    <div className="divide-y divide-white/5 space-y-2">
                      {leads.slice(0, 4).map((lead) => (
                        <div key={lead.id} className="pt-3 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-white text-sm">{lead.name}</span>
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                  lead.status === "New"
                                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                    : lead.status === "Contacted"
                                    ? "bg-amber-500/20 text-amber-300"
                                    : "bg-emerald-500/20 text-emerald-300"
                                }`}
                              >
                                {lead.status}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-white/50">
                              {lead.email && <span className="text-[#c5a059] font-medium">{lead.email}</span>}
                              {lead.phone && lead.phone !== "-" && (
                                <>
                                  <span>•</span>
                                  <span>{lead.phone}</span>
                                </>
                              )}
                              <span>•</span>
                              <span>{lead.category}</span>
                              <span>•</span>
                              <span>{new Date(lead.createdAt).toLocaleDateString("en-IN")}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {lead.email && (
                              <a
                                href={`mailto:${lead.email}?subject=Regarding%20Your%20Interior%20Inquiry%20-%20SS%20Interiors`}
                                className="px-2.5 py-1.5 rounded bg-blue-950/60 border border-blue-600/40 text-blue-300 text-xs flex items-center gap-1 hover:bg-blue-900/60 transition-colors"
                                title="Reply via Email"
                              >
                                <Mail className="h-3 w-3" />
                                <span>Email</span>
                              </a>
                            )}
                            {lead.phone && lead.phone !== "-" && (
                              <>
                                <a
                                  href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                                    lead.name
                                  )},%20thank%20you%20for%20contacting%20SS%20Interiors.`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="px-2.5 py-1.5 rounded bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 text-xs flex items-center gap-1 hover:bg-emerald-900/60 transition-colors"
                                >
                                  <MessageCircle className="h-3 w-3" />
                                  <span>WhatsApp</span>
                                </a>
                                <a
                                  href={`tel:${lead.phone}`}
                                  className="px-2.5 py-1.5 rounded bg-white/5 border border-white/10 text-white/80 text-xs flex items-center gap-1 hover:bg-white/10 transition-colors"
                                >
                                  <Phone className="h-3 w-3" />
                                  <span>Call</span>
                                </a>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick Upload Callout */}
                <div className="bg-[#12141d] border border-white/10 rounded-lg p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-md bg-[#1c202d] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059]">
                      <Upload className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-serif text-white">Full Project Curation</h3>
                    <p className="text-xs text-white/50 leading-relaxed">
                      All {projects.length} project photos (including DLF Camellias, Magnolias, Aralias, Trump Tower) can now be edited, replaced, or deleted with real-time website updates.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab("projects")}
                    className="w-full bg-[#c5a059] hover:bg-[#d4b069] text-[#0e1017] font-semibold py-2.5 text-xs uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Pencil className="h-4 w-4" />
                    <span>Manage &amp; Edit Projects</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= SECTION 2: LEADS MANAGEMENT ================= */}
          {activeTab === "leads" && (
            <div className="space-y-6">
              {/* Controls bar */}
              <div className="bg-[#12141d] border border-white/10 rounded-lg p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-white/40" />
                  <input
                    type="text"
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    placeholder="Search by client name, phone, email, project..."
                    className="w-full bg-[#0b0c11] border border-white/10 focus:border-[#c5a059] pl-10 pr-4 py-2 text-xs text-white rounded-md outline-none transition-colors"
                  />
                </div>

                {/* Status Filter & CSV Export */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center bg-[#0b0c11] border border-white/10 rounded-md p-1">
                    {["all", "New", "Contacted", "In Discussion", "Closed"].map((st) => (
                      <button
                        key={st}
                        onClick={() => setLeadFilter(st)}
                        className={`px-3 py-1 text-xs rounded transition-colors ${
                          leadFilter === st
                            ? "bg-[#c5a059] text-[#0e1017] font-semibold"
                            : "text-white/60 hover:text-white"
                        }`}
                      >
                        {st === "all" ? "All" : st}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={exportLeadsToCsv}
                    className="px-3 py-2 rounded-md bg-[#1b1e2a] border border-white/10 hover:border-[#c5a059] text-xs text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Export leads to Excel CSV"
                  >
                    <Download className="h-3.5 w-3.5 text-[#c5a059]" />
                    <span className="hidden sm:inline">Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Leads Table */}
              <div className="bg-[#12141d] border border-white/10 rounded-lg overflow-hidden">
                {filteredLeads.length === 0 ? (
                  <div className="p-12 text-center text-white/40 text-xs">
                    No leads matching your current criteria.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#0b0c11] border-b border-white/10 text-white/50 uppercase tracking-wider text-[10px]">
                          <th className="p-4 font-medium">Client / Inquirer</th>
                          <th className="p-4 font-medium">Contact Details</th>
                          <th className="p-4 font-medium">Project Scope</th>
                          <th className="p-4 font-medium">Message Notes</th>
                          <th className="p-4 font-medium">Status</th>
                          <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="p-4 align-top">
                              <div className="font-semibold text-white">{lead.name}</div>
                              <div className="text-[11px] text-white/40 mt-0.5 flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(lead.createdAt).toLocaleString("en-IN", {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                })}
                              </div>
                            </td>

                            <td className="p-4 align-top space-y-1">
                              <a
                                href={`tel:${lead.phone}`}
                                className="flex items-center gap-1.5 text-white/80 hover:text-[#c5a059] transition-colors"
                              >
                                <Phone className="h-3 w-3 text-[#c5a059]" />
                                <span>{lead.phone}</span>
                              </a>
                              <a
                                href={`mailto:${lead.email}`}
                                className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors"
                              >
                                <Mail className="h-3 w-3" />
                                <span>{lead.email}</span>
                              </a>
                              {lead.city && (
                                <div className="flex items-center gap-1.5 text-white/40 text-[11px]">
                                  <MapPin className="h-3 w-3" />
                                  <span>{lead.city}</span>
                                </div>
                              )}
                            </td>

                            <td className="p-4 align-top">
                              <span className="inline-block px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/90 font-medium">
                                {lead.category}
                              </span>
                            </td>

                            <td className="p-4 align-top max-w-xs">
                              <p className="text-white/70 text-[11px] line-clamp-3 leading-relaxed">
                                {lead.message}
                              </p>
                            </td>

                            <td className="p-4 align-top">
                              <select
                                value={lead.status}
                                onChange={(e) =>
                                  updateLeadStatus(
                                    lead.id,
                                    e.target.value as "New" | "Contacted" | "In Discussion" | "Closed"
                                  )
                                }
                                className={`text-[11px] font-semibold rounded px-2.5 py-1 border outline-none bg-[#0b0c11] cursor-pointer ${
                                  lead.status === "New"
                                    ? "border-rose-500/50 text-rose-300"
                                    : lead.status === "Contacted"
                                    ? "border-amber-500/50 text-amber-300"
                                    : lead.status === "In Discussion"
                                    ? "border-sky-500/50 text-sky-300"
                                    : "border-emerald-500/50 text-emerald-300"
                                }`}
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="In Discussion">In Discussion</option>
                                <option value="Closed">Closed</option>
                              </select>
                            </td>

                            <td className="p-4 align-top text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <a
                                  href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                                    lead.name
                                  )},%20thank%20you%20for%20contacting%20SS%20Interiors%20regarding%20your%20${encodeURIComponent(
                                    lead.category
                                  )}%20project.`}
                                  target="_blank"
                                  rel="noreferrer"
                                  title="Chat on WhatsApp"
                                  className="p-1.5 rounded bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 hover:bg-emerald-900/60 transition-colors"
                                >
                                  <MessageCircle className="h-3.5 w-3.5" />
                                </a>
                                <a
                                  href={`tel:${lead.phone}`}
                                  title="Call client"
                                  className="p-1.5 rounded bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-colors"
                                >
                                  <Phone className="h-3.5 w-3.5" />
                                </a>
                                <button
                                  onClick={() => {
                                    if (confirm(`Delete lead from ${lead.name}?`)) {
                                      deleteLead(lead.id);
                                    }
                                  }}
                                  title="Delete lead"
                                  className="p-1.5 rounded bg-rose-950/30 border border-rose-800/30 text-rose-400 hover:bg-rose-900/50 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= SECTION 3: PROJECT WORKS MANAGEMENT (EDIT, DELETE, ADD NEW) ================= */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              {/* Top Controls: Search, Filter, Reset */}
              <div className="bg-[#12141d] border border-white/10 rounded-lg p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                {/* Search in Projects */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-white/40" />
                  <input
                    type="text"
                    value={projectSearch}
                    onChange={(e) => setProjectSearch(e.target.value)}
                    placeholder="Search by project name, caption, location, scope..."
                    className="w-full bg-[#0b0c11] border border-white/10 focus:border-[#c5a059] pl-10 pr-4 py-2 text-xs text-white rounded-md outline-none transition-colors"
                  />
                </div>

                {/* Category Filter & Reset */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center bg-[#0b0c11] border border-white/10 rounded-md p-1">
                    {["all", "Residential", "Farmhouses", "Commercial", "Hospitality"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setProjectCategoryFilter(cat)}
                        className={`px-3 py-1 text-xs rounded transition-colors ${
                          projectCategoryFilter === cat
                            ? "bg-[#c5a059] text-[#0e1017] font-semibold"
                            : "text-white/60 hover:text-white"
                        }`}
                      >
                        {cat === "all" ? "All" : cat}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleResetToDefaults}
                    className="px-3 py-2 rounded-md bg-[#1b1e2a] border border-white/10 hover:border-amber-500/50 text-xs text-white/80 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Restore initial 38 studio projects"
                  >
                    <RotateCcw className="h-3.5 w-3.5 text-amber-400" />
                    <span className="hidden sm:inline">Reset Defaults</span>
                  </button>
                </div>
              </div>

              {/* Split View: Left (Add New Project Form) & Right (All Projects Grid with Edit / Delete) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Form: Add New Project Photo */}
                <div className="lg:col-span-4 bg-[#12141d] border border-white/10 rounded-lg p-6 space-y-5 h-fit sticky top-24">
                  <div>
                    <h2 className="text-base font-serif text-white flex items-center gap-2">
                      <Plus className="h-4 w-4 text-[#c5a059]" />
                      <span>Add New Project Photo</span>
                    </h2>
                    <p className="text-xs text-white/50 mt-0.5">
                      Publish new photography into any project category.
                    </p>
                  </div>

                  {formSuccessMessage && (
                    <div className="p-3 bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs rounded-md flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      <span>{formSuccessMessage}</span>
                    </div>
                  )}

                  <form onSubmit={handleAddProjectSubmit} className="space-y-4">
                    {/* Category */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1 font-medium">
                        Project Category
                      </label>
                      <select
                        value={formCategory}
                        onChange={(e) =>
                          setFormCategory(
                            e.target.value as "Residential" | "Farmhouses" | "Commercial" | "Hospitality"
                          )
                        }
                        className="w-full bg-[#0b0c11] border border-white/15 focus:border-[#c5a059] px-3 py-2 text-xs text-white rounded-md outline-none"
                      >
                        <option value="Residential">Residential Projects</option>
                        <option value="Farmhouses">Expansive Farmhouses &amp; Estates</option>
                        <option value="Commercial">Commercial &amp; Corporate Spaces</option>
                        <option value="Hospitality">Hospitality &amp; Lounge Spaces</option>
                      </select>
                    </div>

                    {/* Project Name */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1 font-medium">
                        Project Name
                      </label>
                      <input
                        type="text"
                        value={formProjectName}
                        onChange={(e) => setFormProjectName(e.target.value)}
                        placeholder="e.g. DLF Camellias, DLF Magnolias, Central Park"
                        className="w-full bg-[#0b0c11] border border-white/15 focus:border-[#c5a059] px-3 py-2 text-xs text-white rounded-md outline-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1 font-medium">
                          Client Scope
                        </label>
                        <input
                          type="text"
                          value={formClientScope}
                          onChange={(e) => setFormClientScope(e.target.value)}
                          placeholder="e.g. Turnkey Fit-Out"
                          className="w-full bg-[#0b0c11] border border-white/15 focus:border-[#c5a059] px-3 py-2 text-xs text-white rounded-md outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1 font-medium">
                          Location
                        </label>
                        <input
                          type="text"
                          value={formLocation}
                          onChange={(e) => setFormLocation(e.target.value)}
                          placeholder="e.g. Gurugram, Delhi NCR"
                          className="w-full bg-[#0b0c11] border border-white/15 focus:border-[#c5a059] px-3 py-2 text-xs text-white rounded-md outline-none"
                        />
                      </div>
                    </div>

                    {/* Caption */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1 font-medium">
                        Photo Caption / Details
                      </label>
                      <input
                        type="text"
                        value={formCaption}
                        onChange={(e) => setFormCaption(e.target.value)}
                        placeholder="e.g. Grand Master Suite With Fluted Marble Paneling"
                        className="w-full bg-[#0b0c11] border border-white/15 focus:border-[#c5a059] px-3 py-2 text-xs text-white rounded-md outline-none"
                        required
                      />
                    </div>

                    {/* Image Upload or URL */}
                    <div className="space-y-2">
                      <label className="block text-[11px] uppercase tracking-wider text-white/70 font-medium">
                        Select Photo File or Paste URL
                      </label>

                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="admin-new-image-upload"
                        />
                        <label
                          htmlFor="admin-new-image-upload"
                          className="flex-1 bg-[#181b26] border border-dashed border-white/20 hover:border-[#c5a059] text-xs text-white/80 py-2.5 px-4 rounded-md text-center cursor-pointer transition-colors flex items-center justify-center gap-2"
                        >
                          <Upload className="h-4 w-4 text-[#c5a059]" />
                          <span>Browse from Device</span>
                        </label>
                      </div>

                      <input
                        type="text"
                        value={formImageUrl}
                        onChange={(e) => setFormImageUrl(e.target.value)}
                        placeholder="Or paste /projects/photo.jpg or URL"
                        className="w-full bg-[#0b0c11] border border-white/15 focus:border-[#c5a059] px-3 py-2 text-xs text-white rounded-md outline-none"
                      />

                      {formImageUrl && (
                        <div className="mt-2 relative rounded-md overflow-hidden border border-[#c5a059]/40 aspect-video bg-black/40">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={formImageUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingProject}
                      className="w-full bg-gradient-to-r from-[#c5a059] to-[#dfbf77] text-[#0e1017] font-semibold py-2.5 text-xs uppercase tracking-widest rounded-md hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isSubmittingProject ? "Publishing..." : "Add to Live Website"}
                    </button>
                  </form>
                </div>

                {/* Right Gallery: All Projects List (with Edit and Delete) */}
                <div className="lg:col-span-8 bg-[#12141d] border border-white/10 rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-serif text-white">
                        Project Works ({filteredProjects.length})
                      </h2>
                      <p className="text-xs text-white/50">
                        Click <span className="text-[#c5a059] font-medium">Edit</span> to change captions/photos, or <span className="text-rose-400 font-medium">Delete</span> to remove from website.
                      </p>
                    </div>
                  </div>

                  {filteredProjects.length === 0 ? (
                    <div className="p-16 text-center text-white/40 text-xs border border-dashed border-white/10 rounded-md">
                      No project photos found matching your search.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[800px] overflow-y-auto pr-1">
                      {filteredProjects.map((proj) => (
                        <div
                          key={proj.id}
                          className="bg-[#0e1017] border border-white/10 hover:border-[#c5a059]/40 rounded-md overflow-hidden group relative flex flex-col transition-colors"
                        >
                          <div className="relative aspect-video overflow-hidden bg-black">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={proj.url}
                              alt={proj.caption}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-2 left-2 flex items-center gap-1.5">
                              <span className="bg-black/80 backdrop-blur-xs text-[10px] text-[#c5a059] font-medium px-2 py-0.5 rounded border border-[#c5a059]/30">
                                {proj.category}
                              </span>
                              {proj.isCustom && (
                                <span className="bg-sky-950/80 text-[9px] text-sky-300 px-1.5 py-0.5 rounded border border-sky-600/30">
                                  Custom
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                            <div>
                              <h4 className="font-semibold text-white text-xs">{proj.projectName}</h4>
                              <p className="text-white/70 text-[11px] line-clamp-2 mt-0.5 leading-relaxed">
                                {proj.caption}
                              </p>
                              <p className="text-white/40 text-[10px] mt-1">
                                {proj.location} • {proj.clientScope}
                              </p>
                            </div>

                            <div className="flex items-center justify-between pt-2.5 border-t border-white/5">
                              <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                                <Check className="h-3 w-3" /> Live
                              </span>

                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleStartEdit(proj)}
                                  className="px-2.5 py-1 rounded bg-[#181b26] border border-white/15 hover:border-[#c5a059] text-[11px] text-[#c5a059] flex items-center gap-1 transition-colors cursor-pointer"
                                >
                                  <Pencil className="h-3 w-3" />
                                  <span>Edit</span>
                                </button>

                                <button
                                  onClick={() => handleDeleteProject(proj)}
                                  className="px-2.5 py-1 rounded bg-rose-950/30 border border-rose-800/30 hover:border-rose-600 text-[11px] text-rose-400 flex items-center gap-1 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="h-3 w-3" />
                                  <span>Delete</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================= SECTION: SOCIAL MEDIA & SITE SETTINGS ================= */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="bg-[#12141d] border border-white/10 rounded-lg p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
                  <div>
                    <h2 className="text-lg font-serif text-white flex items-center gap-2.5">
                      <Share2 className="h-5 w-5 text-[#c5a059]" />
                      <span>Social Media &amp; Studio Settings</span>
                    </h2>
                    <p className="text-xs text-white/50 mt-1">
                      Manage official social media profile links, WhatsApp numbers, and studio contact coordinates. Changes update live across the entire website instantly.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="px-2.5 py-1 rounded bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] text-[11px] font-medium">
                      Live Sync Active
                    </span>
                  </div>
                </div>

                {settingsSuccessMessage && (
                  <div className="mt-4 p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs rounded-md flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>{settingsSuccessMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSaveSettingsSubmit} className="mt-6 space-y-6">
                  {/* Social Media Links Card */}
                  <div className="bg-[#0b0c11] border border-white/10 rounded-lg p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-[#c5a059] flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span>Social Media Channels</span>
                      </h3>
                      <span className="text-[11px] text-white/40">Visible in Footer &amp; Contact Pages</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Instagram */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] uppercase tracking-wider text-white/70 font-medium">
                          Instagram Profile URL
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="url"
                            value={settings.instagram}
                            onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                            placeholder="https://instagram.com/ssinteriors"
                            className="flex-1 bg-[#12141d] border border-white/15 focus:border-[#c5a059] px-3.5 py-2 text-xs text-white rounded-md outline-none"
                          />
                          {settings.instagram && (
                            <a
                              href={settings.instagram}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-2 rounded bg-white/5 border border-white/10 hover:border-[#c5a059] text-white/70 hover:text-white text-xs flex items-center gap-1 transition-colors"
                              title="Test Instagram Link"
                            >
                              <ExternalLink className="h-3.5 w-3.5 text-[#c5a059]" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Facebook */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] uppercase tracking-wider text-white/70 font-medium">
                          Facebook Page URL
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="url"
                            value={settings.facebook}
                            onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                            placeholder="https://facebook.com/ssinteriors"
                            className="flex-1 bg-[#12141d] border border-white/15 focus:border-[#c5a059] px-3.5 py-2 text-xs text-white rounded-md outline-none"
                          />
                          {settings.facebook && (
                            <a
                              href={settings.facebook}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-2 rounded bg-white/5 border border-white/10 hover:border-[#c5a059] text-white/70 hover:text-white text-xs flex items-center gap-1 transition-colors"
                              title="Test Facebook Link"
                            >
                              <ExternalLink className="h-3.5 w-3.5 text-[#c5a059]" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* LinkedIn */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] uppercase tracking-wider text-white/70 font-medium">
                          LinkedIn Company Profile URL
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="url"
                            value={settings.linkedin}
                            onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
                            placeholder="https://linkedin.com/company/ss-interiors"
                            className="flex-1 bg-[#12141d] border border-white/15 focus:border-[#c5a059] px-3.5 py-2 text-xs text-white rounded-md outline-none"
                          />
                          {settings.linkedin && (
                            <a
                              href={settings.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-2 rounded bg-white/5 border border-white/10 hover:border-[#c5a059] text-white/70 hover:text-white text-xs flex items-center gap-1 transition-colors"
                              title="Test LinkedIn Link"
                            >
                              <ExternalLink className="h-3.5 w-3.5 text-[#c5a059]" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* YouTube */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] uppercase tracking-wider text-white/70 font-medium">
                          YouTube Channel URL
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="url"
                            value={settings.youtube}
                            onChange={(e) => setSettings({ ...settings, youtube: e.target.value })}
                            placeholder="https://youtube.com/@ssinteriors"
                            className="flex-1 bg-[#12141d] border border-white/15 focus:border-[#c5a059] px-3.5 py-2 text-xs text-white rounded-md outline-none"
                          />
                          {settings.youtube && (
                            <a
                              href={settings.youtube}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-2 rounded bg-white/5 border border-white/10 hover:border-[#c5a059] text-white/70 hover:text-white text-xs flex items-center gap-1 transition-colors"
                              title="Test YouTube Link"
                            >
                              <ExternalLink className="h-3.5 w-3.5 text-[#c5a059]" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* WhatsApp */}
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="block text-[11px] uppercase tracking-wider text-white/70 font-medium">
                          WhatsApp Business Number (with country code, e.g. 919205784061)
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={settings.whatsapp}
                            onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                            placeholder="+91 9205784061"
                            className="flex-1 bg-[#12141d] border border-white/15 focus:border-[#c5a059] px-3.5 py-2 text-xs text-white rounded-md outline-none"
                          />
                          {settings.whatsapp && (
                            <a
                              href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-2 rounded bg-emerald-950/50 border border-emerald-600/40 hover:bg-emerald-900/50 text-emerald-300 text-xs flex items-center gap-1.5 transition-colors"
                              title="Test WhatsApp Chat Link"
                            >
                              <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                              <span className="text-[11px] font-medium">Test Chat</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Studio Contact Information */}
                  <div className="bg-[#0b0c11] border border-white/10 rounded-lg p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-[#c5a059] flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>Studio Contact &amp; Coordinates</span>
                      </h3>
                      <span className="text-[11px] text-white/40">Synced with Navbar &amp; Contact Page</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Primary Phone */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] uppercase tracking-wider text-white/70 font-medium">
                          Primary Studio Hotline Phone
                        </label>
                        <input
                          type="text"
                          value={settings.phone}
                          onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                          placeholder="+91 9205784061"
                          className="w-full bg-[#12141d] border border-white/15 focus:border-[#c5a059] px-3.5 py-2 text-xs text-white rounded-md outline-none"
                        />
                      </div>

                      {/* Alt Phone */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] uppercase tracking-wider text-white/70 font-medium">
                          Secondary / Alternate Phone
                        </label>
                        <input
                          type="text"
                          value={settings.altPhone || ""}
                          onChange={(e) => setSettings({ ...settings, altPhone: e.target.value })}
                          placeholder="+91 9891800510"
                          className="w-full bg-[#12141d] border border-white/15 focus:border-[#c5a059] px-3.5 py-2 text-xs text-white rounded-md outline-none"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] uppercase tracking-wider text-white/70 font-medium">
                          Official Inquiries Email
                        </label>
                        <input
                          type="email"
                          value={settings.email}
                          onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                          placeholder="info@ssinteriors.in"
                          className="w-full bg-[#12141d] border border-white/15 focus:border-[#c5a059] px-3.5 py-2 text-xs text-white rounded-md outline-none"
                        />
                      </div>

                      {/* Studio Address */}
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="block text-[11px] uppercase tracking-wider text-white/70 font-medium">
                          Physical Studio Address
                        </label>
                        <textarea
                          rows={2}
                          value={settings.address}
                          onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                          placeholder="Studio full address..."
                          className="w-full bg-[#12141d] border border-white/15 focus:border-[#c5a059] px-3.5 py-2 text-xs text-white rounded-md outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSavingSettings}
                      className="px-6 py-2.5 rounded-md bg-[#c5a059] hover:bg-[#d4b069] text-[#0e1017] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2 shadow-md shadow-[#c5a059]/20"
                    >
                      <Check className="h-4 w-4" />
                      <span>{isSavingSettings ? "Saving Settings..." : "Save & Publish Social Media Links"}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ================= SECTION 4: DATABASE & SQL ================= */}
          {activeTab === "database" && (
            <div className="space-y-6 max-w-4xl">
              <div className="bg-[#12141d] border border-white/10 rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-[#161924] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059]">
                      <Database className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-serif text-white">MySQL Database Engine</h3>
                      <p className="text-xs text-white/50">Next.js REST API connection pool &amp; auto-migration</p>
                    </div>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium border ${
                      dbStatus === "connected"
                        ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-300"
                        : "bg-amber-950/60 border-amber-500/50 text-amber-300"
                    }`}
                  >
                    {dbStatus === "connected" ? "MySQL Live Connected" : "Local Sync Ready"}
                  </span>
                </div>

                <p className="text-xs text-white/70 leading-relaxed">
                  SS Interiors uses a robust multi-layer data architecture: when your MySQL server is running, all consultation leads and portfolio photo updates are stored directly in SQL tables (<code className="text-[#c5a059] font-mono">leads</code> and <code className="text-[#c5a059] font-mono">projects</code>). If offline, high-speed local caching ensures zero downtime for public visitors.
                </p>

                {/* DB Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-[#0b0c11] border border-white/5 rounded p-3">
                    <span className="text-[10px] uppercase text-white/40 block">SQL Tables &amp; File Store</span>
                    <span className="text-sm font-semibold text-white mt-1 block">leads, projects, site_settings</span>
                    <span className="text-[10px] text-emerald-400 mt-1 block">Dual server &amp; SQL sync</span>
                  </div>

                  <div className="bg-[#0b0c11] border border-white/5 rounded p-3">
                    <span className="text-[10px] uppercase text-white/40 block">Current Leads In Store</span>
                    <span className="text-sm font-semibold text-white mt-1 block">{leads.length} Records</span>
                    <span className="text-[10px] text-white/40 mt-1 block">{newLeadsCount} awaiting reply</span>
                  </div>

                  <div className="bg-[#0b0c11] border border-white/5 rounded p-3">
                    <span className="text-[10px] uppercase text-white/40 block">Active Project Photos</span>
                    <span className="text-sm font-semibold text-white mt-1 block">{projects.length} Works</span>
                    <span className="text-[10px] text-white/40 mt-1 block">Fully editable &amp; synced</span>
                  </div>
                </div>

                {/* Configuration Guide */}
                <div className="bg-[#0b0c11] border border-white/10 rounded-md p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">Database Credentials (.env.local)</span>
                    <span className="text-white/40 font-mono text-[11px]">mysql2 pool</span>
                  </div>
                  <pre className="text-[11px] font-mono text-[#c5a059] bg-black/40 p-3 rounded border border-white/5 overflow-x-auto leading-relaxed">
                    {`DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=ss_interior_db`}
                  </pre>
                  <p className="text-[11px] text-white/50">
                    Tables are initialized automatically upon first REST request to <code className="text-white font-mono">/api/leads</code> or <code className="text-white font-mono">/api/projects</code>.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ================= EDIT PROJECT MODAL ================= */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#12141c] border border-[#c5a059]/40 rounded-lg shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Pencil className="h-4 w-4 text-[#c5a059]" />
                <h3 className="font-serif text-lg text-white font-medium">Edit Project Photo</h3>
              </div>
              <button
                onClick={() => setEditingProject(null)}
                className="text-white/40 hover:text-white p-1 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditSubmit} className="space-y-4">
              {/* Category */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1 font-medium">
                  Project Category
                </label>
                <select
                  value={editCategory}
                  onChange={(e) =>
                    setEditCategory(
                      e.target.value as "Residential" | "Farmhouses" | "Commercial" | "Hospitality"
                    )
                  }
                  className="w-full bg-[#0b0c11] border border-white/15 focus:border-[#c5a059] px-3 py-2 text-xs text-white rounded-md outline-none"
                >
                  <option value="Residential">Residential Projects</option>
                  <option value="Farmhouses">Expansive Farmhouses &amp; Estates</option>
                  <option value="Commercial">Commercial &amp; Corporate Spaces</option>
                  <option value="Hospitality">Hospitality &amp; Lounge Spaces</option>
                </select>
              </div>

              {/* Project Name */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1 font-medium">
                  Project Name
                </label>
                <input
                  type="text"
                  value={editProjectName}
                  onChange={(e) => setEditProjectName(e.target.value)}
                  className="w-full bg-[#0b0c11] border border-white/15 focus:border-[#c5a059] px-3 py-2 text-xs text-white rounded-md outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1 font-medium">
                    Client Scope
                  </label>
                  <input
                    type="text"
                    value={editClientScope}
                    onChange={(e) => setEditClientScope(e.target.value)}
                    className="w-full bg-[#0b0c11] border border-white/15 focus:border-[#c5a059] px-3 py-2 text-xs text-white rounded-md outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1 font-medium">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="w-full bg-[#0b0c11] border border-white/15 focus:border-[#c5a059] px-3 py-2 text-xs text-white rounded-md outline-none"
                  />
                </div>
              </div>

              {/* Caption */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1 font-medium">
                  Photo Caption
                </label>
                <input
                  type="text"
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                  className="w-full bg-[#0b0c11] border border-white/15 focus:border-[#c5a059] px-3 py-2 text-xs text-white rounded-md outline-none"
                  required
                />
              </div>

              {/* Image URL or Replace Photo */}
              <div className="space-y-2">
                <label className="block text-[11px] uppercase tracking-wider text-white/70 font-medium">
                  Image Source (URL or Replace from Device)
                </label>

                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={editFileInputRef}
                    accept="image/*"
                    onChange={handleEditFileUpload}
                    className="hidden"
                    id="admin-edit-image-upload"
                  />
                  <label
                    htmlFor="admin-edit-image-upload"
                    className="flex-1 bg-[#181b26] border border-dashed border-white/20 hover:border-[#c5a059] text-xs text-white/80 py-2 px-3 rounded-md text-center cursor-pointer transition-colors flex items-center justify-center gap-2"
                  >
                    <Upload className="h-3.5 w-3.5 text-[#c5a059]" />
                    <span>Upload Replacement Image</span>
                  </label>
                </div>

                <input
                  type="text"
                  value={editImageUrl}
                  onChange={(e) => setEditImageUrl(e.target.value)}
                  className="w-full bg-[#0b0c11] border border-white/15 focus:border-[#c5a059] px-3 py-2 text-xs text-white rounded-md outline-none"
                  required
                />

                {editImageUrl && (
                  <div className="mt-2 relative rounded-md overflow-hidden border border-white/10 aspect-video bg-black/40 max-h-36">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={editImageUrl}
                      alt="Edit Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded-md bg-[#181b26] border border-white/10 text-xs text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingEdit}
                  className="px-5 py-2 rounded-md bg-[#c5a059] hover:bg-[#d4b069] text-[#0e1017] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSavingEdit ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
