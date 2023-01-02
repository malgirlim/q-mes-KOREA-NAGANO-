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
  export default {
    data () {
      return {
        output: null
      }
    },
    methods: {
      async print () {
        // Pass the element id here
        await this.$htmlToPaper('printMe');
      }
    }
  }
  </script>