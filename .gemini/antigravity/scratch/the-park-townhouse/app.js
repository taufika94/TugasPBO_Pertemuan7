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

function prepareOpeningStandby() {
  clearOpeningTimers();
  openingSparks.stop();
  openingSparks.resize();

  phoneShell.classList.remove('app-entered');
  document.querySelectorAll('#room-1 .stagger-item').forEach((el) => {
    el.classList.remove('is-visible');
  });

  openingOverlay.classList.remove('is-entering-room');
  openingOverlay.setAttribute('aria-hidden', 'false');
  openingOverlay.setAttribute('data-stage', 'waiting');
  openingCaption.textContent = 'Setiap langkah jauh, selalu mencari jalan pulang…';

  const btnOpenDoor = document.getElementById('btnOpenDoor');
  if (btnOpenDoor) {
    btnOpenDoor.classList.remove('is-hidden');
  }

  openingSparks.start();
}

function startDoorOpeningSequence() {
  clearOpeningTimers();
  const btnOpenDoor = document.getElementById('btnOpenDoor');
  if (btnOpenDoor) {
    btnOpenDoor.classList.add('is-hidden');
  }

  // Stage 1 (Warm Seam Light & Golden Spark Burst)
  openingOverlay.setAttribute('data-stage', 'spark');
  openingCaption.textContent = 'Ada cahaya yang menunggu di balik pintu…';
  openingSparks.burst(openingSparks.width / 2, openingSparks.height * 0.49, 48, 1.15);

  // Stage 2 (Double doors swing open + spark cascade after 1000ms)
  openingTimers.push(
    setTimeout(() => {
      openingOverlay.setAttribute('data-stage', 'door-open');
      openingCaption.textContent = 'Selamat datang di The Park Townhouse…';
      openingSparks.burst(openingSparks.width / 2, openingSparks.height * 0.49, 64, 1.4);
    }, 1000)
  );

  // Stage 3 (Smoothly enter Room 01 after 2300ms)
  openingTimers.push(
    setTimeout(() => {
      finishOpening();
    }, 2300)
  );
}

function runAfterDelayOpening() {
  prepareOpeningStandby();
}

document.getElementById('skipOpeningBtn').addEventListener('click', finishOpening);
document.getElementById('replayOpeningBtn').addEventListener('click', () => {
  goToRoomImmediate(1);
  prepareOpeningStandby();
});

const openDoorBtnEl = document.getElementById('btnOpenDoor');
if (openDoorBtnEl) {
  openDoorBtnEl.addEventListener('click', startDoorOpeningSequence);
}

/* --------------------------------------------------------------------------
   4. PARALLAX HOUSE BACKGROUND & LAYERED ROOM TRANSITIONS
   -------------------------------------------------------------------------- */
let unlockedKeunggulanCount = 3;

function animateKeunggulanCounter(targetCount, toastMessage = '') {
  const label = document.getElementById('cardsCountLabel');
  const pill = document.getElementById('openCardsModalBtn');
  if (!label) return;

  const startVal = unlockedKeunggulanCount;
  const endVal = Math.min(99, Math.max(1, targetCount));
  unlockedKeunggulanCount = endVal;

  if (pill) {
    pill.classList.remove('is-incrementing');
    void pill.offsetWidth;
    pill.classList.add('is-incrementing');
  }

  const duration = 600;
  const startTime = performance.now();

  function updateNumber(now) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    const ease = 1 - Math.pow(1 - progress, 3);
    const currentVal = Math.round(startVal + (endVal - startVal) * ease);
    label.textContent = `${currentVal}/99`;

    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    } else {
      label.textContent = `${endVal}/99`;
    }
  }

  requestAnimationFrame(updateNumber);

  if (toastMessage) {
    showKeunggulanToast(toastMessage, endVal);
  }
}

