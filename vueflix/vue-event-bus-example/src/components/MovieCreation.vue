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
                  v-model="newTitle"
                  :rules="titleRules"
                  label="newTitle"
                  size="80"
                  required
              ></v-text-field>

            </v-col>

            <v-col>

              <v-text-field
                  v-model="newIdMovie"
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
                  v-model="newGenres"
                  :label="genre"
                  :value="genre"
              ></v-checkbox>

            </v-col>

          </v-row>

        </v-container>

        <v-container fluid>

          <h4>Noter le film</h4>

          <v-rating
              v-model="newRating"
              size="64"
              length="10"
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
                  v-model="newReview"
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
                  v-model="newDescription"
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

          <h4>{{ movie.title }}</h4>

          <p>Id : {{ movie.id }}</p>

          <b-button
              type="success-light"
              @click="addMovieToList(movie)"
          >
            Ajouter le film à la liste
          </b-button>
        </li>

      </ul>

      <b-button
          type="primary-light"
          @click="getResultPreviouspage"
          v-show="currentPageSuggestMovie - 1 > 0"
      >
        &lsaquo;
      </b-button>
      <b-button
          type="primary-light"
          @click="getResultNextPage"
          v-show="currentPageSuggestMovie + 1 <= suggestMovieTotalPage"
      >
        &rsaquo;
      </b-button>

    </div>

  </div>

</template>

<script>
import {EventBus} from "@/event-bus";
import axios from "axios";


export default {
  name: "MovieCreation",
  components: {},
  props: {
    newId: {
      type: Number,
      default: 0
    }
  },
  data: function () {
    return {
      newTitle: "",
      newGenres: [],
      newRating: 0,
      newReview: "",
      newDescription: "",
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
      newIdMovie: "",
      idMovieRules: [
        v => !!v || 'Id is required',
      ],
      moviesGenres: [
        "comedy",
        "drama",
        "thriller",
        "mystery",
        "horror",
        "action",
        "adventure"
      ],
      validateForm: false
    }
  },
  methods: {
    storeMovie: function () {
      let newMovie = {
        id: this.newId,
        title: this.newTitle,
        genres: this.newGenres,
        rating: this.newRating,
        review: this.newReview,
        description: this.newDescription
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
      this.newTitle = movie.title;
      this.newIdMovie = movie.id;
    },
    reset: function () {
      this.$refs.form.reset
    },
    resetValidation: function () {
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style scoped>

</style>