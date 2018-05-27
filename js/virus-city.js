var spawningAgent = null,
		virusIndexes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
		totalHealth = 10,
		gameRunning = true,
		enemiesKilled = 0,
		totalEnergy = Math.ceil((parseInt(window.localStorage.getItem("energy")) * parseInt(window.localStorage.getItem("percent"))) / 100);
AFRAME.registerComponent("virus-city",{
	schema : {
		smallEnemyCount : {
			type : "int",
			default : 15
		},
		mediumEnemyCount : {
			type : "int",
			default : 5
		},
		bossCount : {
			type : "int",
			default : 3
		},
    width: {
        type: 'int',
        default: 20
    },
    length: {
        type: 'int',
        default: 20
    },
    spacing: {
        type: 'int',
        default: 15
    }
	},
	init : function(){
		this.viruses = [];
		var controllers = {
			"rightHand" : document.getElementById("rightHand"),
      "leftHand" : document.getElementById("leftHand")
		}
		controllers.rightHand.addEventListener("menudown",function(){
			document.getElementById("scene6-intro").setAttribute("visible", false);
			var virus = document.querySelector("a-entity[data-index='0']");
			virus.emit("spawnEnemy");
		})
		for(i = 0;i < this.data.smallEnemyCount; i++){
			var virus = this.generateSmallEnemy(i);
			this.viruses.push(virus);
			var virusPosition = {"x" : getRandomArbitrary(20,30), "y" : 0, "z" : getRandomArbitrary(-20, 30)};
			virus.setAttribute("position",virusPosition);
			this.el.appendChild(virus);
		}

		for(i = 0;i < this.data.mediumEnemyCount; i++){
			var virus = this.generateMediumEnemy(i + this.data.smallEnemyCount);
			this.viruses.push(virus);
			var virusPosition = {"x" : getRandomArbitrary(20,30), "y" : 0, "z" : getRandomArbitrary(-20, 30)};
			virus.setAttribute("position",virusPosition);
			this.el.appendChild(virus);
		}

		for(i = 0;i < this.data.bossCount; i++){
			var virus = this.generateBossEnemy(i + this.data.mediumEnemyCount + this.data.smallEnemyCount);
			this.viruses.push(virus);
			var virusPosition = {"x" : getRandomArbitrary(20,30), "y" : 0, "z" : getRandomArbitrary(-20, 30)};
			virus.setAttribute("position",virusPosition);
			this.el.appendChild(virus);
		}
		var hurt = document.getElementById("hurt");
		var scene = this.el;
		this.viruses.forEach(function(virus){
			virus.addEventListener("animationcomplete",function(){
				scene.removeChild(virus);
				hurt.emit("player-hit");
				var idx = parseInt(this.attributes["data-index"].value);
				if(idx < 22 && gameRunning){
					var newvirus = document.querySelector("a-entity[data-index='" + (idx + 1) + "']");
					newvirus.emit("spawnEnemy");
				}else{
					endGame(3);
				}
				totalHealth--;
				totalEnergy -= 25;
				var energybar = document.getElementById("energybar");
				energybar.setAttribute("value",totalEnergy);
				if(totalHealth == 0){
					endGame(0);
				}
			})
			virus.addEventListener("hitstart",function(){
				var saberLine = document.getElementById("saberLine");
				var energy = 0;
				var power = parseInt(this.attributes["data-power"].value);
				switch(saberLine.attributes["color"].value){
					case "blue":
						energy = 30;
						break;
					case "yellow":
						energy = 20;
						break;
					case "red":
						energy = 10;
						break;
				}
				power -= energy;
				var energybar = document.getElementById("energybar");
				var killedbar = document.getElementById("killedbar");
				totalEnergy -= energy;
				this.setAttribute("opacity", power / 100);
				energybar.setAttribute("value",totalEnergy);
				if(power <= 0){
					enemiesKilled++;
					scene.removeChild(this);	
					killedbar.setAttribute("value",enemiesKilled);
					var idx = parseInt(this.attributes["data-index"].value);
					if(idx < 22 && gameRunning){
						var newvirus = document.querySelector("a-entity[data-index='" + (idx + 1) + "']");
						newvirus.emit("spawnEnemy");
					}else{
						endGame(3);
					}
				}else{
					this.setAttribute("data-power",power);
				}
				if(totalEnergy <= 0){
					endGame(1);
				}
			})
		})
	},

	generateSmallEnemy : function(idx){
		var virus = document.createElement("a-entity");
		virus.setAttribute("obj-model","obj: #small-virus-obj; mtl: #small-virus-mtl");
		virus.setAttribute("class","smallenemy virus");
		virus.setAttribute("data-type", "small");
		virus.setAttribute("data-power", "10");
		virus.setAttribute("scale","0.04 0.04 0.04");
		virus.setAttribute("animation__spawn" + idx,{"property" : "position", "pauseEvents": "hitstart", "resumeEvents" : "hitend", "startEvents" : "spawnEnemy","to" : "0 0 0", "dur" : "6000"});
		virus.id = "small" + idx;
		virus.setAttribute("data-index",idx);
		return virus;
	},

	generateMediumEnemy : function(idx){
		var virus = document.createElement("a-entity");
		virus.setAttribute("obj-model","obj: #medium-virus-obj; mtl: #medium-virus-mtl");
		virus.setAttribute("class","mediumenemy virus");
		virus.setAttribute("data-type", "medium");
		virus.setAttribute("data-power", "60");
		virus.setAttribute("scale","0.06 0.06 0.06");
		virus.setAttribute("animation__spawn" + idx,{"property" : "position", "pauseEvents": "hitstart", "resumeEvents" : "hitend", "startEvents" : "spawnEnemy","to" : "0 0 0", "dur" : "7000"});
		virus.id = "medium" + idx;
		virus.setAttribute("data-index",idx);
		return virus;
	},

	generateBossEnemy : function(idx){
		var virus = document.createElement("a-entity");
		virus.setAttribute("collada-model","#boss-virus-obj");
		virus.setAttribute("class","bossenemy virus");
		virus.setAttribute("data-type", "boss");
		virus.setAttribute("data-power", "100");		
		virus.setAttribute("scale","1 1 1");
		virus.setAttribute("animation__spawn" + idx,{"property" : "position", "pauseEvents": "hitstart", "resumeEvents" : "hitend", "startEvents" : "spawnEnemy","to" : "0 0 0", "dur" : "9000"});
		virus.id = "boss" + idx;
		virus.setAttribute("data-index",idx);
		return virus;
	},

})
var getRandomArbitrary = function(min, max) {
  return Math.random() * (max - min) + min;
}

var getRandomInteger = function(min, max){
	min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var endGame = function(code){
	gameRunning = false;
	switch(code){
		case 0:
			msg = "You are dead."
			break;
		case 1:
			msg = "No energy left."
			break;
		case 3:
			msg = "All enemies killed."
			break;
	}
	var gameover = document.getElementById("gameover");
	gameover.setAttribute("visible",true);
	gameover.setAttribute("value", msg);
	clearInterval(spawningAgent);
	if(code == 3){
		window.localStorage.setItem("totalscore", totalEnergy);
		window.location = "ending.html";
	}
}

