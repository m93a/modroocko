var key = [];
document.addEventListener("keydown",function(e){
  key[e.keyCode] = true;
});
document.addEventListener("keyup",function(e){
  key[e.keyCode] = false;
});
