<template>
  <div>
    <hero></hero>
    <div
      class="has-text-centered section"
      style="margin-top:120px;"
    >
      <span class="">
        <span class="fa fa-cog fa-spin fa-3x"></span>
        <h1>Please wait for verification ...</h1>
      </span>
    </div>
  </div>

</template>
<script>
import hero from "@/components/Hero";
import axios from "axios";
import qs from "qs";

export default {
  data() {
    return {
      authParams: {
        code: "",
        client_id: "xxx",
        client_secret: "xxxxxxxxxxxx",
        redirect_uri: "http://127.0.0.1:8080/home"
      }
    };
  },
  components: {
    hero
  },
  methods: {
    post() {
      axios({
        method: "post",
        url: "/access_token",
        data: {
          code: this.authParams["code"],
          client_id: this.authParams["client_id"],
          client_secret: this.authParams["client_secret"]
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          console.log(response.data);
          let params = response.data.split("&"); // split() 方法用于把一个字符串分割成字符串数组
          console.log(params);
          let token = params[0].split("=")[1];
          this.get(token);
        })
        .catch(error => {
          console.log(error);
        });
    },
    get(token) {
      axios({
        method: "get",
        url: "/user",
        // responseType: "json",
        params: {
          access_token: token
        }
      })
        .then(response => {
          console.log(response.data["avatar_url"]);
          console.log(response.data["name"]);
          // 判断用户名、头像是否获取成功
          if (response.data !== null) {
            // vue通过url进行页面传参数
            this.$router.push({
              name: "home",
              params: {
                avatar_url: response.data["avatar_url"],
                name: response.data["name"]
              }
            });
          } else {
            console.log("没有登录成功！");
            this.$router.push({
              name: "signup"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    // vue获取url参数
    this.authParams["code"] = this.$route.query.code;
    console.log(this.authParams["code"]);
    // this.authParams = qs.stringify(this.authParams);
    console.log(this.authParams);
    this.post();
  }
};
</script>

