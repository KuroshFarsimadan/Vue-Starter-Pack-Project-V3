import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import State1 from "./views/State1.vue";
import State2 from "./views/State2.vue";
import State3 from "./views/State3.vue";
import State4 from "./views/State4.vue";
import 'vue-tel-input/dist/vue-tel-input.css';
import VueTelInput from 'vue-tel-input';

Vue.use(VueTelInput);

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/State1',
      children: [
        { path: '/State1', component: State1 },
        { path: '/State2', component: State2 },
        { path: '/State3', component: State3 },
        { path: '/State4', component: State4 },
      ]
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
