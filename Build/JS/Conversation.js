//const fs = require('fs') ;
//var XMLHttpRequest = require("xhr2");
var unparcedtext;
var scriptloc= '../Scripts/';
//var Line= makeStruct("character emotion animation dialogue");
ConversationController = function(script,textbox,myDynamicTexture,scene,char1,char2 ){//loc1,loc2,char1,char2
  //
  myDynamicTexture.drawText("making covo", 50, 135, font, "red", "white", true, true);
  //myDynamicTexture.drawText("text", 50, 135, font, "red", "white", true, true)
    unparcedtext=undefined;
    delete(unparcedtext);
    this.scriptname=script;
    this.script= null;
    //this.textbox=textbox;
    this.lineIndex=0;
    //textbox.text="jello";
    this.char1= char1;
    if(char2!=null)
      this.char2=char2;

//  myDynamicTexture.drawText("setting states", 50, 135, font, "red", "white", true, true);

}
ConversationController.prototype.LoadScript = function (){

//   try{
  var script=scriptloc.concat(this.scriptname);
    myDynamicTexture.drawText(this.scriptname, 50, 135, font, "red", "white", true, true)
  try{
    var textTask = assetsManager.addTextFileTask("text task", "./../Scripts/"+this.scriptname);
    textTask.onSuccess = function(task) {
      unparcedtext=textTask.text;//on asset loaded, store the text;
      myDynamicTexture.drawText(unparcedtext, 50, 135, font, "red", "white", true, true)

    }
    assetsManager.load();

  }catch(e){myDynamicTexture.drawText(e+"script loading", 50, 135, font, "red", "white", true, true);}
//foreach(line)
//parcedline= lines_parceby(_)
//line= new line(parcedline[0],...)
//lines.addline
//this.script=lines
};

ConversationController.prototype.parceScript= function(){
//  myDynamicTexture.drawText("hello", 50, 135, font, "red", "white", true, true);

  try{
       var parcedText = unparcedtext.split("/n");
      // myDynamicTexture.drawText("parcing", 50, 135, font, "red", "white", true, true)

    var lines=[];
    for (var i = 0; i < parcedText.length; i++) {
      var line=parcedText[i].split("_")
      lines.push(line);
    }
    this.script =lines;
  }
  catch(err){  myDynamicTexture.drawText(err+" parcing", 50, 135, font, "red", "white", true, true);}
  myDynamicTexture.drawText(this.script, 50, 135, font, "red", "white", true, true)

  };
//
ConversationController.prototype.start=function(){
  // //#_character_emotion_pose/animarion_line
//get first line
  var textout = "";
  var currentLine=this.script[0];
  //myDynamicTexture.drawText(currentLine[4], 50, 135, font, "green", "white", true, true)

  var cnt = 0;
  this.lineIndex = 0;
  while( (currentLine[0].trim()[0]+currentLine[0].trim()[1])== "//"){
   //myDynamicTexture.drawText("line ignored", 50, 135, font, "green", "white", true, true)

     this.lineIndex++;
     cnt++;
     currentLine = this.script[this.lineIndex];
     textout += currentLine + "/n";
     //myDynamicTexture.drawText(currentLine[3] + "-" + this.lineIndex + ":" + textout, 50, 135, font, "green", "white", true, true);

  }
//get char names
  var charname=currentLine[1];

//   //idenify which character
  if(charname==this.char1.getName()){
//   //  myDynamicTexture.drawText(this.char1.getName(), 50, 135, font, "red", "white", true, true)
    this.char1.setFace(currentLine[2]);
//     //this.char1.setAnimation(currentLine[3]);
  }//  this.char1.MoveTo(this.char1loc)
  //else  if(this.char2!=null&& this.char2.getName()){
  //  this.char2.setFace(currentLine[2]);
//    this.char2.setAnimation(currentLine[3]);
  //}
  //myDynamicTexture.drawText(currentLine[3], 50, 135, font, "red", "white", true, true)
  if(currentLine[5]!="none"){
    myDynamicTexture.drawText(currentLine[5], 50, 135, font, "red", "white", true, true)

    try{this.char1.PlaySounds(currentLine[5])
    }
    catch(e){myDynamicTexture.drawText(e+"soundStart", 50, 135, font, "red", "white", true, true)}
  }
  gameState=GameStates.CONVERSATION;

  textbox.text=currentLine[4];

};

