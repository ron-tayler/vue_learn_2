import Parent from '@/classes/message/parent'
import MessageText from '@/classes/message/message_text'
import MessageNotify from "@/classes/message/message_notify";

export default class Message {
    /**
     * @param json_message : Object
     * @returns {Message}
     */
    static initMessage4json(json_message){
        let type = String(json_message.type);

        /** @var {Message} */
        let message;

        switch(type){
            case 'text':
                message = MessageText.initMessageText4json(json_message);
                break;
            case 'notify':
                message = new MessageNotify().#init4json(json_message);
                break;
            default:
                message = new Message().#init4json(json_message);
        }
        return message;
    }

    /**
     * @param json_array_message : Object[]
     * @returns {Message[]}
     */
    static initMessages4json(json_array_message){
        /** @var {Message[]} */
        let messages = [];
        json_array_message.forEach(message=> {
            messages.push(Message.initMessage4json(message))
        })
        return messages;
    }

    #init4json(json_message){
        this.#id = Number(json_message.id);
        this.#user_id = Number(json_message.user_id);
        this.#chat_id = String(json_message.chat_id);
        this.#date_create = String(json_message.date_create);
        this.#date_edit = String(json_message.date_edit);

        return this;
    }

    #TYPE;
    #id = 0; // ID сообщения внутри чата
    #user_id = 0; // ID автора сообщения
    #chat_id = ''; // [ugcs][1-9][0-9]*
    #date_create = ''; // Строка даты в формате yyyy-mm-dd hh:ii:ss
    #date_edit = ''; // Строка даты в формате yyyy-mm-dd hh:ii:ss или пустая строка
    #parents = []; // Array(Parent)

    /**
     * @param id : number
     * @param user_id : number
     * @param chat_id : string
     * @param parent : Parent[]
     * @param date_create : string
     * @param date_edit : string
     */
    constructor(id=0, user_id=0, chat_id='', parent=[], date_create='', date_edit='') {

    }

    getId(){
        return this.#id;
    }
    getUserId(){
        return this.#user_id;
    }
    getChatId(){
        return this.#chat_id;
    }
    getDateCreate(){
        return this.#date_create;
    }
    getDateEdit(){
        return this.#date_edit;
    }
    isEdit(){
        return this.#date_edit!=='';
    }

}
