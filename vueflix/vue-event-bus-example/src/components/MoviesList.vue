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
            <v-btn v-if="playlist"
                   color="success"
                   small
                   @click="addMovieToPlaylist(movie)"
            >
              Ajouter le film à la playlist
            </v-btn>

          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>


      <v-btn v-if="playlist"
             color="success"
             small
             @click="playlistCreation"
             >
        Valider la playlist
      </v-btn>

    </v-card>

  </div>

</template>

<script>
import {EventBus} from "@/event-bus";
import axios from "axios";


export default {
  name: "MoviesList",
  components: {},
  data: function () {
    return {
      movies: [],
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
    filteredMovies() {
      if (this.selectGenre === null) {
        return this.movies;
      } else {
        return this.movies.filter(movie => {
          return movie.genres.includes(this.selectGenre)
        })
      }
    }
  },
  methods: {
    addMovie: function (newMovie) {
      this.movies.push(newMovie);
    },
    addMovieToPlaylist: function (movie) {
      this.playlistMovie.push(movie);
    },
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
    getAllMovies: function () {
      axios
          .get("https://apimovietest.herokuapp.com/api/movies")
          .then(
              response => {
                const allData = response.data;
                allData.forEach(data => {
                  this.movies.push(data.value)
                })
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
    },
    playlistCreation() {
      EventBus.$emit('cliked', this.playlistMovie);
    }
  },
  mounted() {
    this.getAllMovies();
    this.getAllMoviesGenres();
    EventBus.$on('cliked', this.addMovie);
  }
}

</script>

<style scoped>

</style>