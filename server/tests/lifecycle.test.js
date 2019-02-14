// Before running any tests...
import { app, httpServer } from '../src'

process.env.SERVER_PORT = 8001
process.env.MONGODB_URI = 'mongodb://admin:capstone@eventvlu.tk:27019/admin'

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
  done()
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
