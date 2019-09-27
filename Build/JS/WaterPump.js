const PumpStates={
  ORB:'orb',
  ORBBUILD:'orbBuild',
  ORBSTATIONPOWER:'orbStationPower',
  ORBSTATIONNOPOWER:'orbStationNoPower'
}

WaterPump= function(){

}

WaterPump.prototype.Spawn=function(e){

  BABYLON.SceneLoader.LoadAssetContainer( '../Models/WaterPump/',orbModel, scene, function (container){
    try{
      container.meshes[0]._scaling.set(.1*.75,.1*.75,.1*.75);
      container.meshes[0].position = new BABYLON.Vector3(e.position.x,e.position.y+.2,e.position.z);
      container.meshes[1].material.metallic=.5;

       //container.meshes[0].rotation= new BABYLON.Vector3(0,180,0);
       orbMeshes.push(container.meshes[0]);
       if(gameState==GameStates.CHILL)
          loadNextScript();
      container.addAllToScene();
    }
    catch (err) {myDynamicTexture.drawText(err, 50, 135, font, "red", "white", true, true);}

  });

};
WaterPump.prototype.ChangeState = function (state){
  if(state!=null){
    this.state=state;
  }
    switch (state) {
        case PumpStates.ORBBUILD:
          myDynamicTexture.drawText("pump loading in", 50, 135, font, "red", "white", true, true)
          BABYLON.SceneLoader.LoadAssetContainer( '../Models/WaterPump/',pumpModel, scene, function (container){
            try{

              container.meshes[0]._scaling.set(.01*.75,.01*.75,.01*.75);//scale need adjustmen
              container.meshes[0].position = new BABYLON.Vector3(orbMeshes[pumpID-1].position.x,orbMeshes[pumpID-1].position.y+2,orbMeshes[pumpID-1].position.z);
              textbox.text="loaded"
              container.meshes[1].material.metallic=.5;
               //container.meshes[0].rotation= new BABYLON.Vector3(0,180,0);
               var timer = new Timer(6000, scene, function() {
                 ///myDynamicTexture.drawText("pre parce", 50, 135, font, "red", "white", true, true);
                 loadTimeJump();
               });
               timer.start();

               orbMeshes.push(container.meshes[0]);
              container.addAllToScene();
            }
            catch (err) {myDynamicTexture.drawText(err, 50, 135, font, "red", "white", true, true);}

          });
          break;
      case PumpStates.ORBSTATIONPOWER:


        break;
      case PumpStates.ORBSTATIONNOPOWER:

        break;
      default:

    }


};
