keyboardOverideActive = false;

$(document).ready(function() {
    $(document).on("keydown", function (e) {
        if(!keyboardOverideActive) return;
        e.preventDefault();
    });    
    $(document).on("keyup", function (e) {
        if(!keyboardOverideActive) return;
        e.preventDefault();
        console.log(e.which);
    });
});

/*
set bet
set game

increase bet amount
decrease bet amount
increase bet percent
decrease bet percent

roll hi
roll lo

tip
*/ 