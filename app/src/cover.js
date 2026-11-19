// Sunset Keys cover engine: draws multi-panel Vice City style cover art on
// any 2D canvas. Sky, sun, skyline, palms, grades, grain and poster lettering
// are all drawn here from scratch. No game art, no external assets, no fonts
// beyond the system stack. Grades are skin safe: the tint is light and the
// shadows are lifted, so faces stay readable.

export const LAYOUT_DEFS = [
  { id: "hero", label: "Hero plus two" },
  { id: "grid6", label: "Six panel grid" },
  { id: "strip", label: "Full bleed plus strip" },
  { id: "tilt", label: "Tilted snapshots" },
  { id: "mosaic", label: "Nine panel mosaic" },
  { id: "duo", label: "Duo split" },
  { id: "triptych", label: "Vertical triptych" },
  { id: "poster", label: "Poster grid with title" },
  { id: "film", label: "Film strip" },
];

export const GRADE_DEFS = [
  { id: "sunset", label: "Vice Sunset" },
  { id: "neon", label: "Neon Night" },
  { id: "gold", label: "Palm Gold" },
  { id: "teal", label: "Teal Vice" },
  { id: "noir", label: "Noir" },
  { id: "dusk", label: "Magenta Dusk" },
  { id: "aqua", label: "Aqua Palm" },
  { id: "chrome", label: "Chrome Night" },
];

export const LETTER_STYLES = [
  { id: "outlined", label: "Outlined neon" },
  { id: "solid", label: "Solid shadow" },
  { id: "sunburst", label: "Sunburst" },
];

export const TITLE_COLORS = [
  { id: "#ffffff", label: "White" }, // ds-allow-hardcode
  { id: "#ffd166", label: "Sunset gold" }, // ds-allow-hardcode
  { id: "#ff5ea8", label: "Neon pink" }, // ds-allow-hardcode
  { id: "#7ef0e0", label: "Teal glow" }, // ds-allow-hardcode
];

export const PANEL_FILTERS = [
  { id: "none", label: "No filter" },
  { id: "warm", label: "Warm" },
  { id: "cool", label: "Cool" },
  { id: "mono", label: "Mono" },
];

export const STICKER_DEFS = [
  { id: "palm", label: "Palm" },
  { id: "skyline", label: "Skyline" },
  { id: "sun", label: "Sun disc" },
  { id: "birds", label: "Birds" },
];

export const TAGLINES = [
  "Neon Nights on the Keys",
  "Sunset Heist",
  "Boulevard Queen",
  "Vice City, After Dark",
  "Palm Trees and Payday",
];

// Grade palettes. Artwork data, not UI chrome: the hex values are the grade.
// ds-allow-hardcode
export const GRADES = {
  sunset: { sky: ["#ffd166", "#ff6b35", "#ff2e88", "#7b2ff7"], tint: "rgba(255,46,136,0.20)", deep: "#2b0a3d", sun: "#fff6c9" }, // ds-allow-hardcode
  neon: { sky: ["#7ef0e0", "#2bb3ff", "#ff2e88", "#3d0a5e"], tint: "rgba(43,179,255,0.22)", deep: "#12042e", sun: "#e8fbff" }, // ds-allow-hardcode
  gold: { sky: ["#fff3b0", "#ffb703", "#fb8500", "#7f4f00"], tint: "rgba(251,133,0,0.20)", deep: "#331a00", sun: "#fffbe0" }, // ds-allow-hardcode
  teal: { sky: ["#a8fff3", "#2ec4b6", "#4361ee", "#3a0ca3"], tint: "rgba(67,97,238,0.20)", deep: "#0a1230", sun: "#f2fffc" }, // ds-allow-hardcode
  noir: { sky: ["#f8f9fa", "#adb5bd", "#495057", "#111111"], tint: "rgba(0,0,0,0.18)", deep: "#000000", sun: "#ffffff" }, // ds-allow-hardcode
  dusk: { sky: ["#ffb3d9", "#ff5ea8", "#8b2ff7", "#2a0a4d"], tint: "rgba(255,94,168,0.22)", deep: "#1d0533", sun: "#ffe3f1" }, // ds-allow-hardcode
  aqua: { sky: ["#d8fff4", "#5eead4", "#0ea5e9", "#0c4a6e"], tint: "rgba(14,165,233,0.18)", deep: "#082f49", sun: "#f0fffa" }, // ds-allow-hardcode
  chrome: { sky: ["#e2e8f0", "#94a3b8", "#475569", "#0f172a"], tint: "rgba(148,163,184,0.20)", deep: "#020617", sun: "#f8fafc" }, // ds-allow-hardcode
};

