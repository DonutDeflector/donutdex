<template>
  <div id="app">
    <router-view name="header"/>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  max-width: 960px;
  padding: 10px;
  margin: 0 auto;
}
</style>
