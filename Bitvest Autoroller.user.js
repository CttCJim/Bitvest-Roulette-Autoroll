// ==UserScript==
// @name         BV Roulette Autoroll
// @namespace    go
// @version      2.0
// @description  Autoroll roulette when button is toggled
// @author       CttCJim
// @match      https://bitvest.io/*
// @grant        none

// ==/UserScript==

(function() {
    'use strict';
    var started = false;
    var TMbutton = document.querySelector('.roulette .spin.green');
    //add controls to page
    var html = `
    <style>
    .CttCJim_input {
    min-height:25px;
    min-width:100px;max-width:150px;
    font-size:16px!important;
    }
    </style>
    <button id = "CttCJim_roulbet" class="green" style="width:200px">Start Autobet</button>
    <input id="CttCJim_roulbetsTarget" class="show-arrows game_multiplier CttCJim_input" type="number" min="0" step="1" placeholder="Number of Bets" >
    <span id="CttCJim_roulbetsMade" style="font-size: 20px;color: white;">0</span>
    `;
    var newdiv = document.createElement('div');
    //$(newdiv).addClass("ui");
    newdiv.innerHTML = html;
    $(newdiv).css('fontSize','13px!important');
    $(".roulette .ui").css('height','323px');
    $(".roulette .ui .buttons").append(newdiv);

    function roulJim_dobet() {
        var goagain=true;
        if($(".roulette .bet-history").html()==window.roulJim_beforebet) { //waiting for bet to change
            //console.log("wait for bet to finish");
            document.querySelector('.roulette .spin.green').click(); //for race issues
        } else { //bet complete (or initialized)
            if(window.roulJim_go==false) {
                console.log("stopping interval for roulJim_go: " +window.roulJim_go);
                goagain=false;
                roulJim_stopbets(); //to reset the displays
            } else {
                //keep going
                console.log("Making a bet...");
                window.roulJim_beforebet = $(".roulette .bet-history").html();
                document.querySelector('.roulette .spin.green').click();
                //increment counter
                window.roulJim_count++;
                $("#CttCJim_roulbetsMade").html(window.roulJim_count);
                var betsToMake = $("#CttCJim_roulbetsTarget").val();
                if(!isNaN(betsToMake)) {
                    if((window.roulJim_count>=betsToMake)&&(betsToMake>0)) {goagain=false;}
                }
            }
        }
        if(goagain) {
            setTimeout(roulJim_dobet,200);
        } else {
            roulJim_stopbets(); //to reset the displays
        }
    }
    async function roulJim_startbets() {
        //initialize
        window.roulJim_go = true;
        var TMbutton = document.querySelector('.roulette .spin.green');
        $("#CttCJim_roulbetsMade").html('0');
        $("#CttCJim_roulbet").removeClass('green');
        $("#CttCJim_roulbet").addClass('red');
        $("#CttCJim_roulbet")[0].textContent="Stop Autobet";
        $("#CttCJim_roulbet").click(roulJim_stopbets);
        window.roulJim_count = 0;
        //start history monitor
        window.roulJim_beforebet = null;
        roulJim_dobet();
        /*window.roulBetCycle = setInterval(()=>{
            console.log("cycle start");
            if($(".roulette .bet-history").html()==window.roulJim_beforebet) { //waiting for bet to change
                console.log("wait for bet to finish");
            } else { //bet complete (or initialized)
                if(window.roulJim_go==false) {
                    console.log("stopping interval for roulJim_go" +window.roulJim_go);
                    clearInterval(window.roulBetCycle);
                    roulJim_stopbets(); //to reset the displays
                } else {
                    //keep going
                    console.log("Making a bet...");
                    window.roulJim_beforebet = $(".roulette .bet-history").html();
                    TMbutton.click();
                    //increment counter
                    window.roulJim_count++;
                    $("#CttCJim_roulbetsMade").html(window.roulJim_count);
                    var betsToMake = $("#CttCJim_roulbetsTarget").val();
                    if(!isNaN(betsToMake)) {
                        if((betsToMake==window.roulJim_count)&&(betsToMake>0)) {window.roulJim_go=false;}
                    }
                }
            }
        },200);*/
    }
    $("#CttCJim_roulbet").click(roulJim_startbets);
    function roulJim_stopbets() {
        window.roulJim_go=false;
        $("#CttCJim_roulbet").addClass('green');
        $("#CttCJim_roulbet").removeClass('red');
        $("#CttCJim_roulbet")[0].textContent="Start Autobet";
        $("#CttCJim_roulbet").click(roulJim_startbets);
    }


})();
