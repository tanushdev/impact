'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Trash2,
  Pencil,
  LogOut,
  Star,
  RefreshCw,
  Search,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';

interface NewsItem {
  _id: string;
  slug: string;
  title: string;
  date: string;
  year: number;
  category: string;
  summary: string;
  featured: boolean;
  order: number;
}

export default function AdminNewsDashboard() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  const fetchNews = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/news');
    if (res.status === 401) { router.push('/admin'); return; }
    const data = await res.json();
    setNews(data.news || []);
    setLoading(false);
  }, [router]);

  useEffect(() => { fetchNews(); }, [fetchNews]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    const res = await fetch(`/api/admin/news/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setNews((prev) => prev.filter((n) => n._id !== id));
    }
    setDeleting(null);
  };

  const toggleFeatured = async (item: NewsItem) => {
    const res = await fetch(`/api/admin/news/${item._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ featured: !item.featured }),
    });
    if (res.ok) {
      setNews((prev) =>
        prev.map((n) => (n._id === item._id ? { ...n, featured: !n.featured } : n))
      );
    }
  };

  const changeOrder = async (item: NewsItem, direction: 'up' | 'down') => {
    const newOrder = direction === 'up' ? item.order - 1 : item.order + 1;
    const res = await fetch(`/api/admin/news/${item._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order: newOrder }),
    });
    if (res.ok) {
      await fetchNews();
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  };

  const filtered = news.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.category.toLowerCase().includes(search.toLowerCase())
  );

  const categoryColors: Record<string, string> = {
    'Press Release': 'bg-blue-500/20 text-blue-300',
    'News': 'bg-green-500/20 text-green-300',
    'Announcement': 'bg-yellow-500/20 text-yellow-300',
    'Report': 'bg-purple-500/20 text-purple-300',
  };

  return (
    <div className="min-h-screen bg-[#0E1512] text-white">
      {/* Header */}
      <header className="bg-[#141C16] border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-lg font-bold text-white">News &amp; Media CMS</h1>
            <p className="text-xs text-gray-400">Impact Energies Administration</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/news/new"
            className="flex items-center gap-2 px-4 py-2 bg-[#70B83A] hover:bg-[#5ea32a] rounded-lg text-sm font-semibold transition-colors"
          >
            <Plus size={15} />
            New Article
          </Link>
          <button
            onClick={fetchNews}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
            title="Refresh"
          >
            <RefreshCw size={15} />
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-red-500/20 text-gray-300 hover:text-red-300 rounded-lg text-sm transition"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </header>

      {/* Stats bar */}
      <div className="px-6 py-5 flex gap-5">
        {[
          { label: 'Total Articles', value: news.length, color: 'text-white' },
          { label: 'Featured', value: news.filter((n) => n.featured).length, color: 'text-[#70B83A]' },
          { label: 'Press Releases', value: news.filter((n) => n.category === 'Press Release').length, color: 'text-blue-300' },
          { label: 'This Year', value: news.filter((n) => n.year === new Date().getFullYear()).length, color: 'text-yellow-300' },
        ].map((s) => (
          <div key={s.label} className="bg-[#141C16] border border-white/8 rounded-xl px-5 py-4 min-w-[130px]">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search + Table */}
      <div className="px-6 pb-10">
        <div className="mb-4 relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search articles…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-[#141C16] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#70B83A] transition"
          />
        </div>

        <div className="bg-[#141C16] border border-white/8 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-gray-500">
              <RefreshCw className="animate-spin mr-2" size={18} /> Loading…
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg mb-2">No articles found</p>
              <p className="text-gray-600 text-sm mb-6">Create your first news article to get started.</p>
              <Link
                href="/admin/news/new"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#70B83A] hover:bg-[#5ea32a] rounded-xl text-sm font-semibold transition"
              >
                <Plus size={15} />
                Create Article
              </Link>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="border-b border-white/8">
                <tr className="text-xs text-gray-500 uppercase tracking-wider">
                  <th className="text-left px-5 py-3.5 font-medium">Order</th>
                  <th className="text-left px-4 py-3.5 font-medium">Title</th>
                  <th className="text-left px-4 py-3.5 font-medium">Category</th>
                  <th className="text-left px-4 py-3.5 font-medium">Date</th>
                  <th className="text-left px-4 py-3.5 font-medium">Featured</th>
                  <th className="text-right px-5 py-3.5 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((item) => (
                  <tr key={item._id} className="hover:bg-white/[0.03] transition group">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500 w-6 text-center">{item.order}</span>
                        <div className="flex flex-col opacity-0 group-hover:opacity-100 transition">
                          <button onClick={() => changeOrder(item, 'up')} className="text-gray-500 hover:text-white transition">
                            <ChevronUp size={12} />
                          </button>
                          <button onClick={() => changeOrder(item, 'down')} className="text-gray-500 hover:text-white transition">
                            <ChevronDown size={12} />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 max-w-xs">
                      <p className="font-medium text-white truncate">{item.title}</p>
                      <p className="text-xs text-gray-500 font-mono mt-0.5">{item.slug}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[item.category] || 'bg-white/10 text-gray-300'}`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-gray-400">{item.date}</td>
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => toggleFeatured(item)}
                        className={`transition ${item.featured ? 'text-[#70B83A]' : 'text-gray-600 hover:text-gray-400'}`}
                        title={item.featured ? 'Unfeature' : 'Feature'}
                      >
                        <Star size={16} fill={item.featured ? 'currentColor' : 'none'} />
                      </button>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/news/${item._id}`}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-[#70B83A]/20 hover:text-[#70B83A] transition"
                          title="Edit"
                        >
                          <Pencil size={13} />
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id, item.title)}
                          disabled={deleting === item._id}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
