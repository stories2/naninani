<template>
  <v-app>
    <v-app-bar
      color="primary"
      density="compact"
      v-bind:image="appBarBackground"
    >
      <!-- <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template> -->

      <v-app-bar-title style="color: black">NaniNani</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon style="color: black">
        <v-icon>mdi-account-circle</v-icon>
        <!-- <v-icon icon="mdi-home" />
        <v-icon icon="fas fa-plus" /> -->
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",

  data() {
    return {
      appBarBackground: require("@/assets/appbarTitle2.jpg"),
    };
  },
});
</script>
