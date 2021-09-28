<template>

  <div class="movieCreation">

    <h2>Ajout d'un film à la liste de film</h2>
    <div class="form-example">
      <label for="name">Entrer le nom du film à ajouter</label>
      <input type="text" name="name" id="name" v-model="newTitle" required>
    </div>
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
      <button @click="addMovie" class="btn btn-primary">Valider la création du film</button>
    </div>

  </div>

</template>

<script>
export default {
  name: "MovieCreation",
  props: {
    newId: {
      type: Number,
      default: 0
    },
    newTitle: {
      type: String,
      default: ""
    },
    newGenres: {
      type: Array,
      default: () => []
    },
    newRating: {
      type: Number,
      default: 0
    },
    newReview: {
      type: String,
      default: ""
    },
    newDescription: {
      type: String,
      default: ""
    },
    addMovie: Function
  }
}
</script>

<style scoped>

</style>