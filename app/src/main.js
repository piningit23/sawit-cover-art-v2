// Sunset Keys editor: wires the page controls to the cover engine. Photos are
// read on this machine with FileReader and object URLs, never uploaded. The
// live preview and the PNG export draw from the same state and the same
// drawCover function, so what you see is what exports.

import {
  LAYOUT_DEFS,
  GRADE_DEFS,
  LETTER_STYLES,
  TITLE_COLORS,
  PANEL_FILTERS,
  STICKER_DEFS,
  TAGLINES,
  layoutPanels,
  drawToCanvas,
  renderExport,
} from "./cover.js";

const canvas = document.getElementById("coverCanvas");
const statusEl = document.getElementById("status");
const emptyNote = document.getElementById("emptyNote");

function defaultPanels() {
  return Array.from({ length: 9 }, (_, i) => ({
    photo: i % 4,
    zoom: 1,
    x: 0,
    y: 0,
    filter: "none",
  }));
}

function defaultState() {
  return {
    layout: "hero",
    grade: "sunset",
    grain: true,
    stickers: { palm: true, skyline: true, sun: true, birds: false },
    title: "SUNSET KEYS",
    subtitle: "Neon Nights on the Keys",
    titleSize: 96,
    letterSpacing: 4,
    letterStyle: "outlined",
    titleColor: "#ffffff", // ds-allow-hardcode
    photos: [null, null, null, null],
    panels: defaultPanels(),
    selectedPanel: 0,
  };
}

const state = defaultState();

export function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not load image"));
    img.src = url;
  });
}

function previewSize() {
  return { w: 1080, h: 1080 };
}

function redraw() {
  const { w, h } = previewSize();
  drawToCanvas(canvas, state, w, h);
  const hasPhoto = state.photos.some((p) => p !== null);
  if (emptyNote) emptyNote.style.display = hasPhoto ? "none" : "";
}

function setStatus(text) {
  if (statusEl) statusEl.textContent = text;
}

function buildChips(container, defs, current, onPick) {
  container.innerHTML = "";
  defs.forEach((def) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip";
    btn.textContent = def.label;
    btn.setAttribute("aria-pressed", String(def.id === current));
    btn.addEventListener("click", () => {
      onPick(def.id);
      container.querySelectorAll(".chip").forEach((c) => {
        c.setAttribute("aria-pressed", String(c === btn));
      });
    });
    container.appendChild(btn);
  });
}

function buildStickerChips() {
  const container = document.getElementById("stickerChips");
  container.innerHTML = "";
  STICKER_DEFS.forEach((def) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip";
    btn.textContent = def.label;
    btn.setAttribute("aria-pressed", String(Boolean(state.stickers[def.id])));
    btn.addEventListener("click", () => {
      state.stickers[def.id] = !state.stickers[def.id];
      btn.setAttribute("aria-pressed", String(state.stickers[def.id]));
      redraw();
    });
    container.appendChild(btn);
  });
}

function buildTaglineChips() {
  const container = document.getElementById("taglineChips");
  container.innerHTML = "";
  TAGLINES.forEach((line) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip";
    btn.textContent = line;
    btn.setAttribute("aria-pressed", "false");
    btn.addEventListener("click", () => {
      state.subtitle = line;
      document.getElementById("subIn").value = line;
      redraw();
    });
    container.appendChild(btn);
  });
}

function buildPhotoSlots() {
  const wrap = document.getElementById("photoSlots");
  wrap.innerHTML = "";
  state.photos.forEach((photo, i) => {
    const label = document.createElement("label");
    label.className = "slot";
    label.title = "Photo " + (i + 1);
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.setAttribute("aria-label", "Choose photo " + (i + 1));
    input.addEventListener("change", async (event) => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      try {
        state.photos[i] = await loadImage(URL.createObjectURL(file));
        setStatus("Photo " + (i + 1) + " loaded.");
        buildPhotoSlots();
        redraw();
      } catch (err) {
        setStatus("That file could not be read as a photo.");
      }
    });
    label.appendChild(input);
    if (photo) {
      const img = document.createElement("img");
      img.src = photo.src;
      img.alt = "Photo " + (i + 1);
      label.appendChild(img);
    } else {
      const span = document.createElement("span");
      span.textContent = "Photo " + (i + 1) + ": choose a file";
      label.appendChild(span);
    }
    wrap.appendChild(label);
  });
}

