<template>
  <div>
    <ins
      class="adsbygoogle"
      style="display: block"
      data-ad-client="ca-pub-4303149958691101"
      data-ad-slot="8236431050"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AdsenseBlock",

  mounted() {
    // adsense
    let adsbygoogle;
    console.log("adsbygoogle", adsbygoogle);
    (adsbygoogle = (window as any).adsbygoogle || []).push({});
  },
});
</script>
