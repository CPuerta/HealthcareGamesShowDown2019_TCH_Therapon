let  engine, scene, camera,  surface,canvas
var font = "bold 9px monospace";
var myDynamicTexture;
var _initializedGame= false;
var _guiInitialized=false;
var buttonPanel;
var textPanel;
var textbox ;
var advancedTexture;
var _conversationStarted=false;
const modelFile5 = 'MashPBR.glb';
const modelFile1 = 'a_jellykid_idle.glb';
const modelFile2 = 'a_masher_spin.glb';
const blitzmodel = 'blitz_temp.glb';
const pumpModel = 'PumpPBR_Teal.glb';//mat is on meshes[2]
const orbModel= 'OrbPBR.glb';//mat is on meshes[2]
const orbBusted= 'OrbPBR_Damage_4.glb';
const squid1= "skl_squidboi_1.glb";
const squid2= "skl_squidboi_2.glb";
var assetsManager;
var masher;
var masherMesh;
var masherReady=false;
var blitz;
var blitzReady;
var convo;
var convoIndex=0;
var pumpID;
var egg=[];

const GameStates={
  CONVERSATION:'conversation',
  START:'start',
  CHOICESUP:'choicesup',
  TIMED:'timed',
  ORBMARKERSEARCH:'ORBMARKERSEARCH',
  PUMPMARKERSEARCH:'ORBMARKERSEARCH',
  CHILL:'CHILL',
  GAMESTART:'gamestart'

}
var gameState= GameStates.GAMESTART;
var eventMan;
var tScreen1;
var waterPumps= [];
var orbMeshes=[];
var stationMeshes=[];
var scriptList=[
  "script-day1-1-1.txt",
  "script-day1-1-2.txt",
  "script-day1-1-3.txt",
  "script-day1-2-1.txt",
  "script-day1-2-2.txt",
  "script-day12-1-1.txt",
  "script-day12-1-2.txt"

  // "script-day1-3-1.txt",
  // "script-day1-3-2.txt",
  // "script-day1-3-3.txt",
  // "script-day2-1-1.txt",
  // "script-day2-1-2.txt",
  // "script-day2-1-3.txt",
  // "script-day2-2-1.txt",
  // "script-day2-2-2.txt",
  // "script-day3-3-1.txt",
  // "script-day4-1-1.txt",
  // "script-day4-1-2.txt",
  // "script-day4-2-1.txt",
//  "script-day4-3-1.txt"
];
const initXrScene = ({ scene, camera }) => {
  //console.warn('initXrScene')
  const directionalLight = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 1), scene)
  directionalLight.intensity = 3.0

  //guI MESH FOR DEBUGGING
    // var guiMesh= BABYLON.Mesh.CreatePlane("plane",5);
    // guiMesh.position.y=3;
    // guiMesh.position.z=2;
     myDynamicTexture = new BABYLON.DynamicTexture("debugMat",  {width:512, height:256}, scene);
     //mat for debugging
     var myMaterial = new BABYLON.StandardMaterial("Mat", scene);
     myDynamicTexture.drawText(canvas.width+ " "+ canvas.height, 50, 135, font, "green", "white", true, true);
     myMaterial.diffuseTexture = myDynamicTexture;
//     guiMesh.material = myMaterial;
     //SAVE THIS SECTION FOR PRACTICE
   // BABYLON.SceneLoader.LoadAssetContainer( './',modelFile5, scene, function (container){
   //  try{
   //    console.log("babylon2");
   //    var containerTest = container;
   //    container.meshes[0]._scaling= new BABYLON.Vector3(1,1, 1);
   //     container.meshes[0].position = new BABYLON.Vector3(0, 0.25, -1);
   //     container.meshes[0].rotation= new BABYLON.Vector3(0,180,0);
   //    // myDynamicTexture.drawText(container.meshes, 50, 135, font, "yellow", "white", true, true);
   //     // container.meshes[4]position.z-=.2;
   //    //container.meshes[3].material.diffuseTexture=new BABYLON.Texture("jellykid_e_5.png", scene);
   //
   //    //log.innerHTML=container.meshes[3].material.diffuseTexture;
   //    //var eyes =container.getChildByName("eyes1");
   //    //log.innerHTML=container.meshes;
   //    //container.meshes[2].material.diffuseColor =  BABYLON.Color3.Blue();
   //
   //    //scene.beginAnimation(container.skeletons[0], 0, 100, true, 0.8);
   //    container.addAllToScene();
   //  }
   //  catch (err) {myDynamicTexture.drawText(err, 50, 135, font, "red", "white", true, true);}
   //
   // });


  soundTest = new BABYLON.Sound("Music", "bell_large_ringing_01.wav", scene, null, { loop: false, autoplay: false });
  particleSystem = new BABYLON.ParticleSystem("particles", 100, scene);
  //Texture of each particle
  particleSystem.particleTexture = new BABYLON.Texture("./2D/Particles/Bubbles/PB_Iridescent_Weak_Rim_Strong.png", scene);
  particleSystem.emitter = new BABYLON.Vector3(0, 0, 0); // the starting object, the emitter
  particleSystem.minEmitBox = new BABYLON.Vector3(-0.5, -0.5, -0.5); // Starting all from
  particleSystem.maxEmitBox = new BABYLON.Vector3(0.5, 0.5, 0.5); // To...
  particleSystem.textureMask = new BABYLON.Color4(0.1, 0.8, 0.8, 1.0);

  //particleSystem.start();saved for later

