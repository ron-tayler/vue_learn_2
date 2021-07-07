import Vue from 'vue'
import Vuex from "vuex"

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        user:953,
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
                        name:'Стрим 3',
                        img:'https://dummyimage.com/300x169/fad677/ffffff&text=Стрим+3',
                        viewers:1067, // Зрителей
                        on_air:true,
                        user:{
                            name:'Xatikont',
                            img:'https://dummyimage.com/100/43ded1/ffffff&text=X'
                        }
                    },{
                        name:'Стрим 2',
                        img:'https://dummyimage.com/300x169/0e9bd8/ffffff&text=Стрим+2',
                        views:754, // Просмотров
                        user:{
                            name:'Xatikont',
                            img:'https://dummyimage.com/100/43ded1/ffffff&text=X'
                        }
                    },{
                        name:'Стрим 1',
                        img:'https://dummyimage.com/300x169/530a09/ffffff&text=Стрим+1',
                        views:1413, // Просмотров
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
        getUserId(state){
            return state.user
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
