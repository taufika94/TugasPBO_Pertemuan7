/* ==========================================================================
   THE PARK TOWNHOUSE — "Jalan Pulang"
   After-Delay Opening Choreography, Golden Spark Canvas &
   Smart-Animate Parallax House Background Transitions
   ========================================================================== */

const openingOverlay = document.getElementById('openingOverlay');
const openingCaption = document.getElementById('openingCaption');
const phoneShell = document.getElementById('phoneShell');
const sparkCanvas = document.getElementById('sparkCanvas');
const heroSparkCanvas = document.getElementById('heroSparkCanvas');
const transitionSparkCanvas = document.getElementById('transitionSparkCanvas');
const transitionShutter = document.getElementById('transitionShutter');
const cardsCountLabel = document.getElementById('cardsCountLabel');

let openingTimers = [];
let sparkAnimId = null;
let heroSparkAnimId = null;
let currentRoom = 1;
let isTransitioning = false;

let collectedCards = [
  { id: 1, title: 'Fasad Tropis & Cahaya Pagi', room: 'Pintu Depan' },
];
let selectedRhythm = 'Belum dipilih — silakan coba Kuis 60 Detik';
let selectedUnitKey = 'nagoya';

const HOUSE_UNITS = {
  nagoya: {
    img: 'assets/drive/dalam-6.png',
    tag: 'Nagoya B.02–B.04 · Gold',
    priceText: 'Rp 650 jt · 3 unit entry',
    priceCashMillion: 650,
    priceKprMillion: 683,
    headline: 'Japandi Modern 2 lantai dengan garasi dalam.',
    desc: 'Dekat clubhouse (kolam renang, gym, mini golf, game station) dengan one-gate RFID dan smart door lock.',
    area: '75 m²',
    beds: '3 KT',
    lot: '63 m²',
    name: 'Nagoya B.02–B.04 · LB 75 m²',
  },
  tokyo: {
    img: 'assets/drive/housee.jpeg',
    tag: 'Tokyo B.03 · Gold',
    priceText: 'Rp 775 jt · Pusat Kota',
    priceCashMillion: 775,
    priceKprMillion: 814,
    headline: 'Keluarga muda di koridor Jl. Jendral Sudirman.',
    desc: 'Hunian 2 lantai berdesain Japandi di koridor utama Kp. Duabelasan, Jombor, Sukoharjo.',
    area: '80 m²',
    beds: '3 KT',
    lot: '75 m²',
    name: 'Tokyo B.03 · LB 80 m²',
  },
  osaka: {
    img: 'assets/drive/dalam-12.png',
    tag: 'Osaka A.09 · Diamond',
    priceText: 'Rp 1,15 M · 2 Garasi',
    priceCashMillion: 1150,
    priceKprMillion: 1208,
    headline: '4 kamar tidur lapang dengan 2 garasi dalam.',
    desc: 'Unit Diamond di koridor Jl. Jendral Sudirman dengan 4 KT, 3 KM, dan EV-charging-ready.',
    area: '110 m²',
    beds: '4 KT',
    lot: '110 m²',
    name: 'Osaka A.09 · LB 110 m²',
  },
};

/* --------------------------------------------------------------------------
   1. GOLDEN SPARK PARTICLE SYSTEM (Opening Sequence)
   -------------------------------------------------------------------------- */
class SparkSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.running = false;
    this.resize();
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = rect.width || 430;
    this.height = rect.height || 860;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  spawnAmbient(count = 1) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: this.width * (0.22 + Math.random() * 0.56),
        y: this.height * (0.34 + Math.random() * 0.42),
        vx: (Math.random() - 0.5) * 0.25,
        vy: -0.2 - Math.random() * 0.35,
        radius: 0.7 + Math.random() * 1.1,
        alpha: 0,
        maxAlpha: 0.28 + Math.random() * 0.28,
        life: 0,
        maxLife: 95 + Math.random() * 80,
        hue: 38 + Math.random() * 8,
      });
    }
  }

  burst(originX, originY, count = 28, speedScale = 0.75) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.35 + Math.random() * 1.55) * speedScale;
      this.particles.push({
        x: originX + (Math.random() - 0.5) * 10,
        y: originY + (Math.random() - 0.5) * 36,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.35,
        radius: 0.8 + Math.random() * 1.5,
        alpha: 1,
        maxAlpha: 0.62,
        life: 0,
        maxLife: 65 + Math.random() * 55,
        hue: 38 + Math.random() * 8,
      });
    }
  }

  start() {
    this.running = true;
    const tick = () => {
      if (!this.running) return;
      this.ctx.clearRect(0, 0, this.width, this.height);

      if (this.particles.length < 35 && Math.random() < 0.35) {
        this.spawnAmbient(1);
      }

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.992;
        p.vy -= 0.006;

        const progress = p.life / p.maxLife;
        if (progress < 0.2) {
          p.alpha = (progress / 0.2) * p.maxAlpha;
        } else {
          p.alpha = (1 - (progress - 0.2) / 0.8) * p.maxAlpha;
        }

        if (p.life >= p.maxLife || p.alpha <= 0.01) {
          this.particles.splice(i, 1);
          continue;
        }

        const grad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3.2);
        grad.addColorStop(0, `hsla(${p.hue}, 52%, 88%, ${p.alpha})`);
        grad.addColorStop(0.5, `hsla(${p.hue}, 44%, 76%, ${p.alpha * 0.35})`);
        grad.addColorStop(1, `hsla(${p.hue}, 40%, 70%, 0)`);

        this.ctx.fillStyle = grad;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius * 3.2, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = `rgba(255, 252, 244, ${p.alpha * 0.9})`;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius * 0.45, 0, Math.PI * 2);
        this.ctx.fill();
      }

      sparkAnimId = requestAnimationFrame(tick);
    };
    tick();
  }

  stop() {
    this.running = false;
    if (sparkAnimId) cancelAnimationFrame(sparkAnimId);
    this.particles = [];
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}

const openingSparks = new SparkSystem(sparkCanvas);

/* --------------------------------------------------------------------------
   1B. NATURE TRANSITION FX (Flying Butterflies & Drifting Leaves)
   -------------------------------------------------------------------------- */
class NatureTransitionFX {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.butterflies = [];
    this.leaves = [];
    this.motes = [];
    this.running = false;
    this.animId = null;
    this.resize();
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = rect.width || 412;
    this.height = rect.height || 844;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  launchButterflies(count = 4) {
    this.resize();
    for (let i = 0; i < count; i++) {
      const fromLeft = i % 2 === 0;
      this.butterflies.push({
        x: fromLeft ? -25 - i * 36 : this.width + 25 + i * 36,
        y: this.height * (0.28 + Math.random() * 0.42),
        vx: (fromLeft ? 1 : -1) * (1.7 + Math.random() * 0.9),
        vy: -0.45 - Math.random() * 0.45,
        size: 9 + Math.random() * 5,
        flapPhase: Math.random() * Math.PI * 2,
        flapSpeed: 0.16 + Math.random() * 0.06,
        wavePhase: Math.random() * Math.PI * 2,
        alpha: 0,
        life: 0,
        maxLife: 135 + Math.random() * 35,
        tint: i % 2 === 0 ? 'rgba(235, 218, 185,' : 'rgba(206, 220, 198,',
      });
    }
    this.ensureRunning();
  }

  launchLeaves(count = 12) {
    this.resize();
    const palette = [
      'rgba(128, 148, 118,',
      'rgba(176, 158, 122,',
      'rgba(92, 114, 90,',
      'rgba(212, 194, 156,',
    ];
    for (let i = 0; i < count; i++) {
      this.leaves.push({
        x: this.width * (0.15 + Math.random() * 0.95),
        y: -20 - Math.random() * 140,
        vx: -0.9 - Math.random() * 1.1,
        vy: 1.5 + Math.random() * 1.2,
        size: 7 + Math.random() * 6,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.045,
        tumble: Math.random() * Math.PI * 2,
        swayPhase: Math.random() * Math.PI * 2,
        life: 0,
        maxLife: 125 + Math.random() * 40,
        color: palette[i % palette.length],
      });
    }
    this.ensureRunning();
  }