function showKeunggulanToast(message, totalCount) {
  let toast = document.getElementById('keunggulanFloatingToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'keunggulanFloatingToast';
    toast.className = 'keunggulan-floating-toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span class="toast-dot"></span>
    <span>${message}</span>
    <span class="toast-num">${totalCount}/99</span>
  `;

  toast.classList.add('is-visible');

  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 2500);
}

function setKeunggulanCount(targetCount, toastReason = '') {
  const target = Math.min(99, Math.max(unlockedKeunggulanCount, targetCount));
  if (target > unlockedKeunggulanCount) {
    const diff = target - unlockedKeunggulanCount;
    animateKeunggulanCounter(target, `+${diff} Keunggulan (${toastReason})`);
  }
}

function updateKeunggulanProgress(roomNum) {
  if (roomNum === 1) {
    setKeunggulanCount(3, 'Prolog & Alamat');
  } else if (roomNum === 2) {
    setKeunggulanCount(12, 'Karakter 3 Klaster');
  } else if (roomNum === 3) {
    setKeunggulanCount(21, 'Akses Pusat Kota & Fasilitas Penting');
  } else if (roomNum === 4) {
    setKeunggulanCount(43, 'Desain Japandi & Tata Ruang 22 Poin');
  } else if (roomNum === 5) {
    setKeunggulanCount(73, 'Clubhouse, Pool & Rekreasi');
  } else if (roomNum === 6) {
    setKeunggulanCount(90, '3 Opsi Skema Pembayaran & Legalitas');
  } else if (roomNum === 7) {
    setKeunggulanCount(99, 'Kawasan Penuh & 99 Keunggulan');
  }
}

function unlockCard(card) {
  if (card && card.id) {
    if (!collectedCards.some((c) => c.id === card.id)) {
      collectedCards.push(card);
    }
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
      updateKeunggulanProgress(roomNum);
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

  updateKeunggulanProgress(roomNum);
  currentRoom = roomNum;
  if (roomNum === 3) {
    handleRoom3Enter();
  } else if (roomNum === 5) {
    updateFacilityView();
    startFacilityCarousel();
  } else if (roomNum === 6) {
    updatePaymentCalc();
    stopFacilityCarousel();
  } else {
    stopFacilityCarousel();
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
      lockedHint.innerHTML = '<span>Kavling terkonfirmasi! Tekan "✓ Simpan Desain Ruangan" di atas untuk membuka tombol lanjut.</span>';
    }
  } else if (!hasSelectedSiteplanLot && hasSavedRoomCustomization) {
    if (nextBtn) nextBtn.classList.add('is-hidden');
    if (lockedHint) {
      lockedHint.classList.remove('is-hidden');
      lockedHint.innerHTML = '<span>Kustomisasi ruangan tersimpan! Tekan "✓ Konfirmasi &amp; Simpan Kavling" di Site Plan untuk membuka tombol lanjut.</span>';
    }
  } else {
    if (nextBtn) nextBtn.classList.add('is-hidden');
    if (lockedHint) {
      lockedHint.classList.remove('is-hidden');
      lockedHint.innerHTML = '<span>Selesaikan kustomisasi tata ruang &amp; konfirmasi kavling di site plan untuk membuka tombol lanjut</span>';
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

  setKeunggulanCount(49, 'Kustomisasi Denah Interior Tersimpan');
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

  setKeunggulanCount(55, `Kavling ${lotLabel} Terkonfirmasi`);
}

/* --------------------------------------------------------------------------
   5B. ROOM 05 · FACILITY CAROUSEL & 5-SECOND AUTO-SCROLL
   -------------------------------------------------------------------------- */
const FACILITIES_DATA = {
  clubhouse: {
    title: 'The Park Clubhouse (177,25 m²)',
    tag: 'Clubhouse di Nagoya',
    sub: '177,25 m² · Tanpa Membership Terpisah',
    images: ['assets/drive/clubhouse.png', 'assets/drive/clubhousee.png'],
    desc: 'Clubhouse eksklusif 2 lantai seluas 177,25 m² yang dirancang untuk menghadirkan pengalaman hidup terbaik. Tempat sempurna untuk berenang, berolahraga, dan menciptakan momen berharga setiap hari tanpa biaya keanggotaan terpisah.',
    highlights: ['✓ Resort Pool & Lounge', '✓ Main Hall 88 m²', '✓ Dining & Gathering']
  },
  gate: {
    title: 'Avenue Grand Gate & RFID',
    tag: 'One-Gate Security',
    sub: '24/7 Security · CCTV Online',
    images: ['assets/drive/gate.png', 'assets/townhouse-hero.jpg'],
    desc: 'Avenue Grand Gate megah dengan pos sekuriti 24 jam terpadu, akses kartu RFID otomatis, dan CCTV kawasan menjamin privasi dan rasa aman seluruh keluarga.',
    highlights: ['✓ Pos Sekuriti 24 Jam', '✓ Barrier Gate Otomatis', '✓ Akses RFID Penghuni']
  },
  gym: {
    title: 'Gym & Co-working Lounge',
    tag: 'Kebugaran Lantai 2',
    sub: 'Modern Equipments · View Hijau',
    images: ['assets/drive/dalam-9.png', 'assets/drive/dalam-12.png'],
    desc: 'Fasilitas kebugaran privat dan ruang kerja bersama di lantai dua dengan jendela kaca panorama menghadap lanskap teduh cluster.',
    highlights: ['✓ Gym Cardio & Strength', '✓ Co-working Area Wi-Fi', '✓ Pemandangan Hijau']
  },
  garden: {
    title: 'Taman Tematik & Playground',
    tag: 'Kids Sanctuary',
    sub: 'Pohon Tabebuya · BBQ Terrace',
    images: ['assets/room-bersama.jpg', 'assets/room-veranda.jpg'],
    desc: 'Taman terbuka hijau ramah anak dengan pohon tabebuya berbunga, area bermain aman, dan dek BBQ keluarga di halaman sendiri.',
    highlights: ['✓ Area Bermain Anak Aman', '✓ Pohon Tabebuya Berbunga', '✓ BBQ & Relaxing Deck']
  }
};

let currentFacilityKey = 'clubhouse';
let currentFacilityImgIndex = 0;
let facilityCarouselInterval = null;

function focusFacilitySection() {
  const room5 = document.getElementById('room-5');
  if (room5) {
    room5.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function selectFacility(key, e) {
  if (e) e.stopPropagation();
  currentFacilityKey = key;
  currentFacilityImgIndex = 0;
  updateFacilityView();
  restartFacilityCarousel();

  const data = FACILITIES_DATA[key] || FACILITIES_DATA.clubhouse;
  setKeunggulanCount(Math.min(85, unlockedKeunggulanCount + 2), data.title);
}

function setFacilityImageIndex(idx) {
  currentFacilityImgIndex = idx;
  updateFacilityView();
  restartFacilityCarousel();
}

function updateFacilityView() {
  const data = FACILITIES_DATA[currentFacilityKey] || FACILITIES_DATA.clubhouse;
  const imgEl = document.getElementById('facilityMainImg');
  const tagEl = document.getElementById('facilityBadgeTag');
  const subEl = document.getElementById('facilityBadgeSub');
  const descEl = document.getElementById('facilityDesc');
  const highEl = document.getElementById('facilityHighlights');
  const dotsEl = document.getElementById('facilityDots');

  if (imgEl) {
    imgEl.style.opacity = '0.35';
    setTimeout(() => {
      imgEl.src = data.images[currentFacilityImgIndex] || data.images[0];
      imgEl.style.opacity = '1';
    }, 150);
  }

  if (tagEl) tagEl.textContent = data.tag;
  if (subEl) subEl.textContent = data.sub;
  if (descEl) descEl.textContent = data.desc;
  if (highEl) {
    highEl.innerHTML = data.highlights.map(h => `<span class="f-highlight-tag">${h}</span>`).join('');
  }

  // Update chips active state
  document.querySelectorAll('.facility-chip').forEach(btn => {
    btn.classList.toggle('is-active', btn.id === `chip${currentFacilityKey.charAt(0).toUpperCase() + currentFacilityKey.slice(1)}`);
  });

  // Update dots
  if (dotsEl) {
    dotsEl.innerHTML = data.images.map((_, i) =>
      `<span class="f-dot ${i === currentFacilityImgIndex ? 'is-active' : ''}" onclick="setFacilityImageIndex(${i})"></span>`
    ).join('');
  }
}

function startFacilityCarousel() {
  stopFacilityCarousel();
  facilityCarouselInterval = setInterval(() => {
    const data = FACILITIES_DATA[currentFacilityKey] || FACILITIES_DATA.clubhouse;
    currentFacilityImgIndex = (currentFacilityImgIndex + 1) % data.images.length;
    updateFacilityView();
  }, 5000); // 5 detik delay auto-scroll
}

function stopFacilityCarousel() {
  if (facilityCarouselInterval) {
    clearInterval(facilityCarouselInterval);
    facilityCarouselInterval = null;
  }
}

function restartFacilityCarousel() {
  startFacilityCarousel();
}

/* --------------------------------------------------------------------------
   6. RUANG HITUNG — PAYMENT SIMULATOR (Cash Keras, Cash Bertahap, KPR Bank)
   -------------------------------------------------------------------------- */
let currentPaymentScheme = 'cash_keras';
let selectedTempoTenor = 12;

function formatRupiahMillion(million) {
  if (million >= 1000) {
    return `Rp ${(million / 1000).toFixed(2).replace('.', ',').replace(/,00$/, '')} Miliar`;
  }
  return `Rp ${million} Juta`;
}

function selectPaymentScheme(scheme, btnEl) {
  currentPaymentScheme = scheme;
  document.querySelectorAll('.payment-tab-btn').forEach(b => b.classList.remove('is-active'));
  if (btnEl) btnEl.classList.add('is-active');

  const panelCash = document.getElementById('panelCashKeras');
  const panelTempo = document.getElementById('panelCashTempo');
  const panelKpr = document.getElementById('panelKpr');

  if (panelCash) panelCash.style.display = scheme === 'cash_keras' ? 'flex' : 'none';
  if (panelTempo) panelTempo.style.display = scheme === 'cash_tempo' ? 'flex' : 'none';
  if (panelKpr) panelKpr.style.display = scheme === 'kpr' ? 'flex' : 'none';

  updatePaymentCalc();

  const schemeNames = {
    cash_keras: 'Cash Keras 1 Bulan',
    cash_tempo: `Cash Bertahap ${selectedTempoTenor} Bulan`,
    kpr: 'KPR Bank Rekanan'
  };
  setKeunggulanCount(Math.min(94, unlockedKeunggulanCount + 2), schemeNames[scheme] || 'Skema Pembayaran');
}

function setTempoTenor(months, btnEl) {
  selectedTempoTenor = months;
  document.querySelectorAll('.tempo-btn').forEach(b => b.classList.remove('is-active'));
  if (btnEl) btnEl.classList.add('is-active');
  const lbl = document.getElementById('tempoTenorLabel');
  if (lbl) lbl.textContent = `${months} Bulan`;
  updatePaymentCalc();
}

function updatePaymentCalc() {
  const unit = HOUSE_UNITS[selectedUnitKey] || HOUSE_UNITS.nagoya;
  const cashMillion = unit.priceCashMillion;
  const kprBaseMillion = unit.priceKprMillion;

  // CASH KERAS
  const cashBooking = 5; // 5 Juta
  const cashPelunasan = cashMillion - cashBooking;
  const cashBookingEl = document.getElementById('cashBookingVal');
  const cashPelunasanEl = document.getElementById('cashPelunasanVal');
  const cashTotalEl = document.getElementById('cashTotalVal');
  if (cashBookingEl) cashBookingEl.textContent = 'Rp 5.000.000';
  if (cashPelunasanEl) cashPelunasanEl.textContent = `Rp ${cashPelunasan} Juta`;
  if (cashTotalEl) cashTotalEl.textContent = `Rp ${cashMillion} Juta`;

  // CASH BERTAHAP (CASH TEMPO)
  const tempoDpMillion = Math.round(cashMillion * 0.40);
  const tempoPokokMillion = cashMillion - tempoDpMillion;
  const tempoMonthly = tempoPokokMillion / selectedTempoTenor;
  const tempoDpEl = document.getElementById('tempoDpVal');
  const tempoPokokEl = document.getElementById('tempoPokokVal');
  const tempoMonthlyEl = document.getElementById('tempoMonthlyVal');
  if (tempoDpEl) tempoDpEl.textContent = `Rp ${tempoDpMillion} Juta (Include Booking 5 jt)`;
  if (tempoPokokEl) tempoPokokEl.textContent = `Rp ${tempoPokokMillion} Juta`;
  if (tempoMonthlyEl) tempoMonthlyEl.textContent = `Rp ${tempoMonthly.toFixed(1).replace('.', ',')} jt / bln`;

  // KPR BANK
  const dpSlider = document.getElementById('calcDpSlider');
  const tenorSlider = document.getElementById('calcTenorSlider');
  const dpPct = dpSlider ? parseInt(dpSlider.value, 10) : 30;
  const tenorY = tenorSlider ? parseInt(tenorSlider.value, 10) : 20;

  if (dpSlider) dpSlider.style.setProperty('--pct', `${((dpPct - 10) / (40 - 10)) * 100}%`);
  if (tenorSlider) tenorSlider.style.setProperty('--pct', `${((tenorY - 5) / (25 - 5)) * 100}%`);

  const dpAmount = Math.round((kprBaseMillion * dpPct) / 100);
  const loanM = kprBaseMillion - dpAmount;
  const monthlyRate = 0.08 / 12;
  const months = tenorY * 12;
  const factor = Math.pow(1 + monthlyRate, months);
  const monthlyM = (loanM * (monthlyRate * factor)) / (factor - 1);

  const calcPriceText = document.getElementById('calcPriceText');
  const calcDpPct = document.getElementById('calcDpPct');
  const calcTenorVal = document.getElementById('calcTenorVal');
  const calcDpText = document.getElementById('calcDpText');
  const kprPlafonVal = document.getElementById('kprPlafonVal');
  const calcMonthlyResult = document.getElementById('calcMonthlyResult');

  if (calcPriceText) calcPriceText.textContent = `Rp ${cashMillion} Juta`;
  if (calcDpPct) calcDpPct.textContent = `${dpPct}%`;
  if (calcTenorVal) calcTenorVal.textContent = `${tenorY} Tahun`;
  if (calcDpText) calcDpText.textContent = `Rp ${dpAmount} jt`;
  if (kprPlafonVal) kprPlafonVal.textContent = `Rp ${loanM} Juta`;
  if (calcMonthlyResult) calcMonthlyResult.textContent = `Rp ${monthlyM.toFixed(1).replace('.', ',')} jt / bln`;

  // Room 07 summary
  const finalNameEl = document.getElementById('finalUnitName');
  const finalPriceEl = document.getElementById('finalUnitPrice');
  if (finalNameEl) finalNameEl.textContent = unit.name;
  if (finalPriceEl) finalPriceEl.textContent = `Rp ${cashMillion} Juta`;
}

function updateKprCalc() {
  updatePaymentCalc();
}

function updateCalc() {
  updatePaymentCalc();
}

/* --------------------------------------------------------------------------
   7. QUICK MODAL SHEET (Rumah Saya / WA / Booking / Save)
   -------------------------------------------------------------------------- */
function openQuickModal(type) {
  const backdrop = document.getElementById('modalBackdrop');
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');

  if (type === 'cards') {
    title.textContent = `99 Keunggulan · Sukoharjo`;
    const pct = Math.round((unlockedKeunggulanCount / 99) * 100);

    // Collect highlights up to current count
    const allPointsFlat = [];
    SURAT_THEMES.forEach((theme) => {
      theme.points.forEach((p) => {
        allPointsFlat.push({
          num: p.num,
          head: p.head,
          desc: p.desc,
          themeTitle: theme.title
        });
      });
    });

    const unlockedList = allPointsFlat.slice(0, unlockedKeunggulanCount);

    body.innerHTML = `
      <div style="margin-bottom:14px; background: rgba(0,0,0,0.28); padding: 12px 14px; border-radius: 14px; border: 1px solid rgba(229,211,175,0.22);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:10.5px; color:rgba(243,239,230,0.7); text-transform:uppercase; letter-spacing:0.08em; font-weight:700;">Keunggulan Terbuka</span>
          <strong style="font-size:14px; color:#e5d3af; font-family:var(--font-serif);">${unlockedKeunggulanCount} / 99 Poin (${pct}%)</strong>
        </div>
        <div style="width:100%; height:7px; background:rgba(255,255,255,0.1); border-radius:999px; overflow:hidden;">
          <div style="width:${pct}%; height:100%; background:linear-gradient(90deg, #81c784, #e5d3af); border-radius:999px; transition:width 0.4s ease;"></div>
        </div>
      </div>

      <p class="room-story" style="margin-bottom:12px; font-size:11.5px; line-height:1.6;">
        Setiap bab, ruangan, dan pilihan yang Anda tentukan membuka poin keunggulan autentik dari dokumen resmi The Park Townhouse Sukoharjo.
      </p>

      <div class="info-list" style="max-height: 250px; overflow-y:auto; padding-right:4px;">
        ${unlockedList
          .map(
            (item) => `
          <div class="info-row" style="align-items:flex-start; padding:8px 0; border-bottom:1px solid rgba(229,211,175,0.12);">
            <div style="display:flex; flex-direction:column; gap:2px; flex:1; padding-right:8px;">
              <strong style="font-size:11.5px; color:#ffffff;">${item.head}</strong>
              <span style="font-size:10px; color:rgba(243,239,230,0.68); line-height:1.4;">${item.desc}</span>
            </div>
            <strong style="font-size:11px; color:#81c784; background:rgba(129,199,132,0.12); padding:2px 6px; border-radius:4px; flex-shrink:0;">#${item.num}</strong>
          </div>`
          )
          .join('')}
      </div>

      <button class="btn-primary-forest" style="margin-top:14px; width:100%;" onclick="closeQuickModal(); finishTourAndExit(); setTimeout(() => switchLandingTab('SuratCinta', document.getElementById('tabBtnSuratCinta')), 250);" type="button">
        <span>Buka Majalah 99 Keunggulan Lengkap</span>
        <span>→</span>
      </button>
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
    const priceText = document.getElementById('calcPriceText') ? document.getElementById('calcPriceText').textContent : 'Rp 650 Juta';
    let paymentDesc = 'Cash Keras';
    let installmentDesc = 'Lunas 30 Hari';

    if (currentPaymentScheme === 'cash_tempo') {
      paymentDesc = `Cash Bertahap (DP 40% · ${selectedTempoTenor} Bulan)`;
      const tempoEl = document.getElementById('tempoMonthlyVal');
      installmentDesc = tempoEl ? tempoEl.textContent : 'Cicilan Fleksibel';
    } else if (currentPaymentScheme === 'kpr') {
      const dpPct = document.getElementById('calcDpPct') ? document.getElementById('calcDpPct').textContent : '30%';
      const tenorVal = document.getElementById('calcTenorVal') ? document.getElementById('calcTenorVal').textContent : '20 Tahun';
      paymentDesc = `Skema KPR (DP ${dpPct} · ${tenorVal})`;
      const kprEl = document.getElementById('calcMonthlyResult');
      installmentDesc = kprEl ? kprEl.textContent : 'Rp 3,8 jt / bln';
    } else {
      paymentDesc = 'Cash Keras (Pelunasan 1 Bulan)';
      installmentDesc = 'Pelunasan 30 Hari Kalender';
    }

    const selectedLot = selectedLotId || 'B.04';
    const config = {
      unit: unit.name,
      lot: selectedLot,
      cluster: currentClusterKey,
      price: priceText,
      paymentScheme: paymentDesc,
      installment: installmentDesc,
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
        <div class="info-row"><span>Skema Pembayaran</span><strong>${paymentDesc}</strong></div>
        <div class="info-row"><span>Ilustrasi Cicilan</span><strong>${installmentDesc}</strong></div>
      </div>
      <button class="btn-primary-forest" onclick="finishTourAndExit()" type="button">
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

/* --------------------------------------------------------------------------
   8. DOOR CLOSING ANIMATION & TRANSITION TO LANDING PAGE
   -------------------------------------------------------------------------- */
function finishTourAndExit() {
  closeQuickModal();

  const closingOverlay = document.getElementById('doorClosingOverlay');
  const landingPage = document.getElementById('landingPageView');
  const mainTour = document.querySelector('.phone-screen > main');
  const tourHeader = document.querySelector('.app-header');

  if (!closingOverlay) {
    if (landingPage) landingPage.style.display = 'flex';
    return;
  }

  closingOverlay.style.display = 'flex';
  void closingOverlay.offsetWidth;
  closingOverlay.style.opacity = '1';
  closingOverlay.classList.add('is-shutting');

  // After 1.2s, camera pulls backward outside the house
  setTimeout(() => {
    closingOverlay.classList.add('is-pulling-back');
  }, 1200);

  // After 2.6s, smoothly reveal the Landing Page!
  setTimeout(() => {
    closingOverlay.style.opacity = '0';
    setTimeout(() => {
      closingOverlay.style.display = 'none';
      closingOverlay.classList.remove('is-shutting', 'is-pulling-back');
      if (mainTour) mainTour.style.display = 'none';
      if (tourHeader) tourHeader.style.display = 'none';
      if (landingPage) {
        landingPage.style.display = 'flex';
        initLandingPage();
      }
    }, 550);
  }, 2600);
}

function reopenStoryTour() {
  const landingPage = document.getElementById('landingPageView');
  const mainTour = document.querySelector('.phone-screen > main');
  const tourHeader = document.querySelector('.app-header');
  const savedModal = document.getElementById('savedConfigModal');

  if (savedModal) savedModal.style.display = 'none';
  if (landingPage) landingPage.style.display = 'none';
  if (mainTour) mainTour.style.display = 'flex';
  if (tourHeader) tourHeader.style.display = 'flex';
  goToRoom(4); // Return directly to customizable room
}

/* --------------------------------------------------------------------------
   9. LANDING PAGE INVENTORY, FILTERS & INTERACTIVE FEATURES
   -------------------------------------------------------------------------- */
const CATALOG_INVENTORY = [
  // NAGOYA (15 Units)
  { id: 'A.01', cluster: 'nagoya', type: 'T60', beds: 3, baths: 2, lt: 60, lb: 60, priceMillion: 699, status: 'Terjual', pos: 'gate' },
  { id: 'A.02', cluster: 'nagoya', type: 'T60', beds: 3, baths: 2, lt: 60, lb: 60, priceMillion: 699, status: 'Tersedia', pos: 'gate' },
  { id: 'A.03', cluster: 'nagoya', type: 'T80', beds: 4, baths: 3, lt: 80, lb: 80, priceMillion: 782, status: 'Tersedia', pos: 'inner' },
  { id: 'A.04', cluster: 'nagoya', type: 'T60', beds: 3, baths: 2, lt: 60, lb: 60, priceMillion: 699, status: 'Tersedia', pos: 'inner' },
  { id: 'A.05', cluster: 'nagoya', type: 'T80', beds: 4, baths: 3, lt: 80, lb: 80, priceMillion: 782, status: 'Tersedia', pos: 'inner' },
  { id: 'A.06', cluster: 'nagoya', type: 'T60', beds: 3, baths: 2, lt: 60, lb: 60, priceMillion: 699, status: 'Tersedia', pos: 'inner' },
  { id: 'A.07', cluster: 'nagoya', type: 'T80', beds: 4, baths: 3, lt: 80, lb: 80, priceMillion: 787, status: 'Tersedia', pos: 'hook' },
  { id: 'A.08', cluster: 'nagoya', type: 'T60', beds: 3, baths: 2, lt: 60, lb: 60, priceMillion: 708, status: 'Tersedia', pos: 'inner' },
  { id: 'A.09', cluster: 'nagoya', type: 'T80', beds: 4, baths: 3, lt: 80, lb: 80, priceMillion: 796, status: 'Tersedia', pos: 'hook' },
  { id: 'B.02', cluster: 'nagoya', type: 'T60', beds: 3, baths: 2, lt: 60, lb: 60, priceMillion: 498, status: 'Tersedia', pos: 'gate' },
  { id: 'B.03', cluster: 'nagoya', type: 'T60', beds: 3, baths: 2, lt: 60, lb: 60, priceMillion: 498, status: 'Tersedia', pos: 'inner' },
  { id: 'B.04', cluster: 'nagoya', type: 'T60', beds: 3, baths: 2, lt: 60, lb: 60, priceMillion: 498, status: 'Tersedia', pos: 'inner' },
  { id: 'B.05', cluster: 'nagoya', type: 'T80', beds: 4, baths: 3, lt: 80, lb: 80, priceMillion: 862, status: 'Tersedia', pos: 'inner' },
  { id: 'B.06', cluster: 'nagoya', type: 'T80', beds: 4, baths: 3, lt: 80, lb: 80, priceMillion: 857, status: 'Tersedia', pos: 'inner' },
  { id: 'B.07', cluster: 'nagoya', type: 'T80', beds: 4, baths: 3, lt: 80, lb: 80, priceMillion: 857, status: 'Tersedia', pos: 'hook' },

  // TOKYO (7 Units)
  { id: 'B.1', cluster: 'tokyo', type: 'T60', beds: 3, baths: 2, lt: 60, lb: 60, priceMillion: 708, status: 'Tersedia', pos: 'gate' },
  { id: 'B.2', cluster: 'tokyo', type: 'T80', beds: 4, baths: 3, lt: 80, lb: 80, priceMillion: 787, status: 'Tersedia', pos: 'inner' },
  { id: 'B.3', cluster: 'tokyo', type: 'T60', beds: 3, baths: 2, lt: 60, lb: 60, priceMillion: 679, status: 'Tersedia', pos: 'inner' },
  { id: 'B.4', cluster: 'tokyo', type: 'T80', beds: 4, baths: 3, lt: 80, lb: 80, priceMillion: 791, status: 'Tersedia', pos: 'inner' },
  { id: 'B.5', cluster: 'tokyo', type: 'T60', beds: 3, baths: 2, lt: 60, lb: 60, priceMillion: 685, status: 'Tersedia', pos: 'inner' },
  { id: 'B.6', cluster: 'tokyo', type: 'T60', beds: 3, baths: 2, lt: 60, lb: 60, priceMillion: 685, status: 'Tersedia', pos: 'inner' },
  { id: 'B.7', cluster: 'tokyo', type: 'T80', beds: 4, baths: 3, lt: 80, lb: 80, priceMillion: 899, status: 'Tersedia', pos: 'hook' },

  // OSAKA (9 Units)
  { id: 'A.1', cluster: 'osaka', type: 'T80', beds: 4, baths: 3, lt: 80, lb: 80, priceMillion: 791, status: 'Tersedia', pos: 'gate' },
  { id: 'A.2', cluster: 'osaka', type: 'T60', beds: 3, baths: 2, lt: 60, lb: 60, priceMillion: 685, status: 'Tersedia', pos: 'inner' },
  { id: 'A.3', cluster: 'osaka', type: 'T60', beds: 3, baths: 2, lt: 60, lb: 60, priceMillion: 685, status: 'Tersedia', pos: 'inner' },
  { id: 'A.4', cluster: 'osaka', type: 'T80', beds: 4, baths: 3, lt: 80, lb: 80, priceMillion: 769, status: 'Tersedia', pos: 'inner' },
  { id: 'A.5', cluster: 'osaka', type: 'T60', beds: 3, baths: 2, lt: 60, lb: 60, priceMillion: 690, status: 'Tersedia', pos: 'inner' },
  { id: 'A.6', cluster: 'osaka', type: 'T80', beds: 4, baths: 3, lt: 80, lb: 80, priceMillion: 834, status: 'Tersedia', pos: 'inner' },
  { id: 'A.7', cluster: 'osaka', type: 'T80', beds: 4, baths: 3, lt: 80, lb: 80, priceMillion: 834, status: 'Tersedia', pos: 'inner' },
  { id: 'A.8', cluster: 'osaka', type: 'T80', beds: 4, baths: 3, lt: 80, lb: 80, priceMillion: 901, status: 'Tersedia', pos: 'hook' },
  { id: 'A.9', cluster: 'osaka', type: 'T80', beds: 4, baths: 3, lt: 80, lb: 80, priceMillion: 906, status: 'Tersedia', pos: 'hook' },
];

let catalogFilterState = {
  type: 'all',
  lot: 'all',
  price: 'all',
  pos: 'all'
};

function initLandingPage() {
  setTimeout(initBerandaLeafletMap, 300);
  renderLandingUnits();
  switchLandingSiteplan('nagoya');
  setTimeout(recalculateSuratPayment, 400);
}

function filterCatalog(filterType, val, btnEl) {
  catalogFilterState[filterType] = val;
  const parent = btnEl.parentElement;
  if (parent) {
    parent.querySelectorAll('.f-chip').forEach(c => c.classList.remove('is-active'));
    btnEl.classList.add('is-active');
  }
  renderLandingUnits();
}

function resetCatalogFilters() {
  catalogFilterState = { type: 'all', lot: 'all', price: 'all', pos: 'all' };
  document.querySelectorAll('.filter-chips').forEach(group => {
    group.querySelectorAll('.f-chip').forEach((c, idx) => {
      c.classList.toggle('is-active', idx === 0);
    });
  });
  renderLandingUnits();
}

function renderLandingUnits() {
  const clusters = ['nagoya', 'tokyo', 'osaka'];

  clusters.forEach(clusterKey => {
    const gridEl = document.getElementById(`${clusterKey}UnitsGrid`);
    if (!gridEl) return;

    let units = CATALOG_INVENTORY.filter(u => u.cluster === clusterKey);

    // Apply filters
    if (catalogFilterState.type !== 'all') {
      units = units.filter(u => u.type === catalogFilterState.type);
    }
    if (catalogFilterState.lot === 'under80') {
      units = units.filter(u => u.lt < 80);
    } else if (catalogFilterState.lot === '80to90') {
      units = units.filter(u => u.lt >= 80 && u.lt <= 90);
    } else if (catalogFilterState.lot === 'above90') {
      units = units.filter(u => u.lt > 90);
    }

    if (catalogFilterState.price === 'under600') {
      units = units.filter(u => u.priceMillion < 600);
    } else if (catalogFilterState.price === '600to750') {
      units = units.filter(u => u.priceMillion >= 600 && u.priceMillion <= 750);
    } else if (catalogFilterState.price === 'above750') {
      units = units.filter(u => u.priceMillion > 750);
    }

    if (catalogFilterState.pos !== 'all') {
      units = units.filter(u => u.pos === catalogFilterState.pos);
    }

    if (units.length === 0) {
      gridEl.innerHTML = `<div style="grid-column: span 2; text-align:center; padding: 12px; font-size: 11px; color: rgba(243,239,230,0.6);">Tidak ada unit yang cocok dengan kombinasi filter ini.</div>`;
      return;
    }

    gridEl.innerHTML = units.map(u => `
      <div class="unit-inventory-card">
        <div class="unit-inv-head">
          <span class="unit-inv-id">${u.id}</span>
          <span class="unit-inv-status ${u.status === 'Tersedia' ? 'is-avail' : 'is-sold'}">${u.status}</span>
        </div>
        <div class="unit-inv-specs">${u.beds}KT · ${u.baths}KM · LT ${u.lt}m²</div>
        <div class="unit-inv-price">Mulai Rp ${u.priceMillion} Jt</div>
        ${u.status === 'Tersedia' ? `
          <button class="unit-inv-select-btn" type="button" onclick="selectUnitFromLanding('${clusterKey}', '${u.id}', ${u.priceMillion})">
            Pilih Kavling →
          </button>
        ` : ''}
      </div>
    `).join('');
  });
}

function selectUnitFromLanding(clusterKey, unitId, priceM) {
  selectedLotId = unitId;
  currentClusterKey = clusterKey;
  saveSiteplanChoice();
  openSavedConfigModal();
}

function switchLandingTab(tabName, btnEl) {
  document.querySelectorAll('.landing-tab-panel').forEach(p => p.style.display = 'none');
  document.querySelectorAll('.bottom-nav-tab').forEach(b => b.classList.remove('is-active'));

  const activePanel = document.getElementById(`panel${tabName}`);
  if (activePanel) activePanel.style.display = 'flex';
  if (btnEl) btnEl.classList.add('is-active');

  const scrollContainer = document.getElementById('landingScrollContent');
  if (scrollContainer) scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });

  if (tabName === 'Beranda') {
    initBerandaLeafletMap();
    setTimeout(() => { if (berandaLeafletMapInstance) berandaLeafletMapInstance.invalidateSize(); }, 200);
  } else if (tabName === 'SitePlan') {
    switchLandingSiteplan('nagoya');
  } else if (tabName === 'SuratCinta') {
    initSuratCintaMagazine();
  }
}

function switchLandingSiteplan(clusterKey, btnEl) {
  const displayImg = document.getElementById('spDisplayImg');
  const overlayEl = document.getElementById('spLotsOverlay');
  const statTotal = document.getElementById('spStatTotal');
  const statRth = document.getElementById('spStatRth');

  document.querySelectorAll('.sp-cluster-btn').forEach(b => b.classList.remove('is-active'));
  if (btnEl) {
    btnEl.classList.add('is-active');
  } else {
    const defaultBtn = document.getElementById(`spTab${clusterKey.charAt(0).toUpperCase() + clusterKey.slice(1)}`);
    if (defaultBtn) defaultBtn.classList.add('is-active');
  }

  const data = SITEPLAN_DATA[clusterKey] || SITEPLAN_DATA.nagoya;
  if (displayImg) displayImg.src = data.img;
  if (statTotal) statTotal.textContent = `${data.lots.length} Unit`;
  if (statRth) statRth.textContent = clusterKey === 'nagoya' ? '119,60 m²' : clusterKey === 'tokyo' ? '184,20 m²' : '142,50 m²';

  if (overlayEl) {
    overlayEl.innerHTML = data.lots.map(lot => `
      <button class="siteplan-lot-pin ${lot.id === (selectedLotId || data.lots[0].id) ? 'is-selected' : ''}"
        style="left: ${lot.x}%; top: ${lot.y}%;"
        onclick="pickLandingLot('${lot.id}', '${clusterKey}')" type="button">
        <span>${lot.id}</span>
      </button>
    `).join('');
  }

  const activeLot = data.lots.find(l => l.id === selectedLotId) || data.lots[0];
  if (activeLot) updateLandingLotCard(activeLot);
}

function pickLandingLot(lotId, clusterKey) {
  selectedLotId = lotId;
  const data = SITEPLAN_DATA[clusterKey] || SITEPLAN_DATA.nagoya;
  const lot = data.lots.find(l => l.id === lotId) || data.lots[0];
  if (lot) updateLandingLotCard(lot);

  document.querySelectorAll('.siteplan-lot-pin').forEach(pin => {
    pin.classList.toggle('is-selected', pin.textContent.trim() === lotId);
  });
}

function updateLandingLotCard(lot) {
  const title = document.getElementById('spLotTitle');
  const status = document.getElementById('spLotStatus');
  const area = document.getElementById('spLotArea');
  const type = document.getElementById('spLotType');
  const price = document.getElementById('spLotPrice');

  if (title) title.textContent = `${currentClusterKey.charAt(0).toUpperCase() + currentClusterKey.slice(1)} ${lot.id}`;
  if (status) status.textContent = lot.status;
  if (area) area.textContent = lot.area;
  if (type) type.textContent = lot.type;
  if (price) price.textContent = lot.price;
}

function confirmLotFromLanding() {
  saveSiteplanChoice();
  openSavedConfigModal();
}

function openSavedConfigModal() {
  const modal = document.getElementById('savedConfigModal');
  if (!modal) return;

  let config = null;
  try {
    const raw = localStorage.getItem('theParkSavedConfig');
    if (raw) config = JSON.parse(raw);
  } catch (_) {}

  const unit = HOUSE_UNITS[selectedUnitKey] || HOUSE_UNITS.nagoya;
  const lotId = selectedLotId || 'B.04';
  const priceText = config ? config.price : (document.getElementById('calcPriceText') ? document.getElementById('calcPriceText').textContent : 'Rp 650 Juta');
  const paymentText = config ? config.paymentScheme : (currentPaymentScheme === 'cash_tempo' ? `Cash Bertahap (${selectedTempoTenor} Bulan)` : currentPaymentScheme === 'kpr' ? 'Skema KPR Bank (DP 30%)' : 'Cash Keras (Pelunasan 1 Bulan)');
  const installmentText = config ? config.installment : (currentPaymentScheme === 'cash_tempo' ? 'Cicilan 0% ke Developer' : currentPaymentScheme === 'kpr' ? 'Rp 3,8 jt / bln' : 'Pelunasan 30 Hari');

  const clusterEl = document.getElementById('savedItemCluster');
  const lotEl = document.getElementById('savedItemLot');
  const priceEl = document.getElementById('savedItemPrice');
  const paymentEl = document.getElementById('savedItemPayment');
  const instEl = document.getElementById('savedItemInstallment');

  if (clusterEl) clusterEl.textContent = `${unit.name} · ${unit.tag}`;
  if (lotEl) lotEl.textContent = `Kavling ${lotId}`;
  if (priceEl) priceEl.textContent = priceText;
  if (paymentEl) paymentEl.textContent = paymentText;
  if (instEl) instEl.textContent = installmentText;

  // Custom room names
  const r1 = document.getElementById('roomName1') ? document.getElementById('roomName1').value : 'Kamar Tidur Utama';
  const r2 = document.getElementById('roomName2') ? document.getElementById('roomName2').value : 'Kamar Anak Montessori';
  const r3 = document.getElementById('roomName3') ? document.getElementById('roomName3').value : 'Studio Kreatif & Library';
  const rGarden = document.getElementById('roomNameGarden') ? document.getElementById('roomNameGarden').value : 'Taman Kering Zen & BBQ';

  const roomsListEl = document.getElementById('savedRoomsList');
  if (roomsListEl) {
    roomsListEl.innerHTML = `
      <li>Ruang 01 (Lt 1): <strong>${r1}</strong></li>
      <li>Ruang 02 (Lt 2): <strong>${r2}</strong></li>
      <li>Ruang 03 (Lt 2): <strong>${r3}</strong></li>
      <li>Taman Terbuka: <strong>${rGarden}</strong></li>
    `;
  }

  // Addons list
  const addonsSelected = [];
  if (document.getElementById('addonIsland') && document.getElementById('addonIsland').checked) addonsSelected.push('Kitchen Island (+15jt)');
  if (document.getElementById('addonSmart') && document.getElementById('addonSmart').checked) addonsSelected.push('Smart Home Hub (+10jt)');
  if (document.getElementById('addonBathtub') && document.getElementById('addonBathtub').checked) addonsSelected.push('Freestanding Bathtub (+12jt)');
  if (document.getElementById('addonSolar') && document.getElementById('addonSolar').checked) addonsSelected.push('Solar Canopy (+8jt)');

  const addonsBox = document.getElementById('savedAddonsList');
  if (addonsBox) {
    if (addonsSelected.length > 0) {
      addonsBox.innerHTML = addonsSelected.map(a => `<span class="addon-tag-pill">${a}</span>`).join('');
    } else {
      addonsBox.innerHTML = '<span class="addon-tag-pill">Spesifikasi Standar Japandi (Tanpa Tambahan)</span>';
    }
  }

  modal.style.display = 'flex';
}

function closeSavedConfigModal(e) {
  if (e && e.target !== e.currentTarget) return;
  const modal = document.getElementById('savedConfigModal');
  if (modal) modal.style.display = 'none';
}

function sendSavedConfigToWA() {
  const unit = HOUSE_UNITS[selectedUnitKey] || HOUSE_UNITS.nagoya;
  const lot = selectedLotId || 'B.04';
  const price = document.getElementById('calcPriceText') ? document.getElementById('calcPriceText').textContent : 'Rp 650 Juta';
  const scheme = currentPaymentScheme === 'cash_tempo' ? `Cash Bertahap ${selectedTempoTenor} Bln` : currentPaymentScheme === 'kpr' ? 'KPR Bank' : 'Cash Keras';

  const text = encodeURIComponent(
    `Halo Tim The Park Townhouse Sukoharjo,\n\nSaya telah mengonfigurasi pilihan rumah idaman saya di website:\n- Klaster: ${unit.name}\n- Kavling: ${lot}\n- Estimasi Harga: ${price}\n- Skema Pembayaran: ${scheme}\n\nSaya ingin berkonsultasi lebih lanjut dan menjadwalkan kunjungan lokasi ke Marketing Gallery. Terima kasih.`
  );
  window.open(`https://wa.me/62882007392379?text=${text}`, '_blank');
}

function demoAppAction(actionType) {
  const box = document.getElementById('appDemoFeedback');
  if (!box) return;

  const responses = {
    lock: '[Smart Lock] Pintu Utama Terbuka — Sensor BLE/IoT mengenali ponsel Anda dalam radius 5 meter.',
    qr: '[QR Pass Tamu] Kode Akses Diterbitkan — Berlaku 6 jam untuk mobil tamu langsung melintas gerbang Avenue Gate.',
    booking: '[Reservasi Fasilitas] Slot Berhasil — Sesi Kolam Renang & Gym Clubhouse hari Sabtu jam 08.00 terkonfirmasi.',
    ipl: '[Iuran Kawasan / IPL] Status Lunas — Tagihan bulan berjalan terverifikasi dengan rincian taman & sekuriti.',
    maint: '[Laporan Estate] Tiket Diterima — Tim maintenance siap melakukan pengecekan unit dalam 2 jam kerja.',
    sos: '[Tombol Darurat / SOS] Sinyal Aktif — Notifikasi darurat dan lokasi unit terkirim seketika ke pos jaga 24 jam!'
  };

  box.innerHTML = `<span style="color:#e5d3af; font-weight:600;">${responses[actionType] || 'Fitur terhubung ke server kawasan.'}</span>`;
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
   SURAT CINTA (99 KEUNGGULAN · DELUXE STORYTELLING MAGAZINE)
   -------------------------------------------------------------------------- */
const SURAT_THEMES = [
  {
    range: '01–09',
    title: 'Dekat dengan Kehidupan',
    quote: 'Dari gerbang rumah, akses menuju pusat kota, ruang terbuka hijau, dan layanan penting hanya berjarak beberapa menit berkendara santai.',
    img: 'assets/drive/alun-alun.jpg',
    points: [
      { num: '01', head: 'Jantung Kabupaten Sukoharjo', desc: 'Akses langsung ke pusat pemerintahan dan niaga tanpa kehilangan kedamaian hunian privat.' },
      { num: '02', head: 'Menit dari Alun-Alun Satya Negara', desc: 'Ruang hijau terbuka, jogging track teduh, dan denyut aktivitas warga tepat di dekat rumah.' },
      { num: '03', head: 'Koridor Jenderal Sudirman', desc: 'Akses jalan utama yang menghubungkan kawasan Sukoharjo dan Solo Baru secara langsung tanpa hambatan.' },
      { num: '04', head: 'Kawasan Gelora Merdeka', desc: 'Sarana olahraga terbuka untuk akhir pekan yang aktif dan menyehatkan bersama keluarga tercinta.' },
      { num: '05', head: 'Layanan Kesehatan RSUD Sukoharjo', desc: 'Ketenangan pikiran keluarga dengan jarak rumah sakit rujukan pemerintah terdekat.' },
      { num: '06', head: 'RS Indriati Solo Baru', desc: 'Pilihan layanan medis lanjutan dan fasilitas spesialis bedah bertaraf modern.' },
      { num: '07', head: 'Ragam Pilihan Sekolah Unggulan', desc: 'Dari tingkat dasar hingga menengah dalam radius aman dan nyaman bagi anak.' },
      { num: '08', head: 'Sentra Kuliner Legendaris Sukoharjo', desc: 'Soto Sewu, Bebek Goreng H. Slamet, hingga Mbah Karto Tembel di sekitar kawasan.' },
      { num: '09', head: 'Nilai Kawasan Terus Tumbuh', desc: 'Sukoharjo sebagai penyangga utama Solo Raya dengan akselerasi pertumbuhan ekonomi tinggi.' }
    ]
  },
  {
    range: '10–18',
    title: 'Pilihan yang Terasa Pribadi',
    quote: 'Setiap keluarga memiliki ritme harian yang khas. Karena itu Nagoya, Osaka, dan Tokyo dihadirkan dengan karakter dan atmosfer lingkungan berbeda.',
    img: 'assets/drive/siteplan-nagoya.jpg',
    points: [
      { num: '10', head: 'Tiga Karakter Klaster Berbeda', desc: 'Nagoya, Osaka, dan Tokyo dirancang dengan keunikan atmosfer dan skala lingkungan tersendiri.' },
      { num: '11', head: 'Nagoya: Dekat Clubhouse', desc: 'Cocok untuk keluarga dinamis yang menyukai akses instan ke kolam renang dan ruang komunal.' },
      { num: '12', head: 'Osaka: Karakter Koridor Aktif', desc: 'Konektivitas prima untuk Anda yang menyukai efisiensi waktu dan ritme mobilitas tinggi.' },
      { num: '13', head: 'Tokyo: Enclave Privat 7 Unit', desc: 'Skala lingkungan mikro yang intim, tenang, dan minim lalu-lalang kendaraan.' },
      { num: '14', head: 'Skala Kawasan yang Manusiawi', desc: 'Total 30 unit menjaga kehangatan hubungan bertetangga tanpa pernah terasa sesak.' },
      { num: '15', head: 'Proporsi Kavling Lapang', desc: 'Lebar muka ideal dengan kedalaman tanah proporsional untuk sirkulasi udara dan cahaya alami.' },
      { num: '16', head: 'Opsi Hook dan Standar', desc: 'Pilihan posisi sudut dengan dua muka pencahayaan alami optimal serta halaman samping.' },
      { num: '17', head: 'Orientasi Bangunan Terhitung', desc: 'Tata letak dihitung cermat untuk meminimalkan radiasi terik matahari siang hari.' },
      { num: '18', head: 'Ketersediaan Unit Terbatas', desc: 'Jumlah unit terukur menjamin privasi, ketenangan, dan eksklusivitas komunitas penghuni.' }
    ]
  },
  {
    range: '19–27',
    title: 'Ruang untuk Hidup Sepenuhnya',
    quote: 'Rumah yang baik memberikan ruang bernapas bagi setiap anggota keluarga untuk berkumpul hangat sekaligus beristirahat tenang.',
    img: 'assets/drive/dalam-6.png',
    points: [
      { num: '19', head: 'Desain Dua Lantai Efisien', desc: 'Pemisahan jelas antara area komunal keluarga di lantai bawah dan area istirahat privat di lantai atas.' },
      { num: '20', head: 'Tipe Gold (LB 60–75 m²)', desc: '3 kamar tidur, 2 kamar mandi, garasi dalam tertutup, tata ruang efisien untuk keluarga muda.' },
      { num: '21', head: 'Tipe Diamond (LB 80–110 m²)', desc: '4 kamar tidur, 3 kamar mandi, garasi ganda + carport ekstra lapang untuk keluarga berkembang.' },
      { num: '22', head: 'Konsep Open-Plan Fleksibel', desc: 'Ruang tamu, ruang makan, dan dapur menyatu tanpa sekat kaku yang membatasi interaksi.' },
      { num: '23', head: 'Kamar Mandi di Setiap Lantai', desc: 'Kepraktisan bagi seluruh penghuni dan tamu tanpa repot harus naik-turun tangga di malam hari.' },
      { num: '24', head: 'Area Dapur Ergonomis', desc: 'Bukaan ventilasi langsung ke taman belakang, menjaga sirkulasi udara tetap segar bebas lembap.' },
      { num: '25', head: 'Taman Belakang Privat', desc: 'Ruang terbuka hijau di dalam rumah untuk relaksasi sore hari dan area jemur terlindung.' },
      { num: '26', head: 'Void Tangga & Skylight', desc: 'Bukaan vertikal menyalurkan cahaya alami ke pusat hunian hingga hemat pencahayaan siang.' },
      { num: '27', head: 'Sudut Kerja / Belajar WFH', desc: 'Ruang khusus untuk produktivitas kerja jarak jauh dan konsentrasi belajar anak tanpa gangguan.' }
    ]
  },
  {
    range: '28–36',
    title: 'Nyaman Sejak Tiba di Rumah',
    quote: 'Dari pintu gerbang hingga ke dalam garasi tertutup, setiap detail jalan, taman, dan teras dirancang meluruhkan lelah.',
    img: 'assets/drive/house.jpeg',
    points: [
      { num: '28', head: 'Garasi Dalam Terintegrasi', desc: 'Kendaraan terlindung dari cuaca tropis dengan akses langsung ke dalam ruang hunian utama.' },
      { num: '29', head: 'Carport Berkanopi Modern', desc: 'Kapasitas parkir 1–2 mobil tambahan tanpa mengganggu kelancaran jalan kawasan.' },
      { num: '30', head: 'Fasad Japandi Bersahaja', desc: 'Kombinasi kayu terawat, plester aci bertekstur, dan batu alam andesit berkarakter abadi.' },
      { num: '31', head: 'Lebar Jalan ROW 7–8 Meter', desc: 'Akses dua mobil berpapasan leluasa dengan radius putar kendaraan yang lapang.' },
      { num: '32', head: 'Paving Block Mutu K-300', desc: 'Permukaan jalan berpori rapi dengan daya serap air tinggi untuk mencegah genangan air hujan.' },
      { num: '33', head: 'Pohon Peneduh Tabebuya', desc: 'Bunga bermekaran lembut menghiasi pedestrian dan memberi keteduhan alami di setiap sudut jalan.' },
      { num: '34', head: 'Drainase Bawah Tanah Tertutup', desc: 'Saluran air tertutup rapi, higienis, bebas bau tak sedap dan tidak menjadi sarang nyamuk.' },
      { num: '35', head: 'Penerangan Jalan LED Otomatis', desc: 'Sensor cahaya otomatis memastikan jalan klaster terang merata dan aman saat malam tiba.' },
      { num: '36', head: 'Pedestrian Ramah Anak & Lansia', desc: 'Jalur pejalan kaki tanpa undakan curam, aman untuk kereta bayi maupun orang tua tercinta.' }
    ]
  },
  {
    range: '37–45',
    title: 'Waktu Bersama Punya Tempat',
    quote: 'Kebersamaan antar penghuni bertumbuh alami di ruang-ruang komunal yang dirawat dengan standar perhotelan eksklusif.',
    img: 'assets/drive/clubhouse.png',
    points: [
      { num: '37', head: 'The Park Clubhouse Eksklusif', desc: 'Fasilitas 177,25 m² sebagai pusat gaya hidup, olahraga, dan interaksi warga berstandar tinggi.' },
      { num: '38', head: 'Kolam Renang Infinity & Anak', desc: 'Area renang bersih dengan dek santai bernuansa resor tropis yang menyegarkan tubuh dan pikiran.' },
      { num: '39', head: 'Fitness Center & Gym Ber-AC', desc: 'Peralatan kardio dan beban lengkap berpendingin ruangan dengan pemandangan terbuka ke kolam.' },
      { num: '40', head: 'Café & Resto Komunal', desc: 'Tempat ngopi pagi atau menikmati santapan ringan santai bersama keluarga tanpa keluar kawasan.' },
      { num: '41', head: 'Co-Working & Meeting Room', desc: 'Koneksi internet berkecepatan tinggi untuk pertemuan bisnis atau fokus bekerja produktif.' },
      { num: '42', head: 'Multi-Function Gathering Hall', desc: 'Ruang serbaguna untuk acara arisan, perayaan keluarga, atau silaturahmi tetangga.' },
      { num: '43', head: 'Sunken Lounge & Gazebo', desc: 'Tempat duduk santai semi-outdoor dikelilingi gemericik air dan vegetasi hijau teduh.' },
      { num: '44', head: 'Pantry Dapur Komunal', desc: 'Fasilitas penyiapan hidangan pendukung untuk kelancaran kegiatan komunitas warga.' },
      { num: '45', head: 'Bebas Biaya Membership', desc: 'Seluruh fasilitas clubhouse dapat dinikmati cuma-cuma oleh seluruh penghuni terdaftar.' }
    ]
  },
  {
    range: '46–54',
    title: 'Bermain, Tertawa, Mengingat',
    quote: 'Masa kecil adalah kenangan yang tak terulang. Kami menyediakan ruang aman untuk anak-anak berlari, bermain, dan berteman seumur hidup.',
    img: 'assets/drive/dalam-12.png',
    points: [
      { num: '46', head: 'Mini Golf 9-Hole Tematik', desc: 'Sarana rekreasi golf mini tematik pertama di townhouse Sukoharjo untuk semua generasi.' },
      { num: '47', head: 'Game Station 4K Modern', desc: 'Ruang konsol game PlayStation 5 dan Nintendo Switch dengan tempat duduk empuk ergonomis.' },
      { num: '48', head: 'Playground Anak Bersertifikasi', desc: 'Ayunan, perosotan, dan sensory play di atas hamparan rumput sintetis lembut anti cedera.' },
      { num: '49', head: 'Tenis Meja Semi-Outdoor', desc: 'Meja pingpong berkualitas untuk pertandingan santai di sore hari bersama tetangga.' },
      { num: '50', head: 'Mini Amphitheater Terbuka', desc: 'Ruang pertunjukan mini, membaca cerita, dan pentas bakat anak di alam terbuka.' },
      { num: '51', head: 'Barbeque & Grill Corner', desc: 'Area pemanggang siap pakai untuk menghangatkan malam akhir pekan bersama keluarga dan sahabat.' },
      { num: '52', head: 'Jalur Sepeda & Sepatu Roda', desc: 'Permukaan jalan halus tanpa polisi tidur kasar, memberi rasa aman saat anak bermain.' },
      { num: '53', head: 'Pojok Baca & Mini Library', desc: 'Koleksi buku cerita dan majalah pilihan di samping area tunggu clubhouse.' },
      { num: '54', head: 'Komunitas Bersahabat', desc: 'Lingkungan guyub dan positif tempat anak-anak saling mengenal dan saling menjaga.' }
    ]
  },
  {
    range: '55–63',
    title: 'Tenang dalam Keseharian',
    quote: 'Rasa aman sejati adalah saat Anda dapat beristirahat lelap di malam hari dan bepergian tanpa rasa cemas yang membebani.',
    img: 'assets/drive/gate.png',
    points: [
      { num: '55', head: 'One-Gate Security System', desc: 'Akses masuk dan keluar tunggal terkontrol ketat oleh regu keamanan terlatih 24 jam.' },
      { num: '56', head: 'Smartgate RFID Otomatis', desc: 'Palang gerbang mendeteksi kartu penghuni tanpa perlu menurunkan kaca jendela mobil.' },
      { num: '57', head: 'Petugas Sekuriti 24/7', desc: 'Patroli berkala memastikan setiap sudut jalan lingkungan selalu aman dan kondusif.' },
      { num: '58', head: 'Kamera CCTV 4K Ultra HD', desc: 'Pengawasan visual beresolusi tinggi dengan kemampuan night-vision di seluruh titik vital.' },
      { num: '59', head: 'Manajemen Tamu Berbasis QR', desc: 'Verifikasi identitas tamu terpadu via aplikasi penghuni sebelum kendaraan memasuki gerbang.' },
      { num: '60', head: 'Tembok Perimeter Kokoh', desc: 'Pagar keliling membatasi kawasan townhouse dari akses eksternal tanpa izin resmi.' },
      { num: '61', head: 'Tombol Darurat (Panic Button)', desc: 'Integrasi alarm darurat langsung ke pos jaga sekuriti untuk respon cepat tanggap.' },
      { num: '62', head: 'Proteksi Kebakaran Standar', desc: 'Penempatan tabung APAR dan titik hidran terkalibrasi di koridor klaster.' },
      { num: '63', head: 'Pencahayaan Bebas Titik Buta', desc: 'Tata cahaya malam dirancang merata sehingga tidak ada sudut gelap yang rawan kejahatan.' }
    ]
  },
  {
    range: '64–72',
    title: 'Kemudahan yang Menyertai',
    quote: 'Teknologi cerdas hadir bukan untuk membingungkan, melainkan merampingkan urusan sehari-hari agar Anda fokus pada kebahagiaan keluarga.',
    img: 'assets/drive/dalam-9.png',
    points: [
      { num: '64', head: 'Smart Door Lock Multi-Akses', desc: 'Buka pintu utama dengan sidik jari, PIN kode, kartu pintar RFID, atau kunci manual darurat.' },
      { num: '65', head: 'Aplikasi Super Andara Living', desc: 'Pusat layanan hunian di ponsel: bayar iuran, reservasi fasilitas, dan perizinan tamu.' },
      { num: '66', head: 'Pembayaran IPL Digital', desc: 'Laporan dan rincian iuran pemeliharaan transparan dengan berbagai kanal transfer modern.' },
      { num: '67', head: 'Layanan Concierge & Estate', desc: 'Bantuan pengurusan pemeliharaan umum, kebersihan jalan klaster, dan perawatan taman berkala.' },
      { num: '68', head: 'Instalasi EV-Charger Ready', desc: 'Jalur kelistrikan disiapkan untuk pemasangan stasiun pengisian mobil listrik di carport.' },
      { num: '69', head: 'Kabel Fiber Optic Bawah Tanah', desc: 'Jaringan internet pita lebar stabil tanpa tiang dan kabel menggantung di langit kawasan.' },
      { num: '70', head: 'Pengelolaan Sampah Terjadwal', desc: 'Pengambilan sampah harian tertib dengan tempat sampah terpisah basah dan kering.' },
      { num: '71', head: 'Drop-off Loker Paket Kurir', desc: 'Penyimpanan kiriman barang belanja daring yang aman saat penghuni sedang bepergian.' },
      { num: '72', head: 'Layanan Teknisi Handyman Siaga', desc: 'Bantuan teknis cepat untuk perbaikan kelistrikan dan saluran pipa minor rumah tangga.' }
    ]
  },
  {
    range: '73–81',
    title: 'Di Balik Keindahan Rumah',
    quote: 'Kekuatan rumah berada pada fondasi dan material tak kasat mata. Kami membangun dengan ketelitian rekayasa untuk masa pakai puluhan tahun.',
    img: 'assets/drive/denah-tipe60.jpg',
    points: [
      { num: '73', head: 'Fondasi Footplat Beton K-225', desc: 'Struktur cakar ayam bertulang SNI yang kokoh menopang dua lantai dengan aman dan stabil.' },
      { num: '74', head: 'Dinding Bata Merah Berkualitas', desc: 'Plester aci halus, peredaman suara optimal, dan kemampuan menolak panas alami yang sejuk.' },
      { num: '75', head: 'Rangka Atap Baja Zincalume', desc: 'Kekuatan rekayasa presisi anti rayap, tahan lendutan, dan bebas bahaya korosi karat.' },
      { num: '76', head: 'Genteng Keramik Berglasur', desc: 'Meredam panas matahari tropis dan mempertahankan keindahan warna jangka panjang tanpa pudar.' },
      { num: '77', head: 'Lantai Homogeneous Tile 60x60', desc: 'Granit poles berpori rapat yang mewah, elegan, sejuk dipijak kaki, dan mudah dibersihkan.' },
      { num: '78', head: 'Kusen Aluminium Powder Coating', desc: 'Profil hitam matte elegan, anti rayap, anti susut, dan rapat menahan rembesan air hujan.' },
      { num: '79', head: 'Plafon Gypsum Elevasi 3,4 Meter', desc: 'Ketinggian plafon lega menciptakan sirkulasi udara bebas dan kesan ruang luas bernapas.' },
      { num: '80', head: 'Sanitair Standar TOTO / Setara', desc: 'Kloset duduk modern, shower mixer air panas-dingin, dan wastafel keramik berkualitas.' },
      { num: '81', head: 'Cat Eksterior Weatherproof', desc: 'Formula pelindung dinding teruji anti lumut, anti jamur, dan tahan cuaca tropis basah.' }
    ]
  },
  {
    range: '82–90',
    title: 'Nyaman pada Hal-Hal Mendasar',
    quote: 'Kenyamanan sejati tercipta dari hal-hal yang sering luput: hembusan angin sejuk, kejernihan air, dan stabilitas kelistrikan.',
    img: 'assets/drive/housee.jpeg',
    points: [
      { num: '82', head: 'Kaca Bening 5mm Tempered', desc: 'Meredam deru suara luar dan mengalirkan kejernihan sinar matahari alami ke dalam rumah.' },
      { num: '83', head: 'Cross Ventilation Alami', desc: 'Ventilasi silang memandu angin mengalir lancar, menghemat pemakaian pendingin ruangan.' },
      { num: '84', head: 'Sumur Bor Dalam & Filter Ganda', desc: 'Pasokan air tanah jernih, higienis, tidak berbau, dan melimpah di setiap musim.' },
      { num: '85', head: 'Toren Stainless & Pompa Otomatis', desc: 'Tekanan air shower dan kran stabil merata di lantai bawah maupun lantai atas.' },
      { num: '86', head: 'Daya Listrik 2.200 VA Standar', desc: 'Kapasitas daya memadai untuk AC di seluruh kamar tidur dan peralatan elektronik modern.' },
      { num: '87', head: 'Pipa AC Ditanam Tersembunyi', desc: 'Jalur instalasi rapi di dalam dinding tanpa perlu membobok semen saat pemasangan pendingin.' },
      { num: '88', head: 'Grounding Kelistrikan Aman', desc: 'Perlindungan protektif dari risiko sengatan listrik dan lonjakan tegangan petir.' },
      { num: '89', head: 'Resapan Air Hujan & Biopori', desc: 'Konservasi air tanah mandiri untuk menjaga keseimbangan ekologis lingkungan hidup.' },
      { num: '90', head: 'Septic Tank Biofilter Ramah Alam', desc: 'Pengolahan limbah biologis modern tanpa kuras, higienis, dan tidak mencemari sumur.' }
    ]
  },
  {
    range: '91–99',
    title: 'Memilih dengan Keyakinan',
    quote: 'Membeli rumah adalah keputusan sakral keluarga. Kami memastikan setiap sertifikat, perizinan, dan garansi berada di posisi teraman.',
    img: 'assets/drive/aerial-drone.jpeg',
    points: [
      { num: '91', head: 'Harga Perdana Mulai Rp 650 Juta', desc: 'Penawaran pra-launching paling kompetitif untuk townhouse 2 lantai berfasilitas terlengkap.' },
      { num: '92', head: 'Empat Skema Pembayaran Fleksibel', desc: 'Pilihan Cash Keras diskon khusus, Cash Tempo 12/24 Bulan bunga 0%, serta KPR Bank.' },
      { num: '93', head: 'Booking Fee Ringan Rp 5 Juta', desc: 'Tanda jadi yang langsung memotong nilai uang muka (DP) atau harga jual unit.' },
      { num: '94', head: 'SHM Sudah Pecah per Kavling', desc: 'Kepastian hukum tertinggi, sertifikat per kavling siap balik nama tanpa proses berbelit.' },
      { num: '95', head: 'PBG & Izin Bangunan Lengkap', desc: 'Persetujuan Bangunan Gedung telah diterbitkan resmi oleh Pemerintah Kabupaten Sukoharjo.' },
      { num: '96', head: 'Kemitraan Bank Terkemuka', desc: 'Didukung bank BUMN dan swasta utama dengan proses pendampingan KPR in-house.' },
      { num: '97', head: 'Garansi Bangunan (DLP) 100 Hari', desc: 'Layanan perbaikan gratis jika dijumpai cacat konstruksi setelah serah terima kunci.' },
      { num: '98', head: 'Pengembang PT Andara Rejo Makmur', desc: 'Komitmen pembangunan tepat waktu dengan standar kontrol kualitas berjenjang.' },
      { num: '99', head: 'Warisan Nilai Tinggi yang Abadi', desc: 'Bukan hanya tempat berteduh hari ini, melainkan aset masa depan bernilai luhur bagi generasi.' }
    ]
  }
];

let currentSuratThemeIdx = 0;
let currentSpecType = 'gold';
let currentPriceCluster = 'nagoya';

const PRICE_CATALOG = {
  nagoya: [
    { id: 'Nagoya B.02–B.04', spec: 'LB 75 m² · LT 63 m² · 3 KT / 2 KM', ck: 'Rp 650 Juta', ct12: 'Rp 57,5 jt / bln', ct24: 'Rp 30,5 jt / bln', kpr: 'Rp 4,2 jt / bln' },
    { id: 'Nagoya A.02–A.08', spec: 'LB 75 m² · LT 60 m² · 3 KT / 2 KM', ck: 'Rp 699 Juta', ct12: 'Rp 61,8 jt / bln', ct24: 'Rp 32,8 jt / bln', kpr: 'Rp 4,5 jt / bln' },
    { id: 'Nagoya A.03–A.09', spec: 'LB 80 m² · LT 80 m² · 4 KT / 3 KM', ck: 'Rp 782–796 Jt', ct12: 'Rp 69,2 jt / bln', ct24: 'Rp 36,8 jt / bln', kpr: 'Rp 5,1 jt / bln' },
    { id: 'Nagoya B.05–B.07', spec: 'LB 80 m² · LT 88 m² · 4 KT / 3 KM', ck: 'Rp 857–862 Jt', ct12: 'Rp 75,8 jt / bln', ct24: 'Rp 40,2 jt / bln', kpr: 'Rp 5,6 jt / bln' }
  ],
  tokyo: [
    { id: 'Tokyo B.1–B.3', spec: 'LB 80 m² · LT 80 m² · 3 KT / 2 KM', ck: 'Rp 679 Juta', ct12: 'Rp 60,1 jt / bln', ct24: 'Rp 31,9 jt / bln', kpr: 'Rp 4,4 jt / bln' },
    { id: 'Tokyo B.4–B.7', spec: 'LB 80 m² · LT 80 m² · 3 KT / 2 KM', ck: 'Rp 720 Juta', ct12: 'Rp 63,8 jt / bln', ct24: 'Rp 33,9 jt / bln', kpr: 'Rp 4,7 jt / bln' }
  ],
  osaka: [
    { id: 'Osaka A.1–A.4', spec: 'LB 110 m² · LT 90 m² · 4 KT / 3 KM', ck: 'Rp 895 Juta', ct12: 'Rp 79,2 jt / bln', ct24: 'Rp 42,1 jt / bln', kpr: 'Rp 5,8 jt / bln' },
    { id: 'Osaka A.5–A.9', spec: 'LB 110 m² · LT 125 m² · 4 KT / 3 KM', ck: 'Rp 1.120 Juta', ct12: 'Rp 99,1 jt / bln', ct24: 'Rp 52,6 jt / bln', kpr: 'Rp 7,3 jt / bln' }
  ]
};

function renderSuratTheme(idx) {
  if (idx < 0) idx = 0;
  if (idx >= SURAT_THEMES.length) idx = SURAT_THEMES.length - 1;
  currentSuratThemeIdx = idx;

  const data = SURAT_THEMES[idx];
  const box = document.getElementById('themeShowcaseBox');
  if (!box) return;

  const pointsHtml = data.points.map(p => `
    <div class="theme-point-card">
      <span class="point-num">${p.num}</span>
      <div class="point-content">
        <strong class="point-head">${p.head}</strong>
        <p class="point-text">${p.desc}</p>
      </div>
    </div>
  `).join('');

  box.innerHTML = `
    <div class="theme-banner-wrap">
      <img src="${data.img}" alt="${data.title}" class="theme-banner-img" />
      <div class="theme-banner-overlay">
        <span class="theme-banner-badge">TEMA ${idx + 1} / 11 · KEUNGGULAN ${data.range}</span>
        <h4 class="theme-banner-title">${data.title}</h4>
      </div>
    </div>
    <div class="theme-content-wrap">
      <blockquote class="theme-quote-badge">"${data.quote}"</blockquote>
      <div class="theme-points-grid">
        ${pointsHtml}
      </div>
      <div class="theme-nav-actions">
        <button type="button" class="btn-theme-page" onclick="prevSuratTheme()" ${idx === 0 ? 'disabled' : ''}>
          <span>← Tema Sebelumnya</span>
        </button>
        <span class="theme-page-indicator">${idx + 1} dari 11 Tema</span>
        <button type="button" class="btn-theme-page" onclick="nextSuratTheme()" ${idx === SURAT_THEMES.length - 1 ? 'disabled' : ''}>
          <span>Tema Berikutnya →</span>
        </button>
      </div>
    </div>
  `;

  const scroller = document.getElementById('themeNavScroller');
  if (scroller) {
    const chips = scroller.querySelectorAll('.theme-chip');
    chips.forEach((c, i) => {
      if (i === idx) {
        c.classList.add('is-active');
        const scrollerBox = document.getElementById('themeNavScroller');
      if (scrollerBox && c) {
        scrollerBox.scrollTo({
          left: c.offsetLeft - scrollerBox.clientWidth / 2 + c.clientWidth / 2,
          behavior: 'smooth'
        });
      }
      } else {
        c.classList.remove('is-active');
      }
    });
  }
}

function switchSuratTheme(idx) {
  renderSuratTheme(idx);
}

function prevSuratTheme() {
  if (currentSuratThemeIdx > 0) {
    renderSuratTheme(currentSuratThemeIdx - 1);
  }
}

function nextSuratTheme() {
  if (currentSuratThemeIdx < SURAT_THEMES.length - 1) {
    renderSuratTheme(currentSuratThemeIdx + 1);
  }
}

function switchSpecType(type) {
  currentSpecType = type;
  document.querySelectorAll('.spec-tab-btn').forEach(b => b.classList.remove('is-active'));
  const btn = type === 'gold' ? document.getElementById('btnSpecGold') : document.getElementById('btnSpecDiamond');
  if (btn) btn.classList.add('is-active');
  renderSpecDetail(type);
}

function renderSpecDetail(type) {
  const container = document.getElementById('specDetailDisplay');
  if (!container) return;

  if (type === 'gold') {
    container.innerHTML = `
      <div class="spec-top-row">
        <span class="spec-title-tag">KONSEP RUANG EFISIEN &amp; TERANG</span>
        <h4 class="spec-main-title">Tipe Gold · LB 60–75 m² / LT 63–80 m²</h4>
        <p class="spec-desc-lead">
          Pilihan ideal untuk keluarga muda dan profesional modern. Menghadirkan keseimbangan antara privasi lantai atas dan kelegaan ruang bersama berkonsep terbuka (open-plan) di lantai bawah.
        </p>
      </div>
      <div class="spec-image-box">
        <img src="assets/drive/denah-tipe60.jpg" alt="Denah Arsitektur Tipe Gold" />
      </div>
      <div class="spec-stat-grid">
        <div class="spec-stat-item">
          <span class="spec-stat-val">3 KT</span>
          <span class="spec-stat-lbl">Kamar Tidur</span>
        </div>
        <div class="spec-stat-item">
          <span class="spec-stat-val">2 KM</span>
          <span class="spec-stat-lbl">Kamar Mandi</span>
        </div>
        <div class="spec-stat-item">
          <span class="spec-stat-val">1+1</span>
          <span class="spec-stat-lbl">Garasi &amp; Carport</span>
        </div>
      </div>
      <div class="spec-features-list">
        <div class="spec-feat-row"><span class="spec-feat-dot"></span><span>1 Master Bedroom luas dengan jendela pencahayaan alami di lantai 2</span></div>
        <div class="spec-feat-row"><span class="spec-feat-dot"></span><span>2 Kamar tidur pendukung (kamar anak &amp; ruang kerja fleksibel)</span></div>
        <div class="spec-feat-row"><span class="spec-feat-dot"></span><span>Garasi dalam terlindung cuaca + Carport dengan resapan paving rapi</span></div>
        <div class="spec-feat-row"><span class="spec-feat-dot"></span><span>Taman belakang terbuka untuk ventilasi silang bebas pengap</span></div>
        <div class="spec-feat-row"><span class="spec-feat-dot"></span><span>Tersedia pada Klaster Nagoya (Unit B.02–B.04, A.02–A.08)</span></div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="spec-top-row">
        <span class="spec-title-tag">PREMIUM SPACE &amp; MULTI-VEHICLE</span>
        <h4 class="spec-main-title">Tipe Diamond · LB 80–110 m² / LT 88–125 m²</h4>
        <p class="spec-desc-lead">
          Hunian lapang berorientasi kenyamanan keluarga multi-generasi. Dilengkapi kapasitas parkir hingga 3 mobil, void tangga ganda bernuansa megah, dan 4 kamar tidur penuh.
        </p>
      </div>
      <div class="spec-image-box">
        <img src="assets/drive/denah-tipe110.jpg" alt="Denah Arsitektur Tipe Diamond" />
      </div>
      <div class="spec-stat-grid">
        <div class="spec-stat-item">
          <span class="spec-stat-val">4 KT</span>
          <span class="spec-stat-lbl">Kamar Tidur</span>
        </div>
        <div class="spec-stat-item">
          <span class="spec-stat-val">3 KM</span>
          <span class="spec-stat-lbl">Kamar Mandi</span>
        </div>
        <div class="spec-stat-item">
          <span class="spec-stat-val">2+1</span>
          <span class="spec-stat-lbl">2 Garasi + 1 Carport</span>
        </div>
      </div>
      <div class="spec-features-list">
        <div class="spec-feat-row"><span class="spec-feat-dot"></span><span>Garasi tertutup 2 mobil + 1 carport (muat 3 mobil keluarga)</span></div>
        <div class="spec-feat-row"><span class="spec-feat-dot"></span><span>4 Kamar tidur lega (1 Kamar tidur lantai 1 ramah lansia/orang tua)</span></div>
        <div class="spec-feat-row"><span class="spec-feat-dot"></span><span>3 Kamar mandi dengan perlengkapan sanitair premium TOTO</span></div>
        <div class="spec-feat-row"><span class="spec-feat-dot"></span><span>Pantry kering dan dapur basah terpisah dengan sirkulasi taman</span></div>
        <div class="spec-feat-row"><span class="spec-feat-dot"></span><span>Tersedia pada Klaster Osaka (A.1–A.9) dan Klaster Nagoya (B.05–B.07)</span></div>
      </div>
    `;
  }
}

function switchPriceCluster(cluster) {
  currentPriceCluster = cluster;
  document.querySelectorAll('.price-tab-pill').forEach(p => p.classList.remove('is-active'));
  const btn = document.getElementById(`btnPrice${cluster.charAt(0).toUpperCase() + cluster.slice(1)}`);
  if (btn) btn.classList.add('is-active');
  renderPriceMatrix(cluster);
}

function renderPriceMatrix(cluster) {
  const container = document.getElementById('priceMatrixContainer');
  if (!container) return;

  const list = PRICE_CATALOG[cluster] || PRICE_CATALOG.nagoya;
  container.innerHTML = list.map(item => `
    <div class="price-unit-card">
      <div class="price-unit-head">
        <div>
          <span class="price-unit-id">${item.id}</span>
          <div class="price-unit-dims">${item.spec}</div>
        </div>
        <button class="unit-inv-select-btn" type="button" onclick="selectCatalogUnit('${item.id}', '${item.ck}')">
          Pilih Unit
        </button>
      </div>
      <div class="price-unit-grid">
        <div class="price-plan-cell">
          <span class="price-plan-lbl">Cash Keras (1 Bln)</span>
          <span class="price-plan-val">${item.ck}</span>
        </div>
        <div class="price-plan-cell">
          <span class="price-plan-lbl">Cash Tempo 12 Bln</span>
          <span class="price-plan-val">${item.ct12}</span>
        </div>
        <div class="price-plan-cell">
          <span class="price-plan-lbl">Cash Tempo 24 Bln</span>
          <span class="price-plan-val">${item.ct24}</span>
        </div>
        <div class="price-plan-cell">
          <span class="price-plan-lbl">KPR Bank (DP 30%)</span>
          <span class="price-plan-val">${item.kpr}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function selectCatalogUnit(unitName, priceText) {
  const lotMatch = unitName.split(' ')[1] || unitName;
  selectedLotId = lotMatch;
  selectedPriceText = priceText;
  saveSiteplanChoice();
  openSavedConfigModal();
}

function initSuratCintaMagazine() {
  setTimeout(recalculateSuratPayment, 150);
  renderSuratTheme(currentSuratThemeIdx);
  renderSpecDetail(currentSpecType);
  renderPriceMatrix(currentPriceCluster);
}

/* --------------------------------------------------------------------------
   10. CINEMATIC VIDEO & ATMOSPHERE SHOWCASE CONTROLLER
   -------------------------------------------------------------------------- */
const LANDING_VIDEO_SCENES = [
  {
    img: 'assets/drive/aerial-drone.jpeg',
    tag: 'Scene 01 · Peta Udara Drone',
    desc: 'Pemandangan udara 30 unit hunian Japandi Modern diapit keteduhan alam Sukoharjo.'
  },
  {
    img: 'assets/drive/gate.png',
    tag: 'Scene 02 · Avenue Grand Gate',
    desc: 'Akses gerbang masuk megah satu pintu (one-gate) dengan palang RFID dan pos sekuriti 24 jam.'
  },
  {
    img: 'assets/drive/house.jpeg',
    tag: 'Scene 03 · Fasad Senja Japandi',
    desc: 'Arsitektur modern perpaduan kayu ulin, dinding semen ekspos aci, dan taman Tabebuya bermekaran.'
  },
  {
    img: 'assets/drive/dalam-6.png',
    tag: 'Scene 04 · Interior Hangat Bersahaja',
    desc: 'Ruang tamu open-plan lantai granit berpadu tangga kayu gantung dan pencahayaan skylight alami.'
  },
  {
    img: 'assets/drive/clubhouse.png',
    tag: 'Scene 05 · The Park Clubhouse & Pool',
    desc: 'Fasilitas 177,25 m² bebas biaya: kolam renang infinity, fitness gym, mini golf, dan café komunal.'
  }
];

let currentLandingVideoIdx = 0;
let landingVideoAutoInterval = null;

function switchLandingVideoScene(sceneIdx, btnEl) {
  if (sceneIdx < 0 || sceneIdx >= LANDING_VIDEO_SCENES.length) return;
  currentLandingVideoIdx = sceneIdx;
  const scene = LANDING_VIDEO_SCENES[sceneIdx];

  const imgEl = document.getElementById('videoDisplayImg');
  const tagEl = document.getElementById('videoSceneTag');
  const descEl = document.getElementById('videoSceneDesc');

  if (imgEl) {
    imgEl.style.opacity = '0.3';
    setTimeout(() => {
      imgEl.src = scene.img;
      imgEl.style.opacity = '1';
    }, 180);
  }

  if (tagEl) tagEl.textContent = scene.tag;
  if (descEl) descEl.textContent = scene.desc;

  document.querySelectorAll('.video-scene-btn').forEach((btn, i) => {
    if (i === sceneIdx) {
      btn.classList.add('is-active');
      const vScroller = document.querySelector('.video-scene-selector');
      if (vScroller && btn) {
        vScroller.scrollTo({
          left: btn.offsetLeft - vScroller.clientWidth / 2 + btn.clientWidth / 2,
          behavior: 'smooth'
        });
      }
    } else {
      btn.classList.remove('is-active');
    }
  });
}

function toggleLandingVideoPlay() {
  const iconEl = document.getElementById('videoPlayIcon');

  if (landingVideoAutoInterval) {
    clearInterval(landingVideoAutoInterval);
    landingVideoAutoInterval = null;
    if (iconEl) {
      iconEl.innerHTML = '<polygon points="5 3 19 12 5 21 5 3" />';
    }
  } else {
    if (iconEl) {
      iconEl.innerHTML = '<rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />';
    }
    landingVideoAutoInterval = setInterval(() => {
      const nextIdx = (currentLandingVideoIdx + 1) % LANDING_VIDEO_SCENES.length;
      switchLandingVideoScene(nextIdx, null);
    }, 5000);
  }
}

/* --------------------------------------------------------------------------
   11. DENAH PREVIEW MODAL CONTROLLER
   -------------------------------------------------------------------------- */
let currentSpecModalUnit = 'Nagoya B.04';
let currentSpecModalPrice = 'Rp 650 Juta';

function openSpecDenahModal(type) {
  const modal = document.getElementById('denahSpecModal');
  const title = document.getElementById('denahSpecModalTitle');
  const img = document.getElementById('denahSpecModalImg');
  const details = document.getElementById('denahSpecModalDetails');
  const ctaText = document.getElementById('denahSpecCtaText');
  if (!modal) return;

  if (type === 'tipe110') {
    currentSpecModalUnit = 'Osaka A.1';
    currentSpecModalPrice = 'Rp 895 Juta';
    if (title) title.textContent = 'Denah Tipe 110 (Royal Diamond · Osaka)';
    if (img) img.src = 'assets/drive/denah-tipe110.jpg';
    if (ctaText) ctaText.textContent = 'Pesan Tipe Royal Diamond (Osaka A.1)';
    if (details) {
      details.innerHTML = `
        <div class="saved-item-row"><span>Luas Bangunan:</span><strong>110 m² (2 Lantai)</strong></div>
        <div class="saved-item-row"><span>Luas Tanah:</span><strong>90–125 m²</strong></div>
        <div class="saved-item-row"><span>Kamar Tidur:</span><strong>4 Kamar Tidur (1 KT di Lantai 1)</strong></div>
        <div class="saved-item-row"><span>Kapasitas Parkir:</span><strong>2 Garasi Dalam + 1 Carport (3 Mobil)</strong></div>
        <div class="saved-item-row"><span>Harga Mulai:</span><strong>Rp 895 Juta (Cash Keras)</strong></div>
      `;
    }
  } else if (type === 'tipe80') {
    currentSpecModalUnit = 'Tokyo B.1';
    currentSpecModalPrice = 'Rp 679 Juta';
    if (title) title.textContent = 'Denah Tipe 80 (Diamond · Tokyo)';
    if (img) img.src = 'assets/drive/denah-tipe110.jpg';
    if (ctaText) ctaText.textContent = 'Pesan Tipe Diamond (Tokyo B.1)';
    if (details) {
      details.innerHTML = `
        <div class="saved-item-row"><span>Luas Bangunan:</span><strong>80 m² (2 Lantai)</strong></div>
        <div class="saved-item-row"><span>Luas Tanah:</span><strong>80 m²</strong></div>
        <div class="saved-item-row"><span>Kamar Tidur:</span><strong>3–4 Kamar Tidur</strong></div>
        <div class="saved-item-row"><span>Kapasitas Parkir:</span><strong>1 Garasi Dalam + 1 Carport</strong></div>
        <div class="saved-item-row"><span>Harga Mulai:</span><strong>Rp 679 Juta (Cash Keras)</strong></div>
      `;
    }
  } else {
    currentSpecModalUnit = 'Nagoya B.04';
    currentSpecModalPrice = 'Rp 650 Juta';
    if (title) title.textContent = 'Denah Tipe 60 / 75 (Gold · Nagoya)';
    if (img) img.src = 'assets/drive/denah-tipe60.jpg';
    if (ctaText) ctaText.textContent = 'Pesan Tipe Gold (Nagoya B.04)';
    if (details) {
      details.innerHTML = `
        <div class="saved-item-row"><span>Luas Bangunan:</span><strong>60–75 m² (2 Lantai)</strong></div>
        <div class="saved-item-row"><span>Luas Tanah:</span><strong>63 m²</strong></div>
        <div class="saved-item-row"><span>Kamar Tidur:</span><strong>3 Kamar Tidur</strong></div>
        <div class="saved-item-row"><span>Kapasitas Parkir:</span><strong>1 Garasi Dalam + 1 Carport</strong></div>
        <div class="saved-item-row"><span>Harga Mulai:</span><strong>Rp 650 Juta (Cash Keras)</strong></div>
      `;
    }
  }

  modal.style.display = 'flex';
}

function closeSpecDenahModal(event) {
  if (event && event.target && event.target.id !== 'denahSpecModal') return;
  const modal = document.getElementById('denahSpecModal');
  if (modal) modal.style.display = 'none';
}

function confirmUnitFromDenahModal() {
  closeSpecDenahModal();
  selectCatalogUnit(currentSpecModalUnit, currentSpecModalPrice);
}

function openDenahSpecModal(typeTitle, imgPath) {
  const modal = document.getElementById('denahSpecModal');
  const title = document.getElementById('denahSpecModalTitle');
  const img = document.getElementById('denahSpecModalImg');
  const details = document.getElementById('denahSpecModalDetails');
  const ctaText = document.getElementById('denahSpecCtaText');
  if (!modal) return;

  if (title) title.textContent = typeTitle || 'Denah Arsitektur Japandi';
  if (img) img.src = imgPath ? `assets/drive/${imgPath}` : 'assets/drive/denah-tipe60.jpg';
  if (ctaText) ctaText.textContent = `Pesan ${typeTitle || 'Unit'}`;

  if (details) {
    if (typeTitle && typeTitle.includes('110')) {
      details.innerHTML = `
        <div class="saved-item-row"><span>Luas Bangunan:</span><strong>110 m² (2 Lantai)</strong></div>
        <div class="saved-item-row"><span>Luas Tanah:</span><strong>90–125 m²</strong></div>
        <div class="saved-item-row"><span>Kamar Tidur:</span><strong>4 Kamar Tidur</strong></div>
        <div class="saved-item-row"><span>Kapasitas Parkir:</span><strong>2 Garasi + 1 Carport (3 Mobil)</strong></div>
        <div class="saved-item-row"><span>Harga Mulai:</span><strong>Rp 895 Juta (Cash Keras)</strong></div>
      `;
    } else if (typeTitle && typeTitle.includes('Diamond')) {
      details.innerHTML = `
        <div class="saved-item-row"><span>Luas Bangunan:</span><strong>80 m² (2 Lantai)</strong></div>
        <div class="saved-item-row"><span>Luas Tanah:</span><strong>80 m²</strong></div>
        <div class="saved-item-row"><span>Kamar Tidur:</span><strong>3–4 Kamar Tidur</strong></div>
        <div class="saved-item-row"><span>Kapasitas Parkir:</span><strong>1 Garasi Dalam + 1 Carport</strong></div>
        <div class="saved-item-row"><span>Harga Mulai:</span><strong>Rp 679 Juta (Cash Keras)</strong></div>
      `;
    } else {
      details.innerHTML = `
        <div class="saved-item-row"><span>Luas Bangunan:</span><strong>75 m² (2 Lantai)</strong></div>
        <div class="saved-item-row"><span>Luas Tanah:</span><strong>60–63 m²</strong></div>
        <div class="saved-item-row"><span>Kamar Tidur:</span><strong>3 Kamar Tidur</strong></div>
        <div class="saved-item-row"><span>Kapasitas Parkir:</span><strong>1 Garasi Dalam + 1 Carport</strong></div>
        <div class="saved-item-row"><span>Harga Mulai:</span><strong>Rp 650 Juta (Cash Keras)</strong></div>
      `;
    }
  }

  modal.style.display = 'flex';
}

function openOrderModal(clusterOrType, lotCode, price) {
  const text = `Halo Marketing The Park Townhouse, saya tertarik untuk konsultasi dan pemesanan ${clusterOrType || 'unit'} (Kavling ${lotCode || ''}) dengan harga ${price || ''}. Mohon info ketersediaan unit dan jadwal visit ke Marketing Gallery Sukoharjo.`;
  window.open(`https://wa.me/628174983251?text=${encodeURIComponent(text)}`, '_blank');
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
  initSuratCintaMagazine();
  if (cardsCountLabel) cardsCountLabel.textContent = `${unlockedKeunggulanCount}/99`;
  runAfterDelayOpening();
});


/* ============================================================
   BERANDA INTERACTIVE CONTROLLERS & LEAFLET MAP
   ============================================================ */

const BERANDA_POIS = [
  { name: 'Stadion Gelora Merdeka Sukoharjo', distNagoya: '± 100 m', distOthers: '± 300 m', cat: 'Olahraga', coords: [-7.6748, 110.8432] },
  { name: 'Lapangan Basket Gelora', distNagoya: '± 100 m', distOthers: '± 300 m', cat: 'Olahraga', coords: [-7.6751, 110.8435] },
  { name: 'Lapangan Tenis Sukoharjo', distNagoya: '± 100 m', distOthers: '± 300 m', cat: 'Olahraga', coords: [-7.6745, 110.8438] },
  { name: 'Lapangan Skateboard', distNagoya: '± 100 m', distOthers: '± 300 m', cat: 'Olahraga', coords: [-7.6742, 110.8429] },
  { name: 'Lapangan Panahan', distNagoya: '± 100 m', distOthers: '± 300 m', cat: 'Olahraga', coords: [-7.6753, 110.8425] },
  { name: 'Masjid Al-Hidayah', distNagoya: '± 700 m', distOthers: '± 50 m', cat: 'Ibadah', coords: [-7.6725, 110.8415] },
  { name: 'SMKN 1 Sukoharjo', distNagoya: '± 750 m', distOthers: '± 300 m', cat: 'Pendidikan', coords: [-7.6718, 110.8420] },
  { name: 'RSUD IR Soekarno Kab. Sukoharjo', distNagoya: '± 2.3 km', distOthers: '± 2.2 km', cat: 'Kesehatan', coords: [-7.6830, 110.8405] },
  { name: 'Kejaksaan Negeri Sukoharjo', distNagoya: '± 700 m', distOthers: '± 250 m', cat: 'Pemerintahan', coords: [-7.6720, 110.8445] },
  { name: 'Kantor Kementerian Agama Sukoharjo', distNagoya: '± 700 m', distOthers: '± 250 m', cat: 'Pemerintahan', coords: [-7.6722, 110.8450] },
  { name: 'Pusat Layanan Haji dan Umrah Terpadu', distNagoya: '± 700 m', distOthers: '± 250 m', cat: 'Pemerintahan', coords: [-7.6724, 110.8455] },
  { name: 'Alun-Alun Kota Sukoharjo', distNagoya: '± 1.7 km', distOthers: '± 1.9 km', cat: 'Rekreasi', coords: [-7.6780, 110.8350] },
  { name: 'Taman Pramuka', distNagoya: '± 1.7 km', distOthers: '± 1.9 km', cat: 'Rekreasi', coords: [-7.6785, 110.8360] },
  { name: 'Universitas Veteran Bangun Nusantara', distNagoya: '± 1.3 km', distOthers: '± 500 m', cat: 'Pendidikan', coords: [-7.6705, 110.8395] },
  { name: 'SMA Negeri 3 Sukoharjo', distNagoya: '± 1.2 km', distOthers: '± 400 m', cat: 'Pendidikan', coords: [-7.6710, 110.8400] },
  { name: 'SD Negeri Jombor 3 Sukoharjo', distNagoya: '± 1.1 km', distOthers: '± 400 m', cat: 'Pendidikan', coords: [-7.6712, 110.8410] },
  { name: 'Pusat Perbelanjaan & Niaga', distNagoya: '± 700 m', distOthers: '± 500 m', cat: 'Belanja', coords: [-7.6760, 110.8412] }
];

let berandaLeafletMapInstance = null;
let berandaPoiMarkers = [];
let currentBerandaPoiFilter = 'Semua';
let activeBerandaCluster = 'nagoya';

function initBerandaLeafletMap() {
  const mapEl = document.getElementById('berandaLeafletMap');
  if (!mapEl || berandaLeafletMapInstance) return;

  const defaultCenter = [-7.6833, 110.8405];
  berandaLeafletMapInstance = L.map('berandaLeafletMap', {
    center: defaultCenter,
    zoom: 14,
    scrollWheelZoom: false,
    zoomControl: true,
    attributionControl: false
  });

  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19
  }).addTo(berandaLeafletMapInstance);

  // Concentric radar circles (1 km, 2.5 km) matching Room 03
  L.circle(defaultCenter, {
    radius: 2500,
    color: '#2e7d32',
    weight: 2,
    fillColor: '#a5d6a7',
    fillOpacity: 0.12
  }).addTo(berandaLeafletMapInstance);

  L.circle(defaultCenter, {
    radius: 1000,
    color: '#c49a45',
    weight: 1.5,
    dashArray: '5, 5',
    fillColor: '#e5d3af',
    fillOpacity: 0.18
  }).addTo(berandaLeafletMapInstance);

  // Add The Park Townhouse main location pin
  const mainIcon = L.divIcon({
    className: 'custom-townhouse-pin',
    html: '<div style="background:#16241c;color:#e5d3af;padding:4px 8px;border-radius:12px;border:1px solid #c49a45;font-weight:700;font-size:10px;white-space:nowrap;box-shadow:0 3px 10px rgba(0,0,0,0.35);">★ THE PARK TOWNHOUSE</div>',
    iconSize: [120, 28],
    iconAnchor: [60, 14]
  });
  L.marker(defaultCenter, { icon: mainIcon }).addTo(berandaLeafletMapInstance)
    .bindPopup('<b>The Park Townhouse Sukoharjo</b><br>Avenue Grand Gate · Koridor Jl. Sudirman');

  // Add POI markers and initialize real siteplan
  renderBerandaPoiList();
  renderBerandaMasterplanSiteplan('nagoya');
  updateKprFromSlider();
}

