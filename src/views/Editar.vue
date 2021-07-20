<template>
  <div class="edit">
    <h1>Editar</h1>
    Me llega al nepe : {{ dataToEdit.tarea }}<br />
    <h2>
      Cambiare a otro curso, aunque la verdad soy vago y todo me vale una
      pichula JAJAJA XD
    </h2>
    <h3>*se masturba*</h3>
    <form @submit.prevent="putTarea(dataToEdit)">
      <input type="text" v-model="dataToEdit.tarea" />
      <button type="submit">Hacer Webadas</button>
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
