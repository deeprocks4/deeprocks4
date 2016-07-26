$(document).ready(function() {
	
	/**
	 * function to load a given css file
	 */
	loadCSS = function(href) {
		var cssLink = $("<link rel='stylesheet' type='text/css' href='"+href+"'>");
		$("head").append(cssLink);
	};
	
	/**
	 * function to load a given js file
	 */
	loadJS = function(src) {
		var jsLink = $("<script type='text/javascript' src='"+src+"'>");
		$("head").append(jsLink);
	}

	console.log('Loading Bot: wiebeb.github.io.js');
	loadCSS("madroller/css/font-awesome.min.css");
	loadCSS("madroller/css/jquery-ui.min.css");
	loadCSS("madroller/css/jquery-ui.theme.min.css");
	loadCSS("madroller/css/jquery.jscrollpane.css");
	loadCSS("madroller/css/common.css");
	loadCSS("madroller/css/toolbar.css");
	loadCSS("madroller/css/heights.css");
	loadCSS("madroller/css/martcalc.css");
	loadCSS("madroller/css/systemvars.css");
	loadCSS("madroller/css/editor.css");
	loadCSS("madroller/css/miniresults.css");
	loadCSS("madroller/css/keyboard.css");
	loadCSS("madroller/css/lastheights.css");
	loadCSS("madroller/css/about.css");
		
	//loadJS("madroller/js/libs/jquery.js");
	loadJS("madroller/js/libs/jquery-ui.js");
	loadJS("madroller/js/libs/seedrandom.min.js");
	loadJS("madroller/js/libs/jquery.jscrollpane.min.js");
	loadJS("madroller/js/libs/jquery.mousewheel.js");
	loadJS("madroller/js/libs/ace/ace.js");
	loadJS("madroller/js/libs/ace/theme-monokai.js");
	loadJS("madroller/js/libs/ace/mode-javascript.js"); 
	loadJS("madroller/js/libs/ace/worker-javascript.js");                     
	loadJS("madroller/js/madr_gui.js");
	loadJS("madroller/js/functions.js");
	loadJS("madroller/js/systemvars.js");
	loadJS("madroller/js/toolbar.js");
	loadJS("madroller/js/martcalc.js");
	loadJS("madroller/js/heights.js"); 
	loadJS("madroller/js/miniresults.js");
	loadJS("madroller/js/keyboard.js");
	loadJS("madroller/js/lastheights.js");
	loadJS("madroller/js/about.js");
	loadJS("madroller/js/editor.js");
	loadJS("madroller/js/engine/wiebeb.github.io.js");

	console.log('setting up...');

});