function renderBerandaPoiList() {
  const container = document.getElementById('berandaPoiList');
  if (!container) return;

  // Clear existing markers
  if (berandaLeafletMapInstance) {
    berandaPoiMarkers.forEach(m => berandaLeafletMapInstance.removeLayer(m));
    berandaPoiMarkers = [];
  }

  container.innerHTML = '';
  const filtered = currentBerandaPoiFilter === 'Semua' 
    ? BERANDA_POIS 
    : BERANDA_POIS.filter(p => p.cat === currentBerandaPoiFilter);

  filtered.forEach((poi, idx) => {
    // Add to HTML list
    const card = document.createElement('div');
    card.className = 'poi-interactive-card';
    card.onclick = () => focusBerandaPOI(BERANDA_POIS.indexOf(poi));
    const distText = activeBerandaCluster === 'nagoya' 
      ? poi.distNagoya + ' (Nagoya)' 
      : poi.distOthers + ' (' + activeBerandaCluster.toUpperCase() + ')';

    card.innerHTML = 
      '<div class="poi-card-left">' +
        '<div class="poi-card-name">' + poi.name + '</div>' +
        '<div class="poi-card-meta">' +
          '<span class="poi-dist-chip">' + distText + '</span>' +
          '<span class="poi-badge-cat">' + poi.cat + '</span>' +
        '</div>' +
      '</div>' +
      '<div style="font-size:11px;color:#c49a45;font-weight:700;">📍</div>';
    container.appendChild(card);

    // Add marker to map
    if (berandaLeafletMapInstance && poi.coords) {
      const marker = L.circleMarker(poi.coords, {
        radius: 6,
        fillColor: '#2e7d32',
        color: '#ffffff',
        weight: 1.5,
        fillOpacity: 0.9
      }).addTo(berandaLeafletMapInstance);

      marker.bindPopup('<b>' + poi.name + '</b><br>Kategori: ' + poi.cat + '<br>Jarak: ' + distText);
      berandaPoiMarkers.push(marker);
    }
  });
}

