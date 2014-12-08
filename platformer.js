var BLOCK_AIR        = 0,
    BLOCK_SOLID      = 1,
    BLOCK_SOLID_TOP  = 2,
    BLOCK_GRAB       = 9,
    BLOCK_GRAB_TOP   = 3,
    BLOCK_ROOF_LEFT  = 4,
    BLOCK_ROOF_RIGHT = 5,
    BLOCK_ANTENNA    = 7,
    BLOCK_CHIMNEY    = 8;



// Set up an instance of the Quintus engine  and include
// the Sprites, Scenes, Input and 2D module. The 2D module
// includes the `TileLayer` class as well as the `2d` componet.
var Q = window.Q = Quintus()
        .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI")
        // Maximize this game to whatever the size of the browser is
        .setup({ maximize: true })
        // And turn on default input controls and touch input (for UI)
        .controls().touch()




// ## Player Sprite
Q.Sprite.extend("Player",{

  // the init constructor is called on creation
  init: function(p) {

    // You can call the parent's constructor with this._super(..)
    this._super(p, {
      sheet:  "player",
      sprite: "player",
      x: 410,
      y: 90
    });
    
    
    this.on("hit.sprite",function(collision) {
    
      // Check the collision, if it's the Horse, you win!
      if(false&&collision.obj.isA("Horse")) {
        Q.stageScene("endGame",1, { label: "You Won!" }); 
        this.destroy();
      }
    });
    
    this.on("bump.left,bump.right",function(c){
     if(c.tile == BLOCK_GRAB || c.tile == BLOCK_GRAB_TOP){
      
      this.p.y -= .3;
      ( this.p.vy > 0 )&&( this.p.vy = 0 );
      ( Q.inputs.up   )&&( (this.p.vy   = -200),(Q.inputs.up = false) );
      
      this.climbing = true;
      
     }
    });
    
    
    this.add('2d, platformerControls, animation');
    
  },
  
  
  step: function(dt){
   if(this.p.landed>0){
    if(this.p.vx){
     this.play( "walk_" +this.p.direction );
    }else{
     this.play( "stand_"+this.p.direction );
    }
   }else if(this.climbing){
    this.play( "climb_" +this.p.direction );
   }else{
    this.play( "jump_"  +this.p.direction );
   }
   
   this.climbing = false;
  }

});

Q.Player.animation = {
  stand_right:{ frames: [0],   rate: 1/2, flip: false, loop: false },
  stand_left: { frames: [0],   rate: 1/2, flip: "x",   loop: false },
  climb_right:{ frames: [2],   rate: 1/2, flip: false, loop: false },
  climb_left: { frames: [2],   rate: 1/2, flip: "x",   loop: false },
  walk_right: { frames: [0,1], rate: 1/2, flip: false, loop: true  },
  walk_left:  { frames: [0,1], rate: 1/2, flip: "x",   loop: true  },
  jump_right: { frames: [1,2], rate: 1/2, flip: false, loop: true  },
  jump_left:  { frames: [1,2], rate: 1/2, flip: "x",   loop: true  },
};




// ## Horse Sprite
Q.Sprite.extend("Horse", {
  init: function(p) {
    this._super(p, { sheet: 'horse', scale: 4 });
    this.add('2d');
  }
});




// ## Enemy Sprite
Q.Sprite.extend("Enemy",{
  init: function(p) {
    this._super(p, { sheet: 'enemy', vx: 100 });

    // Enemies use the Bounce AI to change direction 
    // whenver they run into something.
    this.add('2d, aiBounce');

    // Listen for a sprite collision, if it's the player,
    // end the game unless the enemy is hit on top
    this.on("bump.left,bump.right,bump.bottom",function(collision) {
      if(collision.obj.isA("Player")) { 
        Q.stageScene("endGame",1, { label: "You Died" }); 
        collision.obj.destroy();
      }
    });
  }
});



// ## Trigger Sprite
Q.Sprite.extend("Trigger",{
  init: function(p) {
    this._super(p, { sheet: 'enemy' });
    this.add('2d');
  }
});




// General level helper function
function loadLevel( n, stage ){
 // Add in a repeater for a little parallax action
 stage.insert(new Q.Repeater({
   asset: "bg-"+n+".png",
   scale: .181,
   speedX: 1,
   speedY: 1
 }));
 
 //Scale the viewport
 stage.add("viewport");
 stage.viewport.scale = 2;
 
 // Add in a tile layer, and make it the collision layer
 var layer = new Q.TileLayer({
   dataAsset: 'level'+n+'.json',
   sheet:     'tiles'
 });
 
 layer.tileCollisionObjects[BLOCK_ROOF_LEFT] = {p:{
  w: 32, h: 32,
  cx:16, cy:16,
  points: [[-16,16],[16,-16],[16,16]]
 }};
 
 layer.tileCollisionObjects[BLOCK_ROOF_RIGHT] = {p:{
  w: 32, h: 32,
  cx:16, cy:16,
  points: [[-16,-16],[16,16],[-16,16]]
 }};
 
 layer.tileCollisionObjects[BLOCK_SOLID_TOP] = {p:{
  w: 32, h: 32,
  cx:16, cy:16,
  points: [[-16,-16],[16,-16],[16,-10],[-16,-10]]
 }};
 
 layer.tileCollisionObjects[BLOCK_GRAB_TOP] = {p:{
  w: 32, h: 32,
  cx:16, cy:16,
  points: [[-16,-16],[16,-16],[16,-10],[-16,-10]]
 }};
 
 stage.collisionLayer(layer);
 
 window.lq = function( n ){
   return loadQuest( n, stage );
 };
 
};




// General quest helper function
function loadQuest( n, stage ){
  
  var d = -1;
  var diag = stage.scripts[n].diag;
  
  function placeNextDiag(){
    
    d++;
    
    var trig = new Q.Trigger({
      x: 32*diag[d][0],
      y: 32*diag[d][1]
    });
    
    trig.on("bump",function(e){
      if( e.obj.isA("Player") ){
        
        console.log(diag[d][2]+": "+diag[d][3]);
        trig.destroy();
        placeNextDiag();
        
      }
    });
    
    stage.insert(trig);
    
  }
  
  placeNextDiag();
  
};






Q.scene('endGame',function(stage) {
  var container = stage.insert(new Q.UI.Container({
    x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
  }));
  
  var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                                  label: "Play Again" }))         
  var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h, 
                                                   label: stage.options.label }));
  
  // When the button is clicked, clear all the stages
  // and restart the game.
  button.on("click",function() {
    Q.clearStages();
    Q.stageScene('level1');
  });

  // Expand the container to visibily fit it's contents
  // (with a padding of 20 pixels)
  container.fit(20);
});



