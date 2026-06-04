'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { Plus, Pencil, Trash2, LogOut, Star, X, Check, AlertTriangle, GripVertical, Wine, UtensilsCrossed, ImageIcon } from 'lucide-react';

interface MenuItem {
  id: string;
  category: 'baslangic' | 'ana' | 'tatli' | 'icecek';
  name: string;
  description: string;
  descriptions?: Record<string, string>;
  price: string;
  special: boolean;
}

interface DrinkItem {
  id: string;
  type: 'raki' | 'wine';
  name: string;
  region: string;
  note: string;
  year: string;
  price: string;
  featured: boolean;
  grape?: string;
}

interface SignatureDish {
  id: string;
  name: string;
  price: string;
  subtitle: string;
  description: string;
  tag: string;
  image: string;
}

const EMPTY_SIGNATURE_FORM: Omit<SignatureDish, 'id'> = {
  name: '', price: '', subtitle: '', description: '', tag: '', image: '',
};

const MAX_SIGNATURE = 4;

type Category = 'baslangic' | 'ana' | 'tatli' | 'icecek';
type DrinkType = 'raki' | 'wine';
type Section = 'menu' | 'drinks' | 'signature';

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'baslangic', label: 'Başlangıç' },
  { id: 'ana',       label: 'Ana Yemek' },
  { id: 'tatli',     label: 'Tatlı' },
  { id: 'icecek',    label: 'İçecek' },
];

const DRINK_TYPES: { id: DrinkType; label: string }[] = [
  { id: 'raki', label: 'Rakı' },
  { id: 'wine', label: 'Şarap' },
];

const EMPTY_FORM: Omit<MenuItem, 'id'> = {
  category: 'baslangic',
  name: '',
  description: '',
  price: '',
  special: false,
};

const EMPTY_DRINK_FORM: Omit<DrinkItem, 'id'> = {
  type: 'raki',
  name: '',
  region: '',
  note: '',
  year: '—',
  price: '',
  featured: false,
  grape: '',
};

const IDLE_WARNING_MS = 28 * 60 * 1000;
const IDLE_LOGOUT_MS  = 30 * 60 * 1000;

