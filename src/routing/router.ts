import Vue from 'vue';
import Router from 'vue-router';
import BlogList from '../components/blog-entry/List.vue';
import BlogEdit from '../components/blog-entry/Edit.vue';
import BlogEntr from '../components/blog-entry/Detail.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: BlogList
        },
        {
            path: '/add',
            component: BlogEdit
        },
        {
            path: '/edit/:id',
            component: BlogEdit,
            props: (route) => ({ myId: route.params.id })
        },
        {
            path: '/record/:id',
            component: BlogEntr,
            props: (route) => ({ myId: route.params.id })
        },
    ],
});
