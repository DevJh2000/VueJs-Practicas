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
  },
  actions: {
    //Login
    async postLogin({}, dataNewUser) {
      if (dataNewUser.email.trim() !== "" || dataNewUser.pass.trim() !== "") {
        try {
          const loginUser = await auth
            .signInWithEmailAndPassword(dataNewUser.email, dataNewUser.pass)
            .catch((e) => {
              console.log(e);
              return Swal.fire("Oops...", `${e.message}`, "error");
            });
          if (loginUser.user) {
            console.log(loginUser);

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
    async logOut({}) {
      try {
        await auth.signOut().catch((e) => {
          console.log(e);
          return Swal.fire("Oops...", `${e.message}`, "error");
        });
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
    async postNewUser({}, dataNewUser) {
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
            router.push("/");
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
    async getDataTareas({ commit }) {
      const arrTareas = [];
      const colTareas = db.collection("tareas").orderBy("nombre_Tarea", "asc");
      const lisdata = await colTareas.get().catch((e) => {
        return console.log(e);
      });
      await lisdata.forEach((datO) => {
        return arrTareas.push({ id: datO.id, ...datO.data() });
      });
      commit("setTareas", arrTareas);
    },
    //Agregar una nueva tarea
    async postTarea({}, nuevaTarea) {
      if (nuevaTarea.trim() !== "") {
        try {
          const colTareas = db.collection("tareas");
          await colTareas.add({ nombre_Tarea: nuevaTarea }).catch((e) => {
            return console.log(e);
          });
          router.push("/");
          return console.log("Tarea Registrada");
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
    async putTarea({}, objTareaUpdate) {
      if (objTareaUpdate.tarea.trim() !== "") {
        try {
          const colTareas = db.collection("tareas");
          await colTareas
            .doc(objTareaUpdate.id)
            .update({ nombre_Tarea: objTareaUpdate.tarea })
            .catch((e) => {
              return console.log(e);
            });
          router.push("/");
          return console.log("Tarea Actualizada");
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
    async deleteTarea({ commit }, idTarea) {
      const colTareas = db.collection("tareas");
      await colTareas
        .doc(idTarea)
        .delete()
        .catch((e) => {
          return console.log(e);
        });
      commit("setEliminarTarea", idTarea);
      return console.log("Tarea Eliminada");
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
