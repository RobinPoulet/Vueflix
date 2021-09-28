<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">

    <h1>{{ title }}</h1>

    <h5>Nombre de film de la liste : {{ filteredMovies.length }}</h5>

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
        <movie :title="movie.title"
               :id="movie.id"
               :genres="movie.genres"
               :rating="movie.rating"
               :review="movie.review"
               :description="movie.description"/>
      </li>
    </ul>

    <div>
      <MovieCreation :new-id="movies.length"

      />
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import { EventBus } from './event-bus';
import Movie from "@/components/Movie";
import MovieCreation from "@/components/MovieCreation";

export default {
  name: 'App',
  components: {
    //   HelloWorld
    Movie,
    MovieCreation
  },
  data: function () {
    return {
      title: "Bienvenue sur VueFlix",
      movies: [
        {
          id: 1,
          title: "Parasite",
          genres: ["comedy", "drama", "thriller"],
          rating: 9,
          review: "With an insightful and searing exploration of human behavior, ‘Parasite’ is a masterfully crafted film that is a definite must watch.",
          description: "Parasite (Korean: 기생충; RR: Gisaengchoong) is a 2019 South Korean black comedy thriller film directed by Bong Joon-ho, who also co-wrote the screenplay with Han Jin-won."
        },
        {
          id: 2,
          title: "Old",
          genres: ["mystery", "thriller", "horror"],
          rating: 7,
          review: "A group of families on a tropical holiday discover that the secluded beach where they are staying is somehow causing them to age rapidly – reducing their entire lives into a single day.",
          description: "Lorem ipsum"
        },
        {
          id: 3,
          title: "Free guy",
          genres: ["comedy", "action", "adventure"],
          rating: 8,
          review: "A bank teller called Guy realizes he is a background character in an open world video game called Free City that will soon go offline.",
          description: "Blabla blabla"
        }
      ],
      selectGenre: ""
    }
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
      EventBus.$on('cliked', this.addMovie)
    }
  }
}
</script>

<style lang="scss">
$primary-color: #4169E1;
$secondary-color: darken($primary-color, 30%);
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

h1 {
  transition: 1s;
  color: $secondary-color;
}

h1:hover {
  color: $primary-color;
}

.button-parent {
  transition: 1s;
  color: $primary-color;

  &:hover {
    color: $secondary-color;
  }
}
</style>