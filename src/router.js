import Vue from 'vue'                                                           //Importing Vue and VueRouter into the App
import Router from 'vue-router'

import Home from './views/Home'
import HomeLogin from './views/HomeLogin'
import CoursesIndex from './views/courses/Index'
import CoursesShow from './views/courses/Show'
import CoursesEdit from './views/courses/Edit'
import CoursesCreate from './views/courses/Create'                              //Importing the various App pages
import LecturersIndex from './views/lecturers/Index'                            //from their respective folders
import LecturersShow from './views/lecturers/Show'
import LecturersEdit from './views/lecturers/Edit'
import LecturersCreate from './views/lecturers/Create'
import EnrolmentsIndex from './views/enrolments/Index'
import EnrolmentsShow from './views/enrolments/Show'
import EnrolmentsEdit from './views/enrolments/Edit'
import EnrolmentsCreate from './views/enrolments/Create'

Vue.use(Router)                                                                 //Telling the App to use Router and
                                                                                //Initialising a new Router
export default new Router ({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/homelogin',
      name: 'homeLogin',
      component: HomeLogin
    },
    {
      path: '/courses',
      name: 'courses_index',
      component: CoursesIndex
    },
    {
      path: '/courses/show',                                                    //The app routes that will be used to navigate
      name: 'courses_show',                                                     //Around the application
      component: CoursesShow
    },
    {
      path: '/courses/edit',
      name: 'courses_edit',
      component: CoursesEdit
    },
    {
      path: '/courses/create',
      name: 'courses_create',
      component: CoursesCreate
    },
    {
      path: '/lecturers',
      name: 'lecturers_index',
      component: LecturersIndex
    },
    {
      path: '/lecturers/show',
      name: 'lecturers_show',
      component: LecturersShow
    },
    {
      path: '/lecturers/edit',
      name: 'lecturers_edit',
      component: LecturersEdit
    },
    {
      path: '/lecturers/create',
      name: 'lecturers_create',
      component: LecturersCreate
    },
    {
      path: '/enrolments',
      name: 'enrolments_index',
      component: EnrolmentsIndex
    },
    {
      path: '/enrolments/show',
      name: 'enrolments_show',
      component: EnrolmentsShow
    },
    {
      path: '/enrolments/edit',
      name: 'enrolments_edit',
      component: EnrolmentsEdit
    },
    {
      path: '/enrolments/create',
      name: 'enrolments_create',
      component: EnrolmentsCreate
    },
  ]
});
