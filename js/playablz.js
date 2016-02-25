/* ========================================================================
 * ZENDGAME: playablz.js v1.0.0
 * ========================================================================
 * What it does:
 * 
 * 
 * ======================================================================== 
 * Copyright 2011-2016 IDIES
 * Licensed under MIT 
 * ======================================================================== */

+function ($) {
	
	'use strict';

	// Playablz PUBLIC CLASS DEFINITION
	// ================================
	var Playablz = {
	
		init: function( context ){
			
			$(this).html("Hello World!");
		} ,
		
		update: function( context ){			
		} ,
		
		message: function( context ){
		} ,
		
		// reset game
		reset: function( event ) {
		} ,
		
		// toggle
		toggle: function( event ) {								
			Playablz.update( event.data.context );
		}
	}

	$(document).ready(function() {

		//give each playablz container a unique id and initialize it
		var z=0;
		$(".playablz").each( function() {
			$( this ).prop("id" , $( this ).prop("id").replace(/[^a-z0-9_]/gim,"") );
			if ( $( this ).prop("id").length == 0 ) $( this ).prop( "id" , "playablz-" + z++ );
			Playablz.init( "#" + $( this ).prop("id") );
		});

		return;
	});
  
}(jQuery);
