<template>
  <RouterView />
</template>

<script lang="ts">
export default {
  created() {
    // 컴포넌트 생성시 데이터를 패치한다
    this.fetchData();
  },
  watch: {
    // 라우터 객체를 감시하고 있다가 fetchData() 함수를 호출한다
    $route: "fetchData",
  },
  methods: {
    fetchData() {
      console.log(this.$route.meta[0]);
    },
  },
};
</script>
