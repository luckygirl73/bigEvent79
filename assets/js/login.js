;(function () {
    $('#goLogin').on('click',function () {
        $('.LoginBox').hide()
        $('.RegiBox').show()
    })
    $('#goRegi').on('click', function () {
        $('.LoginBox').show()
        $('.RegiBox').hide()
    })

    let form = layui.form
    form.verify({
        username: function(value, item){ //value：表单的值、item：表单的DOM对象
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
        },
        
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ] ,
        repass: function (value, item) {
            // console.log(value, item); value 就是确认密码框内容   item 确认密码框是DOM元素
        
            // 注意细节：获取的密码框一定是注册form表单中的密码框
            let pwd = $(".RegiBox [name=password]").val();
        
            if (value !== pwd) {
                // 说明两次密码不一致
                return "两次密码不一致";
            }
        }
    })

    $('.RegiBox form').on('submit', function (e) {
        e.preventDefault()
        let data =$(this).serialize()

        axios.post('/api/reguser', data)
        .then(function (res) {
            console.log(res);
            if (res.data.status !== 0) {
                return layer.msg(res.data.message)
            }
            
            layer.msg('注册成功，请登录',{
                time: 1000
            } ,function(){
                //do something
                $('#goRegi').click()
              })
        })
    })

    $('.LoginBox form').on('submit', function (e) {
        e.preventDefault()
        let data = $(this).serialize()

        axios.post('/api/login', data)
        .then(function (res) {
            console.log(res)
            if (res.data.status === 0) {
                layer.msg('登录成功,正在跳转',{
                    time: 1000
                } ,function(){
                    //do something
                    location.href= '/home/index.html'
                })
            } else {
                layer.msg(res.data.message)
            }
            localStorage.setItem('token', res.data.token)
        })
    })
    
})()