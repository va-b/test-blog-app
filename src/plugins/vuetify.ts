import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import ru from 'vuetify/src/locale/ru'
import colors from 'vuetify/es5/util/colors'


Vue.use(Vuetify, {
  theme: {
    primary: colors.teal,
  },
  iconfont: 'fa',
  lang: {
    locales: { ru },
    current: 'ru'
  },
});
