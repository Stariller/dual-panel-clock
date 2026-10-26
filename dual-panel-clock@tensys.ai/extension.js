'use strict';

import Clutter from 'gi://Clutter';
import Gio from 'gi://Gio';
import GnomeDesktop from 'gi://GnomeDesktop';
import GObject from 'gi://GObject';
import St from 'gi://St';

import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';

const INTERFACE_SCHEMA = 'org.gnome.desktop.interface';

const UtcClockButton = GObject.registerClass(
class UtcClockButton extends PanelMenu.Button {
    _init() {
        super._init(0.5, 'UTC Clock', false);

        this._label = new St.Label({
            style_class: 'clock dual-panel-clock-label',
            y_align: Clutter.ActorAlign.CENTER,
        });
        this.add_child(this._label);

        this.menu.actor.hide();
        this.reactive = false;
        this.track_hover = false;
        this.style_class = 'clock-display dual-panel-clock';
    }

    setText(text) {
        this._label.set_text(text);
    }
});

export default class DualPanelClockExtension extends Extension {
    enable() {
        this._iface = new Gio.Settings({schema_id: INTERFACE_SCHEMA});
        this._ifaceSignal = this._iface.connect('changed', () => this._update());

        this._wallClock = new GnomeDesktop.WallClock();
        this._clockSignal = this._wallClock.connect('notify::clock', () => this._update());

        this._button = new UtcClockButton();
        // Sit immediately left of the system date menu so local stays unchanged.
        Main.panel.addToStatusArea(this.uuid, this._button, 0, 'center');
        this._update();
    }

    disable() {
        if (this._clockSignal) {
            this._wallClock.disconnect(this._clockSignal);
            this._clockSignal = null;
        }
        this._wallClock = null;

        if (this._ifaceSignal) {
            this._iface.disconnect(this._ifaceSignal);
            this._ifaceSignal = null;
        }
        this._iface = null;

        this._button?.destroy();
        this._button = null;
    }

    _formatParams() {
        const params = {
            timeZone: 'UTC',
            hour: '2-digit',
            minute: '2-digit',
            hour12: this._iface.get_string('clock-format') === '12h',
        };

        if (this._iface.get_boolean('clock-show-seconds'))
            params.second = '2-digit';

        if (this._iface.get_boolean('clock-show-date')) {
            params.month = 'short';
            params.day = 'numeric';
            if (this._iface.get_boolean('clock-show-weekday'))
                params.weekday = 'short';
        }

        return params;
    }

    _update() {
        if (!this._button || !this._iface)
            return;

        const now = new Date();
        const formatted = new Intl.DateTimeFormat(undefined, this._formatParams()).format(now);
        this._button.setText(`${formatted} UTC`);
    }
}
