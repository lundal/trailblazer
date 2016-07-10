$(document).ready(function() {
    console.log('Ready!');

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

    setTitle();
});

var character;
