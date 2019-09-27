const StationStates={
  ORB:'orb',
  ORBBUILD:'orbBuild',
  ORBSTATIONPOWER:'orbStationPower',
  ORBSTATIONNOPOWER:'orbStationNoPower'
}

let stationState= StationStates.ORB;

HydroStation= function(startloc,myDynamicTexture,scene ){
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

HydroStation.prototype.StayOnTrack=function(e){
try{
  this.mesh= mcontainer.meshes[0];
  this.mesh.position.copyFrom(e.position)
  this.mesh.Quaternion.copyFrom(e.rotation)
  this.mesh.scaling.set(e.scale*.01, e.scale*.01, e.scale*.01)
}
catch (er) {myDynamicTexture.drawText(er, 50, 135, font, "red", "white", true, true);}

};
HydroStation.prototype.Spawn= function(){
  myDynamicTexture.drawText(hydroModel, 50, 135, font, "blue", "white", true, true);

  try{//load station
    BABYLON.SceneLoader.LoadAssetContainer( '../Models/',hydroModel, scene, function (container){
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
   try{
     BABYLON.SceneLoader.LoadAssetContainer( '../Models/',orbModel, scene, function (container){
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

  }//load orb
  catch (er) {myDynamicTexture.drawText(er, 50, 135, font, "red", "white", true, true);}

};
