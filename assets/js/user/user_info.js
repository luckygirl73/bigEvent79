$(function () {
    // ------------------发送ajax请求用户信息---------------------------
    //使用layui必备的
    let form = layui.form
    function getUserInfo() {
        
        axios.get('/my/userinfo')
            .then(function (res) {
            // console.log(res);
            form.val('form',res.data.data)
        })
    }
    getUserInfo()
    //---------------------添加用户昵称校验-----------------------------

    form.verify({
        nickname: function(value, item){ //value：表单的值、item：表单的DOM对象
            if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
              return '用户名不能有特殊字符';
            }
            if(/(^\_)|(\__)|(\_+$)/.test(value)){
              return '用户名首尾不能出现下划线\'_\'';
            }
            if(/^\d+\d+\d$/.test(value)){
              return '用户名不能全为数字';
            }
            
            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if(value === 'xxx'){
              alert('用户名不能为敏感词');
              return true;
            }
            if (value.length > 6) {
                return "昵称长度需要在1-6个字符"
            }
          }
    })
    //--------------------------实现修改功能----------------------
    $('#form').on('submit', function (e) {
        e.preventDefault()
        let data = $(this).serialize()
        console.log(data)
        axios.post('/my/userinfo', data)
            .then(res => {
                console.log(res);
                if (res.data.status !== 0) {
                    return layer.msg('修改用户信息失败！')
                }
                layer.msg('修改用户信息成功')

                // console.log($("#welcome"))
                // console.log(window.parent);此操作获取到父页面也就是index页面的window对象
                window.parent.getUserInfo();//index.js文件里面的函数
            })
    })

    //--------------------------重置功能----------------------
    $('#resetBtn').on('click', function (e) {
        e.preventDefault()//阻止重置按钮得默认功能

        //再次获取信息，填充到表单中
        getUserInfo()
    })
})