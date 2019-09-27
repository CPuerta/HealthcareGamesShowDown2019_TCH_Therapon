var bcontainer;

Blitz= function(startloc,scale,rot,myDynamicTexture,scene ){
  //
  //myDynamicTexture.drawText("making masher", 50, 135, font, "red", "white", true, true);
  myDynamicTexture.drawText("setting blitz", 50, 135, font, "red", "white", true, true);
  this.name="Blitz";
   this.startloc=startloc;
   this.startscale= scale;
   this.startRot=rot;
   this.eyeTextures=[];
   this.mouthTextures=[];
   this.eyeAlphaTextures=[];
   this.mouthAlphaTextures=[];
   this.sounds=[
    "blitz-emote-ahha.wav",
    "blitz-emote-allinthistogether.wav",
    "blitz-emote-brilliant.wav",
    "blitz-emote-eh.wav",
    "blitz-emote-ehwhat.wav",
    "blitz-emote-FireInTheBelly.wav",
    "blitz-emote-HelloThere.wav",
    "blitz-emote-hmm.wav",
    "blitz-emote-huh.wav",
    "blitz-emote-inconceivable.wav",
    "blitz-emote-OhDear.wav",
    "blitz-emote-ohdearflat.wav",
    "blitz-emote-purrr.wav"];
    myDynamicTexture.drawText("blitz set", 50, 135, font, "red", "white", true, true);

}


Blitz.prototype.setAnimation=function(){};

Blitz.prototype.Spawn= function(){
//  myDynamicTexture.drawText(modelFile5, 50, 135, font, "blue", "white", true, true);

  try{
    var loc = this.startloc;
    var scale =this.startscale;
    var rot= this.startRot;
    BABYLON.SceneLoader.LoadAssetContainer( '../Models/Blitz/',"skl_blitz.glb", scene, function (container){
     try{
       //myDynamicTexture.drawText("LoadAssetContainer", 50, 135, font, "blue", "white", true, true);
       container.meshes[0]._scaling.set(scale*1.5, scale*1.5, scale*1.5);

        container.meshes[0].position = new BABYLON.Vector3(loc.x,loc.y+1, loc.z);
        container.meshes[0].rotation= new BABYLON.Vector3(0,180,0);
      //  container.meshes[0].isVisible=false;
      //container.meshes[2].material.diffuseColor =  BABYLON.Color3.Blue();
      //myDynamicTexture.drawText("masher made", 50, 135, font, "blue", "white", true, true);
       bcontainer=container;
    //   masherMesh=mesh;
      _initializedGame=true;
        blitzReady=true;
    //  scene.beginAnimation(container.skeletons[0], 0, 100, true, 0.8);
       //masher.ready=true;
       container.addAllToScene();

     }
     catch (err) {myDynamicTexture.drawText(err, 50, 135, font, "red", "white", true, true);}
   });
   BABYLON.SceneLoader.LoadAssetContainer( '../Models/Masher/',"skl-egg-1.glb", scene, function (container){
    try{
      //myDynamicTexture.drawText("LoadAssetContainer", 50, 135, font, "blue", "white", true, true);
      container.meshes[0]._scaling.set(scale*1, scale*1, scale*1);

       container.meshes[0].position = new BABYLON.Vector3(loc.x-1,loc.y, loc.z-.5);
       container.meshes[0].rotation= new BABYLON.Vector3(0,180,0);
     //  container.meshes[0].isVisible=false;
     //container.meshes[2].material.diffuseColor =  BABYLON.Color3.Blue();
     //myDynamicTexture.drawText("masher made", 50, 135, font, "blue", "white", true, true);
  //   egg.push(container.meshes[0]);
     egg.push(container.meshes[3]);
     egg.push(container.meshes[4]);
      egg.push(container.meshes[5]);
      bcontainer=container;
   //   masherMesh=mesh;
     _initializedGame=true;
       blitzReady=true;
   //  scene.beginAnimation(container.skeletons[0], 0, 100, true, 0.8);
      //masher.ready=true;
      container.addAllToScene();

    }
    catch (err) {myDynamicTexture.drawText(err, 50, 135, font, "red", "white", true, true);}
  });
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
Blitz.prototype.PlaySounds=function(sound){
  for (var i = 0; i < this.sounds.length; i++) {
    var s= this.sounds[i].split(".")
    if(s[0]==sound){
      var music = new BABYLON.Sound("Music","./../Audio/Voice/Emotes/Blitz/" +this.sounds[i], scene,
       function () {
        // Sound has been downloaded & decoded
        music.play();
        myDynamicTexture.drawText(sound+ " played", 50, 135, font, "blue", "white", true, true);

       });

      var timer = new Timer(4000 , scene, function() {
        //music.dispose();

      });
      timer.start();
    //  myDynamicTexture.drawText("match", 50, 135, font, "blue", "white", true, true);
      return;
    }
    else{
       myDynamicTexture.drawText(s[0]+ sound, 50, 135, font, "blue", "white", true, true);

    }
  }
};

Blitz.prototype.getName=function(){
  return this.name;
};
Blitz.prototype.setFace=function(text ){
  //this.face.material.diffuseTexture=
//need to identify active mesh

  states= text.split("/");

  return
};

Blitz.prototype.StayOnTrack=function(e){
try{
  this.mesh= mcontainer.meshes[0];
//  this.mesh.position.copyFrom(e.position)
//  this.mesh.rotation.=e.rotation
//  this.mesh.scaling.set(e.scale*.01, e.scale*.01, e.scale*.01)
}
catch (er) {myDynamicTexture.drawText(er, 50, 135, font, "red", "white", true, true);}

};
blitz.prototype.MoveTo=function(loc){
    //this.container.meshes[0].parent=camera;
try{
  mcontainer.meshes[0].parent=camera;
  mcontainer.meshes[0].position=loc;

}
  catch (er) {myDynamicTexture.drawText(er, 50, 135, font, "red", "white", true, true);}

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
