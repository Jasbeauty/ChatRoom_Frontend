<template>
  <div class="home">
    <chat-room></chat-room>
  </div>
</template>

<script>
// @ is an alias to /src
import ChatRoom from "@/components/ChatRoom.vue";

export default {
  name: "home",
  components: {
    ChatRoom
  },

  methods: {}
};
</script>
