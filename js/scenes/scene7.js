AFRAME.registerComponent("room",{
	init : function(){
		var grandmaMsg = document.getElementById("grandmaMsg"),
				replaySection = document.getElementById("replay-section"),
				replayBtn = document.getElementById("replayBtn"),
    		closeBtn = document.getElementById("closeBtn"),
				drVideo = document.getElementById("dr-video"),
				grandmaVideo = document.getElementById("grandma-video"),
				box = document.getElementById("box-cover"),
				boxGrabber = document.getElementById("box-grabber"),
				step = 0,
				controllers = {
          "rightHand" : document.getElementById("rightHand"),
          "leftHand" : document.getElementById("leftHand")
        };

      controllers.rightHand.addEventListener("menudown", function(){
      	var drVideo = document.getElementById("dr-video");
      	var grandmaVideo = document.getElementById("grandma-video");
				var player = document.getElementById("video-player");
				var replaySection = document.getElementById("replay-section");
				var grandmaMsg = document.getElementById("grandmaMsg");
      	if(step == 0){
      		step++;
					replaySection.setAttribute("visible",false);
					player.setAttribute("visible",true);
					grandmaMsg.setAttribute("visible",false);
					drVideo.play();
				}else if(step == 1){
					step++;
					replaySection.setAttribute("visible",false);
					player.setAttribute("visible",false);
					grandmaMsg.setAttribute("visible", true);
				}else if(step == 2){
					step++;
					grandmaMsg.setAttribute("visible", false);
					player.setAttribute("src","#grandma-video");
					player.setAttribute("visible",true);
					grandmaVideo.play();
				}
			});
			drVideo.onended = function(){
				var player = document.getElementById("video-player");
				var replaySection = document.getElementById("replay-section");
				player.setAttribute("visible",false);
				replaySection.setAttribute("visible",true);
				box.setAttribute("visible",true);
			}

			grandmaVideo.onended = function(){
				var scoreboard = document.getElementById("scoreboard");
				var totalpoints = document.getElementById("totalpoints");
				scoreboard.setAttribute("visible","true");
				var score = window.localStorage.getItem("totalscore");
				totalpoints.setAttribute("value",score);
			}

			controllers.leftHand.addEventListener("menudown", function(){
				var drVideo = document.getElementById("dr-video");
				var player = document.getElementById("video-player");
				var replaySection = document.getElementById("replay-section");
				replaySection.setAttribute("visible",false);
				player.setAttribute("visible",true);
				drMsg.setAttribute("visible",false);
				drVideo.play();
			});
		}
})