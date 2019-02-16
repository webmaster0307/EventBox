import fs from 'fs'
import async from 'async'

const load = function(data, models, callback) {
  if (typeof data === 'object') {
    loadObject(data, models, callback)
  } else if (typeof data === 'string') {
    fs.stat(data, function(err, stats) {
      if (err) throw err

      if (stats.isDirectory()) {
        loadDir(data, models, callback)
      } else {
        // File
        loadFile(data, models, callback)
      }
    })
  }
}

const loadObject = function(data, models, callback) {
  const key = Object.keys(data)[0]
  if (!key) return callback()
  // remove dodcuments of all collections
  // const collections = Object.keys(models)
  // await Promise.all(collections.map((key) => models[key].remove({})))

  insertCollection(key, data[key], models, callback)
}

async function insertCollection(modelName, data, models, callback) {
  // remove all documents
  await models[modelName].deleteMany(async function(err) {
    if (!err) {
      // re-insert to collection
      await Promise.all(data.map((arg) => models[modelName].create(arg)))
      callback()
    }
  })
  // const users = await models[modelName].find()
  // console.log('users: ', users)
}

function loadFile(file, models, callback) {
  callback = callback || function() {}

  load(require(file), models, callback)
}

function loadDir(dir, models, callback) {
  callback = callback || function() {}

  fs.readdir(dir, function(err, files) {
    if (err) return callback(err)

    var iterator = function(file, next) {
      loadFile(dir + '/' + file, models, next)
    }
    // async.forEach(files, iterator, callback)
    async.forEachLimit(files, 1, iterator, callback)
  })
}

export { load }
