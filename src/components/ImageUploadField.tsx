import React, { useRef, useState } from 'react';
import { ImagePlus, LoaderCircle, UploadCloud, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ImageUploadFieldProps {
  id: string;
  label: string;
  value?: string;
  onChange?: (url: string) => void;
  hint?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({ id, label, value = '', onChange, hint }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState(value);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => setUrl(value), [value]);

  const changeUrl = (next: string) => {
    setUrl(next);
    onChange?.(next);
  };

  const upload = async (file?: File) => {
    if (!file) return;
    setError('');
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Images must be 10 MB or smaller.');
      return;
    }
    const client = supabase;
    if (!client) {
      setError('Supabase is not configured. Please check the website configuration.');
      return;
    }
    setUploading(true);
    try {
      const { data: sessionData } = await client.auth.getSession();
      if (!sessionData.session) {
        throw new Error('Please sign in as an administrator before uploading images.');
      }
      const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, '-');
      const path = `${sessionData.session.user.id}/${Date.now()}-${safeName}`;
      const { error: uploadError } = await client.storage.from('ambitious-vendor-media').upload(path, file, {
        cacheControl: '31536000',
        upsert: false,
        contentType: file.type,
      });
      if (uploadError) throw uploadError;
      const { data } = client.storage.from('ambitious-vendor-media').getPublicUrl(path);
      changeUrl(data.publicUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Image upload failed. Please try again.');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2 min-w-0">
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wide text-slate-300">{label}</label>
      <div className="flex gap-2 items-start">
        <div className="min-w-0 flex-1">
          <input id={id} type="url" value={url} onChange={(e) => changeUrl(e.target.value)} placeholder="Image URL or upload an image" className="w-full px-3 py-2.5 rounded-xl bg-[#092A61] border border-[#1766A5]/50 text-white text-xs focus:outline-none focus:border-[#F5C542]" />
          {hint && <p className="mt-1 text-[10px] text-slate-400">{hint}</p>}
        </div>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => void upload(e.target.files?.[0])} />
        <button type="button" disabled={uploading} onClick={() => inputRef.current?.click()} className="shrink-0 inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#F5C542] text-[#061C46] text-xs font-bold disabled:opacity-60">
          {uploading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
          {uploading ? 'Uploading' : 'Upload'}
        </button>
      </div>
      {url ? (
        <div className="flex items-center gap-3 p-2 rounded-xl bg-[#092A61]/50 border border-[#1766A5]/25">
          <img src={url} alt="Selected upload preview" className="w-14 h-14 object-cover rounded-lg bg-white/10" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
          <span className="min-w-0 flex-1 text-[10px] text-slate-400 break-all">{url}</span>
          <button type="button" aria-label="Clear image" onClick={() => changeUrl('')} className="p-1 text-slate-300 hover:text-white"><X className="w-4 h-4" /></button>
        </div>
      ) : <div className="flex items-center gap-2 text-[10px] text-slate-400"><ImagePlus className="w-4 h-4" /> No image selected yet</div>}
      {error && <p role="alert" className="text-xs text-rose-300">{error}</p>}
    </div>
  );
};
