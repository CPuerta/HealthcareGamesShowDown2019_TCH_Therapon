
let box, engine, scene, camera, log, surface,canvas
const modelRootURL = '/../Models/JellyKid_Final/'// Directory where 3D model lives
const modelRootURL2 = '../Models/JellyKid_FinalBabylon/JellyKid_Final/'// Directory where 3D model lives
const modelFile = 'tree.glb'
const modelFile3 = 'Rig_JellyKid.glb'
const modelFile4 = 'a_jellykid_idle.glb'
const modelFile5 = 'jellykid_scaled.glb'
var myDynamicTexture;
var font = "bold 12px monospace";
  var material0;
  var material1;
  var soundTest;
  var PSystRunning= false;
    var particleSystem;

// Populates some object into an XR scene and sets the initial camera position.
const initXrScene = ({ scene, camera }) => {
  console.warn('initXrScene')
  const directionalLight = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 1), scene)
  directionalLight.intensity = 1.0

      var guiMesh= BABYLON.Mesh.CreatePlane("plane",3);
      guiMesh.position.y=2;
      guiMesh.position.z-4;

    // var advancedTexture= BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui");
     myDynamicTexture = new BABYLON.DynamicTexture("name",  {width:512, height:256}, scene);
     var myMaterial = new BABYLON.StandardMaterial("Mat", scene);

     myDynamicTexture.drawText(canvas.width+ " "+ canvas.height, 50, 135, font, "green", "white", true, true);
     myMaterial.diffuseTexture = myDynamicTexture;
     guiMesh.material = myMaterial;

  const ground = BABYLON.MeshBuilder.CreatePlane('ground', {size: 100}, scene)
    ground.rotation.x = Math.PI / 2
    ground.material = new BABYLON.StandardMaterial("groundMaterial", scene)
    ground.material.diffuseColor = BABYLON.Color3.Teal()
    ground.material.alpha = 1

    surface = ground

    // BABYLON.SceneLoader.ImportMesh("", './',modelFile3 , scene, function (newMeshes) {
    //        // Set the target of the camera to the first imported mesh
    //       // newMeshes[0]._position=  new BABYLON.Vector3(-7, 0.5, 0.5);
    //        newMeshes[0]._scaling= new BABYLON.Vector3(.01, .01, .01);
    //        setup(newMeshes[0]);
    //        //camera.target= newMeshes[0];
    //     });
    // box = BABYLON.MeshBuilder.CreateBox("box", {size: 0.5}, scene)
    // box.material = material0
    // box.material.diffuseColor = BABYLON.Color3.Teal()
    // box.position = new BABYLON.Vector3(0, 0.25, -1)
    // box.rotation.y = 45
  //  material0.diffuseColor = new BABYLON.Color3(1, 0, 0);
