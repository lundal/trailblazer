var svcBreakdown = function() {
    var service = {};

    var render = function(breakdown, title) {
        var html = '' +
            '<h2>' + title + '</h2>' +
            '<div class="grid" id="breakdown">' +
            '    <h3 class="left">Description</h3>' +
            '    <h3>Bonus</h3>' +
            '    <h3 tooltip="Delete">Del</h3>';
        for (var i = 0; i < breakdown.length; i++) {
            html += '' +
            '    <input type="text" class="input textbox expand breakdown-desc">' +
            '    <input type="number" class="input numberbox breakdown-bonus" required min="-99" max="999" pattern="-?[0-9]+">' +
            '    <button type="button" class="btn btn-default button-square breakdown-del">' +
            '        <i class="glyphicon glyphicon-remove icon-bad"></i>' +
            '    </button>' ;
        }
        html += '' +
            '    <button type="button" class="btn btn-default button-square" id="breakdown-add">' +
            '        <i class="glyphicon glyphicon-plus icon-good"></i>' +
            '    </button>' +
            '</div>';
        svcModal.show(html);
    };

    var bind = function(breakdown, title, event) {
        svcModal.find('.breakdown-desc').each(function(i) {
            bindText($(this), breakdown[i], 'desc', event);
        });
        svcModal.find('.breakdown-bonus').each(function(i) {
            bindNumber($(this), breakdown[i], 'bonus', event);
        });
        svcModal.find('.breakdown-del').each(function(i) {
            $(this).click(function() {
                var click = svcClick.click(breakdown[i], function() { refresh(breakdown); });
                if (click == svcClick.doubleClick) {
                    breakdown.splice(i, 1);
                    if (breakdown.length < 1) {
                        breakdown.push({bonus:0, desc:''});
                    }
                    trigger(event);
                    service.open(breakdown, title, event);
                } else {
                    refresh(breakdown);
                }
            });
        });
        svcModal.find('#breakdown-add').click(function() {
            breakdown.push({bonus:0, desc:''});
            service.open(breakdown, title, event);
        });
    };

    var refresh = function(breakdown) {
        svcModal.find('.breakdown-desc').each(function(i) {
            $(this).val(breakdown[i].desc);
        });
        svcModal.find('.breakdown-bonus').each(function(i) {
            $(this).val(breakdown[i].bonus);
        });
        svcModal.find('.breakdown-del').each(function(i) {
            if (svcClick.wasRecentlyClicked(breakdown[i])) {
                $(this).addClass('button-recently-clicked');
            } else {
                $(this).removeClass('button-recently-clicked');
            }
        });

    };

    service.open = function(breakdown, title, event) {
        render(breakdown, title);
        bind(breakdown, title, event);
        refresh(breakdown);
    };

    service.total = function(breakdown) {
        var total = 0;
        for (var i = 0; i < breakdown.length; i++) {
            total += breakdown[i].bonus;
        }
        return total;
    };

    service.max = function(breakdown) {
        var max = -99;
        for (var i = 0; i < breakdown.length; i++) {
            if (breakdown[i].bonus > max) {
                max = breakdown[i].bonus;
            }
        }
        return max;
    };

    service.tooltip = function(breakdown) {
        var tooltip = '';
        for (var i = 0; i < breakdown.length; i++) {
            if (breakdown[i].bonus == 0) {
                continue;
            }
            tooltip += breakdown[i].desc + ': ' + breakdown[i].bonus + '\n';
        }
        return tooltip;
    };

    return service;
}();
