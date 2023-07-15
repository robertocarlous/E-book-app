const jwt = require("jsonwebtoken");
function generateToken(user) {
    const token = jwt.sign(
        {
            id:user._id.toString(),
        },
        process.env.authtoken,
        {    
         expiresIn: process.env.expirycode,
        }
    )
    return token;
}
function verifyToken(token) {
    const payload = jwt.verify(token, process.env.authtoken)
    return payload;
}

module.exports = {
    generateToken, 
    verifyToken,
};