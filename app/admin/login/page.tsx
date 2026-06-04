'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/check')
      .then((r) => { if (r.ok) router.replace('/admin'); })
      .catch(() => {});
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.replace('/admin');
    } else {
      const data = await res.json();
      setError(data.error ?? 'Giriş başarısız.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-luxury-black flex items-center justify-center px-4">
      {/* Background glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(212,175,55,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-12">
          <span className="font-instrument italic text-luxury-gold text-4xl tracking-wider">
            ALA
          </span>
          <span className="mx-3 text-luxury-gold/30">|</span>
          <span className="font-instrument text-luxury-cream/60 text-base tracking-[0.3em] uppercase">
            Admin
          </span>
        </div>

        {/* Card */}
        <div className="glass p-8 relative">
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-luxury-gold/40" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-luxury-gold/40" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-luxury-gold/40" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-luxury-gold/40" />

          <h1 className="font-instrument text-luxury-cream text-2xl mb-2">
            Yönetim Paneli
          </h1>
          <p className="text-luxury-cream/30 text-xs tracking-wider uppercase font-inter mb-8">
            Şifrenizle giriş yapın
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="ŞİFRE"
                required
                autoFocus
                className="luxury-input w-full text-sm"
              />
            </div>

            {error && (
              <p className="text-red-400/80 text-xs tracking-wider font-inter">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-luxury-gold text-luxury-black text-xs tracking-[0.25em] uppercase font-inter font-medium py-4 transition-all duration-300 hover:bg-luxury-gold-light disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Giriş yapılıyor…' : 'Giriş Yap'}
            </button>
          </form>
        </div>

        <p className="text-center text-luxury-cream/15 text-[10px] tracking-widest uppercase font-inter mt-8">
          Varsayılan şifre: admin123
        </p>
      </div>
    </div>
  );
}
