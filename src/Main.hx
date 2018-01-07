package;

class Main {
	public static function main() {
		Webpack.load(app2.App2)
			.then(function(mod) {
				app2.App2.load();
			});
	}
}

