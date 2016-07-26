runHeights = [];
lossHeights = [];

function updateWinHeight(heightnum){
    runHeights[heightnum] = Number(runHeights[heightnum])+Number(1);
    $('#wh'+heightnum).html(runHeights[heightnum]);
    $('#wh_'+heightnum).removeClass('noData');
    
    $('.heights_display_section').each(function(){
	   var api = $(this).data('jsp');
       api.reinitialise();
    });
}

function updateLossHeight(heightnum){
    lossHeights[heightnum] = Number(lossHeights[heightnum])+ Number(1);
    $('#lh'+heightnum).html(lossHeights[heightnum]);
    $('#lh_'+heightnum).removeClass('noData');
    $('.heights_display_section').each(function(){
	   var api = $(this).data('jsp');
       api.reinitialise();
    });
}


function resetHeights(){
    var winRows = '';
    var lossRows = '';
    for(var i=0;i < 1000; i++){
        runHeights[i] = '0';
        lossHeights[i] = '0';
        winRows+= '<tr id="wh_'+i+'" class="noData"><td width="20">'+i+'</td><td id="wh'+i+'">0</td></tr>';
        lossRows+= '<tr id="lh_'+i+'" class="noData"><td width="20">'+i+'</td><td id="lh'+i+'">0</td></tr>';
    }
    $('#win_heights_table tbody').empty();
    $('#win_heights_table tbody').append(winRows);
    
    $('#loss_heights_table tbody').empty();
    $('#loss_heights_table tbody').append(lossRows);
    
    var scroller = $('#mdr_martcalc_dlg').find('.display_scroller').data('jsp');
    scroller.reinitialise();
    
    $('#win_heights_table tbody tr').on('click',function(){
        $('#win_heights_table tbody tr').removeClass('trActive');
        $(this).addClass('trActive')
    });    
    $('#loss_heights_table tbody tr').on('click',function(){
        $('#loss_heights_table tbody tr').removeClass('trActive');
        $(this).addClass('trActive')
    });
    $('.heights_display_section').each(function(){
	   var api = $(this).data('jsp');
       api.reinitialise();
    });
}


$(document).ready(function() {
    var dlg_name = '#mdr_heights_dlg';
    var this_dlg = $( dlg_name ).dialog({
        dialogClass: "no-close",
        autoOpen: false,
        resizable: false,
        width: 167,
        open: function(){},
        close: function(){},
        drag: function(){},
        dragStart: function(){},
        dragStop: function(){},
        resize: function( event, ui ) {
            $('.heights_display_section').each(function(){
		        var api = $(this).data('jsp');
                api.reinitialise();
            });
        },
        focus: function(){},
    });
    $( dlg_name ).parent().find('.ui-dialog-titlebar').append('<i class="fa fa-bar-chart dlg_icon"></i>');
    $( dlg_name ).parent().find('.ui-dialog-titlebar').append('<div id="dgclosebtn" class="close_dlg_btn"><i class="fa fa-close"></i></div>');
    $(".heights_display_section" ).jScrollPane();
    $( this_dlg).parent().find('.close_dlg_btn').on('click',function(){
        this_dlg.dialog( "close" );
    });        
    $('#heights_reset_btn').on('click',function(){
        resetHeights();
    });
    
    resetHeights();
});    