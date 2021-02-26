import Vue from 'vue'
import VueRouter from 'vue-router'
import ProductList from '../pages/ProductList.vue'
import ProductItem from '../pages/ProductItem.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ProductList',
    component: ProductList
  },
  {
    path: '/product/:id',
    name: 'ProductItem',
    component: ProductItem,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return window.scrollTo({top: 0, behavior: "smooth"})
  }
})

export default router
