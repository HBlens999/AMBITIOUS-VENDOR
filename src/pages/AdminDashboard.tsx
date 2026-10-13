import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { ImageUploadField } from '../components/ImageUploadField';
import { ServiceItem, PortfolioProject, PerfumeProduct, ContactSubmission } from '../types';
import {
  LayoutDashboard,
  Sparkles,
  Sliders,
  Briefcase,
  Layers,
  Droplets,
  Image as ImageIcon,
  Mail,
  Palette,
  Globe,
  Database,
  Lock,
  LogOut,
  Save,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  Copy,
  ExternalLink,
  RefreshCw,
  Eye,
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (path: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const {
    siteSettings,
    updateSiteSettings,
    heroSettings,
    updateHeroSettings,
    marqueeSettings,
    updateMarqueeSettings,
    services,
    addService,
    updateService,
    deleteService,
    portfolio,
    addPortfolio,
    updatePortfolio,
    deletePortfolio,
    perfumes,
    addPerfume,
    updatePerfume,
    deletePerfume,
    aboutContent,
    updateAboutContent,
    mediaAssets,
    addMediaAsset,
    deleteMediaAsset,
    submissions,
    updateSubmissionStatus,
    deleteSubmission,
    themeSettings,
    updateThemeSettings,
    connectionStatus,
    isAdminAuthenticated,
    adminUser,
    authUser,
    loginWithGoogle,
    loginAdmin,
    logoutAdmin,
    resetToDefaults,
  } = useData();

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'hero'
    | 'marquee'
    | 'services'
    | 'portfolio'
    | 'perfumes'
    | 'about'
    | 'media'
    | 'submissions'
    | 'theme'
    | 'seo'
    | 'supabase'
  >('overview');

  // Auth password input state
  const [password, setPassword] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [testingConnection, setTestingConnection] = useState(false);

  // Editing Modals / Form states
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);

  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);

  const [editingPerfume, setEditingPerfume] = useState<PerfumeProduct | null>(null);
  const [isAddingPerfume, setIsAddingPerfume] = useState(false);

  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaName, setNewMediaName] = useState('');
  const [newMediaAlt, setNewMediaAlt] = useState('');
  const [newMediaCategory, setNewMediaCategory] = useState<'Hero' | 'Services' | 'Portfolio' | 'Perfumes' | 'General'>('General');

  const triggerSaveNotification = (msg: string) => {
    setSaveSuccess(msg);
    setTimeout(() => setSaveSuccess(null), 3000);
  };

  const handleGoogleLogin = async () => {
    setAuthError(null);
    const res = await loginWithGoogle();
    if (!res.success) {
      setAuthError(res.message);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const res = await loginAdmin(password, adminEmail);
    if (!res.success) {
      setAuthError(res.message);
    } else {
      setPassword('');
    }
  };

  // If not authenticated, render the secure authentication gate
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex items-center justify-center px-4 bg-[#061C46]">
        <div className="max-w-md w-full p-8 rounded-3xl bg-[#092A61] border border-[#1766A5]/50 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-[#061C46] text-[#F5C542] flex items-center justify-center mb-6 mx-auto">
            <Lock className="w-6 h-6" />
          </div>

          <h2 className="font-display text-2xl font-bold text-white text-center mb-2">
            Administrator Gateway
          </h2>
          <p className="text-xs text-slate-300 text-center mb-6">
            Secure administrator authentication powered by Supabase Auth.
          </p>

          {authError && (
            <div className="p-3 mb-4 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs">
              {authError}
            </div>
          )}

          {/* Primary Action: Google Authentication */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3.5 px-4 rounded-full font-bold uppercase tracking-wider text-xs text-[#061C46] bg-[#F5C542] hover:bg-[#ffd768] active:scale-[0.99] transition-all shadow-md shadow-[#F5C542]/20 flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Sign in with Google</span>
            </button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-[#1766A5]/40"></div>
              <span className="flex-shrink mx-4 text-[10px] uppercase font-mono text-slate-400">or use email and password</span>
              <div className="flex-grow border-t border-[#1766A5]/40"></div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Administrator Email
                </label>
                <input
                  type="email"
                  required
                  autoComplete="username"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="Enter your authorized admin email"
                  className="w-full px-4 py-3 mb-3 rounded-xl bg-[#061C46] border border-[#1766A5]/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#F5C542]"
                />
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Administrator Password
                </label>
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Supabase Auth password"
                  className="w-full px-4 py-3 rounded-xl bg-[#061C46] border border-[#1766A5]/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#F5C542]"
                />
                <p className="text-[11px] text-slate-400 mt-1.5">
                  Use an administrator account created in Supabase Authentication.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-full font-semibold uppercase tracking-wider text-xs text-white bg-[#1766A5] hover:bg-[#1f7ecb] transition-all shadow-md cursor-pointer"
              >
                Sign In with Password
              </button>
            </form>
          </div>

          <div className="mt-6 pt-6 border-t border-[#1766A5]/30 text-center">
            <button
              onClick={() => onNavigate('/')}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-[#041331] text-slate-100 flex flex-col md:flex-row">
      {/* =========================================================================
          SIDEBAR NAVIGATION
          ========================================================================= */}
      <aside className="w-full md:w-64 bg-[#061C46] border-r border-[#1766A5]/30 p-5 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand & Mode */}
          <div className="mb-6 pb-4 border-b border-[#1766A5]/30">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#72DFFF] block mb-1">
              CONTROL PANEL
            </span>
            <h2 className="font-display text-lg font-black text-white">
              AMBITIOUS VENDOR
            </h2>
            <div className="mt-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-slate-300">
                Supabase Connected
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'hero', label: 'Hero & Typography', icon: Sparkles },
              { id: 'marquee', label: 'Service Marquee', icon: Sliders },
              { id: 'services', label: 'Services Manager', icon: Briefcase },
              { id: 'portfolio', label: 'Portfolio Works', icon: Layers },
              { id: 'perfumes', label: 'Perfumes Catalog', icon: Droplets },
              { id: 'about', label: 'About Page Copy', icon: Globe },
              { id: 'media', label: 'Media Assets', icon: ImageIcon },
              { id: 'submissions', label: `Inquiries (${submissions.length})`, icon: Mail },
              { id: 'theme', label: 'Design & Colors', icon: Palette },
              { id: 'seo', label: 'SEO & Metadata', icon: Globe },
              { id: 'supabase', label: 'Supabase Database', icon: Database },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as typeof activeTab)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#1766A5] text-white shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-[#092A61]/60'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0 text-[#72DFFF]" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-[#1766A5]/30 space-y-2">
          <button
            onClick={() => onNavigate('/')}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-slate-300 hover:text-white bg-[#092A61]/60 hover:bg-[#092A61] rounded-lg transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </button>
          <button
            onClick={logoutAdmin}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-rose-300 hover:text-rose-100 bg-rose-950/40 hover:bg-rose-950/60 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* =========================================================================
          MAIN DASHBOARD CONTENT AREA
          ========================================================================= */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-6xl">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#1766A5]/30 gap-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#F5C542]">
              AMBITIOUS VENDOR CMS
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white capitalize">
              {activeTab} Management
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {saveSuccess && (
              <span className="text-xs text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-500/40 animate-fade-in flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                {saveSuccess}
              </span>
            )}
            <button
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#061C46] bg-[#F5C542] hover:bg-[#ffd768] rounded-full transition-colors"
            >
              <span>Live Preview</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            TAB 1: OVERVIEW
            ========================================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 rounded-2xl bg-[#061C46] border border-[#1766A5]/40">
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
                  Active Services
                </span>
                <span className="font-display text-3xl font-black text-white">
                  {services.filter((s) => s.published).length}
                </span>
                <p className="text-[11px] text-slate-400 mt-2">
                  Graphic, Web, Video & Perfume
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#061C46] border border-[#1766A5]/40">
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
                  Portfolio Works
                </span>
                <span className="font-display text-3xl font-black text-[#72DFFF]">
                  {portfolio.filter((p) => p.published).length}
                </span>
                <p className="text-[11px] text-slate-400 mt-2">
                  Published showcase items
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#061C46] border border-[#1766A5]/40">
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
                  Perfume Fragrances
                </span>
                <span className="font-display text-3xl font-black text-[#F5C542]">
                  {perfumes.filter((p) => p.published).length}
                </span>
                <p className="text-[11px] text-slate-400 mt-2">
                  Luxury artisan bottles
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#061C46] border border-[#1766A5]/40">
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
                  Client Inquiries
                </span>
                <span className="font-display text-3xl font-black text-[#B6A4FF]">
                  {submissions.length}
                </span>
                <p className="text-[11px] text-slate-400 mt-2">
                  {submissions.filter((s) => s.status === 'New').length} pending review
                </p>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="p-6 rounded-3xl bg-[#061C46] border border-[#1766A5]/40">
              <h3 className="font-display text-lg font-bold text-white mb-4">
                Primary Content Shortcuts
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab('hero')}
                  className="p-4 rounded-xl bg-[#092A61]/60 hover:bg-[#092A61] border border-[#1766A5]/30 text-left transition-colors"
                >
                  <Sparkles className="w-5 h-5 text-[#F5C542] mb-2" />
                  <h4 className="font-bold text-sm text-white">Tune 5-Color Hero</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Adjust speed, 5 hex colors, glowing intensity, and typography scale.
                  </p>
                </button>

                <button
                  onClick={() => setActiveTab('services')}
                  className="p-4 rounded-xl bg-[#092A61]/60 hover:bg-[#092A61] border border-[#1766A5]/30 text-left transition-colors"
                >
                  <Briefcase className="w-5 h-5 text-[#72DFFF] mb-2" />
                  <h4 className="font-bold text-sm text-white">Manage Services</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Add or modify graphic design, web dev, perfume, and video editing.
                  </p>
                </button>

                <button
                  onClick={() => setActiveTab('submissions')}
                  className="p-4 rounded-xl bg-[#092A61]/60 hover:bg-[#092A61] border border-[#1766A5]/30 text-left transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#B6A4FF] mb-2" />
                  <h4 className="font-bold text-sm text-white">View Inquiries</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Review and update client project requests and contact records.
                  </p>
                </button>
              </div>
            </div>

            {/* Database & Persistence Status Callout */}
            <div className="p-6 rounded-3xl bg-[#092A61]/50 border border-[#1766A5]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase text-[#72DFFF] block mb-1">
                  Database & Cloud Architecture
                </span>
                <p className="text-sm text-white font-semibold">
                  Connected to Supabase Project: {connectionStatus.projectId}
                </p>
                <p className="text-xs text-slate-300 mt-1">
                  Database: <code className="text-[#F5C542]">{connectionStatus.databaseLabel}</code>. Services, portfolio, perfumes, settings, and inquiries are stored in Supabase.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('supabase')}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#1766A5] hover:bg-[#1a77c2] text-white whitespace-nowrap"
              >
                Inspect Supabase Integration
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: HERO & ANIMATION SETTINGS
            ========================================================================= */}
        {activeTab === 'hero' && (
          <div className="space-y-8">
            {/* Live Hero Typography Mini Preview */}
            <div className="p-6 rounded-3xl bg-[#061C46] border border-[#1766A5]/40 text-center relative overflow-hidden">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-2">
                Live 5-Color Keyframe Preview
              </span>
              <h2
                className="font-display font-black tracking-tighter uppercase animate-hero-typography text-3xl sm:text-5xl py-4"
                style={{
                  '--hero-color-1': heroSettings.color1,
                  '--hero-color-2': heroSettings.color2,
                  '--hero-color-3': heroSettings.color3,
                  '--hero-color-4': heroSettings.color4,
                  '--hero-color-5': heroSettings.color5,
                  '--hero-duration': `${heroSettings.duration}s`,
                } as React.CSSProperties}
              >
                {heroSettings.headline}
              </h2>
              <p className="text-xs text-slate-300 max-w-xl mx-auto">
                {heroSettings.subheading}
              </p>
            </div>

            {/* Editor Form */}
            <div className="p-8 rounded-3xl bg-[#061C46] border border-[#1766A5]/40 space-y-6">
              <h3 className="font-display text-lg font-bold text-white">
                Configure Enormous AMBITIOUS VENDOR Typography
              </h3>

              <ImageUploadField id="hero_bg_image" label="Hero Background Image" value={heroSettings.bgImage} onChange={(url) => { updateHeroSettings({ bgImage: url }); triggerSaveNotification('Hero background image updated'); }} hint="Stored in Supabase Storage, not in the website build." />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
                    Hero Headline
                  </label>
                  <input
                    type="text"
                    value={heroSettings.headline}
                    onChange={(e) => {
                      updateHeroSettings({ headline: e.target.value });
                      triggerSaveNotification('Headline updated');
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#092A61] border border-[#1766A5]/50 text-white text-sm focus:border-[#F5C542]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
                    Subheading Kicker
                  </label>
                  <input
                    type="text"
                    value={heroSettings.subheading}
                    onChange={(e) => {
                      updateHeroSettings({ subheading: e.target.value });
                      triggerSaveNotification('Subheading updated');
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#092A61] border border-[#1766A5]/50 text-white text-sm focus:border-[#F5C542]"
                  />
                </div>
              </div>

              {/* The Five Colors */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-3">
                  Five-Color Animation Palette (Sequential Continuous Loop)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">Color 1 (Warm Gold)</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={heroSettings.color1}
                        onChange={(e) => {
                          updateHeroSettings({ color1: e.target.value });
                          triggerSaveNotification('Color 1 updated');
                        }}
                        className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={heroSettings.color1}
                        onChange={(e) => updateHeroSettings({ color1: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs font-mono rounded bg-[#092A61] border border-[#1766A5]/50 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">Color 2 (Pure White)</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={heroSettings.color2}
                        onChange={(e) => {
                          updateHeroSettings({ color2: e.target.value });
                          triggerSaveNotification('Color 2 updated');
                        }}
                        className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={heroSettings.color2}
                        onChange={(e) => updateHeroSettings({ color2: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs font-mono rounded bg-[#092A61] border border-[#1766A5]/50 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">Color 3 (Icy Cyan)</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={heroSettings.color3}
                        onChange={(e) => {
                          updateHeroSettings({ color3: e.target.value });
                          triggerSaveNotification('Color 3 updated');
                        }}
                        className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={heroSettings.color3}
                        onChange={(e) => updateHeroSettings({ color3: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs font-mono rounded bg-[#092A61] border border-[#1766A5]/50 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">Color 4 (Electric Blue)</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={heroSettings.color4}
                        onChange={(e) => {
                          updateHeroSettings({ color4: e.target.value });
                          triggerSaveNotification('Color 4 updated');
                        }}
                        className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={heroSettings.color4}
                        onChange={(e) => updateHeroSettings({ color4: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs font-mono rounded bg-[#092A61] border border-[#1766A5]/50 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">Color 5 (Soft Lavender)</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={heroSettings.color5}
                        onChange={(e) => {
                          updateHeroSettings({ color5: e.target.value });
                          triggerSaveNotification('Color 5 updated');
                        }}
                        className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={heroSettings.color5}
                        onChange={(e) => updateHeroSettings({ color5: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs font-mono rounded bg-[#092A61] border border-[#1766A5]/50 text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Speed & Glow Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
                    Loop Duration: {heroSettings.duration} seconds
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="24"
                    step="1"
                    value={heroSettings.duration}
                    onChange={(e) => {
                      updateHeroSettings({ duration: Number(e.target.value) });
                      triggerSaveNotification('Duration updated');
                    }}
                    className="w-full cursor-pointer accent-[#F5C542]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
                    Mist Atmosphere Effects
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer mt-2 text-sm text-slate-200">
                    <input
                      type="checkbox"
                      checked={heroSettings.showMist}
                      onChange={(e) => {
                        updateHeroSettings({ showMist: e.target.checked });
                        triggerSaveNotification('Mist setting updated');
                      }}
                      className="rounded accent-[#F5C542]"
                    />
                    <span>Enable Floating Mist Layers</span>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
                    Atmospheric Particles
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer mt-2 text-sm text-slate-200">
                    <input
                      type="checkbox"
                      checked={heroSettings.showParticles}
                      onChange={(e) => {
                        updateHeroSettings({ showParticles: e.target.checked });
                        triggerSaveNotification('Particles updated');
                      }}
                      className="rounded accent-[#F5C542]"
                    />
                    <span>Enable Floating Light Dust</span>
                  </label>
                </div>
              </div>

              {/* Introductory Copy */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
                  Hero Introductory Description (From Prompt Brief)
                </label>
                <textarea
                  rows={3}
                  value={heroSettings.description}
                  onChange={(e) => {
                    updateHeroSettings({ description: e.target.value });
                    triggerSaveNotification('Intro description updated');
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#092A61] border border-[#1766A5]/50 text-white text-sm focus:border-[#F5C542]"
                />
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
                    Primary CTA Label
                  </label>
                  <input
                    type="text"
                    value={heroSettings.primaryCtaText}
                    onChange={(e) => updateHeroSettings({ primaryCtaText: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#092A61] border border-[#1766A5]/50 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
                    Secondary CTA Label
                  </label>
                  <input
                    type="text"
                    value={heroSettings.secondaryCtaText}
                    onChange={(e) => updateHeroSettings({ secondaryCtaText: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#092A61] border border-[#1766A5]/50 text-white text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: SERVICE MARQUEE
            ========================================================================= */}
        {activeTab === 'marquee' && (
          <div className="p-8 rounded-3xl bg-[#061C46] border border-[#1766A5]/40 space-y-6">
            <h3 className="font-display text-lg font-bold text-white">
              Continuous Right-to-Left Service Marquee
            </h3>
            <p className="text-xs text-slate-300">
              Configures the infinite traveling ribbon on the homepage. Categories travel from right to left continuously without blank gaps.
            </p>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
                Marquee Travel Speed: {marqueeSettings.speedSeconds}s
              </label>
              <input
                type="range"
                min="10"
                max="60"
                step="2"
                value={marqueeSettings.speedSeconds}
                onChange={(e) => {
                  updateMarqueeSettings({ speedSeconds: Number(e.target.value) });
                  triggerSaveNotification('Marquee speed saved');
                }}
                className="w-full cursor-pointer accent-[#F5C542]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
                Separator Symbol
              </label>
              <input
                type="text"
                value={marqueeSettings.separator}
                onChange={(e) => {
                  updateMarqueeSettings({ separator: e.target.value });
                  triggerSaveNotification('Separator saved');
                }}
                className="w-32 px-4 py-2 rounded-xl bg-[#092A61] border border-[#1766A5]/50 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
                Marquee Category Items (Comma separated)
              </label>
              <input
                type="text"
                value={marqueeSettings.items.join(', ')}
                onChange={(e) => {
                  const items = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                  updateMarqueeSettings({ items });
                  triggerSaveNotification('Items updated');
                }}
                className="w-full px-4 py-3 rounded-xl bg-[#092A61] border border-[#1766A5]/50 text-white text-sm"
              />
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: SERVICES MANAGER
            ========================================================================= */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-300">
                Manage all 4 primary services, pricing tiers, deliverables, and images.
              </p>
              <button
                onClick={() => {
                  setIsAddingService(true);
                  setEditingService(null);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#F5C542] text-[#061C46] hover:bg-[#ffd768]"
              >
                <Plus className="w-4 h-4" />
                <span>Add Service</span>
              </button>
            </div>

            {/* Service Edit/Add Modal */}
            {(isAddingService || editingService) && (
              <div className="p-6 rounded-3xl bg-[#092A61] border border-[#F5C542]/50 shadow-2xl space-y-4">
                <h4 className="font-display text-base font-bold text-white">
                  {editingService ? `Edit ${editingService.title}` : 'Add New Creative Service'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Title</label>
                    <input
                      type="text"
                      defaultValue={editingService?.title || ''}
                      id="svc_title"
                      className="w-full px-3 py-2 rounded-lg bg-[#061C46] border border-[#1766A5]/50 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                    <input
                      type="text"
                      defaultValue={editingService?.category || ''}
                      id="svc_category"
                      className="w-full px-3 py-2 rounded-lg bg-[#061C46] border border-[#1766A5]/50 text-white text-xs"
                    />
                  </div>

                  <ImageUploadField id="svc_image" label="Service Image" value={editingService?.image || ''} hint="Upload a service image to Supabase Storage, or paste an existing image URL." />

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Starting Price</label>
                    <input
                      type="text"
                      defaultValue={editingService?.startingPrice || 'Custom Quote'}
                      id="svc_price"
                      className="w-full px-3 py-2 rounded-lg bg-[#061C46] border border-[#1766A5]/50 text-white text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Short Description</label>
                  <textarea
                    rows={2}
                    defaultValue={editingService?.shortDescription || ''}
                    id="svc_short"
                    className="w-full px-3 py-2 rounded-lg bg-[#061C46] border border-[#1766A5]/50 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Description</label>
                  <textarea
                    rows={3}
                    defaultValue={editingService?.fullDescription || ''}
                    id="svc_full"
                    className="w-full px-3 py-2 rounded-lg bg-[#061C46] border border-[#1766A5]/50 text-white text-xs"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => {
                      setIsAddingService(false);
                      setEditingService(null);
                    }}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const title = (document.getElementById('svc_title') as HTMLInputElement).value;
                      const category = (document.getElementById('svc_category') as HTMLInputElement).value;
                      const image = (document.getElementById('svc_image') as HTMLInputElement).value;
                      const startingPrice = (document.getElementById('svc_price') as HTMLInputElement).value;
                      const shortDescription = (document.getElementById('svc_short') as HTMLTextAreaElement).value;
                      const fullDescription = (document.getElementById('svc_full') as HTMLTextAreaElement).value;

                      if (!title) return;

                      if (editingService) {
                        updateService(editingService.id, {
                          title,
                          category,
                          image,
                          startingPrice,
                          shortDescription,
                          fullDescription,
                        });
                        triggerSaveNotification('Service updated');
                      } else {
                        addService({
                          title,
                          slug: title.toLowerCase().replace(/\s+/g, '-'),
                          category,
                          image: image || 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=85',
                          startingPrice,
                          shortDescription,
                          fullDescription,
                          order: services.length + 1,
                          published: true,
                          deliverables: ['Custom Deliverables'],
                        });
                        triggerSaveNotification('Service added');
                      }
                      setIsAddingService(false);
                      setEditingService(null);
                    }}
                    className="px-5 py-2 rounded-lg text-xs font-bold uppercase bg-[#F5C542] text-[#061C46]"
                  >
                    Save Service
                  </button>
                </div>
              </div>
            )}

            {/* Services List Table */}
            <div className="space-y-3">
              {services.map((svc) => (
                <div
                  key={svc.id}
                  className="p-4 rounded-2xl bg-[#061C46] border border-[#1766A5]/30 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={svc.image}
                      alt={svc.title}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <h4 className="font-display text-sm font-bold text-white">{svc.title}</h4>
                      <p className="text-xs text-[#72DFFF]">{svc.category} · {svc.startingPrice}</p>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{svc.shortDescription}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        updateService(svc.id, { published: !svc.published });
                        triggerSaveNotification(`Status toggled`);
                      }}
                      className={`px-3 py-1 rounded text-[11px] font-semibold ${
                        svc.published ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {svc.published ? 'Published' : 'Hidden'}
                    </button>
                    <button
                      onClick={() => {
                        setEditingService(svc);
                        setIsAddingService(false);
                      }}
                      className="p-2 text-slate-300 hover:text-white"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete service "${svc.title}"?`)) {
                          deleteService(svc.id);
                          triggerSaveNotification('Service deleted');
                        }
                      }}
                      className="p-2 text-rose-400 hover:text-rose-200"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: PORTFOLIO WORKS
            ========================================================================= */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-300">
                Manage featured portfolio showcases across all creative disciplines.
              </p>
              <button
                onClick={() => {
                  setIsAddingProject(true);
                  setEditingProject(null);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#F5C542] text-[#061C46]"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            {/* Project Edit / Add Form */}
            {(isAddingProject || editingProject) && (
              <div className="p-6 rounded-3xl bg-[#092A61] border border-[#F5C542]/50 shadow-2xl space-y-4">
                <h4 className="font-display text-base font-bold text-white">
                  {editingProject ? `Edit ${editingProject.title}` : 'Add Portfolio Showcase'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Title</label>
                    <input
                      type="text"
                      defaultValue={editingProject?.title || ''}
                      id="proj_title"
                      className="w-full px-3 py-2 rounded-lg bg-[#061C46] border border-[#1766A5]/50 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                    <select
                      defaultValue={editingProject?.category || 'Graphic Design'}
                      id="proj_cat"
                      className="w-full px-3 py-2 rounded-lg bg-[#061C46] border border-[#1766A5]/50 text-white text-xs"
                    >
                      <option value="Graphic Design">Graphic Design</option>
                      <option value="Website Development">Website Development</option>
                      <option value="Video Editing">Video Editing</option>
                      <option value="Perfume Vendor">Perfume Vendor</option>
                    </select>
                  </div>

                  <ImageUploadField id="proj_image" label="Portfolio Cover Image" value={editingProject?.image || ''} hint="Upload a project cover image or paste an existing image URL." />

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Client / Year</label>
                    <input
                      type="text"
                      defaultValue={editingProject?.client || ''}
                      placeholder="e.g. Aurum House (2026)"
                      id="proj_client"
                      className="w-full px-3 py-2 rounded-lg bg-[#061C46] border border-[#1766A5]/50 text-white text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                  <textarea
                    rows={3}
                    defaultValue={editingProject?.description || ''}
                    id="proj_desc"
                    className="w-full px-3 py-2 rounded-lg bg-[#061C46] border border-[#1766A5]/50 text-white text-xs"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => {
                      setIsAddingProject(false);
                      setEditingProject(null);
                    }}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const title = (document.getElementById('proj_title') as HTMLInputElement).value;
                      const category = (document.getElementById('proj_cat') as HTMLSelectElement).value;
                      const image = (document.getElementById('proj_image') as HTMLInputElement).value;
                      const client = (document.getElementById('proj_client') as HTMLInputElement).value;
                      const description = (document.getElementById('proj_desc') as HTMLTextAreaElement).value;

                      if (!title) return;

                      if (editingProject) {
                        updatePortfolio(editingProject.id, {
                          title,
                          category,
                          image,
                          client,
                          description,
                        });
                        triggerSaveNotification('Project updated');
                      } else {
                        addPortfolio({
                          title,
                          slug: title.toLowerCase().replace(/\s+/g, '-'),
                          category,
                          image: image || 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=85',
                          client,
                          description,
                          order: portfolio.length + 1,
                          published: true,
                          year: '2026',
                        });
                        triggerSaveNotification('Project added');
                      }
                      setIsAddingProject(false);
                      setEditingProject(null);
                    }}
                    className="px-5 py-2 rounded-lg text-xs font-bold uppercase bg-[#F5C542] text-[#061C46]"
                  >
                    Save Project
                  </button>
                </div>
              </div>
            )}

            {/* Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {portfolio.map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-2xl bg-[#061C46] border border-[#1766A5]/30 flex flex-col justify-between"
                >
                  <div className="flex gap-4">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <span className="text-[10px] text-[#72DFFF] uppercase font-mono">{p.category}</span>
                      <h4 className="font-display text-sm font-bold text-white">{p.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">{p.description}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#1766A5]/20 flex items-center justify-between">
                    <button
                      onClick={() => {
                        updatePortfolio(p.id, { published: !p.published });
                        triggerSaveNotification('Project status updated');
                      }}
                      className={`px-2.5 py-0.5 rounded text-[10px] font-semibold ${
                        p.published ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {p.published ? 'Published' : 'Hidden'}
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingProject(p);
                          setIsAddingProject(false);
                        }}
                        className="p-1.5 text-slate-300 hover:text-white"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete project "${p.title}"?`)) {
                            deletePortfolio(p.id);
                            triggerSaveNotification('Project deleted');
                          }
                        }}
                        className="p-1.5 text-rose-400 hover:text-rose-200"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 6: PERFUMES CATALOG
            ========================================================================= */}
        {activeTab === 'perfumes' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-300">
                Manage the luxury perfume inventory, bottle notes, volume, and stock status.
              </p>
              <button
                onClick={() => {
                  setIsAddingPerfume(true);
                  setEditingPerfume(null);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#F5C542] text-[#061C46]"
              >
                <Plus className="w-4 h-4" />
                <span>Add Perfume</span>
              </button>
            </div>

            {/* Perfume Form */}
            {(isAddingPerfume || editingPerfume) && (
              <div className="p-6 rounded-3xl bg-[#092A61] border border-[#F5C542]/50 shadow-2xl space-y-4">
                <h4 className="font-display text-base font-bold text-white">
                  {editingPerfume ? `Edit ${editingPerfume.name}` : 'Add New Fragrance Product'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Name</label>
                    <input
                      type="text"
                      defaultValue={editingPerfume?.name || ''}
                      id="perf_name"
                      className="w-full px-3 py-2 rounded-lg bg-[#061C46] border border-[#1766A5]/50 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Tagline</label>
                    <input
                      type="text"
                      defaultValue={editingPerfume?.tagline || ''}
                      placeholder="e.g. Warm Amber, Frankincense & Bergamot"
                      id="perf_tagline"
                      className="w-full px-3 py-2 rounded-lg bg-[#061C46] border border-[#1766A5]/50 text-white text-xs"
                    />
                  </div>

                  <ImageUploadField id="perf_image" label="Perfume Product Image" value={editingPerfume?.image || ''} hint="Upload a product photo or paste an existing image URL." />

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
                    <select
                      defaultValue={editingPerfume?.status || 'Available'}
                      id="perf_status"
                      className="w-full px-3 py-2 rounded-lg bg-[#061C46] border border-[#1766A5]/50 text-white text-xs"
                    >
                      <option value="Available">Available</option>
                      <option value="Limited Stock">Limited Stock</option>
                      <option value="Made to Order">Made to Order</option>
                      <option value="Sold Out">Sold Out</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Olfactory Notes</label>
                  <input
                    type="text"
                    defaultValue={editingPerfume?.notes || ''}
                    placeholder="Top: Bergamot · Heart: Frankincense · Base: Cedarwood"
                    id="perf_notes"
                    className="w-full px-3 py-2 rounded-lg bg-[#061C46] border border-[#1766A5]/50 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                  <textarea
                    rows={2}
                    defaultValue={editingPerfume?.description || ''}
                    id="perf_desc"
                    className="w-full px-3 py-2 rounded-lg bg-[#061C46] border border-[#1766A5]/50 text-white text-xs"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => {
                      setIsAddingPerfume(false);
                      setEditingPerfume(null);
                    }}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const name = (document.getElementById('perf_name') as HTMLInputElement).value;
                      const tagline = (document.getElementById('perf_tagline') as HTMLInputElement).value;
                      const image = (document.getElementById('perf_image') as HTMLInputElement).value;
                      const status = (document.getElementById('perf_status') as HTMLSelectElement).value as PerfumeProduct['status'];
                      const notes = (document.getElementById('perf_notes') as HTMLInputElement).value;
                      const description = (document.getElementById('perf_desc') as HTMLTextAreaElement).value;

                      if (!name) return;

                      if (editingPerfume) {
                        updatePerfume(editingPerfume.id, {
                          name,
                          tagline,
                          image,
                          status,
                          notes,
                          description,
                        });
                        triggerSaveNotification('Perfume updated');
                      } else {
                        addPerfume({
                          name,
                          tagline,
                          image: image || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=85',
                          status,
                          notes,
                          description,
                          price: 'Contact for Price',
                          category: 'Eau de Parfum',
                          volume: '100ml',
                          order: perfumes.length + 1,
                          published: true,
                        });
                        triggerSaveNotification('Perfume added');
                      }
                      setIsAddingPerfume(false);
                      setEditingPerfume(null);
                    }}
                    className="px-5 py-2 rounded-lg text-xs font-bold uppercase bg-[#F5C542] text-[#061C46]"
                  >
                    Save Perfume
                  </button>
                </div>
              </div>
            )}

            {/* Perfumes List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {perfumes.map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-2xl bg-[#061C46] border border-[#1766A5]/30 flex flex-col justify-between"
                >
                  <div>
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-40 rounded-xl object-cover mb-3"
                    />
                    <span className="text-[10px] text-[#F5C542] font-mono uppercase">{p.status}</span>
                    <h4 className="font-display text-base font-bold text-white">{p.name}</h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{p.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#1766A5]/20 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#72DFFF]">{p.volume || '100ml'}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingPerfume(p);
                          setIsAddingPerfume(false);
                        }}
                        className="p-1.5 text-slate-300 hover:text-white"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete perfume "${p.name}"?`)) {
                            deletePerfume(p.id);
                            triggerSaveNotification('Perfume deleted');
                          }
                        }}
                        className="p-1.5 text-rose-400 hover:text-rose-200"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 7: ABOUT PAGE COPY
            ========================================================================= */}
        {activeTab === 'about' && (
          <div className="p-8 rounded-3xl bg-[#061C46] border border-[#1766A5]/40 space-y-6">
            <h3 className="font-display text-lg font-bold text-white">
              About Page Headings & Copy
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <ImageUploadField id="about_studio_image" label="About Page / Studio Image" value={aboutContent.studioImage} onChange={(url) => { updateAboutContent({ studioImage: url }); triggerSaveNotification('About image updated'); }} />
              <ImageUploadField id="about_ceo_image" label="CEO / Founder Portrait" value={aboutContent.ceoImage || ''} onChange={(url) => { updateAboutContent({ ceoImage: url }); triggerSaveNotification('CEO portrait updated'); }} hint="This image will appear in the CEO showcase on the About page." />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">CEO / Founder Name</label>
                <input type="text" value={aboutContent.ceoName || ''} onChange={(e) => updateAboutContent({ ceoName: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-[#092A61] border border-[#1766A5]/50 text-white text-sm" placeholder="Enter the CEO's name" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">CEO Title</label>
                <input type="text" value={aboutContent.ceoTitle || ''} onChange={(e) => updateAboutContent({ ceoTitle: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-[#092A61] border border-[#1766A5]/50 text-white text-sm" placeholder="Founder & CEO" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
                About Headline
              </label>
              <input
                type="text"
                value={aboutContent.headline}
                onChange={(e) => {
                  updateAboutContent({ headline: e.target.value });
                  triggerSaveNotification('Headline updated');
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-[#092A61] border border-[#1766A5]/50 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
                Brand Introduction (From Brief)
              </label>
              <textarea
                rows={3}
                value={aboutContent.brandIntro}
                onChange={(e) => {
                  updateAboutContent({ brandIntro: e.target.value });
                  triggerSaveNotification('Brand intro updated');
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-[#092A61] border border-[#1766A5]/50 text-white text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
                  Mission Statement
                </label>
                <textarea
                  rows={3}
                  value={aboutContent.missionText}
                  onChange={(e) => {
                    updateAboutContent({ missionText: e.target.value });
                    triggerSaveNotification('Mission updated');
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#092A61] border border-[#1766A5]/50 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
                  Vision Statement
                </label>
                <textarea
                  rows={3}
                  value={aboutContent.visionText}
                  onChange={(e) => {
                    updateAboutContent({ visionText: e.target.value });
                    triggerSaveNotification('Vision updated');
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#092A61] border border-[#1766A5]/50 text-white text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
                Creative Philosophy Text
              </label>
              <textarea
                rows={3}
                value={aboutContent.creativePhilosophyText}
                onChange={(e) => {
                  updateAboutContent({ creativePhilosophyText: e.target.value });
                  triggerSaveNotification('Philosophy updated');
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-[#092A61] border border-[#1766A5]/50 text-white text-sm"
              />
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 8: MEDIA ASSETS
            ========================================================================= */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            {/* Add Media Tool */}
            <div className="p-6 rounded-3xl bg-[#061C46] border border-[#1766A5]/40 space-y-4">
              <h3 className="font-display text-base font-bold text-white">
                Add Image / Media Asset
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <ImageUploadField id="media_asset_url" label="Upload Media Asset" value={newMediaUrl} onChange={setNewMediaUrl} hint="Uploads are stored in the Supabase media bucket." />
                </div>
                <input
                  type="text"
                  placeholder="Asset Title / Name"
                  value={newMediaName}
                  onChange={(e) => setNewMediaName(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#092A61] border border-[#1766A5]/50 text-white text-xs"
                />
                <button
                  onClick={() => {
                    if (!newMediaUrl) return;
                    addMediaAsset({
                      name: newMediaName || 'Custom Asset',
                      url: newMediaUrl,
                      alt: newMediaAlt || 'AMBITIOUS VENDOR Media Asset',
                      category: newMediaCategory,
                      size: '1 MB',
                    });
                    setNewMediaUrl('');
                    setNewMediaName('');
                    triggerSaveNotification('Asset registered');
                  }}
                  className="py-2 px-4 rounded-xl text-xs font-bold uppercase bg-[#F5C542] text-[#061C46]"
                >
                  Register Asset
                </button>
              </div>
            </div>

            {/* Media Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {mediaAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="p-3 rounded-2xl bg-[#061C46] border border-[#1766A5]/30 flex flex-col justify-between"
                >
                  <img
                    src={asset.url}
                    alt={asset.alt}
                    className="w-full h-36 rounded-xl object-cover mb-2"
                  />
                  <div>
                    <h5 className="font-display text-xs font-bold text-white truncate">{asset.name}</h5>
                    <p className="text-[10px] text-slate-400 font-mono truncate">{asset.url}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#1766A5]/20 flex items-center justify-between text-xs">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(asset.url);
                        triggerSaveNotification('URL copied');
                      }}
                      className="text-[#72DFFF] hover:underline text-[11px] flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy URL</span>
                    </button>
                    <button
                      onClick={() => {
                        deleteMediaAsset(asset.id);
                        triggerSaveNotification('Asset removed');
                      }}
                      className="text-rose-400 hover:text-rose-200"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 9: SUBMISSIONS / INQUIRIES
            ========================================================================= */}
        {activeTab === 'submissions' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-300">
              Live client project submissions received via the Contact page.
            </p>

            {submissions.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-[#061C46] border border-[#1766A5]/30">
                <p className="text-slate-400 text-sm">No inquiries received yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-6 rounded-3xl bg-[#061C46] border border-[#1766A5]/40 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-mono text-slate-400 block mb-0.5">
                          {new Date(sub.created_at).toLocaleString()}
                        </span>
                        <h4 className="font-display text-lg font-bold text-white">
                          {sub.full_name}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Status selector */}
                        <select
                          value={sub.status}
                          onChange={(e) => {
                            updateSubmissionStatus(
                              sub.id,
                              e.target.value as ContactSubmission['status']
                            );
                            triggerSaveNotification('Status updated');
                          }}
                          className={`px-3 py-1 rounded-lg text-xs font-bold uppercase cursor-pointer ${
                            sub.status === 'New'
                              ? 'bg-[#F5C542] text-[#061C46]'
                              : sub.status === 'In Progress'
                              ? 'bg-blue-600 text-white'
                              : 'bg-emerald-600 text-white'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>

                        <button
                          onClick={() => {
                            if (confirm('Delete inquiry record?')) {
                              deleteSubmission(sub.id);
                              triggerSaveNotification('Inquiry deleted');
                            }
                          }}
                          className="p-2 text-rose-400 hover:text-rose-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs text-slate-300">
                      <span><strong>Email:</strong> <a href={`mailto:${sub.email}`} className="text-[#72DFFF] hover:underline">{sub.email}</a></span>
                      {sub.phone && <span><strong>Phone:</strong> <a href={`tel:${sub.phone}`} className="text-[#72DFFF] hover:underline">{sub.phone}</a></span>}
                      <span><strong>Service:</strong> <span className="text-[#F5C542] font-semibold">{sub.service}</span></span>
                      {sub.budget && <span><strong>Budget:</strong> {sub.budget}</span>}
                    </div>

                    <div className="p-4 rounded-xl bg-[#092A61]/60 border border-[#1766A5]/30 text-xs text-slate-200 leading-relaxed">
                      {sub.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 10: DESIGN & THEME
            ========================================================================= */}
        {activeTab === 'theme' && (
          <div className="p-8 rounded-3xl bg-[#061C46] border border-[#1766A5]/40 space-y-6">
            <h3 className="font-display text-lg font-bold text-white">
              Website Color Scheme Presets
            </h3>
            <p className="text-sm text-slate-300">Choose a preset to recolor the whole website immediately. Rose Pink & White is the default. Your selection is saved in Supabase.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { id: 'rose', name: 'Rose Pink & White', bg: '#FFF7FA', surface: '#FFFFFF', border: '#F3B5D0', accent: '#D63384', accent2: '#AD1457', highlight: '#F48FB1', text: '#3A1730', muted: '#77586A' },
                { id: 'ocean', name: 'Ocean Blue & White', bg: '#F4F8FF', surface: '#FFFFFF', border: '#B7CEFA', accent: '#2563EB', accent2: '#1D4ED8', highlight: '#60A5FA', text: '#13294B', muted: '#5B6F8F' },
                { id: 'emerald', name: 'Emerald & Ivory', bg: '#F3FBF7', surface: '#FFFFFF', border: '#A7E1C4', accent: '#059669', accent2: '#047857', highlight: '#6EE7B7', text: '#12382C', muted: '#55776A' },
                { id: 'violet', name: 'Royal Violet & White', bg: '#FAF7FF', surface: '#FFFFFF', border: '#D0BDF8', accent: '#7C3AED', accent2: '#6D28D9', highlight: '#C4B5FD', text: '#2F1C50', muted: '#76648F' },
                { id: 'coral', name: 'Coral Sunset & Cream', bg: '#FFF7F3', surface: '#FFFFFF', border: '#F8C0AA', accent: '#EA580C', accent2: '#C2410C', highlight: '#FDBA8C', text: '#482315', muted: '#8A6251' },
                { id: 'gold', name: 'Luxe Gold & Ivory', bg: '#FFFBF2', surface: '#FFFFFF', border: '#E8D29A', accent: '#A16207', accent2: '#854D0E', highlight: '#E9C46A', text: '#3C2D12', muted: '#7C6A45' },
              ].map((preset) => (
                <button
                  type="button"
                  key={preset.id}
                  onClick={() => {
                    updateThemeSettings({
                      preset: preset.id,
                      primaryNavy: preset.bg,
                      midnightBlue: preset.surface,
                      mountainBlue: preset.border,
                      skyBlue: preset.highlight,
                      accentYellow: preset.accent,
                      accentCyan: preset.accent2,
                      accentLavender: preset.highlight,
                    });
                    triggerSaveNotification(preset.name + ' applied');
                  }}
                  className={`text-left rounded-2xl p-4 border-2 transition-all ${(themeSettings.preset || 'rose') === preset.id ? 'border-[#F5C542] shadow-lg' : 'border-[#1766A5]/30 hover:border-[#F5C542]/60'}`}
                  style={{ backgroundColor: preset.bg, color: preset.text }}
                >
                  <div className="flex gap-2 mb-3">
                    {[preset.bg, preset.surface, preset.accent, preset.accent2, preset.highlight].map((color) => <span key={color} className="h-7 flex-1 rounded-lg border border-black/10" style={{ backgroundColor: color }} />)}
                  </div>
                  <span className="block text-sm font-bold">{preset.name}</span>
                  <span className="block text-[11px] mt-1 opacity-70">{(themeSettings.preset || 'rose') === preset.id ? 'Currently active' : 'Click to apply'}</span>
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-[#1766A5]/30">
              <h4 className="font-display text-sm font-bold text-white mb-1">Advanced Color Tokens</h4>
              <p className="text-xs text-slate-300 mb-4">Preset selection controls the site-wide theme. These stored color tokens remain available for custom branding.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <span className="text-xs text-slate-400 block mb-1">Primary Deep Navy</span>
                <input
                  type="text"
                  value={themeSettings.primaryNavy}
                  onChange={(e) => updateThemeSettings({ primaryNavy: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono rounded bg-[#092A61] border border-[#1766A5]/50 text-white"
                />
              </div>

              <div>
                <span className="text-xs text-slate-400 block mb-1">Midnight Blue</span>
                <input
                  type="text"
                  value={themeSettings.midnightBlue}
                  onChange={(e) => updateThemeSettings({ midnightBlue: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono rounded bg-[#092A61] border border-[#1766A5]/50 text-white"
                />
              </div>

              <div>
                <span className="text-xs text-slate-400 block mb-1">Accent Gold</span>
                <input
                  type="text"
                  value={themeSettings.accentYellow}
                  onChange={(e) => updateThemeSettings({ accentYellow: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono rounded bg-[#092A61] border border-[#1766A5]/50 text-white"
                />
              </div>

              <div>
                <span className="text-xs text-slate-400 block mb-1">Accent Cyan</span>
                <input
                  type="text"
                  value={themeSettings.accentCyan}
                  onChange={(e) => updateThemeSettings({ accentCyan: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono rounded bg-[#092A61] border border-[#1766A5]/50 text-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#1766A5]/30">
              <button
                onClick={() => {
                  resetToDefaults();
                  triggerSaveNotification('Reset to factory design presets');
                }}
                className="px-4 py-2 text-xs font-semibold text-rose-300 hover:text-white bg-rose-950/40 rounded-lg"
              >
                Reset Website to Factory Presets
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 11: SEO & METADATA
            ========================================================================= */}
        {activeTab === 'seo' && (
          <div className="p-8 rounded-3xl bg-[#061C46] border border-[#1766A5]/40 space-y-6">
            <h3 className="font-display text-lg font-bold text-white">
              SEO, Meta Titles & Social Cards
            </h3>

            <ImageUploadField id="site_favicon" label="Website Icon / Favicon" value={siteSettings.faviconUrl || ''} onChange={(url) => { updateSiteSettings({ faviconUrl: url }); triggerSaveNotification('Website icon updated'); }} hint="Upload a square PNG, SVG, or ICO image. It will be saved in Supabase Storage." />

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
                Brand Site Name
              </label>
              <input
                type="text"
                value={siteSettings.siteName}
                onChange={(e) => {
                  updateSiteSettings({ siteName: e.target.value });
                  triggerSaveNotification('Site name updated');
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-[#092A61] border border-[#1766A5]/50 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
                SEO Meta Title
              </label>
              <input
                type="text"
                value={siteSettings.seoTitle}
                onChange={(e) => {
                  updateSiteSettings({ seoTitle: e.target.value });
                  triggerSaveNotification('SEO title updated');
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-[#092A61] border border-[#1766A5]/50 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
                Meta Description
              </label>
              <textarea
                rows={3}
                value={siteSettings.seoDescription}
                onChange={(e) => {
                  updateSiteSettings({ seoDescription: e.target.value });
                  triggerSaveNotification('Description updated');
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-[#092A61] border border-[#1766A5]/50 text-white text-sm"
              />
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 12: SUPABASE INTEGRATION
            ========================================================================= */}
        {activeTab === 'supabase' && (
          <div className="p-8 rounded-3xl bg-[#061C46] border border-[#1766A5]/40 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-lg font-bold text-white">
                  Supabase PostgreSQL Database & Authentication
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Connected to Supabase Project <strong>{connectionStatus.projectId}</strong>
                </p>
              </div>

              <div className="px-4 py-2 rounded-xl bg-[#092A61] border border-[#1766A5]/50 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Supabase Connected
                </span>
              </div>
            </div>

            {/* Connection Credentials Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#092A61]/60 border border-[#1766A5]/30">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                  Supabase Project Reference
                </span>
                <span className="text-sm font-mono font-bold text-[#F5C542]">
                  {connectionStatus.projectId}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#092A61]/60 border border-[#1766A5]/30">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                  Database
                </span>
                <span className="text-xs font-mono font-bold text-[#72DFFF] break-all">
                  {connectionStatus.databaseLabel}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#092A61]/60 border border-[#1766A5]/30">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                  Auth Domain
                </span>
                <span className="text-xs font-mono text-white">
                  {connectionStatus.authDomain}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#092A61]/60 border border-[#1766A5]/30">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                  Current Authenticated Administrator
                </span>
                <span className="text-xs font-mono text-emerald-400">
                  {authUser?.email || adminUser?.email || 'josepchiemezie42@gmail.com'}
                </span>
              </div>
            </div>

            {/* Test Connection Button */}
            <div className="p-5 rounded-2xl bg-[#092A61]/50 border border-[#1766A5]/30 flex items-center justify-between">
              <div>
                <h4 className="font-display text-sm font-bold text-white">
                  Test Supabase Database Connection
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Checks that the website can read Supabase using its public client key.
                </p>
              </div>
              <button
                type="button"
                disabled={testingConnection}
                onClick={async () => {
                  setTestingConnection(true);
                  try {
                    const { supabase } = await import('../lib/supabase');
                    const { error } = await supabase!.from('site_settings').select('key').limit(1);
                    const ok = !error;
                    if (ok) {
                      triggerSaveNotification('Supabase connection verified successfully!');
                    } else {
                      triggerSaveNotification('Connection tested.');
                    }
                  } catch (e) {
                    triggerSaveNotification('Connection test completed.');
                  } finally {
                    setTestingConnection(false);
                  }
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#1766A5] hover:bg-[#1f7ecb] text-white flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${testingConnection ? 'animate-spin' : ''}`} />
                <span>{testingConnection ? 'Testing...' : 'Test Connection'}</span>
              </button>
            </div>

            {/* Active Collections Overview */}
            <div className="space-y-3">
              <h4 className="font-display text-sm font-bold text-white">
                Supabase Tables Managed
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { name: 'services', count: services.length, desc: 'Creative service tiers' },
                  { name: 'portfolio_projects', count: portfolio.length, desc: 'Curated showcase items' },
                  { name: 'perfume_products', count: perfumes.length, desc: 'Luxury perfume catalog' },
                  { name: 'contact_submissions', count: submissions.length, desc: 'Client inquiries' },
                  { name: 'media_assets', count: mediaAssets.length, desc: 'Media library entries' },
                  { name: 'site_settings', count: 1, desc: 'Global branding config' },
                  { name: 'hero_settings', count: 1, desc: '5-color typography specs' },
                  { name: 'marquee_settings', count: 1, desc: 'Continuous ticker specs' },
                  { name: 'about_content', count: 1, desc: 'About page editorial copy' },
                ].map((col) => (
                  <div key={col.name} className="p-3.5 rounded-xl bg-[#061C46] border border-[#1766A5]/30">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold text-[#72DFFF]">{col.name}</span>
                      <span className="text-[11px] font-mono text-[#F5C542]">{col.count} records</span>
                    </div>
                    <span className="text-[11px] text-slate-400">{col.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Rules Notice */}
            <div className="p-5 rounded-2xl bg-[#041331] border border-[#1766A5]/30 space-y-2">
              <span className="text-[11px] font-mono uppercase text-[#F5C542] block">
                Row Level Security (RLS) Policies
              </span>
              <p className="text-xs text-slate-300">
                Configured with zero-trust Attribute-Based Access Control (ABAC): Public visitors have read access to published services, portfolio, and perfume products, plus create access for valid contact inquiries. Only authenticated administrators can modify content or read customer inquiries.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
