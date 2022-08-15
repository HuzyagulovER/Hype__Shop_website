const path = require("path");

module.exports = {
	outputDir: "dist",
	assetsDir: "",
	publicPath: "/",
	productionSourceMap: false,

	pluginOptions: {
		i18n: {
			locale: 'en',
			fallbackLocale: 'ru',
			localeDir: 'locales',
			enableInSFC: false,
			enableLegacy: false,
			runtimeOnly: false,
			compositionOnly: false,
			fullInstall: true
		}
	}
}
