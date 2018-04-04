const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('cssstyles', () =>
    gulp.src('css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('build'))
);

gulp.task('watch', function() {
  gulp.watch('css/style.css', ['cssstyles']);
});
