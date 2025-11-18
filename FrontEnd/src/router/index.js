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
//
import Book from "@/view/admin/book.vue";
import Customer from "@/view/admin/customer.vue";
import Dashboard from "@/view/admin/dashboard.vue";
import Employee from "@/view/admin/employee.vue";
import BorrowingCard from "@/view/admin/borrowingCard.vue";
import Report from "@/view/admin/report.vue";
import Publisher from "@/view/admin/publisher.vue";
//
const routes = [
    {path: '/', component: Home, name: 'Home'},
    {path: '/Menu', component: Menu, name: 'Menu'},
    {path: '/Search', component: SearchPage, name: 'SearchPage'},
    {path: '/Checkout/:id', component: checkout, name: 'Checkout', props: true},

    //
    {path: '/Book/:id', component: BookPage, name: 'BookPage', props: true},

    //
    {path: '/Profile', component: Profile, name: 'Profile'},
    {path: '/BorrowingPage', component: BorrowingPage, name: 'BorrowingPage'},
    //
    {path: '/Login', component: Login, name: 'Login'},
    {path: '/Register', component: Register, name: 'Register'},

    //
    {path: '/Book', component: Book, name: 'Book'},
    {path: '/Customer', component: Customer, name: 'Customer'},
    {path: '/Dashboard', component: Dashboard, name: 'Dashboard'},
    {path: '/Employee', component: Employee, name: 'Employee'},
    {path: '/BorrowingCard', component: BorrowingCard, name: 'BorrowingCard'},
    {path: '/Publisher', component: Publisher, name: 'Publisher'},
    {path: '/Report', component: Report, name: 'Report'},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;