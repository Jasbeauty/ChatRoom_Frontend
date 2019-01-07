<template>
  <div>
    <hero></hero>
    <div
      class="has-text-centered section"
      style="margin-top:120px;"
    >
      <span class="">
        <a
          href="https://github.com/login/oauth/authorize?client_id=xxx"
          style=""
          class="btn"
        >
          <span class="fa fa-github fa-5x"></span>
        </a>
        <h1>Sign in with your Github</h1>
      </span>
    </div>
  </div>

</template>
<script>
import hero from "@/components/Hero";
export default {
  components: {
    hero
  }
};
</script>

<style scoped>
.btn {
  color: gray;
}
.btn:hover {
  color: black;
}
</style>

