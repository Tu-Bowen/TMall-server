var SocketIO = null
$(function () {
    console.log(window.location.origin)
    SocketIO = io(window.location.origin);
    SocketIO.on("connect", () => {
        console.log("socket.io连接成功")
    });
    SocketIO.on("message", data => {
        console.log(data);
    });
    SocketIO.on("return_private_message", data => {
        console.log(data)
        if(data.sender_type == 'fellow' && data.sendername == getStore("adminname")){
            return;
        }
        messagelists_li = `
        <li class="other">
        <img src="images/own_head.jpg" title="金少凯">
        <span>${data.text}</span>
        </li>
        `
        $('#chatbox').append($(messagelists_li))
    }),
    SocketIO.on("setstore_message",data=>{
        console.log(data)
    })
})