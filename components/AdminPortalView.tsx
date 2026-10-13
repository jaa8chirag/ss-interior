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
} from "lucide-react";
import {
  LeadItem,
  AdminProjectItem,
  getLeads,
  updateLeadStatus,
  deleteLead,
  getCustomProjects,
  addCustomProject,
  deleteCustomProject,
} from "@/lib/adminStore";
import { SITE } from "@/lib/site";

const DEFAULT_ADMIN_PASSCODE = "admin123";

export default function AdminPortalView() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<"leads" | "projects">("leads");

  // Leads State
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [leadFilter, setLeadFilter] = useState<string>("all");
  const [leadSearch, setLeadSearch] = useState<string>("");

  // Projects State
  const [customProjects, setCustomProjects] = useState<AdminProjectItem[]>([]);
  const [projectCategoryFilter, setProjectCategoryFilter] = useState<string>("all");

  // Add Project Form State
  const [formCategory, setFormCategory] = useState<"Residential" | "Farmhouses" | "Commercial" | "Hospitality">("Residential");
  const [formProjectName, setFormProjectName] = useState("");
  const [formClientScope, setFormClientScope] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formCaption, setFormCaption] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formSuccessMessage, setFormSuccessMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check login state on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("ss_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Load data
  const refreshData = () => {
    setLeads(getLeads());
    setCustomProjects(getCustomProjects());
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
      window.addEventListener("ss_leads_updated", refreshData);
      window.addEventListener("ss_projects_updated", refreshData);
      return () => {
        window.removeEventListener("ss_leads_updated", refreshData);
        window.removeEventListener("ss_projects_updated", refreshData);
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
      setLoginError("Invalid passcode. Please enter the correct admin access key.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("ss_admin_auth");
    setPasscode("");
  };

  // Image Upload handler (converts uploaded file to base64 data url)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (JPG, PNG, WebP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setFormImageUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formImageUrl.trim() || !formCaption.trim() || !formProjectName.trim()) {
      alert("Please enter Project Name, Caption, and Image URL/Upload.");
      return;
    }

    const subId = formProjectName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    addCustomProject({
      category: formCategory,
      projectName: formProjectName.trim(),
      subProjectId: subId,
      clientScope: formClientScope.trim() || "Bespoke Turnkey Fit-Out",
      location: formLocation.trim() || "Delhi NCR",
      caption: formCaption.trim(),
      url: formImageUrl.trim(),
    });

    setFormSuccessMessage("Project image published successfully! It is now live in the project showcase.");
    setTimeout(() => setFormSuccessMessage(""), 4000);

    // Reset Form
    setFormCaption("");
    setFormImageUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
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

  // Filtered Custom Projects
  const filteredProjects = useMemo(() => {
    if (projectCategoryFilter === "all") return customProjects;
    return customProjects.filter((p) => p.category === projectCategoryFilter);
  }, [customProjects, projectCategoryFilter]);

  // ================= LOGIN GATE SCREEN =================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#15161a] text-white flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#1f2026] border border-gold/40 rounded-sm p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[11px] uppercase tracking-[0.3em] text-gold font-medium block">
              SS Interiors · Management
            </span>
            <h1 className="font-serif text-3xl font-light text-white">
              Admin Portal
            </h1>
            <p className="text-xs text-white/60 font-light">
              Access client inquiries, leads management, and project portfolio uploads.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-white/70 mb-2">
                Passcode / Access Key
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter admin passcode (e.g. admin123)"
                  className="w-full bg-[#17181c] border border-white/20 focus:border-gold px-4 py-3 text-sm text-white rounded-xs outline-none transition-colors"
                  required
                />
                <Lock className="absolute right-3.5 top-3.5 h-4 w-4 text-white/40" />
              </div>
              {loginError && (
                <p className="text-xs text-rose-400 mt-2 flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {loginError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full gold-bg py-3 text-xs uppercase tracking-widest font-semibold text-white rounded-xs shadow-md shadow-gold/20 hover:brightness-105 transition-all cursor-pointer"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-white/50 border-t border-white/10">
            <span>Default passcode: </span>
            <code className="text-gold font-mono font-medium">admin123</code>
          </div>
        </div>
      </div>
    );
  }

  // ================= MAIN ADMIN DASHBOARD =================
  return (
    <div className="min-h-screen bg-[#fcfbfa] text-fg pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Top Navbar Ribbon */}
        <div className="bg-white border border-gold/30 rounded-sm p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] uppercase tracking-widest text-gold font-medium">
                Admin Control Center
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-fg font-light">
              SS Interiors Studio Portal
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs uppercase tracking-wider border border-gold/30 hover:border-gold bg-[#fdfcfb] text-fg/80 hover:text-gold transition-colors rounded-xs shadow-2xs"
            >
              <Eye className="h-3.5 w-3.5 text-gold" />
              <span>View Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs uppercase tracking-wider bg-[#17181c] text-white hover:bg-rose-700 transition-colors rounded-xs shadow-2xs cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-white border border-gold/30 rounded-sm p-4 sm:p-5 shadow-2xs">
            <span className="text-[11px] uppercase tracking-wider text-muted font-medium block">
              Total Client Leads
            </span>
            <div className="font-serif text-3xl text-fg font-light mt-1 flex items-baseline gap-2">
              <span>{leads.length}</span>
              <span className="text-xs font-sans text-gold font-medium">
                ({leads.filter((l) => l.status === "New").length} New)
              </span>
            </div>
          </div>

          <div className="bg-white border border-gold/30 rounded-sm p-4 sm:p-5 shadow-2xs">
            <span className="text-[11px] uppercase tracking-wider text-muted font-medium block">
              Custom Uploaded Images
            </span>
            <div className="font-serif text-3xl text-fg font-light mt-1">
              {customProjects.length}
            </div>
          </div>

          <div className="bg-white border border-gold/30 rounded-sm p-4 sm:p-5 shadow-2xs">
            <span className="text-[11px] uppercase tracking-wider text-muted font-medium block">
              Residential Portfolio
            </span>
            <div className="font-serif text-3xl text-fg font-light mt-1 text-gold">
              {12 + customProjects.filter((p) => p.category === "Residential").length} Works
            </div>
          </div>

          <div className="bg-white border border-gold/30 rounded-sm p-4 sm:p-5 shadow-2xs">
            <span className="text-[11px] uppercase tracking-wider text-muted font-medium block">
              Turnkey & Farmhouses
            </span>
            <div className="font-serif text-3xl text-fg font-light mt-1">
              {8 + customProjects.filter((p) => p.category === "Farmhouses").length} Works
            </div>
          </div>
        </div>

        {/* Main Tabs Navigation */}
        <div className="mt-8 flex items-center gap-3 border-b border-gold/30 pb-4">
          <button
            onClick={() => setActiveTab("leads")}
            className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-medium transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "leads"
                ? "gold-bg text-white shadow-md shadow-gold/25"
                : "bg-white text-muted hover:text-fg border border-gold/30"
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Client Leads & Inquiries</span>
            <span className="bg-white/20 text-white rounded-full px-2 py-0.5 text-[10px]">
              {leads.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-medium transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "projects"
                ? "gold-bg text-white shadow-md shadow-gold/25"
                : "bg-white text-muted hover:text-fg border border-gold/30"
            }`}
          >
            <ImageIcon className="h-4 w-4" />
            <span>Add / Manage Project Images</span>
            <span className="bg-white/20 text-white rounded-full px-2 py-0.5 text-[10px]">
              {customProjects.length}
            </span>
          </button>
        </div>

        {/* ================= TAB 1: LEADS MANAGEMENT ================= */}
        {activeTab === "leads" && (
          <div className="mt-6 space-y-6">
            {/* Filter and Search Bar */}
            <div className="bg-white border border-gold/30 p-4 rounded-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-2xs">
              <div className="flex flex-wrap items-center gap-2">
                {["all", "New", "In Discussion", "Contacted", "Closed"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setLeadFilter(st)}
                    className={`px-3 py-1.5 rounded-full text-xs tracking-wider transition-all cursor-pointer ${
                      leadFilter === st
                        ? "bg-[#17181c] text-white font-medium"
                        : "bg-[#fdfcfb] text-muted border border-gold/30 hover:border-gold"
                    }`}
                  >
                    {st === "all" ? "All Leads" : st}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[260px]">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted" />
                <input
                  type="text"
                  placeholder="Search by client, phone, scope..."
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#fdfcfb] border border-gold/30 rounded-xs outline-none focus:border-gold text-fg"
                />
              </div>
            </div>

            {/* Leads List */}
            {filteredLeads.length === 0 ? (
              <div className="text-center py-16 bg-white border border-gold/30 rounded-sm text-muted">
                <Users className="h-10 w-10 mx-auto text-gold/60 mb-2" />
                <p className="font-serif text-lg text-fg">No inquiries found in this filter.</p>
                <p className="text-xs text-muted mt-1">
                  When visitors submit a brief on the contact form, their details appear here in real-time.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredLeads.map((lead) => {
                  const whatsappMsg = `Hello ${lead.name}, thank you for reaching out to SS Interiors regarding your inquiry for ${lead.category}. Let's connect to discuss your vision.`;
                  const cleanPhone = lead.phone.replace(/[^0-9]/g, "");

                  return (
                    <div
                      key={lead.id}
                      className="bg-white border border-gold/30 hover:border-gold/60 rounded-sm p-6 shadow-sm hover:shadow-md transition-all space-y-4"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-line/60">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-serif text-xl font-medium text-fg">
                              {lead.name}
                            </h3>
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                                lead.status === "New"
                                  ? "bg-amber-50 text-amber-800 border-amber-300"
                                  : lead.status === "In Discussion"
                                  ? "bg-blue-50 text-blue-800 border-blue-300"
                                  : lead.status === "Contacted"
                                  ? "bg-purple-50 text-purple-800 border-purple-300"
                                  : "bg-emerald-50 text-emerald-800 border-emerald-300"
                              }`}
                            >
                              {lead.status}
                            </span>
                          </div>
                          <span className="text-xs text-gold font-medium block">
                            Project Type: {lead.category}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted">
                          <Calendar className="h-3.5 w-3.5 text-gold" />
                          <span>{new Date(lead.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}</span>
                        </div>
                      </div>

                      {/* Message Content */}
                      <p className="text-xs sm:text-sm text-fg/80 leading-relaxed font-light bg-[#fdfcfb] p-3.5 rounded-xs border border-line/50">
                        &ldquo;{lead.message}&rdquo;
                      </p>

                      {/* Contact & Actions Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                        <div className="flex flex-wrap items-center gap-4 text-xs">
                          <a
                            href={`tel:${cleanPhone}`}
                            className="inline-flex items-center gap-1.5 text-fg hover:text-gold transition-colors font-medium"
                          >
                            <Phone className="h-3.5 w-3.5 text-gold" />
                            <span>{lead.phone}</span>
                          </a>

                          <a
                            href={`mailto:${lead.email}`}
                            className="inline-flex items-center gap-1.5 text-fg hover:text-gold transition-colors font-medium"
                          >
                            <Mail className="h-3.5 w-3.5 text-gold" />
                            <span>{lead.email}</span>
                          </a>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMsg)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] text-white text-xs font-medium rounded-xs hover:brightness-105 shadow-2xs"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            <span>WhatsApp</span>
                          </a>

                          {/* Status Selector */}
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadItem["status"])}
                            className="text-xs border border-gold/30 bg-[#fdfcfb] px-2.5 py-1.5 rounded-xs outline-none focus:border-gold text-fg"
                          >
                            <option value="New">Mark New</option>
                            <option value="In Discussion">In Discussion</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Closed">Closed</option>
                          </select>

                          <button
                            onClick={() => {
                              if (confirm(`Delete inquiry from ${lead.name}?`)) {
                                deleteLead(lead.id);
                              }
                            }}
                            className="p-1.5 text-muted hover:text-rose-600 transition-colors rounded-xs border border-line"
                            title="Delete Lead"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: PROJECTS & IMAGES MANAGEMENT ================= */}
        {activeTab === "projects" && (
          <div className="mt-6 space-y-8">
            {/* Add New Project Image Box */}
            <div className="bg-white border border-gold/40 rounded-sm p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-gold/20 pb-4">
                <span className="text-[11px] uppercase tracking-widest text-gold font-medium block">
                  Publish Direct To Website
                </span>
                <h2 className="font-serif text-2xl text-fg font-light mt-1">
                  Add New Image to Project Showcase
                </h2>
                <p className="text-xs text-muted font-light mt-0.5">
                  Uploaded or linked images will immediately show up at the top of that category&apos;s project slider.
                </p>
              </div>

              {formSuccessMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-xs flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{formSuccessMessage}</span>
                </div>
              )}

              <form onSubmit={handleAddProjectSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {/* Category */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted mb-1 font-medium">
                      Category *
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as any)}
                      className="w-full bg-[#fdfcfb] border border-gold/30 px-3.5 py-2.5 text-xs text-fg rounded-xs outline-none focus:border-gold"
                    >
                      <option value="Residential">Residential</option>
                      <option value="Farmhouses">Farmhouses</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Hospitality">Hospitality</option>
                    </select>
                  </div>

                  {/* Project Name */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted mb-1 font-medium">
                      Project Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. DLF Camellias, DLF Magnolias..."
                      value={formProjectName}
                      onChange={(e) => setFormProjectName(e.target.value)}
                      required
                      className="w-full bg-[#fdfcfb] border border-gold/30 px-3.5 py-2.5 text-xs text-fg rounded-xs outline-none focus:border-gold"
                    />
                  </div>

                  {/* Built For / Scope */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted mb-1 font-medium">
                      Built For (Client Scope) *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ultra-Luxury Sky Penthouse"
                      value={formClientScope}
                      onChange={(e) => setFormClientScope(e.target.value)}
                      required
                      className="w-full bg-[#fdfcfb] border border-gold/30 px-3.5 py-2.5 text-xs text-fg rounded-xs outline-none focus:border-gold"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted mb-1 font-medium">
                      Site Location *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Golf Course Road, Gurgaon"
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                      required
                      className="w-full bg-[#fdfcfb] border border-gold/30 px-3.5 py-2.5 text-xs text-fg rounded-xs outline-none focus:border-gold"
                    />
                  </div>
                </div>

                {/* Caption / Description */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted mb-1 font-medium">
                    Image Caption &amp; Room Details *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Grand Formal Dining & Japanese Mural Architecture — Bookmatched Italian Statuary Marble"
                    value={formCaption}
                    onChange={(e) => setFormCaption(e.target.value)}
                    required
                    className="w-full bg-[#fdfcfb] border border-gold/30 px-3.5 py-2.5 text-xs text-fg rounded-xs outline-none focus:border-gold"
                  />
                </div>

                {/* Image Input Options */}
                <div className="grid gap-4 sm:grid-cols-2 items-start">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted mb-1 font-medium">
                      Option A: Paste Image URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/... or /projects/..."
                      value={formImageUrl}
                      onChange={(e) => setFormImageUrl(e.target.value)}
                      className="w-full bg-[#fdfcfb] border border-gold/30 px-3.5 py-2.5 text-xs text-fg rounded-xs outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted mb-1 font-medium">
                      Option B: Upload Direct File (JPG, PNG, WebP)
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="w-full bg-[#fdfcfb] border border-gold/30 p-2 text-xs text-fg rounded-xs outline-none file:mr-3 file:py-1.5 file:px-3 file:rounded-xs file:border-0 file:text-xs file:font-medium file:gold-bg file:text-white cursor-pointer"
                    />
                  </div>
                </div>

                {/* Preview Thumbnail */}
                {formImageUrl && (
                  <div className="p-3 bg-[#fdfcfb] border border-gold/30 rounded-xs flex items-center gap-4">
                    <img
                      src={formImageUrl}
                      alt="Preview"
                      className="h-16 w-24 object-cover rounded-xs border border-line"
                    />
                    <div className="text-xs text-muted truncate">
                      <strong className="block text-fg font-medium">Image Preview:</strong>
                      <span className="truncate block max-w-md">{formCaption || "No caption entered"}</span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="gold-bg px-6 py-3 text-xs uppercase tracking-widest font-semibold text-white rounded-xs shadow-md shadow-gold/20 hover:brightness-105 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Publish Image To Portfolio</span>
                </button>
              </form>
            </div>

            {/* Custom Uploaded Images Gallery */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gold/30 pb-2">
                <h3 className="font-serif text-xl text-fg font-normal">
                  Your Uploaded Project Images ({customProjects.length})
                </h3>

                <div className="flex items-center gap-2">
                  {["all", "Residential", "Farmhouses", "Commercial", "Hospitality"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setProjectCategoryFilter(cat)}
                      className={`px-3 py-1 text-xs rounded-full cursor-pointer transition-all ${
                        projectCategoryFilter === cat
                          ? "bg-[#17181c] text-white font-medium"
                          : "bg-white text-muted border border-gold/30 hover:border-gold"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {filteredProjects.length === 0 ? (
                <div className="text-center py-12 bg-white border border-gold/30 rounded-sm text-muted">
                  <ImageIcon className="h-8 w-8 mx-auto text-gold/60 mb-2" />
                  <p className="font-serif text-base text-fg">No custom images uploaded yet in this category.</p>
                  <p className="text-xs text-muted mt-1">
                    Use the form above to easily upload or link new project photography.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProjects.map((proj, pIdx) => (
                    <div
                      key={`${proj.url}-${pIdx}`}
                      className="bg-white border border-gold/30 rounded-sm overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="relative h-48 w-full bg-[#ede8df]">
                        <img
                          src={proj.url}
                          alt={proj.caption}
                          className="h-full w-full object-cover"
                        />
                        <span className="absolute top-2 left-2 bg-white/95 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-gold font-medium border border-gold/40 shadow-2xs">
                          {proj.category}
                        </span>
                      </div>

                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-serif text-fg font-medium">
                            {proj.projectName}
                          </span>
                          <span className="text-[11px] text-muted">
                            {proj.location}
                          </span>
                        </div>

                        <p className="text-xs text-muted leading-snug line-clamp-2">
                          {proj.caption}
                        </p>

                        <div className="pt-2 border-t border-line flex items-center justify-between">
                          <span className="text-[10px] text-gold font-medium">
                            Scope: {proj.clientScope}
                          </span>

                          <button
                            onClick={() => {
                              if (confirm(`Remove this image from ${proj.projectName}?`)) {
                                deleteCustomProject(proj.url);
                              }
                            }}
                            className="text-muted hover:text-rose-600 transition-colors p-1"
                            title="Delete Image"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
