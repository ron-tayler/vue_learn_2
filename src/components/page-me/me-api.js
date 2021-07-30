import store from '@/store';

const SITE_URL = 'https://youinroll.com';

export function getChats(){

    let url = new URL(SITE_URL+'/message/getChats');
    url.searchParams.set('api','1.0');
    url.searchParams.set('access_token',store.getters.getAccessToken);

    return fetch(url.href)
        .then(r=>r.json())
        .then(d=> {
            if(d.response){
                return d.response
            }else if(d.error){
                return []
            }else{
                throw d;
            }
        })
        .catch(e=> {
            return []
        });
}

/**
 * Запросить массив сообщений по peer_id чата и offset'У для смещения
 * Возвращает массив сообщений от нового к старому с лимитом в 25 штук
 *
 * @param peer_id String:
 * @param offset Number
 * @returns {null|Promise<array|null>}
 */
export function getLastMessages4peerId(peer_id,offset=0){
    if(!( typeof peer_id == 'number' && peer_id>0 )) return null;
    if(!( typeof offset == 'number' && offset >= 0 )) return null;

    let url = new URL(SITE_URL+'/message/getAll');
    url.searchParams.set('api','1.0');
    url.searchParams.set('peer_id','u'+peer_id);
    url.searchParams.set('offset',offset.toString());
    url.searchParams.set('access_token',store.getters.getAccessToken);

    return fetch(url.href)
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
}

export function msgLP(peer_id,ts=0){
    //if(!( typeof peer_id == 'number' && peer_id>0 )) return null;
    //if(!( typeof ts == 'number' && ts>0 )) return null;

    let url = new URL(SITE_URL+'/listen/user_im');
    url.searchParams.set('api','1.0');
    url.searchParams.set('peer_id',peer_id);
    url.searchParams.set('ts',ts.toString());
    url.searchParams.set('access_token',store.getters.getAccessToken);

    return fetch(url.href)
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
}

export function messageSend(peer_id, text, parent) {

    return fetch(SITE_URL+'/message/send?api=1.0',{
        method:'POST',
        body: JSON.stringify({
            'access_token':store.getters.getAccessToken,
            'peer_id':peer_id,
            'message':text,
            'parent':parent
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
}

/*
let subLP_cb_list = {};

export function subscribeLP4peer_id(peer_id,cb) {
    if(!subLP_cb_list[peer_id]) subLP_cb_list[peer_id] = [];
    subLP_cb_list[peer_id].push(cb);
}

export function startLP() {
    for (let el in subLP_cb_list){
        let ts = 0;
        setTimeout(function longTO() {
            msgLP(el,ts)
            .then((messages)=>{
                if(messages && typeof messages == 'object' && messages.length>0){
                    ts = messages[messages.length - 1].id;
                }
                setTimeout(longTO,0);
            })
        },0);
    }
}
*/

export default {
    getChats,
    getLastMessages4peerId,
    msgLP,
    messageSend,
    // subscribeLP4peer_id,
    // startLP
}
