var bindValue = function(element, object, property, event) {
    element.on('change', function() {
        object[property] = element.val();
        if (event) {
            trigger(event);
        }
    });
};

var bindText = function(element, object, property, event) {
    element.on('input', function() {
        object[property] = element.val();
        if (event) {
            trigger(event);
        }
    });
};

var bindNumber = function(element, object, property, event) {
    element.on('input', function() {
        var value = parseInt(element.val(), 10);
        if (element.is(":invalid")) {
            value = NaN;
        }
        object[property] = value;
        if (event) {
            trigger(event);
        }
    });
};

var trigger = function(event) {
    $('body').trigger(event);
};

var when = function(event, action) {
    $('body').on(event, action);
};
