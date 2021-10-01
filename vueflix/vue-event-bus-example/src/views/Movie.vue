<template>

  <div class="movie">

    <div class="text-center">
      <v-btn
          class="ma-2"
          color="red lighten-1"
          dark
      >
        <v-icon
            dark
            left
        >
          mdi-arrow-left
        </v-icon>
        <router-link to="/admin" style="color: white">Back</router-link>
      </v-btn>
    </div>

    <h1 class="movie-title">{{ movie.title }}</h1>

    <div class="text-center">

      <v-chip
          v-for="(genre, index) in movie.genres" :key="index"
          class="ma-2"
          color="blue"
          label
          text-color="white"
      >
        <v-icon left>
          mdi-label
        </v-icon>
        {{ genre }}
      </v-chip>

    </div>

    <v-card
        class="mx-auto my-12"
        max-width="800"
    >
      <v-card-title>Note du film</v-card-title>

      <v-card-text>
        <v-row
            align="center"
            class="mx-0"
        >
          <v-rating
              :value="movie.rating"
              readonly
              color="yellow"
              dense
              length="10"
              size="60"
          ></v-rating>

        </v-row>

      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Review</v-card-title>

      <v-card-text>
        <p> {{ movie.review }}</p>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Description</v-card-title>

      <v-card-text>
        <p> {{ movie.description }}</p>
      </v-card-text>

    </v-card>

    <v-card
        class="elevation-16 mx-auto"
        width="800"
    >
      <v-card-title class="text-h3">
        Rate the movie
      </v-card-title>
      <v-card-text>
        <div class="text-center mt-12">
          <v-rating
              v-model="rating"
              color="yellow"
              dense
              length="10"
              size="60"
          ></v-rating>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="justify-space-between">
        <v-btn text>
          No Thanks
        </v-btn>
        <v-btn

            color="primary"
            text
        >
          Rate Now
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-btn @click="rateMovie">
      Noter
    </v-btn>

  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "Movie",
  props: {
    movie: Object,
    id: Number
  },
  data: () => {
    return {
      rating: 0,
      adddRating: false
    }
  },
  methods: {
    rateMovie() {
      // axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
      axios
          .put("https://apimovietest.herokuapp.com/api/movies/1",{
            grade: 6
          }
          ).then(() => this.adddRating = true)
          .catch(e => {
            alert(e.message)
          })
    }
  }
}
</script>

<style lang="scss">

$primary-color: #4169E1;
$secondary-color: darken($primary-color, 30%);

.movie-title {
  transition: 1s;
  color: $secondary-color;
  font-size: 100px;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  color: deepskyblue;
}

.movie-title:hover {
  color: $primary-color;
}

</style>