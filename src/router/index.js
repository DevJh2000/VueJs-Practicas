import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Inicio",
    component: () => import("../views/Inicio.vue"),
  },
  {
    path: "/",
    name: "Agregar",
    component: () => import("../views/Agregar.vue"),
  },
  {
    path: "/editar/:object",
    name: "Editar",
    component: () => import("../views/Editar.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
