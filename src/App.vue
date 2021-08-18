<template>
  <Main />
</template>

<script>
import Main from "./components/Main";
import bridge from "@vkontakte/vk-bridge";

export default {
  name: "App",

  components: {
    Main,
  },

  data: () => ({
    //
  }),

  created() {
    bridge.send("VKWebAppShare", {"link": "https://vk.com/app6909581#hello"});
  },
};
</script>