function sliderRow(labelText, min, max, step, value, onInput) {
  const label = document.createElement("label");
  label.textContent = labelText + " ";
  const val = document.createElement("span");
  val.className = "val";
  val.textContent = String(value);
  label.appendChild(val);
  const input = document.createElement("input");
  input.type = "range";
  input.min = String(min);
  input.max = String(max);
  input.step = String(step);
  input.value = String(value);
  input.setAttribute("aria-label", labelText);
  input.addEventListener("input", () => {
    const v = Number(input.value);
    val.textContent = String(v);
    onInput(v);
  });
  label.appendChild(input);
  return label;
}

function buildPanelList() {
  const list = document.getElementById("panelList");
  list.innerHTML = "";
  const panels = layoutPanels(state.layout);
  panels.forEach((def, i) => {
    if (def.title) {
      const note = document.createElement("p");
      note.className = "hint";
      note.textContent = "Panel " + (i + 1) + " is the poster title cell, not a photo.";
      list.appendChild(note);
      return;
    }
    const panel = state.panels[i];
    const card = document.createElement("div");
    card.className = "panel-card" + (state.selectedPanel === i ? " selected" : "");
    card.addEventListener("click", () => {
      state.selectedPanel = i;
      buildPanelList();
    });
    const heading = document.createElement("h3");
    heading.textContent = "Panel " + (i + 1);
    card.appendChild(heading);

    const photoLabel = document.createElement("p");
    photoLabel.className = "field-label";
    photoLabel.textContent = "Photo";
    card.appendChild(photoLabel);
    const photoChips = document.createElement("div");
    photoChips.className = "chips";
    const photoDefs = state.photos.map((p, k) => ({
      id: String(k),
      label: p ? "Photo " + (k + 1) : "Photo " + (k + 1) + " (empty)",
    }));
    photoDefs.push({ id: "-1", label: "None" });
    photoDefs.forEach((def) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip";
      btn.textContent = def.label;
      btn.setAttribute("aria-pressed", String(panel.photo === Number(def.id)));
      btn.addEventListener("click", (event) => {
        event.stopPropagation();
        panel.photo = Number(def.id);
        buildPanelList();
        redraw();
      });
      photoChips.appendChild(btn);
    });
    card.appendChild(photoChips);

    const filterLabel = document.createElement("p");
    filterLabel.className = "field-label";
    filterLabel.textContent = "Filter";
    card.appendChild(filterLabel);
    const filterChips = document.createElement("div");
    filterChips.className = "chips";
    PANEL_FILTERS.forEach((f) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip";
      btn.textContent = f.label;
      btn.setAttribute("aria-pressed", String(panel.filter === f.id));
      btn.addEventListener("click", (event) => {
        event.stopPropagation();
        panel.filter = f.id;
        buildPanelList();
        redraw();
      });
      filterChips.appendChild(btn);
    });
    card.appendChild(filterChips);

    card.appendChild(sliderRow("Zoom", 0.8, 2.5, 0.05, panel.zoom, (v) => {
      panel.zoom = v;
      redraw();
    }));
    card.appendChild(sliderRow("Position X", -0.5, 0.5, 0.05, panel.x, (v) => {
      panel.x = v;
      redraw();
    }));
    card.appendChild(sliderRow("Position Y", -0.5, 0.5, 0.05, panel.y, (v) => {
      panel.y = v;
      redraw();
    }));
    list.appendChild(card);
  });
}

