const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");
const mode = require("gulp-mode")();
const browserSync = require("browser-sync").create();

const css = () => {
  return src("src/scss/index.scss")
    .pipe(mode.development(sourcemaps.init()))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(rename("styles.css"))
    .pipe(mode.production(csso()))
    .pipe(mode.development(sourcemaps.write()))
    .pipe(dest("dist"))
    .pipe(mode.development(browserSync.stream()));
}


// copy tasks
const copyImages = () => {
  return src("src/assets/images/**/*.{jpg,jpeg,png,gif,svg}")
    .pipe(dest("dist/assets/images"));
}

const copyFonts = () => {
  return src("src/assets/fonts/**/*.{svg,eot,ttf,woff,woff2}")
    .pipe(dest("dist/assets/fonts"));
}

// watch task
const watchForChanges = () => {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  watch("src/scss/**/*.scss", css);
  watch("**/*.html").on("change", browserSync.reload);
  watch("src/assets/images/**/*.{png,jpg,jpeg,gif,svg}", series(copyImages));
  watch("src/assets/fonts/**/*.{svg,eot,ttf,woff,woff2}", series(copyFonts));
}

// public tasks
exports.default = series(parallel(css, copyImages, copyFonts), watchForChanges);
exports.build = series(parallel(css, copyImages, copyFonts));