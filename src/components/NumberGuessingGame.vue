<template>
  <div class="game-container">
    <h1>猜数字游戏</h1>
    <p>猜一个1到100之间的数字</p>
    <el-input v-model="guess" placeholder="输入你的猜测" @keyup.enter="checkGuess"></el-input>
    <el-button type="primary" @click="checkGuess">提交猜测</el-button>
    <p v-if="message">{{ message }}</p>
    <p v-if="attempts">你已经尝试了 {{ attempts }} 次</p>
    <el-button v-if="gameOver" type="success" @click="resetGame">再玩一次</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const guess = ref('')
const message = ref('')
const attempts = ref(0)
const targetNumber = ref(Math.floor(Math.random() * 100) + 1)
const gameOver = ref(false)

const checkGuess = () => {
  if (guess.value === '') {
    message.value = '请输入一个数字'
    return
  }

  attempts.value++
  const userGuess = parseInt(guess.value, 10)

  if (userGuess === targetNumber.value) {
    message.value = `恭喜你，猜对了！答案是 ${targetNumber.value}`
    gameOver.value = true
  } else if (userGuess < targetNumber.value) {
    message.value = '太小了，再试一次'
  } else if (userGuess > targetNumber.value) {
    message.value = '太大了，再试一次'
  }

  guess.value = ''
}

const resetGame = () => {
  guess.value = ''
  message.value = ''
  attempts.value = 0
  targetNumber.value = Math.floor(Math.random() * 100) + 1
  gameOver.value = false
}
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

p {
  margin: 0.5rem 0;
}

.el-input {
  margin: 1rem 0;
}

.el-button {
  margin-top: 1rem;
}
</style>