<template>

  <div
    class="wrap"
    ref="barrager"
  >
    <!-- 标题横幅 -->
    <hero></hero>
    <!-- 聊天记录 -->
    <section class="section">
      <div class="container">
        <p class="panel-heading">
          Messages
        </p>
        <div
          v-for="(msg, index) in msgs"
          :key="index"
        >
          <div class="panel-block">
            <div class="">
              <article class="media">
                <div class="media-left">
                  <figure class="image is-32x32">
                    <img
                      :src="msg.avatar"
                      alt="Image"
                    >
                  </figure>
                </div>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>{{ msg.name }}</strong> &nbsp;&nbsp;<small class="fa fa-history"></small> <small>{{
                        msg.cur_time }}</small>
                      <br>
                      {{ msg.text }}
                    </p>
                  </div>
                </div>

              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 分页栏 -->
    <pagination></pagination>
    <!-- 聊天框 （固定在底部）-->
    <footerchat @sendmsg="getMsg"></footerchat>

  </div>
</template>


<script>
import Vue from "vue";
import barrage from "vue2-barrage";
import hero from "@/components/Hero";
import footerchat from "@/components/FooterChat";
import pagination from "@/components/Pagination";

Vue.use(barrage);
// import barrager from "../../static/js/jquery.barrager.min.js";

var $ = require("jquery");
export default {
  name: "ChatRoom",
  data() {
    return {
      msgs: [],
      newMsg: {
        avatar: "",
        name: "",
        text: "",
        cur_time: ""
      },
      avatar: "",
      // user: null,
      submitwebsock: null,
      receivewebsock: null,
      //初始化websocket
      wssubmit: "ws://xxx:7075/submit",
      wsreceive: "ws://xxx:7075/receive"
      // 手机端登陆：xxx:7071
    };
  },
  components: {
    hero,
    footerchat,
    pagination
  },
  methods: {
    // 获取FooterChat子组件传来的值newMsg
    getMsg(childMsg) {
      this.newMsg = childMsg;
      this.newMsg["avatar"] = this.avatar;
      // this.newMsg["name"] = this.name;
      this.websocketsend(this.newMsg);
    },
    initWebSocket() {
      // 接收数据
      this.receivewebsock = new WebSocket(this.wsreceive);
      this.receivewebsock.onmessage = this.websocketonmessage;
      // 发送数据
      this.submitwebsock = new WebSocket(this.wssubmit);
      this.submitwebsock.onopen = this.websocketonopen;
      // 连接失败后重连
      this.submitwebsock.websocket = this.websocket;
      // 关闭连接
      this.submitwebsock.onclose = this.websocketclose;
    },
    websocketonopen() {
      console.log("websocket连接成功");
    },
    websocket() {
      //连接建立失败重连
      console.log(this.$route.path);
      this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收(将json转为对象)
      const redata = JSON.parse(e.data);
      // console.log(redata);
      if (redata["text"] !== undefined) {
        // redata["avatar"] = require("../../static/img/" + redata["avatar"]);
        this.msgs.push(redata);
        let barragerData = {
          text: redata["text"],
          speed: 1,
          color: "#AEDD81"
        };
        this.send(barragerData);
      } else {
        // 初始化全局头像
        // this.avatar = redata["avatar"];
        this.avatar = this.$route.params.avatar_url;

        // this.name = redata["name"];
        // console.log(this.name);
      }
    },
    websocketsend(Data) {
      //数据发送
      if (this.submitwebsock.readyState !== 1) {
        // 连接断开后重新初始化连接
        this.initWebSocket();
      } else {
        this.submitwebsock.send(JSON.stringify(Data));
      }
    },
    websocketclose(e) {
      //关闭
      console.log("断开连接", e);
      this.submitwebsock = new WebSocket(this.wssubmit);
    },
    myCallback() {}
  },
  created() {
    console.log("初始化websocket");
    //页面刚进入时开启长连接
    // this.getAvatar();

    // console.log(this.$route.params.avatar_url);
    this.initWebSocket();
  },
  //组件绑定mounted钩子函数内执行初始化方法，返回发送弹幕方法
  mounted() {
    this.send = this.$start(document.querySelector(".wrap"));
    // this.$refs.barrager.height = $(window).height();
    // console.log($(window).height());
  },
  destroyed() {
    //页面销毁时关闭长连接
    console.log("des");
    // this.websocketclose();
  }
};
</script>
<style scoped>
</style>




``


