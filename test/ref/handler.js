
var sleep = require('ko-sleep')
var fetchUrl = require('./models/fetch.js')



module.exports.hello = (event, context, callback) => {


  runHello(event, context, callback)  

};

function runHello(event, context, callback){return __async(function*(){


  var response = {
    statusCode: 200,
    body: JSON.stringify({ message: 'Ran using async awiat'})
  }

  yield sleep(1000)
  yield fetchUrl('https://api.github.com')

  callback(null , response)

}())}

//Handle errors to provent V8 from shutting down in the future
process.on('unhandledRejection', e => {
  console.log(e)
})
function __async(g){return new Promise(function(s,j){function c(a,x){try{var r=g[x?"throw":"next"](a)}catch(e){j(e);return}r.done?s(r.value):Promise.resolve(r.value).then(c,d)}function d(e){c(e,1)}c()})}
