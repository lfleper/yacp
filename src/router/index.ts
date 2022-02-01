import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import LoginPage from '../views/LoginPage.vue'
import OverviewPage from '../views/OverviewPage.vue'
import ChatPage from '../views/ChatPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/overview',
    name: 'Overview',
    component: OverviewPage
  },
  {
    path: '/chat/:id',
    name: 'Chat',
    component: ChatPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
