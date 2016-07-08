var secClasses= function() {
    var section = {};

    var sec = function() {
        return $('#classes');
    }

    var render = function() {
        var html = '' +
            '<h2>Classes</h2>' +
            '<div class="grid">' +
            '    <h3 tooltip="Favored Class">FC</h3>' +
            '    <h3 class="left">Class</h3>' +
            '    <h3>Level</h3>' +
            '    <h3 tooltip="Base Attack Bonus 2/4 = 10 at level 20 3/4 = 15 at level 20 4/4 = 20 at level 20">BAB</h3>' +
            '    <h3 tooltip="Hit Die">HD</h3>' +
            '    <h3 tooltip="Fortitude L = 6 at level 20 H = 12 at level 20">Fort.</h3>' +
            '    <h3 tooltip="Reflex L = 6 at level 20 H = 12 at level 20">Ref.</h3>' +
            '    <h3 tooltip="Will L = 6 at level 20 H = 12 at level 20">Will</h3>';
        for (var i = 0; i < character.classes.length; i++) {
            html += '' +
            '    <input type="checkbox" class="class-fav">' +
            '    <input type="text" class="input textbox expand bottom-border-only class-name">' +
            '    <input type="number" class="input numberbox class-level" required min="0" max="999" pattern="-?[0-9]+">' +
            '    <select class="input selectbox class-bab">' +
            '        <option value="2/4">2/4</option>' +
            '        <option value="3/4">3/4</option>' +
            '        <option value="4/4">4/4</option>' +
            '    </select>' +
            '    <select class="input selectbox class-hd">' +
            '        <option value="d6">D6</option>' +
            '        <option value="d8">D8</option>' +
            '        <option value="d10">D10</option>' +
            '        <option value="d12">D12</option>' +
            '    </select>' +
            '    <select class="input selectbox class-fort">' +
            '        <option value="L">L</option>' +
            '        <option value="H">H</option>' +
            '    </select>' +
            '    <select class="input selectbox class-ref">' +
            '        <option value="L">L</option>' +
            '        <option value="H">H</option>' +
            '    </select>' +
            '    <select class="input selectbox class-will">' +
            '        <option value="L">L</option>' +
            '        <option value="H">H</option>' +
            '    </select>';
        }
        html += '' +
            '    <span></span>' +
            '    <span><input type="text" class="input textbox expand bottom-border-only" readonly value="Total"></span>' +
            '    <span><input type="number" class="input numberbox highlight" id="class-level" readonly></span>' +
            '    <span><input type="number" class="input numberbox" id="class-bab" readonly></span>' +
            '    <span><input type="number" class="input numberbox" id="class-hp" readonly></span>' +
            '    <span><input type="number" class="input numberbox" id="class-fort" readonly></span>' +
            '    <span><input type="number" class="input numberbox" id="class-ref" readonly></span>' +
            '    <span><input type="number" class="input numberbox" id="class-will" readonly></span>' +
            '</div>';
        sec().html(html);
    };

    var bind = function() {
        sec().find('.class-fav').each(function(i) {
            bindValue($(this), character.classes[i], 'favored', 'classes');
        });
        sec().find('.class-name').each(function(i) {
            bindText($(this), character.classes[i], 'name', 'classes');
        });
        sec().find('.class-level').each(function(i) {
            bindNumber($(this), character.classes[i], 'level', 'classes');
        });
        sec().find('.class-bab').each(function(i) {
            bindValue($(this), character.classes[i], 'baseattackbonus', 'classes');
        });
        sec().find('.class-hd').each(function(i) {
            bindValue($(this), character.classes[i], 'hitdie', 'classes');
        });
        sec().find('.class-fort').each(function(i) {
            bindValue($(this), character.classes[i], 'fortitude', 'classes');
        });
        sec().find('.class-ref').each(function(i) {
            bindValue($(this), character.classes[i], 'reflex', 'classes');
        });
        sec().find('.class-will').each(function(i) {
            bindValue($(this), character.classes[i], 'will', 'classes');
        });
    }

    var refreshBound = function() {
        sec().find('.class-fav').each(function(i) {
            $(this).val(character.classes[i].favored);
        });
        sec().find('.class-name').each(function(i) {
            $(this).val(character.classes[i].name);
        });
        sec().find('.class-level').each(function(i) {
            $(this).val(character.classes[i].level);
        });
        sec().find('.class-bab').each(function(i) {
            $(this).val(character.classes[i].baseattackbonus);
        });
        sec().find('.class-hd').each(function(i) {
            $(this).val(character.classes[i].hitdie);
        });
        sec().find('.class-fort').each(function(i) {
            $(this).val(character.classes[i].fortitude);
        });
        sec().find('.class-ref').each(function(i) {
            $(this).val(character.classes[i].reflex);
        });
        sec().find('.class-will').each(function(i) {
            $(this).val(character.classes[i].will);
        });
    };

    var refreshCalculated = function() {
        sec().find('#class-level').val(section.level());
        sec().find('#class-bab').val(section.baseAttackBonus());
        sec().find('#class-hp').val(section.hitPoints());
        sec().find('#class-fort').val(section.fortitude());
        sec().find('#class-ref').val(section.reflex());
        sec().find('#class-will').val(section.will());
        svcTooltip.set(sec().find('#class-level').parent(), section.levelTooltip());
        svcTooltip.set(sec().find('#class-bab').parent(), section.baseAttackBonusTooltip());
        svcTooltip.set(sec().find('#class-hp').parent(), section.hitPointsTooltip());
        svcTooltip.set(sec().find('#class-fort').parent(), section.fortitudeTooltip());
        svcTooltip.set(sec().find('#class-ref').parent(), section.reflexTooltip());
        svcTooltip.set(sec().find('#class-will').parent(), section.willTooltip());
    }

    section.level = function() {
        var classes = character.classes;
        var level = 0;
        for (var i = 0; i < classes.length; i++) {
            level += classes[i].level;
        }
        return level;
    };

    section.levelTooltip = function() {
        var classes = character.classes;
        var tooltip = '';
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].level == 0) {
                continue;
            }
            tooltip += classes[i].name + ": " + classes[i].level + " ";
        }
        return tooltip;
    };

    section.baseAttackBonus = function() {
        var classes = character.classes;
        var bab = 0;
        for (var i = 0; i < classes.length; i++) {
            var quarts = parseInt(classes[i].baseattackbonus); // Parses only the first number
            bab += Math.floor(classes[i].level * quarts / 4);
        }
        return bab;
    };

    section.baseAttackBonusTooltip = function() {
        var classes = character.classes;
        var tooltip = '';
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].level == 0) {
                continue;
            }
            tooltip += classes[i].name + ": " + classes[i].baseattackbonus + " ";
        }
        return tooltip;
    };

    var calcHitPoints = function(clas, first) {
        var die = parseInt(clas.hitdie.substring(1)); // Parses the number
        if (clas.level == 0) {
            return 0;
        }
        // Average hit die for each level
        var hp = clas.level * (die / 2 + 1);
        // Full hit die for first level of first class
        if (first) {
            hp += (die / 2 - 1);
        }
        return hp;
    };

    section.hitPoints = function() {
        var classes = character.classes;
        var hp = 0;
        for (var i = 0; i < classes.length; i++) {
            hp += calcHitPoints(classes[i], i == 0);
        }
        return hp;
    };

    section.hitPointsTooltip = function() {
        var classes = character.classes;
        var tooltip = '';
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].level == 0) {
                continue;
            }
            tooltip += classes[i].name + ": " + calcHitPoints(classes[i], i == 0) + " ";
        }
        return tooltip;
    };

    var calcSkill = function(clas, skill) {
        if (clas[skill] === 'H' && clas.level > 0) {
            return 2 + Math.floor(clas.level / 2);
        } else {
            return Math.floor(clas.level / 3);
        }
    };

    section.fortitude = function() {
        var classes = character.classes;
        var fort = 0;
        for (var i = 0; i < classes.length; i++) {
            fort += calcSkill(classes[i], 'fortitude');
        }
        return fort;
    };

    section.fortitudeTooltip = function() {
        var classes = character.classes;
        var tooltip = '';
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].level == 0) {
                continue;
            }
            tooltip += classes[i].name + ": " + calcSkill(classes[i], 'fortitude') + " ";
        }
        return tooltip;
    };

    section.reflex = function() {
        var classes = character.classes;
        var ref = 0;
        for (var i = 0; i < classes.length; i++) {
            ref += calcSkill(classes[i], 'reflex');
        }
        return ref;
    };

    section.reflexTooltip = function() {
        var classes = character.classes;
        var tooltip = '';
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].level == 0) {
                continue;
            }
            tooltip += classes[i].name + ": " + calcSkill(classes[i], 'reflex') + " ";
        }
        return tooltip;
    };

    section.will = function() {
        var classes = character.classes;
        var will = 0;
        for (var i = 0; i < classes.length; i++) {
            will += calcSkill(classes[i], 'will');
        }
        return will;
    };

    section.willTooltip = function() {
        var classes = character.classes;
        var tooltip = '';
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].level == 0) {
                continue;
            }
            tooltip += classes[i].name + ": " + calcSkill(classes[i], 'will') + " ";
        }
        return tooltip;
    };

    section.init = function() {
        render();
        bind();
        refreshBound();
        refreshCalculated();
        when('classes', function() { refreshCalculated(); });
    }

    return section;
}();