function buildLayoutAndGrade() {
  buildChips(document.getElementById("layoutChips"), LAYOUT_DEFS, state.layout, (id) => {
    state.layout = id;
    state.selectedPanel = 0;
    buildPanelList();
    redraw();
  });
  buildChips(document.getElementById("gradeChips"), GRADE_DEFS, state.grade, (id) => {
    state.grade = id;
    redraw();
  });
  buildChips(document.getElementById("letterStyleChips"), LETTER_STYLES, state.letterStyle, (id) => {
    state.letterStyle = id;
    redraw();
  });
  buildChips(document.getElementById("titleColorChips"), TITLE_COLORS, state.titleColor, (id) => {
    state.titleColor = id;
    redraw();
  });
}

async function loadSamples() {
  try {
    state.photos[0] = await loadImage("samples/boulevard.jpg");
    state.photos[1] = await loadImage("samples/pier.jpg");
    setStatus("Sample photos loaded.");
    buildPhotoSlots();
    buildPanelList();
    redraw();
  } catch (err) {
    setStatus("Sample photos could not be loaded.");
  }
}

function exportPng(sizeLabel) {
  const [w, h] = sizeLabel.split("x").map(Number);
  const out = renderExport(state, w, h);
  out.toBlob((blob) => {
    if (!blob) {
      setStatus("Export failed. Try again.");
      return;
    }
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "sunset-keys-cover-" + sizeLabel + ".png";
    a.click();
    setStatus("Saved sunset-keys-cover-" + sizeLabel + ".png (" + w + " by " + h + ").");
  }, "image/png");
}

document.getElementById("loadSamples").addEventListener("click", loadSamples);
document.getElementById("fillAll").addEventListener("click", () => {
  state.panels.forEach((p) => { p.photo = 0; });
  buildPanelList();
  redraw();
  setStatus("Every panel now uses photo 1.");
});
document.getElementById("grainChk").addEventListener("change", (event) => {
  state.grain = event.target.checked;
  redraw();
});
document.getElementById("titleIn").addEventListener("input", (event) => {
  state.title = event.target.value;
  redraw();
});
document.getElementById("subIn").addEventListener("input", (event) => {
  state.subtitle = event.target.value;
  redraw();
});
document.getElementById("titleSize").addEventListener("input", (event) => {
  state.titleSize = Number(event.target.value);
  document.getElementById("titleSizeVal").textContent = event.target.value;
  redraw();
});
document.getElementById("letterSpace").addEventListener("input", (event) => {
  state.letterSpacing = Number(event.target.value);
  document.getElementById("letterSpaceVal").textContent = event.target.value;
  redraw();
});
document.getElementById("resetBtn").addEventListener("click", () => {
  const fresh = defaultState();
  Object.keys(fresh).forEach((k) => { state[k] = fresh[k]; });
  document.getElementById("titleIn").value = state.title;
  document.getElementById("subIn").value = state.subtitle;
  document.getElementById("titleSize").value = String(state.titleSize);
  document.getElementById("titleSizeVal").textContent = String(state.titleSize);
  document.getElementById("letterSpace").value = String(state.letterSpacing);
  document.getElementById("letterSpaceVal").textContent = String(state.letterSpacing);
  document.getElementById("grainChk").checked = state.grain;
  buildLayoutAndGrade();
  buildStickerChips();
  buildPhotoSlots();
  buildPanelList();
  redraw();
  setStatus("Cover reset.");
});
document.querySelectorAll("[data-export]").forEach((btn) => {
  btn.addEventListener("click", () => exportPng(btn.getAttribute("data-export")));
});

buildLayoutAndGrade();
buildStickerChips();
buildTaglineChips();
buildPhotoSlots();
buildPanelList();
redraw();

// Handle for screenshots and for automated checks: the shot runner drives
// the same state the editor uses, so a screenshot shows the real app.
window.__studio = {
  state,
  redraw,
  loadImage,
  loadSamples,
  exportPng,
  setTitle(text) {
    state.title = text;
    document.getElementById("titleIn").value = text;
    redraw();
  },
  setSubtitle(text) {
    state.subtitle = text;
    document.getElementById("subIn").value = text;
    redraw();
  },
};

const params = new URLSearchParams(location.search);
const shot = params.get("shot");
if (shot) {
  import("./shots.js").then((mod) => mod.runShot(shot, params, window.__studio));
}
