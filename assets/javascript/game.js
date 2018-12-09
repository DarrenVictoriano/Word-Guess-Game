$(document).ready(function () {

    // Variable Declarations
    var letterArr; // This will contain the alphabet button
    var wordList = []; // array of words
    var theWord; // word to guess later
    var lives = 10; // determines the remaining lives of the gamer
    var winCounter = 0; // Count correct guesses to determine the wins
    var score = 0; // score count
    var takeLife = true; // takes life only if you pressed a letter that is not in theWord

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

    // this takes a button argument then will disable it
    function disableTheLetters(letter) {
        letter.removeClass("btn-dark");
        letter.addClass("btn-danger");
        letter.attr("disabled", "disabled");
        letter.prop("disabled", true);
    }

    function enableTheLetters(letter) {
        letter.removeClass("btn-danger");
        letter.addClass("btn-dark");
        letter.attr("disabled", "enabled");
        letter.prop("disabled", false);
    }

    // this will return random word from the array
    function getRandomWord() {
        wordList = ["dog", "cat", "rabbit", "horse", "mice", "cow", "snake"];
        var x = Math.floor((Math.random() * wordList.length));
        return wordList[x].toUpperCase();
    }

    // this will show the work in the DOM
    function showTheWord() {
        // get random word then store it in the global var theWord
        theWord = getRandomWord().split(''); // make it into array

        // place underscore referencing the number of letters
        for (var i = 0; i < theWord.length; i++) {
            $("#letterHolder").append($("<span class='px-2 theWord' data-letter=" + theWord[i] + ">_</span>"));
        }
    }

    // This will go the the onclick listener later
    function guessTheWordClick() {
        //get the click
        var theClick = $(this).attr("data-letter");

        // loop thru all the letters in theWord
        for (var i = 0; i < theWord.length; i++) {

            // test if click is equal to the letter in the word
            if (theWord[i] === theClick) {

                // update the underscores if true
                $("span[data-letter=" + theClick + "]").text(theClick);
                winCounter += 1; // add 1 to winCounter if letters match
            } else {
                // the press is not in theWord then we can take a life
                takeLife = true;
            }
        }
        // call endGame function to determine the status of the game
        endGame();

        // disable button after clicking so it does not keep substracting from players life
        disableTheLetters($(this));
    }

    // same as above but this is for onKeyup event
    function guessTheWordPress(event) {
        var alphaOnly = /^[a-zA-Z]$/; // regular expressions for alphabets curtesy of Beau
        var thePress = event.key.toUpperCase(); // convert every keypress into uppercase to match the word so we can compare it later
        var thePressData = $("button[data-letter=" + thePress + "]"); // this will bind the keypress to the letter button on screen

        // Only listen for an alpha keys
        if (!alphaOnly.test(thePress)) {
            return;
        }

        // loop thru all the letters in theWord
        for (var i = 0; i < theWord.length; i++) {

            // test if keypress is equal to the letter in the word
            if (theWord[i] === thePress) {
                // not gonna take away life
                takeLife = false;

                // update underscores if true
                $("span[data-letter=" + thePress + "]").text(thePress);

                // if the button on screen is not disabled then add winCounter if its disabled then its already been pressed or clicked
                if (thePressData.attr("disabled") != "disabled") {
                    winCounter += 1;
                }
            }
        }

        // call endGame function to determine the status of the game
        if (thePressData.attr("disabled") != "disabled") {
            // this if is to prevent keypress of the same letter to call this more than once
            endGame();
        }

        // disable button after pressing to prevent multiple press/click of the same letter
        disableTheLetters(thePressData);
        console.log(takeLife);
    }

    function endGame() {
        // make array into string
        var makeTheWord = theWord.join("");

        // take life if takeLife variable is true
        if (takeLife == true) {
            lives -= 1;
        }

        // reset the flag back to true
        takeLife = true;

        // game over if life < 0
        if (lives <= 0) {
            $("#gameStatus").text("Game Over");
            $("#whatsTheWord").text("The word is " + makeTheWord);
            disableTheLetters($(".letter"));
        }

        // win if you get all letters
        if (winCounter == theWord.length) {
            $("#gameStatus").text("Well played!");
            score += 1;
            disableTheLetters($(".letter"));
        }

        // update score board
        $("#lives").text(lives);
        $("#scoreHolder").text(score);

    }

    function resetGUI() {
        $("#gameStatus").text("Life: ");
        $("<span id='lives'></span>").appendTo("#gameStatus");
        $("#scoreStatus").text("Score: ");
        $("<span id='scoreHolder'></span>").appendTo("#scoreStatus");
        $("#whatsTheWord").text("");
        $("#lives").text(lives);
        $("#scoreHolder").text(score);
    }

    function restartGame() {
        resetGUI();
        lives = 10; // reset life back to 10
        winCounter = 0; // reset winCounter
        $("#letterHolder").empty(); // clear the word
        enableTheLetters($(".letter")); // re-enable the buttons
        resetGUI();
        showTheWord(); // get new word
    }

    // Start game
    initializeLetters()
    showTheWord();
    $(".letter").on("click", guessTheWordClick);
    $("#play").on("click", restartGame);
    $(document).keypress(guessTheWordPress);


});