'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Newspaper,
  FileText,
  Megaphone,
  BookOpen,
  ExternalLink,
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

const CATEGORY_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  'Press Release': { bg: 'bg-[#EBF7F7]', text: 'text-[#007580]', border: 'border-[#BBE3E4]' },
  'News': { bg: 'bg-[#F0FDF4]', text: 'text-[#2E7D32]', border: 'border-[#DCFCE7]' },
  'Announcement': { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
  'Report': { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200' },
};

export default function AdminNewsDashboard() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/news');
      if (res.status === 401) {
        router.push('/admin');
        return;
      }
      const data = await res.json();
      setNews(data.news || []);
    } catch (err) {
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete this article?\n\n"${title}"\n\nThis action cannot be undone.`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/news/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setNews((prev) => prev.filter((n) => n._id !== id));
      }
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setDeleting(null);
    }
  };

  const toggleFeatured = async (item: NewsItem) => {
    try {
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
    } catch (err) {
      console.error('Toggle featured failed:', err);
    }
  };

  const changeOrder = async (item: NewsItem, dir: 'up' | 'down') => {
    const newOrder = dir === 'up' ? item.order - 1 : item.order + 1;
    try {
      await fetch(`/api/admin/news/${item._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: newOrder }),
      });
      await fetchNews();
    } catch (err) {
      console.error('Reorder failed:', err);
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

  const stats = [
    { label: 'Total Articles', value: news.length, color: 'text-[#141C16]' },
    { label: 'Featured Releases', value: news.filter((n) => n.featured).length, color: 'text-[#70B83A]' },
    { label: 'Press Releases', value: news.filter((n) => n.category === 'Press Release').length, color: 'text-[#007580]' },
    { label: `${new Date().getFullYear()} Published`, value: news.filter((n) => n.year === new Date().getFullYear()).length, color: 'text-[#5E942D]' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-[#141C16] flex flex-col">
      {/* Top brand accent stripe */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#10CFC9] via-[#70B83A] to-[#10CFC9] shrink-0" />

      {/* Main CMS Header */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-200/90 shadow-xs px-6 md:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Image
            src="/images/figma_logo_dark.svg"
            alt="Impact Energies"
            width={160}
            height={42}
            priority
            className="h-9 w-auto object-contain"
          />
          <div className="hidden sm:block h-6 w-px bg-gray-200" />
          <div className="hidden sm:block">
            <h1 className="text-base font-bold text-[#141C16] leading-none">News &amp; Media CMS</h1>
            <p className="text-xs text-gray-500 font-light mt-1">Impact Energies Administrative Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchNews}
            className="p-2.5 rounded-xl text-gray-500 hover:text-[#141C16] hover:bg-gray-100 transition-colors cursor-pointer"
            title="Refresh articles"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>

          <Link
            href="/admin/news/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#70B83A] hover:bg-[#5E942D] text-white font-semibold text-sm rounded-xl transition-colors shadow-sm shadow-[#70B83A]/20 cursor-pointer"
          >
            <Plus size={16} />
            <span>Create Article</span>
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-red-600 hover:bg-red-50 hover:border-red-200 text-sm font-medium transition-colors cursor-pointer"
          >
            <LogOut size={15} />
            <span className="hidden md:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1360px] w-full mx-auto px-6 md:px-10 py-8 space-y-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-xs"
            >
              <p className={`text-3xl font-extrabold ${s.color} tracking-tight`}>{s.value}</p>
              <p className="text-xs text-gray-500 font-medium mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Search & Actions Bar */}
        <div className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 min-w-[260px]">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search published articles by headline or category…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#141C16] placeholder-gray-400 focus:outline-none focus:border-[#70B83A] focus:bg-white focus:ring-2 focus:ring-[#70B83A]/15 transition"
            />
          </div>

          <div className="text-xs text-gray-500 font-medium">
            Showing <span className="font-bold text-[#141C16]">{filtered.length}</span> of {news.length} articles
          </div>
        </div>

        {/* Articles Table Card */}
        <div className="bg-white border border-gray-200/90 rounded-2xl shadow-xs overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-gray-500 gap-3">
              <RefreshCw className="animate-spin text-[#70B83A]" size={24} />
              <p className="text-sm font-light">Loading published articles…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center px-6">
              <div className="w-16 h-16 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center mb-4">
                <Newspaper size={26} className="text-[#70B83A]" />
              </div>
              <h3 className="text-lg font-bold text-[#141C16] mb-1">
                {search ? 'No matching articles found' : 'No articles published yet'}
              </h3>
              <p className="text-sm text-gray-500 font-light max-w-md mb-6">
                {search
                  ? 'Try searching with different terms or clear the filter.'
                  : 'Start publishing corporate press releases and announcements to the website.'}
              </p>
              {!search && (
                <Link
                  href="/admin/news/new"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#70B83A] hover:bg-[#5E942D] text-white font-semibold text-sm rounded-xl transition-colors shadow-sm"
                >
                  <Plus size={16} />
                  <span>Create First Article</span>
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-200/90 text-xs text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-4 font-bold text-center w-20">Order</th>
                    <th className="px-6 py-4 font-bold">Headline &amp; Slug</th>
                    <th className="px-6 py-4 font-bold">Category</th>
                    <th className="px-6 py-4 font-bold">Date</th>
                    <th className="px-6 py-4 font-bold text-center">Featured</th>
                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((item) => {
                    const catStyle =
                      CATEGORY_STYLES[item.category] || {
                        bg: 'bg-gray-100',
                        text: 'text-gray-700',
                        border: 'border-gray-200',
                      };

                    return (
                      <tr key={item._id} className="hover:bg-[#F9FBFA] transition-colors group">
                        {/* Order Column with arrows */}
                        <td className="px-6 py-4 text-center">
                          <div className="inline-flex items-center gap-1.5 justify-center">
                            <span className="font-mono text-xs font-bold text-gray-600 w-5">
                              {item.order}
                            </span>
                            <div className="flex flex-col opacity-40 group-hover:opacity-100 transition">
                              <button
                                onClick={() => changeOrder(item, 'up')}
                                className="text-gray-500 hover:text-[#70B83A] transition cursor-pointer"
                                title="Move up"
                              >
                                <ChevronUp size={12} />
                              </button>
                              <button
                                onClick={() => changeOrder(item, 'down')}
                                className="text-gray-500 hover:text-[#70B83A] transition cursor-pointer"
                                title="Move down"
                              >
                                <ChevronDown size={12} />
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Title & Slug */}
                        <td className="px-6 py-4 max-w-md">
                          <p className="font-bold text-[#141C16] text-[15px] group-hover:text-[#007580] transition-colors leading-snug">
                            {item.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-400 font-mono">/news/{item.slug}</span>
                            <Link
                              href={`/news/${item.slug}`}
                              target="_blank"
                              className="text-gray-400 hover:text-[#70B83A] transition"
                              title="View live public article"
                            >
                              <ExternalLink size={12} />
                            </Link>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}
                          >
                            {item.category}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4 text-gray-500 text-xs font-medium whitespace-nowrap">
                          {item.date}
                        </td>

                        {/* Featured Star */}
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => toggleFeatured(item)}
                            className={`transition p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer ${
                              item.featured
                                ? 'text-[#70B83A]'
                                : 'text-gray-300 hover:text-gray-500'
                            }`}
                            title={item.featured ? 'Unmark featured' : 'Mark as featured article'}
                          >
                            <Star size={16} fill={item.featured ? 'currentColor' : 'none'} />
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          <div className="inline-flex items-center gap-2">
                            <Link
                              href={`/admin/news/${item._id}`}
                              className="p-2 rounded-xl bg-gray-50 hover:bg-[#F0FDF4] text-gray-600 hover:text-[#70B83A] border border-gray-200 transition-colors"
                              title="Edit article"
                            >
                              <Pencil size={14} />
                            </Link>
                            <button
                              onClick={() => handleDelete(item._id, item.title)}
                              disabled={deleting === item._id}
                              className="p-2 rounded-xl bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-600 border border-gray-200 transition-colors disabled:opacity-50 cursor-pointer"
                              title="Delete article"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Isolated Admin Footer */}
      <footer className="bg-white border-t border-gray-200/90 py-4 px-6 md:px-10 text-center text-xs text-gray-400 mt-auto">
        Impact Energies CMS &bull; News &amp; Media Administration Panel
      </footer>
    </div>
  );
}
