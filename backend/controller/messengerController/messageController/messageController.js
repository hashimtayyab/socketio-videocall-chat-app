const {
    sendMessage,
    getMessage
} = require('../../../services/Messenger/messageService/messageService');


class MessageController {
    async sendMessage(req, res){
        try {
            const message = await sendMessage(req, res);
            return res.status(200).json(message);
        } catch (error) {
            console.log(error);
        }
    }

    async getMessage(req, res){
        try {
            const message = await getMessage(req, res);
            return res.status(200).json(message);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new MessageController();