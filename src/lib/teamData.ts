export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  cardImage: string;
  photoImage: string;
  category: 'management' | 'executive-director' | 'non-executive-director';
  bioParagraphs: string[];
  education?: string[];
  careerHighlights?: string[];
}

export const managementMembers: TeamMember[] = [
  {
    slug: 'siraj-ahmed',
    name: 'SIRAJ AHMED',
    role: 'CHIEF EXECUTIVE OFFICER',
    cardImage: '/images/figma/siraj-ahmed-card.png',
    photoImage: '/images/team/siraj-ahmed-hd.jpg',
    category: 'management',
    bioParagraphs: [
      'Siraj Ahmed was appointed Chief Executive Officer of Impact in October 2018, having previously served as the company’s General Counsel since 2014. Under his leadership, the company successfully expanded its world-class deepwater exploration portfolio and participated in monumental frontier discoveries offshore Southern Africa, including the historic Venus light-oil discovery in Namibia.',
      'Siraj began his career at international law firm Linklaters LLP in London, qualifying into the firm’s Global Projects team. During his tenure, he advised international oil companies (IOCs), independent operators, and financial institutions on cross-jurisdictional acquisitions, farm-ins, joint ventures, and capital-raising projects across Europe, Africa, and the Middle East.',
      'He holds an LLB Honours degree in Law from Cardiff University and is a qualified solicitor in England and Wales. He also serves as a Director on the Board of Africa Energy Corp.',
    ],
    education: [
      'LLB Honours in Law – Cardiff University',
      'Qualified Solicitor of the Senior Courts of England and Wales',
    ],
    careerHighlights: [
      'Chief Executive Officer, Impact Energies & Impact Oil & Gas (2018–Present)',
      'General Counsel, Impact Oil & Gas (2014–2018)',
      'Global Projects & Energy Associate, Linklaters LLP (London)',
      'Director, Africa Energy Corp. (June 2021–Present)',
    ],
  },
  {
    slug: 'samitanjayah-sharma',
    name: 'SAMITANJAYAH SHARMA',
    role: 'CHIEF FINANCIAL OFFICER',
    cardImage: '/images/figma/samitan-sharma-card.png',
    photoImage: '/images/team/samitan-sharma-hd.jpg',
    category: 'management',
    bioParagraphs: [
      'Samitanjayah Sharma brings over 22 years of multi-sector leadership in banking, investments, corporate finance, and commercial management within the upstream oil and gas industry. He joined Impact as Chief Financial Officer and Executive Director, driving the commercial and financial strategy for deepwater asset appraisal and portfolio maturation.',
      'Prior to joining Impact, Samitanjayah served as Commercial Manager for Business Development at Tullow Oil (2021–2025). He previously spent over eight years at Delonex Energy Ltd (2013–2021) directing commercial management, asset valuation, and joint-venture negotiations across Africa and Asia.',
      'He began his career as an investment banker at HSBC before working as a buy-side investment analyst with Fidelity. He holds an Instrumentation Engineering degree and an MBA in Finance and Marketing.',
    ],
    education: [
      'MBA in Finance and Marketing',
      'Bachelor of Engineering (Instrumentation Engineering)',
    ],
    careerHighlights: [
      'Chief Financial Officer & Executive Director, Impact (2025–Present)',
      'Commercial Manager – Business Development, Tullow Oil (2021–2025)',
      'Commercial Manager, Delonex Energy Ltd (2013–2021)',
      'Senior Manager – Commercial & Strategy, Cairn Energy (2008–2013)',
      'Investment Banker, HSBC & Buy-Side Analyst, Fidelity',
    ],
  },
  {
    slug: 'bjorn-ribesen',
    name: 'BJØRN THORE RIBESÉN',
    role: 'OPERATIONS',
    cardImage: '/images/figma/bjorn-ribesen-card.png',
    photoImage: '/images/figma/bjorn-ribesen-card.png',
    category: 'management',
    bioParagraphs: [
      'Bjørn Thore Ribesén oversees Operations at Impact Energies, bringing extensive international technical and operational expertise in offshore drilling campaigns, deepwater project execution, and subsurface risk management.',
      'With decades of operational experience in frontier basins across West and Southern Africa, the North Sea, and Southeast Asia, Bjørn ensures rigorous technical excellence, environmental safety, and operational adherence alongside global joint-venture operators.',
    ],
    education: [
      'Degree in Petroleum Engineering & Offshore Technology',
    ],
    careerHighlights: [
      'Head of Operations, Impact Energies',
      'Extensive senior operational leadership in deepwater offshore exploration campaigns',
    ],
  },
  {
    slug: 'ayesha-khokhar',
    name: 'AYESHA KHOKHAR',
    role: 'LEGAL & COMPANY SECRETARY',
    cardImage: '/images/figma/ayesha-khokhar-card.png',
    photoImage: '/images/figma/ayesha-khokhar-card.png',
    category: 'management',
    bioParagraphs: [
      'Ayesha Khokhar heads Legal and serves as Company Secretary at Impact Energies. She is responsible for group corporate governance, statutory compliance, legal structuring, joint-venture operating agreements, and regulatory engagements across the company’s exploration licences.',
      'Ayesha has advised extensively on complex international energy transactions, upstream farm-out agreements, PSC concessions, and compliance with English and international corporate law.',
    ],
    education: [
      'LLB Law Honours',
      'Qualified Solicitor in England and Wales',
    ],
    careerHighlights: [
      'Legal & Company Secretary, Impact Energies',
      'Senior Corporate & Upstream Energy Legal Counsel',
    ],
  },
];

