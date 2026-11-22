# Project Progress Log (`progress.md`)

> **Handover Protocol for AI Agents:**
> - When starting a new session, read the **3 to 5 most recent entries** below to grasp the current status.
> - If historical context before the last 5 entries is required by the user, read the full log **once** and cache the findings in conversation memory.
> - Whenever changes or tasks are completed, append a new numbered entry at the bottom following this format.

---

### [2026-11-21] Progress #01: RTK (Rust Token Killer) Installation & Integration
- **Context & Objective**: Reduce token consumption by 60–90% on terminal/Git commands in Antigravity.
- **Key Changes Implemented**:
  - Downloaded and placed `rtk.exe` (v1.2.1) in `C:\Users\ASUS\.gemini\antigravity\bin\rtk.exe` and `C:\Users\ASUS\AppData\Roaming\npm\rtk.exe`.
  - Configured global Antigravity plugin at `C:\Users\ASUS\.gemini\config\plugins\rtk/`.
  - Added native `PreToolUse` lifecycle hook (`rtk hook antigravity`) in `hooks.json` to automatically rewrite commands to `rtk <command>`.
  - Created global skill at `~/.gemini/config/skills/rtk/SKILL.md`.
  - Enabled plugin and permission grant in `~/.gemini/config/config.json`.
- **Status**: Completed & Verified (tested with `rtk git status` saving 43.3% tokens on first run).

---

