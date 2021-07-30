<template>
    <div class="list-chats">
        <div class="chats-el" v-for="el in chats" :key="el.id" @click="selectChat(el.id)">
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
</template>

<script>
    export default {
        name: "list-chats",
        props:{
            chats:Array
        },
        methods:{
            selectChat(id){
                this.$emit('selectChat',id);
            }
        }
    }
</script>

<style scoped>

</style>
