import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/Index.js";
import "@fortawesome/fontawesome-free/css/all.css";

createApp(App).use(router).mount("#app");
