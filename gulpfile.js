const { src, dest, task, series, watch, parallel } = require( "gulp" );
const rm = require( "gulp-rm" );
const sass = require( "gulp-sass" );
const sassGlob = require("gulp-sass-glob");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const autoprefixer = require("gulp-autoprefixer");
const px2rem = require("gulp-smile-px2rem");
const gcmq = require("gulp-group-css-media-queries");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const svgo = require("gulp-svgo");
const svgSprite = require("gulp-svg-sprite");
const gulpif = require("gulp-if");

const env = process.env.NODE_ENV;

sass.compiler = require("node-sass");

task( "clean", () => {
  return src( "dist/**/*", { read: false } ).pipe( rm() );
});

task("copy:html", () => {
  return src("src/*.html")
  .pipe( dest("dist"))
  .pipe(reload({ stream: true}));
});

task("copy:fonts", () => {
  return src("src/fonts/*.*")
  .pipe( dest("dist/fonts"))
  .pipe(reload({ stream: true}));
});

task("copy:img", () => {
  return src("src/img/**/*.*")
  .pipe( dest("dist/img"))
  .pipe(reload({ stream: true}));
});

const styles = [
  "./node_modules/normalize.css/normalize.css",
  "./src/css/main.scss"
]

task( "styles", () => {
  return src(styles)
    .pipe(gulpif(env === "dev", sourcemaps.init()))
    .pipe(concat("main.min.scss"))
    .pipe(sassGlob())
    .pipe(sass().on("error", sass.logError))
    // .pipe(px2rem())
    .pipe(
      gulpif(env === "dev",
        autoprefixer({
          cascade: false
        })
      )
    )
    .pipe(gulpif(env === "prod", gcmq()))
    .pipe(gulpif(env === "prod", cleanCSS()))
    .pipe(gulpif(env === "dev", sourcemaps.write()))
    .pipe(dest("dist"))
    .pipe(reload({ stream: true }));
});

const libs = [
  "./node_modules/jquery/dist/jquery.js",
  "./src/js/*.js"
];

task("scripts", () => {
  return src(libs)
  .pipe(gulpif(env === "dev", sourcemaps.init()))
  .pipe(concat("main.min.js"))
  .pipe(
    gulpif(env === "prod",
      babel({
        presets: ['@babel/env']
      })
    )
   )
  .pipe(gulpif(env === "prod", uglify()))
  .pipe(gulpif(env === "dev", sourcemaps.write()))
  .pipe(dest("dist"))
  .pipe(reload({ stream: true }));
});

task("icons", () => {
  return src("./src/img/sprite/sprite.svg");
    // .pipe(
    //   svgo({
    //     plugins: [
    //       {
    //         removeAttrs: { attrs: "(fill|stroke|style|width|height|data.*)" }
    //       }
    //     ]
    //   })
    // )
    // .pipe(svgSprite({
    //   mode: {
    //     symbol: {
    //       sprite: "../sprite.svg"
    //     }
    //   }
    // }))
    // .pipe(dest("dist/img/sprite"));
});

task("server", () => {
  browserSync.init({
      server: {
          baseDir: "./dist"
      },
      open: false
  });
});

//task(
//  "copy",
//  series( "clean", () => {
//    return src( "src/styles/*.scss" ).pipe( dest( "dist" ) );
//  })
//);

//function copy() {
//	return src( "src/styles/*.scss" ).pipe( dest( "dist" ) );
//}
// exports.copy = copy;

task("watch", () => {
  watch("./src/css/**/*.scss", series("styles"));
  watch("./src/*.html", series("copy:html"));
  watch("./src/js/*.js", series("scripts"));
  watch("./src/img/sprite/*.svg", series("icons"));
});

task( 
  "default", 
  series( "clean", parallel("copy:html", "copy:fonts", "copy:img", "styles", "scripts", "icons"), 
    parallel("watch", "server")
  )
);

task( 
  "build", 
  series( "clean", parallel("copy:html", "copy:fonts", "copy:img", "styles", "scripts", "icons"))
);