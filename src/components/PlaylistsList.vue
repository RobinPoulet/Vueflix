<template>
  <div class="playlistsList">

    <v-card
        class="mx-auto"
        max-width="1600"
        tile
    >
      <v-list-item two-line v-for="playlist in playlists" :key="playlist.id">
        <v-list-item-content>
          <v-list-item-title>
            <h3> {{ playlist.name }} </h3>
          </v-list-item-title>
          <v-list-item-subtitle>
            <router-link
                :to="{
              name: 'PlaylistEdit',
              params: { id: playlist.id, playlist: playlist}
            }"
            >
              <v-container
                  fluid
                  class="pa-0"
              >
                <div class="my-2">
                  <v-btn
                      color="success"
                      dark
                      large
                  >
                    Ajouter ou supprimer un film dans la Playlist
                  </v-btn>

                </div>
              </v-container>
            </router-link>
            <router-link
                         :to="{
              name: 'Playlist',
              params: { id: playlist.id, playlist: playlist}
            }"
            >
              <v-container
                  fluid
                  class="pa-0"
              >
                <div class="my-2">
                  <v-btn
                      color="success"
                      dark
                      large
                  >
                    Voir le détail de la playlist
                  </v-btn>

                </div>
              </v-container>
            </router-link>
            <v-btn
                   color="warning"
                   small
                   @click="deletePlaylist(playlist.id)"
            >
              Supprimer cette playlist
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
  name: "PlaylistsList",
  data() {
    return {
      playlists: []
    }
  },
  methods: {
    getAllPlaylists: function () {
      axios
          .get("https://apimovietest.herokuapp.com/api/moviesLists")
          .then(
              response => {
                const allData = response.data;
                allData.forEach(data => {
                  this.playlists.push(data.value)
                })
              }
          )
          .catch(e => {
            alert(e)
          })
    },
    deletePlaylist: function (id) {
      axios
          .delete("https://apimovietest.herokuapp.com/api/moviesLists/" + id)
          .then(() => this.getAllPlaylists())
          .catch(e => {
            alert(e);
          })
    },

  },
  mounted() {
    this.getAllPlaylists();
  }
}
</script>

<style scoped>

</style>