  burstMotes(x, y, count = 26) {
    this.resize();
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.4 + Math.random() * 1.4;
      this.motes.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.35,
        r: 0.9 + Math.random() * 1.3,
        life: 0,
        maxLife: 70 + Math.random() * 45,
      });
    }
    this.ensureRunning();
  }

  ensureRunning() {
    if (this.running) return;
    this.running = true;
    const tick = () => {
      this.ctx.clearRect(0, 0, this.width, this.height);

      // Update & draw butterflies
      for (let i = this.butterflies.length - 1; i >= 0; i--) {
        const b = this.butterflies[i];
        b.life++;
        b.flapPhase += b.flapSpeed;
        b.wavePhase += 0.045;
        b.x += b.vx;
        b.y += b.vy + Math.sin(b.wavePhase) * 0.65;

        const p = b.life / b.maxLife;
        b.alpha = p < 0.15 ? p / 0.15 : p > 0.78 ? (1 - p) / 0.22 : 1;

        if (Math.random() < 0.28 && b.alpha > 0.3) {
          this.motes.push({
            x: b.x,
            y: b.y,
            vx: (Math.random() - 0.5) * 0.2,
            vy: 0.15,
            r: 0.8,
            life: 0,
            maxLife: 32,
          });
        }

        if (b.life >= b.maxLife) {
          this.butterflies.splice(i, 1);
          continue;
        }

        const wingSpan = 0.22 + 0.78 * Math.abs(Math.sin(b.flapPhase));
        const angle = Math.atan2(b.vy + Math.sin(b.wavePhase) * 0.65, b.vx) + Math.PI / 2;

        this.ctx.save();
        this.ctx.translate(b.x, b.y);
        this.ctx.rotate(angle);
        this.ctx.fillStyle = `${b.tint} ${0.78 * b.alpha})`;
        this.ctx.strokeStyle = `rgba(255, 250, 238, ${0.45 * b.alpha})`;
        this.ctx.lineWidth = 0.7;

        // Left & Right delicate wings
        [-1, 1].forEach((side) => {
          this.ctx.save();
          this.ctx.scale(side * wingSpan, 1);
          this.ctx.beginPath();
          this.ctx.moveTo(0, -2);
          this.ctx.bezierCurveTo(b.size * 1.1, -b.size * 1.05, b.size * 1.35, b.size * 0.15, 0, b.size * 0.25);
          this.ctx.bezierCurveTo(b.size * 0.85, b.size * 0.45, b.size * 0.65, b.size * 1.1, 0, b.size * 0.55);
          this.ctx.closePath();
          this.ctx.fill();
          this.ctx.stroke();
          this.ctx.restore();
        });

        this.ctx.restore();
      }

      // Update & draw leaves
      for (let i = this.leaves.length - 1; i >= 0; i--) {
        const l = this.leaves[i];
        l.life++;
        l.swayPhase += 0.05;
        l.tumble += 0.06;
        l.rot += l.rotSpeed;
        l.x += l.vx + Math.sin(l.swayPhase) * 0.7;
        l.y += l.vy;

        const p = l.life / l.maxLife;
        const alpha = p < 0.15 ? p / 0.15 : p > 0.75 ? (1 - p) / 0.25 : 1;

        if (l.life >= l.maxLife || l.y > this.height + 30) {
          this.leaves.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.translate(l.x, l.y);
        this.ctx.rotate(l.rot);
        this.ctx.scale(1, 0.45 + 0.55 * Math.abs(Math.cos(l.tumble)));
        this.ctx.fillStyle = `${l.color} ${0.72 * alpha})`;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -l.size);
        this.ctx.quadraticCurveTo(l.size * 0.75, 0, 0, l.size);
        this.ctx.quadraticCurveTo(-l.size * 0.75, 0, 0, -l.size);
        this.ctx.fill();
        this.ctx.restore();
      }

      // Update & draw motes
      for (let i = this.motes.length - 1; i >= 0; i--) {
        const m = this.motes[i];
        m.life++;
        m.x += m.vx;
        m.y += m.vy;
        const alpha = (1 - m.life / m.maxLife) * 0.65;
        if (m.life >= m.maxLife) {
          this.motes.splice(i, 1);
          continue;
        }
        this.ctx.fillStyle = `rgba(244, 232, 206, ${alpha})`;
        this.ctx.beginPath();
        this.ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        this.ctx.fill();
      }

      if (this.butterflies.length || this.leaves.length || this.motes.length) {
        this.animId = requestAnimationFrame(tick);
      } else {
        this.running = false;
        this.ctx.clearRect(0, 0, this.width, this.height);
      }
    };
    this.animId = requestAnimationFrame(tick);
  }
}

const natureFX = new NatureTransitionFX(transitionSparkCanvas);

/* --------------------------------------------------------------------------
   2. SUBTLE AMBIENT HERO SPARKS (Room 01 Arch)
   -------------------------------------------------------------------------- */
function startHeroSparks() {
  if (!heroSparkCanvas) return;
  if (heroSparkAnimId) cancelAnimationFrame(heroSparkAnimId);

  const ctx = heroSparkCanvas.getContext('2d');
  const rect = heroSparkCanvas.parentElement.getBoundingClientRect();
  const w = rect.width || 390;
  const h = rect.height || 410;
  heroSparkCanvas.width = w;
  heroSparkCanvas.height = h;

  const fireflies = Array.from({ length: 14 }, () => ({
    x: w * (0.15 + Math.random() * 0.7),
    y: h * (0.25 + Math.random() * 0.65),
    vx: (Math.random() - 0.5) * 0.25,
    vy: -0.15 - Math.random() * 0.25,
    r: 1 + Math.random() * 1.6,
    phase: Math.random() * Math.PI * 2,
  }));

  const loop = () => {
    ctx.clearRect(0, 0, w, h);
    fireflies.forEach((f) => {
      f.phase += 0.03;
      f.x += f.vx + Math.sin(f.phase) * 0.15;
      f.y += f.vy;

      if (f.y < h * 0.15) {
        f.y = h * 0.88;
        f.x = w * (0.2 + Math.random() * 0.6);
      }

      const alpha = 0.22 + (Math.sin(f.phase * 1.5) + 1) * 0.22;
      const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 3.5);
      g.addColorStop(0, `rgba(255, 232, 175, ${alpha})`);
      g.addColorStop(1, 'rgba(255, 232, 175, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r * 3.5, 0, Math.PI * 2);
      ctx.fill();
    });
    heroSparkAnimId = requestAnimationFrame(loop);
  };
  loop();
}

/* --------------------------------------------------------------------------
   3. AFTER-DELAY OPENING SEQUENCE CHOREOGRAPHY
   -------------------------------------------------------------------------- */
function clearOpeningTimers() {
  openingTimers.forEach((t) => clearTimeout(t));
  openingTimers = [];
}

function revealRoomStagger(roomNum = 1) {
  phoneShell.classList.add('app-entered');
  const items = document.querySelectorAll(`#room-${roomNum} .stagger-item`);
  items.forEach((el) => el.classList.remove('is-visible'));
  items.forEach((el) => {
    const delay = parseInt(el.dataset.delay || '0', 10);
    const t = setTimeout(() => {
      el.classList.add('is-visible');
    }, delay);
    openingTimers.push(t);
  });
}

function finishOpening() {
  clearOpeningTimers();
  openingOverlay.classList.add('is-entering-room');
  openingOverlay.setAttribute('aria-hidden', 'true');
  revealRoomStagger(1);
  startHeroSparks();

  setTimeout(() => {
    openingSparks.stop();
  }, 900);
}

function runAfterDelayOpening() {
  clearOpeningTimers();
  openingSparks.stop();
  openingSparks.resize();

  phoneShell.classList.remove('app-entered');
  document.querySelectorAll('#room-1 .stagger-item').forEach((el) => {
    el.classList.remove('is-visible');
  });

  openingOverlay.classList.remove('is-entering-room');
  openingOverlay.setAttribute('aria-hidden', 'false');
  openingOverlay.setAttribute('data-stage', 'idle');
  openingCaption.textContent = 'Menyiapkan jalan pulang Anda…';

  openingSparks.start();

  // Stage 1 (After Delay 120ms): Arch portal & brand fade in
  openingTimers.push(
    setTimeout(() => {
      openingOverlay.setAttribute('data-stage', 'intro');
    }, 120)
  );

  // Stage 2 (After Delay 1150ms): Golden spark burst & warm seam light
  openingTimers.push(
    setTimeout(() => {
      openingOverlay.setAttribute('data-stage', 'spark');
      openingCaption.textContent = 'Ada cahaya yang menunggu di balik pintu…';
      openingSparks.burst(openingSparks.width / 2, openingSparks.height * 0.49, 48, 1.05);
    }, 1150)
  );

  // Stage 3 (After Delay 2200ms): Double doors swing open + spark cascade
  openingTimers.push(
    setTimeout(() => {
      openingOverlay.setAttribute('data-stage', 'door-open');
      openingSparks.burst(openingSparks.width / 2, openingSparks.height * 0.49, 60, 1.35);
    }, 2200)
  );

  // Stage 4 (After Delay 3350ms): Smoothly enter Room 01 (Pintu Depan)
  openingTimers.push(
    setTimeout(() => {
      finishOpening();
    }, 3350)
  );
}

document.getElementById('skipOpeningBtn').addEventListener('click', finishOpening);
document.getElementById('replayOpeningBtn').addEventListener('click', () => {
  goToRoomImmediate(1);
  runAfterDelayOpening();
});

/* --------------------------------------------------------------------------
   4. PARALLAX HOUSE BACKGROUND & LAYERED ROOM TRANSITIONS
   -------------------------------------------------------------------------- */
const roomCardsMap = {
  2: { id: 1, title: '3 Cluster Eksklusif: Nagoya, Osaka & Tokyo', room: 'Ruang Cermin' },
  3: { id: 3, title: 'Pusat Kota Sukoharjo: Dekat Gelora Merdeka & Sudirman', room: 'Ruang Peta' },
  4: { id: 21, title: 'Desain Japandi 2 Lantai dengan Garasi Dalam', room: 'Ruang Rumah' },
  5: { id: 38, title: 'Clubhouse: Kolam, Gym, Mini Golf 9 Hole & Game Station', room: 'Ruang Bersama' },
  6: { id: 91, title: 'Transparansi Harga Periode & Simulasi KPR/CT12/CT24', room: 'Ruang Hitung' },
  7: { id: 95, title: 'Booking Rp 5 Juta via PT Andara Rejo Makmur & DLP 100 Hari', room: 'Ruang Kunci' },
};

function unlockCard(card) {
  if (!collectedCards.some((c) => c.id === card.id)) {
    collectedCards.push(card);
    cardsCountLabel.textContent = `${collectedCards.length}/99`;
  }
}

function updateBackgroundScene(roomNum) {
  phoneShell.setAttribute('data-active-room', String(roomNum));
  document.querySelectorAll('#parallaxBgStage .bg-scene-layer').forEach((layer) => {
    const sceneId = parseInt(layer.dataset.scene || '1', 10);
    layer.classList.toggle('is-active', sceneId === roomNum);
  });
}

function goToRoomImmediate(roomNum) {
  currentRoom = roomNum;
  updateBackgroundScene(roomNum);
  document.querySelectorAll('.room-section').forEach((sec) => {
    sec.classList.remove('is-active', 'is-exiting-up', 'is-exiting-down');
  });
  const target = document.getElementById(`room-${roomNum}`);
  if (target) {
    target.scrollTop = 0;
    target.classList.add('is-active');
    revealRoomStagger(roomNum);
  }
  if (roomNum === 3) {
    handleRoom3Enter();
  }
}