// Panel rects in normalised cover coordinates. The title band owns the
// bottom 24 percent; panels live in the top 76 percent, except film strip.
export const LAYOUTS = {
  hero: [
    { x: 0, y: 0, w: 0.62, h: 0.76, tilt: 0 },
    { x: 0.62, y: 0, w: 0.38, h: 0.38, tilt: 0 },
    { x: 0.62, y: 0.38, w: 0.38, h: 0.38, tilt: 0 },
  ],
  grid6: [
    { x: 0, y: 0, w: 0.333, h: 0.38, tilt: 0 },
    { x: 0.333, y: 0, w: 0.334, h: 0.38, tilt: 0 },
    { x: 0.667, y: 0, w: 0.333, h: 0.38, tilt: 0 },
    { x: 0, y: 0.38, w: 0.333, h: 0.38, tilt: 0 },
    { x: 0.333, y: 0.38, w: 0.334, h: 0.38, tilt: 0 },
    { x: 0.667, y: 0.38, w: 0.333, h: 0.38, tilt: 0 },
  ],
  strip: [
    { x: 0, y: 0, w: 1, h: 0.5, tilt: 0 },
    { x: 0, y: 0.5, w: 0.333, h: 0.26, tilt: 0 },
    { x: 0.333, y: 0.5, w: 0.334, h: 0.26, tilt: 0 },
    { x: 0.667, y: 0.5, w: 0.333, h: 0.26, tilt: 0 },
  ],
  tilt: [
    { x: 0.04, y: 0.03, w: 0.56, h: 0.62, tilt: -4 },
    { x: 0.52, y: 0.1, w: 0.44, h: 0.42, tilt: 3 },
    { x: 0.14, y: 0.44, w: 0.42, h: 0.32, tilt: 2 },
  ],
  mosaic: [
    { x: 0, y: 0, w: 0.333, h: 0.253, tilt: 0 },
    { x: 0.333, y: 0, w: 0.334, h: 0.253, tilt: 0 },
    { x: 0.667, y: 0, w: 0.333, h: 0.253, tilt: 0 },
    { x: 0, y: 0.253, w: 0.333, h: 0.253, tilt: 0 },
    { x: 0.333, y: 0.253, w: 0.334, h: 0.253, tilt: 0 },
    { x: 0.667, y: 0.253, w: 0.333, h: 0.253, tilt: 0 },
    { x: 0, y: 0.506, w: 0.333, h: 0.254, tilt: 0 },
    { x: 0.333, y: 0.506, w: 0.334, h: 0.254, tilt: 0 },
    { x: 0.667, y: 0.506, w: 0.333, h: 0.254, tilt: 0 },
  ],
  duo: [
    { x: 0, y: 0, w: 0.5, h: 0.76, tilt: 0 },
    { x: 0.5, y: 0, w: 0.5, h: 0.76, tilt: 0 },
  ],
  triptych: [
    { x: 0, y: 0, w: 0.333, h: 0.76, tilt: 0 },
    { x: 0.333, y: 0, w: 0.334, h: 0.76, tilt: 0 },
    { x: 0.667, y: 0, w: 0.333, h: 0.76, tilt: 0 },
  ],
  poster: [
    { x: 0, y: 0, w: 0.333, h: 0.253, tilt: 0 },
    { x: 0.333, y: 0, w: 0.334, h: 0.253, tilt: 0 },
    { x: 0.667, y: 0, w: 0.333, h: 0.253, tilt: 0 },
    { x: 0, y: 0.253, w: 0.333, h: 0.253, tilt: 0 },
    { x: 0.333, y: 0.253, w: 0.334, h: 0.253, tilt: 0, title: true },
    { x: 0.667, y: 0.253, w: 0.333, h: 0.253, tilt: 0 },
    { x: 0, y: 0.506, w: 0.333, h: 0.254, tilt: 0 },
    { x: 0.333, y: 0.506, w: 0.334, h: 0.254, tilt: 0 },
    { x: 0.667, y: 0.506, w: 0.333, h: 0.254, tilt: 0 },
  ],
  film: [
    { x: 0.02, y: 0.18, w: 0.184, h: 0.4, tilt: 0 },
    { x: 0.212, y: 0.18, w: 0.184, h: 0.4, tilt: 0 },
    { x: 0.404, y: 0.18, w: 0.184, h: 0.4, tilt: 0 },
    { x: 0.596, y: 0.18, w: 0.184, h: 0.4, tilt: 0 },
    { x: 0.788, y: 0.18, w: 0.184, h: 0.4, tilt: 0 },
  ],
};

