<template>

  <div class="movie">

    <h1>{{ id }} : {{ title }} </h1>

    <label for="select-genre">Liste des genres du film</label>
    <select name="genre" id="select-genre">
      <option :value="genre" v-for="(genre, index) in genres" :key="index">
        {{ genre }}
      </option>
    </select>
    <div class="text-center mt-12">
      <v-rating
          :value="rating"
          readonly
          background-color="orange lighten-3"
          color="warning"
          length="10"
          size="64"
      ></v-rating>
<!--      <p>Review : {{ review }}</p>-->
<!--      <p>Description : {{ description }}</p>-->
    </div>

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
      default: () => []
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

<style lang="scss">

v-rating {
  color:yellow;
}


</style>