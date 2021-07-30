import Vue from 'vue'
import Vuex from "vuex"

import chat from './module_chat.js'
import localStorage from './module_localstorage.js'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules:{
        chat,
        localStorage
    },
    state:{
        user:0,
        access_token:'',
        users: [
            {
                id:953,
                name:'Ron_Tayler',
                img:'https://dummyimage.com/100/43ded1/fff&text=R',
                track_count: 13,
                images_count:0,
                videos_count:1
            },{
                id:1,
                on_air:true,
                name:'Xatikont',
                img:'https://dummyimage.com/100/43ded1/fff&text=X',
                track_count: 367, // Кол-во отслеживают
                track: false, // Я подписан
                ball: false, // Уведомления
                subscribe: false, // Я подписан
                view_timeline:true, // показать расписание
                images_count:0, // Кол-во публикаций
                videos_count:4, // Кол-во видео
                streams:[
                    {
                        name:'Стрим 3.2',
                        img:'https://dummyimage.com/300x169/fad677/ffffff&text=Стрим+3',
                        viewers:1067, // Зрителей
                        views:1710, // Просмотров
                        on_air:true,
                        UTC_timestamp_start:new Date(2021,6,8,17).valueOf(),
                        length_seconds:60*60*4,
                        user:{
                            name:'Xatikont',
                            img:'https://dummyimage.com/100/43ded1/ffffff&text=X'
                        }
                    },{
                        name:'Стрим 3.1',
                        img:'https://dummyimage.com/300x169/fad677/ffffff&text=Стрим+3',
                        viewers:1067, // Зрителей
                        views:1710, // Просмотров
                        on_air:true,
                        UTC_timestamp_start:new Date(2021,6,8,10).valueOf(),
                        length_seconds:60*60*4,
                        user:{
                            name:'Xatikont',
                            img:'https://dummyimage.com/100/43ded1/ffffff&text=X'
                        }
                    },{
                        name:'Стрим 2',
                        img:'https://dummyimage.com/300x169/0e9bd8/ffffff&text=Стрим+2',
                        viewers:0,
                        views:754, // Просмотров
                        UTC_timestamp_start:new Date(2021,5,28,14).valueOf(),
                        length_seconds:60*60*6,
                        user:{
                            name:'Xatikont',
                            img:'https://dummyimage.com/100/43ded1/ffffff&text=X'
                        }
                    },{
                        name:'Стрим 1',
                        img:'https://dummyimage.com/300x169/530a09/ffffff&text=Стрим+1',
                        viewers:0,
                        views:1413, // Просмотров
                        UTC_timestamp_start:new Date(2021,6,5,16).valueOf(),
                        length_seconds:60*60*2,
                        user:{
                            name:'Xatikont',
                            img:'https://dummyimage.com/100/43ded1/ffffff&text=X'
                        }
                    }
                ],
                videos:[
                    {
                        name:'Первое видео',
                        img:'https://dummyimage.com/300x169/43ded1/ffffff&text=Первое+видео',
                        views:13, // Просмотров,
                        user:{
                            name:'Xatikont',
                            img:'https://dummyimage.com/100/43ded1/ffffff&text=X'
                        }
                    },{
                        name:'#1 Синтаксис и переменные',
                        img:'https://dummyimage.com/300x169/43ded1/ffffff&text=JavaScript+%231',
                        views:713, // Просмотров,
                        user:{
                            name:'Xatikont',
                            img:'https://dummyimage.com/100/43ded1/ffffff&text=X'
                        }
                    },{
                        name:'Второе видео',
                        img:'https://dummyimage.com/300x169/43ded1/ffffff&text=Второе+видео',
                        views:7, // Просмотров
                        user:{
                            name:'Xatikont',
                            img:'https://dummyimage.com/100/43ded1/ffffff&text=X'
                        }
                    },{
                        name:'Третье видео',
                        img:'https://dummyimage.com/300x169/43ded1/ffffff&text=Третье+видео',
                        views:29, // Просмотров
                        user:{
                            name:'Xatikont',
                            img:'https://dummyimage.com/100/43ded1/ffffff&text=X'
                        }
                    }
                ],
                playlists:[
                    {
                        name:'Изучаем JavaScript',
                        videos:[
                            {
                                name:'#1 Синтаксис и переменные',
                                img:'https://dummyimage.com/300x169/43ded1/ffffff&text=JavaScript+%231',
                                views:713, // Просмотров,
                                user:{
                                    name:'Xatikont',
                                    img:'https://dummyimage.com/100/43ded1/ffffff&text=X'
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    mutations:{
        track(state, data){
            state.users.find(user=>user.id===data.user_id).track = data.status;
        },
        ball(state, data){
            state.users.find(user=>user.id===data.user_id).ball = data.status;
        },
        subscribe(state, data){
            state.users.find(user=>user.id===data.user_id).subscribe = data.status;
        }
    },
    getters:{
        getLang(){
            return 'ru'
        },
        getUserId(state){
            return state.user
        },
        getAccessToken(state){
            return state.access_token
        },
        getUser4id:state=>id=>{
            return state.users.find(user=>user.id===id)
        }
    },
    actions:{
        onTrack(ctx, to_user_id){
            ctx.commit('track',{user_id:to_user_id,status:true})
            ctx.commit('ball',{user_id:to_user_id,status:true})
        },
        offTrack(ctx, to_user_id){
            ctx.commit('track',{user_id:to_user_id,status:false})
            ctx.commit('ball',{user_id:to_user_id,status:false})
        },
        onBall(ctx, to_user_id){
            ctx.commit('ball',{user_id:to_user_id,status:true})
        },
        offBall(ctx, to_user_id){
            ctx.commit('ball',{user_id:to_user_id,status:false})
        },
        onSubscribe(ctx, to_user_id){
            ctx.commit('subscribe',{user_id:to_user_id,status:true})
        },
        offSubscribe(ctx, to_user_id){
            ctx.commit('subscribe',{user_id:to_user_id,status:false})
        }
    }
});

export default store;
