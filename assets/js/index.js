//jquery入口函数

$(function() {
        //调取getUserInfo()函数 获取用户信息
        getUserInfo()

        var layer = layui.layer
        $('#btnLogout').on('click', function() {
            // console.log('ok');
            //提示用户是否确认退出
            layer.confirm('确定退出登陆?', { icon: 3, title: '提示' }, function(index) {
                // console.log('ok');

                //1.清空本地存储的token
                localStorage.removeItem('token')
                    //2.跳转到登陆页面
                location.href = '/login.html'
                    //关闭layui询问框
                layer.close(index);
            });
        })
    })
    //获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            //调用renderAvatar();渲染用户的头像
            renderAvatar(res.data);
        },
        // complate: function(res) {
        //     // console.log('执行了complate回调');
        //     // console.log(res);
        //     //在complate回调函数中 可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败') {
        //         //强制清空token
        //         localStorage.
        //         removeItem('token');
        //         //强制跳转到登陆页面
        //         location.href = '/login.html';
        //     }
        // }
    })
}

//渲染用户的头像
function renderAvatar(user) {
    //获取用户名称
    var name = user.nickname || user.username
        //设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //按需渲染用户的头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', 'user.user_pic').show()
        $('.text-avater').hide()
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show()
    }
}