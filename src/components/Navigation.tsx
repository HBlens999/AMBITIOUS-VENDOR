import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Menu, X, ArrowUpRight, Shield } from 'lucide-react';

interface NavigationProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPath, onNavigate }) => {
  const { siteSettings, isAdminAuthenticated } = useData();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'SERVICES', path: '/services' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#061C46]/90 backdrop-blur-md border-b border-[#1766A5]/30 py-3.5 shadow-lg shadow-[#061C46]/50'
          : 'bg-gradient-to-b from-[#061C46]/80 via-[#061C46]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Single text element Brand Wordmark */}
          <button
            onClick={() => handleNavClick('/')}
            className="group text-left text-lg sm:text-xl font-black tracking-wider uppercase text-white hover:text-[#72DFFF] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span className="font-display font-extrabold">{siteSettings.logoText || 'AMBITIOUS VENDOR'}</span>
            {isAdminAuthenticated && (
              <span className="w-2 h-2 rounded-full bg-[#F5C542] ring-2 ring-[#061C46]" title="Admin Mode Active" />
            )}
          </button>

          {/* Zone 2: 4 Clean Single-line Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider text-slate-200">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.path)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 tracking-widest ${
                    isActive
                      ? 'text-[#F5C542] font-bold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F5C542] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action CTA + Admin Portal Shortcut */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('/admin')}
              className={`p-2 rounded-lg text-xs font-medium transition-all ${
                currentPath === '/admin'
                  ? 'bg-[#1766A5] text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#092A61]/60'
              }`}
              title="Admin Dashboard"
            >
              <Shield className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleNavClick('/contact')}
              className="group inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#061C46] bg-[#F5C542] hover:bg-[#ffd666] active:scale-[0.98] rounded-full transition-all shadow-md shadow-[#F5C542]/20 whitespace-nowrap shrink-0"
            >
              <span>Let's Work Together</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('/admin')}
              className="p-2 text-slate-300 hover:text-white"
              title="Admin"
            >
              <Shield className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#061C46]/98 border-b border-[#1766A5]/40 px-6 py-6 backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-left text-sm font-semibold tracking-wider py-2 transition-colors ${
                    isActive ? 'text-[#F5C542]' : 'text-slate-200 hover:text-white'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
            <div className="pt-4 border-t border-[#1766A5]/30 flex flex-col gap-3">
              <button
                onClick={() => handleNavClick('/contact')}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#061C46] bg-[#F5C542] rounded-full shadow-md"
              >
                <span>Let's Work Together</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleNavClick('/admin')}
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-[#092A61]/80 rounded-full"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Dashboard</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
