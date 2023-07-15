const { Router } = require('express');
const { register, login, sendResetPassword, verifyResetPassword, getProfile, updateProfile} = require('../controller/users.controller');
const { verifyAuthToken } = require('../middleware/authenticate');

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/send_reset_password', sendResetPassword);
userRouter.post('/verify_reset_Password', verifyResetPassword)

userRouter.get("/profile", verifyAuthToken, getProfile);
userRouter.put("/update_profile", verifyAuthToken, updateProfile);
userRouter.put("/update_password", verifyAuthToken, updateProfile);


module.exports = userRouter;




