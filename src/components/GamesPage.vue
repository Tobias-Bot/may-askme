<template>
  <div>
    <v-card-text style="font-size: 18px; line-height: 1.6;">
      Если ты сейчас читаешь это, то знай, что человек, который сейчас сидит
      рядом с тобой, очень любит тебя, и ты ему очень дорога! <br /><br /><br />
      Очень ♥
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: "GamesPage",
  components: {},
  data() {
    return {};
  },
  mounted() {
    this.pageHeight = document.documentElement.scrollHeight - 110 - 159;
  },
  methods: {},
};
</script>
