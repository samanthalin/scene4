var introover = false;
AFRAME.registerComponent("sun-shooting",{
  init : function(){
    this.totalSunShot = 9;
    this.scoreboard = document.getElementById("scoreboard");
    this.controllers = {
      "rightHand" : document.getElementById("rightHand"),
      "leftHand" : document.getElementById("leftHand")
    }
    this.sunwrapper = document.getElementById("sunwrapper");
    this.controllers.rightHand.addEventListener("menudown",this.manageIntro);
    var realSun = document.getElementById("real-sun");
    var scene2intro = document.getElementById("scene2-intro")
    var gameOver = document.getElementById("game-over")
    if(window.localStorage.getItem("dead") == "true"){
      realSun.setAttribute("color","red");
      scene2intro.setAttribute("visible","false");
      window.localStorage.removeItem("dead")
    }
    realSun.addEventListener("collide",function(){
      window.localStorage.setItem("dead", "true");
      gameOver.setAttribute("visible","true");
      introover = true;
    })
  },

  manageIntro : function(evt){
    if(introover == false){
      var scene2intro = document.getElementById("scene2-intro"),
          huds = document.getElementById("scene2-huds");
      scene2intro.setAttribute("visible","false");
      huds.setAttribute("visible","true");
    }else{
      window.location = "scene2.html"
    }
  }
})
// (function () {
//   // switch to stereoscopic mode directly on page load, this needs to be after the a-scene loads.
//   var scene = document.querySelector('a-scene');
//   if (scene.hasLoaded) {
//     scene.enterVR();
//   } else {
//     scene.addEventListener('loaded', function () {
//        setTimeout(function () {
//            scene.enterVR();
//        }, 1000);
//     });
//   };
// })();