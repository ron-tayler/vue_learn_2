<template>
    <div class="chat-body">
        <div ref="chatScroll" class="chat-msg-scroll" @scroll="chatScroll">
            <div class="chat-date">
                Сегодня
            </div>
            <div class="chat-msg-box" :class="{notify:(msg.type==='notify')}" v-for="msg in messages" :key="msg.id">
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
                <template v-if="msg.message!==''">
                    <div class="chat-msg__left-btn">
                        <fa-icon icon="check-circle"></fa-icon>
                    </div>
                    <div class="chat-msg__avatar"></div>
                    <div class="chat-msg">
                        <div class="chat-msg__user-name">{{msg.user_id}}</div>
                        <div class="chat-msg__text">{{msg.message}}</div>
                    </div>
                    <div class="chat-msg__right-btn">
                        <fa-icon icon="reply"></fa-icon>
                        <fa-icon icon="chevron-down"></fa-icon>
                    </div>
                </template>
            </div>
        </div>
        <div class="chat-msg-inputs">
            <div class="chat-msg-inputs-left"></div>
            <div class="chat-msg-input-box">
                <input type="text" placeholder="Написать сообщение" v-model="msgText" @keypress.enter="msgSend"/>
            </div>
            <div class="chat-msg-inputs-right"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "chat-body",
        props:['messages','chatId'],
        SCROLL_EVENT_HEIGHT_TOP: 50,
        SCROLL_EVENT_HEIGHT_BOTTOM: 50,
        data:()=>({
            chatScroll_ScrollHeight: -1,
            chatScroll_ScrollTop: -1,
            chatScroll_ScrollBottom: -1,
            msgText: '',
        }),
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
                this.$emit('msgSend', {chatId:this.chatId,text:this.msgText});
                this.msgText = '';
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
