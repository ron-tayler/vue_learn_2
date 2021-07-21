<template>
    <div :id="id" class="page-login">
        <label for="login">Логин</label><input type="text" id="login" v-model="login">
        <br>
        <label for="password">Пароль</label><input type="password" id="password" v-model="password">
        <br>
        <button @click="auth">Войти</button>
    </div>
</template>

<script>
    import store from "@/store";
    const SITE_URL = 'https://youinroll.com'
    export default {
        name: "page-login",
        props:['id'],
        data:()=>({
            login:'',
            password:''
        }),
        methods:{
            async auth(){
                let app = this;
                let data = await fetch(SITE_URL+'/login?api=1.0',{
                    method:'POST',
                    body: JSON.stringify({
                        'login':app.login,
                        'password':app.password
                    })
                })
                .then(r=>r.json())
                .then(d=> {
                    if(d.response){
                        return d.response
                    }else if(d.error){
                        console.log(d.error)
                        return null
                    }else{
                        throw d;
                    }
                })
                .catch(e=> {
                    console.log(e);
                    return null
                });

                this.$store.state.user = data.user_id;
                this.$store.state.access_token = data.token;

                await this.$router.push('/');
            }
        },
        mounted(){
            window.rtf_page_login = this;
        }
    }
</script>

<style scoped>

</style>
