import React from 'react';
import Link from 'next/link';

export const ConnectBanner: React.FC = () => {
  return (
    <div className="w-full max-w-[1360px] mx-auto px-6 md:px-12 py-10 md:py-16">
      <div className="w-full rounded-3xl bg-gradient-to-r from-[#5B9B32] via-[#2F8569] to-[#0D6E7D] p-10 md:p-14 text-center text-white shadow-lg">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Connect with Us Now
        </h2>
        <p className="text-[15px] text-white/90 max-w-2xl mx-auto leading-relaxed mb-8 font-light">
          Upgrade your business workflow, unlock deep insights, and boost efficiency through our
          tailored analytics and automation services — empowering you to make smarter decisions, save
          valuable time, and achieve sustainable growth.
        </p>
        <div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-[15px] font-semibold text-gray-900 bg-white hover:bg-gray-100 shadow-md transition-all hover:scale-[1.03] active:scale-[0.98]"
          >
            <span>Contact Us Now</span>
            <span className="text-xs font-bold">›</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

