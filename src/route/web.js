import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
let router=express.Router();

let initWebRoutes=(app)=>{
    router.get('/',homeController.getHomePage);
    router.get('/search',homeController.getCrud);
    

    router.post('/post-crud',homeController.postCrud);
    router.get('/get-crud',homeController.getDataCrud);
    router.get('/edit-crud',homeController.getEditCrud);
    router.post('/put-crud',homeController.putCRUD);
    router.get('/del-crud',homeController.delCRUD);

    router.post('/api/login',userController.handleLogin);
    return app.use('/',router)
}

module.exports=initWebRoutes;