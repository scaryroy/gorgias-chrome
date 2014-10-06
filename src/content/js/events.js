/*
 PubSub events
 */

PubSub.subscribe('focus', function (action, element, gmailView) {
    if ($(element).hasClass('qt-dropdown-search')) {
        return; // ignore search input
    }

    if (action === 'on') {
        App.data.inCompose = true;
        App.data.composeElement = element;
        App.data.gmailView = gmailView;
    } else if (action === 'off') {
        App.data.inCompose = false;
        App.data.composeElement = null;
        App.data.gmailView = '';
    }
});

/*
 Events handling
 */

App.onFocus = function (e) {
    var target = e.target;

    // Disable any focus as there may be only one focus on a page
    // PubSub.publish('focus', 'off', target);

    // Check if it is the compose element
    if (target.type === 'textarea' && target.getAttribute('name') === 'body') {
        PubSub.publish('focus', 'on', target, 'basic html');
    } else if (target.classList.contains('editable') && target.getAttribute('contenteditable')) {
        PubSub.publish('focus', 'on', target, 'standard');
    }
};

App.onBlur = function (e) {
    PubSub.publish('focus', 'off', e.relatedTarget);
};

App.onScroll = function (e) {
    App.autocomplete.dialog.close();
};
