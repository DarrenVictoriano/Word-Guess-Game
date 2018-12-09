$(document).ready(function () {

    // Variable Declarations
    var letterArr; // This will contain the alphabet
    var wordList = [];
    var theWord;
    var theWordCopy;
    var guess; // Gamers Guess
    var guesses = []; // stored guess to remember which letter already been selected
    var lives = 10; // determines the remaining lives of the gamer
    var counter = 0; // Count correct guesses



    function initializeLetters() {
        // Add alphabet to lettersArr
        letterArr = new Array(26).fill(1).map((_, i) => String.fromCharCode(65 + i));

        // add letters to a buttons
        for (var i = 0; i < letterArr.length; i++) {
            var letterBtn = $("<button>");

            letterBtn.attr("class", "btn btn-dark m-1 mt-3 letter");
            letterBtn.attr("data-letter", letterArr[i]);
            letterBtn.text(letterArr[i]);
            letterBtn.appendTo("#letterBtn");
        }
    }

    function disableTheLetters(letter) {
        letter.removeClass("btn-dark");
        letter.addClass("btn-danger");
        letter.attr("disabled", "disabled");
    }

    function getRandomWord() {
        wordList = ["dog", "cat", "rabbit", "horse", "mice", "cow", "snake"];
        var x = Math.floor((Math.random() * wordList.length));
        return wordList[x].toUpperCase();
    }

    function showTheWord() {
        theWord = getRandomWord().split('');
        theWordCopy = theWord.slice();

        for (var i = 0; i < theWord.length; i++) {
            $("#letterHolder").append($("<span class='px-2 theWord' data-letter=" + theWord[i] + ">_</span>"));
        }

    }

    function guessTheWordClick() {
        //get the click
        var theClick = $(this).attr("data-letter");

        // test if click is correct
        for (var i = 0; i < theWord.length; i++) {
            if (theWord[i] == theClick) {
                $("span[data-letter=" + theClick + "]").text(theClick);
            }
        }
        // count each click against players life and show it
        endGame();

        // disable button after clicking
        disableTheLetters($(this));
    }

    function guessTheWordPress(event) {
        var alphaOnly = /^[a-zA-Z]$/;
        var thePress = event.key.toUpperCase();
        var thePressData = $("button[data-letter=" + thePress + "]");

        // Only listen for an alpha keys
        if (!alphaOnly.test(thePress)) {
            return;
        }

        for (var i = 0; i < theWord.length; i++) {
            if (theWord[i] === thePress) {
                $("span[data-letter=" + thePress + "]").text(thePress);
                if (thePressData.attr("disabled") != "disabled") {
                    counter += 1;
                }
            }
        }

        // subtract 1 life per key press
        if (thePressData.attr("disabled") != "disabled") {
            endGame();
        }

        console.log(counter);
        // disable button after pressing
        disableTheLetters(thePressData);
    }

    function endGame() {
        // make array into string
        var makeTheWord = theWord.join("");

        // life counter
        lives -= 1;
        $("#lives").text(lives);

        // game over if life < 0
        if (lives <= 0) {
            $("#gameStatus").text("Game Over");
            $('<p>The word is \"' + makeTheWord + '\", you stupid!</p >').appendTo("#endGame");
            disableTheLetters($(".letter"));
        }

        // win if you get all letters
        if (counter == theWord.length) {
            $("#gameStatus").text("Well played!");
            disableTheLetters($(".letter"));
        }

    }

    // Start game
    initializeLetters()
    showTheWord();
    $(".letter").on("click", guessTheWordClick);
    $(document).keypress(guessTheWordPress);











});