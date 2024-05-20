import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import storeController from '../controllers/storeController';
let router=express.Router();

let initWebRoutes=(app)=>{
    router.get('/',homeController.getHomePage);
    router.get('/search',homeController.getCrud);
    

    router.post('/post-crud',homeController.postCrud);
    router.get('/get-crud',homeController.getDataCrud);
    router.get('/edit-crud',homeController.getEditCrud);
    router.post('/put-crud',homeController.putCRUD);
    router.get('/del-crud',homeController.delCRUD);


    //User
    router.post('/api/login',userController.handleLogin);
    router.get('/api/get-all-user',userController.getAllUser);
    router.post('/api/create-new-user',userController.handleCreateNewUser);
    router.put('/api/edit-user',userController.handleEditUser);
    router.delete('/api/delete-user',userController.handleDeleteUser);

    //Store
    router.get('/api/get-all-store',storeController.handleGetAllStore);
    router.post('/api/create-new-store',storeController.handleCreateNewStore);
    router.put('/api/edit-store',storeController.handleEditStore)
    router.delete('/api/delete-store',storeController.handleDeleteStore)
    
    return app.use('/',router)
}

module.exports=initWebRoutes;