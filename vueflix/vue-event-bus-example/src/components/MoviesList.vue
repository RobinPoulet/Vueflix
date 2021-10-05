<template>

  <div class="movieslist">

    <h3>Nombre de film de la liste : {{ filteredMovies.length }}</h3>

    <v-container fluid>

      <h4>Afficher la liste de films selon les catégories choisies</h4>

      <v-row>

        <v-col v-for="(genre, index) in moviesGenres" :key="index">

          <v-checkbox
              v-model="selectGenre"
              :label="genre.name"
              :value="genre.id"
          ></v-checkbox>

        </v-col>

      </v-row>

      <h2>Liste des films</h2>

    </v-container>

    <v-card
        class="mx-auto"
        max-width="1600"
        tile
    >
      <v-list-item two-line v-for="movie in moviesList" :key="movie.id">
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
  name: "MoviesList",
  components: {},
  data: function () {
    return {
      selectGenre: null,
      moviesGenres: [],
      playlistMovie: [],
    }
  },
  props: {
    admin: Boolean,
    playlist: Boolean
  },
  computed: {
    moviesList() {
      return this.$store.state.moviesList
    },
    filteredMovies() {
      if (this.selectGenre === null) {
        return this.moviesList;
      } else {
        return this.moviesList.filter(movie => {
          return movie.genres.includes(this.selectGenre)
        })
      }
    }
  },
  methods: {
    getAllMoviesGenres: function () {
      axios
          .get("https://api.themoviedb.org/3/genre/movie/list?api_key=80d0dd074cbffeb2db4b0123882c7f44&language=en-US")
          .then(
              response => {
                console.log(response.data.genres);
                this.moviesGenres = response.data.genres;
              }
          )
          .catch(e => {
            alert(e)
          });
    },
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
    this.getAllMovies();
    this.getAllMoviesGenres();

  }
}

</script>

<style scoped>

</style>