export function layoutPanels(layoutId) {
  return LAYOUTS[layoutId] || LAYOUTS.hero;
}

export function panelCount(layoutId) {
  return layoutPanels(layoutId).length;
}

function seededRandom(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function drawSky(ctx, w, h, grade) {
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  grade.sky.forEach((c, i) => sky.addColorStop(i / (grade.sky.length - 1), c));
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);
}

function drawSunDisc(ctx, w, h, grade) {
  const sx = w * 0.68;
  const sy = h * 0.34;
  const sr = Math.min(w, h) * 0.13;
  const halo = ctx.createRadialGradient(sx, sy, sr * 0.1, sx, sy, sr * 2.4);
  halo.addColorStop(0, "rgba(255,240,180,0.9)");
  halo.addColorStop(0.4, "rgba(255,180,90,0.4)");
  halo.addColorStop(1, "rgba(255,120,80,0)");
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = grade.sun;
  ctx.beginPath();
  ctx.arc(sx, sy, sr, 0, Math.PI * 2);
  ctx.fill();
}

function drawSkyline(ctx, w, h, grade) {
  const base = h * 0.76;
  ctx.fillStyle = grade.deep;
  ctx.globalAlpha = 0.88;
  let x = 0;
  let i = 0;
  while (x < w) {
    const bw = w * (0.05 + ((i * 37) % 10) / 140);
    const bh = h * (0.04 + ((i * 53) % 10) / 110);
    ctx.fillRect(x, base - bh, bw, bh + h * 0.24);
    x += bw + w * 0.012;
    i += 1;
  }
  ctx.globalAlpha = 1;
}

function drawPalm(ctx, x, y, s, color) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = Math.max(2, s * 0.03);
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.quadraticCurveTo(x + s * 0.06, y - s * 0.55, x + s * 0.16, y - s * 0.95);
  ctx.stroke();
  const topX = x + s * 0.16;
  const topY = y - s * 0.95;
  for (let i = 0; i < 6; i += 1) {
    const a = -Math.PI * (0.08 + i * 0.16);
    const len = s * (0.42 - Math.abs(i - 2.5) * 0.03);
    ctx.beginPath();
    ctx.moveTo(topX, topY);
    ctx.quadraticCurveTo(
      topX + Math.cos(a) * len * 0.6,
      topY + Math.sin(a) * len * 0.5 - s * 0.08,
      topX + Math.cos(a) * len,
      topY + Math.sin(a) * len + s * 0.22
    );
    ctx.stroke();
  }
}

function drawBirds(ctx, w, h, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(2, w * 0.003);
  const spots = [[0.2, 0.12], [0.3, 0.08], [0.42, 0.14], [0.55, 0.09], [0.78, 0.13]];
  spots.forEach(([fx, fy]) => {
    const x = w * fx;
    const y = h * fy;
    const s = w * 0.02;
    ctx.beginPath();
    ctx.moveTo(x - s, y);
    ctx.quadraticCurveTo(x - s * 0.4, y - s * 0.7, x, y);
    ctx.quadraticCurveTo(x + s * 0.4, y - s * 0.7, x + s, y);
    ctx.stroke();
  });
}

