import { createApp } from 'vue';
import { store } from './store';
import './style.css';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/js/src/modal';

createApp(App).use(store).mount('#app')
