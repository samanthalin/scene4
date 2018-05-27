AFRAME.registerComponent("virus-shooting",{
	init : function(){
		this.energybar = document.getElementById("energybar");
		this.energybar.setAttribute("value",totalEnergy);
		var controllers = {
			"rightHand" : document.getElementById("rightHand"),
      "leftHand" : document.getElementById("leftHand")
		}
		controllers.rightHand.addEventListener("menudown",function(){
			document.getElementById("scene6-intro").setAttribute("visible", false);
			var virus = document.querySelector("a-entity[data-index='0']");
			virus.emit("spawnEnemy");
		})
	}
})

// document.querySelector('a-scene').addEventListener('enter-vr', function () {
// 	var camera = document.querySelector("a-camera");
// 	camera.setAttribute("camera.userHeight","0 1.6 0");
// });