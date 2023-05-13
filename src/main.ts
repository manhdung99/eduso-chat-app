import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/main.css";
import { createPinia } from "pinia";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount("#app");
