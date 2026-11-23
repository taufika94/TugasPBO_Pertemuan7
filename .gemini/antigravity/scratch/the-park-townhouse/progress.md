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

---

### [2026-11-22] Progress #19: Surat Cinta Transformation into 99 Keunggulan Deluxe Storytelling Magazine
- **Context & Objective**: Transform the "Surat Cinta" tab from a basic text block into an engaging, interactive magazine layout featuring the official 22-page document *"THE PARK TOWNHOUSE 99 KEUNGGULAN · SUKOHARJO"*.
- **Key Changes Implemented**:
  - **Architectural Prologue Letter**: Rebuilt with official wax seal emblem (`logo-tpt.png`), headline *"Sebuah alamat. Begitu banyak arti."* (18 November 2026), thoughtful slow-living prose, and heartfelt architect signature.
  - **Klaster Philosophy Triptych**: Crafted 3 visual cards highlighting the distinct characters of Nagoya (dekat clubhouse di Jl. Tentara Pelajar), Osaka (koridor Jend. Sudirman), and Tokyo (enclave privat 7 unit).
  - **Interactive 11 Themes & 99 Keunggulan Explorer**:
    - Implemented 11 navigable chips (`01–09 Dekat Kehidupan` through `91–99 Memilih Tenang`) with smooth auto-scroll.
    - Built theme showcase card featuring atmospheric photography banners (`alun-alun.jpg`, `clubhouse.png`, `dalam-6.png`, `gate.png`, `house.jpeg`, `aerial-drone.jpeg`), poetic quote, 9 numbered points per theme (`01.` to `99.`), and previous/next theme pagination.
  - **Tipe Gold vs Diamond Architectural Comparison**: Added interactive switcher between Gold (LB 60–75 m², 3KT/2KM/1+1 Garasi) and Diamond (LB 80–110 m², 4KT/3KM/2+1 Garasi) with architectural floor plan previews (`denah-tipe60.jpg`, `denah-tipe110.jpg`).
  - **Official Nov–Des 2026 Price Matrix**: Created interactive cluster tabs (Nagoya, Tokyo, Osaka) displaying exact inventory breakdowns, Cash Keras, Cash Tempo 12/24 bulan, and Bank KPR estimates.
  - **3 Langkah Bersahaja & WhatsApp Direct Consultation**: Framed steps (*"Bicarakan Pilihan"*, *"Lihat dan Pahami"*, *"Tentukan Langkah"*) and direct WhatsApp link to Mr. Andara (0882-0073-92379) at Marketing Gallery.
- **Status**: Completed & Verified.

---

### [2026-11-22] Progress #20: Full Emoji Removal & Dynamic Cumulative 99 Keunggulan Counter Progression
- **Context & Objective**: Eliminate all decorative emojis across facilities, apps, hints, and navigation, and replace the static step counter with a dynamic cumulative `x/99` keunggulan progression reflecting real architectural points unlocked at each stage (e.g., jumping by 22 points in Room 4).
- **Key Changes Implemented**:
  - **Zero Emoji Policy**: Replaced all emojis across Room 05 facility chips, Super App phone mockups, bottom navigation tabs, bookmark drawers, and hint tags with clean, bespoke inline SVG vector icons and crisp typography.
  - **Dynamic Cumulative 99 Keunggulan Counter (`setKeunggulanCount`, `animateKeunggulanCounter`)**:
    - Room 01: 3/99 (Prolog & Nilai Perdana)
    - Room 02: 12/99 (+9 poin Karakter 3 Klaster)
    - Room 03: 21/99 (+9 poin Akses Pusat Sukoharjo & Layanan)
    - Room 04: 43/99 (+22 poin Desain Japandi & Tata Ruang)
    - Room 04 Kustomisasi & Kavling: 49/99 & 55/99 (+6 poin Fleksibilitas & SHM)
    - Room 05: 73/99 (+18 poin Clubhouse & Rekreasi) & up to 85/99 on facility tap
    - Room 06: 90/99 (+11 poin 3 Skema Pembayaran & Legalitas) & up to 94/99 on scheme change
    - Room 07: 99/99 (Semua 99 Keunggulan Terbuka Penuh)
  - **Smooth Number Rolling Animation & Golden Glow Pulse**: Built cubic easing number counter animation on `#cardsCountLabel` with pulse glow (`@keyframes pillGlowPulse`).
  - **Floating Notification Toast (`#keunggulanFloatingToast`)**: Displays sleek toasts (`+22 Keunggulan (Desain Japandi & Tata Ruang 22 Poin)`) whenever new points unlock.
  - **Comprehensive Unlocked Modal**: Tapping `#openCardsModalBtn` opens an interactive modal with live progress percentage, list of unlocked items from the official document, and a shortcut to the full Surat Cinta magazine.
- **Status**: Completed & Verified.

---

### [2026-11-22] Progress #21: Luminous Japandi White Palette, 4K Atmosphere Showcase & Dedicated Product Cards
- **Context & Objective**: Transform the post-configuration landing page (`#landingPageView`) into an elegant, luminous Japandi white/off-white background (`#fbfaf7`), strictly preserving the brand color palette (deep forest green `#16241c`, sand/gold `#b39255`, emerald `#2e7d32`), adding a 4K Atmosphere & Video Showcase, dedicated luxury Product Cards, authentic photo gallery, and floor plan preview modal.
- **Key Changes Implemented**:
  - **Luminous Japandi White Color Palette**:
    - Replaced all dark landing backgrounds with clean `#fbfaf7` (was `#0e1712`).
    - Styled all cards (`.landing-video-card`, `.product-card-item`, `.catalog-filters-card`, `.cluster-showcase-card`, `.unit-inventory-card`, `.surat-hero-card`, `.theme-showcase-box`, `.siteplan-page-card`, `.facility-showcase-box`, `.hospitality-showcase-box`, `.estate-footer-card`, `.saved-config-drawer`) with crisp white `#ffffff` surfaces, warm borders (`#e8e2d5` / `#e0d8c7`), and subtle elevation shadows (`0 4px 18px rgba(22, 36, 28, 0.05)`).
    - Preserved high WCAG text contrast with deep forest green `#16241c` headings, charcoal `#2c3830` body copy, warm sand/gold `#b39255` badges/prices, and rich emerald `#2e7d32` status chips.
  - **Cinematic 4K Atmosphere Showcase (`#landingVideoCard`)**:
    - Built responsive 16:9 interactive video viewport (`#videoViewportFrame`) with scene switcher: Scene 01 (Peta Drone Kawasan), Scene 02 (Avenue Grand Gate), Scene 03 (Fasad Senja Japandi), Scene 04 (Interior Hangat), Scene 05 (Clubhouse & Pool).
    - Added play/pause toggle (`toggleLandingVideoPlay`) with automated 5-second scene rotation and live status pills.
  - **Dedicated Luxury Product Cards (`#productShowcaseSection`)**:
    - Implemented 3 bespoke cards:
      - *Tipe Gold (Nagoya)*: LB 75 m² / LT 60–63 m², 3 KT, 2 KM, 1+1 Garasi, Cash Keras Rp 650 Jt, Cash Tempo 24 bln Rp 30,5 jt/bln, KPR Rp 4,2 jt/bln.
      - *Tipe Diamond (Tokyo)*: LB 80 m² / LT 80 m², 3–4 KT, 2–3 KM, 1+1 Garasi, Cash Keras Rp 679 Jt, Cash Tempo 24 bln Rp 31,9 jt/bln, KPR Rp 4,4 jt/bln.
      - *Tipe Royal Diamond (Osaka)*: LB 110 m² / LT 90–125 m², 4 KT, 3 KM, 2+1 Garasi (muat 3 mobil), Cash Keras Rp 895 Jt, Cash Tempo 24 bln Rp 42,1 jt/bln, KPR Rp 5,8 jt/bln.
    - Each card features direct order actions and "Lihat Denah" previews.
  - **Architectural Floor Plan Preview Modal (`#denahSpecModal`)**:
    - Added high-resolution interactive floor plan modal displaying official blueprints (`denah-tipe60.jpg`, `denah-tipe110.jpg`) with architectural room dimensions and instant unit reservation CTA.
  - **Authentic Estate Photography Gallery (`#visualGallerySection`)**:
    - Curated 6 real-estate photography tiles showcasing aerial drone angles, grand gate security, clubhouse, open-plan living rooms, master bedrooms, and Sukoharjo city proximity.
  - **Mandatory Bottom Bar Navigation Update**:
    - Re-styled fixed Bottom Navigation Bar to crisp white `#ffffff` with `#e8e2d5` border-top, keeping full Rule 5 compliance (`calc(68px + env(safe-area-inset-bottom))` clearance and 44x44px touch targets).
- **Status**: Completed & Verified.

---

### [2026-11-22] Progress #22: Comprehensive Official Beranda Homepage Architecture & Room 05 Chip Hygiene
- **Context & Objective**: Fulfill user request #10 by reconstructing `#panelBeranda` to precisely match the official The Park Townhouse website structure with all 17 interactive sections, Leaflet interactive map with POIs, Master Plan lot inspector, live investment ROI simulator, dynamic KPR calculator, and eliminating the horizontal overflow in Room 05 facility chips.
- **Key Changes Implemented**:
  - **Room 05 Facility Chips Fix**:
    - Updated `.facility-chips-grid` to `grid-template-columns: repeat(2, minmax(0, 1fr))` with `gap: 6px`.
    - Set `.facility-chip` to `min-width: 0; width: 100%; box-sizing: border-box; overflow: hidden; justify-content: flex-start; gap: 5px; padding: 6px 7px`.
    - Set `.facility-chip .f-name` to `flex: 1; min-width: 0; text-overflow: ellipsis; white-space: nowrap; font-size: 10px`.
    - Set `.facility-chip .f-count` to `font-size: 8px; flex-shrink: 0; margin-left: auto; padding: 1px 4px`.
    - Fully resolved the right-edge cutoffs on narrow mobile screens (Image 2).
  - **Official Beranda Homepage Architecture (17 Full Sections)**:
    1. *Running Marquee Ticker Bar*: `PRESALE EXCLUSIVE • PROMO CASH KERAS DISKON MAKSIMAL • BOOKING RP 5 JUTA • HANYA 30 UNIT • SHM PECAH SEMPURNA (Nagoya)`.
    2. *Hero Presale Header*: `PRESALE EXCLUSIVE · 14 JULI 2026`, Japanese subtitle `「和モダン • 贅沢な暮らし」`, 4 metric badges (Rp 400 Jt, 30 Unit, 177 m², ± 100 m), and compact 16:9 atmosphere showcase with play/pause and 5 scenes.
    3. *Nilai Lebih Investasi*: 4 pillar cards (30 Unit, 88 Keunggulan, 18% Capital Gain, Booking 5 Jt).
    4. *Lokasi & Radius (Interactive Leaflet Map & 17 POIs)*: `#berandaLeafletMap` with cluster tabs (Nagoya, Osaka, Tokyo), 8 category filter pills (Semua, Olahraga, Ibadah, Pendidikan, Kesehatan, Pemerintahan, Rekreasi, Belanja), interactive POI list with distance tags and click-to-flyTo, plus Google Maps & 88 Alasan link actions.
    5. *Master Plan Interaktif*: Cluster selector tabs, lot status filters (Semua 9, Tersedia 9, Booking 0, Terjual 0), compass `UTARA`, interactive lots A.01–A.09, and dynamic lot inspector drawer.
    6. *Hidup Lebih Nyaman*: 4 feature cards (ROW 7m, One Gate RFID, CCTV 24H, RTH) + E-Brochure PDF download.
    7. *Clubhouse & Andara Imperial Super App*: Interactive smartphone preview with 6 modules (Smart Lock, QR Tamu, Booking, Tagihan, Lapor, Darurat) and live feedback toast.
    8. *Media Sosial Resmi*: Instagram, TikTok, Facebook, YouTube, and WhatsApp sales links.
    9. *11 Pilar Keunggulan*: 11 cards detailing Japandi design, legalitas SHM, kawasan bebas banjir, capital gain, dsb.
    10. *Simulasi Investasi & Sewa*: Interactive tabs (Tipe 60 The Oasis vs Tipe 80 The Imperial) with live ROI breakdown (Rp 674.655.879 ROI, 135% total, 27.1% p.a., 6.9% yield).
    11. *Tipe Unit (Katalog Hunian)*: Dedicated luxury product cards for Tipe Gold, Tipe Diamond, Tipe Royal Diamond with direct order actions and "Lihat Denah" floor plan modal.
    12. *Fasilitas Premium 6-Grid*: Clubhouse 2 Lantai, Swimming Pool, Gym Center, Mini Golf 9 Hole, Game Station 4K, One Gate Security.
    13. *Semua Tentang The Park Townhouse*: 5 interactive tabs (Tentang Kami, Spesifikasi Material, Progres Lapangan, Cara Pembelian, Promo Presale).
    14. *Kalkulator KPR Interaktif*: Real-time mortgage formula calculation with property price slider, DP % slider, tenor dropdown, and interest rate dropdown.
    15. *Testimoni "Kata Mereka"*: 3 verified buyer testimonials with 5-star ratings.
    16. *Pusat Informasi (FAQ Accordion)*: 5 collapsible Q&A items with category filters (Legalitas, Pembayaran, Fasilitas).
    17. *Final CTA & Bank Partner Badges*: "Kunci Kavling Anda Hari Ini - Booking Rp 5 Juta" with Bank Mandiri, BCA, BRI, BNI, BTN Syariah, BSI badges and Estate Footer.
- **Status**: Completed & Verified.

---

### [2026-11-22] Progress #23: Interactive "Buka Pintu" Trigger Before Opening Sequence
- **Context & Objective**: Implement an interactive "Buka Pintu" (Open Door) button at the start of the opening sequence. Instead of playing the opening door animation automatically on load, pause in a standby state (`waiting`) with closed double wooden doors and a prominent golden CTA button, animating only when the user taps it.
- **Key Changes Implemented**:
  - **Interactive Button Markup (`index.html`)**: Added `#btnOpenDoor` with custom architectural door vector icon, "Buka Pintu" text, and directional arrow.
  - **Standby & Pulse Styling (`styles.css`)**:
    - Created `.btn-open-door` with warm champagne gradient, subtle border, and `@keyframes pulseOpenDoor` breathing glow.
    - Updated `[data-stage='waiting']` selectors for `.opening-brand`, `.door-portal-wrap`, and `.opening-caption` so the entrance foyer is visible while awaiting interaction.
    - Added auto-hide transitions on `.btn-open-door.is-hidden` when opening commences.
  - **Animation Orchestration (`app.js`)**:
    - Built `prepareOpeningStandby()` to hold the opening overlay in waiting mode with gentle ambient dust.
    - Built `startDoorOpeningSequence()` to trigger spark bursts, warm seam glow, and perspective door swinging upon button tap.
    - Wired `#replayOpeningBtn` to re-enter standby state, allowing replay of the interactive door opening experience.
- **Status**: Completed & Verified.

---

### [2026-11-22] Progress #24: Scope Breakdown-Row Typography & Fix Room 06 Contrast
- **Context & Objective**: Resolve text visibility bug in Room 06 (Ruang Hitung) shown in user screenshot `media_1795321881955_f6837185.png`, where `Booking Fee (Tanda Jadi)` and `Pelunasan (Bulan ke-1)` rows appeared dark gray and their values (`Rp 5.000.000`, `Rp 645.000.000`) were rendered dark green on dark green background, making them invisible.
- **Root Cause**:
  - The generic `.breakdown-row` selector introduced for the white Beranda investment calculator on line 7322 (`color: #425047; border-bottom: 1px dashed #e8e2d5;` and `.breakdown-row strong { color: #16241c; }`) globally cascaded and overrode the dark-theme Room 06 payment breakdown rows.
- **Key Changes Implemented**:
  - **Scoped Beranda Investment Rows**: Renamed selector to `.invest-breakdown-list .breakdown-row` and `.invest-breakdown-list .breakdown-row strong`, isolating light theme styles strictly to Beranda.
  - **Explicit High-Contrast Room 06 Styling**:
    - Scoped to `.calc-breakdown-list .breakdown-row`: set `color: rgba(243, 239, 230, 0.88)`, `border-bottom: none`.
    - Scoped `.calc-breakdown-list .breakdown-row strong`: set `color: #f3efe6` (clean luminous white) with `font-weight: 600`.
    - Maintained `.calc-breakdown-list .breakdown-row.is-total strong`: set `color: #e5d3af` (warm gold).
    - Preserved `.calc-breakdown-list .breakdown-row.is-highlight strong`: set `color: #81c784` (emerald green).
- **Status**: Completed & Verified.

---

### [2026-11-22] Progress #25: Soften Buka Pintu Button Styling & Remove Icons
- **Context & Objective**: Address user feedback on the "Buka Pintu" button (`media_1795322198683_f10c9b96.png`) to eliminate excessive light/halo glow and remove icons/arrows, displaying solely the clean text "Buka Pintu".
- **Key Changes Implemented**:
  - **Removed All Icons (`index.html`)**: Deleted door icon SVG and directional arrow `→`, leaving clean `<button class="btn-open-door"><span>Buka Pintu</span></button>`.
  - **Soft Natural Lighting (`styles.css`)**:
    - Removed `@keyframes pulseOpenDoor` and wide colored box-shadow halo.
    - Set soft, understated natural shadow (`0 3px 12px rgba(0, 0, 0, 0.22)`) with a warm matte Japandi sand palette (`#d8c6a2` default, `#dfceab` hover).
    - Preserved 44px mobile touch target ergonomics and subtle active click feedback.
- **Status**: Completed & Verified.

---

### [2026-11-22] Progress #26: Align Room 01 Headline Typography with Room 02 Room-Title Style
- **Context & Objective**: Match the typography style of "Ada rumah. Ada rasa pulang." in Room 01 (`media_1795322341695_b6026304.png`) to the exact style of "Pagi seperti apa yang ingin Anda bangun?" (`.room-title`).
- **Key Changes Implemented**:
  - **Typography Alignment (`styles.css` & `index.html`)**:
    - Changed `.hero-headline` font size from `36px` to `24px`.
    - Set `line-height` to `1.14` and `margin-bottom: 8px` (matching `.room-title`).
    - Removed custom `-0.01em` letter spacing to preserve natural serif rendering.
    - Added `.room-title` class to `<h1 class="room-title hero-headline">` in Room 01.
- **Status**: Completed & Verified.

---

### [2026-11-22] Progress #27: Visual Overlay Stacking, Dark Navbar, Surat Cinta Scroll Fix, and Real Interactive Siteplan
- **Context & Objective**: Address comprehensive user design & interaction feedback:
  1. Room 05: Remove "2 Foto" badges and auto-rotate hint caption; clean up visual overlay layout (`Clubhouse di Nagoya` + `177,25 m² · Tanpa Membership Terpisah`).
  2. Room 06 & Room 05 Visual Overlay Collision (`media_1795323251633_111b183d.jpg`): Fix horizontal tag/sub collision by switching `.room-visual-overlay` to vertical column stack.
  3. Beranda Hero: Remove Japanese text `「和モダン • 贅沢な暮らし」`.
  4. Beranda Video Showcase: Remove `SINEMA KAWASAN · 4K ATMOSPHERE` badge and `Jeda Sinema (5 dtk)` status text; fix video toggle error.
  5. Surat Cinta Theme 11 Error (`media_1795323445372_98d132be.jpg`): Replace viewport-displacing `scrollIntoView` with contained `scroller.scrollTo`, preventing mobile horizontal jumps when clicking theme chips.
  6. Landing Navbar: Remove `Tur 360` button and style navbar with opening background (`#16241c`) with matching gold/cream typography and bookmark button.
  7. Beranda Lokasi & Radius: Upgrade Leaflet map with concentric radar circles (1 km, 2.5 km) and updated 99 Keunggulan copy.
  8. Beranda Master Plan: Replace generic 3x3 box grid with the real interactive site plan from Room 04 (`siteplan-map-container`, dynamic clickable lot markers, lot quick pills, full inspector card, and cluster metrics).
- **Key Changes Implemented**:
  - **`index.html`**:
    - Cleaned Room 05 chips and removed all `<span class="f-count">2 Foto</span>` and `.facility-hint-tag`.
    - Removed `btn-tour-pill` from `.landing-navbar`.
    - Removed `.eyebrow-jp` and video showcase badges.
    - Updated copy from 88 to 99 Keunggulan (`99 Alasan Lokasi Ini Sempurna`).
    - Replaced `#secMasterPlan` layout with Room 04 site plan architecture.
  - **`styles.css`**:
    - Restructured `.room-visual-overlay` to `display: flex; flex-direction: column; justify-content: flex-end; align-items: flex-start; gap: 6px;` with subtle text shadow.
    - Styled `.landing-navbar` in dark forest green `#16241c` with gold accents and border `rgba(229, 211, 175, 0.2)`.
    - Added global viewport containment (`overflow-x: hidden` / `max-width: 100%`) against mobile horizontal shifting.
  - **`app.js`**:
    - Replaced `c.scrollIntoView` in `renderSuratTheme` and `switchLandingVideoScene` with container-isolated `scroller.scrollTo`.
    - Sanitized `toggleLandingVideoPlay` to run cleanly without referencing deleted DOM nodes.
    - Added concentric radar circles (1 km, 2.5 km) to `initBerandaLeafletMap`.
    - Implemented `renderBerandaMasterplanSiteplan`, `switchBerandaLotCluster`, and `selectBerandaLot` linked to `SITEPLAN_DATA`.
- **Status**: Completed & Verified.

---

### [2026-11-22] Progress #28: Surat Cinta Mobile Reflow & Deluxe Interactive Payment Calculator
- **Context & Objective**: Fulfill user request on the Surat Cinta magazine page:
  1. Reflow layout according to `/antislop-layoutmobile`: fluid typography (`clamp()`), stack 3-column cluster triptych grid on mobile, ensure min 44x44px touch targets on all interactive selectors, and apply bottom safe area clearance (`calc(var(--bottom-bar-height) + env(safe-area-inset-bottom))`) so no content is obscured behind the Mobile Bottom Bar.
  2. Implement the deluxe interactive **Kalkulator Pembayaran** at the bottom of Surat Cinta:
     - 30 unit selector across Nagoya, Osaka, and Tokyo (`B.02 — 63 m² (nagoya)`, etc.).
     - Launch stage selector (`Pra-Launch`, `Soft-Launch`, `Grand-Launch`).
     - Payment scheme selector (`Cash Keras`, `Cash Bertahap 12 Bulan`, `Cash Bertahap 24 Bulan`, `KPR Bank Mitra`).
     - Conditional KPR sliders (Tenor 5–25 years, Interest rate 5–11% p.a).
     - Live calculations: Harga Jual, Booking Fee (Rp 5 Juta mengurangi DP), DP 40%/30%, DP Netto Disetor, Sisa Dibiayai, Total Pembayaran Unit.
     - Milestone timeline (DP H+7/H+14, Sisa Bayar H+30/cicilan/akad, BAST serah terima).
     - Dual CTA buttons: `[Pesan Unit Ini]` and `[Pilih Kavling]`.
     - Additional costs breakdown (Di Luar Harga Jual): PPN 11%, BPHTB 5% (with Sukoharjo NPOPTKP Rp 60 Jt deduction), Notaris & Balik Nama Rp 15 Jt, Total Tambahan, and Estimasi Total Keseluruhan.
     - 4-Scheme dynamic comparison cards for the selected unit and stage.
- **Key Changes Implemented**:
  - **`index.html`**:
    - Added `#sectionKalkulatorPembayaran` and `.surat-calc-container` with complete semantic parameter controls, calculation results, additional costs breakdown, and comparison cards.
  - **`styles.css`**:
    - Added mobile-first reflow rules for Surat Cinta (`.surat-magazine-container`, `.cluster-triptych-card`, `.surat-hero-card`).
    - Styled `.surat-calc-container` with clean Japandi luxury aesthetics, high-contrast typography, 44px minimum tap targets, fluid grid stacking, and bottom bar clearance.
  - **`app.js`**:
    - Defined `SURAT_CALC_UNITS` (30 units with base pricing).
    - Implemented `recalculateSuratPayment()`, `setSuratCalcStage()`, `setSuratCalcScheme()`, `onSuratKprSliderChange()`, and `orderSuratCalculatedUnit()`.
    - Integrated automatic calculation initialization on tab activation and page load.
- **Status**: Completed & Verified.

---

### [2026-11-22] Progress #29: Website Content Realignment to Surat Cinta Storytelling Tone
- **Context & Objective**: Transform all content across the website (corresponding to `theparktownhouse.com`) from aggressive, pushy sales copy ("Diskon Maksimal", "Kunci Kavling Sekarang", "Promo Terbatas") into warm, reflective, narrative storytelling inspired by the *Surat Cinta* voice ("Sebuah alamat, begitu banyak arti", "Ruang untuk meletakkan lelah", "Menemukan ritme yang sesuai").
- **Key Changes Implemented**:
  - **Marquee Ticker (`index.html`)**: Replaced hard-selling promo text with a warm, story-driven manifesto: *"SEBUAH ALAMAT • BEGITU BANYAK ARTI • 30 KELUARGA TERPILIH DALAM KETENANGAN JAPANDI MODERN • KORIDOR EMAS SUKOHARJO • RUANG UNTUK PULANG DAN MELETAKKAN LELAH • SHM PECAH SEMPURNA • DUA LANTAI DENGAN GARASI DALAM • FASILITAS BERSAMA TANPA BIAYA TERPISAH •"*.
  - **Hero & Philosophy**: Subtitle re-anchored to the core human need: *"Barangkali rumah yang Anda cari bukan yang paling banyak menarik perhatian, melainkan ruang untuk meletakkan lelah, membesarkan tawa bersama orang terdekat, dan menyambut hari dengan ritme yang lebih tertata."* Metric cells renamed to *"Keluarga Bertetangga"* and *"Clubhouse Bersama"*.
  - **Master Plan & Kenyamanan**: Section headers rewritten to invite exploration (*"Temukan Ritme Klaster yang Sesuai"*, *"Ketenangan yang Mengalir di Setiap Sudut"*).
  - **Jaminan & Perlindungan**: Renamed the 5th transparency tab from "Promo Presale" to "Jaminan Kenyamanan", outlining honest handover standards (SHM, kanopi carport, smart lock, water supply).
  - **Catatan Perjalanan Menuju Pulang**: Replaced sales testimonials with authentic, heartfelt resident reflections on safety, fresh air, low-density peace, and split SHM title certainty.
  - **Final CTA Banner**: Transformed from high-pressure urgency into a thoughtful invitation: *"Menemukan Rumah yang Terasa Tepat untuk Dijalani: Membeli rumah adalah keputusan sakral keluarga. Anda tidak harus merasa terdesak..."* with gentle button *"Mulai Percakapan dengan Mr. Andara"*.
- **Status**: Completed & Verified.

---

### [2026-11-22] Progress #30: Deluxe Master Plan UI & High-Contrast Japandi Site Plan Polish
- **Context & Objective**: Address user complaint ("kenapa jelek" in `media_1795325770551_cd28f273.jpg`) regarding washed-out and unstyled elements in the Beranda Master Plan section (`#secMasterPlan`).
- **Root Cause**:
  - `.kavling-pill-btn`, `.kavling-detail-card`, and `.siteplan-stats-grid` originally inherited dark-theme rules (`color: rgba(243, 239, 230, 0.85)` and `color: #ffffff`) designed for Room 04, rendering unreadable pale text and invisible lot titles on Beranda's white card background.
  - `.kavling-specs-grid` and `.kavling-spec-cell` lacked CSS definitions, collapsing lot specifications into unformatted, stacked plain text lines.
  - The lot reservation CTA button rendered as a pale beige pill without proper luxury styling.
- **Key Changes Implemented**:
  - **High-Contrast Scoped Styling (`#secMasterPlan` in `styles.css`)**:
    - Re-engineered `#secMasterPlan .kavling-pill-btn` with crisp `#16241c` text, `#fbfaf7` background, and `1.5px solid #dcd4c3` borders (min 44x44px touch targets). Active pill features solid `#16241c` background with bold white text.
    - Implemented `.kavling-specs-grid` as an elegant 2-column card grid with `#ffffff` backgrounds, subtle borders, high-contrast dark forest green values (`#16241c`), and rich gold price accents (`#936e28`).
    - Styled `#secMasterPlan .kavling-title` with serif typography in dark `#16241c`, making selected lot names crystal clear.
    - Replaced pale beige button with deluxe full-width `.btn-order-kavling` in deep forest green `#16241c` with white typography, smooth hover elevation, and directional arrow.
    - Re-styled `#secMasterPlan .siteplan-stats-grid` with warm off-white `#fbfaf7` container, crisp borders, uppercase labels, and dark `#16241c` figures replacing the muddy gray background.
    - Added floating gold UTARA compass badge over `#berandaSiteplanMapContainer`.
  - **Dynamic Lot Selection & Status Handlers (`app.js`)**:
    - Updated `selectBerandaLot` to apply semantic status classes (`status-available`, `status-booked`, `status-sold`).
    - Enhanced `orderInspectedLot` to pass dynamic lot prices accurately to `openOrderModal`.
- **Status**: Completed & Verified.

---

### [2026-11-22] Progress #31: Deluxe Layout Architecture for Katalog Produk Utama & Fasilitas Kawasan
- **Context & Objective**: Refactor and polish the UI layout for **KATALOG PRODUK UTAMA** (Pilihan Tipe Produk Hunian: Gold, Diamond, Royal Diamond) and **FASILITAS KAWASAN** (Fasilitas Eksklusif Penghuni: Clubhouse, Infinity Pool, Gym, Mini Golf, Game Station, One Gate Security).
- **Key Changes Implemented**:
  - **Katalog Produk Utama (`.product-showcase-section`, `.product-card-item`)**:
    - Structured bespoke product cards with status chips (`Ready & Indent`, `Eksklusif Intim`, `Grand Luxury`) and cluster tags.
    - Linked high-resolution authentic local renders (`house.jpeg`, `dalam-6.png`, `housee.jpeg`) with 16:9 ratio and frosted dimensional tags (`LB 75 m² · LT 60–63 m²`, etc.).
    - Built a structured 4-item specification grid (`.product-features-row`) with distinct tiles for Kamar Tidur, Kamar Mandi, Garasi (1+1 to 3 mobil), and 2 Lantai.
    - Styled dedicated financial breakdown boxes (`.product-pricing-box`) highlighting bold gold Cash Keras prices (`#936e28`, font-size 18px), Cash Tempo 24 bulan, and Bank KPR estimates.
    - Added dual tactile CTAs: secondary outline `[Lihat Denah ↗]` and rich forest green `[Pesan Unit →]`.
  - **Fasilitas Kawasan (`.facilities-six-grid`, `.facility-six-card`)**:
    - Re-architected 6-item facility grid into a clean, responsive 2-column layout (collapsing cleanly on narrow viewports with zero horizontal overflow).
    - Linked real assets for all 6 amenities (`clubhouse.png`, `clubhousee.png`, `room-bersama.jpg`, `housee.jpeg`, `dalam-12.png`, `gate.png`).
    - Added floating category badges (`.f-six-tag`) and numbered serial tags (`01` to `06`), paired with crisp typography and subtle card lift on hover.
  - **Modal & Consultation Handlers (`app.js`)**:
    - Defined `openDenahSpecModal(typeTitle, imgPath)` to dynamically populate architectural blueprint modals (`denah-tipe60.jpg`, `denah-tipe80.jpg`, `denah-tipe110.jpg`).
    - Defined `openOrderModal(clusterOrType, lotCode, price)` to initiate direct WhatsApp VIP consultations with pre-populated unit and pricing data.
- **Status**: Completed & Verified.

---

### [2026-11-22] Progress #32: Condensed Storytelling Prologue in Surat untuk Calon Penghuni
- **Context & Objective**: Condense the prologue letter in the Surat Cinta section per user request ("jangan terlalu panjang, ringkas aja"), removing wall-of-text fatigue while preserving its heartfelt poetic resonance and warm Japandi architectural essence.
- **Key Changes Implemented**:
  - **Distilled 2-Paragraph Structure (`index.html`)**:
    - Retained the salutation *"Untuk Anda yang ingin menemukan tempat pulang"*.
    - Consolidated paragraph 1 into a concise human-centric reflection on finding peace and order in daily life (*"Barangkali rumah yang Anda inginkan sederhana: ruang untuk meletakkan lelah, berkumpul bersama orang terdekat, dan lingkungan yang membuat keseharian mengalir tenang"*).
    - Preserved the core pullquote: *"Semoga Anda menemukan bukan hanya rumah yang menarik untuk dilihat, tetapi rumah yang terasa tepat untuk dijalani."*
    - Consolidated paragraph 2 into a focused summary of Japandi two-story architecture, enclosed garage, and the 3 distinct cluster characters (Nagoya near clubhouse, Osaka city corridor, Tokyo private serenity).
- **Status**: Completed & Verified.

---

### [2026-11-22] Progress #33: Deluxe Visual Overhaul for 3 Klaster Triptych Cards (Nagoya, Osaka, Tokyo)
- **Context & Objective**: Upgrade the 3 Cluster Triptych philosophy cards in Surat Cinta into an interactive visual showcase per user request.
- **Key Changes Implemented**:
  - **Visual Header & Local Assets (`index.html`)**:
    - Embedded dedicated photograph headers for each cluster: Nagoya ([clubhouse.png](file:///c:/Users/ASUS/.gemini/antigravity/scratch/the-park-townhouse/assets/drive/clubhouse.png)), Osaka ([housee.jpeg](file:///c:/Users/ASUS/.gemini/antigravity/scratch/the-park-townhouse/assets/drive/housee.jpeg)), and Tokyo ([dalam-6.png](file:///c:/Users/ASUS/.gemini/antigravity/scratch/the-park-townhouse/assets/drive/dalam-6.png)).
    - Added floating luxury tag badges (`KLASTER 01`, `KLASTER 02`, `KLASTER 03`) and building area tags (`LB 75–80 m²`, `LB 110 m²`, `LB 80 m²`).
  - **Semantic Hierarchy & Badges (`styles.css`)**:
    - Created high-contrast unit availability pills: `14 Unit Tersedia` (emerald), `9 Unit Eksklusif` (purple/gold), and `7 Unit Terbatas` (amber).
    - Styled cluster titles in serif `#16241c` with warm description copy.
    - Added location/character tags (`Jl. Tentara Pelajar · Clubhouse`, `Koridor Jl. Jend. Sudirman`, `Zen Enclave · 7 Unit Privat`) and direct interactive link buttons `[Peta Kawasan →]` switching the site plan view seamlessly to that cluster.
- **Status**: Completed & Verified.

---

### [2026-11-22] Progress #34: Alignment of Opening, Visual Overlays, Navbar, and Master Plan with Ruang 4/7 Architecture
- **Context & Objective**: Address the 6 visual refinement requests:
  1. Soften door button glow and eliminate symbols on 'Buka Pintu'.
  2. Synchronize typography of 'Ada rumah. Ada rasa pulang.' with Room 2 title style.
  3. Clean stacked layout for Room 5 and Room 6 visual tags to eliminate horizontal text overlap.
  4. Match navbar background with opening theme (#0c2318) and ensure no Tur 360 button.
  5. Harmonize Beranda Leaflet map coordinates and radar circles with Ruang 3 (Ruang Peta) and enforce 99 Keunggulan.
  6. Re-engineer Beranda Master Plan (#secMasterPlan) into the exact elegant architecture of Ruang 4/7 (4-column pill grid, vertical specs card, champagne pill CTA, top & bottom stats).
- **Key Changes Implemented**:
  - **Tombol Buka Pintu (styles.css, index.html)**: Removed pseudo-elements, dimmed box-shadow to 0 2px 8px rgba(0,0,0,0.18), confirmed text is strictly 'Buka Pintu'.
  - **Room 1 Typography (index.html)**: Removed overriding .hero-headline class so 'Ada rumah. Ada rasa pulang.' renders identically to .room-title in Cormorant Garamond serif.
  - **Visual Overlays (styles.css)**: Enforced column flex direction, tag pill isolation, and distinct sub-label margins for Room 5 and Room 6.
  - **Header Navbar (styles.css, index.html)**: Set .landing-navbar background to #0c2318 (deep forest) and verified absence of Tur 360 button.
  - **Lokasi & Radius (pp.js)**: Aligned map center to SUKOHARJO_CENTER [-7.6833, 110.8405] and configured radar rings.
  - **Beranda Site Plan (index.html, styles.css, pp.js)**: Replaced chunky boxes with the bespoke 4-column pill grid, clean vertical lot specs, and champagne action button matching Ruang 4/7.
- **Status**: Completed & Verified.

---

### [2026-11-22] Progress #35: Concentric Group Circles (Circle 1–3) Implementation on Interactive Maps
- **Context & Objective**: Group map destinations into 3 concentric distance tiers (Circle 1–3) per user request:
  1. Circle 1: Radius Inti (≤ 1.0 km) · Jalan Kaki & Aktivitas Harian.
  2. Circle 2: Radius Urban (1.0–2.5 km) · Pusat Layanan Kota & RSUD.
  3. Circle 3: Radius Regional (2.5–4.5 km) · Sentra Solo Baru, Stasiun & Tol.
- **Key Changes Implemented**:
  - **Leaflet Concentric Radar Rings (pp.js)**:
    - Placed 3 distinct concentric radar circles on both Beranda map and Ruang 3 map with high-visibility styling: Gold for Circle 1, Emerald Green for Circle 2, and Forest/Teal for Circle 3, each bound with informative tooltips.
  - **Interactive Circle Region Filter Bar (index.html, styles.css, pp.js)**:
    - Added dedicated filter tabs for Semua Lingkar, Circle 1 (≤ 1.0 km), Circle 2 (1.0–2.5 km), and Circle 3 (2.5–4.5 km).
    - Integrated smooth camera fly-to animations and dynamic ring opacity/border-weight emphasis upon selecting any circle tier.
  - **POI Classification & Badges (pp.js, styles.css)**:
    - Categorized all POIs into their respective circle tiers and added regional destination landmarks for Circle 3 (Stasiun Kereta Sukoharjo, The Park Mall Solo Baru, Akses Tol).
    - Rendered high-contrast semantic .poi-circle-chip badges (c1, c2, c3) on every POI card and colored map circle markers to match their respective circle tier.
  - **Floating Map Legend (index.html, styles.css)**:
    - Updated map overlay legend with dot badges for Pusat Kawasan, Circle 1 (1.0 km), Circle 2 (2.5 km), and Circle 3 (4.5 km).
- **Status**: Completed & Verified.

---

### [2026-11-22] Progress #36: Video Carousel below Navbar, Leaflet Radius Analysis & Authentic Osaka Wedge Siteplan
- **Context & Objective**:
  1. Position cinematic carousel directly beneath navbar with initial display 'assets/drive/dalam-6.png' and 5s auto-rotation.
  2. Implement 'Analisis Radius Aktif' component & OpenStreetMap Leaflet map matching user specification (Image 1 & Image 6).
  3. Enlarge navbar branding logo to 38px and make bookmark button frameless.
  4. Replace Osaka siteplan with 7-lot triangular wedge geometry (B.1–B.7) per Image 10.
- **Key Changes Implemented**:
  - **Video Carousel (index.html, styles.css, app.js)**:
    - Moved .landing-video-card to the top of #panelBeranda directly beneath navbar/marquee ticker.
    - Set initial displayed frame to 'assets/drive/dalam-6.png' (Scene 01 · Interior Hangat Bersahaja).
    - Enabled automatic scene progression interval of 5000ms after initial 500ms delay.
  - **Navbar Refinement (styles.css)**:
    - Enlarged .landing-logo from 28px to 38px for prominent visual brand identity.
    - Made .landing-bookmark-btn completely frameless (transparent background, zero border/shadow) with active gold bookmark icon.
  - **Analisis Radius Aktif & Leaflet Map (index.html, styles.css, app.js)**:
    - Integrated 'Analisis Radius Aktif' header, dynamic active radius badge (default 3 km), and facilities headline (e.g. '4 dari 6 fasilitas').
    - Added radius pills (500 m, 1 km, 3 km, 5 km, 10 km, 25 km) with flyTo camera zooms.
    - Added cluster focus pills (Semua, Nagoya, Osaka, Tokyo).
    - Replaced tiles with OpenStreetMap layer, top-right zoom control (+/-), center home badge with pulse animation, cluster pill badges (Osaka Gold, Nagoya Diamond, Tokyo Emerald), and facility pill badges (RSUD, SMAN 1, Alun-Alun, Stasiun).
  - **Authentic Osaka Triangular Wedge Siteplan (app.js, assets/drive/)**:
    - Replaced Osaka siteplan with authentic clean triangular wedge asset 'assets/drive/siteplan-osaka.jpg'.
    - Configured 7 lots (B.1–B.7) strictly aligned with the triangular wedge geometry from user Image 10.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #61: Redundant Unit Page Quick-Links Strip Removal
- **Context & Objective**: Remove duplicate navigation cards and horizontal quick-link bar (`.unit-page-quick-links` and `.unit-page-nav-bar`) from the Unit catalog page (`#panelUnit`), ensuring strict adherence to Rule 5 (single-source Mobile Bottom Navigation Bar) and a clean uncluttered presentation.
- **Key Changes Implemented**:
  - **Structure Simplification (index.html)**:
    - Removed redundant `.unit-page-nav-bar` ("Avenue Grand Gate · Sukoharjo", Sales Login) and `.unit-page-quick-links` ("THEPARKTOWNHOUSE", Beranda, Keunggulan, Unit, Fasilitas, Lokasi, Kalkulator, Hubungi Kami).
    - `#panelUnit` now initiates directly with `.unit-hero-header-card` ("Katalog Hunian · Pilihan Unit per Cluster").
  - **Stylesheet Optimization (styles.css)**:
    - Purged 105 lines of obsolete CSS rules (`.unit-page-nav-bar`, `.unit-nav-loc`, `.unit-nav-dot`, `.unit-nav-right`, `.unit-lang-pill`, `.unit-sales-login-link`, `.unit-page-quick-links`, `.unit-brand-logo-btn`, `.unit-quick-links-list`, `.unit-quick-link`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #62: Compact Unit Header Navbar with Clean Cluster Navigation
- **Context & Objective**: Refactor the large Unit hero card into a sleek, concise navbar header (`.unit-header-navbar`) with simplified copy and quick cluster navigation chips (Nagoya, Tokyo, Osaka).
- **Key Changes Implemented**:
  - **Navbar Layout & Simplified Copy (index.html)**:
    - Replaced heavy hero text with concise header: `Katalog Hunian` (gold tag), `Pilihan Unit` (title), and `30 Unit · Japandi Modern` (subtitle).
    - Added clean cluster jump pills (`Nagoya`, `Tokyo`, `Osaka`) that smoothly scroll directly to each cluster block on tap.
  - **Japandi Aesthetic & Mobile Styling (styles.css)**:
    - Styled `.unit-header-navbar` with deep forest green gradient (`#11332a` to `#1e4d40`), 12px rounded borders, and subtle shadow.
    - Added `.unit-nav-chip` buttons with 32px height, soft translucent background, and gold accent active states matching design system tokens.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #63: Collapsible Drawer & Horizontal Swipe Chips for Unit Filter
- **Context & Objective**: Compact the tall, multi-row Unit catalog filter card into an expandable drawer with a filter icon toggle trigger and horizontal swipeable chip scrollers.
- **Key Changes Implemented**:
  - **Collapsible Filter Drawer (index.html, styles.css, app.js)**:
    - Created `.unit-filter-toggle-btn` with funnel filter icon, live summary of active filters, active filter count badge, and animated chevron indicator.
    - Wrapped filter options in `#filterControlsWrapper`, defaulting to collapsed state to eliminate vertical clutter.
    - Added `toggleUnitFilterCard()` and `updateUnitFilterSummary()` in `app.js` to handle opening/closing and live status badge updates.
  - **Horizontal Swipeable Chip Scrollers (index.html & styles.css)**:
    - Converted wrapped multi-line chips into single-row horizontal swipe scrollers (`.filter-chips-scroller`) for Tipe Unit, Luas Tanah, Range Harga, and Posisi Kavling.
    - Added `geser ↔` hint, smooth scrolling, and touch inertia (`-webkit-overflow-scrolling: touch`) with 32px min-height tap targets conforming to Rule 5.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #64: Responsive 2-to-3 Column Layout for Unit Product Cards
- **Context & Objective**: Compact the oversized unit product cards in the catalog (`.unit-inventory-grid`) into a refined 2-column layout on mobile and 3-column layout on tablet/desktop, preventing bulky single-column stretching.
- **Key Changes Implemented**:
  - **Multi-Column Grid Architecture (styles.css)**:
    - Replaced loose `repeat(auto-fill, minmax(180px, 1fr))` with strict `grid-template-columns: repeat(2, 1fr)` on mobile (< 640px) and `repeat(3, 1fr)` on wider screens (>= 640px).
    - Reduced inter-card spacing to 8px on mobile and 12px on desktop.
  - **Compact Visual Dimensions & Typography (styles.css)**:
    - Compacted `.uic-media` height to 90px (mobile) / 105px (desktop) with 1.04x subtle zoom hover.
    - Streamlined body padding to 8px and tuned font sizes (`.uic-id`: 12.5px, `.uic-price-val`: 11.5px bold forest green, `.uic-specs`: 9.5px).
    - Compacted primary action button (`.uic-action-btn`) to 30px height with crisp 10.5px text and 4px gap.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #65: Clean Button Copy Simplification (Remove Arrow from "Pesan Kavling Ini")
- **Context & Objective**: Remove trailing arrow symbols (`→`) from the unit order CTA buttons, leaving clean and centered "Pesan Kavling Ini" copy across catalog cards and site plan inspector cards.
- **Key Changes Implemented**:
  - **Product Card Action Button (app.js)**:
    - In `renderLandingUnits()`, removed `<span>→</span>` from `.uic-action-btn`, displaying clean `<span>Pesan Kavling Ini</span>`.
  - **Site Plan Inspector Buttons (index.html)**:
    - Removed `<span>→</span>` from `.btn-order-kavling-champagne` in both Beranda (`#berandaLotInspector`) and Site Plan page (`#pageLotInspector`), standardizing text to `<span>Pesan Kavling Ini</span>`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #66: Comprehensive Arrow Symbol Removal Across All Pages
- **Context & Objective**: Remove all trailing and inline arrow symbols (`→`, `←`, `&rarr;`, `&larr;`) from buttons, links, and cards across all pages and modals for a cleaner, unified typography.
- **Key Changes Implemented**:
  - **HTML Buttons & Links Cleaned (index.html)**:
    - Removed all 44 occurrences of `<span>→</span>` from primary CTAs (CTA cards, tour buttons, showcase buttons, quiz items, facilities cards, Super App action buttons, and footer links).
    - Removed trailing arrows from Super App action triggers (`Unlock`, `Generate QR`, `Pesan Slot`, `Bayar`, `Buat Laporan`, `Kirim SOS`).
    - Cleaned `.back-arrow` symbols from subpage headers.
  - **JavaScript Dynamic Templates Cleaned (app.js)**:
    - Cleaned `<span>→</span>` from modal CTAs (WhatsApp modal, tour finish modal, booking modal, 99 keunggulan explorer).
    - Removed `→` and `←` from theme switcher navigation buttons (`Tema Sebelumnya` and `Tema Berikutnya`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #67: Dedicated Interactive Unit Product Detail Page Integration
- **Context & Objective**: Enable clickable product cards in the Unit catalog that open a dedicated, harmonized Product Detail subpage (`#unitDetailView`) for every individual unit (all 30 units across Nagoya, Tokyo, and Osaka).
- **Key Changes Implemented**:
  - **Dedicated Unit Detail View Architecture (index.html)**:
    - Built `#unitDetailView` inside `#panelUnit` with back navigation bar (`Katalog Unit`), dynamic cluster tag, lot ID title, and quick order action.
    - Hero gallery featuring 220px/280px architectural photography, status badge (Tersedia/Terjual), Japandi type subtitle, price summary strip, and estimated monthly installment.
    - 4 architecture metric cards (Kamar Tidur, Kamar Mandi, Luas Bangunan, Luas Tanah).
    - Living character & specifications section with 4 bespoke Japandi comfort highlights (Cross Ventilation, Carport Teduh, One-Gate 24h, Legalitas SHM).
    - Flexible payment schemes card (Cash Keras, Cash Bertahap 0%, KPR Express).
    - Fixed bottom floating action bar with live price, direct WhatsApp inquiry, and "Pesan Kavling Ini" primary CTA button.
  - **Interactive View Management & Dynamic Data Binding (app.js)**:
    - Upgraded `.unit-inventory-card` with `onclick="openUnitDetail('${clusterKey}', '${u.id}')"` while preserving `event.stopPropagation()` on the direct order button.
    - Implemented `openUnitDetail(clusterKey, unitId)` populating photos, titles, prices, specs, and status dynamically for all 30 units.
    - Implemented `closeUnitDetail()` returning cleanly to `#unitCatalogHub`.
    - Implemented `orderCurrentDetailUnit()` hooking into the global booking modal.
  - **Design System Harmonization (styles.css)**:
    - Applied forest green luxury palette (`#11332a` to `#1e4d40`), champagne gold accents (`#dfb96d`), 12px/14px rounded cards, and proper mobile bottom bar clearances.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #68: Remove Lighting Mood Switcher Pill Bar from Header
- **Context & Objective**: Remove the "Siang / Senja / Malam" lighting mood switcher element (`#landingLightingSwitch`) from the global sticky header (`.landing-navbar`) to keep the top bar clean and uncluttered.
- **Key Changes Implemented**:
  - **Header Cleanup (index.html)**:
    - Removed `#landingLightingSwitch` and its 3 mood buttons (`#moodDayBtn`, `#moodDuskBtn`, `#moodNightBtn`) from `.landing-nav-actions`.
    - Cleaned up top header, retaining only the brand logo and bookmark saved configuration button.
  - **Stylesheet Optimization (styles.css)**:
    - Removed `.landing-lighting-switch` and `.lighting-pill-btn` CSS styling rules.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #69: Simplify 11 Themes Header to Centered Title
- **Context & Objective**: Clean up the section header above the 11 theme chips in Surat Cinta tab (`#section99Keunggulan`), removing the tag (`99 KEUNGGULAN · SUKOHARJO`) and subtitle description, keeping only the centered title "Telusuri 11 Tema Keunggulan".
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Stripped `.section-tag` and `.section-desc`.
    - Centered `.section-title` ("Telusuri 11 Tema Keunggulan") using `text-align: center; margin: 0;`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #70: Refined Luxury Card Redesign for 'Surat Resmi Dari Pengembang' Banner
- **Context & Objective**: Elevate the visual appeal and layout structure of `.surat-compact-banner` in Surat Cinta tab, crafting an authentic luxury aesthetic with gold accents, deep forest tones, and champagne button contrast.
- **Key Changes Implemented**:
  - **Enhanced Layout & Card Hierarchy (index.html)**:
    - Grouped title and subtitle into `.surat-banner-body` for consistent text flow.
    - Wrapped CTA button in `.surat-banner-action-wrap` with improved padding and breathing room.
  - **Japandi Luxury Styling & Accents (styles.css)**:
    - Applied multi-stop deep forest gradient (`#11332a` to `#0d261f` to `#173d32`) with gold border accent (`rgba(223, 185, 109, 0.45)`) and subtle radial ambient glow (`::before`).
    - Elevated wax seal badge (`.surat-wax-badge-mini`) with champagne border and refined letter-spacing.
    - Redesigned `.btn-open-surat-modal` with warm champagne gold gradient (`linear-gradient(135deg, #dfb96d 0%, #c59b48 100%)`), deep forest typography, and smooth hover micro-interaction.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #71: Streamlined Visual-First Cluster Cards (Nagoya, Osaka, Tokyo)
- **Context & Objective**: Clean up and declutter the 3 cluster triptych cards in Surat Cinta tab, removing long paragraph descriptions, emphasizing architectural product imagery, and removing the trailing arrow from "Peta Kawasan".
- **Key Changes Implemented**:
  - **Visual-First Layout & Decluttering (index.html)**:
    - Removed long paragraph descriptions (`.cluster-card-desc`) across Nagoya, Osaka, and Tokyo cards.
    - Simplified footer to streamlined location tag (`stat-loc`) and compact action button without arrows.
    - Made the entire card surface clickable (`onclick="switchLandingTab('siteplan'); switchLandingSiteplan(...)`) for seamless navigation.
  - **Elevated Photography Dimensions (styles.css)**:
    - Increased image container height (`.cluster-card-img-wrap`) from 85px to 120px (mobile) / 135px (desktop), giving priority to visual architectural rendering.
    - Refined badge styling and unified `.btn-cluster-explore` with forest green gradient.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #72: Minimalist Header & Segmented Toggle for Gold vs Diamond Specs
- **Context & Objective**: Declutter the architectural type comparison section in Surat Cinta tab, removing wordy subtitles and aligning the pill buttons into an elegant segmented toggle.
- **Key Changes Implemented**:
  - **Header Decluttering (index.html)**:
    - Removed redundant `.section-tag` and long `.section-desc`.
    - Simplified title to clean, centered "Tipe Gold & Diamond" (`text-align: center; margin: 0;`).
  - **Segmented Control Toggle (styles.css)**:
    - Refactored `.spec-toggle-bar` into a unified segmented control capsule with subtle border (`1px solid #e8e2d5`), neutral background (`#fbfaf7`), and 4px padding.
    - Elevated active button (`.spec-tab-btn.is-active`) with forest green gradient (`#11332a` to `#1e4d40`), crisp white text, and subtle elevation shadow.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #73: Visual Photographic Enrichment & Streamlined Price Matrix
- **Context & Objective**: Transform the text-heavy and dull price list cards in Surat Cinta tab into engaging visual product cards with architectural photography banners, decluttered titles, and prominent unit selection actions.
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Removed redundant tag and description, keeping only the clean centered title "Pilihan Unit & Skema Pembayaran".
  - **Photographic Banner Integration (app.js)**:
    - In `renderPriceMatrix()`, added `.price-card-banner` with authentic architectural photo thumbnails matching each cluster (Nagoya, Tokyo, Osaka).
    - Added dark gradient overlay with bold serif unit ID, clean dimension specs, and floating "Pilih Unit" primary action pill.
  - **Modern Card Grid Styling (styles.css)**:
    - Elevated `.price-unit-card` with 12px radius, smooth hover lift (-2px), 95px banner image with 1.04x zoom hover, and 2-column pricing tiles (Cash Keras, Cash Tempo 12/24 Bulan, KPR Bank).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-22] Progress #37: Conditional Mobile Bottom Navigation Bar (Display Only After Config Saved)
- **Context & Objective**: Display the mobile bottom navigation bar (.landing-bottom-bar) ONLY after the user saves their house/room configuration.
- **Key Changes Implemented**:
  - **Styles (styles.css)**:
    - Set .landing-bottom-bar default state to 'display: none;', opacity: 0, and translateY(100%).
    - Added .landing-bottom-bar.is-visible with 'display: grid !important;', slide-up animation, and full opacity.
    - Adjusted .landing-content-scroll padding to 24px when bottom bar is hidden, dynamically increasing to 'calc(68px + env(safe-area-inset-bottom, 16px))' via .has-saved-config when bottom bar is displayed.
  - **Markup (index.html)**:
    - Added inline 'style="display: none;"' to #landingBottomBar to prevent any layout shift before state initialization.
  - **State Controller (app.js)**:
    - Created checkHasSavedConfiguration() and updateBottomBarVisibility() checking localStorage ('theParkSavedConfig') and session state (window.__hasSavedConfigSession).
    - Added saveCurrentConfigToStorage() syncing unit, lot, pricing, and payment specifications to localStorage.
    - Wired triggers in saveRoomCustomization() (Ruang 4), saveSiteplanChoice() (Ruang 4), openQuickModal('save') (Ruang 7), orderInspectedLot() (Beranda), selectUnitFromLanding(), and initLandingPage().
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #61: Redundant Unit Page Quick-Links Strip Removal
- **Context & Objective**: Remove duplicate navigation cards and horizontal quick-link bar (`.unit-page-quick-links` and `.unit-page-nav-bar`) from the Unit catalog page (`#panelUnit`), ensuring strict adherence to Rule 5 (single-source Mobile Bottom Navigation Bar) and a clean uncluttered presentation.
- **Key Changes Implemented**:
  - **Structure Simplification (index.html)**:
    - Removed redundant `.unit-page-nav-bar` ("Avenue Grand Gate · Sukoharjo", Sales Login) and `.unit-page-quick-links` ("THEPARKTOWNHOUSE", Beranda, Keunggulan, Unit, Fasilitas, Lokasi, Kalkulator, Hubungi Kami).
    - `#panelUnit` now initiates directly with `.unit-hero-header-card` ("Katalog Hunian · Pilihan Unit per Cluster").
  - **Stylesheet Optimization (styles.css)**:
    - Purged 105 lines of obsolete CSS rules (`.unit-page-nav-bar`, `.unit-nav-loc`, `.unit-nav-dot`, `.unit-nav-right`, `.unit-lang-pill`, `.unit-sales-login-link`, `.unit-page-quick-links`, `.unit-brand-logo-btn`, `.unit-quick-links-list`, `.unit-quick-link`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #62: Compact Unit Header Navbar with Clean Cluster Navigation
- **Context & Objective**: Refactor the large Unit hero card into a sleek, concise navbar header (`.unit-header-navbar`) with simplified copy and quick cluster navigation chips (Nagoya, Tokyo, Osaka).
- **Key Changes Implemented**:
  - **Navbar Layout & Simplified Copy (index.html)**:
    - Replaced heavy hero text with concise header: `Katalog Hunian` (gold tag), `Pilihan Unit` (title), and `30 Unit · Japandi Modern` (subtitle).
    - Added clean cluster jump pills (`Nagoya`, `Tokyo`, `Osaka`) that smoothly scroll directly to each cluster block on tap.
  - **Japandi Aesthetic & Mobile Styling (styles.css)**:
    - Styled `.unit-header-navbar` with deep forest green gradient (`#11332a` to `#1e4d40`), 12px rounded borders, and subtle shadow.
    - Added `.unit-nav-chip` buttons with 32px height, soft translucent background, and gold accent active states matching design system tokens.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #63: Collapsible Drawer & Horizontal Swipe Chips for Unit Filter
- **Context & Objective**: Compact the tall, multi-row Unit catalog filter card into an expandable drawer with a filter icon toggle trigger and horizontal swipeable chip scrollers.
- **Key Changes Implemented**:
  - **Collapsible Filter Drawer (index.html, styles.css, app.js)**:
    - Created `.unit-filter-toggle-btn` with funnel filter icon, live summary of active filters, active filter count badge, and animated chevron indicator.
    - Wrapped filter options in `#filterControlsWrapper`, defaulting to collapsed state to eliminate vertical clutter.
    - Added `toggleUnitFilterCard()` and `updateUnitFilterSummary()` in `app.js` to handle opening/closing and live status badge updates.
  - **Horizontal Swipeable Chip Scrollers (index.html & styles.css)**:
    - Converted wrapped multi-line chips into single-row horizontal swipe scrollers (`.filter-chips-scroller`) for Tipe Unit, Luas Tanah, Range Harga, and Posisi Kavling.
    - Added `geser ↔` hint, smooth scrolling, and touch inertia (`-webkit-overflow-scrolling: touch`) with 32px min-height tap targets conforming to Rule 5.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #64: Responsive 2-to-3 Column Layout for Unit Product Cards
- **Context & Objective**: Compact the oversized unit product cards in the catalog (`.unit-inventory-grid`) into a refined 2-column layout on mobile and 3-column layout on tablet/desktop, preventing bulky single-column stretching.
- **Key Changes Implemented**:
  - **Multi-Column Grid Architecture (styles.css)**:
    - Replaced loose `repeat(auto-fill, minmax(180px, 1fr))` with strict `grid-template-columns: repeat(2, 1fr)` on mobile (< 640px) and `repeat(3, 1fr)` on wider screens (>= 640px).
    - Reduced inter-card spacing to 8px on mobile and 12px on desktop.
  - **Compact Visual Dimensions & Typography (styles.css)**:
    - Compacted `.uic-media` height to 90px (mobile) / 105px (desktop) with 1.04x subtle zoom hover.
    - Streamlined body padding to 8px and tuned font sizes (`.uic-id`: 12.5px, `.uic-price-val`: 11.5px bold forest green, `.uic-specs`: 9.5px).
    - Compacted primary action button (`.uic-action-btn`) to 30px height with crisp 10.5px text and 4px gap.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #65: Clean Button Copy Simplification (Remove Arrow from "Pesan Kavling Ini")
- **Context & Objective**: Remove trailing arrow symbols (`→`) from the unit order CTA buttons, leaving clean and centered "Pesan Kavling Ini" copy across catalog cards and site plan inspector cards.
- **Key Changes Implemented**:
  - **Product Card Action Button (app.js)**:
    - In `renderLandingUnits()`, removed `<span>→</span>` from `.uic-action-btn`, displaying clean `<span>Pesan Kavling Ini</span>`.
  - **Site Plan Inspector Buttons (index.html)**:
    - Removed `<span>→</span>` from `.btn-order-kavling-champagne` in both Beranda (`#berandaLotInspector`) and Site Plan page (`#pageLotInspector`), standardizing text to `<span>Pesan Kavling Ini</span>`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #66: Comprehensive Arrow Symbol Removal Across All Pages
- **Context & Objective**: Remove all trailing and inline arrow symbols (`→`, `←`, `&rarr;`, `&larr;`) from buttons, links, and cards across all pages and modals for a cleaner, unified typography.
- **Key Changes Implemented**:
  - **HTML Buttons & Links Cleaned (index.html)**:
    - Removed all 44 occurrences of `<span>→</span>` from primary CTAs (CTA cards, tour buttons, showcase buttons, quiz items, facilities cards, Super App action buttons, and footer links).
    - Removed trailing arrows from Super App action triggers (`Unlock`, `Generate QR`, `Pesan Slot`, `Bayar`, `Buat Laporan`, `Kirim SOS`).
    - Cleaned `.back-arrow` symbols from subpage headers.
  - **JavaScript Dynamic Templates Cleaned (app.js)**:
    - Cleaned `<span>→</span>` from modal CTAs (WhatsApp modal, tour finish modal, booking modal, 99 keunggulan explorer).
    - Removed `→` and `←` from theme switcher navigation buttons (`Tema Sebelumnya` and `Tema Berikutnya`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #67: Dedicated Interactive Unit Product Detail Page Integration
- **Context & Objective**: Enable clickable product cards in the Unit catalog that open a dedicated, harmonized Product Detail subpage (`#unitDetailView`) for every individual unit (all 30 units across Nagoya, Tokyo, and Osaka).
- **Key Changes Implemented**:
  - **Dedicated Unit Detail View Architecture (index.html)**:
    - Built `#unitDetailView` inside `#panelUnit` with back navigation bar (`Katalog Unit`), dynamic cluster tag, lot ID title, and quick order action.
    - Hero gallery featuring 220px/280px architectural photography, status badge (Tersedia/Terjual), Japandi type subtitle, price summary strip, and estimated monthly installment.
    - 4 architecture metric cards (Kamar Tidur, Kamar Mandi, Luas Bangunan, Luas Tanah).
    - Living character & specifications section with 4 bespoke Japandi comfort highlights (Cross Ventilation, Carport Teduh, One-Gate 24h, Legalitas SHM).
    - Flexible payment schemes card (Cash Keras, Cash Bertahap 0%, KPR Express).
    - Fixed bottom floating action bar with live price, direct WhatsApp inquiry, and "Pesan Kavling Ini" primary CTA button.
  - **Interactive View Management & Dynamic Data Binding (app.js)**:
    - Upgraded `.unit-inventory-card` with `onclick="openUnitDetail('${clusterKey}', '${u.id}')"` while preserving `event.stopPropagation()` on the direct order button.
    - Implemented `openUnitDetail(clusterKey, unitId)` populating photos, titles, prices, specs, and status dynamically for all 30 units.
    - Implemented `closeUnitDetail()` returning cleanly to `#unitCatalogHub`.
    - Implemented `orderCurrentDetailUnit()` hooking into the global booking modal.
  - **Design System Harmonization (styles.css)**:
    - Applied forest green luxury palette (`#11332a` to `#1e4d40`), champagne gold accents (`#dfb96d`), 12px/14px rounded cards, and proper mobile bottom bar clearances.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #68: Remove Lighting Mood Switcher Pill Bar from Header
- **Context & Objective**: Remove the "Siang / Senja / Malam" lighting mood switcher element (`#landingLightingSwitch`) from the global sticky header (`.landing-navbar`) to keep the top bar clean and uncluttered.
- **Key Changes Implemented**:
  - **Header Cleanup (index.html)**:
    - Removed `#landingLightingSwitch` and its 3 mood buttons (`#moodDayBtn`, `#moodDuskBtn`, `#moodNightBtn`) from `.landing-nav-actions`.
    - Cleaned up top header, retaining only the brand logo and bookmark saved configuration button.
  - **Stylesheet Optimization (styles.css)**:
    - Removed `.landing-lighting-switch` and `.lighting-pill-btn` CSS styling rules.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #69: Simplify 11 Themes Header to Centered Title
- **Context & Objective**: Clean up the section header above the 11 theme chips in Surat Cinta tab (`#section99Keunggulan`), removing the tag (`99 KEUNGGULAN · SUKOHARJO`) and subtitle description, keeping only the centered title "Telusuri 11 Tema Keunggulan".
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Stripped `.section-tag` and `.section-desc`.
    - Centered `.section-title` ("Telusuri 11 Tema Keunggulan") using `text-align: center; margin: 0;`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #70: Refined Luxury Card Redesign for 'Surat Resmi Dari Pengembang' Banner
- **Context & Objective**: Elevate the visual appeal and layout structure of `.surat-compact-banner` in Surat Cinta tab, crafting an authentic luxury aesthetic with gold accents, deep forest tones, and champagne button contrast.
- **Key Changes Implemented**:
  - **Enhanced Layout & Card Hierarchy (index.html)**:
    - Grouped title and subtitle into `.surat-banner-body` for consistent text flow.
    - Wrapped CTA button in `.surat-banner-action-wrap` with improved padding and breathing room.
  - **Japandi Luxury Styling & Accents (styles.css)**:
    - Applied multi-stop deep forest gradient (`#11332a` to `#0d261f` to `#173d32`) with gold border accent (`rgba(223, 185, 109, 0.45)`) and subtle radial ambient glow (`::before`).
    - Elevated wax seal badge (`.surat-wax-badge-mini`) with champagne border and refined letter-spacing.
    - Redesigned `.btn-open-surat-modal` with warm champagne gold gradient (`linear-gradient(135deg, #dfb96d 0%, #c59b48 100%)`), deep forest typography, and smooth hover micro-interaction.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #71: Streamlined Visual-First Cluster Cards (Nagoya, Osaka, Tokyo)
- **Context & Objective**: Clean up and declutter the 3 cluster triptych cards in Surat Cinta tab, removing long paragraph descriptions, emphasizing architectural product imagery, and removing the trailing arrow from "Peta Kawasan".
- **Key Changes Implemented**:
  - **Visual-First Layout & Decluttering (index.html)**:
    - Removed long paragraph descriptions (`.cluster-card-desc`) across Nagoya, Osaka, and Tokyo cards.
    - Simplified footer to streamlined location tag (`stat-loc`) and compact action button without arrows.
    - Made the entire card surface clickable (`onclick="switchLandingTab('siteplan'); switchLandingSiteplan(...)`) for seamless navigation.
  - **Elevated Photography Dimensions (styles.css)**:
    - Increased image container height (`.cluster-card-img-wrap`) from 85px to 120px (mobile) / 135px (desktop), giving priority to visual architectural rendering.
    - Refined badge styling and unified `.btn-cluster-explore` with forest green gradient.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #72: Minimalist Header & Segmented Toggle for Gold vs Diamond Specs
- **Context & Objective**: Declutter the architectural type comparison section in Surat Cinta tab, removing wordy subtitles and aligning the pill buttons into an elegant segmented toggle.
- **Key Changes Implemented**:
  - **Header Decluttering (index.html)**:
    - Removed redundant `.section-tag` and long `.section-desc`.
    - Simplified title to clean, centered "Tipe Gold & Diamond" (`text-align: center; margin: 0;`).
  - **Segmented Control Toggle (styles.css)**:
    - Refactored `.spec-toggle-bar` into a unified segmented control capsule with subtle border (`1px solid #e8e2d5`), neutral background (`#fbfaf7`), and 4px padding.
    - Elevated active button (`.spec-tab-btn.is-active`) with forest green gradient (`#11332a` to `#1e4d40`), crisp white text, and subtle elevation shadow.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #73: Visual Photographic Enrichment & Streamlined Price Matrix
- **Context & Objective**: Transform the text-heavy and dull price list cards in Surat Cinta tab into engaging visual product cards with architectural photography banners, decluttered titles, and prominent unit selection actions.
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Removed redundant tag and description, keeping only the clean centered title "Pilihan Unit & Skema Pembayaran".
  - **Photographic Banner Integration (app.js)**:
    - In `renderPriceMatrix()`, added `.price-card-banner` with authentic architectural photo thumbnails matching each cluster (Nagoya, Tokyo, Osaka).
    - Added dark gradient overlay with bold serif unit ID, clean dimension specs, and floating "Pilih Unit" primary action pill.
  - **Modern Card Grid Styling (styles.css)**:
    - Elevated `.price-unit-card` with 12px radius, smooth hover lift (-2px), 95px banner image with 1.04x zoom hover, and 2-column pricing tiles (Cash Keras, Cash Tempo 12/24 Bulan, KPR Bank).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-22] Progress #38: Fix Leaflet 403 Access Blocked by Migrating to CARTO Voyager OSM Tiles
- **Context & Objective**: Resolve HTTP 403 Forbidden error on map tiles ("Access blocked: App is not following tile usage policy of OpenStreetMap's tile server") shown in user screenshot.
- **Root Cause**:
  - OpenStreetMap's official server (tile.openstreetmap.org) strictly blocks web/mobile applications and localhost requests that do not adhere to their restricted non-commercial API usage policy.
- **Solution & Implementation**:
  - **Tile Provider Migration (app.js)**:
    - Replaced `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png` with **CARTO Voyager** (`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`).
    - CARTO Voyager uses genuine OpenStreetMap data, allows unrestricted web/app tile requests, loads fast, and has 0% policy block rate.
    - Updated attribution to OpenStreetMap & CARTO.
  - **Layout & Floating Legend Adjustment (index.html, styles.css)**:
    - Moved `.map-floating-legend` to bottom-left (`bottom: 10px; left: 10px;`) to prevent collision with top-right zoom controls (+/-) and facility markers.
    - Embedded the full 'Analisis Radius Aktif' card directly in `#secLokasiRadius`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #61: Redundant Unit Page Quick-Links Strip Removal
- **Context & Objective**: Remove duplicate navigation cards and horizontal quick-link bar (`.unit-page-quick-links` and `.unit-page-nav-bar`) from the Unit catalog page (`#panelUnit`), ensuring strict adherence to Rule 5 (single-source Mobile Bottom Navigation Bar) and a clean uncluttered presentation.
- **Key Changes Implemented**:
  - **Structure Simplification (index.html)**:
    - Removed redundant `.unit-page-nav-bar` ("Avenue Grand Gate · Sukoharjo", Sales Login) and `.unit-page-quick-links` ("THEPARKTOWNHOUSE", Beranda, Keunggulan, Unit, Fasilitas, Lokasi, Kalkulator, Hubungi Kami).
    - `#panelUnit` now initiates directly with `.unit-hero-header-card` ("Katalog Hunian · Pilihan Unit per Cluster").
  - **Stylesheet Optimization (styles.css)**:
    - Purged 105 lines of obsolete CSS rules (`.unit-page-nav-bar`, `.unit-nav-loc`, `.unit-nav-dot`, `.unit-nav-right`, `.unit-lang-pill`, `.unit-sales-login-link`, `.unit-page-quick-links`, `.unit-brand-logo-btn`, `.unit-quick-links-list`, `.unit-quick-link`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #62: Compact Unit Header Navbar with Clean Cluster Navigation
- **Context & Objective**: Refactor the large Unit hero card into a sleek, concise navbar header (`.unit-header-navbar`) with simplified copy and quick cluster navigation chips (Nagoya, Tokyo, Osaka).
- **Key Changes Implemented**:
  - **Navbar Layout & Simplified Copy (index.html)**:
    - Replaced heavy hero text with concise header: `Katalog Hunian` (gold tag), `Pilihan Unit` (title), and `30 Unit · Japandi Modern` (subtitle).
    - Added clean cluster jump pills (`Nagoya`, `Tokyo`, `Osaka`) that smoothly scroll directly to each cluster block on tap.
  - **Japandi Aesthetic & Mobile Styling (styles.css)**:
    - Styled `.unit-header-navbar` with deep forest green gradient (`#11332a` to `#1e4d40`), 12px rounded borders, and subtle shadow.
    - Added `.unit-nav-chip` buttons with 32px height, soft translucent background, and gold accent active states matching design system tokens.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #63: Collapsible Drawer & Horizontal Swipe Chips for Unit Filter
- **Context & Objective**: Compact the tall, multi-row Unit catalog filter card into an expandable drawer with a filter icon toggle trigger and horizontal swipeable chip scrollers.
- **Key Changes Implemented**:
  - **Collapsible Filter Drawer (index.html, styles.css, app.js)**:
    - Created `.unit-filter-toggle-btn` with funnel filter icon, live summary of active filters, active filter count badge, and animated chevron indicator.
    - Wrapped filter options in `#filterControlsWrapper`, defaulting to collapsed state to eliminate vertical clutter.
    - Added `toggleUnitFilterCard()` and `updateUnitFilterSummary()` in `app.js` to handle opening/closing and live status badge updates.
  - **Horizontal Swipeable Chip Scrollers (index.html & styles.css)**:
    - Converted wrapped multi-line chips into single-row horizontal swipe scrollers (`.filter-chips-scroller`) for Tipe Unit, Luas Tanah, Range Harga, and Posisi Kavling.
    - Added `geser ↔` hint, smooth scrolling, and touch inertia (`-webkit-overflow-scrolling: touch`) with 32px min-height tap targets conforming to Rule 5.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #64: Responsive 2-to-3 Column Layout for Unit Product Cards
- **Context & Objective**: Compact the oversized unit product cards in the catalog (`.unit-inventory-grid`) into a refined 2-column layout on mobile and 3-column layout on tablet/desktop, preventing bulky single-column stretching.
- **Key Changes Implemented**:
  - **Multi-Column Grid Architecture (styles.css)**:
    - Replaced loose `repeat(auto-fill, minmax(180px, 1fr))` with strict `grid-template-columns: repeat(2, 1fr)` on mobile (< 640px) and `repeat(3, 1fr)` on wider screens (>= 640px).
    - Reduced inter-card spacing to 8px on mobile and 12px on desktop.
  - **Compact Visual Dimensions & Typography (styles.css)**:
    - Compacted `.uic-media` height to 90px (mobile) / 105px (desktop) with 1.04x subtle zoom hover.
    - Streamlined body padding to 8px and tuned font sizes (`.uic-id`: 12.5px, `.uic-price-val`: 11.5px bold forest green, `.uic-specs`: 9.5px).
    - Compacted primary action button (`.uic-action-btn`) to 30px height with crisp 10.5px text and 4px gap.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #65: Clean Button Copy Simplification (Remove Arrow from "Pesan Kavling Ini")
- **Context & Objective**: Remove trailing arrow symbols (`→`) from the unit order CTA buttons, leaving clean and centered "Pesan Kavling Ini" copy across catalog cards and site plan inspector cards.
- **Key Changes Implemented**:
  - **Product Card Action Button (app.js)**:
    - In `renderLandingUnits()`, removed `<span>→</span>` from `.uic-action-btn`, displaying clean `<span>Pesan Kavling Ini</span>`.
  - **Site Plan Inspector Buttons (index.html)**:
    - Removed `<span>→</span>` from `.btn-order-kavling-champagne` in both Beranda (`#berandaLotInspector`) and Site Plan page (`#pageLotInspector`), standardizing text to `<span>Pesan Kavling Ini</span>`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #66: Comprehensive Arrow Symbol Removal Across All Pages
- **Context & Objective**: Remove all trailing and inline arrow symbols (`→`, `←`, `&rarr;`, `&larr;`) from buttons, links, and cards across all pages and modals for a cleaner, unified typography.
- **Key Changes Implemented**:
  - **HTML Buttons & Links Cleaned (index.html)**:
    - Removed all 44 occurrences of `<span>→</span>` from primary CTAs (CTA cards, tour buttons, showcase buttons, quiz items, facilities cards, Super App action buttons, and footer links).
    - Removed trailing arrows from Super App action triggers (`Unlock`, `Generate QR`, `Pesan Slot`, `Bayar`, `Buat Laporan`, `Kirim SOS`).
    - Cleaned `.back-arrow` symbols from subpage headers.
  - **JavaScript Dynamic Templates Cleaned (app.js)**:
    - Cleaned `<span>→</span>` from modal CTAs (WhatsApp modal, tour finish modal, booking modal, 99 keunggulan explorer).
    - Removed `→` and `←` from theme switcher navigation buttons (`Tema Sebelumnya` and `Tema Berikutnya`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #67: Dedicated Interactive Unit Product Detail Page Integration
- **Context & Objective**: Enable clickable product cards in the Unit catalog that open a dedicated, harmonized Product Detail subpage (`#unitDetailView`) for every individual unit (all 30 units across Nagoya, Tokyo, and Osaka).
- **Key Changes Implemented**:
  - **Dedicated Unit Detail View Architecture (index.html)**:
    - Built `#unitDetailView` inside `#panelUnit` with back navigation bar (`Katalog Unit`), dynamic cluster tag, lot ID title, and quick order action.
    - Hero gallery featuring 220px/280px architectural photography, status badge (Tersedia/Terjual), Japandi type subtitle, price summary strip, and estimated monthly installment.
    - 4 architecture metric cards (Kamar Tidur, Kamar Mandi, Luas Bangunan, Luas Tanah).
    - Living character & specifications section with 4 bespoke Japandi comfort highlights (Cross Ventilation, Carport Teduh, One-Gate 24h, Legalitas SHM).
    - Flexible payment schemes card (Cash Keras, Cash Bertahap 0%, KPR Express).
    - Fixed bottom floating action bar with live price, direct WhatsApp inquiry, and "Pesan Kavling Ini" primary CTA button.
  - **Interactive View Management & Dynamic Data Binding (app.js)**:
    - Upgraded `.unit-inventory-card` with `onclick="openUnitDetail('${clusterKey}', '${u.id}')"` while preserving `event.stopPropagation()` on the direct order button.
    - Implemented `openUnitDetail(clusterKey, unitId)` populating photos, titles, prices, specs, and status dynamically for all 30 units.
    - Implemented `closeUnitDetail()` returning cleanly to `#unitCatalogHub`.
    - Implemented `orderCurrentDetailUnit()` hooking into the global booking modal.
  - **Design System Harmonization (styles.css)**:
    - Applied forest green luxury palette (`#11332a` to `#1e4d40`), champagne gold accents (`#dfb96d`), 12px/14px rounded cards, and proper mobile bottom bar clearances.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #68: Remove Lighting Mood Switcher Pill Bar from Header
- **Context & Objective**: Remove the "Siang / Senja / Malam" lighting mood switcher element (`#landingLightingSwitch`) from the global sticky header (`.landing-navbar`) to keep the top bar clean and uncluttered.
- **Key Changes Implemented**:
  - **Header Cleanup (index.html)**:
    - Removed `#landingLightingSwitch` and its 3 mood buttons (`#moodDayBtn`, `#moodDuskBtn`, `#moodNightBtn`) from `.landing-nav-actions`.
    - Cleaned up top header, retaining only the brand logo and bookmark saved configuration button.
  - **Stylesheet Optimization (styles.css)**:
    - Removed `.landing-lighting-switch` and `.lighting-pill-btn` CSS styling rules.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #69: Simplify 11 Themes Header to Centered Title
- **Context & Objective**: Clean up the section header above the 11 theme chips in Surat Cinta tab (`#section99Keunggulan`), removing the tag (`99 KEUNGGULAN · SUKOHARJO`) and subtitle description, keeping only the centered title "Telusuri 11 Tema Keunggulan".
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Stripped `.section-tag` and `.section-desc`.
    - Centered `.section-title` ("Telusuri 11 Tema Keunggulan") using `text-align: center; margin: 0;`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #70: Refined Luxury Card Redesign for 'Surat Resmi Dari Pengembang' Banner
- **Context & Objective**: Elevate the visual appeal and layout structure of `.surat-compact-banner` in Surat Cinta tab, crafting an authentic luxury aesthetic with gold accents, deep forest tones, and champagne button contrast.
- **Key Changes Implemented**:
  - **Enhanced Layout & Card Hierarchy (index.html)**:
    - Grouped title and subtitle into `.surat-banner-body` for consistent text flow.
    - Wrapped CTA button in `.surat-banner-action-wrap` with improved padding and breathing room.
  - **Japandi Luxury Styling & Accents (styles.css)**:
    - Applied multi-stop deep forest gradient (`#11332a` to `#0d261f` to `#173d32`) with gold border accent (`rgba(223, 185, 109, 0.45)`) and subtle radial ambient glow (`::before`).
    - Elevated wax seal badge (`.surat-wax-badge-mini`) with champagne border and refined letter-spacing.
    - Redesigned `.btn-open-surat-modal` with warm champagne gold gradient (`linear-gradient(135deg, #dfb96d 0%, #c59b48 100%)`), deep forest typography, and smooth hover micro-interaction.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #71: Streamlined Visual-First Cluster Cards (Nagoya, Osaka, Tokyo)
- **Context & Objective**: Clean up and declutter the 3 cluster triptych cards in Surat Cinta tab, removing long paragraph descriptions, emphasizing architectural product imagery, and removing the trailing arrow from "Peta Kawasan".
- **Key Changes Implemented**:
  - **Visual-First Layout & Decluttering (index.html)**:
    - Removed long paragraph descriptions (`.cluster-card-desc`) across Nagoya, Osaka, and Tokyo cards.
    - Simplified footer to streamlined location tag (`stat-loc`) and compact action button without arrows.
    - Made the entire card surface clickable (`onclick="switchLandingTab('siteplan'); switchLandingSiteplan(...)`) for seamless navigation.
  - **Elevated Photography Dimensions (styles.css)**:
    - Increased image container height (`.cluster-card-img-wrap`) from 85px to 120px (mobile) / 135px (desktop), giving priority to visual architectural rendering.
    - Refined badge styling and unified `.btn-cluster-explore` with forest green gradient.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #72: Minimalist Header & Segmented Toggle for Gold vs Diamond Specs
- **Context & Objective**: Declutter the architectural type comparison section in Surat Cinta tab, removing wordy subtitles and aligning the pill buttons into an elegant segmented toggle.
- **Key Changes Implemented**:
  - **Header Decluttering (index.html)**:
    - Removed redundant `.section-tag` and long `.section-desc`.
    - Simplified title to clean, centered "Tipe Gold & Diamond" (`text-align: center; margin: 0;`).
  - **Segmented Control Toggle (styles.css)**:
    - Refactored `.spec-toggle-bar` into a unified segmented control capsule with subtle border (`1px solid #e8e2d5`), neutral background (`#fbfaf7`), and 4px padding.
    - Elevated active button (`.spec-tab-btn.is-active`) with forest green gradient (`#11332a` to `#1e4d40`), crisp white text, and subtle elevation shadow.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #73: Visual Photographic Enrichment & Streamlined Price Matrix
- **Context & Objective**: Transform the text-heavy and dull price list cards in Surat Cinta tab into engaging visual product cards with architectural photography banners, decluttered titles, and prominent unit selection actions.
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Removed redundant tag and description, keeping only the clean centered title "Pilihan Unit & Skema Pembayaran".
  - **Photographic Banner Integration (app.js)**:
    - In `renderPriceMatrix()`, added `.price-card-banner` with authentic architectural photo thumbnails matching each cluster (Nagoya, Tokyo, Osaka).
    - Added dark gradient overlay with bold serif unit ID, clean dimension specs, and floating "Pilih Unit" primary action pill.
  - **Modern Card Grid Styling (styles.css)**:
    - Elevated `.price-unit-card` with 12px radius, smooth hover lift (-2px), 95px banner image with 1.04x zoom hover, and 2-column pricing tiles (Cash Keras, Cash Tempo 12/24 Bulan, KPR Bank).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-22] Progress #39: Calibrate Siteplan Lot Marker Coordinates Across All 3 Clusters
- **Context & Objective**: Align lot overlay markers (.siteplan-lot-marker) with their actual physical footprint in the siteplan illustrations for Nagoya, Osaka, and Tokyo, resolving horizontal pile-up and misaligned pills shown in user images.
- **Key Changes Implemented**:
  - **Nagoya (app.js)**:
    - Shifted Row A (lots A.01–A.09) from horizontal pile (y: 35%) into a clean vertical left column (x: 44.5%, y: 12%–72%).
    - Shifted Row B (lots B.02–B.07) into a vertical right column (x: 62.0%, y: 14%–66.5%) flanking the driveway.
  - **Osaka (app.js)**:
    - Calibrated triangular wedge coordinates: B.1 (44.5%, 26%), B.2 (44.5%, 46%), and B.3 (49.0%, 66%) on the left inward-sloping bank; B.4–B.7 (58.0%, 30%–78%) down the right bank.
  - **Tokyo (app.js)**:
    - Distributed the 7 lots (B.1–B.7) across the single horizontal road row (y: 38%) spanning from x: 13.5% on the left to x: 88.0% on the right, eliminating central cluster pile-up.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #61: Redundant Unit Page Quick-Links Strip Removal
- **Context & Objective**: Remove duplicate navigation cards and horizontal quick-link bar (`.unit-page-quick-links` and `.unit-page-nav-bar`) from the Unit catalog page (`#panelUnit`), ensuring strict adherence to Rule 5 (single-source Mobile Bottom Navigation Bar) and a clean uncluttered presentation.
- **Key Changes Implemented**:
  - **Structure Simplification (index.html)**:
    - Removed redundant `.unit-page-nav-bar` ("Avenue Grand Gate · Sukoharjo", Sales Login) and `.unit-page-quick-links` ("THEPARKTOWNHOUSE", Beranda, Keunggulan, Unit, Fasilitas, Lokasi, Kalkulator, Hubungi Kami).
    - `#panelUnit` now initiates directly with `.unit-hero-header-card` ("Katalog Hunian · Pilihan Unit per Cluster").
  - **Stylesheet Optimization (styles.css)**:
    - Purged 105 lines of obsolete CSS rules (`.unit-page-nav-bar`, `.unit-nav-loc`, `.unit-nav-dot`, `.unit-nav-right`, `.unit-lang-pill`, `.unit-sales-login-link`, `.unit-page-quick-links`, `.unit-brand-logo-btn`, `.unit-quick-links-list`, `.unit-quick-link`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #62: Compact Unit Header Navbar with Clean Cluster Navigation
- **Context & Objective**: Refactor the large Unit hero card into a sleek, concise navbar header (`.unit-header-navbar`) with simplified copy and quick cluster navigation chips (Nagoya, Tokyo, Osaka).
- **Key Changes Implemented**:
  - **Navbar Layout & Simplified Copy (index.html)**:
    - Replaced heavy hero text with concise header: `Katalog Hunian` (gold tag), `Pilihan Unit` (title), and `30 Unit · Japandi Modern` (subtitle).
    - Added clean cluster jump pills (`Nagoya`, `Tokyo`, `Osaka`) that smoothly scroll directly to each cluster block on tap.
  - **Japandi Aesthetic & Mobile Styling (styles.css)**:
    - Styled `.unit-header-navbar` with deep forest green gradient (`#11332a` to `#1e4d40`), 12px rounded borders, and subtle shadow.
    - Added `.unit-nav-chip` buttons with 32px height, soft translucent background, and gold accent active states matching design system tokens.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #63: Collapsible Drawer & Horizontal Swipe Chips for Unit Filter
- **Context & Objective**: Compact the tall, multi-row Unit catalog filter card into an expandable drawer with a filter icon toggle trigger and horizontal swipeable chip scrollers.
- **Key Changes Implemented**:
  - **Collapsible Filter Drawer (index.html, styles.css, app.js)**:
    - Created `.unit-filter-toggle-btn` with funnel filter icon, live summary of active filters, active filter count badge, and animated chevron indicator.
    - Wrapped filter options in `#filterControlsWrapper`, defaulting to collapsed state to eliminate vertical clutter.
    - Added `toggleUnitFilterCard()` and `updateUnitFilterSummary()` in `app.js` to handle opening/closing and live status badge updates.
  - **Horizontal Swipeable Chip Scrollers (index.html & styles.css)**:
    - Converted wrapped multi-line chips into single-row horizontal swipe scrollers (`.filter-chips-scroller`) for Tipe Unit, Luas Tanah, Range Harga, and Posisi Kavling.
    - Added `geser ↔` hint, smooth scrolling, and touch inertia (`-webkit-overflow-scrolling: touch`) with 32px min-height tap targets conforming to Rule 5.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #64: Responsive 2-to-3 Column Layout for Unit Product Cards
- **Context & Objective**: Compact the oversized unit product cards in the catalog (`.unit-inventory-grid`) into a refined 2-column layout on mobile and 3-column layout on tablet/desktop, preventing bulky single-column stretching.
- **Key Changes Implemented**:
  - **Multi-Column Grid Architecture (styles.css)**:
    - Replaced loose `repeat(auto-fill, minmax(180px, 1fr))` with strict `grid-template-columns: repeat(2, 1fr)` on mobile (< 640px) and `repeat(3, 1fr)` on wider screens (>= 640px).
    - Reduced inter-card spacing to 8px on mobile and 12px on desktop.
  - **Compact Visual Dimensions & Typography (styles.css)**:
    - Compacted `.uic-media` height to 90px (mobile) / 105px (desktop) with 1.04x subtle zoom hover.
    - Streamlined body padding to 8px and tuned font sizes (`.uic-id`: 12.5px, `.uic-price-val`: 11.5px bold forest green, `.uic-specs`: 9.5px).
    - Compacted primary action button (`.uic-action-btn`) to 30px height with crisp 10.5px text and 4px gap.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #65: Clean Button Copy Simplification (Remove Arrow from "Pesan Kavling Ini")
- **Context & Objective**: Remove trailing arrow symbols (`→`) from the unit order CTA buttons, leaving clean and centered "Pesan Kavling Ini" copy across catalog cards and site plan inspector cards.
- **Key Changes Implemented**:
  - **Product Card Action Button (app.js)**:
    - In `renderLandingUnits()`, removed `<span>→</span>` from `.uic-action-btn`, displaying clean `<span>Pesan Kavling Ini</span>`.
  - **Site Plan Inspector Buttons (index.html)**:
    - Removed `<span>→</span>` from `.btn-order-kavling-champagne` in both Beranda (`#berandaLotInspector`) and Site Plan page (`#pageLotInspector`), standardizing text to `<span>Pesan Kavling Ini</span>`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #66: Comprehensive Arrow Symbol Removal Across All Pages
- **Context & Objective**: Remove all trailing and inline arrow symbols (`→`, `←`, `&rarr;`, `&larr;`) from buttons, links, and cards across all pages and modals for a cleaner, unified typography.
- **Key Changes Implemented**:
  - **HTML Buttons & Links Cleaned (index.html)**:
    - Removed all 44 occurrences of `<span>→</span>` from primary CTAs (CTA cards, tour buttons, showcase buttons, quiz items, facilities cards, Super App action buttons, and footer links).
    - Removed trailing arrows from Super App action triggers (`Unlock`, `Generate QR`, `Pesan Slot`, `Bayar`, `Buat Laporan`, `Kirim SOS`).
    - Cleaned `.back-arrow` symbols from subpage headers.
  - **JavaScript Dynamic Templates Cleaned (app.js)**:
    - Cleaned `<span>→</span>` from modal CTAs (WhatsApp modal, tour finish modal, booking modal, 99 keunggulan explorer).
    - Removed `→` and `←` from theme switcher navigation buttons (`Tema Sebelumnya` and `Tema Berikutnya`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #67: Dedicated Interactive Unit Product Detail Page Integration
- **Context & Objective**: Enable clickable product cards in the Unit catalog that open a dedicated, harmonized Product Detail subpage (`#unitDetailView`) for every individual unit (all 30 units across Nagoya, Tokyo, and Osaka).
- **Key Changes Implemented**:
  - **Dedicated Unit Detail View Architecture (index.html)**:
    - Built `#unitDetailView` inside `#panelUnit` with back navigation bar (`Katalog Unit`), dynamic cluster tag, lot ID title, and quick order action.
    - Hero gallery featuring 220px/280px architectural photography, status badge (Tersedia/Terjual), Japandi type subtitle, price summary strip, and estimated monthly installment.
    - 4 architecture metric cards (Kamar Tidur, Kamar Mandi, Luas Bangunan, Luas Tanah).
    - Living character & specifications section with 4 bespoke Japandi comfort highlights (Cross Ventilation, Carport Teduh, One-Gate 24h, Legalitas SHM).
    - Flexible payment schemes card (Cash Keras, Cash Bertahap 0%, KPR Express).
    - Fixed bottom floating action bar with live price, direct WhatsApp inquiry, and "Pesan Kavling Ini" primary CTA button.
  - **Interactive View Management & Dynamic Data Binding (app.js)**:
    - Upgraded `.unit-inventory-card` with `onclick="openUnitDetail('${clusterKey}', '${u.id}')"` while preserving `event.stopPropagation()` on the direct order button.
    - Implemented `openUnitDetail(clusterKey, unitId)` populating photos, titles, prices, specs, and status dynamically for all 30 units.
    - Implemented `closeUnitDetail()` returning cleanly to `#unitCatalogHub`.
    - Implemented `orderCurrentDetailUnit()` hooking into the global booking modal.
  - **Design System Harmonization (styles.css)**:
    - Applied forest green luxury palette (`#11332a` to `#1e4d40`), champagne gold accents (`#dfb96d`), 12px/14px rounded cards, and proper mobile bottom bar clearances.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #68: Remove Lighting Mood Switcher Pill Bar from Header
- **Context & Objective**: Remove the "Siang / Senja / Malam" lighting mood switcher element (`#landingLightingSwitch`) from the global sticky header (`.landing-navbar`) to keep the top bar clean and uncluttered.
- **Key Changes Implemented**:
  - **Header Cleanup (index.html)**:
    - Removed `#landingLightingSwitch` and its 3 mood buttons (`#moodDayBtn`, `#moodDuskBtn`, `#moodNightBtn`) from `.landing-nav-actions`.
    - Cleaned up top header, retaining only the brand logo and bookmark saved configuration button.
  - **Stylesheet Optimization (styles.css)**:
    - Removed `.landing-lighting-switch` and `.lighting-pill-btn` CSS styling rules.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #69: Simplify 11 Themes Header to Centered Title
- **Context & Objective**: Clean up the section header above the 11 theme chips in Surat Cinta tab (`#section99Keunggulan`), removing the tag (`99 KEUNGGULAN · SUKOHARJO`) and subtitle description, keeping only the centered title "Telusuri 11 Tema Keunggulan".
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Stripped `.section-tag` and `.section-desc`.
    - Centered `.section-title` ("Telusuri 11 Tema Keunggulan") using `text-align: center; margin: 0;`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #70: Refined Luxury Card Redesign for 'Surat Resmi Dari Pengembang' Banner
- **Context & Objective**: Elevate the visual appeal and layout structure of `.surat-compact-banner` in Surat Cinta tab, crafting an authentic luxury aesthetic with gold accents, deep forest tones, and champagne button contrast.
- **Key Changes Implemented**:
  - **Enhanced Layout & Card Hierarchy (index.html)**:
    - Grouped title and subtitle into `.surat-banner-body` for consistent text flow.
    - Wrapped CTA button in `.surat-banner-action-wrap` with improved padding and breathing room.
  - **Japandi Luxury Styling & Accents (styles.css)**:
    - Applied multi-stop deep forest gradient (`#11332a` to `#0d261f` to `#173d32`) with gold border accent (`rgba(223, 185, 109, 0.45)`) and subtle radial ambient glow (`::before`).
    - Elevated wax seal badge (`.surat-wax-badge-mini`) with champagne border and refined letter-spacing.
    - Redesigned `.btn-open-surat-modal` with warm champagne gold gradient (`linear-gradient(135deg, #dfb96d 0%, #c59b48 100%)`), deep forest typography, and smooth hover micro-interaction.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #71: Streamlined Visual-First Cluster Cards (Nagoya, Osaka, Tokyo)
- **Context & Objective**: Clean up and declutter the 3 cluster triptych cards in Surat Cinta tab, removing long paragraph descriptions, emphasizing architectural product imagery, and removing the trailing arrow from "Peta Kawasan".
- **Key Changes Implemented**:
  - **Visual-First Layout & Decluttering (index.html)**:
    - Removed long paragraph descriptions (`.cluster-card-desc`) across Nagoya, Osaka, and Tokyo cards.
    - Simplified footer to streamlined location tag (`stat-loc`) and compact action button without arrows.
    - Made the entire card surface clickable (`onclick="switchLandingTab('siteplan'); switchLandingSiteplan(...)`) for seamless navigation.
  - **Elevated Photography Dimensions (styles.css)**:
    - Increased image container height (`.cluster-card-img-wrap`) from 85px to 120px (mobile) / 135px (desktop), giving priority to visual architectural rendering.
    - Refined badge styling and unified `.btn-cluster-explore` with forest green gradient.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #72: Minimalist Header & Segmented Toggle for Gold vs Diamond Specs
- **Context & Objective**: Declutter the architectural type comparison section in Surat Cinta tab, removing wordy subtitles and aligning the pill buttons into an elegant segmented toggle.
- **Key Changes Implemented**:
  - **Header Decluttering (index.html)**:
    - Removed redundant `.section-tag` and long `.section-desc`.
    - Simplified title to clean, centered "Tipe Gold & Diamond" (`text-align: center; margin: 0;`).
  - **Segmented Control Toggle (styles.css)**:
    - Refactored `.spec-toggle-bar` into a unified segmented control capsule with subtle border (`1px solid #e8e2d5`), neutral background (`#fbfaf7`), and 4px padding.
    - Elevated active button (`.spec-tab-btn.is-active`) with forest green gradient (`#11332a` to `#1e4d40`), crisp white text, and subtle elevation shadow.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #73: Visual Photographic Enrichment & Streamlined Price Matrix
- **Context & Objective**: Transform the text-heavy and dull price list cards in Surat Cinta tab into engaging visual product cards with architectural photography banners, decluttered titles, and prominent unit selection actions.
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Removed redundant tag and description, keeping only the clean centered title "Pilihan Unit & Skema Pembayaran".
  - **Photographic Banner Integration (app.js)**:
    - In `renderPriceMatrix()`, added `.price-card-banner` with authentic architectural photo thumbnails matching each cluster (Nagoya, Tokyo, Osaka).
    - Added dark gradient overlay with bold serif unit ID, clean dimension specs, and floating "Pilih Unit" primary action pill.
  - **Modern Card Grid Styling (styles.css)**:
    - Elevated `.price-unit-card` with 12px radius, smooth hover lift (-2px), 95px banner image with 1.04x zoom hover, and 2-column pricing tiles (Cash Keras, Cash Tempo 12/24 Bulan, KPR Bank).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-22] Progress #40: Remove Map Watermark & Declutter Ruang 03 Leaflet Markers
- **Context & Objective**: Resolve CARTO Voyager "API KEY REQUIRED - basemaps/apikey" watermark and overlapping markers in `03 / 07 · RUANG PETA` (`parkLeafletMap`) and Beranda (`berandaLeafletMapInstance`).
- **Root Cause**:
  - CARTO Voyager tile service enforced API keys on web referrers, stamping tiles with a diagonal "API KEY REQUIRED" watermark.
  - Markers in Ruang 03 used tightly packed geographic coordinates (< 200m) at low initial zoom (13.5), causing all 9 cluster and facility pills to pile up over the center circle.
- **Key Changes Implemented**:
  - **Tile Provider (app.js)**:
    - Migrated from CARTO Voyager to **Esri World Street Map** (`https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}`), eliminating all watermarks and 403 Forbidden blocks while preserving sharp street and greenery details.
  - **Marker Spatial Distribution & Initial Zoom (app.js)**:
    - Adjusted initial zoom from 13.5 to 14.2 for generous breathing room.
    - Balanced cluster coordinates: Osaka Gold North (-7.6760, 110.8430), Nagoya Diamond East (-7.6835, 110.8480), and Tokyo Emerald West (-7.6830, 110.8350).
    - Spaced facility pins along natural corridors (RSUD, SMAN 1, Alun-Alun, Stasiun, Gelora & Tenis, Jl. Sudirman).
  - **Pill Geometry (app.js, styles.css)**:
    - Reduced marker icon bounds from 110x28 to 95x26 and 90x26 with tighter padding and font sizing for crisp presentation.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #61: Redundant Unit Page Quick-Links Strip Removal
- **Context & Objective**: Remove duplicate navigation cards and horizontal quick-link bar (`.unit-page-quick-links` and `.unit-page-nav-bar`) from the Unit catalog page (`#panelUnit`), ensuring strict adherence to Rule 5 (single-source Mobile Bottom Navigation Bar) and a clean uncluttered presentation.
- **Key Changes Implemented**:
  - **Structure Simplification (index.html)**:
    - Removed redundant `.unit-page-nav-bar` ("Avenue Grand Gate · Sukoharjo", Sales Login) and `.unit-page-quick-links` ("THEPARKTOWNHOUSE", Beranda, Keunggulan, Unit, Fasilitas, Lokasi, Kalkulator, Hubungi Kami).
    - `#panelUnit` now initiates directly with `.unit-hero-header-card` ("Katalog Hunian · Pilihan Unit per Cluster").
  - **Stylesheet Optimization (styles.css)**:
    - Purged 105 lines of obsolete CSS rules (`.unit-page-nav-bar`, `.unit-nav-loc`, `.unit-nav-dot`, `.unit-nav-right`, `.unit-lang-pill`, `.unit-sales-login-link`, `.unit-page-quick-links`, `.unit-brand-logo-btn`, `.unit-quick-links-list`, `.unit-quick-link`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #62: Compact Unit Header Navbar with Clean Cluster Navigation
- **Context & Objective**: Refactor the large Unit hero card into a sleek, concise navbar header (`.unit-header-navbar`) with simplified copy and quick cluster navigation chips (Nagoya, Tokyo, Osaka).
- **Key Changes Implemented**:
  - **Navbar Layout & Simplified Copy (index.html)**:
    - Replaced heavy hero text with concise header: `Katalog Hunian` (gold tag), `Pilihan Unit` (title), and `30 Unit · Japandi Modern` (subtitle).
    - Added clean cluster jump pills (`Nagoya`, `Tokyo`, `Osaka`) that smoothly scroll directly to each cluster block on tap.
  - **Japandi Aesthetic & Mobile Styling (styles.css)**:
    - Styled `.unit-header-navbar` with deep forest green gradient (`#11332a` to `#1e4d40`), 12px rounded borders, and subtle shadow.
    - Added `.unit-nav-chip` buttons with 32px height, soft translucent background, and gold accent active states matching design system tokens.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #63: Collapsible Drawer & Horizontal Swipe Chips for Unit Filter
- **Context & Objective**: Compact the tall, multi-row Unit catalog filter card into an expandable drawer with a filter icon toggle trigger and horizontal swipeable chip scrollers.
- **Key Changes Implemented**:
  - **Collapsible Filter Drawer (index.html, styles.css, app.js)**:
    - Created `.unit-filter-toggle-btn` with funnel filter icon, live summary of active filters, active filter count badge, and animated chevron indicator.
    - Wrapped filter options in `#filterControlsWrapper`, defaulting to collapsed state to eliminate vertical clutter.
    - Added `toggleUnitFilterCard()` and `updateUnitFilterSummary()` in `app.js` to handle opening/closing and live status badge updates.
  - **Horizontal Swipeable Chip Scrollers (index.html & styles.css)**:
    - Converted wrapped multi-line chips into single-row horizontal swipe scrollers (`.filter-chips-scroller`) for Tipe Unit, Luas Tanah, Range Harga, and Posisi Kavling.
    - Added `geser ↔` hint, smooth scrolling, and touch inertia (`-webkit-overflow-scrolling: touch`) with 32px min-height tap targets conforming to Rule 5.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #64: Responsive 2-to-3 Column Layout for Unit Product Cards
- **Context & Objective**: Compact the oversized unit product cards in the catalog (`.unit-inventory-grid`) into a refined 2-column layout on mobile and 3-column layout on tablet/desktop, preventing bulky single-column stretching.
- **Key Changes Implemented**:
  - **Multi-Column Grid Architecture (styles.css)**:
    - Replaced loose `repeat(auto-fill, minmax(180px, 1fr))` with strict `grid-template-columns: repeat(2, 1fr)` on mobile (< 640px) and `repeat(3, 1fr)` on wider screens (>= 640px).
    - Reduced inter-card spacing to 8px on mobile and 12px on desktop.
  - **Compact Visual Dimensions & Typography (styles.css)**:
    - Compacted `.uic-media` height to 90px (mobile) / 105px (desktop) with 1.04x subtle zoom hover.
    - Streamlined body padding to 8px and tuned font sizes (`.uic-id`: 12.5px, `.uic-price-val`: 11.5px bold forest green, `.uic-specs`: 9.5px).
    - Compacted primary action button (`.uic-action-btn`) to 30px height with crisp 10.5px text and 4px gap.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #65: Clean Button Copy Simplification (Remove Arrow from "Pesan Kavling Ini")
- **Context & Objective**: Remove trailing arrow symbols (`→`) from the unit order CTA buttons, leaving clean and centered "Pesan Kavling Ini" copy across catalog cards and site plan inspector cards.
- **Key Changes Implemented**:
  - **Product Card Action Button (app.js)**:
    - In `renderLandingUnits()`, removed `<span>→</span>` from `.uic-action-btn`, displaying clean `<span>Pesan Kavling Ini</span>`.
  - **Site Plan Inspector Buttons (index.html)**:
    - Removed `<span>→</span>` from `.btn-order-kavling-champagne` in both Beranda (`#berandaLotInspector`) and Site Plan page (`#pageLotInspector`), standardizing text to `<span>Pesan Kavling Ini</span>`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #66: Comprehensive Arrow Symbol Removal Across All Pages
- **Context & Objective**: Remove all trailing and inline arrow symbols (`→`, `←`, `&rarr;`, `&larr;`) from buttons, links, and cards across all pages and modals for a cleaner, unified typography.
- **Key Changes Implemented**:
  - **HTML Buttons & Links Cleaned (index.html)**:
    - Removed all 44 occurrences of `<span>→</span>` from primary CTAs (CTA cards, tour buttons, showcase buttons, quiz items, facilities cards, Super App action buttons, and footer links).
    - Removed trailing arrows from Super App action triggers (`Unlock`, `Generate QR`, `Pesan Slot`, `Bayar`, `Buat Laporan`, `Kirim SOS`).
    - Cleaned `.back-arrow` symbols from subpage headers.
  - **JavaScript Dynamic Templates Cleaned (app.js)**:
    - Cleaned `<span>→</span>` from modal CTAs (WhatsApp modal, tour finish modal, booking modal, 99 keunggulan explorer).
    - Removed `→` and `←` from theme switcher navigation buttons (`Tema Sebelumnya` and `Tema Berikutnya`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #67: Dedicated Interactive Unit Product Detail Page Integration
- **Context & Objective**: Enable clickable product cards in the Unit catalog that open a dedicated, harmonized Product Detail subpage (`#unitDetailView`) for every individual unit (all 30 units across Nagoya, Tokyo, and Osaka).
- **Key Changes Implemented**:
  - **Dedicated Unit Detail View Architecture (index.html)**:
    - Built `#unitDetailView` inside `#panelUnit` with back navigation bar (`Katalog Unit`), dynamic cluster tag, lot ID title, and quick order action.
    - Hero gallery featuring 220px/280px architectural photography, status badge (Tersedia/Terjual), Japandi type subtitle, price summary strip, and estimated monthly installment.
    - 4 architecture metric cards (Kamar Tidur, Kamar Mandi, Luas Bangunan, Luas Tanah).
    - Living character & specifications section with 4 bespoke Japandi comfort highlights (Cross Ventilation, Carport Teduh, One-Gate 24h, Legalitas SHM).
    - Flexible payment schemes card (Cash Keras, Cash Bertahap 0%, KPR Express).
    - Fixed bottom floating action bar with live price, direct WhatsApp inquiry, and "Pesan Kavling Ini" primary CTA button.
  - **Interactive View Management & Dynamic Data Binding (app.js)**:
    - Upgraded `.unit-inventory-card` with `onclick="openUnitDetail('${clusterKey}', '${u.id}')"` while preserving `event.stopPropagation()` on the direct order button.
    - Implemented `openUnitDetail(clusterKey, unitId)` populating photos, titles, prices, specs, and status dynamically for all 30 units.
    - Implemented `closeUnitDetail()` returning cleanly to `#unitCatalogHub`.
    - Implemented `orderCurrentDetailUnit()` hooking into the global booking modal.
  - **Design System Harmonization (styles.css)**:
    - Applied forest green luxury palette (`#11332a` to `#1e4d40`), champagne gold accents (`#dfb96d`), 12px/14px rounded cards, and proper mobile bottom bar clearances.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #68: Remove Lighting Mood Switcher Pill Bar from Header
- **Context & Objective**: Remove the "Siang / Senja / Malam" lighting mood switcher element (`#landingLightingSwitch`) from the global sticky header (`.landing-navbar`) to keep the top bar clean and uncluttered.
- **Key Changes Implemented**:
  - **Header Cleanup (index.html)**:
    - Removed `#landingLightingSwitch` and its 3 mood buttons (`#moodDayBtn`, `#moodDuskBtn`, `#moodNightBtn`) from `.landing-nav-actions`.
    - Cleaned up top header, retaining only the brand logo and bookmark saved configuration button.
  - **Stylesheet Optimization (styles.css)**:
    - Removed `.landing-lighting-switch` and `.lighting-pill-btn` CSS styling rules.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #69: Simplify 11 Themes Header to Centered Title
- **Context & Objective**: Clean up the section header above the 11 theme chips in Surat Cinta tab (`#section99Keunggulan`), removing the tag (`99 KEUNGGULAN · SUKOHARJO`) and subtitle description, keeping only the centered title "Telusuri 11 Tema Keunggulan".
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Stripped `.section-tag` and `.section-desc`.
    - Centered `.section-title` ("Telusuri 11 Tema Keunggulan") using `text-align: center; margin: 0;`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #70: Refined Luxury Card Redesign for 'Surat Resmi Dari Pengembang' Banner
- **Context & Objective**: Elevate the visual appeal and layout structure of `.surat-compact-banner` in Surat Cinta tab, crafting an authentic luxury aesthetic with gold accents, deep forest tones, and champagne button contrast.
- **Key Changes Implemented**:
  - **Enhanced Layout & Card Hierarchy (index.html)**:
    - Grouped title and subtitle into `.surat-banner-body` for consistent text flow.
    - Wrapped CTA button in `.surat-banner-action-wrap` with improved padding and breathing room.
  - **Japandi Luxury Styling & Accents (styles.css)**:
    - Applied multi-stop deep forest gradient (`#11332a` to `#0d261f` to `#173d32`) with gold border accent (`rgba(223, 185, 109, 0.45)`) and subtle radial ambient glow (`::before`).
    - Elevated wax seal badge (`.surat-wax-badge-mini`) with champagne border and refined letter-spacing.
    - Redesigned `.btn-open-surat-modal` with warm champagne gold gradient (`linear-gradient(135deg, #dfb96d 0%, #c59b48 100%)`), deep forest typography, and smooth hover micro-interaction.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #71: Streamlined Visual-First Cluster Cards (Nagoya, Osaka, Tokyo)
- **Context & Objective**: Clean up and declutter the 3 cluster triptych cards in Surat Cinta tab, removing long paragraph descriptions, emphasizing architectural product imagery, and removing the trailing arrow from "Peta Kawasan".
- **Key Changes Implemented**:
  - **Visual-First Layout & Decluttering (index.html)**:
    - Removed long paragraph descriptions (`.cluster-card-desc`) across Nagoya, Osaka, and Tokyo cards.
    - Simplified footer to streamlined location tag (`stat-loc`) and compact action button without arrows.
    - Made the entire card surface clickable (`onclick="switchLandingTab('siteplan'); switchLandingSiteplan(...)`) for seamless navigation.
  - **Elevated Photography Dimensions (styles.css)**:
    - Increased image container height (`.cluster-card-img-wrap`) from 85px to 120px (mobile) / 135px (desktop), giving priority to visual architectural rendering.
    - Refined badge styling and unified `.btn-cluster-explore` with forest green gradient.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #72: Minimalist Header & Segmented Toggle for Gold vs Diamond Specs
- **Context & Objective**: Declutter the architectural type comparison section in Surat Cinta tab, removing wordy subtitles and aligning the pill buttons into an elegant segmented toggle.
- **Key Changes Implemented**:
  - **Header Decluttering (index.html)**:
    - Removed redundant `.section-tag` and long `.section-desc`.
    - Simplified title to clean, centered "Tipe Gold & Diamond" (`text-align: center; margin: 0;`).
  - **Segmented Control Toggle (styles.css)**:
    - Refactored `.spec-toggle-bar` into a unified segmented control capsule with subtle border (`1px solid #e8e2d5`), neutral background (`#fbfaf7`), and 4px padding.
    - Elevated active button (`.spec-tab-btn.is-active`) with forest green gradient (`#11332a` to `#1e4d40`), crisp white text, and subtle elevation shadow.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #73: Visual Photographic Enrichment & Streamlined Price Matrix
- **Context & Objective**: Transform the text-heavy and dull price list cards in Surat Cinta tab into engaging visual product cards with architectural photography banners, decluttered titles, and prominent unit selection actions.
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Removed redundant tag and description, keeping only the clean centered title "Pilihan Unit & Skema Pembayaran".
  - **Photographic Banner Integration (app.js)**:
    - In `renderPriceMatrix()`, added `.price-card-banner` with authentic architectural photo thumbnails matching each cluster (Nagoya, Tokyo, Osaka).
    - Added dark gradient overlay with bold serif unit ID, clean dimension specs, and floating "Pilih Unit" primary action pill.
  - **Modern Card Grid Styling (styles.css)**:
    - Elevated `.price-unit-card` with 12px radius, smooth hover lift (-2px), 95px banner image with 1.04x zoom hover, and 2-column pricing tiles (Cash Keras, Cash Tempo 12/24 Bulan, KPR Bank).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-22] Progress #41: Top Autoplay Hero Video Carousel, Scroll-Triggered Navbar & Animated Stat Counters
- **Context & Objective**: Fulfill user requirements for Beranda:
  1. Top cinematic video carousel using authentic videos from Google Drive folder with autoplay, auto-advance, and continuous looping.
  2. Top navbar appears only when the user scrolls down, remaining hidden/seamless when at the top.
  3. Interactive counter animation on key metrics (Rp 400 Jt, 30 Unit, 177 m², ± 100 m) when scrolled into view.
- **Key Changes Implemented**:
  - **Cinematic Top Video Carousel (index.html, styles.css, app.js, assets/videos/)**:
    - Downloaded and curated 4 distinct cinematic MP4 videos from the user's Google Drive folder to `assets/videos/hero_video_[1-4].mp4` (2.5MB–2.9MB).
    - Built `#berandaTopVideoBanner` placed right at the very top of `#panelBeranda`.
    - Integrated multi-segment progress bars (story indicator style) synchronized with video playback (`currentTime / duration`).
    - Configured auto-advance on video `ended` event and infinite looping across all 4 scenes with crossfade transition.
    - Added floating playback controls (Play/Pause, Mute/Unmute, and Next Scene).
  - **Scroll-Triggered Navbar (styles.css, app.js)**:
    - Positioned `.landing-navbar` with `position: absolute`, `transform: translateY(-100%)`, `opacity: 0`, and `pointer-events: none;`.
    - Attached passive scroll listener in `initLandingNavbarScrollTrigger()`; when `scrollTop > 45px`, `.landing-navbar.is-scrolled` slides into view smoothly with glassmorphism backdrop blur.
  - **Dynamic Animated Stat Counters (index.html, styles.css, app.js)**:
    - Embedded `count-up-stat` elements with data targets: `400` (Rp 400 Jt), `30` (30 Unit), `177` (177 m²), and `100` (± 100 m).
    - Created `initMetricsCounterAnimation()` using `IntersectionObserver` to trigger a 1.8s `easeOutCubic` rolling counter animation when the metrics grid enters viewport.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #61: Redundant Unit Page Quick-Links Strip Removal
- **Context & Objective**: Remove duplicate navigation cards and horizontal quick-link bar (`.unit-page-quick-links` and `.unit-page-nav-bar`) from the Unit catalog page (`#panelUnit`), ensuring strict adherence to Rule 5 (single-source Mobile Bottom Navigation Bar) and a clean uncluttered presentation.
- **Key Changes Implemented**:
  - **Structure Simplification (index.html)**:
    - Removed redundant `.unit-page-nav-bar` ("Avenue Grand Gate · Sukoharjo", Sales Login) and `.unit-page-quick-links` ("THEPARKTOWNHOUSE", Beranda, Keunggulan, Unit, Fasilitas, Lokasi, Kalkulator, Hubungi Kami).
    - `#panelUnit` now initiates directly with `.unit-hero-header-card` ("Katalog Hunian · Pilihan Unit per Cluster").
  - **Stylesheet Optimization (styles.css)**:
    - Purged 105 lines of obsolete CSS rules (`.unit-page-nav-bar`, `.unit-nav-loc`, `.unit-nav-dot`, `.unit-nav-right`, `.unit-lang-pill`, `.unit-sales-login-link`, `.unit-page-quick-links`, `.unit-brand-logo-btn`, `.unit-quick-links-list`, `.unit-quick-link`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #62: Compact Unit Header Navbar with Clean Cluster Navigation
- **Context & Objective**: Refactor the large Unit hero card into a sleek, concise navbar header (`.unit-header-navbar`) with simplified copy and quick cluster navigation chips (Nagoya, Tokyo, Osaka).
- **Key Changes Implemented**:
  - **Navbar Layout & Simplified Copy (index.html)**:
    - Replaced heavy hero text with concise header: `Katalog Hunian` (gold tag), `Pilihan Unit` (title), and `30 Unit · Japandi Modern` (subtitle).
    - Added clean cluster jump pills (`Nagoya`, `Tokyo`, `Osaka`) that smoothly scroll directly to each cluster block on tap.
  - **Japandi Aesthetic & Mobile Styling (styles.css)**:
    - Styled `.unit-header-navbar` with deep forest green gradient (`#11332a` to `#1e4d40`), 12px rounded borders, and subtle shadow.
    - Added `.unit-nav-chip` buttons with 32px height, soft translucent background, and gold accent active states matching design system tokens.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #63: Collapsible Drawer & Horizontal Swipe Chips for Unit Filter
- **Context & Objective**: Compact the tall, multi-row Unit catalog filter card into an expandable drawer with a filter icon toggle trigger and horizontal swipeable chip scrollers.
- **Key Changes Implemented**:
  - **Collapsible Filter Drawer (index.html, styles.css, app.js)**:
    - Created `.unit-filter-toggle-btn` with funnel filter icon, live summary of active filters, active filter count badge, and animated chevron indicator.
    - Wrapped filter options in `#filterControlsWrapper`, defaulting to collapsed state to eliminate vertical clutter.
    - Added `toggleUnitFilterCard()` and `updateUnitFilterSummary()` in `app.js` to handle opening/closing and live status badge updates.
  - **Horizontal Swipeable Chip Scrollers (index.html & styles.css)**:
    - Converted wrapped multi-line chips into single-row horizontal swipe scrollers (`.filter-chips-scroller`) for Tipe Unit, Luas Tanah, Range Harga, and Posisi Kavling.
    - Added `geser ↔` hint, smooth scrolling, and touch inertia (`-webkit-overflow-scrolling: touch`) with 32px min-height tap targets conforming to Rule 5.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #64: Responsive 2-to-3 Column Layout for Unit Product Cards
- **Context & Objective**: Compact the oversized unit product cards in the catalog (`.unit-inventory-grid`) into a refined 2-column layout on mobile and 3-column layout on tablet/desktop, preventing bulky single-column stretching.
- **Key Changes Implemented**:
  - **Multi-Column Grid Architecture (styles.css)**:
    - Replaced loose `repeat(auto-fill, minmax(180px, 1fr))` with strict `grid-template-columns: repeat(2, 1fr)` on mobile (< 640px) and `repeat(3, 1fr)` on wider screens (>= 640px).
    - Reduced inter-card spacing to 8px on mobile and 12px on desktop.
  - **Compact Visual Dimensions & Typography (styles.css)**:
    - Compacted `.uic-media` height to 90px (mobile) / 105px (desktop) with 1.04x subtle zoom hover.
    - Streamlined body padding to 8px and tuned font sizes (`.uic-id`: 12.5px, `.uic-price-val`: 11.5px bold forest green, `.uic-specs`: 9.5px).
    - Compacted primary action button (`.uic-action-btn`) to 30px height with crisp 10.5px text and 4px gap.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #65: Clean Button Copy Simplification (Remove Arrow from "Pesan Kavling Ini")
- **Context & Objective**: Remove trailing arrow symbols (`→`) from the unit order CTA buttons, leaving clean and centered "Pesan Kavling Ini" copy across catalog cards and site plan inspector cards.
- **Key Changes Implemented**:
  - **Product Card Action Button (app.js)**:
    - In `renderLandingUnits()`, removed `<span>→</span>` from `.uic-action-btn`, displaying clean `<span>Pesan Kavling Ini</span>`.
  - **Site Plan Inspector Buttons (index.html)**:
    - Removed `<span>→</span>` from `.btn-order-kavling-champagne` in both Beranda (`#berandaLotInspector`) and Site Plan page (`#pageLotInspector`), standardizing text to `<span>Pesan Kavling Ini</span>`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #66: Comprehensive Arrow Symbol Removal Across All Pages
- **Context & Objective**: Remove all trailing and inline arrow symbols (`→`, `←`, `&rarr;`, `&larr;`) from buttons, links, and cards across all pages and modals for a cleaner, unified typography.
- **Key Changes Implemented**:
  - **HTML Buttons & Links Cleaned (index.html)**:
    - Removed all 44 occurrences of `<span>→</span>` from primary CTAs (CTA cards, tour buttons, showcase buttons, quiz items, facilities cards, Super App action buttons, and footer links).
    - Removed trailing arrows from Super App action triggers (`Unlock`, `Generate QR`, `Pesan Slot`, `Bayar`, `Buat Laporan`, `Kirim SOS`).
    - Cleaned `.back-arrow` symbols from subpage headers.
  - **JavaScript Dynamic Templates Cleaned (app.js)**:
    - Cleaned `<span>→</span>` from modal CTAs (WhatsApp modal, tour finish modal, booking modal, 99 keunggulan explorer).
    - Removed `→` and `←` from theme switcher navigation buttons (`Tema Sebelumnya` and `Tema Berikutnya`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #67: Dedicated Interactive Unit Product Detail Page Integration
- **Context & Objective**: Enable clickable product cards in the Unit catalog that open a dedicated, harmonized Product Detail subpage (`#unitDetailView`) for every individual unit (all 30 units across Nagoya, Tokyo, and Osaka).
- **Key Changes Implemented**:
  - **Dedicated Unit Detail View Architecture (index.html)**:
    - Built `#unitDetailView` inside `#panelUnit` with back navigation bar (`Katalog Unit`), dynamic cluster tag, lot ID title, and quick order action.
    - Hero gallery featuring 220px/280px architectural photography, status badge (Tersedia/Terjual), Japandi type subtitle, price summary strip, and estimated monthly installment.
    - 4 architecture metric cards (Kamar Tidur, Kamar Mandi, Luas Bangunan, Luas Tanah).
    - Living character & specifications section with 4 bespoke Japandi comfort highlights (Cross Ventilation, Carport Teduh, One-Gate 24h, Legalitas SHM).
    - Flexible payment schemes card (Cash Keras, Cash Bertahap 0%, KPR Express).
    - Fixed bottom floating action bar with live price, direct WhatsApp inquiry, and "Pesan Kavling Ini" primary CTA button.
  - **Interactive View Management & Dynamic Data Binding (app.js)**:
    - Upgraded `.unit-inventory-card` with `onclick="openUnitDetail('${clusterKey}', '${u.id}')"` while preserving `event.stopPropagation()` on the direct order button.
    - Implemented `openUnitDetail(clusterKey, unitId)` populating photos, titles, prices, specs, and status dynamically for all 30 units.
    - Implemented `closeUnitDetail()` returning cleanly to `#unitCatalogHub`.
    - Implemented `orderCurrentDetailUnit()` hooking into the global booking modal.
  - **Design System Harmonization (styles.css)**:
    - Applied forest green luxury palette (`#11332a` to `#1e4d40`), champagne gold accents (`#dfb96d`), 12px/14px rounded cards, and proper mobile bottom bar clearances.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #68: Remove Lighting Mood Switcher Pill Bar from Header
- **Context & Objective**: Remove the "Siang / Senja / Malam" lighting mood switcher element (`#landingLightingSwitch`) from the global sticky header (`.landing-navbar`) to keep the top bar clean and uncluttered.
- **Key Changes Implemented**:
  - **Header Cleanup (index.html)**:
    - Removed `#landingLightingSwitch` and its 3 mood buttons (`#moodDayBtn`, `#moodDuskBtn`, `#moodNightBtn`) from `.landing-nav-actions`.
    - Cleaned up top header, retaining only the brand logo and bookmark saved configuration button.
  - **Stylesheet Optimization (styles.css)**:
    - Removed `.landing-lighting-switch` and `.lighting-pill-btn` CSS styling rules.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #69: Simplify 11 Themes Header to Centered Title
- **Context & Objective**: Clean up the section header above the 11 theme chips in Surat Cinta tab (`#section99Keunggulan`), removing the tag (`99 KEUNGGULAN · SUKOHARJO`) and subtitle description, keeping only the centered title "Telusuri 11 Tema Keunggulan".
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Stripped `.section-tag` and `.section-desc`.
    - Centered `.section-title` ("Telusuri 11 Tema Keunggulan") using `text-align: center; margin: 0;`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #70: Refined Luxury Card Redesign for 'Surat Resmi Dari Pengembang' Banner
- **Context & Objective**: Elevate the visual appeal and layout structure of `.surat-compact-banner` in Surat Cinta tab, crafting an authentic luxury aesthetic with gold accents, deep forest tones, and champagne button contrast.
- **Key Changes Implemented**:
  - **Enhanced Layout & Card Hierarchy (index.html)**:
    - Grouped title and subtitle into `.surat-banner-body` for consistent text flow.
    - Wrapped CTA button in `.surat-banner-action-wrap` with improved padding and breathing room.
  - **Japandi Luxury Styling & Accents (styles.css)**:
    - Applied multi-stop deep forest gradient (`#11332a` to `#0d261f` to `#173d32`) with gold border accent (`rgba(223, 185, 109, 0.45)`) and subtle radial ambient glow (`::before`).
    - Elevated wax seal badge (`.surat-wax-badge-mini`) with champagne border and refined letter-spacing.
    - Redesigned `.btn-open-surat-modal` with warm champagne gold gradient (`linear-gradient(135deg, #dfb96d 0%, #c59b48 100%)`), deep forest typography, and smooth hover micro-interaction.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #71: Streamlined Visual-First Cluster Cards (Nagoya, Osaka, Tokyo)
- **Context & Objective**: Clean up and declutter the 3 cluster triptych cards in Surat Cinta tab, removing long paragraph descriptions, emphasizing architectural product imagery, and removing the trailing arrow from "Peta Kawasan".
- **Key Changes Implemented**:
  - **Visual-First Layout & Decluttering (index.html)**:
    - Removed long paragraph descriptions (`.cluster-card-desc`) across Nagoya, Osaka, and Tokyo cards.
    - Simplified footer to streamlined location tag (`stat-loc`) and compact action button without arrows.
    - Made the entire card surface clickable (`onclick="switchLandingTab('siteplan'); switchLandingSiteplan(...)`) for seamless navigation.
  - **Elevated Photography Dimensions (styles.css)**:
    - Increased image container height (`.cluster-card-img-wrap`) from 85px to 120px (mobile) / 135px (desktop), giving priority to visual architectural rendering.
    - Refined badge styling and unified `.btn-cluster-explore` with forest green gradient.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #72: Minimalist Header & Segmented Toggle for Gold vs Diamond Specs
- **Context & Objective**: Declutter the architectural type comparison section in Surat Cinta tab, removing wordy subtitles and aligning the pill buttons into an elegant segmented toggle.
- **Key Changes Implemented**:
  - **Header Decluttering (index.html)**:
    - Removed redundant `.section-tag` and long `.section-desc`.
    - Simplified title to clean, centered "Tipe Gold & Diamond" (`text-align: center; margin: 0;`).
  - **Segmented Control Toggle (styles.css)**:
    - Refactored `.spec-toggle-bar` into a unified segmented control capsule with subtle border (`1px solid #e8e2d5`), neutral background (`#fbfaf7`), and 4px padding.
    - Elevated active button (`.spec-tab-btn.is-active`) with forest green gradient (`#11332a` to `#1e4d40`), crisp white text, and subtle elevation shadow.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #73: Visual Photographic Enrichment & Streamlined Price Matrix
- **Context & Objective**: Transform the text-heavy and dull price list cards in Surat Cinta tab into engaging visual product cards with architectural photography banners, decluttered titles, and prominent unit selection actions.
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Removed redundant tag and description, keeping only the clean centered title "Pilihan Unit & Skema Pembayaran".
  - **Photographic Banner Integration (app.js)**:
    - In `renderPriceMatrix()`, added `.price-card-banner` with authentic architectural photo thumbnails matching each cluster (Nagoya, Tokyo, Osaka).
    - Added dark gradient overlay with bold serif unit ID, clean dimension specs, and floating "Pilih Unit" primary action pill.
  - **Modern Card Grid Styling (styles.css)**:
    - Elevated `.price-unit-card` with 12px radius, smooth hover lift (-2px), 95px banner image with 1.04x zoom hover, and 2-column pricing tiles (Cash Keras, Cash Tempo 12/24 Bulan, KPR Bank).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-22] Progress #42: Remove Video Progress Bars & Pause Toggle Buttons
- **Context & Objective**: Clean up video overlay clutter requested by user:
  1. Remove the segmented gold progress bars at the top of the video (`.top-video-progress-row`).
  2. Remove the pause button toggle (`.btn-video-toggle-mini` / `#btnVideoPlayToggle` and `#btnTopVideoPlayPause`).
- **Key Changes Implemented**:
  - **Markup (index.html)**:
    - Removed `#topVideoProgressRow` from `#berandaTopVideoBanner`.
    - Removed `#btnTopVideoPlayPause` from `.top-video-floating-actions`.
    - Removed `.video-head-row` and `#btnVideoPlayToggle` from `#landingVideoCard`.
  - **Styles (styles.css)**:
    - Deleted CSS rules for `.top-video-progress-row`, `.top-progress-track`, `.top-progress-fill`.
    - Deleted CSS rules for `.video-head-row` and `.btn-video-toggle-mini`.
  - **Script (app.js)**:
    - Removed progress bar synchronization logic (`ontimeupdate`, `resetTopProgressBars`) and unused button references.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #61: Redundant Unit Page Quick-Links Strip Removal
- **Context & Objective**: Remove duplicate navigation cards and horizontal quick-link bar (`.unit-page-quick-links` and `.unit-page-nav-bar`) from the Unit catalog page (`#panelUnit`), ensuring strict adherence to Rule 5 (single-source Mobile Bottom Navigation Bar) and a clean uncluttered presentation.
- **Key Changes Implemented**:
  - **Structure Simplification (index.html)**:
    - Removed redundant `.unit-page-nav-bar` ("Avenue Grand Gate · Sukoharjo", Sales Login) and `.unit-page-quick-links` ("THEPARKTOWNHOUSE", Beranda, Keunggulan, Unit, Fasilitas, Lokasi, Kalkulator, Hubungi Kami).
    - `#panelUnit` now initiates directly with `.unit-hero-header-card` ("Katalog Hunian · Pilihan Unit per Cluster").
  - **Stylesheet Optimization (styles.css)**:
    - Purged 105 lines of obsolete CSS rules (`.unit-page-nav-bar`, `.unit-nav-loc`, `.unit-nav-dot`, `.unit-nav-right`, `.unit-lang-pill`, `.unit-sales-login-link`, `.unit-page-quick-links`, `.unit-brand-logo-btn`, `.unit-quick-links-list`, `.unit-quick-link`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #62: Compact Unit Header Navbar with Clean Cluster Navigation
- **Context & Objective**: Refactor the large Unit hero card into a sleek, concise navbar header (`.unit-header-navbar`) with simplified copy and quick cluster navigation chips (Nagoya, Tokyo, Osaka).
- **Key Changes Implemented**:
  - **Navbar Layout & Simplified Copy (index.html)**:
    - Replaced heavy hero text with concise header: `Katalog Hunian` (gold tag), `Pilihan Unit` (title), and `30 Unit · Japandi Modern` (subtitle).
    - Added clean cluster jump pills (`Nagoya`, `Tokyo`, `Osaka`) that smoothly scroll directly to each cluster block on tap.
  - **Japandi Aesthetic & Mobile Styling (styles.css)**:
    - Styled `.unit-header-navbar` with deep forest green gradient (`#11332a` to `#1e4d40`), 12px rounded borders, and subtle shadow.
    - Added `.unit-nav-chip` buttons with 32px height, soft translucent background, and gold accent active states matching design system tokens.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #63: Collapsible Drawer & Horizontal Swipe Chips for Unit Filter
- **Context & Objective**: Compact the tall, multi-row Unit catalog filter card into an expandable drawer with a filter icon toggle trigger and horizontal swipeable chip scrollers.
- **Key Changes Implemented**:
  - **Collapsible Filter Drawer (index.html, styles.css, app.js)**:
    - Created `.unit-filter-toggle-btn` with funnel filter icon, live summary of active filters, active filter count badge, and animated chevron indicator.
    - Wrapped filter options in `#filterControlsWrapper`, defaulting to collapsed state to eliminate vertical clutter.
    - Added `toggleUnitFilterCard()` and `updateUnitFilterSummary()` in `app.js` to handle opening/closing and live status badge updates.
  - **Horizontal Swipeable Chip Scrollers (index.html & styles.css)**:
    - Converted wrapped multi-line chips into single-row horizontal swipe scrollers (`.filter-chips-scroller`) for Tipe Unit, Luas Tanah, Range Harga, and Posisi Kavling.
    - Added `geser ↔` hint, smooth scrolling, and touch inertia (`-webkit-overflow-scrolling: touch`) with 32px min-height tap targets conforming to Rule 5.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #64: Responsive 2-to-3 Column Layout for Unit Product Cards
- **Context & Objective**: Compact the oversized unit product cards in the catalog (`.unit-inventory-grid`) into a refined 2-column layout on mobile and 3-column layout on tablet/desktop, preventing bulky single-column stretching.
- **Key Changes Implemented**:
  - **Multi-Column Grid Architecture (styles.css)**:
    - Replaced loose `repeat(auto-fill, minmax(180px, 1fr))` with strict `grid-template-columns: repeat(2, 1fr)` on mobile (< 640px) and `repeat(3, 1fr)` on wider screens (>= 640px).
    - Reduced inter-card spacing to 8px on mobile and 12px on desktop.
  - **Compact Visual Dimensions & Typography (styles.css)**:
    - Compacted `.uic-media` height to 90px (mobile) / 105px (desktop) with 1.04x subtle zoom hover.
    - Streamlined body padding to 8px and tuned font sizes (`.uic-id`: 12.5px, `.uic-price-val`: 11.5px bold forest green, `.uic-specs`: 9.5px).
    - Compacted primary action button (`.uic-action-btn`) to 30px height with crisp 10.5px text and 4px gap.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #65: Clean Button Copy Simplification (Remove Arrow from "Pesan Kavling Ini")
- **Context & Objective**: Remove trailing arrow symbols (`→`) from the unit order CTA buttons, leaving clean and centered "Pesan Kavling Ini" copy across catalog cards and site plan inspector cards.
- **Key Changes Implemented**:
  - **Product Card Action Button (app.js)**:
    - In `renderLandingUnits()`, removed `<span>→</span>` from `.uic-action-btn`, displaying clean `<span>Pesan Kavling Ini</span>`.
  - **Site Plan Inspector Buttons (index.html)**:
    - Removed `<span>→</span>` from `.btn-order-kavling-champagne` in both Beranda (`#berandaLotInspector`) and Site Plan page (`#pageLotInspector`), standardizing text to `<span>Pesan Kavling Ini</span>`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #66: Comprehensive Arrow Symbol Removal Across All Pages
- **Context & Objective**: Remove all trailing and inline arrow symbols (`→`, `←`, `&rarr;`, `&larr;`) from buttons, links, and cards across all pages and modals for a cleaner, unified typography.
- **Key Changes Implemented**:
  - **HTML Buttons & Links Cleaned (index.html)**:
    - Removed all 44 occurrences of `<span>→</span>` from primary CTAs (CTA cards, tour buttons, showcase buttons, quiz items, facilities cards, Super App action buttons, and footer links).
    - Removed trailing arrows from Super App action triggers (`Unlock`, `Generate QR`, `Pesan Slot`, `Bayar`, `Buat Laporan`, `Kirim SOS`).
    - Cleaned `.back-arrow` symbols from subpage headers.
  - **JavaScript Dynamic Templates Cleaned (app.js)**:
    - Cleaned `<span>→</span>` from modal CTAs (WhatsApp modal, tour finish modal, booking modal, 99 keunggulan explorer).
    - Removed `→` and `←` from theme switcher navigation buttons (`Tema Sebelumnya` and `Tema Berikutnya`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #67: Dedicated Interactive Unit Product Detail Page Integration
- **Context & Objective**: Enable clickable product cards in the Unit catalog that open a dedicated, harmonized Product Detail subpage (`#unitDetailView`) for every individual unit (all 30 units across Nagoya, Tokyo, and Osaka).
- **Key Changes Implemented**:
  - **Dedicated Unit Detail View Architecture (index.html)**:
    - Built `#unitDetailView` inside `#panelUnit` with back navigation bar (`Katalog Unit`), dynamic cluster tag, lot ID title, and quick order action.
    - Hero gallery featuring 220px/280px architectural photography, status badge (Tersedia/Terjual), Japandi type subtitle, price summary strip, and estimated monthly installment.
    - 4 architecture metric cards (Kamar Tidur, Kamar Mandi, Luas Bangunan, Luas Tanah).
    - Living character & specifications section with 4 bespoke Japandi comfort highlights (Cross Ventilation, Carport Teduh, One-Gate 24h, Legalitas SHM).
    - Flexible payment schemes card (Cash Keras, Cash Bertahap 0%, KPR Express).
    - Fixed bottom floating action bar with live price, direct WhatsApp inquiry, and "Pesan Kavling Ini" primary CTA button.
  - **Interactive View Management & Dynamic Data Binding (app.js)**:
    - Upgraded `.unit-inventory-card` with `onclick="openUnitDetail('${clusterKey}', '${u.id}')"` while preserving `event.stopPropagation()` on the direct order button.
    - Implemented `openUnitDetail(clusterKey, unitId)` populating photos, titles, prices, specs, and status dynamically for all 30 units.
    - Implemented `closeUnitDetail()` returning cleanly to `#unitCatalogHub`.
    - Implemented `orderCurrentDetailUnit()` hooking into the global booking modal.
  - **Design System Harmonization (styles.css)**:
    - Applied forest green luxury palette (`#11332a` to `#1e4d40`), champagne gold accents (`#dfb96d`), 12px/14px rounded cards, and proper mobile bottom bar clearances.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #68: Remove Lighting Mood Switcher Pill Bar from Header
- **Context & Objective**: Remove the "Siang / Senja / Malam" lighting mood switcher element (`#landingLightingSwitch`) from the global sticky header (`.landing-navbar`) to keep the top bar clean and uncluttered.
- **Key Changes Implemented**:
  - **Header Cleanup (index.html)**:
    - Removed `#landingLightingSwitch` and its 3 mood buttons (`#moodDayBtn`, `#moodDuskBtn`, `#moodNightBtn`) from `.landing-nav-actions`.
    - Cleaned up top header, retaining only the brand logo and bookmark saved configuration button.
  - **Stylesheet Optimization (styles.css)**:
    - Removed `.landing-lighting-switch` and `.lighting-pill-btn` CSS styling rules.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #69: Simplify 11 Themes Header to Centered Title
- **Context & Objective**: Clean up the section header above the 11 theme chips in Surat Cinta tab (`#section99Keunggulan`), removing the tag (`99 KEUNGGULAN · SUKOHARJO`) and subtitle description, keeping only the centered title "Telusuri 11 Tema Keunggulan".
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Stripped `.section-tag` and `.section-desc`.
    - Centered `.section-title` ("Telusuri 11 Tema Keunggulan") using `text-align: center; margin: 0;`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #70: Refined Luxury Card Redesign for 'Surat Resmi Dari Pengembang' Banner
- **Context & Objective**: Elevate the visual appeal and layout structure of `.surat-compact-banner` in Surat Cinta tab, crafting an authentic luxury aesthetic with gold accents, deep forest tones, and champagne button contrast.
- **Key Changes Implemented**:
  - **Enhanced Layout & Card Hierarchy (index.html)**:
    - Grouped title and subtitle into `.surat-banner-body` for consistent text flow.
    - Wrapped CTA button in `.surat-banner-action-wrap` with improved padding and breathing room.
  - **Japandi Luxury Styling & Accents (styles.css)**:
    - Applied multi-stop deep forest gradient (`#11332a` to `#0d261f` to `#173d32`) with gold border accent (`rgba(223, 185, 109, 0.45)`) and subtle radial ambient glow (`::before`).
    - Elevated wax seal badge (`.surat-wax-badge-mini`) with champagne border and refined letter-spacing.
    - Redesigned `.btn-open-surat-modal` with warm champagne gold gradient (`linear-gradient(135deg, #dfb96d 0%, #c59b48 100%)`), deep forest typography, and smooth hover micro-interaction.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #71: Streamlined Visual-First Cluster Cards (Nagoya, Osaka, Tokyo)
- **Context & Objective**: Clean up and declutter the 3 cluster triptych cards in Surat Cinta tab, removing long paragraph descriptions, emphasizing architectural product imagery, and removing the trailing arrow from "Peta Kawasan".
- **Key Changes Implemented**:
  - **Visual-First Layout & Decluttering (index.html)**:
    - Removed long paragraph descriptions (`.cluster-card-desc`) across Nagoya, Osaka, and Tokyo cards.
    - Simplified footer to streamlined location tag (`stat-loc`) and compact action button without arrows.
    - Made the entire card surface clickable (`onclick="switchLandingTab('siteplan'); switchLandingSiteplan(...)`) for seamless navigation.
  - **Elevated Photography Dimensions (styles.css)**:
    - Increased image container height (`.cluster-card-img-wrap`) from 85px to 120px (mobile) / 135px (desktop), giving priority to visual architectural rendering.
    - Refined badge styling and unified `.btn-cluster-explore` with forest green gradient.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #72: Minimalist Header & Segmented Toggle for Gold vs Diamond Specs
- **Context & Objective**: Declutter the architectural type comparison section in Surat Cinta tab, removing wordy subtitles and aligning the pill buttons into an elegant segmented toggle.
- **Key Changes Implemented**:
  - **Header Decluttering (index.html)**:
    - Removed redundant `.section-tag` and long `.section-desc`.
    - Simplified title to clean, centered "Tipe Gold & Diamond" (`text-align: center; margin: 0;`).
  - **Segmented Control Toggle (styles.css)**:
    - Refactored `.spec-toggle-bar` into a unified segmented control capsule with subtle border (`1px solid #e8e2d5`), neutral background (`#fbfaf7`), and 4px padding.
    - Elevated active button (`.spec-tab-btn.is-active`) with forest green gradient (`#11332a` to `#1e4d40`), crisp white text, and subtle elevation shadow.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #73: Visual Photographic Enrichment & Streamlined Price Matrix
- **Context & Objective**: Transform the text-heavy and dull price list cards in Surat Cinta tab into engaging visual product cards with architectural photography banners, decluttered titles, and prominent unit selection actions.
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Removed redundant tag and description, keeping only the clean centered title "Pilihan Unit & Skema Pembayaran".
  - **Photographic Banner Integration (app.js)**:
    - In `renderPriceMatrix()`, added `.price-card-banner` with authentic architectural photo thumbnails matching each cluster (Nagoya, Tokyo, Osaka).
    - Added dark gradient overlay with bold serif unit ID, clean dimension specs, and floating "Pilih Unit" primary action pill.
  - **Modern Card Grid Styling (styles.css)**:
    - Elevated `.price-unit-card` with 12px radius, smooth hover lift (-2px), 95px banner image with 1.04x zoom hover, and 2-column pricing tiles (Cash Keras, Cash Tempo 12/24 Bulan, KPR Bank).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-22] Progress #43: Transform Prologue Letter into Auto Popup Modal on Surat Cinta Tab
- **Context & Objective**: Display the prologue letter "SURAT UNTUK CALON PENGHUNI" as an automated pop-up modal when the user navigates to the Surat Cinta page, keeping the main page uncluttered with a compact invitation banner to re-open the pop-up anytime.
- **Key Changes Implemented**:
  - **Pop-up Modal Structure (index.html)**:
    - Created `#suratPrologueModal` featuring wax seal header, official document metadata, concise letter body, pullquote, and signature block with close and proceed buttons.
    - Replaced the large static `.surat-hero-card` on `#panelSuratCinta` with `.surat-compact-banner` containing a gold "Buka Surat untuk Calon Penghuni" button.
  - **Modal Styling (styles.css)**:
    - Styled `.surat-modal-backdrop` with dark green glassmorphism blur and smooth entrance scale animation (`.surat-modal-card`).
    - Styled `.surat-compact-banner` and `.btn-open-surat-modal` for seamless inline aesthetics.
  - **Controller Logic (app.js)**:
    - Implemented `openSuratPrologueModal()`, `closeSuratPrologueModal()`, and `handleSuratModalBackdropClick()`.
    - Wired `switchLandingTab('SuratCinta')` to trigger `openSuratPrologueModal()` automatically upon entering the page.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #61: Redundant Unit Page Quick-Links Strip Removal
- **Context & Objective**: Remove duplicate navigation cards and horizontal quick-link bar (`.unit-page-quick-links` and `.unit-page-nav-bar`) from the Unit catalog page (`#panelUnit`), ensuring strict adherence to Rule 5 (single-source Mobile Bottom Navigation Bar) and a clean uncluttered presentation.
- **Key Changes Implemented**:
  - **Structure Simplification (index.html)**:
    - Removed redundant `.unit-page-nav-bar` ("Avenue Grand Gate · Sukoharjo", Sales Login) and `.unit-page-quick-links` ("THEPARKTOWNHOUSE", Beranda, Keunggulan, Unit, Fasilitas, Lokasi, Kalkulator, Hubungi Kami).
    - `#panelUnit` now initiates directly with `.unit-hero-header-card` ("Katalog Hunian · Pilihan Unit per Cluster").
  - **Stylesheet Optimization (styles.css)**:
    - Purged 105 lines of obsolete CSS rules (`.unit-page-nav-bar`, `.unit-nav-loc`, `.unit-nav-dot`, `.unit-nav-right`, `.unit-lang-pill`, `.unit-sales-login-link`, `.unit-page-quick-links`, `.unit-brand-logo-btn`, `.unit-quick-links-list`, `.unit-quick-link`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #62: Compact Unit Header Navbar with Clean Cluster Navigation
- **Context & Objective**: Refactor the large Unit hero card into a sleek, concise navbar header (`.unit-header-navbar`) with simplified copy and quick cluster navigation chips (Nagoya, Tokyo, Osaka).
- **Key Changes Implemented**:
  - **Navbar Layout & Simplified Copy (index.html)**:
    - Replaced heavy hero text with concise header: `Katalog Hunian` (gold tag), `Pilihan Unit` (title), and `30 Unit · Japandi Modern` (subtitle).
    - Added clean cluster jump pills (`Nagoya`, `Tokyo`, `Osaka`) that smoothly scroll directly to each cluster block on tap.
  - **Japandi Aesthetic & Mobile Styling (styles.css)**:
    - Styled `.unit-header-navbar` with deep forest green gradient (`#11332a` to `#1e4d40`), 12px rounded borders, and subtle shadow.
    - Added `.unit-nav-chip` buttons with 32px height, soft translucent background, and gold accent active states matching design system tokens.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #63: Collapsible Drawer & Horizontal Swipe Chips for Unit Filter
- **Context & Objective**: Compact the tall, multi-row Unit catalog filter card into an expandable drawer with a filter icon toggle trigger and horizontal swipeable chip scrollers.
- **Key Changes Implemented**:
  - **Collapsible Filter Drawer (index.html, styles.css, app.js)**:
    - Created `.unit-filter-toggle-btn` with funnel filter icon, live summary of active filters, active filter count badge, and animated chevron indicator.
    - Wrapped filter options in `#filterControlsWrapper`, defaulting to collapsed state to eliminate vertical clutter.
    - Added `toggleUnitFilterCard()` and `updateUnitFilterSummary()` in `app.js` to handle opening/closing and live status badge updates.
  - **Horizontal Swipeable Chip Scrollers (index.html & styles.css)**:
    - Converted wrapped multi-line chips into single-row horizontal swipe scrollers (`.filter-chips-scroller`) for Tipe Unit, Luas Tanah, Range Harga, and Posisi Kavling.
    - Added `geser ↔` hint, smooth scrolling, and touch inertia (`-webkit-overflow-scrolling: touch`) with 32px min-height tap targets conforming to Rule 5.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #64: Responsive 2-to-3 Column Layout for Unit Product Cards
- **Context & Objective**: Compact the oversized unit product cards in the catalog (`.unit-inventory-grid`) into a refined 2-column layout on mobile and 3-column layout on tablet/desktop, preventing bulky single-column stretching.
- **Key Changes Implemented**:
  - **Multi-Column Grid Architecture (styles.css)**:
    - Replaced loose `repeat(auto-fill, minmax(180px, 1fr))` with strict `grid-template-columns: repeat(2, 1fr)` on mobile (< 640px) and `repeat(3, 1fr)` on wider screens (>= 640px).
    - Reduced inter-card spacing to 8px on mobile and 12px on desktop.
  - **Compact Visual Dimensions & Typography (styles.css)**:
    - Compacted `.uic-media` height to 90px (mobile) / 105px (desktop) with 1.04x subtle zoom hover.
    - Streamlined body padding to 8px and tuned font sizes (`.uic-id`: 12.5px, `.uic-price-val`: 11.5px bold forest green, `.uic-specs`: 9.5px).
    - Compacted primary action button (`.uic-action-btn`) to 30px height with crisp 10.5px text and 4px gap.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #65: Clean Button Copy Simplification (Remove Arrow from "Pesan Kavling Ini")
- **Context & Objective**: Remove trailing arrow symbols (`→`) from the unit order CTA buttons, leaving clean and centered "Pesan Kavling Ini" copy across catalog cards and site plan inspector cards.
- **Key Changes Implemented**:
  - **Product Card Action Button (app.js)**:
    - In `renderLandingUnits()`, removed `<span>→</span>` from `.uic-action-btn`, displaying clean `<span>Pesan Kavling Ini</span>`.
  - **Site Plan Inspector Buttons (index.html)**:
    - Removed `<span>→</span>` from `.btn-order-kavling-champagne` in both Beranda (`#berandaLotInspector`) and Site Plan page (`#pageLotInspector`), standardizing text to `<span>Pesan Kavling Ini</span>`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #66: Comprehensive Arrow Symbol Removal Across All Pages
- **Context & Objective**: Remove all trailing and inline arrow symbols (`→`, `←`, `&rarr;`, `&larr;`) from buttons, links, and cards across all pages and modals for a cleaner, unified typography.
- **Key Changes Implemented**:
  - **HTML Buttons & Links Cleaned (index.html)**:
    - Removed all 44 occurrences of `<span>→</span>` from primary CTAs (CTA cards, tour buttons, showcase buttons, quiz items, facilities cards, Super App action buttons, and footer links).
    - Removed trailing arrows from Super App action triggers (`Unlock`, `Generate QR`, `Pesan Slot`, `Bayar`, `Buat Laporan`, `Kirim SOS`).
    - Cleaned `.back-arrow` symbols from subpage headers.
  - **JavaScript Dynamic Templates Cleaned (app.js)**:
    - Cleaned `<span>→</span>` from modal CTAs (WhatsApp modal, tour finish modal, booking modal, 99 keunggulan explorer).
    - Removed `→` and `←` from theme switcher navigation buttons (`Tema Sebelumnya` and `Tema Berikutnya`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #67: Dedicated Interactive Unit Product Detail Page Integration
- **Context & Objective**: Enable clickable product cards in the Unit catalog that open a dedicated, harmonized Product Detail subpage (`#unitDetailView`) for every individual unit (all 30 units across Nagoya, Tokyo, and Osaka).
- **Key Changes Implemented**:
  - **Dedicated Unit Detail View Architecture (index.html)**:
    - Built `#unitDetailView` inside `#panelUnit` with back navigation bar (`Katalog Unit`), dynamic cluster tag, lot ID title, and quick order action.
    - Hero gallery featuring 220px/280px architectural photography, status badge (Tersedia/Terjual), Japandi type subtitle, price summary strip, and estimated monthly installment.
    - 4 architecture metric cards (Kamar Tidur, Kamar Mandi, Luas Bangunan, Luas Tanah).
    - Living character & specifications section with 4 bespoke Japandi comfort highlights (Cross Ventilation, Carport Teduh, One-Gate 24h, Legalitas SHM).
    - Flexible payment schemes card (Cash Keras, Cash Bertahap 0%, KPR Express).
    - Fixed bottom floating action bar with live price, direct WhatsApp inquiry, and "Pesan Kavling Ini" primary CTA button.
  - **Interactive View Management & Dynamic Data Binding (app.js)**:
    - Upgraded `.unit-inventory-card` with `onclick="openUnitDetail('${clusterKey}', '${u.id}')"` while preserving `event.stopPropagation()` on the direct order button.
    - Implemented `openUnitDetail(clusterKey, unitId)` populating photos, titles, prices, specs, and status dynamically for all 30 units.
    - Implemented `closeUnitDetail()` returning cleanly to `#unitCatalogHub`.
    - Implemented `orderCurrentDetailUnit()` hooking into the global booking modal.
  - **Design System Harmonization (styles.css)**:
    - Applied forest green luxury palette (`#11332a` to `#1e4d40`), champagne gold accents (`#dfb96d`), 12px/14px rounded cards, and proper mobile bottom bar clearances.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #68: Remove Lighting Mood Switcher Pill Bar from Header
- **Context & Objective**: Remove the "Siang / Senja / Malam" lighting mood switcher element (`#landingLightingSwitch`) from the global sticky header (`.landing-navbar`) to keep the top bar clean and uncluttered.
- **Key Changes Implemented**:
  - **Header Cleanup (index.html)**:
    - Removed `#landingLightingSwitch` and its 3 mood buttons (`#moodDayBtn`, `#moodDuskBtn`, `#moodNightBtn`) from `.landing-nav-actions`.
    - Cleaned up top header, retaining only the brand logo and bookmark saved configuration button.
  - **Stylesheet Optimization (styles.css)**:
    - Removed `.landing-lighting-switch` and `.lighting-pill-btn` CSS styling rules.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #69: Simplify 11 Themes Header to Centered Title
- **Context & Objective**: Clean up the section header above the 11 theme chips in Surat Cinta tab (`#section99Keunggulan`), removing the tag (`99 KEUNGGULAN · SUKOHARJO`) and subtitle description, keeping only the centered title "Telusuri 11 Tema Keunggulan".
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Stripped `.section-tag` and `.section-desc`.
    - Centered `.section-title` ("Telusuri 11 Tema Keunggulan") using `text-align: center; margin: 0;`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #70: Refined Luxury Card Redesign for 'Surat Resmi Dari Pengembang' Banner
- **Context & Objective**: Elevate the visual appeal and layout structure of `.surat-compact-banner` in Surat Cinta tab, crafting an authentic luxury aesthetic with gold accents, deep forest tones, and champagne button contrast.
- **Key Changes Implemented**:
  - **Enhanced Layout & Card Hierarchy (index.html)**:
    - Grouped title and subtitle into `.surat-banner-body` for consistent text flow.
    - Wrapped CTA button in `.surat-banner-action-wrap` with improved padding and breathing room.
  - **Japandi Luxury Styling & Accents (styles.css)**:
    - Applied multi-stop deep forest gradient (`#11332a` to `#0d261f` to `#173d32`) with gold border accent (`rgba(223, 185, 109, 0.45)`) and subtle radial ambient glow (`::before`).
    - Elevated wax seal badge (`.surat-wax-badge-mini`) with champagne border and refined letter-spacing.
    - Redesigned `.btn-open-surat-modal` with warm champagne gold gradient (`linear-gradient(135deg, #dfb96d 0%, #c59b48 100%)`), deep forest typography, and smooth hover micro-interaction.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #71: Streamlined Visual-First Cluster Cards (Nagoya, Osaka, Tokyo)
- **Context & Objective**: Clean up and declutter the 3 cluster triptych cards in Surat Cinta tab, removing long paragraph descriptions, emphasizing architectural product imagery, and removing the trailing arrow from "Peta Kawasan".
- **Key Changes Implemented**:
  - **Visual-First Layout & Decluttering (index.html)**:
    - Removed long paragraph descriptions (`.cluster-card-desc`) across Nagoya, Osaka, and Tokyo cards.
    - Simplified footer to streamlined location tag (`stat-loc`) and compact action button without arrows.
    - Made the entire card surface clickable (`onclick="switchLandingTab('siteplan'); switchLandingSiteplan(...)`) for seamless navigation.
  - **Elevated Photography Dimensions (styles.css)**:
    - Increased image container height (`.cluster-card-img-wrap`) from 85px to 120px (mobile) / 135px (desktop), giving priority to visual architectural rendering.
    - Refined badge styling and unified `.btn-cluster-explore` with forest green gradient.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #72: Minimalist Header & Segmented Toggle for Gold vs Diamond Specs
- **Context & Objective**: Declutter the architectural type comparison section in Surat Cinta tab, removing wordy subtitles and aligning the pill buttons into an elegant segmented toggle.
- **Key Changes Implemented**:
  - **Header Decluttering (index.html)**:
    - Removed redundant `.section-tag` and long `.section-desc`.
    - Simplified title to clean, centered "Tipe Gold & Diamond" (`text-align: center; margin: 0;`).
  - **Segmented Control Toggle (styles.css)**:
    - Refactored `.spec-toggle-bar` into a unified segmented control capsule with subtle border (`1px solid #e8e2d5`), neutral background (`#fbfaf7`), and 4px padding.
    - Elevated active button (`.spec-tab-btn.is-active`) with forest green gradient (`#11332a` to `#1e4d40`), crisp white text, and subtle elevation shadow.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #73: Visual Photographic Enrichment & Streamlined Price Matrix
- **Context & Objective**: Transform the text-heavy and dull price list cards in Surat Cinta tab into engaging visual product cards with architectural photography banners, decluttered titles, and prominent unit selection actions.
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Removed redundant tag and description, keeping only the clean centered title "Pilihan Unit & Skema Pembayaran".
  - **Photographic Banner Integration (app.js)**:
    - In `renderPriceMatrix()`, added `.price-card-banner` with authentic architectural photo thumbnails matching each cluster (Nagoya, Tokyo, Osaka).
    - Added dark gradient overlay with bold serif unit ID, clean dimension specs, and floating "Pilih Unit" primary action pill.
  - **Modern Card Grid Styling (styles.css)**:
    - Elevated `.price-unit-card` with 12px radius, smooth hover lift (-2px), 95px banner image with 1.04x zoom hover, and 2-column pricing tiles (Cash Keras, Cash Tempo 12/24 Bulan, KPR Bank).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-22] Progress #44: Reposition 99 Keunggulan to Top of Surat Cinta Tab
- **Context & Objective**: Place the interactive 99 Keunggulan section (11 Tema Explorer & Showcase) at the very top of the Surat Cinta page (`#panelSuratCinta`) as requested by the user.
- **Key Changes Implemented**:
  - **Layout Re-ordering (index.html)**:
    - Moved `#section99Keunggulan`, `#themeNavScroller`, and `#themeShowcaseBox` to the top position inside `.surat-magazine-container` above the compact letter banner and cluster triptych grid.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #61: Redundant Unit Page Quick-Links Strip Removal
- **Context & Objective**: Remove duplicate navigation cards and horizontal quick-link bar (`.unit-page-quick-links` and `.unit-page-nav-bar`) from the Unit catalog page (`#panelUnit`), ensuring strict adherence to Rule 5 (single-source Mobile Bottom Navigation Bar) and a clean uncluttered presentation.
- **Key Changes Implemented**:
  - **Structure Simplification (index.html)**:
    - Removed redundant `.unit-page-nav-bar` ("Avenue Grand Gate · Sukoharjo", Sales Login) and `.unit-page-quick-links` ("THEPARKTOWNHOUSE", Beranda, Keunggulan, Unit, Fasilitas, Lokasi, Kalkulator, Hubungi Kami).
    - `#panelUnit` now initiates directly with `.unit-hero-header-card` ("Katalog Hunian · Pilihan Unit per Cluster").
  - **Stylesheet Optimization (styles.css)**:
    - Purged 105 lines of obsolete CSS rules (`.unit-page-nav-bar`, `.unit-nav-loc`, `.unit-nav-dot`, `.unit-nav-right`, `.unit-lang-pill`, `.unit-sales-login-link`, `.unit-page-quick-links`, `.unit-brand-logo-btn`, `.unit-quick-links-list`, `.unit-quick-link`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #62: Compact Unit Header Navbar with Clean Cluster Navigation
- **Context & Objective**: Refactor the large Unit hero card into a sleek, concise navbar header (`.unit-header-navbar`) with simplified copy and quick cluster navigation chips (Nagoya, Tokyo, Osaka).
- **Key Changes Implemented**:
  - **Navbar Layout & Simplified Copy (index.html)**:
    - Replaced heavy hero text with concise header: `Katalog Hunian` (gold tag), `Pilihan Unit` (title), and `30 Unit · Japandi Modern` (subtitle).
    - Added clean cluster jump pills (`Nagoya`, `Tokyo`, `Osaka`) that smoothly scroll directly to each cluster block on tap.
  - **Japandi Aesthetic & Mobile Styling (styles.css)**:
    - Styled `.unit-header-navbar` with deep forest green gradient (`#11332a` to `#1e4d40`), 12px rounded borders, and subtle shadow.
    - Added `.unit-nav-chip` buttons with 32px height, soft translucent background, and gold accent active states matching design system tokens.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #63: Collapsible Drawer & Horizontal Swipe Chips for Unit Filter
- **Context & Objective**: Compact the tall, multi-row Unit catalog filter card into an expandable drawer with a filter icon toggle trigger and horizontal swipeable chip scrollers.
- **Key Changes Implemented**:
  - **Collapsible Filter Drawer (index.html, styles.css, app.js)**:
    - Created `.unit-filter-toggle-btn` with funnel filter icon, live summary of active filters, active filter count badge, and animated chevron indicator.
    - Wrapped filter options in `#filterControlsWrapper`, defaulting to collapsed state to eliminate vertical clutter.
    - Added `toggleUnitFilterCard()` and `updateUnitFilterSummary()` in `app.js` to handle opening/closing and live status badge updates.
  - **Horizontal Swipeable Chip Scrollers (index.html & styles.css)**:
    - Converted wrapped multi-line chips into single-row horizontal swipe scrollers (`.filter-chips-scroller`) for Tipe Unit, Luas Tanah, Range Harga, and Posisi Kavling.
    - Added `geser ↔` hint, smooth scrolling, and touch inertia (`-webkit-overflow-scrolling: touch`) with 32px min-height tap targets conforming to Rule 5.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #64: Responsive 2-to-3 Column Layout for Unit Product Cards
- **Context & Objective**: Compact the oversized unit product cards in the catalog (`.unit-inventory-grid`) into a refined 2-column layout on mobile and 3-column layout on tablet/desktop, preventing bulky single-column stretching.
- **Key Changes Implemented**:
  - **Multi-Column Grid Architecture (styles.css)**:
    - Replaced loose `repeat(auto-fill, minmax(180px, 1fr))` with strict `grid-template-columns: repeat(2, 1fr)` on mobile (< 640px) and `repeat(3, 1fr)` on wider screens (>= 640px).
    - Reduced inter-card spacing to 8px on mobile and 12px on desktop.
  - **Compact Visual Dimensions & Typography (styles.css)**:
    - Compacted `.uic-media` height to 90px (mobile) / 105px (desktop) with 1.04x subtle zoom hover.
    - Streamlined body padding to 8px and tuned font sizes (`.uic-id`: 12.5px, `.uic-price-val`: 11.5px bold forest green, `.uic-specs`: 9.5px).
    - Compacted primary action button (`.uic-action-btn`) to 30px height with crisp 10.5px text and 4px gap.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #65: Clean Button Copy Simplification (Remove Arrow from "Pesan Kavling Ini")
- **Context & Objective**: Remove trailing arrow symbols (`→`) from the unit order CTA buttons, leaving clean and centered "Pesan Kavling Ini" copy across catalog cards and site plan inspector cards.
- **Key Changes Implemented**:
  - **Product Card Action Button (app.js)**:
    - In `renderLandingUnits()`, removed `<span>→</span>` from `.uic-action-btn`, displaying clean `<span>Pesan Kavling Ini</span>`.
  - **Site Plan Inspector Buttons (index.html)**:
    - Removed `<span>→</span>` from `.btn-order-kavling-champagne` in both Beranda (`#berandaLotInspector`) and Site Plan page (`#pageLotInspector`), standardizing text to `<span>Pesan Kavling Ini</span>`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #66: Comprehensive Arrow Symbol Removal Across All Pages
- **Context & Objective**: Remove all trailing and inline arrow symbols (`→`, `←`, `&rarr;`, `&larr;`) from buttons, links, and cards across all pages and modals for a cleaner, unified typography.
- **Key Changes Implemented**:
  - **HTML Buttons & Links Cleaned (index.html)**:
    - Removed all 44 occurrences of `<span>→</span>` from primary CTAs (CTA cards, tour buttons, showcase buttons, quiz items, facilities cards, Super App action buttons, and footer links).
    - Removed trailing arrows from Super App action triggers (`Unlock`, `Generate QR`, `Pesan Slot`, `Bayar`, `Buat Laporan`, `Kirim SOS`).
    - Cleaned `.back-arrow` symbols from subpage headers.
  - **JavaScript Dynamic Templates Cleaned (app.js)**:
    - Cleaned `<span>→</span>` from modal CTAs (WhatsApp modal, tour finish modal, booking modal, 99 keunggulan explorer).
    - Removed `→` and `←` from theme switcher navigation buttons (`Tema Sebelumnya` and `Tema Berikutnya`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #67: Dedicated Interactive Unit Product Detail Page Integration
- **Context & Objective**: Enable clickable product cards in the Unit catalog that open a dedicated, harmonized Product Detail subpage (`#unitDetailView`) for every individual unit (all 30 units across Nagoya, Tokyo, and Osaka).
- **Key Changes Implemented**:
  - **Dedicated Unit Detail View Architecture (index.html)**:
    - Built `#unitDetailView` inside `#panelUnit` with back navigation bar (`Katalog Unit`), dynamic cluster tag, lot ID title, and quick order action.
    - Hero gallery featuring 220px/280px architectural photography, status badge (Tersedia/Terjual), Japandi type subtitle, price summary strip, and estimated monthly installment.
    - 4 architecture metric cards (Kamar Tidur, Kamar Mandi, Luas Bangunan, Luas Tanah).
    - Living character & specifications section with 4 bespoke Japandi comfort highlights (Cross Ventilation, Carport Teduh, One-Gate 24h, Legalitas SHM).
    - Flexible payment schemes card (Cash Keras, Cash Bertahap 0%, KPR Express).
    - Fixed bottom floating action bar with live price, direct WhatsApp inquiry, and "Pesan Kavling Ini" primary CTA button.
  - **Interactive View Management & Dynamic Data Binding (app.js)**:
    - Upgraded `.unit-inventory-card` with `onclick="openUnitDetail('${clusterKey}', '${u.id}')"` while preserving `event.stopPropagation()` on the direct order button.
    - Implemented `openUnitDetail(clusterKey, unitId)` populating photos, titles, prices, specs, and status dynamically for all 30 units.
    - Implemented `closeUnitDetail()` returning cleanly to `#unitCatalogHub`.
    - Implemented `orderCurrentDetailUnit()` hooking into the global booking modal.
  - **Design System Harmonization (styles.css)**:
    - Applied forest green luxury palette (`#11332a` to `#1e4d40`), champagne gold accents (`#dfb96d`), 12px/14px rounded cards, and proper mobile bottom bar clearances.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #68: Remove Lighting Mood Switcher Pill Bar from Header
- **Context & Objective**: Remove the "Siang / Senja / Malam" lighting mood switcher element (`#landingLightingSwitch`) from the global sticky header (`.landing-navbar`) to keep the top bar clean and uncluttered.
- **Key Changes Implemented**:
  - **Header Cleanup (index.html)**:
    - Removed `#landingLightingSwitch` and its 3 mood buttons (`#moodDayBtn`, `#moodDuskBtn`, `#moodNightBtn`) from `.landing-nav-actions`.
    - Cleaned up top header, retaining only the brand logo and bookmark saved configuration button.
  - **Stylesheet Optimization (styles.css)**:
    - Removed `.landing-lighting-switch` and `.lighting-pill-btn` CSS styling rules.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #69: Simplify 11 Themes Header to Centered Title
- **Context & Objective**: Clean up the section header above the 11 theme chips in Surat Cinta tab (`#section99Keunggulan`), removing the tag (`99 KEUNGGULAN · SUKOHARJO`) and subtitle description, keeping only the centered title "Telusuri 11 Tema Keunggulan".
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Stripped `.section-tag` and `.section-desc`.
    - Centered `.section-title` ("Telusuri 11 Tema Keunggulan") using `text-align: center; margin: 0;`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #70: Refined Luxury Card Redesign for 'Surat Resmi Dari Pengembang' Banner
- **Context & Objective**: Elevate the visual appeal and layout structure of `.surat-compact-banner` in Surat Cinta tab, crafting an authentic luxury aesthetic with gold accents, deep forest tones, and champagne button contrast.
- **Key Changes Implemented**:
  - **Enhanced Layout & Card Hierarchy (index.html)**:
    - Grouped title and subtitle into `.surat-banner-body` for consistent text flow.
    - Wrapped CTA button in `.surat-banner-action-wrap` with improved padding and breathing room.
  - **Japandi Luxury Styling & Accents (styles.css)**:
    - Applied multi-stop deep forest gradient (`#11332a` to `#0d261f` to `#173d32`) with gold border accent (`rgba(223, 185, 109, 0.45)`) and subtle radial ambient glow (`::before`).
    - Elevated wax seal badge (`.surat-wax-badge-mini`) with champagne border and refined letter-spacing.
    - Redesigned `.btn-open-surat-modal` with warm champagne gold gradient (`linear-gradient(135deg, #dfb96d 0%, #c59b48 100%)`), deep forest typography, and smooth hover micro-interaction.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #71: Streamlined Visual-First Cluster Cards (Nagoya, Osaka, Tokyo)
- **Context & Objective**: Clean up and declutter the 3 cluster triptych cards in Surat Cinta tab, removing long paragraph descriptions, emphasizing architectural product imagery, and removing the trailing arrow from "Peta Kawasan".
- **Key Changes Implemented**:
  - **Visual-First Layout & Decluttering (index.html)**:
    - Removed long paragraph descriptions (`.cluster-card-desc`) across Nagoya, Osaka, and Tokyo cards.
    - Simplified footer to streamlined location tag (`stat-loc`) and compact action button without arrows.
    - Made the entire card surface clickable (`onclick="switchLandingTab('siteplan'); switchLandingSiteplan(...)`) for seamless navigation.
  - **Elevated Photography Dimensions (styles.css)**:
    - Increased image container height (`.cluster-card-img-wrap`) from 85px to 120px (mobile) / 135px (desktop), giving priority to visual architectural rendering.
    - Refined badge styling and unified `.btn-cluster-explore` with forest green gradient.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #72: Minimalist Header & Segmented Toggle for Gold vs Diamond Specs
- **Context & Objective**: Declutter the architectural type comparison section in Surat Cinta tab, removing wordy subtitles and aligning the pill buttons into an elegant segmented toggle.
- **Key Changes Implemented**:
  - **Header Decluttering (index.html)**:
    - Removed redundant `.section-tag` and long `.section-desc`.
    - Simplified title to clean, centered "Tipe Gold & Diamond" (`text-align: center; margin: 0;`).
  - **Segmented Control Toggle (styles.css)**:
    - Refactored `.spec-toggle-bar` into a unified segmented control capsule with subtle border (`1px solid #e8e2d5`), neutral background (`#fbfaf7`), and 4px padding.
    - Elevated active button (`.spec-tab-btn.is-active`) with forest green gradient (`#11332a` to `#1e4d40`), crisp white text, and subtle elevation shadow.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #73: Visual Photographic Enrichment & Streamlined Price Matrix
- **Context & Objective**: Transform the text-heavy and dull price list cards in Surat Cinta tab into engaging visual product cards with architectural photography banners, decluttered titles, and prominent unit selection actions.
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Removed redundant tag and description, keeping only the clean centered title "Pilihan Unit & Skema Pembayaran".
  - **Photographic Banner Integration (app.js)**:
    - In `renderPriceMatrix()`, added `.price-card-banner` with authentic architectural photo thumbnails matching each cluster (Nagoya, Tokyo, Osaka).
    - Added dark gradient overlay with bold serif unit ID, clean dimension specs, and floating "Pilih Unit" primary action pill.
  - **Modern Card Grid Styling (styles.css)**:
    - Elevated `.price-unit-card` with 12px radius, smooth hover lift (-2px), 95px banner image with 1.04x zoom hover, and 2-column pricing tiles (Cash Keras, Cash Tempo 12/24 Bulan, KPR Bank).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-22] Progress #45: Redesign & Elevate Payment Calculator (`#suratPaymentCalculator`)
- **Context & Objective**: Upgrade layout, color palette, and typography of `<div class="surat-calc-container" id="suratPaymentCalculator">` on the Surat Cinta tab to align with the Japandi Modern luxury brand system.
- **Key Changes Implemented**:
  - **Semantic Layout & Structure (index.html, styles.css)**:
    - Restructured `.surat-calc-container` into a responsive 2-column grid on desktop (`min-width: 992px`) and stacked 1-column on mobile.
    - Positioned Parameter Card (`.surat-calc-params-card`) and Additional Costs Card (`.surat-calc-fees-card`) in Column 1.
    - Positioned Live Result Card (`.surat-calc-result-card`) and 4-Scheme Comparison Matrix (`.surat-calc-compare-card`) in Column 2.
  - **Japandi Modern Luxury Color Palette (styles.css)**:
    - Base cards: `#ffffff` & `#fbfaf7` with subtle warm borders `#e8e2d5` and smooth elevation shadows.
    - Primary accent: Deep Forest Green (`#11332a` / `#194639`) for buttons, active pills, and result hero banner.
    - Luxury accents: Warm Gold (`#dfb96d` / `#b39255`) for highlight callouts, active comparison borders, and badges.
  - **Typography & Font Hierarchy (styles.css)**:
    - Applied `var(--font-serif)` to card headings, primary calculation figure (`.calc-hero-amount`), breakdown totals, and comparison monthly instalments.
    - Applied `var(--font-sans)` to inputs, form labels, pills, and descriptions with proper uppercase kickers and tracking.
  - **Form & Interactive Controls (styles.css)**:
    - Custom-styled `.calc-select` dropdown with bespoke chevron icon.
    - Styled stage pills (`.calc-tab-pill`) and scheme buttons (`.calc-scheme-btn`) ensuring minimum 44px–56px touch targets.
    - Styled KPR slider controls with `#11332a` accent and fixed visibility toggle (`.calc-kpr-controls.is-hidden { display: none !important; }`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #61: Redundant Unit Page Quick-Links Strip Removal
- **Context & Objective**: Remove duplicate navigation cards and horizontal quick-link bar (`.unit-page-quick-links` and `.unit-page-nav-bar`) from the Unit catalog page (`#panelUnit`), ensuring strict adherence to Rule 5 (single-source Mobile Bottom Navigation Bar) and a clean uncluttered presentation.
- **Key Changes Implemented**:
  - **Structure Simplification (index.html)**:
    - Removed redundant `.unit-page-nav-bar` ("Avenue Grand Gate · Sukoharjo", Sales Login) and `.unit-page-quick-links` ("THEPARKTOWNHOUSE", Beranda, Keunggulan, Unit, Fasilitas, Lokasi, Kalkulator, Hubungi Kami).
    - `#panelUnit` now initiates directly with `.unit-hero-header-card` ("Katalog Hunian · Pilihan Unit per Cluster").
  - **Stylesheet Optimization (styles.css)**:
    - Purged 105 lines of obsolete CSS rules (`.unit-page-nav-bar`, `.unit-nav-loc`, `.unit-nav-dot`, `.unit-nav-right`, `.unit-lang-pill`, `.unit-sales-login-link`, `.unit-page-quick-links`, `.unit-brand-logo-btn`, `.unit-quick-links-list`, `.unit-quick-link`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #62: Compact Unit Header Navbar with Clean Cluster Navigation
- **Context & Objective**: Refactor the large Unit hero card into a sleek, concise navbar header (`.unit-header-navbar`) with simplified copy and quick cluster navigation chips (Nagoya, Tokyo, Osaka).
- **Key Changes Implemented**:
  - **Navbar Layout & Simplified Copy (index.html)**:
    - Replaced heavy hero text with concise header: `Katalog Hunian` (gold tag), `Pilihan Unit` (title), and `30 Unit · Japandi Modern` (subtitle).
    - Added clean cluster jump pills (`Nagoya`, `Tokyo`, `Osaka`) that smoothly scroll directly to each cluster block on tap.
  - **Japandi Aesthetic & Mobile Styling (styles.css)**:
    - Styled `.unit-header-navbar` with deep forest green gradient (`#11332a` to `#1e4d40`), 12px rounded borders, and subtle shadow.
    - Added `.unit-nav-chip` buttons with 32px height, soft translucent background, and gold accent active states matching design system tokens.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #63: Collapsible Drawer & Horizontal Swipe Chips for Unit Filter
- **Context & Objective**: Compact the tall, multi-row Unit catalog filter card into an expandable drawer with a filter icon toggle trigger and horizontal swipeable chip scrollers.
- **Key Changes Implemented**:
  - **Collapsible Filter Drawer (index.html, styles.css, app.js)**:
    - Created `.unit-filter-toggle-btn` with funnel filter icon, live summary of active filters, active filter count badge, and animated chevron indicator.
    - Wrapped filter options in `#filterControlsWrapper`, defaulting to collapsed state to eliminate vertical clutter.
    - Added `toggleUnitFilterCard()` and `updateUnitFilterSummary()` in `app.js` to handle opening/closing and live status badge updates.
  - **Horizontal Swipeable Chip Scrollers (index.html & styles.css)**:
    - Converted wrapped multi-line chips into single-row horizontal swipe scrollers (`.filter-chips-scroller`) for Tipe Unit, Luas Tanah, Range Harga, and Posisi Kavling.
    - Added `geser ↔` hint, smooth scrolling, and touch inertia (`-webkit-overflow-scrolling: touch`) with 32px min-height tap targets conforming to Rule 5.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #64: Responsive 2-to-3 Column Layout for Unit Product Cards
- **Context & Objective**: Compact the oversized unit product cards in the catalog (`.unit-inventory-grid`) into a refined 2-column layout on mobile and 3-column layout on tablet/desktop, preventing bulky single-column stretching.
- **Key Changes Implemented**:
  - **Multi-Column Grid Architecture (styles.css)**:
    - Replaced loose `repeat(auto-fill, minmax(180px, 1fr))` with strict `grid-template-columns: repeat(2, 1fr)` on mobile (< 640px) and `repeat(3, 1fr)` on wider screens (>= 640px).
    - Reduced inter-card spacing to 8px on mobile and 12px on desktop.
  - **Compact Visual Dimensions & Typography (styles.css)**:
    - Compacted `.uic-media` height to 90px (mobile) / 105px (desktop) with 1.04x subtle zoom hover.
    - Streamlined body padding to 8px and tuned font sizes (`.uic-id`: 12.5px, `.uic-price-val`: 11.5px bold forest green, `.uic-specs`: 9.5px).
    - Compacted primary action button (`.uic-action-btn`) to 30px height with crisp 10.5px text and 4px gap.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #65: Clean Button Copy Simplification (Remove Arrow from "Pesan Kavling Ini")
- **Context & Objective**: Remove trailing arrow symbols (`→`) from the unit order CTA buttons, leaving clean and centered "Pesan Kavling Ini" copy across catalog cards and site plan inspector cards.
- **Key Changes Implemented**:
  - **Product Card Action Button (app.js)**:
    - In `renderLandingUnits()`, removed `<span>→</span>` from `.uic-action-btn`, displaying clean `<span>Pesan Kavling Ini</span>`.
  - **Site Plan Inspector Buttons (index.html)**:
    - Removed `<span>→</span>` from `.btn-order-kavling-champagne` in both Beranda (`#berandaLotInspector`) and Site Plan page (`#pageLotInspector`), standardizing text to `<span>Pesan Kavling Ini</span>`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #66: Comprehensive Arrow Symbol Removal Across All Pages
- **Context & Objective**: Remove all trailing and inline arrow symbols (`→`, `←`, `&rarr;`, `&larr;`) from buttons, links, and cards across all pages and modals for a cleaner, unified typography.
- **Key Changes Implemented**:
  - **HTML Buttons & Links Cleaned (index.html)**:
    - Removed all 44 occurrences of `<span>→</span>` from primary CTAs (CTA cards, tour buttons, showcase buttons, quiz items, facilities cards, Super App action buttons, and footer links).
    - Removed trailing arrows from Super App action triggers (`Unlock`, `Generate QR`, `Pesan Slot`, `Bayar`, `Buat Laporan`, `Kirim SOS`).
    - Cleaned `.back-arrow` symbols from subpage headers.
  - **JavaScript Dynamic Templates Cleaned (app.js)**:
    - Cleaned `<span>→</span>` from modal CTAs (WhatsApp modal, tour finish modal, booking modal, 99 keunggulan explorer).
    - Removed `→` and `←` from theme switcher navigation buttons (`Tema Sebelumnya` and `Tema Berikutnya`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #67: Dedicated Interactive Unit Product Detail Page Integration
- **Context & Objective**: Enable clickable product cards in the Unit catalog that open a dedicated, harmonized Product Detail subpage (`#unitDetailView`) for every individual unit (all 30 units across Nagoya, Tokyo, and Osaka).
- **Key Changes Implemented**:
  - **Dedicated Unit Detail View Architecture (index.html)**:
    - Built `#unitDetailView` inside `#panelUnit` with back navigation bar (`Katalog Unit`), dynamic cluster tag, lot ID title, and quick order action.
    - Hero gallery featuring 220px/280px architectural photography, status badge (Tersedia/Terjual), Japandi type subtitle, price summary strip, and estimated monthly installment.
    - 4 architecture metric cards (Kamar Tidur, Kamar Mandi, Luas Bangunan, Luas Tanah).
    - Living character & specifications section with 4 bespoke Japandi comfort highlights (Cross Ventilation, Carport Teduh, One-Gate 24h, Legalitas SHM).
    - Flexible payment schemes card (Cash Keras, Cash Bertahap 0%, KPR Express).
    - Fixed bottom floating action bar with live price, direct WhatsApp inquiry, and "Pesan Kavling Ini" primary CTA button.
  - **Interactive View Management & Dynamic Data Binding (app.js)**:
    - Upgraded `.unit-inventory-card` with `onclick="openUnitDetail('${clusterKey}', '${u.id}')"` while preserving `event.stopPropagation()` on the direct order button.
    - Implemented `openUnitDetail(clusterKey, unitId)` populating photos, titles, prices, specs, and status dynamically for all 30 units.
    - Implemented `closeUnitDetail()` returning cleanly to `#unitCatalogHub`.
    - Implemented `orderCurrentDetailUnit()` hooking into the global booking modal.
  - **Design System Harmonization (styles.css)**:
    - Applied forest green luxury palette (`#11332a` to `#1e4d40`), champagne gold accents (`#dfb96d`), 12px/14px rounded cards, and proper mobile bottom bar clearances.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #68: Remove Lighting Mood Switcher Pill Bar from Header
- **Context & Objective**: Remove the "Siang / Senja / Malam" lighting mood switcher element (`#landingLightingSwitch`) from the global sticky header (`.landing-navbar`) to keep the top bar clean and uncluttered.
- **Key Changes Implemented**:
  - **Header Cleanup (index.html)**:
    - Removed `#landingLightingSwitch` and its 3 mood buttons (`#moodDayBtn`, `#moodDuskBtn`, `#moodNightBtn`) from `.landing-nav-actions`.
    - Cleaned up top header, retaining only the brand logo and bookmark saved configuration button.
  - **Stylesheet Optimization (styles.css)**:
    - Removed `.landing-lighting-switch` and `.lighting-pill-btn` CSS styling rules.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #69: Simplify 11 Themes Header to Centered Title
- **Context & Objective**: Clean up the section header above the 11 theme chips in Surat Cinta tab (`#section99Keunggulan`), removing the tag (`99 KEUNGGULAN · SUKOHARJO`) and subtitle description, keeping only the centered title "Telusuri 11 Tema Keunggulan".
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Stripped `.section-tag` and `.section-desc`.
    - Centered `.section-title` ("Telusuri 11 Tema Keunggulan") using `text-align: center; margin: 0;`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #70: Refined Luxury Card Redesign for 'Surat Resmi Dari Pengembang' Banner
- **Context & Objective**: Elevate the visual appeal and layout structure of `.surat-compact-banner` in Surat Cinta tab, crafting an authentic luxury aesthetic with gold accents, deep forest tones, and champagne button contrast.
- **Key Changes Implemented**:
  - **Enhanced Layout & Card Hierarchy (index.html)**:
    - Grouped title and subtitle into `.surat-banner-body` for consistent text flow.
    - Wrapped CTA button in `.surat-banner-action-wrap` with improved padding and breathing room.
  - **Japandi Luxury Styling & Accents (styles.css)**:
    - Applied multi-stop deep forest gradient (`#11332a` to `#0d261f` to `#173d32`) with gold border accent (`rgba(223, 185, 109, 0.45)`) and subtle radial ambient glow (`::before`).
    - Elevated wax seal badge (`.surat-wax-badge-mini`) with champagne border and refined letter-spacing.
    - Redesigned `.btn-open-surat-modal` with warm champagne gold gradient (`linear-gradient(135deg, #dfb96d 0%, #c59b48 100%)`), deep forest typography, and smooth hover micro-interaction.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #71: Streamlined Visual-First Cluster Cards (Nagoya, Osaka, Tokyo)
- **Context & Objective**: Clean up and declutter the 3 cluster triptych cards in Surat Cinta tab, removing long paragraph descriptions, emphasizing architectural product imagery, and removing the trailing arrow from "Peta Kawasan".
- **Key Changes Implemented**:
  - **Visual-First Layout & Decluttering (index.html)**:
    - Removed long paragraph descriptions (`.cluster-card-desc`) across Nagoya, Osaka, and Tokyo cards.
    - Simplified footer to streamlined location tag (`stat-loc`) and compact action button without arrows.
    - Made the entire card surface clickable (`onclick="switchLandingTab('siteplan'); switchLandingSiteplan(...)`) for seamless navigation.
  - **Elevated Photography Dimensions (styles.css)**:
    - Increased image container height (`.cluster-card-img-wrap`) from 85px to 120px (mobile) / 135px (desktop), giving priority to visual architectural rendering.
    - Refined badge styling and unified `.btn-cluster-explore` with forest green gradient.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #72: Minimalist Header & Segmented Toggle for Gold vs Diamond Specs
- **Context & Objective**: Declutter the architectural type comparison section in Surat Cinta tab, removing wordy subtitles and aligning the pill buttons into an elegant segmented toggle.
- **Key Changes Implemented**:
  - **Header Decluttering (index.html)**:
    - Removed redundant `.section-tag` and long `.section-desc`.
    - Simplified title to clean, centered "Tipe Gold & Diamond" (`text-align: center; margin: 0;`).
  - **Segmented Control Toggle (styles.css)**:
    - Refactored `.spec-toggle-bar` into a unified segmented control capsule with subtle border (`1px solid #e8e2d5`), neutral background (`#fbfaf7`), and 4px padding.
    - Elevated active button (`.spec-tab-btn.is-active`) with forest green gradient (`#11332a` to `#1e4d40`), crisp white text, and subtle elevation shadow.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #73: Visual Photographic Enrichment & Streamlined Price Matrix
- **Context & Objective**: Transform the text-heavy and dull price list cards in Surat Cinta tab into engaging visual product cards with architectural photography banners, decluttered titles, and prominent unit selection actions.
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Removed redundant tag and description, keeping only the clean centered title "Pilihan Unit & Skema Pembayaran".
  - **Photographic Banner Integration (app.js)**:
    - In `renderPriceMatrix()`, added `.price-card-banner` with authentic architectural photo thumbnails matching each cluster (Nagoya, Tokyo, Osaka).
    - Added dark gradient overlay with bold serif unit ID, clean dimension specs, and floating "Pilih Unit" primary action pill.
  - **Modern Card Grid Styling (styles.css)**:
    - Elevated `.price-unit-card` with 12px radius, smooth hover lift (-2px), 95px banner image with 1.04x zoom hover, and 2-column pricing tiles (Cash Keras, Cash Tempo 12/24 Bulan, KPR Bank).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-22] Progress #46: Remove Video Floating Action Buttons (Mute & Next Scene)
- **Context & Objective**: Remove the floating playback controls (circular mute toggle and next video scene arrow) from the top video banner as requested by the user.
- **Key Changes Implemented**:
  - **Markup (index.html)**:
    - Removed `.top-video-floating-actions` containing `#btnTopVideoMute` and the next-video advance button from `#berandaTopVideoBanner`.
  - **Styles (styles.css)**:
    - Deleted CSS rules for `.top-video-floating-actions` and `.btn-top-video-action`.
  - **Script (app.js)**:
    - Removed unused `toggleTopHeroVideoMute()` and `toggleTopHeroVideoPlay()` helper functions while preserving automated auto-advance on video end.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #61: Redundant Unit Page Quick-Links Strip Removal
- **Context & Objective**: Remove duplicate navigation cards and horizontal quick-link bar (`.unit-page-quick-links` and `.unit-page-nav-bar`) from the Unit catalog page (`#panelUnit`), ensuring strict adherence to Rule 5 (single-source Mobile Bottom Navigation Bar) and a clean uncluttered presentation.
- **Key Changes Implemented**:
  - **Structure Simplification (index.html)**:
    - Removed redundant `.unit-page-nav-bar` ("Avenue Grand Gate · Sukoharjo", Sales Login) and `.unit-page-quick-links` ("THEPARKTOWNHOUSE", Beranda, Keunggulan, Unit, Fasilitas, Lokasi, Kalkulator, Hubungi Kami).
    - `#panelUnit` now initiates directly with `.unit-hero-header-card` ("Katalog Hunian · Pilihan Unit per Cluster").
  - **Stylesheet Optimization (styles.css)**:
    - Purged 105 lines of obsolete CSS rules (`.unit-page-nav-bar`, `.unit-nav-loc`, `.unit-nav-dot`, `.unit-nav-right`, `.unit-lang-pill`, `.unit-sales-login-link`, `.unit-page-quick-links`, `.unit-brand-logo-btn`, `.unit-quick-links-list`, `.unit-quick-link`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #62: Compact Unit Header Navbar with Clean Cluster Navigation
- **Context & Objective**: Refactor the large Unit hero card into a sleek, concise navbar header (`.unit-header-navbar`) with simplified copy and quick cluster navigation chips (Nagoya, Tokyo, Osaka).
- **Key Changes Implemented**:
  - **Navbar Layout & Simplified Copy (index.html)**:
    - Replaced heavy hero text with concise header: `Katalog Hunian` (gold tag), `Pilihan Unit` (title), and `30 Unit · Japandi Modern` (subtitle).
    - Added clean cluster jump pills (`Nagoya`, `Tokyo`, `Osaka`) that smoothly scroll directly to each cluster block on tap.
  - **Japandi Aesthetic & Mobile Styling (styles.css)**:
    - Styled `.unit-header-navbar` with deep forest green gradient (`#11332a` to `#1e4d40`), 12px rounded borders, and subtle shadow.
    - Added `.unit-nav-chip` buttons with 32px height, soft translucent background, and gold accent active states matching design system tokens.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #63: Collapsible Drawer & Horizontal Swipe Chips for Unit Filter
- **Context & Objective**: Compact the tall, multi-row Unit catalog filter card into an expandable drawer with a filter icon toggle trigger and horizontal swipeable chip scrollers.
- **Key Changes Implemented**:
  - **Collapsible Filter Drawer (index.html, styles.css, app.js)**:
    - Created `.unit-filter-toggle-btn` with funnel filter icon, live summary of active filters, active filter count badge, and animated chevron indicator.
    - Wrapped filter options in `#filterControlsWrapper`, defaulting to collapsed state to eliminate vertical clutter.
    - Added `toggleUnitFilterCard()` and `updateUnitFilterSummary()` in `app.js` to handle opening/closing and live status badge updates.
  - **Horizontal Swipeable Chip Scrollers (index.html & styles.css)**:
    - Converted wrapped multi-line chips into single-row horizontal swipe scrollers (`.filter-chips-scroller`) for Tipe Unit, Luas Tanah, Range Harga, and Posisi Kavling.
    - Added `geser ↔` hint, smooth scrolling, and touch inertia (`-webkit-overflow-scrolling: touch`) with 32px min-height tap targets conforming to Rule 5.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #64: Responsive 2-to-3 Column Layout for Unit Product Cards
- **Context & Objective**: Compact the oversized unit product cards in the catalog (`.unit-inventory-grid`) into a refined 2-column layout on mobile and 3-column layout on tablet/desktop, preventing bulky single-column stretching.
- **Key Changes Implemented**:
  - **Multi-Column Grid Architecture (styles.css)**:
    - Replaced loose `repeat(auto-fill, minmax(180px, 1fr))` with strict `grid-template-columns: repeat(2, 1fr)` on mobile (< 640px) and `repeat(3, 1fr)` on wider screens (>= 640px).
    - Reduced inter-card spacing to 8px on mobile and 12px on desktop.
  - **Compact Visual Dimensions & Typography (styles.css)**:
    - Compacted `.uic-media` height to 90px (mobile) / 105px (desktop) with 1.04x subtle zoom hover.
    - Streamlined body padding to 8px and tuned font sizes (`.uic-id`: 12.5px, `.uic-price-val`: 11.5px bold forest green, `.uic-specs`: 9.5px).
    - Compacted primary action button (`.uic-action-btn`) to 30px height with crisp 10.5px text and 4px gap.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #65: Clean Button Copy Simplification (Remove Arrow from "Pesan Kavling Ini")
- **Context & Objective**: Remove trailing arrow symbols (`→`) from the unit order CTA buttons, leaving clean and centered "Pesan Kavling Ini" copy across catalog cards and site plan inspector cards.
- **Key Changes Implemented**:
  - **Product Card Action Button (app.js)**:
    - In `renderLandingUnits()`, removed `<span>→</span>` from `.uic-action-btn`, displaying clean `<span>Pesan Kavling Ini</span>`.
  - **Site Plan Inspector Buttons (index.html)**:
    - Removed `<span>→</span>` from `.btn-order-kavling-champagne` in both Beranda (`#berandaLotInspector`) and Site Plan page (`#pageLotInspector`), standardizing text to `<span>Pesan Kavling Ini</span>`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #66: Comprehensive Arrow Symbol Removal Across All Pages
- **Context & Objective**: Remove all trailing and inline arrow symbols (`→`, `←`, `&rarr;`, `&larr;`) from buttons, links, and cards across all pages and modals for a cleaner, unified typography.
- **Key Changes Implemented**:
  - **HTML Buttons & Links Cleaned (index.html)**:
    - Removed all 44 occurrences of `<span>→</span>` from primary CTAs (CTA cards, tour buttons, showcase buttons, quiz items, facilities cards, Super App action buttons, and footer links).
    - Removed trailing arrows from Super App action triggers (`Unlock`, `Generate QR`, `Pesan Slot`, `Bayar`, `Buat Laporan`, `Kirim SOS`).
    - Cleaned `.back-arrow` symbols from subpage headers.
  - **JavaScript Dynamic Templates Cleaned (app.js)**:
    - Cleaned `<span>→</span>` from modal CTAs (WhatsApp modal, tour finish modal, booking modal, 99 keunggulan explorer).
    - Removed `→` and `←` from theme switcher navigation buttons (`Tema Sebelumnya` and `Tema Berikutnya`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #67: Dedicated Interactive Unit Product Detail Page Integration
- **Context & Objective**: Enable clickable product cards in the Unit catalog that open a dedicated, harmonized Product Detail subpage (`#unitDetailView`) for every individual unit (all 30 units across Nagoya, Tokyo, and Osaka).
- **Key Changes Implemented**:
  - **Dedicated Unit Detail View Architecture (index.html)**:
    - Built `#unitDetailView` inside `#panelUnit` with back navigation bar (`Katalog Unit`), dynamic cluster tag, lot ID title, and quick order action.
    - Hero gallery featuring 220px/280px architectural photography, status badge (Tersedia/Terjual), Japandi type subtitle, price summary strip, and estimated monthly installment.
    - 4 architecture metric cards (Kamar Tidur, Kamar Mandi, Luas Bangunan, Luas Tanah).
    - Living character & specifications section with 4 bespoke Japandi comfort highlights (Cross Ventilation, Carport Teduh, One-Gate 24h, Legalitas SHM).
    - Flexible payment schemes card (Cash Keras, Cash Bertahap 0%, KPR Express).
    - Fixed bottom floating action bar with live price, direct WhatsApp inquiry, and "Pesan Kavling Ini" primary CTA button.
  - **Interactive View Management & Dynamic Data Binding (app.js)**:
    - Upgraded `.unit-inventory-card` with `onclick="openUnitDetail('${clusterKey}', '${u.id}')"` while preserving `event.stopPropagation()` on the direct order button.
    - Implemented `openUnitDetail(clusterKey, unitId)` populating photos, titles, prices, specs, and status dynamically for all 30 units.
    - Implemented `closeUnitDetail()` returning cleanly to `#unitCatalogHub`.
    - Implemented `orderCurrentDetailUnit()` hooking into the global booking modal.
  - **Design System Harmonization (styles.css)**:
    - Applied forest green luxury palette (`#11332a` to `#1e4d40`), champagne gold accents (`#dfb96d`), 12px/14px rounded cards, and proper mobile bottom bar clearances.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #68: Remove Lighting Mood Switcher Pill Bar from Header
- **Context & Objective**: Remove the "Siang / Senja / Malam" lighting mood switcher element (`#landingLightingSwitch`) from the global sticky header (`.landing-navbar`) to keep the top bar clean and uncluttered.
- **Key Changes Implemented**:
  - **Header Cleanup (index.html)**:
    - Removed `#landingLightingSwitch` and its 3 mood buttons (`#moodDayBtn`, `#moodDuskBtn`, `#moodNightBtn`) from `.landing-nav-actions`.
    - Cleaned up top header, retaining only the brand logo and bookmark saved configuration button.
  - **Stylesheet Optimization (styles.css)**:
    - Removed `.landing-lighting-switch` and `.lighting-pill-btn` CSS styling rules.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #69: Simplify 11 Themes Header to Centered Title
- **Context & Objective**: Clean up the section header above the 11 theme chips in Surat Cinta tab (`#section99Keunggulan`), removing the tag (`99 KEUNGGULAN · SUKOHARJO`) and subtitle description, keeping only the centered title "Telusuri 11 Tema Keunggulan".
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Stripped `.section-tag` and `.section-desc`.
    - Centered `.section-title` ("Telusuri 11 Tema Keunggulan") using `text-align: center; margin: 0;`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #70: Refined Luxury Card Redesign for 'Surat Resmi Dari Pengembang' Banner
- **Context & Objective**: Elevate the visual appeal and layout structure of `.surat-compact-banner` in Surat Cinta tab, crafting an authentic luxury aesthetic with gold accents, deep forest tones, and champagne button contrast.
- **Key Changes Implemented**:
  - **Enhanced Layout & Card Hierarchy (index.html)**:
    - Grouped title and subtitle into `.surat-banner-body` for consistent text flow.
    - Wrapped CTA button in `.surat-banner-action-wrap` with improved padding and breathing room.
  - **Japandi Luxury Styling & Accents (styles.css)**:
    - Applied multi-stop deep forest gradient (`#11332a` to `#0d261f` to `#173d32`) with gold border accent (`rgba(223, 185, 109, 0.45)`) and subtle radial ambient glow (`::before`).
    - Elevated wax seal badge (`.surat-wax-badge-mini`) with champagne border and refined letter-spacing.
    - Redesigned `.btn-open-surat-modal` with warm champagne gold gradient (`linear-gradient(135deg, #dfb96d 0%, #c59b48 100%)`), deep forest typography, and smooth hover micro-interaction.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #71: Streamlined Visual-First Cluster Cards (Nagoya, Osaka, Tokyo)
- **Context & Objective**: Clean up and declutter the 3 cluster triptych cards in Surat Cinta tab, removing long paragraph descriptions, emphasizing architectural product imagery, and removing the trailing arrow from "Peta Kawasan".
- **Key Changes Implemented**:
  - **Visual-First Layout & Decluttering (index.html)**:
    - Removed long paragraph descriptions (`.cluster-card-desc`) across Nagoya, Osaka, and Tokyo cards.
    - Simplified footer to streamlined location tag (`stat-loc`) and compact action button without arrows.
    - Made the entire card surface clickable (`onclick="switchLandingTab('siteplan'); switchLandingSiteplan(...)`) for seamless navigation.
  - **Elevated Photography Dimensions (styles.css)**:
    - Increased image container height (`.cluster-card-img-wrap`) from 85px to 120px (mobile) / 135px (desktop), giving priority to visual architectural rendering.
    - Refined badge styling and unified `.btn-cluster-explore` with forest green gradient.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #72: Minimalist Header & Segmented Toggle for Gold vs Diamond Specs
- **Context & Objective**: Declutter the architectural type comparison section in Surat Cinta tab, removing wordy subtitles and aligning the pill buttons into an elegant segmented toggle.
- **Key Changes Implemented**:
  - **Header Decluttering (index.html)**:
    - Removed redundant `.section-tag` and long `.section-desc`.
    - Simplified title to clean, centered "Tipe Gold & Diamond" (`text-align: center; margin: 0;`).
  - **Segmented Control Toggle (styles.css)**:
    - Refactored `.spec-toggle-bar` into a unified segmented control capsule with subtle border (`1px solid #e8e2d5`), neutral background (`#fbfaf7`), and 4px padding.
    - Elevated active button (`.spec-tab-btn.is-active`) with forest green gradient (`#11332a` to `#1e4d40`), crisp white text, and subtle elevation shadow.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #73: Visual Photographic Enrichment & Streamlined Price Matrix
- **Context & Objective**: Transform the text-heavy and dull price list cards in Surat Cinta tab into engaging visual product cards with architectural photography banners, decluttered titles, and prominent unit selection actions.
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Removed redundant tag and description, keeping only the clean centered title "Pilihan Unit & Skema Pembayaran".
  - **Photographic Banner Integration (app.js)**:
    - In `renderPriceMatrix()`, added `.price-card-banner` with authentic architectural photo thumbnails matching each cluster (Nagoya, Tokyo, Osaka).
    - Added dark gradient overlay with bold serif unit ID, clean dimension specs, and floating "Pilih Unit" primary action pill.
  - **Modern Card Grid Styling (styles.css)**:
    - Elevated `.price-unit-card` with 12px radius, smooth hover lift (-2px), 95px banner image with 1.04x zoom hover, and 2-column pricing tiles (Cash Keras, Cash Tempo 12/24 Bulan, KPR Bank).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-22] Progress #47: Seamless Full-Bleed Video Banner & Flush Running Marquee
- **Context & Objective**: Remove horizontal side margins for the top video and marquee frames, and eliminate vertical gap between the video and the running marquee ticker.
- **Key Changes Implemented**:
  - **Structure & Layout (index.html, styles.css)**:
    - Wrapped `.beranda-top-video-banner` and `.marquee-ticker-bar` inside `.beranda-top-hero-unit`.
    - Applied negative margins (`margin-left: -14px; margin-right: -14px; width: calc(100% + 28px);`) to span edge-to-edge with zero side margins.
    - Set `margin-top: -12px;` so video sits flush at the very top of `.landing-content-scroll`.
    - Set `gap: 0;` and removed border-radius on both video and marquee for a flush, seamless joint with zero gap.
    - Updated `.top-video-info-bar` right constraint to `14px` for balanced caption padding now that floating controls are gone.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #61: Redundant Unit Page Quick-Links Strip Removal
- **Context & Objective**: Remove duplicate navigation cards and horizontal quick-link bar (`.unit-page-quick-links` and `.unit-page-nav-bar`) from the Unit catalog page (`#panelUnit`), ensuring strict adherence to Rule 5 (single-source Mobile Bottom Navigation Bar) and a clean uncluttered presentation.
- **Key Changes Implemented**:
  - **Structure Simplification (index.html)**:
    - Removed redundant `.unit-page-nav-bar` ("Avenue Grand Gate · Sukoharjo", Sales Login) and `.unit-page-quick-links` ("THEPARKTOWNHOUSE", Beranda, Keunggulan, Unit, Fasilitas, Lokasi, Kalkulator, Hubungi Kami).
    - `#panelUnit` now initiates directly with `.unit-hero-header-card` ("Katalog Hunian · Pilihan Unit per Cluster").
  - **Stylesheet Optimization (styles.css)**:
    - Purged 105 lines of obsolete CSS rules (`.unit-page-nav-bar`, `.unit-nav-loc`, `.unit-nav-dot`, `.unit-nav-right`, `.unit-lang-pill`, `.unit-sales-login-link`, `.unit-page-quick-links`, `.unit-brand-logo-btn`, `.unit-quick-links-list`, `.unit-quick-link`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #62: Compact Unit Header Navbar with Clean Cluster Navigation
- **Context & Objective**: Refactor the large Unit hero card into a sleek, concise navbar header (`.unit-header-navbar`) with simplified copy and quick cluster navigation chips (Nagoya, Tokyo, Osaka).
- **Key Changes Implemented**:
  - **Navbar Layout & Simplified Copy (index.html)**:
    - Replaced heavy hero text with concise header: `Katalog Hunian` (gold tag), `Pilihan Unit` (title), and `30 Unit · Japandi Modern` (subtitle).
    - Added clean cluster jump pills (`Nagoya`, `Tokyo`, `Osaka`) that smoothly scroll directly to each cluster block on tap.
  - **Japandi Aesthetic & Mobile Styling (styles.css)**:
    - Styled `.unit-header-navbar` with deep forest green gradient (`#11332a` to `#1e4d40`), 12px rounded borders, and subtle shadow.
    - Added `.unit-nav-chip` buttons with 32px height, soft translucent background, and gold accent active states matching design system tokens.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #63: Collapsible Drawer & Horizontal Swipe Chips for Unit Filter
- **Context & Objective**: Compact the tall, multi-row Unit catalog filter card into an expandable drawer with a filter icon toggle trigger and horizontal swipeable chip scrollers.
- **Key Changes Implemented**:
  - **Collapsible Filter Drawer (index.html, styles.css, app.js)**:
    - Created `.unit-filter-toggle-btn` with funnel filter icon, live summary of active filters, active filter count badge, and animated chevron indicator.
    - Wrapped filter options in `#filterControlsWrapper`, defaulting to collapsed state to eliminate vertical clutter.
    - Added `toggleUnitFilterCard()` and `updateUnitFilterSummary()` in `app.js` to handle opening/closing and live status badge updates.
  - **Horizontal Swipeable Chip Scrollers (index.html & styles.css)**:
    - Converted wrapped multi-line chips into single-row horizontal swipe scrollers (`.filter-chips-scroller`) for Tipe Unit, Luas Tanah, Range Harga, and Posisi Kavling.
    - Added `geser ↔` hint, smooth scrolling, and touch inertia (`-webkit-overflow-scrolling: touch`) with 32px min-height tap targets conforming to Rule 5.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #64: Responsive 2-to-3 Column Layout for Unit Product Cards
- **Context & Objective**: Compact the oversized unit product cards in the catalog (`.unit-inventory-grid`) into a refined 2-column layout on mobile and 3-column layout on tablet/desktop, preventing bulky single-column stretching.
- **Key Changes Implemented**:
  - **Multi-Column Grid Architecture (styles.css)**:
    - Replaced loose `repeat(auto-fill, minmax(180px, 1fr))` with strict `grid-template-columns: repeat(2, 1fr)` on mobile (< 640px) and `repeat(3, 1fr)` on wider screens (>= 640px).
    - Reduced inter-card spacing to 8px on mobile and 12px on desktop.
  - **Compact Visual Dimensions & Typography (styles.css)**:
    - Compacted `.uic-media` height to 90px (mobile) / 105px (desktop) with 1.04x subtle zoom hover.
    - Streamlined body padding to 8px and tuned font sizes (`.uic-id`: 12.5px, `.uic-price-val`: 11.5px bold forest green, `.uic-specs`: 9.5px).
    - Compacted primary action button (`.uic-action-btn`) to 30px height with crisp 10.5px text and 4px gap.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #65: Clean Button Copy Simplification (Remove Arrow from "Pesan Kavling Ini")
- **Context & Objective**: Remove trailing arrow symbols (`→`) from the unit order CTA buttons, leaving clean and centered "Pesan Kavling Ini" copy across catalog cards and site plan inspector cards.
- **Key Changes Implemented**:
  - **Product Card Action Button (app.js)**:
    - In `renderLandingUnits()`, removed `<span>→</span>` from `.uic-action-btn`, displaying clean `<span>Pesan Kavling Ini</span>`.
  - **Site Plan Inspector Buttons (index.html)**:
    - Removed `<span>→</span>` from `.btn-order-kavling-champagne` in both Beranda (`#berandaLotInspector`) and Site Plan page (`#pageLotInspector`), standardizing text to `<span>Pesan Kavling Ini</span>`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #66: Comprehensive Arrow Symbol Removal Across All Pages
- **Context & Objective**: Remove all trailing and inline arrow symbols (`→`, `←`, `&rarr;`, `&larr;`) from buttons, links, and cards across all pages and modals for a cleaner, unified typography.
- **Key Changes Implemented**:
  - **HTML Buttons & Links Cleaned (index.html)**:
    - Removed all 44 occurrences of `<span>→</span>` from primary CTAs (CTA cards, tour buttons, showcase buttons, quiz items, facilities cards, Super App action buttons, and footer links).
    - Removed trailing arrows from Super App action triggers (`Unlock`, `Generate QR`, `Pesan Slot`, `Bayar`, `Buat Laporan`, `Kirim SOS`).
    - Cleaned `.back-arrow` symbols from subpage headers.
  - **JavaScript Dynamic Templates Cleaned (app.js)**:
    - Cleaned `<span>→</span>` from modal CTAs (WhatsApp modal, tour finish modal, booking modal, 99 keunggulan explorer).
    - Removed `→` and `←` from theme switcher navigation buttons (`Tema Sebelumnya` and `Tema Berikutnya`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #67: Dedicated Interactive Unit Product Detail Page Integration
- **Context & Objective**: Enable clickable product cards in the Unit catalog that open a dedicated, harmonized Product Detail subpage (`#unitDetailView`) for every individual unit (all 30 units across Nagoya, Tokyo, and Osaka).
- **Key Changes Implemented**:
  - **Dedicated Unit Detail View Architecture (index.html)**:
    - Built `#unitDetailView` inside `#panelUnit` with back navigation bar (`Katalog Unit`), dynamic cluster tag, lot ID title, and quick order action.
    - Hero gallery featuring 220px/280px architectural photography, status badge (Tersedia/Terjual), Japandi type subtitle, price summary strip, and estimated monthly installment.
    - 4 architecture metric cards (Kamar Tidur, Kamar Mandi, Luas Bangunan, Luas Tanah).
    - Living character & specifications section with 4 bespoke Japandi comfort highlights (Cross Ventilation, Carport Teduh, One-Gate 24h, Legalitas SHM).
    - Flexible payment schemes card (Cash Keras, Cash Bertahap 0%, KPR Express).
    - Fixed bottom floating action bar with live price, direct WhatsApp inquiry, and "Pesan Kavling Ini" primary CTA button.
  - **Interactive View Management & Dynamic Data Binding (app.js)**:
    - Upgraded `.unit-inventory-card` with `onclick="openUnitDetail('${clusterKey}', '${u.id}')"` while preserving `event.stopPropagation()` on the direct order button.
    - Implemented `openUnitDetail(clusterKey, unitId)` populating photos, titles, prices, specs, and status dynamically for all 30 units.
    - Implemented `closeUnitDetail()` returning cleanly to `#unitCatalogHub`.
    - Implemented `orderCurrentDetailUnit()` hooking into the global booking modal.
  - **Design System Harmonization (styles.css)**:
    - Applied forest green luxury palette (`#11332a` to `#1e4d40`), champagne gold accents (`#dfb96d`), 12px/14px rounded cards, and proper mobile bottom bar clearances.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #68: Remove Lighting Mood Switcher Pill Bar from Header
- **Context & Objective**: Remove the "Siang / Senja / Malam" lighting mood switcher element (`#landingLightingSwitch`) from the global sticky header (`.landing-navbar`) to keep the top bar clean and uncluttered.
- **Key Changes Implemented**:
  - **Header Cleanup (index.html)**:
    - Removed `#landingLightingSwitch` and its 3 mood buttons (`#moodDayBtn`, `#moodDuskBtn`, `#moodNightBtn`) from `.landing-nav-actions`.
    - Cleaned up top header, retaining only the brand logo and bookmark saved configuration button.
  - **Stylesheet Optimization (styles.css)**:
    - Removed `.landing-lighting-switch` and `.lighting-pill-btn` CSS styling rules.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #69: Simplify 11 Themes Header to Centered Title
- **Context & Objective**: Clean up the section header above the 11 theme chips in Surat Cinta tab (`#section99Keunggulan`), removing the tag (`99 KEUNGGULAN · SUKOHARJO`) and subtitle description, keeping only the centered title "Telusuri 11 Tema Keunggulan".
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Stripped `.section-tag` and `.section-desc`.
    - Centered `.section-title` ("Telusuri 11 Tema Keunggulan") using `text-align: center; margin: 0;`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #70: Refined Luxury Card Redesign for 'Surat Resmi Dari Pengembang' Banner
- **Context & Objective**: Elevate the visual appeal and layout structure of `.surat-compact-banner` in Surat Cinta tab, crafting an authentic luxury aesthetic with gold accents, deep forest tones, and champagne button contrast.
- **Key Changes Implemented**:
  - **Enhanced Layout & Card Hierarchy (index.html)**:
    - Grouped title and subtitle into `.surat-banner-body` for consistent text flow.
    - Wrapped CTA button in `.surat-banner-action-wrap` with improved padding and breathing room.
  - **Japandi Luxury Styling & Accents (styles.css)**:
    - Applied multi-stop deep forest gradient (`#11332a` to `#0d261f` to `#173d32`) with gold border accent (`rgba(223, 185, 109, 0.45)`) and subtle radial ambient glow (`::before`).
    - Elevated wax seal badge (`.surat-wax-badge-mini`) with champagne border and refined letter-spacing.
    - Redesigned `.btn-open-surat-modal` with warm champagne gold gradient (`linear-gradient(135deg, #dfb96d 0%, #c59b48 100%)`), deep forest typography, and smooth hover micro-interaction.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #71: Streamlined Visual-First Cluster Cards (Nagoya, Osaka, Tokyo)
- **Context & Objective**: Clean up and declutter the 3 cluster triptych cards in Surat Cinta tab, removing long paragraph descriptions, emphasizing architectural product imagery, and removing the trailing arrow from "Peta Kawasan".
- **Key Changes Implemented**:
  - **Visual-First Layout & Decluttering (index.html)**:
    - Removed long paragraph descriptions (`.cluster-card-desc`) across Nagoya, Osaka, and Tokyo cards.
    - Simplified footer to streamlined location tag (`stat-loc`) and compact action button without arrows.
    - Made the entire card surface clickable (`onclick="switchLandingTab('siteplan'); switchLandingSiteplan(...)`) for seamless navigation.
  - **Elevated Photography Dimensions (styles.css)**:
    - Increased image container height (`.cluster-card-img-wrap`) from 85px to 120px (mobile) / 135px (desktop), giving priority to visual architectural rendering.
    - Refined badge styling and unified `.btn-cluster-explore` with forest green gradient.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #72: Minimalist Header & Segmented Toggle for Gold vs Diamond Specs
- **Context & Objective**: Declutter the architectural type comparison section in Surat Cinta tab, removing wordy subtitles and aligning the pill buttons into an elegant segmented toggle.
- **Key Changes Implemented**:
  - **Header Decluttering (index.html)**:
    - Removed redundant `.section-tag` and long `.section-desc`.
    - Simplified title to clean, centered "Tipe Gold & Diamond" (`text-align: center; margin: 0;`).
  - **Segmented Control Toggle (styles.css)**:
    - Refactored `.spec-toggle-bar` into a unified segmented control capsule with subtle border (`1px solid #e8e2d5`), neutral background (`#fbfaf7`), and 4px padding.
    - Elevated active button (`.spec-tab-btn.is-active`) with forest green gradient (`#11332a` to `#1e4d40`), crisp white text, and subtle elevation shadow.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #73: Visual Photographic Enrichment & Streamlined Price Matrix
- **Context & Objective**: Transform the text-heavy and dull price list cards in Surat Cinta tab into engaging visual product cards with architectural photography banners, decluttered titles, and prominent unit selection actions.
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Removed redundant tag and description, keeping only the clean centered title "Pilihan Unit & Skema Pembayaran".
  - **Photographic Banner Integration (app.js)**:
    - In `renderPriceMatrix()`, added `.price-card-banner` with authentic architectural photo thumbnails matching each cluster (Nagoya, Tokyo, Osaka).
    - Added dark gradient overlay with bold serif unit ID, clean dimension specs, and floating "Pilih Unit" primary action pill.
  - **Modern Card Grid Styling (styles.css)**:
    - Elevated `.price-unit-card` with 12px radius, smooth hover lift (-2px), 95px banner image with 1.04x zoom hover, and 2-column pricing tiles (Cash Keras, Cash Tempo 12/24 Bulan, KPR Bank).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-22] Progress #48: Remove Video Scene Badge & Pill Frame (`.top-video-badge`)
- **Context & Objective**: Remove the floating "Sinema 01..04" pill badge and its frame overlay from the video banner as requested by the user.
- **Key Changes Implemented**:
  - **Markup (index.html)**:
    - Removed `.top-video-badge` containing `.video-live-dot` and `#topVideoSceneBadge` from `.top-video-info-bar`.
  - **Styles (styles.css)**:
    - Deleted CSS rules for `.top-video-badge` and `.video-live-dot`.
  - **Script (app.js)**:
    - Removed `#topVideoSceneBadge` reference and update logic in `switchTopHeroVideo()`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #61: Redundant Unit Page Quick-Links Strip Removal
- **Context & Objective**: Remove duplicate navigation cards and horizontal quick-link bar (`.unit-page-quick-links` and `.unit-page-nav-bar`) from the Unit catalog page (`#panelUnit`), ensuring strict adherence to Rule 5 (single-source Mobile Bottom Navigation Bar) and a clean uncluttered presentation.
- **Key Changes Implemented**:
  - **Structure Simplification (index.html)**:
    - Removed redundant `.unit-page-nav-bar` ("Avenue Grand Gate · Sukoharjo", Sales Login) and `.unit-page-quick-links` ("THEPARKTOWNHOUSE", Beranda, Keunggulan, Unit, Fasilitas, Lokasi, Kalkulator, Hubungi Kami).
    - `#panelUnit` now initiates directly with `.unit-hero-header-card` ("Katalog Hunian · Pilihan Unit per Cluster").
  - **Stylesheet Optimization (styles.css)**:
    - Purged 105 lines of obsolete CSS rules (`.unit-page-nav-bar`, `.unit-nav-loc`, `.unit-nav-dot`, `.unit-nav-right`, `.unit-lang-pill`, `.unit-sales-login-link`, `.unit-page-quick-links`, `.unit-brand-logo-btn`, `.unit-quick-links-list`, `.unit-quick-link`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #62: Compact Unit Header Navbar with Clean Cluster Navigation
- **Context & Objective**: Refactor the large Unit hero card into a sleek, concise navbar header (`.unit-header-navbar`) with simplified copy and quick cluster navigation chips (Nagoya, Tokyo, Osaka).
- **Key Changes Implemented**:
  - **Navbar Layout & Simplified Copy (index.html)**:
    - Replaced heavy hero text with concise header: `Katalog Hunian` (gold tag), `Pilihan Unit` (title), and `30 Unit · Japandi Modern` (subtitle).
    - Added clean cluster jump pills (`Nagoya`, `Tokyo`, `Osaka`) that smoothly scroll directly to each cluster block on tap.
  - **Japandi Aesthetic & Mobile Styling (styles.css)**:
    - Styled `.unit-header-navbar` with deep forest green gradient (`#11332a` to `#1e4d40`), 12px rounded borders, and subtle shadow.
    - Added `.unit-nav-chip` buttons with 32px height, soft translucent background, and gold accent active states matching design system tokens.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #63: Collapsible Drawer & Horizontal Swipe Chips for Unit Filter
- **Context & Objective**: Compact the tall, multi-row Unit catalog filter card into an expandable drawer with a filter icon toggle trigger and horizontal swipeable chip scrollers.
- **Key Changes Implemented**:
  - **Collapsible Filter Drawer (index.html, styles.css, app.js)**:
    - Created `.unit-filter-toggle-btn` with funnel filter icon, live summary of active filters, active filter count badge, and animated chevron indicator.
    - Wrapped filter options in `#filterControlsWrapper`, defaulting to collapsed state to eliminate vertical clutter.
    - Added `toggleUnitFilterCard()` and `updateUnitFilterSummary()` in `app.js` to handle opening/closing and live status badge updates.
  - **Horizontal Swipeable Chip Scrollers (index.html & styles.css)**:
    - Converted wrapped multi-line chips into single-row horizontal swipe scrollers (`.filter-chips-scroller`) for Tipe Unit, Luas Tanah, Range Harga, and Posisi Kavling.
    - Added `geser ↔` hint, smooth scrolling, and touch inertia (`-webkit-overflow-scrolling: touch`) with 32px min-height tap targets conforming to Rule 5.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #64: Responsive 2-to-3 Column Layout for Unit Product Cards
- **Context & Objective**: Compact the oversized unit product cards in the catalog (`.unit-inventory-grid`) into a refined 2-column layout on mobile and 3-column layout on tablet/desktop, preventing bulky single-column stretching.
- **Key Changes Implemented**:
  - **Multi-Column Grid Architecture (styles.css)**:
    - Replaced loose `repeat(auto-fill, minmax(180px, 1fr))` with strict `grid-template-columns: repeat(2, 1fr)` on mobile (< 640px) and `repeat(3, 1fr)` on wider screens (>= 640px).
    - Reduced inter-card spacing to 8px on mobile and 12px on desktop.
  - **Compact Visual Dimensions & Typography (styles.css)**:
    - Compacted `.uic-media` height to 90px (mobile) / 105px (desktop) with 1.04x subtle zoom hover.
    - Streamlined body padding to 8px and tuned font sizes (`.uic-id`: 12.5px, `.uic-price-val`: 11.5px bold forest green, `.uic-specs`: 9.5px).
    - Compacted primary action button (`.uic-action-btn`) to 30px height with crisp 10.5px text and 4px gap.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #65: Clean Button Copy Simplification (Remove Arrow from "Pesan Kavling Ini")
- **Context & Objective**: Remove trailing arrow symbols (`→`) from the unit order CTA buttons, leaving clean and centered "Pesan Kavling Ini" copy across catalog cards and site plan inspector cards.
- **Key Changes Implemented**:
  - **Product Card Action Button (app.js)**:
    - In `renderLandingUnits()`, removed `<span>→</span>` from `.uic-action-btn`, displaying clean `<span>Pesan Kavling Ini</span>`.
  - **Site Plan Inspector Buttons (index.html)**:
    - Removed `<span>→</span>` from `.btn-order-kavling-champagne` in both Beranda (`#berandaLotInspector`) and Site Plan page (`#pageLotInspector`), standardizing text to `<span>Pesan Kavling Ini</span>`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #66: Comprehensive Arrow Symbol Removal Across All Pages
- **Context & Objective**: Remove all trailing and inline arrow symbols (`→`, `←`, `&rarr;`, `&larr;`) from buttons, links, and cards across all pages and modals for a cleaner, unified typography.
- **Key Changes Implemented**:
  - **HTML Buttons & Links Cleaned (index.html)**:
    - Removed all 44 occurrences of `<span>→</span>` from primary CTAs (CTA cards, tour buttons, showcase buttons, quiz items, facilities cards, Super App action buttons, and footer links).
    - Removed trailing arrows from Super App action triggers (`Unlock`, `Generate QR`, `Pesan Slot`, `Bayar`, `Buat Laporan`, `Kirim SOS`).
    - Cleaned `.back-arrow` symbols from subpage headers.
  - **JavaScript Dynamic Templates Cleaned (app.js)**:
    - Cleaned `<span>→</span>` from modal CTAs (WhatsApp modal, tour finish modal, booking modal, 99 keunggulan explorer).
    - Removed `→` and `←` from theme switcher navigation buttons (`Tema Sebelumnya` and `Tema Berikutnya`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #67: Dedicated Interactive Unit Product Detail Page Integration
- **Context & Objective**: Enable clickable product cards in the Unit catalog that open a dedicated, harmonized Product Detail subpage (`#unitDetailView`) for every individual unit (all 30 units across Nagoya, Tokyo, and Osaka).
- **Key Changes Implemented**:
  - **Dedicated Unit Detail View Architecture (index.html)**:
    - Built `#unitDetailView` inside `#panelUnit` with back navigation bar (`Katalog Unit`), dynamic cluster tag, lot ID title, and quick order action.
    - Hero gallery featuring 220px/280px architectural photography, status badge (Tersedia/Terjual), Japandi type subtitle, price summary strip, and estimated monthly installment.
    - 4 architecture metric cards (Kamar Tidur, Kamar Mandi, Luas Bangunan, Luas Tanah).
    - Living character & specifications section with 4 bespoke Japandi comfort highlights (Cross Ventilation, Carport Teduh, One-Gate 24h, Legalitas SHM).
    - Flexible payment schemes card (Cash Keras, Cash Bertahap 0%, KPR Express).
    - Fixed bottom floating action bar with live price, direct WhatsApp inquiry, and "Pesan Kavling Ini" primary CTA button.
  - **Interactive View Management & Dynamic Data Binding (app.js)**:
    - Upgraded `.unit-inventory-card` with `onclick="openUnitDetail('${clusterKey}', '${u.id}')"` while preserving `event.stopPropagation()` on the direct order button.
    - Implemented `openUnitDetail(clusterKey, unitId)` populating photos, titles, prices, specs, and status dynamically for all 30 units.
    - Implemented `closeUnitDetail()` returning cleanly to `#unitCatalogHub`.
    - Implemented `orderCurrentDetailUnit()` hooking into the global booking modal.
  - **Design System Harmonization (styles.css)**:
    - Applied forest green luxury palette (`#11332a` to `#1e4d40`), champagne gold accents (`#dfb96d`), 12px/14px rounded cards, and proper mobile bottom bar clearances.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #68: Remove Lighting Mood Switcher Pill Bar from Header
- **Context & Objective**: Remove the "Siang / Senja / Malam" lighting mood switcher element (`#landingLightingSwitch`) from the global sticky header (`.landing-navbar`) to keep the top bar clean and uncluttered.
- **Key Changes Implemented**:
  - **Header Cleanup (index.html)**:
    - Removed `#landingLightingSwitch` and its 3 mood buttons (`#moodDayBtn`, `#moodDuskBtn`, `#moodNightBtn`) from `.landing-nav-actions`.
    - Cleaned up top header, retaining only the brand logo and bookmark saved configuration button.
  - **Stylesheet Optimization (styles.css)**:
    - Removed `.landing-lighting-switch` and `.lighting-pill-btn` CSS styling rules.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #69: Simplify 11 Themes Header to Centered Title
- **Context & Objective**: Clean up the section header above the 11 theme chips in Surat Cinta tab (`#section99Keunggulan`), removing the tag (`99 KEUNGGULAN · SUKOHARJO`) and subtitle description, keeping only the centered title "Telusuri 11 Tema Keunggulan".
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Stripped `.section-tag` and `.section-desc`.
    - Centered `.section-title` ("Telusuri 11 Tema Keunggulan") using `text-align: center; margin: 0;`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #70: Refined Luxury Card Redesign for 'Surat Resmi Dari Pengembang' Banner
- **Context & Objective**: Elevate the visual appeal and layout structure of `.surat-compact-banner` in Surat Cinta tab, crafting an authentic luxury aesthetic with gold accents, deep forest tones, and champagne button contrast.
- **Key Changes Implemented**:
  - **Enhanced Layout & Card Hierarchy (index.html)**:
    - Grouped title and subtitle into `.surat-banner-body` for consistent text flow.
    - Wrapped CTA button in `.surat-banner-action-wrap` with improved padding and breathing room.
  - **Japandi Luxury Styling & Accents (styles.css)**:
    - Applied multi-stop deep forest gradient (`#11332a` to `#0d261f` to `#173d32`) with gold border accent (`rgba(223, 185, 109, 0.45)`) and subtle radial ambient glow (`::before`).
    - Elevated wax seal badge (`.surat-wax-badge-mini`) with champagne border and refined letter-spacing.
    - Redesigned `.btn-open-surat-modal` with warm champagne gold gradient (`linear-gradient(135deg, #dfb96d 0%, #c59b48 100%)`), deep forest typography, and smooth hover micro-interaction.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #71: Streamlined Visual-First Cluster Cards (Nagoya, Osaka, Tokyo)
- **Context & Objective**: Clean up and declutter the 3 cluster triptych cards in Surat Cinta tab, removing long paragraph descriptions, emphasizing architectural product imagery, and removing the trailing arrow from "Peta Kawasan".
- **Key Changes Implemented**:
  - **Visual-First Layout & Decluttering (index.html)**:
    - Removed long paragraph descriptions (`.cluster-card-desc`) across Nagoya, Osaka, and Tokyo cards.
    - Simplified footer to streamlined location tag (`stat-loc`) and compact action button without arrows.
    - Made the entire card surface clickable (`onclick="switchLandingTab('siteplan'); switchLandingSiteplan(...)`) for seamless navigation.
  - **Elevated Photography Dimensions (styles.css)**:
    - Increased image container height (`.cluster-card-img-wrap`) from 85px to 120px (mobile) / 135px (desktop), giving priority to visual architectural rendering.
    - Refined badge styling and unified `.btn-cluster-explore` with forest green gradient.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #72: Minimalist Header & Segmented Toggle for Gold vs Diamond Specs
- **Context & Objective**: Declutter the architectural type comparison section in Surat Cinta tab, removing wordy subtitles and aligning the pill buttons into an elegant segmented toggle.
- **Key Changes Implemented**:
  - **Header Decluttering (index.html)**:
    - Removed redundant `.section-tag` and long `.section-desc`.
    - Simplified title to clean, centered "Tipe Gold & Diamond" (`text-align: center; margin: 0;`).
  - **Segmented Control Toggle (styles.css)**:
    - Refactored `.spec-toggle-bar` into a unified segmented control capsule with subtle border (`1px solid #e8e2d5`), neutral background (`#fbfaf7`), and 4px padding.
    - Elevated active button (`.spec-tab-btn.is-active`) with forest green gradient (`#11332a` to `#1e4d40`), crisp white text, and subtle elevation shadow.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #73: Visual Photographic Enrichment & Streamlined Price Matrix
- **Context & Objective**: Transform the text-heavy and dull price list cards in Surat Cinta tab into engaging visual product cards with architectural photography banners, decluttered titles, and prominent unit selection actions.
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Removed redundant tag and description, keeping only the clean centered title "Pilihan Unit & Skema Pembayaran".
  - **Photographic Banner Integration (app.js)**:
    - In `renderPriceMatrix()`, added `.price-card-banner` with authentic architectural photo thumbnails matching each cluster (Nagoya, Tokyo, Osaka).
    - Added dark gradient overlay with bold serif unit ID, clean dimension specs, and floating "Pilih Unit" primary action pill.
  - **Modern Card Grid Styling (styles.css)**:
    - Elevated `.price-unit-card` with 12px radius, smooth hover lift (-2px), 95px banner image with 1.04x zoom hover, and 2-column pricing tiles (Cash Keras, Cash Tempo 12/24 Bulan, KPR Bank).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-22] Progress #49: Remove Atmosphere Showcase Scene Tag & Selector Buttons
- **Context & Objective**: Remove the green scene title (`#videoSceneTag`: "SCENE 04 · FASAD...") and the bottom selector chip buttons (`.video-scene-selector` `#vSceneBtn[0-4]`) from `#landingVideoCard` as requested by user.
- **Key Changes Implemented**:
  - **Markup (index.html)**:
    - Removed `#videoSceneTag` from `.video-caption-bar`.
    - Removed `.video-scene-selector` containing all 5 scene buttons (`#vSceneBtn0` to `#vSceneBtn4`).
  - **Styles (styles.css)**:
    - Deleted CSS rules for `.video-scene-tag`, `.video-scene-selector`, and `.video-scene-btn`.
  - **Script (app.js)**:
    - Cleaned up `switchLandingVideoScene()` to remove DOM updates for `videoSceneTag` and the button active state loop, while maintaining the smooth 5-second automatic atmosphere slideshow.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #61: Redundant Unit Page Quick-Links Strip Removal
- **Context & Objective**: Remove duplicate navigation cards and horizontal quick-link bar (`.unit-page-quick-links` and `.unit-page-nav-bar`) from the Unit catalog page (`#panelUnit`), ensuring strict adherence to Rule 5 (single-source Mobile Bottom Navigation Bar) and a clean uncluttered presentation.
- **Key Changes Implemented**:
  - **Structure Simplification (index.html)**:
    - Removed redundant `.unit-page-nav-bar` ("Avenue Grand Gate · Sukoharjo", Sales Login) and `.unit-page-quick-links` ("THEPARKTOWNHOUSE", Beranda, Keunggulan, Unit, Fasilitas, Lokasi, Kalkulator, Hubungi Kami).
    - `#panelUnit` now initiates directly with `.unit-hero-header-card` ("Katalog Hunian · Pilihan Unit per Cluster").
  - **Stylesheet Optimization (styles.css)**:
    - Purged 105 lines of obsolete CSS rules (`.unit-page-nav-bar`, `.unit-nav-loc`, `.unit-nav-dot`, `.unit-nav-right`, `.unit-lang-pill`, `.unit-sales-login-link`, `.unit-page-quick-links`, `.unit-brand-logo-btn`, `.unit-quick-links-list`, `.unit-quick-link`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #62: Compact Unit Header Navbar with Clean Cluster Navigation
- **Context & Objective**: Refactor the large Unit hero card into a sleek, concise navbar header (`.unit-header-navbar`) with simplified copy and quick cluster navigation chips (Nagoya, Tokyo, Osaka).
- **Key Changes Implemented**:
  - **Navbar Layout & Simplified Copy (index.html)**:
    - Replaced heavy hero text with concise header: `Katalog Hunian` (gold tag), `Pilihan Unit` (title), and `30 Unit · Japandi Modern` (subtitle).
    - Added clean cluster jump pills (`Nagoya`, `Tokyo`, `Osaka`) that smoothly scroll directly to each cluster block on tap.
  - **Japandi Aesthetic & Mobile Styling (styles.css)**:
    - Styled `.unit-header-navbar` with deep forest green gradient (`#11332a` to `#1e4d40`), 12px rounded borders, and subtle shadow.
    - Added `.unit-nav-chip` buttons with 32px height, soft translucent background, and gold accent active states matching design system tokens.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #63: Collapsible Drawer & Horizontal Swipe Chips for Unit Filter
- **Context & Objective**: Compact the tall, multi-row Unit catalog filter card into an expandable drawer with a filter icon toggle trigger and horizontal swipeable chip scrollers.
- **Key Changes Implemented**:
  - **Collapsible Filter Drawer (index.html, styles.css, app.js)**:
    - Created `.unit-filter-toggle-btn` with funnel filter icon, live summary of active filters, active filter count badge, and animated chevron indicator.
    - Wrapped filter options in `#filterControlsWrapper`, defaulting to collapsed state to eliminate vertical clutter.
    - Added `toggleUnitFilterCard()` and `updateUnitFilterSummary()` in `app.js` to handle opening/closing and live status badge updates.
  - **Horizontal Swipeable Chip Scrollers (index.html & styles.css)**:
    - Converted wrapped multi-line chips into single-row horizontal swipe scrollers (`.filter-chips-scroller`) for Tipe Unit, Luas Tanah, Range Harga, and Posisi Kavling.
    - Added `geser ↔` hint, smooth scrolling, and touch inertia (`-webkit-overflow-scrolling: touch`) with 32px min-height tap targets conforming to Rule 5.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #64: Responsive 2-to-3 Column Layout for Unit Product Cards
- **Context & Objective**: Compact the oversized unit product cards in the catalog (`.unit-inventory-grid`) into a refined 2-column layout on mobile and 3-column layout on tablet/desktop, preventing bulky single-column stretching.
- **Key Changes Implemented**:
  - **Multi-Column Grid Architecture (styles.css)**:
    - Replaced loose `repeat(auto-fill, minmax(180px, 1fr))` with strict `grid-template-columns: repeat(2, 1fr)` on mobile (< 640px) and `repeat(3, 1fr)` on wider screens (>= 640px).
    - Reduced inter-card spacing to 8px on mobile and 12px on desktop.
  - **Compact Visual Dimensions & Typography (styles.css)**:
    - Compacted `.uic-media` height to 90px (mobile) / 105px (desktop) with 1.04x subtle zoom hover.
    - Streamlined body padding to 8px and tuned font sizes (`.uic-id`: 12.5px, `.uic-price-val`: 11.5px bold forest green, `.uic-specs`: 9.5px).
    - Compacted primary action button (`.uic-action-btn`) to 30px height with crisp 10.5px text and 4px gap.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #65: Clean Button Copy Simplification (Remove Arrow from "Pesan Kavling Ini")
- **Context & Objective**: Remove trailing arrow symbols (`→`) from the unit order CTA buttons, leaving clean and centered "Pesan Kavling Ini" copy across catalog cards and site plan inspector cards.
- **Key Changes Implemented**:
  - **Product Card Action Button (app.js)**:
    - In `renderLandingUnits()`, removed `<span>→</span>` from `.uic-action-btn`, displaying clean `<span>Pesan Kavling Ini</span>`.
  - **Site Plan Inspector Buttons (index.html)**:
    - Removed `<span>→</span>` from `.btn-order-kavling-champagne` in both Beranda (`#berandaLotInspector`) and Site Plan page (`#pageLotInspector`), standardizing text to `<span>Pesan Kavling Ini</span>`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #66: Comprehensive Arrow Symbol Removal Across All Pages
- **Context & Objective**: Remove all trailing and inline arrow symbols (`→`, `←`, `&rarr;`, `&larr;`) from buttons, links, and cards across all pages and modals for a cleaner, unified typography.
- **Key Changes Implemented**:
  - **HTML Buttons & Links Cleaned (index.html)**:
    - Removed all 44 occurrences of `<span>→</span>` from primary CTAs (CTA cards, tour buttons, showcase buttons, quiz items, facilities cards, Super App action buttons, and footer links).
    - Removed trailing arrows from Super App action triggers (`Unlock`, `Generate QR`, `Pesan Slot`, `Bayar`, `Buat Laporan`, `Kirim SOS`).
    - Cleaned `.back-arrow` symbols from subpage headers.
  - **JavaScript Dynamic Templates Cleaned (app.js)**:
    - Cleaned `<span>→</span>` from modal CTAs (WhatsApp modal, tour finish modal, booking modal, 99 keunggulan explorer).
    - Removed `→` and `←` from theme switcher navigation buttons (`Tema Sebelumnya` and `Tema Berikutnya`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #67: Dedicated Interactive Unit Product Detail Page Integration
- **Context & Objective**: Enable clickable product cards in the Unit catalog that open a dedicated, harmonized Product Detail subpage (`#unitDetailView`) for every individual unit (all 30 units across Nagoya, Tokyo, and Osaka).
- **Key Changes Implemented**:
  - **Dedicated Unit Detail View Architecture (index.html)**:
    - Built `#unitDetailView` inside `#panelUnit` with back navigation bar (`Katalog Unit`), dynamic cluster tag, lot ID title, and quick order action.
    - Hero gallery featuring 220px/280px architectural photography, status badge (Tersedia/Terjual), Japandi type subtitle, price summary strip, and estimated monthly installment.
    - 4 architecture metric cards (Kamar Tidur, Kamar Mandi, Luas Bangunan, Luas Tanah).
    - Living character & specifications section with 4 bespoke Japandi comfort highlights (Cross Ventilation, Carport Teduh, One-Gate 24h, Legalitas SHM).
    - Flexible payment schemes card (Cash Keras, Cash Bertahap 0%, KPR Express).
    - Fixed bottom floating action bar with live price, direct WhatsApp inquiry, and "Pesan Kavling Ini" primary CTA button.
  - **Interactive View Management & Dynamic Data Binding (app.js)**:
    - Upgraded `.unit-inventory-card` with `onclick="openUnitDetail('${clusterKey}', '${u.id}')"` while preserving `event.stopPropagation()` on the direct order button.
    - Implemented `openUnitDetail(clusterKey, unitId)` populating photos, titles, prices, specs, and status dynamically for all 30 units.
    - Implemented `closeUnitDetail()` returning cleanly to `#unitCatalogHub`.
    - Implemented `orderCurrentDetailUnit()` hooking into the global booking modal.
  - **Design System Harmonization (styles.css)**:
    - Applied forest green luxury palette (`#11332a` to `#1e4d40`), champagne gold accents (`#dfb96d`), 12px/14px rounded cards, and proper mobile bottom bar clearances.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #68: Remove Lighting Mood Switcher Pill Bar from Header
- **Context & Objective**: Remove the "Siang / Senja / Malam" lighting mood switcher element (`#landingLightingSwitch`) from the global sticky header (`.landing-navbar`) to keep the top bar clean and uncluttered.
- **Key Changes Implemented**:
  - **Header Cleanup (index.html)**:
    - Removed `#landingLightingSwitch` and its 3 mood buttons (`#moodDayBtn`, `#moodDuskBtn`, `#moodNightBtn`) from `.landing-nav-actions`.
    - Cleaned up top header, retaining only the brand logo and bookmark saved configuration button.
  - **Stylesheet Optimization (styles.css)**:
    - Removed `.landing-lighting-switch` and `.lighting-pill-btn` CSS styling rules.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #69: Simplify 11 Themes Header to Centered Title
- **Context & Objective**: Clean up the section header above the 11 theme chips in Surat Cinta tab (`#section99Keunggulan`), removing the tag (`99 KEUNGGULAN · SUKOHARJO`) and subtitle description, keeping only the centered title "Telusuri 11 Tema Keunggulan".
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Stripped `.section-tag` and `.section-desc`.
    - Centered `.section-title` ("Telusuri 11 Tema Keunggulan") using `text-align: center; margin: 0;`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #70: Refined Luxury Card Redesign for 'Surat Resmi Dari Pengembang' Banner
- **Context & Objective**: Elevate the visual appeal and layout structure of `.surat-compact-banner` in Surat Cinta tab, crafting an authentic luxury aesthetic with gold accents, deep forest tones, and champagne button contrast.
- **Key Changes Implemented**:
  - **Enhanced Layout & Card Hierarchy (index.html)**:
    - Grouped title and subtitle into `.surat-banner-body` for consistent text flow.
    - Wrapped CTA button in `.surat-banner-action-wrap` with improved padding and breathing room.
  - **Japandi Luxury Styling & Accents (styles.css)**:
    - Applied multi-stop deep forest gradient (`#11332a` to `#0d261f` to `#173d32`) with gold border accent (`rgba(223, 185, 109, 0.45)`) and subtle radial ambient glow (`::before`).
    - Elevated wax seal badge (`.surat-wax-badge-mini`) with champagne border and refined letter-spacing.
    - Redesigned `.btn-open-surat-modal` with warm champagne gold gradient (`linear-gradient(135deg, #dfb96d 0%, #c59b48 100%)`), deep forest typography, and smooth hover micro-interaction.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #71: Streamlined Visual-First Cluster Cards (Nagoya, Osaka, Tokyo)
- **Context & Objective**: Clean up and declutter the 3 cluster triptych cards in Surat Cinta tab, removing long paragraph descriptions, emphasizing architectural product imagery, and removing the trailing arrow from "Peta Kawasan".
- **Key Changes Implemented**:
  - **Visual-First Layout & Decluttering (index.html)**:
    - Removed long paragraph descriptions (`.cluster-card-desc`) across Nagoya, Osaka, and Tokyo cards.
    - Simplified footer to streamlined location tag (`stat-loc`) and compact action button without arrows.
    - Made the entire card surface clickable (`onclick="switchLandingTab('siteplan'); switchLandingSiteplan(...)`) for seamless navigation.
  - **Elevated Photography Dimensions (styles.css)**:
    - Increased image container height (`.cluster-card-img-wrap`) from 85px to 120px (mobile) / 135px (desktop), giving priority to visual architectural rendering.
    - Refined badge styling and unified `.btn-cluster-explore` with forest green gradient.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #72: Minimalist Header & Segmented Toggle for Gold vs Diamond Specs
- **Context & Objective**: Declutter the architectural type comparison section in Surat Cinta tab, removing wordy subtitles and aligning the pill buttons into an elegant segmented toggle.
- **Key Changes Implemented**:
  - **Header Decluttering (index.html)**:
    - Removed redundant `.section-tag` and long `.section-desc`.
    - Simplified title to clean, centered "Tipe Gold & Diamond" (`text-align: center; margin: 0;`).
  - **Segmented Control Toggle (styles.css)**:
    - Refactored `.spec-toggle-bar` into a unified segmented control capsule with subtle border (`1px solid #e8e2d5`), neutral background (`#fbfaf7`), and 4px padding.
    - Elevated active button (`.spec-tab-btn.is-active`) with forest green gradient (`#11332a` to `#1e4d40`), crisp white text, and subtle elevation shadow.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #73: Visual Photographic Enrichment & Streamlined Price Matrix
- **Context & Objective**: Transform the text-heavy and dull price list cards in Surat Cinta tab into engaging visual product cards with architectural photography banners, decluttered titles, and prominent unit selection actions.
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Removed redundant tag and description, keeping only the clean centered title "Pilihan Unit & Skema Pembayaran".
  - **Photographic Banner Integration (app.js)**:
    - In `renderPriceMatrix()`, added `.price-card-banner` with authentic architectural photo thumbnails matching each cluster (Nagoya, Tokyo, Osaka).
    - Added dark gradient overlay with bold serif unit ID, clean dimension specs, and floating "Pilih Unit" primary action pill.
  - **Modern Card Grid Styling (styles.css)**:
    - Elevated `.price-unit-card` with 12px radius, smooth hover lift (-2px), 95px banner image with 1.04x zoom hover, and 2-column pricing tiles (Cash Keras, Cash Tempo 12/24 Bulan, KPR Bank).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-22] Progress #50: Harmonize Selected Lot Inspector Card (`#berandaLotInspector`)
- **Context & Objective**: Align typography, layout, and color palette of `#berandaLotInspector` with the Japandi Modern luxury brand system.
- **Key Changes Implemented**:
  - **Header Structure & Typography (index.html, styles.css)**:
    - Added `#inspLotTag` (`.kavling-id-title`) connected with `app.js` to render the selected lot's title with `var(--font-serif)`.
    - Styled `.kavling-label` tag with dark green badge (`#2e7d32` on `rgba(46, 125, 50, 0.08)`).
    - Styled `.kavling-status-badge` with rounded pill borders and status-based colors.
  - **Specs Breakdown Box (styles.css)**:
    - Refactored `.kavling-specs-clean` into an elevated breakdown box with `#fbfaf7` background and `#e8e2d5` border.
    - Updated rows with `justify-content: space-between;` and proper label/value styling.
    - Styled `.price-row` with dashed divider and `var(--font-serif)` 18px bold price styling in deep forest green (`#11332a`).
  - **Action Button Harmonization (styles.css)**:
    - Upgraded `.btn-order-kavling-champagne` from pale champagne to deep forest green gradient (`linear-gradient(135deg, #11332a 0%, #1e4d40 100%)`) with white text and elevation shadow matching other primary actions.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #61: Redundant Unit Page Quick-Links Strip Removal
- **Context & Objective**: Remove duplicate navigation cards and horizontal quick-link bar (`.unit-page-quick-links` and `.unit-page-nav-bar`) from the Unit catalog page (`#panelUnit`), ensuring strict adherence to Rule 5 (single-source Mobile Bottom Navigation Bar) and a clean uncluttered presentation.
- **Key Changes Implemented**:
  - **Structure Simplification (index.html)**:
    - Removed redundant `.unit-page-nav-bar` ("Avenue Grand Gate · Sukoharjo", Sales Login) and `.unit-page-quick-links` ("THEPARKTOWNHOUSE", Beranda, Keunggulan, Unit, Fasilitas, Lokasi, Kalkulator, Hubungi Kami).
    - `#panelUnit` now initiates directly with `.unit-hero-header-card` ("Katalog Hunian · Pilihan Unit per Cluster").
  - **Stylesheet Optimization (styles.css)**:
    - Purged 105 lines of obsolete CSS rules (`.unit-page-nav-bar`, `.unit-nav-loc`, `.unit-nav-dot`, `.unit-nav-right`, `.unit-lang-pill`, `.unit-sales-login-link`, `.unit-page-quick-links`, `.unit-brand-logo-btn`, `.unit-quick-links-list`, `.unit-quick-link`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #62: Compact Unit Header Navbar with Clean Cluster Navigation
- **Context & Objective**: Refactor the large Unit hero card into a sleek, concise navbar header (`.unit-header-navbar`) with simplified copy and quick cluster navigation chips (Nagoya, Tokyo, Osaka).
- **Key Changes Implemented**:
  - **Navbar Layout & Simplified Copy (index.html)**:
    - Replaced heavy hero text with concise header: `Katalog Hunian` (gold tag), `Pilihan Unit` (title), and `30 Unit · Japandi Modern` (subtitle).
    - Added clean cluster jump pills (`Nagoya`, `Tokyo`, `Osaka`) that smoothly scroll directly to each cluster block on tap.
  - **Japandi Aesthetic & Mobile Styling (styles.css)**:
    - Styled `.unit-header-navbar` with deep forest green gradient (`#11332a` to `#1e4d40`), 12px rounded borders, and subtle shadow.
    - Added `.unit-nav-chip` buttons with 32px height, soft translucent background, and gold accent active states matching design system tokens.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #63: Collapsible Drawer & Horizontal Swipe Chips for Unit Filter
- **Context & Objective**: Compact the tall, multi-row Unit catalog filter card into an expandable drawer with a filter icon toggle trigger and horizontal swipeable chip scrollers.
- **Key Changes Implemented**:
  - **Collapsible Filter Drawer (index.html, styles.css, app.js)**:
    - Created `.unit-filter-toggle-btn` with funnel filter icon, live summary of active filters, active filter count badge, and animated chevron indicator.
    - Wrapped filter options in `#filterControlsWrapper`, defaulting to collapsed state to eliminate vertical clutter.
    - Added `toggleUnitFilterCard()` and `updateUnitFilterSummary()` in `app.js` to handle opening/closing and live status badge updates.
  - **Horizontal Swipeable Chip Scrollers (index.html & styles.css)**:
    - Converted wrapped multi-line chips into single-row horizontal swipe scrollers (`.filter-chips-scroller`) for Tipe Unit, Luas Tanah, Range Harga, and Posisi Kavling.
    - Added `geser ↔` hint, smooth scrolling, and touch inertia (`-webkit-overflow-scrolling: touch`) with 32px min-height tap targets conforming to Rule 5.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #64: Responsive 2-to-3 Column Layout for Unit Product Cards
- **Context & Objective**: Compact the oversized unit product cards in the catalog (`.unit-inventory-grid`) into a refined 2-column layout on mobile and 3-column layout on tablet/desktop, preventing bulky single-column stretching.
- **Key Changes Implemented**:
  - **Multi-Column Grid Architecture (styles.css)**:
    - Replaced loose `repeat(auto-fill, minmax(180px, 1fr))` with strict `grid-template-columns: repeat(2, 1fr)` on mobile (< 640px) and `repeat(3, 1fr)` on wider screens (>= 640px).
    - Reduced inter-card spacing to 8px on mobile and 12px on desktop.
  - **Compact Visual Dimensions & Typography (styles.css)**:
    - Compacted `.uic-media` height to 90px (mobile) / 105px (desktop) with 1.04x subtle zoom hover.
    - Streamlined body padding to 8px and tuned font sizes (`.uic-id`: 12.5px, `.uic-price-val`: 11.5px bold forest green, `.uic-specs`: 9.5px).
    - Compacted primary action button (`.uic-action-btn`) to 30px height with crisp 10.5px text and 4px gap.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #65: Clean Button Copy Simplification (Remove Arrow from "Pesan Kavling Ini")
- **Context & Objective**: Remove trailing arrow symbols (`→`) from the unit order CTA buttons, leaving clean and centered "Pesan Kavling Ini" copy across catalog cards and site plan inspector cards.
- **Key Changes Implemented**:
  - **Product Card Action Button (app.js)**:
    - In `renderLandingUnits()`, removed `<span>→</span>` from `.uic-action-btn`, displaying clean `<span>Pesan Kavling Ini</span>`.
  - **Site Plan Inspector Buttons (index.html)**:
    - Removed `<span>→</span>` from `.btn-order-kavling-champagne` in both Beranda (`#berandaLotInspector`) and Site Plan page (`#pageLotInspector`), standardizing text to `<span>Pesan Kavling Ini</span>`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #66: Comprehensive Arrow Symbol Removal Across All Pages
- **Context & Objective**: Remove all trailing and inline arrow symbols (`→`, `←`, `&rarr;`, `&larr;`) from buttons, links, and cards across all pages and modals for a cleaner, unified typography.
- **Key Changes Implemented**:
  - **HTML Buttons & Links Cleaned (index.html)**:
    - Removed all 44 occurrences of `<span>→</span>` from primary CTAs (CTA cards, tour buttons, showcase buttons, quiz items, facilities cards, Super App action buttons, and footer links).
    - Removed trailing arrows from Super App action triggers (`Unlock`, `Generate QR`, `Pesan Slot`, `Bayar`, `Buat Laporan`, `Kirim SOS`).
    - Cleaned `.back-arrow` symbols from subpage headers.
  - **JavaScript Dynamic Templates Cleaned (app.js)**:
    - Cleaned `<span>→</span>` from modal CTAs (WhatsApp modal, tour finish modal, booking modal, 99 keunggulan explorer).
    - Removed `→` and `←` from theme switcher navigation buttons (`Tema Sebelumnya` and `Tema Berikutnya`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #67: Dedicated Interactive Unit Product Detail Page Integration
- **Context & Objective**: Enable clickable product cards in the Unit catalog that open a dedicated, harmonized Product Detail subpage (`#unitDetailView`) for every individual unit (all 30 units across Nagoya, Tokyo, and Osaka).
- **Key Changes Implemented**:
  - **Dedicated Unit Detail View Architecture (index.html)**:
    - Built `#unitDetailView` inside `#panelUnit` with back navigation bar (`Katalog Unit`), dynamic cluster tag, lot ID title, and quick order action.
    - Hero gallery featuring 220px/280px architectural photography, status badge (Tersedia/Terjual), Japandi type subtitle, price summary strip, and estimated monthly installment.
    - 4 architecture metric cards (Kamar Tidur, Kamar Mandi, Luas Bangunan, Luas Tanah).
    - Living character & specifications section with 4 bespoke Japandi comfort highlights (Cross Ventilation, Carport Teduh, One-Gate 24h, Legalitas SHM).
    - Flexible payment schemes card (Cash Keras, Cash Bertahap 0%, KPR Express).
    - Fixed bottom floating action bar with live price, direct WhatsApp inquiry, and "Pesan Kavling Ini" primary CTA button.
  - **Interactive View Management & Dynamic Data Binding (app.js)**:
    - Upgraded `.unit-inventory-card` with `onclick="openUnitDetail('${clusterKey}', '${u.id}')"` while preserving `event.stopPropagation()` on the direct order button.
    - Implemented `openUnitDetail(clusterKey, unitId)` populating photos, titles, prices, specs, and status dynamically for all 30 units.
    - Implemented `closeUnitDetail()` returning cleanly to `#unitCatalogHub`.
    - Implemented `orderCurrentDetailUnit()` hooking into the global booking modal.
  - **Design System Harmonization (styles.css)**:
    - Applied forest green luxury palette (`#11332a` to `#1e4d40`), champagne gold accents (`#dfb96d`), 12px/14px rounded cards, and proper mobile bottom bar clearances.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #68: Remove Lighting Mood Switcher Pill Bar from Header
- **Context & Objective**: Remove the "Siang / Senja / Malam" lighting mood switcher element (`#landingLightingSwitch`) from the global sticky header (`.landing-navbar`) to keep the top bar clean and uncluttered.
- **Key Changes Implemented**:
  - **Header Cleanup (index.html)**:
    - Removed `#landingLightingSwitch` and its 3 mood buttons (`#moodDayBtn`, `#moodDuskBtn`, `#moodNightBtn`) from `.landing-nav-actions`.
    - Cleaned up top header, retaining only the brand logo and bookmark saved configuration button.
  - **Stylesheet Optimization (styles.css)**:
    - Removed `.landing-lighting-switch` and `.lighting-pill-btn` CSS styling rules.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #69: Simplify 11 Themes Header to Centered Title
- **Context & Objective**: Clean up the section header above the 11 theme chips in Surat Cinta tab (`#section99Keunggulan`), removing the tag (`99 KEUNGGULAN · SUKOHARJO`) and subtitle description, keeping only the centered title "Telusuri 11 Tema Keunggulan".
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Stripped `.section-tag` and `.section-desc`.
    - Centered `.section-title` ("Telusuri 11 Tema Keunggulan") using `text-align: center; margin: 0;`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #70: Refined Luxury Card Redesign for 'Surat Resmi Dari Pengembang' Banner
- **Context & Objective**: Elevate the visual appeal and layout structure of `.surat-compact-banner` in Surat Cinta tab, crafting an authentic luxury aesthetic with gold accents, deep forest tones, and champagne button contrast.
- **Key Changes Implemented**:
  - **Enhanced Layout & Card Hierarchy (index.html)**:
    - Grouped title and subtitle into `.surat-banner-body` for consistent text flow.
    - Wrapped CTA button in `.surat-banner-action-wrap` with improved padding and breathing room.
  - **Japandi Luxury Styling & Accents (styles.css)**:
    - Applied multi-stop deep forest gradient (`#11332a` to `#0d261f` to `#173d32`) with gold border accent (`rgba(223, 185, 109, 0.45)`) and subtle radial ambient glow (`::before`).
    - Elevated wax seal badge (`.surat-wax-badge-mini`) with champagne border and refined letter-spacing.
    - Redesigned `.btn-open-surat-modal` with warm champagne gold gradient (`linear-gradient(135deg, #dfb96d 0%, #c59b48 100%)`), deep forest typography, and smooth hover micro-interaction.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #71: Streamlined Visual-First Cluster Cards (Nagoya, Osaka, Tokyo)
- **Context & Objective**: Clean up and declutter the 3 cluster triptych cards in Surat Cinta tab, removing long paragraph descriptions, emphasizing architectural product imagery, and removing the trailing arrow from "Peta Kawasan".
- **Key Changes Implemented**:
  - **Visual-First Layout & Decluttering (index.html)**:
    - Removed long paragraph descriptions (`.cluster-card-desc`) across Nagoya, Osaka, and Tokyo cards.
    - Simplified footer to streamlined location tag (`stat-loc`) and compact action button without arrows.
    - Made the entire card surface clickable (`onclick="switchLandingTab('siteplan'); switchLandingSiteplan(...)`) for seamless navigation.
  - **Elevated Photography Dimensions (styles.css)**:
    - Increased image container height (`.cluster-card-img-wrap`) from 85px to 120px (mobile) / 135px (desktop), giving priority to visual architectural rendering.
    - Refined badge styling and unified `.btn-cluster-explore` with forest green gradient.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #72: Minimalist Header & Segmented Toggle for Gold vs Diamond Specs
- **Context & Objective**: Declutter the architectural type comparison section in Surat Cinta tab, removing wordy subtitles and aligning the pill buttons into an elegant segmented toggle.
- **Key Changes Implemented**:
  - **Header Decluttering (index.html)**:
    - Removed redundant `.section-tag` and long `.section-desc`.
    - Simplified title to clean, centered "Tipe Gold & Diamond" (`text-align: center; margin: 0;`).
  - **Segmented Control Toggle (styles.css)**:
    - Refactored `.spec-toggle-bar` into a unified segmented control capsule with subtle border (`1px solid #e8e2d5`), neutral background (`#fbfaf7`), and 4px padding.
    - Elevated active button (`.spec-tab-btn.is-active`) with forest green gradient (`#11332a` to `#1e4d40`), crisp white text, and subtle elevation shadow.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #73: Visual Photographic Enrichment & Streamlined Price Matrix
- **Context & Objective**: Transform the text-heavy and dull price list cards in Surat Cinta tab into engaging visual product cards with architectural photography banners, decluttered titles, and prominent unit selection actions.
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Removed redundant tag and description, keeping only the clean centered title "Pilihan Unit & Skema Pembayaran".
  - **Photographic Banner Integration (app.js)**:
    - In `renderPriceMatrix()`, added `.price-card-banner` with authentic architectural photo thumbnails matching each cluster (Nagoya, Tokyo, Osaka).
    - Added dark gradient overlay with bold serif unit ID, clean dimension specs, and floating "Pilih Unit" primary action pill.
  - **Modern Card Grid Styling (styles.css)**:
    - Elevated `.price-unit-card` with 12px radius, smooth hover lift (-2px), 95px banner image with 1.04x zoom hover, and 2-column pricing tiles (Cash Keras, Cash Tempo 12/24 Bulan, KPR Bank).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-22] Progress #52: Remove Glowing Green Dot from Bookmark Button
- **Context & Objective**: Remove the glowing green notification dot (#bookmarkDotPulse) from the bookmark button (#landingBookmarkBtn) in the top landing header as requested by the user.
- **Key Changes Implemented**:
  - **Markup (index.html)**:
    - Removed <span class="bookmark-dot-pulse" id="bookmarkDotPulse"></span> from inside #landingBookmarkBtn.
  - **Styles (styles.css)**:
    - Deleted CSS rule .bookmark-dot-pulse and its green glow box shadow.
  - **Script (app.js)**:
    - Removed DOM query and visibility toggling for ookmarkDotPulse inside updateBottomBarVisibility().
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #61: Redundant Unit Page Quick-Links Strip Removal
- **Context & Objective**: Remove duplicate navigation cards and horizontal quick-link bar (`.unit-page-quick-links` and `.unit-page-nav-bar`) from the Unit catalog page (`#panelUnit`), ensuring strict adherence to Rule 5 (single-source Mobile Bottom Navigation Bar) and a clean uncluttered presentation.
- **Key Changes Implemented**:
  - **Structure Simplification (index.html)**:
    - Removed redundant `.unit-page-nav-bar` ("Avenue Grand Gate · Sukoharjo", Sales Login) and `.unit-page-quick-links` ("THEPARKTOWNHOUSE", Beranda, Keunggulan, Unit, Fasilitas, Lokasi, Kalkulator, Hubungi Kami).
    - `#panelUnit` now initiates directly with `.unit-hero-header-card` ("Katalog Hunian · Pilihan Unit per Cluster").
  - **Stylesheet Optimization (styles.css)**:
    - Purged 105 lines of obsolete CSS rules (`.unit-page-nav-bar`, `.unit-nav-loc`, `.unit-nav-dot`, `.unit-nav-right`, `.unit-lang-pill`, `.unit-sales-login-link`, `.unit-page-quick-links`, `.unit-brand-logo-btn`, `.unit-quick-links-list`, `.unit-quick-link`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #62: Compact Unit Header Navbar with Clean Cluster Navigation
- **Context & Objective**: Refactor the large Unit hero card into a sleek, concise navbar header (`.unit-header-navbar`) with simplified copy and quick cluster navigation chips (Nagoya, Tokyo, Osaka).
- **Key Changes Implemented**:
  - **Navbar Layout & Simplified Copy (index.html)**:
    - Replaced heavy hero text with concise header: `Katalog Hunian` (gold tag), `Pilihan Unit` (title), and `30 Unit · Japandi Modern` (subtitle).
    - Added clean cluster jump pills (`Nagoya`, `Tokyo`, `Osaka`) that smoothly scroll directly to each cluster block on tap.
  - **Japandi Aesthetic & Mobile Styling (styles.css)**:
    - Styled `.unit-header-navbar` with deep forest green gradient (`#11332a` to `#1e4d40`), 12px rounded borders, and subtle shadow.
    - Added `.unit-nav-chip` buttons with 32px height, soft translucent background, and gold accent active states matching design system tokens.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #63: Collapsible Drawer & Horizontal Swipe Chips for Unit Filter
- **Context & Objective**: Compact the tall, multi-row Unit catalog filter card into an expandable drawer with a filter icon toggle trigger and horizontal swipeable chip scrollers.
- **Key Changes Implemented**:
  - **Collapsible Filter Drawer (index.html, styles.css, app.js)**:
    - Created `.unit-filter-toggle-btn` with funnel filter icon, live summary of active filters, active filter count badge, and animated chevron indicator.
    - Wrapped filter options in `#filterControlsWrapper`, defaulting to collapsed state to eliminate vertical clutter.
    - Added `toggleUnitFilterCard()` and `updateUnitFilterSummary()` in `app.js` to handle opening/closing and live status badge updates.
  - **Horizontal Swipeable Chip Scrollers (index.html & styles.css)**:
    - Converted wrapped multi-line chips into single-row horizontal swipe scrollers (`.filter-chips-scroller`) for Tipe Unit, Luas Tanah, Range Harga, and Posisi Kavling.
    - Added `geser ↔` hint, smooth scrolling, and touch inertia (`-webkit-overflow-scrolling: touch`) with 32px min-height tap targets conforming to Rule 5.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #64: Responsive 2-to-3 Column Layout for Unit Product Cards
- **Context & Objective**: Compact the oversized unit product cards in the catalog (`.unit-inventory-grid`) into a refined 2-column layout on mobile and 3-column layout on tablet/desktop, preventing bulky single-column stretching.
- **Key Changes Implemented**:
  - **Multi-Column Grid Architecture (styles.css)**:
    - Replaced loose `repeat(auto-fill, minmax(180px, 1fr))` with strict `grid-template-columns: repeat(2, 1fr)` on mobile (< 640px) and `repeat(3, 1fr)` on wider screens (>= 640px).
    - Reduced inter-card spacing to 8px on mobile and 12px on desktop.
  - **Compact Visual Dimensions & Typography (styles.css)**:
    - Compacted `.uic-media` height to 90px (mobile) / 105px (desktop) with 1.04x subtle zoom hover.
    - Streamlined body padding to 8px and tuned font sizes (`.uic-id`: 12.5px, `.uic-price-val`: 11.5px bold forest green, `.uic-specs`: 9.5px).
    - Compacted primary action button (`.uic-action-btn`) to 30px height with crisp 10.5px text and 4px gap.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #65: Clean Button Copy Simplification (Remove Arrow from "Pesan Kavling Ini")
- **Context & Objective**: Remove trailing arrow symbols (`→`) from the unit order CTA buttons, leaving clean and centered "Pesan Kavling Ini" copy across catalog cards and site plan inspector cards.
- **Key Changes Implemented**:
  - **Product Card Action Button (app.js)**:
    - In `renderLandingUnits()`, removed `<span>→</span>` from `.uic-action-btn`, displaying clean `<span>Pesan Kavling Ini</span>`.
  - **Site Plan Inspector Buttons (index.html)**:
    - Removed `<span>→</span>` from `.btn-order-kavling-champagne` in both Beranda (`#berandaLotInspector`) and Site Plan page (`#pageLotInspector`), standardizing text to `<span>Pesan Kavling Ini</span>`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #66: Comprehensive Arrow Symbol Removal Across All Pages
- **Context & Objective**: Remove all trailing and inline arrow symbols (`→`, `←`, `&rarr;`, `&larr;`) from buttons, links, and cards across all pages and modals for a cleaner, unified typography.
- **Key Changes Implemented**:
  - **HTML Buttons & Links Cleaned (index.html)**:
    - Removed all 44 occurrences of `<span>→</span>` from primary CTAs (CTA cards, tour buttons, showcase buttons, quiz items, facilities cards, Super App action buttons, and footer links).
    - Removed trailing arrows from Super App action triggers (`Unlock`, `Generate QR`, `Pesan Slot`, `Bayar`, `Buat Laporan`, `Kirim SOS`).
    - Cleaned `.back-arrow` symbols from subpage headers.
  - **JavaScript Dynamic Templates Cleaned (app.js)**:
    - Cleaned `<span>→</span>` from modal CTAs (WhatsApp modal, tour finish modal, booking modal, 99 keunggulan explorer).
    - Removed `→` and `←` from theme switcher navigation buttons (`Tema Sebelumnya` and `Tema Berikutnya`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #67: Dedicated Interactive Unit Product Detail Page Integration
- **Context & Objective**: Enable clickable product cards in the Unit catalog that open a dedicated, harmonized Product Detail subpage (`#unitDetailView`) for every individual unit (all 30 units across Nagoya, Tokyo, and Osaka).
- **Key Changes Implemented**:
  - **Dedicated Unit Detail View Architecture (index.html)**:
    - Built `#unitDetailView` inside `#panelUnit` with back navigation bar (`Katalog Unit`), dynamic cluster tag, lot ID title, and quick order action.
    - Hero gallery featuring 220px/280px architectural photography, status badge (Tersedia/Terjual), Japandi type subtitle, price summary strip, and estimated monthly installment.
    - 4 architecture metric cards (Kamar Tidur, Kamar Mandi, Luas Bangunan, Luas Tanah).
    - Living character & specifications section with 4 bespoke Japandi comfort highlights (Cross Ventilation, Carport Teduh, One-Gate 24h, Legalitas SHM).
    - Flexible payment schemes card (Cash Keras, Cash Bertahap 0%, KPR Express).
    - Fixed bottom floating action bar with live price, direct WhatsApp inquiry, and "Pesan Kavling Ini" primary CTA button.
  - **Interactive View Management & Dynamic Data Binding (app.js)**:
    - Upgraded `.unit-inventory-card` with `onclick="openUnitDetail('${clusterKey}', '${u.id}')"` while preserving `event.stopPropagation()` on the direct order button.
    - Implemented `openUnitDetail(clusterKey, unitId)` populating photos, titles, prices, specs, and status dynamically for all 30 units.
    - Implemented `closeUnitDetail()` returning cleanly to `#unitCatalogHub`.
    - Implemented `orderCurrentDetailUnit()` hooking into the global booking modal.
  - **Design System Harmonization (styles.css)**:
    - Applied forest green luxury palette (`#11332a` to `#1e4d40`), champagne gold accents (`#dfb96d`), 12px/14px rounded cards, and proper mobile bottom bar clearances.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #68: Remove Lighting Mood Switcher Pill Bar from Header
- **Context & Objective**: Remove the "Siang / Senja / Malam" lighting mood switcher element (`#landingLightingSwitch`) from the global sticky header (`.landing-navbar`) to keep the top bar clean and uncluttered.
- **Key Changes Implemented**:
  - **Header Cleanup (index.html)**:
    - Removed `#landingLightingSwitch` and its 3 mood buttons (`#moodDayBtn`, `#moodDuskBtn`, `#moodNightBtn`) from `.landing-nav-actions`.
    - Cleaned up top header, retaining only the brand logo and bookmark saved configuration button.
  - **Stylesheet Optimization (styles.css)**:
    - Removed `.landing-lighting-switch` and `.lighting-pill-btn` CSS styling rules.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #69: Simplify 11 Themes Header to Centered Title
- **Context & Objective**: Clean up the section header above the 11 theme chips in Surat Cinta tab (`#section99Keunggulan`), removing the tag (`99 KEUNGGULAN · SUKOHARJO`) and subtitle description, keeping only the centered title "Telusuri 11 Tema Keunggulan".
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Stripped `.section-tag` and `.section-desc`.
    - Centered `.section-title` ("Telusuri 11 Tema Keunggulan") using `text-align: center; margin: 0;`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #70: Refined Luxury Card Redesign for 'Surat Resmi Dari Pengembang' Banner
- **Context & Objective**: Elevate the visual appeal and layout structure of `.surat-compact-banner` in Surat Cinta tab, crafting an authentic luxury aesthetic with gold accents, deep forest tones, and champagne button contrast.
- **Key Changes Implemented**:
  - **Enhanced Layout & Card Hierarchy (index.html)**:
    - Grouped title and subtitle into `.surat-banner-body` for consistent text flow.
    - Wrapped CTA button in `.surat-banner-action-wrap` with improved padding and breathing room.
  - **Japandi Luxury Styling & Accents (styles.css)**:
    - Applied multi-stop deep forest gradient (`#11332a` to `#0d261f` to `#173d32`) with gold border accent (`rgba(223, 185, 109, 0.45)`) and subtle radial ambient glow (`::before`).
    - Elevated wax seal badge (`.surat-wax-badge-mini`) with champagne border and refined letter-spacing.
    - Redesigned `.btn-open-surat-modal` with warm champagne gold gradient (`linear-gradient(135deg, #dfb96d 0%, #c59b48 100%)`), deep forest typography, and smooth hover micro-interaction.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #71: Streamlined Visual-First Cluster Cards (Nagoya, Osaka, Tokyo)
- **Context & Objective**: Clean up and declutter the 3 cluster triptych cards in Surat Cinta tab, removing long paragraph descriptions, emphasizing architectural product imagery, and removing the trailing arrow from "Peta Kawasan".
- **Key Changes Implemented**:
  - **Visual-First Layout & Decluttering (index.html)**:
    - Removed long paragraph descriptions (`.cluster-card-desc`) across Nagoya, Osaka, and Tokyo cards.
    - Simplified footer to streamlined location tag (`stat-loc`) and compact action button without arrows.
    - Made the entire card surface clickable (`onclick="switchLandingTab('siteplan'); switchLandingSiteplan(...)`) for seamless navigation.
  - **Elevated Photography Dimensions (styles.css)**:
    - Increased image container height (`.cluster-card-img-wrap`) from 85px to 120px (mobile) / 135px (desktop), giving priority to visual architectural rendering.
    - Refined badge styling and unified `.btn-cluster-explore` with forest green gradient.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #72: Minimalist Header & Segmented Toggle for Gold vs Diamond Specs
- **Context & Objective**: Declutter the architectural type comparison section in Surat Cinta tab, removing wordy subtitles and aligning the pill buttons into an elegant segmented toggle.
- **Key Changes Implemented**:
  - **Header Decluttering (index.html)**:
    - Removed redundant `.section-tag` and long `.section-desc`.
    - Simplified title to clean, centered "Tipe Gold & Diamond" (`text-align: center; margin: 0;`).
  - **Segmented Control Toggle (styles.css)**:
    - Refactored `.spec-toggle-bar` into a unified segmented control capsule with subtle border (`1px solid #e8e2d5`), neutral background (`#fbfaf7`), and 4px padding.
    - Elevated active button (`.spec-tab-btn.is-active`) with forest green gradient (`#11332a` to `#1e4d40`), crisp white text, and subtle elevation shadow.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #73: Visual Photographic Enrichment & Streamlined Price Matrix
- **Context & Objective**: Transform the text-heavy and dull price list cards in Surat Cinta tab into engaging visual product cards with architectural photography banners, decluttered titles, and prominent unit selection actions.
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Removed redundant tag and description, keeping only the clean centered title "Pilihan Unit & Skema Pembayaran".
  - **Photographic Banner Integration (app.js)**:
    - In `renderPriceMatrix()`, added `.price-card-banner` with authentic architectural photo thumbnails matching each cluster (Nagoya, Tokyo, Osaka).
    - Added dark gradient overlay with bold serif unit ID, clean dimension specs, and floating "Pilih Unit" primary action pill.
  - **Modern Card Grid Styling (styles.css)**:
    - Elevated `.price-unit-card` with 12px radius, smooth hover lift (-2px), 95px banner image with 1.04x zoom hover, and 2-column pricing tiles (Cash Keras, Cash Tempo 12/24 Bulan, KPR Bank).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-22] Progress #53: Fix Theme Navigation Bar Layout & Button Overlap
- **Context & Objective**: Resolve text wrapping and overlapping between .btn-theme-page buttons and the .theme-page-indicator ("11 dari 11 Tema") in the 11 Keunggulan Theme Explorer navigation.
- **Key Changes Implemented**:
  - **Layout & Spacing (styles.css)**:
    - Added explicit gap: 8px to .theme-nav-actions with clean border separation and margin.
    - Set .btn-theme-page with lex: 1 1 0; min-width: 0; white-space: nowrap; and min-height: 44px (satisfies mobile touch targets).
    - Styled .theme-page-indicator as a dedicated pill container (lex: 0 0 auto; white-space: nowrap;) with soft background and border, preventing collisions.
    - Added responsive @media (max-width: 440px) rule hiding "Tema " label prefix to cleanly display "? Sebelumnya" and "Berikutnya ?".
  - **Markup & Accessibility (app.js)**:
    - Wrapped "Tema " with `<span class="nav-btn-lbl">` and styled indicator with semantic `<strong>`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #61: Redundant Unit Page Quick-Links Strip Removal
- **Context & Objective**: Remove duplicate navigation cards and horizontal quick-link bar (`.unit-page-quick-links` and `.unit-page-nav-bar`) from the Unit catalog page (`#panelUnit`), ensuring strict adherence to Rule 5 (single-source Mobile Bottom Navigation Bar) and a clean uncluttered presentation.
- **Key Changes Implemented**:
  - **Structure Simplification (index.html)**:
    - Removed redundant `.unit-page-nav-bar` ("Avenue Grand Gate · Sukoharjo", Sales Login) and `.unit-page-quick-links` ("THEPARKTOWNHOUSE", Beranda, Keunggulan, Unit, Fasilitas, Lokasi, Kalkulator, Hubungi Kami).
    - `#panelUnit` now initiates directly with `.unit-hero-header-card` ("Katalog Hunian · Pilihan Unit per Cluster").
  - **Stylesheet Optimization (styles.css)**:
    - Purged 105 lines of obsolete CSS rules (`.unit-page-nav-bar`, `.unit-nav-loc`, `.unit-nav-dot`, `.unit-nav-right`, `.unit-lang-pill`, `.unit-sales-login-link`, `.unit-page-quick-links`, `.unit-brand-logo-btn`, `.unit-quick-links-list`, `.unit-quick-link`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #62: Compact Unit Header Navbar with Clean Cluster Navigation
- **Context & Objective**: Refactor the large Unit hero card into a sleek, concise navbar header (`.unit-header-navbar`) with simplified copy and quick cluster navigation chips (Nagoya, Tokyo, Osaka).
- **Key Changes Implemented**:
  - **Navbar Layout & Simplified Copy (index.html)**:
    - Replaced heavy hero text with concise header: `Katalog Hunian` (gold tag), `Pilihan Unit` (title), and `30 Unit · Japandi Modern` (subtitle).
    - Added clean cluster jump pills (`Nagoya`, `Tokyo`, `Osaka`) that smoothly scroll directly to each cluster block on tap.
  - **Japandi Aesthetic & Mobile Styling (styles.css)**:
    - Styled `.unit-header-navbar` with deep forest green gradient (`#11332a` to `#1e4d40`), 12px rounded borders, and subtle shadow.
    - Added `.unit-nav-chip` buttons with 32px height, soft translucent background, and gold accent active states matching design system tokens.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #63: Collapsible Drawer & Horizontal Swipe Chips for Unit Filter
- **Context & Objective**: Compact the tall, multi-row Unit catalog filter card into an expandable drawer with a filter icon toggle trigger and horizontal swipeable chip scrollers.
- **Key Changes Implemented**:
  - **Collapsible Filter Drawer (index.html, styles.css, app.js)**:
    - Created `.unit-filter-toggle-btn` with funnel filter icon, live summary of active filters, active filter count badge, and animated chevron indicator.
    - Wrapped filter options in `#filterControlsWrapper`, defaulting to collapsed state to eliminate vertical clutter.
    - Added `toggleUnitFilterCard()` and `updateUnitFilterSummary()` in `app.js` to handle opening/closing and live status badge updates.
  - **Horizontal Swipeable Chip Scrollers (index.html & styles.css)**:
    - Converted wrapped multi-line chips into single-row horizontal swipe scrollers (`.filter-chips-scroller`) for Tipe Unit, Luas Tanah, Range Harga, and Posisi Kavling.
    - Added `geser ↔` hint, smooth scrolling, and touch inertia (`-webkit-overflow-scrolling: touch`) with 32px min-height tap targets conforming to Rule 5.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #64: Responsive 2-to-3 Column Layout for Unit Product Cards
- **Context & Objective**: Compact the oversized unit product cards in the catalog (`.unit-inventory-grid`) into a refined 2-column layout on mobile and 3-column layout on tablet/desktop, preventing bulky single-column stretching.
- **Key Changes Implemented**:
  - **Multi-Column Grid Architecture (styles.css)**:
    - Replaced loose `repeat(auto-fill, minmax(180px, 1fr))` with strict `grid-template-columns: repeat(2, 1fr)` on mobile (< 640px) and `repeat(3, 1fr)` on wider screens (>= 640px).
    - Reduced inter-card spacing to 8px on mobile and 12px on desktop.
  - **Compact Visual Dimensions & Typography (styles.css)**:
    - Compacted `.uic-media` height to 90px (mobile) / 105px (desktop) with 1.04x subtle zoom hover.
    - Streamlined body padding to 8px and tuned font sizes (`.uic-id`: 12.5px, `.uic-price-val`: 11.5px bold forest green, `.uic-specs`: 9.5px).
    - Compacted primary action button (`.uic-action-btn`) to 30px height with crisp 10.5px text and 4px gap.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #65: Clean Button Copy Simplification (Remove Arrow from "Pesan Kavling Ini")
- **Context & Objective**: Remove trailing arrow symbols (`→`) from the unit order CTA buttons, leaving clean and centered "Pesan Kavling Ini" copy across catalog cards and site plan inspector cards.
- **Key Changes Implemented**:
  - **Product Card Action Button (app.js)**:
    - In `renderLandingUnits()`, removed `<span>→</span>` from `.uic-action-btn`, displaying clean `<span>Pesan Kavling Ini</span>`.
  - **Site Plan Inspector Buttons (index.html)**:
    - Removed `<span>→</span>` from `.btn-order-kavling-champagne` in both Beranda (`#berandaLotInspector`) and Site Plan page (`#pageLotInspector`), standardizing text to `<span>Pesan Kavling Ini</span>`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #66: Comprehensive Arrow Symbol Removal Across All Pages
- **Context & Objective**: Remove all trailing and inline arrow symbols (`→`, `←`, `&rarr;`, `&larr;`) from buttons, links, and cards across all pages and modals for a cleaner, unified typography.
- **Key Changes Implemented**:
  - **HTML Buttons & Links Cleaned (index.html)**:
    - Removed all 44 occurrences of `<span>→</span>` from primary CTAs (CTA cards, tour buttons, showcase buttons, quiz items, facilities cards, Super App action buttons, and footer links).
    - Removed trailing arrows from Super App action triggers (`Unlock`, `Generate QR`, `Pesan Slot`, `Bayar`, `Buat Laporan`, `Kirim SOS`).
    - Cleaned `.back-arrow` symbols from subpage headers.
  - **JavaScript Dynamic Templates Cleaned (app.js)**:
    - Cleaned `<span>→</span>` from modal CTAs (WhatsApp modal, tour finish modal, booking modal, 99 keunggulan explorer).
    - Removed `→` and `←` from theme switcher navigation buttons (`Tema Sebelumnya` and `Tema Berikutnya`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #67: Dedicated Interactive Unit Product Detail Page Integration
- **Context & Objective**: Enable clickable product cards in the Unit catalog that open a dedicated, harmonized Product Detail subpage (`#unitDetailView`) for every individual unit (all 30 units across Nagoya, Tokyo, and Osaka).
- **Key Changes Implemented**:
  - **Dedicated Unit Detail View Architecture (index.html)**:
    - Built `#unitDetailView` inside `#panelUnit` with back navigation bar (`Katalog Unit`), dynamic cluster tag, lot ID title, and quick order action.
    - Hero gallery featuring 220px/280px architectural photography, status badge (Tersedia/Terjual), Japandi type subtitle, price summary strip, and estimated monthly installment.
    - 4 architecture metric cards (Kamar Tidur, Kamar Mandi, Luas Bangunan, Luas Tanah).
    - Living character & specifications section with 4 bespoke Japandi comfort highlights (Cross Ventilation, Carport Teduh, One-Gate 24h, Legalitas SHM).
    - Flexible payment schemes card (Cash Keras, Cash Bertahap 0%, KPR Express).
    - Fixed bottom floating action bar with live price, direct WhatsApp inquiry, and "Pesan Kavling Ini" primary CTA button.
  - **Interactive View Management & Dynamic Data Binding (app.js)**:
    - Upgraded `.unit-inventory-card` with `onclick="openUnitDetail('${clusterKey}', '${u.id}')"` while preserving `event.stopPropagation()` on the direct order button.
    - Implemented `openUnitDetail(clusterKey, unitId)` populating photos, titles, prices, specs, and status dynamically for all 30 units.
    - Implemented `closeUnitDetail()` returning cleanly to `#unitCatalogHub`.
    - Implemented `orderCurrentDetailUnit()` hooking into the global booking modal.
  - **Design System Harmonization (styles.css)**:
    - Applied forest green luxury palette (`#11332a` to `#1e4d40`), champagne gold accents (`#dfb96d`), 12px/14px rounded cards, and proper mobile bottom bar clearances.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #68: Remove Lighting Mood Switcher Pill Bar from Header
- **Context & Objective**: Remove the "Siang / Senja / Malam" lighting mood switcher element (`#landingLightingSwitch`) from the global sticky header (`.landing-navbar`) to keep the top bar clean and uncluttered.
- **Key Changes Implemented**:
  - **Header Cleanup (index.html)**:
    - Removed `#landingLightingSwitch` and its 3 mood buttons (`#moodDayBtn`, `#moodDuskBtn`, `#moodNightBtn`) from `.landing-nav-actions`.
    - Cleaned up top header, retaining only the brand logo and bookmark saved configuration button.
  - **Stylesheet Optimization (styles.css)**:
    - Removed `.landing-lighting-switch` and `.lighting-pill-btn` CSS styling rules.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #69: Simplify 11 Themes Header to Centered Title
- **Context & Objective**: Clean up the section header above the 11 theme chips in Surat Cinta tab (`#section99Keunggulan`), removing the tag (`99 KEUNGGULAN · SUKOHARJO`) and subtitle description, keeping only the centered title "Telusuri 11 Tema Keunggulan".
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Stripped `.section-tag` and `.section-desc`.
    - Centered `.section-title` ("Telusuri 11 Tema Keunggulan") using `text-align: center; margin: 0;`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #70: Refined Luxury Card Redesign for 'Surat Resmi Dari Pengembang' Banner
- **Context & Objective**: Elevate the visual appeal and layout structure of `.surat-compact-banner` in Surat Cinta tab, crafting an authentic luxury aesthetic with gold accents, deep forest tones, and champagne button contrast.
- **Key Changes Implemented**:
  - **Enhanced Layout & Card Hierarchy (index.html)**:
    - Grouped title and subtitle into `.surat-banner-body` for consistent text flow.
    - Wrapped CTA button in `.surat-banner-action-wrap` with improved padding and breathing room.
  - **Japandi Luxury Styling & Accents (styles.css)**:
    - Applied multi-stop deep forest gradient (`#11332a` to `#0d261f` to `#173d32`) with gold border accent (`rgba(223, 185, 109, 0.45)`) and subtle radial ambient glow (`::before`).
    - Elevated wax seal badge (`.surat-wax-badge-mini`) with champagne border and refined letter-spacing.
    - Redesigned `.btn-open-surat-modal` with warm champagne gold gradient (`linear-gradient(135deg, #dfb96d 0%, #c59b48 100%)`), deep forest typography, and smooth hover micro-interaction.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #71: Streamlined Visual-First Cluster Cards (Nagoya, Osaka, Tokyo)
- **Context & Objective**: Clean up and declutter the 3 cluster triptych cards in Surat Cinta tab, removing long paragraph descriptions, emphasizing architectural product imagery, and removing the trailing arrow from "Peta Kawasan".
- **Key Changes Implemented**:
  - **Visual-First Layout & Decluttering (index.html)**:
    - Removed long paragraph descriptions (`.cluster-card-desc`) across Nagoya, Osaka, and Tokyo cards.
    - Simplified footer to streamlined location tag (`stat-loc`) and compact action button without arrows.
    - Made the entire card surface clickable (`onclick="switchLandingTab('siteplan'); switchLandingSiteplan(...)`) for seamless navigation.
  - **Elevated Photography Dimensions (styles.css)**:
    - Increased image container height (`.cluster-card-img-wrap`) from 85px to 120px (mobile) / 135px (desktop), giving priority to visual architectural rendering.
    - Refined badge styling and unified `.btn-cluster-explore` with forest green gradient.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #72: Minimalist Header & Segmented Toggle for Gold vs Diamond Specs
- **Context & Objective**: Declutter the architectural type comparison section in Surat Cinta tab, removing wordy subtitles and aligning the pill buttons into an elegant segmented toggle.
- **Key Changes Implemented**:
  - **Header Decluttering (index.html)**:
    - Removed redundant `.section-tag` and long `.section-desc`.
    - Simplified title to clean, centered "Tipe Gold & Diamond" (`text-align: center; margin: 0;`).
  - **Segmented Control Toggle (styles.css)**:
    - Refactored `.spec-toggle-bar` into a unified segmented control capsule with subtle border (`1px solid #e8e2d5`), neutral background (`#fbfaf7`), and 4px padding.
    - Elevated active button (`.spec-tab-btn.is-active`) with forest green gradient (`#11332a` to `#1e4d40`), crisp white text, and subtle elevation shadow.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #73: Visual Photographic Enrichment & Streamlined Price Matrix
- **Context & Objective**: Transform the text-heavy and dull price list cards in Surat Cinta tab into engaging visual product cards with architectural photography banners, decluttered titles, and prominent unit selection actions.
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Removed redundant tag and description, keeping only the clean centered title "Pilihan Unit & Skema Pembayaran".
  - **Photographic Banner Integration (app.js)**:
    - In `renderPriceMatrix()`, added `.price-card-banner` with authentic architectural photo thumbnails matching each cluster (Nagoya, Tokyo, Osaka).
    - Added dark gradient overlay with bold serif unit ID, clean dimension specs, and floating "Pilih Unit" primary action pill.
  - **Modern Card Grid Styling (styles.css)**:
    - Elevated `.price-unit-card` with 12px radius, smooth hover lift (-2px), 95px banner image with 1.04x zoom hover, and 2-column pricing tiles (Cash Keras, Cash Tempo 12/24 Bulan, KPR Bank).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-22] Progress #54: Compact & Responsive Redesign of Surat Cinta Magazine Tab
- **Context & Objective**: Transform the overly large, endlessly vertically scrolling layout of `.surat-magazine-container` (Surat Cinta Tab) into an engaging, compact magazine experience with constrained width and multi-column bento grids.
- **Key Changes Implemented**:
  - **Magazine Layout Constraining (styles.css)**:
    - Added `max-width: 820px; margin: 0 auto; gap: 14px;` to `.surat-magazine-container` preventing giant full-screen stretching on wide monitors.
    - Compacted `.surat-compact-banner` padding (from 20px 18px down to 12px 14px) and title sizing (15px serif).
    - Tightened `.surat-section-header` typography and vertical margins.
  - **11 Tema & 99 Keunggulan Explorer Bento Grid (styles.css)**:
    - Reduced banner image height from 180px to 105px.
    - Transformed single-column 9-point vertical list (`.theme-points-grid`) into a compact multi-column bento grid (`repeat(auto-fit, minmax(215px, 1fr))`), shrinking vertical scroll by over 60%.
    - Compacted `.theme-point-card` padding to 6px 8px and tightened font sizes (head: 10.5px, text: 9.5px).
  - **Cluster Triptych Carousel & 3-Column Layout (styles.css)**:
    - Replaced vertical stack with a 3-column grid (`repeat(3, 1fr)`) on desktop/tablet and smooth horizontal swipeable carousel on mobile (`scroll-snap-type: x mandatory`).
    - Reduced image height from 130px to 85px with tighter typography and button padding.
  - **Compact Technical Specs & Price Matrix (styles.css)**:
    - In `#specDetailDisplay`: capped denah image height at 140px (`object-fit: contain`), refactored features into 2 columns.
    - In `.price-matrix-container`: arranged unit financial plans into 2-column tiles (`minmax(240px, 1fr)`).
  - **3 Langkah Bersahaja & Consultant Card (styles.css)**:
    - Arranged `.steps-triptych-grid` into 3 compact columns (`repeat(3, 1fr)`).
    - Compacted `.consultant-contact-card` with streamlined avatar, details, and side-by-side action buttons.
  - **Compact Payment Calculator (styles.css)**:
    - Converted `.surat-calc-container` into a 2-column grid layout for screens >= 680px.
    - Compacted input heights to 38px, reduced payment breakdown box and comparison cards padding.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #61: Redundant Unit Page Quick-Links Strip Removal
- **Context & Objective**: Remove duplicate navigation cards and horizontal quick-link bar (`.unit-page-quick-links` and `.unit-page-nav-bar`) from the Unit catalog page (`#panelUnit`), ensuring strict adherence to Rule 5 (single-source Mobile Bottom Navigation Bar) and a clean uncluttered presentation.
- **Key Changes Implemented**:
  - **Structure Simplification (index.html)**:
    - Removed redundant `.unit-page-nav-bar` ("Avenue Grand Gate · Sukoharjo", Sales Login) and `.unit-page-quick-links` ("THEPARKTOWNHOUSE", Beranda, Keunggulan, Unit, Fasilitas, Lokasi, Kalkulator, Hubungi Kami).
    - `#panelUnit` now initiates directly with `.unit-hero-header-card` ("Katalog Hunian · Pilihan Unit per Cluster").
  - **Stylesheet Optimization (styles.css)**:
    - Purged 105 lines of obsolete CSS rules (`.unit-page-nav-bar`, `.unit-nav-loc`, `.unit-nav-dot`, `.unit-nav-right`, `.unit-lang-pill`, `.unit-sales-login-link`, `.unit-page-quick-links`, `.unit-brand-logo-btn`, `.unit-quick-links-list`, `.unit-quick-link`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #62: Compact Unit Header Navbar with Clean Cluster Navigation
- **Context & Objective**: Refactor the large Unit hero card into a sleek, concise navbar header (`.unit-header-navbar`) with simplified copy and quick cluster navigation chips (Nagoya, Tokyo, Osaka).
- **Key Changes Implemented**:
  - **Navbar Layout & Simplified Copy (index.html)**:
    - Replaced heavy hero text with concise header: `Katalog Hunian` (gold tag), `Pilihan Unit` (title), and `30 Unit · Japandi Modern` (subtitle).
    - Added clean cluster jump pills (`Nagoya`, `Tokyo`, `Osaka`) that smoothly scroll directly to each cluster block on tap.
  - **Japandi Aesthetic & Mobile Styling (styles.css)**:
    - Styled `.unit-header-navbar` with deep forest green gradient (`#11332a` to `#1e4d40`), 12px rounded borders, and subtle shadow.
    - Added `.unit-nav-chip` buttons with 32px height, soft translucent background, and gold accent active states matching design system tokens.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #63: Collapsible Drawer & Horizontal Swipe Chips for Unit Filter
- **Context & Objective**: Compact the tall, multi-row Unit catalog filter card into an expandable drawer with a filter icon toggle trigger and horizontal swipeable chip scrollers.
- **Key Changes Implemented**:
  - **Collapsible Filter Drawer (index.html, styles.css, app.js)**:
    - Created `.unit-filter-toggle-btn` with funnel filter icon, live summary of active filters, active filter count badge, and animated chevron indicator.
    - Wrapped filter options in `#filterControlsWrapper`, defaulting to collapsed state to eliminate vertical clutter.
    - Added `toggleUnitFilterCard()` and `updateUnitFilterSummary()` in `app.js` to handle opening/closing and live status badge updates.
  - **Horizontal Swipeable Chip Scrollers (index.html & styles.css)**:
    - Converted wrapped multi-line chips into single-row horizontal swipe scrollers (`.filter-chips-scroller`) for Tipe Unit, Luas Tanah, Range Harga, and Posisi Kavling.
    - Added `geser ↔` hint, smooth scrolling, and touch inertia (`-webkit-overflow-scrolling: touch`) with 32px min-height tap targets conforming to Rule 5.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #64: Responsive 2-to-3 Column Layout for Unit Product Cards
- **Context & Objective**: Compact the oversized unit product cards in the catalog (`.unit-inventory-grid`) into a refined 2-column layout on mobile and 3-column layout on tablet/desktop, preventing bulky single-column stretching.
- **Key Changes Implemented**:
  - **Multi-Column Grid Architecture (styles.css)**:
    - Replaced loose `repeat(auto-fill, minmax(180px, 1fr))` with strict `grid-template-columns: repeat(2, 1fr)` on mobile (< 640px) and `repeat(3, 1fr)` on wider screens (>= 640px).
    - Reduced inter-card spacing to 8px on mobile and 12px on desktop.
  - **Compact Visual Dimensions & Typography (styles.css)**:
    - Compacted `.uic-media` height to 90px (mobile) / 105px (desktop) with 1.04x subtle zoom hover.
    - Streamlined body padding to 8px and tuned font sizes (`.uic-id`: 12.5px, `.uic-price-val`: 11.5px bold forest green, `.uic-specs`: 9.5px).
    - Compacted primary action button (`.uic-action-btn`) to 30px height with crisp 10.5px text and 4px gap.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #65: Clean Button Copy Simplification (Remove Arrow from "Pesan Kavling Ini")
- **Context & Objective**: Remove trailing arrow symbols (`→`) from the unit order CTA buttons, leaving clean and centered "Pesan Kavling Ini" copy across catalog cards and site plan inspector cards.
- **Key Changes Implemented**:
  - **Product Card Action Button (app.js)**:
    - In `renderLandingUnits()`, removed `<span>→</span>` from `.uic-action-btn`, displaying clean `<span>Pesan Kavling Ini</span>`.
  - **Site Plan Inspector Buttons (index.html)**:
    - Removed `<span>→</span>` from `.btn-order-kavling-champagne` in both Beranda (`#berandaLotInspector`) and Site Plan page (`#pageLotInspector`), standardizing text to `<span>Pesan Kavling Ini</span>`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #66: Comprehensive Arrow Symbol Removal Across All Pages
- **Context & Objective**: Remove all trailing and inline arrow symbols (`→`, `←`, `&rarr;`, `&larr;`) from buttons, links, and cards across all pages and modals for a cleaner, unified typography.
- **Key Changes Implemented**:
  - **HTML Buttons & Links Cleaned (index.html)**:
    - Removed all 44 occurrences of `<span>→</span>` from primary CTAs (CTA cards, tour buttons, showcase buttons, quiz items, facilities cards, Super App action buttons, and footer links).
    - Removed trailing arrows from Super App action triggers (`Unlock`, `Generate QR`, `Pesan Slot`, `Bayar`, `Buat Laporan`, `Kirim SOS`).
    - Cleaned `.back-arrow` symbols from subpage headers.
  - **JavaScript Dynamic Templates Cleaned (app.js)**:
    - Cleaned `<span>→</span>` from modal CTAs (WhatsApp modal, tour finish modal, booking modal, 99 keunggulan explorer).
    - Removed `→` and `←` from theme switcher navigation buttons (`Tema Sebelumnya` and `Tema Berikutnya`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #67: Dedicated Interactive Unit Product Detail Page Integration
- **Context & Objective**: Enable clickable product cards in the Unit catalog that open a dedicated, harmonized Product Detail subpage (`#unitDetailView`) for every individual unit (all 30 units across Nagoya, Tokyo, and Osaka).
- **Key Changes Implemented**:
  - **Dedicated Unit Detail View Architecture (index.html)**:
    - Built `#unitDetailView` inside `#panelUnit` with back navigation bar (`Katalog Unit`), dynamic cluster tag, lot ID title, and quick order action.
    - Hero gallery featuring 220px/280px architectural photography, status badge (Tersedia/Terjual), Japandi type subtitle, price summary strip, and estimated monthly installment.
    - 4 architecture metric cards (Kamar Tidur, Kamar Mandi, Luas Bangunan, Luas Tanah).
    - Living character & specifications section with 4 bespoke Japandi comfort highlights (Cross Ventilation, Carport Teduh, One-Gate 24h, Legalitas SHM).
    - Flexible payment schemes card (Cash Keras, Cash Bertahap 0%, KPR Express).
    - Fixed bottom floating action bar with live price, direct WhatsApp inquiry, and "Pesan Kavling Ini" primary CTA button.
  - **Interactive View Management & Dynamic Data Binding (app.js)**:
    - Upgraded `.unit-inventory-card` with `onclick="openUnitDetail('${clusterKey}', '${u.id}')"` while preserving `event.stopPropagation()` on the direct order button.
    - Implemented `openUnitDetail(clusterKey, unitId)` populating photos, titles, prices, specs, and status dynamically for all 30 units.
    - Implemented `closeUnitDetail()` returning cleanly to `#unitCatalogHub`.
    - Implemented `orderCurrentDetailUnit()` hooking into the global booking modal.
  - **Design System Harmonization (styles.css)**:
    - Applied forest green luxury palette (`#11332a` to `#1e4d40`), champagne gold accents (`#dfb96d`), 12px/14px rounded cards, and proper mobile bottom bar clearances.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #68: Remove Lighting Mood Switcher Pill Bar from Header
- **Context & Objective**: Remove the "Siang / Senja / Malam" lighting mood switcher element (`#landingLightingSwitch`) from the global sticky header (`.landing-navbar`) to keep the top bar clean and uncluttered.
- **Key Changes Implemented**:
  - **Header Cleanup (index.html)**:
    - Removed `#landingLightingSwitch` and its 3 mood buttons (`#moodDayBtn`, `#moodDuskBtn`, `#moodNightBtn`) from `.landing-nav-actions`.
    - Cleaned up top header, retaining only the brand logo and bookmark saved configuration button.
  - **Stylesheet Optimization (styles.css)**:
    - Removed `.landing-lighting-switch` and `.lighting-pill-btn` CSS styling rules.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #69: Simplify 11 Themes Header to Centered Title
- **Context & Objective**: Clean up the section header above the 11 theme chips in Surat Cinta tab (`#section99Keunggulan`), removing the tag (`99 KEUNGGULAN · SUKOHARJO`) and subtitle description, keeping only the centered title "Telusuri 11 Tema Keunggulan".
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Stripped `.section-tag` and `.section-desc`.
    - Centered `.section-title` ("Telusuri 11 Tema Keunggulan") using `text-align: center; margin: 0;`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #70: Refined Luxury Card Redesign for 'Surat Resmi Dari Pengembang' Banner
- **Context & Objective**: Elevate the visual appeal and layout structure of `.surat-compact-banner` in Surat Cinta tab, crafting an authentic luxury aesthetic with gold accents, deep forest tones, and champagne button contrast.
- **Key Changes Implemented**:
  - **Enhanced Layout & Card Hierarchy (index.html)**:
    - Grouped title and subtitle into `.surat-banner-body` for consistent text flow.
    - Wrapped CTA button in `.surat-banner-action-wrap` with improved padding and breathing room.
  - **Japandi Luxury Styling & Accents (styles.css)**:
    - Applied multi-stop deep forest gradient (`#11332a` to `#0d261f` to `#173d32`) with gold border accent (`rgba(223, 185, 109, 0.45)`) and subtle radial ambient glow (`::before`).
    - Elevated wax seal badge (`.surat-wax-badge-mini`) with champagne border and refined letter-spacing.
    - Redesigned `.btn-open-surat-modal` with warm champagne gold gradient (`linear-gradient(135deg, #dfb96d 0%, #c59b48 100%)`), deep forest typography, and smooth hover micro-interaction.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #71: Streamlined Visual-First Cluster Cards (Nagoya, Osaka, Tokyo)
- **Context & Objective**: Clean up and declutter the 3 cluster triptych cards in Surat Cinta tab, removing long paragraph descriptions, emphasizing architectural product imagery, and removing the trailing arrow from "Peta Kawasan".
- **Key Changes Implemented**:
  - **Visual-First Layout & Decluttering (index.html)**:
    - Removed long paragraph descriptions (`.cluster-card-desc`) across Nagoya, Osaka, and Tokyo cards.
    - Simplified footer to streamlined location tag (`stat-loc`) and compact action button without arrows.
    - Made the entire card surface clickable (`onclick="switchLandingTab('siteplan'); switchLandingSiteplan(...)`) for seamless navigation.
  - **Elevated Photography Dimensions (styles.css)**:
    - Increased image container height (`.cluster-card-img-wrap`) from 85px to 120px (mobile) / 135px (desktop), giving priority to visual architectural rendering.
    - Refined badge styling and unified `.btn-cluster-explore` with forest green gradient.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #72: Minimalist Header & Segmented Toggle for Gold vs Diamond Specs
- **Context & Objective**: Declutter the architectural type comparison section in Surat Cinta tab, removing wordy subtitles and aligning the pill buttons into an elegant segmented toggle.
- **Key Changes Implemented**:
  - **Header Decluttering (index.html)**:
    - Removed redundant `.section-tag` and long `.section-desc`.
    - Simplified title to clean, centered "Tipe Gold & Diamond" (`text-align: center; margin: 0;`).
  - **Segmented Control Toggle (styles.css)**:
    - Refactored `.spec-toggle-bar` into a unified segmented control capsule with subtle border (`1px solid #e8e2d5`), neutral background (`#fbfaf7`), and 4px padding.
    - Elevated active button (`.spec-tab-btn.is-active`) with forest green gradient (`#11332a` to `#1e4d40`), crisp white text, and subtle elevation shadow.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #73: Visual Photographic Enrichment & Streamlined Price Matrix
- **Context & Objective**: Transform the text-heavy and dull price list cards in Surat Cinta tab into engaging visual product cards with architectural photography banners, decluttered titles, and prominent unit selection actions.
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Removed redundant tag and description, keeping only the clean centered title "Pilihan Unit & Skema Pembayaran".
  - **Photographic Banner Integration (app.js)**:
    - In `renderPriceMatrix()`, added `.price-card-banner` with authentic architectural photo thumbnails matching each cluster (Nagoya, Tokyo, Osaka).
    - Added dark gradient overlay with bold serif unit ID, clean dimension specs, and floating "Pilih Unit" primary action pill.
  - **Modern Card Grid Styling (styles.css)**:
    - Elevated `.price-unit-card` with 12px radius, smooth hover lift (-2px), 95px banner image with 1.04x zoom hover, and 2-column pricing tiles (Cash Keras, Cash Tempo 12/24 Bulan, KPR Bank).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-22] Progress #55: Global Harmonization of Typography, Color Palette, Layout & Button Sizing
- **Context & Objective**: Eliminate disparate styling, oversized typography, mismatched color palettes, and bloated buttons across all views (Beranda, Unit, Surat Cinta, Master Plan, and Modals) into a unified, harmonious Japandi Modern design system.
- **Key Changes Implemented**:
  - **Typographic Scale Unification (styles.css)**:
    - Standardized all Section Headings (`.section-card-title`, `.section-title`, `.section-lead-title`, `.cb-name`, `.castle-name`, `.siteplan-cluster-title`) to `16px - 17.5px` with `var(--font-serif)` bold, replacing oversized 22px-30px variants.
    - Standardized Hero/Page Headings to `clamp(17px, 3.2vw, 20px)`.
    - Standardized Card Titles & Unit IDs (`.pillar-title`, `.uic-id`, `.b-unit-id`, `.kavling-id-title`, `.price-unit-id`) to `13px - 14px` bold (eliminating overlap on images).
    - Standardized Highlight Metrics & Large Numbers (`.pillar-num`, `.stat-val`, `.m-val`, `.castle-price-val`, `.cb-p-val`, `.price-val`) to `15px - 16px` bold (replacing oversized 22px-26px numbers).
    - Standardized Eyebrows/Tags to `9px - 10px` uppercase, and Body text to `11px - 11.5px`.
  - **Unified Button System (styles.css)**:
    - Primary Action Buttons (`.btn-primary-forest`, `.btn-order-kavling-champagne`, `.uic-action-btn`, `.btn-card-order`, `.btn-save-siteplan`, `.btn-open-door`): Standardized to compact `38px` height (padding `0 14px-16px`), `11.5px` semi-bold font, `8px` border radius, and deep forest green gradient (`linear-gradient(135deg, #11332a 0%, #1e4d40 100%)`).
    - Secondary/Outline Buttons (`.btn-secondary-link`, `.btn-card-denah`, `.btn-castle-detail`, `.btn-reset-filters`, `.price-tab-pill`, `.spec-tab-btn`): Standardized to `34px - 36px` height, `11px` font, clean neutral surface (`#fbfaf7`), and `1px solid #dcd5c7` border with high-contrast text.
    - Filter/Pill/Chip Buttons (`.cluster-pill-btn`, `.radius-filter-pill`, `.cluster-focus-pill`, `.f-chip`, `.poi-cat-chip`, `.sp-cluster-btn`, `.kavling-pill-btn`): Standardized to `32px - 34px` height (down from bloated 44px), `10.5px - 11px` font, and 6px/pill border radius.
  - **Layout & Card Harmony (styles.css)**:
    - Standardized card border radius to `12px` across `.landing-section-card`, `#secMasterPlan`, `.cluster-block-card`, `.unit-filter-card`, `.unit-hero-header-card`, and `.landing-hero-card`.
    - Standardized content panel max width to `860px; margin: 0 auto; width: 100%;` across `.landing-tab-panel`, `.unit-catalog-page-container`, and `.surat-magazine-container`.
    - Compacted `.b-unit-preview-card` to 160px x 215px and `.cluster-castle-hero-card` to 230px height.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #61: Redundant Unit Page Quick-Links Strip Removal
- **Context & Objective**: Remove duplicate navigation cards and horizontal quick-link bar (`.unit-page-quick-links` and `.unit-page-nav-bar`) from the Unit catalog page (`#panelUnit`), ensuring strict adherence to Rule 5 (single-source Mobile Bottom Navigation Bar) and a clean uncluttered presentation.
- **Key Changes Implemented**:
  - **Structure Simplification (index.html)**:
    - Removed redundant `.unit-page-nav-bar` ("Avenue Grand Gate · Sukoharjo", Sales Login) and `.unit-page-quick-links` ("THEPARKTOWNHOUSE", Beranda, Keunggulan, Unit, Fasilitas, Lokasi, Kalkulator, Hubungi Kami).
    - `#panelUnit` now initiates directly with `.unit-hero-header-card` ("Katalog Hunian · Pilihan Unit per Cluster").
  - **Stylesheet Optimization (styles.css)**:
    - Purged 105 lines of obsolete CSS rules (`.unit-page-nav-bar`, `.unit-nav-loc`, `.unit-nav-dot`, `.unit-nav-right`, `.unit-lang-pill`, `.unit-sales-login-link`, `.unit-page-quick-links`, `.unit-brand-logo-btn`, `.unit-quick-links-list`, `.unit-quick-link`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #62: Compact Unit Header Navbar with Clean Cluster Navigation
- **Context & Objective**: Refactor the large Unit hero card into a sleek, concise navbar header (`.unit-header-navbar`) with simplified copy and quick cluster navigation chips (Nagoya, Tokyo, Osaka).
- **Key Changes Implemented**:
  - **Navbar Layout & Simplified Copy (index.html)**:
    - Replaced heavy hero text with concise header: `Katalog Hunian` (gold tag), `Pilihan Unit` (title), and `30 Unit · Japandi Modern` (subtitle).
    - Added clean cluster jump pills (`Nagoya`, `Tokyo`, `Osaka`) that smoothly scroll directly to each cluster block on tap.
  - **Japandi Aesthetic & Mobile Styling (styles.css)**:
    - Styled `.unit-header-navbar` with deep forest green gradient (`#11332a` to `#1e4d40`), 12px rounded borders, and subtle shadow.
    - Added `.unit-nav-chip` buttons with 32px height, soft translucent background, and gold accent active states matching design system tokens.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #63: Collapsible Drawer & Horizontal Swipe Chips for Unit Filter
- **Context & Objective**: Compact the tall, multi-row Unit catalog filter card into an expandable drawer with a filter icon toggle trigger and horizontal swipeable chip scrollers.
- **Key Changes Implemented**:
  - **Collapsible Filter Drawer (index.html, styles.css, app.js)**:
    - Created `.unit-filter-toggle-btn` with funnel filter icon, live summary of active filters, active filter count badge, and animated chevron indicator.
    - Wrapped filter options in `#filterControlsWrapper`, defaulting to collapsed state to eliminate vertical clutter.
    - Added `toggleUnitFilterCard()` and `updateUnitFilterSummary()` in `app.js` to handle opening/closing and live status badge updates.
  - **Horizontal Swipeable Chip Scrollers (index.html & styles.css)**:
    - Converted wrapped multi-line chips into single-row horizontal swipe scrollers (`.filter-chips-scroller`) for Tipe Unit, Luas Tanah, Range Harga, and Posisi Kavling.
    - Added `geser ↔` hint, smooth scrolling, and touch inertia (`-webkit-overflow-scrolling: touch`) with 32px min-height tap targets conforming to Rule 5.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #64: Responsive 2-to-3 Column Layout for Unit Product Cards
- **Context & Objective**: Compact the oversized unit product cards in the catalog (`.unit-inventory-grid`) into a refined 2-column layout on mobile and 3-column layout on tablet/desktop, preventing bulky single-column stretching.
- **Key Changes Implemented**:
  - **Multi-Column Grid Architecture (styles.css)**:
    - Replaced loose `repeat(auto-fill, minmax(180px, 1fr))` with strict `grid-template-columns: repeat(2, 1fr)` on mobile (< 640px) and `repeat(3, 1fr)` on wider screens (>= 640px).
    - Reduced inter-card spacing to 8px on mobile and 12px on desktop.
  - **Compact Visual Dimensions & Typography (styles.css)**:
    - Compacted `.uic-media` height to 90px (mobile) / 105px (desktop) with 1.04x subtle zoom hover.
    - Streamlined body padding to 8px and tuned font sizes (`.uic-id`: 12.5px, `.uic-price-val`: 11.5px bold forest green, `.uic-specs`: 9.5px).
    - Compacted primary action button (`.uic-action-btn`) to 30px height with crisp 10.5px text and 4px gap.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #65: Clean Button Copy Simplification (Remove Arrow from "Pesan Kavling Ini")
- **Context & Objective**: Remove trailing arrow symbols (`→`) from the unit order CTA buttons, leaving clean and centered "Pesan Kavling Ini" copy across catalog cards and site plan inspector cards.
- **Key Changes Implemented**:
  - **Product Card Action Button (app.js)**:
    - In `renderLandingUnits()`, removed `<span>→</span>` from `.uic-action-btn`, displaying clean `<span>Pesan Kavling Ini</span>`.
  - **Site Plan Inspector Buttons (index.html)**:
    - Removed `<span>→</span>` from `.btn-order-kavling-champagne` in both Beranda (`#berandaLotInspector`) and Site Plan page (`#pageLotInspector`), standardizing text to `<span>Pesan Kavling Ini</span>`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #66: Comprehensive Arrow Symbol Removal Across All Pages
- **Context & Objective**: Remove all trailing and inline arrow symbols (`→`, `←`, `&rarr;`, `&larr;`) from buttons, links, and cards across all pages and modals for a cleaner, unified typography.
- **Key Changes Implemented**:
  - **HTML Buttons & Links Cleaned (index.html)**:
    - Removed all 44 occurrences of `<span>→</span>` from primary CTAs (CTA cards, tour buttons, showcase buttons, quiz items, facilities cards, Super App action buttons, and footer links).
    - Removed trailing arrows from Super App action triggers (`Unlock`, `Generate QR`, `Pesan Slot`, `Bayar`, `Buat Laporan`, `Kirim SOS`).
    - Cleaned `.back-arrow` symbols from subpage headers.
  - **JavaScript Dynamic Templates Cleaned (app.js)**:
    - Cleaned `<span>→</span>` from modal CTAs (WhatsApp modal, tour finish modal, booking modal, 99 keunggulan explorer).
    - Removed `→` and `←` from theme switcher navigation buttons (`Tema Sebelumnya` and `Tema Berikutnya`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #67: Dedicated Interactive Unit Product Detail Page Integration
- **Context & Objective**: Enable clickable product cards in the Unit catalog that open a dedicated, harmonized Product Detail subpage (`#unitDetailView`) for every individual unit (all 30 units across Nagoya, Tokyo, and Osaka).
- **Key Changes Implemented**:
  - **Dedicated Unit Detail View Architecture (index.html)**:
    - Built `#unitDetailView` inside `#panelUnit` with back navigation bar (`Katalog Unit`), dynamic cluster tag, lot ID title, and quick order action.
    - Hero gallery featuring 220px/280px architectural photography, status badge (Tersedia/Terjual), Japandi type subtitle, price summary strip, and estimated monthly installment.
    - 4 architecture metric cards (Kamar Tidur, Kamar Mandi, Luas Bangunan, Luas Tanah).
    - Living character & specifications section with 4 bespoke Japandi comfort highlights (Cross Ventilation, Carport Teduh, One-Gate 24h, Legalitas SHM).
    - Flexible payment schemes card (Cash Keras, Cash Bertahap 0%, KPR Express).
    - Fixed bottom floating action bar with live price, direct WhatsApp inquiry, and "Pesan Kavling Ini" primary CTA button.
  - **Interactive View Management & Dynamic Data Binding (app.js)**:
    - Upgraded `.unit-inventory-card` with `onclick="openUnitDetail('${clusterKey}', '${u.id}')"` while preserving `event.stopPropagation()` on the direct order button.
    - Implemented `openUnitDetail(clusterKey, unitId)` populating photos, titles, prices, specs, and status dynamically for all 30 units.
    - Implemented `closeUnitDetail()` returning cleanly to `#unitCatalogHub`.
    - Implemented `orderCurrentDetailUnit()` hooking into the global booking modal.
  - **Design System Harmonization (styles.css)**:
    - Applied forest green luxury palette (`#11332a` to `#1e4d40`), champagne gold accents (`#dfb96d`), 12px/14px rounded cards, and proper mobile bottom bar clearances.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #68: Remove Lighting Mood Switcher Pill Bar from Header
- **Context & Objective**: Remove the "Siang / Senja / Malam" lighting mood switcher element (`#landingLightingSwitch`) from the global sticky header (`.landing-navbar`) to keep the top bar clean and uncluttered.
- **Key Changes Implemented**:
  - **Header Cleanup (index.html)**:
    - Removed `#landingLightingSwitch` and its 3 mood buttons (`#moodDayBtn`, `#moodDuskBtn`, `#moodNightBtn`) from `.landing-nav-actions`.
    - Cleaned up top header, retaining only the brand logo and bookmark saved configuration button.
  - **Stylesheet Optimization (styles.css)**:
    - Removed `.landing-lighting-switch` and `.lighting-pill-btn` CSS styling rules.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #69: Simplify 11 Themes Header to Centered Title
- **Context & Objective**: Clean up the section header above the 11 theme chips in Surat Cinta tab (`#section99Keunggulan`), removing the tag (`99 KEUNGGULAN · SUKOHARJO`) and subtitle description, keeping only the centered title "Telusuri 11 Tema Keunggulan".
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Stripped `.section-tag` and `.section-desc`.
    - Centered `.section-title` ("Telusuri 11 Tema Keunggulan") using `text-align: center; margin: 0;`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #70: Refined Luxury Card Redesign for 'Surat Resmi Dari Pengembang' Banner
- **Context & Objective**: Elevate the visual appeal and layout structure of `.surat-compact-banner` in Surat Cinta tab, crafting an authentic luxury aesthetic with gold accents, deep forest tones, and champagne button contrast.
- **Key Changes Implemented**:
  - **Enhanced Layout & Card Hierarchy (index.html)**:
    - Grouped title and subtitle into `.surat-banner-body` for consistent text flow.
    - Wrapped CTA button in `.surat-banner-action-wrap` with improved padding and breathing room.
  - **Japandi Luxury Styling & Accents (styles.css)**:
    - Applied multi-stop deep forest gradient (`#11332a` to `#0d261f` to `#173d32`) with gold border accent (`rgba(223, 185, 109, 0.45)`) and subtle radial ambient glow (`::before`).
    - Elevated wax seal badge (`.surat-wax-badge-mini`) with champagne border and refined letter-spacing.
    - Redesigned `.btn-open-surat-modal` with warm champagne gold gradient (`linear-gradient(135deg, #dfb96d 0%, #c59b48 100%)`), deep forest typography, and smooth hover micro-interaction.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #71: Streamlined Visual-First Cluster Cards (Nagoya, Osaka, Tokyo)
- **Context & Objective**: Clean up and declutter the 3 cluster triptych cards in Surat Cinta tab, removing long paragraph descriptions, emphasizing architectural product imagery, and removing the trailing arrow from "Peta Kawasan".
- **Key Changes Implemented**:
  - **Visual-First Layout & Decluttering (index.html)**:
    - Removed long paragraph descriptions (`.cluster-card-desc`) across Nagoya, Osaka, and Tokyo cards.
    - Simplified footer to streamlined location tag (`stat-loc`) and compact action button without arrows.
    - Made the entire card surface clickable (`onclick="switchLandingTab('siteplan'); switchLandingSiteplan(...)`) for seamless navigation.
  - **Elevated Photography Dimensions (styles.css)**:
    - Increased image container height (`.cluster-card-img-wrap`) from 85px to 120px (mobile) / 135px (desktop), giving priority to visual architectural rendering.
    - Refined badge styling and unified `.btn-cluster-explore` with forest green gradient.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #72: Minimalist Header & Segmented Toggle for Gold vs Diamond Specs
- **Context & Objective**: Declutter the architectural type comparison section in Surat Cinta tab, removing wordy subtitles and aligning the pill buttons into an elegant segmented toggle.
- **Key Changes Implemented**:
  - **Header Decluttering (index.html)**:
    - Removed redundant `.section-tag` and long `.section-desc`.
    - Simplified title to clean, centered "Tipe Gold & Diamond" (`text-align: center; margin: 0;`).
  - **Segmented Control Toggle (styles.css)**:
    - Refactored `.spec-toggle-bar` into a unified segmented control capsule with subtle border (`1px solid #e8e2d5`), neutral background (`#fbfaf7`), and 4px padding.
    - Elevated active button (`.spec-tab-btn.is-active`) with forest green gradient (`#11332a` to `#1e4d40`), crisp white text, and subtle elevation shadow.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #73: Visual Photographic Enrichment & Streamlined Price Matrix
- **Context & Objective**: Transform the text-heavy and dull price list cards in Surat Cinta tab into engaging visual product cards with architectural photography banners, decluttered titles, and prominent unit selection actions.
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Removed redundant tag and description, keeping only the clean centered title "Pilihan Unit & Skema Pembayaran".
  - **Photographic Banner Integration (app.js)**:
    - In `renderPriceMatrix()`, added `.price-card-banner` with authentic architectural photo thumbnails matching each cluster (Nagoya, Tokyo, Osaka).
    - Added dark gradient overlay with bold serif unit ID, clean dimension specs, and floating "Pilih Unit" primary action pill.
  - **Modern Card Grid Styling (styles.css)**:
    - Elevated `.price-unit-card` with 12px radius, smooth hover lift (-2px), 95px banner image with 1.04x zoom hover, and 2-column pricing tiles (Cash Keras, Cash Tempo 12/24 Bulan, KPR Bank).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-22] Progress #56: Copywriting Streamlining & Global Button Color Palette Synchronization
- **Context & Objective**: Eliminate wordy and redundant filler text across all post-save views (Beranda, Unit, Surat Cinta, Site Plan, Fasilitas), replace with poetic, user-friendly buyer invitations, and synchronize all button color schemes into a unified palette.
- **Key Changes Implemented**:
  - **Persuasive & Poetic Japandi Copywriting (index.html)**:
    - Streamlined Marquee ticker text to rhythmic, impactful statement ("SEBUAH ALAMAT · BEGITU BANYAK ARTI · 30 HUNIAN JAPANDI MODERN · KORIDOR EMAS SUKOHARJO · SHM PECAH SEMPURNA · RUANG PULANG TEDUH KELUARGA · FASILITAS RESOR EKSKLUSIF").
    - Tightened subtitles and lead copy across Hero, 4 Pilar Investasi, Lokasi & Radius, Unit Showcase, Master Plan, Fasilitas Kawasan, Super App, Media Sosial, 11 Pilar, Simulasi Investasi, Tipe Produk, Tentang Kami, Kalkulator KPR, Testimoni, FAQ, Final CTA Banner, Surat Cinta 11 Tema, 3 Langkah Bersahaja, and Site Plan.
    - Eliminated long-winded boilerplate while preserving warm, emotive Japandi luxury tone that gently invites homebuyers.
  - **Global Button Color Palette Synchronization (styles.css)**:
    - Synchronized all Primary CTA Buttons (`.btn-primary-forest`, `.btn-order-kavling-champagne`, `.uic-action-btn`, `.btn-card-order`, `.btn-open-surat-modal`, `.unit-inv-select-btn`, `.sp-select-lot-btn`, `.btn-surat-modal-proceed`) to consistent deep forest green gradient (`linear-gradient(135deg, #11332a 0%, #1e4d40 100%)`) with white text and clean elevation shadows.
    - Converted outlier `.btn-open-surat-modal` (previously `#dfb96d` gold) and `.unit-inv-select-btn` (previously `#16241c`) to the unified forest green gradient.
    - Synchronized Secondary/Outline Action Buttons (`.btn-secondary-link`, `.btn-card-denah`, `.btn-cluster-explore`, `.btn-schedule-visit`, `.btn-outline-forest.calc-cta-btn`, `.btn-reset-filters`) to consistent clean neutral background (`#fbfaf7`), subtle border (`1px solid #dcd4c3`), and dark forest text (`#16241c`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #61: Redundant Unit Page Quick-Links Strip Removal
- **Context & Objective**: Remove duplicate navigation cards and horizontal quick-link bar (`.unit-page-quick-links` and `.unit-page-nav-bar`) from the Unit catalog page (`#panelUnit`), ensuring strict adherence to Rule 5 (single-source Mobile Bottom Navigation Bar) and a clean uncluttered presentation.
- **Key Changes Implemented**:
  - **Structure Simplification (index.html)**:
    - Removed redundant `.unit-page-nav-bar` ("Avenue Grand Gate · Sukoharjo", Sales Login) and `.unit-page-quick-links` ("THEPARKTOWNHOUSE", Beranda, Keunggulan, Unit, Fasilitas, Lokasi, Kalkulator, Hubungi Kami).
    - `#panelUnit` now initiates directly with `.unit-hero-header-card` ("Katalog Hunian · Pilihan Unit per Cluster").
  - **Stylesheet Optimization (styles.css)**:
    - Purged 105 lines of obsolete CSS rules (`.unit-page-nav-bar`, `.unit-nav-loc`, `.unit-nav-dot`, `.unit-nav-right`, `.unit-lang-pill`, `.unit-sales-login-link`, `.unit-page-quick-links`, `.unit-brand-logo-btn`, `.unit-quick-links-list`, `.unit-quick-link`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #62: Compact Unit Header Navbar with Clean Cluster Navigation
- **Context & Objective**: Refactor the large Unit hero card into a sleek, concise navbar header (`.unit-header-navbar`) with simplified copy and quick cluster navigation chips (Nagoya, Tokyo, Osaka).
- **Key Changes Implemented**:
  - **Navbar Layout & Simplified Copy (index.html)**:
    - Replaced heavy hero text with concise header: `Katalog Hunian` (gold tag), `Pilihan Unit` (title), and `30 Unit · Japandi Modern` (subtitle).
    - Added clean cluster jump pills (`Nagoya`, `Tokyo`, `Osaka`) that smoothly scroll directly to each cluster block on tap.
  - **Japandi Aesthetic & Mobile Styling (styles.css)**:
    - Styled `.unit-header-navbar` with deep forest green gradient (`#11332a` to `#1e4d40`), 12px rounded borders, and subtle shadow.
    - Added `.unit-nav-chip` buttons with 32px height, soft translucent background, and gold accent active states matching design system tokens.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #63: Collapsible Drawer & Horizontal Swipe Chips for Unit Filter
- **Context & Objective**: Compact the tall, multi-row Unit catalog filter card into an expandable drawer with a filter icon toggle trigger and horizontal swipeable chip scrollers.
- **Key Changes Implemented**:
  - **Collapsible Filter Drawer (index.html, styles.css, app.js)**:
    - Created `.unit-filter-toggle-btn` with funnel filter icon, live summary of active filters, active filter count badge, and animated chevron indicator.
    - Wrapped filter options in `#filterControlsWrapper`, defaulting to collapsed state to eliminate vertical clutter.
    - Added `toggleUnitFilterCard()` and `updateUnitFilterSummary()` in `app.js` to handle opening/closing and live status badge updates.
  - **Horizontal Swipeable Chip Scrollers (index.html & styles.css)**:
    - Converted wrapped multi-line chips into single-row horizontal swipe scrollers (`.filter-chips-scroller`) for Tipe Unit, Luas Tanah, Range Harga, and Posisi Kavling.
    - Added `geser ↔` hint, smooth scrolling, and touch inertia (`-webkit-overflow-scrolling: touch`) with 32px min-height tap targets conforming to Rule 5.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #64: Responsive 2-to-3 Column Layout for Unit Product Cards
- **Context & Objective**: Compact the oversized unit product cards in the catalog (`.unit-inventory-grid`) into a refined 2-column layout on mobile and 3-column layout on tablet/desktop, preventing bulky single-column stretching.
- **Key Changes Implemented**:
  - **Multi-Column Grid Architecture (styles.css)**:
    - Replaced loose `repeat(auto-fill, minmax(180px, 1fr))` with strict `grid-template-columns: repeat(2, 1fr)` on mobile (< 640px) and `repeat(3, 1fr)` on wider screens (>= 640px).
    - Reduced inter-card spacing to 8px on mobile and 12px on desktop.
  - **Compact Visual Dimensions & Typography (styles.css)**:
    - Compacted `.uic-media` height to 90px (mobile) / 105px (desktop) with 1.04x subtle zoom hover.
    - Streamlined body padding to 8px and tuned font sizes (`.uic-id`: 12.5px, `.uic-price-val`: 11.5px bold forest green, `.uic-specs`: 9.5px).
    - Compacted primary action button (`.uic-action-btn`) to 30px height with crisp 10.5px text and 4px gap.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #65: Clean Button Copy Simplification (Remove Arrow from "Pesan Kavling Ini")
- **Context & Objective**: Remove trailing arrow symbols (`→`) from the unit order CTA buttons, leaving clean and centered "Pesan Kavling Ini" copy across catalog cards and site plan inspector cards.
- **Key Changes Implemented**:
  - **Product Card Action Button (app.js)**:
    - In `renderLandingUnits()`, removed `<span>→</span>` from `.uic-action-btn`, displaying clean `<span>Pesan Kavling Ini</span>`.
  - **Site Plan Inspector Buttons (index.html)**:
    - Removed `<span>→</span>` from `.btn-order-kavling-champagne` in both Beranda (`#berandaLotInspector`) and Site Plan page (`#pageLotInspector`), standardizing text to `<span>Pesan Kavling Ini</span>`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #66: Comprehensive Arrow Symbol Removal Across All Pages
- **Context & Objective**: Remove all trailing and inline arrow symbols (`→`, `←`, `&rarr;`, `&larr;`) from buttons, links, and cards across all pages and modals for a cleaner, unified typography.
- **Key Changes Implemented**:
  - **HTML Buttons & Links Cleaned (index.html)**:
    - Removed all 44 occurrences of `<span>→</span>` from primary CTAs (CTA cards, tour buttons, showcase buttons, quiz items, facilities cards, Super App action buttons, and footer links).
    - Removed trailing arrows from Super App action triggers (`Unlock`, `Generate QR`, `Pesan Slot`, `Bayar`, `Buat Laporan`, `Kirim SOS`).
    - Cleaned `.back-arrow` symbols from subpage headers.
  - **JavaScript Dynamic Templates Cleaned (app.js)**:
    - Cleaned `<span>→</span>` from modal CTAs (WhatsApp modal, tour finish modal, booking modal, 99 keunggulan explorer).
    - Removed `→` and `←` from theme switcher navigation buttons (`Tema Sebelumnya` and `Tema Berikutnya`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #67: Dedicated Interactive Unit Product Detail Page Integration
- **Context & Objective**: Enable clickable product cards in the Unit catalog that open a dedicated, harmonized Product Detail subpage (`#unitDetailView`) for every individual unit (all 30 units across Nagoya, Tokyo, and Osaka).
- **Key Changes Implemented**:
  - **Dedicated Unit Detail View Architecture (index.html)**:
    - Built `#unitDetailView` inside `#panelUnit` with back navigation bar (`Katalog Unit`), dynamic cluster tag, lot ID title, and quick order action.
    - Hero gallery featuring 220px/280px architectural photography, status badge (Tersedia/Terjual), Japandi type subtitle, price summary strip, and estimated monthly installment.
    - 4 architecture metric cards (Kamar Tidur, Kamar Mandi, Luas Bangunan, Luas Tanah).
    - Living character & specifications section with 4 bespoke Japandi comfort highlights (Cross Ventilation, Carport Teduh, One-Gate 24h, Legalitas SHM).
    - Flexible payment schemes card (Cash Keras, Cash Bertahap 0%, KPR Express).
    - Fixed bottom floating action bar with live price, direct WhatsApp inquiry, and "Pesan Kavling Ini" primary CTA button.
  - **Interactive View Management & Dynamic Data Binding (app.js)**:
    - Upgraded `.unit-inventory-card` with `onclick="openUnitDetail('${clusterKey}', '${u.id}')"` while preserving `event.stopPropagation()` on the direct order button.
    - Implemented `openUnitDetail(clusterKey, unitId)` populating photos, titles, prices, specs, and status dynamically for all 30 units.
    - Implemented `closeUnitDetail()` returning cleanly to `#unitCatalogHub`.
    - Implemented `orderCurrentDetailUnit()` hooking into the global booking modal.
  - **Design System Harmonization (styles.css)**:
    - Applied forest green luxury palette (`#11332a` to `#1e4d40`), champagne gold accents (`#dfb96d`), 12px/14px rounded cards, and proper mobile bottom bar clearances.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #68: Remove Lighting Mood Switcher Pill Bar from Header
- **Context & Objective**: Remove the "Siang / Senja / Malam" lighting mood switcher element (`#landingLightingSwitch`) from the global sticky header (`.landing-navbar`) to keep the top bar clean and uncluttered.
- **Key Changes Implemented**:
  - **Header Cleanup (index.html)**:
    - Removed `#landingLightingSwitch` and its 3 mood buttons (`#moodDayBtn`, `#moodDuskBtn`, `#moodNightBtn`) from `.landing-nav-actions`.
    - Cleaned up top header, retaining only the brand logo and bookmark saved configuration button.
  - **Stylesheet Optimization (styles.css)**:
    - Removed `.landing-lighting-switch` and `.lighting-pill-btn` CSS styling rules.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #69: Simplify 11 Themes Header to Centered Title
- **Context & Objective**: Clean up the section header above the 11 theme chips in Surat Cinta tab (`#section99Keunggulan`), removing the tag (`99 KEUNGGULAN · SUKOHARJO`) and subtitle description, keeping only the centered title "Telusuri 11 Tema Keunggulan".
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Stripped `.section-tag` and `.section-desc`.
    - Centered `.section-title` ("Telusuri 11 Tema Keunggulan") using `text-align: center; margin: 0;`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #70: Refined Luxury Card Redesign for 'Surat Resmi Dari Pengembang' Banner
- **Context & Objective**: Elevate the visual appeal and layout structure of `.surat-compact-banner` in Surat Cinta tab, crafting an authentic luxury aesthetic with gold accents, deep forest tones, and champagne button contrast.
- **Key Changes Implemented**:
  - **Enhanced Layout & Card Hierarchy (index.html)**:
    - Grouped title and subtitle into `.surat-banner-body` for consistent text flow.
    - Wrapped CTA button in `.surat-banner-action-wrap` with improved padding and breathing room.
  - **Japandi Luxury Styling & Accents (styles.css)**:
    - Applied multi-stop deep forest gradient (`#11332a` to `#0d261f` to `#173d32`) with gold border accent (`rgba(223, 185, 109, 0.45)`) and subtle radial ambient glow (`::before`).
    - Elevated wax seal badge (`.surat-wax-badge-mini`) with champagne border and refined letter-spacing.
    - Redesigned `.btn-open-surat-modal` with warm champagne gold gradient (`linear-gradient(135deg, #dfb96d 0%, #c59b48 100%)`), deep forest typography, and smooth hover micro-interaction.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #71: Streamlined Visual-First Cluster Cards (Nagoya, Osaka, Tokyo)
- **Context & Objective**: Clean up and declutter the 3 cluster triptych cards in Surat Cinta tab, removing long paragraph descriptions, emphasizing architectural product imagery, and removing the trailing arrow from "Peta Kawasan".
- **Key Changes Implemented**:
  - **Visual-First Layout & Decluttering (index.html)**:
    - Removed long paragraph descriptions (`.cluster-card-desc`) across Nagoya, Osaka, and Tokyo cards.
    - Simplified footer to streamlined location tag (`stat-loc`) and compact action button without arrows.
    - Made the entire card surface clickable (`onclick="switchLandingTab('siteplan'); switchLandingSiteplan(...)`) for seamless navigation.
  - **Elevated Photography Dimensions (styles.css)**:
    - Increased image container height (`.cluster-card-img-wrap`) from 85px to 120px (mobile) / 135px (desktop), giving priority to visual architectural rendering.
    - Refined badge styling and unified `.btn-cluster-explore` with forest green gradient.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #72: Minimalist Header & Segmented Toggle for Gold vs Diamond Specs
- **Context & Objective**: Declutter the architectural type comparison section in Surat Cinta tab, removing wordy subtitles and aligning the pill buttons into an elegant segmented toggle.
- **Key Changes Implemented**:
  - **Header Decluttering (index.html)**:
    - Removed redundant `.section-tag` and long `.section-desc`.
    - Simplified title to clean, centered "Tipe Gold & Diamond" (`text-align: center; margin: 0;`).
  - **Segmented Control Toggle (styles.css)**:
    - Refactored `.spec-toggle-bar` into a unified segmented control capsule with subtle border (`1px solid #e8e2d5`), neutral background (`#fbfaf7`), and 4px padding.
    - Elevated active button (`.spec-tab-btn.is-active`) with forest green gradient (`#11332a` to `#1e4d40`), crisp white text, and subtle elevation shadow.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #73: Visual Photographic Enrichment & Streamlined Price Matrix
- **Context & Objective**: Transform the text-heavy and dull price list cards in Surat Cinta tab into engaging visual product cards with architectural photography banners, decluttered titles, and prominent unit selection actions.
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Removed redundant tag and description, keeping only the clean centered title "Pilihan Unit & Skema Pembayaran".
  - **Photographic Banner Integration (app.js)**:
    - In `renderPriceMatrix()`, added `.price-card-banner` with authentic architectural photo thumbnails matching each cluster (Nagoya, Tokyo, Osaka).
    - Added dark gradient overlay with bold serif unit ID, clean dimension specs, and floating "Pilih Unit" primary action pill.
  - **Modern Card Grid Styling (styles.css)**:
    - Elevated `.price-unit-card` with 12px radius, smooth hover lift (-2px), 95px banner image with 1.04x zoom hover, and 2-column pricing tiles (Cash Keras, Cash Tempo 12/24 Bulan, KPR Bank).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-22] Progress #57: Full Synchronization & Visual Alignment of Site Plan Tab with Beranda Masterplan
- **Context & Objective**: Re-engineer the dedicated Site Plan tab (`#panelSitePlan`) to exactly mirror the modern, interactive Masterplan component on Beranda (`#secMasterPlan`), ensuring 100% visual and behavioral synchronization.
- **Key Changes Implemented**:
  - **Structure & Markup Alignment (index.html)**:
    - Replaced the outdated, broken `.siteplan-page-card` markup with `.sync-masterplan-card` (`#pageMasterPlan`) matching `#secMasterPlan` 1:1.
    - Added cluster selector pills (`.cluster-pill-tabs`), cluster summary header with green SHM badge, and 4-item top specs box (Kavling, Prasarana, Sarana, RTH).
    - Integrated `.siteplan-map-container` with absolute `.siteplan-compass-badge` ("UTARA"), interactive high-precision markers (`.siteplan-lot-marker`), and smooth lot hover/active states.
    - Added the 4-column quick lot selector pills grid (`.kavling-pills-scroll`, `.kavling-pill-btn`).
    - Integrated the clean frosted inspector card (`.kavling-detail-card.clean-frosted-card`) with structured specs breakdown and synchronized forest green booking CTA (`.btn-order-kavling-champagne`).
    - Added 4-column bottom statistics grid (`.siteplan-stats-grid`).
  - **Style Unification (styles.css)**:
    - Deleted 177 lines of obsolete, conflicting CSS rules (`.siteplan-page-card`, `.sp-cluster-btn`, `.siteplan-display-wrap`, `.sp-selected-lot-box`, etc.).
    - Refactored Masterplan CSS rules to target `.sync-masterplan-card`, enabling instant, unified styling across both Beranda and Site Plan tab with zero duplication.
  - **Bi-directional Synchronization Logic (app.js)**:
    - Updated `renderBerandaMasterplanSiteplan` to simultaneously render and populate data for both Beranda and Site Plan tab elements.
    - Updated `selectBerandaLot` to sync marker active states, selector pills active states, and inspector cards across both views concurrently.
    - Synced `switchBerandaLotCluster` and `switchLandingSiteplan` so changing cluster on either page seamlessly updates both views.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #61: Redundant Unit Page Quick-Links Strip Removal
- **Context & Objective**: Remove duplicate navigation cards and horizontal quick-link bar (`.unit-page-quick-links` and `.unit-page-nav-bar`) from the Unit catalog page (`#panelUnit`), ensuring strict adherence to Rule 5 (single-source Mobile Bottom Navigation Bar) and a clean uncluttered presentation.
- **Key Changes Implemented**:
  - **Structure Simplification (index.html)**:
    - Removed redundant `.unit-page-nav-bar` ("Avenue Grand Gate · Sukoharjo", Sales Login) and `.unit-page-quick-links` ("THEPARKTOWNHOUSE", Beranda, Keunggulan, Unit, Fasilitas, Lokasi, Kalkulator, Hubungi Kami).
    - `#panelUnit` now initiates directly with `.unit-hero-header-card` ("Katalog Hunian · Pilihan Unit per Cluster").
  - **Stylesheet Optimization (styles.css)**:
    - Purged 105 lines of obsolete CSS rules (`.unit-page-nav-bar`, `.unit-nav-loc`, `.unit-nav-dot`, `.unit-nav-right`, `.unit-lang-pill`, `.unit-sales-login-link`, `.unit-page-quick-links`, `.unit-brand-logo-btn`, `.unit-quick-links-list`, `.unit-quick-link`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #62: Compact Unit Header Navbar with Clean Cluster Navigation
- **Context & Objective**: Refactor the large Unit hero card into a sleek, concise navbar header (`.unit-header-navbar`) with simplified copy and quick cluster navigation chips (Nagoya, Tokyo, Osaka).
- **Key Changes Implemented**:
  - **Navbar Layout & Simplified Copy (index.html)**:
    - Replaced heavy hero text with concise header: `Katalog Hunian` (gold tag), `Pilihan Unit` (title), and `30 Unit · Japandi Modern` (subtitle).
    - Added clean cluster jump pills (`Nagoya`, `Tokyo`, `Osaka`) that smoothly scroll directly to each cluster block on tap.
  - **Japandi Aesthetic & Mobile Styling (styles.css)**:
    - Styled `.unit-header-navbar` with deep forest green gradient (`#11332a` to `#1e4d40`), 12px rounded borders, and subtle shadow.
    - Added `.unit-nav-chip` buttons with 32px height, soft translucent background, and gold accent active states matching design system tokens.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #63: Collapsible Drawer & Horizontal Swipe Chips for Unit Filter
- **Context & Objective**: Compact the tall, multi-row Unit catalog filter card into an expandable drawer with a filter icon toggle trigger and horizontal swipeable chip scrollers.
- **Key Changes Implemented**:
  - **Collapsible Filter Drawer (index.html, styles.css, app.js)**:
    - Created `.unit-filter-toggle-btn` with funnel filter icon, live summary of active filters, active filter count badge, and animated chevron indicator.
    - Wrapped filter options in `#filterControlsWrapper`, defaulting to collapsed state to eliminate vertical clutter.
    - Added `toggleUnitFilterCard()` and `updateUnitFilterSummary()` in `app.js` to handle opening/closing and live status badge updates.
  - **Horizontal Swipeable Chip Scrollers (index.html & styles.css)**:
    - Converted wrapped multi-line chips into single-row horizontal swipe scrollers (`.filter-chips-scroller`) for Tipe Unit, Luas Tanah, Range Harga, and Posisi Kavling.
    - Added `geser ↔` hint, smooth scrolling, and touch inertia (`-webkit-overflow-scrolling: touch`) with 32px min-height tap targets conforming to Rule 5.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #64: Responsive 2-to-3 Column Layout for Unit Product Cards
- **Context & Objective**: Compact the oversized unit product cards in the catalog (`.unit-inventory-grid`) into a refined 2-column layout on mobile and 3-column layout on tablet/desktop, preventing bulky single-column stretching.
- **Key Changes Implemented**:
  - **Multi-Column Grid Architecture (styles.css)**:
    - Replaced loose `repeat(auto-fill, minmax(180px, 1fr))` with strict `grid-template-columns: repeat(2, 1fr)` on mobile (< 640px) and `repeat(3, 1fr)` on wider screens (>= 640px).
    - Reduced inter-card spacing to 8px on mobile and 12px on desktop.
  - **Compact Visual Dimensions & Typography (styles.css)**:
    - Compacted `.uic-media` height to 90px (mobile) / 105px (desktop) with 1.04x subtle zoom hover.
    - Streamlined body padding to 8px and tuned font sizes (`.uic-id`: 12.5px, `.uic-price-val`: 11.5px bold forest green, `.uic-specs`: 9.5px).
    - Compacted primary action button (`.uic-action-btn`) to 30px height with crisp 10.5px text and 4px gap.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #65: Clean Button Copy Simplification (Remove Arrow from "Pesan Kavling Ini")
- **Context & Objective**: Remove trailing arrow symbols (`→`) from the unit order CTA buttons, leaving clean and centered "Pesan Kavling Ini" copy across catalog cards and site plan inspector cards.
- **Key Changes Implemented**:
  - **Product Card Action Button (app.js)**:
    - In `renderLandingUnits()`, removed `<span>→</span>` from `.uic-action-btn`, displaying clean `<span>Pesan Kavling Ini</span>`.
  - **Site Plan Inspector Buttons (index.html)**:
    - Removed `<span>→</span>` from `.btn-order-kavling-champagne` in both Beranda (`#berandaLotInspector`) and Site Plan page (`#pageLotInspector`), standardizing text to `<span>Pesan Kavling Ini</span>`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #66: Comprehensive Arrow Symbol Removal Across All Pages
- **Context & Objective**: Remove all trailing and inline arrow symbols (`→`, `←`, `&rarr;`, `&larr;`) from buttons, links, and cards across all pages and modals for a cleaner, unified typography.
- **Key Changes Implemented**:
  - **HTML Buttons & Links Cleaned (index.html)**:
    - Removed all 44 occurrences of `<span>→</span>` from primary CTAs (CTA cards, tour buttons, showcase buttons, quiz items, facilities cards, Super App action buttons, and footer links).
    - Removed trailing arrows from Super App action triggers (`Unlock`, `Generate QR`, `Pesan Slot`, `Bayar`, `Buat Laporan`, `Kirim SOS`).
    - Cleaned `.back-arrow` symbols from subpage headers.
  - **JavaScript Dynamic Templates Cleaned (app.js)**:
    - Cleaned `<span>→</span>` from modal CTAs (WhatsApp modal, tour finish modal, booking modal, 99 keunggulan explorer).
    - Removed `→` and `←` from theme switcher navigation buttons (`Tema Sebelumnya` and `Tema Berikutnya`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #67: Dedicated Interactive Unit Product Detail Page Integration
- **Context & Objective**: Enable clickable product cards in the Unit catalog that open a dedicated, harmonized Product Detail subpage (`#unitDetailView`) for every individual unit (all 30 units across Nagoya, Tokyo, and Osaka).
- **Key Changes Implemented**:
  - **Dedicated Unit Detail View Architecture (index.html)**:
    - Built `#unitDetailView` inside `#panelUnit` with back navigation bar (`Katalog Unit`), dynamic cluster tag, lot ID title, and quick order action.
    - Hero gallery featuring 220px/280px architectural photography, status badge (Tersedia/Terjual), Japandi type subtitle, price summary strip, and estimated monthly installment.
    - 4 architecture metric cards (Kamar Tidur, Kamar Mandi, Luas Bangunan, Luas Tanah).
    - Living character & specifications section with 4 bespoke Japandi comfort highlights (Cross Ventilation, Carport Teduh, One-Gate 24h, Legalitas SHM).
    - Flexible payment schemes card (Cash Keras, Cash Bertahap 0%, KPR Express).
    - Fixed bottom floating action bar with live price, direct WhatsApp inquiry, and "Pesan Kavling Ini" primary CTA button.
  - **Interactive View Management & Dynamic Data Binding (app.js)**:
    - Upgraded `.unit-inventory-card` with `onclick="openUnitDetail('${clusterKey}', '${u.id}')"` while preserving `event.stopPropagation()` on the direct order button.
    - Implemented `openUnitDetail(clusterKey, unitId)` populating photos, titles, prices, specs, and status dynamically for all 30 units.
    - Implemented `closeUnitDetail()` returning cleanly to `#unitCatalogHub`.
    - Implemented `orderCurrentDetailUnit()` hooking into the global booking modal.
  - **Design System Harmonization (styles.css)**:
    - Applied forest green luxury palette (`#11332a` to `#1e4d40`), champagne gold accents (`#dfb96d`), 12px/14px rounded cards, and proper mobile bottom bar clearances.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #68: Remove Lighting Mood Switcher Pill Bar from Header
- **Context & Objective**: Remove the "Siang / Senja / Malam" lighting mood switcher element (`#landingLightingSwitch`) from the global sticky header (`.landing-navbar`) to keep the top bar clean and uncluttered.
- **Key Changes Implemented**:
  - **Header Cleanup (index.html)**:
    - Removed `#landingLightingSwitch` and its 3 mood buttons (`#moodDayBtn`, `#moodDuskBtn`, `#moodNightBtn`) from `.landing-nav-actions`.
    - Cleaned up top header, retaining only the brand logo and bookmark saved configuration button.
  - **Stylesheet Optimization (styles.css)**:
    - Removed `.landing-lighting-switch` and `.lighting-pill-btn` CSS styling rules.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #69: Simplify 11 Themes Header to Centered Title
- **Context & Objective**: Clean up the section header above the 11 theme chips in Surat Cinta tab (`#section99Keunggulan`), removing the tag (`99 KEUNGGULAN · SUKOHARJO`) and subtitle description, keeping only the centered title "Telusuri 11 Tema Keunggulan".
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Stripped `.section-tag` and `.section-desc`.
    - Centered `.section-title` ("Telusuri 11 Tema Keunggulan") using `text-align: center; margin: 0;`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #70: Refined Luxury Card Redesign for 'Surat Resmi Dari Pengembang' Banner
- **Context & Objective**: Elevate the visual appeal and layout structure of `.surat-compact-banner` in Surat Cinta tab, crafting an authentic luxury aesthetic with gold accents, deep forest tones, and champagne button contrast.
- **Key Changes Implemented**:
  - **Enhanced Layout & Card Hierarchy (index.html)**:
    - Grouped title and subtitle into `.surat-banner-body` for consistent text flow.
    - Wrapped CTA button in `.surat-banner-action-wrap` with improved padding and breathing room.
  - **Japandi Luxury Styling & Accents (styles.css)**:
    - Applied multi-stop deep forest gradient (`#11332a` to `#0d261f` to `#173d32`) with gold border accent (`rgba(223, 185, 109, 0.45)`) and subtle radial ambient glow (`::before`).
    - Elevated wax seal badge (`.surat-wax-badge-mini`) with champagne border and refined letter-spacing.
    - Redesigned `.btn-open-surat-modal` with warm champagne gold gradient (`linear-gradient(135deg, #dfb96d 0%, #c59b48 100%)`), deep forest typography, and smooth hover micro-interaction.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #71: Streamlined Visual-First Cluster Cards (Nagoya, Osaka, Tokyo)
- **Context & Objective**: Clean up and declutter the 3 cluster triptych cards in Surat Cinta tab, removing long paragraph descriptions, emphasizing architectural product imagery, and removing the trailing arrow from "Peta Kawasan".
- **Key Changes Implemented**:
  - **Visual-First Layout & Decluttering (index.html)**:
    - Removed long paragraph descriptions (`.cluster-card-desc`) across Nagoya, Osaka, and Tokyo cards.
    - Simplified footer to streamlined location tag (`stat-loc`) and compact action button without arrows.
    - Made the entire card surface clickable (`onclick="switchLandingTab('siteplan'); switchLandingSiteplan(...)`) for seamless navigation.
  - **Elevated Photography Dimensions (styles.css)**:
    - Increased image container height (`.cluster-card-img-wrap`) from 85px to 120px (mobile) / 135px (desktop), giving priority to visual architectural rendering.
    - Refined badge styling and unified `.btn-cluster-explore` with forest green gradient.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #72: Minimalist Header & Segmented Toggle for Gold vs Diamond Specs
- **Context & Objective**: Declutter the architectural type comparison section in Surat Cinta tab, removing wordy subtitles and aligning the pill buttons into an elegant segmented toggle.
- **Key Changes Implemented**:
  - **Header Decluttering (index.html)**:
    - Removed redundant `.section-tag` and long `.section-desc`.
    - Simplified title to clean, centered "Tipe Gold & Diamond" (`text-align: center; margin: 0;`).
  - **Segmented Control Toggle (styles.css)**:
    - Refactored `.spec-toggle-bar` into a unified segmented control capsule with subtle border (`1px solid #e8e2d5`), neutral background (`#fbfaf7`), and 4px padding.
    - Elevated active button (`.spec-tab-btn.is-active`) with forest green gradient (`#11332a` to `#1e4d40`), crisp white text, and subtle elevation shadow.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #73: Visual Photographic Enrichment & Streamlined Price Matrix
- **Context & Objective**: Transform the text-heavy and dull price list cards in Surat Cinta tab into engaging visual product cards with architectural photography banners, decluttered titles, and prominent unit selection actions.
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Removed redundant tag and description, keeping only the clean centered title "Pilihan Unit & Skema Pembayaran".
  - **Photographic Banner Integration (app.js)**:
    - In `renderPriceMatrix()`, added `.price-card-banner` with authentic architectural photo thumbnails matching each cluster (Nagoya, Tokyo, Osaka).
    - Added dark gradient overlay with bold serif unit ID, clean dimension specs, and floating "Pilih Unit" primary action pill.
  - **Modern Card Grid Styling (styles.css)**:
    - Elevated `.price-unit-card` with 12px radius, smooth hover lift (-2px), 95px banner image with 1.04x zoom hover, and 2-column pricing tiles (Cash Keras, Cash Tempo 12/24 Bulan, KPR Bank).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #58: Engaging Micro-Animations & Ergonomic Enhancement for Mobile Bottom Navigation Bar
- **Context & Objective**: Implement delightful, user-friendly micro-animations and physical spring dynamics on the mobile bottom navigation bar (`#landingBottomBar`) to keep homebuyers engaged while exploring project destinations.
- **Key Changes Implemented**:
  - **Dynamic Tab Pop & Spring Micro-Interactions (styles.css & app.js)**:
    - Added `@keyframes tabPopBounce` with spring physics (`cubic-bezier(0.34, 1.56, 0.64, 1)`) triggered whenever a tab is tapped or activated.
    - Added organic capsule backdrop highlight (`.bottom-nav-tab::before`) and animated jewel gradient indicator pill (`.bottom-nav-tab::after`) that scales and illuminates smoothly when a tab becomes active.
    - Elevated active icon (`.b-icon`) with overshoot float (`translateY(-2px) scale(1.12)`), thickened SVG stroke, and subtle forest green drop shadow.
    - Added snappy tactile haptic press feedback (`:active { transform: scale(0.92); }`).
  - **5-Column Layout & Touch Target Ergonomics (styles.css)**:
    - Configured `grid-template-columns: repeat(5, 1fr)` ensuring all 5 destinations (Beranda, Unit, Surat Cinta, Site Plan, Fasilitas) are symmetrically balanced and accessible.
    - Guaranteed minimum 48px height and 44px width touch targets conforming strictly to Rule 5.
    - Enhanced frosted glass surface (`backdrop-filter: blur(20px) saturate(180%)`) with smooth 0.4s slide-up entrance animation.
  - **Icon Aesthetics (index.html)**:
    - Replaced the confusing X-square icon on "Fasilitas" with a luxury 4-point star amenity jewel SVG icon.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #61: Redundant Unit Page Quick-Links Strip Removal
- **Context & Objective**: Remove duplicate navigation cards and horizontal quick-link bar (`.unit-page-quick-links` and `.unit-page-nav-bar`) from the Unit catalog page (`#panelUnit`), ensuring strict adherence to Rule 5 (single-source Mobile Bottom Navigation Bar) and a clean uncluttered presentation.
- **Key Changes Implemented**:
  - **Structure Simplification (index.html)**:
    - Removed redundant `.unit-page-nav-bar` ("Avenue Grand Gate · Sukoharjo", Sales Login) and `.unit-page-quick-links` ("THEPARKTOWNHOUSE", Beranda, Keunggulan, Unit, Fasilitas, Lokasi, Kalkulator, Hubungi Kami).
    - `#panelUnit` now initiates directly with `.unit-hero-header-card` ("Katalog Hunian · Pilihan Unit per Cluster").
  - **Stylesheet Optimization (styles.css)**:
    - Purged 105 lines of obsolete CSS rules (`.unit-page-nav-bar`, `.unit-nav-loc`, `.unit-nav-dot`, `.unit-nav-right`, `.unit-lang-pill`, `.unit-sales-login-link`, `.unit-page-quick-links`, `.unit-brand-logo-btn`, `.unit-quick-links-list`, `.unit-quick-link`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #62: Compact Unit Header Navbar with Clean Cluster Navigation
- **Context & Objective**: Refactor the large Unit hero card into a sleek, concise navbar header (`.unit-header-navbar`) with simplified copy and quick cluster navigation chips (Nagoya, Tokyo, Osaka).
- **Key Changes Implemented**:
  - **Navbar Layout & Simplified Copy (index.html)**:
    - Replaced heavy hero text with concise header: `Katalog Hunian` (gold tag), `Pilihan Unit` (title), and `30 Unit · Japandi Modern` (subtitle).
    - Added clean cluster jump pills (`Nagoya`, `Tokyo`, `Osaka`) that smoothly scroll directly to each cluster block on tap.
  - **Japandi Aesthetic & Mobile Styling (styles.css)**:
    - Styled `.unit-header-navbar` with deep forest green gradient (`#11332a` to `#1e4d40`), 12px rounded borders, and subtle shadow.
    - Added `.unit-nav-chip` buttons with 32px height, soft translucent background, and gold accent active states matching design system tokens.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #63: Collapsible Drawer & Horizontal Swipe Chips for Unit Filter
- **Context & Objective**: Compact the tall, multi-row Unit catalog filter card into an expandable drawer with a filter icon toggle trigger and horizontal swipeable chip scrollers.
- **Key Changes Implemented**:
  - **Collapsible Filter Drawer (index.html, styles.css, app.js)**:
    - Created `.unit-filter-toggle-btn` with funnel filter icon, live summary of active filters, active filter count badge, and animated chevron indicator.
    - Wrapped filter options in `#filterControlsWrapper`, defaulting to collapsed state to eliminate vertical clutter.
    - Added `toggleUnitFilterCard()` and `updateUnitFilterSummary()` in `app.js` to handle opening/closing and live status badge updates.
  - **Horizontal Swipeable Chip Scrollers (index.html & styles.css)**:
    - Converted wrapped multi-line chips into single-row horizontal swipe scrollers (`.filter-chips-scroller`) for Tipe Unit, Luas Tanah, Range Harga, and Posisi Kavling.
    - Added `geser ↔` hint, smooth scrolling, and touch inertia (`-webkit-overflow-scrolling: touch`) with 32px min-height tap targets conforming to Rule 5.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #64: Responsive 2-to-3 Column Layout for Unit Product Cards
- **Context & Objective**: Compact the oversized unit product cards in the catalog (`.unit-inventory-grid`) into a refined 2-column layout on mobile and 3-column layout on tablet/desktop, preventing bulky single-column stretching.
- **Key Changes Implemented**:
  - **Multi-Column Grid Architecture (styles.css)**:
    - Replaced loose `repeat(auto-fill, minmax(180px, 1fr))` with strict `grid-template-columns: repeat(2, 1fr)` on mobile (< 640px) and `repeat(3, 1fr)` on wider screens (>= 640px).
    - Reduced inter-card spacing to 8px on mobile and 12px on desktop.
  - **Compact Visual Dimensions & Typography (styles.css)**:
    - Compacted `.uic-media` height to 90px (mobile) / 105px (desktop) with 1.04x subtle zoom hover.
    - Streamlined body padding to 8px and tuned font sizes (`.uic-id`: 12.5px, `.uic-price-val`: 11.5px bold forest green, `.uic-specs`: 9.5px).
    - Compacted primary action button (`.uic-action-btn`) to 30px height with crisp 10.5px text and 4px gap.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #65: Clean Button Copy Simplification (Remove Arrow from "Pesan Kavling Ini")
- **Context & Objective**: Remove trailing arrow symbols (`→`) from the unit order CTA buttons, leaving clean and centered "Pesan Kavling Ini" copy across catalog cards and site plan inspector cards.
- **Key Changes Implemented**:
  - **Product Card Action Button (app.js)**:
    - In `renderLandingUnits()`, removed `<span>→</span>` from `.uic-action-btn`, displaying clean `<span>Pesan Kavling Ini</span>`.
  - **Site Plan Inspector Buttons (index.html)**:
    - Removed `<span>→</span>` from `.btn-order-kavling-champagne` in both Beranda (`#berandaLotInspector`) and Site Plan page (`#pageLotInspector`), standardizing text to `<span>Pesan Kavling Ini</span>`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #66: Comprehensive Arrow Symbol Removal Across All Pages
- **Context & Objective**: Remove all trailing and inline arrow symbols (`→`, `←`, `&rarr;`, `&larr;`) from buttons, links, and cards across all pages and modals for a cleaner, unified typography.
- **Key Changes Implemented**:
  - **HTML Buttons & Links Cleaned (index.html)**:
    - Removed all 44 occurrences of `<span>→</span>` from primary CTAs (CTA cards, tour buttons, showcase buttons, quiz items, facilities cards, Super App action buttons, and footer links).
    - Removed trailing arrows from Super App action triggers (`Unlock`, `Generate QR`, `Pesan Slot`, `Bayar`, `Buat Laporan`, `Kirim SOS`).
    - Cleaned `.back-arrow` symbols from subpage headers.
  - **JavaScript Dynamic Templates Cleaned (app.js)**:
    - Cleaned `<span>→</span>` from modal CTAs (WhatsApp modal, tour finish modal, booking modal, 99 keunggulan explorer).
    - Removed `→` and `←` from theme switcher navigation buttons (`Tema Sebelumnya` and `Tema Berikutnya`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #67: Dedicated Interactive Unit Product Detail Page Integration
- **Context & Objective**: Enable clickable product cards in the Unit catalog that open a dedicated, harmonized Product Detail subpage (`#unitDetailView`) for every individual unit (all 30 units across Nagoya, Tokyo, and Osaka).
- **Key Changes Implemented**:
  - **Dedicated Unit Detail View Architecture (index.html)**:
    - Built `#unitDetailView` inside `#panelUnit` with back navigation bar (`Katalog Unit`), dynamic cluster tag, lot ID title, and quick order action.
    - Hero gallery featuring 220px/280px architectural photography, status badge (Tersedia/Terjual), Japandi type subtitle, price summary strip, and estimated monthly installment.
    - 4 architecture metric cards (Kamar Tidur, Kamar Mandi, Luas Bangunan, Luas Tanah).
    - Living character & specifications section with 4 bespoke Japandi comfort highlights (Cross Ventilation, Carport Teduh, One-Gate 24h, Legalitas SHM).
    - Flexible payment schemes card (Cash Keras, Cash Bertahap 0%, KPR Express).
    - Fixed bottom floating action bar with live price, direct WhatsApp inquiry, and "Pesan Kavling Ini" primary CTA button.
  - **Interactive View Management & Dynamic Data Binding (app.js)**:
    - Upgraded `.unit-inventory-card` with `onclick="openUnitDetail('${clusterKey}', '${u.id}')"` while preserving `event.stopPropagation()` on the direct order button.
    - Implemented `openUnitDetail(clusterKey, unitId)` populating photos, titles, prices, specs, and status dynamically for all 30 units.
    - Implemented `closeUnitDetail()` returning cleanly to `#unitCatalogHub`.
    - Implemented `orderCurrentDetailUnit()` hooking into the global booking modal.
  - **Design System Harmonization (styles.css)**:
    - Applied forest green luxury palette (`#11332a` to `#1e4d40`), champagne gold accents (`#dfb96d`), 12px/14px rounded cards, and proper mobile bottom bar clearances.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #68: Remove Lighting Mood Switcher Pill Bar from Header
- **Context & Objective**: Remove the "Siang / Senja / Malam" lighting mood switcher element (`#landingLightingSwitch`) from the global sticky header (`.landing-navbar`) to keep the top bar clean and uncluttered.
- **Key Changes Implemented**:
  - **Header Cleanup (index.html)**:
    - Removed `#landingLightingSwitch` and its 3 mood buttons (`#moodDayBtn`, `#moodDuskBtn`, `#moodNightBtn`) from `.landing-nav-actions`.
    - Cleaned up top header, retaining only the brand logo and bookmark saved configuration button.
  - **Stylesheet Optimization (styles.css)**:
    - Removed `.landing-lighting-switch` and `.lighting-pill-btn` CSS styling rules.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #69: Simplify 11 Themes Header to Centered Title
- **Context & Objective**: Clean up the section header above the 11 theme chips in Surat Cinta tab (`#section99Keunggulan`), removing the tag (`99 KEUNGGULAN · SUKOHARJO`) and subtitle description, keeping only the centered title "Telusuri 11 Tema Keunggulan".
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Stripped `.section-tag` and `.section-desc`.
    - Centered `.section-title` ("Telusuri 11 Tema Keunggulan") using `text-align: center; margin: 0;`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #70: Refined Luxury Card Redesign for 'Surat Resmi Dari Pengembang' Banner
- **Context & Objective**: Elevate the visual appeal and layout structure of `.surat-compact-banner` in Surat Cinta tab, crafting an authentic luxury aesthetic with gold accents, deep forest tones, and champagne button contrast.
- **Key Changes Implemented**:
  - **Enhanced Layout & Card Hierarchy (index.html)**:
    - Grouped title and subtitle into `.surat-banner-body` for consistent text flow.
    - Wrapped CTA button in `.surat-banner-action-wrap` with improved padding and breathing room.
  - **Japandi Luxury Styling & Accents (styles.css)**:
    - Applied multi-stop deep forest gradient (`#11332a` to `#0d261f` to `#173d32`) with gold border accent (`rgba(223, 185, 109, 0.45)`) and subtle radial ambient glow (`::before`).
    - Elevated wax seal badge (`.surat-wax-badge-mini`) with champagne border and refined letter-spacing.
    - Redesigned `.btn-open-surat-modal` with warm champagne gold gradient (`linear-gradient(135deg, #dfb96d 0%, #c59b48 100%)`), deep forest typography, and smooth hover micro-interaction.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #71: Streamlined Visual-First Cluster Cards (Nagoya, Osaka, Tokyo)
- **Context & Objective**: Clean up and declutter the 3 cluster triptych cards in Surat Cinta tab, removing long paragraph descriptions, emphasizing architectural product imagery, and removing the trailing arrow from "Peta Kawasan".
- **Key Changes Implemented**:
  - **Visual-First Layout & Decluttering (index.html)**:
    - Removed long paragraph descriptions (`.cluster-card-desc`) across Nagoya, Osaka, and Tokyo cards.
    - Simplified footer to streamlined location tag (`stat-loc`) and compact action button without arrows.
    - Made the entire card surface clickable (`onclick="switchLandingTab('siteplan'); switchLandingSiteplan(...)`) for seamless navigation.
  - **Elevated Photography Dimensions (styles.css)**:
    - Increased image container height (`.cluster-card-img-wrap`) from 85px to 120px (mobile) / 135px (desktop), giving priority to visual architectural rendering.
    - Refined badge styling and unified `.btn-cluster-explore` with forest green gradient.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #72: Minimalist Header & Segmented Toggle for Gold vs Diamond Specs
- **Context & Objective**: Declutter the architectural type comparison section in Surat Cinta tab, removing wordy subtitles and aligning the pill buttons into an elegant segmented toggle.
- **Key Changes Implemented**:
  - **Header Decluttering (index.html)**:
    - Removed redundant `.section-tag` and long `.section-desc`.
    - Simplified title to clean, centered "Tipe Gold & Diamond" (`text-align: center; margin: 0;`).
  - **Segmented Control Toggle (styles.css)**:
    - Refactored `.spec-toggle-bar` into a unified segmented control capsule with subtle border (`1px solid #e8e2d5`), neutral background (`#fbfaf7`), and 4px padding.
    - Elevated active button (`.spec-tab-btn.is-active`) with forest green gradient (`#11332a` to `#1e4d40`), crisp white text, and subtle elevation shadow.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #73: Visual Photographic Enrichment & Streamlined Price Matrix
- **Context & Objective**: Transform the text-heavy and dull price list cards in Surat Cinta tab into engaging visual product cards with architectural photography banners, decluttered titles, and prominent unit selection actions.
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Removed redundant tag and description, keeping only the clean centered title "Pilihan Unit & Skema Pembayaran".
  - **Photographic Banner Integration (app.js)**:
    - In `renderPriceMatrix()`, added `.price-card-banner` with authentic architectural photo thumbnails matching each cluster (Nagoya, Tokyo, Osaka).
    - Added dark gradient overlay with bold serif unit ID, clean dimension specs, and floating "Pilih Unit" primary action pill.
  - **Modern Card Grid Styling (styles.css)**:
    - Elevated `.price-unit-card` with 12px radius, smooth hover lift (-2px), 95px banner image with 1.04x zoom hover, and 2-column pricing tiles (Cash Keras, Cash Tempo 12/24 Bulan, KPR Bank).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #59: Facility Detail Subpages Integration (Clubhouse, Super App, Hospitality)
- **Context & Objective**: Connect the Fasilitas overview page (`#panelFasilitas`) with 3 dedicated detail subpages (The Park Clubhouse, Andara Imperial Super App, and Andara Manajemen Hospitality) via "Lihat Selengkapnya →" action triggers.
- **Key Changes Implemented**:
  - **Overview Hub Action Triggers (index.html)**:
    - Added prominent "Lihat Selengkapnya →" primary CTA buttons to each of the 3 facility overview cards (`.facility-showcase-box`, `.superapp-showcase-box`, `.hospitality-showcase-box`).
    - Wrapped overview elements cleanly inside `#fasilitasMainHub`.
  - **Dedicated Facility Subpages (index.html)**:
    - **The Park Clubhouse (`#fasilitasDetail_clubhouse`)**: Built comprehensive detail view with 177,25 m² hero specs, 4 key highlight areas (Marketing Gallery, Gym & Fitness, Meeting & Lounge, Resort Pool), Spacious & Premium 4-metric breakdown, floor-by-floor specifications, outdoor amenities (Kids' Playground, BBQ & Garden Terrace), and comfort pillars.
    - **Andara Imperial Super App (`#fasilitasDetail_superapp`)**: Built smart living ecosystem view with 3 metric tiles (Online 24/7, Ver. Pro, Smart Home IoT), 6 interactive feature cards with action buttons (Smart Lock, QR Tamu, Booking Gym, Iuran IPL, Lapor Kendala, Emergency SOS), and synced feedback banner.
    - **Andara Manajemen Hospitality (`#fasilitasDetail_hospitality`)**: Built property management investment view featuring 6 core services, 4-step passive income journey, 5 investor benefits checklist, and interactive Type 60 / Type 80 ROI simulation calculator (yielding 6.9%–7.2% with full breakdown).
  - **Smooth View Transitions & Navigation Logic (app.js)**:
    - Implemented `openFasilitasDetail(slug)` and `closeFasilitasDetail()` handling view toggling, smooth scroll-to-top, and subpage pill active state management.
    - Implemented `switchHospSimType(type)` for instant real-time ROI calculation switching between Type 60 and Type 80 without page reload.
    - Updated `demoAppAction` to provide feedback across both overview and detail views.
  - **Design System Harmonization (styles.css)**:
    - Applied unified typography, clean card borders (12px radius), compact responsive grid reflows for mobile, and forest green button styling matching the Japandi luxury palette.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #61: Redundant Unit Page Quick-Links Strip Removal
- **Context & Objective**: Remove duplicate navigation cards and horizontal quick-link bar (`.unit-page-quick-links` and `.unit-page-nav-bar`) from the Unit catalog page (`#panelUnit`), ensuring strict adherence to Rule 5 (single-source Mobile Bottom Navigation Bar) and a clean uncluttered presentation.
- **Key Changes Implemented**:
  - **Structure Simplification (index.html)**:
    - Removed redundant `.unit-page-nav-bar` ("Avenue Grand Gate · Sukoharjo", Sales Login) and `.unit-page-quick-links` ("THEPARKTOWNHOUSE", Beranda, Keunggulan, Unit, Fasilitas, Lokasi, Kalkulator, Hubungi Kami).
    - `#panelUnit` now initiates directly with `.unit-hero-header-card` ("Katalog Hunian · Pilihan Unit per Cluster").
  - **Stylesheet Optimization (styles.css)**:
    - Purged 105 lines of obsolete CSS rules (`.unit-page-nav-bar`, `.unit-nav-loc`, `.unit-nav-dot`, `.unit-nav-right`, `.unit-lang-pill`, `.unit-sales-login-link`, `.unit-page-quick-links`, `.unit-brand-logo-btn`, `.unit-quick-links-list`, `.unit-quick-link`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #62: Compact Unit Header Navbar with Clean Cluster Navigation
- **Context & Objective**: Refactor the large Unit hero card into a sleek, concise navbar header (`.unit-header-navbar`) with simplified copy and quick cluster navigation chips (Nagoya, Tokyo, Osaka).
- **Key Changes Implemented**:
  - **Navbar Layout & Simplified Copy (index.html)**:
    - Replaced heavy hero text with concise header: `Katalog Hunian` (gold tag), `Pilihan Unit` (title), and `30 Unit · Japandi Modern` (subtitle).
    - Added clean cluster jump pills (`Nagoya`, `Tokyo`, `Osaka`) that smoothly scroll directly to each cluster block on tap.
  - **Japandi Aesthetic & Mobile Styling (styles.css)**:
    - Styled `.unit-header-navbar` with deep forest green gradient (`#11332a` to `#1e4d40`), 12px rounded borders, and subtle shadow.
    - Added `.unit-nav-chip` buttons with 32px height, soft translucent background, and gold accent active states matching design system tokens.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #63: Collapsible Drawer & Horizontal Swipe Chips for Unit Filter
- **Context & Objective**: Compact the tall, multi-row Unit catalog filter card into an expandable drawer with a filter icon toggle trigger and horizontal swipeable chip scrollers.
- **Key Changes Implemented**:
  - **Collapsible Filter Drawer (index.html, styles.css, app.js)**:
    - Created `.unit-filter-toggle-btn` with funnel filter icon, live summary of active filters, active filter count badge, and animated chevron indicator.
    - Wrapped filter options in `#filterControlsWrapper`, defaulting to collapsed state to eliminate vertical clutter.
    - Added `toggleUnitFilterCard()` and `updateUnitFilterSummary()` in `app.js` to handle opening/closing and live status badge updates.
  - **Horizontal Swipeable Chip Scrollers (index.html & styles.css)**:
    - Converted wrapped multi-line chips into single-row horizontal swipe scrollers (`.filter-chips-scroller`) for Tipe Unit, Luas Tanah, Range Harga, and Posisi Kavling.
    - Added `geser ↔` hint, smooth scrolling, and touch inertia (`-webkit-overflow-scrolling: touch`) with 32px min-height tap targets conforming to Rule 5.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #64: Responsive 2-to-3 Column Layout for Unit Product Cards
- **Context & Objective**: Compact the oversized unit product cards in the catalog (`.unit-inventory-grid`) into a refined 2-column layout on mobile and 3-column layout on tablet/desktop, preventing bulky single-column stretching.
- **Key Changes Implemented**:
  - **Multi-Column Grid Architecture (styles.css)**:
    - Replaced loose `repeat(auto-fill, minmax(180px, 1fr))` with strict `grid-template-columns: repeat(2, 1fr)` on mobile (< 640px) and `repeat(3, 1fr)` on wider screens (>= 640px).
    - Reduced inter-card spacing to 8px on mobile and 12px on desktop.
  - **Compact Visual Dimensions & Typography (styles.css)**:
    - Compacted `.uic-media` height to 90px (mobile) / 105px (desktop) with 1.04x subtle zoom hover.
    - Streamlined body padding to 8px and tuned font sizes (`.uic-id`: 12.5px, `.uic-price-val`: 11.5px bold forest green, `.uic-specs`: 9.5px).
    - Compacted primary action button (`.uic-action-btn`) to 30px height with crisp 10.5px text and 4px gap.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #65: Clean Button Copy Simplification (Remove Arrow from "Pesan Kavling Ini")
- **Context & Objective**: Remove trailing arrow symbols (`→`) from the unit order CTA buttons, leaving clean and centered "Pesan Kavling Ini" copy across catalog cards and site plan inspector cards.
- **Key Changes Implemented**:
  - **Product Card Action Button (app.js)**:
    - In `renderLandingUnits()`, removed `<span>→</span>` from `.uic-action-btn`, displaying clean `<span>Pesan Kavling Ini</span>`.
  - **Site Plan Inspector Buttons (index.html)**:
    - Removed `<span>→</span>` from `.btn-order-kavling-champagne` in both Beranda (`#berandaLotInspector`) and Site Plan page (`#pageLotInspector`), standardizing text to `<span>Pesan Kavling Ini</span>`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #66: Comprehensive Arrow Symbol Removal Across All Pages
- **Context & Objective**: Remove all trailing and inline arrow symbols (`→`, `←`, `&rarr;`, `&larr;`) from buttons, links, and cards across all pages and modals for a cleaner, unified typography.
- **Key Changes Implemented**:
  - **HTML Buttons & Links Cleaned (index.html)**:
    - Removed all 44 occurrences of `<span>→</span>` from primary CTAs (CTA cards, tour buttons, showcase buttons, quiz items, facilities cards, Super App action buttons, and footer links).
    - Removed trailing arrows from Super App action triggers (`Unlock`, `Generate QR`, `Pesan Slot`, `Bayar`, `Buat Laporan`, `Kirim SOS`).
    - Cleaned `.back-arrow` symbols from subpage headers.
  - **JavaScript Dynamic Templates Cleaned (app.js)**:
    - Cleaned `<span>→</span>` from modal CTAs (WhatsApp modal, tour finish modal, booking modal, 99 keunggulan explorer).
    - Removed `→` and `←` from theme switcher navigation buttons (`Tema Sebelumnya` and `Tema Berikutnya`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #67: Dedicated Interactive Unit Product Detail Page Integration
- **Context & Objective**: Enable clickable product cards in the Unit catalog that open a dedicated, harmonized Product Detail subpage (`#unitDetailView`) for every individual unit (all 30 units across Nagoya, Tokyo, and Osaka).
- **Key Changes Implemented**:
  - **Dedicated Unit Detail View Architecture (index.html)**:
    - Built `#unitDetailView` inside `#panelUnit` with back navigation bar (`Katalog Unit`), dynamic cluster tag, lot ID title, and quick order action.
    - Hero gallery featuring 220px/280px architectural photography, status badge (Tersedia/Terjual), Japandi type subtitle, price summary strip, and estimated monthly installment.
    - 4 architecture metric cards (Kamar Tidur, Kamar Mandi, Luas Bangunan, Luas Tanah).
    - Living character & specifications section with 4 bespoke Japandi comfort highlights (Cross Ventilation, Carport Teduh, One-Gate 24h, Legalitas SHM).
    - Flexible payment schemes card (Cash Keras, Cash Bertahap 0%, KPR Express).
    - Fixed bottom floating action bar with live price, direct WhatsApp inquiry, and "Pesan Kavling Ini" primary CTA button.
  - **Interactive View Management & Dynamic Data Binding (app.js)**:
    - Upgraded `.unit-inventory-card` with `onclick="openUnitDetail('${clusterKey}', '${u.id}')"` while preserving `event.stopPropagation()` on the direct order button.
    - Implemented `openUnitDetail(clusterKey, unitId)` populating photos, titles, prices, specs, and status dynamically for all 30 units.
    - Implemented `closeUnitDetail()` returning cleanly to `#unitCatalogHub`.
    - Implemented `orderCurrentDetailUnit()` hooking into the global booking modal.
  - **Design System Harmonization (styles.css)**:
    - Applied forest green luxury palette (`#11332a` to `#1e4d40`), champagne gold accents (`#dfb96d`), 12px/14px rounded cards, and proper mobile bottom bar clearances.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #68: Remove Lighting Mood Switcher Pill Bar from Header
- **Context & Objective**: Remove the "Siang / Senja / Malam" lighting mood switcher element (`#landingLightingSwitch`) from the global sticky header (`.landing-navbar`) to keep the top bar clean and uncluttered.
- **Key Changes Implemented**:
  - **Header Cleanup (index.html)**:
    - Removed `#landingLightingSwitch` and its 3 mood buttons (`#moodDayBtn`, `#moodDuskBtn`, `#moodNightBtn`) from `.landing-nav-actions`.
    - Cleaned up top header, retaining only the brand logo and bookmark saved configuration button.
  - **Stylesheet Optimization (styles.css)**:
    - Removed `.landing-lighting-switch` and `.lighting-pill-btn` CSS styling rules.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #69: Simplify 11 Themes Header to Centered Title
- **Context & Objective**: Clean up the section header above the 11 theme chips in Surat Cinta tab (`#section99Keunggulan`), removing the tag (`99 KEUNGGULAN · SUKOHARJO`) and subtitle description, keeping only the centered title "Telusuri 11 Tema Keunggulan".
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Stripped `.section-tag` and `.section-desc`.
    - Centered `.section-title` ("Telusuri 11 Tema Keunggulan") using `text-align: center; margin: 0;`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #70: Refined Luxury Card Redesign for 'Surat Resmi Dari Pengembang' Banner
- **Context & Objective**: Elevate the visual appeal and layout structure of `.surat-compact-banner` in Surat Cinta tab, crafting an authentic luxury aesthetic with gold accents, deep forest tones, and champagne button contrast.
- **Key Changes Implemented**:
  - **Enhanced Layout & Card Hierarchy (index.html)**:
    - Grouped title and subtitle into `.surat-banner-body` for consistent text flow.
    - Wrapped CTA button in `.surat-banner-action-wrap` with improved padding and breathing room.
  - **Japandi Luxury Styling & Accents (styles.css)**:
    - Applied multi-stop deep forest gradient (`#11332a` to `#0d261f` to `#173d32`) with gold border accent (`rgba(223, 185, 109, 0.45)`) and subtle radial ambient glow (`::before`).
    - Elevated wax seal badge (`.surat-wax-badge-mini`) with champagne border and refined letter-spacing.
    - Redesigned `.btn-open-surat-modal` with warm champagne gold gradient (`linear-gradient(135deg, #dfb96d 0%, #c59b48 100%)`), deep forest typography, and smooth hover micro-interaction.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #71: Streamlined Visual-First Cluster Cards (Nagoya, Osaka, Tokyo)
- **Context & Objective**: Clean up and declutter the 3 cluster triptych cards in Surat Cinta tab, removing long paragraph descriptions, emphasizing architectural product imagery, and removing the trailing arrow from "Peta Kawasan".
- **Key Changes Implemented**:
  - **Visual-First Layout & Decluttering (index.html)**:
    - Removed long paragraph descriptions (`.cluster-card-desc`) across Nagoya, Osaka, and Tokyo cards.
    - Simplified footer to streamlined location tag (`stat-loc`) and compact action button without arrows.
    - Made the entire card surface clickable (`onclick="switchLandingTab('siteplan'); switchLandingSiteplan(...)`) for seamless navigation.
  - **Elevated Photography Dimensions (styles.css)**:
    - Increased image container height (`.cluster-card-img-wrap`) from 85px to 120px (mobile) / 135px (desktop), giving priority to visual architectural rendering.
    - Refined badge styling and unified `.btn-cluster-explore` with forest green gradient.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #72: Minimalist Header & Segmented Toggle for Gold vs Diamond Specs
- **Context & Objective**: Declutter the architectural type comparison section in Surat Cinta tab, removing wordy subtitles and aligning the pill buttons into an elegant segmented toggle.
- **Key Changes Implemented**:
  - **Header Decluttering (index.html)**:
    - Removed redundant `.section-tag` and long `.section-desc`.
    - Simplified title to clean, centered "Tipe Gold & Diamond" (`text-align: center; margin: 0;`).
  - **Segmented Control Toggle (styles.css)**:
    - Refactored `.spec-toggle-bar` into a unified segmented control capsule with subtle border (`1px solid #e8e2d5`), neutral background (`#fbfaf7`), and 4px padding.
    - Elevated active button (`.spec-tab-btn.is-active`) with forest green gradient (`#11332a` to `#1e4d40`), crisp white text, and subtle elevation shadow.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #73: Visual Photographic Enrichment & Streamlined Price Matrix
- **Context & Objective**: Transform the text-heavy and dull price list cards in Surat Cinta tab into engaging visual product cards with architectural photography banners, decluttered titles, and prominent unit selection actions.
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Removed redundant tag and description, keeping only the clean centered title "Pilihan Unit & Skema Pembayaran".
  - **Photographic Banner Integration (app.js)**:
    - In `renderPriceMatrix()`, added `.price-card-banner` with authentic architectural photo thumbnails matching each cluster (Nagoya, Tokyo, Osaka).
    - Added dark gradient overlay with bold serif unit ID, clean dimension specs, and floating "Pilih Unit" primary action pill.
  - **Modern Card Grid Styling (styles.css)**:
    - Elevated `.price-unit-card` with 12px radius, smooth hover lift (-2px), 95px banner image with 1.04x zoom hover, and 2-column pricing tiles (Cash Keras, Cash Tempo 12/24 Bulan, KPR Bank).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #60: Rich Visual Asset Enrichment & Interactive Lighting Mood Engine
- **Context & Objective**: Elevate all post-save configuration views (Beranda, Unit, Surat Cinta, Site Plan, Fasilitas) with rich photographic imagery, dynamic brightness & ambiance controls, while strictly preserving synchronized Japandi typography, layout, and palette.
- **Key Changes Implemented**:
  - **Lighting Mood Engine & Interactive Ambiance Switcher (styles.css & app.js & index.html)**:
    - Implemented `.landing-lighting-switch` in the top sticky navigation bar supporting 3 realistic ambiance presets: `☀️ Siang Alami` (standard crisp daylight), `🌅 Senja Golden Hour` (warm golden tone with subtle sepia warmth), and `🌙 Malam Teduh` (atmospheric twilight with illuminated accents).
    - Driven by CSS variables (`--img-brightness`, `--img-contrast`, `--img-saturate`, `--img-filter`) updating all architectural photographs across all tabs concurrently without jarring reloads.
    - Added subtle image hover micro-interactions across all cards (brightening by +8% and gentle 1.03x scale with smooth cubic-bezier transitions).
  - **Rich Photographic Asset Enrichment (index.html & styles.css)**:
    - **4 Pilar Investasi (Beranda)**: Transformed plain text cards into photographic vignettes featuring `aerial-drone.jpeg` (Unit Terbatas), `clubhouse.png` (Keunggulan Kawasan), `gate.png` (Capital Gain 18%), and `house.jpeg` (Booking Perdana).
    - **Clubhouse Highlight Areas (Fasilitas Detail)**: Replaced icon tiles with authentic photography preview cards (`gate.png`, `room-bersama.jpg`, `dalam-6.png`, `clubhousee.png`).
    - **Hospitality Services (Hospitality Detail)**: Upgraded all 6 service cards with dedicated image headers (`aerial-drone.jpeg`, `dalam-9.png`, `dalam-6.png`, `gate.png`, `housee.jpeg`, `dalam-12.png`).
  - **Strict Synchronization Enforced**:
    - Kept 860px centered max-width, 12px rounded cards, 38px forest green buttons, and Japandi neutral surfaces across all panels.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #61: Redundant Unit Page Quick-Links Strip Removal
- **Context & Objective**: Remove duplicate navigation cards and horizontal quick-link bar (`.unit-page-quick-links` and `.unit-page-nav-bar`) from the Unit catalog page (`#panelUnit`), ensuring strict adherence to Rule 5 (single-source Mobile Bottom Navigation Bar) and a clean uncluttered presentation.
- **Key Changes Implemented**:
  - **Structure Simplification (index.html)**:
    - Removed redundant `.unit-page-nav-bar` ("Avenue Grand Gate · Sukoharjo", Sales Login) and `.unit-page-quick-links` ("THEPARKTOWNHOUSE", Beranda, Keunggulan, Unit, Fasilitas, Lokasi, Kalkulator, Hubungi Kami).
    - `#panelUnit` now initiates directly with `.unit-hero-header-card` ("Katalog Hunian · Pilihan Unit per Cluster").
  - **Stylesheet Optimization (styles.css)**:
    - Purged 105 lines of obsolete CSS rules (`.unit-page-nav-bar`, `.unit-nav-loc`, `.unit-nav-dot`, `.unit-nav-right`, `.unit-lang-pill`, `.unit-sales-login-link`, `.unit-page-quick-links`, `.unit-brand-logo-btn`, `.unit-quick-links-list`, `.unit-quick-link`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #62: Compact Unit Header Navbar with Clean Cluster Navigation
- **Context & Objective**: Refactor the large Unit hero card into a sleek, concise navbar header (`.unit-header-navbar`) with simplified copy and quick cluster navigation chips (Nagoya, Tokyo, Osaka).
- **Key Changes Implemented**:
  - **Navbar Layout & Simplified Copy (index.html)**:
    - Replaced heavy hero text with concise header: `Katalog Hunian` (gold tag), `Pilihan Unit` (title), and `30 Unit · Japandi Modern` (subtitle).
    - Added clean cluster jump pills (`Nagoya`, `Tokyo`, `Osaka`) that smoothly scroll directly to each cluster block on tap.
  - **Japandi Aesthetic & Mobile Styling (styles.css)**:
    - Styled `.unit-header-navbar` with deep forest green gradient (`#11332a` to `#1e4d40`), 12px rounded borders, and subtle shadow.
    - Added `.unit-nav-chip` buttons with 32px height, soft translucent background, and gold accent active states matching design system tokens.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #63: Collapsible Drawer & Horizontal Swipe Chips for Unit Filter
- **Context & Objective**: Compact the tall, multi-row Unit catalog filter card into an expandable drawer with a filter icon toggle trigger and horizontal swipeable chip scrollers.
- **Key Changes Implemented**:
  - **Collapsible Filter Drawer (index.html, styles.css, app.js)**:
    - Created `.unit-filter-toggle-btn` with funnel filter icon, live summary of active filters, active filter count badge, and animated chevron indicator.
    - Wrapped filter options in `#filterControlsWrapper`, defaulting to collapsed state to eliminate vertical clutter.
    - Added `toggleUnitFilterCard()` and `updateUnitFilterSummary()` in `app.js` to handle opening/closing and live status badge updates.
  - **Horizontal Swipeable Chip Scrollers (index.html & styles.css)**:
    - Converted wrapped multi-line chips into single-row horizontal swipe scrollers (`.filter-chips-scroller`) for Tipe Unit, Luas Tanah, Range Harga, and Posisi Kavling.
    - Added `geser ↔` hint, smooth scrolling, and touch inertia (`-webkit-overflow-scrolling: touch`) with 32px min-height tap targets conforming to Rule 5.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #64: Responsive 2-to-3 Column Layout for Unit Product Cards
- **Context & Objective**: Compact the oversized unit product cards in the catalog (`.unit-inventory-grid`) into a refined 2-column layout on mobile and 3-column layout on tablet/desktop, preventing bulky single-column stretching.
- **Key Changes Implemented**:
  - **Multi-Column Grid Architecture (styles.css)**:
    - Replaced loose `repeat(auto-fill, minmax(180px, 1fr))` with strict `grid-template-columns: repeat(2, 1fr)` on mobile (< 640px) and `repeat(3, 1fr)` on wider screens (>= 640px).
    - Reduced inter-card spacing to 8px on mobile and 12px on desktop.
  - **Compact Visual Dimensions & Typography (styles.css)**:
    - Compacted `.uic-media` height to 90px (mobile) / 105px (desktop) with 1.04x subtle zoom hover.
    - Streamlined body padding to 8px and tuned font sizes (`.uic-id`: 12.5px, `.uic-price-val`: 11.5px bold forest green, `.uic-specs`: 9.5px).
    - Compacted primary action button (`.uic-action-btn`) to 30px height with crisp 10.5px text and 4px gap.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #65: Clean Button Copy Simplification (Remove Arrow from "Pesan Kavling Ini")
- **Context & Objective**: Remove trailing arrow symbols (`→`) from the unit order CTA buttons, leaving clean and centered "Pesan Kavling Ini" copy across catalog cards and site plan inspector cards.
- **Key Changes Implemented**:
  - **Product Card Action Button (app.js)**:
    - In `renderLandingUnits()`, removed `<span>→</span>` from `.uic-action-btn`, displaying clean `<span>Pesan Kavling Ini</span>`.
  - **Site Plan Inspector Buttons (index.html)**:
    - Removed `<span>→</span>` from `.btn-order-kavling-champagne` in both Beranda (`#berandaLotInspector`) and Site Plan page (`#pageLotInspector`), standardizing text to `<span>Pesan Kavling Ini</span>`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #66: Comprehensive Arrow Symbol Removal Across All Pages
- **Context & Objective**: Remove all trailing and inline arrow symbols (`→`, `←`, `&rarr;`, `&larr;`) from buttons, links, and cards across all pages and modals for a cleaner, unified typography.
- **Key Changes Implemented**:
  - **HTML Buttons & Links Cleaned (index.html)**:
    - Removed all 44 occurrences of `<span>→</span>` from primary CTAs (CTA cards, tour buttons, showcase buttons, quiz items, facilities cards, Super App action buttons, and footer links).
    - Removed trailing arrows from Super App action triggers (`Unlock`, `Generate QR`, `Pesan Slot`, `Bayar`, `Buat Laporan`, `Kirim SOS`).
    - Cleaned `.back-arrow` symbols from subpage headers.
  - **JavaScript Dynamic Templates Cleaned (app.js)**:
    - Cleaned `<span>→</span>` from modal CTAs (WhatsApp modal, tour finish modal, booking modal, 99 keunggulan explorer).
    - Removed `→` and `←` from theme switcher navigation buttons (`Tema Sebelumnya` and `Tema Berikutnya`).
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #67: Dedicated Interactive Unit Product Detail Page Integration
- **Context & Objective**: Enable clickable product cards in the Unit catalog that open a dedicated, harmonized Product Detail subpage (`#unitDetailView`) for every individual unit (all 30 units across Nagoya, Tokyo, and Osaka).
- **Key Changes Implemented**:
  - **Dedicated Unit Detail View Architecture (index.html)**:
    - Built `#unitDetailView` inside `#panelUnit` with back navigation bar (`Katalog Unit`), dynamic cluster tag, lot ID title, and quick order action.
    - Hero gallery featuring 220px/280px architectural photography, status badge (Tersedia/Terjual), Japandi type subtitle, price summary strip, and estimated monthly installment.
    - 4 architecture metric cards (Kamar Tidur, Kamar Mandi, Luas Bangunan, Luas Tanah).
    - Living character & specifications section with 4 bespoke Japandi comfort highlights (Cross Ventilation, Carport Teduh, One-Gate 24h, Legalitas SHM).
    - Flexible payment schemes card (Cash Keras, Cash Bertahap 0%, KPR Express).
    - Fixed bottom floating action bar with live price, direct WhatsApp inquiry, and "Pesan Kavling Ini" primary CTA button.
  - **Interactive View Management & Dynamic Data Binding (app.js)**:
    - Upgraded `.unit-inventory-card` with `onclick="openUnitDetail('${clusterKey}', '${u.id}')"` while preserving `event.stopPropagation()` on the direct order button.
    - Implemented `openUnitDetail(clusterKey, unitId)` populating photos, titles, prices, specs, and status dynamically for all 30 units.
    - Implemented `closeUnitDetail()` returning cleanly to `#unitCatalogHub`.
    - Implemented `orderCurrentDetailUnit()` hooking into the global booking modal.
  - **Design System Harmonization (styles.css)**:
    - Applied forest green luxury palette (`#11332a` to `#1e4d40`), champagne gold accents (`#dfb96d`), 12px/14px rounded cards, and proper mobile bottom bar clearances.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #68: Remove Lighting Mood Switcher Pill Bar from Header
- **Context & Objective**: Remove the "Siang / Senja / Malam" lighting mood switcher element (`#landingLightingSwitch`) from the global sticky header (`.landing-navbar`) to keep the top bar clean and uncluttered.
- **Key Changes Implemented**:
  - **Header Cleanup (index.html)**:
    - Removed `#landingLightingSwitch` and its 3 mood buttons (`#moodDayBtn`, `#moodDuskBtn`, `#moodNightBtn`) from `.landing-nav-actions`.
    - Cleaned up top header, retaining only the brand logo and bookmark saved configuration button.
  - **Stylesheet Optimization (styles.css)**:
    - Removed `.landing-lighting-switch` and `.lighting-pill-btn` CSS styling rules.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #69: Simplify 11 Themes Header to Centered Title
- **Context & Objective**: Clean up the section header above the 11 theme chips in Surat Cinta tab (`#section99Keunggulan`), removing the tag (`99 KEUNGGULAN · SUKOHARJO`) and subtitle description, keeping only the centered title "Telusuri 11 Tema Keunggulan".
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Stripped `.section-tag` and `.section-desc`.
    - Centered `.section-title` ("Telusuri 11 Tema Keunggulan") using `text-align: center; margin: 0;`.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #70: Refined Luxury Card Redesign for 'Surat Resmi Dari Pengembang' Banner
- **Context & Objective**: Elevate the visual appeal and layout structure of `.surat-compact-banner` in Surat Cinta tab, crafting an authentic luxury aesthetic with gold accents, deep forest tones, and champagne button contrast.
- **Key Changes Implemented**:
  - **Enhanced Layout & Card Hierarchy (index.html)**:
    - Grouped title and subtitle into `.surat-banner-body` for consistent text flow.
    - Wrapped CTA button in `.surat-banner-action-wrap` with improved padding and breathing room.
  - **Japandi Luxury Styling & Accents (styles.css)**:
    - Applied multi-stop deep forest gradient (`#11332a` to `#0d261f` to `#173d32`) with gold border accent (`rgba(223, 185, 109, 0.45)`) and subtle radial ambient glow (`::before`).
    - Elevated wax seal badge (`.surat-wax-badge-mini`) with champagne border and refined letter-spacing.
    - Redesigned `.btn-open-surat-modal` with warm champagne gold gradient (`linear-gradient(135deg, #dfb96d 0%, #c59b48 100%)`), deep forest typography, and smooth hover micro-interaction.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #71: Streamlined Visual-First Cluster Cards (Nagoya, Osaka, Tokyo)
- **Context & Objective**: Clean up and declutter the 3 cluster triptych cards in Surat Cinta tab, removing long paragraph descriptions, emphasizing architectural product imagery, and removing the trailing arrow from "Peta Kawasan".
- **Key Changes Implemented**:
  - **Visual-First Layout & Decluttering (index.html)**:
    - Removed long paragraph descriptions (`.cluster-card-desc`) across Nagoya, Osaka, and Tokyo cards.
    - Simplified footer to streamlined location tag (`stat-loc`) and compact action button without arrows.
    - Made the entire card surface clickable (`onclick="switchLandingTab('siteplan'); switchLandingSiteplan(...)`) for seamless navigation.
  - **Elevated Photography Dimensions (styles.css)**:
    - Increased image container height (`.cluster-card-img-wrap`) from 85px to 120px (mobile) / 135px (desktop), giving priority to visual architectural rendering.
    - Refined badge styling and unified `.btn-cluster-explore` with forest green gradient.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #72: Minimalist Header & Segmented Toggle for Gold vs Diamond Specs
- **Context & Objective**: Declutter the architectural type comparison section in Surat Cinta tab, removing wordy subtitles and aligning the pill buttons into an elegant segmented toggle.
- **Key Changes Implemented**:
  - **Header Decluttering (index.html)**:
    - Removed redundant `.section-tag` and long `.section-desc`.
    - Simplified title to clean, centered "Tipe Gold & Diamond" (`text-align: center; margin: 0;`).
  - **Segmented Control Toggle (styles.css)**:
    - Refactored `.spec-toggle-bar` into a unified segmented control capsule with subtle border (`1px solid #e8e2d5`), neutral background (`#fbfaf7`), and 4px padding.
    - Elevated active button (`.spec-tab-btn.is-active`) with forest green gradient (`#11332a` to `#1e4d40`), crisp white text, and subtle elevation shadow.
- **Status**: Completed, Verified & Auto-Pushed.

---

### [2026-11-23] Progress #73: Visual Photographic Enrichment & Streamlined Price Matrix
- **Context & Objective**: Transform the text-heavy and dull price list cards in Surat Cinta tab into engaging visual product cards with architectural photography banners, decluttered titles, and prominent unit selection actions.
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Removed redundant tag and description, keeping only the clean centered title "Pilihan Unit & Skema Pembayaran".
  - **Photographic Banner Integration (app.js)**:
    - In `renderPriceMatrix()`, added `.price-card-banner` with authentic architectural photo thumbnails matching each cluster (Nagoya, Tokyo, Osaka).
    - Added dark gradient overlay with bold serif unit ID, clean dimension specs, and floating "Pilih Unit" primary action pill.
  - **Modern Card Grid Styling (styles.css)**:
    - Elevated `.price-unit-card` with 12px radius, smooth hover lift (-2px), 95px banner image with 1.04x zoom hover, and 2-column pricing tiles (Cash Keras, Cash Tempo 12/24 Bulan, KPR Bank).
- **Status**: Completed, Verified & Auto-Pushed.


---

### [2026-11-23] Progress #74: Clean Centered Header for Peta Masterplan Kawasan
- **Context & Objective**: Clean up the section header above the masterplan map in Site Plan tab (`#pageMasterPlan`), removing the tag (`DENAH KAWASAN`) and subtitle description, keeping only the centered title "Peta Masterplan Kawasan".
- **Key Changes Implemented**:
  - **Header Simplification (index.html)**:
    - Removed `.section-tag-gold` ("DENAH KAWASAN") and `.section-card-sub` ("Pilih klaster untuk melihat posisi kavling...").
    - Centered `.section-card-title` ("Peta Masterplan Kawasan") with clean text alignment and balanced margins.
- **Status**: Completed, Verified & Auto-Pushed.


---

### [2026-11-23] Progress #75: Compact Layout & Optimized Typography Across Post-Save Landing Pages
- **Context & Objective**: Prevent oversized layout sprawl and reduce font sizes across all post-save landing pages (Beranda, Unit, Surat Cinta, Site Plan, Fasilitas, Unit Detail, dan Saved Config Drawer), creating a compact, elegant, and balanced mobile-first aesthetic.
- **Key Changes Implemented**:
  - **Layout Width Standardization (styles.css)**:
    - Tightened `.landing-tab-panel`, `.surat-magazine-container`, `#panelSitePlan`, `.unit-catalog-page-container`, and `.unit-detail-page-container` from `max-width: 860px / 820px` to compact `max-width: 480px; margin: 0 auto;`.
    - Centered and constrained `.saved-config-drawer` to `max-width: 480px; margin: 0 auto;` with reduced padding (`16px 14px 28px` instead of `20px 18px 36px`).
    - Reduced `.landing-section-card` padding to `12px 14px` and gap to `10px`.
  - **Typography & Font Sizing Adjustments (styles.css)**:
    - Reduced `.section-title` from `19px` to clean `16px`.
    - Reduced `.drawer-title` from `18px` to `15.5px` and `.drawer-badge` to `9px`.
    - Reduced `.section-desc` line-height and font-size to `10.5px / 1.45`.
- **Status**: Completed, Verified & Auto-Pushed.


---

### [2026-11-23] Progress #76: Add Visual Hero Photography & Replace Emojis with Clean SVG Icons on Super App Page
- **Context & Objective**: Elevate the Super App subpage (`#fasilitasDetail_superapp`) with authentic architectural photography, eliminate decorative emoji icons (`🔐`, `🎫`, `🏊`, `🧾`, `🛠️`, `🚨`), strip remaining arrow symbols, and harmonize the aesthetic with the luxury Japandi design system used throughout the site.
- **Key Changes Implemented**:
  - **Photographic Banner Integration (index.html)**:
    - Added full-bleed `.f-detail-hero-wrap` featuring gate & security access photography (`assets/drive/gate.png`), dark forest gradient overlay, gold eyebrow tag, and concise headline text.
  - **Emoji Removal & Precision SVG Replacement (index.html & styles.css)**:
    - Replaced all 6 emoji symbols with clean inline SVG architectural line icons (`.sa-svg-icon` with forest green container accents).
    - Emergency SOS card styled with a distinctive crimson accent `.sa-svg-sos`.
  - **Button & Typography Harmonization (index.html & styles.css)**:
    - Stripped trailing arrow symbols `→` from action buttons and back buttons.
    - Upgraded `.sa-card-action` from plain underline text to polished pill-style buttons with hover micro-interactions.
- **Status**: Completed, Verified & Auto-Pushed.


---

### [2026-11-23] Progress #77: Streamline Hospitality Hero Layout & Photographic Header
- **Context & Objective**: Clean up the text-heavy and crowded Andara Manajemen Hospitality hero card (`#fasilitasDetail_hospitality`), adding an architectural drone hero image banner, condensing paragraph copy, stripping arrow symbols (`→`, `↓`, `←`), and balancing whitespace/gaps.
- **Key Changes Implemented**:
  - **Visual Photographic Integration (index.html)**:
    - Integrated `.f-detail-hero-wrap` featuring aerial drone photography (`assets/drive/aerial-drone.jpeg`), dark gradient overlay, and gold typography.
  - **Decluttering & Spacing (index.html)**:
    - Condensed wordy paragraph text down to one crisp sentence: "Kelola unit sewa dengan standar bintang lima untuk penghasilan pasif maksimal tanpa repot."
    - Centered badge pills row (`Full-Service`, `6–8% p.a. Yield`, `Laporan Transparan`).
    - Cleaned buttons removing `→` and `↓`, aligning them side-by-side with balanced 10px spacing.
- **Status**: Completed, Verified & Auto-Pushed.


---

### [2026-11-23] Progress #78: Global Auto Layout System Standardization
- **Context & Objective**: Standardize layout architecture across all pages into pure Auto Layout (Flexbox & CSS Grid auto-flow), eliminating rigid fixed-height constraints and ensuring elements adapt dynamically with fluid hug/fill behavior.
- **Key Changes Implemented**:
  - **Global Auto Layout Engine (styles.css)**:
    - Standardized all panel containers (`.landing-tab-panel`, `.landing-section-card`, `.surat-magazine-container`, `.fasilitas-subpage`, `.unit-catalog-page-container`, `.unit-detail-page-container`, `.sync-masterplan-card`) to `display: flex !important; flex-direction: column !important; height: auto !important; width: 100% !important; box-sizing: border-box !important;`.
    - Removed rigid height clipping on content cards (`.landing-section-card`, `.uic-body`, `.sa-feature-card`, `.hosp-service-card`, `.cluster-triptych-card`, `.price-unit-card`).
    - Standardized button and pill groups (`.f-cta-btns-row`, `.f-badge-pills-row`, `.cluster-pill-tabs`, `.fasilitas-subpage-pills`, `.theme-chips-scroll`, `.unit-filter-pills`) into auto-wrapping flex layouts with consistent `gap: 8px`.
- **Status**: Completed, Verified & Auto-Pushed.


---

### [2026-11-23] Progress #79: Refactor Fasilitas Navigation Bar with Frameless Centered Title & Segmented Pills
- **Context & Objective**: Re-architect the navigation bar on the Fasilitas tab and subpages (`#panelFasilitas`, `#fasilitasDetail_clubhouse`, `#fasilitasDetail_superapp`, `#fasilitasDetail_hospitality`), replacing the boxed back button with a clean, frameless centered title "Fasilitas" and pairing it with a cohesive segmented pill control (`Clubhouse`, `Super App`, `Hospitality`).
- **Key Changes Implemented**:
  - **Frameless Centered Header (index.html)**:
    - Replaced boxed `btn-back-fasilitas` across all Fasilitas subpages and main hub with frameless, centered `.fasilitas-nav-title` ("Fasilitas").
  - **Segmented Capsule Bar (styles.css)**:
    - Replaced loose pills with rounded capsule bar (`.fasilitas-subpage-pills`) in warm oat tone (`#ede6da`), white active pill, and subtle inset shadow matching the user's reference screenshot.
    - Added vertical column alignment with 10px spacing in `.fasilitas-subpage-header`.
- **Status**: Completed, Verified & Auto-Pushed.


---

### [2026-11-23] Progress #80: Refactor Leaflet Masterplan Map Layout, Declutter Markers & Externalize Legend
- **Context & Objective**: Resolve heavy visual clutter and marker collision on the interactive Leaflet masterplan map (`#berandaLeafletMap`), where labels (`Osaka`, `Nagoya`, `Tokyo`, `RSUD`, `SMAN 1`, `Alun-Alun`) and overlays collided and occluded the map view.
- **Key Changes Implemented**:
  - **Map Frame & Container Architecture (`index.html`, `styles.css`)**:
    - Wrapped map in `.beranda-map-container` with 16px radius, warm border, and subtle shadow.
    - Expanded map frame height from cramped 250px to 320px for ample vertical clearance.
    - Moved the 4-tier circle legend (`.map-legend-bar`) OUTSIDE the map canvas into an attached bottom bar, eliminating all occlusion on mobile screens.
    - Moved `.map-scroll-hint-pill` to top-left with subtle backdrop blur and compact 9.5px font.
  - **Marker Collision Prevention & Sector Distribution (`app.js`, `styles.css`)**:
    - Dispersed cluster and facility pins across distinct quadrants (North: Osaka, Center: Townhouse, East: Nagoya, West: Tokyo, South: RSUD, Southeast: SMAN 1, Southwest: Alun-Alun, Far South: Stasiun).
    - Compacted cluster pill markers (`84x24px`, 10px text) and facility pill markers (`76x22px`, 9.5px text).
    - Filtered out duplicate POI circle markers from `BERANDA_POIS` so primary facilities are not rendered twice.
    - Dispersed `BERANDA_POIS` coordinates across Sukoharjo to prevent point bunching.
- **Status**: Completed, Verified & Auto-Pushed.


---

### [2026-11-23] Progress #81: Synchronize Beranda Leaflet Map Display & Behavior Identically to Ruang Peta (Room 03)
- **Context & Objective**: Per user request ("buat tampilannya agar sama dengan ruang peta"), completely align the Beranda tab map section with `ROOM 03 · RUANG PETA` (`#room-3`).
- **Key Changes Implemented**:
  - **HTML Structure Unification (`index.html`)**:
    - Removed extraneous `.beranda-radius-analysis-card`, `.poi-category-bar`, and `.poi-interactive-list`.
    - Integrated `.map-visual-card.is-hero-tall` with `#berandaLeafletMap`, `.map-scroll-hint-pill`, and interactive `.map-location-card` (`#berandaLocationCard`).
    - Added the exact horizontal `.distance-chips` row (`Sudirman 1 mnt`, `Gelora Merdeka 2 mnt`, `Alun-Alun 3 mnt`, `SMAN 1 5 mnt`, `RSUD Soekarno 6 mnt`, `Stasiun 7 mnt`, `RS Indriati 12 mnt`, `Pakuwon Mall 14 mnt`).
  - **CSS Styling Integration (`styles.css`)**:
    - Added bespoke light-theme styling for `.landing-section-card .dist-chip` with clean forest green active state (`#11332a`) and warm gold text (`#dfb96d`).
  - **Shared Engine & Interactive Behavior (`app.js`)**:
    - Re-wired `initBerandaLeafletMap()` to instantiate via `setupLeafletMap('berandaLeafletMap', false, true)`, rendering the exact concentric circles (Circle 1: 1000m, Circle 2: 2500m, Circle 3: 4500m), `.center-home-divicon`, `.cluster-pill-divicon`, and `.facility-pin-divicon`.
    - Extended `openFacilityDetail` and `openLocationCard` to dynamically update `#berandaLocationCard` and smooth-pan `berandaLeafletMapInstance`.
- **Status**: Completed, Verified & Auto-Pushed.


---

### [2026-11-23] Progress #82: Harmonize Unit Catalog & Detail Page with Japandi Modern Luxury Design System
- **Context & Objective**: Per user request ("perbaik halaman unit, agar menggunakan style yang sama dengan halaman lain"), redesign and harmonize `#panelUnit` (`#unitCatalogHub` and `#unitDetailView`) to strictly conform to the Japandi Modern Luxury design system and visual hierarchy of other pages (`Beranda`, `Fasilitas`, `Surat Cinta`, `Site Plan`).
- **Key Changes Implemented**:
  - **Header & Navigation Bar Architecture (`index.html`)**:
    - Replaced the dark green gradient header box with the standard light card header (`.landing-section-card`) featuring gold uppercase tag `KATALOG HARGA RESMI`, Playfair Display serif title `Pilihan Unit & Skema Pembayaran`, and subtitle `Pricelist Pra-Launching Nov–Des 2026 · Nagoya, Tokyo & Osaka`.
    - Integrated segmented capsule pills (`.fasilitas-subpage-pills`) in warm oat tone (`#ede6da`) with white active capsule, supporting instant filtering for `Semua (30)`, `Nagoya (14 Unit)`, `Tokyo (7 Unit)`, and `Osaka (9 Unit)`.
  - **Metrics Grid & Cluster Section Blocks (`index.html`, `styles.css`)**:
    - Replaced custom `.unit-metric-card` with the standardized `.beranda-metrics-grid` and `.b-metric-cell` system (`30 Unit`, `3 Klaster`, `Rp 4,9 Jt`, `100% SHM`).
    - Standardized `.cluster-block-card` with clean white surfaces, 16px border-radius, gold eyebrow headers, and `.cb-stat-pill` rounded oat capsules.
    - Removed the 40-line desktop-only footer (`.unit-page-footer`) and replaced it with the clean mobile brand stamp matching Beranda and Fasilitas.
  - **Unit Inventory Card Craftsmanship (`app.js`, `styles.css`)**:
    - Standardized `.unit-inventory-card` with 14px border radius, 100px media height with subtle dark gradient and status pills (`status-avail` forest green, `status-sold` warm grey), Playfair serif unit ID, gold type badge, and `.uic-action-btn` primary pill (`Pilih Unit →`).
    - Added `filterUnitByCluster(clusterKey, btnEl)` in `app.js` for instant dynamic cluster switching.
  - **Hygiene & Detail View Upgrades (`index.html`, `styles.css`)**:
    - Replaced decorative emojis (`🌿`, `🚗`, `🛡️`, `📜`) with sleek inline SVGs for ventilation, carport, security, and legality features.
    - Upgraded `.unit-detail-sticky-bar` action buttons (`.btn-detail-wa` and `.btn-detail-order`) with 999px rounded pills and bottom safe area navigation bar clearances.
- **Status**: Completed, Verified & Auto-Pushed.


---

### [2026-11-23] Progress #83: Remove Arrow Symbol (→) Across All Pages
- **Context & Objective**: Per user request ("hapus simbol → untuk di semua halaman"), eliminate all trailing arrow symbols (`→`, `&rarr;`, `&#8594;`) across all pages, modal views, buttons, and subpages in the application.
- **Key Changes Implemented**:
  - **HTML Structure Cleanup (`index.html`)**:
    - Removed all 31 occurrences of `<span>→</span>` from primary action buttons across all rooms (`ROOM 01` through `ROOM 05`), interactive modals (order, quick consultation, saved config, denah spec), and landing tabs (`#panelBeranda`, `#panelUnit`, `#panelFasilitas`, `#panelSuratCinta`, `#panelSitePlan`).
    - Cleaned up inline text arrows in cluster block links (`Site Plan →` to `Site Plan`).
  - **Dynamic JavaScript Templates (`app.js`)**:
    - Removed `<span>→</span>` from modal templates (`modal-quick`, WA consultation, save configuration, unit ordering, and magazine next theme button).
  - **Button Alignment Standardization (`styles.css`)**:
    - Updated `.btn-primary-forest` from `justify-content: space-between` to `justify-content: center; gap: 8px; text-align: center;` to ensure all button labels remain centered and balanced without trailing arrows.
- **Status**: Completed, Verified & Auto-Pushed.


---

### [2026-11-23] Progress #84: Transform Site Plan Header into Dedicated Frameless Top Navbar
- **Context & Objective**: Per user request ("buat jadi navbar dihalaman site plannya"), transform the Site Plan tab (`#panelSitePlan`) header into a clean, frameless top navigation bar (`.siteplan-navbar-header`), matching the Fasilitas and user-provided reference design.
- **Key Changes Implemented**:
  - **Navbar Structure Refactoring (`index.html`)**:
    - Externalized the title `Peta Masterplan Kawasan` and cluster selector tabs outside of `.landing-section-card`, establishing a dedicated top navbar (`.siteplan-navbar-header`).
    - Integrated frameless centered title (`.siteplan-nav-title`) with segmented capsule pills (`#siteplanClusterTabs.fasilitas-subpage-pills`) in warm oat tone (`#ede6da`) with white active pill.
    - Removed redundant inner card header from `#pageMasterPlan` to eliminate double framing.
  - **CSS Styling Unification (`styles.css`)**:
    - Coupled `.siteplan-navbar-header` and `.siteplan-nav-title` with `.fasilitas-subpage-header` and `.fasilitas-nav-title` rules for exact visual parity.
  - **Dynamic Cluster Switching Integration (`app.js`)**:
    - Extended `switchBerandaLotCluster` selector to include `#siteplanClusterTabs .cluster-pill-btn`, keeping active states perfectly synchronized across tabs.
- **Status**: Completed, Verified & Auto-Pushed.


---

### [2026-11-23] Progress #85: Resolve Bottom Navigation Bar Failure Caused by CSS !important Display Collision
- **Context & Objective**: Per user request ("mengapa jadi error bootm barnya, kenapa ga ke navigate ke halamn yang seharusnya"), resolve bug where clicking bottom navigation bar tabs failed to switch views.
- **Root Cause Identified**:
  - In Progress #78, the global auto layout block in `styles.css` assigned `display: flex !important;` to `.landing-tab-panel`, `.fasilitas-subpage`, `.unit-catalog-page-container`, `.unit-detail-page-container`, and `.fasilitas-main-hub`.
  - Because `!important` on CSS class rules overrides JavaScript inline styles without `!important` (`el.style.display = 'none'`), all 5 tab panels and subpages remained permanently forced to `display: flex !important`, causing all pages to be stacked on top of each other simultaneously.
- **Key Changes Implemented**:
  - **CSS Priority Isolation (`styles.css`)**:
    - Removed `.landing-tab-panel`, `.fasilitas-subpage`, `.unit-catalog-page-container`, `.unit-detail-page-container`, and `.fasilitas-main-hub` from the global `display: flex !important` selector.
    - Added dedicated tab panel display rules enforcing `display: none !important` when hidden (`[style*="display: none"]`, `.is-hidden`) and `display: flex !important` when active (`.is-active`, `[style*="display: flex"]`).
  - **Robust JavaScript Tab Switching & Normalization (`app.js`)**:
    - Added `normalizeLandingTab(tabName)` handling case-insensitivity (`siteplan` -> `SitePlan`, `suratcinta` -> `SuratCinta`).
    - Enforced `p.style.setProperty('display', 'none', 'important')` and `activePanel.style.setProperty('display', 'flex', 'important')` across `switchLandingTab`, `openFasilitasDetail`, `closeFasilitasDetail`, `openUnitDetail`, and `closeUnitDetail`.
- **Status**: Completed, Verified & Auto-Pushed.


---

### [2026-11-23] Progress #86: Tidy Unit Catalog Capsule Pills & Enforce Single-Line Japandi Styling
- **Context & Objective**: Per user request ("rapikan ini" with attached screenshot of `#unitClusterTabs`), eliminate awkward line wrap where `Osaka (9 Unit)` dropped to a second row, remove default browser button black borders, and apply seamless segmented capsule styling.
- **Root Cause Identified**:
  - The capsule bar buttons used `.fasilitas-sub-pill` which was missing from `styles.css`, causing the browser to render default HTML button borders/outlines.
  - `.fasilitas-subpage-pills` was caught in the global auto-layout `flex-wrap: wrap !important` rule, forcing the 4th pill to wrap onto a second line.
  - Labels with redundant "Unit" (`Nagoya (14 Unit)`, etc.) exceeded mobile width.
- **Key Changes Implemented**:
  - **Single-Line Capsule Layout (`index.html`, `styles.css`)**:
    - Compacted labels to `Semua (30)`, `Nagoya (14)`, `Tokyo (7)`, and `Osaka (9)`.
    - Removed `.fasilitas-subpage-pills` from `flex-wrap: wrap !important` list.
    - Added dedicated `#unitClusterTabs` rule with `display: flex !important; flex-wrap: nowrap !important; max-width: 360px; width: 100%;` and child `.f-sub-pill` with `flex: 1 1 0 !important; font-size: 10.5px; white-space: nowrap;`.
  - **Japandi Button Aesthetics (`styles.css`)**:
    - Defined `.f-sub-pill, .fasilitas-sub-pill` with `border: none !important; outline: none !important; background: transparent;`.
    - Active pill gets pristine `#ffffff !important` background, `#11332a !important` dark forest green text, and `box-shadow: 0 2px 6px rgba(22, 36, 28, 0.1) !important`.
  - **Dynamic Filtering (`app.js`)**:
    - Implemented `filterUnitByCluster(clusterKey, btnEl)` to toggle active states and show/hide corresponding cluster cards (`#clusterSectionNagoya`, `#clusterSectionTokyo`, `#clusterSectionOsaka`).
    - Cleaned residual arrow characters in modal helpers to preserve Progress #83 zero-arrow rule.
- **Status**: Completed, Verified & Auto-Pushed.


---

### [2026-11-24] Progress #87: Complete Elimination of Arrow Unicode Symbols & Mojibake (â† / â†’)
- **Context & Objective**: Per user request ("hapus semua yang ada seperti ini â†" with uploaded screenshot showing mojibake `â†’` on button), eliminate all residual unicode arrows and replace back/rotate controls with clean inline SVGs.
- **Root Cause Identified**:
  - Unicode arrow characters (`→`, `←`, `↗`, `↔`, `⟲`, `⟳`, `↻`) rendered as mojibake (`â†’`, `â†`, etc.) in certain browser encoding environments.
  - Residual `↗` was present in Google Maps and floor plan buttons (`Lihat Denah ↗`).
  - Back buttons used raw text `←` which corrupted into `â†`.
  - Filter swipe hints had `geser ↔`.
- **Key Changes Implemented**:
  - **Eliminated All Arrows & Mojibake (`index.html`, `app.js`)**:
    - Replaced all 6 room back buttons (`.btn-back-outline`) with clean inline SVG chevron icons (`<polyline points="15 18 9 12 15 6"/>`).
    - Removed `<span>↗</span>` from Google Maps link and all 3 cluster card floorplan buttons (`Lihat Denah`).
    - Replaced `geser ↔` with plain `geser` in all 4 unit filter swipe labels.
    - Replaced panorama rotate buttons `⟲` and `⟳` with crisp inline SVG rotate icons.
    - Removed `←` from magazine previous theme button in `app.js`.
  - **Forensic Verification**:
    - Ran comprehensive unicode scanner across `index.html`, `app.js`, and `styles.css`: 0 arrow characters, 0 mojibake characters remaining.
- **Status**: Completed, Verified & Auto-Pushed.


---

### [2026-11-24] Progress #88: Complete Elimination of Checkmark Emoticons (✓) Across All Pages
- **Context & Objective**: Per user request ("hapus emot ✓ pada semua halaman"), eliminate every occurrence of checkmark emoticon `✓` across all HTML templates, dynamic scripts, and UI banners.
- **Key Changes Implemented**:
  - **HTML Structure Cleanup (`index.html`)**:
    - Removed `✓` from customizer save action button and success banner (`Simpan Desain Ruangan`, `Desain ruangan tersimpan!`).
    - Removed `✓` from siteplan lot confirmation button and banner (`Konfirmasi & Simpan Kavling`, `Pilihan kavling tersimpan!`).
    - Removed `✓` from facility highlights tags (`Resort Pool & Lounge`, `Main Hall 88 m²`, `Dining & Gathering`).
    - Removed `✓` from pricing footnote (`Booking fee Rp 5 Juta sudah termasuk`).
    - Replaced `✓` in milestone list `.pm-dot` with clean indicator dot (`●`).
    - Replaced raw text `✓` in `.hb-check` with crisp inline SVG checkmark icon.
  - **JavaScript Template Cleanup (`app.js`)**:
    - Removed `✓` from lock hints, room confirmation banners, and dynamic lot save button labels.
    - Stripped `✓` prefix from all facility carousel highlights (`highlights: ['Resort Pool & Lounge', ...]`).
    - Cleaned all Super App toast feedback notification messages (`Smart Door Lock terhubung`, `QR Code Akses Tamu`, `Reservasi Kolam Renang`, `Tagihan IPL`, `Laporan kendala`).
- **Status**: Completed, Verified & Auto-Pushed.


---

### [2026-11-24] Progress #89: Standardize Room Back Navigation Button Symbol to `<`
- **Context & Objective**: Per user request ("gantu simbol back dari ← menjadi <"), replace the back button indicator from arrow symbol (`←`) to the clean chevron/bracket `<`.
- **Key Changes Implemented**:
  - **Button Markup Standardization (`index.html`)**:
    - Updated all 6 room back buttons (`.btn-back-outline` in Rooms 02 through 07) from SVG/arrow characters to standard HTML entity `&lt;` (renders literally as `<`).
  - **Button Geometry & Alignment (`styles.css`)**:
    - Enhanced `.btn-back-outline` with `display: inline-flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 700; line-height: 1; padding: 10px 16px;` for a centered, crisp back button.
- **Status**: Completed, Verified & Auto-Pushed.


---

### [2026-11-24] Progress #90: Implement Analisis Radius Aktif Feature Card in Beranda
- **Context & Objective**: Per user request with screenshot attachment (`media_1795469561586_32acf75c.png`), implement the complete interactive "Analisis Radius Aktif" feature card inside the Beranda tab directly above the Leaflet interactive map in `#secLokasiRadius`.
- **Key Changes Implemented**:
  - **Feature Card Structure (`index.html`)**:
    - Created `#berandaRadiusAnalysisCard` (`.beranda-radius-analysis-card`) in `#secLokasiRadius`.
    - **Header Row**: Eyebrow `ANALISIS RADIUS AKTIF` (green `#2e7d32`), dynamic radius badge pill `#berandaActiveRadiusBadge` (`5 km` in lime green `#a3e635`), and headline `#berandaRadiusHeadline` (`25 di dalam radius, 15 di luar radius`).
    - **Kategori Fasilitas (9 Pilihan)**: 2-column grid of 10 category buttons (`Semua (25)`, `Pendidikan (3)`, `Tempat Ibadah (2)`, `Kesehatan (3)`, `Belanja (3)`, `Transportasi (2)`, `Layanan Publik (4)`, `Keuangan (2)`, `Rekreasi (3)`, `Kuliner (3)`). Active button uses `#11332a` background, white text, and lime green count badge.
    - **Radius Pencarian**: 3x2 grid of 6 radius options (`500 m`, `1 km`, `3 km`, `5 km`, `10 km`, `25 km`) with `5 km` active by default.
    - **Fasilitas Lainnya Toggle**: Full-width button `Tampilkan fasilitas lainnya` with funnel SVG icon and `Unggulan` badge.
    - **Fokus Klaster The Park**: 2x2 grid of cluster options (`Semua (3)`, `Nagoya`, `Osaka`, `Tokyo`) with `Semua (3)` active by default.
  - **Bespoke Japandi Styles (`styles.css`)**:
    - Crafted custom CSS for `.beranda-radius-analysis-card`, `.analysis-top-row`, `.analysis-active-badge`, `.analysis-categories-grid`, `.analysis-cat-btn`, `.analysis-radius-grid`, `.analysis-radius-btn`, `.analysis-more-toggle-btn`, and `.analysis-cluster-grid`.
    - Ensured full responsive sizing, 44px+ touch targets, and subtle Japandi border accents (`#e2ded6`, `#d1e2d4`).
  - **Interactive Controller (`app.js`)**:
    - Implemented `setBerandaSearchRadius(radiusMeters, btnEl)`: updates active badge, calculates facilities within radius vs outside radius, updates headline, and smoothly zooms `berandaLeafletMapInstance`.
    - Implemented `filterBerandaCategory(catKey, btnEl)`: filters interactive map distance chips and highlights active category.
    - Implemented `focusBerandaCluster(clusterKey, btnEl)`: pans and flies the Leaflet map smoothly to Nagoya, Osaka, or Tokyo coordinates.
    - Implemented `toggleBerandaMoreFacilities(btnEl)`: expands secondary amenities with visual toggle state.
- **Status**: Completed, Verified & Auto-Pushed.


---

### [2026-11-24] Progress #91: Refine Pilihan Unit Per Cluster Showcase Layout
- **Context & Objective**: Per user request ("rapikan layout ini" referencing `#secBerandaUnitShowcase` and uploaded screenshot `media_1795469650113_8338e3a8.jpg`), refine the cluster showcase layout and statistics bar to prevent awkward stacking, replace unicode symbols with crisp SVGs, and improve Japandi aesthetics.
- **Key Changes Implemented**:
  - **Single-Line Cluster Tabs (`styles.css`)**:
    - Targeted `#berandaShowcaseClusterTabs` with `flex-wrap: nowrap !important`, `width: 100%`, and child `.cluster-pill-btn` with `flex: 1 1 0 !important; min-height: 40px; height: 40px;`.
    - Excluded `#berandaShowcaseClusterTabs` from generic media query `flex-wrap: wrap !important` rule to ensure all 3 tabs (`Nagoya`, `Tokyo`, `Osaka`) stay unified in one pristine row.
  - **Hero Card Refinement (`styles.css`)**:
    - Raised min-height to 250px with refined gradient overlays, subtle gate backdrop opacity (`0.35`), and enhanced typography.
    - Polished button `.btn-castle-detail` with `min-height: 40px`, backdrop blur, and crisp borders.
  - **Summary Stats Bar 3-Column Grid (`index.html`, `styles.css`)**:
    - Converted `.showcase-summary-bar` on mobile to a structured `display: grid; grid-template-columns: repeat(3, 1fr); row-gap: 12px; column-gap: 8px;` layout.
    - Replaced raw text symbols (`⌂`, `◫`, `▱`, `田`, `♨`) with crisp inline SVG icons for Unit, LB, LT, Kamar Tidur, and Kamar Mandi.
- **Status**: Completed, Verified & Auto-Pushed.


---

### [2026-11-24] Progress #92: Tidy Peta Masterplan Kawasan Segmented Cluster Tabs
- **Context & Objective**: Per user request ("rapikan layout ini" referencing `#panelSitePlan` header and uploaded screenshot `media_1795469748363_66a1b5b6.png`), refine the segmented capsule bar for "Peta Masterplan Kawasan" (`#siteplanClusterTabs`).
- **Key Changes Implemented**:
  - **Single Capsule Pill Container (`styles.css`, `index.html`)**:
    - Removed redundant `.cluster-pill-btn` classes from buttons inside `#siteplanClusterTabs` to avoid conflicting outer borders and square corners.
    - Standardized `#siteplanClusterTabs` with `display: flex !important; flex-wrap: nowrap !important; max-width: 320px !important; width: 100% !important; background: #ede6da !important; border-radius: 999px !important; padding: 4px !important;`.
  - **Pill Button Aesthetics (`styles.css`)**:
    - Styled child `.f-sub-pill` with `flex: 1 1 0 !important; border: none !important; outline: none !important; background: transparent !important; border-radius: 999px !important; height: 30px !important; font-size: 11px !important; font-weight: 500 !important; color: #5c6860 !important;`.
    - Active tab gets pristine white background (`#ffffff !important`), dark forest green text (`#11332a !important; font-weight: 700 !important;`), and subtle Japandi elevation (`box-shadow: 0 2px 6px rgba(22, 36, 28, 0.12) !important;`).
  - **Dynamic State Synchronization (`app.js`)**:
    - Updated `switchBerandaLotCluster` to properly query and toggle active states on `#siteplanClusterTabs .f-sub-pill` when switching between Nagoya, Osaka, and Tokyo.
- **Status**: Completed, Verified & Auto-Pushed.
