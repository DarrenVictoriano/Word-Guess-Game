$(document).ready(function () {

    // Variable Declarations
    var letterArr; // This will contain the alphabet
    var wordList = [];
    var theWord;
    var guess; // Gamers Guess
    var guesses = []; // stored guess to remember which letter already been selected
    var lives = 10; // determines the remaining lives of the gamer
    var counter; // Count correct guesses



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

    function getRandomWord() {
        wordList = ["dog", "cat", "rabbit", "horse", "snake"];
        var x = Math.floor((Math.random() * wordList.length));
        return wordList[x].toUpperCase();
    }

    function showTheWord() {
        theWord = getRandomWord().split('');

        for (var i = 0; i < theWord.length; i++) {
            $("#letterHolder").append($("<span class='px-2 theWord' data-letter=" + theWord[i] + ">_</span>"));
        }

    }

    function guessTheWord() {
        lives -= 1;
        $("#lives").text(lives);
        var theClick = $(this).attr("data-letter");

        for (var i = 0; i < theWord.length; i++) {
            if (theWord[i] == $(this).attr("data-letter")) {
                $("span[data-letter=" + theClick + "]").text(theClick);
            }
        }

    }

    // Start game
    initializeLetters()
    showTheWord();
    $(".letter").on("click", guessTheWord);








});