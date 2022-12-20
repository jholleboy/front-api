import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/components/Layout/Layout';
import Login from '@/pages/Login/Login';
import ErrorPage from '@/pages/Error/Error';
import desenvolvedor from '@/pages/desenvolvedor';
import nivel from '@/pages/nivel';





Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/error',
      name: 'Error',
      component: ErrorPage,
    },
    {
      path: '/app',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: 'desenvolvedor',
          name: 'desenvolvedor',
          component: desenvolvedor,
        },
        {
          path: 'nivel',
          name: 'nivel',
          component: nivel,
          
        },
        
        
        
        
        
      ],
    },
  ],
});
