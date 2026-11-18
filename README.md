# herdr-smoky-purple-theme

![The Smoky Purple dialog](preview.png)

Smoky Purple is a dark colour theme for [Herdr](https://herdr.dev), packaged as a mod. A mod is a small add-on that adds a panel or dialog to Herdr. This one adds a dialog with an **Install and apply** button. Nothing changes until you press it.

## Tech Stack

| Category | Technology |
|----------|------------|
| Language | JavaScript (one ES module, `main.js`) |
| Runs in | Herdr's mod system |
| UI libraries | `gpui-kit`, `gpui-base` and `herdr`, all provided by Herdr |
| Package manager | None |

## Getting Started

Requires Herdr, installed and running, and Git.

```bash
git clone https://github.com/bkbatchelor/herdr-smoky-purple-theme.git
mkdir -p ~/.config/herdr-app/mods/smoky-purple-theme
cp herdr-smoky-purple-theme/main.js herdr-smoky-purple-theme/mod.json ~/.config/herdr-app/mods/smoky-purple-theme/
herdr-app check ~/.config/herdr-app/mods/smoky-purple-theme
```

You should see `check passed`. If the check fails, its message names the file and line. If `herdr-app` is not found, restart your terminal.

## Usage

Open the dialog, then click **Install and apply**:

```bash
herdr-app do mod.open '{"name":"smoky-purple-theme"}'
```

The button writes `~/.config/herdr-app/themes/smoky-purple.json` and switches your current layout to the `smoky-purple` theme. It does not change your fonts, keys or `settings.json`. If the status line turns red, close the dialog, open it again and click the button again.

| Command | Description |
|---------|-------------|
| `herdr-app check <mod folder>` | Load the mod once and report any error |
| `herdr-app do mod.open '{"name":"smoky-purple-theme"}'` | Open the theme dialog |
| `herdr-app status` | List errors from every mod |
