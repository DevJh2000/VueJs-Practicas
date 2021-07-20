<template>
  <div class="inicio">
    <h1>CRUD con VUE y Firebase</h1>
    <br />
    <router-link
      :to="{
        name: 'Agregar',
      }"
    >
      <md-button class="md-fab md-primary">
        <md-icon>+</md-icon>
      </md-button>
    </router-link>
    <ul>
      <li v-for="(item, index) in listTareas" :key="index">
        {{ item.id }}///////////////{{ item.nombre_Tarea }}
        <router-link
          :to="{
            name: 'Editar',
            params: { object: { id: item.id, tarea: item.nombre_Tarea } },
          }"
        >
          <md-button to="/components/button" class="md-primary"
            >Editar</md-button
          >
        </router-link>
        &nbsp

        <button @click="deleteTarea(item.id)">Eliminar</button>
      </li>
    </ul>
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
