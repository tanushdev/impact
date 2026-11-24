'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Plus, Trash2, Pencil, LogOut, Star, RefreshCw,
  Search, ChevronUp, ChevronDown, FileText, Newspaper,
  Megaphone, BookOpen,
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

const CATEGORY_STYLES: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  'Press Release': { bg: 'bg-[#10CFC9]/10', text: 'text-[#10CFC9]', icon: <Newspaper size={11} /> },
  'News': { bg: 'bg-[#70B83A]/10', text: 'text-[#70B83A]', icon: <FileText size={11} /> },
  'Announcement': { bg: 'bg-amber-500/10', text: 'text-amber-400', icon: <Megaphone size={11} /> },
  'Report': { bg: 'bg-purple-500/10', text: 'text-purple-400', icon: <BookOpen size={11} /> },
};

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
    if (!confirm(`Delete "${title}"?\n\nThis cannot be undone.`)) return;
    setDeleting(id);
    const res = await fetch(`/api/admin/news/${id}`, { method: 'DELETE' });
    if (res.ok) setNews((prev) => prev.filter((n) => n._id !== id));
    setDeleting(null);
  };

  const toggleFeatured = async (item: NewsItem) => {
    const res = await fetch(`/api/admin/news/${item._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ featured: !item.featured }),
    });
    if (res.ok) setNews((prev) => prev.map((n) => n._id === item._id ? { ...n, featured: !n.featured } : n));
  };

  const changeOrder = async (item: NewsItem, dir: 'up' | 'down') => {
    await fetch(`/api/admin/news/${item._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order: dir === 'up' ? item.order - 1 : item.order + 1 }),
    });
    await fetchNews();
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  };

  const filtered = news.filter(
    (n) => n.title.toLowerCase().includes(search.toLowerCase()) ||
           n.category.toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    { label: 'Total Articles', value: news.length, color: 'text-white' },
    { label: 'Featured', value: news.filter((n) => n.featured).length, color: 'text-[#70B83A]' },
    { label: 'Press Releases', value: news.filter((n) => n.category === 'Press Release').length, color: 'text-[#10CFC9]' },
    { label: new Date().getFullYear().toString(), value: news.filter((n) => n.year === new Date().getFullYear()).length, color: 'text-amber-400' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F0C] text-white flex flex-col">
      {/* Top accent line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#10CFC9] via-[#70B83A] to-[#10CFC9] shrink-0" />

      {/* Sidebar + Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 shrink-0 bg-[#0D1510] border-r border-white/[0.06] flex flex-col py-6 px-4 gap-6 hidden lg:flex">
          {/* Logo */}
          <div className="px-2 mb-2">
            <Image
              src="/images/figma_logo_146_15635.svg"
              alt="Impact Energies"
              width={130}
              height={34}
              className="brightness-200"
            />
            <p className="text-[10px] text-gray-600 mt-1 ml-0.5 uppercase tracking-widest">CMS Admin</p>
          </div>

          {/* Nav items */}
          <nav className="flex-1 space-y-1">
            <div className="text-[10px] text-gray-600 uppercase tracking-widest px-3 mb-2">Content</div>
            <Link
              href="/admin/news"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-[#70B83A]/10 text-[#70B83A] text-sm font-semibold"
            >
              <Newspaper size={14} />
              News &amp; Media
            </Link>
          </nav>

          {/* Bottom: logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/10 text-sm transition w-full"
          >
            <LogOut size={14} />
            Logout
          </button>
        </aside>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          {/* Page header */}
          <header className="sticky top-0 z-10 bg-[#0A0F0C]/95 backdrop-blur border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-white font-bold text-lg tracking-tight">News &amp; Media</h1>
              <p className="text-gray-500 text-xs mt-0.5">Manage press releases, news articles and announcements</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchNews}
                className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition"
                title="Refresh"
              >
                <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
              </button>
              <Link
                href="/admin/news/new"
                className="flex items-center gap-2 px-4 py-2 bg-[#70B83A] hover:bg-[#5ea32a] rounded-xl text-sm font-semibold transition shadow-lg shadow-[#70B83A]/20"
              >
                <Plus size={14} />
                New Article
              </Link>
              {/* Mobile logout */}
              <button
                onClick={handleLogout}
                className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition"
              >
                <LogOut size={15} />
              </button>
            </div>
          </header>

          <div className="p-6 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-[#111A13] border border-white/[0.06] rounded-xl px-5 py-4">
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search articles by title or category…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#111A13] border border-white/[0.08] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#10CFC9] focus:ring-1 focus:ring-[#10CFC9]/20 transition"
              />
            </div>

            {/* Table */}
            <div className="bg-[#111A13] border border-white/[0.06] rounded-2xl overflow-hidden">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-24 text-gray-600">
                  <RefreshCw className="animate-spin mb-3" size={22} />
                  <p className="text-sm">Loading articles…</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center px-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#70B83A]/10 flex items-center justify-center mb-4">
                    <Newspaper size={22} className="text-[#70B83A]" />
                  </div>
                  <p className="text-white font-semibold mb-1">
                    {search ? 'No articles match your search' : 'No articles yet'}
                  </p>
                  <p className="text-gray-500 text-sm mb-6 max-w-xs">
                    {search ? 'Try a different search term.' : 'Create your first press release or news article to get started.'}
                  </p>
                  {!search && (
                    <Link
                      href="/admin/news/new"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#70B83A] hover:bg-[#5ea32a] rounded-xl text-sm font-semibold transition"
                    >
                      <Plus size={14} />
                      Create First Article
                    </Link>
                  )}
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06] text-[11px] text-gray-500 uppercase tracking-wider">
                      <th className="text-left px-5 py-3.5 font-semibold">Order</th>
                      <th className="text-left px-4 py-3.5 font-semibold">Title</th>
                      <th className="text-left px-4 py-3.5 font-semibold hidden md:table-cell">Category</th>
                      <th className="text-left px-4 py-3.5 font-semibold hidden md:table-cell">Date</th>
                      <th className="text-left px-4 py-3.5 font-semibold">Featured</th>
                      <th className="text-right px-5 py-3.5 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {filtered.map((item) => {
                      const catStyle = CATEGORY_STYLES[item.category] || { bg: 'bg-white/5', text: 'text-gray-400', icon: null };
                      return (
                        <tr key={item._id} className="group hover:bg-white/[0.02] transition">
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-1">
                              <span className="text-gray-600 w-5 text-center text-xs font-mono">{item.order}</span>
                              <div className="flex flex-col opacity-0 group-hover:opacity-100 transition">
                                <button onClick={() => changeOrder(item, 'up')} className="text-gray-600 hover:text-[#70B83A] transition">
                                  <ChevronUp size={11} />
                                </button>
                                <button onClick={() => changeOrder(item, 'down')} className="text-gray-600 hover:text-[#70B83A] transition">
                                  <ChevronDown size={11} />
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3.5 max-w-[280px]">
                            <p className="font-medium text-white truncate">{item.title}</p>
                            <p className="text-xs text-gray-600 font-mono mt-0.5 truncate">/news/{item.slug}</p>
                          </td>
                          <td className="px-4 py-3.5 hidden md:table-cell">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${catStyle.bg} ${catStyle.text}`}>
                              {catStyle.icon}
                              {item.category}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-gray-500 text-xs hidden md:table-cell">{item.date}</td>
                          <td className="px-4 py-3.5">
                            <button
                              onClick={() => toggleFeatured(item)}
                              className={`transition ${item.featured ? 'text-[#70B83A]' : 'text-gray-700 hover:text-gray-400'}`}
                              title={item.featured ? 'Unfeature' : 'Mark as featured'}
                            >
                              <Star size={15} fill={item.featured ? 'currentColor' : 'none'} />
                            </button>
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center justify-end gap-1.5">
                              <Link
                                href={`/admin/news/${item._id}`}
                                className="p-2 rounded-lg bg-white/[0.04] hover:bg-[#10CFC9]/10 hover:text-[#10CFC9] transition"
                                title="Edit"
                              >
                                <Pencil size={12} />
                              </Link>
                              <button
                                onClick={() => handleDelete(item._id, item.title)}
                                disabled={deleting === item._id}
                                className="p-2 rounded-lg bg-white/[0.04] hover:bg-red-500/10 hover:text-red-400 transition disabled:opacity-40"
                                title="Delete"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
