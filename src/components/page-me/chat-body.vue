<template>
    <div class="chat-body">
        <modal-list-chats ref="modal-list-chats" :chats="chats"></modal-list-chats>
        <div class="chat-body__header">
            <template v-if="messages_select.length===0">
                <div class="chat-body__header__chat-title">
                    {{chat.title}}
                </div>
                <div class="chat-body__header__user-count">
                    3 участника
                </div>
                <div class="empty"></div>
                <button class="btn btn-light btn-icon">
                    <fa-icon icon="search"></fa-icon>
                </button>
                <drop-menu>
                    <template v-slot:button>
                        <button class="btn btn-light btn-icon">
                            <fa-icon icon="ellipsis-h"></fa-icon>
                        </button>
                    </template>
                    <template v-slot:menu>
                        <button class="btn btn-light">
                            <fa-icon icon="paperclip" style="width: 15px"></fa-icon>
                            Показать вложения
                        </button>
                        <button class="btn btn-light">
                            <fa-icon icon="user-plus" style="width: 15px"></fa-icon>
                            Добавить собеседников
                        </button>
                        <button class="btn btn-light">
                            <fa-icon icon="volume-mute" style="width: 15px"></fa-icon>
                            Без звука
                        </button>
                        <hr style="width: 100%; height: 1px">
                        <button class="btn btn-light">
                            <fa-icon icon="trash-alt" style="width: 15px"></fa-icon>
                            Очистить чат
                        </button>
                        <button class="btn btn-light">
                            <fa-icon icon="times" style="width: 15px"></fa-icon>
                            Выйти из чата
                        </button>
                    </template>
                </drop-menu>

                <div class="chat-body__header__chat-image"></div>
            </template>
            <template v-else>
                <div class="chat-body__header__select-messages-count">
                    {{messages_select.length}} cообщения
                </div>
                <button class="btn btn-light btn-icon" @click="msgsUnSelect">
                    <fa-icon icon="times"></fa-icon>
                </button>
                <div class="empty"></div>
                <button class="btn btn-light btn-icon">
                    <fa-icon icon="star"></fa-icon>
                </button>
                <button class="btn btn-light btn-icon">
                    <fa-icon icon="trash-alt"></fa-icon>
                </button>
                <button class="btn btn-light btn-icon">
                    <fa-icon icon="ban"></fa-icon>
                </button>
                <button class="btn btn-blue" @click="msgsForward">
                    Переслать
                </button>
                <button class="btn btn-blue" @click="msgsReply">
                    Ответить
                </button>
            </template>
        </div>
        <div ref="chatScroll" class="chat-msg-scroll" @scroll="chatScroll">
            <div class="chat-date">
                Сегодня
            </div>
            <div class="chat-msg-box"
                v-for="msg in messages"
                :key="msg.id"
                :class="{
                    notify:(msg.type==='notify'),
                    active:(messages_select.indexOf(msg.id)!==-1),
                    my:(msg.user_id===$store.getters.getUserId)
                }"
                @click="msgSelect(msg.id)">
                <template v-if="msg.parent.length>0">
                    <template v-for="(parent,i) in msg.parent">
                        <template v-if="parent.type==='notify'">
                            <div class="chat-notify" :key="i">
                                <template v-if="parent.code==='new_user'">
                                    #{{parent.user_id}} присоединился
                                </template>
                            </div>
                        </template>
                    </template>
                </template>
                <template v-if="msg.type!=='notify'">
                    <div class="chat-msg__left-btn">
                        <fa-icon icon="check-circle"></fa-icon>
                    </div>
                    <div class="chat-msg-center-box">
                        <div class="chat-msg__avatar"></div>
                        <div class="chat-msg">
                            <div class="chat-msg__user-name">#{{msg.user_id}}</div>
                            <div class="chat-msg__parent-list" v-if="msg.parent.length">
                                <div class="chat-msg__parent" v-for="(parent_item,i) in msg.parent" :key="i">
                                    <div class="chat-msg__user-name">#{{parent_item.user_id}}</div>
                                    <div class="chat-msg__parent-list" v-if="parent_item.parent.length">
                                        <div class="chat-msg__parent" v-for="(parent_parent_item,i) in parent_item.parent" :key="i">
                                            <div class="chat-msg__user-name">#{{parent_parent_item.user_id}}</div>
                                            <div class="chat-msg__text">{{parent_parent_item.text}}</div>
                                        </div>
                                    </div>
                                    <div class="chat-msg__text">{{parent_item.text}}</div>
                                </div>
                            </div>
                            <div class="chat-msg__text">{{msg.message}}</div>
                        </div>
                    </div>
                    <div class="chat-msg__right-btn">
                        <fa-icon icon="reply" @click.stop="msgReply(msg.id)"></fa-icon>
                        <fa-icon icon="chevron-down"></fa-icon>
                    </div>
                </template>
            </div>
        </div>
        <div class="chat-msg-input-parent"
            v-if="messages_parent.length">
            <div class="chat-msg-input-parent__list">
                <div class="chat-msg-input-parent__msg" v-for="msg in messages_parent" :key="msg.id">
                    {{ msg.user_id }}: {{msg.message}}
                </div>
            </div>
            <div class="chat-msg-input-parent__right">
                <button class="btn btn-light" @click="messages_parent=[]">X</button>
            </div>
        </div>
        <div class="chat-msg-inputs">
            <div class="chat-msg-inputs-left"></div>
            <div class="chat-msg-input-box">
                <input type="text" placeholder="Написать сообщение" v-model="msgText" @keypress.enter="msgSend"/>
            </div>
            <div class="chat-msg-inputs-right" @click="msgSend">
                <fa-icon icon="paper-plane"></fa-icon>
            </div>
        </div>
    </div>
