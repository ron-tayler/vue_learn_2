<template>
    <div class="video-card">
        <div class="video-box">
            <div v-if="video.on_air" class="video-bubble">Онлайн</div>
            <img :src="video.img" :alt="video.name">
        </div>
        <div class="video-bottom">
            <div class="video-info-avatar-box">
                <img :src="video.user.img" :alt="video.user.name">
            </div>
            <div class="video-info-box">
                <div class="video-info-el video-name">{{video.name}}</div>
                <div class="video-info-el video-author">{{video.user.name}}</div>
                <div class="video-info-el video-views">
                    <fa-icon v-if="video.on_air" icon="users"></fa-icon>
                    <fa-icon v-else icon="eye"></fa-icon>
                    <span> {{(video.on_air)?video.viewers:video.views}}</span>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "video-card",
        props:{
            video: Object
        }
    }
</script>

<style>
    .video-card{
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
    .video-box{
        width: 300px;
        height: 169px;
        position: relative;
        margin-bottom: 10px;
    }
    .video-box img{
        height: 100%;
        width: 100%;
    }
    .video-box .video-bubble{
        position: absolute;
        right: 10px;
        top: 10px;
        padding: 2px 5px;
        background: var(--color-yir-coral);
        color: #fff;
        border-radius: 5px;
    }
    .video-bottom{
        display: flex;
        align-items: center;
    }
    .video-info-avatar-box{
        flex-shrink: 0;
    }
    .video-info-box{
        flex-grow: 1;
        margin-left: 10px;
    }
    .video-info-avatar-box{
        width: 50px;
        height: 50px;
        border-radius: 50px;
        overflow: hidden;
    }
    .video-info-avatar-box img{
        width: 100%;
        height: 100%;
    }
    .video-info-el{
        color: var(--color-text);
    }
    .video-name{
        font-weight: bold;
    }
    .video-author{
        font-size: 15px;
    }
    .video-views{
        font-size: 14px;
        opacity: .8;
    }
</style>
