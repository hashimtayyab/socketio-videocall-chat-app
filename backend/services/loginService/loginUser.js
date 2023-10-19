const Admin = require('../../models/adminModel/Admin');
const User = require('../../models/userModel/userModel');
const Employee = require('../../models/employeeModel/Employee');
const jwt = require('jsonwebtoken');

class LoginUserService {
    async loginUser(req, res) {
        try {
            const user = await User.findOne({
                email: req.body.email
            });
            if(user.password === req.body.password) {

                if(user.isAdmin === true) {
                    const admin = await Admin.findOne({
                        email: req.body.email,
                    });

                    const token = jwt.sign({
                    id: admin._id,
                    isAdmin: user.isAdmin
                    }, 'secret123', {
                    expiresIn: 3600 // expires in 1 hour
                    });

                return {user: admin, token:token};
                }
                else if(user.isAdmin === false) {
                    const employee = await Employee.findOne({
                        email: req.body.email,
                    });
                    const token = jwt.sign({
                        id: employee._id,
                        isAdmin: user.isAdmin
                        }, 'secret123', {
                        expiresIn: 3600 // expires in 1 hour
                        });
                    return {user: employee, token: token};
                }
            }
            else{
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }  

    async getUserById(req) {
        try {
            // const user = await Admin.findOne({
            const user = await Admin.findOne({
            _id: req.params.userId,
            });
            return user;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new LoginUserService();