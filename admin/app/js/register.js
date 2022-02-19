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
	$('#register-bt').click(debounce(register,1000,[]));
	// 回车事件
	// $('#username, #password').keypress(function (event) {
	// 	if (13 == event.keyCode) {
	// 		register();
	// 	}
	// });
});
function register() {
	const username = $('#username').val()
	const password = $('#password').val()
	const password_again = $('#password-again').val()
	const nameReg = new RegExp(/[a-zA-Z]/)
	if (username === '') {
		$('usernameerr1').show()
	}
	//用户名只能包含英文
	else if (!nameReg.test(username)) {
		$('#usernameerr0').show()
	}
	else if (password === '') {
		$('#passerr0').show()
	} else if (password_again === '') {
		$('#againerr0').show()
	}
	//确认密码必须和原来的密码一样
	else if (password_again !== password) {
		$('#againerr').show()
	} else {
		$.ajax({
			url:BASE_URL+'/user/register',//BATH
			type: 'POST',
			data: {
				username: username,
				password: password,
			},
			beforeSend: function() {},
			success: function(res){
				console.log(res)
				if(!res.cannot){
					window.location.href='/admin/view/login'
				}
			},
			error: function(error){
				console.log(error);
			}
		});
	}
}