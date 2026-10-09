import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Phone, Mail, MessageSquare, Send, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

interface ContactPageProps {
  initialService?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ initialService }) => {
  const { siteSettings, submitContact } = useData();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Graphic Design');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Check URL parameters for preselected service
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('service');
    if (serviceParam) {
      setService(serviceParam);
    } else if (initialService) {
      setService(initialService);
    }
  }, [initialService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    // Validation
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage('Please enter your full name (minimum 2 characters).');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      setErrorMessage('Please provide a message with at least 10 characters.');
      return;
    }

    setLoading(true);

    try {
      const res = await submitContact({
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        service,
        budget: budget.trim(),
        message: message.trim(),
      });

      if (res.success) {
        setSuccessMessage(res.message);
        setFullName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setBudget('');
      } else {
        setErrorMessage(res.message);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const cleanWhatsappNumber = (siteSettings.whatsapp || '2348080608722').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(
    'Hello AMBITIOUS VENDOR, I am interested in collaborating on a creative project.'
  )}`;

  return (
    <div className="pt-24 sm:pt-28 min-h-screen bg-[#061C46]">
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#F5C542] block mb-3">
                Let's Connect
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
                Get in Touch
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-10">
                Whether you need a full brand overhaul, bespoke website engineering, high-retention video production, or a luxury fragrance order, we are ready to bring your vision to life.
              </p>

              {/* Verified Contact Details Cards */}
              <div className="space-y-4 mb-10">
                {/* Telephone */}
                <a
                  href={`tel:${siteSettings.phone}`}
                  className="group flex items-center gap-4 p-5 rounded-2xl bg-[#092A61]/70 border border-[#1766A5]/40 hover:border-[#72DFFF] transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#061C46] text-[#72DFFF] flex items-center justify-center shrink-0 group-hover:bg-[#F5C542] group-hover:text-[#061C46] transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                      Direct Telephone
                    </span>
                    <span className="font-display text-lg font-bold text-white group-hover:text-[#F5C542] transition-colors">
                      {siteSettings.phone}
                    </span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="group flex items-center gap-4 p-5 rounded-2xl bg-[#092A61]/70 border border-[#1766A5]/40 hover:border-[#72DFFF] transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#061C46] text-[#F5C542] flex items-center justify-center shrink-0 group-hover:bg-[#F5C542] group-hover:text-[#061C46] transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                      Inquiries Email
                    </span>
                    <span className="font-display text-lg font-bold text-white group-hover:text-[#F5C542] transition-colors break-all">
                      {siteSettings.email}
                    </span>
                  </div>
                </a>

                {/* WhatsApp Direct */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-5 rounded-2xl bg-[#092A61]/70 border border-[#1766A5]/40 hover:border-[#72DFFF] transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#061C46] text-emerald-400 flex items-center justify-center shrink-0 group-hover:bg-[#F5C542] group-hover:text-[#061C46] transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                      Instant Messaging
                    </span>
                    <span className="font-display text-lg font-bold text-white group-hover:text-[#F5C542] transition-colors">
                      Direct WhatsApp Chat
                    </span>
                  </div>
                </a>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#061C46]/80 border border-[#1766A5]/30 flex items-center gap-3 text-xs text-slate-300">
              <Clock className="w-4 h-4 text-[#F5C542] shrink-0" />
              <span>We review and respond to inquiries within 24 hours.</span>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#092A61]/90 to-[#061C46]/95 border border-[#1766A5]/40 shadow-2xl">
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-2">
                Send an Inquiry
              </h2>
              <p className="text-sm text-slate-300 mb-8">
                Please fill in the project details below and we will get back to you promptly.
              </p>

              {/* Status Notifications */}
              {successMessage && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" />
                  <div>
                    <p className="font-semibold">{successMessage}</p>
                    <p className="text-xs text-emerald-300 mt-1">
                      Your submission is safely recorded in our management database.
                    </p>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-rose-950/70 border border-rose-500/50 text-rose-200 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-400" />
                  <p>{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alexander Stone"
                      className="w-full px-4 py-3 rounded-xl bg-[#061C46]/80 border border-[#1766A5]/50 text-white placeholder-slate-500 focus:outline-none focus:border-[#F5C542] transition-colors text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@domain.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#061C46]/80 border border-[#1766A5]/50 text-white placeholder-slate-500 focus:outline-none focus:border-[#F5C542] transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="08080608722"
                      className="w-full px-4 py-3 rounded-xl bg-[#061C46]/80 border border-[#1766A5]/50 text-white placeholder-slate-500 focus:outline-none focus:border-[#F5C542] transition-colors text-sm"
                    />
                  </div>

                  {/* Service Selector */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Service of Interest *
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#061C46] border border-[#1766A5]/50 text-white focus:outline-none focus:border-[#F5C542] transition-colors text-sm cursor-pointer"
                    >
                      <option value="Graphic Design">Graphic Design</option>
                      <option value="Website Development">Website Development</option>
                      <option value="Perfume Vendor">Perfume Vendor</option>
                      <option value="Video Editing">Video Editing</option>
                      <option value="Other">Other Creative Inquiry</option>
                    </select>
                  </div>
                </div>

                {/* Project Budget */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Project Budget / Scale (Optional)
                  </label>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. $1,000 - $3,000 or Wholesale Order"
                    className="w-full px-4 py-3 rounded-xl bg-[#061C46]/80 border border-[#1766A5]/50 text-white placeholder-slate-500 focus:outline-none focus:border-[#F5C542] transition-colors text-sm"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Project Overview / Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your project, objectives, deliverables, and timelines..."
                    className="w-full px-4 py-3 rounded-xl bg-[#061C46]/80 border border-[#1766A5]/50 text-white placeholder-slate-500 focus:outline-none focus:border-[#F5C542] transition-colors text-sm resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm text-[#061C46] bg-[#F5C542] hover:bg-[#ffd768] active:scale-[0.99] transition-all shadow-lg shadow-[#F5C542]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Transmitting Inquiry...</span>
                  ) : (
                    <>
                      <span>Transmit Project Inquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
