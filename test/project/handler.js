
var sleep = require('ko-sleep')
var fetchUrl = require('./models/fetch.js')



module.exports.hello = (event, context, callback) => {


  runHello(event, context, callback)  

};

async function runHello(event, context, callback){


  var response = {
    statusCode: 200,
    body: JSON.stringify({ message: 'Ran using async awiat'})
  }

  await sleep(1000)
  await fetchUrl('https://api.github.com')

  callback(null , response)

}

//Handle errors to provent V8 from shutting down in the future
process.on('unhandledRejection', e => {
  console.log(e)
})