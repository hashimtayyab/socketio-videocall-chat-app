const Message = require("../../../models/messageModel/Message");

class MessageService {
    
    async sendMessage(req){
        try {
            const newMessage = new Message(req.body);
            const saveMessage = newMessage.save();
            return saveMessage;
        } catch (error) {
            console.log(error);
        }
    }

    async getMessage(req){
        try {
            const message =  await Message.find({
                conversationId: req.params.conversationId,
            })
            return message;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new MessageService();