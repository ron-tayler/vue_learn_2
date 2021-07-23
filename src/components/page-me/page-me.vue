<template>
    <div :id="id" class="page-me">
        <div class="chats">
            <div class="chats-el" v-for="el in chats" :key="el.id" @click="select_chat_id=el.id">
                <div class="chats-el-img"></div>
                <div class="chats-el-info">
                    <div class="chats-el-title">
                        <span>{{el.title}}</span>
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
                    :messages="chats.find(el=>el.id===select_chat_id).messages"
                    :key="select_chat_id"
                    :chatId="select_chat_id"
                    :chat="chats.find(el=>el.id===select_chat_id)"
                    @scrollTop="scrollTop"
                    @msgSend="msgSend"
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
            chats:null,
            LPs:[]
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
                this.chats.filter(el=>el.id===id)[0].messages = [...messages.reverse(),...this.chats.filter(el=>el.id===id)[0].messages];
            },
            msgSend(data){
                console.log(data);
                let chat = this.chats.filter(el=>el.id===data.chatId)[0];
                let parent = data.parent.map(id=>({
                    type:'message',
                    peer_id:chat.type+''+chat.id,
                    message_id:id
                }));
                API.messageSend(chat.type+''+chat.id,data.text,parent);
            }
        },
        watch:{
            async select_chat_id(id){
                if(!( id>0 && this.chats && this.chats.filter(el=>el.id===id)[0].messages?.length===0 )) return;
                this.chats.filter(el=>el.id===id)[0].messages = (await API.getLastMessages4peerId(id)).reverse()??[];

            }
        },
        async mounted() {
            window.rtf_me = this;
            window.addEventListener('keyup',this.keyup)

            // Получить список чатов(limit 25) пользователя по токену в месте с этим приходят последние сообщения(limit 25) каждого чата
            this.chats = await API.getChats();
            // Запустить LP'ы
            for (let i =0;this.chats.length>i;i++){
                (()=>{
                    let chat = this.chats[i];
                    let ts = 0;
                    if(chat.messages.length>0) ts = chat.messages[chat.messages.length-1].id;
                    /**/
                    setTimeout(function longTO() {
                        API.msgLP(chat.type+''+chat.id,ts)
                            .then((messages)=>{
                                if(messages && typeof messages == 'object' && messages.length>0){
                                    ts = messages[messages.length - 1].id;
                                    chat.messages.push(...messages);
                                }
                                setTimeout(longTO,0);
                            })
                    },0);//*/
                })()
            }
        },
        destroyed(){
            // Завершить все LP'ы
            window.removeEventListener('keyup',this.keyup)
        }
    }
</script>

<style src="./style.css"></style>