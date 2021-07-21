<template>
  <div class="edit">
    <form
      novalidate
      class="md-layout md-alignment-center"
      @submit.prevent="putTarea(dataToEdit)"
    >
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Editar la tarea: {{ dataToEdit.tarea }}</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="first-name">Nombre</label>
                <md-input type="text" v-model="dataToEdit.tarea"></md-input>
              </md-field>
              <md-card-actions>
                <md-button type="submit" class="md-primary"
                  >Editar Tarea</md-button
                >
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
