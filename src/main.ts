import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import TopPage from './components/TopPage.vue'
import About from './components/About.vue'
import NotFound from './components/NotFound.vue'
import SocialLinks from './components/SocialLinks.vue'
import BlogPosts from './components/BlogPosts.vue'
import BlogIndex from './components/BlogIndex.vue'
import BlogPreview from './components/BlogPreview.vue'
import Info from './components/Info.vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ToastService from 'primevue/toastservice';
import Config from './config'

const routes = [
  { path: '/', component: TopPage , meta: { title: "Home"}},
  { path: '/about', component:  About, meta: { title: "About Me"}},
  { path: '/links', component:  SocialLinks, meta: { title: "Links"}},
  { path: '/blog', component: BlogIndex, meta: { title: 'Blog' } },
  { path: '/blog/posts/:article_id', component: BlogPosts, meta: { title: "Article"}},
  { path: '/info', component: Info, meta: { title: "Info"}},
  { path: '/blog/post-preview', component: BlogPreview, meta: { title: "Article Preview"}},
  { path: "/:pathMatch(.*)*", component: NotFound, meta: { title: "Not Found"}},
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})
router.afterEach((to) => {
  document.title = `${to.meta.title} - ${Config.websiteTitle}`;
})
const app = createApp(App)
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: '.dark',
            cssLayer: false
        }
    }
});
app.use(ToastService);
app.mount(Config.mountTo)