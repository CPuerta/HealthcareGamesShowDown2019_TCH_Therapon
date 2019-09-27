var modelLocation="./../../3D/Characters/Masher/" ;
var textureslocation;
var textures;
var mesh;
var mcontainer;
var masherFollowCam;
var masherFollowOffset;
const EggStates={
  EGG:'egg',
  EGGHEADPOP:'eggHeadPop',
  EGGBODYPOP:'eggBodyPop',
  FULLHATCH:'fullHatch'

}

let eggState= EggStates.EGG;

const MasherFaceEmotionStates={
  SAD:'sad',
  NORMAL:'normal',
  ANGRY:'angry',
  EXCITED:'excited',
  BORED:'bored'
}

const MasherMouthEmotionStates={
  SMILE:'smile',
  FROWN:'frown',
  OPEN:'open',
  WIDE:'wide',
  DISTRESSED:'distressed'
}
Masher= function(startloc,myDynamicTexture,scene ){
  //
  //myDynamicTexture.drawText("making masher", 50, 135, font, "red", "white", true, true);
  this.eggState=EggStates.EGG;
  this.mouthState=MasherMouthEmotionStates.SMILE;
  this.faceState= MasherFaceEmotionStates.NORMAL;
  myDynamicTexture.drawText("setting states", 50, 135, font, "red", "white", true, true);
//  masher.ready=false;
  //this.container
  //this.model= spawned model
  //this.face=
  //this.mouth
  //this.container=

}
Masher.prototype.Spawn= function(){
  myDynamicTexture.drawText(modelFile5, 50, 135, font, "blue", "white", true, true);

  try{
    BABYLON.SceneLoader.LoadAssetContainer( '../Models/',modelFile5, scene, function (container){
     try{
       //myDynamicTexture.drawText("LoadAssetContainer", 50, 135, font, "blue", "white", true, true);
       container.meshes[0]._scaling= new BABYLON.Vector3(.01,.01, .01);
        container.meshes[0].position = new BABYLON.Vector3(0, 0.25, -1);
        container.meshes[0].rotation= new BABYLON.Vector3(0,180,0);
      //log.innerHTML=container.meshes[3].material.diffuseTexture;
       //var eyes =container.getChildByName("eyes1");
       //log.innerHTML=container.meshes;
       //container.meshes[2].material.diffuseColor =  BABYLON.Color3.Blue();
       //myDynamicTexture.drawText("masher made", 50, 135, font, "blue", "white", true, true);
       mesh=container.meshes[0];
       mcontainer=container;
       masherMesh=mesh;
    //   _initializedGame=true;
        masherReady=true;
        scene.beginAnimation(container.skeletons[0], 0, 100, true, 0.8);
    //   masher.ready=true;
       container.addAllToScene();
     }
     catch (err) {myDynamicTexture.drawText(err, 50, 135, font, "red", "white", true, true);}

   });


  }
  catch (er) {myDynamicTexture.drawText(er, 50, 135, font, "red", "white", true, true);}

};
// Masher.prototype.setAnimation=function(){
//
// };
Masher.prototype.StayOnTrack=function(e){
try{
  this.mesh= mcontainer.meshes[0];
  this.mesh.position.copyFrom(e.position)
  this.mesh.Quaternion.copyFrom(e.rotation)
  this.mesh.scaling.set(e.scale*.01, e.scale*.01, e.scale*.01)
}
catch (er) {myDynamicTexture.drawText(er, 50, 135, font, "red", "white", true, true);}

};
Masher.prototype.MoveTo=function(loc){
    //this.container.meshes[0].parent=camera;
try{
  mcontainer.meshes[0].parent=camera;
  mcontainer.meshes[0].position=loc;

}
  catch (er) {myDynamicTexture.drawText(er, 50, 135, font, "red", "white", true, true);}

};
Masher.prototype.setFace=function( faceState){
  //this.face.material.diffuseTexture=
  switch(faceState){
    case MasherFaceEmotionStates.SAD:
    case MasherFaceEmotionStates.NORMAL:
    case MasherFaceEmotionStates.ANGRY:
    case MasherFaceEmotionStates.EXCITED:
    case MasherFaceEmotionStates.BORED:
  }
};

Masher.prototype.setMouth=function( mouthState){

  //this.mouth.material.diffuseTexture=
  switch(mouthState){
    case MasherMouthEmotionStates.SMILE:
    case MasherMouthEmotionStates.FROWN:
    case MasherMouthEmotionStates.ANGRY:
    case MasherMouthEmotionStates.WIDE:
    case MasherMouthEmotionStates.OPEN:
    case MasherMouthEmotionStates.DISTRESSED:
  }
};
