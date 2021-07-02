import Vue from 'vue'
import App from './App'
import Header from './components/header/header.vue'
import Sidebar from './components/sidebar/sidebar.vue'
import router from './router.js'
import meta from 'vue-meta'

Vue.config.productionTip = false
Vue.use(router);
Vue.use(meta);

new Vue({
    el:'#header',
    router,
    render: h => h(Header)
});

new Vue({
    el:'#sidebar',
    router,
    render: h => h(Sidebar),
});
new Vue({
    el:'#page',
    router,
    render: h => h(App),
});
