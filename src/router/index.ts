import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeChat from "../views/HomeChat.vue";
const routes: Array<RouteRecordRaw> = [
  {
    // /search/screens -> /search?q=screens
    path: "/",
    redirect: (to) => {
      // the function receives the target route as the argument
      // we return a redirect path/location here.
      return { path: "/home", query: { q: to.params.searchText } };
    },
  },
  {
    path: "/home",
    name: "home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: HomeChat,
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: HomeChat,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
