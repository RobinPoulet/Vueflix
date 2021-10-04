<template>
  <div class="playlistbackoffice">

    <h1>Bienvenue sur la page de gestion de vos playlists</h1>

    <router-link to="/admin/createPlaylist">
      <v-btn
          class="ma-2"
          blue
      >
        <v-icon
            blue
            left
        >
          mdi-minus-circle
        </v-icon>
        Créer une playlist
      </v-btn>
    </router-link>

    <PlaylistsList/>

  </div>
</template>

<script>
import PlaylistsList from "../components/PlaylistsList";

export default {
  name: "PlaylistBackoffice",
  components: {
    PlaylistsList
  },
}
</script>

<style scoped>

</style>