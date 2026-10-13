import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase, getSupabaseStatus } from '../lib/supabase';
import { SiteSettings, HeroSettings, MarqueeSettings, ServiceItem, PortfolioProject, PerfumeProduct, AboutContent, MediaAsset, ThemeSettings, ContactSubmission } from '../types';
import { initialSiteSettings, initialHeroSettings, initialMarqueeSettings, initialServices, initialPortfolio, initialPerfumes, initialAboutContent, initialMediaAssets, initialThemeSettings } from '../data/initialData';

interface AdminUser { email: string; role: string; photoURL?: string; uid?: string; }
export interface SupabaseConnectionInfo { isConfigured: boolean; projectId: string; databaseLabel: string; authDomain: string; mode: 'supabase_connected' | 'local_managed_store'; message: string; }
interface DataContextType {
 siteSettings: SiteSettings; heroSettings: HeroSettings; marqueeSettings: MarqueeSettings; services: ServiceItem[]; portfolio: PortfolioProject[]; perfumes: PerfumeProduct[]; aboutContent: AboutContent; mediaAssets: MediaAsset[]; themeSettings: ThemeSettings; submissions: ContactSubmission[]; connectionStatus: SupabaseConnectionInfo; isAdminAuthenticated: boolean; adminUser: AdminUser | null; authUser: User | null;
 updateSiteSettings:(d:Partial<SiteSettings>)=>Promise<void>; updateHeroSettings:(d:Partial<HeroSettings>)=>Promise<void>; updateMarqueeSettings:(d:Partial<MarqueeSettings>)=>Promise<void>;
 addService:(d:Omit<ServiceItem,'id'>)=>Promise<void>; updateService:(id:string,d:Partial<ServiceItem>)=>Promise<void>; deleteService:(id:string)=>Promise<void>;
 addPortfolio:(d:Omit<PortfolioProject,'id'>)=>Promise<void>; updatePortfolio:(id:string,d:Partial<PortfolioProject>)=>Promise<void>; deletePortfolio:(id:string)=>Promise<void>;
 addPerfume:(d:Omit<PerfumeProduct,'id'>)=>Promise<void>; updatePerfume:(id:string,d:Partial<PerfumeProduct>)=>Promise<void>; deletePerfume:(id:string)=>Promise<void>;
 updateAboutContent:(d:Partial<AboutContent>)=>Promise<void>; addMediaAsset:(d:Omit<MediaAsset,'id'|'created_at'>)=>Promise<void>; deleteMediaAsset:(id:string)=>Promise<void>; updateThemeSettings:(d:Partial<ThemeSettings>)=>Promise<void>;
 submitContact:(d:{full_name:string;email:string;phone?:string;service:string;budget?:string;message:string})=>Promise<{success:boolean;message:string}>;
 updateSubmissionStatus:(id:string,status:ContactSubmission['status'],notes?:string)=>Promise<void>; deleteSubmission:(id:string)=>Promise<void>; loginWithGoogle:()=>Promise<{success:boolean;message:string}>; loginAdmin:(password:string,email?:string)=>Promise<{success:boolean;message:string}>; logoutAdmin:()=>Promise<void>; resetToDefaults:()=>Promise<void>;
}
const Ctx=createContext<DataContextType|undefined>(undefined);
const ADMINS=['josepchiemezie42@gmail.com','001ambitious@gmail.com'];
const cached=<T,>(key:string,fallback:T):T=>{try{const s=localStorage.getItem('av_'+key);return s?JSON.parse(s):fallback;}catch{return fallback;}};
const adminFor=(u:User|null):AdminUser|null=>u?.email&&ADMINS.includes(u.email.toLowerCase())?{email:u.email,role:'Super Administrator',photoURL:u.user_metadata?.avatar_url,uid:u.id}:null;
const status=():SupabaseConnectionInfo=>{const s=getSupabaseStatus();return {isConfigured:s.isConfigured,projectId:s.url||'Not configured',databaseLabel:'Supabase PostgreSQL',authDomain:s.url||'Not configured',mode:s.mode,message:s.message};};
export const DataProvider:React.FC<{children:ReactNode}>=({children})=>{
 const [siteSettings,Ssite]=useState<SiteSettings>(()=>cached('site_settings',initialSiteSettings));
 const [heroSettings,Sh]=useState<HeroSettings>(()=>cached('hero_settings',initialHeroSettings));
 const [marqueeSettings,Sm]=useState<MarqueeSettings>(()=>cached('marquee_settings',initialMarqueeSettings));
 const [services,Ss]=useState<ServiceItem[]>(()=>cached('services',initialServices));
 const [portfolio,Sp]=useState<PortfolioProject[]>(()=>cached('portfolio',initialPortfolio));
 const [perfumes,Sperf]=useState<PerfumeProduct[]>(()=>cached('perfumes',initialPerfumes));
 const [aboutContent,Sa]=useState<AboutContent>(()=>cached('about_content',initialAboutContent));
 const [mediaAssets,Smed]=useState<MediaAsset[]>(()=>cached('media_assets',initialMediaAssets));
 const [themeSettings,St]=useState<ThemeSettings>(()=>cached('theme_settings',initialThemeSettings));
 const [submissions,Ssub]=useState<ContactSubmission[]>([]);
 const [authUser,Su]=useState<User|null>(null);
 const [adminUser,Sadmin]=useState<AdminUser|null>(null);
 const connectionStatus=status();
 const load=async(u:User|null)=>{
  if(!supabase)return;
  try{
   const one=async<T,>(table:string,fallback:T):Promise<T>=>{const {data,error}=await supabase!.from(table).select('data').eq('key','current').maybeSingle();if(error)throw error;if(!data&&adminFor(u)){const {error:seedError}=await supabase!.from(table).upsert({key:'current',data:fallback});if(seedError)throw seedError;}return (data?.data as T)||fallback;};
   const many=async<T,>(table:string,fallback:T[]):Promise<T[]>=>{let q=supabase!.from(table).select('data,sort_order,published');if(!adminFor(u))q=q.eq('published',true);const {data,error}=await q.order('sort_order');if(error)throw error;if(!data?.length&&adminFor(u)){const rows=(fallback as any[]).map((item:any)=>({id:item.id,data:item,sort_order:Number(item.order||0),published:item.published!==false}));const {error:seedError}=await supabase!.from(table).upsert(rows);if(seedError)throw seedError;}return data?.length?data.map((x:any)=>x.data as T):fallback;};
   const [a,b,c,d,e,f,g,h]=await Promise.all([one('site_settings',initialSiteSettings),one('hero_settings',initialHeroSettings),one('marquee_settings',initialMarqueeSettings),many('services',initialServices),many('portfolio_projects',initialPortfolio),many('perfume_products',initialPerfumes),one('about_content',initialAboutContent),one('theme_settings',initialThemeSettings)]);
   Ssite(a);Sh(b);Sm(c);Ss(d);Sp(e);Sperf(f);Sa(g);St(h);
   if(adminFor(u)){const [m,s]=await Promise.all([supabase.from('media_assets').select('data').order('created_at',{ascending:false}),supabase.from('contact_submissions').select('*').order('created_at',{ascending:false})]);if(!m.error&&m.data){if(m.data.length)Smed(m.data.map((x:any)=>x.data));else{const seed=initialMediaAssets.map((x:any)=>({id:x.id,data:x,created_at:x.created_at}));const {error:seedError}=await supabase!.from('media_assets').upsert(seed);if(!seedError)Smed(initialMediaAssets);}}if(!s.error&&s.data)Ssub(s.data as ContactSubmission[]);}
  }catch(e){console.error('Supabase load failed:',e);}
 };
 useEffect(()=>{[ ['site_settings',siteSettings],['hero_settings',heroSettings],['marquee_settings',marqueeSettings],['services',services],['portfolio',portfolio],['perfumes',perfumes],['about_content',aboutContent],['media_assets',mediaAssets],['theme_settings',themeSettings] ].forEach(([k,v])=>{try{localStorage.setItem('av_'+k,JSON.stringify(v));}catch{}});},[siteSettings,heroSettings,marqueeSettings,services,portfolio,perfumes,aboutContent,mediaAssets,themeSettings]);
 useEffect(()=>{if(!supabase)return;supabase.auth.getSession().then(({data})=>{const u=data.session?.user||null;Su(u);Sadmin(adminFor(u));void load(u);});const {data}=supabase.auth.onAuthStateChange((_e,s)=>{const u=s?.user||null;Su(u);Sadmin(adminFor(u));void load(u);});return()=>data.subscription.unsubscribe();},[]);
 const saveOne=async(table:string,data:any)=>{if(!supabase)return;const {error}=await supabase.from(table).upsert({key:'current',data,updated_at:new Date().toISOString()});if(error)throw error;};
 const saveItem=async(table:string,x:any)=>{if(!supabase)return;const {error}=await supabase.from(table).upsert({id:x.id,data:x,sort_order:Number(x.order||0),published:x.published!==false,updated_at:new Date().toISOString()});if(error)throw error;};
 const del=async(table:string,id:string)=>{if(!supabase)return;const {error}=await supabase.from(table).delete().eq('id',id);if(error)throw error;};
 const updateSiteSettings=async(d:Partial<SiteSettings>)=>{const x={...siteSettings,...d};Ssite(x);await saveOne('site_settings',x);};
 const updateHeroSettings=async(d:Partial<HeroSettings>)=>{const x={...heroSettings,...d};Sh(x);await saveOne('hero_settings',x);};
 const updateMarqueeSettings=async(d:Partial<MarqueeSettings>)=>{const x={...marqueeSettings,...d};Sm(x);await saveOne('marquee_settings',x);};
 const addService=async(d:Omit<ServiceItem,'id'>)=>{const x={...d,id:'srv-'+Date.now()} as ServiceItem;Ss(p=>[...p,x]);await saveItem('services',x);};
 const updateService=async(id:string,d:Partial<ServiceItem>)=>{const x=services.map(s=>s.id===id?{...s,...d}:s);Ss(x);const row=x.find(s=>s.id===id);if(row)await saveItem('services',row);};
 const deleteService=async(id:string)=>{Ss(p=>p.filter(x=>x.id!==id));await del('services',id);};
 const addPortfolio=async(d:Omit<PortfolioProject,'id'>)=>{const x={...d,id:'proj-'+Date.now()} as PortfolioProject;Sp(p=>[x,...p]);await saveItem('portfolio_projects',x);};
 const updatePortfolio=async(id:string,d:Partial<PortfolioProject>)=>{const x=portfolio.map(p=>p.id===id?{...p,...d}:p);Sp(x);const row=x.find(p=>p.id===id);if(row)await saveItem('portfolio_projects',row);};
 const deletePortfolio=async(id:string)=>{Sp(p=>p.filter(x=>x.id!==id));await del('portfolio_projects',id);};
 const addPerfume=async(d:Omit<PerfumeProduct,'id'>)=>{const x={...d,id:'perf-'+Date.now()} as PerfumeProduct;Sperf(p=>[...p,x]);await saveItem('perfume_products',x);};
 const updatePerfume=async(id:string,d:Partial<PerfumeProduct>)=>{const x=perfumes.map(p=>p.id===id?{...p,...d}:p);Sperf(x);const row=x.find(p=>p.id===id);if(row)await saveItem('perfume_products',row);};
 const deletePerfume=async(id:string)=>{Sperf(p=>p.filter(x=>x.id!==id));await del('perfume_products',id);};
 const updateAboutContent=async(d:Partial<AboutContent>)=>{const x={...aboutContent,...d};Sa(x);await saveOne('about_content',x);};
 const addMediaAsset=async(d:Omit<MediaAsset,'id'|'created_at'>)=>{const x={...d,id:'med-'+Date.now(),created_at:new Date().toISOString().slice(0,10)} as MediaAsset;Smed(p=>[x,...p]);if(supabase){const {error}=await supabase.from('media_assets').upsert({id:x.id,data:x,created_at:x.created_at});if(error)throw error;}};
 const deleteMediaAsset=async(id:string)=>{Smed(p=>p.filter(x=>x.id!==id));await del('media_assets',id);};
 const updateThemeSettings=async(d:Partial<ThemeSettings>)=>{const x={...themeSettings,...d};St(x);await saveOne('theme_settings',x);};
 const submitContact=async(d:{full_name:string;email:string;phone?:string;service:string;budget?:string;message:string})=>{const x:ContactSubmission={id:'sub-'+Date.now(),created_at:new Date().toISOString(),full_name:d.full_name,email:d.email,phone:d.phone||'',service:d.service,budget:d.budget||'',message:d.message,status:'New'};if(supabase){const {error}=await supabase.from('contact_submissions').insert(x);if(error)return{success:false,message:'We could not send your inquiry. Please try again or contact us directly.'};}return{success:true,message:'Your inquiry has been sent successfully. We will be in touch soon.'};};
 const updateSubmissionStatus=async(id:string,status:ContactSubmission['status'],internal_notes?:string)=>{const x=submissions.find(s=>s.id===id);if(!x)return;const next={...x,status,...(internal_notes!==undefined?{internal_notes}:{})};Ssub(p=>p.map(s=>s.id===id?next:s));if(supabase){const {error}=await supabase.from('contact_submissions').update({status,internal_notes:next.internal_notes}).eq('id',id);if(error)throw error;}};
 const deleteSubmission=async(id:string)=>{Ssub(p=>p.filter(s=>s.id!==id));if(supabase){const {error}=await supabase.from('contact_submissions').delete().eq('id',id);if(error)throw error;}};
 const loginWithGoogle=async()=>{if(!supabase)return{success:false,message:'Supabase is not configured.'};const {error}=await supabase.auth.signInWithOAuth({provider:'google',options:{redirectTo:window.location.origin+'/admin'}});return error?{success:false,message:error.message}:{success:true,message:'Redirecting to Google sign-in…'};};
 const loginAdmin=async(password:string,email='')=>{if(!supabase)return{success:false,message:'Supabase is not configured.'};const e=email.trim().toLowerCase();if(!ADMINS.includes(e))return{success:false,message:'This email is not authorized for administration.'};const {data,error}=await supabase.auth.signInWithPassword({email:e,password});if(error||!data.user)return{success:false,message:error?.message||'Sign-in failed.'};if(!adminFor(data.user)){await supabase.auth.signOut();return{success:false,message:'This account is not authorized.'};}Su(data.user);Sadmin(adminFor(data.user));await load(data.user);return{success:true,message:'Administrator signed in.'};};
 const logoutAdmin=async()=>{if(supabase)await supabase.auth.signOut();Su(null);Sadmin(null);Ssub([]);};
 const resetToDefaults=async()=>{Ssite(initialSiteSettings);Sh(initialHeroSettings);Sm(initialMarqueeSettings);Ss(initialServices);Sp(initialPortfolio);Sperf(initialPerfumes);Sa(initialAboutContent);Smed(initialMediaAssets);St(initialThemeSettings);await Promise.all([saveOne('site_settings',initialSiteSettings),saveOne('hero_settings',initialHeroSettings),saveOne('marquee_settings',initialMarqueeSettings),saveOne('about_content',initialAboutContent),saveOne('theme_settings',initialThemeSettings),...initialServices.map(x=>saveItem('services',x)),...initialPortfolio.map(x=>saveItem('portfolio_projects',x)),...initialPerfumes.map(x=>saveItem('perfume_products',x))]);};
 return <Ctx.Provider value={{siteSettings,heroSettings,marqueeSettings,services,portfolio,perfumes,aboutContent,mediaAssets,themeSettings,submissions,connectionStatus,isAdminAuthenticated:Boolean(adminUser),adminUser,authUser,updateSiteSettings,updateHeroSettings,updateMarqueeSettings,addService,updateService,deleteService,addPortfolio,updatePortfolio,deletePortfolio,addPerfume,updatePerfume,deletePerfume,updateAboutContent,addMediaAsset,deleteMediaAsset,updateThemeSettings,submitContact,updateSubmissionStatus,deleteSubmission,loginWithGoogle,loginAdmin,logoutAdmin,resetToDefaults}}>{children}</Ctx.Provider>;
};
export const useData=()=>{const c=useContext(Ctx);if(!c)throw new Error('useData must be used within a DataProvider');return c;};
