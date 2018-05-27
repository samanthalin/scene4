var totalscore = 0;
var interval = null;
AFRAME.registerComponent("roof-top",{
	init : function(){
		var scoreboardDsplayed = false;
		var gameStarted = true;
		var score = {
			x : 0,
			y : 0,
			total : 0
		}
		var rotation = {x : 30, y: 105, z: 0};
		var horizontalRotateButton = document.getElementById("rotate-button");
		var verticalRotateButton = document.getElementById("vertical-rotate-button");
		var okButton = document.getElementById("ok-btn");

		// controllers.rightHand.addEventListener("menudown",function(){
		// 	var intro = document.getElementById("scene4-intro");
		// 	intro.setAttribute("visible", false);
		// 	gameStarted = true;
		// })
		var timeInterval = null;
		horizontalRotateButton.addEventListener("mouseenter",function(){

			if(!scoreboardDsplayed && gameStarted){ 
				timeInterval = setInterval(function(){
					rotation.x = rotation.x + 10;
					if(rotation.x == 360){
						rotation.x = 0;
					}
					var panels = document.querySelectorAll(".panel");
					var rightangle = document.getElementById("rightangle");
					rightangle.setAttribute("value", rotation.x + " degrees");
					panels.forEach(function(panel){
						panel.setAttribute("rotation",rotation);
					})
				},500);
			}
		})
		horizontalRotateButton.addEventListener("mouseleave",function(){
			clearInterval(timeInterval);
			timeInterval = null;
		})

		verticalRotateButton.addEventListener("mouseenter",function(){
			timeInterval = setInterval(function(){
				if(!scoreboardDsplayed && gameStarted){
					rotation.y = rotation.y + 5;
					if(rotation.y == 360){
						rotation.y = 0;
					}
					var panels = document.querySelectorAll(".panel");
					panels.forEach(function(panel){
						panel.setAttribute("rotation",rotation);
					})
				}
			},500)
		})
		verticalRotateButton.addEventListener("mouseleave",function(){
			clearInterval(timeInterval);
			timeInterval = null;
		})

		okButton.addEventListener("click",function(){
			if(gameStarted){
				console.log(rotation);
				var sun = document.getElementById("sun");
				scoreboardDsplayed = true;
				score.x = Math.ceil(Math.abs(185 - rotation.x) * 8.333);
				score.y = Math.ceil(Math.abs(180 - Math.abs(rotation.y - 0)) * 8.333);
				score.total = score.x + score.y;
				totalscore = score.total;
				interval = setInterval(function(){
					var sc = ((3000 - totalscore) * 100) / 3000;
					totalscore = totalscore - 200;
					var bar = document.getElementById("progress-bar");
						bar.emit("updateBar",{
							percentage : sc
					})
					if(totalscore <= 0){
						clearInterval(interval);
					}
				},1000)
				sun.addEventListener("animationcomplete",function(){
					var rightangle = document.getElementById("rightangle");
					var scoreboard = document.getElementById("scoreboard");
					scoreboard.setAttribute("value","Total Energy Collected : " + score.total + " / 3000");
					scoreboard.setAttribute("visible", true);
					rightangle.setAttribute("visible", false);
					var video = document.getElementById("drVideo");
					var player = document.getElementById("player");
					player.setAttribute("visible","true");
					video.play();
				})
				sun.emit("sunset");
				window.localStorage.setItem("energy", score.total);
			}
		})
	}
})