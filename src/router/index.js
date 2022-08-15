import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import Shop from '../views/Shop.vue'
import Faq from '../views/Faq.vue'
import Admin from '../views/AdminPanel.vue'
import Order from '../views/Order.vue'
// import Account from '../views/Account.vue'
import Craft from '../views/Craft.vue'
import Item from '../views/Item.vue'
import Cart from '../views/Cart.vue'
import Thanks from '../views/Thanks.vue'

import common_store from "../store";
import axios from 'axios';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Main
	},
	{
		path: '/cart',
		name: 'Cart',
		component: Cart
	},
	{
		path: '/faq',
		name: 'Faq',
		component: Faq,
	},
	{
		path: '/admin',
		name: 'Admin',
		component: Admin,
		beforeEnter: (to, from, next) => {

			axios({ method: "get", url: "/php/checkIP.php" }).then((r) => {
				if (r.data) {
					common_store.commit("SET_ADMIN", r.data)
					next()
				}
			});
		}
	},
	{
		path: '/shop',
		name: 'Shop',
		component: Shop
	},
	{
		path: '/item/:category/id:id',
		name: 'Item',
		component: Item
	},
	// {
	// 	path: '/account',
	// 	name: 'Account',
	// 	component: Account
	// },
	{
		path: '/craft',
		name: 'Craft',
		component: Craft
	},
	{
		path: '/order',
		name: 'Order',
		component: Order,
		beforeEnter: (to, from, next) => {
			if (from.name == 'Cart' || from.name == 'Item') {
				next()
			} else {
				next({ name: "Cart" })
			}
		}
	},
	{
		path: '/thanks',
		name: 'Thanks',
		component: Thanks,
		beforeEnter: (to, from, next) => {
			if (from.name == 'Order') {
				next()
			} else {
				next({ name: from.name })
			}
		}
	},
]

const newLocal = '/'
const router = createRouter({
	history: createWebHistory(newLocal),
	scrollBehavior: function (to, from, savedPosition) {
		if (to.hash) {
			return { el: to.hash, behavior: 'smooth', }
		} else if (savedPosition) {
			return savedPosition
		} else {
			return { left: 0, top: 0 }
		}
	},
	routes
})

export default router