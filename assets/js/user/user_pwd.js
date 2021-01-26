$(function () {
    let form = layui.form
    form.verify({
        //密码校验
        pass: [
            /^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'
        ],
        //对新密码进行校验
        newpass: function (value) {
            //原密码和新密码比较
            let oldPwd = $('[name=oldPwd]').val()
            // console.log(oldPwd , value);
            if (oldPwd === value) { //value对应的是表单的值
                return '新旧密码不能相同'
            }
        },
        //确认新密码
        reNewPwd: function (value) {
            let newPwd = $('[name=newPwd]').val()
            // console.log(newPwd ,value)
            if (newPwd !== value) {
                return '两次输入的密码不一致'
            }
        }

    })
    //将修改的密码上传到服务器并添加提示
    $('#form').on('submit',function (e) {
        e.preventDefault()
        let data = $(this).serialize()
        axios.post('/my/updatepwd', data).then(res => {
            console.log(res);
            if (res.data.status !== 0) {
                return layer.msg(res.data.message)
            }
            layer.msg('更新密码成功')

            //成功后清空输入框
            $("#form")[0].reset()
        })
    }) 
})