<template>
  <form
    novalidate
    class="md-layout md-alignment-center"
    @submit.prevent="postNewUser({ email, pass })"
  >
    <md-card class="md-layout-item md-size-50 md-small-size-100">
      <md-card-header>
        <div class="md-title">Registrate</div>
      </md-card-header>
      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field :class="{ 'md-invalid': $v.email.$error }">
              <label for="email">E-mail</label>
              <md-input
                name="email"
                type="text"
                v-model.lazy="$v.email.$model"
              ></md-input>
              <span class="md-error" v-if="$v.email.email === false"
                >Debe ingresar un correo electronico valido</span
              >
              <span class="md-error" v-if="$v.email.$model === ''"
                >El campo es requerido</span
              >
            </md-field>
            <md-field :class="{ 'md-invalid': $v.pass.$error }">
              <label for="pass">Contraseña</label>
              <md-input
                name="pass"
                type="password"
                v-model.lazy="$v.pass.$model"
              ></md-input>
              <span class="md-error" v-if="$v.pass.$model === ''"
                >Debe ingresar una Contraseña valida</span
              >
              <span class="md-error" v-else-if="!$v.pass.minLength"
                >La conaseña debe tener mas de 6 caracteres</span
              >
            </md-field>
            <md-field :class="{ 'md-invalid': $v.confirmPass.$error }">
              <label for="pass">Repita se contraseña</label>
              <md-input
                name="confirmPass"
                type="password"
                v-model.lazy.lazy="$v.confirmPass.$model"
              ></md-input>
              <span class="md-error" v-if="$v.confirmPass.$model === ''"
                >Debe ingresar la confirmacion de Contraseña valida</span
              >
              <span class="md-error" v-else-if="!$v.confirmPass.minLength"
                >La confirmacion de conaseña debe tener mas de 6
                caracteres</span
              >
              <span class="md-error" v-else-if="!$v.confirmPass.$sameAs"
                >Las contraseñas deben ser iguales</span
              >
            </md-field>
          </div>
        </div>
      </md-card-content>
      <md-card-actions>
        <div class="md-layout md-alignment-center">
          <md-button
            type="submit"
            class="md-raised md-primary "
            :disabled="!desactivar"
            >Registrarse</md-button
          >
        </div>
      </md-card-actions>
    </md-card>
  </form>
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
  name: "Registro",
  data() {
    return {
      email: "",
      pass: "",
      confirmPass: "",
    };
  },
  validations: {
    email: { required, email },
    pass: { required, minLength: minLength(6) },
    confirmPass: {
      required,
      minLength: minLength(6),
      sameAs: sameAs("pass"),
    },
  },
  methods: {
    ...mapActions(["postNewUser"]),
  },
  computed: {
    ...mapState(["load"]),
    desactivar() {
      return (
        (this.pass.trim() || this.confirmPass.trim() !== "") &&
        this.pass.trim() === this.confirmPass.trim()
      );
    },
  },
};
</script>
