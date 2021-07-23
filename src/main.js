import Vue from 'vue'
import App from './App'
import router from './router.js'
import store from "./store.js"
import meta from 'vue-meta'
import FontAwesomeIcon from './font-awesome.js'
import DropMenu from '@/components/base/drop-menu.vue'

import Header from './components/layouts/header.vue'
import Sidebar from './components/layouts/sidebar.vue'

Vue.component('fa-icon', FontAwesomeIcon)
Vue.component('drop-menu', DropMenu)

Vue.config.productionTip = false
Vue.use(router);
Vue.use(meta);

new Vue({
    el:'#header',
    router,
    store,
    render: h => h(Header)
});

new Vue({
    el:'#sidebar',
    router,
    store,
    render: h => h(Sidebar),
});
new Vue({
    el:'#page',
    router,
    store,
    render: h => h(App),
});
