import {createApp} from 'vue'
import App from './App.vue'
import router from './router';

import {Storage} from '@ionic/storage';

import {IonicVue} from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import storageFactory from './storage/StorageFactory';

async function init(): Promise<void> {
  const tokenStorage = await storageFactory('tokenStorage')

  const app = createApp(App)
    .use(IonicVue)
    .use(router)
    .use(tokenStorage)
    
  router.isReady().then(() => {
    app.mount('#app');
  });

  /**
   * Global guard to check if the user is logged in and is authorized to 
   * visit a page.
   */
  router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      const token = await tokenStorage.instance.get('token')
      if (!token || !token.token) {
        next({name: 'Login'})
      } else {
        next()
      }
    } else {
      next()
    }
  })
}
init()

/**
 * declare storage for ts.
 * Is used to get access to all storage functions.
 */
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $storage: Storage
  }
}