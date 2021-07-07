<template>
    <div class="profile-body">
        <div class="card-block video-carousel">
            <div class="video-carousel-header">Видео</div>
            <inline-video-list v-if="videos_list.length" :videos="videos_list"></inline-video-list>
            <div class="video-carousel-msg" v-else>Здесь пока ничего нет.</div>
        </div>
        <div class="card-block video-carousel" v-for="(playlist,i) in playlists_list" :key="i">
            <div class="video-carousel-header">Плейлист "{{playlist.name}}"</div>
            <inline-video-list v-if="playlist.videos.length" :videos="playlist.videos"></inline-video-list>
            <div class="video-carousel-msg" v-else>Здесь пока ничего нет.</div>
        </div>
    </div>
</template>

<script>
    import InlineVideoList from '@/components/base/inline-video-list.vue'

    export default {
        name: "videos",
        components:{InlineVideoList},
        props:{
            user_id:Number
        },
        computed:{
            videos_list(){
                return this.$store.getters.getUser4id(this.user_id).videos ?? [];
            },
            playlists_list(){
                return this.$store.getters.getUser4id(this.user_id).playlists ?? [];
            }
        }

    }
</script>

<style>

</style>
