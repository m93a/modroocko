

Q.load("sprites.png, sprites.json, level1.json, tiles.png, bg-1.png", function() {
  
  Q.sheet("tiles","tiles.png", { tilew: 32, tileh: 32 });
  
  
  Q.animations("player", Q.Player.animation);
  
  
  Q.compileSheets("sprites.png","sprites.json");
  
  
  Q.stageScene("level1");
});
