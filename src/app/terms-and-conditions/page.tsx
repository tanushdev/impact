'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Printer, Building2, ShieldCheck } from 'lucide-react';

export default function TermsAndConditionsPage() {
  return (
    <div className="w-full bg-white text-[#141C16]">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[400px] md:min-h-[440px] flex items-center bg-black overflow-hidden pt-28 pb-16">
        <Image
          src="/images/figma/company-hero-bg.jpg"
          alt="Impact Energies Terms & Conditions"
          fill
          priority
          className="object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/35" />

        <div className="relative max-w-[1360px] mx-auto px-6 md:px-12 w-full z-10">
          {/* Breadcrumb */}
          <div className="text-[15px] text-gray-300 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#10CFC9] font-medium">Terms &amp; Conditions</span>
          </div>

          <div className="max-w-3xl text-white">
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-[52px] font-extralight tracking-tight leading-[1.1] mb-4 font-sans"
            >
              Terms &amp; Conditions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-[15px] md:text-base text-gray-200 font-light leading-relaxed max-w-xl"
            >
              Terms and Conditions for Use of the Impact Energies website.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. TERMS CONTENT */}
      <section className="w-full max-w-[1100px] mx-auto px-6 md:px-12 py-16 md:py-24 bg-white">
        <div className="space-y-12 text-[15px] md:text-[16px] text-gray-700 leading-relaxed font-normal">
          
          {/* Section 1 */}
          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
              1. Introduction
            </h2>
            <div className="space-y-3">
              <p>
                <strong className="font-semibold text-gray-900">1.1</strong> These terms &amp; conditions set out the terms between you, the user and us, the website owner.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">1.2</strong> Your use of this website and any service contained within constitutes acceptance of these terms &amp; conditions in full.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">1.3</strong> You should not use this website if you do not agree with these terms &amp; conditions in full.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
              2. Customer Information
            </h2>
            <div className="space-y-3">
              <p>
                <strong className="font-semibold text-gray-900">2.1</strong> You should always check that the contact information you provide is correct before creating an account.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">2.2</strong> You are responsible for maintaining your own username and password, where required, to access your account. You should ensure that you store your username and password securely and that the details required to access your account are not provided to another party.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">2.3</strong> You are responsible for your account and actions taken within it. If you are aware or suspect that your account username and password or other details have become known to a third party, you should inform us immediately.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">2.4</strong> Our website is only intended for use by adults.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">2.5</strong> We reserve the right to restrict or remove your access to this website where you breach these terms and conditions. Such restriction or removal will take place without recourse or explanation to you where we solely deem it appropriate or necessary.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
              3. Privacy
            </h2>
            <p>
              We take your privacy seriously. We are registered under and comply with the Data Protection Act 1998. For further details please see our Privacy Policy.
            </p>
          </div>

          {/* Section 4 */}
          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
              4. Customer Complaints
            </h2>
            <p>
              We endeavour to respond to all complaints or queries within five working days.
            </p>
          </div>

          {/* Section 5 */}
          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
              5. Events Outside Our Control
            </h2>
            <p>
              We shall not be liable for delay or failure to perform any obligation under these terms &amp; conditions if the delay or failure is caused by any circumstances beyond our reasonable control, including, but not limited to, acts of God, war, civil disorder or industrial dispute.
            </p>
          </div>

          {/* Section 6 */}
          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
              6. Licence
            </h2>
            <div className="space-y-3">
              <p>
                <strong className="font-semibold text-gray-900">6.1</strong> We grant you a licence to access the content, information and services contained within our website for personal use only.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">6.2</strong> This licence allows you to download and cache (using your browser) individual pages from our website.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">6.3</strong> This licence does not allow you to download and modify individual pages or substantial parts of our website nor to make our website available via an intranet, where our website or a substantial part of it is hosted locally on the intranet in question.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">6.4</strong> Our website design, layout, content or text cannot be copied, edited or otherwise manipulated without our express prior written permission.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">6.5</strong> Our website cannot be placed within the frame-set of another site.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">6.6</strong> Third parties are not allowed to “deep link” to pages within our website, without our express prior written permission. All links (unless expressly permitted by us) should be to the main index page of our website. Furthermore, the content of such links, whether graphic or text should not be misleading, false, derogatory or in any other way offensive.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">6.7</strong> The restriction on “deep linking” does not apply to affiliate partners or other partners who wish to send users directly to a particular section or page.
              </p>
            </div>
          </div>

          {/* Section 7 */}
          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
              7. Copyright
            </h2>
            <div className="space-y-3">
              <p>
                <strong className="font-semibold text-gray-900">7.1</strong> All content, databases, graphics, buttons, icons, logos, layouts and look &amp; feel are our copyright, unless expressly acknowledged as otherwise.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">7.2</strong> The data mining, extraction or utilisation of product information from our website is not permitted without our express prior written permission.
              </p>
            </div>
          </div>

          {/* Section 8 */}
          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
              8. User Generated Content
            </h2>
            <div className="space-y-3">
              <p>
                <strong className="font-semibold text-gray-900">8.1</strong> Where the facility exists you may provide reviews or public feedback on the website, also known as user-generated content.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">8.2</strong> Where the facility exists such user-generated content can be provided in different formats and mediums; text, audio, video and still photographs.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">8.3</strong> As part of providing this content to us you agree to grant us a worldwide, irrevocable, non-exclusive and royalty-free license to use, distribute, edit, translate and repurpose such content, as we require, including sub-licensing to other parties.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">8.4</strong> Such content shall not infringe the intellectual property rights of any other party. Furthermore the content shall not be illegal or capable of breaching the laws of any jurisdiction in which it may be displayed.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">8.5</strong> We reserve the right to remove any content, which breaches or risks breaching these terms and conditions.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">8.6</strong> However, we shall not assume any responsibility for auditing or monitoring any user generated content.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">8.7</strong> Any complaints about such content by rights holders or any user or visitor to our website should be directed to us using our contact details listed at the end of these terms and conditions.
              </p>
            </div>
          </div>

          {/* Section 9 */}
          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
              9. Limitations and Exclusions of Liability
            </h2>
            <div className="space-y-3">
              <p>
                <strong className="font-semibold text-gray-900">9.1</strong> Where content and information is provided on the website without charge we exclude all liability for such content and information.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">9.2</strong> All business losses (including, but not limited to) loss of profits, income, revenue, damage to goodwill, loss of other commercial contracts, other commercial opportunities are all excluded.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">9.3</strong> All indirect, consequential or special losses or damage are all excluded.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">9.4</strong> All other losses or damages not reasonably foreseeable at the time of the contract between you and us are also excluded.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">9.5</strong> All losses relating to the loss or corruption of data, databases, systems, software or hardware are all excluded.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">9.6</strong> These terms and conditions do not exclude or limit liability for death or personal injury caused by you or us.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">9.7</strong> These terms and conditions do not exclude or limit liability for fraud or fraudulent misrepresentation caused by you or us.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">9.8</strong> These terms and conditions do not exclude or limit liability where this conflicts with the applicable law for this jurisdiction.
              </p>
            </div>
          </div>

          {/* Section 10 */}
          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
              10. Indemnity
            </h2>
            <p>
              By your use of our website you hereby indemnify us and undertake to keep us indemnified at all times now and in the future against all possible claims relating to any breach of these terms and conditions by you. Such indemnities to include, (but not be limited to) all costs legal and otherwise, all other expenses, damages or settlements arising from your breach of these terms and conditions.
            </p>
          </div>

          {/* Section 11 */}
          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
              11. Variation
            </h2>
            <p>
              We reserve the right to vary these terms &amp; conditions at any time, without giving notice to you. Such varied terms and conditions shall automatically apply to the use of our website from the date of publication on our website.
            </p>
          </div>

          {/* Section 12 */}
          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
              12. Assignment
            </h2>
            <p>
              We reserve the right to assign our rights and also our obligations under these terms and conditions, without giving notice to you. This right of assignment shall only apply to us and shall not apply to you in any way.
            </p>
          </div>

          {/* Section 13 */}
          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
              13. Severability
            </h2>
            <p>
              The foregoing paragraphs, sub-paragraphs and clauses of these terms &amp; conditions shall be read and construed independently of each other. Should any part of this agreement or its paragraphs, sub-paragraphs or clauses be found invalid it shall not affect the remaining paragraphs, sub-paragraphs and clauses.
            </p>
          </div>

          {/* Section 14 */}
          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
              14. Waiver
            </h2>
            <p>
              Failure by us to enforce any accrued rights under these terms &amp; conditions is not to be taken as or deemed to be a waiver of those rights by us unless we acknowledge the waiver in writing.
            </p>
          </div>

          {/* Section 15 */}
          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
              15. Third Parties
            </h2>
            <p>
              These terms and conditions are between you and us. They do not apply to, or benefit any third party and are not reliant on any third party.
            </p>
          </div>

          {/* Section 16 */}
          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
              16. Entire Terms &amp; Conditions
            </h2>
            <p>
              These terms &amp; conditions set out the entire agreement and understanding between you and us.
            </p>
          </div>

          {/* Section 17 */}
          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
              17. Your Statutory Rights
            </h2>
            <p>
              Where acting as a consumer your statutory rights are unaffected.
            </p>
          </div>

          {/* Section 18 */}
          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
              18. Jurisdiction
            </h2>
            <p>
              These terms &amp; conditions shall be interpreted, construed and enforced in accordance with English law and shall be subject to the exclusive jurisdiction of the English Courts.
            </p>
          </div>

          {/* Contact Details Card */}
          <div className="p-8 md:p-10 rounded-3xl bg-[#FAFDF4] border border-[#E1ECD4] shadow-xs space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#007580] flex items-center justify-center text-white">
                <Building2 className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Contact Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#6AA335] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900">Impact Energies</h3>
                    <p className="text-gray-600">
                      2nd Floor, 40 Queen Street,<br />
                      London, EC4R 1DD,<br />
                      United Kingdom
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#6AA335] flex-shrink-0" />
                  <a
                    href="mailto:info@impactenergies.com"
                    className="font-medium text-[#007580] hover:underline"
                  >
                    info@impactenergies.com
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#6AA335] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900">Telephone</h3>
                    <p className="text-gray-600">+44(0) 204 617 8881</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E1ECD4] flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600">
                  <p><strong className="text-gray-900">Company Reg:</strong> 17054603</p>
                  <p><strong className="text-gray-900">VAT Reg:</strong> GB 218 668675</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

