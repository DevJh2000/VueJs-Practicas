<template>
  <div class="inicio">
    <h1>MAMAWEBO</h1>
    <ul>
      <li v-for="(item, index) in listTareas" :key="index">
        {{ item.id }}///////////////{{ item.nombre_Tarea }}
        <router-link
          :to="{
            name: 'Editar',
            params: { object: { id: item.id, tarea: item.nombre_Tarea } },
          }"
        >
          <button>Editar</button>
        </router-link>
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
    ...mapActions(["getDataTareas"]),
  },
  computed: {
    ...mapState(["listTareas"]),
  },
};
</script>
