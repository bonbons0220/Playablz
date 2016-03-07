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

(function ($) {
	
	'use strict';

	// Playablz PUBLIC CLASS DEFINITION
	// ================================
	var Playablz = {
	
		init: function( context ){
			var mode=1; // all help, all debug, all messages
			
			//set onClick event for each tile
			$(context+".playablz").on('change','textarea',{context:context},Playablz.update);
			
			//create the game tiles
			Playablz.reset( context );
			
			//populate the grid
			Playablz.populate( context , [[1,2,3],[4,5,6],[7,8,9]]);
			
			//save the state
			Playablz[context] = {state: Playablz.getstate( context )};
			
			//check the state
			//Playablz.check( context );
			
		} ,
		
		reset: function( context ){
			var i=0, j, r, c;
			var af="autofocus";
			var str = "<div class='pz-canvas'><div class='pz-board'>";
			
			while ( i++<9 ) {
				j=0;
				str+="<div class='pz-square' data-pz-square='"+i+"'>";
					while ( j++<9 ) {
						r = ( Math.ceil( ( i ) / 3 ) - 1 ) * 3 + Math.ceil(j/3);
						c = ( ( j - 1 ) % 3 ) + 1 + ( ( ( i - 1 ) % 3) * 3 );
						str += "<textarea rows=3 cols=3 maxLength=9 "+ af;
						str += " class='pz-tile' data-pz-tile='"+j+"' data-pz-row='"+r+"' data-pz-col='"+c+"'>";
						str+= "</textarea>";
						af="";
					}
				str+="</div>";
			}
			str += "</div></div>";
			$( context+".playablz" ).html(str);
		} ,

		//populate the grid with a state
		populate: function( context , state ){
			
			state.forEach( function( el, ind, arr){
				el.forEach( function( inner_el, inner_ind,  inner_arr ){
					$( "[data-pz-row='" + (ind+1) + "'][data-pz-col='" + (inner_ind+1) +"']" , context ).prop( "value" , inner_el );
				});
			});
		} ,
		
		//get the current state
		getstate: function( context ){
			var this_row = [], state = [];
			var i=1, j=1, r=1, c=1, chk;
			for (r=1; r<=9; r++) {
				for (c=1; c<=9; c++) {this_row.push( $( "[data-pz-row='"+(r)+"'][data-pz-col='"+c+"']" ).prop("value") );}
				state.push(this_row);
				this_row = [];
			}
			return state;
		}  ,
		
		
		update: function( event ){
			var cleaned=[];
			var val = $( this ).prop("value").replace(/[^1-9]/gim,"").split("").sort().forEach( function(e,i,a){ 
				if ( cleaned.indexOf(e) === -1 ) {cleaned.push(e);} 
			});
			$( this ).prop("value" , cleaned.join("") );
			
			Playablz[ event.data.context ].state[ $(this).data('pz-row') - 1 ][ $(this).data('pz-col') - 1 ] = $( this ).prop("value");
			
			console.log( Playablz[ event.data.context ].state );
			//check answers
			//Playablz.check( event.data.context );
			
			
		} ,
		
		check: function( context ){

			//only change value of current
			var sqr, tile, row, col, chk;
			
			//remove all errors
			$( "[data-pz-row]" , context ).removeClass("pz-error");
			
			//check each row
			for (row=0; row<9; row++) {
				for (col=0; col<9; col++) {
					if (Playablz[context].state[row][col].length === 0) { continue; } 
					for (chk=col+1; chk<9; chk++) {
						if ( Playablz[context].state[row][chk].length !== 1) { continue; } 
						if ( Playablz[context].state[row][col] === Playablz[context].state[row][chk] ) {
							$( "[data-pz-row='"+(row+1)+"'][data-pz-col='"+(col+1)+"'],[data-pz-row='"+(row+1)+"'][data-pz-col='"+(chk+1)+"']" , context ).addClass("pz-error");
						}
					}
				}
			}
			
			//check each column
			for (col=0; col<9; col++) {
				for (row=0; row<9; row++) {
					if (Playablz[context].state[row][col].length === 0) { continue; } 
					for (chk=row+1; chk<9; chk++) {
						if ( Playablz[context].state[chk][col].length !== 1) { continue; } 
						if ( Playablz[context].state[row][col] === Playablz[context].state[chk][col] ) {
							$( "[data-pz-row='"+(row+1)+"'][data-pz-col='"+(col+1)+"'],[data-pz-row='"+(row+1)+"'][data-pz-col='"+(chk+1)+"']" , context ).addClass("pz-error");
						}
					}
				}
			}
			
			//check each column
			//check each square
			//if singleton add to solution
			// color any inconsistent squares danger
			// color any consistent singletons warning
			//if multiplon
			//reorder numbers, remove duplicates
			//color multiplons blue
		}
	};

	$(document).ready(function() {

		//give each playablz container a unique id and initialize it
		var z=0;
		$(".playablz").each( function() {
			$( this ).prop("id" , $( this ).prop("id").replace(/[^a-z0-9_]/gim,"") );
			if ( $( this ).prop("id").length === 0 ) { 
				$( this ).prop( "id" , "playablz-" + z++ );
			}
			Playablz.init( "#" + $( this ).prop("id") );
		});

		return;
	});
  
})(jQuery);
