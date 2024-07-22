<template>
  <el-page-header @back="goBack">
    <template #content>
      <span class="text-large font-600 mr-3"> TODO List </span>
    </template>
  </el-page-header>
  <div class="todo-app">

    <el-card class="todo-card" shadow="always" :body-style="{ padding: '20px' }" style="max-width: 480px">
      <template #header>
        <div class="todo-header">
          待办事项
        </div>
      </template>
      <div class="todo-input">
        <el-input v-model="newTodo" placeholder="新建代办事项..." @keyup.enter="addTodo"></el-input>
        <el-button type="primary" @click="addTodo">添加</el-button>
      </div>
      <div v-if="todos.length" class="todo-list">
        <p v-for="todo in todos" :key="todo.id" class="todo-item">
          <div class="todo-item-actions">
            <div class="todo-item-title">{{ todo.title }}</div>
            <el-button class="todo-button" @click="toggleComplete(todo)" :type="todo.completed ? 'success' : 'info'">
              {{ todo.completed ? "已完成" : "未完成" }}
            </el-button>
            <el-button @click="deleteTodo(todo)" type="danger" icon="el-icon-delete" circle>
            </el-button>
          </div>
        </p>
      </div>
      <div v-else class="no-todos">暂无代办事项</div>
    </el-card>

  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import axios from 'axios'
import {ElMessage} from 'element-plus'
import {useRouter} from "vue-router";

const router = useRouter();

const goBack = () => {
  console.log('go back');
  router.go(-1); // 使用 Vue Router 返回上一页
}
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000
})

const newTodo = ref('')
const todos = ref([])
const fetchTodos = async () => {
  try {
    const response = await axiosInstance.get('/api/todos')
    todos.value = response.data
  } catch (error) {
    ElMessage.error("查询待办事项失败")
    console.error(error)
  }
}
const addTodo = async () => {
  if (newTodo.value.trim() === '') return
  try {
    const response = await axiosInstance.post('/api/todos',
        {
          title: newTodo.value,
          completed: false
        }
    )
    todos.value.push(response.data)
    newTodo.value = ''
    await fetchTodos()
    ElMessage.success("创建待办事项成功")
  } catch (error) {
    ElMessage.error("创建待办事项失败")
    console.error(error)
  }
}

const toggleComplete = async (todo) => {
  const state = todo.completed
  try {
    todo.completed = !todo.completed
    await axiosInstance.put(`/api/todos/${todo.id}`, todo)
    ElMessage.success("更新待办事项状态成功")
  } catch (error) {
    ElMessage.error("更新待办事项状态失败")
    console.log(error)
    todo.completed = state
  }
}
const deleteTodo = async (todo) => {
  try {
    await axiosInstance.delete(`/api/todos/${todo.id}`)
    await fetchTodos()
    ElMessage.success("删除待办事项状态成功")
  } catch (error) {
    ElMessage.error("删除待办事项状态失败")
    console.log(error)
  }
}

onMounted(fetchTodos)
</script>

<style scoped>
.page-container {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.el-page-header {
  display: flex;
  align-items: center;
  padding: 20px 30px;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
}

.el-page-header__left {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.el-page-header__title {
  font-size: 16px;
  color: #333;
}

.el-page-header__content {
  font-size: 18px;
  color: #666;
  font-weight: bold;
}

.todo-app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
  padding: 20px;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.todo-card {
  width: 100%;
  max-width: 500px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.todo-header {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  padding: 16px;
  background-color: #409eff;
  color: #fff;
  border-radius: 8px 8px 0 0;
  margin: 0;
}

.todo-input {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px;
  background-color: #fff;
  border-bottom: 1px solid #ebeef5;
}

.el-input {

  flex: 1;
}

.todo-list {
  padding: 20px;
  background-color: #fff;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  margin-bottom: 10px;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: background-color 0.3s, transform 0.3s;
}

.todo-item:hover {
  background-color: #e6f7ff;
  transform: translateY(-2px);
}

.todo-item-title {
  font-weight: bold;
  flex: 1;
  margin-right: 20px;
  word-wrap: break-word;
  width: 160px;
}

.completed .todo-item-title {
  text-decoration: line-through;
  color: #909399;
}

.todo-item-actions {
  display: flex;
  align-items: center;
}

.no-todos {
  text-align: center;
  padding: 20px;
  color: #909399;
  font-size: 18px;
}
</style>