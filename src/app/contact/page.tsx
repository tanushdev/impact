'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MapPin, Building2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [enquiryType, setEnquiryType] = useState('General enquiry');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          company,
          enquiryType,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setSuccessMessage('Thank you for reaching out! Your message has been sent successfully.');
      setFullName('');
      setEmail('');
      setCompany('');
      setEnquiryType('General enquiry');
      setMessage('');
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#FAFBF9]">
      {/* 1. HERO SECTION */}
      {/* Slide 16: Geology image from current website used for hero */}
      <section className="relative w-full min-h-[460px] md:min-h-[500px] flex items-center bg-black overflow-hidden pt-28 pb-14">
        <Image
          src="/images/geology-hero.jpg"
          alt="Impact Energies Geological Exploration Landscape"
          fill
          priority
          className="object-cover object-center opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />

        <div className="relative max-w-[1360px] mx-auto px-6 md:px-12 w-full z-10">
          <div className="text-xs text-gray-300 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#10CFC9] font-medium">Contact Us</span>
          </div>

          <div className="max-w-2xl text-white">
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-[54px] font-extralight tracking-tight leading-[1.1] mb-5 font-sans"
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-sm md:text-base text-gray-200 font-light leading-relaxed max-w-xl"
            >
              Responsible energy exploration built on expertise, innovation, and long-term value.
              Impact Energies corporate headquarters are located in London, UK.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. CONTACT DETAILS & FORM */}
      {/* Slide 17: Light background, don't use black */}
      <section className="w-full py-20 px-6 md:px-12 bg-[#FAFBF9]">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Contact Cards */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#007580]">
                  Get in touch
                </span>
              </div>

              {/* 2x2 Grid of Office / Enquiry Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {/* General Enquiries */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm space-y-3">
                  <div className="w-8 h-8 rounded-full bg-[#10CFC9]/20 flex items-center justify-center text-[#007580]">
                    <Phone className="w-4 h-4 text-[#007580]" />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-400 block font-medium">Telephone</span>
                    <a
                      href="tel:+442046178881"
                      className="text-xs md:text-sm font-semibold text-gray-900 hover:text-[#007580] transition-colors"
                    >
                      +44 204 617 8881
                    </a>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <span className="text-[11px] text-gray-400 block font-medium">Email</span>
                    <a
                      href="mailto:info@impactenergies.com"
                      className="text-xs md:text-sm font-semibold text-[#007580] hover:underline break-all"
                    >
                      info@impactenergies.com
                    </a>
                  </div>
                </div>

                {/* Media & PR Enquiries */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm space-y-3">
                  <div className="w-8 h-8 rounded-full bg-[#10CFC9]/20 flex items-center justify-center text-[#007580]">
                    <Mail className="w-4 h-4 text-[#007580]" />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-400 block font-medium">
                      Investor Relations &amp; PR
                    </span>
                    <a
                      href="mailto:ir@impactenergies.com"
                      className="text-xs md:text-sm font-semibold text-[#007580] hover:underline break-all"
                    >
                      ir@impactenergies.com
                    </a>
                  </div>
                  <p className="text-[13px] md:text-[15px] text-gray-500 leading-snug pt-1">
                    Camarco, 107 Cheapside, London, EC2V 6DN
                  </p>
                </div>

                {/* Registered Office */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm space-y-3">
                  <div className="w-8 h-8 rounded-full bg-[#10CFC9]/20 flex items-center justify-center text-[#007580]">
                    <MapPin className="w-4 h-4 text-[#007580]" />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-400 block font-medium">
                      Registered Office
                    </span>
                    <p className="text-xs md:text-sm font-semibold text-gray-900 leading-snug">
                      27 Old Gloucester Street, London, WC1N 3AX, United Kingdom
                    </p>
                  </div>
                </div>

                {/* Corporate Headquarters */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm space-y-3">
                  <div className="w-8 h-8 rounded-full bg-[#10CFC9]/20 flex items-center justify-center text-[#007580]">
                    <Building2 className="w-4 h-4 text-[#007580]" />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-400 block font-medium">
                      Impact Energies
                    </span>
                    <p className="text-xs md:text-sm font-semibold text-gray-900 leading-snug">
                      2nd Floor, 40 Queen Street, London, EC4R 1DD, United Kingdom
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-200/80 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
                  Send us a message
                </h3>
                <p className="text-xs text-gray-500 font-light mb-6">
                  Fields marked with an asterisk (<span className="text-red-500">*</span>) are required.
                </p>

                {successMessage && (
                  <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{successMessage}</span>
                  </div>
                )}

                {errorMessage && (
                  <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Full name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#10CFC9] bg-[#FAFBF9]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#10CFC9] bg-[#FAFBF9]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Company
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Your organisation"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#10CFC9] bg-[#FAFBF9]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Enquiry type
                      </label>
                      <select
                        value={enquiryType}
                        onChange={(e) => setEnquiryType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#10CFC9] bg-[#FAFBF9] cursor-pointer"
                      >
                        <option value="General enquiry">General enquiry</option>
                        <option value="Investor relations">Investor relations</option>
                        <option value="Media & PR">Media &amp; PR</option>
                        <option value="Partnership & Exploration">Partnership &amp; Exploration</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we assist you?"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#10CFC9] bg-[#FAFBF9] resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-bold text-[#04333A] bg-[#10CFC9] hover:bg-[#0EB5AF] shadow-md transition-all duration-200 disabled:opacity-50 cursor-pointer"
                    >
                      {submitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
