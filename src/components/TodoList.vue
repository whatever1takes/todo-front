<template>
    <div class="todo-app">
        <el-card shadow="always" :body-style="{ padding: '20px' }" style="max-width: 480px">
            <template #header>
                <div class="todo-header">
                    待办事项
                </div>
            </template>
            <div class="todo-input">

                <el-input v-model="newTodo" placeholder="新建代办事项..."></el-input>
                <el-button type="primary" @click="addTodo">添加</el-button>
            </div>

        </el-card>
        <el-card style="max-width: 480px">
            <template #header>
                <div class="card-header">
                    <span>Card name</span>
                </div>
            </template>
            <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
            <template #footer>Footer content</template>
        </el-card>
    </div>
</template>

<script setup>

</script>

<style scoped></style>