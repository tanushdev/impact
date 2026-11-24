'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ImpactLogo } from './ImpactLogo';
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // Completely isolate CMS admin pages - do not render public footer
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  // Remove footer on corporate-responsibility page only
  if (
    pathname === '/corporate-responsibility' ||
    pathname?.startsWith('/corporate-responsibility') ||
    pathname === '/about/corporate-responsibility'
  ) {
    return null;
  }

  return (
    <footer className="relative w-full bg-[#E5EFE4] text-gray-700 pt-16 pb-12 px-6 md:px-12 overflow-hidden border-t border-[#D6E4D5]">
      {/* Subtle watermark "impact" across the footer */}
      <div className="absolute -bottom-8 left-0 right-0 pointer-events-none select-none text-center opacity-[0.06] font-extrabold text-[180px] md:text-[260px] tracking-tight leading-none text-gray-900">
        impact
      </div>

      <div className="max-w-[1360px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[#D6E4D5]/80">
          {/* Col 1: Brand */}
          <div className="lg:col-span-4 pr-4">
            <ImpactLogo variant="dark" />
          </div>

          {/* Col 2: Assets */}
          <div className="lg:col-span-3">
            <h4 className="text-[17px] font-bold text-gray-900 mb-4 tracking-wide">Assets</h4>
            <ul className="space-y-3 text-[15px] text-gray-600">
              <li>
                <Link href="/assets/orange-basin-deep" className="hover:text-[#007580] transition-colors leading-normal block">
                  South Africa: Orange Basin Deep
                </Link>
              </li>
              <li>
                <Link href="/assets/transkei-algoa" className="hover:text-[#007580] transition-colors leading-normal block">
                  Natal Trough – East Coast South Africa
                </Link>
              </li>
              <li>
                <Link href="/assets/area-2" className="hover:text-[#007580] transition-colors leading-normal block">
                  South Africa: Area 2
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[17px] font-bold text-gray-900 mb-4 tracking-wide">Quick Links</h4>
            <ul className="space-y-2.5 text-[15px] text-gray-600">
              <li>
                <Link
                  href="/management"
                  className="inline-flex items-center gap-1.5 hover:text-[#007580] transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  About Company
                </Link>
              </li>
              <li>
                <Link
                  href="/corporate-responsibility"
                  className="inline-flex items-center gap-1.5 hover:text-[#007580] transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  Corporate Responsibility
                </Link>
              </li>
              <li>
                <Link
                  href="/investors"
                  className="inline-flex items-center gap-1.5 hover:text-[#007580] transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  Investors
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="inline-flex items-center gap-1.5 hover:text-[#007580] transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  News &amp; Media
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 hover:text-[#007580] transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div className="lg:col-span-3">
            <h4 className="text-[17px] font-bold text-gray-900 mb-4 tracking-wide">Contact Us</h4>
            <div className="space-y-4 text-[15px] text-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1A1E21] flex items-center justify-center flex-shrink-0 text-white">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <a href="tel:+442046178881" className="hover:text-[#007580] transition-colors font-medium">
                  +44 204 617 8881
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1A1E21] flex items-center justify-center flex-shrink-0 text-white">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <a
                  href="mailto:info@impactenergies.com"
                  className="hover:text-[#007580] transition-colors break-all font-medium"
                >
                  info@impactenergies.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1A1E21] flex items-center justify-center flex-shrink-0 text-white mt-0.5">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="leading-snug text-gray-600">
                  2nd Floor, 40 Queen Street, London, EC4R 1DD, United Kingdom
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[13px] text-gray-600 gap-4">
          <div className="flex flex-wrap items-center gap-4 uppercase tracking-wider font-medium text-gray-600">
            <Link href="/terms-and-conditions" className="hover:text-gray-900 transition-colors">
              Terms &amp; Conditions
            </Link>
            <span>|</span>
            <Link href="/privacy-policy" className="hover:text-gray-900 transition-colors">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="/cookies-policy" className="hover:text-gray-900 transition-colors">
              Cookies Policy
            </Link>
            <span>|</span>
            <Link href="/sitemap" className="hover:text-gray-900 transition-colors">
              Sitemap
            </Link>
          </div>

          <div>
            Copyright © 2026 Designed by{' '}
            <span className="text-[#007580] font-semibold">XeeDesign</span> | All Right Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};
