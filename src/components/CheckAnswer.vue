<template>
  <div>
    <div
      class="row justify-content-center"
      style="margin-top: 15px; color: #38bd2c"
    >
      <div
        class="col-12 col-sm-12 col-md-6 col-lg-5"
        style="text-align: center"
      >
        <v-icon>mdi-check-circle</v-icon> 정답!
      </div>
    </div>
    <div
      class="row justify-content-center"
      style="margin-top: 15px; color: #da4334"
    >
      <div
        class="col-12 col-sm-12 col-md-6 col-lg-5"
        style="text-align: center"
      >
        <v-icon>mdi-close-circle</v-icon> 땡!
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CheckAnswer",
});
</script>
