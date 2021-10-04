<template>
  <div class="playlistEdit">

    <h1>Ajouter ou Supprimer un film de la Playlist</h1>

    <h2>Playlist : {{ playlist.name }}</h2>

    <v-card
        class="mx-auto"
        max-width="1600"
        tile
    >
      <v-list-item two-line v-for="(movie, index) in playlist.film" :key="index">
        <v-list-item-content>
          <v-list-item-title>
            <h3> {{ movie.title }} </h3>
            <v-rating
                :value="movie.grade"
                readonly
                color="yellow"
                dense
                length="10"
                size="60"
            ></v-rating>
          </v-list-item-title>
          <v-list-item-subtitle>
            <router-link v-show="admin"
                         :to="{
              name: 'Movie',
              params: { id: movie.id, movie: movie}
            }"
            >
              <v-container
                  fluid
                  class="pa-0"
              >
                <div class="my-2">
                  <v-btn
                      color="success"
                      dark
                      large
                  >
                    Noter le film et/ou laisser un commentaire
                  </v-btn>

                </div>
              </v-container>
            </router-link>
            <v-btn v-if="admin"
                   color="warning"
                   small
                   @click="deleteMovie(movie.id)"
            >
              Supprimer ce film
            </v-btn>

          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

    </v-card>


  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PlaylistEdit",
  props: {
    playlist: Object
  },
  data() {
    return {
      moviesList: []
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
                this.moviesList.push(response.data);
              }
          )
          .catch(e => {
            alert(e)
          });
    }
  },
  mounted() {
    this.playlist.film.forEach(film => {
      this.getMovieInformations(film.id)
    })
  }
}
</script>

<style scoped>

</style>