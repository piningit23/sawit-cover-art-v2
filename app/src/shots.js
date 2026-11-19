// Fixed scenes for screenshots. ?shot=editor shows the full editor with a
// sample photo loaded. ?shot=cover shows only the exported style cover, full
// frame, at the size the query asks for. window.__shotReady is set once the
// cover has painted twice, so the screenshot catches the finished art.
export async function runShot(shot, query, studio) {
  const photo = query.get("photo") || "pier";
  const caption = query.get("caption") || "Sunset Heist";
  const layout = query.get("layout") || "hero";
  const grade = query.get("grade") || "sunset";
  const letter = query.get("letter") || "outlined";
  const size = query.get("size") || "1080x1080";

  studio.state.layout = layout;
  studio.state.grade = grade;
  studio.state.letterStyle = letter;
  studio.setTitle(caption);
  studio.setSubtitle(query.get("subtitle") || "Neon Nights on the Keys");
  await studio.loadSamples();
  if (photo === "pier") {
    studio.state.panels.forEach((p, i) => { p.photo = i % 2 === 0 ? 1 : 0; });
  }
  if (shot === "cover") {
    document.body.classList.add("shot-cover");
    const [w, h] = size.split("x").map(Number);
    const canvas = document.getElementById("coverCanvas");
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.objectFit = "contain";
    const { drawCover } = await import("./cover.js");
    drawCover(canvas.getContext("2d"), studio.state, w, h);
  } else {
    studio.redraw();
  }
  requestAnimationFrame(() => requestAnimationFrame(() => {
    window.__shotReady = true;
  }));
}
