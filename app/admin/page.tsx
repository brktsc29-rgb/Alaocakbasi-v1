'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, LogOut, Star, X, Check, AlertTriangle } from 'lucide-react';

interface MenuItem {
  id: string;
  category: 'baslangic' | 'ana' | 'tatli' | 'icecek';
  name: string;
  description: string;
  price: string;
  special: boolean;
}

type Category = 'baslangic' | 'ana' | 'tatli' | 'icecek';

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'baslangic', label: 'Başlangıç' },
  { id: 'ana', label: 'Ana Yemek' },
  { id: 'tatli', label: 'Tatlı' },
  { id: 'icecek', label: 'İçecek' },
];

const EMPTY_FORM: Omit<MenuItem, 'id'> = {
  category: 'baslangic',
  name: '',
  description: '',
  price: '',
  special: false,
};

export default function AdminPage() {
  const router = useRouter();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [activeTab, setActiveTab] = useState<Category>('baslangic');
  const [loading, setLoading] = useState(true);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const [form, setForm] = useState<Omit<MenuItem, 'id'>>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState<MenuItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Toast
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

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

  useEffect(() => {
    fetch('/api/auth/check').then((r) => {
      if (!r.ok) router.replace('/admin/login');
      else fetchItems();
    });
  }, [router, fetchItems]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/admin/login');
  };

  const openAdd = () => {
    setEditItem(null);
    setForm({ ...EMPTY_FORM, category: activeTab });
    setFormError('');
    setModalOpen(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditItem(item);
    setForm({
      category: item.category,
      name: item.name,
      description: item.description,
      price: item.price,
      special: item.special,
    });
    setFormError('');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditItem(null);
    setFormError('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price.trim()) {
      setFormError('İsim ve fiyat zorunludur.');
      return;
    }
    setSaving(true);
    setFormError('');
    try {
      const url = editItem ? `/api/menu/${editItem.id}` : '/api/menu';
      const method = editItem ? 'PUT' : 'POST';
      const r = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!r.ok) {
        let msg = 'Kayıt sırasında bir hata oluştu.';
        try { msg = (await r.json()).error ?? msg; } catch { /* non-JSON response */ }
        throw new Error(msg);
      }
      await fetchItems();
      closeModal();
      showToast(editItem ? 'Ürün güncellendi.' : 'Ürün eklendi.');
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

  const filtered = items.filter((i) => i.category === activeTab);

  return (
    <div className="min-h-screen bg-luxury-black" style={{ cursor: 'default' }}>
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-3 text-sm font-inter ${
              toast.ok
                ? 'bg-luxury-gold text-luxury-black'
                : 'bg-red-500/90 text-white'
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
            <span className="font-instrument italic text-luxury-gold text-2xl">ALA</span>
            <span className="w-px h-5 bg-luxury-gold/30" />
            <span className="font-instrument text-luxury-cream/50 text-sm tracking-[0.3em] uppercase">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              className="text-luxury-cream/30 hover:text-luxury-cream/70 text-xs tracking-wider uppercase font-inter transition-colors duration-200"
            >
              Siteyi Gör ↗
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-luxury-cream/40 hover:text-luxury-gold text-xs tracking-wider uppercase font-inter transition-colors duration-200"
            >
              <LogOut size={13} />
              Çıkış
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Page title */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-luxury-gold text-[10px] tracking-[0.4em] uppercase font-inter mb-2">
              Yönetim Paneli
            </p>
            <h1 className="font-instrument text-luxury-cream text-4xl">
              Menü Yönetimi
            </h1>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-luxury-gold text-luxury-black text-xs tracking-[0.2em] uppercase font-inter font-medium px-5 py-3 hover:bg-luxury-gold-light transition-colors duration-200"
          >
            <Plus size={14} />
            Yeni Ürün Ekle
          </button>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {CATEGORIES.map((cat) => {
            const count = items.filter((i) => i.category === cat.id).length;
            return (
              <div key={cat.id} className="border border-luxury-cream/5 bg-luxury-surface/30 p-4">
                <p className="text-luxury-cream/25 text-[9px] tracking-[0.3em] uppercase font-inter mb-1">
                  {cat.label}
                </p>
                <p className="font-instrument text-luxury-gold text-2xl">{count}</p>
                <p className="text-luxury-cream/20 text-[9px] font-inter mt-0.5">ürün</p>
              </div>
            );
          })}
        </div>

        {/* Category tabs */}
        <div className="flex border-b border-luxury-cream/5 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-3 text-xs tracking-[0.2em] uppercase font-inter transition-all duration-200 border-b-2 -mb-px ${
                activeTab === cat.id
                  ? 'border-luxury-gold text-luxury-gold'
                  : 'border-transparent text-luxury-cream/30 hover:text-luxury-cream/60'
              }`}
            >
              {cat.label}
              <span className="ml-2 text-[10px] opacity-50">
                ({items.filter((i) => i.category === cat.id).length})
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-20 text-luxury-cream/20 text-sm font-inter tracking-wider">
            Yükleniyor…
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-luxury-cream/10">
            <p className="text-luxury-cream/25 text-sm font-inter mb-4">Bu kategoride ürün yok.</p>
            <button
              onClick={openAdd}
              className="text-luxury-gold text-xs tracking-wider uppercase font-inter hover:underline"
            >
              İlk ürünü ekle
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <AnimatePresence>
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-4 bg-luxury-surface/40 border border-luxury-cream/5 hover:border-luxury-gold/20 px-5 py-4 group transition-colors duration-200"
                >
                  {/* Special indicator */}
                  <Star
                    size={13}
                    className={item.special ? 'text-luxury-gold' : 'text-luxury-cream/10'}
                    fill={item.special ? '#D4AF37' : 'none'}
                  />

                  {/* Name & Description */}
                  <div className="flex-1 min-w-0">
                    <p className="font-instrument text-luxury-cream text-lg leading-tight truncate">
                      {item.name}
                    </p>
                    {item.description && (
                      <p className="text-luxury-cream/30 text-xs font-inter font-light truncate mt-0.5">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Price */}
                  <span className="font-instrument text-luxury-gold text-lg whitespace-nowrap">
                    {item.price}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => openEdit(item)}
                      className="w-8 h-8 border border-luxury-cream/10 flex items-center justify-center text-luxury-cream/40 hover:border-luxury-gold/50 hover:text-luxury-gold transition-all duration-200"
                      aria-label="Düzenle"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(item)}
                      className="w-8 h-8 border border-luxury-cream/10 flex items-center justify-center text-luxury-cream/40 hover:border-red-400/50 hover:text-red-400 transition-all duration-200"
                      aria-label="Sil"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-luxury-black/80 backdrop-blur-sm z-50"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="glass w-full max-w-lg max-h-[90dvh] overflow-y-auto relative pointer-events-auto">
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-luxury-gold/40" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-luxury-gold/40" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-luxury-gold/40" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-luxury-gold/40" />

                <div className="p-6 sm:p-8">

                {/* Close */}
                <button
                  type="button"
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-luxury-cream/30 hover:text-luxury-cream/70 transition-colors"
                  aria-label="Kapat"
                >
                  <X size={18} />
                </button>

                <h2 className="font-instrument text-luxury-cream text-2xl mb-6">
                  {editItem ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
                </h2>

                <form onSubmit={handleSave} noValidate className="space-y-5">
                  {/* Category */}
                  <div>
                    <label className="text-luxury-gold/50 text-[9px] tracking-[0.3em] uppercase font-inter block mb-2">
                      Kategori
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
                      className="luxury-input text-sm"
                      style={{ cursor: 'default' }}
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id} className="bg-luxury-surface text-luxury-cream">
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="text-luxury-gold/50 text-[9px] tracking-[0.3em] uppercase font-inter block mb-2">
                      Ürün Adı *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Örn: Adana Ustabaşı"
                      required
                      className="luxury-input text-sm"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-luxury-gold/50 text-[9px] tracking-[0.3em] uppercase font-inter block mb-2">
                      Açıklama
                    </label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="Malzemeler, pişirme yöntemi…"
                      rows={2}
                      className="luxury-input text-sm resize-none"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="text-luxury-gold/50 text-[9px] tracking-[0.3em] uppercase font-inter block mb-2">
                      Fiyat *
                    </label>
                    <input
                      type="text"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      placeholder="Örn: ₺480"
                      required
                      className="luxury-input text-sm"
                    />
                  </div>

                  {/* Special toggle */}
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, special: !form.special })}
                      className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
                        form.special ? 'bg-luxury-gold' : 'bg-luxury-cream/10'
                      }`}
                      aria-label="Öne çıkan"
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                          form.special ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                    <span className="text-luxury-cream/50 text-xs tracking-wider uppercase font-inter">
                      Öne Çıkan Ürün
                    </span>
                    <Star
                      size={12}
                      className={form.special ? 'text-luxury-gold' : 'text-luxury-cream/15'}
                      fill={form.special ? '#D4AF37' : 'none'}
                    />
                  </div>

                  {formError && (
                    <p className="text-red-400/80 text-xs font-inter">{formError}</p>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 border border-luxury-cream/10 text-luxury-cream/40 text-xs tracking-[0.2em] uppercase font-inter py-3 hover:border-luxury-cream/25 transition-colors duration-200"
                    >
                      İptal
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 bg-luxury-gold text-luxury-black text-xs tracking-[0.2em] uppercase font-inter font-medium py-3 hover:bg-luxury-gold-light disabled:opacity-50 transition-colors duration-200"
                    >
                      {saving ? 'Kaydediliyor…' : editItem ? 'Güncelle' : 'Ekle'}
                    </button>
                  </div>
                </form>
                </div>{/* /p-6 sm:p-8 */}
              </div>{/* /glass */}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-luxury-black/80 backdrop-blur-sm z-50"
              onClick={() => setDeleteTarget(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm"
            >
              <div className="glass m-4 p-8 text-center border border-red-400/20">
                <div className="w-12 h-12 border border-red-400/30 flex items-center justify-center mx-auto mb-5">
                  <Trash2 size={20} className="text-red-400" />
                </div>
                <h3 className="font-instrument text-luxury-cream text-xl mb-2">
                  Emin misiniz?
                </h3>
                <p className="text-luxury-cream/40 text-sm font-inter font-light mb-6">
                  <strong className="text-luxury-cream/70">{deleteTarget.name}</strong> silinecek.
                  Bu işlem geri alınamaz.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteTarget(null)}
                    className="flex-1 border border-luxury-cream/10 text-luxury-cream/40 text-xs tracking-[0.2em] uppercase font-inter py-3 hover:border-luxury-cream/25 transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex-1 bg-red-500/80 text-white text-xs tracking-[0.2em] uppercase font-inter py-3 hover:bg-red-500 disabled:opacity-50 transition-colors"
                  >
                    {deleting ? 'Siliniyor…' : 'Sil'}
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
