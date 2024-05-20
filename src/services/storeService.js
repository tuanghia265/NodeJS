const {where} = require("sequelize");
import { raw } from "body-parser";
import db from "../models";
import { name } from "ejs";

let getAllStore=(storeID)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let store = "";
            if(storeID==="ALL"){
                store=db.Store.findAll({
                    attributes:{
                        exclude:['userID']
                    }
                })
            }
            if(storeID&&storeID!=="ALL"){
                store=await db.Store.findOne({
                    where:{id:storeID},
                    attributes:{
                        exclude:['userID']
                    }
                })
            }
            resolve(store)
        }catch(e){
            reject(e);
        }
    })
}

let checkStoreName=(storeName)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let store = await db.Store.findOne({
                where:{name:storeName}
            })
            if(store){
                resolve(true);
            }else{
                resolve(false);
            }
        }catch(e){
            reject(e);
        }
    })
}

let createNewStore=(data)=>{
    return new Promise(async(resolve,reject)=>{
            try{
                let check = await checkStoreName(data.name);
                if(check===true){
                    resolve({
                        errCode:1,
                        errMessage:"Store is already!!!"
                    })
                }
                if(check===false){
                    await db.Store.create({
                        name:data.name,
                        userID:data.userID,
                        image:data.image,
                        url:data.url
                    })
                }
                resolve({
                    errCode:0,
                    errMessage:"Done!!!"
                })
                
            }catch(e){
                reject(e)
            }
        })

}

let editStore=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            if(!data.id){
                resolve({
                    errCode:2,
                    errMessage:"Missing required parameters"
                });
            }
            let store = await db.Store.findOne({
                where:{id:data.id},
                raw:false
            });
            if(store){
                store.name=data.name;
                store.image=data.image;
                store.url=data.url;
                await store.save()
                resolve({
                    errCode:0,
                    errMessage:"Store has been updated"
                });
            }else{
                resolve({
                    errCode:1,
                    errMessage:"Store not found"
                });
            }
        }catch(e){
            reject(e);
        }
    })
}

let deleteStore=(storeID)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let store = await db.Store.findOne({
                where:{id:storeID}
            })
            if(!store){
                resolve({
                    errCode:2,
                    errMessage:"The user isn't exist"
                })
            }
            await db.Store.destroy({
                where:{id:storeID}
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

module.exports={
    getAllStore:getAllStore,
    createNewStore:createNewStore,
    editStore:editStore,
    deleteStore:deleteStore
}