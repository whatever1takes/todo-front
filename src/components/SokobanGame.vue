<template>
  <div class="game-container">
    <h1>推箱子游戏</h1>
    <div class="game-board" ref="gameBoard">
      <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
        <div v-for="(cell, cellIndex) in row" :key="cellIndex" class="cell" :class="{'wall': cell === 1, 'box': cell === 2, 'target': cell === 3, 'player': cell === 4, 'box-on-target': cell === 5}">
          <div v-if="cell === 4" class="player-icon">🧍</div>
          <div v-if="cell === 2 || cell === 5" class="box-icon">📦</div>
          <div v-if="cell === 3 || cell === 5" class="target-icon">🎯</div>
        </div>
      </div>
    </div>
    <div class="controls">
      <el-button @click="resetGame">重置游戏</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const board = ref([
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 2, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 3, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1]
])

const playerPosition = ref({ x: 1, y: 1 })

const resetGame = () => {
  board.value = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 3, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
  ]
  playerPosition.value = { x: 1, y: 1 }
}

const movePlayer = (dx, dy) => {
  const { x, y } = playerPosition.value
  const newX = x + dx
  const newY = y + dy

  if (board.value[newY][newX] === 0 || board.value[newY][newX] === 3) {
    board.value[y][x] = board.value[y][x] === 4 ? 0 : 3
    board.value[newY][newX] = board.value[newY][newX] === 3 ? 4 : 4
    playerPosition.value = { x: newX, y: newY }
  } else if (board.value[newY][newX] === 2 || board.value[newY][newX] === 5) {
    const boxNewX = newX + dx
    const boxNewY = newY + dy

    if (board.value[boxNewY][boxNewX] === 0 || board.value[boxNewY][boxNewX] === 3) {
      board.value[boxNewY][boxNewX] = board.value[boxNewY][boxNewX] === 3 ? 5 : 2
      board.value[newY][newX] = board.value[newY][newX] === 5 ? 4 : 4
      board.value[y][x] = board.value[y][x] === 4 ? 0 : 3
      playerPosition.value = { x: newX, y: newY }
    }
  }
}

const handleKeydown = (event) => {
  switch (event.key) {
    case 'ArrowUp':
      movePlayer(0, -1)
      break
    case 'ArrowDown':
      movePlayer(0, 1)
      break
    case 'ArrowLeft':
      movePlayer(-1, 0)
      break
    case 'ArrowRight':
      movePlayer(1, 0)
      break
  }
}

onMounted(() => {
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
  width: 40px;
  height: 40px;
  border: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wall {
  background-color: #333;
}

.box {
  background-color: #ffcc00;
}

.target {
  background-color: #00ccff;
}

.player {
  background-color: #ff6600;
}

.box-on-target {
  background-color: #ff9900;
}

.player-icon, .box-icon, .target-icon {
  font-size: 24px;
}

.controls {
  margin-top: 1rem;
}

.el-button {
  margin: 0 0.5rem;
}
</style>