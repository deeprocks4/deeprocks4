// madroller bot engine for bit-exo.com
// original file for bitdice.me edited by vuiltje
// 04/28/2016

console.log('Loading wiebeb.github.io Engine');
var findit = ',';
var regf = new RegExp(findit, 'g');

var WaitingOnBetResult = false;
isTipAvailable = true;
isRainAvailable = true;
lastRainMessage = '';
houseEdge = 0.9;

function doFlipGame(){
    if(botCurrType == 1){
        botCurrType = 0;
    } else {
        botCurrType = 1;
    }
}

function setWinChance(winChance){
	var	temp = (100 - houseEdge)/winChance;
	$('#bot-multi').val(Number(temp).toFixed(2));
	$('#bot-multi').click();
}

function isMyBets(){
	return $('#bot-mybets').hasClass('active');
}

function setBet(betAmount){
	$('#bot-wager').val(Number(betAmount).toFixed(0));
	$('#bot-wager').click();
}

function rollHigh(){
	$('#bet-hi').trigger('click');
}

function rollLow(){
	$('#bet-lo').trigger('click');
}

function getBalance(){
	if (!!document.getElementById("bot-bal")) return parseFloat($('#bot-bal').children(':nth-child(1)').html().replace('Balance: ','').replace(',','')).toFixed(8);
	else return 0;
}

function checkForRolling(Amount,Game,GameType){
    if($('#bet-low').is(":disabled") || $('#bet-hi').is(":disabled")){
        setTimeout(function(){
            checkForRolling(Amount,Game,GameType);
        },10);
    } else {
       placeBet(Amount,Game,GameType); 
    }
}

function placeBet(Amount,Game,GameType){
    setBet(Amount);
    setWinChance(Game);
    WaitingOnBetResult = true;
	if (isMyBets() === false) {
		botRunning = false;
	} else {
		if(GameType == 0){
			rollLow();
		} else {
			rollHigh();
		}
	}
}

function getLastBetData(){
    var newBet = false;
	var betsRow = $('#bot-bets tbody').eq(0).children('tr:first');
	var betID = $(betsRow).children('td:first').text();
	botBalance = getBalance();
    botCurrBalance = botBalance;
    if(lastBetID != betID){
        newBet = true;
        // if(lastBetID == 0){
            // newBet = false;    
        // }
        lastBetID = betID;
        var betAmount = parseFloat($(betsRow).children(':nth-child(3)').text());
        var betTime = $(betsRow).children(':nth-child(2)').text();
        var betGame = $(betsRow).children(':nth-child(4)').text().replace(' ','');
        var betRoll = parseFloat($(betsRow).children(':nth-child(5)').text());
        var rollProfit = parseFloat($(betsRow).children('td:last').text().replace('+',''));
    } else {
        newBet = false;
        var betTime = 0;
        var betAmount = 0;
        var betGame = 0;
        var betRoll = 0;
        var rollProfit = 0;
    }
    var outData = [];
    outData[1] = betID;
    outData[2] = betAmount;
    outData[3] = betGame;
    outData[4] = betRoll;
    outData[5] = rollProfit;
    outData[6] = newBet;
    outData[7] = betTime;
    outData[8] = botBalance;
    return outData;
}

lastMessageText = '';


function heatBeat(){
	botBalance = getBalance();
    $('.botCurrBalance').html(botBalance);
    
    if(botRunning){
        $('#mdr_execute_code_btn').removeClass('btn_green').addClass('btn_disabled');
        $('#mdr_terminate_code_btn').removeClass('btn_disabled').addClass('btn_red');
    } else {
        $('#mdr_execute_code_btn').removeClass('btn_disabled').addClass('btn_green');
        $('#mdr_terminate_code_btn').removeClass('btn_red').addClass('btn_disabled');
    }
    
    if(botStopOnNextWin){
        $('#mdr_terminate_onw_code_btn').removeClass('btn_red').addClass('btn_green');
    } else {
        $('#mdr_terminate_onw_code_btn').removeClass('btn_green').addClass('btn_red');
    }
    betData = getLastBetData();
    if(betData[6]){ 
        botProcessData(betData);
    }
}

setInterval(function(){
    heatBeat();
},50);
    
