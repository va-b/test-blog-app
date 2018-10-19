import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import ru from 'vuetify/src/locale/ru'

Vue.use(Vuetify, {
  theme: {
    primary: '#8E24AA',
  },
  iconfont: 'fa',
  lang: {
    locales: { ru },
    current: 'ru'
  },
})
