$(document).ready(function () {

    // Variable Declarations
    var letterArr; // This will contain the alphabet
    var word; // Word to guess
    var guess; // Gamers Guess
    var guesses = []; // stored guess to remember which letter already been selected
    var lives; // determines the remaining lives of the gamer
    var counter; // Count correct guesses

    // Add alphabet to lettersArr
    letterArr = new Array(26).fill(1).map((_, i) => String.fromCharCode(65 + i));
    word = ["dog", "cat", "rabbit", "horse", "snake"];

    // Get DOMs
    var

    // add letters to a buttons
    for (var i = 0; i < letterArr.length; i++) {
        var letterBtn = $("<button>");

        letterBtn.attr("class", "btn btn-dark m-1 mt-3");
        letterBtn.attr("data-letter", letterArr[i]);
        letterBtn.text(letterArr[i]);
        letterBtn.appendTo("#letterBtn");
    }

    // https://codepen.io/cathydutton/pen/ldazc?editors=1010

});