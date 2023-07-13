const { Router } = require('express');
const { register, login, sendResetPassword, verifyResetPassword, getProfile, updateProfile} = require('../controller/users.controller');
const { verifyToken } = require('../helpers/AuthToken');

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/send_reset_password', sendResetPassword);
userRouter.post('/verify_reset_Password', verifyResetPassword)

userRouter.get("/profile", verifyToken, getProfile);
userRouter.put("/update_profile", verifyToken, updateProfile);
userRouter.put("/update_password", verifyToken, updateProfile);


module.exports = userRouter;




