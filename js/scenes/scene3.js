AFRAME.registerComponent("room",{
	init : function(){
		var drMsg = document.getElementById("drMsg"),
				replaySection = document.getElementById("replay-section"),
				replayBtn = document.getElementById("replayBtn"),
    		closeBtn = document.getElementById("closeBtn"),
				drVideo = document.getElementById("dr-video"),
				box = document.getElementById("box-cover"),
				boxGrabber = document.getElementById("box-grabber"),
				marker = false,
				controllers = {
          "rightHand" : document.getElementById("rightHand"),
          "leftHand" : document.getElementById("leftHand")
        };
		setTimeout(function(){
			var audio = document.getElementById("ding");
			audio.play();
			marker = true;
			drMsg.setAttribute("visible","true");
		},5000);

		controllers.rightHand.addEventListener("menudown", function(){
			var drMsg = document.getElementById("drMsg");
			console.log(marker);
			if(marker){
				marker = false;
				var drVideo = document.getElementById("dr-video");
				var player = document.getElementById("video-player");
				var replaySection = document.getElementById("replay-section");
				replaySection.setAttribute("visible",false);
				player.setAttribute("visible",true);
				drMsg.setAttribute("visible",false);
				drVideo.play();
			}else{
				var replaySection = document.getElementById("replay-section")
				replaySection.setAttribute("visible","true");
			}
		});
		drVideo.onended = function(){
			var player = document.getElementById("video-player");
			player.setAttribute("visible",false);
			replaySection.setAttribute("visible",true);
			box.setAttribute("visible",true);
		}

		controllers.leftHand.addEventListener("menudown", function(){
			var drMsg = document.getElementById("drMsg");
			var drVideo = document.getElementById("dr-video");
			var player = document.getElementById("video-player");
			var replaySection = document.getElementById("replay-section");
			replaySection.setAttribute("visible",false);
			player.setAttribute("visible",true);
			drMsg.setAttribute("visible",false);
			drVideo.play();
		});
		boxGrabber.addEventListener("grab-start",function(){
			window.location = "scene4.html";
		})
	},

	playVideo : function(){
	
	}
})