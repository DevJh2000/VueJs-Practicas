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
  },
  actions: {
    async getDataTareas({ commit }) {
      const arrTareas = [];
      const colTareas = db.collection("tareas");
      const lisdata = await colTareas.get().catch((e) => {
        return console.log(e);
      });
      await lisdata.forEach((datO) => {
        // console.log({ id: datO.id, ...datO.data() });
        return arrTareas.push({ id: datO.id, ...datO.data() });
      });
      commit("setTareas", arrTareas);
    },
    async DataToEdit({ commit }, dataToEdit) {
      commit("setDataToEdit", dataToEdit);
    },

    async putTarea({ commit }, objTareaUpdate) {
      console.log(objTareaUpdate.id);
      const colTareas = db.collection("tareas");
      await colTareas
        .doc(objTareaUpdate.id)
        .update({ nombre_Tarea: objTareaUpdate.tarea })
        .catch((e) => {
          return console.log(e);
        });
      router.push("/");
      return console.log("data enviada");
    },
  },
});