function filterBerandaPOI(category, btnEl) {
  currentBerandaPoiFilter = category;
  if (btnEl && btnEl.parentElement) {
    btnEl.parentElement.querySelectorAll('.poi-cat-chip').forEach(c => c.classList.remove('is-active'));
    btnEl.classList.add('is-active');
  }
  renderBerandaPoiList();
}

function focusBerandaPOI(poiIndex) {
  const poi = BERANDA_POIS[poiIndex];
  if (!poi || !berandaLeafletMapInstance) return;

  berandaLeafletMapInstance.flyTo(poi.coords, 16, { animate: true, duration: 0.8 });
  const marker = berandaPoiMarkers.find(m => {
    const latLng = m.getLatLng();
    return Math.abs(latLng.lat - poi.coords[0]) < 0.0001 && Math.abs(latLng.lng - poi.coords[1]) < 0.0001;
  });
  if (marker) {
    marker.openPopup();
  }
}

function switchBerandaClusterMap(clusterKey, btnEl) {
  activeBerandaCluster = clusterKey;
  if (btnEl && btnEl.parentElement) {
    btnEl.parentElement.querySelectorAll('.cluster-pill-btn').forEach(b => b.classList.remove('is-active'));
    btnEl.classList.add('is-active');
  }

  const coords = {
    nagoya: [-7.673895, 110.843978],
    osaka: [-7.6720, 110.8415],
    tokyo: [-7.6715, 110.8410]
  };

  if (berandaLeafletMapInstance && coords[clusterKey]) {
    berandaLeafletMapInstance.flyTo(coords[clusterKey], 15, { animate: true, duration: 0.8 });
  }
  renderBerandaPoiList();
}

