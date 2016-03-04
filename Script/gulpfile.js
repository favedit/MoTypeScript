var gulp = require('gulp');
var fs = require('fs');
var fse = require('fs-extra');
var glob = require('glob');
var path = require('path');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var merge = require('merge2');
var md5 = require('MD5');
var through = require('through2');
var ts = require('gulp-typescript');
var tsmain = require('typescript');
var jsonfile = require('jsonfile');
var hswJsFiles = require('./hswJsFiles')

var distPath = './dist';
var releasePath = './release';

var paths = {
    resCopies: [
        'resource/**/*'
    ],
    copies: [
        'index.html'
    ],
    tsFiles: [
        'typings/**/*.ts',
        'src/**/*.ts'
    ],
    jsFiles: [
        'library/three.js',
        'library/jquery.js',
        'library/OrbitControls.js',
        'library/MTLLoader.js',
        'library/TransformControls.js',
        'library/OBJMTLLoader.js',
        'library/OBJLoader.js',
        'library/Tween.js',
        'library/oimo.js',
        'dist/main.js'
    ]
};

var compileByModules = {
  editorBase:'src/editor/base/tsconfig0.json',
  editorHome : 'src/editor/home/tsconfig.json',
  editorProduct: 'src/editor/product/tsconfig.json',
  runtime: 'src/runtime/tsconfig.json',
  plugin: 'src/plugin/tsconfig.json'
};

// Runtime编译模块
gulp.task('runtime',function(){
  var tp = ts.createProject(compileByModules.runtime,{
    sortOutput: true,
    typescript: tsmain
  });
  var tscfg = tp.config.compilerOptions.outFile;
  var tsRequest = tp.src()
      .pipe(sourcemaps.init())
      .pipe(ts(tp));
  return tsRequest.js
      .pipe(sourcemaps.write({includeContent: false,sourceRoot: '../src/runtime'}))
      .pipe(gulp.dest('build'));
});

// Runtime监听模块
gulp.task('watch-runtime', ['runtime'], function() {
  var runtimeTSConfig = jsonfile.readFileSync(compileByModules.editorProduct)
  var filesGlob = runtimeTSConfig.filesGlob;
  var tsConfigFile = compileByModules.editorProduct;
  var prjPath = path.dirname(tsConfigFile);

  for(var i=0;i<filesGlob.length;i++){
    var fileGlob = path.join(prjPath,filesGlob[i]);
    gulp.watch(fileGlob, ['runtime']);
  }
});

gulp.task('editorBase',function(){
  var tp = ts.createProject(compileByModules.editorBase,{
    sortOutput: true,
    typescript: tsmain
  });
  var tscfg = tp.config.compilerOptions.outFile;
  var tsRequest = tp.src()
      .pipe(sourcemaps.init())
      .pipe(ts(tp));
  return tsRequest.js
          .pipe(sourcemaps.write({includeContent: false,sourceRoot: '..'}))
          .pipe(gulp.dest('build'));
});


gulp.task('watch-editor-refactor', ['editorBase'], function() {
  var runtimeTSConfig = jsonfile.readFileSync(compileByModules.editorBase)
  var filesGlob = runtimeTSConfig.filesGlob;
  var tsConfigFile = compileByModules.editorBase;
  var prjPath = path.dirname(tsConfigFile);

  for(var i=0;i<filesGlob.length;i++){
    var fileGlob = path.join(prjPath,filesGlob[i]);
    gulp.watch(fileGlob, ['editorBase']);
  }
});

gulp.task('combine-hsw-js',function() {
    return gulp.src(hswJsFiles)
        .pipe(concat('hsw.js'))
        .pipe(gulp.dest('build'));
});


gulp.task('watch-combine-hsw', ['combine-hsw-js'], function() {
    gulp.watch("./library/hsw/**/*.js", ['combine-hsw-js']);
});




gulp.task('editorHome',function(){
  var tp = ts.createProject(compileByModules.editorHome,{
    typescript: tsmain
  });
  var tscfg = tp.config.compilerOptions.outFile;
  var tsRequest = tp.src()
      .pipe(sourcemaps.init())
      .pipe(ts(tp));
  return tsRequest.dts.pipe(gulp.dest('build'));

});
gulp.task('editorProduct',function(){
  var tp = ts.createProject(compileByModules.editorProduct,{
    sortOutput: true,
    typescript: tsmain
  });
  var tscfg = tp.config.compilerOptions.outFile;
  var tsRequest = tp.src()
      .pipe(sourcemaps.init())
      .pipe(ts(tp));
  return tsRequest.js
          .pipe(sourcemaps.write({includeContent: false,sourceRoot: '../src/editor'}))
          .pipe(gulp.dest('build'));
});

gulp.task('watch-editor-product', ['editorProduct'], function() {
  var runtimeTSConfig = jsonfile.readFileSync(compileByModules.editorProduct)
  var filesGlob = runtimeTSConfig.filesGlob;
  var tsConfigFile = compileByModules.editorProduct;
  var prjPath = path.dirname(tsConfigFile);

  for(var i=0;i<filesGlob.length;i++){
    var fileGlob = path.join(prjPath,filesGlob[i]);
    gulp.watch(fileGlob, ['editorProduct']);
  }
});

gulp.task('plugin',function(){
  var tp = ts.createProject(compileByModules.plugin,{
    typescript: tsmain
  });
  var tscfg = tp.config.compilerOptions.outFile;
  var tsRequest = tp.src()
      .pipe(sourcemaps.init())
      .pipe(ts(tp));
  return tsRequest.dts.pipe(gulp.dest('build'));

});
var tsProject = ts.createProject({
    declarationFiles: false,
    target: 'ES5',
    "module": "amd",
    outDir: './build',
    typescript: require('typescript'),
    experimentalDecorators: true,
    noEmitOnError: true,
    sourceMap:true
});


