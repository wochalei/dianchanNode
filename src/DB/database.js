const axios = require('axios')
const qs = require('querystring')
const param = qs.stringify({
    grant_type: "client_credential",
    appid: "wx35ad6b2491c12b38",
    secret: '3ddc4051a04a7cb090d5ec462cadaa85'
})

let url =
    `https://api.weixin.qq.com/cgi-bin/token?` + param;

class getToken {
    constructor() { }
    async gettoken() {
        try {
            let token = await axios.get(url)
            if (token.status === 200) {
                return token.data.access_token
            }else{
                throw "获取token失败"
            }
        } catch (error) {
           console.log(error);
        }



    }
}

module.exports = getToken