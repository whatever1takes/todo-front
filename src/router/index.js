import {createRouter, createWebHistory} from "vue-router";
import Home from "../components/Home.vue";
import TodoList from "../components/TodoList.vue";
import Counter from "../components/Counter.vue";
import NumberGuessingGame from "../components/Game/NumberGuessingGame.vue";
import SnakeGame from "../components/Game/SnakeGame.vue";
import GameSelection from "../components/GameSelection.vue";
import SokobanGame from "../components/Game/SokobanGame.vue";
import Debug from "../components/Debug.vue";
import Debug2 from "../components/Debug2/Debug2.vue";


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/todoList',
        name: 'TodoList',
        component: TodoList,
    },
    {
        path: '/counter',
        name: 'Counter',
        component: Counter,
    },
    {
        path: '/game',
        name: 'GameSelection',
        component: GameSelection
    },
    {
        path: '/game/snake',
        name: 'SnakeGame',
        component: SnakeGame
    },
    {
        path: '/game/number-guessing',
        name: 'NumberGuessingGame',
        component: NumberGuessingGame
    },
    {
        path: '/game/sokoban',
        name: 'SokobanGame',
        component: SokobanGame
    },
    {
        path: '/debug',
        name: 'Debug',
        component: Debug
    },
    {
        path: '/debug2',
        name: 'Debug2',
        component: Debug2
    },
]

const router = createRouter({
    history: createWebHistory(''),
    routes
});

export default router;