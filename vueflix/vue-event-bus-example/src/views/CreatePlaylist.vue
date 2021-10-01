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

    <h3>Sélection des films pour la playlist</h3>

    <MoviesList :admin="false" :playlist="true"/>

  </div>
</template>

<script>
import MoviesList from "@/components/MoviesList";

export default {
  name: "CreatePlaylist",
  components: {
    MoviesList
  },
  data: () => {
    return {
      playlistName: ""
    }
  },
  methods: {
    getPlaylist() {

    }
  }
}
</script>

<style scoped>

</style>