"use client";

import { useState, useEffect, useRef } from "react";
import {
  X,
  Send,
  Sparkles,
  Mail,
  MapPin,
  ExternalLink,
  ClipboardList,
  RotateCcw,
  Bot,
  User,
  CheckCircle2,
  Minimize2,
  Building2,
  Phone,
} from "lucide-react";
import { SITE } from "@/lib/site";
import { saveLead } from "@/lib/adminStore";

type CollectingStep = "none" | "name" | "email" | "phone" | "location";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  type?: "text" | "contact_card" | "lead_success";
  leadSummary?: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
}

const QUICK_PROMPTS = [
  { label: "📍 Office Address & Map", prompt: "Where is your office located and how can I visit?" },
  { label: "📝 Request Team Callback", prompt: "I would like your team to contact me." },
  { label: "🏡 Luxury Residential", prompt: "Tell me about your luxury residential and penthouse projects like DLF Camellias." },
  { label: "🌾 Country Farmhouses", prompt: "What are your services for private country estates and luxury farmhouses?" },
  { label: "💰 Cost & BOQ Process", prompt: "How do you calculate pricing and what is your turnkey execution process?" },
  { label: "🛋️ Bespoke Furniture", prompt: "Tell me about your product sourcing and bespoke European furniture." },
];

const STORAGE_MSGS_KEY = "ss_interior_chat_msgs_v3";
const STORAGE_OPEN_KEY = "ss_interior_chat_open_v3";

