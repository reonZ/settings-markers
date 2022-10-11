/**
 * Icons were shamelessly stolen from the module 'DF Settings Clarity'
 * This module was created to replace it for v10 of Foundry VTT
 * https://github.com/flamewave000/dragonflagon-fvtt/tree/master/df-settings-clarity
 */

import { capitalize } from './utils/string.js'

Hooks.on('renderSettingsConfig', onRenderSettingsConfig)

/**
 * @param {SettingsConfig} _settings
 * @param {JQuery} html
 * @param {SettingsConfigData} data
 */
function onRenderSettingsConfig(_settings, html, data) {
    for (const category of data.categories) {
        const section = html.find(`section.category[data-category="${category.id}"]`)
        for (const setting of category.settings) setGroupName(setting.name, setting.scope ?? 'client', section, false)
        for (const menu of category.menus) setGroupName(menu.name, menu.restricted ? 'world' : 'client', section, true)
    }
}

/**
 * @param {string} name
 * @param {'client' | 'world'} scope
 * @param {JQuery} section
 * @param {boolean} isSubmenu
 */
function setGroupName(name, scope, section, isSubmenu) {
    name = game.i18n.localize(name)
    const icon = scope === 'world' ? '🌎' : '👤'
    const subQuery = isSubmenu ? '.submenu' : ':not(.submenu)'
    const label = section.find(`.form-group${subQuery} > label:contains("${name}")`)
    label.html(`<span title="${capitalize(scope)}">${icon}</span> ${name}`)
}
