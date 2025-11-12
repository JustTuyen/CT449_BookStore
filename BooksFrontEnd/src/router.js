import { createWebHistory, createRouter } from 'vue-router';
import login from './views/login.vue';
import register from './views/register.vue';
import home from './views/users/home.vue';
//user
const routes = [
    { path: '/', component: home },
    //
    { path: '/login', component: login },
    { path: '/register', component: register },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
