// 所有请求成功或失败使用下面模型格式化
//最后返回给前端数据用formatResponseData.js 将的模型再次formatResponseData模型格式化
//为什么要分两个 因为 formatResponseData模型 要传ctx, 我将数据请求函数抽离出来，如果出错了
//那出错的数据不能用formatResponseData模型格式化，因为没有ctx。
//如果在每次调用前都传ctx给请求函数 就很累赘了
// 因此 抽离出一个单纯格式化 执行失败或成功的模型。
//formatResponseData模型就单纯为返回前端数据格式化
//下面这些则是某些操作后成功失败的格式化

//像一些操作成功，没有匹配数据 的这种失败就用 formatResponseData 手动指定错误返回
//总之 formatResponseData 模型针对给 统一数据返回前端
// responseModel模型 是 对 内部调用接口出错，或成功 或者其他调用出错 使用该模型统一
class error extends Error{
    constructor(msg='error',code=400){
        super()
        this.msg=msg;
        this.code=code
    }
}
class success{
    constructor(msg='success',code=200,data=null){
        this.msg=msg;
        this.code=code;
        this.data=data
    }
}

module.exports = {error,success}