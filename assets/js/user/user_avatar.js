$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')

    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    //点击上传，模拟点击文件域
    $('#chooseBtn').on('click', function () {
        $('#file').click()
    })

    //================文件域change事件=========================
    //当文件域发生改变的时候就会触发change事件
    $('#file').on('change', function () {

        //获取到用户选中的图片
        let file = this.files[0]
        console.log(file);

        //如果file不存在，不进行下一步操作
        if (!file) {
            return
        }
        //把用户选择的图片放到裁剪区域
        //根据选择的图片。创建一个新的URL地址
        let newImgURL = URL.createObjectURL(file)
        
        $image.cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    })

    //===============点击确定。实现上传头像==================
    $('#sureBtn').on('click',function () {
        let dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        console.log(dataURL);
            
        axios.post('/my/update/avatar', 'avatar=' + encodeURIComponent(dataURL)).then(res => {
            console.log(res);
            //提示
            if (res.data.status !== 0) {
                return layer.msg('更新头像失败')
            }
            layer.msg('更新头像成功')

            //更新头像
            window.parent.getUserInfo()
        })
    })
})