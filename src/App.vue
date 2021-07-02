<template>
    <!--    <keep-alive include="">-->
    <router-view id="page"/>
    <!--    </keep-alive>-->
</template>

<script>
    export default {
        metaInfo: {
            titleTemplate:(title)=>(title?('localhost | '+title):'localhost')
        }
    }
</script>

<style>
    #page::-webkit-scrollbar {
        width: 8px;
    }
    #page::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background-color: var(--color-lvl-4);
    }
    #page::-webkit-scrollbar-button:vertical:start {
        height: 60px;
    }
</style>
