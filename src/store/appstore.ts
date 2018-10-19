import { blogeStateModule } from "@/store/BlogEntryModule";
import { commentStateModule } from "@/store/CommentModule";
import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex';

Vue.use(Vuex);

export class AppState
{
}

export default new Vuex.Store({
  state: new AppState(),
  modules: {
      bloge: blogeStateModule,
      comme: commentStateModule,
  },
  mutations: {

  },
  actions: {

  }
} as StoreOptions<AppState>);
