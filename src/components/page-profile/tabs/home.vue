<template>
    <div class="profile-body">
        <div class="card-block video-carousel">
            <div class="video-carousel-header">Трансляции</div>
            <inline-video-list v-if="streams_list.length" :videos="streams_list"></inline-video-list>
            <div class="video-carousel-msg" v-else>Здесь пока ничего нет.</div>
        </div>
        <div class="card-block video-carousel">
            <div class="video-carousel-header">Видео</div>
            <inline-video-list v-if="videos_list.length" :videos="videos_list"></inline-video-list>
            <div class="video-carousel-msg" v-else>Здесь пока ничего нет.</div>
        </div>
        <div class="card-block video-carousel">
            <div class="video-carousel-header">Публикации</div>
            <div class="video-carousel-msg">Здесь пока ничего нет.</div>
        </div>
    </div>
</template>

<script>
    import InlineVideoList from '@/components/base/inline-video-list.vue'

    export default {
        name: "home",
        components:{InlineVideoList},
        props:{
            user_id:Number
        },
        computed:{
            streams_list(){
                return this.$store.getters.getUser4id(this.user_id).streams ?? [];
            },
            videos_list(){
                return this.$store.getters.getUser4id(this.user_id).videos ?? [];
            }
        }
    }
</script>

<style scoped>

</style>
