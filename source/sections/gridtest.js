var secQuickNav = function() {
    var section = {};

    var sec = function() {
        return $('#quicknav');
    }

    var render = function() {
        var html = '' +
            '<nav>' +
            '    <a id="nav-general"><i class="glyphicon glyphicon-th"></i><br>General</a>' +
            '    <a id="nav-combat"><i class="glyphicon glyphicon-screenshot"></i><br>Combat</a>' +
            '    <a id="nav-talents"><i class="glyphicon glyphicon-education"></i><br>Talents</a>' +
            '    <a id="nav-items"><i class="glyphicon glyphicon-briefcase"></i><br>Items</a>' +
            '    <a id="nav-magic"><i class="glyphicon glyphicon-fire"></i><br>Magic</a>' +
            '    <a id="nav-fluff"><i class="glyphicon glyphicon-heart"></i><br>Fluff</a>' +
            '</nav>';
        sec().html(html);
    };

    var bind = function() {
        sec().find('#nav-general').click(function(e) { scrollTo('general'); e.preventDefault(); });
        sec().find('#nav-combat').click(function(e) { scrollTo('combat'); e.preventDefault(); });
        sec().find('#nav-talents').click(function(e) { scrollTo('talents'); e.preventDefault(); });
        sec().find('#nav-items').click(function(e) { scrollTo('items'); e.preventDefault(); });
        sec().find('#nav-magic').click(function(e) { scrollTo('magic'); e.preventDefault(); });
        sec().find('#nav-fluff').click(function(e) { scrollTo('fluff'); e.preventDefault(); });
    }

    var scrollTo = function(id) {
        window.scrollTo(0, document.getElementById(id).offsetTop - 10);
    };

    section.init = function() {
        render();
        bind();
    }

    return section;
}();
