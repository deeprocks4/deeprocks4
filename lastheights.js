function addLastHeight_Loss(lastheight){
    for(var i=20 ; i>1 ; i--){
        var tmpV = Number($('#last_l_' + (i-1)).html());
        $('#last_l_' + i).removeClass('red');
        if(tmpV>0) $('#last_l_' + i).addClass('red');
        $('#last_l_' + i).html($('#last_l_' + (i-1)).html() );                
    }
    $('#last_l_1').removeClass('red');
    if(lastheight>0) $('#last_l_1').addClass('red');    
    $('#last_l_1').html(lastheight);
}

function addLastHeight_Win(lastheight){
    for(var i=20;i>1;i--){
        var tmpV = Number($('#last_w_' + (i-1)).html());
        $('#last_w_' + i).removeClass('green');
        if(tmpV>0) $('#last_w_' + i).addClass('green');
        $('#last_w_' + i).html(tmpV);                
    }
    $('#last_w_1').removeClass('green');
    if(lastheight>0) $('#last_w_1').addClass('green');
    $('#last_w_1').html(lastheight);
}

function restLastHeights(){
    for(var i=20;i>0;i--){
        $('#last_l_' + i).html('0').removeClass('red');
        $('#last_w_' + i).html('0').removeClass('green');                
    }
}


$(document).ready(function() {
    var dlg_name = '#mdr_lastheights_dlg';
    var this_dlg = $( dlg_name ).dialog({
        dialogClass: "no-close",
        autoOpen: false,
        resizable: false,
        width: 500,
        height: 70,
        open: function(){
        },
        close: function(){},
        drag: function(){},
        dragStart: function(){},
        dragStop: function(){},
        resize: function( event, ui ) {
            
        },
        focus: function(){},
    });
    $( dlg_name ).parent().find('.ui-dialog-titlebar').append('<i class="fa fa-bar-chart dlg_icon"></i>');
    $( dlg_name ).parent().find('.ui-dialog-titlebar').append('<div id="dgclosebtn" class="close_dlg_btn"><i class="fa fa-close"></i></div>');
    $( dlg_name ).parent().find('.ui-dialog-titlebar').append('<div id="lastresetbtn" class="lastresetbtn"><i class="fa fa-refresh"></i></div>');
    $( this_dlg).parent().find('.close_dlg_btn').on('click',function(){
        this_dlg.dialog( "close" );
    });    
    $('#lastresetbtn').on('click',function(){
        restLastHeights();
    });
});