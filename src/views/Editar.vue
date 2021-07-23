<template>
  <div class="edit">
    <form
      novalidate
      class="md-layout md-alignment-center"
      @submit.prevent="submit"
    >
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Editar la tarea: {{ dataToEdit.tarea }}</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="{ 'md-invalid': $v.editCurso.$error }">
                <label for="first-name">Nombre</label>
                <md-input
                  type="text"
                  v-model.lazy="$v.editCurso.$model"
                ></md-input>
                <span class="md-error">El campo es requerido</span>
              </md-field>
              <md-card-actions>
                <md-button
                  type="submit"
                  class="md-primary"
                  :disabled="this.$v.$invalid"
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
import {
  required,
  minLength,
  between,
  email,
  sameAs,
} from "vuelidate/lib/validators";
export default {
  name: "Editar",
  data() {
    return {
      object: this.$route.params.object,
      editCurso: this.$route.params.object.tarea,
    };
  },
  validations: {
    editCurso: {
      required,
    },
  },

  created() {
    this.DataToEdit(this.object);
  },
  methods: {
    ...mapActions(["DataToEdit", "putTarea"]),
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        return this.putTarea({
          id: this.dataToEdit.id,
          tarea: this.editCurso,
          email: this.userDetec.email,
        });
      }
      return null;
    },
  },
  computed: {
    ...mapState(["dataToEdit", "userDetec", "load"]),
  },
};
</script>
