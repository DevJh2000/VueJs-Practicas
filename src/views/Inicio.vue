<template>
  <div class="inicio" v-if="userDetec !== null">
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
          @click="
            deleteTarea({
              id: item.id,
              email: userDetec.email,
              tarea: item.nombre_Tarea,
            })
          "
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
    this.getDataTareas(this.userDetec);
  },
  methods: {
    ...mapActions(["getDataTareas", "deleteTarea"]),
  },
  computed: {
    ...mapState(["listTareas", "userDetec"]),
  },
};
</script>
