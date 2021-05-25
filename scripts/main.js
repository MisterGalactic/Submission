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

$startBtn = $("#start-btn")
$welcomeBox =  $("welcome-box")
$gameHeader = $("game-header")

function eventHandler() {
  if $startBtn.on('click', function(){
    $welcomeBox.hide()
    $gameHeader.show()
  })
}

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