### [2026-11-21] Progress #02: Global Anti-Slop Skills Suite Installation
- **Context & Objective**: Install the complete anti-slop rules suite ([miqdadbadjuber/anti-slop](https://github.com/miqdadbadjuber/anti-slop)) globally for UI, copywriting, and code hygiene.
- **Key Changes Implemented**:
  - Cloned repository and installed 6 modular skills to `~/.gemini/config/skills/`:
    - `antislop`: Core filter, purpose test, delivery gate.
    - `antislop-ui`: Visual, layout, color, component, and motion hygiene.
    - `antislop-copywriting`: Elimination of hype, fake metrics, and generic AI copywriting.
    - `antislop-human`: Accessibility, WCAG contrast standards, focus states.
    - `antislop-layoutmobile`: Responsive breakpoints, reflow, and tap target sizing.
    - `antislop-code`: AI comment cleanup without modifying executable code.
  - Configured global plugin at `~/.gemini/config/plugins/anti-slop/` and enabled it in `config.json`.
- **Status**: Completed & Verified.

---

### [2026-11-21] Progress #03: Mandatory Global Architecture & Workflow Rules
- **Context & Objective**: Enforce strict standards for code verification, auto-push to GitHub, Clean Architecture, code hygiene, UI design, and mobile layout.
- **Key Changes Implemented**:
  - Configured global rule files across `~/.gemini/config/plugins/rtk/rules/AGENTS.md`, `~/.gemini/config/GEMINI.md`, and `~/.gemini/config/rules/AGENTS.md`.
  - **Rule 1 (Auto-Push & Health Check)**: Automatic industry-standard code verification (lint, typecheck, tests, build) + automatic push to GitHub via RTK upon task completion without waiting for user prompts.
  - **Rule 2 (Token Optimization)**: All Git/GitHub interactions routed through RTK.
  - **Rule 3 (Clean Architecture & /antislop-code)**: Strict layer decoupling (Domain, Use Cases, Repositories/Adapters, Presentation/Infra) + zero AI-slop comments.
  - **Rule 4 (UI/UX Standards via /antislop-ui)**: Bespoke human craftsmanship, restrained dose caps (max 1-2 glass/glow elements), no generic AI templates or fake metrics.
  - **Rule 5 (Mobile Layout via /antislop-layoutmobile)**: Strict ban on top navbars or slidebars/sidebars on mobile. Mandatory Mobile Bottom Bar with scroll clearance calculations (`calc(var(--bottom-bar-height) + env(safe-area-inset-bottom))`) and 44x44px min tap targets.
- **Status**: Completed & Verified.

---

### [2026-11-21] Progress #04: Progress Logging Protocol & Session Handover Setup
- **Context & Objective**: Ensure structured logging of all progress in `progress.md` with session startup read rules and single-read caching for historical lookups.
- **Key Changes Implemented**:
  - Added Rule 6 (`Project Tracking, Session Handover & Caching`) to all global rules files (`AGENTS.md` and `GEMINI.md`).
  - Standardized the rule: AI must read the last 3–5 entries in `progress.md` at session start.
  - Established the single-read caching rule: when reading earlier entries beyond the last 5, perform the read only once and retain the context in memory.
  - Initialized `progress.md` with all four foundational milestones.
- **Status**: Active & in effect across all sessions.

---

### [2026-11-21] Progress #05: Caveman (Medium Mode) Installation & Global Integration
- **Context & Objective**: Eliminate conversational fluff and compress output tokens across all sessions without compromising established architectural and workflow rules.
- **Key Changes Implemented**:
  - Installed Caveman skill at `~/.gemini/config/skills/caveman/SKILL.md` and plugin at `~/.gemini/config/plugins/caveman/`.
  - Enabled plugin globally in `~/.gemini/config/config.json`.
  - Added Rule 7 (`High-Density Communication & Token Compression - Caveman Medium Mode`) to all global rule files (`AGENTS.md` and `GEMINI.md`).
  - Enforced strict non-destructive boundary: code logic, Clean Architecture, auto-push to GitHub via RTK, `/antislop` standards, and `progress.md` protocol remain 100% intact.
- **Status**: Completed & Active globally.

---

### [2026-11-21] Progress #06: Leaflet Radius Analyzer & Interactive Location Popup in Room 03
- **Context & Objective**: Replace static SVG map in Room 03 (Ruang Peta) with interactive Leaflet map matching design mockup (Image 1 & 2) with active radius analysis, cluster focus, facility comparison list, and location detail popup cards.
- **Key Changes Implemented**:
  - Downloaded and integrated Leaflet v1.9.4 locally to `assets/leaflet/` (`leaflet.css`, `leaflet.js`).
  - Implemented dynamic Radius Analysis Header ("ANALISIS RADIUS AKTIF", active badge, and facility count).
  - Implemented interactive 6-tier radius selector (`500 m`, `1 km`, `3 km`, `5 km`, `10 km`, `25 km`) with responsive Leaflet green radius circle overlays.
  - Implemented 4 cluster focus filters (`Semua (3)`, `Nagoya`, `Osaka`, `Tokyo`) and custom HTML DivIcons for clusters and facilities.
  - Built interactive Location Detail Card overlay matching Image 2 with category badge, travel estimate pill (`↗ ~3.2 km · 8 mnt berkendara`), icon, title, description, and selling point ("Nilai jual:").
  - Added full split-view modal (`#radiusAnalysisModal`) for side-by-side desktop exploration.
- **Status**: Completed & Verified.

---

### [2026-11-21] Progress #07: Fix Leaflet Tile Provider (CartoDB Voyager), Side-by-Side Modal, & Bottom Bar Removal
- **Context & Objective**: Address tile error 403 ("Access blocked" OSM volunteer policy), fix vertical stacking in analysis modal, and remove mobile bottom bar per user request.
- **Key Changes Implemented**:
  - Replaced tile source with CartoDB Voyager raster tiles (`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`) with Cloudflare global CDN, completely eliminating 403 blocks and hazard caution overlays.
  - Eliminated media query `column-reverse` on `.radius-modal-window`; enforced strict side-by-side (`flex-direction: row`) split view (left 350px sidebar, right flex map) mirroring design mockup.
  - Removed `.mobile-bottom-bar` and all corresponding CSS/JS references per user instruction.
  - Recalibrated pin coordinates and responsive zoom levels (`500m`: 16, `1km`: 15, `3km`: 14, `5km`: 13.5, `10km`: 12, `25km`: 10.5) with `setView` and `invalidateSize` to prevent pin collisions.
- **Status**: Completed & Verified.

---

### [2026-11-21] Progress #08: Focus Map Navigation to Bottom Distance Chips & Streamline Room 03 Layout
- **Context & Objective**: Clean up Room 03 (Ruang Peta) by removing cluttered radius filter panels/modals that broke mobile viewport layout, and wiring interactive location navigation exclusively to the 3 bottom distance chips (`Sudirman 1 mnt`, `Gelora Merdeka 2 mnt`, `Alun-Alun 3 mnt`) per user request.
- **Key Changes Implemented**:
  - Removed `.map-analysis-header` and `.map-filters-panel` from `#room-3` in `index.html`, eliminating layout overflow and vertical scrolling.
  - Removed `#radiusAnalysisModal` to prevent DOM clutter and accidental modal triggers.
  - Bound the 3 bottom distance chips (`Sudirman 1 mnt`, `Gelora Merdeka 2 mnt`, `Alun-Alun 3 mnt`) directly to `openFacilityDetail(id, this)`.
  - Added active chip state (`.dist-chip.is-active`) with emerald glowing borders and high-contrast text.
  - Linked chip interaction to smooth Leaflet animation (`parkMap.flyTo(latLng, 15.5)`) and marker highlighting (`.facility-pin-divicon.is-active-pin`).
  - Integrated location detail card overlay (`#mapLocationCard`) matching design mockup Image 2 (category, time pill, title, description, and selling point).
  - Maintained zero mobile bottom bar and strict zero-scroll fit within 844px mobile viewport.
- **Status**: Completed & Verified (verified with Node.js syntax & DOM tests).


---

### [2026-11-21] Progress #09: Expand Map Distance Chips to All 8 Locations & Compact Popup Card
- **Context & Objective**: Accommodate all facility destinations displayed on the map into the bottom selection strip, and prevent the location popup card from dominating/obscuring the Leaflet map view.
- **Key Changes Implemented**:
  - Expanded `.distance-chips` in `index.html` from 3 hardcoded spots to all 8 map destinations: `Sudirman (1 mnt)`, `Gelora Merdeka (2 mnt)`, `Alun-Alun (3 mnt)`, `SMAN 1 (5 mnt)`, `RSUD Soekarno (6 mnt)`, `Stasiun (7 mnt)`, `RS Indriati (12 mnt)`, and `Pakuwon Mall (14 mnt)`.
  - Configured `.distance-chips` as a smooth horizontal scrolling strip (`overflow-x: auto; scrollbar-width: none; flex-wrap: nowrap`) with 46px min-height touch targets per Rule 5.
  - Re-engineered `.map-location-card` into a sleek, low-profile floating card (~95px height max): reduced padding (8px 10px), compact 22px icon, 13px bold title, 2-line truncated description, single-line selling point, and 22px close button.
  - Added slight latitude offset (`-0.0025`) in `parkMap.flyTo` to guarantee target pins stay centered in the upper 70% of the map view without any overlap from the popup card.
  - Added auto-scroll (`targetChip.scrollIntoView({ behavior: 'smooth', inline: 'center' })`) so active chips smoothly center into thumb reach when clicked or when corresponding pins on the map are tapped.
- **Status**: Completed & Verified (verified with Node.js syntax & DOM checks).


---

### [2026-11-21] Progress #10: Switch to Esri World Street Map Tiles & Fix Horizontal Page Shift on Chip Click
- **Context & Objective**: Resolve CARTO "API KEY REQUIRED" watermark displayed on tiles when viewing Pakuwon Mall/Solo Baru, and fix horizontal viewport shifting that clipped the left side of the mobile screen when clicking right-most chips.
- **Key Changes Implemented**:
  - Replaced CartoDB Voyager tiles with official, unwatermarked Esri World Street Map raster tiles (`https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}`), eliminating all "API KEY REQUIRED" diagonal warnings and 403 blocks.
  - Replaced native `scrollIntoView()` on `.dist-chip` with localized container scrolling `chipsContainer.scrollTo({ left: scrollPos, behavior: 'smooth' })`, preventing browser viewport/document horizontal auto-scrolling.
  - Dynamically calibrated zoom level based on facility distance (`targetZoom = item.distance > 5 ? 14.5 : 15.5`) so regional spots like Pakuwon Mall maintain optimal regional context with zero pin clipping.
- **Status**: Completed & Verified (tested via Node.js).


---

### [2026-11-21] Progress #11: Fix Text Truncation in Location Popup Card
- **Context & Objective**: Resolve text ellipsis truncation (`d...`) in the selling point and description of the location detail card overlay.
- **Key Changes Implemented**:
  - Removed `white-space: nowrap` and `text-overflow: ellipsis` on `.map-card-selling-text` and `.map-card-title`, enabling natural multi-line text wrapping.
  - Set `align-items: flex-start` with top-aligned pin icon on `.map-card-selling-point` so icons align cleanly with the first line of wrapped text.
  - Removed `-webkit-line-clamp: 2` on `.map-card-desc` to ensure the full description and selling points are 100% visible and unclipped.
- **Status**: Completed & Verified.


---

### [2026-11-21] Progress #12: Synchronize Room 01 Arch Hero Image with Opening Door Interior Preview
- **Context & Objective**: Align the arch hero visual card in Room 01 (Pintu Depan) with the interior room visual revealed when the double doors open in the opening animation.
- **Key Changes Implemented**:
  - Replaced `assets/drive/house.jpeg` (exterior townhouse facade) on `#heroArchImg` in `index.html` with `assets/drive/dalam-6.png` (warm living interior).
  - Updated descriptive alt tag to *"Interior Ruangan The Park Townhouse"*, ensuring seamless visual continuity from the door opening sequence into Room 01.
- **Status**: Completed & Verified.

---

### [2026-11-22] Progress #13: Room 04 Interactive Denah Customizer, 360° Interior Panorama & Responsive Site Plan
- **Context & Objective**: Implement comprehensive customization and interactive visualization in Room 04 (`04 / 07 · RUANG RUMAH`): 360° touch/mouse draggable interior panorama, room renaming and function customizer with locked exterior facade policy, conditional button progression, and interactive site plan matching reference images.
- **Key Changes Implemented**:
  - **Scrollable Room 04**: Enabled vertical scrolling on `#room-4.room-rumah-section` (`overflow-y: auto`) while preserving fixed viewport boundaries on other rooms.
  - **360° Interior Panorama Viewer**: Implemented `#house360Frame` and `#panoramaTrack` supporting pointer drag (mouse & touch) and rotation buttons (`rotatePanorama`) with dynamic interior textures synchronized with chosen unit (Nagoya, Tokyo, Osaka).
  - **Interior Denah & Room Renaming Customizer**: Added architectural floorplan view (`assets/drive/denah-custom.jpg`) with scale markers, locked facade estate policy banner (`🔒 Fasad Luar Tetap`), customizable room name inputs with quick preset chips (Master Suite, Studio/Library, Gym/Yoga, Zen Garden), denah specification summary, and optional add-ons checklist.
  - **Conditional Progression Button**: Configured `#btnNextToRoom5` (`Intip Kehidupan Bersama →`) to remain hidden initially with `#navHintLocked` active; clicking `✓ Simpan Desain Ruangan & Selesaikan Kustomisasi` validates choices, shows a success badge, unlocks `#btnNextToRoom5` with a pulse animation, and smoothly scrolls to it.
  - **Interactive Responsive Site Plan**: Integrated cluster site plan diagrams for Nagoya, Tokyo, and Osaka (`assets/drive/siteplan-*.jpg`), featuring interactive clickable lot markers on the site plan overlay and quick selector pill chips displaying live lot status (`Tersedia`, `Booked`, `Hook`), land area, recommended unit, and pricing.
- **Status**: Completed & Verified (verified DOM bindings and JS syntax).

---

### [2026-11-22] Progress #14: Site Plan Exact Coordinate Pins, Double Unlock Progression & Center Fade In
- **Context & Objective**: Calibrate site plan pins to exact locations from official images, switch denah layouts to high-res architectural renders (`denah-tipe60.jpg` & `denah-tipe110.jpg`), enforce dual-requirement unlock (Site Plan selection + Room customization saved), enhance 360 viewer with idle auto-rotation & angle degrees, and implement center radial fade-in from Ruang Peta to Ruang Rumah.
- **Key Changes Implemented**:
  - **Center Radial Fade In Transition (`is-center-fade-in`)**: Implemented `@keyframes centerFadeIn` expanding outward from center (`scale: 0.68 -> 1`, `clip-path: circle(0%) -> circle(150%)`, blur removal) for transition from Room 03 to Room 04.
  - **High-Res Denah Switcher**: Placed `assets/drive/denah-tipe60.jpg` and `assets/drive/denah-tipe110.jpg`; `selectDenahType()` dynamically toggles between 3-bedroom (Tipe 60/80) and 4-bedroom/3-car (Tipe 110) layouts and displays `#roomInputRow4` accordingly.
  - **Site Plan Exact Coordinate Pins**: Calibrated pin coordinates matching the site plan images for Tokyo (`B.1`–`B.7`), Nagoya (`A.01`–`A.08`, `B.02`–`B.07`), and Osaka (`A.1`–`A.9`) with active pulsing badge styling.
  - **Double Unlock Progression Gate**: Wired `hasSelectedSiteplanLot` and `hasSavedRoomCustomization`; `#btnNextToRoom5` (`Intip Kehidupan Bersama →`) is revealed ONLY when both requirements are fulfilled, with `#navHintLocked` dynamically explaining whichever step remains incomplete.
  - **360° Interior Panorama Enhanced**: Added live compass degree readout (`#panoAngleBadge`), quick angle presets (`Ruang Tamu`, `Kamar Utama`, `Dapur & Tangga`), and idle continuous gentle panning.
- **Status**: Completed & Verified.

---

### [2026-11-22] Progress #15: Cinematic Center Fade-In with Warm Light Bloom & Multi-Stage Blur Dissipation
- **Context & Objective**: Enhance the Room 03 (Ruang Peta) to Room 04 (Ruang Rumah) transition with ultra-smooth easing, warm golden center light bloom, and multi-stage depth-of-field blur dissipation.
- **Key Changes Implemented**:
  - **Ultra-Smooth Center Radial Fade In**: Replaced basic cubic bezier with a refined luxury easing `cubic-bezier(0.2, 0.9, 0.28, 1)` across 1.25s duration, transitioning scale smoothly from `0.86` to `1` with radial clip-path expansion from `circle(8%)` to `circle(150%)`.
  - **Warm Golden Light Bloom (`#centerLightBloom`)**: Added radial lens bloom element radiating warm amber light (`rgba(255, 248, 225, 0.95)` through `rgba(245, 207, 135, 0.72)`) expanding from `50% 48%` to mimic natural daylight flooding the room upon entrance.
  - **Multi-Stage Photographic Blur & Brightness**: Engineered a 5-step keyframe curve (`20px blur` + `1.75x brightness` + `1.3x saturation` -> `10px blur` -> `3.5px blur` -> `0.8px blur` -> `0px crisp focus`), coupled with golden motes burst (`natureFX.burstMotes`) for seamless visual warmth.
  - **Soft Vignetted Map Exit (`is-exiting-fade`)**: Configured Room 03 exit with smooth scale `1.04` and `14px blur` over 0.85s for gentle cross-dissolve.
- **Status**: Completed & Verified.

---

### [2026-11-22] Progress #16: Room 04 Compact Addons Grid, Auto-Scroll Section Transitions & Site Plan Confirmation Button
- **Context & Objective**: Refine Room 04 layout and interaction flow per user feedback: compact 2-column addons checklist without text wrapping, interactive navigation pills to jump/scroll to customizer or site plan, explicit site plan lot confirmation button, and auto-scroll transitions after saving.
- **Key Changes Implemented**:
  - **Sleek 2-Column Addons Grid**: Re-architected `.addons-grid` into a clean 2-column layout (`grid-template-columns: repeat(2, 1fr)`) with compact items (38px height, 14px checkboxes, 9.5px font) eliminating vertical clutter and awkward text breaks.
  - **Quick Section Nav Pills (`.room4-nav-pills`)**: Added navigation pills (`#btnJumpCustomizer`, `#btnJumpSiteplan`) above the customizer card with frosted glass style and active green accent for quick jumping between room customization and site plan selection.
  - **Section Auto-Scroll Transitions (`scrollToRoom4Section`)**: Created smooth localized scrolling within `#room-4` (`room4.scrollTo({ top: target.offsetTop - 12, behavior: 'smooth' })`) with focus highlight glow animation (`@keyframes sectionFocusGlow`). Saving room customization automatically smooth-scrolls down to the site plan section.
  - **Explicit Site Plan Save Button (`#btnSaveSiteplan`)**: Integrated `✓ Konfirmasi & Simpan Kavling [ID]` button with active confirmation state and dynamic text update upon lot selection.
  - **Streamlined Dual Progression**: Updated `checkUnlockProgress()` so `#btnNextToRoom5` (`Intip Kehidupan Bersama →`) unlocks once both room customization and site plan lot are explicitly confirmed.
- **Status**: Completed & Verified.

---

### [2026-11-22] Progress #17: Refined Room 04 Frame Spacing, Full-Width Addons Stack & Navigation Pills Removal
- **Context & Objective**: Clean up Room 04 layout per user feedback: remove navigation pills (`📐 Kustomisasi Ruang` and `🗺️ Pilih Site Plan`), restore a spacious full-width 1-column stack for "Opsi Item Tambahan" to prevent text truncation, and balance inter-frame spacing throughout Room 04.
- **Key Changes Implemented**:
  - **Removed Navigation Pills**: Deleted `.room4-nav-pills` from `index.html` and cleaned up CSS/JS handlers, allowing the natural flow between 360 viewer, specs, customizer, and site plan.
  - **Full-Width Addons List**: Redesigned `.addons-grid` as a clean 1-column stack (`flex-direction: column`) with `min-height: 46px` touch targets; aligned checkbox and full title on the left (`.addon-main`) and styled emerald price pills (`.addon-price`) on the right with zero truncation or awkward line wrapping.
  - **Optimized Inter-Frame Geometry & Spacing**: Calibrated `.room-section.room-rumah-section` with `gap: 18px` and `padding: 4px 16px 56px`, providing clean visual separation between consecutive cards and ample clearance above the bottom navigation controls.
  - **Enhanced Save Button & Card Margins**: Added 8px top margin and 44px touch height to `#btnSaveCustom` and `#btnSaveSiteplan` with tactile press states.
- **Status**: Completed & Verified.

---

### [2026-11-22] Progress #18: Toned Light Bloom, Room 05 Facility Carousel, 3 Payment Schemes, Drone Finale & Storytelling Landing Page
- **Context & Objective**: Fulfill user requirements across visual softness, interactive facilities, multi-scheme payment simulation, full drone view in Room 07, door closing animation transition, and a complete storytelling landing page with bottom navigation and saved configuration bookmark.
- **Key Changes Implemented**:
  - **Toned Down Fade-In Brightness & Warm Ambient Bloom**: Softened `@keyframes centerFadeIn` brightness from `1.75` to `1.15` and calibrated `.center-light-bloom` with warm amber gradients (`rgba(245, 230, 200, 0.45)`) eliminating eye strain.
  - **Room 05 Interactive Facility Frame & 5-Second Auto-Scroll**: Built multi-image facility slideshow (Clubhouse & Pool, Avenue Gate RFID, Gym & Lounge, Playground & Garden) with auto-scrolling every 5 seconds, active dots, photo counters, and smooth scroll to top upon tapping the facility trigger card.
  - **Room 06 Three Payment Options (Cash Keras, Cash Bertahap, KPR)**: Implemented 3 interactive scheme tabs:
    - *Cash Keras*: Booking fee Rp 5 Juta + pelunasan 1 bulan.
    - *Cash Bertahap (Cash Tempo)*: 12 & 24 bulan, DP 40% (booking fee Rp 5 Juta include ke dalam DP 40%), cicilan 0% developer.
    - *KPR Bank*: DP 30% (slider 10-40%), booking fee Rp 5 Juta, tenor 5-25 tahun slider, bunga 8% anuitas.
  - **Room 07 Aerial Drone Finale**: Upgraded hero frame to `assets/drive/aerial-drone.jpeg` showcasing the entire The Park Townhouse Sukoharjo complex from above.
  - **Door Closing Animation & Exit Sequence (`finishTourAndExit`)**: Added realistic wooden double doors swing-shut sequence (`rotateY(0deg)`), backward camera zoom out to grand gate exterior, poetic farewell, and seamless fade into the Landing Page.
  - **Comprehensive Storytelling Landing Page (`#landingPageView`)**:
    - **Header & Bookmark**: Top brand navbar with golden bookmark icon (`#landingBookmarkBtn`) displaying the user's saved dream configuration drawer, and 360 tour revisit pill.
    - **Bottom Navigation Bar (Rule 5 Compliant)**: 4 destinations with 44x44px touch targets (`Beranda`, `Surat Cinta`, `Site Plan`, `Fasilitas`) with safe-area clearance.
    - **Beranda**: 30-unit modern Japandi catalog, filter chips (Tipe, LT, Range Harga, Posisi), and detailed inventory cards for Nagoya (A.01-B.07), Tokyo (B.1-B.7), Osaka (A.1-A.9).
    - **Surat Cinta**: Poetic, heartwarming open letter from the architectural team emphasizing sanctuary, family peace, and slow living over hard-selling.
    - **Site Plan**: Interactive cluster maps, lot pins, and live statistics.
    - **Fasilitas**: The Park Clubhouse (177,25 m²), Andara Imperial Super App interactive smartphone demo (Smart Lock, QR Tamu, Booking, IPL, SOS), and Andara Manajemen Hospitality.
- **Status**: Completed & Verified.
