# Dual Panel Clock

GNOME Shell extension for Ubuntu (and other GNOME desktops): keep the **local** top-bar clock unchanged, and add a second clock next to it that shows **UTC** date and time.

The UTC clock follows the same GNOME settings as the system clock (`clock-format`, show date / weekday / seconds).

## Requirements

- GNOME Shell 45+ (Ubuntu 24.04 and newer)
- A full log out / log in after the first install on Wayland (Ubuntu’s default)

## Install

```bash
git clone https://github.com/Stariller/dual-panel-clock.git
cd dual-panel-clock
make install
```

**Then log out and log back in** (required on Wayland before the Shell knows the extension exists). After that:

```bash
make enable
```

Confirm it is visible to the Shell:

```bash
make status
# or: gnome-extensions list | grep dual-panel
```

If `make enable` says the extension does not exist, the session was not restarted yet — log out/in and try enable again.

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
