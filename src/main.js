import { createApp } from "vue";
import "./normalize.css";
import "./style.scss";
import "./colors.scss";
import "bulma/sass/grid/columns.sass";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import OutlineEffectDirective from "./directives/LightEffectDirective.js";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(OutlineEffectDirective);

router.isReady().then(() => {
    app.mount("#app");
});
