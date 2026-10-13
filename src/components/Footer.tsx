import React from 'react';
import { useData } from '../context/DataContext';
import { Shield, Phone, Mail, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { siteSettings } = useData();

  return (
    <footer className="site-footer-layer isolate relative border-t border-[#1766A5]/30 bg-[#041331] text-slate-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="relative z-[1] max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-[#1766A5]/20">
          {/* Brand Info */}
          <div className="lg:col-span-5">
            <h3 className="font-display text-2xl font-black uppercase text-white tracking-wider mb-3">
              {siteSettings.logoText || 'AMBITIOUS VENDOR'}
            </h3>
            <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
              Bridging strategy, graphic design, responsive website engineering, high-retention video post-production, and bespoke olfactory craft.
            </p>
            <div className="flex flex-col gap-2.5 text-xs text-slate-300">
              <a
                href={`tel:${siteSettings.phone}`}
                className="inline-flex items-center gap-2 hover:text-[#F5C542] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#72DFFF]" />
                <span className="font-mono">{siteSettings.phone}</span>
              </a>
              <a
                href={`mailto:${siteSettings.email}`}
                className="inline-flex items-center gap-2 hover:text-[#F5C542] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#F5C542]" />
                <span>{siteSettings.email}</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#72DFFF] mb-4">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs font-semibold tracking-wider">
              <li>
                <button
                  onClick={() => {
                    onNavigate('/');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#F5C542] transition-colors"
                >
                  HOME
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('/about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#F5C542] transition-colors"
                >
                  ABOUT US
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('/services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#F5C542] transition-colors"
                >
                  SERVICES
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('/contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#F5C542] transition-colors"
                >
                  CONTACT
                </button>
              </li>
            </ul>
          </div>

          {/* Service Disciplines */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#72DFFF] mb-4">
              Creative Disciplines
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <span className="text-[#F5C542]">·</span>
                <span>Visual Identity & Graphic Design Systems</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#72DFFF]">·</span>
                <span>Bespoke Full-Stack Website Development</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#B6A4FF]">·</span>
                <span>Luxury Fragrance & Perfume Curation</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#398BFF]">·</span>
                <span>Cinematic Video Editing & Motion Direction</span>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-[#1766A5]/20">
              <button
                onClick={() => {
                  onNavigate('/contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#F5C542] hover:underline"
              >
                <span>Request Project Proposal</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Admin Portal Link and Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} AMBITIOUS VENDOR. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('/admin')}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Management</span>
            </button>
            <span className="text-slate-700">·</span>
            <span>Crafted with cinematic precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
