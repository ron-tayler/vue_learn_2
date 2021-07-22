<template>
    <div class="chat-body">
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
                    <div class="chat-msg__avatar"></div>
                    <div class="chat-msg">
                        <div class="chat-msg__user-name">#{{msg.user_id}}</div>
                        <div class="chat-msg__text">{{msg.message}}</div>
                        <template v-if="msg.parent.length">
                            <div class="chat-msg__parent" v-for="(parent_item,i) in msg.parent" :key="i">
                                <div class="chat-msg__user-name">#{{parent_item.user_id}}</div>
                                <div class="chat-msg__text">{{parent_item.text}}</div>
                                <template v-if="parent_item.parent.length">
                                    <div class="chat-msg__parent" v-for="(parent_parent_item,i) in parent_item.parent" :key="i">
                                        <div class="chat-msg__user-name">#{{parent_parent_item.user_id}}</div>
                                        <div class="chat-msg__text">{{parent_parent_item.text}}</div>
                                    </div>
                                </template>
                            </div>
                        </template>
                    </div>
                    <div class="chat-msg__right-btn">
                        <fa-icon icon="reply" @click.stop="msgReply(msg.id)"></fa-icon>
                        <fa-icon icon="chevron-down"></fa-icon>
                    </div>
                </template>
            </div>
        </div>
        <div class="chat-msg-input-parent" v-if="messages_parent_data.length">
            <div class="chat-msg-input-parent__msg" v-for="msg in messages_parent_data" :key="msg.id">
                {{ msg.user_id }}: {{msg.message}}
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
            messages_select:[],
            messages_parent:[]
        }),
        computed:{
            messages_parent_data(){
                let messages = [];
                this.messages_parent.forEach(
                    id=>messages.push(this.messages.find(
                        item=>item.id===id
                    ))
                )
                return messages;
            }
        },
        mounted(){
            window.rtf_chat_body = this;
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
            msgReply(id){
                this.messages_parent = [];
                this.messages_parent.push(id);
            },
            msgsReply(){
                let messages = [];
                this.messages_select.forEach(
                    item=>messages.push(item)
                );
                this.messages_select = [];
                this.messages_parent = messages;
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
