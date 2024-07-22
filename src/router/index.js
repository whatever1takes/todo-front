import {createRouter, createWebHistory} from "vue-router";
import Home from "../components/Home.vue";
import TodoList from "../components/TodoList.vue";
import Counter from "../components/Counter.vue";

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
    }
]

const router = createRouter({
    history: createWebHistory(''),
    routes
});

export default router;