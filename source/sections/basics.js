var secBasics = function() {
    var section = {};

    var sec = function() {
        return $('#basics');
    }

    var render = function() {
        sec().html('' +
        '<h2>Basics</h2>' +
        '<div class="grid">' +
        '    <div id="portrait">' +
        '        Click to set portrait...' +
        '        <div class="image clickable"></div>' +
        '    </div>' +
        '    <h3>Name</h3>' +
        '    <input type="text" class="input textbox expand bottom-border-only" id="character-name">' +
        '    <h3>Race</h3>' +
        '    <input type="text" class="input textbox expand bottom-border-only" id="character-race">' +
        '    <h3>Size</h3>' +
        '    <select class="input selectbox expand bottom-border-only" id="character-size">' +
        '        <option value="Colossal">Colossal</option>' +
        '        <option value="Gargantuan">Gargantuan</option>' +
        '        <option value="Huge">Huge</option>' +
        '        <option value="Large">Large</option>' +
        '        <option value="Medium">Medium</option>' +
        '        <option value="Small">Small</option>' +
        '        <option value="Tiny">Tiny</option>' +
        '        <option value="Diminutive">Diminutive</option>' +
        '        <option value="Fine">Fine</option>' +
        '    </select>' +
        '    <h3 tooltip="Alignment">Align.</h3>' +
        '    <select class="input selectbox expand bottom-border-only" id="character-alignment">' +
        '        <option value="LG">Lawful Good</option>' +
        '        <option value="NG">Neutral Good</option>' +
        '        <option value="CG">Chaotic Good</option>' +
        '        <option value="LN">Lawful Neutral</option>' +
        '        <option value="N">Neutral</option>' +
        '        <option value="CN">Chaotic Neutral</option>' +
        '        <option value="LE">Lawful Evil</option>' +
        '        <option value="NE">Neutral Evil</option>' +
        '        <option value="CE">Chaotic Evil</option>' +
        '    </select>' +
        '    <h3 tooltip="Campaign">Camp.</h3>' +
        '    <input type="text" class="input textbox expand bottom-border-only" id="character-campaign">' +
        '    <h3>Player</h3>' +
        '    <input type="text" class="input textbox expand bottom-border-only" id="character-player">' +
        '</div>' +
        '');
    };

    var bind = function() {
        bindText(sec().find('#character-name'), character.basic, 'name', 'basics');
        bindText(sec().find('#character-race'), character.basic, 'race', 'basics');
        bindValue(sec().find('#character-size'), character.basic, 'size', 'basics');
        bindValue(sec().find('#character-alignment'), character.basic, 'alignment', 'basics');
        bindText(sec().find('#character-campaign'), character.basic, 'campaign', 'basics');
        bindText(sec().find('#character-player'), character.basic, 'player', 'basics');
    }

    var refresh = function() {
        sec().find('#character-name').val(character.basic.name);
        sec().find('#character-race').val(character.basic.race);
        sec().find('#character-size').val(character.basic.size);
        sec().find('#character-alignment').val(character.basic.alignment);
        sec().find('#character-campaign').val(character.basic.campaign);
        sec().find('#character-player').val(character.basic.player);
    };

    var refreshPortrait = function() {
        sec().find('#portrait .image').css('background-image', 'url("' + character.basic.portrait + '")');
    };

    var openPortrait = function() {
        // Render
        var html = '' +
        '<h2>Portrait</h2>' +
        '<div class="grid">' +
        '    <h3>URL</h3>' +
        '    <input type="text" class="input textbox expand" id="character-portrait-url">' +
        '</div>';
        svcModal.show(html);
        // Bìnd
        bindText(svcModal.find('#character-portrait-url'), character.basic, 'portrait', 'basics');
        // Refresh
        svcModal.find('#character-portrait-url').val(character.basic.portrait);
    };

    section.init = function() {
        render();
        bind();
        refresh();
        refreshPortrait();

        sec().find('#portrait').click(openPortrait);
        when('basics', refreshPortrait);
    }

    return section;
}();
