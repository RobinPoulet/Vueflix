<template>

  <div class="movieslist">

    <h3>Nombre de film de la liste : {{ filteredMovies.length }}</h3>

    <h2>Liste des films</h2>

    <v-card
        class="mx-auto"
        max-width="1600"
        tile
    >
      <v-list-item two-line v-for="movie in filteredMovies" :key="movie.id">
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
import EventBus from "../event-bus";

export default {
  name: "MoviesList",
  components: {},
  data: function () {
    return {
      playlistMovie: [],
      selectGenre: ""
    }
  },
  props: {
    admin: Boolean,
    playlist: Boolean,
  },
  computed: {
    moviesList() {
      return this.$store.state.moviesList
    },
    filteredMovies() {
      if (this.selectGenre === "" || this.selectGenre === null) {
        return this.moviesList;
      } else {
        return this.moviesList.filter(movie => {
          return movie.genres.includes(this.selectGenre)
        })
      }
    }
  },
  methods: {
    deleteMovie(id) {
      axios
          .delete("https://apimovietest.herokuapp.com/api/movies/" + id)
          .then()
          .catch(e => {
            alert(e);
          })
    }
  },
  mounted() {
    this.$store.dispatch("getMoviesList");
    EventBus.$on('changeSelect', (data) => {
      this.selectGenre = data;
    })
  }
}

</script>

<style scoped>

</style>