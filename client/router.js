import _ from 'lodash';
import Vue from 'vue';
import Router from 'vue-router';
import { checkUserData } from './helpers/user';
import store from './store';
// import 'vuetify/dist/vuetify.min.css'


Vue.use(Router);
Vue.config.productionTip = false


const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/components/Home.vue'),
            
        },
       
        {
            path: '/',
            name: 'Navbar',
            component: () => import('@/components/layout/Navbar.vue'),
            
        },
        {
                path: '/',
                name: 'Footer',
                component: () => import('@/components/layout/Footer.vue'),
                
            },
            {
                path: '/slide',
                name: 'Slide',
                component: () => import('@/components/slide/Slide.vue'),
                
            },
            {
                path: '/mavi',
                name: 'Mavi',
                component: () => import('@/components/layout/Mavi.vue'),
                
            },
            {
                path: '/dealsofday',
                name: 'Dealsofday',
                component: () => import('@/components/dealsofday/Dealsofday.vue'),
                
            },
       
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/components/auth/Login.vue'),
            props: true,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('@/components/auth/Register.vue'),
            props: true,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/espaceutilisateur',
            name: 'EspaceUtilisateur',
            component: () => import('@/components/espaceutilisateur/EspaceUtilisateur.vue'),
            props: true,
            meta: {
                requiresAuth: true
            }
        },
            {
            path: '/dashboardutilisateur',
            name: 'Dashboardutilisateur',
            component: () => import('@/components/dashboardutilisateur/Dashboardutilisateur.vue'), 
            props: true,
            meta: {
                requiresAuth: true
            }
            },
            {
                path: '/dach',
                name: 'Dach',
                component: () => import('@/components/dashboardutilisateur/Dach.vue'), 
                props: true,
               
                },
            {
                path: '/reservationsutil',
                name: 'Reservationsutil',
                component: () => import('@/components/reservationsutil/Reservationsutil.vue'), 
                props: true,
                meta: {
                    requiresAuth: true
                }
                },

                {
                    path: '/about',
                    name: 'About',
                    component: () => import('@/views/About.vue'), 
                    
                    
                },
                {
                    path: '/reservationform/',
                    name: 'Reservationform',
                    component: () => import('@/components/Datepicker/Reservationform.vue'), 
                    
                },
                {
                    path: '/calendar/',
                    name: 'Calendar',
                    component: () => import('@/components/Datepicker/Calendar.vue'), 
                    
                },

                 {
                    path: '/sallesShow/:id',
                    name: 'sallesShow',
                    component: () => import('@/components/categories/sallesdesfetes/sallesShow.vue'), 
                    
                },

            
        //categories
         {
            path: '/salles',
            name: 'salles',
            component: () => import('@/components/categories/sallesdesfetes/salles.vue'),
            props: true,
         },
         {
            path: '/coiffurespa',
            name: 'Coiffurespa',
            component: () => import('@/components/categories/coiffurespa/Coiffurespa.vue'),
            props: true,
         },
          {
            path: '/decorationmarriage',
            name: 'Decorationmarriage',
            component: () => import('@/components/categories/decorationmarriage/Decorationmarriage.vue'),
            props: true,
         },
         {
            path: '/disceur',
            name: 'Disceur',
            component: () => import('@/components/categories/disceur/Disceur.vue'),
            props: true,
         },
          {
            path: '/fleuriste',
            name: 'Fleuriste',
            component: () => import('@/components/categories/fleuriste/Fleuriste.vue'),
            props: true,
         },
          {
            path: '/hadhra',
            name: 'Hadhra',
            component: () => import('@/components/categories/hadhra/Hadhra.vue'),
            props: true,
         },
         {
            path: '/hloudraggi',
            name: 'Hloudraggi',
            component: () => import('@/components/categories/hloudraggi/Hloudraggi.vue'),
            props: true,
         },
          {
            path: '/locationmaison',
            name: 'Locationmaison',
            component: () => import('@/components/categories/locationmaison/Locationmaison.vue'),
            props: true,
         },
          {
            path: '/locationvoiture',
            name: 'Locationvoiture',
            component: () => import('@/components/categories/locationvoiture/Locationvoiture.vue'),
            props: true,
         },
         {
            path: '/orchestres',
            name: 'Orchestres',
            component: () => import('@/components/categories/orchestres/Orchestres.vue'),
            props: true,
         },
         {
            path: '/photomarriage',
            name: 'Photomarriage',
            component: () => import('@/components/categories/photomarriage/Photomarriage.vue'),
            props: true,
         },
         {
            path: '/soulamia',
            name: 'Soulamia',
            component: () => import('@/components/categories/soulamia/Soulamia.vue'),
            props: true,
         },
         {
            path: '/traiteur',
            name: 'Traiteur',
            component: () => import('@/components/categories/traiteur/Traiteur.vue'),
            props: true,
         },
        {
            path: '/profile/:handle',
            name: 'Profile',
            component: () => import('@/components/profile/Profile.vue'),
            meta: {
                requiresAuth: true,
               
            }
        },
        {
            path: '/user/:handle',
            name: 'UserProfile',
            component: () => import('@/components/user/UserProfile.vue'),
            props: true,
            meta: {
                requiresAuth: true,
                
            }
        },
        {
            path: '/user/:handle/edit',
            name: 'EditUserProfile',
            component: () => import('@/components/user/EditUserProfile.vue'),
            props: true,
            meta: {
                requiresAuth: true,
               
            }
        },
       
       
        {
            path: '*',
            component: () => import('@/components/error/NotFound.vue')
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    await checkUserData(next);
    if (to.meta.requiresAuth) {
        if (localStorage.getItem('authToken') === null) {
            localStorage.clear();
            next({
                name: 'Login',
                params: { message: 'Please login or make an account to access' }
            });
        } else {
            next();
        }
    } else if (!_.isEmpty(to.meta) && !to.meta.requiresAuth) {
        if (localStorage.getItem('authToken')) {
            next({
                name: 'UserProfile',
                params: { handle: store.getters.getUserData.handle }
            });
        } else {
            next();
        }
    } else {
        next();
    }
    next();
});

export default router;