function triggerRoomNatureFX(roomNum) {
  if (roomNum === 2 || roomNum === 5) {
    natureFX.launchButterflies(4);
  } else if (roomNum === 3 || roomNum === 4 || roomNum === 6) {
    natureFX.launchLeaves(12);
  } else if (roomNum === 7) {
    natureFX.launchButterflies(3);
    natureFX.burstMotes(natureFX.width / 2, natureFX.height * 0.35, 26);
  }
}

function goToRoom(roomNum) {
  if (roomNum === currentRoom || isTransitioning) return;
  isTransitioning = true;

  const prevRoomEl = document.getElementById(`room-${currentRoom}`);
  const nextRoomEl = document.getElementById(`room-${roomNum}`);
  const goingForward = roomNum > currentRoom;

  // Room 03 -> 04 uses Fade-in from Center transition ("fade in dari tengah") with Light Bloom & Cinematic Blur
  if (roomNum === 4 && currentRoom === 3) {
    updateBackgroundScene(roomNum);
    triggerRoomNatureFX(roomNum);
    natureFX.burstMotes(natureFX.width / 2, natureFX.height * 0.48, 28);

    const bloomEl = document.getElementById('centerLightBloom');
    if (bloomEl) {
      bloomEl.classList.remove('is-blooming');
      void bloomEl.offsetWidth;
      bloomEl.classList.add('is-blooming');
    }

    if (prevRoomEl) {
      prevRoomEl.classList.remove('is-active');
      prevRoomEl.classList.add('is-exiting-fade');
    }

    setTimeout(() => {
      if (nextRoomEl) {
        nextRoomEl.scrollTop = 0;
        nextRoomEl.classList.remove('is-exiting-up', 'is-exiting-down', 'is-center-fade-in');
        void nextRoomEl.offsetWidth;
        nextRoomEl.classList.add('is-active', 'is-center-fade-in');
        revealRoomStagger(roomNum);
      }
      if (roomCardsMap[roomNum]) unlockCard(roomCardsMap[roomNum]);
      currentRoom = roomNum;
    }, 120);

    setTimeout(() => {
      if (prevRoomEl) prevRoomEl.classList.remove('is-exiting-fade');
      if (nextRoomEl) nextRoomEl.classList.remove('is-center-fade-in');
      if (bloomEl) bloomEl.classList.remove('is-blooming');
      isTransitioning = false;
    }, 1300);
    return;
  }

  // Standard per-room custom CSS transition + Butterflies / Leaves
  updateBackgroundScene(roomNum);
  triggerRoomNatureFX(roomNum);

  if (prevRoomEl) {
    prevRoomEl.classList.remove('is-active');
    prevRoomEl.classList.add(goingForward ? 'is-exiting-up' : 'is-exiting-down');
  }

  if (nextRoomEl) {
    nextRoomEl.scrollTop = 0;
    nextRoomEl.classList.remove('is-exiting-up', 'is-exiting-down');
    nextRoomEl.classList.add('is-active');
    revealRoomStagger(roomNum);
  }

  if (roomCardsMap[roomNum]) {
    unlockCard(roomCardsMap[roomNum]);
  }

  currentRoom = roomNum;
  if (roomNum === 3) {
    handleRoom3Enter();
  }

  setTimeout(() => {
    if (prevRoomEl) {
      prevRoomEl.classList.remove('is-exiting-up', 'is-exiting-down');
    }
    isTransitioning = false;
  }, 1150);
}

function highlightRoute(routeId) {
  document.querySelectorAll('.map-route-line').forEach((line) => {
    line.classList.toggle('is-highlighted', line.id === routeId);
  });
}

/* --------------------------------------------------------------------------
   5. RUANG CERMIN & RUANG RUMAH INTERACTIONS
   -------------------------------------------------------------------------- */
function selectRhythm(btn, unitKey, unitLabel) {
  document.querySelectorAll('#quizOptions .quiz-option-btn').forEach((b) => {
    b.classList.remove('is-selected');
  });
  document.querySelectorAll('#quizOptions .quiz-item').forEach((item) => {
    item.classList.remove('is-open');
  });

  btn.classList.add('is-selected');
  const parentItem = btn.closest('.quiz-item');
  if (parentItem) {
    parentItem.classList.add('is-open');
  }

  selectedRhythm = unitLabel;
  unlockCard({ id: 12, title: `Rekomendasi Ritme: ${unitLabel}`, room: 'Ruang Cermin' });

  const matchingTab = document.querySelector(`.unit-tab-btn[onclick*="${unitKey}"]`);
  if (matchingTab) {
    selectHouseUnit(unitKey, matchingTab);
  }
}

function selectHouseUnit(unitKey, btn) {
  const unit = HOUSE_UNITS[unitKey];
  if (!unit) return;
  selectedUnitKey = unitKey;

  document.querySelectorAll('.unit-tab-btn').forEach((b) => b.classList.remove('is-active'));
  if (btn) btn.classList.add('is-active');

  const img = document.getElementById('houseVisualImg');
  if (img) {
    img.style.opacity = '0.4';
    setTimeout(() => {
      img.src = unit.img;
      img.style.opacity = '1';
    }, 140);
  }

  // Update 360 panorama background image to match selected unit interior
  const panoTrack = document.getElementById('panoramaTrack');
  if (panoTrack) {
    panoTrack.style.backgroundImage = `url('${unit.img}')`;
  }

  // Update Room 4 background house layer
  const scene4 = document.querySelector('.bg-scene-layer[data-scene="4"]');
  if (scene4) {
    scene4.style.backgroundImage = `url('${unit.img}')`;
  }

  const tagEl = document.getElementById('houseVisualTag');
  if (tagEl) tagEl.textContent = unit.tag;
  const priceEl = document.getElementById('houseVisualPrice');
  if (priceEl) priceEl.textContent = unit.priceText;
  const headlineEl = document.getElementById('houseVisualHeadline');
  if (headlineEl) headlineEl.textContent = unit.headline;
  const descEl = document.getElementById('houseVisualDesc');
  if (descEl) descEl.textContent = unit.desc;
  const areaEl = document.getElementById('specArea');
  if (areaEl) areaEl.textContent = unit.area;
  const bedsEl = document.getElementById('specBeds');
  if (bedsEl) bedsEl.textContent = unit.beds;
  const specLotEl = document.getElementById('specLot');
  if (specLotEl) specLotEl.textContent = unit.lot;

  const calcThumb = document.getElementById('calcUnitThumb');
  if (calcThumb) calcThumb.src = unit.img;
  const calcName = document.getElementById('calcUnitName');
  if (calcName) calcName.textContent = unit.name;

  // Render site plan corresponding to cluster
  renderSitePlan(unitKey);

  // Sync denah selector
  const denahMap = { nagoya: '60', tokyo: '80', osaka: '110' };
  const targetDenahType = denahMap[unitKey] || '60';
  const targetDenahBtn = document.getElementById(`denahType${targetDenahType}`);
  selectDenahType(targetDenahType, targetDenahBtn);

  updateCalc();
}

/* --------------------------------------------------------------------------
   SITE PLAN DATA & INTERACTIVE KAVLING SELECTION
   -------------------------------------------------------------------------- */
