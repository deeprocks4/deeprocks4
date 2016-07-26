function addResultRecord(id,time,bet,roll,target,profit,win){
    var thisClass = 'green';
    if(win == 0) thisClass = 'red';
    var row = '<tr>';
        row += '<td>' + id + '</td>';
        row += '<td>' + time + '</td>';
        row += '<td class="'+thisClass+'">' + Number(bet).toFixed(8) + '</td>';
        row += '<td class="'+thisClass+'">' + roll + '</td>';
        row += '<td class="'+thisClass+'">' + target + '</td>';
        row += '<td class="'+thisClass+'">' + Number(profit).toFixed(8) + '</td>';
        row += '</tr>';
        $('#results_display_body').prepend(row);
        if($('#results_display_body').children().length>50){ 
            $('#results_display_body tr:last').remove();
        }
        $('.results_display_section').each(function(){
		  var api = $(this).data('jsp');
          api.reinitialise();
        });        
}


$(document).ready(function() {
    var dlg_name = '#mdr_minresults_dlg';
    var this_dlg = $( dlg_name ).dialog({
        dialogClass: "no-close",
        autoOpen: false,
        resizable: true,
        width: 500,
        open: function(){},
        close: function(){},
        drag: function(){},
        dragStart: function(){},
        dragStop: function(){},
        resize: function( event, ui ) {
            $('.results_display_section').each(function(){
		        var api = $(this).data('jsp');
                api.reinitialise();
            });
            
        },
        focus: function(){},
    });
    $( dlg_name ).parent().find('.ui-dialog-titlebar').append('<i class="fa fa-bar-chart dlg_icon"></i>');
    $( dlg_name ).parent().find('.ui-dialog-titlebar').append('<div id="dgclosebtn" class="close_dlg_btn"><i class="fa fa-close"></i></div>');
    $(".results_display_section" ).jScrollPane();
    $( this_dlg).parent().find('.close_dlg_btn').on('click',function(){
        this_dlg.dialog( "close" );
    });    

});