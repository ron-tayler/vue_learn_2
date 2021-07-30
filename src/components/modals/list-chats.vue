<template>
    <modal name="list-chats" @close="closeModal">
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
    </modal>
</template>

<script>
    export default {
        name: "modal-list-chats",
        props:{
            chats:Array,
        },
        data:()=>({
            resolve:null,
            reject:null
        }),
        created(){},
        methods:{
            selectChat(id){
                this.$modal.hide('list-chats');
                this.resolve(id);
            },
            closeModal(){
                this.reject(false);
            },
            openModal(){
                let vc = this;
                this.$modal.show('list-chats');
                return new Promise(function (resolve, reject){
                    vc.resolve = resolve;
                    vc.reject = reject;
                });
            }
        }
    }
</script>

<style scoped>

</style>
