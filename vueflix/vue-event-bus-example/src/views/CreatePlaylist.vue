<template>

  <div class="createplaylist">

    <h2>Création d'une Playlist</h2>

    <v-container fluid>
      <v-textarea
          label="Nom de la playlist"
          auto-grow
          outlined
          row="1"
          row-height="5"
          v-model="playlistName"
      >
      </v-textarea>
    </v-container>

    <div v-if="playlistMovies.length > 0">
      <h3>Liste des films ajoutés à la playlist</h3>
      <v-card
          class="mx-auto"
          max-width="400"
          tile
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title v-for="(movie, index) in playlistMovies" :key="index">{{
                movie.title
              }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>

    <h3>Sélection des films pour la playlist</h3>

    <v-card
        class="mx-auto"
        max-width="1600"
        tile
    >
      <v-list-item two-line v-for="(movie, index) in moviesList" :key="index">
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


    <v-btn
        color="success"
        small
        @click="createPlaylist"
    >
      Valider la playlist
    </v-btn>

  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "CreatePlaylist",
  components: {},
  data: () => {
    return {
      playlistName: "",
      playlistMovies: [],
      moviesList: [],
      playlist: [],
      playlistCreated: false,
      playlistCreationFailed: false
    }
  },
  computed: {
    playlistMoviesId() {
      let moviesId = [];
      this.playlistMovies.forEach(movie => {
        moviesId.push(movie.id);
      });
      return moviesId;
    }
  },
  methods: {
    addMovieToPlaylist(movie) {
      this.playlistMovies.push(movie);

    },
    getAllMovies: function () {
      axios
          .get("https://apimovietest.herokuapp.com/api/movies")
          .then(
              response => {
                const allData = response.data;
                allData.forEach(data => {
                  this.moviesList.push(data.value)
                })
              }
          )
          .catch(e => {
            alert(e)
          })
    },
    getAllPlaylists: function () {
      axios
          .get("https://apimovietest.herokuapp.com/api/moviesLists")
          .then(
              response => {
                const allData = response.data;
                allData.forEach(data => {
                  this.playlist.push(data.value)
                })
              }
          )
          .catch(e => {
            alert(e)
          })
    },
    createPlaylist: function () {
      axios
          .post("https://apimovietest.herokuapp.com/api/moviesLists", {
            id: this.playlist.length + 1,
            name: this.playlistName,
            film: this.playlistMoviesId
          })
          .then(() => this.playlistCreated = true)
          .catch(e => {
            console.log(e);
            this.playlistCreationFailed = true;
            alert(e)
          })
    }
  },
  mounted() {
    this.getAllPlaylists();
    this.getAllMovies();
  }
}
</script>

<style scoped>

</style>