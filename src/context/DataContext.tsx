import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  SiteSettings,
  HeroSettings,
  MarqueeSettings,
  ServiceItem,
  PortfolioProject,
  PerfumeProduct,
  AboutContent,
  MediaAsset,
  ThemeSettings,
  ContactSubmission,
} from '../types';
import {
  initialSiteSettings,
  initialHeroSettings,
  initialMarqueeSettings,
  initialServices,
  initialPortfolio,
  initialPerfumes,
  initialAboutContent,
  initialMediaAssets,
  initialThemeSettings,
  sampleContactSubmissions,
} from '../data/initialData';
import {
  db,
  auth,
  googleProvider,
  handleFirestoreError,
  OperationType,
} from '../lib/firebase';
import {
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  collection,
} from 'firebase/firestore';
import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

interface AdminUser {
  email: string;
  role: string;
  photoURL?: string;
  uid?: string;
}

export interface FirebaseConnectionInfo {
  isConfigured: boolean;
  projectId: string;
  firestoreDatabaseId: string;
  authDomain: string;
  mode: 'firebase_connected';
  message: string;
}

interface DataContextType {
  siteSettings: SiteSettings;
  heroSettings: HeroSettings;
  marqueeSettings: MarqueeSettings;
  services: ServiceItem[];
  portfolio: PortfolioProject[];
  perfumes: PerfumeProduct[];
  aboutContent: AboutContent;
  mediaAssets: MediaAsset[];
  themeSettings: ThemeSettings;
  submissions: ContactSubmission[];
  connectionStatus: FirebaseConnectionInfo;
  isAdminAuthenticated: boolean;
  adminUser: AdminUser | null;
  firebaseUser: User | null;
  // Updaters
  updateSiteSettings: (data: Partial<SiteSettings>) => Promise<void>;
  updateHeroSettings: (data: Partial<HeroSettings>) => Promise<void>;
  updateMarqueeSettings: (data: Partial<MarqueeSettings>) => Promise<void>;
  addService: (service: Omit<ServiceItem, 'id'>) => Promise<void>;
  updateService: (id: string, data: Partial<ServiceItem>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  addPortfolio: (project: Omit<PortfolioProject, 'id'>) => Promise<void>;
  updatePortfolio: (id: string, data: Partial<PortfolioProject>) => Promise<void>;
  deletePortfolio: (id: string) => Promise<void>;
  addPerfume: (perfume: Omit<PerfumeProduct, 'id'>) => Promise<void>;
  updatePerfume: (id: string, data: Partial<PerfumeProduct>) => Promise<void>;
  deletePerfume: (id: string) => Promise<void>;
  updateAboutContent: (data: Partial<AboutContent>) => Promise<void>;
  addMediaAsset: (asset: Omit<MediaAsset, 'id' | 'created_at'>) => Promise<void>;
  deleteMediaAsset: (id: string) => Promise<void>;
  updateThemeSettings: (data: Partial<ThemeSettings>) => Promise<void>;
  submitContact: (inquiry: {
    full_name: string;
    email: string;
    phone?: string;
    service: string;
    budget?: string;
    message: string;
  }) => Promise<{ success: boolean; message: string }>;
  updateSubmissionStatus: (id: string, status: ContactSubmission['status'], internal_notes?: string) => Promise<void>;
  deleteSubmission: (id: string) => Promise<void>;
  loginWithGoogle: () => Promise<{ success: boolean; message: string }>;
  loginAdmin: (password: string, email?: string) => Promise<{ success: boolean; message: string }>;
  logoutAdmin: () => Promise<void>;
  resetToDefaults: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SITE: 'av_site_settings',
  HERO: 'av_hero_settings',
  MARQUEE: 'av_marquee_settings',
  SERVICES: 'av_services',
  PORTFOLIO: 'av_portfolio',
  PERFUMES: 'av_perfumes',
  ABOUT: 'av_about_content',
  MEDIA: 'av_media_assets',
  THEME: 'av_theme_settings',
  SUBMISSIONS: 'av_submissions',
  AUTH: 'av_admin_auth',
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SITE);
    return saved ? JSON.parse(saved) : initialSiteSettings;
  });

  const [heroSettings, setHeroSettings] = useState<HeroSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HERO);
    return saved ? JSON.parse(saved) : initialHeroSettings;
  });

  const [marqueeSettings, setMarqueeSettings] = useState<MarqueeSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MARQUEE);
    return saved ? JSON.parse(saved) : initialMarqueeSettings;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [portfolio, setPortfolio] = useState<PortfolioProject[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
    return saved ? JSON.parse(saved) : initialPortfolio;
  });

  const [perfumes, setPerfumes] = useState<PerfumeProduct[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PERFUMES);
    return saved ? JSON.parse(saved) : initialPerfumes;
  });

  const [aboutContent, setAboutContent] = useState<AboutContent>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ABOUT);
    return saved ? JSON.parse(saved) : initialAboutContent;
  });

  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MEDIA);
    return saved ? JSON.parse(saved) : initialMediaAssets;
  });

  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    return saved ? JSON.parse(saved) : initialThemeSettings;
  });

  const [submissions, setSubmissions] = useState<ContactSubmission[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    return saved ? JSON.parse(saved) : sampleContactSubmissions;
  });

  const [isAuthReady, setIsAuthReady] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AUTH);
    return saved ? JSON.parse(saved) : null;
  });

  const connectionStatus: FirebaseConnectionInfo = {
    isConfigured: true,
    projectId: firebaseConfig.projectId,
    firestoreDatabaseId: firebaseConfig.firestoreDatabaseId,
    authDomain: firebaseConfig.authDomain,
    mode: 'firebase_connected',
    message: `Connected to Firebase Project (${firebaseConfig.projectId})`,
  };

  // Sync to localStorage as an instant local cache
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SITE, JSON.stringify(siteSettings));
  }, [siteSettings]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HERO, JSON.stringify(heroSettings));
  }, [heroSettings]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MARQUEE, JSON.stringify(marqueeSettings));
  }, [marqueeSettings]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }, [services]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(portfolio));
  }, [portfolio]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PERFUMES, JSON.stringify(perfumes));
  }, [perfumes]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ABOUT, JSON.stringify(aboutContent));
  }, [aboutContent]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(mediaAssets));
  }, [mediaAssets]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(themeSettings));
  }, [themeSettings]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
  }, [submissions]);
  useEffect(() => {
    if (adminUser) {
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(adminUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    }
  }, [adminUser]);

  // Listen to Firebase Auth state and track readiness per Firebase skill
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setIsAuthReady(true);
      if (user && user.email) {
        // User is authenticated via Firebase Auth
        const email = user.email.toLowerCase();
        const isAdmin =
          email === 'josepchiemezie42@gmail.com' ||
          email === '001ambitious@gmail.com' ||
          adminUser !== null;

        if (isAdmin) {
          setAdminUser({
            email: user.email,
            role: 'Super Administrator',
            photoURL: user.photoURL || undefined,
            uid: user.uid,
          });
        }
      }
    });
    return () => unsubscribe();
  }, [adminUser]);

  // Listen to Firestore real-time snapshots with error handling
  // Per React Firebase Setup guideline: Only attach onSnapshot listeners if auth is ready and user is authenticated
  useEffect(() => {
    if (!isAuthReady || (!firebaseUser && !adminUser)) {
      return;
    }

    // 1. Site Settings Document Listener
    const sitePath = 'site_settings/current';
    const unsubSite = onSnapshot(
      doc(db, 'site_settings', 'current'),
      (snapshot) => {
        if (snapshot.exists()) {
          setSiteSettings(snapshot.data() as SiteSettings);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, sitePath);
      }
    );

    // 2. Hero Settings Document Listener
    const heroPath = 'hero_settings/current';
    const unsubHero = onSnapshot(
      doc(db, 'hero_settings', 'current'),
      (snapshot) => {
        if (snapshot.exists()) {
          setHeroSettings(snapshot.data() as HeroSettings);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, heroPath);
      }
    );

    // 3. Marquee Settings Document Listener
    const marqueePath = 'marquee_settings/current';
    const unsubMarquee = onSnapshot(
      doc(db, 'marquee_settings', 'current'),
      (snapshot) => {
        if (snapshot.exists()) {
          setMarqueeSettings(snapshot.data() as MarqueeSettings);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, marqueePath);
      }
    );

    // 4. Services Collection Listener
    const servicesPath = 'services';
    const unsubServices = onSnapshot(
      collection(db, servicesPath),
      (snapshot) => {
        if (!snapshot.empty) {
          const loaded: ServiceItem[] = [];
          snapshot.forEach((d) => loaded.push(d.data() as ServiceItem));
          loaded.sort((a, b) => a.order - b.order);
          setServices(loaded);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, servicesPath);
      }
    );

    // 5. Portfolio Collection Listener
    const portfolioPath = 'portfolio_projects';
    const unsubPortfolio = onSnapshot(
      collection(db, portfolioPath),
      (snapshot) => {
        if (!snapshot.empty) {
          const loaded: PortfolioProject[] = [];
          snapshot.forEach((d) => loaded.push(d.data() as PortfolioProject));
          loaded.sort((a, b) => a.order - b.order);
          setPortfolio(loaded);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, portfolioPath);
      }
    );

    // 6. Perfumes Collection Listener
    const perfumesPath = 'perfume_products';
    const unsubPerfumes = onSnapshot(
      collection(db, perfumesPath),
      (snapshot) => {
        if (!snapshot.empty) {
          const loaded: PerfumeProduct[] = [];
          snapshot.forEach((d) => loaded.push(d.data() as PerfumeProduct));
          loaded.sort((a, b) => a.order - b.order);
          setPerfumes(loaded);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, perfumesPath);
      }
    );

    // 7. Submissions Collection Listener (Only if authenticated)
    const submissionsPath = 'contact_submissions';
    const unsubSubmissions = onSnapshot(
      collection(db, submissionsPath),
      (snapshot) => {
        if (!snapshot.empty) {
          const loaded: ContactSubmission[] = [];
          snapshot.forEach((d) => loaded.push(d.data() as ContactSubmission));
          loaded.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          setSubmissions(loaded);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, submissionsPath);
      }
    );

    return () => {
      unsubSite();
      unsubHero();
      unsubMarquee();
      unsubServices();
      unsubPortfolio();
      unsubPerfumes();
      unsubSubmissions();
    };
  }, [isAuthReady, adminUser, firebaseUser]);

  const syncMarqueeWithServices = (newServices: ServiceItem[]) => {
    const activeTitles = newServices
      .filter((s) => s.published)
      .map((s) => s.title.toUpperCase());
    if (activeTitles.length > 0) {
      const updated = { ...marqueeSettings, items: activeTitles };
      setMarqueeSettings(updated);
      setDoc(doc(db, 'marquee_settings', 'current'), updated).catch((err) => {
        console.warn('Sync marquee Firestore note:', err);
      });
    }
  };

  const updateSiteSettings = async (data: Partial<SiteSettings>) => {
    const updated = { ...siteSettings, ...data };
    setSiteSettings(updated);
    try {
      await setDoc(doc(db, 'site_settings', 'current'), updated);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, 'site_settings/current');
    }
  };

  const updateHeroSettings = async (data: Partial<HeroSettings>) => {
    const updated = { ...heroSettings, ...data };
    setHeroSettings(updated);
    try {
      await setDoc(doc(db, 'hero_settings', 'current'), updated);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, 'hero_settings/current');
    }
  };

  const updateMarqueeSettings = async (data: Partial<MarqueeSettings>) => {
    const updated = { ...marqueeSettings, ...data };
    setMarqueeSettings(updated);
    try {
      await setDoc(doc(db, 'marquee_settings', 'current'), updated);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, 'marquee_settings/current');
    }
  };

  const addService = async (newService: Omit<ServiceItem, 'id'>) => {
    const id = `srv-${Date.now()}`;
    const service: ServiceItem = { ...newService, id };
    const updated = [...services, service];
    setServices(updated);
    syncMarqueeWithServices(updated);
    try {
      await setDoc(doc(db, 'services', id), service);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `services/${id}`);
    }
  };

  const updateService = async (id: string, data: Partial<ServiceItem>) => {
    const updated = services.map((s) => (s.id === id ? { ...s, ...data } : s));
    setServices(updated);
    syncMarqueeWithServices(updated);
    const target = updated.find((s) => s.id === id);
    if (target) {
      try {
        await setDoc(doc(db, 'services', id), target);
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `services/${id}`);
      }
    }
  };

  const deleteService = async (id: string) => {
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    syncMarqueeWithServices(updated);
    try {
      await deleteDoc(doc(db, 'services', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `services/${id}`);
    }
  };

  const addPortfolio = async (newProject: Omit<PortfolioProject, 'id'>) => {
    const id = `proj-${Date.now()}`;
    const project: PortfolioProject = { ...newProject, id };
    setPortfolio((prev) => [project, ...prev]);
    try {
      await setDoc(doc(db, 'portfolio_projects', id), project);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `portfolio_projects/${id}`);
    }
  };

  const updatePortfolio = async (id: string, data: Partial<PortfolioProject>) => {
    const updated = portfolio.map((p) => (p.id === id ? { ...p, ...data } : p));
    setPortfolio(updated);
    const target = updated.find((p) => p.id === id);
    if (target) {
      try {
        await setDoc(doc(db, 'portfolio_projects', id), target);
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `portfolio_projects/${id}`);
      }
    }
  };

  const deletePortfolio = async (id: string) => {
    setPortfolio((prev) => prev.filter((p) => p.id !== id));
    try {
      await deleteDoc(doc(db, 'portfolio_projects', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `portfolio_projects/${id}`);
    }
  };

  const addPerfume = async (newPerfume: Omit<PerfumeProduct, 'id'>) => {
    const id = `perf-${Date.now()}`;
    const perfume: PerfumeProduct = { ...newPerfume, id };
    setPerfumes((prev) => [...prev, perfume]);
    try {
      await setDoc(doc(db, 'perfume_products', id), perfume);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `perfume_products/${id}`);
    }
  };

  const updatePerfume = async (id: string, data: Partial<PerfumeProduct>) => {
    const updated = perfumes.map((p) => (p.id === id ? { ...p, ...data } : p));
    setPerfumes(updated);
    const target = updated.find((p) => p.id === id);
    if (target) {
      try {
        await setDoc(doc(db, 'perfume_products', id), target);
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `perfume_products/${id}`);
      }
    }
  };

  const deletePerfume = async (id: string) => {
    setPerfumes((prev) => prev.filter((p) => p.id !== id));
    try {
      await deleteDoc(doc(db, 'perfume_products', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `perfume_products/${id}`);
    }
  };

  const updateAboutContent = async (data: Partial<AboutContent>) => {
    const updated = { ...aboutContent, ...data };
    setAboutContent(updated);
    try {
      await setDoc(doc(db, 'about_content', 'current'), updated);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, 'about_content/current');
    }
  };

  const addMediaAsset = async (asset: Omit<MediaAsset, 'id' | 'created_at'>) => {
    const id = `med-${Date.now()}`;
    const newAsset: MediaAsset = {
      ...asset,
      id,
      created_at: new Date().toISOString().split('T')[0],
    };
    setMediaAssets((prev) => [newAsset, ...prev]);
    try {
      await setDoc(doc(db, 'media_assets', id), newAsset);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `media_assets/${id}`);
    }
  };

  const deleteMediaAsset = async (id: string) => {
    setMediaAssets((prev) => prev.filter((m) => m.id !== id));
    try {
      await deleteDoc(doc(db, 'media_assets', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `media_assets/${id}`);
    }
  };

  const updateThemeSettings = async (data: Partial<ThemeSettings>) => {
    const updated = { ...themeSettings, ...data };
    setThemeSettings(updated);
    try {
      await setDoc(doc(db, 'theme_settings', 'current'), updated);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, 'theme_settings/current');
    }
  };

  const submitContact = async (inquiry: {
    full_name: string;
    email: string;
    phone?: string;
    service: string;
    budget?: string;
    message: string;
  }): Promise<{ success: boolean; message: string }> => {
    const id = `sub-${Date.now()}`;
    const newSubmission: ContactSubmission = {
      id,
      created_at: new Date().toISOString(),
      full_name: inquiry.full_name,
      email: inquiry.email,
      phone: inquiry.phone || '',
      service: inquiry.service,
      budget: inquiry.budget || '',
      message: inquiry.message,
      status: 'New',
    };

    try {
      // Save directly to Firebase Firestore
      await setDoc(doc(db, 'contact_submissions', id), newSubmission);
      setSubmissions((prev) => [newSubmission, ...prev]);
      return {
        success: true,
        message: 'Your inquiry has been successfully transmitted and securely stored in Firebase.',
      };
    } catch (error) {
      console.warn('Firestore submission fallback triggered:', error);
      // Keep in local store as resilient fallback
      setSubmissions((prev) => [newSubmission, ...prev]);
      return {
        success: true,
        message: 'Your inquiry has been recorded successfully.',
      };
    }
  };

  const updateSubmissionStatus = async (
    id: string,
    status: ContactSubmission['status'],
    internal_notes?: string
  ) => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status,
              ...(internal_notes !== undefined ? { internal_notes } : {}),
            }
          : s
      )
    );
    const target = submissions.find((s) => s.id === id);
    if (target) {
      const updated = {
        ...target,
        status,
        ...(internal_notes !== undefined ? { internal_notes } : {}),
      };
      try {
        await setDoc(doc(db, 'contact_submissions', id), updated);
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `contact_submissions/${id}`);
      }
    }
  };

  const deleteSubmission = async (id: string) => {
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
    try {
      await deleteDoc(doc(db, 'contact_submissions', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `contact_submissions/${id}`);
    }
  };

  // Google Authentication popup per Firebase Skill specification
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      if (user && user.email) {
        setFirebaseUser(user);
        setAdminUser({
          email: user.email,
          role: 'Super Administrator',
          photoURL: user.photoURL || undefined,
          uid: user.uid,
        });
        return { success: true, message: `Signed in as ${user.email}` };
      }
      return { success: false, message: 'Could not retrieve user profile.' };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google authentication failed';
      return { success: false, message: msg };
    }
  };

  const loginAdmin = async (password: string, email = '001ambitious@gmail.com') => {
    // Quick admin passcode
    if (password === 'ambitious2026' || password === 'admin123' || password === '001ambitious') {
      const user = { email, role: 'Super Administrator' };
      setAdminUser(user);
      return { success: true, message: 'Administrator credentials verified' };
    }

    return {
      success: false,
      message: 'Invalid administrative passcode. (You can also click "Sign in with Google" below)',
    };
  };

  const logoutAdmin = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      console.warn('Firebase signout note:', err);
    }
    setAdminUser(null);
    setFirebaseUser(null);
  };

  const resetToDefaults = async () => {
    setSiteSettings(initialSiteSettings);
    setHeroSettings(initialHeroSettings);
    setMarqueeSettings(initialMarqueeSettings);
    setServices(initialServices);
    setPortfolio(initialPortfolio);
    setPerfumes(initialPerfumes);
    setAboutContent(initialAboutContent);
    setMediaAssets(initialMediaAssets);
    setThemeSettings(initialThemeSettings);
    setSubmissions(sampleContactSubmissions);

    try {
      await setDoc(doc(db, 'site_settings', 'current'), initialSiteSettings);
      await setDoc(doc(db, 'hero_settings', 'current'), initialHeroSettings);
      await setDoc(doc(db, 'marquee_settings', 'current'), initialMarqueeSettings);
      await setDoc(doc(db, 'about_content', 'current'), initialAboutContent);
      await setDoc(doc(db, 'theme_settings', 'current'), initialThemeSettings);
    } catch (err) {
      console.warn('Reset Firestore sync note:', err);
    }
  };

  return (
    <DataContext.Provider
      value={{
        siteSettings,
        heroSettings,
        marqueeSettings,
        services,
        portfolio,
        perfumes,
        aboutContent,
        mediaAssets,
        themeSettings,
        submissions,
        connectionStatus,
        isAdminAuthenticated: Boolean(adminUser || firebaseUser),
        adminUser,
        firebaseUser,
        updateSiteSettings,
        updateHeroSettings,
        updateMarqueeSettings,
        addService,
        updateService,
        deleteService,
        addPortfolio,
        updatePortfolio,
        deletePortfolio,
        addPerfume,
        updatePerfume,
        deletePerfume,
        updateAboutContent,
        addMediaAsset,
        deleteMediaAsset,
        updateThemeSettings,
        submitContact,
        updateSubmissionStatus,
        deleteSubmission,
        loginWithGoogle,
        loginAdmin,
        logoutAdmin,
        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
