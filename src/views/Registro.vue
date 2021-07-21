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
            <md-field>
              <label for="email">E-mail</label>
              <md-input name="email" type="text" v-model="email"></md-input>
            </md-field>
            <md-field>
              <label for="pass">Contraseña</label>
              <md-input name="pass" type="password" v-model="pass"></md-input>
            </md-field>
            <md-field>
              <label for="pass">Repita se contraseña</label>
              <md-input
                name="confirmPass"
                type="password"
                v-model="confirmPass"
              ></md-input>
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
import { mapActions } from "vuex";
export default {
  name: "Registro",
  data() {
    return {
      email: "",
      pass: "",
      confirmPass: "",
    };
  },
  methods: {
    ...mapActions(["postNewUser"]),
  },
  computed: {
    desactivar() {
      return (
        (this.pass.trim() || this.confirmPass.trim() !== "") &&
        this.pass.trim() ===
          this.confirmPass.trim() /* &&
        (this.pass.trim().length() || this.confirmPass.trim().length() > 6) */
      );
    },
  },
};
</script>