function panelFilter(filterId) {
  if (filterId === "warm") return "sepia(0.35) saturate(1.35) contrast(1.02)";
  if (filterId === "cool") return "saturate(1.15) hue-rotate(165deg) contrast(1.03)";
  if (filterId === "mono") return "grayscale(1) contrast(1.12) brightness(1.04)";
  return "none";
}

function drawPhotoInto(ctx, img, px, py, pw, ph, panel) {
  const zoom = panel.zoom || 1;
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  const base = Math.max(pw / iw, ph / ih) * zoom;
  const dw = iw * base;
  const dh = ih * base;
  const ox = (panel.x || 0) * pw * 0.5;
  const oy = (panel.y || 0) * ph * 0.5;
  ctx.save();
  ctx.filter = panelFilter(panel.filter || "none");
  ctx.drawImage(img, px + (pw - dw) / 2 + ox, py + (ph - dh) / 2 + oy, dw, dh);
  ctx.restore();
}

function drawGrain(ctx, w, h) {
  const rand = seededRandom(20261119);
  ctx.fillStyle = "rgba(255,255,255,0.05)";
  for (let i = 0; i < 900; i += 1) {
    ctx.fillRect(rand() * w, rand() * h, 2, 2);
  }
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  for (let i = 0; i < 900; i += 1) {
    ctx.fillRect(rand() * w, rand() * h, 2, 2);
  }
}

