import Vue from "vue";
import Vuex from "vuex";
import { db } from "../firebase";
import router from "../router";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listTareas: [],
    dataToEdit: {},
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
  },
  actions: {
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
      const colTareas = db.collection("tareas");
      await colTareas.add({ nombre_Tarea: nuevaTarea }).catch((e) => {
        return console.log(e);
      });
      router.push("/");
      return console.log("Tarea Registrada");
    },
    //almacenar estado de la informacion enviada entre formularios
    async DataToEdit({ commit }, dataToEdit) {
      commit("setDataToEdit", dataToEdit);
    },
    //Actualizar un tarea
    async putTarea({}, objTareaUpdate) {
      const colTareas = db.collection("tareas");
      await colTareas
        .doc(objTareaUpdate.id)
        .update({ nombre_Tarea: objTareaUpdate.tarea })
        .catch((e) => {
          return console.log(e);
        });
      router.push("/");
      return console.log("Tarea Actualizada");
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
      await commit("setEliminarTarea", idTarea);
      return console.log("Tarea Eliminada");
    },
  },
});
