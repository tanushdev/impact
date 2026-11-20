# Impact Energies International Limited - Fullstack Web Application

A fullstack web application for **Impact Energies International Limited**, built with **Next.js (App Router)**, **React**, **Tailwind CSS**, **MongoDB (Mongoose)**, and **Brevo (Sendinblue)** transactional email integration.

---

## 🚀 Pages Included

1. **Home (`/`)**:
   - Hero slider with "Powering Progress. Exploring Potential."
   - 4 Global Stats (76,000+ Km², 24.1 B Barrels, 4.2 M Barrels/day, 100% Operational)
   - Interactive African & Global Asset Map (Namibia, Cote d'Ivoire, Senegal, South Africa)
   - Latest Announcements Accordion
   - Corporate Responsibility & Sustainability Section
   - Gradient "Connect with Us Now" CTA banner
   - Full corporate footer with asset breakdown, quick links, contact info, and watermark

2. **About Us (`/about`)**:
   - "Built on Expertise. Focused on the Future." hero section
   - "Built on Strength. Driven by Innovation." company overview & stats
   - Featured deepwater drilling rig installation
   - "Our mission" & "Our vision" cards
   - "What guides our work" (Integrity, Safety, Innovation, Commitment)

3. **News & Media (`/news`)**:
   - Category filtering (All Updates, Latest News, Latest Announcement) & Year selector
   - Dynamic news feed loaded from MongoDB
   - Expandable announcement cards with direct links to full articles
   - "Resources for the press" (Press releases, Brand assets download, Image library, Media enquiries)

4. **News Article Detail (`/news/[id]`)**:
   - Full press announcement: *"Strategic reorganisation to unlock value and drive targeted investment"*
   - 2-Column editorial layout with technical operational data on Block 2912 offshore Namibia and South African asset portfolio
   - Context imagery and strategic rationale breakdown

5. **Careers (`/careers`)**:
   - "Build Your Career With Impact" intro & value pillars (Meaningful work, Growth and learning, Safety first)
   - Active job openings (Senior Petroleum Geoscientist, Offshore Drilling Engineer, HSE Advisor, Graduate Programme)
   - Expandable role responsibilities & requirements
   - Interactive **"+ Apply" Modal** connected directly to the backend MongoDB application database and Brevo HR notification system
   - "Send Open Application" workflow for speculative candidates

6. **Contact Us (`/contact`)**:
   - Dark corporate aesthetic matching Figma specifications
   - Corporate headquarters, registered office, media relations (Camarco), and company secretarial contacts
   - Interactive **"Send us a message"** contact form:
     - Form validation
     - Direct storage in MongoDB (`Contact` collection)
     - Automated email notification to the administration team using **Brevo**

---

## 🛠️ Backend API Endpoints

- `POST /api/contact` - Validates input, saves inquiries into MongoDB, and dispatches an email via Brevo.
- `GET /api/careers` - Fetches active job openings from MongoDB.
- `POST /api/careers/apply` - Submits a candidate job application, records it in MongoDB, and alerts HR via Brevo.
- `GET /api/news` - Fetches news & press releases with category & year query filters from MongoDB.
- `GET /api/news/[id]` - Fetches individual article details.
- `POST /api/seed` - Pre-seeds initial jobs and press releases into MongoDB.

---

## ⚙️ Environment Configuration (`.env.local`)

Create or update `.env.local` with your credentials:

```bash
# MongoDB Connection URI (Local or MongoDB Atlas)
MONGODB_URI=mongodb://localhost:27017/impact_oil_gas

# Brevo (Sendinblue) Transactional Email Key
BREVO_API_KEY=xkeysib-your-brevo-api-key-here

# Brevo Verified Sender
BREVO_SENDER_EMAIL=info@impactoilandgas.com
BREVO_SENDER_NAME=Impact Energies International

# Admin / HR Notification Recipient
ADMIN_NOTIFICATION_EMAIL=info@impactoilandgas.com
```

> **Note:** If `BREVO_API_KEY` is not provided or running offline, the application automatically enters development simulation mode — logging submissions to the console and returning successful responses so that testing is completely uninterrupted.

---

## 🏃 Running the Application

### Development Server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build:
```bash
npm run build
npm run start
```

