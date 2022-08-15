import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import VueAxios from 'vue-axios'
// import { createI18n } from "vue-i18n";
import common_store from "./store";
import i18n from './i18n'


// axios.get("/lang/lang.json").then(r => {
// 	const i18n = createI18n({
// 		messages: r.data
// 	})
createApp(App).use(VueAxios, axios).use(require('vue-cookies')).use(router).use(common_store).use(i18n).mount('#app')
// })
