import gulp from "gulp";
import stylus from "gulp-stylus";
import gutil from "gulp-util";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import WebpackConfig from "./webpack.config";
import {WebpackDevServerConfig} from "./config/config";
const devCompiler = webpack(WebpackConfig);
gulp.task("build-dev", ["webpack:build-dev", "stylus:build-dev"], () => {
	gulp.watch(["./dev_resource/**/*"], ["webpack:build-dev", "stylus:build-dev"]);
});
gulp.task("webpack:build-dev", callback => {
	devCompiler.run((err, stats) => {
		if(err){
			throw new gutil.PluginError("webpack:build-dev", err);
		}
		gutil.log("[webpack:build-dev]", stats.toString({
			colors: 1
		}));
		callback();
	});
});
gulp.task("stylus:build-dev", callback => {
	return gulp.src("./dev_resource/stylus/*.styl").pipe(stylus({
		compress : 1
	})).pipe(gulp.dest("./resource/css"));
});