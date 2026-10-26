UUID := dual-panel-clock@tensys.ai
EXTDIR := $(UUID)
ZIP := $(UUID).shell-extension.zip
INSTALL_DIR := $(HOME)/.local/share/gnome-shell/extensions/$(UUID)

.PHONY: install uninstall zip enable disable status

# Pack + install through gnome-extensions so the session actually registers the UUID.
# On Wayland the running Shell still will not see it until you log out and back in.
install: zip
	gnome-extensions install --force "$(ZIP)"
	@echo
	@echo "Installed $(UUID)."
	@echo "On Wayland (Ubuntu default): log out and log back in, then run: make enable"
	@echo "On X11: Alt+F2, type r, Enter — then: make enable"

zip:
	rm -f "$(ZIP)"
	gnome-extensions pack "$(EXTDIR)" --force -o "$(ZIP)" \
		|| (cd "$(EXTDIR)" && zip -r "../$(ZIP)" . -x '*.git*')

uninstall:
	-gnome-extensions disable "$(UUID)" 2>/dev/null || true
	-gnome-extensions uninstall "$(UUID)" 2>/dev/null || true
	rm -rf "$(INSTALL_DIR)"
	rm -f "$(ZIP)"

enable:
	@if ! gnome-extensions info "$(UUID)" >/dev/null 2>&1; then \
		echo "Shell has not discovered $(UUID) yet."; \
		echo "Log out and log back in (Wayland), then re-run: make enable"; \
		echo "Check with: gnome-extensions list | grep dual-panel"; \
		exit 1; \
	fi
	gnome-extensions enable "$(UUID)"
	@echo "Enabled. Look for a UTC clock left of the system clock."

disable:
	gnome-extensions disable "$(UUID)"

status:
	-gnome-extensions info "$(UUID)" || true
	-gnome-extensions list | grep -i dual-panel || true
