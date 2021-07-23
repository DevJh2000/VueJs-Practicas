<template>
  <div class="edit">
    <form
      novalidate
      class="md-layout md-alignment-center"
      @submit.prevent="submit"
    >
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Nueva Tarea</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="{ 'md-invalid': $v.newCurso.$error }">
                <label for="first-name">Nombre</label>
                <md-input
                  type="text"
                  v-model.lazy="$v.newCurso.$model"
                ></md-input>
                <span class="md-error">El campo es requerido</span>
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-card-actions>
          <md-button
            :disabled="this.$v.$invalid"
            type="submit"
            class="md-primary"
            >Agregar</md-button
          >
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required, minLength, between, email } from "vuelidate/lib/validators";
export default {
  name: "Agregar",
  data() {
    return {
      newCurso: null,
    };
  },
  validations: {
    newCurso: {
      required,
    },
  },

  created() {},
  methods: {
    ...mapActions(["postTarea"]),
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        return this.postTarea({
          nombreTarea: this.newCurso,
          email: this.userDetec.email,
        });
      }
      return null;
    },
  },
  computed: {
    ...mapState(["userDetec", "load"]),
  },
};
</script>
