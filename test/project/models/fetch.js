var fetch = require('node-fetch')
async function fetchUrl (url){

    var result = await fetch(url)
    return result
}