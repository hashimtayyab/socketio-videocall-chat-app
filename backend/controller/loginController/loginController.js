const {loginUser, getUserById} = require('../../services/loginService/loginUser');
const jwt = require('jsonwebtoken');

class LoginUserController {
    async loginUser(req, res) {
        try {
            const user = await loginUser(req);
            if(user) {
                console.log('User Passed');
                return res.status(200).json(user);
            }
            else{
                console.log('User Failed');
                return res.status(401).json({message: 'Invalid username or password'});
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getUserById(req, res) {
        const user = await getUserById(req);
        return res.status(200).json(user);
    }


}

module.exports = new LoginUserController();