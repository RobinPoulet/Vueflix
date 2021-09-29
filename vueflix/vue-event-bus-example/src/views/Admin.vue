<template>
  <div id="app">

    <img alt="Vue logo" src="../assets/logo.png">

    <h1>{{ title }}</h1>

    <movies-list :admin="true"/>



  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

import MoviesList from "@/components/MoviesList";

export default {
  name: 'App',
  components: {
    //   HelloWorld
    MoviesList,
  },
  data: function () {
    return {
      title: "Bienvenue sur VueFlix",

    }
  }
}
</script>

<style lang="scss">
$primary-color: #4169E1;
$secondary-color: darken($primary-color, 30%);
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

h1 {
  transition: 1s;
  color: $secondary-color;
}

h1:hover {
  color: $primary-color;
}

.button-parent {
  transition: 1s;
  color: $primary-color;

  &:hover {
    color: $secondary-color;
  }
}
</style>