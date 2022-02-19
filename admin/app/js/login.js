$(function () {
	// Waves初始化
	Waves.displayEffect();
	// 输入框获取焦点后出现下划线
	$('.form-control').focus(function () {
		$(this).parent().addClass('fg-toggled');
		$('.inputerror').hide()
	}).blur(function () {
		$(this).parent().removeClass('fg-toggled');
	});
});
Checkbix.init();
$(function () {
	//隐藏所有错误提示
	$('.inputerror').hide()
	// 点击登录按钮
	$('#login-bt').click(debounce(login, 1000, []));
	// 回车事件
	$('#username, #password').keypress(function (event) {
		if (13 == event.keyCode) {
			login();
		}
	});
});
// 登录
function login() {
	const username = $('#username').val()
	const password = $('#password').val()
	if (username === '') {
		$('#nameerr0').show();
	} else if (password === '') {
		$('#passerr0').show()
	} else {
		$.ajax({
			url: BASE_URL + '/user/login',
			type: 'POST',
			data: {
				username,
				password
			},
			beforeSend: function () { },
			success: function (res) {
				if(res.type === 0){
					$('#nameerr1').show()
				}else if(res.type === 2){
					$('#passerr1').show()
				}else if(res.type === 1){
					console.log("成功登录")
					setStore("token",res.token)
					setStore("adminname",res.username)
					setStore("adminid",res.adminid)
					window.location.href='/admin/view/index'
				}
			},
			error: function (error) {
				console.log(error);
			}
		});
	}
}