import Vue from 'vue'
import Router from 'vue-router'
import EventCreate from './views/EventCreate.vue'
import EventList from './views/EventList.vue'
import EventShow from './views/EventShow.vue'
import Nprogress from 'nprogress'
import store from '@/store/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
      props: true,
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate,
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true,
      beforeEnter(routeTo, routeFrom, next) {
        store
          .dispatch('event/fetchEvent', routeTo.params.id)
          .then((event) => {
            routeTo.params.event = event
            next()
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              next({ name: '404', params: { resource: 'event' } })
            } else {
              next({ name: 'network-issue' })
            }
          })
        // .catch(error => {
        //   if (error.response && error.response.status === 404) {
        //     next({ name: '404', params: { resource: 'event' } })
        //   } else {
        //     next({ name: 'network-issue' })
        //   }
        // })
      },
    },
    {
      path: '/404',
      name: '404',
      component: () => import('./views/NotFound.vue'),
      props: true,
    },
    {
      path: '/network-issue',
      name: 'network-issue',
      component: () => import('./views/NetworkIssue.vue'),
    },
    {
      path: '*',
      redirect: { name: '404', params: { resource: 'page' } },
    },
  ],
})

router.beforeEach((routeTo, routeFrom, next) => {
  Nprogress.start()
  next()
})

router.afterEach(() => {
  Nprogress.done()
})

export default router
