$(document).ready(function() {
    console.log('Loading Toolbar');
    
    
    $('#madr_toolbar_open_button').on('click',function(e){
        $('#madr_toolbar_open_button_wrapper').hide("slide", { direction: "right" }, 100,function(){
            $('#madr_toolbar_wrapper').show("slide", { direction: "right" }, 200,function(){});    
        }); 
	});

    $('#madr_toolbar_close_button').on('click',function(e){
        $('#madr_toolbar_wrapper').hide("slide", { direction: "right" }, 100,function(){
            $('#madr_toolbar_open_button_wrapper').show("slide", { direction: "right" }, 200,function(){});    
        }); 
	});
        
    $('.dlg_open_btn').on('click',function(){
        var name = $(this).attr('data-dlg-name');
        $('#' + name).dialog('open');
    });    
        
    $('.dlg_open_editor').on('click',function(){
        $('#mdr_editor_main_dlg').dialog('open');
        $('#mdr_editor_start_dlg').dialog('open');
    });            
        
        
    $('#donate_btn').on('click',function(){
        //
    });
    
          
        
});