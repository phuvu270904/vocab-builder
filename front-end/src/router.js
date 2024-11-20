import Vue from 'vue';
import Router from 'vue-router';
import Words from './views/Words.vue';
import New from './views/New.vue';
import Show from './views/Show.vue';
import Edit from './views/Edit.vue';
import Test from './views/Test.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Profile from './views/Profile.vue';
import store from './store/store';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/words'
        },
        {
            path: '/words',
            name: 'words',
            component: Words
        },
        {
            path: '/words/new',
            name: 'new-word',
            component: New
        },
        { 
            path: '/words/:wordId',
            name: 'show',
            component: Show
        },
        {
            path: '/words/:wordId/edit',
            name: 'edit',
            component: Edit
        },
        {
            path: '/test',
            name: 'test',
            component: Test
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile
        }
    ]
});

router.beforeEach((to, from, next) => {
    const isLoggedIn = store.getters.isLoggedIn;

    if (!isLoggedIn && (to.path.includes('/words/new') || to.path.includes('/words/') && to.path.includes('/edit') || to.path.includes('/test'))) {
        next('/');
    } else {
        next();
    }
});

export default router;