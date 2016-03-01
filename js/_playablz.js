/*! playblz - v1.0.0 - by:1.0.0 - license: - 2016-03-01 */(function ($) {
	
	'use strict';

	// Playablz PUBLIC CLASS DEFINITION
	// ================================
	var Playablz = {
	
		init: function( context ){
			var mode=1; // all help, all debug, all messages
			//var seed="123456789".split("");
			var str = "<div class='pz-canvas'><div class='pz-board'>";
			
			//set onClick event for each tile
			$(context+".playablz").on('change','textarea',{context:context},Playablz.update);
			
			//create the game tiles
			Playablz.reset( context );
			
			//pre-populate the grid
			Playablz.populate( context , [[1,2,3],[4,5,6],[7,8,9]]);
			
			//get the state
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
				str+="<div class='pz-square pz-square-"+i+"'>";
					while ( j++<9 ) {
						r = ( Math.ceil( ( i ) / 3 ) - 1 ) * 3 + Math.ceil(j/3);
						c = ( ( j - 1 ) % 3 ) + 1 + ( ( ( i - 1 ) % 3) * 3 );
						str += "<textarea rows=2 cols=3 maxLength=6 "+ af;
						str += " class='pz-tile pz-tile-"+j+" pz-row-"+r+" pz-col-"+c+" '>";
						str+= "</textarea>";
						af="";
					}
				str+="</div>";
			}
			str += "</div></div>";
			$( context+".playablz" ).html(str);
		} ,

		//prepopulate the grid with a solution
		populate: function( context , state ){
			//var state=[[1,2,3],[4,5,6],[7,8,9]];
			state.forEach( function( el, ind, arr){
				el.forEach( function( inner_el, inner_ind,  inner_arr ){
					$( ".pz-row-" + (ind+1) + ".pz-col-" + (inner_ind+1) , context ).prop( "value" , inner_el );
				});
			});
		} ,
		
		//get the current state
		getstate: function( context ){
			var this_row = [], state = [];
			var i=1, j=1, r=1, c=1, chk;
			for (r=1; r<=9; r++) {
				for (c=1; c<=9; c++) {this_row.push( $( ".pz-row-"+(r)+".pz-col-"+(c) ).prop("value") );}
				state.push(this_row);
				this_row = [];
			}
			return state;
		} ,
		
		check: function( context ){

			//use prop("value") not text()
			//only change value of current
			var this_row = [], grid = [];
			var i=1, j=1, r=1, c=1, chk;
			
			//get the current state
			for (r=1; r<=9; r++) {
				for (c=1; c<=9; c++) {
					//this_row.push( ( $( ".pz-row-"+(r)+".pz-col-"+(c) ).text().length===1 ) ? 1*$( ".pz-row-"+(r)+".pz-col-"+(c) ).text() : 0 );
					this_row.push( $( ".pz-row-"+(r)+".pz-col-"+(c) ).text() );
				}
				grid.push(this_row);
				this_row = [];
			}
			console.log(grid);

			//check each row
			for ( r=0; r<9; r++){
				for( c=0; c<9; c++){
					for(chk=c+1; chk<9; chk++){
						if ( grid[r][chk].length === 0 ) {continue;}
						console.log("checking row "+r+", col "+c+" against col "+chk);
						console.log(grid[r][c] + "===" + grid[r][chk] + "?");
						if( grid[r][c] === grid[r][chk] ) {
							console.log("yes");
							$( ".pz-row-"+(r+1)+".pz-col-"+(chk+1) , context ).addClass("pz-error");
						} else {
							console.log("no");
						} 
					} 
				}						
			}
			
			//check each column
			//check each square
		} ,
		
		
		update: function( event ){
			
			//get rid of anything not in 1-6
			$( this ).prop("value" , $( this ).prop("value").replace(/[^1-6]/gim,"") );
			
			//check anaswers
			//Playablz.check( event.data.context );
			
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
