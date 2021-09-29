<template>

  <div class="movieCreation">

    <h2>Ajout d'un film à la liste de film</h2>
    <div class="form-example">
      <label for="name">Entrer le nom du film à ajouter</label>
      <input type="text" name="name" id="name" v-model="newTitle" required>
    </div>
    <input type="text" v-model="search" placeholder="search movies" @change="getResult" />
    <div class="form-example">
      <input type="checkbox" id="comedy" value="comedy" v-model="newGenres">
      <label for="comedy">Comedy</label>
      <input type="checkbox" id="drama" value="drama" v-model="newGenres">
      <label for="drama">Drama</label>
      <input type="checkbox" id="thriller" value="thriller" v-model="newGenres">
      <label for="thriller">Thriller</label>
      <input type="checkbox" id="mystery" value="mystery" v-model="newGenres">
      <label for="mystery">Mystery</label>
      <input type="checkbox" id="horror" value="horror" v-model="newGenres">
      <label for="horror">Horror</label>
      <input type="checkbox" id="action" value="action" v-model="newGenres">
      <label for="action">Action</label>
      <input type="checkbox" id="adventure" value="adventure" v-model="newGenres">
      <label for="adventure">Adventure</label>
      <br>
      <span>Catégories choisies : {{ newGenres }}</span>
    </div>
    <div>
      <label for="rating">Entrer la note du film</label>
      <input type="number" name="rating" id="rating" v-model="newRating" min="0" max="10" required>
    </div>
    <div>
      <textarea v-model="newReview" name="review" id="review" placeholder="ecrire la review du film"></textarea>
    </div>
    <div>
        <textarea v-model="newDescription" name="description" id="description"
                  placeholder="ecrire la description du film"></textarea>
    </div>
    <div class="button-parent">
      <button @click="storeMovie" class="btn btn-primary">Valider la création du film</button>
    </div>

  </div>

</template>

<script>
import { EventBus } from "@/event-bus";
import axios from "axios";

export default {
  name: "MovieCreation",
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
      sugestionMovies: []
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
      getResult: function () {
        console.log(this.search);
        axios
          .get(
            "https://api.themoviedb.org/3/search/movie?api_key=80d0dd074cbffeb2db4b0123882c7f44&query="
              + this.search
          )
          .then((response) => (this.sugestionMovies = response.data.results))
          .catch(e => {
            alert(e)
          });
      }
    }
  }
</script>

<style scoped>

</style>