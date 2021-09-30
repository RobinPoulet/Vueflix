<template>

  <div class="movieCreation">

    <h2>Suggestion de film</h2>

    <p>Utiliser la barre de recherche pour avoir une suggestion de films</p>

    <div class="container">
      <input type="text" v-model="search" placeholder="search movies" @keydown="newSearch"/>
    </div>

    <h2>Ajout d'un film à la liste de film</h2>

    <v-container fluid>


      <v-form
          ref="form"
          v-model="valid"
          lazy-validation
      >

        <v-container fluid>

          <v-row>

            <v-col>

              <v-text-field
                  v-model="form.title"
                  :rules="titleRules"
                  label="newTitle"
                  size="80"
                  required
              ></v-text-field>

            </v-col>

            <v-col>

              <v-text-field
                  v-model="form.id"
                  :rules="idMovieRules"
                  label="newIdMovie"
                  required
              ></v-text-field>

            </v-col>

          </v-row>

        </v-container>

        <v-container fluid>

          <v-row>

            <v-col v-for="(genre, index) in moviesGenres" :key="index">

              <v-checkbox
                  v-model="form.genres"
                  :label="genre.name"
                  :value="genre.id"
              ></v-checkbox>

            </v-col>

          </v-row>

        </v-container>

        <v-container fluid>

          <h4>Noter le film</h4>

          <v-rating
              v-model="form.rating"
              size="64"
              length="10"
              color="yellow"
          ></v-rating>

        </v-container>

        <v-container fluid>

          <v-row>

            <v-col
                cols="12"
                md="6"
            >
              <v-textarea
                  solo
                  name="input-7-4"
                  label="Ecrire la review"
                  v-model="form.review"
              >
              </v-textarea>
            </v-col>
            <v-col
                cols="12"
                md="6"
            >
              <v-textarea
                  solo
                  name="input-7-4"
                  label="Ecrire la description"
                  v-model="form.description"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>

        <v-container fluid>

          <v-checkbox
              v-model="validateForm"
              :rules="[ v => !!v || 'You must to be agree to continue!']"
              label="Do you agree?"
              required
          ></v-checkbox>

          <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="storeMovie"
          >
            Validate
          </v-btn>

          <v-btn
              color="error"
              class="mr-4"
              @click="reset"
          >
            Reset Form
          </v-btn>

          <v-btn
              color="warning"
              @click="resetValidation"
          >
            Reset Validation
          </v-btn>

        </v-container>

      </v-form>

    </v-container>

    <div v-show="viewSuggestMovie">
      <h2>Liste des films suggérés avec la barre search</h2>

      <ul>

        <li v-for="(movie, index) in sugestionMovies" :key="index">

          <v-btn
              rounded
              color="primary"
              @click="addMovieToList(movie)"
          >
            Ajouter le film à la liste
          </v-btn>

          <h4>{{ movie.title }}</h4>

          <p>Id : {{ movie.id }}</p>

        </li>

      </ul>

      <v-button
          type="primary-light"
          @click="getResultPreviouspage"
          v-show="currentPageSuggestMovie - 1 > 0"
      >
        &lsaquo;
      </v-button>
      <v-button
          type="primary-light"
          @click="getResultNextPage"
          v-show="currentPageSuggestMovie + 1 <= suggestMovieTotalPage"
      >
        &rsaquo;
      </v-button>

    </div>

  </div>

</template>

<script>
import {EventBus} from "@/event-bus";
import axios from "axios";


export default {
  name: "MovieCreation",
  components: {},
  data: function () {
    return {
      form: {
        id: "",
        title: "",
        genres: [],
        rating: 0,
        review: "",
        description: ""
      },
      search: "",
      sugestionMovies: [],
      viewSuggestMovie: false,
      currentPageSuggestMovie: 1,
      suggestMovieTotalPage: 1,
      addMovieTitle: "",
      valid: true,
      titleRules: [
        v => !!v || 'Title is required',
      ],
      idMovieRules: [
        v => !!v || 'Id is required',
      ],
      moviesGenres: [],
      validateForm: false
    }
  },
  methods: {
    storeMovie: function () {
      let newMovie = {
        id: this.form.id,
        title: this.form.title,
        genres: this.form.genres,
        rating: this.form.rating,
        review: this.form.review,
        description: this.form.description
      };
      EventBus.$emit('cliked', newMovie);
    },
    newSearch: function () {
      this.currentPageSuggestMovie = 1;
      this.getResult();
    },
    getResult: function () {

      if (this.search !== "") {

        axios
            .get(
                "https://api.themoviedb.org/3/search/movie?api_key=80d0dd074cbffeb2db4b0123882c7f44&query="
                + this.search + "&page=" + this.currentPageSuggestMovie
            )
            .then(
                response => {
                  console.log(response.data);
                  this.sugestionMovies = response.data.results;
                  this.suggestMovieTotalPage = response.data.total_pages;
                  this.viewSuggestMovie = true;
                }
            )
            .catch(e => {
              alert(e)
            });
      }
    },
    getResultNextPage: function () {
      this.currentPageSuggestMovie += 1;
      this.getResult();
    },
    getResultPreviouspage: function () {
      this.currentPageSuggestMovie -= 1;
      this.getResult();
    },
    addMovieToList: function (movie) {
      let movieGenres = [];
      this.form.title = movie.title;
      this.form.id = movie.id;
      movie.genre_ids.forEach(genre => movieGenres.push(genre));
      this.form.genres = movieGenres;
    },
    reset: function () {
      this.$refs.form.reset
    },
    resetValidation: function () {
      this.$refs.form.resetValidation()
    }
  },
  mounted() {
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
      })
  }
}
</script>

<style scoped>

</style>