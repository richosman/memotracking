import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Home from '@/components/Home'
import Login from '@/components/login/Login'
import AddCorrespondence from '@/components/correspondence/Add'
import ViewCorrespondence from '@/components/correspondence/View'
import AddUser from '@/components/users/Add'
import ViewUsers from '@/components/users/View'
import MyCorrespondence from '@/components/correspondence/My-Correspondence'
import EditCorrespondence from '@/components/correspondence/Edit'
import AdminHome from '@/components/admin/Admin-Home'
import Assign from '@/components/correspondence/Assign'

Vue.use(Router)



export default new Router({
  routes: [

    {
      path: '/home',
      name: 'Home',
      component: Home,
      beforeEnter (to, from, next) {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/add-correspondence',
      name: 'AddCorrespondence',
      component: AddCorrespondence,
      beforeEnter (to, from, next) {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/')
        }
      }

    },
    {
      path: '/view-correspondence',
      name: 'ViewCorrespondence',
      component: ViewCorrespondence,
      beforeEnter (to, from, next) {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/')
        }
      }

    },
    {
      path: '/edit-correspondence',
      name: 'EditCorrespondence',
      component: EditCorrespondence,
      beforeEnter (to, from, next) {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/')
        }
      }

    },
    {
      path: '/add-user',
      name: 'AddUser',
      component: AddUser,
      beforeEnter (to, from, next) {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/')
        }
      }

    },
    {
      path: '/my-correspondence',
      name: 'MyCorrespondence',
      component: MyCorrespondence,
      beforeEnter (to, from, next) {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/')
        }
      }

    },
    {
      path: '/view-users',
      name: 'ViewUsers',
      component: ViewUsers,
      beforeEnter (to, from, next) {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/')
        }
      }

    },

    {
      path: '/assign',
      name: 'Assign',
      component: Assign,
      beforeEnter (to, from, next) {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/')
        }
      }

    },
    {
      path: '/admin-home',
      name: 'AdminHome',
      component: AdminHome,
      beforeEnter (to, from, next) {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/')
        }
      }

    },
    {
      path: '*',
      redirect: '/'
    }

  ]
})
