import VideoPlayer from "@/components/base/VideoPlayer";

export default {
    props:['id'],
    components:{VideoPlayer},
    data:()=>({
        video_options:{
            sources: [{
                src: "https://vjs.zencdn.net/v/oceans.mp4",
                type: "video/mp4"
            }]
        },
        profile:{
            name:'Ron_Tayler'
        }
    }),
    metaInfo(){return{
        title: this.profile.name
    }},
    computed:{
        fillNickName(){
            return (this.profile.name+' ').repeat(500)
        }
    },
    mounted() {

    }
}
