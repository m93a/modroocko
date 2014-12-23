Q.scene("level1",function(stage) {
  
  loadLevel(1,stage);
  
  //player & camera
  window.player = stage.insert(new Q.Player());
  stage.add("viewport")
  stage.centerOn(0,850);
  stage.follow(player,{x:1,y:0});
  stage.viewport.scale = 2;
  
  stage.scripts = [
   {
    "name": "Hra pro více hráčů",
    "desc": "Chytání myší",
    "npc":  [],
    "diag": [],
    "load": function(){
      window.playerB = stage.insert(new Q.Player());
      playerB.inputType = 1;
      
      var camera = {p:{x:0,y:750}};
      stage.follow(camera);
      
      stage.on("step",function(){
        
        var cX  = stage.viewport.centerX,
            sX  = stage.viewport.x,
            cY  = stage.viewport.centerY,
            sY  = stage.viewport.y,
            s   = stage.viewport.scale,
            p1x = player.p.x,
            p1y = player.p.y,
            p2x = playerB.p.x,
            p2y = playerB.p.y;
        
        stage.viewport.scale *= 9;
        stage.viewport.scale += Math.min(
          2,
          (2*(cX-sX)*s)/(Math.abs(p1x-p2x)+200),
          (2*(cY-sY)*s)/(Math.abs(2*(cY-Math.min(p1y,p2y))+100))
        )||2;
        stage.viewport.scale /= 10;
        
        camera.p.x = (player.p.x+playerB.p.x)/2;
        
      });
    }
   },
   {
    "name": "Den rozkvetlých růží",
    "desc": "Začínám",
    "npc":  [],
    "diag": [
      [2,  25, "Modroočko", "Mňau! Jsem kocourek Modroočko"],
      [10, 26, "Modroočko", "Žiju u dvojnožce, maminka mě sem "
                           +"dala, když jsem byl ještě malé koťe."]
    ]
   },
   {
    "name": "Další den rozkvetlých růží",
    "desc": "Seznámení s kočkou Zelenoočkou",
    "npc":  ["zelenoocka"],
    "diag": [
      [2, 25, "Modroočko", "Tady je tajným kočičím písmem "
                          +"napsáno: Přijdu sem, kočka Zelenoočka."]
    ]
   },
   {
    "name": "Růže ještě kvetou",
    "desc": "Jako zralá hruška",
    "npc": ["zelenoocka"],
    "diag": [
      [2, 25, "Zelenoočka", "Tvoje máma je tak tlustá..."],
      [2, 25, "Modroočko", "Zelenoočka plz :'-("]
    ]
   }
  ];
  
  //enemies
  //stage.insert(new Q.Enemy({ x: 700, y: 0 }));
  //stage.insert(new Q.Enemy({ x: 800, y: 0 }));
  
  //horse
  stage.insert(new Q.Horse({ x: 32*16, y: 32*23 }));
  
  
  //FIXME
  window.stage = stage;
  window.player = player;
  
});
