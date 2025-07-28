# Inisialisasi 2025 Landing Page - UI Layout Specification

## Overall Design System

**Color Palette:**
- Primary Background: Dark Blue (#0A1428 or similar deep blue)
- Secondary Background: Slightly lighter dark blue (#1A2332)
- Primary Text: White (#FFFFFF)
- Accent Text: Light Blue (#4FC3F7 or similar cyan)
- Interactive Elements: Light Blue (#4FC3F7)
- Grid Pattern: Subtle light blue lines with low opacity

**Typography:**
- Font Family: Sacco (custom font from /public folder)
- Font Weights: Regular (400), Medium (500), Bold (700)
- Letter Spacing: Slightly increased for headings
- Text Transform: Uppercase for navigation and headings

**Layout:**
- Full-width responsive design
- Centered content containers with max-width
- Consistent vertical spacing between sections
- Grid-based background pattern throughout

---

## 1. Hero Section

### Navigation Bar
**Position:** Fixed at top, full-width
**Background:** Transparent with subtle backdrop blur
**Height:** 80px
**Padding:** 0 2rem

**Left Side:**
- Logo/Brand: "INISIALISASI 2025"
- Font: Bold, white, uppercase
- Font Size: 1.5rem

**Right Side:**
- Navigation Items: Horizontal flex layout
- Items: "HOME", "TATA TERTIB", "BERITA & PENGUMUMAN"
- Font: Medium, white, uppercase
- Font Size: 0.9rem
- Letter Spacing: 0.1em
- Hover Effect: Light blue color transition

**Login Button:**
- Background: Light blue (#4FC3F7)
- Text: "LOG IN" (white, uppercase, bold)
- Padding: 0.75rem 1.5rem
- Border Radius: 8px
- Hover Effect: Slightly darker blue

### Hero Content
**Position:** Centered vertically and horizontally
**Background:** Dark blue with subtle grid pattern
**Grid Pattern:** Light blue lines converging towards bottom center (3D perspective effect)

**Main Headline:**
- Container: Centered, max-width 800px
- Line 1: "ARE YOU READY TO" (white, uppercase, 2rem)
- Line 2: "INITIALIZE" (light blue, uppercase, 4rem, bold)
- Letter Spacing: 0.2em
- Vertical Spacing: 1rem between lines

**Central Graphic:**
- Position: Below headline, centered
- Size: 300px × 400px
- Content: White silhouette of person with fedora and bow tie
- Face Area: "[ INISIALISASI ]" in white text within brackets
- Style: Minimalist, geometric silhouette

---

## 2. About Section

### Background Setup
**Main Background:** Dark blue (#0A1428)
**Overlay Image:** Crowd of students (semi-transparent, heavily blurred)
**Masking Effect:** Elliptical mask with blur

### Elliptical Masking Details
**Mask Shape:** Ellipse covering lower 2/3 of section
**Mask Properties:**
- Width: 100% of container
- Height: 60% of section height
- Position: Bottom-aligned
- Border Radius: 50% 50% 0 0 (top-left, top-right, bottom-right, bottom-left)
- Overflow: Hidden

**Blur Effect:**
- Backdrop Filter: blur(20px)
- Opacity: 0.3
- Blend Mode: Overlay

### Content Layout
**Container:** Centered, max-width 900px, padding 4rem 2rem

**Title Section:**
- Text: "WHAT IS INISIALISASI"
- Font: Bold, uppercase, 2.5rem
- Color: "WHAT IS" (white), "INISIALISASI" (light blue)
- Letter Spacing: 0.15em
- Margin Bottom: 3rem

**Description Text:**
- Content: Indonesian text about Inisialisasi
- Font: Regular, 1.1rem
- Color: White
- Line Height: 1.6
- Text Alignment: Left within centered container
- Width: 70% of container
- Background: None (transparent)

---

## 3. Guidelines Section

### Background Frame
**Container:** Full-width section
**Background Image:** Futuristic digital interface frame
**Frame Style:** Angular, notched cutouts on top and bottom edges
**Frame Properties:**
- Border: Light blue (#4FC3F7), 2px
- Border Radius: 12px (with angular cutouts)
- Background: Slightly lighter dark blue (#1A2332)
- Internal Lines: Small rectangular elements along vertical edges
- Position: Centered, max-width 1000px

### Content Layout
**Title:**
- Text: "INISIALISASI 2025 RULES"
- Font: Digital/blocky sans-serif, light blue
- Font Size: 2.5rem
- Position: Centered at top
- Decorative Lines: Thin horizontal lines above and below title

**Rules List:**
- Container: Inside frame, padding 3rem
- Format: Numbered list (1-11)
- Font: Regular sans-serif, white
- Font Size: 1rem
- Line Height: 1.5
- Alignment: Left-aligned
- Spacing: 1rem between items

**Rules Content:**
1. Arrival time requirement (30 minutes early)
2. Uniform compliance
3. ID card and attributes
4. Point deduction for non-compliance
5. Late arrival penalties
6. Mandatory participation
7. 80% attendance requirement
8. Prohibited weapons
9. Prohibited substances
10. Dress code restrictions
11. Activity participation requirement

---

## 4. Outfit Section

### Layout Structure
**Container:** Full-width section, padding 4rem 2rem
**Background:** Dark blue with subtle grid pattern

**Title:**
- Text: "INISIALISASI 2025 OUTFIT"
- Font: Bold, uppercase, 2.5rem
- Color: "INISIALISASI 2025" (white), "OUTFIT" (light blue)
- Position: Centered, margin bottom 3rem

### Image Carousel
**Container:** Centered, max-width 1200px
**Carousel Type:** Horizontal sliding with navigation dots

**Carousel Items (3 slides):**

**Slide 1 - Male Dress Code:**
- Background: Dark blue
- Left Side: Vertical "PUTRA" text (white, bold, stacked)
- Center: Male figure illustration (white silhouette)
- Right Side: 7 dress code rules with connecting lines
- Interactive Points: White dots on figure with connecting lines to rules
- Bottom: Pagination dots (3 dots, middle active)

**Slide 2 - Female Dress Code:**
- Similar layout to Slide 1
- Left Side: Vertical "PUTRI" text
- Center: Female figure illustration
- Right Side: Female-specific dress code rules
- Same interactive elements and pagination

**Slide 3 - Accessories & Details:**
- Layout: Grid of accessory illustrations
- Content: ID cards, belts, shoes, socks, etc.
- Style: White line drawings on dark blue
- Interactive: Hover effects on each item

**Carousel Navigation:**
- Dots: 3 white dots, bottom center
- Active State: Larger/more prominent dot
- Hover Effects: Light blue on hover

---

## 5. Criteria Section

### Layout Structure
**Container:** Full-width section, padding 4rem 2rem
**Background:** Dark blue with grid pattern

**Title:**
- Text: "INISIALISASI 2825 POINTS RULE"
- Font: Wide sans-serif, light blue with glow effect
- Font Size: 2.5rem
- Position: Centered, margin bottom 3rem
- Special Effect: Glowing text with light blue aura

### Content Layout
**Main Container:** Two-column layout, max-width 1200px

**Left Column - Lateness Rules:**
- Background: Dark blue rectangle
- Title Bar: Light blue background, "Pengurangan poin keterlambatan mengikuti acara"
- Content: 4 bullet points with point deductions
- Format: "Scenario → Deduction amount"
- Border: Glowing blue and purple lines
- Decorative: Vertical dashed line on left edge, 3 glowing circles at bottom

**Right Column - Violation Rules:**
- Background: Dark blue rectangle
- Title Bar: Light blue background, "Pelanggaran selama acara"
- Icon: Stylized 'X' in top-right corner
- Content: 3 bullet points with consequences
- Border: Glowing blue and purple lines
- Decorative: Vertical dashed line on right edge

**Bottom Section - Graduation Requirements:**
- Position: Below two columns, full width
- Background: Dark blue rectangle with gradient title bar
- Title: "Syarat Kelulusan" (white text on blue-purple gradient)
- Content: Single sentence about 3000 point requirement
- Border: Glowing blue and purple lines
- Decorative: Diagonal line accents

---

## 6. Footer Section

### Layout Structure
**Container:** Full-width section, padding 2rem
**Background:** Dark blue with subtle grid pattern

### Content Layout
**Top Section - Social Media:**
- Position: Top-left area
- Content: "Instagram Inisialisasi" text
- Icon: Instagram logo (white outline)
- Layout: Text above icon, left-aligned
- Spacing: 1rem between text and icon

**Bottom Section - Copyright:**
- Position: Bottom center
- Content: "© 2025 Inisialisasi - D4 Teknik Informatika"
- Font: Regular, white, 0.9rem
- Alignment: Center-aligned

### Social Media Icons
**Instagram Icon:**
- Style: White outline
- Shape: Square with rounded corners
- Inner Elements: Circle in center, small dot in upper-right of circle
- Size: 24px × 24px
- Hover Effect: Light blue fill

---

## Responsive Design Considerations

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

**Mobile Adaptations:**
- Navigation: Hamburger menu
- Hero: Stacked text, smaller font sizes
- About: Single column, reduced padding
- Guidelines: Full-width frame, smaller text
- Outfit: Single slide view, swipe navigation
- Criteria: Stacked columns
- Footer: Centered layout

**Interactive Elements:**
- Hover states for all clickable elements
- Smooth transitions (0.3s ease)
- Focus states for accessibility
- Loading states for carousel

---

## Mock Images Required

1. **Hero Section:** Person silhouette with fedora and bow tie
2. **About Section:** Crowd of students (blurred background)
3. **Guidelines Section:** Futuristic digital frame border
4. **Outfit Section:** 
   - Male figure illustration
   - Female figure illustration
   - Accessory illustrations (ID card, belt, shoes, etc.)
5. **Criteria Section:** Stylized 'X' icon, glowing border elements
6. **Footer Section:** Instagram logo outline

## Technical Implementation Notes

**Font Implementation:**
- Sacco font files located in /public folder
- Use @font-face to load custom font family
- Fallback to system sans-serif fonts

**CSS Features:**
- CSS Grid for layout
- Flexbox for alignment
- CSS Custom Properties for theming
- Backdrop filters for blur effects
- CSS animations for transitions
- Clip-path for complex shapes

**Next.js Components:**
- Layout component for consistent structure
- Navigation component with mobile menu
- Carousel component for outfit section
- Section components for each major area
- Footer component with social links

**Performance Considerations:**
- Lazy loading for images
- Optimized image formats (WebP)
- Minimal JavaScript for interactions
- CSS-only animations where possible 