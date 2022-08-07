<template>
  <menu-content-style>
    <template v-slot:menu> menu </template>
    <template v-slot:content>
      <b-row>
        <b-col class="text-center" style="padding-top: 15px">
          <cropper
            class="cropper"
            :src="img"
            :stencil-props="{
              aspectRatio: 10 / 12,
            }"
            @change="change"
            :canvas="false"
          />
        </b-col>
      </b-row>
    </template>
  </menu-content-style>
</template>

<script lang="ts">
import MenuContentStyle from "@/components/MenuContentStyle.vue";
import { defineComponent } from "vue";
import { Cropper } from "vue-advanced-cropper";

export default defineComponent({
  components: { MenuContentStyle, Cropper },
  name: "EditorView",
  data() {
    return {
      img: "https://images.pexels.com/photos/226746/pexels-photo-226746.jpeg",
    };
  },
  methods: {
    change({ coordinates, canvas }: any) {
      console.log(coordinates, canvas);
    },
  },
});
</script>

<style scoped>
.cropper {
  height: 300px;
  width: 300px;
  background: #ddd;
  display: inline-block;
}

/* // Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  .cropper {
    height: 400px;
    width: 400px;
  }
}

/* // Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .cropper {
    height: 400px;
    width: 500px;
  }
}

/* // Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .cropper {
    height: 400px;
    width: 600px;
  }
}

/* // X-Large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  .cropper {
    height: 400px;
    width: 800px;
  }
}

/* // XX-Large devices (larger desktops, 1400px and up) */
@media (min-width: 1400px) {
  /* .cropper {
    height: 400px;
    width: 800px;
  } */
}
</style>
