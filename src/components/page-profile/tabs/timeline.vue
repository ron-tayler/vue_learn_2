<template>
    <div class="profile-body tab-timeline">
        <div class="card-block">
            <h1>Последняя трансляция Ron_Tayler была 1 день назад</h1>
            <div class="timeline-btn-box">
                <div class="btn btn-blue">Сегодня</div>
                <div class="btn btn-light"><fa-icon icon="chevron-left"></fa-icon></div>
                <div class="btn btn-light"><fa-icon icon="chevron-right"></fa-icon></div>
                <div class="btn btn-light"><fa-icon icon="calendar-alt"></fa-icon></div>
                <span class="timeline-date-between">5 июл. 2021г. - 11 июл. 2021г.</span>
            </div>
            <div class="timeline-grid">
                <div class="timeline-timezone">
                    <span>GMT+3</span>
                </div>
                <div class="timeline-hours-line">
                    <div class="hours-box"><span class="hours">09</span></div>
                    <div class="hours-box"><span class="hours">10</span></div>
                    <div class="hours-box"><span class="hours">11</span></div>
                    <div class="hours-box"><span class="hours">12</span></div>
                    <div class="hours-box"><span class="hours">13</span></div>
                    <div class="hours-box"><span class="hours">14</span></div>
                    <div class="hours-box"><span class="hours">15</span></div>
                    <div class="hours-box"><span class="hours">16</span></div>
                    <div class="hours-box"><span class="hours">17</span></div>
                    <div class="hours-box"><span class="hours">18</span></div>
                    <div class="hours-box active"><span class="hours">19</span></div>
                    <div class="hours-box"><span class="hours">20</span></div>
                </div>
                <div class="timeline-day-info">
                    <span>пн</span>
                    <span>05.07</span>
                </div>
                <div class="timeline-day-line">
                    <div class="timeline-card"
                         :style="getStylePos4time(9,20,lesson_1.start,lesson_1.stop)">
                        <span class="timeline-card-name">{{lesson_1.name}}</span>
                        <span>
                            <span class="timeline-card-category">{{lesson_1.category}} </span>•
                            <span class="timeline-card-view"> {{lesson_1.view}} просмотров</span>
                        </span>
                        <span class="timeline-card-time">{{lesson_1.time_ago}}</span>
                        <div class="timeline-card-img">
                            <img :src="lesson_1.img" alt="">
                        </div>
                    </div>
                </div>
                <div class="timeline-day-info active">
                    <span>вт</span>
                    <span>06.07</span>
                </div>
                <div class="timeline-day-line active"></div>
                <div class="timeline-day-info">
                    <span>ср</span>
                    <span>07.07</span>
                </div>
                <div class="timeline-day-line"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "timeline",
        data:()=>({
            timeline:[],
            lesson_1:{
                name:'Скучный вторник | обсуждаем особенности Vue.js',
                category:'Программирование и ИТ',
                view: 140,
                time_ago:'1 день назад',
                start: {h:10,m:30},
                stop: {h:19,m:10},
                img: 'https://dummyimage.com/160x90/3C8864/ffffff'
            }
        }),
        methods:{
            getStylePos4time(tl_s,tl_f,el_s,el_f){
                let count_h = tl_f-tl_s+1;
                let left = 100/count_h*(el_s.h-tl_s)+100/count_h/60*(el_s.m);
                let right = 100-100/count_h*(el_f.h-tl_s)-100/count_h/60*(el_f.m);
                return {
                    left:left+'%',
                    right:right+'%'
                }
            }
        }
    }
</script>

<style>
    .profile-body.tab-timeline {
        /*height: 900px;*/
    }
    .timeline-btn-box {
        margin-bottom: 10px;
    }
    .timeline-date-between{
        font-weight: bold;
    }
    .timeline-btn-box > * {
        margin-right: 10px;
    }
    .timeline-grid{
        display: grid;
        grid-template-columns: 80px 1fr;
        /*border: 1px solid var(--color-lvl-4);*/
        border-radius: 10px;
        box-shadow: var(--shadow-base);
    }
    .timeline-timezone{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: bold;
        color: #888888;
        height: 40px;
        border-bottom: 1px solid var(--color-lvl-4);
    }
    .timeline-hours-line{
        display: flex;
        justify-content: space-between;
        align-items: stretch;
        height: 40px;
        font-weight: bold;
        border-bottom: 1px solid var(--color-lvl-4);
    }
    .timeline-hours-line .hours-box{
        flex-grow: 1;
        padding-left:5px;
        flex-basis: 0;
        display: flex;
        align-items: center;
        position: relative;
    }
    .timeline-hours-line .hours-box.active{
        background: #f0f0f0;
    }
    .timeline-hours-line .hours-box.active:before{
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 3px;
        background: var(--color-yir-purple);
    }
    .timeline-day-info{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-weight: bold;
        background: #f0f0f0;
    }
    .timeline-day-info>*{
        margin-bottom: 5px;
    }
    .timeline-day-line{
        height: 100px;
        background: #ffffff;
        position: relative;
    }
    .timeline-day-info.active{
        background: #e0e0e0;
        border-right: 3px solid var(--color-yir-purple);
    }
    .timeline-day-line.active{
        background: #f0f0f0;
    }
    .timeline-card{
        position: absolute;
        padding: 5px 10px;
        border: 1px solid #888;
        border-radius: 5px;
        top: 5px;
        bottom: 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        overflow: hidden;
    }
    .timeline-card-name{
        font-weight: bold;
    }
    .timeline-card-category{
        font-size: 14px;
        color: var(--color-yir-purple);
    }
    .timeline-card-view{
        font-size: 14px;
    }
    .timeline-card-time{
        border-left: 4px solid var(--color-yir-purple);
        padding-left: 5px;
    }
    .timeline-card-img{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 160px;
    }
    .timeline-card-img img{
        height: 100%;
        width: 100%;
    }
</style>
