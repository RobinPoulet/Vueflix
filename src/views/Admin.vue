<template>
  <div id="app">

    <router-link to="/admin/playlistBackoffice">
      <v-btn
          class="ma-2"
          outlined
          color="indigo"
      >
        Playlist Backoffice
      </v-btn>
    </router-link>

    <v-container fluid>

      <img alt="Vue logo"
           src="data:image/jpeg;base64,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">

      <h1>{{ title }}</h1>

    </v-container>

    <MoviesFilter/>

    <movies-list :admin="true" :playlist="false"/>

    <MovieCreation/>

  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

import MoviesList from "@/components/MoviesList";
import MovieCreation from "@/components/MovieCreation";
import MoviesFilter from "../components/MoviesFilter";

export default {
  name: 'App',
  components: {
    //   HelloWorld
    MoviesList,
    MovieCreation,
    MoviesFilter
  },
  data: function () {
    return {
      title: "Bienvenue sur VueFlix",
      admin: true
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
  font-size: 100px;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  color: deepskyblue;
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