ConversationController.prototype.nextLine=function(line){//
  var currentLine;
  myDynamicTexture.drawText("next line start "+ this.lineIndex, 50, 135, font, "red", "white", true, true)

  if(line==null){
    myDynamicTexture.drawText("no value", 50, 135, font, "red", "white", true, true)

    this.lineIndex++;
   currentLine=this.script[this.lineIndex];
   myDynamicTexture.drawText(this.lineIndex, 50, 135, font, "red", "white", true, true)
   try {
     while( (currentLine[0].trim()[0]+currentLine[0].trim()[1])== "//"){
      this.lineIndex++;
      currentLine=this.script[this.lineIndex];
      myDynamicTexture.drawText("skipping lines", 50, 135, font, "red", "white", true, true)

      }
   } catch (e) {
     myDynamicTexture.drawText(e, 50, 135, font, "red", "white", true, true)

   }

  }else{
   myDynamicTexture.drawText(this.script[line], 50, 135, font, "red", "white", true, true)
    var currentLine=this.script[line];
    this.lineIndex=line;
    while( (currentLine[0].trim()[0]+currentLine[0].trim()[1])== "//"){
     this.lineIndex++;
    currentLine=this.script[this.lineIndex];

   }
  }
  myDynamicTexture.drawText("b4 endcheck "+ this.lineIndex, 50, 135, font, "red", "white", true, true)

  if(this.lineIndex>=this.script.length){
    myDynamicTexture.drawText("ending ", 50, 135, font, "red", "white", true, true)
    loadNextScript();
    _conversationStarted=false;
    textbox.text="";
    return;
  }
  myDynamicTexture.drawText("b4 EventTrigger "+ this.lineIndex, 50, 135, font, "red", "white", true, true)

  if(currentLine[0].trim()=="EventTrigger"){
    //myDynamicTexture.drawText("event", 50, 135, font, "red", "white", true, true);
    eventMan.processEvent(currentLine[1]);
    return;
  }


  //myDynamicTexture.drawText(currentLine+" "+ line, 50, 135, font, "red", "white", true, true)
//get char names  //identify which character

  var charname=currentLine[1];
  if(charname==this.char1.getName()){
    myDynamicTexture.drawText("this.char1.getName()", 50, 135, font, "red", "white", true, true)
    this.char1.setFace(currentLine[2]);
    //myDynamicTexture.drawText("loading face", 50, 135, font, "red", "white", true, true)

    //this.char1.setAnimation(currentLine[3]);
    }
  if(currentLine[5]!="none"){
    myDynamicTexture.drawText(currentLine[5], 50, 135, font, "red", "white", true, true)

    try{this.char1.PlaySounds(currentLine[5])
    }
    catch(e){myDynamicTexture.drawText(e+"soundStart", 50, 135, font, "red", "white", true, true)}
  }

  if(currentLine[6]!=null&& currentLine[6].trim(0)!="none"){
    myDynamicTexture.drawText(currentLine[6], 50, 135, font, "blue", "white", true, true)
    setUpChoice(currentLine[6]);
    gameState=GameStates.CHOICESUP;
  }
  else {
    gameState=GameStates.CONVERSATION;
  //  myDynamicTexture.drawText("no choices", 50, 135, font, "red", "white", true, true)

    if(line!="none"&&currentLine[7]=="true"){//jump to indicated line
      var nextlineii=currentLine[8];
      this.lineIndex=Number(nextlineii)-1;
      myDynamicTexture.drawText(this.script[4], 50, 135, font, "blue", "white", true, true)

    }
  }

  // if(charname==this.char1.getName()){
  //   this.char1.setFace(currentLine[2]);
  //   this.char1.setAnimation(currentLine[3]);
  //
  // }//  this.char1.MoveTo(this.char1loc)
  // else  if(this.char2!=null&& this.char2.getName()){
  //   this.char2.setFace(currentLine[2]);
  //   this.char2.setAnimation(currentLine[3]);
  // }
  textbox.text=currentLine[4];
};


function setUpChoice(choices){
  var buttons=[];
  var choiceText=[];
  var choicenum=[];
  var choiceArr = choices.split(",");
    switch (choiceArr.length) {
      case 2:
      var choice1=choiceArr[0].split(":");

      var button1 = BABYLON.GUI.Button.CreateSimpleButton("player choice "+0, choice1[0]);
           button1.width = 0.2;
           button1.height = "40px";
           button1.color = "white";
           button1.cornerRadius = 20;
           button1.background = "green";
           button1.onPointerUpObservable.add(function() {
              for (var i = 0; i < buttons.length; i++) {
                buttons[i].dispose();
               }
              try{
                button1.textBlock.text="tttt";
              convo.nextLine(Number(choice1[1]));
              }
              catch(e){    myDynamicTexture.drawText(e, 50, 135, font, "red", "white", true, true)}

           });
           buttonPanel.addControl(button1);
           buttons.push(button1);


       var choice2=choiceArr[1].split(":");
       var button2 = BABYLON.GUI.Button.CreateSimpleButton("player choice "+1, choice2[0]);
            button2.width = 0.2;
            button2.height = "40px";
            button2.color = "white";
            button2.cornerRadius = 20;
            button2.background = "green";
            button2.onPointerUpObservable.add(function() {
               for (var i = 0; i < buttons.length; i++) {
                 buttons[i].dispose();
                }
               try{
                 //this.textBlock.text="tttt";
               convo.nextLine(Number(choice2[1]));
               }
               catch(e){    myDynamicTexture.drawText(e, 50, 135, font, "red", "white", true, true)}

            });
            buttonPanel.addControl(button2);
            buttons.push(button2);

        break;
     case 3:

          break;
    case 4:

          break;

      default:

    }




    return 0;

}
