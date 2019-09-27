var masherSoundLocation="../Audio/Voice/Emotes/Masher/" ;
var textureslocation;
var textures;
var idleMasher;
var spinMasher;
var mcontainer;
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
Masher= function(startloc,scale,rot,myDynamicTexture,scene ){
  //
  //myDynamicTexture.drawText("making masher", 50, 135, font, "red", "white", true, true);
  this.eggState=EggStates.EGG;
  this.mouthState=MasherMouthEmotionStates.SMILE;
  this.faceState= MasherFaceEmotionStates.NORMAL;
  myDynamicTexture.drawText("setting states", 50, 135, font, "red", "white", true, true);
  this.name="masher";
   this.startloc=startloc;
   this.startscale= scale;
   this.startRot=rot;
   this.eyeTextures=[];
   this.mouthTextures=[];
   this.eyeAlphaTextures=[];
   this.mouthAlphaTextures=[];
   this.sounds= [
      "masher-emote-AllInThisTogether.wav",
      "masher-emote-aww.wav",
      "masher-emote-biggasp.wav",
      "masher-emote-boop.wav",
      "masher-emote-burble1.wav",
      "masher-emote-burble2.wav",
      "masher-emote-burble3.wav",
      "masher-emote-burble5.wav",
      "masher-emote-disappointed.wav",
      "masher-emote-eep.wav",
      "masher-emote-gasp.wav",
      "masher-emote-GoTeam.wav",
      "masher-emote-hellothere.wav",
      "masher-emote-high5.wav",
      "masher-emote-hmm.wav",
      "masher-emote-ImDizzy.wav",
      "masher-emote-imsleepy.wav",
      "masher-emote-ImTired.wav",
      "masher-emote-laugh.wav",
      "masher-emote-ohboy.wav",
      "masher-emote-pout.wav",
      "masher-emote-UMustBeThe1.wav",
      "masher-emote-woohoo.wav",
      "masher-emote-yay.wav",
      "masher-emote-zzz.wav"
   ];
   var eTexture1=new BABYLON.Texture("../Models/Masher/FaceTextures/jellykid_e_1.png", scene);
   var eTexture2=new BABYLON.Texture("../Models/Masher/FaceTextures/jellykid_e_2.png", scene);
   var eTexture3=new BABYLON.Texture("../Models/Masher/FaceTextures/jellykid_e_3.png", scene);
   var eTexture4=new BABYLON.Texture("../Models/Masher/FaceTextures/jellykid_e_4.png", scene);
   var eTexture5=new BABYLON.Texture("../Models/Masher/FaceTextures/jellykid_e_5.png", scene);
   this.eyeTextures.push(eTexture1);
   this.eyeTextures.push(eTexture2);
   this.eyeTextures.push(eTexture3);
   this.eyeTextures.push(eTexture4);
   this.eyeTextures.push(eTexture5);

   var eATexture1=new BABYLON.Texture("../Models/Masher/FaceTextures/jellykid_e_1m.png", scene);
   var eATexture2=new BABYLON.Texture("../Models/Masher/FaceTextures/jellykid_e_2m.png", scene);
   var eATexture3=new BABYLON.Texture("../Models/Masher/FaceTextures/jellykid_e_3m.png", scene);
   var eATexture4=new BABYLON.Texture("../Models/Masher/FaceTextures/jellykid_e_4m.png", scene);
   var eATexture5=new BABYLON.Texture("../Models/Masher/FaceTextures/jellykid_e_5m.png", scene);
   this.eyeAlphaTextures.push(eATexture1);
   this.eyeAlphaTextures.push(eATexture2);
   this.eyeAlphaTextures.push(eATexture3);
   this.eyeAlphaTextures.push(eATexture4);
   this.eyeAlphaTextures.push(eATexture5);

   var mTexture1=new BABYLON.Texture("../Models/Masher/FaceTextures/jellykid_m_1.png", scene);
   var mTexture2=new BABYLON.Texture("../Models/Masher/FaceTextures/jellykid_m_2.png", scene);
   var mTexture3=new BABYLON.Texture("../Models/Masher/FaceTextures/jellykid_m_3.png", scene);
   var mTexture4=new BABYLON.Texture("../Models/Masher/FaceTextures/jellykid_m_4.png", scene);
   var mTexture5=new BABYLON.Texture("../Models/Masher/FaceTextures/jellykid_m_5.png", scene);
   this.mouthTextures.push(mTexture1);
   this.mouthTextures.push(mTexture2);
   this.mouthTextures.push(mTexture3);
   this.mouthTextures.push(mTexture4);
   this.mouthTextures.push(mTexture5);

   var mATexture1=new BABYLON.Texture("../Models/Masher/FaceTextures/jellykid_m_1m.png", scene);
   var mATexture2=new BABYLON.Texture("../Models/Masher/FaceTextures/jellykid_m_2m.png", scene);
   var mATexture3=new BABYLON.Texture("../Models/Masher/FaceTextures/jellykid_m_3m.png", scene);
   var mATexture4=new BABYLON.Texture("../Models/Masher/FaceTextures/jellykid_m_4m.png", scene);
   var mATexture5=new BABYLON.Texture("../Models/Masher/FaceTextures/jellykid_m_5m.png", scene);
   this.mouthAlphaTextures.push(mATexture1);
   this.mouthAlphaTextures.push(mATexture2);
   this.mouthAlphaTextures.push(mATexture3);
   this.mouthAlphaTextures.push(mATexture4);
   this.mouthAlphaTextures.push(mATexture5);

   //load
}

