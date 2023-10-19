const Conversation = require('../../../models/conversationModel/Conversation');


class ConversationService {

    async createNewConversation(req) {
        try {
            const newConversation = new Conversation({
                members: [req.body.senderId, req.body.receiverId],
            });
            const saveConversation = newConversation.save();
            return saveConversation;
        } catch (error) {
            console.log(error);
        }
    }

    async getConversations(req){
        try {
            const conversation = await Conversation.find({
                members: {$in: [req.params.userId]}
            })
            return conversation;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new ConversationService();