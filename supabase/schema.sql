-- =========================================================================
-- AMBITIOUS VENDOR - SUPABASE PRODUCTION DATABASE SCHEMA & RLS POLICIES
-- =========================================================================
-- How to apply this schema:
-- 1. Create a Supabase project at https://supabase.com
-- 2. Open SQL Editor in your Supabase dashboard
-- 3. Paste this entire file and run it
-- 4. Copy your project URL and anon public key to your .env file:
--    VITE_SUPABASE_URL=https://[YOUR-PROJECT].supabase.co
--    VITE_SUPABASE_ANON_KEY=[YOUR-ANON-KEY]
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_name TEXT NOT NULL DEFAULT 'AMBITIOUS VENDOR',
    tagline TEXT DEFAULT 'Strategy, Visual Storytelling & Digital Experiences',
    phone TEXT NOT NULL DEFAULT '08080608722',
    email TEXT NOT NULL DEFAULT '001ambitious@gmail.com',
    whatsapp TEXT DEFAULT '2348080608722',
    logo_text TEXT DEFAULT 'AMBITIOUS VENDOR',
    seo_title TEXT DEFAULT 'AMBITIOUS VENDOR – Creative Studio & Fragrance Brand',
    seo_description TEXT DEFAULT 'A passionate creative studio bridging graphic design, website development, video editing, and exclusive luxury perfumes.',
    canonical_url TEXT DEFAULT 'https://ambitiousvendor.com',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Hero & Animation Settings Table
CREATE TABLE IF NOT EXISTS public.hero_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    headline TEXT NOT NULL DEFAULT 'AMBITIOUS VENDOR',
    color1 TEXT NOT NULL DEFAULT '#F5C542',
    color2 TEXT NOT NULL DEFAULT '#FFFFFF',
    color3 TEXT NOT NULL DEFAULT '#72DFFF',
    color4 TEXT NOT NULL DEFAULT '#398BFF',
    color5 TEXT NOT NULL DEFAULT '#B6A4FF',
    duration NUMERIC NOT NULL DEFAULT 12,
    glow_intensity NUMERIC NOT NULL DEFAULT 0.65,
    font_size_rem NUMERIC NOT NULL DEFAULT 8.5,
    letter_spacing TEXT DEFAULT '-0.04em',
    bg_image TEXT NOT NULL,
    subheading TEXT DEFAULT 'Strategy · Design · Motion · Fragrance',
    description TEXT NOT NULL,
    primary_cta_text TEXT DEFAULT 'Explore Our Services',
    primary_cta_link TEXT DEFAULT '/services',
    secondary_cta_text TEXT DEFAULT 'Contact Us',
    secondary_cta_link TEXT DEFAULT '/contact',
    show_mist BOOLEAN DEFAULT TRUE,
    show_particles BOOLEAN DEFAULT TRUE,
    parallax_intensity NUMERIC DEFAULT 1,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Marquee Settings Table
CREATE TABLE IF NOT EXISTS public.marquee_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    speed_seconds NUMERIC NOT NULL DEFAULT 26,
    direction TEXT NOT NULL DEFAULT 'left',
    separator TEXT NOT NULL DEFAULT '✦',
    items JSONB NOT NULL DEFAULT '["GRAPHIC DESIGN", "WEBSITE DEVELOPMENT", "PERFUME VENDOR", "VIDEO EDITING"]'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    image TEXT NOT NULL,
    starting_price TEXT,
    display_order INT NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT TRUE,
    deliverables JSONB DEFAULT '[]'::jsonb,
    cta_text TEXT DEFAULT 'Inquire Now',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Portfolio Projects Table
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    video_url TEXT,
    external_url TEXT,
    display_order INT NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT TRUE,
    client TEXT,
    year TEXT DEFAULT '2026',
    tags JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Perfume Products Table
CREATE TABLE IF NOT EXISTS public.perfume_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    tagline TEXT,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    price TEXT,
    status TEXT NOT NULL DEFAULT 'Available' CHECK (status IN ('Available', 'Limited Stock', 'Made to Order', 'Sold Out')),
    category TEXT DEFAULT 'Eau de Parfum',
    notes TEXT,
    volume TEXT,
    display_order INT NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT TRUE,
    inquiry_link TEXT DEFAULT '/contact?service=Perfume+Vendor',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Contact Submissions Table (Inquiries)
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service TEXT NOT NULL,
    budget TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'In Progress', 'Resolved')),
    internal_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Media Assets Table
CREATE TABLE IF NOT EXISTS public.media_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'General',
    alt TEXT NOT NULL,
    size TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Theme Settings Table
CREATE TABLE IF NOT EXISTS public.theme_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    primary_navy TEXT NOT NULL DEFAULT '#061C46',
    midnight_blue TEXT NOT NULL DEFAULT '#092A61',
    mountain_blue TEXT NOT NULL DEFAULT '#1766A5',
    sky_blue TEXT NOT NULL DEFAULT '#71B8E8',
    accent_yellow TEXT NOT NULL DEFAULT '#F5C542',
    accent_cyan TEXT NOT NULL DEFAULT '#72DFFF',
    accent_lavender TEXT NOT NULL DEFAULT '#B6A4FF',
    border_radius TEXT NOT NULL DEFAULT '16px',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. Admin Profiles Table
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

-- Enable RLS on all tables
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marquee_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.perfume_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.theme_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- 1. Public can read published content
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public can view hero settings" ON public.hero_settings FOR SELECT USING (true);
CREATE POLICY "Public can view marquee settings" ON public.marquee_settings FOR SELECT USING (true);
CREATE POLICY "Public can view published services" ON public.services FOR SELECT USING (published = true);
CREATE POLICY "Public can view published projects" ON public.portfolio_projects FOR SELECT USING (published = true);
CREATE POLICY "Public can view published perfumes" ON public.perfume_products FOR SELECT USING (published = true);
CREATE POLICY "Public can view media assets" ON public.media_assets FOR SELECT USING (true);
CREATE POLICY "Public can view theme settings" ON public.theme_settings FOR SELECT USING (true);

-- 2. Public can insert contact submissions (with basic spam protection)
CREATE POLICY "Public can submit contact form" ON public.contact_submissions 
FOR INSERT WITH CHECK (
    char_length(full_name) >= 2 AND 
    char_length(email) >= 5 AND 
    char_length(message) >= 10
);

-- 3. Authenticated admins have full CRUD access across all tables
CREATE POLICY "Admins full CRUD site settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full CRUD hero settings" ON public.hero_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full CRUD marquee settings" ON public.marquee_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full CRUD services" ON public.services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full CRUD projects" ON public.portfolio_projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full CRUD perfumes" ON public.perfume_products FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full CRUD contact submissions" ON public.contact_submissions FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full CRUD media" ON public.media_assets FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full CRUD theme settings" ON public.theme_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins read profiles" ON public.admin_profiles FOR SELECT TO authenticated USING (true);

-- =========================================================================
-- STORAGE BUCKETS SETUP (Run via Supabase Storage interface or SQL)
-- =========================================================================
-- INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true) ON CONFLICT DO NOTHING;
-- CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'media');
-- CREATE POLICY "Admin Uploads" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media');
