import Vue from "vue";
import Vuex from "vuex";
import { db, auth } from "../firebase";
import router from "../router";
import Swal from "sweetalert2";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listTareas: [],
    dataToEdit: {},
    userDetec: null,
    load: false,
  },
  mutations: {
    setTareas(state, payloadTareas) {
      state.listTareas = payloadTareas;
    },
    setDataToEdit(state, payloadDatatoEdit) {
      state.dataToEdit = payloadDatatoEdit;
      if (state.dataToEdit === "[object Object]") {
        router.push("/");
      }
    },
    setEliminarTarea(state, payloadDatatoDelete) {
      return (state.listTareas = state.listTareas.filter((dat) => {
        return dat.id !== payloadDatatoDelete;
      }));
    },
    setUserDetec(state, payloadUserDetec) {
      state.userDetec = payloadUserDetec;
    },
    setLoad(state, payloadLoad) {
      state.load = payloadLoad;
    },
  },
  actions: {
    //Login
    async postLogin({ commit }, dataNewUser) {
      commit("setLoad", true);
      if (dataNewUser.email.trim() !== "" || dataNewUser.pass.trim() !== "") {
        try {
          const loginUser = await auth
            .signInWithEmailAndPassword(dataNewUser.email, dataNewUser.pass)
            .catch((e) => {
              console.log(e);
              return Swal.fire("Oops...", `${e.message}`, "error");
            });
          if (loginUser.user) {
            commit("setLoad", false);
            return Swal.fire("Bienvenido", `${dataNewUser.email}`, "success");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        return Swal.fire(
          "Oops...",
          "Debe llenar todos los cmapos para proceder",
          "error"
        );
      }
    },
    //logout
    async logOut({ commit }) {
      commit("setLoad", true);
      try {
        await auth.signOut().catch((e) => {
          console.log(e);
          return Swal.fire("Oops...", `${e.message}`, "error");
        });
        commit("setUserDetec", null);
        commit("setLoad", false);
        return Swal.fire(
          "Ha finalizodo su Sesion",
          "Se ha vuelto al Login",
          "info"
        );
      } catch (error) {
        console.log(error);
      }
    },
    //registrar Usuario
    async postNewUser({ commit }, dataNewUser) {
      commit("setLoad", true);
      if (dataNewUser.email.trim() !== "" || dataNewUser.pass.trim() !== "") {
        try {
          const newUser = await auth
            .createUserWithEmailAndPassword(dataNewUser.email, dataNewUser.pass)
            .catch((e) => {
              console.log(e);
              return Swal.fire("Oops...", `${e.message}`, "error");
            });
          if (newUser.user) {
            console.log(newUser);

            await db
              .collection(newUser.user.email)
              .add({
                nombre_Tarea:
                  "Tarea Para Editar o Eliminar, Se creo una coleccion unica para tus tareas",
              })
              .catch((e) => console.log(e));
            commit("setLoad", false);
            return Swal.fire(
              "Felicidades estas Registrado",
              `Usta el E-mail: ${dataNewUser.email}, para loguearte la proxima vez`,
              "success"
            );
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        return Swal.fire(
          "Oops...",
          "Debe llenar todos los cmapos para proceder",
          "error"
        );
      }
    },
    //listar tareas
    async getDataTareas({ commit }, userDetec) {
      commit("setLoad", true);
      const arrTareas = [];
      const colTareas = db
        .collection(userDetec.email)
        .orderBy("nombre_Tarea", "asc");
      const lisdata = await colTareas.get().catch((e) => {
        return console.log(e);
      });
      await lisdata.forEach((datO) => {
        return arrTareas.push({ id: datO.id, ...datO.data() });
      });
      commit("setTareas", arrTareas);
      return commit("setLoad", false);
    },
    //Agregar una nueva tarea
    async postTarea({ commit }, dataForNewTarea) {
      commit("setLoad", true);
      if (dataForNewTarea.nombreTarea.trim() !== "") {
        try {
          const colTareas = db.collection(dataForNewTarea.email);
          await colTareas
            .add({ nombre_Tarea: dataForNewTarea.nombreTarea })
            .catch((e) => {
              return console.log(e);
            });
          router.push("/");
          commit("setLoad", false);
          return Swal.fire(
            "Tarea Registrada",
            `Nueva Tarea: ${dataForNewTarea.nombreTarea}`,
            "success"
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        return Swal.fire(
          "Oops...",
          "No ingreso el nombre de la tarea",
          "error"
        );
      }
    },
    //almacenar estado de la informacion enviada entre formularios
    async DataToEdit({ commit }, dataToEdit) {
      commit("setDataToEdit", dataToEdit);
    },
    //Actualizar un tarea
    async putTarea({ commit }, objTareaUpdate) {
      commit("setLoad", true);
      if (objTareaUpdate.tarea.trim() !== "") {
        try {
          const colTareas = db.collection(objTareaUpdate.email);
          await colTareas
            .doc(objTareaUpdate.id)
            .update({ nombre_Tarea: objTareaUpdate.tarea })
            .catch((e) => {
              return console.log(e);
            });
          router.push("/");
          commit("setLoad", false);
          return Swal.fire(
            "Tarea Actualizada",
            `Se cambio la tarea:${this.state.dataToEdit.tarea} a ${objTareaUpdate.tarea}`,
            "success"
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        return Swal.fire(
          "Oops...",
          "No ingreso el nombre de la tarea",
          "error"
        );
      }
    },
    //Eliminar una tarea
    async deleteTarea({ commit }, dataForDelete) {
      commit("setLoad", true);
      const colTareas = db.collection(dataForDelete.email);
      await colTareas
        .doc(dataForDelete.id)
        .delete()
        .catch((e) => {
          return console.log(e);
        });
      commit("setEliminarTarea", dataForDelete.id);
      commit("setLoad", false);
      return Swal.fire(
        "Tarea Eliminada",
        `Se elimino la tarea:${dataForDelete.tarea} `,
        "warning"
      );
    },
    //Detectar usuario logueado
    async detecUserLog({ commit }, user) {
      commit("setUserDetec", user);
    },
  },
  getters: {
    existUser(state) {
      if (state.userDetec === null) {
        router.push("/login");
        return false;
      } else {
        router.push("/");
        return true;
      }
    },
  },
});
