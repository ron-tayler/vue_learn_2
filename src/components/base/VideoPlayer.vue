<template>
    <video ref="videoPlayer" class="video-js"></video>
</template>
<script>
    import video_js from "video.js";

    export default {
        name: "VideoPlayer",
        inheritAttrs: false,
        props: {
            options: Object
        },
        DEFAULT_OPTIONS:{
            autoplay: true,
            controls: true,
            playbackRates: [0.25, 0.5, 1, 1.5, 2],
            poster: "https://youinroll.com/storage/uploads/def-stream.jpg"
        },
        data:()=>({
            player: null
        }),
        mounted() {
            for(let opt in this.$options.DEFAULT_OPTIONS){
                this.options[opt] = this.options[opt]??this.$options.DEFAULT_OPTIONS[opt];
            }
            this.player = video_js(this.$refs.videoPlayer, this.options, function(){});
            this.player.on('error',()=>{
                this.player.errorDisplay.close()
            })
        },
        beforeDestroy() {
            if (this.player) {
                this.player.dispose()
            }
        }
    }
</script>
<style scoped>
    .video-js{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>
<style src="video.js/dist/video-js.css"></style>
