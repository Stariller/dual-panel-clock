UUID := dual-panel-clock@tensys.ai
EXTDIR := $(UUID)
INSTALL_DIR := $(HOME)/.local/share/gnome-shell/extensions/$(UUID)

.PHONY: install uninstall zip enable disable

install:
	mkdir -p "$(INSTALL_DIR)"
	cp -a $(EXTDIR)/. "$(INSTALL_DIR)/"
	@echo "Installed to $(INSTALL_DIR)"
	@echo "On Wayland: log out and back in, then: make enable"

uninstall:
	rm -rf "$(INSTALL_DIR)"
	-gnome-extensions disable $(UUID) 2>/dev/null || true

enable:
	gnome-extensions enable $(UUID)

disable:
	gnome-extensions disable $(UUID)

zip:
	cd $(EXTDIR) && zip -r ../$(UUID).shell-extension.zip . -x '*.git*'
