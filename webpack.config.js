//
// Webpack documentation is fairly extensive,
// just search on https://webpack.js.org/
//
// Be careful: there are a lot of outdated examples/samples,
// so always check the official documentation!
//

// Plugins
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Options
const buildMode = process.env.NODE_ENV || 'development';
const sourcemapsMode = buildMode !== 'production' ? 'eval-source-map' : undefined;
const dist = buildMode === 'production' ? `${__dirname}/.build/prod/` : `${__dirname}/.build/`;

//
// Configuration:
// This configuration is still relatively minimalistic;
// each section has many more options
//
module.exports = {
	// List all the JS modules to create
	// They will all be linked in the HTML page
	entry: {
		app: './build.hxml'
	},
	// Generation options (destination, naming pattern,...)
	output: {
		path: dist,
		publicPath: '/',
		filename: '[name].[chunkhash:7].js'
	},
	// Module resolution options (alias, default paths,...)
	resolve: {
		extensions: ['.js', '.json']
	},
	// Sourcemaps option for development
	devtool: sourcemapsMode,
	// Live development server (serves from memory)
	devServer: {
		contentBase: dist,
		compress: true,
		port: 9010,
		overlay: true,
		historyApiFallback: true,
	},
	// List all the processors
	module: {
		rules: [
			// Haxe loader (through HXML files for now)
			{
				test: /\.hxml$/,
				loader: 'haxe-loader',
				options: {
					// Additional compiler options added to all builds
					extra: `-D build_mode=${buildMode}` + (buildMode !== 'production' ? ' -debug' : '')
				}
			}
		]
	},
	// Plugins can hook to the compiler lifecycle and handle extra tasks
	plugins: [
		// Like generating the HTML page with links the generated JS files
		new HtmlWebpackPlugin({
			title: 'Test'
		}),
		// You may want to also:
		// - minify/uglify the output using UglifyJSPlugin,
		// - extract the small CSS chunks into a single file using ExtractTextPlugin
		// - inspect your JS output weight using BundleAnalyzerPlugin
	],
};