const SITEPLAN_DATA = {
  tokyo: {
    title: 'Tokyo',
    shmText: 'Dalam proses pecah sertifikat',
    tagSub: 'Zen Garden · Tokyo Road 5 m · kavling terbesar 125 m²',
    areaSub: 'Cluster Tokyo · 1013 m²',
    img: 'assets/drive/siteplan-tokyo.jpg',
    stats: {
      kavling: '7 unit',
      prasarana: '279 m²',
      sarana: '50 m²',
      rth: '60 m²'
    },
    lots: [
      { id: 'B.1', name: 'Tokyo B.1', type: 'Tokyo Gold (LB 80)', area: '80 m²', price: 'Rp 775 Juta', status: 'Tersedia', x: 45, y: 26 },
      { id: 'B.2', name: 'Tokyo B.2', type: 'Tokyo Gold (LB 80)', area: '80 m²', price: 'Rp 775 Juta', status: 'Tersedia', x: 45, y: 31 },
      { id: 'B.3', name: 'Tokyo B.3', type: 'Tokyo Gold (LB 80)', area: '91 m²', price: 'Rp 810 Juta', status: 'Tersedia · Hook', x: 44, y: 37 },
      { id: 'B.4', name: 'Tokyo B.4', type: 'Tokyo Gold (LB 80)', area: '90 m²', price: 'Rp 805 Juta', status: 'Tersedia', x: 57, y: 31 },
      { id: 'B.5', name: 'Tokyo B.5', type: 'Tokyo Gold (LB 80)', area: '90 m²', price: 'Rp 805 Juta', status: 'Tersedia', x: 56, y: 37 },
      { id: 'B.6', name: 'Tokyo B.6', type: 'Tokyo Gold (LB 80)', area: '90 m²', price: 'Rp 805 Juta', status: 'Tersedia · Favorit', x: 55, y: 43 },
      { id: 'B.7', name: 'Tokyo B.7', type: 'Tokyo Gold (LB 80)', area: '125 m²', price: 'Rp 935 Juta', status: 'Tersedia · Terbesar 125 m²', x: 54, y: 50 }
    ]
  },
  nagoya: {
    title: 'Nagoya',
    shmText: 'SHM sudah pecah sempurna (Nagoya)',
    tagSub: '100 m dari Stadion · Nagoya Road 7 M · Clubhouse',
    areaSub: 'Cluster Nagoya · 2392 m²',
    img: 'assets/drive/siteplan-nagoya.jpg',
    stats: {
      kavling: '15 unit',
      prasarana: '832,30 m²',
      sarana: '254,25 m²',
      rth: '119,60 m²'
    },
    lots: [
      { id: 'A.01', name: 'Nagoya A.01', type: 'Nagoya Gold (LB 75)', area: '84 m²', price: 'Rp 720 Juta', status: 'Tersedia', x: 16, y: 35 },
      { id: 'A.02', name: 'Nagoya A.02', type: 'Nagoya Gold (LB 75)', area: '84 m²', price: 'Rp 720 Juta', status: 'Tersedia', x: 20, y: 35 },
      { id: 'A.03', name: 'Nagoya A.03', type: 'Nagoya Gold (LB 75)', area: '84 m²', price: 'Rp 720 Juta', status: 'Tersedia', x: 25, y: 35 },
      { id: 'A.04', name: 'Nagoya A.04', type: 'Nagoya Gold (LB 75)', area: '84 m²', price: 'Rp 720 Juta', status: 'Tersedia', x: 30, y: 35 },
      { id: 'A.05', name: 'Nagoya A.05', type: 'Nagoya Gold (LB 75)', area: '84 m²', price: 'Rp 720 Juta', status: 'Tersedia', x: 35, y: 35 },
      { id: 'A.06', name: 'Nagoya A.06', type: 'Nagoya Gold (LB 75)', area: '84 m²', price: 'Rp 720 Juta', status: 'Tersedia', x: 39, y: 35 },
      { id: 'A.07', name: 'Nagoya A.07', type: 'Nagoya Gold (LB 75)', area: '84 m²', price: 'Rp 720 Juta', status: 'Tersedia', x: 44, y: 35 },
      { id: 'A.08', name: 'Nagoya A.08', type: 'Nagoya Gold (LB 75)', area: '84 m²', price: 'Rp 720 Juta', status: 'Tersedia', x: 48, y: 35 },
      { id: 'B.02', name: 'Nagoya B.02', type: 'Nagoya Gold (LB 75)', area: '63 m²', price: 'Rp 650 Juta', status: 'Tersedia · Dekat Kolam', x: 67, y: 35 },
      { id: 'B.03', name: 'Nagoya B.03', type: 'Nagoya Gold (LB 75)', area: '63 m²', price: 'Rp 650 Juta', status: 'Tersedia', x: 71, y: 35 },
      { id: 'B.04', name: 'Nagoya B.04', type: 'Nagoya Gold (LB 75)', area: '63 m²', price: 'Rp 650 Juta', status: 'Tersedia · Entry', x: 75, y: 35 },
      { id: 'B.05', name: 'Nagoya B.05', type: 'Nagoya Gold (LB 75)', area: '90 m²', price: 'Rp 745 Juta', status: 'Tersedia · Favorit', x: 80, y: 35 },
      { id: 'B.06', name: 'Nagoya B.06', type: 'Nagoya Gold (LB 75)', area: '85 m²', price: 'Rp 725 Juta', status: 'Tersedia', x: 85, y: 35 },
      { id: 'B.07', name: 'Nagoya B.07', type: 'Nagoya Gold (LB 75)', area: '95 m²', price: 'Rp 765 Juta', status: 'Tersedia · Hook', x: 90, y: 35 }
    ]
  },
  osaka: {
    title: 'Osaka',
    shmText: 'Dalam proses pecah sertifikat',
    tagSub: 'Boulevard 6 m terlebar · Avenue Plaza',
    areaSub: 'Cluster Osaka · 1312 m²',
    img: 'assets/drive/siteplan-osaka.jpg',
    stats: {
      kavling: '9 unit',
      prasarana: '336 m²',
      sarana: '49 m²',
      rth: '75 m²'
    },
    lots: [
      { id: 'A.1', name: 'Osaka A.1', type: 'Osaka Diamond (LB 110)', area: '90 m²', price: 'Rp 1,05 Miliar', status: 'Tersedia', x: 44, y: 56 },
      { id: 'A.2', name: 'Osaka A.2', type: 'Osaka Diamond (LB 110)', area: '90 m²', price: 'Rp 1,05 Miliar', status: 'Tersedia', x: 44, y: 48 },
      { id: 'A.3', name: 'Osaka A.3', type: 'Osaka Diamond (LB 110)', area: '90 m²', price: 'Rp 1,05 Miliar', status: 'Tersedia', x: 44, y: 40 },
      { id: 'A.4', name: 'Osaka A.4', type: 'Osaka Diamond (LB 110)', area: '90 m²', price: 'Rp 1,05 Miliar', status: 'Tersedia', x: 44, y: 33 },
      { id: 'A.5', name: 'Osaka A.5', type: 'Osaka Diamond (LB 110)', area: '90 m²', price: 'Rp 1,05 Miliar', status: 'Tersedia · Hook', x: 44, y: 26 },
      { id: 'A.6', name: 'Osaka A.6', type: 'Osaka Diamond (LB 110)', area: '110 m²', price: 'Rp 1,15 Miliar', status: 'Tersedia', x: 59, y: 27 },
      { id: 'A.7', name: 'Osaka A.7', type: 'Osaka Diamond (LB 110)', area: '100 m²', price: 'Rp 1,12 Miliar', status: 'Tersedia', x: 59, y: 34 },
      { id: 'A.8', name: 'Osaka A.8', type: 'Osaka Diamond (LB 110)', area: '110 m²', price: 'Rp 1,15 Miliar', status: 'Tersedia · Favorit', x: 59, y: 44 },
      { id: 'A.9', name: 'Osaka A.9', type: 'Osaka Diamond (LB 110)', area: '115 m²', price: 'Rp 1,18 Miliar', status: 'Tersedia · Terbesar', x: 59, y: 53 }
    ]
  }
};

let currentClusterKey = 'nagoya';
let selectedLotId = null;
let hasSelectedSiteplanLot = false;
let hasSavedRoomCustomization = false;

function scrollToRoom4Section(sectionId) {
  const room4 = document.getElementById('room-4');
  const target = document.getElementById(sectionId);
  if (!room4 || !target) return;

  const targetTop = target.offsetTop - 14;
  room4.scrollTo({ top: targetTop, behavior: 'smooth' });

  target.classList.remove('is-section-focused');
  void target.offsetWidth;
  target.classList.add('is-section-focused');
  setTimeout(() => target.classList.remove('is-section-focused'), 1000);
}

function checkUnlockProgress() {
  const nextBtn = document.getElementById('btnNextToRoom5');
  const lockedHint = document.getElementById('navHintLocked');
  const banner = document.getElementById('customSuccessBanner');

  if (hasSelectedSiteplanLot && hasSavedRoomCustomization) {
    if (nextBtn) {
      nextBtn.classList.remove('is-hidden');
      nextBtn.classList.add('is-unlocked');
    }
    if (lockedHint) {
      lockedHint.classList.add('is-hidden');
    }
    if (banner) {
      banner.innerHTML = '<span>✓ Denah interior tersimpan &amp; kavling terkonfirmasi! Tombol perjalanan terbuka di bawah.</span>';
      banner.classList.add('is-shown');
    }
  } else if (hasSelectedSiteplanLot && !hasSavedRoomCustomization) {
    if (nextBtn) nextBtn.classList.add('is-hidden');
    if (lockedHint) {
      lockedHint.classList.remove('is-hidden');
      lockedHint.innerHTML = '<span>🔒 Kavling terkonfirmasi! Tekan "✓ Simpan Desain Ruangan" di atas untuk membuka tombol lanjut.</span>';
    }
  } else if (!hasSelectedSiteplanLot && hasSavedRoomCustomization) {
    if (nextBtn) nextBtn.classList.add('is-hidden');
    if (lockedHint) {
      lockedHint.classList.remove('is-hidden');
      lockedHint.innerHTML = '<span>🔒 Kustomisasi ruangan tersimpan! Tekan "✓ Konfirmasi &amp; Simpan Kavling" di Site Plan untuk membuka tombol lanjut.</span>';
    }
  } else {
    if (nextBtn) nextBtn.classList.add('is-hidden');
    if (lockedHint) {
      lockedHint.classList.remove('is-hidden');
      lockedHint.innerHTML = '<span>🔒 Selesaikan kustomisasi tata ruang &amp; konfirmasi kavling di site plan untuk membuka tombol lanjut</span>';
    }
  }
}

function renderSitePlan(clusterKey) {
  currentClusterKey = clusterKey;
  const data = SITEPLAN_DATA[clusterKey] || SITEPLAN_DATA.nagoya;

  const titleEl = document.getElementById('siteplanClusterTitle');
  const shmEl = document.getElementById('siteplanShmBadge');
  const tagEl = document.getElementById('siteplanTagSub');
  const areaEl = document.getElementById('siteplanAreaSub');
  const imgEl = document.getElementById('siteplanImg');

  if (titleEl) titleEl.textContent = data.title;
  if (shmEl) shmEl.textContent = data.shmText;
  if (tagEl) tagEl.textContent = data.tagSub;
  if (areaEl) areaEl.textContent = data.areaSub;
  if (imgEl) imgEl.src = data.img;

  const statKavling = document.getElementById('statKavlingVal');
  const statPrasarana = document.getElementById('statPrasaranaVal');
  const statSarana = document.getElementById('statSaranaVal');
  const statRth = document.getElementById('statRthVal');

  if (statKavling) statKavling.textContent = data.stats.kavling;
  if (statPrasarana) statPrasarana.textContent = data.stats.prasarana;
  if (statSarana) statSarana.textContent = data.stats.sarana;
  if (statRth) statRth.textContent = data.stats.rth;

  const overlay = document.getElementById('siteplanLotsOverlay');
  if (overlay) {
    overlay.innerHTML = data.lots.map((lot) => `
      <button class="siteplan-lot-marker" style="left: ${lot.x}%; top: ${lot.y}%;" onclick="selectKavlingLot('${lot.id}', true)" type="button" title="${lot.name} (${lot.status})">
        ${lot.id}
      </button>
    `).join('');
  }

  const pillsRow = document.getElementById('kavlingPillsRow');
  if (pillsRow) {
    pillsRow.innerHTML = data.lots.map((lot) => `
      <button class="kavling-pill-btn" id="pill-${lot.id}" onclick="selectKavlingLot('${lot.id}', true)" type="button">
        ${lot.id} · ${lot.area}
      </button>
    `).join('');
  }

  if (data.lots.length > 0) {
    selectKavlingLot(data.lots[0].id, false);
  }
}

