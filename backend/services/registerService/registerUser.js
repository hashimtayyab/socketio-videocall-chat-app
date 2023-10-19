const Admin = require('../../models/adminModel/Admin');
const User = require('../../models/userModel/userModel')
const crypto = require('crypto');
// const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const jwt = require('jsonwebtoken');
// const apikey = process.env.SENDGRID_API_KEY;
// sgMail.setApiKey(apikey);


class UserService {
    async getAllUsers() {
        try {
            const user = await Admin.find();
            return user;
        } catch (error) {
            console.log(error);
        }
    }


    async registerUser(req) {
        const {username, email, password, phone, gender} = req.body;
        const token = crypto.randomBytes(64).toString("hex");
        const newAdmin = new Admin({
            username: username,
            email: email,
            password: password,
            phone:phone,
            token:token,
            gender: gender,
            isVerified:false     
        });   
        const newUser = new User({
            email: email,
            password: password,
            isAdmin: true,
        });
    //     const message = {
    //     to: "hashimtayyab01@gmail.com",
    //     from: {
    //         name: "HRMS Verification",
    //         email: process.env.FROM_EMAIL
    //     },
    //     templateId: process.env.TEMPLATE_ID,
    //     DynamicTemplateData :{
    //     verification_link: `http://localhost:4000/verifymail?token=${token}`,
    //     }
    // }
        try {
        //     sgMail.send(message)
        //     .then(() => console.log("Email sent successfully"))
        //     .catch((err) => console.log(err));
            const admin = await newAdmin.save().then(() => console.log("Admin Added"));
            await newUser.save();
            return admin;
        } catch (error) {
            console.log(error);
        }
    }

    async checkIsVerified(req) {
        try {
            const findUser = await Admin.findOne({
                email: req.params.email,
            });
            return findUser;
        } catch (error) {
            console.log(error);
        }
    }


    async verifyMail(req, res){
        try {
            // console.log(req.query.token);
            const findUser = await Admin.findOne({
                token: req.query.token,
            });
                findUser.token = null;
                findUser.isVerified = true;
                await findUser.save();
                // return { message: "Email verified"}
                
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new UserService();