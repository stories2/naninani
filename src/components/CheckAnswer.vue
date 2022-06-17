<template>
  <div>
    <div
      v-if="isUserSelected"
      class="row justify-content-center"
      style="margin-top: 15px"
    >
      <div
        class="col-12 col-sm-12 col-md-6 col-lg-5"
        style="text-align: center"
      >
        선택: {{ selected.name }}
      </div>
    </div>
    <template v-if="expected && isUserSelected">
      <!-- {{ selected.idx != undefined }} / {{ selected.idx != "" }} /
      {{ selected.idx }} -->
      <div
        v-if="expected.idx == selected.idx && expected.name == selected.name"
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
        v-else
        class="row justify-content-center"
        style="margin-top: 15px; color: #da4334"
      >
        <div
          class="col-12 col-sm-12 col-md-6 col-lg-5"
          style="text-align: center"
        >
          <v-icon>mdi-close-circle</v-icon> 땡!
        </div>
        <div
          class="col-12 col-sm-12 col-md-6 col-lg-5"
          style="text-align: center"
        >
          정답: {{ expected.name }}
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CheckAnswer",

  props: {
    //   https://vuejs.org/guide/components/props.html#prop-validation
    expected: {
      type: Object,
      required: true,
    },

    selected: {
      type: Object,
      required: true,
    },
  },

  mounted() {
    console.log("selected.idx", this.selected.idx, typeof this.selected.idx);
  },

  computed: {
    isUserSelected(): boolean {
      // console.log(
      //   "selected.idx",
      //   this.selected.idx,
      //   typeof this.selected.idx,
      //   this.selected.idx != undefined,
      //   this.selected.idx !== ""
      // );
      return (
        this.selected &&
        this.selected.idx != undefined &&
        this.selected.idx !== ""
      );
    },
  },
});
</script>
