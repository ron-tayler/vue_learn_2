<template>
    <div :id="id" class="page-profile" :key="user_id">
        <div id="profile-banner-box">
            <div class="profile-banner-text">
                {{fillNickName}}
            </div>
            <div class="profile-header-box">
                <div class="profile-header-notify">
                    <span>Воспользуйтесь расписанием для своих трансляций</span>
                    <div class="btn-group">
                        <button class="btn btn-blue">Перейти</button>
                        <button class="btn btn-close">X</button>
                    </div>
                </div>
                <div class="profile-header-stream">
                    <div class="profile-header-stream-info">
                        Информация и название
                    </div>
                    <div class="profile-header-stream-video">
                        <video-player :options="video_options"></video-player>
                    </div>
                </div>
            </div>
        </div>
        <div id="profile-nav-box">
            <div class="profile-nav-top">
                <div class="profile-nav-top-left">
                    <div class="profile-avatar-box">
                        <div class="profile-avatar-badge">В эфире</div>
                        <img :src="user.img" alt="avatar">
                    </div>
                    <div class="profile-info-box">
                        <div class="profile-info-name">{{user.name}}</div>
                        <div class="profile-info-sub">
                            <span class="text-count-sub">
                                <span class="count">{{user.track_count}}</span>
                                <span> фолловеров</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="profile-nav-top-right">
                    <div v-if="user_id===$store.getters.getUserId"
                         class="profile-btn-box">
                        <div class="btn btn-coral">менеджер курсов</div>
                        <div class="btn btn-blue">настроить канал</div>
                        <div class="btn btn-light">
                            <fa-icon icon="ellipsis-v"></fa-icon>
                        </div>
                    </div>
                    <div v-else class="profile-btn-box">
                        <div class="btn"
                             :class="{'btn-blue':!user.track,
                             'btn-light':user.track}"
                             @click="btnHeart">
                            <fa-icon icon="heart"></fa-icon>
                            <span v-if="!user.track"> Отслеживать</span>
                        </div>
                        <div class="btn btn-light"
                             v-if="user.track"
                             @click="btnBell">
                            <fa-icon v-if="user.ball" icon="bell"></fa-icon>
                            <fa-icon v-else icon="bell-slash"></fa-icon>
                        </div>
                        <div class="btn"
                             v-if="!user.subscribe"
                             :class="{'btn-coral':!user.subscribe,
                             'btn-light':user.subscribe}"
                             @click="btnSub">
                            <span>Подписаться</span>
                        </div>
                        <div class="btn btn-light" @click="btnOther">
                            <fa-icon icon="ellipsis-v"></fa-icon>
                        </div>
                    </div>
                </div>
            </div>
            <div class="profile-nav-bottom">
                <ul class="profile-nav-tabs">
                    <li class="profile-nav-tab"
                        v-for="(tab,i) in filterTabs"
                        :key="i"
                        :class="{active:(active_tab===i)}"
                        @click="clickTab(i)">{{tab.name}}</li>
                </ul>
            </div>
        </div>
        <div id="profile-body-box">
            <component class="profile-body" :is="filterTabs[active_tab].component" :user_id="user_id"></component>
        </div>
    </div>
</template>

<script src="./script.js"></script>
<style src="./page-profile.css"></style>

