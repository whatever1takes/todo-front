<script setup>
import {ref, onMounted, onUnmounted} from "vue";
import AnswerButton from "./AnswerButton.vue";
import FunnyButton from "./FunnyButton.vue";

const inputElement = ref();
const pageTitle = ref("");

const time = ref(new Date().toLocaleTimeString());

const timer = setInterval(() => {
  time.value = new Date().toLocaleTimeString();
}, 1000);

onMounted(() => {
  inputElement.value.focus();
  pageTitle.value = document.title;
});
onUnmounted(() => {
  clearInterval(timer);
});

let isHappy = ref(true);

function onAnswerNo() {
  isHappy.value = false;
}

function onAnswerYes() {
  isHappy.value = true;
}

const isAvailable = ref(true);
</script>

<template>
  <input ref="inputElement">
  <p>页面标题: {{ pageTitle }}</p>
  <p>当前时间: {{ time }}</p>
  <p>你快乐吗?</p>
  <AnswerButton
      @yes="onAnswerYes"
      @no="onAnswerNo"
  />
  <p style="font-size: 50px">
    {{ isHappy ? "😀" : "😥" }}
  </p>

  <FunnyButton/>
  <FunnyButton/>
  <FunnyButton> 这是传到slot的内容!</FunnyButton>
  <div>
    <input
        id="is-available"
        v-model="isAvailable"
        type="checkbox"
    >
    <label for="is-available">这是一个checkbox</label>
  </div>

</template>
