const COS = require('cos-nodejs-sdk-v5');
const axios = require('axios')
const qs = require('querystring');
const config = require('../config/db_config')
const { error, success } = require('../model/responseModel')
const param = qs.stringify({
    grant_type: config.grant_type,
    appid: config.appid,
    secret: config.secret
})

class DB {
    constructor() {
        this.urlMap = {
            get: `https://api.weixin.qq.com/tcb/databasequery`,
            add: ' https://api.weixin.qq.com/tcb/databaseadd',
            updated:"https://api.weixin.qq.com/tcb/databaseupdate",
            deleted:'https://api.weixin.qq.com/tcb/databasedelete'
        }
    }
    //获取连接数据库凭证
    async gettoken() {
        let url = `https://api.weixin.qq.com/cgi-bin/token?` + param;
        try {
            let token = await axios.get(url)
            if (token.status === 200) {
                return token.data.access_token
            } else {
                throw "获取token失败"
            }
        } catch (e) {
            return new error(e, 500)
        }
    }
    async link(type, query) {
        const token = await this.gettoken()
        //都用link，所以这里按照模型模板捕获失败，然后全局捕获错误文件根据这里throw的错误模板进行转换为前端数据的模型
        //所以其他用这个的方法就不用再写try catch里，除非，有特殊添加信息就些try catch 修改一下 再throw出给formatResponseData模型模板
        //我这里分两个数据成功或失败的模板，一个是调用接口错误或成功使用responseModel
        //返回前端数据成功模板用formatResponseData（），失败的捕获就借助抛出错误的responseModel模板格式给全局错误监听

        try {
            const res = await axios({
                method: 'post',
                url: this.urlMap[type] + "?access_token=" + token,
                data: {
                    env: config.env,
                    query
                }
            })

            if (res.data.errcode != 0) {
                throw res.data.errmsg;
            } else {
                return new success('success', 200, res.data)
            }
        } catch (e) {

            throw new error(e, 200);
        }


    }
    async uploadFile(filename, filePath) {

        const cos = new COS({
            SecretId: 'AKIDjIbfQv97oFPKyLSIsBCwQdZEdlcCVYKp',
            SecretKey: 'GG0TfaEciX6NO7alfIekZ7PRs9C1bx4x'
        });
        try {
             const res =  await cos.uploadFile({
                Bucket: 'wang-1312767572', /* 填入您自己的存储桶，必须字段 */
                Region: 'ap-guangzhou',  /* 存储桶所在地域，例如ap-beijing，必须字段 */
                Key: "dianchang/" + filename,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
                FilePath: filePath,                /* 必须 */
            });
           return res;
        } catch (e) {
            console.log(e);
        }
       

    }
}

module.exports = new DB()