//setting up buttom UI
  advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
     textPanel = new BABYLON.GUI.StackPanel();
     textPanel.width = canvas.width;
     textPanel.fontSize = "14px";
     textPanel.height = "100px";
     textPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
     textPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
     advancedTexture.addControl(textPanel);


 var label = new BABYLON.GUI.Rectangle("Text box");
         label.backgrmound = "black"
         label.height = "100px";
         label.alpha = 1;
         label.width =canvas.width;
         label.cornerRadius = 20;
         label.thickness = 1;
         label.linkOffsetY = 30;
         label.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
         advancedTexture.addControl(label);
 //
 try{ tScreen1 = new BABYLON.GUI.Image("Title", "./2D/TitleScreen/TitleScreen.png");
          //image.height = "200px";
           // image.alpha = 0.7;
        //  tScreen1.width = canvas.width
        //  tScreen1.populateNinePatchSlicesFromImage = true;
          tScreen1.stretch = BABYLON.GUI.Image.STRETCH_NONE;
         //tScreen1.cornerRadius = 20;
          //tScreen1.thickness = 1;
        //  tScreen1.linkOffsetY = 30;
          tScreen1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
          advancedTexture.addControl(tScreen1);
     }
 catch(e){    myDynamicTexture.drawText(e, 50, 135, font, "red", "white", true, true); }



 var image = new BABYLON.GUI.Image("GUI Box", "./2D/GUI/ui_dialogue_box.png");
             //image.height = "200px";
          // image.alpha = 0.7;
             image.width = canvas.width-50;
             image.populateNinePatchSlicesFromImage = true;
             //image.stretch = BABYLON.GUI.Image.STRETCH_NONE;
              image.cornerRadius = 20;
              image.thickness = 1;
             image.linkOffsetY = 30;
              image.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
           label.addControl(image);

     buttonPanel = new BABYLON.GUI.StackPanel();
     buttonPanel.width = canvas.width/3;
     buttonPanel.fontSize = "14px";
     buttonPanel.height = "200px";
     buttonPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
     buttonPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
     advancedTexture.addControl(buttonPanel );
    buttonPanel.isVisible=false;
    textbox = new BABYLON.GUI.TextBlock();
         textbox.text = "Slider:";
         textbox.textWrapping=true;
         textbox.color ="purple"
         textbox.width="350px";
         textbox.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER
         //header.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
         label.addControl(textbox);





  if(!_initializedGame){
    textbox.text="Please find the image target provided"
  }

  var music = new BABYLON.Sound("Music","./Audio/BGM/ThinkinTinks.wav", scene, null, { loop: true, autoplay: true,volume:.3 });
 camera.position = new BABYLON.Vector3(0, 3, -5)
}

