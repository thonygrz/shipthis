import Vue from "vue";
import VueRouter from "vue-router";
import jwt from "../common/jwt.service";
import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import ('../views/Login.vue'),
    meta: {
      hideBasicComponents: true,
    },
  },
  {
    path: "/Home",
    name: "Home",
    component: () => import ('../views/Home.vue'),
    meta: {
      requiresAuth: true,
      hideBasicComponents: false,
    },
  },
  {
    path: "/Users",
    name: "UsersView",
    component: () => import ('../views/UsersView.vue'),
    meta: {
      requiresAuth: true,
      hideBasicComponents: false,
    },
  },
  {
    path: "/Shipments",
    name: "ShipmentsView",
    component: () => import ('../views/ShipmentsView.vue'),
    meta: {
      requiresAuth: true,
      hideBasicComponents: false,
    },
  },
  {
    path: "/Users/CreateUser",
    name: "CreateUser",
    component: () => import ('../views/Users/CreateUser.vue'),
    meta: {
      requiresAuth: true,
      hideBasicComponents: false,
    },
  },
  {
    path: "/Configuration",
    name: "ConfigurationView",
    component: () => import("../views/ConfigurationView.vue"),
    meta: {
      requiresAuth: true,
      hideBasicComponents: false,
    },
  },
  {
    path: "/Emails",
    name: "EmailsView",
    component: () => import("../views/EmailsView.vue"),
    meta: {
      requiresAuth: true,
      hideBasicComponents: false,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  to.matched.some((route) => {
    if (!jwt.isTokenValid()) {
      store.dispatch("logout");
      if (route.meta.requiresAuth) {
        jwt.destroyToken();
        next({ name: "Login" });
      } else {
        next();
      }
    } else {
      next();
    }
  });
});

export default router;
