<template>
  <v-row class="text-center" style="margin-top: 15px">
    <v-col cols="12">
      <cropped-image />
    </v-col>
  </v-row>

  <v-row class="text-center">
    <v-col cols="12"> asdf </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import CroppedImage from "../components/CroppedImage.vue";

export default defineComponent({
  name: "QuestionView",

  components: {
    CroppedImage,
  },
});
</script>
