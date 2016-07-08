var svcTooltip = function() {
    var service = {};

    service.set = function(element, text) {
        if (text != '') {
            element.attr('tooltip', text);
        } else {
            element.removeAttr('tooltip');
        }
    };

    return service;
}();
