export default {
    namespaced: true,
    state:()=>({
        access_token: window.localStorage.getItem('access_token')??''
    }),
    actions:{

    },
    mutations:{
        setAccessToken(state,token){
            state.access_token = token;
        }
    },
    getters:{
        getAccessToken(state){
            window.localStorage.setItem('access_token',state.access_token);
            return state.access_token;
        }
    },
}
