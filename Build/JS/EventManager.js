var artIndex=0;
var prev;
var artArr=[];
const EventTypes={
  TIMER:'timer'
}

var firsttimer=true;
EventManager = function( ){//loc1,loc2,char1,char2
  //pull art into the array
}


EventManager.prototype.processEvent = function (event){

  var eventType= event.split('-')
  myDynamicTexture.drawText(eventType[0], 50, 135, font, "red", "white", true, true);

  switch (eventType[0]) {
    case "HydrationCycle"://HydrationCycle-1-1
      //   document.getElementById("timerGIF").style.display = "blsock";
      //cycleArt();
      if(firsttimer){
            firsttimer=false;

            gameState=GameStates.TIMED
            document.getElementById("timerGIF").src="";
            document.getElementById("timerGIF").src="../Timer30.gif";

            document.getElementById("timerGIF").classList.remove("hidden");//removes the hidden class
            document.getElementById("timerGIF").style.display = "block";//reactivates the block
            textbox.text="";
            setTimeout(function(){
            loadNextScript();
            document.getElementById("timerGIF").style.display = "none";//reactivates the block
            document.getElementById("timerGIF").classList.add("hidden");//after timer the hidden class will be readded
          }, 26000);}
      else {
          gameState=GameStates.TIMED
          document.getElementById("timerGIF").src="";
          document.getElementById("timerGIF").src="../Timer30.gif";

          document.getElementById("timerGIF").classList.remove("hidden");//removes the hidden class
          document.getElementById("timerGIF").style.display = "block";//reactivates the block
          textbox.text="";
          setTimeout(function(){
          loadNextScript();
          document.getElementById("timerGIF").style.display = "none";//reactivates the block
          document.getElementById("timerGIF").classList.add("hidden");//after timer the hidden class will be readded
          }, 5000);
          }

      break;
    case "Go2WaterPump"://Go2WaterPump-1-1
      var pumpNum=Number(eventType[1]);
      pumpID=pumpNum;
      if(waterPumps[pumpNum]==null){
        waterPumps[pumpNum] = new WaterPump();
        textbox.text="Looking for the Orb AR Marker";
        gameState=GameStates.ORBMARKERSEARCH;

      }
      else{
        switch (Number(eventType[2])) {
          case 2:
            gameState=GameStates.PUMPMARKERSEARCH;
            textbox.text="Looking for the Pump AR Marker";
            break;
          case 3:
          textbox.text="Looking for the Pump AR 3Marker";

            waterPumps[pumpNum].ChangeState(PumpStates.ORBSTATIONNOPOWER);
            break;
          case 4:
          textbox.text="Looking for the Pump AR 4Marker";

            waterPumps[pumpNum].ChangeState(PumpStates.ORBSTATIONPOWER);
            break;

          default:
            textbox.text="Looking for ";

        }
      }
      break;
    case "BuildElectricRod":

      break;
    case "Prepforjump":

      break;
    case "PlayBGS":

      break;
    case "PlayBGM":

      break;
    case "StopBGM":

      break;
    case "FadeBGM":

      break;
    default:

  }
};
function cycleArt(){
  if (artIndex<artArr.length&& gameState!=GameStates.TIMER) {
    //hide all art
    return;
  }

  if(artIndex<artArr.length)
    artIndex=0;

  if(prev!=null)
      {//fade prev out
      }
    //change art
    //fade new in
    prev=artIndex;
    artIndex++;
  var timer = new Timer(4000, scene, function() {
    cycleArt();

  });
  timer.start();
}
