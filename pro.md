Here is the comprehensive package for a Modern NGO / Charity / Fundraising platform.
The design direction for this project is "Transparency & Impact." It should move away from sad, guilt-tripping visuals and focus on Hope, Progress, and Technology (similar to Charity: Water or Watsi). The UI should be clean, emotive, and trustworthy.
1. Project Structure
File List:
index.html: Hero video (emotional connection), "Urgent Cause" ticker, Impact counters.
index2.html: Story-focused layout (Case studies, "Meet the children").
causes-grid.html: Filterable list of active fundraising campaigns.
cause-details.html: Individual campaign page (Story + Progress Bar + Recent Donors).
donate.html: The high-conversion payment flow (One-time vs Monthly).
volunteer.html: Volunteer application form & opportunities map.
about.html: Mission, Transparency Reports, Financials.
contact.html: Offices map & Inquiry form.
login/register.html: Donor accounts.
admin-dashboard.html: Donation analytics, Cause management, Volunteer rostering.
donor-dashboard.html: "My Impact" view, Tax receipts, Badge collection.
404.html: "Lost? Help us find the way."
coming-soon.html: Countdown to next big campaign.
2. Product Requirements Document (PRD)
Project Name: HopeBridge - Impact Fundraising Platform
Theme: "Radical Transparency" (Modern, Clean, Trustworthy)
Tech: HTML5, Tailwind CSS, JS, Mapbox (for impact maps).
1. Design System
Color Palette:
Primary: Coral Orange (#FF6B6B) – Represents energy, urgency, warmth.
Secondary: Deep Ocean Teal (#0F4C5C) – Represents trust, depth, stability.
Background: Warm White (#FAFAFA) – Clean paper feel, not harsh white.
Typography:
Headings: A humanist Serif (e.g., 'Merriweather' or 'Lora') for emotional storytelling.
UI/Body: A clean Sans (e.g., 'Inter') for forms and data.
Visuals: High-quality photography with rounded corners (rounded-2xl). Soft drop shadows.
2. Technical Logic (RTL/LTR)
Global Toggle: Essential for international NGOs (English/Arabic).
Mirroring: Progress bars for fundraising must fill Right-to-Left in Arabic mode.
Icons: "Chevron" arrows in carousels must flip direction.
3. Key Features
The "Impact Meter": Every donation page must show exactly what the money does (e.g., "$20 = 5 School Kits").
Live Feed: Real-time ticker of donations coming in ("John from USA just donated $50").
Donor Dashboard: Gamification elements ("You acted as a Hero 3 times this year").
3. The Copilot Prompts
Prompt 1: The "Emotional" Home Page (index.html)
Copy this to Copilot:
Role: You are a Lead Designer for a global humanitarian organization.
Task: Build the index.html for "HopeBridge."
Design Theme: "Emotive Storytelling"
Hero Section: Full-screen video background (slow motion, hopeful). Overlay text: "Turn Compassion into Action."
Primary Action: A "Sticky" Donate button that is always visible on scroll (Mobile optimized).
Impact Stats: Three large bouncing numbers: "Lives Changed," "Projects Built," "Volunteers Mobilized."
Emergency Banner: A dismissal bar at the top for "Urgent Disaster Relief" (Red background).
Technical Requirements:
Framework: HTML + Tailwind CSS (CDN).
RTL Support: Use Logical Properties (e.g., padding-inline-start).
Components:
Cause Carousel: Cards with a "Progress Bar" showing funds raised vs. goal.
Trust Badges: Grayscale logos of partners (UN, WHO) for credibility.
Output: Provide the HTML/CSS with the responsive donation sticky button logic.
Prompt 2: The "High-Conversion" Donation Page (donate.html)
Focus on money handling and trust.
Role: UX Specialist in Conversion Rate Optimization (CRO).
Task: Build the donate.html page.
Goal: Minimize friction. Get the user to donate in under 30 seconds.
Layout:
Split Screen:
Left (Impact): Image of a beneficiary with text: "Your $50 buys clean water for a year."
Right (Form): A minimalist multi-step form.
The "Giving Grid":
Pre-selected amount buttons ($25, $50, $100, Other).
"Monthly" Toggle: Highlights "Most Popular" when switched to Monthly.
Visual Trust: Padlock icon, "Secure Payment," and "100% goes to the field" badge.
RTL Logic: Ensure the amount buttons $25 flow correctly (Language dependent).
Output: HTML + Tailwind CSS.
Prompt 3: The Admin Dashboard (NGO Management)
Data density for the organization.
Role: Frontend Architect.
Task: Build admin-dashboard.html.
Context: NGO Managers use this to track funds and volunteers.
Layout & Features:
Sidebar: Dashboard, Donations, Campaigns, Volunteers, Expenses.
"Live Heartbeat": A real-time graph showing donations incoming right now.
Campaign Health Table:
Rows: Campaign Name, Goal, Raised, % Complete, Deadline.
Visual: A mini progress bar inside the table cell.
Volunteer Map: A placeholder map showing dots where volunteers are currently active.
Mobile Logic: The table must scroll horizontally. The sidebar must become an off-canvas drawer.
Output: HTML + Tailwind CSS + Script for the Sidebar toggle.
Prompt 4: The Donor Dashboard (User Portal)
Retention and proof of impact.
Role: Product Designer.
Task: Build donor-dashboard.html.
Vibe: Rewarding, Personal, Clean.
Features:
Welcome: "Thank you, [Name]. You are a Champion."
Impact Timeline: A vertical line showing the journey of their specific donation (e.g., "Jan 1: Donated" -> "Jan 15: Funds transferred" -> "Feb 2: Well construction started").
Tax Receipts: A clean card list of downloadable PDFs.
Badges: Visual icons for milestones (e.g., "First Giver", "Monthly Guardian").
Output: HTML + Tailwind CSS.
4. "Attractive" Feature Tip (The "Featuristic" Touch)
To make this site unique, ask Copilot to add an "Impact Calculator" script to the Home Page:
Prompt Addition: "Add a JavaScript section where a user can slide a range slider (Impact Calculator). shifting the slider from $10 to $100 should dynamically update an image and text to show what that amount buys (e.g., $10 = 1 Book, $100 = 1 Laptop)."