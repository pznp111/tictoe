// JavaScript Document


var counter = 0;
var XSelection = [];
var OSelection =[];
var o_win = 0;
var x_win = 0;
function makeGame(){
	
	var game_main = document.getElementById('game_main');
	game_main.innerHTML = '';
	
	var gameCont = Number(document.getElementById('game_type').value);
	

	for (var row = 1; row <= gameCont; row++){
		var rowBoostrap = document.createElement("div");
		rowBoostrap.setAttribute("class", 'row');
		console.log(gameCont);
		for (var col = 1; col <= gameCont; col++) {
			var unique_name = 'grid-'+row+'-'+col;
			var unique_id = row+''+col;
			var button = document.createElement("li");

			button.setAttribute("value", ' ');
			button.setAttribute("id", unique_id);
			button.setAttribute("name", unique_name);
			button.setAttribute("class", 'btn custom1');
			button.setAttribute("type", 'button');
			button.setAttribute("onclick", "markCheck("+unique_id+")");
			button.innerHTML = '+';
			rowBoostrap.appendChild(button)			
		}
		game_main.appendChild(rowBoostrap);
	}

}

function markCheck(div){
	//console.log(div);
	
	 var element =$( "#"+div );
	//console.log(counter);
	
	if(counter %2 == 0){
		element.addClass("disable o btn-primary");
		element.text("X");
		XSelection.push(div);

	}else{
		element.addClass("disable x btn-info");
		element.text("O");
		OSelection.push(div);

	}
	var isEnd = checkWin();
	if (!isEnd){
		
	counter = counter + 1;
	}

	
}


function checkWin(){
	
		// 3 x 3 winning patterns;
		wins = [];
	var gameCont = Number(document.getElementById('game_type').value);
	if (gameCont==3) wins = [ 
								[11,12,13], [21,22,23], [31,32,33],
						 		[11,21,31], [12,22,32], [13,23,33], 
						 		[11,22,33], [13,22,31]
						 	];


	// 4 x 4 winning patterns;
	if (gameCont==4) wins = [ 
								[11,12,13,14], [21,22,23,24], [31,32,33,34], [41,42,43,44],
						 		[11,21,31,41], [12,22,32,42], [13,23,33,43], [14,24,34,44],
						 		[14,23,32,41], [11,22,33,44]
						 	];


	// 5 x 5 winning patterns;
	if (gameCont==5) wins = [ 
								[11,12,13,14,15], [21,22,23,24,25], [31,32,33,34,35], [41,42,43,44,45], [51,52,53,54,55],
						 		[11,21,31,41,51], [12,22,32,42,52], [13,23,33,43,53], [14,24,34,44,54], [15,25,35,45,55],
						 		[11,22,33,44,55], [15,24,33,42,51]
						 	];
							
	var finished = false;		
	if (finished != true) { 
		finished = isWinner(wins);

		if ( finished === true ) {
			
			// Updating score card
			if(counter %2 == 0){
				
				alert('Player X Won !!');
				x_win++
				counter = 0
				XSelection = [];
				OSelection =[];
				makeGame();
				$('#x_win').text(x_win);
				
			}else{
				alert('Player O Won !!');
				o_win++
				counter = 0
				XSelection = [];
				OSelection =[];
				makeGame();
				$('#o_win').text(o_win)
			}	
			return true;			
		} else {
			return false;
		}				
	}
		return false;			
}

function isWinner(win_pattern){

var array1 = [];
	if(counter %2 == 0){
		array1 = XSelection;
	} else {
		array1 = OSelection;
	}

	for (var x=0; x<win_pattern.length; x++) {
		if(isSubsetOf(array1.sort(),win_pattern[x])){
			return true;
		}		
	}

	return false;
}


function isSubsetOf(set, subset) {
    return Array.from(new Set([...set, ...subset])).length === set.length;
}




$(document).ready(function() {
	counter = 0
	XSelection = [];
	OSelection =[];
	makeGame();
    $("#reset").click(function () {
	counter = 0
	XSelection = [];
	OSelection =[];
	makeGame();

  });
});
