var svcModal = function() {
    var service = {};

    service.init = function() {
        $('#modal').on('click', service.hide).children().click(function(e){ e.stopPropagation(); });
    };

    service.show = function(html) {
        $('#modal-content').html(html);
        $('#modal').addClass('visible');
    };

    service.hide = function() {
        $('#modal').removeClass('visible');
    };

    service.find = function(selector) {
        return $('#modal').find(selector);
    };

    return service;
}();
