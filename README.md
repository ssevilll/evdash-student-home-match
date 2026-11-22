# Evdash Student Home Match

# EvDash — Branding Update & Frontend Development Priorities

I have attached the official EvDash logo. Use it as the primary reference for the entire website's visual identity.

## 1. Official EvDash Branding

The attached logo is our official branding and must be used in the website header, authentication pages, and footer.

**Brand colors:**
- Primary: Warm orange/coral, inspired by the "Ev" portion of our logo (approximately #E35D3F).
- Secondary: Deep black (#111111), inspired by the "Dash" portion.
- Background: Soft white (#FAFAFA).
- Supporting colors: Light gray and subtle warm neutral shades.

**IMPORTANT — Color gradient:**

Use the exact visual character of the orange/coral gradient visible in the attached logo.

Create a consistent gradient transitioning from a deeper burnt orange to a lighter coral orange.

Suggested gradient:

`linear-gradient(135deg, #D84A30 0%, #E96743 50%, #F18A64 100%)`

These are approximate starting colors. Prioritize matching the attached logo visually.

Use this gradient for:
- Primary call-to-action buttons.
- Hero section accents.
- Selected navigation states.
- Important feature icons.
- Roommate compatibility indicators.
- Subscription highlights.
- Subtle hover effects.

Do not make the entire interface orange. Keep backgrounds predominantly white, with black text and intentional coral accents.

**Typography:** Modern, clean, professional, and readable. Use Inter or a similar font.

**Overall feeling:** Modern, friendly, minimal, premium, and student-oriented. Avoid generic AI-generated landing-page aesthetics.

Maintain consistent border radii, spacing, card design, hover states, and typography across every page.

---

## 2. Development Priority — EXTREMELY IMPORTANT

**PUBLIC-FACING MAIN PAGES ARE THE HIGHEST PRIORITY. BUILD THEM FIRST.**

Do not start by building the student dashboard, landlord dashboard, admin panels, authentication backend, or payment processing.

First, build the actual website that visitors will interact with before logging in.

The public pages must be visually polished, fully connected, responsive, and functional before proceeding to internal dashboards.

### PHASE 1 — PUBLIC PAGES (HIGHEST PRIORITY)

Build in this order:

**1. Homepage (`/`)**

This must be the most visually impressive page.

Include:
- Official EvDash logo in the header.
- Modern sticky navigation.
- Beautiful hero section with housing search.
- University selection in the main search.
- Featured apartment listings.
- Attractive property cards displaying prices, locations, nearby universities, room counts, and availability.
- "How EvDash Works" section.
- Dedicated roommate-matching promotional section.
- Personalized "For You" property recommendations near the bottom.
- Student subscription offers immediately before the footer.
- Complete professional footer.

The homepage should immediately communicate that EvDash is both a student housing platform and a roommate-matching service.

**2. Homes Listing Page (`/homes`)**

Build a complete rental marketplace interface.

Prioritize:
- Attractive apartment cards with high-quality photos.
- Price and university distance clearly visible.
- Filtering controls at the top of the listing area.
- University-based filtering.
- Price range, district, amenities, room count, and roommate availability filters.
- Sorting functionality.
- Wishlist heart buttons.
- Responsive grid layout.

Use realistic fictional apartments in Baku.

**3. Property Details Page (`/homes/:id`)**

Build an attractive and information-rich property details experience.

Include:
- Multi-image property gallery.
- Apartment description.
- Monthly price and deposit.
- Amenities.
- Location and nearby universities.
- Available roommate spots.
- Landlord information.
- Existing student tenants and their roommate preferences, when applicable.
- Roommate compatibility indicators.
- Property reviews.

Two prominent action buttons:

**"Ev sahibi ilə məsləhətləş"**

**"İstək siyahısına əlavə et"**

When consultation is clicked on a shared property with an existing tenant, first display the compatibility requirements popup.

The popup should show the existing tenant's approved living preferences and ask the student to acknowledge them before continuing.

**4. Roommate Matching Page (`/roommates`)**

This is one of EvDash's most important differentiating features.

Create an attractive dedicated roommate discovery experience.

Show:
- Student roommate profiles.
- Universities.
- Preferred rental budgets.
- Lifestyle habits.
- Sleep schedules.
- Cleanliness preferences.
- Compatibility percentages.
- Matching preference explanations.

Provide a clear call to action to create or update a roommate profile.

If users are not logged in, allow them to explore public information and ask them to log in before sending requests.

**5. Wishlist Page (`/wishlist`)**

Build a functional wishlist page containing saved properties.

The wishlist icon must also appear in the global header.

**6. Subscription Page (`/subscriptions`)**

Create a modern subscription page featuring:

**EvDash Student — 10 AZN / ay**

Explain the benefits of advanced roommate matching, personalized recommendations, and premium student housing tools.

Use our coral gradient for important subscription highlights.

---

## 3. Public Navigation and User Experience

All Phase 1 pages must connect properly.

Users should be able to navigate:

Homepage → Homes → Property Details → Wishlist

Homepage → Roommate Matching → Student Profile Preview

Homepage → Subscription Offers → Subscription Page

Use consistent headers, footers, loading states, empty states, and animations.

No dead buttons or placeholder navigation.

For features requiring authentication, display a professional login or signup modal rather than taking users to unfinished dashboard pages.

Make the public experience completely responsive, with special attention to mobile cards, filters, galleries, and navigation.

---

## 4. PHASE 2 — User Workflows

Only after the public pages are polished and functional, proceed with:

1. Student login and registration.
2. Student profile and preferences.
3. Roommate compatibility calculations.
4. Consultation request submission and notification simulation.
5. In-app chat.
6. Student dashboard.
7. Landlord dashboard and listing management.
8. Payments and subscriptions.

Maintain the same design system throughout.

---

## 5. Quality Requirements

Do not sacrifice the quality of the public website just to implement more features.

Prioritize:
- High-quality apartment images.
- Visually balanced property cards.
- Clear information hierarchy.
- Realistic Azerbaijani content.
- Smooth and purposeful interactions.
- Excellent mobile responsiveness.
- Consistent EvDash gradient and branding.
- Accessible buttons, forms, and navigation.

The website must look like a real, credible, well-funded student housing startup rather than a generic admin template.

**IMPORTANT FINAL INSTRUCTION:**

Start with Phase 1. Build and polish all six public-facing pages first. Use the attached EvDash logo and its orange/coral gradient as the visual foundation. Do not prioritize dashboards or backend functionality until the main public user experience is complete.

Preserve the detailed functionality and business requirements from my previous EvDash prompt. This instruction changes the development order and visual branding, not the overall product scope.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a6fbe8ae-7711-4915-be3f-6d462ae814c6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
