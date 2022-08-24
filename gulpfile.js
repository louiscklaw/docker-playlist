const { execSync } = require('child_process')
const gulp = require('gulp')
var r_copy = require('recursive-copy')

const template_path = 'docker-helloworld-tryout'
const dest_path = 'docker-test-tryout'

function rmdir(path) {
  try {
    execSync('rm -r ' + path)
  } catch (error) {
    console.error('rmdir failed: ' + error)
  }
}

function copy(src, dest) {
  return r_copy(src, dest, function (error, results) {
    if (error) {
      console.error('Copy failed: ' + error)
    } else {
      console.info('Copied ' + results.length + ' files')
    }
  })
}

gulp.task('mytask', function (cb) {
  rmdir(`./${dest_path}`)
  copy(`./${template_path}/`, `./${dest_path}`)
  cb()
})
