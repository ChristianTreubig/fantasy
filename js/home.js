var _throttleTimer = null;
var _throttleDelay = 50;
var $window = $(window);

$(document).ready(function() {
    if (isScrolledIntoView("#football")) {
            slideLinks();
    }
    
    $window
        .off('scroll', ScrollHandler)
        .on('scroll', ScrollHandler);
});

function slideLinks() {
    var DELAY = 200;
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
}

function isScrolledIntoView(elem)
{
    var $elem = $(elem);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function ScrollHandler(e) {
    clearTimeout(_throttleTimer);
    _throttleTimer = setTimeout(function () {
        
        if (isScrolledIntoView("#football")) {
            slideLinks();
        }
        
    }, _throttleDelay);
}