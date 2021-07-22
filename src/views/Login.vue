<template class="login">
  <form
    novalidate
    class="md-layout md-alignment-center"
    @submit.prevent="postLogin({ email, pass })"
  >
    <md-card class="md-layout-item md-size-50 md-small-size-100">
      <md-card-header>
        <div class="md-title">Login</div>
      </md-card-header>
      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field :class="{ 'md-invalid': $v.email.$error }">
              <label for="email">E-mail</label>
              <md-input
                name="email"
                type="text"
                v-model="$v.email.$model"
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
                v-model="$v.pass.$model"
              ></md-input>
              <span class="md-error" v-if="$v.pass.$model === ''"
                >El campo es requerido</span
              >
              <span class="md-error" v-else-if="!$v.pass.minLength"
                >La contraseña debe tener 6 o mas caracteres</span
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
            >Login</md-button
          >
        </div>
        <router-link
          :to="{
            name: 'Registro',
          }"
        >
          <md-button class="md-primary">
            Registrate para poder acceder
          </md-button>
        </router-link>
      </md-card-actions>
    </md-card>
  </form>
</template>
<script>
import { mapActions } from "vuex";
import { required, minLength, between, email } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      pass: "",
    };
  },
  validations: {
    email: { required, email },
    pass: { required, minLength: minLength(6) },
  },
  methods: {
    ...mapActions(["postLogin"]),
  },
  computed: {
    desactivar() {
      return (
        (this.email.trim() || this.pass.trim() === "") &&
        this.pass.trim().length >= 6
      );
    },
  },
};
</script>
