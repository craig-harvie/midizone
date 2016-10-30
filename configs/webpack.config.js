/**

	Webpack config

*/
var path = require('path');
var webpack = require('webpack');


module.exports = {

	// This is our entry points for building files
	// Key value object, key is the file name, value is the file we build from
	entry: {
		'home': './assets/js/webapp/home/main.js'
	},

	// The output name of our files is the key of the entry object from above ^
	output: {
		filename: '[name].js'
	},

	stats: {
		// Configure the console output
		colors: true,
		modules: true,
		reasons: true
	},

	progress: false, // Don't show progress

	failOnError: true,

	watch: false, // use webpacks watcher

	keepalive: false, // don't finish the task

	inline: true,  // embed the webpack-dev-server runtime into the bundle
	// Defaults to false

	devtool: 'source-map',

	module: {
		loaders: [ //Babel loader - gives us native ES6 support
			{
				test: /\.jsx?$/,
				exclude: [/(node_modules)/],
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			},
			{
				include: /\.json$/, loaders: ["json-loader"]
			}
		],
		preLoaders: [
			{
				test: /\.jsx?$/,
				exclude: [
					/(node_modules)/,
					/(extlibs)/,
					/(plugins)/
				],
				loader: 'eslint-loader'
			}
		]
	},

	eslint: {
		configFile: './configs/.eslintrc.json',
		fix: true
	},

	resolve : {
		root: [
			path.resolve('./assets/js/')
		],
		extensions: ['', '.json', '.jsx', '.js']
	},

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'commons',
			filename: 'commons.js',
			// (Modules must be shared between a minimum 2 entries)
			minChunks: 2,
		}),
		//adds an import for jquery wherever it sees the below options
		new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'window.jQuery': 'jquery'
		})
	]
}
