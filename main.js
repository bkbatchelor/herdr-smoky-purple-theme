import { View, div } from "gpui-kit";
import { v_flex, h_flex } from "gpui-base";
import { theme, run, appHome, readTextFile, writeTextFile, closeOverlay, props, checking } from "herdr";

const NAME = "smoky-purple";

// The whole theme lives here, so this one folder is all that needs sharing.
const THEME = {
  background: "#292d3e",
  foreground: "#bfc7d5",
  selection: "#414764",
  cursor: "#ffcc00",
  ansi: [
    "#676e95", "#ff5572", "#a9c77d", "#ffcb6b", "#82aaff", "#c792ea", "#89ddff", "#ffffff",
    "#676e95", "#ff5572", "#c3e88d", "#ffcb6b", "#82aaff", "#c792ea", "#89ddff", "#ffffff",
  ],
  colors: {
    accent: "#c792ea",
    chrome: "#292d3e",
    surface: "#292d3e",
    popover: "#31364a",
    canvas: "#232635",
    raised: "#31364a",
    hover: "#34394f",
    selected: "#7e57c2",
    border: "#3b405a",
  },
};
const TEXT = JSON.stringify(THEME, null, 2) + "\n";

export default class SmokyPurpleTheme extends View {
  init(_props, cx) {
    this.state = "checking"; // checking | missing | outdated | installed | error
    this.busy = false;
    this.error = null;
    if (checking()) return;
    this.refresh(cx);
  }

  path() { return `${appHome()}/themes/${NAME}.json`; }

  refresh(cx) {
    cx.spawn(async (cx) => {
      try {
        const have = await readTextFile(this.path());
        this.state = have === null ? "missing" : have === TEXT ? "installed" : "outdated";
      } catch (e) {
        this.state = "error";
        this.error = String(e?.message ?? e);
      }
      cx.notify();
    });
  }

  // Writes the theme file only when it is missing or differs, then switches to it.
  apply(cx) {
    if (this.busy) return;
    this.busy = true;
    cx.notify();
    cx.spawn(async (cx) => {
      try {
        const have = await readTextFile(this.path());
        if (have !== TEXT) await writeTextFile(this.path(), TEXT, have);
        this.state = "installed";
        this.error = null;
        run("app.theme", { name: NAME });
      } catch (e) {
        this.state = "error";
        this.error = String(e?.message ?? e);
      }
      this.busy = false;
      cx.notify();
    });
  }

  render() {
    const t = theme();
    const label = {
      checking: "Checking…",
      missing: "Not installed yet. Applying writes themes/" + NAME + ".json.",
      outdated: "Installed, but different from this mod. Applying replaces it.",
      installed: "Installed. Applying switches to it.",
      error: this.error ?? "Something went wrong.",
    }[this.state];
    const swatch = (c) => div().size(22).rounded(5).bg(c).border_1().border_color(t.border);
    const swatches = [THEME.background, THEME.colors.canvas, THEME.colors.raised, THEME.colors.selected,
      THEME.colors.accent, THEME.ansi[1], THEME.ansi[2], THEME.ansi[3], THEME.ansi[4], THEME.ansi[6]];
    return v_flex().size_full().p(16).gap(12).text_color(t.foreground)
      .child(div().font_semibold().text_size(15).child("Smoky Purple"))
      .child(div().text_size(12).text_color(t.muted).child("A Palenight-based dark theme with a purple selection colour."))
      .child(h_flex().gap(6).flex_wrap().children(swatches.map(swatch)))
      .child(div().text_size(12).text_color(this.state === "error" ? t.blocked : t.dim).child(label))
      .child(h_flex().gap(8).mt(4)
        .child(div().id("apply").px(12).h(30).flex().items_center().rounded(6)
          .bg(this.busy ? t.raised : t.solid).text_color(t.solid_foreground).text_size(13)
          .hover((s) => s.opacity(0.9))
          .on_click((_e, cx) => this.apply(cx))
          .child(this.busy ? "Applying…" : "Install and apply"))
        .child(div().id("close").px(12).h(30).flex().items_center().rounded(6).bg(t.raised).text_size(13)
          .hover((s) => s.bg(t.hover))
          .on_click(() => { const o = props().overlay; if (o) closeOverlay(o); })
          .child("Close")));
  }
}
