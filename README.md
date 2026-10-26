# Dual Panel Clock

GNOME Shell extension for Ubuntu (and other GNOME desktops): keep the **local** top-bar clock unchanged, and add a second clock next to it that shows **UTC** date and time.

The UTC clock follows the same GNOME settings as the system clock (`clock-format`, show date / weekday / seconds).

## Requirements

- GNOME Shell 45+ (Ubuntu 24.04 and newer)
- Session restart after first install on Wayland

## Install

```bash
git clone https://github.com/Stariller/dual-panel-clock.git
cd dual-panel-clock
make install
```

Log out and back in (Wayland), then:

```bash
make enable
```

Or enable via **Extensions** / `gnome-extensions-app`.

## Uninstall

```bash
make disable
make uninstall
```

## Layout

```
…  |  Mon Oct 26  21:07 UTC  |  Mon Oct 26  3:07 PM  |  …
         ↑ added by this extension      ↑ system local clock (unchanged)
```

## License

MIT
