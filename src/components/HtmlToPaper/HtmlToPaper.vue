<template>
  <div>
    Hello!<!-- SOURCE -->
    <div id="printMe">
      <h1>Print me!</h1>
    </div>
    <!-- OUTPUT -->
    <button @click="print">22</button>
  </div>
</template>

<script>
import VueHtmlToPaper from "vue-html-to-paper";

export default {
  data() {
    return {
      output: null,
    };
  },
  methods: {
    async print() {
      // Pass the element id here
      await this.$htmlToPaper("printMe");
    },

    // print: function () {
    //   VueHtmlToPaper("print_area"); /** Error occurs here */
    // },
  },
};
</script>
