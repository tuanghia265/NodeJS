const { where } = require("sequelize")
import { raw } from "body-parser";
import db from "../models/index";
import bcrypt, { hash } from 'bcryptjs'
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (pwd) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hash = await bcrypt.hashSync(pwd, salt);
            resolve(hash)
        } catch (e) {
            reject(e);
        }
    })
}


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

let getAllUser = (userID)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let users  = '';
            if(userID==="ALL"){
                users=db.User.findAll({
                    attributes:{
                        exclude:['password']
                    }
                })
            }
            if(userID && userID!== "ALL"){
                users = await db.User.findOne({
                    where : {id:userID},
                    attributes:{
                        exclude:['password']
                    }
                })
            }
            resolve(users)
        }catch(e){
            reject(e)
        }
    })
}

let createNewUser = (data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let check = await checkUserEmail(data.email);
            if(check===true){
                resolve({
                    errCode:1,
                    errMessage:'Email is already, Pls try with another email'
                })
            }
            let hashPwdFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashPwdFromBcrypt,
                roleID: data.roleID
            })
            resolve({
                errCode:0,
                errMessage:'Done'
            })
        }catch(e){
            reject(e);
        }
    })
}

let deleteUser=(userID)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let user = await db.User.findOne({
                where:{id:userID}
            })
            if(!user){
                resolve({
                    errCode:2,
                    errMessage:"The user isn't exist"
                })
            }
            await db.User.destroy({
                where:{id:userID}
            })
            resolve({
                errCode:0,
                errMessage:"User has been deleted"
            })
        }catch(e){
            reject(e)
        }
    })
}

let updateUser =(data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            if(!data.id){
                resolve({
                    errCode:2,
                    errMessage:"Missing required parameters"
                })
            }
            let user= await db.User.findOne({
                where:{id:data.id},
                raw:false
            })
            if(user){
                user.firstName=data.firstName;
                user.lastName=data.lastName;
                await user.save()
                resolve({
                    errCode:0,
                    errMessage:"Successful update!!"
                });
            }else{
                resolve({
                    errCode:1,
                    errMessage:"User not found"
                });
            }
        }catch(e){
            reject(e);
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser:getAllUser,
    createNewUser:createNewUser,
    deleteUser:deleteUser,
    updateUser:updateUser
}