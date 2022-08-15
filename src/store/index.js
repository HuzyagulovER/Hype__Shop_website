import { Store } from 'vuex'
import axios from 'axios';
const $cookies = require('vue-cookies');
const $_ = require('lodash');
$cookies.config('7d', '/')
const root = '/';

const store = {
	state: {
		base: '',

		preloader: true,

		categories: {},
		products: {},
		popularProducts: {},
		mainCategories: [],

		cart: {},
		cartItemsAmount: '',

		productsToBuy: {},

		currentProduct: {
			info: {},
			images: []
		},

		craft: {},
		slides: [],

		favourites: '',

		languages: ['en', 'ge', 'ru'],
		language: '',

		admin: false,
		orders: [],


		phoneNumber: {
			text: '+995 577 21 80 12',
			href: 'tel:+995577218012',
		},
		email: {
			text: 'Hype.project.georgia@gmail.com',
			href: 'mailto:Hype.project.georgia@gmail.com',
		},
		facebook: {
			text: 'Facebook',
			href: 'https://www.facebook.com/history.handmade',
		},
		instagram: {
			text: 'Instagram',
			href: 'https://instagram.com/history.handmade',
		},
		startYear: 2022,


		imagesListLoaded: false,
		productsLoaded: false
	},
	getters: {
		getPreloaderState(state) {
			return state.preloader
		},
		getCategories(state) {
			return state.categories
		},
		getProducts(state) {
			return state.products
		},
		getPopularProducts(state) {
			return state.popularProducts
		},
		getCart(state) {
			return state.cart
		},
		getCartItemsAmount(state) {
			return state.cartItemsAmount
		},
		getCurrentProduct(state) {
			return state.currentProduct
		},
		getFavourites(state) {
			return state.favourites
		},
		getLanguages(state) {
			return state.languages
		},
		getLanguage(state) {
			return state.language
		},
		getAdmin(state) {
			return state.admin
		},
	},
	mutations: {
		SET_LANG(state, payload) {
			state.language = payload
		},
		TOGGLE_PRELOADER_STATE(state, payload) {
			state.preloader = payload
		},

		SET_CATEGORIES(state, payload) {
			state.categories = payload
		},
		SET_PRODUCTS(state, payload) {
			state.products = payload
		},
		SET_POPULAR_PRODUCTS(state, payload) {
			let pop = {}
			for (let category in payload) {
				pop[category] = {}
				for (let productID in payload[category]) {
					if (+payload[category][productID].popular) {
						pop[category][productID] = payload[category][productID]
					}
				}
			}
			state.popularProducts = pop
		},

		SET_CART(state, payload) {
			state.cart = payload
			$cookies.set('cart', JSON.stringify(payload))
		},
		ADD_TO_CART(state, payload) {
			let key = payload.category + '_' + payload.id + (payload.color ? '_' + payload.color.split(' ').join('') : '')
			if (Object.prototype.hasOwnProperty.call(state.cart, key)) {
				state.cart[key].amount += payload.amount
				if (state.cart[key].category === 'craft_wallets') {
					if (payload.comment != '') {
						state.cart[key].comment = payload.comment
					}
				}
			} else {
				state.cart[key] = payload
			}
		},
		UPDATE_CART_ITEMS_AMOUNT(state) {
			let commonAmount = 0
			for (const key in state.cart) {
				commonAmount += state.cart[key].amount
			}
			state.cartItemsAmount = commonAmount
		},
		SET_CURRENT_PRODUCT(state, payload) {
			state.currentProduct = payload
		},
		ADD_ITEM_AMOUNT(state, payload) {
			if (payload.newAmount > 0) {
				state.cart[payload.itemID].amount = +payload.newAmount
			} else {
				state.cart[payload.itemID].amount = 1
			}

			if (payload.newAmount % 1) {
				state.cart[payload.itemID].amount = Math.round(+payload.newAmount)
			}
		},
		REMOVE_ITEM(state, payload) {
			delete state.cart[payload]
		},
		SET_PRODUCTS_TO_BUY(state, payload) {
			state.productsToBuy = {}
			if (payload) {
				state.productsToBuy[payload.category + '_' + payload.id + '_' + (payload.color ? payload.color.split(' ').join('') : '')] = $_.cloneDeep({
					id: payload.id,
					category: payload.category,
					color: payload.color,
					amount: payload.amount,
					name: payload.name,
				})
			} else {
				let productsToBuy = $_.cloneDeep(state.cart)

				for (const key in productsToBuy) {
					if (productsToBuy[key].price && productsToBuy[key].modelID) {
						delete productsToBuy[key].price
						delete productsToBuy[key].modelID
					}
				}
				state.productsToBuy = productsToBuy
			}
		},

		SET_FAVOURITES(state, payload) {
			state.favourites = payload
			$cookies.set('favourites', JSON.stringify(payload))
		},
		async CHANGE_FAVOURITES(state, payload) {

			if (payload.method == 'add') {
				state.favourites[payload['productString']] = payload.object
			}
			if (payload.method == 'remove') {
				delete state.favourites[payload['productString']]
			}
		},

		SET_ADMIN(state, payload) {
			state.admin = payload
		},
		SET_ORDERS(state, payload) {
			let arr = {}
			for (const orderID in payload) {
				let obj = {
					info: {},
					products: {}
				}
				obj.id = $_.clone(payload[orderID].id)
				for (const key in payload[orderID]) {
					if (key !== 'id' && payload[orderID][key] && key !== 'products') {
						obj.info[key] = $_.clone(payload[orderID][key])
					}
					if (key === 'products') {
						obj.products = JSON.parse(payload[orderID][key])
						for (const product in obj.products) {
							delete obj.products[product].id
						}
					}
				}
				arr[orderID] = obj
			}

			state.orders = arr
		},
		REMOVE_ORDER(state, payload) {
			delete state.orders[payload]
		},

		SET_BASE(state, payload) {
			state.base = payload
		},

		SET_CRAFT(state, payload) {
			state.craft = payload
		},

		SET_SLIDES(state, payload) {
			state.slides = payload
		},

		SET_MAIN_CATEGORIES(state, payload) {
			state.mainCategories = payload
		},

		SET_LOADED(state, payload) {
			state[payload] = true
		}
	},
	actions: {
		isMobile({ state }) {
			let obj = {
				Android: function () {
					return navigator.userAgent.match(/Android/i);
				},
				BlackBerry: function () {
					return navigator.userAgent.match(/BlackBerry/i);
				},
				iOS: function () {
					return navigator.userAgent.match(/iPhone|iPad|iPod|Macintosh/i);
				},
				Opera: function () {
					return navigator.userAgent.match(/Opera Mini/i);
				},
				Windows: function () {
					return navigator.userAgent.match(/IEMobile/i);
				},
				any: function () {
					if (
						this.Android() ||
						this.BlackBerry() ||
						this.iOS() ||
						this.Opera() ||
						this.Windows()
					) {
						return true;
					}
					return false;
				},
			};
			state.isMobile = obj.any();
		},

		async loadLang({ commit, dispatch }) {
			await dispatch('getCookies', 'lang').then(l => {
				let lang = l ? l : 'en'
				dispatch('setCookies', {
					cookie: 'lang',
					object: lang
				})
				commit('SET_LANG', lang)
			})
		},

		async checkIP({ commit }) {
			await axios({ method: "get", url: root + "php/checkIP.php" }).then((r) => {
				commit("SET_ADMIN", r.data)
			});
		},

		async loadCategories({ commit, dispatch }) {
			await axios({ method: "get", url: root + "php/getCategories.php" }).then(
				(c) => {

					let categories = []
					c.data.forEach((el) => {
						categories.push(`${el[Object.keys(el)[0]]}`);
						categories.reverse();
					});
					commit("SET_CATEGORIES", categories)
					// commit("SET_CATEGORIES", ['watches'])
					dispatch('loadProducts')
				}
			);
		},

		async loadProducts({ state, commit }) {
			let categories = new FormData();
			for (let i = 0; i < state.categories.length; i++) {
				categories.append(i, state.categories[i]);
			}
			await axios({
				method: "post",
				url: root + "php/getProducts.php",
				data: categories,
			}).then((p) => {
				if (p.status == 200) {
					let products = p.data;
					for (let category in products) {
						for (let productID in products[category]) {
							try {
								products[category][productID].colors = JSON.parse(
									products[category][productID].colors
								);
								products[category][productID].status = JSON.parse(
									products[category][productID].status
								)[state.language];
							} catch (error) {
								continue;
							}
						}
					}
					commit("SET_PRODUCTS", products)
					commit("SET_POPULAR_PRODUCTS", products)
					commit("SET_LOADED", 'productsLoaded')
				}
			});
		},

		async loadCurrentProduct({ state, commit }, payload) {
			let fd = new FormData();
			fd.append('category', payload.category);
			fd.append('id', payload.id);

			await axios({
				method: "post",
				url: root + "php/getProduct.php",
				data: fd,
			}).then((item) => {

				let images = item.data['images'],
					fullInfo = item.data['info'],
					productInfo = {};
				productInfo.info = {}
				productInfo.images = []

				for (let key in fullInfo) {
					switch (key) {
						case 'colors':
						case 'characteristics':
							try {
								productInfo.info[key] = JSON.parse(fullInfo[key]);
							} catch (error) {
								console.error(error);
							}
							break;
						case 'type':
							productInfo.info[key] = JSON.parse(fullInfo[key])[state.language];
							break;
						default:
							productInfo.info[key] = fullInfo[key];
							break;
					}
				}

				for (let i = 0; i < images.length; i++) {
					productInfo.images.push(root + images[i]);
				}

				commit('SET_CURRENT_PRODUCT', productInfo)
			});
		},

		async getCookies(context, payload) {
			return $cookies.get(payload);
		},
		setCookies(context, payload) {
			$cookies.set(payload.cookie, payload.object)
		},

		async loadCart({ commit, dispatch }) {
			await dispatch('getCookies', 'cart').then(c => {
				let cart = c ? c : {}

				commit("SET_CART", cart)
				commit("UPDATE_CART_ITEMS_AMOUNT", cart.length)
			})
		},

		async loadFavourites({ commit, dispatch }) {
			await dispatch('getCookies', 'favourites').then(f => {
				let favourites = f ? f : {}
				commit("SET_FAVOURITES", favourites)
			})
		},

		async changeFavourites(context, payload) {
			await context.commit('CHANGE_FAVOURITES', payload)
			context.dispatch('setCookies', {
				cookie: 'favourites',
				object: context.state.favourites
			})
		},

		async changeLang(context, payload) {
			await context.commit('SET_LANG', payload)
			context.dispatch('setCookies', {
				cookie: 'lang',
				object: context.state.language
			})
		},

		async loadOrders({ commit }) {
			await axios({
				method: "get",
				url: root + "php/getOrders.php",
			}).then((r) => {
				commit('SET_ORDERS', r.data)
			})
		},

		async removeOrder({ commit }, payload) {
			await axios({
				method: "post",
				url: root + "php/removeOrder.php",
				data: 'id=' + payload
			}).then((r) => {
				if (r.data) {
					commit('REMOVE_ORDER', payload)
				}
			})
		},

		async loadModels({ commit }) {
			await axios({
				method: "get",
				url: root + "php/getCustom.php",
			}).then((p) => {
				let models = p.data;

				commit("SET_CRAFT", models)
			});
		},

		async loadSlides({ commit }) {
			await axios({
				method: "get",
				url: root + "php/getSlides.php",
			}).then((p) => {
				let slides = p.data;

				commit("SET_SLIDES", slides)
			});
		},

		async loadCategoriesSettings({ commit }) {
			await axios({
				method: "get",
				url: root + "php/getCategoriesSettings.php",
			}).then((cs) => {
				let cats = cs.data, mcats = [];
				cats.forEach(c => {
					if (c.main_visible == 1) mcats.push(c.category)
				})
				commit("SET_MAIN_CATEGORIES", mcats)
			});
		},

		async loadImagesList({ commit }) {
			await axios({
				method: "get",
				url: root + "php/getImagesList.php",
			}).then((l) => {
				let imgs = l.data;
				function changeStr(in_what, what, to_what) {
					let str = in_what;

					if (Array.isArray(what) && Array.isArray(to_what)) {
						if (what.length !== to_what.length) {
							return new Error("Lengths of the arrays are not equal!");
						}
						if (typeof what !== typeof to_what) {
							return new Error("Types of parameters should be the same!");
						}
						for (let i = 0; i < what.length; i++) {
							str = str.replace(new RegExp(`${what[i]}`, "g"), to_what[i]);
						}
					} else if (typeof what === "string" && typeof to_what === "string") {
						str = str.replace(new RegExp(`${what}`, "g"), to_what);
					}

					return str;
				}


				if (imgs.length) {
					const delay = (imgStr) => {
						return new Promise((resolve) => {
							let img = new Image();
							img.onload = () => {
								resolve(imgStr)
							}
							img.src = changeStr(imgStr, '#', '%23');
						});
					}

					const loadImages = (i) => {
						delay(imgs[i])
							.then(() => {
								i++;
								if (i < imgs.length) {
									loadImages(i)
								} else {
									commit("SET_LOADED", 'imagesListLoaded')
								}
							})
					}
					loadImages(0);
				}
			});
		},
	}
}

const common_store = new Store(store)

export default common_store