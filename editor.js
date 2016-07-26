var main_editor;
var start_editor;


function doSeedCustom(seed){
    doChangeSeed(seed);
}

function doSeedRandom(){
    doChangeSeedRandom();
}

function doRain(Amount){
    if(isRainAvailable) doRainSend(Amount);
}

function doTip(Account,Amount){
    if(isTipAvailable) doTipSend(Account,Amount);
}

function resetToBase(){
    botCurrBet = botBaseBet;
    botCurrGame = botBaseGame;
    botCurrType = botBaseType;
    botCurrMulti = botBaseMulti;
}

function flipGame(){
    doFlipGame();
}

function pauseBot(pauseAmount){
    botPauseAmount += Number(pauseAmount);
}


function startBotCode(){
    botStartCode = start_editor.getValue();
    botRunCode = main_editor.getValue();
    resetSystemVars();
    botRunning = true;
    var tmpD = new Date();
    botStartTime = tmpD.getTime();
    eval(botStartCode);
    updateSystemVarsDisplay();
    placeBet(botCurrBet,botCurrGame,botCurrType);
}


function stopBotCode(){
    botRunning = false;
}


function startBotCodeONW(){
    if(botStopOnNextWin) botStopOnNextWin = false
     else  botStopOnNextWin = true;
}

$(document).ready(function() {
   // console.log('Loading Editor System.');
    $('#mdr_editor_main_dlg').dialog({
        dialogClass: "no-close",
        autoOpen: false,
        minWidth: 216,
        width: 500, 
        height: 200,
        open: function(){},
        close: function(){},
        drag: function(){},
        dragStart: function(){},
        dragStop: function(){},
        resize: function( event, ui ) {
            main_editor.resize(true);
        },
        focus: function(){},
    });

    $('#mdr_editor_start_dlg').dialog({
        dialogClass: "no-close",
        autoOpen: false,
        minWidth: 216,
        width: 216, 
        height: 200,
        open: function(){},
        close: function(){},
        drag: function(){},
        dragStart: function(){},
        dragStop: function(){},
        resize: function( event, ui ) {
            start_editor.resize(true);
            
            
        },
        focus: function(){},
    });
    
    $('#mdr_editor_main_dlg').parent().find('.ui-dialog-titlebar').append('<i class="fa fa-code dlg_icon"></i>');
    $('#mdr_editor_main_dlg').parent().find('.ui-dialog-titlebar').append('<div id="dgclosebtn" class="close_dlg_btn"><i class="fa fa-close"></i></div>');    
    
    $('#mdr_editor_start_dlg').parent().find('.ui-dialog-titlebar').append('<i class="fa fa-code dlg_icon"></i>');
    $('#mdr_editor_start_dlg').parent().find('.ui-dialog-titlebar').append('<div id="dgclosebtn" class="close_dlg_btn"><i class="fa fa-close"></i></div>');
    
    $( '#mdr_editor_main_dlg').parent().find('.close_dlg_btn').on('click',function(){
        $( '#mdr_editor_main_dlg').dialog( "close" );
    });
    
    $( '#mdr_editor_start_dlg').parent().find('.close_dlg_btn').on('click',function(){
        $( '#mdr_editor_start_dlg').dialog( "close" );
    });
    
    
    main_editor = ace.edit("mdr_main_bot_editor");
    main_editor.setTheme("ace/theme/monokai");
    main_editor.getSession().setMode("ace/mode/javascript");
    main_editor.setShowPrintMargin(false);    
    main_editor.setValue("if(botDidWin){\n    resetToBase();\n} else {\n    botCurrBet = (botCurrBet * botCurrMulti);\n}\n",1);
    
    start_editor = ace.edit("mdr_start_bot_editor");
    start_editor.setTheme("ace/theme/monokai");
    start_editor.getSession().setMode("ace/mode/javascript");
    start_editor.setShowPrintMargin(false);
    start_editor.setValue("botBaseBet=1.00000000;\nbotBaseGame=49.50;\nbotBaseMulti=2;\nbotBaseType=0;\nresetToBase();\n",1);
    
    $('#mdr_execute_code_btn').on('click',function(){
        startBotCode();
    });
    $('#mdr_terminate_code_btn').on('click',function(){
        stopBotCode();
    });
    $('#mdr_terminate_onw_code_btn').on('click',function(){
        startBotCodeONW();
    });
    

});