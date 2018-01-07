package app2;

@:expose('default')
class App2 {
	public static function load() {
		Webpack.load(app21.App21)
			.then(function(mod) {
				untyped console.log(mod);
			});
	}
}