function selectKavlingLot(lotId, isUserClick = true) {
  selectedLotId = lotId;
  const data = SITEPLAN_DATA[currentClusterKey] || SITEPLAN_DATA.nagoya;
  const lot = data.lots.find((l) => l.id === lotId) || data.lots[0];
  if (!lot) return;

  document.querySelectorAll('.siteplan-lot-marker').forEach((m) => {
    m.classList.toggle('is-active', m.textContent.trim() === lot.id);
  });

  document.querySelectorAll('.kavling-pill-btn').forEach((p) => {
    p.classList.toggle('is-active', p.id === `pill-${lot.id}`);
  });

  const title = document.getElementById('kavlingTitle');
  const status = document.getElementById('kavlingStatusBadge');
  const area = document.getElementById('kavlingAreaVal');
  const type = document.getElementById('kavlingTypeVal');
  const price = document.getElementById('kavlingPriceVal');

  if (title) title.textContent = lot.name;
  if (status) {
    status.textContent = lot.status;
    status.style.color = lot.status.includes('Booked') ? '#ffb74d' : '#81c784';
    status.style.background = lot.status.includes('Booked') ? 'rgba(255, 183, 77, 0.2)' : 'rgba(46, 125, 50, 0.25)';
  }
  if (area) area.textContent = lot.area;
  if (type) type.textContent = lot.type;
  if (price) price.textContent = lot.price;

  const btnText = document.getElementById('btnSaveSiteplanText');
  if (btnText) {
    btnText.textContent = `✓ Konfirmasi & Simpan Kavling ${lot.id}`;
  }
}

/* --------------------------------------------------------------------------
   360° INTERIOR PANORAMA VIEWER (Interactive Drag & Continuous Idle Pan)
   -------------------------------------------------------------------------- */
let panoramaOffset = 0;
let isPanning360 = false;
let startX360 = 0;
let lastInteractionTime = Date.now();
let isAutoSpinning = false;

function updatePanoDegreeUI() {
  const badge = document.getElementById('panoAngleBadge');
  if (badge) {
    const rawDeg = Math.round((((panoramaOffset % 1200) + 1200) % 1200) / 1200 * 360);
    badge.textContent = `Sudut Pandang ${rawDeg}°`;
  }
}

function setPanoramaAngle(angleDeg, btnEl) {
  const track = document.getElementById('panoramaTrack');
  if (!track) return;
  panoramaOffset = (angleDeg / 360) * 1200;
  track.style.backgroundPosition = `${panoramaOffset}px center`;
  updatePanoDegreeUI();
  document.querySelectorAll('.pano-angle-chip').forEach((b) => b.classList.remove('is-active'));
  if (btnEl) btnEl.classList.add('is-active');
  lastInteractionTime = Date.now();
}

function rotatePanorama(delta) {
  const track = document.getElementById('panoramaTrack');
  if (!track) return;
  panoramaOffset += delta;
  track.style.backgroundPosition = `${panoramaOffset}px center`;
  updatePanoDegreeUI();
  lastInteractionTime = Date.now();
}