/* Master Plan Lot Grid Controller */
let currentBerandaLotCluster = 'nagoya';
let currentBerandaLotFilter = 'all';
let inspectedLotNumber = 'A.02';

const BERANDA_LOTS = {
  nagoya: [
    { num: 'A.01', type: 'Gold (LB 75 / LT 60)', price: 'Rp 650 Juta', status: 'tersedia' },
    { num: 'A.02', type: 'Gold (LB 75 / LT 63)', price: 'Rp 650 Juta', status: 'tersedia' },
    { num: 'A.03', type: 'Gold (LB 75 / LT 63)', price: 'Rp 650 Juta', status: 'tersedia' },
    { num: 'A.04', type: 'Gold (LB 75 / LT 60)', price: 'Rp 650 Juta', status: 'tersedia' },
    { num: 'A.05', type: 'Gold (LB 75 / LT 63)', price: 'Rp 650 Juta', status: 'tersedia' },
    { num: 'A.06', type: 'Gold (LB 75 / LT 63)', price: 'Rp 650 Juta', status: 'tersedia' },
    { num: 'A.07', type: 'Gold (LB 75 / LT 63)', price: 'Rp 650 Juta', status: 'tersedia' },
    { num: 'A.08', type: 'Gold (LB 75 / LT 63)', price: 'Rp 650 Juta', status: 'tersedia' },
    { num: 'A.09', type: 'Gold Hook (LB 78 / LT 72)', price: 'Rp 675 Juta', status: 'tersedia' }
  ],
  osaka: [
    { num: 'B.01', type: 'Royal Diamond (LB 110 / LT 90)', price: 'Rp 895 Juta', status: 'tersedia' },
    { num: 'B.02', type: 'Royal Diamond (LB 110 / LT 100)', price: 'Rp 920 Juta', status: 'tersedia' },
    { num: 'B.03', type: 'Royal Diamond (LB 110 / LT 100)', price: 'Rp 920 Juta', status: 'tersedia' },
    { num: 'B.04', type: 'Royal Diamond (LB 110 / LT 105)', price: 'Rp 935 Juta', status: 'tersedia' },
    { num: 'B.05', type: 'Royal Diamond (LB 110 / LT 110)', price: 'Rp 950 Juta', status: 'tersedia' },
    { num: 'B.06', type: 'Royal Diamond (LB 110 / LT 125)', price: 'Rp 995 Juta', status: 'tersedia' }
  ],
  tokyo: [
    { num: 'C.01', type: 'Diamond (LB 80 / LT 80)', price: 'Rp 679 Juta', status: 'tersedia' },
    { num: 'C.02', type: 'Diamond (LB 80 / LT 80)', price: 'Rp 679 Juta', status: 'tersedia' },
    { num: 'C.03', type: 'Diamond (LB 80 / LT 80)', price: 'Rp 679 Juta', status: 'tersedia' },
    { num: 'C.04', type: 'Diamond (LB 80 / LT 80)', price: 'Rp 679 Juta', status: 'tersedia' },
    { num: 'C.05', type: 'Diamond (LB 80 / LT 80)', price: 'Rp 679 Juta', status: 'tersedia' },
    { num: 'C.06', type: 'Diamond (LB 80 / LT 80)', price: 'Rp 679 Juta', status: 'tersedia' }
  ]
};

