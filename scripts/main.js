/**
 * Icons were shamelessly stolen from the module 'DF Settings Clarity'
 * This module was created to replace it for v10 of Foundry VTT
 * Compatybily with v13
 * https://github.com/flamewave000/dragonflagon-fvtt/tree/master/df-settings-clarity
 */

import { capitalize } from './utils/string.js'

Hooks.on('renderSettingsConfig', onRenderSettingsConfig)

/**
 * @param {SettingsConfig} _settings
 * @param {JQuery} html
 */
function onRenderSettingsConfig(_settings, htmlElement) {
    const html = $(htmlElement);

    html.find('.form-group').each((_, group) => {
        const $group = $(group);

        const input = $group.find('input[name], select[name], textarea[name]').first();
        const button = $group.find('button[data-key]').first();

        if (input.length) {
            const id = input.attr('name');
            const setting = game.settings.settings.get(id);
            if (setting) {
                const name = game.i18n.localize(setting.name);
                const scope = setting.scope ?? 'client';
                addScopeIcon($group, scope);
            }
        } else if (button.length) {
            const key = button.data('key');
            const menu = game.settings.menus.get(key);
            if (menu) {
                const name = game.i18n.localize(menu.name);
                const scope = menu.restricted ? 'world' : 'client';
                addScopeIcon($group, scope);
            }
        }
    });
}

/**
 * @param {JQuery} group - .form-group
 * @param {'client' | 'world'} scope
 */
function addScopeIcon(group, scope) {
    const icon = scope === 'world' ? '🌎' : '👤';
    const label = group.find('label').first();

    if (label.length && !label.find('span[title]').length) {
        label.prepend(`<span title="${capitalize(scope)}">${icon}</span> `);
    }
}