function setup360Viewer() {
  const frame = document.getElementById('house360Frame');
  const track = document.getElementById('panoramaTrack');
  if (!frame || !track) return;

  const onPointerDown = (clientX) => {
    isPanning360 = true;
    startX360 = clientX;
    lastInteractionTime = Date.now();
    frame.style.cursor = 'grabbing';
  };

  const onPointerMove = (clientX) => {
    if (!isPanning360) return;
    const deltaX = clientX - startX360;
    startX360 = clientX;
    panoramaOffset += deltaX * 0.85;
    track.style.backgroundPosition = `${panoramaOffset}px center`;
    updatePanoDegreeUI();
    lastInteractionTime = Date.now();
  };

  const onPointerUp = () => {
    isPanning360 = false;
    lastInteractionTime = Date.now();
    frame.style.cursor = 'grab';
  };

  frame.addEventListener('mousedown', (e) => onPointerDown(e.clientX));
  window.addEventListener('mousemove', (e) => onPointerMove(e.clientX));
  window.addEventListener('mouseup', onPointerUp);

  frame.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) onPointerDown(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (isPanning360 && e.touches.length === 1) {
      onPointerMove(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchend', onPointerUp);

  if (!isAutoSpinning) {
    isAutoSpinning = true;
    const autoSpinTick = () => {
      if (!isPanning360 && currentRoom === 4 && Date.now() - lastInteractionTime > 1800) {
        panoramaOffset += 0.35;
        track.style.backgroundPosition = `${panoramaOffset}px center`;
        updatePanoDegreeUI();
      }
      requestAnimationFrame(autoSpinTick);
    };
    requestAnimationFrame(autoSpinTick);
  }
}

/* --------------------------------------------------------------------------
   ROOM CUSTOMIZER & DENAH INTERIOR LOGIC
   -------------------------------------------------------------------------- */
let selectedDenahType = '60';

function selectDenahType(typeNum, btnEl) {
  selectedDenahType = typeNum;
  document.querySelectorAll('.denah-type-btn').forEach((b) => b.classList.remove('is-active'));
  if (btnEl) btnEl.classList.add('is-active');

  const floorplanImg = document.getElementById('floorplanImg');
  const badgeTitle = document.getElementById('floorplanBadgeTitle');
  const lotText = document.getElementById('denahLotText');
  const bldText = document.getElementById('denahBuildingText');
  const bedsText = document.getElementById('denahBedsText');
  const row4 = document.getElementById('roomInputRow4');

  if (typeNum === '60') {
    if (floorplanImg) floorplanImg.src = 'assets/drive/denah-tipe60.jpg';
    if (badgeTitle) badgeTitle.textContent = 'Denah Tipe 60 / LB 75';
    if (lotText) lotText.textContent = '63 m²';
    if (bldText) bldText.textContent = '75 m²';
    if (bedsText) bedsText.textContent = '3 Kamar Tidur';
    if (row4) row4.style.display = 'none';

    const lbl1 = document.getElementById('roomLabel1');
    const sub1 = document.getElementById('roomSub1');
    if (lbl1) lbl1.textContent = 'Ruangan 01 (Lt. 1)';
    if (sub1) sub1.textContent = 'Default: Kamar 1 (2,5 x 2m)';

    const lbl2 = document.getElementById('roomLabel2');
    const sub2 = document.getElementById('roomSub2');
    if (lbl2) lbl2.textContent = 'Ruangan 02 (Lt. 2)';
    if (sub2) sub2.textContent = 'Default: Kamar 2 (3 x 2,6m)';

    const lbl3 = document.getElementById('roomLabel3');
    const sub3 = document.getElementById('roomSub3');
    if (lbl3) lbl3.textContent = 'Ruangan 03 (Lt. 2)';
    if (sub3) sub3.textContent = 'Default: Kamar 3 (2 x 3,5m)';
  } else if (typeNum === '80') {
    if (floorplanImg) floorplanImg.src = 'assets/drive/denah-tipe60.jpg';
    if (badgeTitle) badgeTitle.textContent = 'Denah Tipe 80 / LB 80';
    if (lotText) lotText.textContent = '75 m²';
    if (bldText) bldText.textContent = '80 m²';
    if (bedsText) bedsText.textContent = '3 Kamar Tidur';
    if (row4) row4.style.display = 'none';

    const lbl1 = document.getElementById('roomLabel1');
    const sub1 = document.getElementById('roomSub1');
    if (lbl1) lbl1.textContent = 'Ruangan 01 (Lt. 1)';
    if (sub1) sub1.textContent = 'Default: Kamar 1 (2,5 x 2,5m)';

    const lbl2 = document.getElementById('roomLabel2');
    const sub2 = document.getElementById('roomSub2');
    if (lbl2) lbl2.textContent = 'Ruangan 02 (Lt. 2)';
    if (sub2) sub2.textContent = 'Default: Kamar 2 (3 x 3m)';

    const lbl3 = document.getElementById('roomLabel3');
    const sub3 = document.getElementById('roomSub3');
    if (lbl3) lbl3.textContent = 'Ruangan 03 (Lt. 2)';
    if (sub3) sub3.textContent = 'Default: Kamar 3 (2,5 x 3,5m)';
  } else if (typeNum === '110') {
    if (floorplanImg) floorplanImg.src = 'assets/drive/denah-tipe110.jpg';
    if (badgeTitle) badgeTitle.textContent = 'Denah Tipe 110 / LB 110';
    if (lotText) lotText.textContent = '110 m²';
    if (bldText) bldText.textContent = '110 m²';
    if (bedsText) bedsText.textContent = '4 Kamar Tidur (3 Mobil)';
    if (row4) row4.style.display = 'flex';

    const lbl1 = document.getElementById('roomLabel1');
    const sub1 = document.getElementById('roomSub1');
    if (lbl1) lbl1.textContent = 'Ruangan 01 (Lt. 1)';
    if (sub1) sub1.textContent = 'Default: Kamar 1 (2,3 x 2,5m)';

    const lbl2 = document.getElementById('roomLabel2');
    const sub2 = document.getElementById('roomSub2');
    if (lbl2) lbl2.textContent = 'Ruangan 02 (Lt. 1)';
    if (sub2) sub2.textContent = 'Default: Kamar 2 (2,5 x 2,5m)';

    const lbl3 = document.getElementById('roomLabel3');
    const sub3 = document.getElementById('roomSub3');
    if (lbl3) lbl3.textContent = 'Ruangan 03 (Lt. 2)';
    if (sub3) sub3.textContent = 'Default: Kamar 3 (2,5 x 2,4m)';
  }
}

function setRoomPreset(inputId, presetText) {
  const input = document.getElementById(inputId);
  if (input) {
    input.value = presetText;
  }
}

function updateCustomizerTotal() {
  // Optional add-ons recalculation
}

function saveRoomCustomization() {
  hasSavedRoomCustomization = true;
  const banner = document.getElementById('customSuccessBanner');
  if (banner) {
    banner.innerHTML = '<span>✓ Desain ruangan tersimpan! Menggeser ke Site Plan untuk konfirmasi kavling...</span>';
    banner.classList.add('is-shown');
  }

  checkUnlockProgress();

  // Auto scroll down to siteplan with smooth transition
  setTimeout(() => {
    scrollToRoom4Section('siteplanCard');
  }, 350);

  unlockCard({ id: 22, title: 'Kustomisasi Denah Interior Tersimpan', room: 'Ruang Rumah' });
}

function saveSiteplanChoice() {
  hasSelectedSiteplanLot = true;
  const data = SITEPLAN_DATA[currentClusterKey] || SITEPLAN_DATA.nagoya;
  const lot = data.lots.find((l) => l.id === selectedLotId) || data.lots[0];
  const lotLabel = lot ? lot.name : (selectedLotId || 'Kavling');

  const banner = document.getElementById('siteplanSuccessBanner');
  if (banner) {
    banner.innerHTML = `<span>✓ Pilihan <strong>${lotLabel}</strong> berhasil dikonfirmasi!</span>`;
    banner.classList.add('is-shown');
  }

  const btnText = document.getElementById('btnSaveSiteplanText');
  if (btnText) {
    btnText.textContent = `✓ ${lotLabel} Terkonfirmasi`;
  }

  checkUnlockProgress();

  if (hasSelectedSiteplanLot && hasSavedRoomCustomization) {
    const room4Section = document.getElementById('room-4');
    if (room4Section) {
      setTimeout(() => {
        room4Section.scrollTo({ top: room4Section.scrollHeight, behavior: 'smooth' });
      }, 250);
    }
  } else if (!hasSavedRoomCustomization) {
    setTimeout(() => {
      scrollToRoom4Section('customizerCard');
    }, 450);
  }

  unlockCard({ id: 23, title: `Kavling ${lotLabel} Terkonfirmasi`, room: 'Ruang Rumah' });
}

/* --------------------------------------------------------------------------
   6. RUANG HITUNG — KPR CALCULATOR (Official Nov 2026 Prices & 8% KPR Rate)
   -------------------------------------------------------------------------- */
function formatRupiahMillion(million) {
  if (million >= 1000) {
    return `Rp ${(million / 1000).toFixed(2).replace('.', ',').replace(/,00$/, '')} Miliar`;
  }
  return `Rp ${million} Juta`;
}

function updateCalc() {
  const unit = HOUSE_UNITS[selectedUnitKey] || HOUSE_UNITS.nagoya;
  const cashMillion = unit.priceCashMillion;
  const kprBaseMillion = unit.priceKprMillion;

  const dpSlider = document.getElementById('calcDpSlider');
  const tenorSlider = document.getElementById('calcTenorSlider');
  const dpPct = parseInt(dpSlider.value, 10);
  const tenorY = parseInt(tenorSlider.value, 10);

  dpSlider.style.setProperty('--pct', `${((dpPct - 10) / (30 - 10)) * 100}%`);
  tenorSlider.style.setProperty('--pct', `${((tenorY - 5) / (25 - 5)) * 100}%`);

  const dpAmount = Math.round((kprBaseMillion * dpPct) / 100);
  const loanM = kprBaseMillion - dpAmount;

  const monthlyRate = 0.08 / 12;
  const months = tenorY * 12;
  const factor = Math.pow(1 + monthlyRate, months);
  const monthlyM = (loanM * (monthlyRate * factor)) / (factor - 1);

  const formattedPrice = formatRupiahMillion(cashMillion);
  const formattedMonthly = `Rp ${monthlyM.toFixed(1).replace('.', ',')} jt / bln`;

  document.getElementById('calcPriceText').textContent = formattedPrice;
  document.getElementById('calcDpPct').textContent = `${dpPct}%`;
  document.getElementById('calcTenorVal').textContent = `${tenorY} Tahun`;
  document.getElementById('calcDpText').textContent = `Rp ${dpAmount} jt`;
  document.getElementById('calcMonthlyResult').textContent = formattedMonthly;

  const finalNameEl = document.getElementById('finalUnitName');
  const finalPriceEl = document.getElementById('finalUnitPrice');
  if (finalNameEl) finalNameEl.textContent = unit.name;
  if (finalPriceEl) finalPriceEl.textContent = formattedPrice;
}

/* --------------------------------------------------------------------------
   7. QUICK MODAL SHEET (Rumah Saya / WA / Booking)
   -------------------------------------------------------------------------- */
function openQuickModal(type) {
  const backdrop = document.getElementById('modalBackdrop');
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');

  if (type === 'cards') {
    title.textContent = `Rumah Saya (${collectedCards.length}/99 Kartu)`;
    body.innerHTML = `
      <p class="room-story" style="margin-bottom:12px;">
        <strong>Pilihan Ritme:</strong> ${selectedRhythm}
      </p>
      <div class="info-list">
        ${collectedCards
          .map(
            (c) => `
          <div class="info-row">
            <span>${c.title}</span>
            <strong>#${String(c.id).padStart(2, '0')}</strong>
          </div>`
          )
          .join('')}
      </div>
    `;
  } else if (type === 'wa') {
    title.textContent = 'Tanya via WhatsApp';
    body.innerHTML = `
      <p class="room-story">
        Terhubung langsung dengan konsultan rumah kami — tanpa spam, hanya jawaban jujur sesuai kebutuhan Anda.
      </p>
      <button class="btn-primary-forest" onclick="closeQuickModal()" type="button">
        <span>Kirim Pesan WhatsApp Sekarang</span>
        <span>→</span>
      </button>
    `;
  } else if (type === 'save') {
    const unit = HOUSE_UNITS[selectedUnitKey] || HOUSE_UNITS.nagoya;
    const priceText = document.getElementById('calcPriceText').textContent;
    const monthlyText = document.getElementById('calcMonthlyResult').textContent;
    const dpPct = document.getElementById('calcDpPct').textContent;
    const tenorVal = document.getElementById('calcTenorVal').textContent;

    const config = {
      unit: unit.name,
      price: priceText,
      dp: dpPct,
      tenor: tenorVal,
      monthly: monthlyText,
      cards: collectedCards.length,
      savedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem('theParkSavedConfig', JSON.stringify(config));
    } catch (_) {}

    title.textContent = 'Konfigurasi Tersimpan';
    body.innerHTML = `
      <p class="room-story" style="color: var(--text-muted); margin-bottom:12px;">
        Pilihan rumah dan simulasi Anda di The Park Townhouse Sukoharjo sudah disimpan:
      </p>
      <div class="info-list" style="margin-bottom:14px;">
        <div class="info-row"><span>Tipe Unit</span><strong>${unit.name}</strong></div>
        <div class="info-row"><span>Harga Cash Keras (Nov 2026)</span><strong>${priceText}</strong></div>
        <div class="info-row"><span>Skema KPR</span><strong>DP ${dpPct} · ${tenorVal}</strong></div>
        <div class="info-row"><span>Ilustrasi Cicilan</span><strong>${monthlyText}</strong></div>
      </div>
      <button class="btn-primary-forest" onclick="closeQuickModal()" type="button">
        <span>Selesai</span>
        <span>→</span>
      </button>
    `;
  } else if (type === 'visit' || type === 'video' || type === 'booking') {
    const unit = HOUSE_UNITS[selectedUnitKey] || HOUSE_UNITS.nagoya;
    const labels = {
      visit: 'Jadwalkan Kunjungan Lokasi',
      video: 'Video Call Tur Rumah Contoh',
      booking: 'Reservasi Unit (Booking Fee Rp 5 Juta)',
    };
    title.textContent = labels[type];
    body.innerHTML = `
      <p class="room-story">
        Permintaan Anda untuk <strong>${labels[type]}</strong> (${unit.name}) siap diproses bersama <strong>Mr Andara (WA 0882-0073-92379)</strong> di Marketing Gallery Kp. Duabelasan, Jombor, Bendosari, Sukoharjo.
      </p>
      <div class="ethics-note">
        Booking fee Rp 5.000.000 mengurangi DP bila berlanjut dan hanya dibayarkan ke rekening resmi <strong>PT Andara Rejo Makmur</strong>.
      </div>
      <button class="btn-primary-forest" onclick="closeQuickModal()" type="button">
        <span>Konfirmasi Langkah Ini</span>
        <span>→</span>
      </button>
    `;
  }

  backdrop.classList.add('is-open');
}

function closeQuickModal() {
  document.getElementById('modalBackdrop').classList.remove('is-open');
}

/* --------------------------------------------------------------------------
   LEAFLET RADIUS ANALYZER & INTERACTIVE MAP ENGINE
   -------------------------------------------------------------------------- */
const SUKOHARJO_CENTER = [-7.6833, 110.8405];

const MAP_FACILITIES = [
  {
    id: 'rsud',
    name: 'RSUD Ir. Soekarno',
    short: 'RSUD Soekarno',
    category: 'KESEHATAN',
    latLng: [-7.6908, 110.8335],
    distance: 2.1,
    duration: '6 mnt berkendara',
    iconType: 'hospital',
    desc: 'Rumah sakit umum daerah tipe B rujukan utama dengan fasilitas IGD 24 jam dan poliklinik spesialis lengkap.',
    sellingPoint: 'Jaminan penanganan medis darurat dan fasilitas kesehatan terbaik dalam hitungan menit.'
  },
  {
    id: 'sman1',
    name: 'SMA Negeri 1 Sukoharjo',
    short: 'SMAN 1',
    category: 'PENDIDIKAN',
    latLng: [-7.6865, 110.8385],
    distance: 2.5,
    duration: '5 mnt berkendara',
    iconType: 'school',
    desc: 'Sekolah menengah atas negeri unggulan terfavorit dengan akreditasi A dan fasilitas belajar modern.',
    sellingPoint: 'Pendidikan anak terjamin di sekolah terbaik tanpa kelelahan jarak tempuh harian.'
  },
  {
    id: 'alun-alun',
    name: 'Alun-Alun Satya Negara',
    short: 'Alun-Alun',
    category: 'PEMERINTAHAN',
    latLng: [-7.6806, 110.8427],
    distance: 3.2,
    duration: '8 mnt berkendara',
    iconType: 'government',
    desc: 'Pusat ruang terbuka publik, area olahraga pagi, kuliner malam, sekaligus kompleks Pemkab Sukoharjo.',
    sellingPoint: 'Dekat pusat layanan sipil daerah & ruang rekreasi keluarga akhir pekan.'
  },
  {
    id: 'stasiun',
    name: 'Stasiun Sukoharjo',
    short: 'Stasiun',
    category: 'TRANSPORTASI',
    latLng: [-7.6775, 110.8478],
    distance: 2.8,
    duration: '7 mnt berkendara',
    iconType: 'train',
    desc: 'Stasiun kereta api aktif melayani komuter rute Solo-Wonogiri dengan akses bebas macet ke pusat Solo.',
    sellingPoint: 'Alternatif mobilitas publik terpadu dan ramah lingkungan untuk aktivitas harian.'
  },
  {
    id: 'rs-indriati',
    name: 'RS Indriati Solo Baru',
    short: 'RS Indriati',
    category: 'KESEHATAN',
    latLng: [-7.6045, 110.8172],
    distance: 5.8,
    duration: '12 mnt berkendara',
    iconType: 'hospital',
    desc: 'Rumah sakit swasta rujukan modern dengan sentra onkologi, bedah saraf, dan fasilitas rawat inap eksekutif.',
    sellingPoint: 'Pilihan rumah sakit premium berstandar internasional dalam jangkauan cepat kawasan Solo Baru.'
  },
  {
    id: 'pakuwon',
    name: 'Pakuwon Mall Solo Baru',
    short: 'Pakuwon Mall',
    category: 'PERBELANJAAN',
    latLng: [-7.5995, 110.8160],
    distance: 6.5,
    duration: '14 mnt berkendara',
    iconType: 'market',
    desc: 'Pusat perbelanjaan dan lifestyle megah Solo Baru dengan bioskop XXI, resto internasional, dan ritel terlengkap.',
    sellingPoint: 'Destinasi hiburan, belanja keluarga, dan kuliner modern akhir pekan hanya belasan menit.'
  }
];

const MAP_EXTRA_SPOTS = [
  {
    id: 'gelora',
    name: 'Gelora Merdeka & Lapangan Tenis',
    short: 'Gelora & Tenis',
    category: 'OLAHRAGA & REKREASI',
    latLng: [-7.6855, 110.8445],
    distance: 1.2,
    duration: '2 mnt berkendara',
    iconType: 'sports',
    desc: 'Kompleks gelanggang olahraga outdoor terawat, lapangan tenis aktif, dan jogging track komunitas.',
    sellingPoint: 'Kebugaran dan gaya hidup aktif seluruh anggota keluarga hanya sepelemparan batu dari hunian.'
  },
  {
    id: 'sudirman',
    name: 'Jl. Jendral Sudirman Sukoharjo',
    short: 'Jl. Sudirman',
    category: 'AKSES UTAMA',
    latLng: [-7.6840, 110.8410],
    distance: 0.8,
    duration: '1 mnt berkendara',
    iconType: 'cluster',
    desc: 'Boulevard utama kota yang menyatukan perkantoran perbankan, sentra niaga, dan pusat kota Sukoharjo.',
    sellingPoint: 'Konektivitas jalan utama terdepan: keluar cluster langsung terhubung jalan protokol.'
  }
];

const MAP_CLUSTERS = [
  {
    id: 'nagoya',
    name: 'Nagoya Diamond',
    short: 'Nagoya',
    tag: 'Diamond',
    category: 'KLASTER THE PARK',
    latLng: [-7.6836, 110.8415],
    distance: 0.0,
    duration: 'Titik Hunian Utama',
    iconType: 'cluster',
    desc: 'Tipe termewah 2 lantai berkonsep Modern Japandi dengan inner courtyard privat, garasi dalam, dan fasad berkarakter.',
    sellingPoint: 'Cluster paling prestisius dengan privasi eksklusif di jantung kawasan The Park Townhouse Sukoharjo.'
  },
  {
    id: 'osaka',
    name: 'Osaka Gold',
    short: 'Osaka',
    tag: 'Gold',
    category: 'KLASTER THE PARK',
    latLng: [-7.6818, 110.8402],
    distance: 0.1,
    duration: 'Titik Hunian Utama',
    iconType: 'cluster',
    desc: 'Tipe 2 lantai efisien dan elegan, memaksimalkan pencahayaan alami dan sirkulasi angin silang yang sejuk.',
    sellingPoint: 'Pilihan favorit keluarga modern yang mengutamakan fungsi, estetika, dan ketenangan hidup.'
  },
  {
    id: 'tokyo',
    name: 'Tokyo Emerald',
    short: 'Tokyo',
    tag: 'Emerald',
    category: 'KLASTER THE PARK',
    latLng: [-7.6845, 110.8388],
    distance: 0.1,
    duration: 'Titik Hunian Utama',
    iconType: 'cluster',
    desc: 'Tipe 2 lantai kontemporer dengan perpaduan elemen kayu alami, balkon lantai atas, dan tata ruang lapang.',
    sellingPoint: 'Kombinasi sempurna kenyamanan resort privat dan kemudahan akses ke seluruh fasilitas kota.'
  }
];

let parkMap = null;
let modalMap = null;
let currentSearchRadius = 5000;
let activeClusterFocus = 'all';
let mapCircleLayers = [];
let modalCircleLayers = [];

function getCategoryIconSvg(iconType) {
  switch (iconType) {
    case 'government':
      return `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>`;
    case 'hospital':
      return `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M12 8v8M8 12h8"/></svg>`;
    case 'school':
      return `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 3 3 5 6 5s6-2 6-5v-5"/></svg>`;
    case 'train':
      return `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="3" width="16" height="16" rx="3"/><path d="M4 11h16M12 3v8M8 19l-2 3M16 19l2 3M9 15h.01M15 15h.01"/></svg>`;
    case 'sports':
      return `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 2a15 15 0 0 1 0 20M2 12a15 15 0 0 1 20 0"/></svg>`;
    case 'market':
      return `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`;
    case 'cluster':
    default:
      return `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
  }
}

function setupLeafletMap(containerId, isModal) {
  if (typeof L === 'undefined') return null;
  const container = document.getElementById(containerId);
  if (!container) return null;

  const map = L.map(containerId, {
    center: SUKOHARJO_CENTER,
    zoom: 13.5,
    scrollWheelZoom: true,
    zoomControl: true,
    attributionControl: true
  });

  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.esri.com/">Esri</a>'
  }).addTo(map);

  const outerCircle = L.circle(SUKOHARJO_CENTER, {
    radius: currentSearchRadius,
    color: '#2e7d32',
    weight: 2,
    fillColor: '#a5d6a7',
    fillOpacity: 0.16
  }).addTo(map);

  const innerCircle = L.circle(SUKOHARJO_CENTER, {
    radius: Math.min(currentSearchRadius * 0.25, 1200),
    color: '#4caf50',
    weight: 1.2,
    dashArray: '4, 4',
    fillColor: '#c8e6c9',
    fillOpacity: 0.22
  }).addTo(map);

  if (isModal) {
    modalCircleLayers = [outerCircle, innerCircle];
  } else {
    mapCircleLayers = [outerCircle, innerCircle];
  }

  const centerHomeIcon = L.divIcon({
    className: '',
    html: `<div class="center-home-divicon" title="The Park Townhouse"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18]
  });

  const centerMarker = L.marker(SUKOHARJO_CENTER, { icon: centerHomeIcon }).addTo(map);
  centerMarker.on('click', () => {
    openLocationCard({
      name: 'THE PARK TOWNHOUSE',
      category: 'KAWASAN HUNIAN',
      duration: 'Pusat Kawasan',
      distance: 0,
      iconType: 'cluster',
      desc: 'Kawasan townhouse 2 lantai bergaya modern Japandi di lokasi paling strategis Sukoharjo, dilengkapi fasilitas one gate system dan keamanan 24 jam.',
      sellingPoint: 'Akses cepat ke seluruh sentra kota, tetap tenang dan asri untuk pulang.'
    }, isModal);
  });

  const clusterIcon = (name, tag) => L.divIcon({
    className: '',
    html: `<div class="cluster-pill-divicon"><span class="cluster-pill-dot"></span><span>${name}</span><span class="cluster-pill-sub">${tag}</span></div>`,
    iconSize: [110, 28],
    iconAnchor: [55, 14]
  });

  MAP_CLUSTERS.forEach((c) => {
    const marker = L.marker(c.latLng, { icon: clusterIcon(c.short, c.tag) }).addTo(map);
    marker.on('click', () => {
      openLocationCard(c, isModal);
      map.panTo(c.latLng, { animate: true, duration: 0.5 });
    });
  });

  const facilityIcon = (item) => L.divIcon({
    className: '',
    html: `<div class="facility-pin-divicon" data-id="${item.id}" title="${item.name}">${getCategoryIconSvg(item.iconType)}<span>${item.short}</span></div>`,
    iconSize: [110, 28],
    iconAnchor: [55, 14]
  });

  MAP_FACILITIES.forEach((f) => {
    const marker = L.marker(f.latLng, { icon: facilityIcon(f) }).addTo(map);
    marker.on('click', () => {
      openFacilityDetail(f.id);
    });
  });

  MAP_EXTRA_SPOTS.forEach((s) => {
    const marker = L.marker(s.latLng, { icon: facilityIcon(s) }).addTo(map);
    marker.on('click', () => {
      openFacilityDetail(s.id);
    });
  });

  map.on('click', (e) => {
    if (e.originalEvent && e.originalEvent.target && e.originalEvent.target.closest('.leaflet-marker-icon')) return;
    if (isModal) {
      closeModalLocationCard();
    } else {
      closeLocationCard();
    }
  });

  return map;
}