export const boardMembers: TeamMember[] = [
  {
    slug: 'siraj-ahmed',
    name: 'SIRAJ AHMED',
    role: 'CHIEF EXECUTIVE OFFICER',
    cardImage: '/images/figma/siraj-ahmed-card.png',
    photoImage: '/images/team/siraj-ahmed-hd.jpg',
    category: 'executive-director',
    bioParagraphs: [
      'Siraj Ahmed was appointed Chief Executive Officer in October 2018, having previously served as General Counsel since 2014. Under his leadership, the company successfully expanded its world-class deepwater exploration portfolio and participated in groundbreaking frontier discoveries offshore Southern Africa, including the Venus discovery in Namibia.',
      'He began his career at Linklaters LLP in London in the Global Projects team, advising international oil companies on cross-border energy transactions, acquisitions, and joint ventures.',
      'Siraj holds an LLB Honours degree in Law from Cardiff University and is a qualified solicitor in England and Wales. He also serves as a Director on the Board of Africa Energy Corp.',
    ],
    education: [
      'LLB Honours in Law – Cardiff University',
      'Qualified Solicitor in England and Wales',
    ],
    careerHighlights: [
      'Chief Executive Officer, Impact (2018–Present)',
      'General Counsel, Impact (2014–2018)',
      'Global Projects Associate, Linklaters LLP',
      'Director, Africa Energy Corp. (2021–Present)',
    ],
  },
  {
    slug: 'samitanjayah-sharma',
    name: 'SAMITANJAYAH SHARMA',
    role: 'CHIEF FINANCIAL OFFICER',
    cardImage: '/images/figma/samitan-sharma-card.png',
    photoImage: '/images/team/samitan-sharma-hd.jpg',
    category: 'executive-director',
    bioParagraphs: [
      'Samitanjayah Sharma brings over 22 years of multi-sector leadership in banking, investments, corporate finance, and commercial management within the upstream energy industry. He joined Impact as Chief Financial Officer and Executive Director.',
      'Prior to Impact, Samitanjayah served as Commercial Manager for Business Development at Tullow Oil (2021–2025) and spent over eight years at Delonex Energy Ltd (2013–2021) directing commercial management and asset valuations across Africa and Asia.',
      'He began his career at HSBC and Fidelity, holding an Instrumentation Engineering degree and an MBA in Finance and Marketing.',
    ],
    education: [
      'MBA in Finance and Marketing',
      'Bachelor of Engineering (Instrumentation Engineering)',
    ],
    careerHighlights: [
      'Chief Financial Officer & Executive Director, Impact (2025–Present)',
      'Commercial Manager, Tullow Oil (2021–2025)',
      'Commercial Manager, Delonex Energy (2013–2021)',
      'Senior Manager, Cairn Energy (2008–2013)',
    ],
  },
  {
    slug: 'johnny-copelyn',
    name: 'JOHNNY COPELYN',
    role: 'NON-EXECUTIVE CHAIRMAN',
    cardImage: '/images/figma/johnny-copelyn-card.png',
    photoImage: '/images/team/johnny-copelyn.jpg',
    category: 'non-executive-director',
    bioParagraphs: [
      'John Anthony (Johnny) Copelyn has served on the Board of Impact since 2014 and was appointed Non-Executive Chairman in May 2020. He is the Chief Executive Officer of Hosken Consolidated Investments Limited (HCI), a major JSE-listed black economic empowerment investment holding company and Impact’s largest shareholder.',
      'A former general secretary of the Southern African Clothing and Textile Workers Union (SACTWU) and Member of Parliament in South Africa’s first democratic post-apartheid Parliament (1994–1997), Johnny transitioned to corporate leadership in 1997, building HCI into a premier diversified investment group.',
      'He chairs several JSE-listed companies including eMedia Holdings, Southern Sun Limited, and Deneb Investments, and sits on the Board of Africa Energy Corp.',
    ],
    education: [
      'BA (Honours) – University of the Witwatersrand',
      'BProc – University of South Africa',
    ],
    careerHighlights: [
      'Non-Executive Chairman, Impact (2020–Present; Director since 2014)',
      'Chief Executive Officer, Hosken Consolidated Investments (HCI) (1997–Present)',
      'Member of Parliament, National Assembly of South Africa (1994–1997)',
      'Chairman of eMedia Holdings, Southern Sun, and Deneb Investments',
    ],
  },
  {
    slug: 'rob-nicolella',
    name: 'ROB NICOLELLA',
    role: 'NON-EXECUTIVE DIRECTOR',
    cardImage: '/images/figma/rob-nicolella-card.png',
    photoImage: '/images/team/rob-nicolella.jpg',
    category: 'non-executive-director',
    bioParagraphs: [
      'Robert (Rob) Nicolella is a Non-Executive Director of Impact and serves as a member of the Audit and Compliance Committee. He is the Financial Director of Hosken Consolidated Investments Limited (HCI) and the Chief Executive Officer of Africa Energy Corp.',
      'Rob spent 18 years at Investec Bank Limited, heading up the Corporate Banking / Structured Finance division and Private Banking for the Western Cape. He joined HCI in 2011 to manage and expand the group’s property and investment portfolio before his appointment to the executive board.',
      'He holds a Bachelor of Accounting Science and Honours in Accounting Science, is a registered Chartered Accountant (CA [SA]) since 1994, and attended Harvard University’s executive leadership program.',
    ],
    education: [
      'BCompt and BCompt (Honours) – University of South Africa',
      'Chartered Accountant (CA [SA])',
      'Executive Leadership Development – Harvard University',
    ],
    careerHighlights: [
      'Non-Executive Director, Impact',
      'Financial Director, Hosken Consolidated Investments (HCI) (2019–Present)',
      'Chief Executive Officer, Africa Energy Corp.',
      'Division Head, Investec Bank Limited (18 years)',
    ],
  },
];
