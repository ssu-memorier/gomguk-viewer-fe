import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

createApp(App).use(store).use(router).mount('#app');
