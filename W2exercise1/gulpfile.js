const gulp = require("gulp");
const ts = require("gulp-typescript");
const sass = require('gulp-sass')(require('sass'));
const tsProject = ts.createProject("tsconfig.json");
const browserSync = require("browser-sync").create();
const sourcemaps = require("gulp-sourcemaps");
const rename = require('gulp-rename');
const autoprefixer = require("gulp-autoprefixer");

gulp.task("compile", function () {
  const tsResult = tsProject.src().pipe(tsProject());
  return tsResult.js
    .pipe(rename('app.js'))
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
});

gulp.task("watch", function () {
  gulp.watch("src/**/*.ts", gulp.series("compile"));
});

gulp.task("sass", function () {
  return gulp.src("src/scss/index.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(autoprefixer())
    .pipe(rename("styles.css"))
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
});

// copy images to dist
gulp.task("image", function () {
  return gulp.src("src/assets/images/**/*.{jpg,jpeg,png,gif,svg}")
    .pipe(gulp.dest("dist/assets/images"));
});

// copy font to dist
gulp.task("font", function () {
  return gulp.src("src/assets/fonts/**/*.{svg,eot,ttf,woff,woff2}")
    .pipe(gulp.dest("dist/assets/fonts"));
});

gulp.task("watch", function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("**/*.html").on("change", browserSync.reload);
  gulp.watch("src/**/*.ts", gulp.series("compile"));
  gulp.watch("src/**/*.scss", gulp.series("sass"));
});

gulp.task("default", gulp.series("compile", "sass", "image", "font", "watch"));

// exports.default = series(parallel(css, js, copyFonts), watchForChanges);