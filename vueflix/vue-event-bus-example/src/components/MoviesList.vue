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
              :value="genre.name"
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
                :value="movie.rating"
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
                    Aller voir la fiche du film
                  </v-btn>
                </div>
              </v-container>
            </router-link>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>


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
      selectGenre: "",
      moviesGenres: []
    }
  },
  props: {
    admin: Boolean
  },
  computed: {
    filteredMovies() {
      if (this.selectGenre === "" || !this.selectGenre) {
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
    }
  },
  mounted() {
    EventBus.$on('cliked', this.addMovie);
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

  }
}

</script>

<style scoped>

</style>