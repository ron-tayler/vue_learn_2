export function getChats(){
    return [
        {
            type:'u',
            id:1,
            title: 'Никита Вадимович',
            last_msg: '',
            messages: []
        },
        {
            type:'u',
            id:953,
            title: 'Урсул Максим',
            last_msg: '',
            messages: []
        }
    ]
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

    let url = new URL('https://youinroll.com/message/getAll');
    url.searchParams.set('api','1.0');
    url.searchParams.set('peer_id','u'+peer_id);
    url.searchParams.set('offset',offset.toString());
    url.searchParams.set('access_token','4376a1039a6ec7a649a8f7a339b3a5691c53dffb766963050ee3e019031646f7a71c6537c296dff1b836975a97aabb4bd2af6723c9d7a3c69bc5f19e365a21c4');

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

    let url = new URL('https://youinroll.com/listen/stream');
    url.searchParams.set('api','1.0');
    url.searchParams.set('stream_id',peer_id);
    url.searchParams.set('ts',ts.toString());

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
    // subscribeLP4peer_id,
    // startLP
}
