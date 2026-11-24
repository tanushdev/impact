'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ImpactLogo } from './ImpactLogo';
import {
  Menu,
  X,
  ChevronDown,
  Users,
  Briefcase,
  Leaf,
  MapPin,
  Lock,
} from 'lucide-react';

export const Header: React.FC = () => {
  const pathname = usePathname();

  // Completely isolate CMS admin pages - do not render public header
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopAboutOpen, setDesktopAboutOpen] = useState(false);
  const [desktopAssetsOpen, setDesktopAssetsOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileAssetsOpen, setMobileAssetsOpen] = useState(false);

  const aboutTriggerRef = useRef<HTMLDivElement>(null);
  const aboutPanelRef = useRef<HTMLDivElement>(null);
  const aboutTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const assetsTriggerRef = useRef<HTMLDivElement>(null);
  const assetsPanelRef = useRef<HTMLDivElement>(null);
  const assetsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // About dropdown mouse handlers
  const handleAboutMouseEnter = () => {
    if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
    if (assetsTimeoutRef.current) clearTimeout(assetsTimeoutRef.current);
    setDesktopAssetsOpen(false);
    setDesktopAboutOpen(true);
  };

  const handleAboutMouseLeave = () => {
    if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
    aboutTimeoutRef.current = setTimeout(() => {
      setDesktopAboutOpen(false);
    }, 300);
  };

  const toggleAboutDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
    setDesktopAssetsOpen(false);
    setDesktopAboutOpen((prev) => !prev);
  };

  // Assets dropdown mouse handlers
  const handleAssetsMouseEnter = () => {
    if (assetsTimeoutRef.current) clearTimeout(assetsTimeoutRef.current);
    if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
    setDesktopAboutOpen(false);
    setDesktopAssetsOpen(true);
  };

  const handleAssetsMouseLeave = () => {
    if (assetsTimeoutRef.current) clearTimeout(assetsTimeoutRef.current);
    assetsTimeoutRef.current = setTimeout(() => {
      setDesktopAssetsOpen(false);
    }, 300);
  };

  const toggleAssetsDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (assetsTimeoutRef.current) clearTimeout(assetsTimeoutRef.current);
    setDesktopAboutOpen(false);
    setDesktopAssetsOpen((prev) => !prev);
  };

  const aboutLinks = [
    {
      name: 'Management',
      href: '/management',
      icon: Users,
      desc: 'Executive leadership guiding exploration excellence',
    },
    {
      name: 'Board of Directors',
      href: '/board-of-directors',
      icon: Briefcase,
      desc: 'Proven industry leaders delivering strategic governance',
    },
    {
      name: 'Corporate Responsibility',
      href: '/corporate-responsibility',
      icon: Leaf,
      desc: 'Commitment to HSE, biodiversity, and local value creation',
    },
  ];

  const assetLinks = [
    { name: 'SOUTH AFRICA: ORANGE BASIN DEEP', href: '/assets/orange-basin-deep' },
    { name: 'NATAL TROUGH – EAST COAST SOUTH AFRICA', href: '/assets/transkei-algoa' },
    { name: 'SOUTH AFRICA: AREA 2', href: '/assets/area-2' },
  ];

  const isAboutActive =
    pathname === '/management' ||
    pathname === '/board-of-directors' ||
    pathname === '/corporate-responsibility' ||
    pathname.startsWith('/about');

  const isAssetsActive = pathname.startsWith('/assets');
  const isInvestorsActive = pathname.startsWith('/investors');

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        !aboutTriggerRef.current?.contains(target) &&
        !aboutPanelRef.current?.contains(target)
      ) {
        setDesktopAboutOpen(false);
      }
      if (
        !assetsTriggerRef.current?.contains(target) &&
        !assetsPanelRef.current?.contains(target)
      ) {
        setDesktopAssetsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
      if (assetsTimeoutRef.current) clearTimeout(assetsTimeoutRef.current);
    };
  }, []);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 py-6 flex items-center justify-between relative">
        {/* Brand Logo */}
        <ImpactLogo variant="light" />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-10">
          <Link
            href="/"
            className={`text-[16px] transition-colors duration-200 ${
              pathname === '/' ? 'text-white font-medium' : 'text-gray-200/90 hover:text-white font-normal'
            }`}
          >
            Home
          </Link>

          {/* 1. ABOUT HEADER (Slide 1: In between Home and Assets) */}
          <div
            ref={aboutTriggerRef}
            className="relative py-2"
            onMouseEnter={handleAboutMouseEnter}
            onMouseLeave={handleAboutMouseLeave}
          >
            <button
              onClick={toggleAboutDropdown}
              className={`flex items-center gap-1.5 text-[16px] transition-colors duration-200 cursor-pointer focus:outline-none ${
                isAboutActive || desktopAboutOpen
                  ? 'text-white font-medium'
                  : 'text-gray-200/90 hover:text-white font-normal'
              }`}
              aria-expanded={desktopAboutOpen}
            >
              <span>About</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  desktopAboutOpen ? 'rotate-180 text-[#10CFC9]' : 'text-gray-300'
                }`}
              />
            </button>
          </div>

          {/* 2. ASSETS HEADER */}
          <div
            ref={assetsTriggerRef}
            className="relative py-2"
            onMouseEnter={handleAssetsMouseEnter}
            onMouseLeave={handleAssetsMouseLeave}
          >
            <button
              onClick={toggleAssetsDropdown}
              className={`flex items-center gap-1.5 text-[16px] transition-colors duration-200 cursor-pointer focus:outline-none ${
                isAssetsActive || desktopAssetsOpen
                  ? 'text-white font-medium'
                  : 'text-gray-200/90 hover:text-white font-normal'
              }`}
              aria-expanded={desktopAssetsOpen}
            >
              <span>Assets</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  desktopAssetsOpen ? 'rotate-180 text-[#10CFC9]' : 'text-gray-300'
                }`}
              />
            </button>
          </div>

          {/* 3. INVESTORS HEADER (Slide 3) */}
          <Link
            href="/investors"
            className={`text-[16px] transition-colors duration-200 ${
              isInvestorsActive
                ? 'text-white font-medium'
                : 'text-gray-200/90 hover:text-white font-normal'
            }`}
          >
            Investors
          </Link>

          {/* 4. NEWS & MEDIA */}
          <Link
            href="/news"
            className={`text-[16px] transition-colors duration-200 ${
              pathname.startsWith('/news')
                ? 'text-white font-medium'
                : 'text-gray-200/90 hover:text-white font-normal'
            }`}
          >
            News &amp; Media
          </Link>
        </nav>

        {/* ================= ABOUT DROPDOWN PANEL ================= */}
        {desktopAboutOpen && (
          <div
            ref={aboutPanelRef}
            onMouseEnter={handleAboutMouseEnter}
            onMouseLeave={handleAboutMouseLeave}
            className="absolute top-[calc(100%-4px)] left-1/2 -translate-x-1/2 w-full max-w-[620px] z-50 animate-in fade-in slide-in-from-top-2 duration-150 before:absolute before:-top-6 before:left-0 before:right-0 before:h-6 before:content-['']"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden text-left p-6 sm:p-7">
              <div className="text-[13px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5 mb-4">
                <span>ABOUT IMPACT ENERGIES</span>
                <span className="text-[#E08738] font-bold text-sm">→</span>
              </div>

              <div className="space-y-2">
                {aboutLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setDesktopAboutOpen(false)}
                      className="flex items-start gap-4 group p-3 rounded-xl hover:bg-gray-50/90 transition-all border border-transparent hover:border-gray-100"
                    >
                      <div className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center bg-white group-hover:border-[#10CFC9] group-hover:bg-[#FAFDF9] group-hover:shadow-xs transition-all flex-shrink-0 mt-0.5">
                        <Icon className="w-5 h-5 text-gray-700 group-hover:text-[#007580] transition-colors" />
                      </div>
                      <div>
                        <div className="text-[16px] font-bold text-gray-900 group-hover:text-[#007580] transition-colors">
                          {item.name}
                        </div>
                        <div className="text-[14px] text-gray-500 font-normal leading-snug mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= ASSETS DROPDOWN PANEL ================= */}
        {desktopAssetsOpen && (
          <div
            ref={assetsPanelRef}
            onMouseEnter={handleAssetsMouseEnter}
            onMouseLeave={handleAssetsMouseLeave}
            className="absolute top-[calc(100%-4px)] left-1/2 -translate-x-1/2 w-full max-w-[820px] z-50 animate-in fade-in slide-in-from-top-2 duration-150 before:absolute before:-top-6 before:left-0 before:right-0 before:h-6 before:content-['']"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden text-left">
              <div className="grid grid-cols-12 divide-x divide-gray-100 p-8 lg:p-9">
                {/* Column 1: ASSETS */}
                <div className="col-span-7 pr-6 space-y-4">
                  <div className="text-[13px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5 mb-5">
                    <span>EXPLORATION ASSETS</span>
                    <span className="text-[#E08738] font-bold text-sm">→</span>
                  </div>

                  {assetLinks.map((asset) => (
                    <Link
                      key={asset.href}
                      href={asset.href}
                      onClick={() => setDesktopAssetsOpen(false)}
                      className="flex items-center gap-3.5 group p-2 -mx-2 rounded-xl hover:bg-gray-50/80 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl border border-gray-200/90 flex items-center justify-center bg-white group-hover:border-[#10CFC9] group-hover:shadow-xs transition-all flex-shrink-0">
                        <MapPin className="w-4 h-4 text-[#007580] group-hover:text-[#10CFC9] transition-colors" />
                      </div>
                      <span className="text-[15px] font-bold text-gray-800 tracking-wide group-hover:text-[#007580] transition-colors">
                        {asset.name}
                      </span>
                    </Link>
                  ))}
                </div>

                {/* Column 2: Exploration Overview */}
                <div className="col-span-5 pl-6 flex flex-col justify-between py-1">
                  <div className="space-y-3">
                    <h4 className="text-[17px] font-bold text-[#141C16] tracking-tight">
                      Offshore Exploration
                    </h4>
                    <p className="text-[15px] text-gray-600 leading-relaxed font-normal">
                      Frontier deep-water basins across southern Africa driving sustainable value creation and energy security.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="bg-[#F8FAF9] px-8 py-3.5 border-t border-gray-100 flex items-center justify-end">
                <a
                  href="mailto:info@impactenergies.com"
                  className="text-[15px] font-semibold text-[#6AA335] hover:text-[#538727] hover:underline transition-colors"
                >
                  info@impactenergies.com
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Action Button & Hamburger */}
        <div className="flex items-center space-x-3.5">
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center justify-center px-6 py-2.5 rounded-full text-[16px] font-semibold text-white bg-[#10CFC9] hover:bg-[#0EB5AF] shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>+ Contact Us</span>
          </Link>

          {/* Hamburger Menu Icon (Visible on mobile only) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-white hover:text-gray-200 focus:outline-none cursor-pointer rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Slide-out Menu Drawer for mobile */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-80 max-w-full bg-[#11161B] text-white h-full shadow-2xl p-6 flex flex-col justify-between z-10 animate-in slide-in-from-right duration-200 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <ImpactLogo variant="light" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="pt-6 space-y-4">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-[16px] py-1 font-medium transition-colors ${
                    pathname === '/' ? 'text-[#10CFC9]' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Home
                </Link>

                {/* About Accordion */}
                <div>
                  <button
                    onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                    className="w-full flex items-center justify-between text-[16px] py-1 font-medium text-gray-300 hover:text-white"
                  >
                    <span className={isAboutActive ? 'text-[#10CFC9]' : ''}>About</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileAboutOpen ? 'rotate-180 text-[#10CFC9]' : ''
                      }`}
                    />
                  </button>
                  {mobileAboutOpen && (
                    <div className="bg-white/5 rounded-xl p-3 mt-2 space-y-2">
                      {aboutLinks.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileAboutOpen(false);
                            }}
                            className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[15px] text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <Icon className="w-3.5 h-3.5 text-gray-400" />
                            <span>{item.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Assets Accordion */}
                <div>
                  <button
                    onClick={() => setMobileAssetsOpen(!mobileAssetsOpen)}
                    className="w-full flex items-center justify-between text-[16px] py-1 font-medium text-gray-300 hover:text-white"
                  >
                    <span className={isAssetsActive ? 'text-[#10CFC9]' : ''}>Assets</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileAssetsOpen ? 'rotate-180 text-[#10CFC9]' : ''
                      }`}
                    />
                  </button>
                  {mobileAssetsOpen && (
                    <div className="bg-white/5 rounded-xl p-3 mt-2 space-y-2">
                      {assetLinks.map((asset) => (
                        <Link
                          key={asset.href}
                          href={asset.href}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileAssetsOpen(false);
                          }}
                          className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[15px] text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <MapPin className="w-3.5 h-3.5 text-[#10CFC9]" />
                          <span>{asset.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Investors Link */}
                <Link
                  href="/investors"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-[16px] py-1 font-medium transition-colors ${
                    isInvestorsActive ? 'text-[#10CFC9]' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Investors
                </Link>

                {/* News & Media Link */}
                <Link
                  href="/news"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-[16px] py-1 font-medium transition-colors ${
                    pathname.startsWith('/news') ? 'text-[#10CFC9]' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  News &amp; Media
                </Link>

                <div className="pt-4">
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full inline-flex items-center justify-center px-6 py-2.5 rounded-full text-[16px] font-semibold text-white bg-[#10CFC9] hover:bg-[#0EB5AF] shadow-sm transition-all text-center"
                  >
                    + Contact Us
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-[15px] text-gray-400 space-y-2">
              <p>Impact Energies</p>
              <p className="text-[15px] text-gray-400">info@impactenergies.com</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
