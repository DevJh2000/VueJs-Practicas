import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "../firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/registro",
    name: "Registro",
    component: () => import("../views/Registro.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/",
    name: "Inicio",
    component: () => import("../views/Inicio.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/agregar",
    name: "Agregar",
    component: () => import("../views/Agregar.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/editar/:object",
    name: "Editar",
    component: () => import("../views/Editar.vue"),
    meta: { requireAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((recor) => recor.meta.requireAuth)) {
    const user = auth.currentUser;
    if (!user) {
      return next({ path: "/login" });
    }
    return next();
  } else {
    return next();
  }
});
export default router;
