<template>
  <div style="margin-bottom: 20px;">
    <v-card flat color="#FDF5E6" style="margin: 10px; border-radius: 10px;">
      <v-card-title class="text" style="font-size: 16px;">{{
        this.data.name
      }}</v-card-title>
      <v-row class="mr-1 pb-2 pt-1" align="center" justify="end">
        <v-icon class="cardMiniBtn">mdi-trash-can-outline</v-icon>
        <v-icon class="cardBtn">
          mdi-format-list-bulleted-square
        </v-icon>
      </v-row>
    </v-card>
  </div>
</template>

<script>
// import bridge from "@vkontakte/vk-bridge";
// import chroma from "chroma-js";

export default {
  name: "ListCard",
  props: ["data"],
  components: {},
  data: () => ({}),
};
</script>
