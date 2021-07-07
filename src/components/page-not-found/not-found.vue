<template>
    <div :id="id" class="page-not-found">
        <div class="not-found-box">
            <h1>404</h1>
            <h2>Not found</h2>
        </div>

    </div>
</template>

<script>
    export default {
        name: "not-found",
        props:['id'],
        metaInfo(){
            return{title:'Not Found'}
        }
    }
</script>

<style>
    .page-not-found{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .not-found-box{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .page-not-found h1{
        font-size: 96px;
        color: var(--color-lvl-4)
    }
    .page-not-found h2{
        font-size: 56px;
        color: var(--color-lvl-4)
    }
</style>
