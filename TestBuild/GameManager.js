let  engine, scene, camera,  surface,canvas
var font = "bold 7px monospace";
var myDynamicTexture;
var _initializedGame= false;
var buttonPanel;
var textPanel;
var textbox ;
var advancedTexture;
var _conversationStarted=false;
const modelFile5 = 'a_jellykid_idle.glb';
var assetsManager;
//image target Recognition
var masher;
var masherMesh;
var masherReady;
var index=0;

const initXrScene = ({ scene, camera }) => {
  //console.warn('initXrScene')
  const directionalLight = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 1), scene)
  directionalLight.intensity = 1.0

  //guI MESH FOR DEBUGGING
    var guiMesh= BABYLON.Mesh.CreatePlane("plane",3);
    guiMesh.position.y=2;
    guiMesh.position.z=10;
     myDynamicTexture = new BABYLON.DynamicTexture("debugMat",  {width:512, height:256}, scene);
     var myMaterial = new BABYLON.StandardMaterial("Mat", scene);
     myDynamicTexture.drawText(canvas.width+ " "+ canvas.height, 50, 135, font, "green", "white", true, true);
     myMaterial.diffuseTexture = myDynamicTexture;
     guiMesh.material = myMaterial;
     //SAVE THIS SECTION FOR PRACTICE
     //myDynamicTexture.drawText(modelFile5, 50, 135, font, "blue", "white", true, true);
     console.log("babylon");
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

   masher= new Masher( new BABYLON.Vector3(0, 0.25, -1),myDynamicTexture,scene);


  soundTest = new BABYLON.Sound("Music", "bell_large_ringing_01.wav", scene, null, { loop: false, autoplay: false });
  particleSystem = new BABYLON.ParticleSystem("particles", 100, scene);

  //Texture of each particle
  particleSystem.particleTexture = new BABYLON.Texture("flare.png", scene);
  particleSystem.emitter = new BABYLON.Vector3(0, 0, 0); // the starting object, the emitter
  particleSystem.minEmitBox = new BABYLON.Vector3(-0.5, -0.5, -0.5); // Starting all from
  particleSystem.maxEmitBox = new BABYLON.Vector3(0.5, 0.5, 0.5); // To...

  advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
     textPanel = new BABYLON.GUI.StackPanel();
     textPanel.width = canvas.width;
     textPanel.fontSize = "14px";
     textPanel.height = "100px";
     textPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
     textPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
     advancedTexture.addControl(textPanel);
 var label = new BABYLON.GUI.Rectangle("Text box");
         label.background = "black"
         label.height = "100px";
         label.alpha = 0.7;
         label.width = canvas.width;
         label.cornerRadius = 20;
         label.thickness = 1;
         label.linkOffsetY = 30;
         label.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
         advancedTexture.addControl(label);

     buttonPanel = new BABYLON.GUI.StackPanel();
     buttonPanel.width = canvas.width/3;
     buttonPanel.fontSize = "14px";
     buttonPanel.height = "200px";
     buttonPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
     buttonPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
     advancedTexture.addControl(buttonPanel );
     var button1 = BABYLON.GUI.Button.CreateSimpleButton("Game initial Yes", "Yes");
         button1.width = 0.2;
         button1.height = "40px";
         button1.color = "white";
         button1.cornerRadius = 20;
         button1.background = "green";
         button1.onPointerUpObservable.add(function() {
           buttonPanel.isVisible=false;
           //myDynamicTexture.drawText("LoadAssetContainer", 50, 135, font, "blue", "white", true, true);

           if(!_initializedGame){
             _initializedGame=true;

             masher.Spawn();
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

               buttonPanel.isVisible=false;
             });
             buttonPanel.addControl(button2);

    buttonPanel.isVisible=false;
    textbox = new BABYLON.GUI.TextBlock();
         textbox.text = "Slider:";
        // header.height = "40px";
         textbox.color = "white";
        // header.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
         //header.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
         label.addControl(textbox);





  if(!_initializedGame){
    textbox.text="Please find the image target provided"
  }


 camera.position = new BABYLON.Vector3(0, 3, -5)
}

