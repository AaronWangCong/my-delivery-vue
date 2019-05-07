// import Vue from 'vue'
// import Router from 'vue-router'
// Vue.use(Router)
import NProgress from 'nprogress'
import * as api from "../lib/api";
import store from '../store/index'

const home = resolve => require(['@/pages/home'], resolve)
const login = resolve => require(['@/pages/login'], resolve)
const logisticsList = resolve => require(['@/pages/logisticsList/logisticsList'], resolve)
const timeset = resolve => require(['@/pages/timeset'], resolve)
const timePlanning = resolve => require(['@/pages/timePlanning'], resolve)
const agingQuery = resolve => require(['@/pages/agingQuery'], resolve)

var vueRouter = new VueRouter({
    routes: [
        { path: '/', redirect: 'home', meta: { requireAuth: true } },
        { path: '/home', component: home, name: 'home', meta: { requireAuth: true } },
        { path: '/login', component: login, name: 'login', meta: { showSidebar: 'hide', showHeader: 'hide' } },
        { path: '/logisticsList', component: logisticsList, name: 'logisticsList', meta: { requireAuth: true } },
        { path: '/timePlanning', component: timePlanning, name: 'timePlanning', meta: { requireAuth: true } },
        { path: '/agingQuery', component: agingQuery, name: 'agingQuery', meta: { requireAuth: true } },
        { path: '/timeset', component: timeset, name: 'timeset', meta: { requireAuth: true } },
        { path: '*', redirect: 'home' },
    ]
})

vueRouter.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requireAuth)) { // 验证是否需要登陆
        //校验是否登录
		let self = this;
		axios.get(api.authorBackEnd + "/subject/is_login")
			.then(response => {
				if(response.data.flag){
                    //登录成功，立即获取一次用户信息，目的是将信息存入session；获取菜单的接口有session数据可用
                    axios.post(api.authorBackEnd + "/subject/customer").then(response => {
                        store.state.login.customer = response.data.obj.customer
                    });
					NProgress.start();
                    next();
				}else{
					NProgress.start();
                    next({
                        path: '/login', // 未登录则跳转至login页面
                        query: {redirect: to.fullPath} // 登陆成功后回到当前页面，这里传值给login页面，to.fullPath为当前点击的页面
                    });
				}
			}).catch(response =>{
				console.log(response);
				//未登录
				NProgress.start();
                next({
                    path: '/login', // 未登录则跳转至login页面
                    query: {redirect: to.fullPath} // 登陆成功后回到当前页面，这里传值给login页面，to.fullPath为当前点击的页面
                });
			});
       } else {
        NProgress.start();
        next();
       }
});


vueRouter.afterEach(() => {
    NProgress.done()
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
});

export default vueRouter
