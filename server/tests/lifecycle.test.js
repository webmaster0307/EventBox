// Before running any tests...
import { app, ht, httpServer } from '../src'

before(function (done) {
  // Increase the Mocha timeout so app has enough time to up, even if you have a bunch of assets.
  this.timeout(5000);
  app.on('serverStarted', function(){
    // console.log('-----------test starts-----------');
    done()
  })
});

// Before each test-case
beforeEach(function (done) {
  // console.log('before each')
  done()
})

// After all tests have finished...
after(function (done) {
  httpServer.close(function(){
    // console.log('close')
    done()
    process.exit()
  })
});
