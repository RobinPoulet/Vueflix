<template>
  <div class="playlist">

    <div class="text-center">
      <v-btn
          class="ma-2"
          color="red lighten-1"
          dark
      >
        <v-icon
            dark
            left
        >
          mdi-arrow-left
        </v-icon>
        <router-link to="/admin/playlistBackoffice" style="color: white">Back</router-link>
      </v-btn>
    </div>

    <h2>Playlist : {{ playlist.name }}</h2>

    <v-container fluid>

      <v-card
          class="mx-auto"
          max-width="1600"
          tile
      >
        <v-list-item two-line v-for="(movie, index) in allMovies" :key="index">
          <v-list-item-content>
            <v-list-item-title>
              <h3> {{ movie.title }} </h3>
              <v-chip
                  v-for="(genre, index) in movie.genres" :key="index"
                  class="ma-2"
                  color="blue"
                  label
                  text-color="white"
              >
                <v-icon left>
                  mdi-label
                </v-icon>
                {{ genre.name }}
              </v-chip>

              <v-rating
                  v-if="movie.vote_average > 0"
                  :value="movie.vote_average"
                  readonly
                  color="yellow"
                  dense
                  length="10"
                  size="60"
              ></v-rating>
              <p>Nombre de votants : {{ movie.vote_count }}</p>
            </v-list-item-title>
            <v-list-item-subtitle>
             <p>{{ movie.tagline }}</p>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

      </v-card>

    </v-container>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Playlist",
  props: {
    id: Number,
    playlist: Object
  },
  data() {
    return {
      allMovies: [],
    }
  },
  methods: {
    getMovieInformations: function (id) {
      axios
          .get("https://api.themoviedb.org/3/movie/"
              + id +
              "?api_key=80d0dd074cbffeb2db4b0123882c7f44&language=en-US")
          .then(
              response => {
                console.log(response.data);
                this.allMovies.push(response.data);
              }
          )
          .catch(e => {
            alert(e)
          });
    },
    displayMovieFromPlaylist: function () {
      this.playlist.film.forEach(film => {
        console.log(film);
        this.getMovieInformations(film.id)
      })
    }
  },
  mounted() {
    this.displayMovieFromPlaylist();
  }
}
</script>

<style scoped>

</style>