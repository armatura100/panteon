// plugins for dev
import gulp from 'gulp';
import webpack from 'webpack-stream';
import fileinclude from 'gulp-file-include';
import { deleteAsync } from 'del';
import browserSync from 'browser-sync';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import newer from 'gulp-newer';
import rename from 'gulp-rename';

// compile scss
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

// plugins for build
import htmlmin from 'gulp-htmlmin';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import cleanCss from 'gulp-clean-css';
import imagemin from 'gulp-imagemin';
import webpHtmlNoSvg from 'gulp-webp-html-nosvg';
// webpcoverter@2.2.3 is installed as well
import webpCss from 'gulp-webpcss';
import webp from 'gulp-webp';


const html = () => {
	return gulp.src('src/*.html')
		.pipe(plumber(notify.onError({
			title: 'HTML',
			message: '<%= error.message %>'
		})))
		.pipe(fileinclude())
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.stream())
}

const scss = () => {
	return gulp.src('src/scss/**/*.scss', { sourcemaps: true })
		.pipe(plumber(notify.onError({
			title: 'HTML',
			message: '<%= error.message %>'
		})))
		.pipe(sass())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('dist/css', { sourcemaps: true }))
		.pipe(browserSync.stream())
}

const js = () => {
	return gulp.src('src/js/app.js', { sourcemaps: true })
		.pipe(plumber(notify.onError({
			title: 'JS',
			message: '<%= error.message %>'
		})))
		.pipe(webpack({
			mode: 'development',
			output: {
				filename: 'app.min.js'
			}
		}))
		.pipe(gulp.dest('dist/js', { sourcemaps: true }))
		.pipe(browserSync.stream())
}

const images = () => {
	return gulp.src('src/img/**/*')
		.pipe(plumber(notify.onError({
			title: 'IMAGES',
			message: '<%= error.message %>'
		})))
		.pipe(newer('dist/img'))
		.pipe(gulp.dest('dist/img'))
		.pipe(browserSync.stream())
}

const fonts = () => {
	return gulp.src('src/fonts/**/*')
		.pipe(plumber(notify.onError({
			title: 'FONTS',
			message: '<%= error.message %>'
		})))
		.pipe(gulp.dest('dist/fonts'))
}

const reset = () => {
	return deleteAsync('dist');
}

const server = () => {
	browserSync.init({
		server: {
			baseDir: 'dist',
		}
	});
}

const watcher = () => {
	gulp.watch('src/**/*.html', html);
	gulp.watch('src/scss/**/*.scss', scss);
	gulp.watch('src/js/**/*.js', js);
	gulp.watch('src/img/**/*', images);
}

// build tasks
const buildHtml = () => {
	return gulp.src('src/*.html')
		.pipe(fileinclude())
		.pipe(webpHtmlNoSvg())
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true,
		}))
		.pipe(gulp.dest('dist'))
}

const buildCss = () => {
	return gulp.src('src/scss/**/*.scss')
		.pipe(sass())
		.pipe(webpCss())
		.pipe(groupCssMediaQueries())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(cleanCss())
		.pipe(gulp.dest('dist/css'))
}

const buildJs = () => {
	return gulp.src('src/js/app.js')
		.pipe(webpack({
			mode: 'production',
			output: {
				filename: 'app.min.js'
			}
		}))
		.pipe(gulp.dest('dist/js'))
}

const buildImages = () => {
	return gulp.src('src/img/**/*')
		.pipe(webp())
		.pipe(gulp.dest('dist/img'))
		.pipe(gulp.src('src/img/**/*'))
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'))
}

const devTasks = gulp.parallel(html, scss, js, images, fonts);
const dev = gulp.series(reset, devTasks, gulp.parallel(watcher, server));

const buildTasks = gulp.parallel(buildHtml, buildCss, buildJs, buildImages, fonts);
const build = gulp.series(reset, buildTasks);
export { dev, build };