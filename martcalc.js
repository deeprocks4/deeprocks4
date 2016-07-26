function calc_maringale(){
    var allRows = '';
    var bet = $('#mart_calc_bet_amount').val();
    var betmulti = $('#mart_calc_bet_multi').val();
    var hereTotal = bet;
    var rolls = $('#mart_calc_rolls').val();
    var prec = $('#mart_calc_pre').val();
    for(var i=0;i < rolls; i++){
        var row = '<tr class="pointer">';
            row+= '<td>';
            row+= i;
            row+= '</td>';
            row+= '<td>';
            row+= Number(bet).toFixed(prec);
            row+= '</td>';
            row+= '<td>';
            row+= Number(hereTotal).toFixed(prec);
            row+= '</td>';
        allRows+=row;
        bet = Number(bet * betmulti);
        hereTotal= Number(hereTotal) + Number(bet);
    }
    $('#margingale_calc_display_table tbody').empty();
    $('#margingale_calc_display_table tbody').append(allRows);
    var scroller = $('#mdr_martcalc_dlg').find('.display_scroller').data('jsp');
    scroller.reinitialise();
    $('#margingale_calc_display_table tbody tr').on('click',function(){
        $('#margingale_calc_display_table tbody tr').removeClass('trActive');
        $(this).addClass('trActive')
    });    
}


$(document).ready(function() {
    var dlg_name = '#mdr_martcalc_dlg';
    var this_dlg = $( dlg_name ).dialog({
        dialogClass: "no-close",
        autoOpen: false,
        minWidth: 216,
        width: 255, 
        height: 350,
        open: function(){
            var scroller = $(this).find('.display_scroller').data('jsp');
            scroller.reinitialise();
        },
        close: function(){},
        drag: function(){},
        dragStart: function(){},
        dragStop: function(){},
        resize: function( event, ui ) {
            var scroller = $(this).find('.display_scroller').data('jsp');
            scroller.reinitialise();
        },
        focus: function(){},
    });
    $( dlg_name ).parent().find('.ui-dialog-titlebar').append('<i class="fa fa-calculator dlg_icon"></i>');
    $( dlg_name ).parent().find('.ui-dialog-titlebar').append('<div id="dgclosebtn" class="close_dlg_btn"><i class="fa fa-close"></i></div>');
    $( dlg_name + " .display_scroller" ).jScrollPane();
    $( this_dlg).parent().find('.close_dlg_btn').on('click',function(){
        this_dlg.dialog( "close" );
    });    
    $('#do_calc_mart_btn').on('click',function(){
        calc_maringale();
    });
    calc_maringale();
});