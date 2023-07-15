const {generateToken} = require("../helpers/AuthToken");
const usersModel = require("../model/usersmodel");
const bcrypt = require ("bcrypt");
const register = async (req, res) =>{
  try{ 
    const data = req.body 
  if(!data.email)
  return res.status(400).json({
    message:"email field is missing",
  });
  if(!data.password)
  return res.status(400).json({
    message:"password field is missing",
  });
  if(!data.name)
  return res.status(400).json({
  message:"name field is missing",
});
if(!data.country)
return res.status(400).json({
  message:"country field is missing",
});
if(!data.gender)
return res.status(400).json({
  message:"gender field is missing",
});
const salt = await bcrypt.genSalt(10);
const hashPassword = bcrypt.hashSync(data.password, salt);
data.password = hashPassword;
const user = await usersModel.create(data);
return res.status(200).json({
  message:"user created successfully",
  data:user,
})
}catch (error){
  if (error.code === 11000)
  return res.status(400).json({message:error.message})
  throw error;
}
};
const login = async (req, res) =>{
  try{
    const data = req.body 
    if(!data.email)
    return res.status(400).json({
      message:"email field is missing",
    })
    if(!data.password)
    return res.status(400).json({
      message:"password field is missing",
    });
    const user = await usersModel.findOne({email:data.email});
    if (!user) return res.status(400).json({message:"user does not exist"})
    const isPasswordMatched = await bcrypt.compare(data.password, user.password);
    if (!isPasswordMatched){
      return res.status(400).json({message:"Incorrect Password"});
    };
    const token = generateToken(user);
    return res.status(200).json({
      message:"user logged in successfully",
      data:{
        token,
        name:user.name,
        email:user.email,
      },
    });
}catch (error){
  res.status(400).json({message:error.message});
}
}
const sendResetPassword = async (req, res)=>{
  try{
    const data = req.body
    if (!data.email)
    return res.status(400).json({
      message:"email is required",
    });
    const user = await usersModel.findOne({email:data.email});
    if(!user) return res.status(400).json({message:"user does not exist"});
    const code = 2233
    user.resetPasswordToken = code;
    await user.save();
    return res.status(200).json({
      message:"reset password code sent",
    });
  }catch(error){
    res.status(400).json({message:error.message})
  }
}
const verifyResetPassword = async (req, res) =>{
  try{
    const data = req.body;
    if(!data.email)
    return res.status(400).json({
      message:"email is required",
    });
    if(!data.newPassword)
    return res.status(400).json({
      message:"newPassword is required",
    });
    if(!data.code)
    return res.status(400).json({
      message:"code is required",
    });
    const user = await usersModel.findOne({email:data.email});
    if (!user) return res.status(400).json({message:"User does not exist"});
    console.log(user, data)
    if(user.resetPasswordToken != data.code) {
      return res.status(400).json({
        message:"code is incorrect",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = bcrypt.hashSync(data.newPassword, salt);
    user.password = hashPassword;
    user.resetPasswordToken = undefined;
    await user.save();
    return res.status(200).json({
      message:"user password reset successfully",
    });
  }catch(error){
    res.status(400).json({message:error.message});
  }
}
const getProfile = async(req, res) =>{
  try{
    const user = req.user;
    user.password = undefined;
    return res.status(200).json({
      message:"user fetched successfully",
      data:user,
    });
  }catch(error){
    res.status(400).json({message:error.message})
  }
}
const updateProfile = async(req, res) =>{
  try{
  const{name, country} = req.body;
  const userReq =req.user;
  const user = await usersModel.findById(userReq. _id);
  await usersModel.findOneAndUpdate(
    {_id:user._id},
    {
      name:name || user.name,
      country:country || user.country,
    }
  );
  return res.status(200).json({
    message:"user profile updated successfully"
  });
}catch(error){
  res.status(400).json({message:error.message});
}
}
const updatePassword = async (req, res)=>{
  try{
    const{oldPassword, newPassword} = req.body;
    const user = req.user;
    if(!oldPassword)
    return res.status(400).json({
      message:"oldPassword is required",
    });
    if(!newPassword)
    return res.status(400).json({
      message:"newPassword is required",
    });
    const isPasswordMatched = await bcrypt.compare(oldPassword, user.password);
    if(!isPasswordMatched) {
      return res.status(400).json({message:"incorrect password"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = bcrypt.hashSync(newPassword, salt);
    await usersModel.findOneAndUpdate(
      {_id:user._id},
      {
        password:hashPassword,
      }
    );
    return res.status(200).json({message:"user updated successfully"});
  }catch(error){
    res.status(400).json({message:error.message});
  }
} 


module.exports = {
  register, 
  login, 
  sendResetPassword,
  verifyResetPassword,
  getProfile,
  updateProfile,
  updatePassword,
};

