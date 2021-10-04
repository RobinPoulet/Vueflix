<template>
  <div class="playlistEdit">

    <h1>Ajouter ou Supprimer un film de la Playlist</h1>

    <h2>Playlist : {{ playlist.name }}</h2>

    <v-container fluid v-show="movieAdded">
      <v-alert
          dense
          text
          type="success"
      >
        Le film a bien été ajouté à la liste de films
      </v-alert>
      <router-link to="/admin/playlistBackoffice">
        <v-btn
            color="success"
            small
        >
          Retour au backoffice playlist
        </v-btn>
      </router-link>
    </v-container>


    <v-container fluid v-show="!movieAdded">

      <v-card
          class="mx-auto"
          max-width="1600"
          tile
      >
        <v-list-item two-line v-for="(movie, index) in moviesDb" :key="index">
          <v-list-item-content>
            <v-list-item-title>
              <h3> {{ movie.title }} </h3>
              <v-rating
                  v-if="movie.grade > 0"
                  :value="movie.grade"
                  readonly
                  color="yellow"
                  dense
                  length="10"
                  size="60"
              ></v-rating>
            </v-list-item-title>
            <v-list-item-subtitle>
              <v-btn
                  color="success"
                  small
                  @click="addMovieToPlaylist(movie)"
              >
                Ajouter le film à la playlist
              </v-btn>

            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

      </v-card>

    </v-container>

    <h3>Liste des films</h3>

    <v-card
        class="mx-auto"
        max-width="1600"
        tile
    >
      <v-list-item two-line v-for="(movie, index) in moviesList" :key="index">
        <v-list-item-content>
          <v-list-item-title>
            <h3> {{ movie.filmInfo.original_title }} </h3>
            <h5>Note moyenne sur The DB Movie</h5>
            <v-rating
                :value="movie.filmInfo.vote_average"
                readonly
                color="yellow"
                dense
                length="10"
                size="60"
            ></v-rating>
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-btn
                color="warning"
                small
                @click="deleteMovieFromPlaylist(movie.filmId)"
            >
              Supprimer ce film
            </v-btn>

          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

    </v-card>


  </div>
</template>

<script>
import axios from "axios";


export default {
  name: "PlaylistEdit",
  props: {
    playlist: Object
  },
  data() {
    return {
      moviesList: [],
      moviesDb: [],
      movieAdded: false
    }
  },
  methods: {
    reAddFilm: function () {
      this.movieAdded = !this.movieAdded;
    },
    getMovieInformations: function (id) {
      axios
          .get("https://api.themoviedb.org/3/movie/"
              + id +
              "?api_key=80d0dd074cbffeb2db4b0123882c7f44&language=en-US")
          .then(
              response => {
                console.log(response.data);
                if (!this.moviesList.includes(id))
                  this.moviesList.push({filmId: id, filmInfo: response.data});
              }
          )
          .catch(e => {
            alert(e)
          });
    },
    deleteMovieFromPlaylist: function (id) {
      axios
          .delete("https://apimovietest.herokuapp.com/api/" + this.playlist.id + "/" + id)
          .then()
          .catch(e => {
            alert(e);
          })
    },
    getAllMovies: function () {
      axios
          .get("https://apimovietest.herokuapp.com/api/movies")
          .then(
              response => {
                const allData = response.data;
                allData.forEach(data => {
                  this.moviesDb.push(data.value)
                })
              }
          )
          .catch(e => {
            alert(e)
          })
    },
    addMovieToPlaylist: function (movie) {
      axios
          .post("https://apimovietest.herokuapp.com/api/moviesLists/" + this.playlist.id + "/film", {
            id: movie.id
          })
          .then(() => {
            this.movieAdded = true;
            this.playlist.film.push(movie.id);
          })
          .then(() => {
            this.displayMovieFromPlaylist();
          })
          .catch(e => {
            console.log(e);
            this.movieAddFailed = true;
            alert(e)
          })
    },
    displayMovieFromPlaylist: function () {
      this.playlist.film.forEach(film => {
        console.log(film);
        this.getMovieInformations(film.id)
      })
    }
  },
  mounted() {
    this.displayMovieFromPlaylist();
    this.getAllMovies()
  }
}
</script>

<style scoped>

</style>