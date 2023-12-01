// ==UserScript==
// @name         BV Roulette Autoroll
// @namespace    go
// @version      1.1
// @description  Autoroll roulette when button is toggled
// @author       CttCJim
// @match      https://bitvest.io/*
// @grant        none

// ==/UserScript==

(function() {
    'use strict';
    var started = false;
    var TMbutton = document.querySelector('.roulette .spin.green');
    //add button to page
    var newButton = document.createElement('button');
    newButton.id = "CttCJim_roulbet";
    //newButton.style.color="
    newButton.textContent = 'Start Autobet';
    $(newButton).addClass('green');
    $(newButton).click(toggleRoulBet);
    $(".game.roulette").append(newButton);
    function toggleRoulBet() {
        started = !started;
        if(started) {
            $("#CttCJim_roulbet").removeClass('green');
            $("#CttCJim_roulbet").addClass('red');
            $("#CttCJim_roulbet")[0].textContent="Stop Autobet";
        }else{
            $("#CttCJim_roulbet").addClass('green');
            $("#CttCJim_roulbet").removeClass('red');
            $("#CttCJim_roulbet")[0].textContent="Start Autobet";
        }
    }
    /*
    document.addEventListener('keyup', function (event) {
        if (event.defaultPrevented) {
            return;
        }

        var key = event.key || event.keyCode;

        if (key === 'ScrollLock' || key === 145) {
            //doWhateverYouWantNowThatYourKeyWasHit();
            started = !started;
        }
    });*/

    setInterval(
        function(){
            if(typeof(document.getElementsByClassName("spin button green")) !== "undefined")
               {
                   if(started) {
                       //console.log("Roulette Button Defined");
                       //document.getElementsByClassName("spin button green").click();
                       TMbutton.click();
                   }
               }
        }
        ,200); // 0.2 seconds between clicks

})();