//  var multimat = new BABYLON.MultiMaterial("multi", scene);

   BABYLON.SceneLoader.LoadAssetContainer( './Models/',modelFile5, scene, function (container){
    try{
      container.meshes[0]._scaling= new BABYLON.Vector3(1,1, 1);
       container.meshes[0].position = new BABYLON.Vector3(0, 0.25, -1);
       container.meshes[0].rotation= new BABYLON.Vector3(0,180,0);
      // myDynamicTexture.drawText(container.meshes, 50, 135, font, "yellow", "white", true, true);
       // container.meshes[4]position.z-=.2;
      //container.meshes[3].material.diffuseTexture=new BABYLON.Texture("jellykid_e_5.png", scene);

      //log.innerHTML=container.meshes[3].material.diffuseTexture;
      //var eyes =container.getChildByName("eyes1");
      //log.innerHTML=container.meshes;
      //container.meshes[2].material.diffuseColor =  BABYLON.Color3.Blue();

      //scene.beginAnimation(container.skeletons[0], 0, 100, true, 0.8);
      container.addAllToScene();
    }
    catch (err) {myDynamicTexture.drawText(err, 50, 135, font, "red", "white", true, true);}

   });

  // Set the initial camera position relative to the scene we just laid out. This must be at a
  // height greater than y=0.

  soundTest = new BABYLON.Sound("Music", "bell_large_ringing_01.wav", scene, null, { loop: false, autoplay: false });
  particleSystem = new BABYLON.ParticleSystem("particles", 100, scene);

  //Texture of each particle
  particleSystem.particleTexture = new BABYLON.Texture("flare.png", scene);
  particleSystem.emitter = new BABYLON.Vector3(0, 0, 0); // the starting object, the emitter
  particleSystem.minEmitBox = new BABYLON.Vector3(-0.5, -0.5, -0.5); // Starting all from
  particleSystem.maxEmitBox = new BABYLON.Vector3(0.5, 0.5, 0.5); // To...




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
//
//   if(pickResult.hit){//&& pickResult.pickedMesh == surface
//   //  myDynamicTexture.drawText(pickResult.pickedPoint, 50, 135, font, "green", "white", true, true);
//   //  guiMesh.material.diffuseTexture=myDynamicTexture;
//     try {
//
//       // var guiMesh= BABYLON.Mesh.CreatePlane("GUIplane",3);
//       // var advancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(guiMesh, 1024, 1024);
//       // myDynamicTexture.drawText(advancedTexture2, 50, 135, font, "blue", "white", true, true);
//
//       // var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "Click Me");
//       //    button1.width = 1;
//       //    button1.height = 0.4;
//       //    button1.color = "white";
//       //    button1.fontSize = 50;
//       //    button1.background = "green";
//       //    button1.onPointerUpObservable.add(function() {
//       //        alert("you did it!");
//       //    });
//       //    advancedTexture.addControl(button1);
//       //
//       // var timer = new Timer(5, scene, function() {
//       //
//       //   myDynamicTexture.drawText("TIMER COMPLETE", 50, 135, font, "green", "white", true, true);
//       // });
//       //timer.start();
//         }
//     catch (e) {myDynamicTexture.drawText(err, 50, 135, font, "red", "white", true, true);
//   }
// //     BABYLON.SceneLoader.LoadAssetContainer( './',modelFile2, scene, function (container){
// //       //container.meshes[0]._scaling= new BABYLON.Vector3(1,1,1);
// //
// // try {
// //       container.meshes[0].position.x = pickResult.pickedPoint.x;
// //       container.meshes[0].position.y = pickResult.pickedPoint.y;
// //       container.meshes[0].position.z = pickResult.pickedPoint.z;
// //       container.meshes[0].rotation= new BABYLON.Vector3(0,0,0);
// //     //  container.meshes[3].material=material0;
// //     //  myDynamicTexture.drawText(pickResult.pickedMesh, 50, 135, font, "green", "white", true, true);
// //       //container.meshes[3].material=material1;
// //       //container.meshes[4].material=material0;
// //      //container.meshes[3].material.diffuseTexture=new BABYLON.Texture("jellykid_e_5.png", scene);
// //
// //      //log.innerHTML=container.meshes[3].material.diffuseTexture;
// //      //var eyes =container.getChildByName("eyes1");
// //      //log.innerHTML=container.meshes;
// //      //container.meshes[2].material.diffuseColor =  BABYLON.Color3.Blue();
// //
// //      //scene.beginAnimation(container.skeletons[0], 0, 100, true, 0.8);
// //      container.addAllToScene(); }
// //      catch (err) {myDynamicTexture.drawText(err, 50, 135, font, "green", "white", true, true);}
// //
// //     });
//
//   }

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
  camera.addBehavior(XR.Babylonjs.xrCameraBehavior())

  canvas.addEventListener('touchstart', placeObjectTouchHandler, true)  // Add touch listener.
  scene.debugLayer.show();
  engine.runRenderLoop(() => {
    // Animate box rotation

    // Render scene
    scene.render()
  })

  window.addEventListener('resize', () => {
    engine.resize()
  })
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

// Show loading screen before the full XR library has been loaded.
const load = () => { XRExtras.Loading.showLoading({onxrloaded}) }
window.onload = () => { window.XRExtras ? load() : window.addEventListener('xrextrasloaded', load) }
