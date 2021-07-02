let ACCESS_TOKEN = '';

export default {
    /**
     * Получение токена если пользователь авторизован
     * @returns {Promise<string|bool>}
     */
    initToken: ()=>{
        return fetch('https://youinroll.com/lib/ajax/getToken.php')
            .then(r=>r.json())
            .then(data=> {
                if(data.token){
                    ACCESS_TOKEN = data.token;
                    return true;
                }else{
                    return false;
                }
            });
    },

    /**
     * Получение списка тегов
     * @returns {Promise<Array>}
     */
    getTags: ()=>{
        return fetch('https://youinroll.com/getNotificationTags?api=1.0',{
            method:'POST',
            body:JSON.stringify({access_token:ACCESS_TOKEN})
        })
            .then(r=>r.json())
            .then(data=>{
                if(data.error){
                    return false;
                }else{
                    return data.response;
                }
            });
    },

    /**
     * получение списка уведомлений
     * @returns {Promise<boolean|Array>}
     */
    getNotifications: async ()=>{
        if(ACCESS_TOKEN==='') {
            return false;
        }
        return fetch('https://youinroll.com/getNotification?api=1.0',{
            method:'POST',
            body:JSON.stringify({access_token:ACCESS_TOKEN})
        })
            .then(r=>r.json())
            .then(data=>{
                if(data.error){
                    return false;
                }else{
                    //return [];
                    return data.response;
                }
            });
    }

}