</template>

<script>
    import ModelListChats from '@/components/modals/list-chats'

    export default {
        name: "chat-body",
        props: {
            'messages':Array,
            'chatId':String,
            'chat':Object,
            'chats':Array
        },
        components:{
            'modal-list-chats':ModelListChats
        },
        SCROLL_EVENT_HEIGHT_TOP: 50,
        SCROLL_EVENT_HEIGHT_BOTTOM: 50,
        data:()=>({
            chatScroll_ScrollHeight: -1,
            chatScroll_ScrollTop: -1,
            chatScroll_ScrollBottom: -1,
            msgText: '',
            messages_select:[],
            messages_parent:[]
        }),
        computed:{},
        mounted(){
            this.$once('hook:updated',function(){
                this.chatScrollInit();
                this.chatScrollDown();
            })
        },
        beforeUpdate() {
            this.chatScroll_ScrollHeight = this.$refs.chatScroll.scrollHeight;
        },
        updated(){
            this.chatScroll_ScrollTop += this.$refs.chatScroll.scrollHeight - this.chatScroll_ScrollHeight;
        },
        activated(){
            this.chatScrollSync()
        },
        methods:{
            chatScrollInit(){
                let div_chatScroll = this.$refs.chatScroll;
                this.chatScroll_ScrollHeight = div_chatScroll.scrollHeight;
                this.chatScroll_ScrollTop = div_chatScroll.scrollTop;
                this.chatScroll_ScrollBottom = div_chatScroll.scrollHeight - div_chatScroll.clientHeight - div_chatScroll.scrollTop;
            },
            chatScrollSync(){
                let div_chatScroll = this.$refs.chatScroll;
                div_chatScroll.scrollTop = this.chatScroll_ScrollTop;
            },
            chatScroll(){
                let div_chatScroll = this.$refs.chatScroll;
                let scrollTop = div_chatScroll.scrollTop;
                let scrollBottom = (div_chatScroll.scrollHeight - div_chatScroll.clientHeight - scrollTop);
                if(scrollTop<this.$options.SCROLL_EVENT_HEIGHT_TOP && this.chatScroll_ScrollTop>this.$options.SCROLL_EVENT_HEIGHT_TOP){
                    this.chatScroll_onScrollTop();
                }
                if(scrollBottom<this.$options.SCROLL_EVENT_HEIGHT_BOTTOM && this.chatScroll_ScrollBottom>this.$options.SCROLL_EVENT_HEIGHT_TOP){
                    this.chatScroll_onScrollBottom();
                }
                this.chatScroll_ScrollTop = scrollTop;
                this.chatScroll_ScrollBottom = scrollBottom;
            },
            chatScroll_onScrollTop(){
                this.$emit('scrollTop',this.chatId);
            },
            chatScroll_onScrollBottom(){
                this.$emit('scrollBottom');
            },
            chatScrollDown(){
                this.chatScroll_ScrollBottom = 0;
            },
            msgSend(){
                if(this.msgText !== '' || this.messages_parent.length!==0){
                    this.$emit('msgSend', {
                        chatId:this.chatId,
                        text:this.msgText,
                        parent:this.messages_parent.map(el=>el)
                    });
                    this.messages_parent = [];
                    this.msgText = '';
                }
            },
            msgSelect(id){
                let index = this.messages_select.indexOf(id);
                if(index != -1){
                    this.messages_select.splice(index,1);
                }else{
                    this.messages_select.push(id);
                }
            },
            msgsUnSelect(){
                this.messages_select = []
            },
            msgReply(id){
                this.messages_parent = [];
                this.messages_parent.push(this.messages.find(el=>el.id===id));
            },
            msgsReply(){
                this.messages_parent = this.messages_select.map(id=>this.messages.find(msg=>msg.id===id));
                this.messages_select = [];
            },
            msgsForward(){
                let vm = this;
                this.$refs['modal-list-chats'].openModal()
                .then(id=>{
                    vm.$emit('msgForward', {
                        chat_id:id,
                        messages:vm.messages_select.map(el => el)
                    });
                    vm.msgsUnSelect();
                })

            }
        },
        watch:{
            chatScroll_ScrollTop(newValue){
                this.$refs.chatScroll.scrollTop = newValue;
            },
            chatScroll_ScrollBottom(newValue){
                this.chatScroll_ScrollTop = this.$refs.chatScroll.scrollHeight - this.$refs.chatScroll.clientHeight - newValue;
            },
            messages(){}
        }
    }
</script>

<style>

</style>
