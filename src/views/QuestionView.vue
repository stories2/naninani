<template>
  <v-row class="text-center" style="margin-top: 15px">
    <v-col cols="12">
      <cropped-image
        url="https://w.namu.la/s/d97b339abe53c0c7359b66d27e135b1490b559a4689436e1331627f628fdbe22de9038aaf2462343503931d0124a46289f6e1b4f8c3b6873ecd15bad34a3bf2537fefc34995d3dae3ee159c439d89e2a0ceaef8d4055f0a92d66d12f0433c6098431bd4699481b0e6fc24b2d0e89a4fe"
      />
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
