import HomeView from '../pages/index.vue';
import LoginCard from '../pages/auth/login.vue';
import RegisterCard from '../pages/auth/register.vue';
import ForgotPassword from '../pages/auth/forgotPassword.vue';
import Settings from '../pages/settings.vue';
import PlansPage from '../pages/payment/plans.vue';
import PlansPricing from '../pages/payment/pricing.vue';
import ProfilePage from '../pages/profile.vue';

export default [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      layout: 'default',
      title: 'Dashboard',
      defaultScale: 'normal',
      scalable: false,
    },
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: LoginCard,
    meta: {
      layout: 'blank',
      isAuth: true,
    },
  },
  {
    path: '/auth/register',
    name: 'register',
    component: RegisterCard,
    meta: {
      layout: 'blank',
      isAuth: true,
    },
  },
  {
    path: '/auth/forgotpassword',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      layout: 'blank',
      isAuth: true,
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
    meta: {
      layout: 'default',
      isAuth: true,
    },
  },
  {
    path: '/payment/plans',
    name: 'plans',
    component: PlansPage,
    meta: {
      layout: 'default',
      isAuth: true,
    },
  },
  {
    path: '/payment/pricing',
    name: 'plans/pricing',
    component: PlansPricing,
    meta: {
      layout: 'default',
      isAuth: true,
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage,
    meta: {
      layout: 'default',
      isAuth: true,
    },
  },
]