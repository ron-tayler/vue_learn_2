import Vue from 'vue'
import VueRouter from 'vue-router'
import PageMe from './components/page-me/page-me.vue'
import PageHome from './components/page-home/page-home.vue'
import PageProfile from './components/page-profile/page-profile.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: PageHome
    },
    {
        path: '/me',
        name: 'me',
        component: PageMe
    },
    {
        path: '/profile',
        name: 'profile',
        component: PageProfile
    },
    {
        path: "*",
        meta:{
            redirect_out:true
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    if(to.matched.some(r=>r.meta.redirect_out)){
        window.location = 'https://youinroll.com'+to.path;
    }else{
        next()
    }
})

export default router
