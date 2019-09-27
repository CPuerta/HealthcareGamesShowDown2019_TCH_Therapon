//const fs = require('fs') ;
//var XMLHttpRequest = require("xhr2");
var text;

var scriptloc= '../Scripts/';
//var Line= makeStruct("character emotion animation dialogue");
ConversationController = function(script,textbox,myDynamicTexture,scene ){//loc1,loc2,char1,char2
  //
  //myDynamicTexture.drawText("making masher", 50, 135, font, "red", "white", true, true);
  //myDynamicTexture.drawText("text", 50, 135, font, "red", "white", true, true)

    this.scriptname=script;
    this.script= null;
    this.textbox=textbox;
    this.lineIndex=0;
    textbox.text="jello"


//  myDynamicTexture.drawText("setting states", 50, 135, font, "red", "white", true, true);

}
ConversationController.prototype.LoadScript = function (){

//   try{
    var script=scriptloc.concat(this.scriptname);
  //  myDynamicTexture.drawText(script, 50, 135, font, "red", "white", true, true)
try{

  var textTask = assetsManager.addTextFileTask("text task", "./../Scripts/scriptsample.txt");
textTask.onSuccess = function(task) {
  myDynamicTexture.drawText("hello", 50, 135, font, "red", "white", true, true);
  text=textTask.text;
}
assetsManager.load();
  // BABYLON.Tools.LoadFile("./../Scripts/scriptsample.txt", (data) => {
  //
  //       text=data;
  //   //  myDynamicTexture.drawText("hello"+text, 50, 135, font, "red", "white", true, true)
  // });
  //myDynamicTexture.drawText("hello"+this.script, 50, 135, font, "red", "white", true, true)


}catch(e){myDynamicTexture.drawText(e, 50, 135, font, "red", "white", true, true);}
// //character_emotion_pose/animarion_line
//foreach(line)
//parcedline= lines_parceby(_)
//line= new line(parcedline[0],...)
//lines.addline
//this.script=lines
};

ConversationController.prototype.parceScript= function(){
try{
     var parcedText = text.split("/n");
  var lines;
  for (var i = 0; i < parcedText.length; i++) {
    line=parcedText[i].split("_")
    myDynamicTexture.drawText(line, 50, 135, font, "red", "white", true, true)
    lines.push(line);
  }
  this.script =lines;
}
catch(err){  myDynamicTexture.drawText(err, 50, 135, font, "red", "white", true, true);}
};