gulp.task('compileTs', function() {
    return gulp.src(paths.tsFiles)
        .pipe(ts(tsProject))
        .pipe(gulp.dest('./build'));
});

gulp.task('combineJs',['rjs'],function() {
    return gulp.src(paths.jsFiles)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('compressJs',function() {
    return gulp.src('dist/app.js')
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

var gulp = require('gulp');
var requirejsOptimize = require('gulp-requirejs-optimize');

// gulp.task('scripts', function () {
// 	return gulp.src('build/src/SKongVR.js')
// 		.pipe(requirejsOptimize())
//   //  .pipe(uglify())
// 		.pipe(gulp.dest('dist'));
// });

gulp.task('rjs', function () {
	return gulp.src('build/src/main.js')
		.pipe(requirejsOptimize(function(file) {
			return {
				name: './node_modules/almond/almond',
				optimize: 'none',
				useStrict: true,
				baseUrl: './',
				include: 'build/src/' + file.relative
			};
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('component-config',function(){

});


gulp.task('buildJs', ['combineJs'], function() {
    return gulp.src('app.js')
        .pipe(gulp.dest(distPath));
});

gulp.task('releaseJs', function() {
    return gulp.src(distPath + '/app.min.js')
        .pipe(uglify())
        .pipe(gulp.dest(distPath));
});

gulp.task('reCreateDist', function(cb) {
    fse.removeSync(distPath);
    fse.ensureDirSync(distPath);
    cb();
});

gulp.task('reCreateRelease', function(cb) {
    fse.removeSync(releasePath);
    fse.ensureDirSync(releasePath);
});

gulp.task('copy', ['reCreateDist'], function() {
    return gulp.src(paths.copies, { base: '.' })
        .pipe(gulp.dest(distPath));
});

gulp.task('copyRes', function() {
    return gulp.src(paths.resCopies, { base: '.' })
      .pipe(gulp.dest(distPath));
});


gulp.task('watch', ['compileTs', 'combineJs'], function() {
    gulp.watch('src/**/*.ts', ['compileTs', 'combineJs']);
});

gulp.task('atomer-watch',['combineJs'], function() {
    gulp.watch('build/**/*.js', ['combineJs']);
});

//merge compile task into skd
gulp.task('skd',['editorHome','editorProduct','runtime','plugin']);

gulp.task('build', ['reCreateDist', 'compileTs', 'combineJs', 'buildJs', 'copy', 'copyRes']);

gulp.task('release', ['reCreateRelease', 'releaseJs', 'suffixMd5'])

gulp.task('suffixMd5',['releaseJs'], function() {
    var release = __dirname + '/release/';
    var source = __dirname + '/dist';
    var versions = {};
    var versionPaths = {};

    var shouldResolveFiles = [
        'index.html'
    ];

    function releaseDir(dir) {
        var relativeDir = dir.replace(source, '');
        var files = fs.readdirSync(dir);
        files.forEach(function(file) {
            if(file.indexOf('.') === 0) return;

            if(file === 'index.html') {
                fse.copySync(dir + '/' + file, release + relativeDir + '/index.html');
                return;
            }

            if(fs.statSync(dir + '/' + file).isDirectory()) {
                releaseDir(dir + '/' + file);
            } else {
                var content = fs.readFileSync(dir + '/' + file);
                var extname, basename;
                var md5code = md5(content);
                if(file.indexOf('.tt.png') !== -1) {
                    basename = file.replace('.tt.png', '');
                    extname = '.tt.png';
                }
                else if(file.indexOf('.tt.json') !== -1) {
                    basename = file.replace('.tt.json', '');
                    extname = '.tt.json';
                }
                else {
                    extname = path.extname(file);
                    basename = file.substr(0, file.lastIndexOf('.'));
                }
                var smd5code = md5code.substring(0, 7);
                var from = dir + '/' + file;
                var relativeTo = relativeDir + '/' + basename + '_' + smd5code + extname;
                var to = release + relativeTo;
                fse.copySync(from, to);

                if(relativeDir) {
                    versions[relativeDir.substr(1) + '/' + file] = smd5code;
                    versionPaths[relativeDir.substr(1) + '/' + file] = relativeTo;
                } else {
                    versions[file] = smd5code;
                    versionPaths[file] = basename + '_' + smd5code + extname;;
                }

                if(extname === '.html') {
                    shouldResolveFiles.push(to);
                }

            }
        });
    }

    releaseDir(source);

    fs.writeFileSync(__dirname + '/release/versions.json', JSON.stringify(versions, null, '  '));

    shouldResolveFiles.forEach(function(file) {
        var content;
        if(file === 'index.html') {
            file = __dirname + '/release/index.html';
        }
        content = fs.readFileSync(file, 'utf8');

        for(var oriFileName in versions) {
            content = content.replace(oriFileName, versionPaths[oriFileName]);
        }

        fs.writeFileSync(file, content, 'utf8');
    });

});


var typedoc = require("gulp-typedoc");
gulp.task("typedoc", function() {
	return gulp
		.src(["src/test/typedoc/**/*.ts"])
		.pipe(typedoc({
			// TypeScript options (see typescript docs)
			module: "amd",
			target: "es5",
			includeDeclarations: true,

			// Output options (see typedoc docs)
			out: "./gendoc/out",
			json: "./gendoc/output/to/file.json",

			// TypeDoc options (see typedoc docs)
			name: "SKDesigner",
		//	theme: "node_modules/typedoc-markdown-theme/bin",
      theme: "node_modules/typedoc-skong-theme/bin",
			//plugins: ["my", "plugins"],
			ignoreCompilerErrors: false,
			version: true,
		}))
	;
});