const placeObjectTouchHandler = (e) => {
  // Call XrController.recenter() when the canvas is tapped with two fingers. This resets the
  // AR camera to the position specified by XrController.updateCameraProjectionMatrix() above.
  //myDynamicTexture.drawText(e.touches[0].clientX+ " " +e.touches[0].clientY +" " + e.touches.length, 50, 135, font, "green", "white", true, true);

    if (e.touches.length == 2) {
    XR.XrController.recenter()
  }

    if (e.touches.length > 2) {
      return
    }

  const pickResult = scene.pick(e.touches[0].clientX, e.touches[0].clientY);


  switch (gameState) {
    case GameStates.START:
      //nothing for now
      //bubbles would prob be handled here
      break;
    case GameStates.CHOICESUP:

      break;
    case GameStates.CONVERSATION:
      if(_conversationStarted){
        myDynamicTexture.drawText("nextline", 50, 135, font, "red", "white", true, true);
          try{convo.nextLine();}catch(e){myDynamicTexture.drawText(e, 50, 135, font, "red", "white", true, true);
}
      }

      break;
    case GameStates.TIMER:

      break;
    case GameStates.MARKERSEARCH:

      break;
    case GameStates.GAMESTART:
      gameState=GameStates.START;
      tScreen1.isVisible=false;
      //turn off UI START;
      break;

    default:

  }

//  myDynamicTexture.drawText("touch", 50, 135, font, "blue", "white", true, true);

    //&& pickResult.pickedMesh == surface


}


const startScene = () => {
  console.log("XXXXXXXXXXXXXXstartScene")
  canvas = document.getElementById('renderCanvas')
  document.getElementById("timerGIF").style.display = "none";
  document.getElementById("conceptArt").style.display = "none";
  engine = new BABYLON.Engine(canvas, true, { stencil: true, preserveDrawingBuffer: true })
  engine.enableOfflineSupport = false

  scene = new BABYLON.Scene(engine)
  camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, 0), scene)

  initXrScene({ scene, camera }) // Add objects to the scene and set starting camera position.

  // Connect the camera to the XR engine and show camera feed
  camera.addBehavior(XR.Babylonjs.xrCameraBehavior(),true)

  canvas.addEventListener('touchstart', placeObjectTouchHandler, true);  // Add touch listener.
  //scene.debugLayer.show();
  //var loader =  new BABYLON.AssetsManager(this.scene);
  assetsManager = new BABYLON.AssetsManager(scene);
  eventMan= new EventManager();
  engine.runRenderLoop(() => {
    // Animate box rotation

    // Render scene
    scene.render()
  })
  //setting up callbacck once a targetImage has been built
  scene.onXrImageFoundObservable.add(e => {
   ImageFound(e)

  });
  scene.onXrImageUpdatedObservable.add(e => {
    // try{
    //   if(_initializedGame){
    //     masher.StayOnTrack(e);
    //
    //   }
    // }
    // catch(e){myDynamicTexture.drawText(er, 50, 135, font, "red", "white", true, true);}
  });
  window.addEventListener('resize', () => {
    engine.resize()
  })
}

//function to handle logic
const ImageFound=(e)=>{
  myDynamicTexture.drawText(gameState+ e.name, 50, 135, font, "red", "white", true, true);

  if (e.name=="BlitzTarget" && _initializedGame==false&& gameState==GameStates.START){
    //state logic

    if(!_guiInitialized){
       _guiInitialized=true;
       var button1 = BABYLON.GUI.Button.CreateSimpleButton("Game initial Yes", "Yes");
            button1.width = 0.2;
            button1.height = "40px";
            button1.color = "white";
            button1.cornerRadius = 20;
            button1.background = "green";
            button1.onPointerUpObservable.add(function() {

              if(!_initializedGame){
                _initializedGame=true;
                 myDynamicTexture.drawText("responce", 50, 135, font, "red", "white", true, true)
               try{
                  blitz.Spawn();
                  myDynamicTexture.drawText("spwn", 50, 135, font, "red", "white", true, true)
                  convo= new ConversationController("script-day1-1-1.txt",textbox,myDynamicTexture,scene,blitz);
                  convo.LoadScript();
                  textbox.text="loading...";
                  var timer = new Timer(4000, scene, function() {
                   convo.parceScript();
                   try{convo.start();}catch(e){myDynamicTexture.drawText(e+"convostart", 50, 135, font, "red", "white", true, true)}
                     _conversationStarted=true;
                  });
                  timer.start();
                // //  button2.isVisible=false;
                  //button1.isVisible=false;
                  button1.dispose();
                  button2.dispose();
              }
              catch(e){myDynamicTexture.drawText(e+ " text start", 50, 135, font, "red", "white", true, true)}
              }
            });
            buttonPanel.addControl(button1);

        var button2 = BABYLON.GUI.Button.CreateSimpleButton("Game initial No", "No");
                button2.width = 0.2;
                button2.height = "40px";
                button2.color = "white";
                button2.cornerRadius = 20;
                button2.background = "green";
                button2.onPointerUpObservable.add(function() {
                  textbox.text="Please go home and scan again"
                  buttonPanel.isVisible=false;
                });
                buttonPanel.addControl(button2);
        }
    buttonPanel.isVisible=true;
    // myDynamicTexture.drawText(e.position.x+"  "+e.rotation, 50, 135, font, "blue", "white", true, true);

    blitz = new Blitz(e.position,e.scale,e.rotation,myDynamicTexture,scene);
    //_initializedGame=true;
    textbox.text= "Are you at home?"
//  guiMesh.position.z=10;
  }
  else if(e.name=="MasherTarget"&& masherReady==false){
    try{
      masherReady=true;
      masher= new Masher(e.position,e.scale,e.rotation,myDynamicTexture,scene);
        masher.Spawn();
    }
    catch(e){myDynamicTexture.drawText(e, 50, 135, font, "red", "white", true, true);}
  }

  if(e.name=="OrbTarget" && gameState==GameStates.ORBMARKERSEARCH){
  //  myDynamicTexture.drawText("orbMarker", 50, 135, font, "red", "white", true, true);
  gameState=GameStates.CHILL;
 textbox.text="loading..."
    try{waterPumps[pumpID].Spawn(e);}catch(er){ myDynamicTexture.drawText(er, 50, 135, font, "red", "white", true, true);}
  }
  if(e.name=="PumpTarget" && gameState==GameStates.PUMPMARKERSEARCH){
  //  myDynamicTexture.drawText("orbMarker", 50, 135, font, "red", "white", true, true);
    textbox.text="loading..."

    try{  waterPumps[pumpID].ChangeState(PumpStates.ORBBUILD);}catch(er){ myDynamicTexture.drawText(er, 50, 135, font, "red", "white", true, true);}
  //  gameState=GameStates.CHILL;
  }
}

