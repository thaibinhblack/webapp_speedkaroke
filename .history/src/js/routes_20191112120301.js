
import HomePage from '../pages/home.vue';
import DetailKaraoke from '../pages/detailKaraoke.vue'
import PageInfo from '../pages/info.vue';
import NotFoundPage from '../pages/404.vue';
import DetailRoom from '../pages/detailRoom.vue';
import Login from '../pages/login.vue';
import Account from '../pages/account.vue'
import SavePage from '../pages/save.vue'
import PageMap from '../pages/map.vue'
import PagePayPal from '../pages/paypal.vue'
var routes = [
  {
    path: '/',
    redirect: '/home/'
  },
  {
    path: '/map/',
    component: PageMap
  },
  {
    path: '/home/',
    component: HomePage,
  },
  {
    path: '/save/',
    component: SavePage
  },
  {
    path: '/login/',
    component: Login
  },
  {
    path: '/form/',
    component: DetailKaraoke
  },
  {
    path: '/account/',
    component: Account
  },
  {
    path: '/info/',
    component: PageInfo
  },
  {
    path: '/karaoke/:UUID/',
    component: DetailKaraoke
  },
  {
    path: '/room/:UUID/',
    component: DetailRoom
  },
  {
    path: '/paypal/:UUID_BOOKING/',
    component: PagePayPal
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
