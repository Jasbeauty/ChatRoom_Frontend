# chatroom

## Steps（Flask-Sockets + Vue）
#### 前后端的消息传递
* 父组件中初始化 `websocket`，并建立连接
> 注意：
>   * `created()` 和 `destroyed()` 属于生命周期，不能写在 `methods(){...}` 中
>   * 由于发送完消息，连接就会自动关闭，所以每次发送消息的时候，都需要判断连接是否断开（`this.submitwebsock.readyState !== 1`），断开就创建新的连接
    
* 后台使用 `flask_sockets` 建立连接，来接收和发送消息
* 关于头像

用户刷新页面的时候，会先接收到后台随机分配的头像，把该头像设为全局头像，这样保证某个用户在不刷新页面的情况下，头像不会更改；判断当接收到的消息中包含消息内容，则表明是其他用户发的消息，那么头像就直接使用传递过来的值
```
<img :src="msg.avatar" alt="Image">

avatar: "";
this.newMsg["avatar"] = this.avatar;

if (redata["text"] !== undefined) {
    redata["avatar"] = require("../../static/" + redata["avatar"]);
  } else {
    // 初始化全局头像
    this.avatar = redata["avatar"];
}
```
> 注意图片的路径需要 `require('./image.png')` 这种格式

* 实现消息广播
```
msgs: [],
newMsg: {
    avatar: "",
    name: "",
    text: "",
    cur_time: ""
}
// 用户自己发送消息
this.websocketsend(this.newMsg);
// 接收其他用户发送的消息
this.msgs.push(redata);
```

#### 添加弹幕
使用 [`VUE2-barrage`](https://github.com/FoxDaxian/barrage/blob/master/src/App.vue) 插件
#### 消息存入数据库

## Github 第三方登录
采用授权码模式
1. 通过 `client_id` 请求授权服务端，获取 `Authorization Code`
2. 在重定向的过程中（注册时给定的 URI），通过 `Authorization Code`、`client_id`、`client_secret` 请求授权服务端，验证完 `Authorization Code` 是否失效以及接入的客户端信息是否有效（通过传递的 `client_id` 和`client_secret` 信息和服务端已经保存的客户端信息进行匹配）之后，授权服务端生成 `Access Token` 和`Refresh Token`， 并返回给客户端
3. 客户端通过得到的 `Access Token` 请求资源服务应用，获取需要的并在所申请 `Access Token` 权限范围内的资源信息

#### 解决跨域问题
根目录下新建 `vue.config.js`
> 注意：`pathRewrite` 一定要写 