const onxrloaded = () => {
  XR.addCameraPipelineModules([  // Add camera pipeline modules.
    XRExtras.AlmostThere.pipelineModule(),       // Detects unsupported browsers and gives hints.
    XRExtras.FullWindowCanvas.pipelineModule(),  // Modifies the canvas to fill the window.
    XRExtras.Loading.pipelineModule(),           // Manages the loading screen on startup.
    XRExtras.RuntimeError.pipelineModule(),      // Shows an error image on runtime error.
  ])

  startScene()
}

const loadNextScript=()=>{
  textbox.text=""

  convoIndex++;
  convo=undefined;//clear conversation
  delete(convo);
  if(convoIndex>=scriptList.length){//no more scripts
    return;
  }
  if(masherReady)//if masher has been made convo will need reference
    convo= new ConversationController(scriptList[convoIndex],textbox,myDynamicTexture,scene,blitz,masher);
  else
    convo= new ConversationController(scriptList[convoIndex],textbox,myDynamicTexture,scene,blitz);
  textbox.text="loading..."
  convo.LoadScript();

  var timer = new Timer(2000, scene, function() {
    convo.parceScript();
    gameState=GameStates.CONVERSATION;
    _conversationStarted=true;
    try{convo.start();} catch(e){myDynamicTexture.drawText(e+"convo restart", 50, 135, font, "red", "white", true, true);}
  });
  timer.start();
}

