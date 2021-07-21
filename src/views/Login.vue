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
            <md-field>
              <label for="email">E-mail</label>
              <md-input name="email" type="text" v-model="email"></md-input>
            </md-field>
            <md-field>
              <label for="pass">Contraseña</label>
              <md-input name="pass" type="password" v-model="pass"></md-input>
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
export default {
  name: "Login",
  data() {
    return {
      email: "",
      pass: "",
    };
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
