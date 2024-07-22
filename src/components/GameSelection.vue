<template>
  <div class="home-container">
    <h1 class="home-title">游戏选择</h1>
    <div class="links-container">
      <router-link to="/game/number-guessing" class="link">猜数字游戏</router-link>
      <router-link to="/game/snake" class="link">贪吃蛇游戏</router-link>
      <router-link to="/game/sokoban" class="link">推箱子游戏</router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #8e2de2, #4a00e0);
  color: white;
  font-family: 'Arial', sans-serif;
  text-align: center;
}

.home-title {
  font-size: 3rem;
  margin-bottom: 2rem;
  animation: fadeInDown 1s ease-out;
}

.links-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.link {
  text-decoration: none;
  color: white;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  border: 2px solid white;
  border-radius: 8px;
  transition: background-color 0.3s, color 0.3s;
  animation: fadeInUp 1s ease-out;
}

.link:hover {
  background-color: white;
  color: #4a00e0;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (min-width: 768px) {
  .links-container {
    flex-direction: row;
  }
}
</style>