Masher.prototype.getName=function(){
  return this.name;
};
Masher.prototype.setAnimation=function(){};

Masher.prototype.Spawn= function(){
//  myDynamicTexture.drawText(modelFile5, 50, 135, font, "blue", "white", true, true);

  try{
    var loc = this.startloc;
    var scale =this.startscale;
    var rot= this.startRot;
    BABYLON.SceneLoader.LoadAssetContainer( '../Models/Masher/',modelFile2, scene, function (container){
     try{
       //myDynamicTexture.drawText("LoadAssetContainer", 50, 135, font, "blue", "white", true, true);
       container.meshes[0]._scaling.set(scale*.005, scale*.005, scale*.005);

        container.meshes[0].position = new BABYLON.Vector3(loc.x,loc.y, loc.z);
        container.meshes[0].rotation= new BABYLON.Vector3(0,180,0);
      //  container.meshes[0].isVisible=false;
      var bTexture5=new BABYLON.Texture("../Models/Masher/BodySG_normal.png", scene);
    //  container.meshes[2].material.bumpTexture=bTexture5;
      //log.innerHTML=container.meshes[3].material.diffuseTexture;
    //   container.meshes[2].material.diffuseColor =  BABYLON.Color3.Blue();
       //myDynamicTexture.drawText("masher made", 50, 135, font, "blue", "white", true, true);
       idleMasher=container.meshes[0];
       mcontainer=container;
      // myDynamicTexture.drawText(container.meshes, 50, 135, font, "red", "white", true, true);

      // mcontainer.meshes[5].material.albedoTexture=this.eyeTextures[1];
      //  mcontainer.meshes[6].material.albedoTexture=this.mouthTextures[0];

    //   masherMesh=mesh;
      _initializedGame=true;
         scene.beginAnimation(container.skeletons[0], 0, 100, true, 0.8);
      // masher.ready=true;
       container.addAllToScene();

     }
     catch (err) {myDynamicTexture.drawText(err, 50, 135, font, "red", "white", true, true);}

   });

  //  BABYLON.SceneLoader.LoadAssetContainer( '../Models/Masher/',modelFile2, scene, function (container){
  //   try{
  //     //myDynamicTexture.drawText("LoadAssetContainer", 50, 135, font, "blue", "white", true, true);
  //     container.meshes[0]._scaling.set(scale*.01, scale*.01, scale*.01);
  //     container.meshes[0].position = new BABYLON.Vector3(loc.x,loc.y, loc.z);
  //
  //      // container.meshes[0].position = new BABYLON.Vector3(100,100,100);
  //      container.meshes[0].rotation= new BABYLON.Vector3(0,180,0);
  //      spinMasher=container.meshes[0];
  //     // spinMasher.setEnabled(false);
  //     // container.skeletons[0]=mcontainer.skeletons[0].clone("clones skel");
  //     //myDynamicTexture.drawText("masher made", 50, 135, font, "blue", "white", true, true);
  //     scene.beginAnimation(container.skeletons[0], 0, 100, true, 0.8);
  //     container.addAllToScene();
  //   }
  //   catch (err) {myDynamicTexture.drawText(err, 50, 135, font, "red", "white", true, true);}
  //
  // });


  }
  catch (er) {myDynamicTexture.drawText(er, 50, 135, font, "red", "white", true, true);}
  // var timer = new Timer(300, scene, function() {
  //   ///myDynamicTexture.drawText("pre parce", 50, 135, font, "red", "white", true, true);
  //
  //   mcontainer.meshes[0].isVisible=false;
  // });
  // timer.start();

};
// Masher.prototype.setAnimation=function(){
//
// };
Masher.prototype.StayOnTrack=function(e){
try{
  this.mesh= mcontainer.meshes[0];
//  this.mesh.position.copyFrom(e.position)
//  this.mesh.rotation.=e.rotation
//  this.mesh.scaling.set(e.scale*.01, e.scale*.01, e.scale*.01)
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
Masher.prototype.PlaySounds=function(sound){
  for (var i = 0; i < this.sounds.length; i++) {
    var s= this.sounds[i].split(".")
    if([0]==sound){

    }
  }
};
// Masher.prototype.setAnimation(setidle){
//   if(setidle){
//     //idleMasher.setEnabled(true)
//     //spinMasher.setEnabled(false);
//     //mesh = idlemesh
//   }else{
//     //mesh= spinmesh
//   }
// };

Masher.prototype.setFace=function(text ){
  //this.face.material.diffuseTexture=
//need to identify active mesh

  states= text.split("|");

  switch(states[0]){
    case MasherFaceEmotionStates.SAD:
      //  myDynamicTexture.drawText(mcontainer.meshes[3], 50, 135, font, "red", "white", true, true);
        mcontainer.meshes[3].material.albedoTexture=this.eyeTextures[0];
        mcontainer.meshes[3].material.opacityTexture=this.eyeAlphaTextures[0];
        break;
    case MasherFaceEmotionStates.NORMAL:
        //myDynamicTexture.drawText("normal", 50, 135, font, "red", "white", true, true);
        mcontainer.meshes[3].material.albedoTexture=this.eyeTextures[1];
        mcontainer.meshes[3].material.opacityTexture=this.eyeAlphaTextures[1];

        break;
    case MasherFaceEmotionStates.ANGRY:
      //  myDynamicTexture.drawText("ANGRY", 50, 135, font, "red", "white", true, true);
        mcontainer.meshes[3].material.albedoTexture=this.eyeTextures[2];
        mcontainer.meshes[3].material.opacityTexture=this.eyeAlphaTextures[2];

        break;
    case MasherFaceEmotionStates.EXCITED:
    //    myDynamicTexture.drawText("EXCITED", 50, 135, font, "red", "white", true, true);
        mcontainer.meshes[3].material.albedoTexture=this.eyeTextures[3];
        mcontainer.meshes[3].material.opacityTexture=this.eyeAlphaTextures[3];

        break;
    case MasherFaceEmotionStates.BORED:
      //  myDynamicTexture.drawText("BORED", 50, 135, font, "red", "white", true, true);
        mcontainer.meshes[3].material.albedoTexture=this.eyeTextures[4];
        mcontainer.meshes[3].material.opacityTexture=this.eyeAlphaTextures[4];

        break;
    default:
        myDynamicTexture.drawText("not face", 50, 135, font, "red", "white", true, true);
        mcontainer.meshes[3].material.albedoTexture=this.eyeTextures[0];
        mcontainer.meshes[3].material.opacityTexture=this.eyeATextures[5];

        break;
  }

  switch(states[1]){
    case MasherMouthEmotionStates.SMILE:
        mcontainer.meshes[4].material.albedoTexture=this.mouthTextures[0];
        mcontainer.meshes[4].material.opacityTexture=this.mouthAlphaTextures[0];
        //myDynamicTexture.drawText("smile", 50, 135, font, "red", "white", true, true);
        break;
    case MasherMouthEmotionStates.FROWN:
    //    myDynamicTexture.drawText("frown", 50, 135, font, "red", "white", true, true);
        mcontainer.meshes[4].material.albedoTexture=this.mouthTextures[0];
        mcontainer.meshes[4].material.opacityTexture=this.mouthAlphaTextures[0];

        break;
    case MasherMouthEmotionStates.ANGRY:
    //    myDynamicTexture.drawText("angry", 50, 135, font, "red", "white", true, true);
        mcontainer.meshes[4].material.albedoTexture=this.mouthTextures[1];
        mcontainer.meshes[4].material.opacityTexture=this.eyeAlphaTextures[1];

        break;
    case MasherMouthEmotionStates.WIDE:
    //    myDynamicTexture.drawText("wide", 50, 135, font, "red", "white", true, true);
        mcontainer.meshes[4].material.albedoTexture=this.mouthTextures[2];
        mcontainer.meshes[4].material.opacityTexture=this.mouthAlphaTextures[2];

        break;
    case MasherMouthEmotionStates.OPEN:
      //  myDynamicTexture.drawText("open", 50, 135, font, "red", "white", true, true);
        mcontainer.meshes[4].material.albedoTexture=this.mouthTextures[3];
        mcontainer.meshes[4].material.opacityTexture=this.mouthAlphaTextures[3];

        break;
    case MasherMouthEmotionStates.DISTRESSED:
      //  myDynamicTexture.drawText("distressed", 50, 135, font, "red", "white", true, true);
        mcontainer.meshes[4].material.albedoTexture=this.mouthTextures[4];
        mcontainer.meshes[4].material.opacityTexture=this.mouthAlphaTextures[4];

        break;
    default:
    //    myDynamicTexture.drawText("default", 50, 135, font, "red", "white", true, true);
        mcontainer.meshes[4].material.albedoTexture=this.mouthTextures[0];
        mcontainer.meshes[4].material.opacityTexture=this.mouthAlphaTextures[0];
        break;
  }

  return
};
