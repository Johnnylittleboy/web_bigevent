// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    console.log(options.url);
    if (options.url.indexOf('/my') !== -1) {
        //统一为有权限的headers 设置请求头
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //全局统一挂载complate回调函数
    options.complate = function(res) {
        // console.log('执行了complate回调');
        // console.log(res);
        //在complate回调函数中 可以使用res.responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败') {
            //强制清空token
            localStorage.
            removeItem('token');
            //强制跳转到登陆页面
            location.href = '/login.html';
        }

    }
})