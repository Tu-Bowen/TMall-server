

//底部扩展键
$(function () {
	$('#doc-dropdown-js').dropdown({ justify: '#doc-dropdown-justify-js' });
});

$(function () {
	$(".office_text").panel({ iWheelStep: 32 });
});

//tab for three icon	
$(document).ready(function () {
	$(".sidestrip_icon a").click(function () {
		$(".sidestrip_icon a").eq($(this).index()).addClass("cur").siblings().removeClass('cur');
		$(".middle").hide().eq($(this).index()).show();
	});
});

//input box focus
$(document).ready(function () {
	$("#input_box").focus(function () {
		$('.windows_input').css('background', '#fff');
		$('#input_box').css('background', '#fff');
	});
	$("#input_box").blur(function () {
		$('.windows_input').css('background', '');
		$('#input_box').css('background', '');
	});
});


$(document).ready(() => {
	//获取会话列表
	var token = getStore('token')
	var adminid = getStore('adminid')
	var adminname = getStore('adminname')
	var sessionclick=function () {
		$(this).siblings('li').removeClass('user_active');
		$(this).addClass('user_active')
	
		const type = $(this).data('type')
		const targetid = $(this).data('targetid')
		const targetname = $(this).data('targetname')
		const sessionname = $(this).data('session')
		$("#windows_top_name").text(targetname)
		$("#talkbox").show()
		$("#talkbox").data("type",type)
		$("#talkbox").data("targetid",targetid)
		$("#talkbox").data("targetname",targetname)
		$("#talkbox").data("session",sessionname)
		$.ajax({
			type: "GET",
			url: BASE_URL + '/session/messages',
			data: {
				type,
				targetid,
				targetname,
				username: adminname
			},
			success: function (response) {
				console.log(response)
				$('#chatbox').empty();
				const messagelists = response.messagelists
				var messagelists_li = ""
				messagelists.forEach(message => {
					messagelists_li += `
					<li class=${(message.sender_type == 'fellow' && message.sendername == getStore("adminname")) ? "me" : "other"}><img src="images/own_head.jpg" title="金少凯"><span>${message.text}</span></li>
					`
				})
				$('#chatbox').append($(messagelists_li))
			}
		});
	}
	$.ajax({
		type: "GET",
		url: BASE_URL + '/session/sessions',
		data: {
			username: adminname,
			userid: adminid
		},
		success: function (response) {
			if (!response.cannot) {
				var userlist_li = ""
				const sessionlists = response.sessionlists
				SocketIO.emit("session",{sessions:sessionlists,username:adminname})
				sessionlists.forEach(session => {
					userlist_li += `
					<li data-targetid=${session.targetid} data-type=${session.type} data-targetname=${session.targetname} data-session=${session.messages}>
					<div class="user_head"><img src=${session.image || "images/head/2.jpg"} /></div>
					<div class="user_text">
						<p class="user_name">${session.targetname}</p>
						<p class="user_message">${session.lastest}</p>
					</div>
					<div class="user_time">${session.time || ""}</div>
					</li>
				`
				})
				$(".user_list").append($(userlist_li));
				$(".user_list").children('li').click(sessionclick)
			}
		}
	});
})






















































