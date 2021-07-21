<template>
  <div class="inicio">
    <router-link
      :to="{
        name: 'Agregar',
      }"
    >
      <md-button class="md-fab md-primary"> <md-icon>add</md-icon> </md-button>
    </router-link>
    <br />
    <md-list v-for="(item, index) in listTareas" :key="index">
      <md-list-item>
        <md-icon>task</md-icon>
        <md-list-item>{{ item.nombre_Tarea }}</md-list-item>
        <router-link
          :to="{
            name: 'Editar',
            params: { object: { id: item.id, tarea: item.nombre_Tarea } },
          }"
        >
          <md-button class="md-icon-button">
            <md-icon>edit</md-icon>
          </md-button>
        </router-link>
        <md-button
          @click="deleteTarea(item.id)"
          class="md-icon-button md-accent"
        >
          <md-icon>delete</md-icon>
        </md-button>
      </md-list-item>
    </md-list>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Inicio",
  created() {
    this.getDataTareas();
  },
  methods: {
    ...mapActions(["getDataTareas", "deleteTarea"]),
  },
  computed: {
    ...mapState(["listTareas"]),
  },
};
</script>
