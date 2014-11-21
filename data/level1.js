Q.scene("level1",function(stage) {
  
  loadLevel(1,stage);
  
  //player & camera
  var player = stage.insert(new Q.Player());
  stage.add("viewport").follow(player);
  
  //enemies
  stage.insert(new Q.Enemy({ x: 700, y: 0 }));
  stage.insert(new Q.Enemy({ x: 800, y: 0 }));
  
  //horse
  stage.insert(new Q.Horse({ x: 32*12, y: 32*14 }));
  
});