function renderBerandaMasterplanSiteplan(clusterKey) {
  const cluster = clusterKey || currentBerandaLotCluster || 'nagoya';
  currentBerandaLotCluster = cluster;
  const data = SITEPLAN_DATA[cluster] || SITEPLAN_DATA.nagoya;

  const titleEl = document.getElementById('berandaSpClusterTitle');
  const shmEl = document.getElementById('berandaSpShmBadge');
  const tagEl = document.getElementById('berandaSpTagSub');
  const areaEl = document.getElementById('berandaSpAreaSub');
  const imgEl = document.getElementById('berandaSpImg');
  const overlayEl = document.getElementById('berandaSpLotsOverlay');
  const pillsRow = document.getElementById('berandaKavlingPillsRow');

  const topStatKavling = document.getElementById('berandaTopStatKavling');
  const topStatPrasarana = document.getElementById('berandaTopStatPrasarana');
  const topStatSarana = document.getElementById('berandaTopStatSarana');
  const topStatRth = document.getElementById('berandaTopStatRth');

  const statKavling = document.getElementById('berandaStatKavlingVal');
  const statPrasarana = document.getElementById('berandaStatPrasaranaVal');
  const statSarana = document.getElementById('berandaStatSaranaVal');
  const statRth = document.getElementById('berandaStatRthVal');

  if (titleEl) titleEl.textContent = data.title;
  if (shmEl) shmEl.textContent = data.shmText;
  if (tagEl) tagEl.textContent = data.tagSub;
  if (areaEl) areaEl.textContent = data.areaSub;
  if (imgEl) imgEl.src = data.img;

  if (topStatKavling) topStatKavling.textContent = data.stats.kavling;
  if (topStatPrasarana) topStatPrasarana.textContent = data.stats.prasarana;
  if (topStatSarana) topStatSarana.textContent = data.stats.sarana;
  if (topStatRth) topStatRth.textContent = data.stats.rth;

  if (statKavling) statKavling.textContent = data.stats.kavling;
  if (statPrasarana) statPrasarana.textContent = data.stats.prasarana;
  if (statSarana) statSarana.textContent = data.stats.sarana;
  if (statRth) statRth.textContent = data.stats.rth;

  if (overlayEl) {
    overlayEl.innerHTML = data.lots.map(lot => `
      <button class="siteplan-lot-marker ${lot.id === inspectedLotNumber ? 'is-active' : ''}"
        style="left: ${lot.x}%; top: ${lot.y}%;"
        onclick="selectBerandaLot('${lot.id}', '${cluster}')"
        type="button"
        title="${lot.name} (${lot.status})">
        ${lot.id}
      </button>
    `).join('');
  }

  if (pillsRow) {
    pillsRow.innerHTML = data.lots.map(lot => `
      <button class="kavling-pill-btn ${lot.id === inspectedLotNumber ? 'is-active' : ''}"
        id="beranda-pill-${lot.id}"
        onclick="selectBerandaLot('${lot.id}', '${cluster}')"
        type="button">
        ${lot.id} · ${lot.area}
      </button>
    `).join('');
  }

  const activeLot = data.lots.find(l => l.id === inspectedLotNumber) || data.lots[0];
  if (activeLot) {
    selectBerandaLot(activeLot.id, cluster);
  }
}

