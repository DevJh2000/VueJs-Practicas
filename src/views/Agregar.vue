<template>
  <div class="edit">
    <form
      novalidate
      class="md-layout md-alignment-center"
      @submit.prevent="postTarea(newCurso)"
    >
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Nueva Tarea</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="first-name">Nombre</label>
                <md-input type="text" v-model="newCurso"></md-input>
              </md-field>
              <md-card-actions>
                <md-button type="submit" class="md-primary">Agregar</md-button>
              </md-card-actions>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Agregar",
  data() {
    return {
      newCurso: "",
    };
  },
  created() {},
  methods: {
    ...mapActions(["postTarea"]),
  },
  computed: {},
};
</script>
