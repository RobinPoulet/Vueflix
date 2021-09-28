<template>

  <div class="movie">

    <h1>{{ id }} : {{ title }} </h1>

    <label for="select-genre">Liste des genres du film</label>
    <select name="genre" id="select-genre">
      <option :value="genre" v-for="(genre, index) in genres" :key="index">
        {{ genre }}
      </option>
    </select>
    <h5>Rating : {{ rating }}</h5>
    <p>Review : {{ review }}</p>
    <p>Description : {{ description }}</p>


  </div>

</template>

<script>
export default {
  name: "Movie",
  props: {
    id: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: "Toto"
    },
    genres: {
      type: Array,
      default: []
    },
    rating: {
      type: Number,
      default: 0
    },
    review: {
      type: String,
      default: "Lorem Ipsum"
    },
    description: {
      type: String,
      default: "Description du film"
    }
  }
}
</script>

<style scoped>

</style>