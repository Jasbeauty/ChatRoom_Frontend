<template>
  <footer
    class="footer"
    style="height:150px;
      position: fixed;
      right: 0;
      left: 0;
      z-index: 1030;
      bottom: 0;
      margin-bottom: 0;
      border-width: 1px 0 0;"
  >
    <div class="container">
      <!-- 输入框 -->
      <div class="box">
        <div class="columns">
          <!-- 用户名 -->
          <div class="column is-one-fifth">
            <p class="control has-icons-left">
              <input
                class="input is-mobile"
                type="text"
                placeholder="Username input"
                v-model="newMsg.name"
                autofocus
                id="name"
              >
              <span class="icon is-small is-left">
                <i class="fa fa-user"></i>
              </span>
            </p>
          </div>
          <!-- 聊天内容 -->
          <div class="column is-three-fifths">
            <p class="control has-icons-left">
              <input
                type="text"
                class="input is-mobile"
                placeholder="Chat input"
                v-model="newMsg.text"
                @keyup.enter="btnOnclick()"
                id="chat"
              >
              <span class="icon is-small is-left">
                <i class="fa fa-edit"></i>
              </span>
            </p>
          </div>
          <!-- 提交和重置按钮 -->
          <div class="column is-one-fifth">
            <div class="field is-grouped">
              <div class="control">
                <input
                  class="button is-dark"
                  type="button"
                  @click="send"
                  value="Submit"
                  id="submit_btn"
                >
              </div>
              <div class="control">
                <input
                  class="button"
                  type="reset"
                  value="Reset"
                  @click="reset"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
var $ = require("jquery");

export default {
  name: "footerchat",
  data() {
    return {
      newMsg: {
        name: "",
        text: "",
        cur_time: ""
      }
    };
  },
  methods: {
    // 点击提交按钮触发的事件（子组件向父组件传值）
    send() {
      if (this.checkNull() === true) {
        this.newMsg.cur_time = this.getNowFormatDate();
        // this.msgs.push(this.newMsg);
        this.$emit("sendmsg", this.newMsg);
        this.newMsg.text = "";
        this.newMsg.cur_time = "";
      }
    },
    // 重置输入框中的内容
    reset() {
      this.newMsg = {};
    },
    //前台页面获取当前时间
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var strHr = date.getHours();
      var strMins = date.getMinutes();
      var strSecs = date.getSeconds();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (strHr >= 0 && strHr <= 9) {
        strHr = "0" + strHr;
      }
      if (strMins >= 0 && strMins <= 9) {
        strMins = "0" + strMins;
      }
      if (strSecs >= 0 && strSecs <= 9) {
        strSecs = "0" + strSecs;
      }
      var currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        strHr +
        seperator2 +
        strMins +
        seperator2 +
        strSecs;
      // console.log(currentdate);
      return currentdate;
    },
    // 按enter键实现提交
    btnOnclick() {
      if (event.keyCode === 13) {
        event.preventDefault();
        $("#submit_btn").click();
      }
    },
    // 判断用户输入是否为空（为空的话改变class和placeholder）
    checkNull() {
      var num = 0;
      var str = "";
      $("input[type$='text']").each(function(n) {
        if (
          $(this)
            .val()
            .trim() === ""
        ) {
          num++;
        }
      });
      if (num > 0) {
        $(".input").addClass("is-danger");
        $(".input").attr("placeholder", "This field is required");
        return false;
      } else {
        $(".input").removeClass("is-danger");
        $("#name").attr("placeholder", "Username input");
        $("#chat").attr("placeholder", "Chat input");
        return true;
      }
    }
  },
  mounted() {
    console.log(this.$route.params.name);
    this.newMsg.name = this.$route.params.name;
  }
};
</script>

