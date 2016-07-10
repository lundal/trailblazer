var secAbilities = function() {
    var section = {};

    var sec = function() {
        return $('#abilities');
    }

    var render = function() {
        var html = '' +
            '<h2>Abilities</h2>' +
            '<div class="grid">' +
            '    <h3 class="left">Ability</h3>' +
            '    <h3>Score</h3>' +
            '    <h3>Mod.</h3>' +
            '    <h3>Temp<br>Score</h3>' +
            '    <h3>Temp<br>Mod.</h3>';
        for (var i = 0; i < character.abilities.length; i++) {
            html += '' +
            '    <input type="text" class="input textbox expand bottom-border-only ability-name" readonly>' +
            '    <span><input type="number" class="input numberbox editable ability-score-base" readonly></span>' +
            '    <span><input type="number" class="input numberbox highlight ability-mod-base" readonly></span>' +
            '    <span><input type="number" class="input numberbox editable ability-score-temp" readonly></span>' +
            '    <span><input type="number" class="input numberbox highlight ability-mod-temp" readonly></span>' +
            '    </select>';
        }
        html += '' +
            '</div>';
        sec().html(html);
    };

    var bind = function() {
        sec().find('.ability-score-base').each(function(i) {
            $(this).click(function() { svcBreakdown.open(character.abilities[i].base, character.abilities[i].name + ' Score', 'abilities'); });
        });
        sec().find('.ability-score-temp').each(function(i) {
            $(this).click(function() { svcBreakdown.open(character.abilities[i].temp, character.abilities[i].name + ' Temp', 'abilities'); });
        });
    }

    var refresh = function() {
        sec().find('.ability-name').each(function(i) {
            $(this).val(character.abilities[i].name);
        });
        sec().find('.ability-score-base').each(function(i) {
            $(this).val(abilityScoreBase(character.abilities[i]));
            svcTooltip.set($(this).parent(), svcBreakdown.tooltip(character.abilities[i].base))
        });
        sec().find('.ability-mod-base').each(function(i) {
            $(this).val(abilityModifierBase(character.abilities[i]));
        });
        sec().find('.ability-score-temp').each(function(i) {
            $(this).val(abilityScoreTemp(character.abilities[i]));
            svcTooltip.set($(this).parent(), svcBreakdown.tooltip(character.abilities[i].temp))
        });
        sec().find('.ability-mod-temp').each(function(i) {
            $(this).val(abilityModifierTemp(character.abilities[i]));
        });
    };

    var abilityScoreBase = function(ability) {
        return svcBreakdown.total(ability.base);
    };

    var abilityModifierBase = function(ability) {
        return Math.floor(abilityScoreBase(ability) / 2) - 5;
    };

    var abilityScoreTemp = function(ability) {
        return svcBreakdown.total(ability.base) + svcBreakdown.total(ability.temp);
    };

    var abilityModifierTemp = function(ability) {
        return Math.floor(abilityScoreTemp(ability) / 2) - 5;
    };

    section.modifierByName = function(abilityName) {
        if (abilityName.toLowerCase() == 'str') return abilityModifierTemp(character.abilities[0]);
        if (abilityName.toLowerCase() == 'dex') return abilityModifierTemp(character.abilities[1]);
        if (abilityName.toLowerCase() == 'con') return abilityModifierTemp(character.abilities[2]);
        if (abilityName.toLowerCase() == 'int') return abilityModifierTemp(character.abilities[3]);
        if (abilityName.toLowerCase() == 'wis') return abilityModifierTemp(character.abilities[4]);
        if (abilityName.toLowerCase() == 'cha') return abilityModifierTemp(character.abilities[5]);
    };

    section.scoreByName = function(abilityName) {
        if (abilityName.toLowerCase() == 'str') return abilityScoreTemp(character.abilities[0]);
        if (abilityName.toLowerCase() == 'dex') return abilityScoreTemp(character.abilities[1]);
        if (abilityName.toLowerCase() == 'con') return abilityScoreTemp(character.abilities[2]);
        if (abilityName.toLowerCase() == 'int') return abilityScoreTemp(character.abilities[3]);
        if (abilityName.toLowerCase() == 'wis') return abilityScoreTemp(character.abilities[4]);
        if (abilityName.toLowerCase() == 'cha') return abilityScoreTemp(character.abilities[5]);
    };

    section.init = function() {
        render();
        bind();
        refresh();
        when('abilities', refresh);
    }

    return section;
}();
