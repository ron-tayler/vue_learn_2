import VideoPlayer from "@/components/base/VideoPlayer";
import tabHome from './tabs/home.vue'
import tabDescription from './tabs/description.vue'
import tabTimeLine from './tabs/timeline.vue'
import tabVideos from './tabs/videos.vue'
import tabImages from './tabs/images.vue'

export default {
    name:'page-profile',
    props:['id'],
    components:{VideoPlayer},
    tabs:[
        {
            name:"Главная",
            path:"",
            component:tabHome
        },{
            name:"Описание",
            path:"description",
            component: tabDescription
        },{
            name:"Расписание",
            path:"timeline",
            component: tabTimeLine,
            filter(user){
                return user.view_timeline
            }
        },{
            name:"Видео",
            path:"videos",
            component: tabVideos,
            filter(user){
                return user.videos_count>0
            }
        },{
            name:"Публикации",
            path:"images",
            component: tabImages,
            filter(user){
                return user.images_count>0
            }
        }
    ],// Отслеживать Колокольчик Подписка Точки
    data:()=>({
        video_options:{
            autoplay: false,
            sources: [{
                src: "https://vjs.zencdn.net/v/oceans.mp4",
                type: "video/mp4"
            }]
        },
        active_tab:0,
    }),
    metaInfo(){
        let title
        if(this.active_tab){
            title = this.user.name + ' ' + this.$options.tabs[this.active_tab].name;
        }else{
            title = this.user.name
        }
        return{title}
    },
    methods:{
        clickTab(i){
            if(i===this.active_tab) return;
            if(this.$options.tabs[i].path !== ""){
                this.$router.replace('/user/'+this.user_id+'/'+this.$options.tabs[i].path)
            }else{
                this.$router.replace('/user/'+this.user_id)
            }
        },
        updateSelectTab(url_tab){
            if(typeof url_tab !== 'undefined' && url_tab !== null){
                this.active_tab = this.$options.tabs.findIndex(
                    tab=>tab.path===url_tab
                )
            }else{
                this.active_tab = 0;
            }
        },
        btnHeart(){
            if(this.user.track){
                this.$store.dispatch('offTrack',this.user_id)
            }else{
                this.$store.dispatch('onTrack',this.user_id)
            }
        },
        btnBell(){
            if(this.user.ball){
                this.$store.dispatch('offBall',this.user_id)
            }else{
                this.$store.dispatch('onBall',this.user_id)
            }
        },
        btnSub(){
            if(this.user.subscribe){
                this.$store.dispatch('offSubscribe',this.user_id)
            }else{
                this.$store.dispatch('onSubscribe',this.user_id)
            }
        },
        btnOther(){
            console.log('btnOther')
        },
    },
    computed:{
        filterTabs(){
            return this.$options.tabs.filter(tab=>{
                return typeof tab.filter == 'undefined' || tab.filter(this.user)
            })
        },
        user_id(){
            return parseInt(this.$route.params.id);
        },
        user(){
            return this.$store.getters.getUser4id(this.user_id)
        },
        fillNickName(){
            return (this.user.name+' ').repeat(500)
        },
    },
    beforeRouteEnter(to, from, next) {
        let id = parseInt(to.params.id);
        if(typeof id == 'number' && id>0){
            next()
        }else{
            next({name:'not-found'})
        }
    },
    beforeRouteUpdate(to,from,next){
        let id = parseInt(to.params.id);
        if(typeof id == 'number' && id>0){
            this.updateSelectTab(to.params.tab)
            next()
        }else{
            next({name:'not-found'})
        }

    },
    mounted(){
        this.updateSelectTab(this.$route.params.tab)
    }
}