export default function AdminPage() {
  const router = useRouter();

  // ── Section ──────────────────────────────────────────────────────────────────
  const [section, setSection] = useState<Section>('menu');

  // ── Menu state ───────────────────────────────────────────────────────────────
  const [items, setItems] = useState<MenuItem[]>([]);
  const [activeTab, setActiveTab] = useState<Category>('baslangic');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const [form, setForm] = useState<Omit<MenuItem, 'id'>>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<MenuItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  // ── Drinks state ─────────────────────────────────────────────────────────────
  const [drinks, setDrinks] = useState<DrinkItem[]>([]);
  const [drinkTab, setDrinkTab] = useState<DrinkType>('raki');
  const [drinkLoading, setDrinkLoading] = useState(true);
  const [drinkModalOpen, setDrinkModalOpen] = useState(false);
  const [editDrink, setEditDrink] = useState<DrinkItem | null>(null);
  const [drinkForm, setDrinkForm] = useState<Omit<DrinkItem, 'id'>>(EMPTY_DRINK_FORM);
  const [drinkSaving, setDrinkSaving] = useState(false);
  const [drinkFormError, setDrinkFormError] = useState('');
  const [drinkDeleteTarget, setDrinkDeleteTarget] = useState<DrinkItem | null>(null);
  const [drinkDeleting, setDrinkDeleting] = useState(false);

  // ── Signature state ───────────────────────────────────────────────────────────
  const [sigDishes, setSigDishes] = useState<SignatureDish[]>([]);
  const [sigLoading, setSigLoading] = useState(true);
  const [sigModalOpen, setSigModalOpen] = useState(false);
  const [editSig, setEditSig] = useState<SignatureDish | null>(null);
  const [sigForm, setSigForm] = useState<Omit<SignatureDish, 'id'>>(EMPTY_SIGNATURE_FORM);
  const [sigSaving, setSigSaving] = useState(false);
  const [sigFormError, setSigFormError] = useState('');
  const [sigDeleteTarget, setSigDeleteTarget] = useState<SignatureDish | null>(null);
  const [sigDeleting, setSigDeleting] = useState(false);

  // ── Toast ─────────────────────────────────────────────────────────────────────
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  // ── Idle timeout ──────────────────────────────────────────────────────────────
  const idleWarnTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleLogoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reorderTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const drinkReorderTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [idleWarning, setIdleWarning] = useState(false);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Menu fetch ────────────────────────────────────────────────────────────────
  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/menu');
      if (!r.ok) throw new Error();
      setItems(await r.json());
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Drinks fetch ──────────────────────────────────────────────────────────────
  const fetchDrinks = useCallback(async () => {
    setDrinkLoading(true);
    try {
      const r = await fetch('/api/drinks');
      if (!r.ok) throw new Error();
      setDrinks(await r.json());
    } finally {
      setDrinkLoading(false);
    }
  }, []);

  // ── Signature fetch ───────────────────────────────────────────────────────────
  const fetchSignature = useCallback(async () => {
    setSigLoading(true);
    try {
      const r = await fetch('/api/signature');
      if (!r.ok) throw new Error();
      setSigDishes(await r.json());
    } finally {
      setSigLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch('/api/auth/check').then((r) => {
      if (!r.ok) router.replace('/admin/login');
      else { fetchItems(); fetchDrinks(); fetchSignature(); }
    });
  }, [router, fetchItems, fetchDrinks, fetchSignature]);

  // ── Idle ──────────────────────────────────────────────────────────────────────
  const resetIdleTimer = useCallback(() => {
    if (idleWarnTimer.current)   clearTimeout(idleWarnTimer.current);
    if (idleLogoutTimer.current) clearTimeout(idleLogoutTimer.current);
    setIdleWarning(false);
    idleWarnTimer.current   = setTimeout(() => setIdleWarning(true), IDLE_WARNING_MS);
    idleLogoutTimer.current = setTimeout(async () => {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.replace('/admin/login');
    }, IDLE_LOGOUT_MS);
  }, [router]);

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart'];
    events.forEach((e) => window.addEventListener(e, resetIdleTimer, { passive: true }));
    resetIdleTimer();
    return () => {
      events.forEach((e) => window.removeEventListener(e, resetIdleTimer));
      if (idleWarnTimer.current)   clearTimeout(idleWarnTimer.current);
      if (idleLogoutTimer.current) clearTimeout(idleLogoutTimer.current);
    };
  }, [resetIdleTimer]);

  // ── Menu reorder ──────────────────────────────────────────────────────────────
  const handleReorder = useCallback((newCatOrder: MenuItem[]) => {
    setItems((prev) => {
      const others = prev.filter((i) => i.category !== activeTab);
      const merged = [...others, ...newCatOrder];
      if (reorderTimer.current) clearTimeout(reorderTimer.current);
      reorderTimer.current = setTimeout(() => {
        fetch('/api/menu/order', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: merged.map((i) => i.id) }),
        }).catch(() => {});
      }, 800);
      return merged;
    });
  }, [activeTab]);

  // ── Drinks reorder ────────────────────────────────────────────────────────────
  const handleDrinkReorder = useCallback((newOrder: DrinkItem[]) => {
    setDrinks((prev) => {
      const others = prev.filter((d) => d.type !== drinkTab);
      const merged = [...others, ...newOrder];
      if (drinkReorderTimer.current) clearTimeout(drinkReorderTimer.current);
      drinkReorderTimer.current = setTimeout(() => {
        fetch('/api/drinks/order', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: merged.map((d) => d.id) }),
        }).catch(() => {});
      }, 800);
      return merged;
    });
  }, [drinkTab]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/admin/login');
  };

  // ── Menu CRUD ─────────────────────────────────────────────────────────────────
  const openAdd = () => {
    setEditItem(null);
    setForm({ ...EMPTY_FORM, category: activeTab });
    setFormError('');
    setModalOpen(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditItem(item);
    setForm({ category: item.category, name: item.name, description: item.description, price: item.price, special: item.special });
    setFormError('');
    setModalOpen(true);
  };

  const closeModal = () => { setModalOpen(false); setEditItem(null); setFormError(''); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price.trim()) { setFormError('İsim ve fiyat zorunludur.'); return; }
    setSaving(true);
    setFormError('');
    try {
      let descriptions: Record<string, string> | undefined;
      let translateNote = '';
      if (form.description.trim()) {
        try {
          const tr = await fetch('/api/admin/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: form.description }),
          });
          if (tr.ok) {
            descriptions = await tr.json();
            translateNote = ' · 6 dile çevrildi';
          } else {
            const body = await tr.json().catch(() => ({})) as { error?: string };
            translateNote = body.error?.includes('ANTHROPIC_API_KEY')
              ? ' · Çeviri yok (API key eksik)'
              : ` · Çeviri başarısız: ${body.error ?? tr.status}`;
          }
        } catch (e) {
          translateNote = ` · Çeviri başarısız: ${e instanceof Error ? e.message : 'ağ hatası'}`;
        }
      }
      const url = editItem ? `/api/menu/${editItem.id}` : '/api/menu';
      const method = editItem ? 'PUT' : 'POST';
      const r = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, descriptions }) });
      if (!r.ok) {
        let msg = 'Kayıt sırasında bir hata oluştu.';
        try { msg = (await r.json()).error ?? msg; } catch { /* non-JSON */ }
        throw new Error(msg);
      }
      await fetchItems();
      closeModal();
      showToast(`${editItem ? 'Ürün güncellendi.' : 'Ürün eklendi.'}${translateNote}`);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Bir hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const r = await fetch(`/api/menu/${deleteTarget.id}`, { method: 'DELETE' });
      if (!r.ok) throw new Error();
      await fetchItems();
      setDeleteTarget(null);
      showToast('Ürün silindi.');
    } catch {
      showToast('Silme işlemi başarısız.', false);
    } finally {
      setDeleting(false);
    }
  };

  // ── Drinks CRUD ───────────────────────────────────────────────────────────────
  const openDrinkAdd = () => {
    setEditDrink(null);
    setDrinkForm({ ...EMPTY_DRINK_FORM, type: drinkTab });
    setDrinkFormError('');
    setDrinkModalOpen(true);
  };

  const openDrinkEdit = (item: DrinkItem) => {
    setEditDrink(item);
    setDrinkForm({ type: item.type, name: item.name, region: item.region, note: item.note, year: item.year, price: item.price, featured: item.featured, grape: item.grape ?? '' });
    setDrinkFormError('');
    setDrinkModalOpen(true);
  };

  const closeDrinkModal = () => { setDrinkModalOpen(false); setEditDrink(null); setDrinkFormError(''); };

  const handleDrinkSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!drinkForm.name.trim() || !drinkForm.price.trim()) { setDrinkFormError('İsim ve fiyat zorunludur.'); return; }
    setDrinkSaving(true);
    setDrinkFormError('');
    try {
      const payload = { ...drinkForm, grape: drinkForm.grape?.trim() || undefined };
      const url = editDrink ? `/api/drinks/${editDrink.id}` : '/api/drinks';
      const method = editDrink ? 'PUT' : 'POST';
      const r = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!r.ok) {
        let msg = 'Kayıt sırasında bir hata oluştu.';
        try { msg = (await r.json()).error ?? msg; } catch { /* non-JSON */ }
        throw new Error(msg);
      }
      await fetchDrinks();
      closeDrinkModal();
      showToast(editDrink ? 'Güncellendi.' : 'Eklendi.');
    } catch (err) {
      setDrinkFormError(err instanceof Error ? err.message : 'Bir hata oluştu.');
    } finally {
      setDrinkSaving(false);
    }
  };

  const handleDrinkDelete = async () => {
    if (!drinkDeleteTarget) return;
    setDrinkDeleting(true);
    try {
      const r = await fetch(`/api/drinks/${drinkDeleteTarget.id}`, { method: 'DELETE' });
      if (!r.ok) throw new Error();
      await fetchDrinks();
      setDrinkDeleteTarget(null);
      showToast('Silindi.');
    } catch {
      showToast('Silme işlemi başarısız.', false);
    } finally {
      setDrinkDeleting(false);
    }
  };

  // ── Signature CRUD ────────────────────────────────────────────────────────────
  const openSigAdd = () => { setEditSig(null); setSigForm(EMPTY_SIGNATURE_FORM); setSigFormError(''); setSigModalOpen(true); };
  const openSigEdit = (d: SignatureDish) => { setEditSig(d); setSigForm({ name: d.name, price: d.price, subtitle: d.subtitle, description: d.description, tag: d.tag, image: d.image }); setSigFormError(''); setSigModalOpen(true); };
  const closeSigModal = () => { setSigModalOpen(false); setEditSig(null); setSigFormError(''); };

  const handleSigSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sigForm.name.trim() || !sigForm.price.trim()) { setSigFormError('İsim ve fiyat zorunludur.'); return; }
    setSigSaving(true);
    setSigFormError('');
    try {
      const url = editSig ? `/api/signature/${editSig.id}` : '/api/signature';
      const method = editSig ? 'PUT' : 'POST';
      const r = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(sigForm) });
      if (!r.ok) {
        let msg = 'Kayıt sırasında bir hata oluştu.';
        try { msg = (await r.json()).error ?? msg; } catch { /* non-JSON */ }
        throw new Error(msg);
      }
      await fetchSignature();
      closeSigModal();
      showToast(editSig ? 'Güncellendi.' : 'Eklendi.');
    } catch (err) {
      setSigFormError(err instanceof Error ? err.message : 'Bir hata oluştu.');
    } finally {
      setSigSaving(false);
    }
  };

  const handleSigDelete = async () => {
    if (!sigDeleteTarget) return;
    setSigDeleting(true);
    try {
      const r = await fetch(`/api/signature/${sigDeleteTarget.id}`, { method: 'DELETE' });
      if (!r.ok) throw new Error();
      await fetchSignature();
      setSigDeleteTarget(null);
      showToast('Silindi.');
    } catch {
      showToast('Silme işlemi başarısız.', false);
    } finally {
      setSigDeleting(false);
    }
  };

  const filtered = items.filter((i) => i.category === activeTab);
  const filteredDrinks = drinks.filter((d) => d.type === drinkTab);

  return (
    <div className="min-h-screen bg-luxury-black" style={{ cursor: 'default' }}>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-3 text-sm font-inter ${
              toast.ok ? 'bg-luxury-gold text-luxury-black' : 'bg-red-500/90 text-white'
            }`}
          >
            {toast.ok ? <Check size={14} /> : <AlertTriangle size={14} />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="glass border-b border-luxury-gold/10 sticky top-0 z-40 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-instrument italic text-luxury-gold text-2xl">ÂLÂ</span>
            <span className="w-px h-5 bg-luxury-gold/30" />
            <span className="font-instrument text-luxury-cream/50 text-sm tracking-[0.3em] uppercase">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" target="_blank"
              className="text-luxury-cream/30 hover:text-luxury-cream/70 text-xs tracking-wider uppercase font-inter transition-colors duration-200">
              Siteyi Gör ↗
            </a>
            <button onClick={handleLogout}
              className="flex items-center gap-2 text-luxury-cream/40 hover:text-luxury-gold text-xs tracking-wider uppercase font-inter transition-colors duration-200">
              <LogOut size={13} />
              Çıkış
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* Section switcher + page title */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-luxury-gold text-[10px] tracking-[0.4em] uppercase font-inter mb-2">Yönetim Paneli</p>
            <div className="flex items-center gap-1 mb-1 flex-wrap">
              <button
                onClick={() => setSection('menu')}
                className={`font-instrument text-3xl transition-colors duration-200 ${section === 'menu' ? 'text-luxury-cream' : 'text-luxury-cream/25 hover:text-luxury-cream/50'}`}
              >
                Menü
              </button>
              <span className="font-instrument text-luxury-cream/20 text-3xl mx-2">/</span>
              <button
                onClick={() => setSection('drinks')}
                className={`font-instrument text-3xl transition-colors duration-200 flex items-center gap-2 ${section === 'drinks' ? 'text-luxury-cream' : 'text-luxury-cream/25 hover:text-luxury-cream/50'}`}
              >
                <Wine size={22} className="inline-block" />
                Şarap & Rakı
              </button>
              <span className="font-instrument text-luxury-cream/20 text-3xl mx-2">/</span>
              <button
                onClick={() => setSection('signature')}
                className={`font-instrument text-3xl transition-colors duration-200 flex items-center gap-2 ${section === 'signature' ? 'text-luxury-cream' : 'text-luxury-cream/25 hover:text-luxury-cream/50'}`}
              >
                <UtensilsCrossed size={22} className="inline-block" />
                İmza Yemekler
              </button>
            </div>
          </div>
          <button
            onClick={section === 'menu' ? openAdd : section === 'drinks' ? openDrinkAdd : openSigAdd}
            disabled={section === 'signature' && sigDishes.length >= MAX_SIGNATURE}
            className="flex items-center gap-2 bg-luxury-gold text-luxury-black text-xs tracking-[0.2em] uppercase font-inter font-medium px-5 py-3 hover:bg-luxury-gold-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Plus size={14} />
            {section === 'menu' ? 'Yeni Ürün Ekle' : section === 'drinks' ? 'Yeni Ekle' : `Yemek Ekle ${sigDishes.length}/${MAX_SIGNATURE}`}
          </button>
        </div>

        {/* ── MENU SECTION ──────────────────────────────────────────────────────── */}
        {section === 'menu' && (
          <>
            {/* Stats bar */}
            <div className="grid grid-cols-4 gap-3 mb-8">
              {CATEGORIES.map((cat) => {
                const count = items.filter((i) => i.category === cat.id).length;
                return (
                  <div key={cat.id} className="border border-luxury-cream/5 bg-luxury-surface/30 p-4">
                    <p className="text-luxury-cream/25 text-[9px] tracking-[0.3em] uppercase font-inter mb-1">{cat.label}</p>
                    <p className="font-instrument text-luxury-gold text-2xl">{count}</p>
                    <p className="text-luxury-cream/20 text-[9px] font-inter mt-0.5">ürün</p>
                  </div>
                );
              })}
            </div>

            {/* Category tabs */}
            <div className="flex overflow-x-auto border-b border-luxury-cream/5 mb-6">
              {CATEGORIES.map((cat) => (
                <button key={cat.id} onClick={() => setActiveTab(cat.id)}
                  className={`px-5 py-3 text-xs tracking-[0.2em] uppercase font-inter transition-all duration-200 border-b-2 -mb-px whitespace-nowrap shrink-0 ${
                    activeTab === cat.id ? 'border-luxury-gold text-luxury-gold' : 'border-transparent text-luxury-cream/30 hover:text-luxury-cream/60'
                  }`}
                >
                  {cat.label}
                  <span className="ml-2 text-[10px] opacity-50">({items.filter((i) => i.category === cat.id).length})</span>
                </button>
              ))}
            </div>

            {/* Menu list */}
            {loading ? (
              <div className="text-center py-20 text-luxury-cream/20 text-sm font-inter tracking-wider">Yükleniyor…</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-luxury-cream/10">
                <p className="text-luxury-cream/25 text-sm font-inter mb-4">Bu kategoride ürün yok.</p>
                <button onClick={openAdd} className="text-luxury-gold text-xs tracking-wider uppercase font-inter hover:underline">İlk ürünü ekle</button>
              </div>
            ) : (
              <Reorder.Group as="div" axis="y" values={filtered} onReorder={handleReorder} className="space-y-2">
                {filtered.map((item) => (
                  <Reorder.Item as="div" key={item.id} value={item}
                    className="flex items-center gap-4 bg-luxury-surface/40 border border-luxury-cream/5 hover:border-luxury-gold/20 px-5 py-4 group transition-colors duration-200 cursor-default select-none"
                  >
                    <GripVertical size={14} className="text-luxury-cream/15 hover:text-luxury-cream/40 transition-colors cursor-grab active:cursor-grabbing shrink-0" />
                    <Star size={13} className={item.special ? 'text-luxury-gold' : 'text-luxury-cream/10'} fill={item.special ? '#D4AF37' : 'none'} />
                    <div className="flex-1 min-w-0">
                      <p className="font-instrument text-luxury-cream text-lg leading-tight truncate">{item.name}</p>
                      {item.description && (
                        <p className="text-luxury-cream/30 text-xs font-inter font-light truncate mt-0.5">{item.description}</p>
                      )}
                    </div>
                    <span className="font-instrument text-luxury-gold text-lg whitespace-nowrap">{item.price}</span>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button onClick={() => openEdit(item)}
                        className="w-8 h-8 border border-luxury-cream/10 flex items-center justify-center text-luxury-cream/40 hover:border-luxury-gold/50 hover:text-luxury-gold transition-all duration-200" aria-label="Düzenle">
                        <Pencil size={13} />
                      </button>
                      <button onClick={() => setDeleteTarget(item)}
                        className="w-8 h-8 border border-luxury-cream/10 flex items-center justify-center text-luxury-cream/40 hover:border-red-400/50 hover:text-red-400 transition-all duration-200" aria-label="Sil">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            )}
          </>
        )}

        {/* ── DRINKS SECTION ────────────────────────────────────────────────────── */}
        {section === 'drinks' && (
          <>
            {/* Stats bar */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {DRINK_TYPES.map((dt) => {
                const count = drinks.filter((d) => d.type === dt.id).length;
                return (
                  <div key={dt.id} className="border border-luxury-cream/5 bg-luxury-surface/30 p-4">
                    <p className="text-luxury-cream/25 text-[9px] tracking-[0.3em] uppercase font-inter mb-1">{dt.label}</p>
                    <p className="font-instrument text-luxury-gold text-2xl">{count}</p>
                    <p className="text-luxury-cream/20 text-[9px] font-inter mt-0.5">ürün</p>
                  </div>
                );
              })}
            </div>

            {/* Drink type tabs */}
            <div className="flex overflow-x-auto border-b border-luxury-cream/5 mb-6">
              {DRINK_TYPES.map((dt) => (
                <button key={dt.id} onClick={() => setDrinkTab(dt.id)}
                  className={`px-5 py-3 text-xs tracking-[0.2em] uppercase font-inter transition-all duration-200 border-b-2 -mb-px whitespace-nowrap shrink-0 ${
                    drinkTab === dt.id ? 'border-luxury-gold text-luxury-gold' : 'border-transparent text-luxury-cream/30 hover:text-luxury-cream/60'
                  }`}
                >
                  {dt.label}
                  <span className="ml-2 text-[10px] opacity-50">({drinks.filter((d) => d.type === dt.id).length})</span>
                </button>
              ))}
            </div>

            {/* Drinks list */}
            {drinkLoading ? (
              <div className="text-center py-20 text-luxury-cream/20 text-sm font-inter tracking-wider">Yükleniyor…</div>
            ) : filteredDrinks.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-luxury-cream/10">
                <p className="text-luxury-cream/25 text-sm font-inter mb-4">Bu kategoride ürün yok.</p>
                <button onClick={openDrinkAdd} className="text-luxury-gold text-xs tracking-wider uppercase font-inter hover:underline">İlk ürünü ekle</button>
              </div>
            ) : (
              <Reorder.Group as="div" axis="y" values={filteredDrinks} onReorder={handleDrinkReorder} className="space-y-2">
                {filteredDrinks.map((item) => (
                  <Reorder.Item as="div" key={item.id} value={item}
                    className="flex items-center gap-4 bg-luxury-surface/40 border border-luxury-cream/5 hover:border-luxury-gold/20 px-5 py-4 group transition-colors duration-200 cursor-default select-none"
                  >
                    <GripVertical size={14} className="text-luxury-cream/15 hover:text-luxury-cream/40 transition-colors cursor-grab active:cursor-grabbing shrink-0" />
                    <Star size={13} className={item.featured ? 'text-luxury-gold' : 'text-luxury-cream/10'} fill={item.featured ? '#D4AF37' : 'none'} />
                    <div className="flex-1 min-w-0">
                      <p className="font-instrument text-luxury-cream text-lg leading-tight truncate">{item.name}</p>
                      <p className="text-luxury-cream/30 text-xs font-inter font-light truncate mt-0.5">
                        {item.region}{item.grape ? ` · ${item.grape}` : ''}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-instrument text-luxury-gold text-lg whitespace-nowrap">{item.price}</span>
                      {item.year !== '—' && <p className="text-luxury-cream/30 text-[10px] font-inter mt-0.5">{item.year}</p>}
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button onClick={() => openDrinkEdit(item)}
                        className="w-8 h-8 border border-luxury-cream/10 flex items-center justify-center text-luxury-cream/40 hover:border-luxury-gold/50 hover:text-luxury-gold transition-all duration-200" aria-label="Düzenle">
                        <Pencil size={13} />
                      </button>
                      <button onClick={() => setDrinkDeleteTarget(item)}
                        className="w-8 h-8 border border-luxury-cream/10 flex items-center justify-center text-luxury-cream/40 hover:border-red-400/50 hover:text-red-400 transition-all duration-200" aria-label="Sil">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            )}
          </>
        )}
        {/* ── SIGNATURE SECTION ────────────────────────────────────────────────── */}
        {section === 'signature' && (
          <>
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="border border-luxury-cream/5 bg-luxury-surface/30 p-4">
                <p className="text-luxury-cream/25 text-[9px] tracking-[0.3em] uppercase font-inter mb-1">Mevcut</p>
                <p className="font-instrument text-luxury-gold text-2xl">{sigDishes.length}</p>
                <p className="text-luxury-cream/20 text-[9px] font-inter mt-0.5">yemek</p>
              </div>
              <div className="border border-luxury-cream/5 bg-luxury-surface/30 p-4">
                <p className="text-luxury-cream/25 text-[9px] tracking-[0.3em] uppercase font-inter mb-1">Maksimum</p>
                <p className="font-instrument text-luxury-gold text-2xl">{MAX_SIGNATURE}</p>
                <p className="text-luxury-cream/20 text-[9px] font-inter mt-0.5">yemek</p>
              </div>
            </div>

            {sigLoading ? (
              <div className="text-center py-20 text-luxury-cream/20 text-sm font-inter tracking-wider">Yükleniyor…</div>
            ) : sigDishes.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-luxury-cream/10">
                <p className="text-luxury-cream/25 text-sm font-inter mb-4">Henüz imza yemek eklenmedi.</p>
                <button onClick={openSigAdd} className="text-luxury-gold text-xs tracking-wider uppercase font-inter hover:underline">İlk yemeği ekle</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sigDishes.map((dish) => (
                  <div key={dish.id}
                    className="flex gap-4 bg-luxury-surface/40 border border-luxury-cream/5 hover:border-luxury-gold/20 p-4 group transition-colors duration-200"
                  >
                    <div className="relative w-20 h-20 shrink-0 overflow-hidden bg-luxury-black">
                      {dish.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-luxury-cream/15">
                          <ImageIcon size={20} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-instrument text-luxury-cream text-lg leading-tight truncate">{dish.name}</p>
                      {dish.subtitle && (
                        <p className="text-luxury-cream/30 text-[10px] tracking-[0.2em] uppercase font-inter mt-0.5">{dish.subtitle}</p>
                      )}
                      <p className="text-luxury-cream/30 text-xs font-inter font-light truncate mt-1">{dish.description}</p>
                      <p className="font-instrument text-luxury-gold text-base mt-1">{dish.price}</p>
                    </div>
                    <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
                      <button onClick={() => openSigEdit(dish)}
                        className="w-8 h-8 border border-luxury-cream/10 flex items-center justify-center text-luxury-cream/40 hover:border-luxury-gold/50 hover:text-luxury-gold transition-all duration-200" aria-label="Düzenle">
                        <Pencil size={13} />
                      </button>
                      <button onClick={() => setSigDeleteTarget(dish)}
                        className="w-8 h-8 border border-luxury-cream/10 flex items-center justify-center text-luxury-cream/40 hover:border-red-400/50 hover:text-red-400 transition-all duration-200" aria-label="Sil">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* ── Menu Add/Edit Modal ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-luxury-black/80 backdrop-blur-sm z-50" onClick={closeModal} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="glass w-full max-w-lg max-h-[90dvh] overflow-y-auto relative pointer-events-auto">
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-luxury-gold/40" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-luxury-gold/40" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-luxury-gold/40" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-luxury-gold/40" />
                <div className="p-6 sm:p-8">
                  <button type="button" onClick={closeModal}
                    className="absolute top-4 right-4 text-luxury-cream/30 hover:text-luxury-cream/70 transition-colors" aria-label="Kapat">
                    <X size={18} />
                  </button>
                  <h2 className="font-instrument text-luxury-cream text-2xl mb-6">{editItem ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}</h2>
                  <form onSubmit={handleSave} noValidate className="space-y-5">
                    <div>
                      <label className="text-luxury-gold/50 text-[9px] tracking-[0.3em] uppercase font-inter block mb-2">Kategori</label>
                      <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
                        className="luxury-input text-sm" style={{ cursor: 'default' }}>
                        {CATEGORIES.map((c) => (
                          <option key={c.id} value={c.id} className="bg-luxury-surface text-luxury-cream">{c.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-luxury-gold/50 text-[9px] tracking-[0.3em] uppercase font-inter block mb-2">Ürün Adı *</label>
                      <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Örn: Adana Ustabaşı" className="luxury-input text-sm" />
                    </div>
                    <div>
                      <label className="text-luxury-gold/50 text-[9px] tracking-[0.3em] uppercase font-inter block mb-2">Açıklama</label>
                      <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                        placeholder="Malzemeler, pişirme yöntemi…" rows={2} className="luxury-input text-sm resize-none" />
                    </div>
                    <div>
                      <label className="text-luxury-gold/50 text-[9px] tracking-[0.3em] uppercase font-inter block mb-2">Fiyat *</label>
                      <input type="text" value={form.price}
                        onChange={(e) => { let val = e.target.value; if (val && !val.startsWith('₺')) val = '₺' + val; setForm({ ...form, price: val }); }}
                        placeholder="₺0" className="luxury-input text-sm" />
                    </div>
                    <div className="flex items-center gap-3 pt-1">
                      <button type="button" onClick={() => setForm({ ...form, special: !form.special })}
                        className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${form.special ? 'bg-luxury-gold' : 'bg-luxury-cream/10'}`} aria-label="Öne çıkan">
                        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${form.special ? 'translate-x-5' : 'translate-x-0.5'}`} />
                      </button>
                      <span className="text-luxury-cream/50 text-xs tracking-wider uppercase font-inter">Öne Çıkan Ürün</span>
                      <Star size={12} className={form.special ? 'text-luxury-gold' : 'text-luxury-cream/15'} fill={form.special ? '#D4AF37' : 'none'} />
                    </div>
                    {formError && <p className="text-red-400/80 text-xs font-inter">{formError}</p>}
                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={closeModal}
                        className="flex-1 border border-luxury-cream/10 text-luxury-cream/40 text-xs tracking-[0.2em] uppercase font-inter py-3 hover:border-luxury-cream/25 transition-colors duration-200">
                        İptal
                      </button>
                      <button type="submit" disabled={saving}
                        className="flex-1 bg-luxury-gold text-luxury-black text-xs tracking-[0.2em] uppercase font-inter font-medium py-3 hover:bg-luxury-gold-light disabled:opacity-50 transition-colors duration-200">
                        {saving ? 'Kaydediliyor…' : editItem ? 'Güncelle' : 'Ekle'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Drinks Add/Edit Modal ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {drinkModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-luxury-black/80 backdrop-blur-sm z-50" onClick={closeDrinkModal} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="glass w-full max-w-lg max-h-[90dvh] overflow-y-auto relative pointer-events-auto">
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-luxury-gold/40" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-luxury-gold/40" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-luxury-gold/40" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-luxury-gold/40" />
                <div className="p-6 sm:p-8">
                  <button type="button" onClick={closeDrinkModal}
                    className="absolute top-4 right-4 text-luxury-cream/30 hover:text-luxury-cream/70 transition-colors" aria-label="Kapat">
                    <X size={18} />
                  </button>
                  <h2 className="font-instrument text-luxury-cream text-2xl mb-6">{editDrink ? 'Düzenle' : 'Yeni Ekle'}</h2>
                  <form onSubmit={handleDrinkSave} noValidate className="space-y-5">
                    <div>
                      <label className="text-luxury-gold/50 text-[9px] tracking-[0.3em] uppercase font-inter block mb-2">Tür</label>
                      <select value={drinkForm.type} onChange={(e) => setDrinkForm({ ...drinkForm, type: e.target.value as DrinkType })}
                        className="luxury-input text-sm" style={{ cursor: 'default' }}>
                        {DRINK_TYPES.map((dt) => (
                          <option key={dt.id} value={dt.id} className="bg-luxury-surface text-luxury-cream">{dt.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-luxury-gold/50 text-[9px] tracking-[0.3em] uppercase font-inter block mb-2">İsim *</label>
                      <input type="text" value={drinkForm.name} onChange={(e) => setDrinkForm({ ...drinkForm, name: e.target.value })}
                        placeholder="Örn: Tekirdağ Altın Seri" className="luxury-input text-sm" />
                    </div>
                    <div>
                      <label className="text-luxury-gold/50 text-[9px] tracking-[0.3em] uppercase font-inter block mb-2">Bölge</label>
                      <input type="text" value={drinkForm.region} onChange={(e) => setDrinkForm({ ...drinkForm, region: e.target.value })}
                        placeholder="Örn: Tekirdağ, Türkiye" className="luxury-input text-sm" />
                    </div>
                    {drinkForm.type === 'wine' && (
                      <div>
                        <label className="text-luxury-gold/50 text-[9px] tracking-[0.3em] uppercase font-inter block mb-2">Üzüm Çeşidi</label>
                        <input type="text" value={drinkForm.grape ?? ''} onChange={(e) => setDrinkForm({ ...drinkForm, grape: e.target.value })}
                          placeholder="Örn: Kalecik Karası" className="luxury-input text-sm" />
                      </div>
                    )}
                    <div>
                      <label className="text-luxury-gold/50 text-[9px] tracking-[0.3em] uppercase font-inter block mb-2">Tatma Notu</label>
                      <textarea value={drinkForm.note} onChange={(e) => setDrinkForm({ ...drinkForm, note: e.target.value })}
                        placeholder="Örn: Anason, meyan kökü, tatlı amber" rows={2} className="luxury-input text-sm resize-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-luxury-gold/50 text-[9px] tracking-[0.3em] uppercase font-inter block mb-2">Yıl</label>
                        <input type="text" value={drinkForm.year} onChange={(e) => setDrinkForm({ ...drinkForm, year: e.target.value })}
                          placeholder="2022 veya —" className="luxury-input text-sm" />
                      </div>
                      <div>
                        <label className="text-luxury-gold/50 text-[9px] tracking-[0.3em] uppercase font-inter block mb-2">Fiyat *</label>
                        <input type="text" value={drinkForm.price}
                          onChange={(e) => { let val = e.target.value; if (val && !val.startsWith('₺')) val = '₺' + val; setDrinkForm({ ...drinkForm, price: val }); }}
                          placeholder="₺0" className="luxury-input text-sm" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-1">
                      <button type="button" onClick={() => setDrinkForm({ ...drinkForm, featured: !drinkForm.featured })}
                        className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${drinkForm.featured ? 'bg-luxury-gold' : 'bg-luxury-cream/10'}`} aria-label="Önerilen">
                        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${drinkForm.featured ? 'translate-x-5' : 'translate-x-0.5'}`} />
                      </button>
                      <span className="text-luxury-cream/50 text-xs tracking-wider uppercase font-inter">Önerilen</span>
                      <Star size={12} className={drinkForm.featured ? 'text-luxury-gold' : 'text-luxury-cream/15'} fill={drinkForm.featured ? '#D4AF37' : 'none'} />
                    </div>
                    {drinkFormError && <p className="text-red-400/80 text-xs font-inter">{drinkFormError}</p>}
                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={closeDrinkModal}
                        className="flex-1 border border-luxury-cream/10 text-luxury-cream/40 text-xs tracking-[0.2em] uppercase font-inter py-3 hover:border-luxury-cream/25 transition-colors duration-200">
                        İptal
                      </button>
                      <button type="submit" disabled={drinkSaving}
                        className="flex-1 bg-luxury-gold text-luxury-black text-xs tracking-[0.2em] uppercase font-inter font-medium py-3 hover:bg-luxury-gold-light disabled:opacity-50 transition-colors duration-200">
                        {drinkSaving ? 'Kaydediliyor…' : editDrink ? 'Güncelle' : 'Ekle'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Menu Delete Confirm ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {deleteTarget && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-luxury-black/80 backdrop-blur-sm z-50" onClick={() => setDeleteTarget(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="glass w-full max-w-sm p-8 text-center border border-red-400/20 pointer-events-auto">
                <div className="w-12 h-12 border border-red-400/30 flex items-center justify-center mx-auto mb-5">
                  <Trash2 size={20} className="text-red-400" />
                </div>
                <h3 className="font-instrument text-luxury-cream text-xl mb-2">Emin misiniz?</h3>
                <p className="text-luxury-cream/40 text-sm font-inter font-light mb-6">
                  <strong className="text-luxury-cream/70">{deleteTarget.name}</strong> silinecek. Bu işlem geri alınamaz.
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteTarget(null)}
                    className="flex-1 border border-luxury-cream/10 text-luxury-cream/40 text-xs tracking-[0.2em] uppercase font-inter py-3 hover:border-luxury-cream/25 transition-colors">
                    İptal
                  </button>
                  <button onClick={handleDelete} disabled={deleting}
                    className="flex-1 bg-red-500/80 text-white text-xs tracking-[0.2em] uppercase font-inter py-3 hover:bg-red-500 disabled:opacity-50 transition-colors">
                    {deleting ? 'Siliniyor…' : 'Sil'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Drinks Delete Confirm ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {drinkDeleteTarget && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-luxury-black/80 backdrop-blur-sm z-50" onClick={() => setDrinkDeleteTarget(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="glass w-full max-w-sm p-8 text-center border border-red-400/20 pointer-events-auto">
                <div className="w-12 h-12 border border-red-400/30 flex items-center justify-center mx-auto mb-5">
                  <Trash2 size={20} className="text-red-400" />
                </div>
                <h3 className="font-instrument text-luxury-cream text-xl mb-2">Emin misiniz?</h3>
                <p className="text-luxury-cream/40 text-sm font-inter font-light mb-6">
                  <strong className="text-luxury-cream/70">{drinkDeleteTarget.name}</strong> silinecek. Bu işlem geri alınamaz.
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setDrinkDeleteTarget(null)}
                    className="flex-1 border border-luxury-cream/10 text-luxury-cream/40 text-xs tracking-[0.2em] uppercase font-inter py-3 hover:border-luxury-cream/25 transition-colors">
                    İptal
                  </button>
                  <button onClick={handleDrinkDelete} disabled={drinkDeleting}
                    className="flex-1 bg-red-500/80 text-white text-xs tracking-[0.2em] uppercase font-inter py-3 hover:bg-red-500 disabled:opacity-50 transition-colors">
                    {drinkDeleting ? 'Siliniyor…' : 'Sil'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Signature Add/Edit Modal ─────────────────────────────────────────── */}
      <AnimatePresence>
        {sigModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-luxury-black/80 backdrop-blur-sm z-50" onClick={closeSigModal} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="glass w-full max-w-lg max-h-[90dvh] overflow-y-auto relative pointer-events-auto">
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-luxury-gold/40" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-luxury-gold/40" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-luxury-gold/40" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-luxury-gold/40" />
                <div className="p-6 sm:p-8">
                  <button type="button" onClick={closeSigModal}
                    className="absolute top-4 right-4 text-luxury-cream/30 hover:text-luxury-cream/70 transition-colors" aria-label="Kapat">
                    <X size={18} />
                  </button>
                  <h2 className="font-instrument text-luxury-cream text-2xl mb-6">{editSig ? 'İmza Yemeği Düzenle' : 'İmza Yemek Ekle'}</h2>
                  <form onSubmit={handleSigSave} noValidate className="space-y-5">
                    <div>
                      <label className="text-luxury-gold/50 text-[9px] tracking-[0.3em] uppercase font-inter block mb-2">Yemek Adı *</label>
                      <input type="text" value={sigForm.name} onChange={(e) => setSigForm({ ...sigForm, name: e.target.value })}
                        placeholder="Örn: Adana Ustabaşı" className="luxury-input text-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-luxury-gold/50 text-[9px] tracking-[0.3em] uppercase font-inter block mb-2">Kısa Başlık</label>
                        <input type="text" value={sigForm.subtitle} onChange={(e) => setSigForm({ ...sigForm, subtitle: e.target.value })}
                          placeholder="Örn: İmza Kebap" className="luxury-input text-sm" />
                      </div>
                      <div>
                        <label className="text-luxury-gold/50 text-[9px] tracking-[0.3em] uppercase font-inter block mb-2">Etiket</label>
                        <input type="text" value={sigForm.tag} onChange={(e) => setSigForm({ ...sigForm, tag: e.target.value })}
                          placeholder="Örn: Şef Seçkisi" className="luxury-input text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="text-luxury-gold/50 text-[9px] tracking-[0.3em] uppercase font-inter block mb-2">Açıklama</label>
                      <textarea value={sigForm.description} onChange={(e) => setSigForm({ ...sigForm, description: e.target.value })}
                        placeholder="Malzemeler ve hazırlanış…" rows={3} className="luxury-input text-sm resize-none" />
                    </div>
                    <div>
                      <label className="text-luxury-gold/50 text-[9px] tracking-[0.3em] uppercase font-inter block mb-2">Fiyat *</label>
                      <input type="text" value={sigForm.price}
                        onChange={(e) => { let val = e.target.value; if (val && !val.startsWith('₺')) val = '₺' + val; setSigForm({ ...sigForm, price: val }); }}
                        placeholder="₺0" className="luxury-input text-sm" />
                    </div>
                    <div>
                      <label className="text-luxury-gold/50 text-[9px] tracking-[0.3em] uppercase font-inter block mb-2">Görsel URL</label>
                      <input type="text" value={sigForm.image} onChange={(e) => setSigForm({ ...sigForm, image: e.target.value })}
                        placeholder="https://…" className="luxury-input text-sm" />
                      {sigForm.image && (
                        <div className="mt-3 relative w-full h-32 overflow-hidden border border-luxury-cream/10">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={sigForm.image} alt="Önizleme" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        </div>
                      )}
                    </div>
                    {sigFormError && <p className="text-red-400/80 text-xs font-inter">{sigFormError}</p>}
                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={closeSigModal}
                        className="flex-1 border border-luxury-cream/10 text-luxury-cream/40 text-xs tracking-[0.2em] uppercase font-inter py-3 hover:border-luxury-cream/25 transition-colors duration-200">
                        İptal
                      </button>
                      <button type="submit" disabled={sigSaving}
                        className="flex-1 bg-luxury-gold text-luxury-black text-xs tracking-[0.2em] uppercase font-inter font-medium py-3 hover:bg-luxury-gold-light disabled:opacity-50 transition-colors duration-200">
                        {sigSaving ? 'Kaydediliyor…' : editSig ? 'Güncelle' : 'Ekle'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Signature Delete Confirm ──────────────────────────────────────────── */}
      <AnimatePresence>
        {sigDeleteTarget && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-luxury-black/80 backdrop-blur-sm z-50" onClick={() => setSigDeleteTarget(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="glass w-full max-w-sm p-8 text-center border border-red-400/20 pointer-events-auto">
                <div className="w-12 h-12 border border-red-400/30 flex items-center justify-center mx-auto mb-5">
                  <Trash2 size={20} className="text-red-400" />
                </div>
                <h3 className="font-instrument text-luxury-cream text-xl mb-2">Emin misiniz?</h3>
                <p className="text-luxury-cream/40 text-sm font-inter font-light mb-6">
                  <strong className="text-luxury-cream/70">{sigDeleteTarget.name}</strong> silinecek. Bu işlem geri alınamaz.
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setSigDeleteTarget(null)}
                    className="flex-1 border border-luxury-cream/10 text-luxury-cream/40 text-xs tracking-[0.2em] uppercase font-inter py-3 hover:border-luxury-cream/25 transition-colors">
                    İptal
                  </button>
                  <button onClick={handleSigDelete} disabled={sigDeleting}
                    className="flex-1 bg-red-500/80 text-white text-xs tracking-[0.2em] uppercase font-inter py-3 hover:bg-red-500 disabled:opacity-50 transition-colors">
                    {sigDeleting ? 'Siliniyor…' : 'Sil'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Idle Warning Modal ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {idleWarning && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-luxury-black/80 backdrop-blur-sm z-[200]" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[200] w-full max-w-sm"
            >
              <div className="glass m-4 p-8 text-center border border-luxury-gold/20">
                <div className="w-12 h-12 border border-luxury-gold/30 flex items-center justify-center mx-auto mb-5">
                  <LogOut size={20} className="text-luxury-gold/60" />
                </div>
                <h3 className="font-instrument text-luxury-cream text-xl mb-2">Oturum Sona Eriyor</h3>
                <p className="text-luxury-cream/40 text-sm font-inter font-light mb-6">
                  2 dakika hareketsizlik nedeniyle oturumunuz kapatılacak.
                </p>
                <div className="flex gap-3">
                  <button onClick={resetIdleTimer}
                    className="flex-1 bg-luxury-gold text-luxury-black text-xs tracking-[0.2em] uppercase font-inter font-medium py-3 hover:bg-luxury-gold-light transition-colors">
                    Devam Et
                  </button>
                  <button onClick={handleLogout}
                    className="flex-1 border border-luxury-cream/10 text-luxury-cream/40 text-xs tracking-[0.2em] uppercase font-inter py-3 hover:border-luxury-cream/25 transition-colors">
                    Çıkış
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
