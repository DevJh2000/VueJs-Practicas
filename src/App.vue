<template>
  <div id="app">
    <div class="md-layout md-gutter md-alignment-center">
      <div class="md-layout-item md-layout md-gutte md-alignment-center">
        <router-link to="/">
          <img alt="Vue logo" src="./assets/logo.png" />
        </router-link>
      </div>
      <div
        class="md-layout-item  md-layout md-gutte md-alignment-center md-size-10"
      >
        <md-list v-if="existUser">
          <md-list-item>
            <div class="md-layout">
              <router-link
                :to="{
                  name: 'Agregar',
                }"
              >
                <md-button class="md-fab md-primary">
                  <md-icon>add</md-icon>
                </md-button>
              </router-link>
            </div>
          </md-list-item>
          <md-list-item>
            <md-button class="md-fab md-accent" @click="logOut()">
              <md-icon>logout</md-icon>
            </md-button>
          </md-list-item>
        </md-list>
      </div>
    </div>
    <router-view />
  </div>
</template>
<
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions(["logOut"]),
  },
  computed: {
    ...mapGetters(["existUser"]),
  },
};
</script>
