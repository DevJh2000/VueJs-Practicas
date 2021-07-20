<template>
  <div class="edit">
    <h1>Editar</h1>
    }<br />
    <h2>Tarea {{ dataToEdit.tarea }}</h2>
    <h3>Editar la tarea {{ dataToEdit.tarea }}:</h3>
    <form @submit.prevent="putTarea(dataToEdit)">
      <input type="text" v-model="dataToEdit.tarea" />
      <button type="submit">Actualizar</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Editar",
  data() {
    return {
      object: this.$route.params.object,
    };
  },
  created() {
    this.DataToEdit(this.$route.params.object);
  },
  methods: {
    ...mapActions(["DataToEdit", "putTarea"]),
  },
  computed: {
    ...mapState(["dataToEdit"]),
  },
};
</script>
