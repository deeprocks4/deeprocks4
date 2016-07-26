lastBetID = 0;

var isRainAvailable = false;
var isTipAvailable = false;

var botStartCode = '';
var botRunCode = '';

var botDidWin = false;
var botRunning = false;
var botStopOnNextWin = false;

var botPauseAmount = 0;

var botCurrBalance = 0;
var botStartTime = 0;
var botTotalSeconds = 0;

var botBaseBet = 0;
var botBaseGame = 0;
var botBaseType = 0;
var botBaseMulti = 0;

var botCurrBet = 0;
var botCurrGame = 0;
var botCurrType = 0;
var botCurrMulti = 0;

var botCurrWinRun = 0;
var botHiWinRun = 0;
var botCurrLossRun = 0;
var botHiLossRun = 0;

var botTotalBets = 0;
var botTotalWagered = 0;
var botTotalProfit = 0;
var botTotalRuns = 0;

var userVar0;
var userVar1;
var userVar2;
var userVar3;
var userVar4;
var userVar5;
var userVar6;
var userVar7;
var userVar8;
var userVar9;


var botClientSeed = randomSeed(16);

function resetSystemVars(){
    botStartTime = 0;
    botTotalSeconds = 0;
    botBaseBet = 0;
    botBaseGame = 0;
    botBaseType = 0;
    botBaseMulti = 0;
    botCurrBet = 0;
    botCurrGame = 0;
    botCurrType = 0;
    botCurrMulti = 0;
    botCurrWinRun = 0;
    botHiWinRun = 0;
    botCurrLossRun = 0;
    botHiLossRun = 0;
    botTotalBets = 0;
    botTotalWagered = 0;
    botTotalProfit = 0;
    botTotalRuns = 0;
}

function botProcessData(betData){
    botCurrBalance = getBalance();
    if(botCurrBalance <= 0){
        botCurrBalance = betData[8];
    }
    WaitingOnBetResult = false;  
    var resultGameTypeDisplay = betData[3].substring(0, 1);
    var resultTarget = Number(betData[3].replace('<','').replace('>',''));
    var resultRoll = Number(betData[4]);
    var resultProfit = betData[5];
    if(resultGameTypeDisplay == '<') {
        var resultGameType = 0;
        botDidWin = false;
        if(resultRoll < resultTarget){
            botDidWin = true;
        }
    }  else {
        var resultGameType = 1;
        botDidWin = false;
        if(resultRoll > resultTarget){
            botDidWin = true;
        }
    }
    var didwin = 0;
    if(botDidWin) didwin = 1;
    addResultRecord(betData[1],betData[7],betData[2],betData[4],betData[3],betData[5],didwin);
    botTotalBets++;
    botTotalWagered = Number(botTotalWagered) + Number(betData[2]); 
    botTotalProfit =  Number(botTotalProfit) + Number(resultProfit);
    
    if(botDidWin){
        botCurrWinRun++;
        botTotalRuns++;
        if(botCurrLossRun > botHiLossRun){
            botHiLossRun = botCurrLossRun;
        }
        if(botCurrLossRun >0) updateLossHeight(botCurrLossRun);
        addLastHeight_Loss(botCurrLossRun);
        botCurrLossRun = 0;
        
    } else {
        botCurrLossRun++;
        if(botCurrWinRun > botHiWinRun){
            botHiWinRun = botCurrWinRun;
        }
        if(botCurrWinRun >0) updateWinHeight(botCurrWinRun);
        addLastHeight_Win(botCurrWinRun)
        botCurrWinRun = 0;
    }
    if(botRunning){
        var tmpD = new Date();
        var currTime = tmpD.getTime();
        botTotalSeconds = Math.floor((currTime - botStartTime) / 1000);  
        if(botStopOnNextWin && botDidWin){
            botRunning = false;
            botStopOnNextWin = false;
            eval(botRunCode);
            updateSystemVarsDisplay();      
            return;
        }
        if(String(botRunCode).length > 0){
            eval(botRunCode);
            updateSystemVarsDisplay();
            if(!botRunning){
                return;
            }    
            if(botPauseAmount>0){
                setTimeout(function(){
                    checkForRolling(botCurrBet,botCurrGame,botCurrType);   
                },Number(botPauseAmount));
                botPauseAmount = 0;
            } else {
                checkForRolling(botCurrBet,botCurrGame,botCurrType);
            }
            
        } else {
        }
        
    } else {
        updateSystemVarsDisplay();
    }
}

function stopBot(){
    botRunning = false;
}

function userLabel(ID,Value){
    $('#user_var_label_'+ID).html(Value);
}
function userValue(ID,Value){
    $('#user_var_value_'+ID).html(Value);
}

function updateSystemVarsDisplay(){
    $('.botCurrBalance').html(Number(botCurrBalance).toFixed(8));
    $('.botStartTime').html(botStartTime);
    $('.botTotalSeconds').html(botTotalSeconds);
    $('.runTime').html(secondsToTimeDisplay(botTotalSeconds));
    $('.botBaseBet').html(Number(botBaseBet).toFixed(8));
    $('.botBaseGame').html(botBaseGame);
    $('.botBaseType').html(botBaseType);
    $('.botBaseMulti').html(botBaseMulti);
    $('.botCurrBet').html(Number(botCurrBet).toFixed(8));
    $('.botCurrGame').html(botCurrGame);
    $('.botCurrType').html(botCurrType);
    $('.botCurrMulti').html(botCurrMulti);
    $('.botCurrWinRun').html(botCurrWinRun);
    $('.botHiWinRun').html(botHiWinRun);
    $('.botCurrLossRun').html(botCurrLossRun);
    $('.botHiLossRun').html(botHiLossRun);
    $('.botTotalBets').html(botTotalBets);
    $('.botTotalWagered').html(Number(botTotalWagered).toFixed(8));
    $('.botTotalProfit').html(Number(botTotalProfit).toFixed(8));
    if(botTotalProfit <0){
        $('.botTotalProfit').removeClass('green').addClass('red');
    } else{
        $('.botTotalProfit').removeClass('red').addClass('green');
    }
    $('.botTotalRuns').html(botTotalRuns);
}



$(document).ready(function() {
    var dlg_name = '#mdr_systemvars_dlg';
    var this_dlg = $( dlg_name ).dialog({
        dialogClass: "no-close",
        autoOpen: false,
        resizable: true,
        width: 900,
        open: function(){},
        close: function(){},
        drag: function(){},
        dragStart: function(){},
        dragStop: function(){},
        resize: function( event, ui ) {},
        focus: function(){},
    });
    $( dlg_name ).parent().find('.ui-dialog-titlebar').append('<i class="fa fa-bar-chart dlg_icon"></i>');
    $( dlg_name ).parent().find('.ui-dialog-titlebar').append('<div id="dgclosebtn" class="close_dlg_btn"><i class="fa fa-close"></i></div>');
    $( dlg_name ).parent().find('.ui-dialog-titlebar').append('<div id="sysresetbtn" class="systeresetbtn"><i class="fa fa-refresh"></i></div>');
    $(".heights_display_section" ).jScrollPane();
    $( this_dlg).parent().find('.close_dlg_btn').on('click',function(){
        this_dlg.dialog( "close" );
    });    
    $('#sysresetbtn').on('click',function(){
        resetSystemVars();
        updateSystemVarsDisplay();
    });
    resetSystemVars();
    updateSystemVarsDisplay();
});