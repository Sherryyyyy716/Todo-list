import "./assets/main.scss";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

import ViewUIPlus from "view-ui-plus";

import "view-ui-plus/dist/styles/viewuiplus.css";

app.use(router).use(ViewUIPlus).mount("#app");
