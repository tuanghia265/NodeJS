import db from "../models/index"
import CRUDService from "../services/CRUDService";
let getHomePage=async(req,res)=>{
    try{
        let data =await db.User.findAll();

        
        return res.render('homepage.ejs',{
            data:JSON.stringify(data)
        })
        
    }catch(e){
        console.log(e)
    }
}

let getCrud=(req,res)=>{
    return res.render('crud.ejs')
}

let postCrud=async(req,res)=>{
    let message = await CRUDService.creatNewUser(req.body);
    console.log(message)
    return res.send('post crud from server')
}

let getDataCrud= async(req,res)=>{
    let data = await CRUDService.getAllUser();
    console.log('---------------------------------')
    console.log(data)
    console.log('---------------------------------')
    return res.render("displayCRUD.ejs",{
        dataTable:data
    })
}

let getEditCrud=async(req,res)=>{
    let userID = req.query.id;
    console.log(userID)
    if(userID){
        let userData = await CRUDService.getUserByID(userID);
        return res.render("editCRUD.ejs",{
            user:userData
        })
    }
    else{
        return res.send("User not found")
    }
}

let putCRUD=async(req,res)=>{
    let data=req.body;
    // await CRUDService.updateUserData(data)
    let allUser=await CRUDService.updateUserData(data)
    return res.render('displayCRUD',{
        dataTable:allUser
    })

}

let delCRUD=async(req,res)=>{
    let id =req.query.id;
    if(id){
        await CRUDService.delUserByID(id);
        return res.send("Delete done")
    } 
    else{
        return res.send("User not found")
    }

}


module.exports={
    getHomePage:getHomePage,//homepage  
    getCrud:getCrud,
    postCrud:postCrud,
    getDataCrud:getDataCrud,
    getEditCrud:getEditCrud,
    putCRUD:putCRUD,
    delCRUD:delCRUD
}