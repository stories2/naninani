<template>
  <div class="row justify-content-center">
    <div class="col-12 col-sm-12 col-md-6 col-lg-5" style="text-align: center">
      <div class="btn-margin" v-for="name in answerList" :key="name">
        <v-btn variant="outlined">{{ name }}</v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AnswerButtons",

  props: {
    //   https://vuejs.org/guide/components/props.html#prop-validation
    answerList: {
      type: Array,
      required: true,
    },
  },
});
</script>

<style scoped>
.btn-margin {
  margin: 5px;
  display: inline-block;
}
</style>
