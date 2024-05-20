import userService from '../services/userService'
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing input parameter!"
        })
    }

    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let getAllUser = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter',
            users:[]
        })
    }
    let users = await userService.getAllUser(id);
    return res.status(200).json({
        errCode:0,
        errMessage:"Done",
        users
    })

}

let handleCreateNewUser = async(req,res)=>{
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
}

let handleEditUser = async(req,res)=>{
    let data = req.body;
    let message = await userService.updateUser(data);
    return res.status(200).json(message);
}

let handleDeleteUser = async(req,res)=>{
    if(!req.body.id){
        return res.status(200).json({
            errCode:1,
            errMessage:"Missing required parameters"
        })
    }

    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}

module.exports = {
    handleLogin: handleLogin,
    getAllUser: getAllUser,
    handleCreateNewUser:handleCreateNewUser,
    handleEditUser:handleEditUser,
    handleDeleteUser:handleDeleteUser
}