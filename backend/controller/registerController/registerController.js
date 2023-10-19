const {
    getAllUsers, 
    registerUser,  } = require('../../services/registerService/registerUser');
// const User = require('../../models/adminModel/Admin');

class UserController {
    async getAllUsers(req, res) {
        const users = await getAllUsers();
        return res.status(200).json(users);
    }

    async registerUser(req, res) {
        const user = await registerUser(req);
        return res.status(201).json(user);
    }
}

module.exports = new UserController();