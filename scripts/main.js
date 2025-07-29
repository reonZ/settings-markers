/**
 * Icons were shamelessly stolen from the module 'DF Settings Clarity'
 * This module was created to replace it for v10 of Foundry VTT
 * https://github.com/flamewave000/dragonflagon-fvtt/tree/master/df-settings-clarity
 */

Hooks.on("renderSettingsConfig", onRenderSettingsConfig);

function onRenderSettingsConfig(app, html, options) {
    for (const category of Object.values(options.categories)) {
        const tab = html.querySelector(
            `[data-application-part="main"] [data-group="categories"][data-tab="${category.id}"]`
        );

        for (const entry of category.entries) {
            const setting = entry.menu
                ? game.settings.menus.get(entry.key)
                : game.settings.settings.get(entry.field.name);

            if (!setting) continue;

            const scope =
                "scope" in setting ? setting.scope : setting.restricted ? "world" : "user";

            const input = entry.menu
                ? tab.querySelector(`[data-key="${entry.key}"]`)
                : tab.querySelector(`[name="${entry.field.name}"]`);

            const group = input.closest(".form-group");
            const label = group.querySelector(":scope > label");

            const icon = document.createElement("span");

            icon.dataset.tooltip = scope.capitalize();
            icon.dataset.tooltipDirection = "UP";
            icon.innerHTML = scope === "world" ? "🌎 " : "👤 ";

            label?.prepend(icon);
        }
    }
}
