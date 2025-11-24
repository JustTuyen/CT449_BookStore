import { createWebHistory, createRouter } from "vue-router";
import Home from "@/view/user/home.vue";
import Menu from "@/view/user/menu.vue";
import BookPage from "@/view/user/BookPage.vue";
import Login from "@/view/login.vue";
import Register from "@/view/register.vue";
import SearchPage from "@/view/user/searchPage.vue";
import checkout from "@/view/user/checkout.vue";
import Profile from "@/view/user/profile.vue";
import BorrowingPage from "@/view/user/borrowingPage.vue";
import updatepassword from "@/view/user/updatepassword.vue";
//
import Book from "@/view/admin/book.vue";
import Customer from "@/view/admin/customer.vue";
import Dashboard from "@/view/admin/dashboard.vue";
import Employee from "@/view/admin/employee.vue";
import BorrowingCard from "@/view/admin/borrowingCard.vue";
import Report from "@/view/admin/report.vue";
import Publisher from "@/view/admin/publisher.vue";
//
import { useAuthStore } from "@/store/auth";
//
const routes = [
    {path: '/', component: Home, name: 'Home'},
    {path: '/Menu', component: Menu, name: 'Menu'},
    {path: '/Search', component: SearchPage, name: 'SearchPage'},
    {path: '/Checkout/:id', component: checkout, name: 'Checkout', props: true, meta:{requiresAuth: true,}},

    //
    {path: '/Book/:id', component: BookPage, name: 'BookPage', props: true},

    //
    {path: '/Updatepassword', component: updatepassword, name: 'updatepassword', meta:{requiresAuth: true,}},
    {path: '/Profile', component: Profile, name: 'Profile', meta:{requiresAuth: true,}},
    {path: '/BorrowingPage', component: BorrowingPage, name: 'BorrowingPage', meta:{requiresAuth: true,}},
    //
    {path: '/Login', component: Login, name: 'Login'},
    {path: '/Register', component: Register, name: 'Register'},

    //
    {path: '/Book', component: Book, name: 'Book', meta:{requiresAuth: true,}},
    {path: '/Customer', component: Customer, name: 'Customer', meta:{requiresAuth: true,}},
    {path: '/Dashboard', component: Dashboard, name: 'Dashboard', meta:{requiresAuth: true,}},
    {path: '/Employee', component: Employee, name: 'Employee', meta:{requiresAuth: true,}},
    {path: '/BorrowingCard', component: BorrowingCard, name: 'BorrowingCard', meta:{requiresAuth: true,}},
    {path: '/Publisher', component: Publisher, name: 'Publisher', meta:{requiresAuth: true,}},
    {path: '/Report', component: Report, name: 'Report', meta:{requiresAuth: true,}},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) =>{
    const authStore = useAuthStore();

    if(to.meta.requiresAuth && !authStore.isAuthenticated){
        return next('/login');
    }

    if(to.meta.VaiTro && !to.meta.VaiTro.includes(authStore.user.VaiTro)){
        alert("Tài khoản hiện tại của bạn không có quyền truy cập chức năng này!");
        return next('/Login');
    }

    if (authStore.isAuthenticated && authStore.user?.VaiTro === "Admin" && to.path === '/') {
        return next('/Dashboard');
    }

    next();
})

export default router;