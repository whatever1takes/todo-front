<template>
  <div class="game-container">
    <h1>贪吃蛇游戏</h1>
    <div class="game-board" ref="gameBoard">
      <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
        <div v-for="(cell, cellIndex) in row" :key="cellIndex" class="cell" :class="{'snake': cell === 1, 'food': cell === 2}"></div>
      </div>
    </div>
    <div class="controls">
      <el-button @click="startGame">开始游戏</el-button>
      <el-button @click="pauseGame">暂停游戏</el-button>
      <el-button @click="resetGame">重置游戏</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const gameBoard = ref(null)
const board = ref([])
const snake = ref([])
const food = ref({})
const direction = ref('right')
const gameInterval = ref(null)

const BOARD_SIZE = 20

const initializeBoard = () => {
  const newBoard = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0))
  board.value = newBoard
}

const initializeSnake = () => {
  snake.value = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }]
  snake.value.forEach(part => {
    board.value[part.y][part.x] = 1
  })
}

const placeFood = () => {
  let placed = false
  while (!placed) {
    const x = Math.floor(Math.random() * BOARD_SIZE)
    const y = Math.floor(Math.random() * BOARD_SIZE)
    if (board.value[y][x] === 0) {
      board.value[y][x] = 2
      food.value = { x, y }
      placed = true
    }
  }
}

const startGame = () => {
  if (gameInterval.value) return
  gameInterval.value = setInterval(updateGame, 100)
}

const pauseGame = () => {
  clearInterval(gameInterval.value)
  gameInterval.value = null
}

const resetGame = () => {
  pauseGame()
  initializeBoard()
  initializeSnake()
  placeFood()
}

const updateGame = () => {
  const head = { ...snake.value[0] }
  switch (direction.value) {
    case 'up':
      head.y -= 1
      break
    case 'down':
      head.y += 1
      break
    case 'left':
      head.x -= 1
      break
    case 'right':
      head.x += 1
      break
  }

  if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE || board.value[head.y][head.x] === 1) {
    resetGame()
    return
  }

  snake.value.unshift(head)
  if (head.x === food.value.x && head.y === food.value.y) {
    placeFood()
  } else {
    const tail = snake.value.pop()
    board.value[tail.y][tail.x] = 0
  }

  snake.value.forEach(part => {
    board.value[part.y][part.x] = 1
  })
}

const handleKeydown = (event) => {
  switch (event.key) {
    case 'ArrowUp':
      if (direction.value !== 'down') direction.value = 'up'
      break
    case 'ArrowDown':
      if (direction.value !== 'up') direction.value = 'down'
      break
    case 'ArrowLeft':
      if (direction.value !== 'right') direction.value = 'left'
      break
    case 'ArrowRight':
      if (direction.value !== 'left') direction.value = 'right'
      break
  }
}

onMounted(() => {
  initializeBoard()
  initializeSnake()
  placeFood()
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.game-board {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
}

.row {
  display: flex;
}

.cell {
  width: 20px;
  height: 20px;
  border: 1px solid #eee;
}

.snake {
  background-color: #409eff;
}

.food {
  background-color: #f56c6c;
}

.controls {
  margin-top: 1rem;
}

.el-button {
  margin: 0 0.5rem;
}
</style>