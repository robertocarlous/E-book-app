const jwt = require("jsonwebtoken");
function generateToken(user) {
    const token = jwt.sign(
        {
            id:user._id.toString(),
        },
        "$2b$10$jtBc4rQREcRUAt7ALa3lL.RlBz6PKZ030N/QPDg1z/KffpKZm1JC6",
        {    
            expiresIn:"2h",
        }
    )
    return token;
}
function verifyToken(token) {
    const payload = jwt.verify(token, "$2b$10$jtBc4rQREcRUAt7ALa3lL.RlBz6PKZ030N/QPDg1z/KffpKZm1JC6")
    return payload;
}

module.exports = {
    generateToken, 
    verifyToken,
};