const loadTimeJump=()=>{
    try{     for (var i = 0; i <egg.length; i++) {
      egg[i].setEnabled(false);
      }
} catch (er) {myDynamicTexture.drawText(er+"egg", 50, 135, font, "red", "white", true, true);}

//orb set1
  try{
        BABYLON.SceneLoader.LoadAssetContainer( './Models/WaterPump/',orbModel, scene, function (container)
        {
          try{ myDynamicTexture.drawText("LoadAssetContainer", 50, 135, font, "blue", "white", true, true);
            container.meshes[0].scaling= new BABYLON.Vector3(.1,.1, .1);
            container.meshes[0].position = new BABYLON.Vector3(orbMeshes[pumpID-1].position.x-7,orbMeshes[pumpID-1].position.y,orbMeshes[pumpID-1].position.z);
           //  container.meshes[0].rotation= new BABYLON.Vector3(0,180,0);
           container.meshes[1].material.metallic=.5;

           //scene.beginAnimation(container.skeletons[0], 0, 100, true, 0.8);
           container.addAllToScene();
          } catch (er) {myDynamicTexture.drawText(er, 50, 135, font, "red", "white", true, true);}

          });
     }  catch (er) {myDynamicTexture.drawText(er+"set1 o", 50, 135, font, "red", "white", true, true);}
  try{
        BABYLON.SceneLoader.LoadAssetContainer( './Models/WaterPump/',pumpModel, scene, function (container)
        {
          try{ myDynamicTexture.drawText("LoadAssetContainer", 50, 135, font, "blue", "white", true, true);
            container.meshes[0].scaling= new BABYLON.Vector3(.012,.012, .012);
            container.meshes[0].position = new BABYLON.Vector3(orbMeshes[pumpID-1].position.x-7,orbMeshes[pumpID-1].position.y+2.55,orbMeshes[pumpID-1].position.z);
           //  container.meshes[0].rotation= new BABYLON.Vector3(0,180,0);
           //  //con= container;
           container.meshes[1].material.metallic=.5;

           //scene.beginAnimation(container.skeletons[0], 0, 100, true, 0.8);
           container.addAllToScene();
          } catch (er) {myDynamicTexture.drawText(er, 50, 135, font, "red", "white", true, true);}

          });
     }  catch (er) {myDynamicTexture.drawText(er+"set1 p", 50, 135, font, "red", "white", true, true);}

  //   set 2 BUSTED
     try{
           BABYLON.SceneLoader.LoadAssetContainer( './Models/WaterPump/',orbBusted, scene, function (container)
           {
             try{ myDynamicTexture.drawText("LoadAssetContainer", 50, 135, font, "blue", "white", true, true);
               container.meshes[0].scaling= new BABYLON.Vector3(.1,.1, .1);
               container.meshes[0].position = new BABYLON.Vector3(orbMeshes[pumpID-1].position.x+6,orbMeshes[pumpID-1].position.y,orbMeshes[pumpID-1].position.z+4);
              //  container.meshes[0].rotation= new BABYLON.Vector3(0,180,0);
              //  //con= container;
              container.meshes[1].material.metallic=.5;

              //scene.beginAnimation(container.skeletons[0], 0, 100, true, 0.8);
              container.addAllToScene();
             } catch (er) {myDynamicTexture.drawText(er, 50, 135, font, "red", "white", true, true);}

             });
        }  catch (er) {myDynamicTexture.drawText(er+"set2 o", 50, 135, font, "red", "white", true, true);}
     // try{
     //       BABYLON.SceneLoader.LoadAssetContainer( './Models/WaterPump/',pumpModel, scene, function (container)
     //       {
     //         try{ myDynamicTexture.drawText("LoadAssetContainer", 50, 135, font, "blue", "white", true, true);
     //           container.meshes[0].scaling= new BABYLON.Vector3(.012,.012, .012);
     //           container.meshes[0].position = new BABYLON.Vector3(orbMeshes[pumpID-1].position.x+6,orbMeshes[pumpID-1].position.y+2.55,orbMeshes[pumpID-1].position.z+4);
     //          //  container.meshes[0].rotation= new BABYLON.Vector3(0,180,0);
     //          //  //con= container;
     //          container.meshes[1].material.metallic=.5;
     //
     //          //scene.beginAnimation(container.skeletons[0], 0, 100, true, 0.8);
     //          container.addAllToScene();
     //         } catch (er) {myDynamicTexture.drawText(er, 50, 135, font, "red", "white", true, true);}
     //
     //         });
     //    }  catch (er) {myDynamicTexture.drawText(er+"set2 p", 50, 135, font, "red", "white", true, true);}
    //SET 3 BUSTED
    try{
        BABYLON.SceneLoader.LoadAssetContainer( './Models/WaterPump/',orbBusted, scene, function (container)
          {
            try{ myDynamicTexture.drawText("LoadAssetContainer", 50, 135, font, "blue", "white", true, true);
            container.meshes[0].scaling= new BABYLON.Vector3(.1,.1, .1);
            container.meshes[0].position = new BABYLON.Vector3(orbMeshes[pumpID-1].position.x-3,orbMeshes[pumpID-1].position.y,orbMeshes[pumpID-1].position.z+3);
            //  container.meshes[0].rotation= new BABYLON.Vector3(0,180,0);
            //  //con= container;
            container.meshes[1].material.metallic=.5;
            //scene.beginAnimation(container.skeletons[0], 0, 100, true, 0.8);
            container.addAllToScene();
            } catch (er) {myDynamicTexture.drawText(er, 50, 135, font, "red", "white", true, true);}

          });
        }  catch (er) {myDynamicTexture.drawText(er+"set3 o", 50, 135, font, "red", "white", true, true);}
    // try{
    //     BABYLON.SceneLoader.LoadAssetContainer( './Models/WaterPump/',pumpModel, scene, function (container)
    //       {
    //         try{ myDynamicTexture.drawText("LoadAssetContainer", 50, 135, font, "blue", "white", true, true);
    //         container.meshes[0].scaling= new BABYLON.Vector3(.012,.012, .012);
    //         container.meshes[0].position = new BABYLON.Vector3(orbMeshes[pumpID-1].position.x-3,orbMeshes[pumpID-1].position.y+2.55,orbMeshes[pumpID-1].position.z+3);
    //         //  container.meshes[0].rotation= new BABYLON.Vector3(0,180,0);
    //         //  //con= container;
    //         container.meshes[1].material.metallic=.5;
    //         //scene.beginAnimation(container.skeletons[0], 0, 100, true, 0.8);
    //         container.addAllToScene();
    //         } catch (er) {myDynamicTexture.drawText(er, 50, 135, font, "red", "white", true, true);}
    //
    //       });
    //    }  catch (er) {myDynamicTexture.drawText(er+"set3 p", 50, 135, font, "red", "white", true, true);}

    //squid bois
    try{
        BABYLON.SceneLoader.LoadAssetContainer( './Models/Squidbois/',squid1, scene, function (container)
          {
            try{ myDynamicTexture.drawText("LoadAssetContainer", 50, 135, font, "blue", "white", true, true);
            container.meshes[0].scaling= new BABYLON.Vector3(2.5,2.5,2.5);
            container.meshes[0].position = new BABYLON.Vector3(orbMeshes[pumpID-1].position.x-2,orbMeshes[pumpID-1].position.y,orbMeshes[pumpID-1].position.z-1);
            //  container.meshes[0].rotation= new BABYLON.Vector3(0,180,0);
            //  //con= container;
            //container.meshes[1].material.metallic=.5;
            scene.beginAnimation(container.skeletons[0], 0, 100, true, 0.8);
            container.addAllToScene();
            } catch (er) {myDynamicTexture.drawText(er, 50, 135, font, "red", "white", true, true);}

          });
       }  catch (er) {myDynamicTexture.drawText(er+"sqid1", 50, 135, font, "red", "white", true, true);}
   try{
       BABYLON.SceneLoader.LoadAssetContainer( './Models/Squidbois/',squid2, scene, function (container){
           try{ myDynamicTexture.drawText("LoadAssetContainer", 50, 135, font, "blue", "white", true, true);
           container.meshes[0].scaling= new BABYLON.Vector3(2.5,2.5,2.5);
           container.meshes[0].position = new BABYLON.Vector3(orbMeshes[pumpID-1].position.x+2,orbMeshes[pumpID-1].position.y,orbMeshes[pumpID-1].position.z-1);
           //  container.meshes[0].rotation= new BABYLON.Vector3(0,180,0);
           //  //con= container;
           //container.meshes[1].material.metallic=.5;
           scene.beginAnimation(container.skeletons[0], 0, 100, true, 0.8);
           container.addAllToScene();
           } catch (er) {myDynamicTexture.drawText(er, 50, 135, font, "red", "white", true, true);}

         });
      }  catch (er) {myDynamicTexture.drawText(er+"squid2", 50, 135, font, "red", "white", true, true);}
//  try{      egg.isVisible(false);} catch (er) {myDynamicTexture.drawText(er+"egg", 50, 135, font, "red", "white", true, true);}


   //  BABYLON.SceneLoader.LoadAssetContainer( '../Models/Masher/',modelFile2, scene, function (container){
   //   try{
   //     //myDynamicTexture.drawText("LoadAssetContainer", 50, 135, font, "blue", "white", true, true);
   //     container.meshes[0]._scaling.set(.1,.1,.1);
   //
   //      container.meshes[0].position = new BABYLON.Vector3(egg[0].position.x,egg[0].position.y, egg[0].position.z);
   //      container.meshes[0].rotation= new BABYLON.Vector3(0,180,0);
   //
   //    //   scene.beginAnimation(container.skeletons[0], 0, 100, true, 0.8);
   //    // masher.ready=true;
   //     container.addAllToScene();
   //
   //   }
   //   catch (err) {myDynamicTexture.drawText(err, 50, 135, font, "red", "white", true, true);}
   //
   // });

  return;
}


const load = () => { XRExtras.Loading.showLoading({onxrloaded}) }
window.onload = () => { window.XRExtras ? load() : window.addEventListener('xrextrasloaded', load) }