function switchBerandaLotCluster(clusterKey, btnEl) {
  currentBerandaLotCluster = clusterKey;
  if (btnEl && btnEl.parentElement) {
    btnEl.parentElement.querySelectorAll('.cluster-pill-btn').forEach(b => b.classList.remove('is-active'));
    btnEl.classList.add('is-active');
  }
  const data = SITEPLAN_DATA[clusterKey] || SITEPLAN_DATA.nagoya;
  if (data.lots.length > 0) {
    inspectedLotNumber = data.lots[0].id;
  }
  renderBerandaMasterplanSiteplan(clusterKey);
}

function selectBerandaLot(lotId, clusterKey) {
  inspectedLotNumber = lotId;
  const cluster = clusterKey || currentBerandaLotCluster || 'nagoya';
  const data = SITEPLAN_DATA[cluster] || SITEPLAN_DATA.nagoya;
  const lot = data.lots.find(l => l.id === lotId) || data.lots[0];
  if (!lot) return;

  document.querySelectorAll('#berandaSpLotsOverlay .siteplan-lot-marker').forEach(m => {
    m.classList.toggle('is-active', m.textContent.trim() === lot.id);
  });

  document.querySelectorAll('#berandaKavlingPillsRow .kavling-pill-btn').forEach(p => {
    p.classList.toggle('is-active', p.id === `beranda-pill-${lot.id}`);
  });

  const tagEl = document.getElementById('inspLotTag');
  const statusEl = document.getElementById('inspLotStatus');
  const lbEl = document.getElementById('inspLotLb');
  const ltEl = document.getElementById('inspLotLt');
  const typeEl = document.getElementById('inspLotType');
  const priceEl = document.getElementById('inspLotPrice');

  if (tagEl) tagEl.textContent = lot.name;
  if (statusEl) {
    statusEl.textContent = lot.status.toUpperCase();
    const st = lot.status.toLowerCase();
    if (st.includes('booking') || st.includes('booked')) {
      statusEl.className = 'kavling-status-badge status-booked';
    } else if (st.includes('terjual') || st.includes('sold')) {
      statusEl.className = 'kavling-status-badge status-sold';
    } else {
      statusEl.className = 'kavling-status-badge status-available';
    }
  }
  if (lbEl) lbEl.textContent = cluster === 'osaka' ? '110 m²' : (cluster === 'tokyo' ? '80 m²' : '75 m²');
  if (ltEl) ltEl.textContent = lot.area;
  if (typeEl) typeEl.textContent = lot.type;
  if (priceEl) priceEl.textContent = lot.price;
}

function orderInspectedLot() {
  const cluster = currentBerandaLotCluster || 'nagoya';
  const data = SITEPLAN_DATA[cluster] || SITEPLAN_DATA.nagoya;
  const lot = data.lots.find(l => l.id === inspectedLotNumber) || data.lots[0];
  const price = lot ? lot.price : 'Rp 650 Juta';
  openOrderModal('Klaster ' + cluster.toUpperCase(), inspectedLotNumber, price);
}

/* Investment Simulator Switcher */
function switchBerandaInvestType(type, btnEl) {
  if (btnEl && btnEl.parentElement) {
    btnEl.parentElement.querySelectorAll('.cluster-pill-btn').forEach(b => b.classList.remove('is-active'));
    btnEl.classList.add('is-active');
  }

  const roiVal = document.getElementById('investRoiVal');
  const roiPct = document.getElementById('investRoiPercent');
  const buyPrice = document.getElementById('investBuyPrice');
  const rentYield = document.getElementById('investRentalYield');
  const capGain = document.getElementById('investCapitalGain');
  const year5Val = document.getElementById('investYear5Val');
  const annualized = document.getElementById('investAnnualized');
  const yieldRate = document.getElementById('investYieldRate');

  if (type === 'tipe60') {
    if (roiVal) roiVal.textContent = 'Rp 674.655.879';
    if (roiPct) roiPct.textContent = '+135% Return on Investment';
    if (buyPrice) buyPrice.textContent = 'Rp 500.000.000';
    if (rentYield) rentYield.textContent = 'Rp 35.000.000 / thn';
    if (capGain) capGain.textContent = '15% / tahun';
    if (year5Val) year5Val.textContent = 'Rp 1.174.655.879';
    if (annualized) annualized.textContent = '27.1% p.a.';
    if (yieldRate) yieldRate.textContent = '6.9% / tahun';
  } else {
    if (roiVal) roiVal.textContent = 'Rp 916.650.000';
    if (roiPct) roiPct.textContent = '+135% Return on Investment';
    if (buyPrice) buyPrice.textContent = 'Rp 679.000.000';
    if (rentYield) rentYield.textContent = 'Rp 48.000.000 / thn';
    if (capGain) capGain.textContent = '15% / tahun';
    if (year5Val) year5Val.textContent = 'Rp 1.595.650.000';
    if (annualized) annualized.textContent = '27.1% p.a.';
    if (yieldRate) yieldRate.textContent = '7.1% / tahun';
  }
}

/* About 5-Tabs Switcher */
function switchBerandaAboutTab(tabName, btnEl) {
  if (btnEl && btnEl.parentElement) {
    btnEl.parentElement.querySelectorAll('.about-tab-btn').forEach(b => b.classList.remove('is-active'));
    btnEl.classList.add('is-active');
  }

  const panes = {
    tentang: document.getElementById('paneAboutTentang'),
    spesifikasi: document.getElementById('paneAboutSpesifikasi'),
    progres: document.getElementById('paneAboutProgres'),
    cara: document.getElementById('paneAboutCara'),
    promo: document.getElementById('paneAboutPromo')
  };

  Object.keys(panes).forEach(k => {
    if (panes[k]) {
      panes[k].style.display = k === tabName ? 'block' : 'none';
      panes[k].classList.toggle('is-active', k === tabName);
    }
  });
}

