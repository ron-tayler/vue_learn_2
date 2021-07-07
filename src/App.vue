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
<style src="./index.css" />
