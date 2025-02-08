import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./styles/main.scss";
const pinia = createPinia();

createApp(App).use(pinia).use(router).mount("#app");
