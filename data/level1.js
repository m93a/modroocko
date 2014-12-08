Q.scene("level1",function(stage) {
  
  loadLevel(1,stage);
  
  //player & camera
  var player = stage.insert(new Q.Player());
  stage.add("viewport").follow(player);
  
  stage.scripts = [
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
  
  // check Kingdom Come, Arche Age
  
  //horse
  stage.insert(new Q.Horse({ x: 32*16, y: 32*23 }));
  
});
