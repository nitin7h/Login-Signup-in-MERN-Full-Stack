require('dotenv').config()
const jwt = require("jsonwebtoken")


const secrateKey = process.env.KEY

const tokenGenrator = (payload) => {
    try {
        return jwt.sign({
            _id: payload._id,
            email: payload.email,
        }, secrateKey)
    } catch (error) {
        return null
    }
}



const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }

    jwt.verify(token.split(' ')[1], secrateKey, (err, decoded) => { // Extract token from header
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }


        next();
    });
};



module.exports = {
    tokenGenrator,
    verifyToken
}