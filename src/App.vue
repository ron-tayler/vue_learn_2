<template>
    <!--    <keep-alive include="">-->
    <router-view id="page"/>
    <!--    </keep-alive>-->
</template>

<script>
    const TITLE = 'FrontEnd';
    export default {
        metaInfo: {
            titleTemplate:(title)=>(title?(TITLE+' | '+title):TITLE)
        }
    }
</script>
<style src="./index.css" />
