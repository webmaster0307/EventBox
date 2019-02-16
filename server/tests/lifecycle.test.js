// Before running any tests...
import { app, httpServer, models } from '../src'
import { load } from './utils/preload-app'
import path from 'path'

before(function(done) {
  // Increase the Mocha timeout so app has enough time to up, even if you have a bunch of assets.
  this.timeout(5000)

  app.on('serverStarted', function() {
    // console.log('-----------test starts-----------');
    done()
  })
})

// Before each test-case
beforeEach(function(done) {
  // console.log('before each')
  refreshDatabase(done)
})

// After all tests have finished...
after(function(done) {
  httpServer.close(function() {
    // console.log('close')
    done()
    // try {
    //   process.kill(process.pid, 'SIGINT');
    // } catch (e) {
    //   console.error('Error killing process:', e.stack);
    // }
  })
})

function refreshDatabase(done) {
  const fixturePath = path.join(__dirname, 'fixtures')
  load(fixturePath, models, function(error, data) {
    if (error != null) {
      done(error)
    }
    done()
  })
}
