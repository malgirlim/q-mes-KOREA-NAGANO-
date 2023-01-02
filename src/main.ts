import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/css/app.css";

import VueHtmlToPaper from "vue-html-to-paper";
import { append } from "tom-select/src/utils";

const options = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css",
  ],
  timeout: 1000, // default timeout before the print window appears
  autoClose: true, // if false, the window will not close after printing
  windowTitle: window.document.title, // override the window title
};

createApp(App)
  .use(router)
  .use(createPinia())
  .use(VueHtmlToPaper, options)
  .mount("#app");
// createApp(App).use(router).use(createPinia()).mount("#app");
