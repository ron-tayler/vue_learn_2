<template>
    <div class="inline-video-list">
        <video-card v-for="(video,i) in videos" :key="i" :video="video"></video-card>
    </div>
</template>

<script>
    import VideoCard from '@/components/base/video-card.vue'

    export default {
        name: "inline-video-list",
        components:{VideoCard},
        props:['videos']
    }
</script>

<style>
    .inline-video-list{
        /*height: 200px;*/
        overflow: hidden;
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
    }
    .inline-video-list>*{
        margin-right: 20px;
    }
</style>
