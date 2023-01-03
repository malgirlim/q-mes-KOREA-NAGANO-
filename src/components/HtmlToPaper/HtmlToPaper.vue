<template>
    <div>
      <button @click="print">Print 출력</button>
    </div>
</template>
  
  <script>
  
  export default {
    props:{
      data: String,
    },
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