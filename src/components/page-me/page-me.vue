<template>
    <div :id="id" class="page-me">
        <div class="chats">
            <div class="chats-el" v-for="el in chats" :key="el.id" @click="select_chat_id=el.id">
                <div class="chats-el-img"></div>
                <div class="chats-el-info">
                    <div class="chats-el-title">
                        <span>Стрим #{{el.title}}</span>
                    </div>
                    <div class="chats-el-last-msg">
                        <span>{{el.last_msg}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="chat-body-box">
            <keep-alive>
                <chat-body
                    v-if="select_chat_id"
                    :messages="chats[select_chat_id].messages"
                    :key="select_chat_id"
                    :chatId="select_chat_id"
                    @scrollTop="scrollTop"
                ></chat-body>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import API from './me-api';
    import ChatBody from './chat-body'

    export default {
        components:{ChatBody},
        props:['id'],
        data:()=>({
            user_id:0,
            select_chat_id: 0,
            chats:null
        }),
        methods:{
            keyup(e){
                switch (e.code) {
                    case 'Escape':
                        this.select_chat_id = 0;
                }
            },
            async scrollTop(id){
                let count = this.chats[id].messages.length;
                let messages = await API.getLastMessages4peerId(id,count)??[];
                this.chats[id].messages = [...messages.reverse(),...this.chats[id].messages];
            }
        },
        watch:{
            async select_chat_id(id){
                if(!( id>0 && this.chats && this.chats[id].messages?.length===0 )) return;
                this.chats[id].messages = (await API.getLastMessages4peerId(id)).reverse()??[];
            }
        },
        mounted() {
            this.chats = API.getChats();
            for (let chat_id in this.chats){
                let chat = this.chats[chat_id];
                API.getLastMessages4peerId(chat.id).then((messages)=>{
                    let ts = 0;
                    if(messages.length>0) ts = messages[0].id;
                    setTimeout(function longTO() {
                        API.msgLP(chat.id,ts)
                            .then((messages)=>{
                                if(messages && typeof messages == 'object' && messages.length>0){
                                    ts = messages[messages.length - 1].id;
                                }
                                setTimeout(longTO,0);
                            })
                    },0);
                });
            }
            window.addEventListener('keyup',this.keyup)
        },
        destroyed(){
            window.removeEventListener('keyup',this.keyup)
        }
    }
</script>

<style src="./style.css"></style>
