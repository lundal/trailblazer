// Active character
var character;

$(document).ready(function() {
    console.log('Document ready');

    // Gridtest
    if (localStorage.getItem('grid-warning-dismissed') != 'true') {
        $('#gridtest').removeClass('hidden');
        $('#gridtest button').click(function() {
            localStorage.setItem('grid-warning-dismissed', 'true');
            location.reload();
        });
        return;
    }

    console.log('Grid test passed');

    character = svcCharacter.create();

    // Init services
    svcFeat.init();
    svcSpell.init();
    svcTrait.init();
    svcLanguage.init();
    svcModal.init();

    // Init sections
    secBasics.init();
    secClasses.init();
    secAbilities.init();
    secQuickNav.init();

    // Show stuff
    $('#sheet').removeClass('hidden');

});
