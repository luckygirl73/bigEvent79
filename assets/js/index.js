function getUserinfo() {
    axios.get('/my/userinfo').then(function (res) {
        console.log(res)
        if (res.data.status !== 0) {
            return layer.msg('获取用户信息失败')
        }
        avatarAndName(res.data)
    })
}
getUserinfo()
function avatarAndName(res) {
    let name = res.data.nickname || res.data.username
    $('#welcome').text('欢迎' + name)
    if (res.data.user_pic) {
        $('.layui-nav-img').attr('src', res.data.user_pic).show()
        $('.text_avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        $('.text_avatar').text(name[0].toUpperCase()).show()
    }
}

function exitPage () {
    $('.layui-nav-item').on('click',function () {
        layer.confirm('是否确认退出', {icon: 3, title:'提示'}, function(index){
            //do something
            location.href = '/home/login.html'
            layer.close(index);
          });
    })
}
exitPage () 