const placeObjectTouchHandler = (e) => {
  // Call XrController.recenter() when the canvas is tapped with two fingers. This resets the
  // AR camera to the position specified by XrController.updateCameraProjectionMatrix() above.
  //log.innerHTML ='touch found'
  //myDynamicTexture.drawText(e.touches[0].clientX+ " " +e.touches[0].clientY +" " + e.touches.length, 50, 135, font, "green", "white", true, true);
//  guiMesh.material.diffuseTexture=myDynamicTexture;

    if (e.touches.length == 2) {
    XR.XrController.recenter()
  }

    if (e.touches.length > 2) {
      return
    }

  const pickResult = scene.pick(e.touches[0].clientX, e.touches[0].clientY);

  if(masherReady){

      switch (index) {
        case 0:
              textbox.text="YASOUUU!"
              index++;
          break;
        case 1:
        textbox.text="What’s that on your face?? Right in the middle!!!"
        index++;
            break;
        case 2:
        textbox.text="Im so glad to see you!"
        index++;
          break;


        default:

      }
    //&& pickResult.pickedMesh == surface
  //  myDynamicTexture.drawText(pickResult.pickedPoint, 50, 135, font, "green", "white", true, true);
  //  guiMesh.material.diffuseTexture=myDynamicTexture;
         //  //https://carlos.revelation-interactive.com/3DModels/
       //  BABYLON.SceneLoader.LoadAssetContainer( './',modelFile5, scene, function (container)
       //  {    try{
       //     myDynamicTexture.drawText("LoadAssetContainer", 50, 135, font, "blue", "white", true, true);
       //     container.meshes[0]._scaling= new BABYLON.Vector3(1,1, 1);
       //      container.meshes[0].position = new BABYLON.Vector3(0, 0.25, -1);
       //      container.meshes[0].rotation= new BABYLON.Vector3(0,180,0);
       //      con= container;
       //
       //     //scene.beginAnimation(container.skeletons[0], 0, 100, true, 0.8);
       //     container.addAllToScene();
       //   }  catch (er) {myDynamicTexture.drawText(er, 50, 135, font, "red", "white", true, true);}
       // });
      // myDynamicTexture.drawText(con, 50, 135, font, "blue", "white", true, true);


  }

}


const startScene = () => {
  console.log("XXXXXXXXXXXXXXstartScene")
  //navigator.mediaDevices.getUserMedia({video:true});
   canvas = document.getElementById('renderCanvas')
 //log =  document.getElementById('log')
//  log.innerHTML ='startScene'
  //var assetsManager = new BABYLON.AssetsManager(scene);

  engine = new BABYLON.Engine(canvas, true, { stencil: true, preserveDrawingBuffer: true })
  engine.enableOfflineSupport = false

  scene = new BABYLON.Scene(engine)
  camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, 0), scene)

  initXrScene({ scene, camera }) // Add objects to the scene and set starting camera position.

  // Connect the camera to the XR engine and show camera feed
  camera.addBehavior(XR.Babylonjs.xrCameraBehavior(),true)

  canvas.addEventListener('touchstart', placeObjectTouchHandler, true)  // Add touch listener.
  //scene.debugLayer.show();
  //var loader =  new BABYLON.AssetsManager(this.scene);
  assetsManager = new BABYLON.AssetsManager(scene);

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
  //myDynamicTexture.drawText(e.name, 50, 135, font, "green", "white", true, true);
  if (e.name=="MasherTarget" && _initializedGame==false){
    //state logic
    buttonPanel.isVisible=true;

    //_initializedGame=true;
    textbox.text= "Are you at home?"
//  guiMesh.position.z=10;
  }
  else if(masherReady){
    try{
    if(_initializedGame){
      masher.StayOnTrack(e);

      }
    }
    catch(e){myDynamicTexture.drawText(er, 50, 135, font, "red", "white", true, true);}
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

const load = () => { XRExtras.Loading.showLoading({onxrloaded}) }
window.onload = () => { window.XRExtras ? load() : window.addEventListener('xrextrasloaded', load) }
