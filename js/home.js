$(window).load(function() {
    var DELAY = 1000;
    var ANIMATION_LENGTH = 500;
    $("#football").delay(DELAY).animate({
        right: '50%'
    }, ANIMATION_LENGTH);
    $("#basketball").delay(DELAY + 200).animate({
        left: '50%'
    }, ANIMATION_LENGTH);
    $("#baseball").delay(DELAY + 400).animate({
        right: '50%'
    }, ANIMATION_LENGTH);
    $("#skating").delay(DELAY + 600).animate({
        left: '50%'
    }, ANIMATION_LENGTH);
});