function setSearchRadius(radiusMeters, btnEl) {
  currentSearchRadius = radiusMeters;
  const label = radiusMeters >= 1000 ? `${radiusMeters / 1000} km` : `${radiusMeters} m`;

  const badge1 = document.getElementById('activeRadiusBadge');
  const badge2 = document.getElementById('modalActiveRadiusBadge');
  if (badge1) badge1.textContent = label;
  if (badge2) badge2.textContent = label;

  document.querySelectorAll('.radius-btn').forEach((b) => {
    b.classList.toggle('is-active', parseInt(b.dataset.radius, 10) === radiusMeters);
  });

  [mapCircleLayers, modalCircleLayers].forEach((layers) => {
    if (layers && layers.length > 0) {
      layers[0].setRadius(radiusMeters);
      layers[1].setRadius(Math.min(radiusMeters * 0.25, 1200));
    }
  });

  updateFacilitiesCount();
  renderFacilityItems();

  const zoomMap = { 500: 16, 1000: 15, 3000: 14, 5000: 13.5, 10000: 12, 25000: 10.5 };
  if (parkMap) {
    parkMap.setView(SUKOHARJO_CENTER, zoomMap[radiusMeters] || 13.5, { animate: true });
  }
  if (modalMap) {
    modalMap.setView(SUKOHARJO_CENTER, zoomMap[radiusMeters] || 13.5, { animate: true });
  }
}

