//WORLD
const world = [
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
	[0, 12,9, 9, 9, 11,11,11,10,9, 9, 9, 11,11,10,11,11,0, 9, 13,0 ],
	[0, 9, 8, 0, 0, 0, 0, 0, 6, 9, 5, 9, 0, 0, 0, 10,0, 0, 2, 11,0 ],
	[0, 9, 10,11,9, 11,11,11,9, 11,0, 9, 9, 9, 9, 11,9, 9, 0, 9, 0 ],
	[0, 9, 5, 11,0, 0, 0, 0, 6, 11,0, 9, 0, 0, 0, 0, 6, 11,9, 9, 0 ],
	[0, 9, 0, 9, 13,9, 9, 9, 9, 9, 0, 11,11,10,10,11,11,9, 0, 9, 0 ],
	[0, 11,4, 0, 0, 0, 0, 0, 6, 9, 0, 9, 0, 0, 0, 0, 0, 0, 3, 9, 0 ],
	[0, 11,9, 11,10,11,9, 9, 9, 10,0, 13,9, 9, 9, 9, 9, 9, 9, 11,0 ],
	[0, 9, 8, 0, 0, 0, 0, 0, 6, 11,0, 0, 0, 9, 0, 0, 0, 0, 2, 11,0 ],
	[0, 11,11,9, 9, 9, 9, 9, 9, 9, 0, 11,9, 9, 9, 9, 11,11,0, 11,0 ],
	[0, 0, 0, 11,0, 0, 0, 0, 6, 9, 0, 11,0, 0, 0, 0, 6, 11,0, 11,0 ],
	[0, 9, 0, 11,10,11,11,11,11,9, 0, 10,9, 11,11,10,9, 9, 0, 10,0 ],
	[0, 9, 4, 0, 0, 0, 0, 11,0, 0, 0, 9, 0, 0, 0, 10,0, 0, 3, 9, 0 ],
	[0, 13,10,11,9, 9, 9, 11,10,11,9, 9, 0, 15,9, 9, 9, 9, 9, 9, 0 ],
	[4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3 ]
];
let satisfaction = 0;
let work = 4;
let step = 100;

const pacman = {
	x: 1,
	y: 1,
}

const choice = ["<div class='xbox'></div>","<div class='yt'></div>","<div class='HN'></div>","<div class='fbmess'></div>","<div class='reddit'></div>"];
const m = {};
function pick(x,y) {
	const a = [x,y];
	if(a in m)
		return m[a];
	const i  = Math.floor(Math.random() * choice.length);
	m[a] = choice[i];
	return choice[i];
}

//DISPLAY WORLD
function displayWorld(){
	let output = '';
	for(let i=0; i<world.length; i++){
		output += "\n"
		for(let j=0; j<world[i].length; j++){
			if((world[i][j] != 13 && world[i][j] != 15) && (Math.abs(pacman.x - j) >= 5 || Math.abs(pacman.y - i) >= 5)){ 
				output += "<div class='empty'></div>";
				continue;
			}
			//            BRICKS
			if(world[i][j] == 0)
				output += "<div class='brick'></div>";
			else if(world[i][j] == 1)
				output += "<div class='brick lefttop'></div>";
			else if(world[i][j] == 2)
				output += "<div class='brick righttop'></div>";
			else if(world[i][j] == 3)
				output += "<div class='brick rightbottom'></div>";
			else if(world[i][j] == 4)
				output += "<div class='brick leftbottom'></div>";
			else if(world[i][j] == 5)
				output += "<div class='brick top'></div>";
			else if(world[i][j] == 6)
				output += "<div class='brick right'></div>";
			else if(world[i][j] == 7)
				output += "<div class='brick bottom'></div>";
			else if(world[i][j] == 8)
				output += "<div class='brick left'></div>";
			//            DYNAMIC CONTENT
			else if(world[i][j] == 9)
				output += "<div class='empty'></div>";
			else if(world[i][j] == 10)
				output += "<div class='empty'></div>";
			else if(world[i][j] == 11){
				output += pick(i,j);
			}
			else if(world[i][j] == 12 || world[i][j] == 14)
				output += "<div class='pacman'></div>";
			else if(world[i][j] == 13)
				output += "<div class='book'></div>";
			else if(world[i][j] == 15)
				output += "<div class='bed'></div>";
		}
		output += "\n"
	}
	document.getElementById("world").innerHTML = output;
}

//PACMAN MOVEMENT
document.onkeydown = function(e){
	//LEFT
	let changeX = 0;
	let changeY = 0;
	if(e.keyCode == 37 && (world[pacman.y][pacman.x-1]==9 || world[pacman.y][pacman.x-1]==10 || world[pacman.y][pacman.x-1]==11 || world[pacman.y][pacman.x-1]==13 || world[pacman.y][pacman.x-1]==15)){
		changeX--;
	}
	//RIGHT
	else if(e.keyCode == 39 && (world[pacman.y][pacman.x+1]==9 || world[pacman.y][pacman.x+1]==10 || world[pacman.y][pacman.x+1]==11 || world[pacman.y][pacman.x+1]==13)){
		changeX ++;
	}
	//DOWN
	else if(e.keyCode == 38 && (world[pacman.y-1][pacman.x]==9 || world[pacman.y-1][pacman.x]==10 || world[pacman.y-1][pacman.x]==11 || world[pacman.y-1][pacman.x]==13)){
		changeY --;
	}
	//UP
	else if(e.keyCode == 40 && (world[pacman.y+1][pacman.x]==9 || world[pacman.y+1][pacman.x]==10 || world[pacman.y+1][pacman.x]==11 || world[pacman.y+1][pacman.x]==13)){
		changeY ++;
	}
	if(changeX || changeY){
		const newX = pacman.x + changeX;
		const newY = pacman.y + changeY;
		let val = 12;
		// Potential trap
		if(world[newY][newX] == 10){
			val = 14;
		}

		if(world[pacman.y][pacman.x] == 14){
			//PACMAN ENTER TRAP
			if(world[newY][newX] == 11)
				world[pacman.y][pacman.x] = 0;
			//PACMAN ESCAPE TRAP
			else {
				world[pacman.y][pacman.x] = 10;
			}
		}
		else
			world[pacman.y][pacman.x] = 9;

		if(world[newY][newX] == 11){
			step-=3;
			satisfaction++;
		}
		else if(world[newY][newX] == 13){
			step-=5;
			work--;
		}
		else if(world[newY][newX] == 15){
			endGame(true);
			return;
		}
		else {
			step -= 0.125
		}

		world[newY][newX] = val;
		pacman.x = newX;
		pacman.y = newY;
		document.getElementById("stamina").innerHTML=step;
		document.getElementById("work").innerHTML=work;
		document.getElementById("connect").innerHTML=satisfaction;
		if(step <= 0) {
			// Game over
			endGame(false);
			return;
		}
		displayWorld();
	}
}

function endGame(bed){
	if((bed || step>=0) && work == 0 && satisfaction >=20){
		if(bed)
			document.getElementById("gameoverBetter").style.display="inline";
		else
			document.getElementById("gameoverGood").style.display="inline";

	}
	if(!bed && step <= 0 && (work > 0 || satisfaction < 20)){
			document.getElementById("gameoverBadS").style.display="inline";
	}
	if((bed || step>=0) && work > 0 && satisfaction >=20){
			document.getElementById("gameoverBadW").style.display="inline";
	}
	if((bed || step>=0) && work <= 0 && satisfaction < 20){
			document.getElementById("gameoverBadC").style.display="inline";
	}

}

document.addEventListener("DOMContentLoaded", function(event) {
	displayWorld();
});

