// ==UserScript==
// @name         BV Roulette Autoroll
// @namespace    go
// @version      1.0
// @description  Autoroll roulette when scroll lock is toggled
// @author       CttCJim
// @match      https://bitvest.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var started = false;
    var TMbutton = document.querySelector('.roulette .spin.green');
    document.addEventListener('keyup', function (event) {
        if (event.defaultPrevented) {
            return;
        }

        var key = event.key || event.keyCode;

        if (key === 'ScrollLock' || key === 145) {
            //doWhateverYouWantNowThatYourKeyWasHit();
            started = !started;
        }
    });

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
