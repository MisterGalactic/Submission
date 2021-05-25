// CONSTANTS
const GAME_WIDTH = 500    
const GAME_HEIGHT = 500
const CHARACTER_WIDTH = 50    
const CHARACTER_HEIGHT = 50
const CHARACTER_HP = 100
const FPS = 60
const LOOP_INTERVAL = Math.round(1000 / FPS)
const VELOCITY = 2.5
const TOWER_WIDTH = 50
const TOWER_HEIGHT = 50
const TOWER_RADIUS = 100 // JUST SETTING
const TOWER_DP = 20
const INIT_HEALTH = 3

// Game Loop = generate enemies each round
let gameLoop

// define the types of towers available (btn-tower-1, btn-tower-2, btn-tower-3)
const TOWER_TYPES = [1, 2, 3]
// define the default tower type
let selectedTowerType

$startBtn = $("#start-btn")
$welcomeBox = $("#welcome-box")
$gameHeader = $("#game-header")


// hide and show components
function eventHandler() {
  $welcomeBox.hide();
  $gameHeader.show();
}

// register a onclick listen to the start button, so that,
// when start button was pressed, hide() and show() UI components
$startBtn.on('click', function(){
  // entrypoint to do something, which is hide and show
  eventHandler();
});

// update selectedTowerType variable
$("#btn-tower-1").on('click', function() {
  selectedTowerType = TOWER_TYPES[0];
});

$("#btn-tower-2").on('click', function() {
  selectedTowerType = TOWER_TYPES[1];
});

$("#btn-tower-3").on('click', function() {
  selectedTowerType = TOWER_TYPES[2];
});
// end update

// update the text when the mem is clicked
$(".mem").click(function(){
  if(selectedTowerType != null) {
    $(this).text("Tower "+selectedTowerType);
  } else {
    console.log("select tower type first!");
  }
});

//in game-



// Enemies generated in the middle of the screen, and walk down the pathway to the end-point
// Enemies 
const $character = $('#character')
// let character = {
//   initPosition: { x, y },   //how to set its init position?
//   movement: { down: true },
//   initVelocity: VELOCITY
// }


/* every new round, player has a chance to build a tower. 
Tower has a shooting range of radius X.
There are X types of towers to choose from.
Click to choose and build in selected and available areas. 
In html, show on screen about the changes */

const generateTower = function() {
  const initDimension = {
    w: CHARACTER_WIDTH,
    h: CHARACTER_HEIGHT
  }
}


  /* Game rules - X enemies will be generated each round and they will walk thru
  the pathway towards endpoint.
  - if an enemy reaches within Tower shooting range, Enemy's HP - TowerDP
  - if an enemy reaches the endpoint, INIT_HEALTH minus 1
  */