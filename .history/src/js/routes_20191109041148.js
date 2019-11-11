
import HomePage from '../pages/home.vue';
import DetailKaraoke from '../pages/detailKaraoke.vue'
import Form from '../pages/form.vue'
import DynamicRoutePage from '../pages/dynamic-route.vue';
import RequestAndLoad from '../pages/request-and-load.vue';
import NotFoundPage from '../pages/404.vue';
import DetailRoom from '../pages/detailRoom.vue';
import Login from '../pages/login.vue';
import Account from '../pages/account.vue'
import SavePage from '../pages/save.vue'
import PageMap from '../pages/map.vue'
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
    path: '/karaoke/:UUID/',
    component: DetailKaraoke
  },
  {
    path: '/room/:UUID/',
    component: DetailRoom
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            context: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
