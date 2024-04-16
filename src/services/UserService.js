const { where } = require("sequelize")
import { raw } from "body-parser";
import db from "../models/index";
import bcrypt, { hash } from 'bcryptjs'
let handleUserLogin = (email, pwd) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes:[`email`,`roleID`,`password`],
                    where: { email: email },
                    raw:true
                })
                if (user) {
                    let check = await bcrypt.compareSync(pwd,user.password);
                    if(check){
                        userData.errCode=0;
                        userData.errMessage="Done!";
                        delete user.password;
                        userData.user=user;
                    }else{
                        userData.errCode=3;
                        userData.errMessage="Wrong password";
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = "User not found ";

                }
            } else {
                userData.errCode = 1;
                userData.errMessage = "Your email isn't existed in your system. Try again!!";
            }
            resolve(userData);
        } catch (e) {
            reject(e)
        }
    })
}


let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin
}