function updateFacilitiesCount() {
  const radiusKm = currentSearchRadius / 1000;
  const count = MAP_FACILITIES.filter((f) => f.distance <= radiusKm).length;
  const text = `${count} dari ${MAP_FACILITIES.length} fasilitas`;

  const h1 = document.getElementById('facilitiesCountHeading');
  const h2 = document.getElementById('modalFacilitiesCountHeading');
  if (h1) h1.textContent = text;
  if (h2) h2.textContent = text;
}

function focusCluster(clusterKey, btnEl) {
  activeClusterFocus = clusterKey;
  document.querySelectorAll('.cluster-btn').forEach((b) => {
    b.classList.toggle('is-active', b.dataset.cluster === clusterKey);
  });

  const isModalOpen = document.getElementById('radiusAnalysisModal') &&
    document.getElementById('radiusAnalysisModal').classList.contains('is-open');
  const targetMap = isModalOpen && modalMap ? modalMap : parkMap;

  if (clusterKey === 'all') {
    if (targetMap) targetMap.setView(SUKOHARJO_CENTER, 14, { animate: true });
    return;
  }

  const cluster = MAP_CLUSTERS.find((c) => c.id === clusterKey);
  if (cluster && targetMap) {
    targetMap.setView(cluster.latLng, 16, { animate: true });
    openLocationCard(cluster, isModalOpen);
  }
}

function openLocationCard(item, isModal) {
  const cardId = isModal ? 'modalLocationCard' : 'mapLocationCard';
  const card = document.getElementById(cardId);
  if (!card) return;

  const categoryEl = document.getElementById(isModal ? 'modalCardCategory' : 'mapCardCategory');
  const distTextEl = document.getElementById(isModal ? 'modalCardDistanceText' : 'mapCardDistanceText');
  const iconBadgeEl = document.getElementById(isModal ? 'modalCardIconBadge' : 'mapCardIconBadge');
  const titleEl = document.getElementById(isModal ? 'modalCardTitle' : 'mapCardTitle');
  const descEl = document.getElementById(isModal ? 'modalCardDesc' : 'mapCardDesc');
  const sellingTextEl = document.getElementById(isModal ? 'modalCardSellingPointText' : 'mapCardSellingPointText');

  if (categoryEl) categoryEl.textContent = item.category || 'FASILITAS';
  if (distTextEl) {
    distTextEl.textContent = item.distance > 0 ? `~${item.distance} km · ${item.duration}` : item.duration;
  }
  if (iconBadgeEl) iconBadgeEl.innerHTML = getCategoryIconSvg(item.iconType);
  if (titleEl) titleEl.textContent = item.name;
  if (descEl) descEl.textContent = item.desc;
  if (sellingTextEl) {
    sellingTextEl.innerHTML = `<strong>Nilai jual:</strong> ${item.sellingPoint}`;
  }

  card.classList.add('is-visible');
  card.setAttribute('aria-hidden', 'false');
}

function closeLocationCard() {
  const card = document.getElementById('mapLocationCard');
  if (card) {
    card.classList.remove('is-visible');
    card.setAttribute('aria-hidden', 'true');
  }
  document.querySelectorAll('.dist-chip').forEach((b) => b.classList.remove('is-active'));
  document.querySelectorAll('.facility-pin-divicon').forEach((pin) => {
    pin.classList.remove('is-active-pin');
  });
  if (parkMap) {
    parkMap.flyTo(SUKOHARJO_CENTER, 14, { animate: true, duration: 0.6 });
  }
}

function closeModalLocationCard() {
  const card = document.getElementById('modalLocationCard');
  if (card) {
    card.classList.remove('is-visible');
    card.setAttribute('aria-hidden', 'true');
  }
}

function openFacilityDetail(id, btnEl) {
  const allList = [...MAP_FACILITIES, ...MAP_EXTRA_SPOTS, ...MAP_CLUSTERS];
  const item = allList.find((f) => f.id === id);
  if (!item) return;

  // 1. Highlight clicked chip & smooth scroll strictly within chips container (prevents window horizontal shift)
  document.querySelectorAll('.dist-chip').forEach((b) => b.classList.remove('is-active'));
  const targetChip = btnEl || document.querySelector(`.dist-chip[data-facility="${id}"]`);
  const chipsContainer = document.getElementById('distanceChipsContainer');
  if (targetChip) {
    targetChip.classList.add('is-active');
    if (chipsContainer) {
      const scrollPos = targetChip.offsetLeft - (chipsContainer.clientWidth / 2) + (targetChip.clientWidth / 2);
      chipsContainer.scrollTo({ left: Math.max(0, scrollPos), behavior: 'smooth' });
    }
  }

  // 2. Fly smoothly to target spot (slight south offset keeps pin visible above compact bottom card)
  if (parkMap) {
    const latOffset = item.latLng[0] - 0.0022;
    const targetZoom = item.distance > 5 ? 14.5 : 15.5;
    parkMap.flyTo([latOffset, item.latLng[1]], targetZoom, { animate: true, duration: 0.8 });
  }

  // 3. Highlight pin on map
  document.querySelectorAll('.facility-pin-divicon').forEach((pin) => {
    pin.classList.remove('is-active-pin');
  });
  const activePinEl = document.querySelector(`.facility-pin-divicon[data-id="${id}"]`);
  if (activePinEl) {
    activePinEl.classList.add('is-active-pin');
  }

  // 4. Open location detail card
  openLocationCard(item, false);
}

function renderFacilityItems() {
  const list1 = document.getElementById('facilityItemsList');
  const list2 = document.getElementById('modalFacilityItemsList');
  if (!list1 && !list2) return;

  const maxRefDistance = Math.max(currentSearchRadius / 1000, 6.5);
  const html = MAP_FACILITIES.map((f) => {
    const percent = Math.min(Math.round((f.distance / maxRefDistance) * 100), 100);
    const inRadius = f.distance <= (currentSearchRadius / 1000);

    return `
      <div class="facility-item-card" onclick="openFacilityDetail('${f.id}')" role="button" tabindex="0">
        <div class="facility-card-top">
          <div class="facility-card-name-group">
            <span class="facility-card-icon">${getCategoryIconSvg(f.iconType)}</span>
            <span class="facility-card-name">${f.name}</span>
          </div>
          <span class="facility-card-dist">${f.distance} km</span>
        </div>
        <div class="facility-progress-track">
          <div class="facility-progress-fill" style="width: ${percent}%; background: ${inRadius ? '#2e7d32' : '#a8b5ab'};"></div>
        </div>
        <div class="facility-card-meta">~${f.distance} km · ${f.duration}</div>
      </div>
    `;
  }).join('');

  if (list1) list1.innerHTML = html;
  if (list2) list2.innerHTML = html;
}

function openRadiusModal() {
  const modal = document.getElementById('radiusAnalysisModal');
  if (!modal) return;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');

  setTimeout(() => {
    if (!modalMap) {
      modalMap = setupLeafletMap('modalLeafletMap', true);
    } else {
      modalMap.invalidateSize();
      modalMap.setView(SUKOHARJO_CENTER, 13.5, { animate: false });
    }
    renderFacilityItems();
    updateFacilitiesCount();
  }, 180);
}

function closeRadiusModal() {
  const modal = document.getElementById('radiusAnalysisModal');
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  closeModalLocationCard();
}

function toggleMapModal(show) {
  if (show) openRadiusModal();
  else closeRadiusModal();
}

function handleRoom3Enter() {
  setTimeout(() => {
    if (!parkMap) {
      parkMap = setupLeafletMap('parkLeafletMap', false);
    } else {
      parkMap.invalidateSize();
      parkMap.setView(SUKOHARJO_CENTER, 14, { animate: false });
    }
  }, 220);
}

/* --------------------------------------------------------------------------
   INIT ON LOAD
   -------------------------------------------------------------------------- */
window.addEventListener('resize', () => {
  openingSparks.resize();
});

window.addEventListener('DOMContentLoaded', () => {
  updateCalc();
  updateBackgroundScene(1);
  renderFacilityItems();
  updateFacilitiesCount();
  setup360Viewer();
  renderSitePlan('nagoya');
  runAfterDelayOpening();
});
