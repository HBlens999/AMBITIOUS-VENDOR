import React, { useState, useEffect } from 'react';
import { DataProvider, useData } from './context/DataContext';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboard } from './pages/AdminDashboard';

const MainContent: React.FC = () => {
  const { siteSettings } = useData();

  // Route state
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // Keep title updated with siteSettings
  useEffect(() => {
    if (siteSettings.seoTitle) {
      document.title = siteSettings.seoTitle;
    }
  }, [siteSettings.seoTitle]);

  // Sync browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    const cleanPath = path.split('?')[0].split('#')[0];
    window.history.pushState({}, '', path);
    setCurrentPath(cleanPath || '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#061C46] text-slate-100 selection:bg-[#F5C542] selection:text-[#061C46]">
      {/* Top Navigation Bar */}
      <Navigation currentPath={currentPath} onNavigate={handleNavigate} />

      {/* Main Page Views */}
      <main className="flex-1">
        {currentPath === '/' && <HomePage onNavigate={handleNavigate} />}
        {currentPath === '/about' && <AboutPage onNavigate={handleNavigate} />}
        {currentPath === '/services' && <ServicesPage onNavigate={handleNavigate} />}
        {currentPath === '/contact' && <ContactPage />}
        {currentPath === '/admin' && <AdminDashboard onNavigate={handleNavigate} />}
        {currentPath !== '/' &&
          currentPath !== '/about' &&
          currentPath !== '/services' &&
          currentPath !== '/contact' &&
          currentPath !== '/admin' && <HomePage onNavigate={handleNavigate} />}
      </main>

      {/* Quiet, refined Footer (hidden on admin dashboard for clean workspace) */}
      {currentPath !== '/admin' && <Footer onNavigate={handleNavigate} />}
    </div>
  );
};

export default function App() {
  return (
    <DataProvider>
      <MainContent />
    </DataProvider>
  );
}
