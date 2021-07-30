import Message from "@/classes/message";
import Parent from "@/classes/message/parent";

export default class MessageText extends Message {
    static init4json(json_message){
        let message = new Message();

        super.init4json(json_message)

        message.#parents = Parent.initParents(json_message.parents);

        return message;
    }

    #text = '';
}