export default function ChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Step-by-step lead collection state
  const [collectingStep, setCollectingStep] = useState<CollectingStep>("none");
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const setDefaultGreeting = () => {
    const initialGreeting: ChatMessage = {
      id: "init-1",
      sender: "bot",
      text: `Welcome to **SS Interiors**! I am your architectural design assistant.\n\nWhether you're exploring ideas for a luxury residence, private farmhouse, or executive workspace, I'm here to answer your questions. What would you like to explore today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([initialGreeting]);
  };

  // Restore chat messages and open state from sessionStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const savedMsgs = sessionStorage.getItem(STORAGE_MSGS_KEY);
      if (savedMsgs) {
        const parsed = JSON.parse(savedMsgs);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        } else {
          setDefaultGreeting();
        }
      } else {
        setDefaultGreeting();
      }

      const savedOpen = sessionStorage.getItem(STORAGE_OPEN_KEY);
      if (savedOpen === "true") {
        setIsOpen(true);
      }
    } catch {
      setDefaultGreeting();
    }
  }, []);

  // Persist messages to sessionStorage
  useEffect(() => {
    if (messages.length > 0) {
      try {
        sessionStorage.setItem(STORAGE_MSGS_KEY, JSON.stringify(messages));
      } catch {}
    }
  }, [messages]);

  // Persist open/minimized state to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_OPEN_KEY, isOpen ? "true" : "false");
    } catch {}
  }, [isOpen]);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, loading, collectingStep]);

  // Focus input when step changes
  useEffect(() => {
    if (collectingStep !== "none") {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [collectingStep]);

  const handleOpen = () => {
    setIsOpen(true);
    setUnreadCount(0);
  };

  // Start guided detail collection
  const startDetailCollection = () => {
    setCollectingStep("name");
    const askNameMsg: ChatMessage = {
      id: `bot-${Date.now()}`,
      sender: "bot",
      text: `We would love to connect! Let's get your details so our team can revert to you with tailored design concepts.\n\n**Step 1 of 4:** Please enter your **Full Name**:`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, askNameMsg]);
  };

  // Open map and start detail collection one by one
  const handleOpenMapAndOfferDetails = () => {
    window.open(SITE.mapUrl, "_blank", "noopener,noreferrer");
    setCollectingStep("name");
    const followUpMsg: ChatMessage = {
      id: `bot-${Date.now()}`,
      sender: "bot",
      text: `📍 Google Maps opened in a new tab for our studio at **${SITE.address}**.\n\nWhile you explore our location, let's connect our senior design team with you!\n\n**Step 1 of 4:** Please enter your **Full Name**:`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, followUpMsg]);
  };

  // Process guided step-by-step submission
  const handleStepSubmit = async (userText: string) => {
    const trimmed = userText.trim();
    if (!trimmed) return;

    // 1. User message bubble
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");

    if (collectingStep === "name") {
      const updated = { ...leadForm, name: trimmed };
      setLeadForm(updated);
      setCollectingStep("email");

      setTimeout(() => {
        const nextMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: `Thank you, **${trimmed}**!\n\n**Step 2 of 4:** What is your **Email Address** where we can email design concepts, 3D portfolios, and estimates?`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, nextMsg]);
      }, 300);
      return;
    }

    if (collectingStep === "email") {
      const updated = { ...leadForm, email: trimmed };
      setLeadForm(updated);
      setCollectingStep("phone");

      setTimeout(() => {
        const nextMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: `Perfect! **Step 3 of 4:** Please provide your **Contact Phone Number** so our senior consultant can coordinate with you:`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, nextMsg]);
      }, 300);
      return;
    }

    if (collectingStep === "phone") {
      const updated = { ...leadForm, phone: trimmed };
      setLeadForm(updated);
      setCollectingStep("location");

      setTimeout(() => {
        const nextMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: `Almost done! **Step 4 of 4:** Where is your **Property Located** and what type of project are you planning (e.g. DLF Camellias 4BHK, Chhatarpur Farmhouse, Corporate Office)?`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, nextMsg]);
      }, 300);
      return;
    }

    if (collectingStep === "location") {
      const finalLead = {
        name: leadForm.name || "Website Visitor",
        email: leadForm.email || "",
        phone: leadForm.phone || "",
        location: trimmed,
        category: "Chatbot Guided Inquiry",
        message: `Property / Project Details: ${trimmed}`,
      };

      setCollectingStep("none");
      setLeadForm({ name: "", email: "", phone: "", location: "" });

      // Save locally in adminStore
      saveLead(finalLead);

      // Post to /api/leads which sends email to info@ssinteriors.in and stores in leads.json & MySQL
      try {
        await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalLead),
        });
      } catch (err) {
        console.warn("Failed to dispatch lead via /api/leads:", err);
      }

      setTimeout(() => {
        const successMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          type: "lead_success",
          leadSummary: {
            name: finalLead.name,
            email: finalLead.email,
            phone: finalLead.phone,
            location: finalLead.location,
          },
          text: `✨ **Thank you, ${finalLead.name}!**\n\nYour consultation request has been submitted and sent to our studio leadership at **${SITE.email}**.\n\nOur senior architect will review your project details for **${finalLead.location}** and revert back to you shortly at **${finalLead.email}** / **${finalLead.phone}**.\n\nFeel free to explore our studio or continue asking any questions!`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, successMsg]);
      }, 400);
      return;
    }
  };

  // General message handler (AI or command)
  const handleSendMessage = async (textToSend?: string) => {
    const userText = (textToSend || inputMessage).trim();
    if (!userText || loading) return;

    // If currently in step-by-step collector, route there
    if (collectingStep !== "none") {
      handleStepSubmit(userText);
      return;
    }

    // Check if user is asking to be contacted or to visit/get address
    const lower = userText.toLowerCase();
    const isContactQuery =
      lower.includes("contact") ||
      lower.includes("location") ||
      lower.includes("address") ||
      lower.includes("office") ||
      lower.includes("visit") ||
      lower.includes("reach") ||
      lower.includes("kahan") ||
      lower.includes("kaha") ||
      lower.includes("sampark") ||
      lower.includes("callback") ||
      lower.includes("call me");

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setLoading(true);

    // Smart email address detection if user typed email unprompted
    const emailMatch = userText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) {
      const extractedEmail = emailMatch[0].trim();
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Chatbot Client",
          phone: "-",
          email: extractedEmail,
          category: "Chatbot Direct Email Share",
          message: userText,
        }),
      }).catch(() => {});
    }

    try {
      // Build conversation history for API
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.sender === "user" ? ("user" as const) : ("model" as const),
        text: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: historyPayload,
        }),
      });

      const data = await res.json();
      let botReply =
        data.reply ||
        `Our studio is located at **${SITE.address}**.\n\nYou can view our exact studio location on Google Maps or fill your details for our team to contact you.`;

      const hasContactTag = botReply.includes("[ACTION:CONTACT_CARD]");
      botReply = botReply.replace(/\[ACTION:CONTACT_CARD\]/g, "").trim();

      const hasMapUrl =
        botReply.toLowerCase().includes("google.com/maps") ||
        botReply.toLowerCase().includes("maps.app.goo.gl");

      const shouldShowContactCard = hasContactTag || isContactQuery || hasMapUrl;

      if (shouldShowContactCard) {
        // Strip raw or duplicate markdown map links so the button handles it cleanly
        botReply = botReply
          .replace(/\[(?:View on Google Maps|Google Maps Location|Google Maps|View on Maps|Map)\]\(https?:\/\/[^\)]+\)/gi, "")
          .replace(/https?:\/\/(?:www\.)?(?:google\.com\/maps|maps\.app\.goo\.gl)\S+/gi, "")
          .replace(/[\n\r\s]+$/g, "")
          .trim();
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        type: shouldShowContactCard ? "contact_card" : "text",
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        type: isContactQuery ? "contact_card" : "text",
        text: `Our design studio is located at **${SITE.address}**.\n\nYou can view our location on Google Maps or share your details for our team to contact you.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCollectingStep("none");
    setLeadForm({ name: "", email: "", phone: "", location: "" });
    const greeting: ChatMessage = {
      id: `init-${Date.now()}`,
      sender: "bot",
      text: `Chat refreshed. How can we assist your architectural or interior project today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([greeting]);
    try {
      sessionStorage.setItem(STORAGE_MSGS_KEY, JSON.stringify([greeting]));
    } catch {}
  };

  // Helper to render markdown links and bold text cleanly
  const renderFormattedText = (content: string) => {
    const parts = content.split(/(\[.*?\]\(.*?\)|\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      // Markdown link [text](url)
      const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        return (
          <a
            key={index}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold font-medium underline underline-offset-2 hover:opacity-80 break-words"
          >
            {linkMatch[1]}
          </a>
        );
      }
      // Markdown bold **text**
      const boldMatch = part.match(/\*\*(.*?)\*\*/);
      if (boldMatch) {
        return (
          <strong key={index} className="font-semibold text-fg">
            {boldMatch[1]}
          </strong>
        );
      }
      return part;
    });
  };

  // Placeholder text for input based on state
  const getInputPlaceholder = () => {
    if (collectingStep === "name") return "Step 1/4: Enter your Full Name...";
    if (collectingStep === "email") return "Step 2/4: Enter your Email Address...";
    if (collectingStep === "phone") return "Step 3/4: Enter your Phone Number...";
    if (collectingStep === "location") return "Step 4/4: Enter Property Location & Scope...";
    return "Type your question or requirement...";
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 select-none">
      {/* Floating Trigger Button: Pure Circular Bot Icon (Mobile & Desktop) */}
      {!isOpen && (
        <button
          suppressHydrationWarning
          onClick={handleOpen}
          aria-label="SS Interiors AI Assistant"
          title="SS Interiors AI Assistant"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#1c1b18] border-2 border-gold/70 text-gold shadow-2xl transition-all duration-300 hover:scale-110 hover:border-gold hover:shadow-[0_0_20px_rgba(201,160,80,0.35)] cursor-pointer"
        >
          <Bot className="h-7 w-7 text-gold transition-transform duration-300 group-hover:scale-110" />
          <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-[#1c1b18]" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-md">
              {unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="flex flex-col w-[94vw] sm:w-[420px] h-[600px] max-h-[88vh] rounded-2xl bg-white border border-gold/30 shadow-2xl overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#1a1916] text-white border-b border-gold/30">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center h-9 w-9 rounded-full gold-bg text-white shadow-sm">
                <Bot className="h-4 w-4" />
                <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#1a1916]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-sm font-medium tracking-wide text-white">
                    SS Interiors Assistant
                  </h3>
                  <span className="text-[9px] uppercase tracking-widest text-gold bg-gold/15 px-1.5 py-0.5 rounded-xs font-semibold">
                    AI
                  </span>
                </div>
                <p className="text-[10px] text-white/60 font-light">Senior Architectural Consultant</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleReset}
                title="Restart Conversation"
                className="p-1.5 text-white/60 hover:text-gold transition-colors cursor-pointer rounded-xs"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Minimize Chat"
                className="p-1.5 text-white/60 hover:text-white transition-colors cursor-pointer rounded-xs"
              >
                <Minimize2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick Info Ribbon */}
          <div className="flex items-center justify-between px-3.5 py-2 bg-[#fcf9f4] border-b border-line text-[11px] text-muted font-light">
            <button
              onClick={handleOpenMapAndOfferDetails}
              className="flex items-center gap-1.5 text-fg hover:text-gold transition-colors cursor-pointer"
            >
              <MapPin className="h-3.5 w-3.5 text-gold shrink-0" />
              <span>Sector 28, Gurugram</span>
              <ExternalLink className="h-2.5 w-2.5 text-muted" />
            </button>
            <a
              href={`mailto:${SITE.email}`}
              className="text-gold font-medium hover:underline flex items-center gap-1.5"
            >
              <Mail className="h-3.5 w-3.5" /> {SITE.email}
            </a>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#faf8f5]/60 text-xs">
            {messages.map((m) => (
              <div key={m.id} className="space-y-2">
                <div
                  className={`flex gap-2.5 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.sender === "bot" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1a1916] text-gold border border-gold/30 mt-0.5">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-xl px-3.5 py-2.5 leading-relaxed shadow-xs ${
                      m.sender === "user"
                        ? "gold-bg text-white rounded-tr-xs"
                        : "bg-white text-fg border border-line rounded-tl-xs whitespace-pre-line"
                    }`}
                  >
                    <div className="break-words">
                      {m.sender === "bot" ? renderFormattedText(m.text) : m.text}
                    </div>
                    <span
                      className={`block text-[9px] mt-1 text-right font-light ${
                        m.sender === "user" ? "text-white/70" : "text-muted/60"
                      }`}
                    >
                      {m.timestamp}
                    </span>
                  </div>

                  {m.sender === "user" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full gold-bg text-white shadow-xs mt-0.5">
                      <User className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>

                {/* Interactive Contact & Location Card */}
                {m.type === "contact_card" && (
                  <div className="ml-9 mr-2 rounded-xl bg-gradient-to-br from-[#fbf8f2] to-[#ffffff] border border-gold/40 p-3.5 shadow-sm space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="flex items-start gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1c1b18] text-gold border border-gold/30">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-xs font-semibold text-fg tracking-wide">
                          SS Interiors Design Studio
                        </h4>
                        <p className="text-[11px] text-muted leading-snug mt-0.5">
                          {SITE.address}
                        </p>
                      </div>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-line/60">
                      <button
                        onClick={handleOpenMapAndOfferDetails}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-gold/10 text-fg hover:text-gold border border-line hover:border-gold/60 text-[11px] font-medium transition cursor-pointer shadow-xs"
                      >
                        <MapPin className="h-3.5 w-3.5 text-gold shrink-0" />
                        <span>View Office on Map</span>
                        <ExternalLink className="h-3 w-3 text-muted shrink-0" />
                      </button>

                      <button
                        onClick={startDetailCollection}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg gold-bg text-white hover:brightness-105 text-[11px] font-medium transition cursor-pointer shadow-xs"
                      >
                        <ClipboardList className="h-3.5 w-3.5 shrink-0" />
                        <span>Fill Details for Contact</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Lead Submission Success Card */}
                {m.type === "lead_success" && m.leadSummary && (
                  <div className="ml-9 mr-2 rounded-xl bg-emerald-50/70 border border-emerald-200/80 p-3 shadow-xs space-y-1.5 animate-in fade-in duration-300">
                    <div className="flex items-center gap-2 text-emerald-800 font-medium text-xs">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>Inquiry Dispatched to {SITE.email}</span>
                    </div>
                    <div className="text-[10px] text-emerald-950/80 pl-6 space-y-0.5 font-light">
                      <p>• <strong>Client:</strong> {m.leadSummary.name}</p>
                      <p>• <strong>Email:</strong> {m.leadSummary.email}</p>
                      <p>• <strong>Phone:</strong> {m.leadSummary.phone}</p>
                      <p>• <strong>Location:</strong> {m.leadSummary.location}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Active Step Indicator Banner */}
            {collectingStep !== "none" && (
              <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-gold/10 border border-gold/30 text-[11px] text-fg animate-in fade-in duration-200">
                <span className="font-medium flex items-center gap-1.5">
                  <ClipboardList className="h-3.5 w-3.5 text-gold" />
                  {collectingStep === "name" && "Step 1 of 4: Enter Full Name"}
                  {collectingStep === "email" && "Step 2 of 4: Enter Email Address"}
                  {collectingStep === "phone" && "Step 3 of 4: Enter Phone Number"}
                  {collectingStep === "location" && "Step 4 of 4: Enter Property Location & Scope"}
                </span>
                <button
                  onClick={() => setCollectingStep("none")}
                  className="text-[10px] text-muted hover:text-fg underline cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Typing Loader Indicator */}
            {loading && (
              <div className="flex items-center gap-2 text-muted text-[11px] font-light pl-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a1916] text-gold">
                  <Bot className="h-3 w-3" />
                </div>
                <div className="flex items-center gap-1 bg-white border border-line px-3 py-2 rounded-xl rounded-tl-xs shadow-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-gold animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-gold animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel (Hidden when collecting details) */}
          {collectingStep === "none" && (
            <div className="px-3 pt-2 pb-1 border-t border-line/70 bg-white">
              <p className="text-[10px] uppercase tracking-wider text-muted font-medium mb-1.5 px-1">
                Suggested Topics:
              </p>
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {QUICK_PROMPTS.map((qp, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(qp.prompt)}
                    disabled={loading}
                    className="shrink-0 text-[10px] font-medium bg-[#faf8f5] hover:bg-gold/15 text-fg hover:text-gold border border-line hover:border-gold/50 px-2.5 py-1 rounded-full transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {qp.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 p-3 bg-white border-t border-line"
          >
            <input
              ref={inputRef}
              type={collectingStep === "email" ? "email" : "text"}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={getInputPlaceholder()}
              className="flex-1 bg-[#faf8f5] border border-line focus:border-gold px-3.5 py-2 text-xs text-fg rounded-full outline-none transition placeholder:text-muted/60"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || loading}
              aria-label="Send message"
              className="flex h-8 w-8 items-center justify-center rounded-full gold-bg text-white hover:brightness-105 transition disabled:opacity-40 shadow-xs cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
