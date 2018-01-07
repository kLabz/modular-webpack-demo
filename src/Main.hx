package;

class Main {
	public static function main() {
		Webpack.load(app2.App2)
			.then(function(mod) {
				app2.App2.load();

				Webpack.load(app1.App1)
					.then(function(mod) {
						trace('test');
					});
			});
	}
}

