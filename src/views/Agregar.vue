<template>
  <div class="edit">
    <h1>Agregar</h1>
    <h2>
      Agregar una nueva tarea a la base de datos
    </h2>

    <form novalidate class="md-layout" @submit.prevent="postTarea(newCurso)">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Tarea</div>
        </md-card-header>
      </md-card>
      <input type="text" v-model="newCurso" />
      <button type="submit">Agregar</button>
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
