// CONSTANTS
const FPS = 60
const LOOP_INTERVAL = Math.round(1000 / FPS)

let GAME_WIDTH
let GAME_HEIGHT

const PLAYER_HEALTH = 3

const SOLDIER_CD = 1000
const SOLDIER_WIDTH = 50
const SOLDIER_HEIGHT = 50
const SOLDIER_HP = 100 // TODO Adjust Value
const VELOCITY = 2 // TODO Adjust Value

const TOWER_CD = 800
const TOWER_WIDTH = 70
const TOWER_HEIGHT = 70
const TOWER_RADIUS = 100 // TODO Adjust Value
const TOWER_DP = 20 // TODO Adjust Value
const TOWER_TYPES = [1, 2, 3] // define the types of towers available (btn-tower-1, btn-tower-2, btn-tower-3)

// Elements
const $startBtn = $("#start-btn")
const $welcomeBox = $("#welcome-box")
const $gameBox = $("#game-box")
const $gameBody = $("#game-body")
const $towerChoices = $('.tower-choice')
const $mems = $(".mem")
const $enemyPath = $('#enemy-path')
const $pauseBtn = $('#pause-btn')
const $playBtn = $("#play-btn")

// Shared Global Variable
let gameLoop // Game Loop = generate enemies each round
let selectedTowerType // define the default tower type
let prevSoldierGenTime // define the previous soldier generation time
let soldiersSpawnCounter = 0
let toBeRemovedSoldiers = []
let enemyHP

const towers = [] // in case we have multiple towers generated
const soldiers = [] // in case we have multiple soldiers generated


function continuousAttack(tower, soldier) {
  const { prevShot, dp } = tower
  const { healthPoint } = soldier

  const currTime = new Date().getTime()
  const timeDiff = currTime - (prevShot || 0)
  
  if (timeDiff >= TOWER_CD) {
    console.log(soldier.healthPoint)
    soldier.healthPoint = healthPoint - dp
    tower.prevShot = currTime
  }
  if (soldier.healthPoint === 0) {
    toBeRemovedSoldiers.push(soldier)
  }
}

function isInRange() {
  towers.forEach(function (tower) {
    const {
      centerPoint: tCenterPoint
    } = tower

    soldiers.forEach(function (soldier) {
      const {
        centerPoint: sCenterPoint
      } = soldier

      let dx = tCenterPoint.x - sCenterPoint.x;
      let dy = tCenterPoint.y - sCenterPoint.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < TOWER_RADIUS + (SOLDIER_WIDTH / 2)) {
        continuousAttack(tower, soldier)
      }
    })
  })
}
//////////////////////////////////////////////////////////////////////
function spawnEnemy() {
  if (soldiersSpawnCounter < 3) {
    const currTime = new Date().getTime()
    const timeDiff = currTime - (prevSoldierGenTime || 0)

    if (timeDiff >= SOLDIER_CD) {
      const newSoldier = {
        $elem: $('<div class="enemy">Enemy</div>'),
        position: {
          x: (GAME_WIDTH / 2) - (SOLDIER_WIDTH / 2),
          y: 0
        },
        centerPoint: {
          x: (GAME_WIDTH / 2),
          y: (SOLDIER_WIDTH / 2)
        },
        healthPoint: SOLDIER_HP
      }

      newSoldier.$elem.appendTo($enemyPath).css({
        top: `${newSoldier.position.y}px`,
        left: `${newSoldier.position.x}px`
      })

      soldiers.push(newSoldier)
      prevSoldierGenTime = currTime
      soldiersSpawnCounter++
    }
  }
}

function updateEnemyMovement() {
  // Everytime this gets invoked, update enemy position
  soldiers.forEach(function (soldier) {
    const {
      $elem,
      position: {
        y
      }
    } = soldier
    const newY = y + VELOCITY
    $elem.css('top', newY)
    soldier.position.y = newY
    soldier.centerPoint.y = newY + (SOLDIER_WIDTH / 2)

    // console.log(newY + SOLDIER_HEIGHT, GAME_HEIGHT)
    if (newY + SOLDIER_HEIGHT >= GAME_HEIGHT) {
      toBeRemovedSoldiers.push(soldier)
    }
  })
}

function removeEnemy() {
  toBeRemovedSoldiers.forEach(function (tbrSoldier) {
    const index = soldiers.findIndex(function (soldier) {
      return soldier.$elem[0] === tbrSoldier.$elem[0]
    })

    soldiers.splice(index, 1)
    tbrSoldier.$elem.remove()
  })

  toBeRemovedSoldiers = []
}

function handleUpdate() {
  spawnEnemy()
  updateEnemyMovement()
  isInRange()
  removeEnemy()
}

function handleStart() {
  // hide and show components
  $welcomeBox.hide()
  $gameBox.show()
}

function handlePlay() {
  gameLoop = setInterval(handleUpdate, LOOP_INTERVAL)
  $playBtn.attr('disabled', true)
  $pauseBtn.attr('disabled', false)
}

function handlePause() {
  clearInterval(gameLoop)
  gameLoop = null
  $playBtn.attr('disabled', false)
  $pauseBtn.attr('disabled', true)
}

function handleTowerChoice(e) {
  const $elem = $(e.target)

  const type = $elem.data("type")
  selectedTowerType = TOWER_TYPES[type]

  $towerChoices.addClass('btn-secondary').removeClass('btn-success')
  $elem.removeClass('btn-secondary').addClass('btn-success')
}

function handleMemClick(e) {
  if (selectedTowerType) {
    const $elem = $(e.target)
    const position = $elem.position()

    const newTower = {
      $elem,
      type: selectedTowerType,
      radius: null, // TODO: set a different radius based on type
      prevShot: null,
      dp: TOWER_DP,
      centerPoint: {
        x: position.left + (TOWER_WIDTH / 2),
        y: position.top + (TOWER_HEIGHT / 2),
      }
    }

    $elem.html(`
    Tower ${selectedTowerType}
    <div class="range""></div>
  `)

    $elem.find('.range').css({
      width: TOWER_RADIUS * 2,
      height: TOWER_RADIUS * 2
    })

    towers.push(newTower)
  } else {
    alert("select tower type first!")
  }
}

function init() {
  GAME_WIDTH = $gameBody.width()
  GAME_HEIGHT = $gameBody.height()

  // register a onclick listen to the start button, so that,
  // when start button was pressed, hide() and show() UI components
  $startBtn.on('click', handleStart)

  $playBtn.on('click', handlePlay)
  $pauseBtn.on('click', handlePause)

  // update selectedTowerType variable
  $towerChoices.on('click', handleTowerChoice)

  // update the text when the mem is clicked
  $mems.on('click', handleMemClick)
}

init()