/* Interactive KPR Calculator */
function updateKprFromSlider() {
  const priceSlider = document.getElementById('kprPriceSlider');
  const dpSlider = document.getElementById('kprDpSlider');
  const tenorSelect = document.getElementById('kprTenorSelect');
  const interestSelect = document.getElementById('kprInterestSelect');

  if (!priceSlider || !dpSlider || !tenorSelect || !interestSelect) return;

  const price = parseFloat(priceSlider.value) || 650000000;
  const dpPct = parseFloat(dpSlider.value) || 20;
  const tenorYears = parseFloat(tenorSelect.value) || 15;
  const interestPct = parseFloat(interestSelect.value) || 7.5;

  const dpAmount = price * (dpPct / 100);
  const loanPrincipal = price - dpAmount;
  const totalMonths = tenorYears * 12;
  const monthlyRate = (interestPct / 100) / 12;

  // Annuity formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
  const installment = (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                      (Math.pow(1 + monthlyRate, totalMonths) - 1);

  // Update UI
  const displayPrice = document.getElementById('kprDisplayPrice');
  const displayDp = document.getElementById('kprDisplayDp');
  const displayInstallment = document.getElementById('kprMonthlyInstallment');
  const displayPrincipal = document.getElementById('kprLoanPrincipal');
  const displayTenor = document.getElementById('kprTenorMonths');

  if (displayPrice) displayPrice.textContent = 'Rp ' + price.toLocaleString('id-ID');
  if (displayDp) displayDp.textContent = dpPct + '% (Rp ' + dpAmount.toLocaleString('id-ID') + ')';
  if (displayInstallment) displayInstallment.textContent = 'Rp ' + Math.round(installment).toLocaleString('id-ID') + ' / bln';
  if (displayPrincipal) displayPrincipal.textContent = 'Rp ' + loanPrincipal.toLocaleString('id-ID');
  if (displayTenor) displayTenor.textContent = totalMonths + ' Bulan (' + tenorYears + ' Thn)';
}

/* Super App Feedback Toast */
function triggerAppFeature(featureKey) {
  const toast = document.getElementById('appMockToast');
  if (!toast) return;

  const messages = {
    lock: '✓ Smart Door Lock terhubung: Pintu Depan Terbuka (Akses Bluetooth/PIN Aman)',
    qr: '✓ QR Code Akses Tamu 24 Jam berhasil dibuat dan dikirim ke kontak WhatsApp Anda',
    booking: '✓ Reservasi Kolam Renang & Main Hall Clubhouse dikonfirmasi untuk Minggu Pagi',
    billing: '✓ Tagihan IPL & Air Bersih bulan berjalan: LUNAS (Auto-debit Terjadwal)',
    report: '✓ Laporan kendala ke Estate Management diterima: Petugas teknisi segera merapat',
    panic: '🚨 Sinyal Darurat terkirim ke Pos Keamanan Utama! Security sedang meluncur ke unit'
  };

  toast.textContent = messages[featureKey] || 'Fitur aktif';
  toast.style.borderColor = featureKey === 'panic' ? '#e53935' : '#81c784';
  toast.style.color = featureKey === 'panic' ? '#ffcdd2' : '#c8e6c9';
}

/* FAQ Accordion Controller */
function toggleFaqAccordion(btn) {
  const item = btn.closest('.faq-item');
  if (!item) return;

  const pane = item.querySelector('.faq-answer-pane');
  const isOpen = item.classList.contains('is-open');

  if (isOpen) {
    item.classList.remove('is-open');
    if (pane) pane.style.display = 'none';
  } else {
    item.classList.add('is-open');
    if (pane) pane.style.display = 'block';
  }
}

function filterFaqCategory(category, btnEl) {
  if (btnEl && btnEl.parentElement) {
    btnEl.parentElement.querySelectorAll('.faq-cat-btn').forEach(b => b.classList.remove('is-active'));
    btnEl.classList.add('is-active');
  }

  const items = document.querySelectorAll('.faq-accordion-list .faq-item');
  items.forEach(item => {
    const itemCat = item.getAttribute('data-cat');
    if (category === 'all' || itemCat === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

/* --------------------------------------------------------------------------
   SURAT CINTA KALKULATOR PEMBAYARAN & KPR (/antislop-layoutmobile)
   -------------------------------------------------------------------------- */
const SURAT_CALC_UNITS = [
  { id: 'B.02', area: '63 m²', cluster: 'nagoya', label: 'B.02 — 63 m² (nagoya)', basePrice: 498278753 },
  { id: 'B.03', area: '63 m²', cluster: 'nagoya', label: 'B.03 — 63 m² (nagoya)', basePrice: 498278753 },
  { id: 'B.04', area: '63 m²', cluster: 'nagoya', label: 'B.04 — 63 m² (nagoya)', basePrice: 498278753 },
  { id: 'A.02', area: '88 m²', cluster: 'nagoya', label: 'A.02 — 88 m² (nagoya)', basePrice: 695827000 },
  { id: 'A.03', area: '88 m²', cluster: 'nagoya', label: 'A.03 — 88 m² (nagoya)', basePrice: 695827000 },
  { id: 'A.04', area: '88 m²', cluster: 'nagoya', label: 'A.04 — 88 m² (nagoya)', basePrice: 695827000 },
  { id: 'A.05', area: '88 m²', cluster: 'nagoya', label: 'A.05 — 88 m² (nagoya)', basePrice: 695827000 },
  { id: 'A.06', area: '88 m²', cluster: 'nagoya', label: 'A.06 — 88 m² (nagoya)', basePrice: 695827000 },
  { id: 'A.07', area: '88 m²', cluster: 'nagoya', label: 'A.07 — 88 m² (nagoya)', basePrice: 695827000 },
  { id: 'A.08', area: '88 m²', cluster: 'nagoya', label: 'A.08 — 88 m² (nagoya)', basePrice: 695827000 },
  { id: 'A.09', area: '88 m²', cluster: 'nagoya', label: 'A.09 — 88 m² (nagoya)', basePrice: 695827000 },
  { id: 'B.05', area: '99 m²', cluster: 'nagoya', label: 'B.05 — 99 m² (nagoya)', basePrice: 782990000 },
  { id: 'B.06', area: '99 m²', cluster: 'nagoya', label: 'B.06 — 99 m² (nagoya)', basePrice: 782990000 },
  { id: 'B.07', area: '99 m²', cluster: 'nagoya', label: 'B.07 — 99 m² (nagoya)', basePrice: 782990000 },
  { id: 'A.2', area: '90 m²', cluster: 'osaka', label: 'A.2 — 90 m² (osaka)', basePrice: 895000000 },
  { id: 'A.3', area: '90 m²', cluster: 'osaka', label: 'A.3 — 90 m² (osaka)', basePrice: 895000000 },
  { id: 'A.1', area: '90 m²', cluster: 'osaka', label: 'A.1 — 90 m² (osaka)', basePrice: 895000000 },
  { id: 'A.4', area: '90 m²', cluster: 'osaka', label: 'A.4 — 90 m² (osaka)', basePrice: 895000000 },
  { id: 'A.5', area: '90 m²', cluster: 'osaka', label: 'A.5 — 90 m² (osaka)', basePrice: 895000000 },
  { id: 'A.6', area: '100 m²', cluster: 'osaka', label: 'A.6 — 100 m² (osaka)', basePrice: 995000000 },
  { id: 'A.7', area: '100 m²', cluster: 'osaka', label: 'A.7 — 100 m² (osaka)', basePrice: 995000000 },
  { id: 'A.8', area: '110 m²', cluster: 'osaka', label: 'A.8 — 110 m² (osaka)', basePrice: 1120000000 },
  { id: 'A.9', area: '110 m²', cluster: 'osaka', label: 'A.9 — 110 m² (osaka)', basePrice: 1120000000 },
  { id: 'B.3', area: '93 m²', cluster: 'tokyo1', label: 'B.3 — 93 m² (tokyo1)', basePrice: 810000000 },
  { id: 'B.5', area: '90 m²', cluster: 'tokyo1', label: 'B.5 — 90 m² (tokyo1)', basePrice: 775000000 },
  { id: 'B.6', area: '90 m²', cluster: 'tokyo1', label: 'B.6 — 90 m² (tokyo1)', basePrice: 775000000 },
  { id: 'B.1', area: '90 m²', cluster: 'tokyo1', label: 'B.1 — 90 m² (tokyo1)', basePrice: 775000000 },
  { id: 'B.2', area: '90 m²', cluster: 'tokyo1', label: 'B.2 — 90 m² (tokyo1)', basePrice: 775000000 },
  { id: 'B.4', area: '90 m²', cluster: 'tokyo1', label: 'B.4 — 90 m² (tokyo1)', basePrice: 775000000 },
  { id: 'B.7', area: '125 m²', cluster: 'tokyo1', label: 'B.7 — 125 m² (tokyo1)', basePrice: 935000000 }
];

let currentSuratCalcUnit = 'B.02';
let currentSuratCalcStage = 'pra'; // 'pra', 'soft', 'grand'
let currentSuratCalcScheme = 'cash_keras'; // 'cash_keras', 'cash_12', 'cash_24', 'kpr'
let currentSuratKprTenor = 15; // years
let currentSuratKprRate = 8.245; // %

function formatRupiahCur(val) {
  return 'Rp ' + Math.round(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function setSuratCalcStage(stage, btnEl) {
  currentSuratCalcStage = stage;
  if (btnEl && btnEl.parentElement) {
    btnEl.parentElement.querySelectorAll('.calc-tab-pill').forEach(b => b.classList.remove('is-active'));
    btnEl.classList.add('is-active');
  }
  recalculateSuratPayment();
}

function setSuratCalcScheme(scheme, btnEl) {
  currentSuratCalcScheme = scheme;
  if (btnEl && btnEl.parentElement) {
    btnEl.parentElement.querySelectorAll('.calc-scheme-btn').forEach(b => b.classList.remove('is-active'));
    btnEl.classList.add('is-active');
  }
  const sliderBox = document.getElementById('suratCalcKprSliders');
  if (sliderBox) {
    sliderBox.classList.toggle('is-hidden', scheme !== 'kpr');
  }
  recalculateSuratPayment();
}

function onSuratKprSliderChange() {
  const tenorSlider = document.getElementById('suratKprTenorSlider');
  const rateSlider = document.getElementById('suratKprRateSlider');
  const tenorVal = document.getElementById('suratKprTenorVal');
  const rateVal = document.getElementById('suratKprRateVal');

  if (tenorSlider) currentSuratKprTenor = parseInt(tenorSlider.value, 10);
  if (rateSlider) currentSuratKprRate = parseFloat(rateSlider.value);

  if (tenorVal) tenorVal.textContent = currentSuratKprTenor + ' Tahun (' + (currentSuratKprTenor * 12) + ' Bln)';
  if (rateVal) rateVal.textContent = currentSuratKprRate.toFixed(2) + '% p.a';

  recalculateSuratPayment();
}

function recalculateSuratPayment() {
  const selectEl = document.getElementById('suratCalcUnitSelect');
  if (selectEl) {
    currentSuratCalcUnit = selectEl.value;
  }
  const unitObj = SURAT_CALC_UNITS.find(u => u.id === currentSuratCalcUnit) || SURAT_CALC_UNITS[0];

  const stageMultipliers = { pra: 1.0, soft: 1.05, grand: 1.10 };
  const stageLabels = { pra: 'Pra-Launch', soft: 'Soft-Launch', grand: 'Grand-Launch' };

  const stageMult = stageMultipliers[currentSuratCalcStage] || 1.0;
  const stageLabel = stageLabels[currentSuratCalcStage];

  // Base cash keras price at current stage
  const basePriceAtStage = Math.round(unitObj.basePrice * stageMult);

  // 1. Calculate for chosen scheme
  let hargaJual = basePriceAtStage;
  let dpPercent = 0.40;
  let dpLabel = 'DP 40% (H+7)';
  let sisaLabel = 'Sisa Dibiayai';
  let sisaBayarDesc = 'Sisa 60% lunas penuh H+30';
  let statusHeadline = 'Pembayaran Tunai (maks 1 bln)';
  let headlineAmount = 0;
  let sisaAmount = 0;

  const bookingFee = 5000000;

  if (currentSuratCalcScheme === 'cash_keras') {
    hargaJual = basePriceAtStage;
    dpPercent = 0.40;
    const dpVal = Math.round(hargaJual * dpPercent);
    sisaAmount = hargaJual - dpVal;
    headlineAmount = sisaAmount;
    statusHeadline = 'Pembayaran Tunai (maks 1 bln)';
    sisaBayarDesc = 'Sisa 60% lunas penuh H+30';
  } else if (currentSuratCalcScheme === 'cash_12') {
    hargaJual = Math.round(basePriceAtStage * 1.05);
    dpPercent = 0.40;
    const dpVal = Math.round(basePriceAtStage * 0.40); // DP based on base
    sisaAmount = hargaJual - dpVal;
    const monthly = Math.round(sisaAmount / 12);
    headlineAmount = monthly;
    statusHeadline = 'Cicilan per Bulan (12 Bulan)';
    sisaBayarDesc = 'Cicilan in-house 12x flat (Bunga 0%)';
  } else if (currentSuratCalcScheme === 'cash_24') {
    hargaJual = Math.round(basePriceAtStage * 1.15);
    dpPercent = 0.40;
    const dpVal = Math.round(basePriceAtStage * 0.40);
    sisaAmount = hargaJual - dpVal;
    const monthly = Math.round(sisaAmount / 24);
    headlineAmount = monthly;
    statusHeadline = 'Cicilan per Bulan (24 Bulan)';
    sisaBayarDesc = 'Cicilan in-house 24x flat (Bunga 0%)';
  } else if (currentSuratCalcScheme === 'kpr') {
    hargaJual = Math.round(basePriceAtStage * 1.05);
    dpPercent = 0.30;
    dpLabel = 'DP 30% (H+14)';
    const dpVal = Math.round(hargaJual * 0.30);
    sisaAmount = hargaJual - dpVal; // Plafon KPR

    const r = (currentSuratKprRate / 100) / 12;
    const n = currentSuratKprTenor * 12;
    const pmt = Math.round(sisaAmount * (r / (1 - Math.pow(1 + r, -n))));
    headlineAmount = pmt;
    statusHeadline = 'Ilustrasi Cicilan KPR / Bln';
    sisaLabel = 'Plafon KPR Bank';
    sisaBayarDesc = 'Akad kredit & pencairan bank mitra';
  }

  const dpAmount = Math.round(currentSuratCalcScheme.startsWith('cash_') && currentSuratCalcScheme !== 'cash_keras' 
    ? basePriceAtStage * 0.40 
    : hargaJual * dpPercent);
  const dpNetto = Math.max(0, dpAmount - bookingFee);

  // Estimasi Biaya Tambahan
  const ppn = Math.round(hargaJual * 0.11);
  const npoptkp = 60000000;
  const bphtb = Math.round(Math.max(0, hargaJual - npoptkp) * 0.05);
  const notaris = 15000000;
  const totalTambahan = ppn + bphtb + notaris;
  const grandTotal = hargaJual + totalTambahan;

  // DOM Updates
  const elStatus = document.getElementById('suratResStatusLabel');
  const elAmount = document.getElementById('suratResAmount');
  const elMeta = document.getElementById('suratResMeta');

  const elHarga = document.getElementById('suratResHargaJual');
  const elBooking = document.getElementById('suratResBookingFee');
  const elDpLabel = document.getElementById('suratResDpLabel');
  const elDpAmount = document.getElementById('suratResDpAmount');
  const elDpNetto = document.getElementById('suratResDpNetto');
  const elSisaLabel = document.getElementById('suratResSisaLabel');
  const elSisaAmount = document.getElementById('suratResSisaAmount');
  const elTotalUnit = document.getElementById('suratResTotalUnit');

  const elMilestoneDp = document.getElementById('suratResMilestoneDp');
  const elMilestoneSisa = document.getElementById('suratResMilestoneSisa');

  const elPpn = document.getElementById('suratResPpn');
  const elBphtb = document.getElementById('suratResBphtb');
  const elTotalTambahan = document.getElementById('suratResTotalTambahan');
  const elGrandTotal = document.getElementById('suratResGrandTotal');
  const elCompareTitle = document.getElementById('suratCompareTitle');
  const elCompareCards = document.getElementById('suratCompareCards');

  if (elStatus) elStatus.textContent = statusHeadline;
  if (elAmount) elAmount.textContent = formatRupiahCur(headlineAmount);
  if (elMeta) elMeta.textContent = unitObj.id + ' · ' + (currentSuratCalcScheme === 'cash_keras' ? 'Cash Keras' : (currentSuratCalcScheme === 'cash_12' ? 'Cash Bertahap 12 Bln' : (currentSuratCalcScheme === 'cash_24' ? 'Cash Bertahap 24 Bln' : 'KPR Bank'))) + ' · ' + stageLabel;

  if (elHarga) elHarga.textContent = formatRupiahCur(hargaJual);
  if (elBooking) elBooking.textContent = formatRupiahCur(bookingFee);
  if (elDpLabel) elDpLabel.textContent = dpLabel;
  if (elDpAmount) elDpAmount.textContent = formatRupiahCur(dpAmount);
  if (elDpNetto) elDpNetto.textContent = formatRupiahCur(dpNetto);
  if (elSisaLabel) elSisaLabel.textContent = sisaLabel;
  if (elSisaAmount) elSisaAmount.textContent = formatRupiahCur(sisaAmount);
  if (elTotalUnit) elTotalUnit.textContent = formatRupiahCur(hargaJual);

  if (elMilestoneDp) elMilestoneDp.textContent = (dpPercent * 100) + '% · ' + (currentSuratCalcScheme === 'kpr' ? 'H+14' : 'H+7');
  if (elMilestoneSisa) elMilestoneSisa.textContent = sisaBayarDesc;

  if (elPpn) elPpn.textContent = formatRupiahCur(ppn);
  if (elBphtb) elBphtb.textContent = formatRupiahCur(bphtb);
  if (elTotalTambahan) elTotalTambahan.textContent = formatRupiahCur(totalTambahan);
  if (elGrandTotal) elGrandTotal.textContent = formatRupiahCur(grandTotal);

  if (elCompareTitle) {
    elCompareTitle.textContent = '4 Skema Pembayaran — ' + unitObj.id + ' (' + stageLabel + ')';
  }

  // Render Comparison Cards
  if (elCompareCards) {
    const ckP = basePriceAtStage;
    const ct12P = Math.round(basePriceAtStage * 1.05);
    const ct12Dp = Math.round(basePriceAtStage * 0.40);
    const ct12Cicilan = Math.round((ct12P - ct12Dp) / 12);

    const ct24P = Math.round(basePriceAtStage * 1.15);
    const ct24Dp = Math.round(basePriceAtStage * 0.40);
    const ct24Cicilan = Math.round((ct24P - ct24Dp) / 24);

    const kprP = Math.round(basePriceAtStage * 1.05);
    const kprDpVal = Math.round(kprP * 0.30);
    const kprPlafon = kprP - kprDpVal;
    const rKpr = (8.245 / 100) / 12;
    const nKpr = 180;
    const kprCicilan = Math.round(kprPlafon * (rKpr / (1 - Math.pow(1 + rKpr, -nKpr))));

    elCompareCards.innerHTML = `
      <div class="compare-row-card ${currentSuratCalcScheme === 'cash_keras' ? 'is-active' : ''}">
        <div class="compare-head-row">
          <span class="compare-scheme-name">Cash Keras</span>
          <span class="compare-dp-badge">DP 40%</span>
        </div>
        <div class="compare-body-row">
          <span class="compare-price">Harga: ${formatRupiahCur(ckP)}</span>
          <strong class="compare-cicilan">Tunai (maks 1 bln)</strong>
        </div>
      </div>

      <div class="compare-row-card ${currentSuratCalcScheme === 'cash_12' ? 'is-active' : ''}">
        <div class="compare-head-row">
          <span class="compare-scheme-name">Cash Bertahap 12 Bulan</span>
          <span class="compare-dp-badge">DP 40%</span>
        </div>
        <div class="compare-body-row">
          <span class="compare-price">Harga: ${formatRupiahCur(ct12P)}</span>
          <strong class="compare-cicilan">${formatRupiahCur(ct12Cicilan)} × 12</strong>
        </div>
      </div>

      <div class="compare-row-card ${currentSuratCalcScheme === 'cash_24' ? 'is-active' : ''}">
        <div class="compare-head-row">
          <span class="compare-scheme-name">Cash Bertahap 24 Bulan</span>
          <span class="compare-dp-badge">DP 40%</span>
        </div>
        <div class="compare-body-row">
          <span class="compare-price">Harga: ${formatRupiahCur(ct24P)}</span>
          <strong class="compare-cicilan">${formatRupiahCur(ct24Cicilan)} × 24</strong>
        </div>
      </div>

      <div class="compare-row-card ${currentSuratCalcScheme === 'kpr' ? 'is-active' : ''}">
        <div class="compare-head-row">
          <span class="compare-scheme-name">KPR Bank Mitra</span>
          <span class="compare-dp-badge">DP 30%</span>
        </div>
        <div class="compare-body-row">
          <span class="compare-price">Harga: ${formatRupiahCur(kprP)}</span>
          <strong class="compare-cicilan">${formatRupiahCur(kprCicilan)} × 180</strong>
        </div>
      </div>
    `;
  }
}

function orderSuratCalculatedUnit() {
  const unitObj = SURAT_CALC_UNITS.find(u => u.id === currentSuratCalcUnit) || SURAT_CALC_UNITS[0];
  openOrderModal('Klaster ' + unitObj.cluster.toUpperCase(), unitObj.id, '498.278.753');
}
