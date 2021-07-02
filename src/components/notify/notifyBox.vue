<template>
    <div id="notify-box" @click.stop="">
        <div class="notify-header">Уведомления</div>
        <div class="notify-tags-box" v-show="is_tags">
            <div class="notify-tags-box-left-arrow"
                 v-show="this.leftArrowOpacity>0"
                 :style="{opacity: this.leftArrowOpacity}"
                 @click="clickTagsLeftArrow">
            </div>
            <div class="notify-tags-box-right-arrow"
                 v-show="this.rightArrowOpacity>0"
                 :style="{opacity: this.rightArrowOpacity}"
                 @click="clickTagsRightArrow">
            </div>
            <div ref="tags" class="notify-tags" @wheel.stop="tagsWheel($event)" @scroll.stop="tagsScroll($event)">
                <div class="notify-tag"
                     v-for="(tag, i) in filter_tags" :key="i"
                     :class="{active:(i===filter_tag)}"
                     @click="switchFilterTag(i)">{{tag}}
                </div>
            </div>
        </div>
        <div class="notify-scroll" v-show="!is_msg">
            <div class="notify-el" v-for="(notify,i) in filteredNotifyList" :key="i">
                <div class="notify-el-img">
                    <img :src="'https://youinroll.com/'+notify.img" :alt="notify.title">
                </div>
                <div class="notify-el-info">
                    <div class="notify-el-title">
                        <a :href="'https://youinroll.com/'+notify.title_url">{{notify.title}}</a>
                    </div>
                    <div class="notify-el-body">
                        <span>{{notify.body}}</span>
                    </div>
                    <div class="notify-el-refer">
                        <a :href="'https://youinroll.com/'+notify.refer_url">{{notify.refer}}</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="notify-msg" v-if="is_msg">
            <span v-if="is_err_msg">{{error_text}}</span>
            <span v-if="is_empty_msg">{{empty_text}}</span>
        </div>
    </div>
</template>

<script>
    import api from './notifyAPI';

    export default {
        name: 'notify-box',
        data:()=>({
            empty_text: 'Уведомлений нет',
            error_text: 'Вы не авторизованы',
            notify_list: null,
            filter_tags:['Все','Лайки','Комментарии','Упоминания','Подписчики','Подписки','Видео','Трансляции','Публикации','Конференции'],
            filter_tag: 0,
            leftArrowOpacity: 0,
            rightArrowOpacity: 0
        }),
        components: {},
        computed:{
            filteredNotifyList(){
                if(this.filter_tag===0){
                    return this.notify_list;
                }else{
                    return this.notify_list?.filter((t)=>(t.tags.indexOf(this.filter_tag)!=-1))
                }
            },
            is_err_msg(){return this.notify_list===false},
            is_all_empty_msg(){return this.notify_list?.length===0},
            is_empty_msg(){return this.filteredNotifyList?.length===0},
            is_msg(){return this.is_err_msg || this.is_empty_msg || this.is_all_empty_msg},
            is_tags(){return !(this.is_err_msg || this.is_all_empty_msg)}
        },
        methods:{
            switchFilterTag(i){
                this.filter_tag = i;
            },
            tagsWheel(event){
                event.preventDefault();
                this.$refs.tags.scrollLeft += 0.2 * event.deltaY;
            },
            tagsScroll(){
                const m_value = 100;
                this.leftArrowOpacity = Math.min(m_value, this.$refs.tags.scrollLeft)/m_value;
                this.rightArrowOpacity = Math.min(m_value, this.$refs.tags.scrollWidth-(this.$refs.tags.scrollLeft + this.$refs.tags.clientWidth))/m_value;
            },
            clickTagsLeftArrow(){
                this.$refs.tags.scrollLeft += 0.2 * -133;
            },
            clickTagsRightArrow(){
                this.$refs.tags.scrollLeft += 0.2 * 133;
            }
        },
        watch:{},
        async mounted(){
            await api.initToken();
            this.filter_tags = await api.getTags();
            this.notify_list = await api.getNotifications();
            this.tagsScroll();
        }
    }
</script>

<style src="notify.css" type="text/css"></style>
