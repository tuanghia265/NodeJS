import bcrypt from 'bcryptjs'
import db from '../models';
import { raw } from 'body-parser';
import { where } from 'sequelize';
import e from 'express';
const salt = bcrypt.genSaltSync(10);

let creatNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPwdFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashPwdFromBcrypt,
                roleID: data.role
            })
            resolve('Done!!')
        } catch (e) {
            reject(e);
        }
    })
}

// firstName: DataTypes.STRING,  
//     lastName: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password:DataTypes.STRING,
//     roleID:DataTypes.INTEGER

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

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true
            });
            resolve(users);
        }
        catch (e) {
            reject(e);
        }
    })
}

let getUserByID = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userID }
            })
            if (user)
                {
                    resolve(user);
                }
            else
                {
                    resolve({});
                }
        }
        catch (e) {
            reject(e)
        }
    })
}

let updateUserData=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let user= await db.User.findOne({
                where:{id:data.id}
            })
            if(user){
                user.firstName=data.firstName;
                user.lastName=data.lastName;

                await user.save();
                let allUser=await db.User.findAll();
                resolve(allUser);
            }else{
                resolve();
            }
        }
        catch(e)
        {
            reject(e)
        }
    })
}

let delUserByID=(userID)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let user=await db.User.findOne({
                where:{id:userID}
            })
            if(user){
                await user.destroy();
            }
            
        resolve();
        }
        catch(e){
            reject(e)
        }
    })
}

module.exports = {
    creatNewUser: creatNewUser,
    getAllUser: getAllUser,
    getUserByID: getUserByID,
    updateUserData:updateUserData,
    delUserByID:delUserByID
}