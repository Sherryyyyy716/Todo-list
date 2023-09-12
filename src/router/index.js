import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: "/",
    //   name: "home",
    //   component: HomeView,
    // },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
    {
      path: "/TodoList",
      name: "TodoList",
      component: () => import("../views/TodoList.vue"),
    },
    {
      path: "/TodoList_JSON",
      name: "TodoList_JSON",
      component: () => import("../views/TodoList_JSON.vue"),
    },
    {
      path: "/FoodService",
      name: "FoodService",
      component: () => import("../views/FoodService.vue"),
    },
  ],
});

export default router;
