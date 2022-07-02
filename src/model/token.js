const jwt = require('jsonwebtoken')
const config = require('../config/token_config')
const { error, success } = require('./responseModel')
class Token {
    constructor() { }
    sign(payload) {
        return jwt.sign(payload, config.secretOrPrivateKey, {expiresIn:config.expiresIN})
    }
    verify(token) {
        try {
            const res = jwt.verify(token,config.secretOrPrivateKey);
            return new success("success", 200, res)
        } catch (e) {
            throw new error("非法token")
        }

    }
}

module.exports = Token