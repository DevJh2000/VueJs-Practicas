<template>
  <md-content id="app">
    <div class="loadingCSS md-layout md-gutter md-alignment-center" v-if="load">
      <grid-loader :loading="load"></grid-loader>
    </div>
    <div class="md-layout md-gutter md-alignment-center" v-else="!load">
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
  </md-content>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import GridLoader from "vue-spinner/src/GridLoader";
export default {
  methods: {
    ...mapActions(["logOut"]),
  },
  computed: {
    ...mapGetters(["existUser"]),
    ...mapState(["load"]),
  },
  components: {
    GridLoader,
  },
};
</script>
