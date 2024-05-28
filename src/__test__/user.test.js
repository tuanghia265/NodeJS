import { query } from 'express';
import userController from '../controllers/userController';
import db from '../models/index';
import httpMocks from "node-mocks-http";
import userService from '../services/userService'

const user = ""

const req=httpMocks.createRequest({
    method:'GET',
    url:'/api/get-all-user',
    query:{
        id:"ALL"
    }
})

const res = httpMocks.createResponse();

it("should get all user",async()=>{
    await userController.handleGetAllUser(req,res);
    expect(res.statusCode).toBe(200);
})