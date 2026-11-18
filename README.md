# herdr-smoky-purple-theme

![The Smoky Purple dialog](preview.png)

Smoky Purple is a dark colour theme for [Herdr](https://herdr.dev), a desktop app for terminals and coding agents. It comes as a mod, which is a small add-on that adds a panel or dialog to Herdr. This mod adds a dialog with an **Install and apply** button. Nothing changes until you press it.

## Tech Stack

| Category | Technology |
|----------|------------|
| Language | JavaScript, in one file: `main.js` |
| Runs in | Herdr's mod system |
| UI libraries | `gpui-kit`, `gpui-base` and `herdr`, all provided by Herdr |
| Package manager | None |

## Getting Started

You need Herdr, installed and running. You also need Git, a tool that downloads code from GitHub.

1. Download this repository:

   ```bash
   git clone https://github.com/bkbatchelor/herdr-smoky-purple-theme.git
   ```

   If you see `git: command not found`, install Git, then run the command again.

2. Create the mod folder:

   ```bash
   mkdir -p ~/.config/herdr-app/mods/smoky-purple-theme
   ```

3. Copy the two mod files into it:

   ```bash
   cp herdr-smoky-purple-theme/main.js herdr-smoky-purple-theme/mod.json ~/.config/herdr-app/mods/smoky-purple-theme/
   ```

   If you see `No such file or directory`, you are in the wrong folder. Go to the folder where you ran the clone command, then run this step again.

4. Check that Herdr accepts the mod:

   ```bash
   herdr-app check ~/.config/herdr-app/mods/smoky-purple-theme
   ```

   You should see `check passed`. If you see `check failed`, the message names the file and line. If you see `herdr-app: command not found`, restart your terminal so it can find the command.

## Usage

### Apply the theme

1. Open the dialog:

   ```bash
   herdr-app do mod.open '{"name":"smoky-purple-theme"}'
   ```

   The dialog shows ten colour swatches and a status line. If it does not open, run `herdr-app status`. It lists the errors from every mod.

2. In the dialog, click **Install and apply**.

   The window switches to Smoky Purple, and the status line reads "Installed. Applying switches to it."

   If the status line turns red, the dialog could not write the theme file or switch themes. The message says why. One cause is a theme file that changed while the dialog was working. Close the dialog, open it again, and click the button again.

### What the button changes

The button writes one file, `~/.config/herdr-app/themes/smoky-purple.json`. It then sets the theme of your current layout to `smoky-purple`. A layout is a saved window design in Herdr.

It does not change your fonts, your keys or `settings.json`.

### Commands

| Command | Description |
|---------|-------------|
| `herdr-app check <mod folder>` | Load the mod once and report any error |
| `herdr-app do mod.open '{"name":"smoky-purple-theme"}'` | Open the theme dialog |
| `herdr-app status` | List errors from every mod |
