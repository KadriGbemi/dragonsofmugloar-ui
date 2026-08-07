import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'
import AdsView from '../views/AdsView.vue'
import { useGameStore } from "@/stores/game";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: StartView,
      meta: { showBreadcrumb: false }
    },
    {
      path: '/ads',
      name: 'ads',
      component: AdsView,
      meta: { showBreadcrumb: true }
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/ShopView.vue'),
      meta: { showBreadcrumb: true }
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/HistoryView.vue'),
      meta: { showBreadcrumb: true }
    },
    {
      path: '/details',
      name: 'details',
      component: () => import('../views/DetailsView.vue'),
      meta: { showBreadcrumb: true }
    }
  ],
})

router.beforeEach((to) => {
  const gameStore = useGameStore()
  const hasSession = gameStore.restoreFromSession()

  if (to.name === 'start' && hasSession) {
    return { name: 'ads' }
  }

  if (to.name !== 'start' && !hasSession) {
    return { name: 'start' }
  }

  return true

})


export default router
