<script setup>

import {useRouter} from "vue-router";

const router = useRouter();

const goBack = () => {
  console.log('go back');
  router.go(-1); // 使用 Vue Router 返回上一页
}
</script>

<template>
  <el-page-header @back="goBack">
    <template #content>
      <span class="text-large font-600 mr-3"> Title </span>
    </template>
  </el-page-header>
</template>

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
</style>