function drawVignette(ctx, w, h) {
  const g = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.42, w / 2, h / 2, Math.max(w, h) * 0.75);
  g.addColorStop(0, "rgba(0,0,0,0)");
  g.addColorStop(1, "rgba(10,0,20,0.32)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

function fitTitleSize(ctx, text, maxWidth, startSize) {
  let size = startSize;
  ctx.font = `900 ${size}px "Arial Black", "Helvetica Neue", Arial, sans-serif`;
  while (ctx.measureText(text).width > maxWidth && size > 24) {
    size -= 4;
    ctx.font = `900 ${size}px "Arial Black", "Helvetica Neue", Arial, sans-serif`;
  }
  return size;
}

function drawSpacedText(ctx, text, cx, y, spacing, stroke) {
  const widths = [...text].map((ch) => ctx.measureText(ch).width);
  const total = widths.reduce((a, b) => a + b, 0) + spacing * (text.length - 1);
  let x = cx - total / 2;
  const prevAlign = ctx.textAlign;
  ctx.textAlign = "left";
  [...text].forEach((ch, i) => {
    ctx.fillText(ch, x, y);
    if (stroke) ctx.strokeText(ch, x, y);
    x += widths[i] + spacing;
  });
  ctx.textAlign = prevAlign;
}

function drawTitleBand(ctx, w, h, grade, state) {
  const bandY = h * 0.76;
  const bandH = h * 0.24;
  ctx.fillStyle = grade.deep;
  ctx.fillRect(0, bandY, w, bandH);
  ctx.fillStyle = grade.sky[0];
  ctx.fillRect(0, bandY, w, Math.max(3, h * 0.006));

  const title = (state.title || "").trim().toUpperCase();
  const sub = (state.subtitle || "").trim();
  const cx = w / 2;
  const spacing = state.letterSpacing || 0;

  if (state.letterStyle === "sunburst") {
    ctx.save();
    ctx.translate(cx, bandY + bandH * 0.55);
    ctx.fillStyle = grade.sky[1];
    ctx.globalAlpha = 0.55;
    for (let i = 0; i < 12; i += 1) {
      const a = (i / 12) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(a) * w * 0.6, Math.sin(a) * bandH * 1.4);
      ctx.lineTo(Math.cos(a + 0.12) * w * 0.6, Math.sin(a + 0.12) * bandH * 1.4);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  if (title) {
    const scale = w / 1080;
    const startSize = Math.round((state.titleSize || 96) * scale * (h / w > 1.1 ? 0.92 : 1));
    const size = fitTitleSize(ctx, title, w * 0.9, startSize);
    const titleY = bandY + bandH * (sub ? 0.52 : 0.62);
    ctx.font = `900 ${size}px "Arial Black", "Helvetica Neue", Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineJoin = "round";
    if (state.letterStyle === "outlined") {
      ctx.shadowColor = "rgba(255,46,136,0.85)";
      ctx.shadowBlur = size * 0.18;
      ctx.lineWidth = Math.max(2, size * 0.09);
      ctx.strokeStyle = grade.deep;
      ctx.fillStyle = state.titleColor || "#ffffff"; // ds-allow-hardcode
      drawSpacedText(ctx, title, cx, titleY, spacing * scale, true);
      ctx.shadowBlur = 0;
    } else if (state.letterStyle === "sunburst") {
      ctx.shadowColor = "rgba(0,0,0,0.55)";
      ctx.shadowBlur = size * 0.1;
      ctx.lineWidth = Math.max(2, size * 0.05);
      ctx.strokeStyle = grade.deep;
      ctx.fillStyle = state.titleColor || "#ffffff"; // ds-allow-hardcode
      drawSpacedText(ctx, title, cx, titleY, spacing * scale, true);
      ctx.shadowBlur = 0;
    } else {
      ctx.shadowColor = "rgba(0,0,0,0.6)";
      ctx.shadowBlur = size * 0.16;
      ctx.shadowOffsetY = size * 0.05;
      ctx.fillStyle = state.titleColor || "#ffffff"; // ds-allow-hardcode
      drawSpacedText(ctx, title, cx, titleY, spacing * scale, false);
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
    }
  }

  if (sub) {
    const subSize = Math.max(16, Math.round(h * 0.028));
    ctx.font = `700 ${subSize}px "Helvetica Neue", Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = grade.sky[0];
    ctx.fillText(sub, cx, bandY + bandH * 0.84);
  }
}

function drawFilmSprockets(ctx, w, h, grade) {
  // Sprocket holes read as light cutouts on the dark film band.
  ctx.fillStyle = grade.sky[0];
  const holeW = w * 0.03;
  const holeH = h * 0.035;
  for (let x = w * 0.02; x < w * 0.98; x += w * 0.062) {
    ctx.fillRect(x, h * 0.115, holeW, holeH);
    ctx.fillRect(x, h * 0.6, holeW, holeH);
  }
}

function drawTitleCell(ctx, rect, w, h, grade, state) {
  ctx.fillStyle = grade.deep;
  ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
  ctx.fillStyle = grade.sky[0];
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const title = (state.title || "").trim().toUpperCase();
  let size = Math.round(rect.h * 0.2);
  ctx.font = `900 ${size}px "Arial Black", "Helvetica Neue", Arial, sans-serif`;
  while (ctx.measureText(title).width > rect.w * 0.9 && size > 10) {
    size -= 2;
    ctx.font = `900 ${size}px "Arial Black", "Helvetica Neue", Arial, sans-serif`;
  }
  ctx.fillText(title, rect.x + rect.w / 2, rect.y + rect.h * 0.42);
  const sub = (state.subtitle || "").trim();
  let subSize = Math.round(rect.h * 0.09);
  ctx.font = `700 ${subSize}px "Helvetica Neue", Arial, sans-serif`;
  while (ctx.measureText(sub).width > rect.w * 0.9 && subSize > 8) {
    subSize -= 1;
    ctx.font = `700 ${subSize}px "Helvetica Neue", Arial, sans-serif`;
  }
  ctx.fillText(sub, rect.x + rect.w / 2, rect.y + rect.h * 0.72);
}

// Draws the whole cover for state onto ctx at w by h. Photos are HTMLImage
// elements or null. The same function draws the live preview and the export.
export function drawCover(ctx, state, w, h) {
  const grade = GRADES[state.grade] || GRADES.sunset;
  const panels = layoutPanels(state.layout);
  const gap = Math.max(2, Math.round(Math.min(w, h) * 0.008));

  drawSky(ctx, w, h, grade);
  if (state.stickers && state.stickers.sun) drawSunDisc(ctx, w, h, grade);
  if (state.layout === "film") {
    ctx.fillStyle = grade.deep;
    ctx.fillRect(0, h * 0.1, w, h * 0.56);
  }

  panels.forEach((def, i) => {
    const px = def.x * w + gap / 2;
    const py = def.y * h + gap / 2;
    const pw = def.w * w - gap;
    const ph = def.h * h - gap;
    if (pw <= 0 || ph <= 0) return;
    ctx.save();
    if (def.tilt) {
      ctx.translate(px + pw / 2, py + ph / 2);
      ctx.rotate((def.tilt * Math.PI) / 180);
      ctx.translate(-(px + pw / 2), -(py + ph / 2));
    }
    ctx.beginPath();
    ctx.rect(px, py, pw, ph);
    ctx.clip();
    if (def.title) {
      drawTitleCell(ctx, { x: px, y: py, w: pw, h: ph }, w, h, grade, state);
      ctx.restore();
      return;
    }
    const panel = (state.panels && state.panels[i]) || { photo: 0, zoom: 1, x: 0, y: 0, filter: "none" };
    // A panel pointing at an empty slot falls back to the first loaded photo,
    // so the cover is never half empty while any photo is loaded. Photo -1
    // means None on purpose and keeps its placeholder.
    const img = state.photos
      ? (panel.photo >= 0 ? (state.photos[panel.photo] || state.photos.find((p) => p)) : null)
      : null;
    if (img) {
      drawPhotoInto(ctx, img, px, py, pw, ph, panel);
      ctx.fillStyle = grade.tint;
      ctx.fillRect(px, py, pw, ph);
    } else {
      const shade = ctx.createLinearGradient(px, py, px + pw, py + ph);
      shade.addColorStop(0, grade.sky[1]);
      shade.addColorStop(1, grade.deep);
      ctx.fillStyle = shade;
      ctx.fillRect(px, py, pw, ph);
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.font = `700 ${Math.max(14, Math.round(pw * 0.05))}px "Helvetica Neue", Arial, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("ADD PHOTO " + (i + 1), px + pw / 2, py + ph / 2);
    }
    ctx.strokeStyle = "rgba(255,255,255,0.9)";
    ctx.lineWidth = Math.max(2, gap * 0.7);
    ctx.strokeRect(px, py, pw, ph);
    ctx.restore();
  });

  // The film strip carries its own sprocket band, so the skyline sticker
  // stays off it: the two would collide in the same strip of the cover.
  if (state.stickers && state.stickers.skyline && state.layout !== "film") drawSkyline(ctx, w, h, grade);
  // Palms stay off the film strip too: their trunks would cross the panels.
  if (state.stickers && state.stickers.palm && state.layout !== "film") {
    drawPalm(ctx, w * 0.06, h * 0.76, h * 0.22, grade.deep);
    drawPalm(ctx, w * 0.94, h * 0.76, h * 0.17, grade.deep);
  }
  if (state.stickers && state.stickers.birds) drawBirds(ctx, w, h, grade.deep);
  if (state.layout === "film") drawFilmSprockets(ctx, w, h, grade);

  if (state.layout === "poster") {
    ctx.fillStyle = grade.deep;
    ctx.fillRect(0, h * 0.76, w, h * 0.24);
    ctx.fillStyle = grade.sky[0];
    ctx.fillRect(0, h * 0.76, w, Math.max(3, h * 0.006));
    const sub = (state.subtitle || "").trim();
    if (sub) {
      ctx.font = `700 ${Math.max(16, Math.round(h * 0.032))}px "Helvetica Neue", Arial, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = grade.sky[0];
      ctx.fillText(sub.toUpperCase(), w / 2, h * 0.88);
    }
  } else {
    drawTitleBand(ctx, w, h, grade, state);
  }
  if (state.grain) {
    drawGrain(ctx, w, h);
    drawVignette(ctx, w, h);
  }
}

// Draws state onto a canvas element, sizing the canvas to w by h first.
export function drawToCanvas(canvas, state, w, h) {
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  drawCover(ctx, state, w, h);
  return canvas;
}

// Renders state to a fresh offscreen canvas at exact export size.
export function renderExport(state, w, h) {
  const canvas = document.createElement("canvas");
  return drawToCanvas(canvas, state, w, h);
}
