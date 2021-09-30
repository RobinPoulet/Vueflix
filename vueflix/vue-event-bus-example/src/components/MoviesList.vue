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

    </v-container>

    <select id="selectGenre" name="selectGenre" v-model="selectGenre">
      <option disabled value="">Choisir la catégorie</option>
      <option>comedy</option>
      <option>drama</option>
      <option>thriller</option>
      <option>mystery</option>
      <option>horror</option>
      <option>action</option>
      <option>adventure</option>
    </select>

    <span>Sélectioné : {{ selectGenre }}</span>


    <ul>

      <li v-for="movie in filteredMovies" :key="movie.id">

        <h4>{{ movie.title }}</h4>

        <router-link v-show="admin"
            :to="{
              name: 'Movie',
              params: { id: movie.id, movie: movie}
            }"
        >
          <b-button pill variant="info">Info</b-button>
        </router-link>

      </li>

    </ul>



  </div>

</template>

<script>
import {EventBus} from "@/event-bus";
import axios from "axios";




export default {
  name: "MoviesList",
  components: {

  },
  data: function () {
    return {
      movies: [
        {
          id: 1,
          title: "Parasite",
          genres: ["Comedy", "Drama", "Thriller"],
          rating: 9,
          review: "With an insightful and searing exploration of human behavior, ‘Parasite’ is a masterfully crafted film that is a definite must watch.",
          description: "Parasite (Korean: 기생충; RR: Gisaengchoong) is a 2019 South Korean black comedy thriller film directed by Bong Joon-ho, who also co-wrote the screenplay with Han Jin-won."
        },
        {
          id: 2,
          title: "Old",
          genres: ["Mystery", "Thriller", "Horror"],
          rating: 7,
          review: "A group of families on a tropical holiday discover that the secluded beach where they are staying is somehow causing them to age rapidly – reducing their entire lives into a single day.",
          description: "Lorem ipsum"
        },
        {
          id: 3,
          title: "Free guy",
          genres: ["Comedy", "Action", "Adventure"],
          rating: 8,
          review: "A bank teller called Guy realizes he is a background character in an open world video game called Free City that will soon go offline.",
          description: "Blabla blabla"
        }
      ],
      selectGenre: "",
      moviesGenres: []
    }
  },
  props: {
    admin: Boolean
  },
  computed: {
    filteredMovies() {
      if (this.selectGenre === "") {
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