<template>
  <div id="app">
    <Forminput />
  </div>
</template>

<script>
import Forminput from "./components/Forminput.vue";

export default {
  name: "app",
  components: {
    Forminput
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
