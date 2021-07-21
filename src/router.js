import Vue from 'vue'
import VueRouter from 'vue-router'
import PageMe from './components/page-me/page-me.vue'
import PageHome from './components/page-home/page-home.vue'
import PageProfile from './components/page-profile/page-profile.vue'
import PageLogin from '@/components/page-login/page-login.vue'
import PageNotFound from './components/page-not-found/not-found.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: PageHome
    },{
        path: '/me',
        name: 'me',
        component: PageMe
    },{
        path: '/user/:id/:tab?',
        name: 'user',
        component: PageProfile
    },{
        path: '/login',
        name: 'login',
        component: PageLogin
    },{
        path: '/404',
        name: "not-found",
        component: PageNotFound,
    },{
        path: "*",
        meta:{
            redirect_out:false
        }
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach(
    (to, from, next) => {
        if(to.matched.some(r=>r.meta.redirect_out)){
            window.location = 'https://youinroll.com'+to.path;
        }else{
            next()
        }
    }
)

export default router
