var fetch = require('node-fetch')
function fetchUrl (url){return __async(function*(){

    var result = yield fetch(url)
    return result
}())}
function __async(g){return new Promise(function(s,j){function c(a,x){try{var r=g[x?"throw":"next"](a)}catch(e){j(e);return}r.done?s(r.value):Promise.resolve(r.value).then(c,d)}function d(e){c(e,1)}c()})}
